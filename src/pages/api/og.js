import sharp from "sharp";
import fs from "fs";
import path from "path";

// 1200×630 — standard OG size
const W = 1200;
const H = 630;

// Load logo once at module level
let LOGO_B64 = "";
try {
  const logoPath = path.join(process.cwd(), "public", "images", "heysam-logo-no-back.png");
  LOGO_B64 = fs.readFileSync(logoPath).toString("base64");
} catch (e) {
  console.warn("OG: could not load logo", e.message);
}

function buildSvg({ title = "Heysam", subtitle = "Software Development Studio" }) {
  const safeTitle = (title || "Heysam").slice(0, 60);
  const safeSub   = (subtitle || "").slice(0, 90);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#07060f"/>
      <stop offset="100%" stop-color="#0f0c1e"/>
    </linearGradient>
    <radialGradient id="glow" cx="72%" cy="38%" r="55%">
      <stop offset="0%"   stop-color="#9B51E0" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#9B51E0" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="10%" cy="80%" r="40%">
      <stop offset="0%"   stop-color="#3F51B5" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#3F51B5" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#3F51B5"/>
      <stop offset="100%" stop-color="#9B51E0"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#c084fc"/>
      <stop offset="50%"  stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1" fill="rgba(155,81,224,0.12)"/>
    </pattern>
    <clipPath id="logoClip"><circle cx="980" cy="315" r="88"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <circle cx="1050" cy="120" r="180" fill="none" stroke="rgba(155,81,224,0.12)" stroke-width="1.5"/>
  <circle cx="1050" cy="120" r="230" fill="none" stroke="rgba(155,81,224,0.07)" stroke-width="1"/>
  <circle cx="1050" cy="120" r="300" fill="none" stroke="rgba(155,81,224,0.04)" stroke-width="1"/>
  <circle cx="150"  cy="530" r="120" fill="none" stroke="rgba(63,81,181,0.10)" stroke-width="1.5"/>
  <circle cx="150"  cy="530" r="170" fill="none" stroke="rgba(63,81,181,0.06)" stroke-width="1"/>
  <line x1="80" y1="520" x2="${W - 80}" y2="520" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <circle cx="980" cy="315" r="130" fill="url(#logoGrad)" opacity="0.15"/>
  <circle cx="980" cy="315" r="110" fill="url(#logoGrad)" opacity="0.25"/>
  <circle cx="980" cy="315" r="88"  fill="url(#logoGrad)"/>
  ${LOGO_B64
    ? `<image x="916" y="251" width="128" height="128" href="data:image/png;base64,${LOGO_B64}" clip-path="url(#logoClip)"/>`
    : `<text x="980" y="350" text-anchor="middle" font-size="72" font-weight="800" font-family="Arial,sans-serif" fill="white">H</text>`}

  <rect x="80" y="130" width="200" height="36" rx="18"
        fill="rgba(155,81,224,0.15)" stroke="rgba(155,81,224,0.35)" stroke-width="1"/>
  <text x="180" y="154" text-anchor="middle"
        font-size="15" font-weight="600" font-family="Arial,sans-serif"
        fill="rgba(155,81,224,0.95)" letter-spacing="2">HEYSAM.TECH</text>

  <text x="80" y="310"
        font-size="${safeTitle.length > 20 ? 62 : 72}"
        font-weight="800" font-family="Arial,sans-serif"
        fill="url(#textGrad)">${safeTitle}</text>

  <text x="80" y="390"
        font-size="28" font-weight="400" font-family="Arial,sans-serif"
        fill="rgba(255,255,255,0.45)">${safeSub}</text>

  <text x="80" y="560"
        font-size="18" font-weight="500" font-family="Arial,sans-serif"
        fill="rgba(255,255,255,0.25)" letter-spacing="1">heysam-tech.ir</text>
</svg>`;
}

export default async function handler(req, res) {
  const { title, subtitle } = req.query;

  const svg = buildSvg({
    title: title || "Heysam",
    subtitle: subtitle || "Software Development Studio",
  });

  try {
    const png = await sharp(Buffer.from(svg))
      .png({ quality: 90, compressionLevel: 8 })
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800");
    res.send(png);
  } catch (err) {
    console.error("OG image error:", err);
    res.status(500).json({ error: "Failed to generate OG image" });
  }
}
