import fs from "fs";
import path from "path";

const customProjectsDir = path.join(
  process.cwd(),
  "src",
  "data",
  "projects",
  "custom"
);

const getCustomProjectsFile = (lang) =>
  path.join(customProjectsDir, `${lang}.json`);

export async function readCustomProjects(lang) {
  const filePath = getCustomProjectsFile(lang);
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map(normalizeCustomProject);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeCustomProjects(lang, projects) {
  await fs.promises.mkdir(customProjectsDir, { recursive: true });
  const filePath = getCustomProjectsFile(lang);
  await fs.promises.writeFile(filePath, JSON.stringify(projects, null, 2), "utf8");
}

export function normalizeCustomProject(project) {
  const parseList = (value) => {
    if (Array.isArray(value)) return value.map((item) => item?.toString().trim()).filter(Boolean);
    if (!value) return [];
    return value
      .toString()
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const normalizeSrcValue = (value) => {
    if (!value) return "";
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "[object Object]" || trimmed === "") return "";
      return trimmed;
    }
    if (typeof value === "object") {
      if (typeof value.src === "string") return value.src.trim();
      if (typeof value.src === "object") return normalizeSrcValue(value.src);
      if (typeof value.default === "string") return value.default.trim();
      return "";
    }
    return String(value).trim();
  };

  const normalizeImages = (images) => {
    const rawImages = Array.isArray(images)
      ? images
      : images?.toString().split(",") || [];

    return rawImages
      .map((image) => {
        if (!image) return null;
        if (typeof image === "string") {
          const src = normalizeSrcValue(image);
          return src ? { src } : null;
        }
        if (typeof image === "object") {
          const src = normalizeSrcValue(image.src || image);
          return src ? { ...image, src } : null;
        }
        const src = normalizeSrcValue(image);
        return src ? { src } : null;
      })
      .filter(Boolean);
  };

  const normalizeIcon = (icon) => {
    const src = normalizeSrcValue(icon?.src || icon);
    return { src: src || "/images/default-icon.png" };
  };

  return {
    id: project.id?.toString().trim() || "",
    title: project.title || "",
    description: project.description || "",
    tech: project.tech || "",
    date: project.date || new Date().toISOString().slice(0, 10),
    link: project.link || "",
    status: project.status || "Production",
    type: project.type || "Public",
    tech_stack: parseList(project.tech_stack),
    features: parseList(project.features),
    icon: normalizeIcon(project.icon),
    images: normalizeImages(project.images),
    isActive: project.isActive !== false,
  };
}
