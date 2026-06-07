import Head from "next/head";
import { SITE_URL } from "@/lib/seo";

export default function SeoHead({
  title,
  description,
  keywords,
  ogImage,
  canonical,
  siteName,
  lang = "en",
  altLang, // { en: "/en", fa: "/fa" }
}) {
  const fullCanonical = canonical?.startsWith("http") ? canonical : `${SITE_URL}${canonical || ""}`;

  // Use provided ogImage or fall back to static heysam-og.png
  let fullOgImage;
  if (ogImage && ogImage.startsWith("http")) {
    fullOgImage = ogImage;
  } else if (ogImage) {
    fullOgImage = `${SITE_URL}${ogImage}`;
  } else {
    fullOgImage = `${SITE_URL}/images/heysam-og.png`;
  }

  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:locale" content={lang === "fa" ? "fa_IR" : "en_US"} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* hreflang */}
      {altLang && Object.entries(altLang).map(([l, href]) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l === "fa" ? "fa" : "en"}
          href={href?.startsWith("http") ? href : `${SITE_URL}${href}`}
        />
      ))}
      {altLang && <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />}
    </Head>
  );
}
