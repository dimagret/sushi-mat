import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const MENU_DATA_PATH = path.join(process.cwd(), "public", "admin", "menu-data.json");
const MENU_TS_PATH = path.join(process.cwd(), "src", "data", "menu.ts");

async function readMenuData(): Promise<any[]> {
  const content = await readFile(MENU_DATA_PATH, "utf-8");
  return JSON.parse(content);
}

async function writeMenuData(data: any[]) {
  await writeFile(MENU_DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * Update image in menu.ts by finding the item by ID and replacing/adding the image line
 */
async function updateMenuTs(itemId: number, imagePath: string | null) {
  const content = await readFile(MENU_TS_PATH, "utf-8");
  const lines = content.split("\n");
  
  // Find the item block by ID
  let inBlock = false;
  let blockStart = -1;
  let blockEnd = -1;
  let braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line starts our item
    if (new RegExp(`\\{\\s*id:\\s*${itemId}[,\\s]`).test(line)) {
      inBlock = true;
      blockStart = i;
      braceDepth = 0;
    }
    
    if (inBlock) {
      // Count braces to find end of block
      for (const ch of line) {
        if (ch === "{") braceDepth++;
        if (ch === "}") braceDepth--;
      }
      
      if (braceDepth === 0 && line.includes("}")) {
        blockEnd = i;
        break;
      }
    }
  }
  
  if (blockStart === -1 || blockEnd === -1) {
    throw new Error(`Item with id ${itemId} not found in menu.ts`);
  }
  
  // Get the block lines
  const blockLines = lines.slice(blockStart, blockEnd + 1);
  let blockText = blockLines.join("\n");
  
  if (imagePath) {
    // Check if image already exists
    if (blockText.includes("image:")) {
      // Replace existing image
      blockText = blockText.replace(/image:\s*'[^']+'/, `image: '${imagePath}'`);
    } else {
      // Add image before tag: or at the end before the closing
      blockText = blockText.replace(
        /(tag:\s*(?:'[^']*'|null))\s*(,\s*options:|\s*\})/,
        `$1, image: '${imagePath}'$2`
      );
    }
  } else {
    // Remove image line
    blockText = blockText.replace(/,\s*image:\s*'[^']+'/g, "");
  }
  
  // Replace lines
  const newLines = blockText.split("\n");
  lines.splice(blockStart, blockEnd - blockStart + 1, ...newLines);
  
  await writeFile(MENU_TS_PATH, lines.join("\n"), "utf-8");
}

export const menuRouter = createRouter({
  getAll: publicQuery.query(async () => {
    try {
      return await readMenuData();
    } catch {
      return [];
    }
  }),

  updateImage: publicQuery
    .input(
      z.object({
        itemId: z.number(),
        imagePath: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const items = await readMenuData();
        const item = items.find((i) => i.id === input.itemId);
        
        if (!item) {
          return { success: false, error: "Item not found" };
        }

        item.image = input.imagePath;
        await writeMenuData(items);
        await updateMenuTs(input.itemId, input.imagePath);
        
        return { success: true, item };
      } catch (error) {
        console.error("Update image error:", error);
        return { success: false, error: String(error) };
      }
    }),

  removeImage: publicQuery
    .input(z.object({ itemId: z.number() }))
    .mutation(async ({ input }) => {
      try {
        const items = await readMenuData();
        const item = items.find((i) => i.id === input.itemId);
        
        if (!item) {
          return { success: false, error: "Item not found" };
        }

        delete item.image;
        await writeMenuData(items);
        await updateMenuTs(input.itemId, null);
        
        return { success: true };
      } catch (error) {
        return { success: false, error: String(error) };
      }
    }),
});
