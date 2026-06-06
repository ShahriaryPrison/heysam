export const SITE_URL = "https://heysam.build";
export const SITE_NAME = "Heysam";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.png`;

export const SEO = {
  en: {
    siteName: "Heysam — Software Development Studio",
    home: {
      title: "Heysam | Software Development Studio",
      description: "Heysam is a professional software development studio specializing in web apps, websites, and scalable digital products. We turn your ideas into reality.",
      keywords: "software development, web app, website, React, Next.js, Laravel, software studio",
    },
    projects: {
      title: "Projects | Heysam",
      description: "Explore Heysam's portfolio of web applications, websites, and digital products built for clients across various industries.",
      keywords: "portfolio, projects, web apps, software projects, heysam portfolio",
    },
    project: (title, description) => ({
      title: `${title} | Heysam`,
      description: description?.slice(0, 160) || `${title} — a project by Heysam Software Development Studio.`,
      keywords: `${title}, software, web app, heysam`,
    }),
  },
  fa: {
    siteName: "هیسم — استودیوی توسعه نرم‌افزار",
    home: {
      title: "هیسم | استودیوی توسعه نرم‌افزار",
      description: "هیسم یک استودیوی حرفه‌ای توسعه نرم‌افزار است که در زمینه طراحی و ساخت وب‌اپ، وب‌سایت و محصولات دیجیتال فعالیت می‌کند. از ایده تا محصول نهایی کنارتان هستیم.",
      keywords: "توسعه نرم‌افزار, وب اپ, وب سایت, ری‌اکت, نکست جی‌اس, لاراول, استودیو نرم‌افزار",
    },
    projects: {
      title: "پروژه‌ها | هیسم",
      description: "نمونه‌کارهای هیسم: وب‌اپلیکیشن‌ها، وب‌سایت‌ها و محصولات دیجیتال ساخته‌شده برای کسب‌وکارهای مختلف.",
      keywords: "نمونه کار, پروژه‌ها, وب اپ, محصولات نرم‌افزاری, هیسم",
    },
    project: (title, description) => ({
      title: `${title} | هیسم`,
      description: description?.slice(0, 160) || `${title} — پروژه‌ای از استودیوی توسعه نرم‌افزار هیسم.`,
      keywords: `${title}, نرم‌افزار, وب اپ, هیسم`,
    }),
  },
};

/**
 * Build a full <Head> meta object for a page
 */
export function buildMeta({ lang = "en", page = "home", title, description, keywords, ogImage, canonical, project }) {
  const l = SEO[lang] || SEO.en;
  let meta;
  if (page === "project" && project) {
    meta = l.project(project.title, project.description);
  } else {
    meta = l[page] || l.home;
  }

  return {
    title: title || meta.title,
    description: description || meta.description,
    keywords: keywords || meta.keywords,
    ogImage: ogImage || DEFAULT_OG_IMAGE,
    canonical: canonical || SITE_URL,
    siteName: l.siteName,
    lang,
  };
}
