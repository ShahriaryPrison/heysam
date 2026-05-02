import fs from "fs";
import path from "path";
import { readCustomProjects, writeCustomProjects, normalizeCustomProject } from "@/lib/projectStore";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const isAuthorized = (req) => {
  const password = req.headers["x-admin-password"] || req.headers["X-Admin-Password"];
  return password === ADMIN_PASSWORD;
};

const getStaticProjects = async (lang) => {
  const projectsDir = path.join(process.cwd(), "src", "data", "projects", lang);
  try {
    const projectFiles = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".js"));
    const projects = await Promise.all(
      projectFiles.map(async (file) => {
        const projectId = path.basename(file, ".js");
        const projectModule = await import(`@/data/projects/${lang}/${projectId}.js`);
        return {
          ...projectModule.default,
          id: projectId,
          source: "static",
        };
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

    return res.status(200).json(updatedProject);
  }

  if (req.method === "DELETE") {
    const id = String(req.query.id || req.body.id || "").trim();
    if (!id) {
      return res.status(400).json({ error: "Missing project id" });
    }

    const projects = await readCustomProjects(lang);
    const filtered = projects.filter((item) => item.id !== id);
    if (filtered.length === projects.length) {
      return res.status(404).json({ error: "Project not found" });
    }

    await writeCustomProjects(lang, filtered);
    return res.status(200).json({ id });
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  res.status(405).json({ error: "Method not allowed" });
}
