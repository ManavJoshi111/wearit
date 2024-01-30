import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

let routes = [];

const getImports = async () => {
  try {
    const files = await fs.readdir(currentDir);
    for (const file of files) {
      if (file !== "index.js" && file.endsWith(".js") && file !== "test.js") {
        const data = await import(`./${file}`);
        routes.push(data);
      }
    }
  } catch (error) {
    console.error("Error reading files:", error);
  }
};

export default async (app) => {
  await getImports();
  routes.forEach((route) => {
    Object.values(route).forEach((value) => {
      app.use(value.routes()).use(value.allowedMethods());
    });
  });
};
