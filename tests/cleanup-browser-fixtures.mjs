import { rm } from "node:fs/promises";
import { resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
for (const name of ["__audit.html", "__audit-nojs.html", "__audit-browser-hooks.js", "js/__audit-main.js"]) {
  const path = resolve(dist, name);
  if (!path.startsWith(dist + sep)) throw new Error(`Refusing to remove a path outside dist/: ${path}`);
  await rm(path, { force: true });
}
console.log("Temporary browser fixtures removed from dist/.");
