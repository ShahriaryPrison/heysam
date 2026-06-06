import { SITE_URL } from "@/lib/seo";
import { readCustomProjects } from "@/lib/projectStore";
import fs from "fs";
import path from "path";

function getStaticProjectIds(lang) {
  try {
    const dir = path.join(process.cwd(), "src", "data", "projects", lang);
    return fs.readdirSync(dir)
      .filter((f) => f.endsWith(".js"))
      .map((f) => path.basename(f, ".js"));
  } catch {
    return [];
  }
}

function url(loc, { lastmod, changefreq, priority } = {}) {
  return `
  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ""}
    ${priority != null ? `<priority>${priority}</priority>` : ""}
  </url>`;
}

function generateSitemap(projectIds) {
  const today = new Date().toISOString().split("T")[0];
  const langs = ["en", "fa"];

  const staticUrls = [
    url(`${SITE_URL}/`, { lastmod: today, changefreq: "monthly", priority: 0.5 }),
    ...langs.map((l) => url(`${SITE_URL}/${l}`, { lastmod: today, changefreq: "weekly", priority: 1.0 })),
    ...langs.map((l) => url(`${SITE_URL}/${l}/projects`, { lastmod: today, changefreq: "weekly", priority: 0.9 })),
  ];

  const projectUrls = langs.flatMap((l) =>
    projectIds.map((id) =>
      url(`${SITE_URL}/${l}/projects/${id}`, { lastmod: today, changefreq: "monthly", priority: 0.7 })
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticUrls, ...projectUrls].join("")}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  // Collect all active project IDs
  const customProjects = await readCustomProjects("fa");
  const customIds = customProjects
    .filter((p) => p.isActive !== false)
    .map((p) => String(p.id).trim());

  const staticIds = getStaticProjectIds("fa");

  // Merge: custom overrides static; deduped
  const seen = new Set();
  const allIds = [];
  [...customIds, ...staticIds].forEach((id) => {
    const key = id.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      allIds.push(id);
    }
  });

  // Remove inactive ones (those in custom with isActive:false)
  const inactiveIds = new Set(
    customProjects.filter((p) => p.isActive === false).map((p) => String(p.id).trim().toLowerCase())
  );
  const activeIds = allIds.filter((id) => !inactiveIds.has(id.toLowerCase()));

  const sitemap = generateSitemap(activeIds);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function SitemapPage() {
  return null;
}
