import { cp, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "dist");
const files = ["index.html", "styles.css", "tailwind.css", "robots.txt", "_headers"];
const folders = ["assets", "js"];

await mkdir(output, { recursive: true });
for (const file of files) await cp(resolve(root, file), resolve(output, file));
for (const folder of folders) await cp(resolve(root, folder), resolve(output, folder), { recursive: true });
console.log("Cloudflare Pages output created at dist/");
