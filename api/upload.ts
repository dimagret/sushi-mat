import type { Context } from "hono";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

export async function handleUpload(c: Context) {
  try {
    const body = await c.req.parseBody({ all: false });
    const file = body.file as File;
    const itemId = (body.itemId as string) || "0";
    const itemName = (body.itemName as string) || "dish";

    if (!file || !(file instanceof File)) {
      return c.json({ error: "No file provided" }, 400);
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return c.json({ error: "Only image files are allowed" }, 400);
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ error: "File too large (max 10MB)" }, 400);
    }

    // Create safe filename
    const safeName = itemName
      .toLowerCase()
      .replace(/[^a-zа-яё0-9\s]/g, "")
      .replace(/\s+/g, "_")
      .substring(0, 30);
    
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${safeName}_${itemId}.${ext}`;

    // Ensure catalog directory exists
    const catalogDir = path.join(process.cwd(), "public", "catalog");
    if (!existsSync(catalogDir)) {
      await mkdir(catalogDir, { recursive: true });
    }

    const filepath = path.join(catalogDir, filename);

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    // Return the web path
    const webPath = `/catalog/${filename}`;

    return c.json({
      success: true,
      path: webPath,
      filename,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return c.json(
      { error: "Upload failed", details: String(error) },
      500
    );
  }
}
