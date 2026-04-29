import fs from "node:fs";
import path from "node:path";
import { assetPath, services, type ServiceSlug } from "@/lib/site-data";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export type PortfolioImage = {
  src: string;
  category: ServiceSlug;
  categoryLabel: string;
  alt: string;
};

export function getCategoryImages(category: ServiceSlug) {
  const directory = path.join(process.cwd(), "public", "sources", category);

  try {
    if (!fs.existsSync(directory)) {
      console.warn(`Gallery directory not found: ${directory}`);
      return [];
    }

    const files = fs
      .readdirSync(directory)
      .filter((file) => !file.startsWith(".") && imageExtensions.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "sk"))
      .map((file) => assetPath(category, file));

    console.log(`Found ${files.length} images for category: ${category}`);
    return files;
  } catch (error) {
    console.error(`Error reading gallery directory for ${category}:`, error);
    return [];
  }
}

export function getPortfolioImages(): PortfolioImage[] {
  try {
    const logPath = path.join(process.cwd(), "scratch", "gallery-runtime.log");
    const timestamp = new Date().toISOString();
    
    let logMessage = `[${timestamp}] getPortfolioImages called\n`;
    logMessage += `CWD: ${process.cwd()}\n`;
    logMessage += `Services count: ${services.length}\n`;

    const allImages = services.flatMap((service) => {
      const images = getCategoryImages(service.slug).map((src) => ({
        src,
        category: service.slug,
        categoryLabel: service.title,
        alt: `KP-WELD ${service.title.toLowerCase()}`,
      }));
      logMessage += `- ${service.slug}: found ${images.length} images\n`;
      return images;
    });

    logMessage += `Total images: ${allImages.length}\n\n`;
    
    // Ensure scratch directory exists
    const scratchDir = path.join(process.cwd(), "scratch");
    if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir);
    fs.appendFileSync(logPath, logMessage);

    return allImages;
  } catch (error) {
    console.error("Critical error in getPortfolioImages:", error);
    return [];
  }
}




