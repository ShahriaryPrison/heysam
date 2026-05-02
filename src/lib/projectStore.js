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

  const normalizeImages = (images) => {
    const rawImages = Array.isArray(images)
      ? images
      : images?.toString().split(",") || [];

    return rawImages
      .map((image) => {
        if (!image) return null;
        if (typeof image === "string") return { src: image.trim() };
        if (typeof image === "object") return image;
        return { src: String(image).trim() };
      })
      .filter(Boolean);
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
    icon:
      typeof project.icon === "string"
        ? { src: project.icon }
        : project.icon || { src: "/images/default-icon.png" },
    images: normalizeImages(project.images),
  };
}
