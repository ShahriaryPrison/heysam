import fs from "fs";
import path from "path";
import { readCustomProjects, writeCustomProjects, normalizeCustomProject } from "@/lib/projectStore";

const OTHER_LANG = { fa: "en", en: "fa" };

// Fields that are language-independent and should always be synced
const SYNC_FIELDS = ["images", "icon", "mainImage", "tech_stack", "status", "type", "tech", "link", "date", "isActive"];

/**
 * Sync a project to the other language.
 * - isNew=true: also creates a stub entry if not present (copies all fields including title/desc as placeholders)
 * - isNew=false: only updates the SYNC_FIELDS on existing entries (or creates a minimal entry for static projects)
 */
async function syncProjectToOtherLang(lang, project, isNew = false) {
  const otherLang = OTHER_LANG[lang];
  if (!otherLang) return;

  // Build the payload of fields to sync
  const syncUpdate = {};
  SYNC_FIELDS.forEach((f) => {
    if (project[f] !== undefined) syncUpdate[f] = project[f];
  });

  try {
    const otherProjects = await readCustomProjects(otherLang);
    const normalizedId = String(project.id || "").trim().toLowerCase();
    const idx = otherProjects.findIndex(
      (p) => String(p.id || "").trim().toLowerCase() === normalizedId
    );

    if (idx !== -1) {
      // Entry exists in other lang — update only SYNC_FIELDS (never overwrite their title/desc/features)
      otherProjects[idx] = normalizeCustomProject({ ...otherProjects[idx], ...syncUpdate });
      await writeCustomProjects(otherLang, otherProjects);
    } else {
      // No entry in other lang yet
      if (isNew) {
        // New project: create a full stub so it appears in the other language immediately
        // Title/description/features are copied as-is (user can translate later)
        const stub = normalizeCustomProject({
          id: project.id,
          title: project.title || "",
          description: project.description || "",
          features: project.features || [],
          ...syncUpdate,
        });
        otherProjects.push(stub);
        await writeCustomProjects(otherLang, otherProjects);
      } else {
        // Update on existing project: check if it's a static project in other lang
        const staticDir = path.join(process.cwd(), "src", "data", "projects", otherLang);
        const hasStatic =
          fs.existsSync(staticDir) &&
          fs.readdirSync(staticDir).some(
            (f) => path.basename(f, ".js").toLowerCase() === normalizedId
          );

        if (hasStatic) {
          // Create override with sync fields only
          const override = normalizeCustomProject({ id: project.id, ...syncUpdate });
          otherProjects.push(override);
          await writeCustomProjects(otherLang, otherProjects);
        }
        // If no matching project in other lang at all, skip silently
      }
    }
  } catch (_) {
    // Never break the main save due to sync failure
  }
}

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Abolmhey885";

const isAuthorized = (req) => {
  const username = req.headers["x-admin-username"] || req.headers["X-Admin-Username"];
  const password = req.headers["x-admin-password"] || req.headers["X-Admin-Password"];
  return username === "admin" && password === ADMIN_PASSWORD;
};

// Recursively unwrap Next.js StaticImageData / ES module objects to a plain URL string
function extractSrc(value, depth = 0) {
  if (!value || depth > 6) return "";
  if (typeof value === "string") {
    const t = value.trim();
    return t === "[object Object]" ? "" : t;
  }
  if (typeof value === "object") {
    if (typeof value.src === "string") return value.src;
    if (typeof value.src === "object") return extractSrc(value.src, depth + 1);
    if (value.default) return extractSrc(value.default, depth + 1);
  }
  return "";
}

function normalizeStaticProject(raw, projectId) {
  const images = (Array.isArray(raw.images) ? raw.images : [])
    .map((img) => {
      if (!img) return null;
      // { size, src } shape
      const src = img.src !== undefined ? extractSrc(img.src) : extractSrc(img);
      return src || null;
    })
    .filter(Boolean);

  return {
    ...raw,
    id: projectId,
    source: "static",
    icon: { src: extractSrc(raw.icon?.src ?? raw.icon) || "/images/default-icon.png" },
    mainImage: extractSrc(raw.mainImage?.src ?? raw.mainImage) || "",
    images,
  };
}

const getStaticProjects = async (lang) => {
  const projectsDir = path.join(process.cwd(), "src", "data", "projects", lang);
  try {
    const projectFiles = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".js"));
    const projects = await Promise.all(
      projectFiles.map(async (file) => {
        const projectId = path.basename(file, ".js");
        const projectModule = await import(`@/data/projects/${lang}/${projectId}.js`);
        return normalizeStaticProject(projectModule.default, projectId);
      })
    );
    return projects;
  } catch (error) {
    return [];
  }
};

export default async function handler(req, res) {
  const lang = String(req.query.lang || req.body.lang || "en").toLowerCase();
  const normalizeIdKey = (value) => String(value || "").trim().toLowerCase();

  if (req.method === "GET") {
    if (!isAuthorized(req)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const customProjects = await readCustomProjects(lang);
    const staticProjects = await getStaticProjects(lang);
    const uniqueCustom = [];
    const seenIds = new Set();
    customProjects.forEach((project) => {
      const key = normalizeIdKey(project.id);
      if (!seenIds.has(key)) {
        seenIds.add(key);
        uniqueCustom.push({ ...project, id: String(project.id || "").trim() });
      }
    });

    return res.status(200).json({ customProjects: uniqueCustom, staticProjects });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const project = req.body.project;
    if (!project) {
      return res.status(400).json({ error: "Missing project payload" });
    }

    const projects = await readCustomProjects(lang);

    const generatedId = project.id?.toString().trim() ||
      project.title?.toString().trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "") ||
      `project-${Date.now()}`;

    if (projects.some((item) => normalizeIdKey(item.id) === normalizeIdKey(generatedId))) {
      return res.status(409).json({ error: `Project with id ${generatedId} already exists.` });
    }

    const newProject = normalizeCustomProject({ ...project, id: generatedId });
    projects.push(newProject);
    await writeCustomProjects(lang, projects);
    await syncProjectToOtherLang(lang, newProject, true); // isNew=true → create stub in other lang

    return res.status(201).json(newProject);
  }

  if (req.method === "PUT") {
    const project = req.body.project;
    if (!project?.id) {
      return res.status(400).json({ error: "Missing project id" });
    }

    const projects = await readCustomProjects(lang);
    const normalizedProjectId = normalizeIdKey(project.id);
    const index = projects.findIndex((item) => normalizeIdKey(item.id) === normalizedProjectId);

    if (index === -1) {
      // If project exists in static data, create an override entry in custom storage.
      try {
        const staticDir = path.join(process.cwd(), "src", "data", "projects", lang);
        const projectFiles = fs.existsSync(staticDir)
          ? fs.readdirSync(staticDir).filter((file) => file.endsWith(".js"))
          : [];

        const matchingFile = projectFiles.find((file) =>
          path.basename(file, ".js").toLowerCase() === normalizedProjectId
        );

        if (matchingFile) {
          const override = normalizeCustomProject({ ...project, id: project.id });
          projects.push(override);
          await writeCustomProjects(lang, projects);
          await syncProjectToOtherLang(lang, override, false);
          return res.status(200).json(override);
        }
      } catch (err) {
        // ignore and fall through to not-found
      }
      return res.status(404).json({ error: "Project not found" });
    }

    const updatedProject = normalizeCustomProject({ ...projects[index], ...project });
    projects[index] = updatedProject;
    await writeCustomProjects(lang, projects);
    await syncProjectToOtherLang(lang, updatedProject, false);

    return res.status(200).json(updatedProject);
  }

  if (req.method === "DELETE") {
    const id = String(req.query.id || req.body.id || "").trim();
    if (!id) {
      return res.status(400).json({ error: "Missing project id" });
    }

    const projects = await readCustomProjects(lang);
    const idx = projects.findIndex((item) => normalizeIdKey(item.id) === normalizeIdKey(id));

    // Check if it's a static project
    const staticDir = path.join(process.cwd(), "src", "data", "projects", lang);
    const isStatic = fs.existsSync(staticDir) &&
      fs.readdirSync(staticDir).some((f) => path.basename(f, ".js").toLowerCase() === normalizeIdKey(id));

    if (isStatic) {
      // For static projects: mark as isActive:false (can't delete the file)
      if (idx !== -1) {
        projects[idx] = normalizeCustomProject({ ...projects[idx], isActive: false });
      } else {
        projects.push(normalizeCustomProject({ id, isActive: false }));
      }
      await writeCustomProjects(lang, projects);
      return res.status(200).json({ id });
    }

    // For custom-only projects: actually delete
    if (idx === -1) {
      return res.status(404).json({ error: "Project not found" });
    }
    projects.splice(idx, 1);
    await writeCustomProjects(lang, projects);
    return res.status(200).json({ id });
  }

  // PATCH /api/admin/projects?action=sync — bulk sync all projects from `lang` → other lang
  if (req.method === "PATCH") {
    const action = req.query.action;
    if (action === "sync") {
      const sourceLang = lang;
      const targetLang = OTHER_LANG[sourceLang];
      if (!targetLang) return res.status(400).json({ error: "Unknown lang" });

      const sourceProjects = await readCustomProjects(sourceLang);
      let targetProjects = await readCustomProjects(targetLang);
      const targetMap = new Map(targetProjects.map((p, i) => [String(p.id || "").trim().toLowerCase(), i]));

      let created = 0, updated = 0;

      for (const project of sourceProjects) {
        const normalizedId = String(project.id || "").trim().toLowerCase();
        const syncPayload = {};
        SYNC_FIELDS.forEach((f) => {
          if (project[f] !== undefined) syncPayload[f] = project[f];
        });

        const targetIdx = targetMap.get(normalizedId);
        if (targetIdx !== undefined) {
          // Update SYNC_FIELDS only (preserve their title/desc/features)
          targetProjects[targetIdx] = normalizeCustomProject({ ...targetProjects[targetIdx], ...syncPayload });
          updated++;
        } else {
          // Create stub in target lang
          const stub = normalizeCustomProject({
            id: project.id,
            title: project.title || "",
            description: "",
            features: [],
            ...syncPayload,
          });
          targetProjects.push(stub);
          targetMap.set(normalizedId, targetProjects.length - 1);
          created++;
        }
      }

      await writeCustomProjects(targetLang, targetProjects);
      return res.status(200).json({ synced: { created, updated } });
    }
    return res.status(400).json({ error: "Unknown action" });
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
  res.status(405).json({ error: "Method not allowed" });
}
