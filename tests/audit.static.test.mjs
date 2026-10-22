import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve, sep } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const html = read("index.html");
const script = read("js/main.js");
const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));

test("HTML IDs are unique and internal fragment links resolve", () => {
  const allIds = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(allIds).size, allIds.length, "duplicate ID found");

  const missing = [...html.matchAll(/\bhref="#([^" ]+)"/g)]
    .map((match) => match[1])
    .filter((id) => !ids.has(id));
  assert.deepEqual(missing, []);
});

test("planner has seven distinct selectable services and all site prefills map to one", () => {
  const services = [...html.matchAll(/<input type="radio" name="service" value="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(services.length, 7);
  assert.equal(new Set(services).size, services.length);
  for (const mapping of [
    ['urbana: "Corrida urbana"', "Corrida urbana"],
    ['aeroporto: "Transfer para aeroporto"', "Transfer para aeroporto"],
    ['intermunicipal: "Viagem intermunicipal"', "Viagem intermunicipal"],
    ['executivo: "Transporte executivo ou empresarial"', "Transporte executivo ou empresarial"],
    ['particular: "Viagem particular"', "Viagem particular"],
    ['outro: "Outro serviço"', "Outro serviço"]
  ]) {
    assert.ok(script.includes(mapping[0]), `missing prefill mapping for ${mapping[1]}`);
    assert.ok(services.includes(mapping[1]), `mapped option ${mapping[1]} is absent`);
  }
});

test("all WhatsApp destinations use the expected number and safe new-tab attributes", () => {
  const links = [...html.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^\"]*)"[^>]*>/g)];
  assert.ok(links.length >= 8, "expected direct and contextual WhatsApp links");
  for (const match of links) {
    const href = match[1];
    const tag = match[0];
    assert.equal(new URL(href).pathname, "/5517988285557");
    assert.match(tag, /target="_blank"/);
    assert.match(tag, /rel="[^"]*noopener[^"]*noreferrer[^"]*"/);
  }
  assert.match(script, /https:\/\/wa\.me\/5517988285557\?text=\s*"\s*\+\s*encodeURIComponent\(text\)/);
});

test("planner avoids HTML injection sinks and writes dynamic summary as text", () => {
  assert.doesNotMatch(script, /\.innerHTML\s*=/);
  assert.match(script, /content\.textContent\s*=\s*text/);
  assert.match(script, /error\.textContent\s*=\s*message/);
});

test("planner does not persist entries, beacon analytics, or load external JavaScript", () => {
  assert.doesNotMatch(script, /localStorage|sessionStorage|sendBeacon|XMLHttpRequest|\bfetch\s*\(/);
  const externalScripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((src) => !src.startsWith("/"));
  assert.deepEqual(externalScripts, []);
});

test("JSON-LD parses and basic SEO metadata is present", () => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, "JSON-LD script is missing");
  const schema = JSON.parse(match[1]);
  assert.equal(schema["@type"], "LocalBusiness");
  assert.equal(schema.telephone, "+55-17-98828-5557");
  assert.ok(html.includes('<meta name="description"'));
  assert.ok(html.includes('<meta name="twitter:card"'));
  assert.ok(html.includes('<link rel="canonical"'));
});

test("all local HTML asset references exist in dist after build", () => {
  const refs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  const missing = [];
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)) continue;
    const pathname = new URL(ref, "https://local.invalid").pathname;
    const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const target = resolve(dist, relative);
    if (!target.startsWith(dist + sep) || !existsSync(target)) missing.push(ref);
  }
  assert.deepEqual(missing, []);
});

test("build packages 404, privacy, and no-script mobile navigation fallback", () => {
  for (const file of ["index.html", "404.html", "privacidade.html", "noscript.css", "_headers", "robots.txt", "js/main.js"]) {
    assert.ok(existsSync(resolve(dist, file)), `dist/${file} is missing`);
  }
  assert.match(html, /<noscript><link rel="stylesheet" href="\/noscript\.css"><\/noscript>/);
  assert.match(read("cloudflare.config.ts"), /notFoundHandling": "404-page"/);
  assert.match(read("_headers"), /Content-Security-Policy:/);
});
