import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const html = await readFile(resolve(dist, "index.html"), "utf8");
const appJs = await readFile(resolve(dist, "js/main.js"), "utf8");
const appScript = /\s*<script src="\/js\/main\.js(?:\?[^\"]*)?"[^>]*><\/script>/;

if (!appScript.test(html)) throw new Error("Main application script reference not found in dist/index.html");

const hooks = '<script src="/__audit-browser-hooks.js"></script>\n';
await writeFile(resolve(dist, "js/__audit-main.js"), appJs.replaceAll("window.confirm(", "window.__auditConfirm(").replaceAll("window.open(", "window.__auditOpen("));
await writeFile(
  resolve(dist, "__audit.html"),
  html.replace("</head>", `${hooks}</head>`).replace(appScript, '<script src="/js/__audit-main.js" defer></script>')
);
await writeFile(
  resolve(dist, "__audit-nojs.html"),
  html
    .replace('<noscript><link rel="stylesheet" href="/noscript.css"></noscript>', '<link rel="stylesheet" href="/noscript.css">')
    .replace(appScript, "")
);
await copyFile(resolve(root, "tests/fixtures/audit-browser-hooks.js"), resolve(dist, "__audit-browser-hooks.js"));
console.log("Temporary browser fixtures created in dist/; remove them before packaging or deployment.");
