import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Abolmhey885";

const isAuthorized = (req) => {
  const username = req.headers["x-admin-username"] || req.headers["X-Admin-Username"];
  const password = req.headers["x-admin-password"] || req.headers["X-Admin-Password"];
  return username === "admin" && password === ADMIN_PASSWORD;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default async function handler(req, res) {
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { files } = req.body; // Array of base64 encoded files with metadata

    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: "No files provided" });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const uploadedPaths = [];

    for (const fileData of files) {
      if (!fileData.name || !fileData.base64) {
        continue;
      }

      // Generate unique filename
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const ext = path.extname(fileData.name);
      const filename = `${timestamp}-${random}${ext}`;
      const filepath = path.join(uploadsDir, filename);

      // Decode base64 and write file
      const buffer = Buffer.from(fileData.base64, "base64");
      await fs.promises.writeFile(filepath, buffer);

      uploadedPaths.push(`/uploads/${filename}`);
    }

    return res.status(200).json({ files: uploadedPaths });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Upload failed: " + err.message });
  }
}
