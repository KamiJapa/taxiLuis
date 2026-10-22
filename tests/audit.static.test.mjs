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
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

const whatsappLinks = (source = html) => [...source.matchAll(/<a\b[^>]*href="(https:\/\/wa\.me\/[^"]*)"[^>]*>/g)];

test("hero mostra a marca, localização e CTA direto para WhatsApp", () => {
  const hero = html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.ok(hero.includes("Sua corrida começa"));
  assert.match(hero, /href="https:\/\/wa\.me\/5517988285557\?text=/);
  assert.match(hero, /Solicitar corrida pelo WhatsApp/);
  assert.match(hero, /href="tel:\+5517988285557"/);
  assert.ok(html.includes("Táxi em São José do Rio Preto"));
});

test("não há planejador, formulário obrigatório ou referências ao fluxo removido", () => {
  assert.doesNotMatch(html, /id="trip-form"|<form\b|#planejar|data-prefill|data-step|travel-date|passenger-name/);
  assert.doesNotMatch(script, /trip-form|data-prefill|travelDate|passengerName|window\.open/);
  assert.doesNotMatch(read("styles.css"), /planner__|planner-step|choice-card|picker-calendar|step-actions/);
});

test("IDs são únicos e âncoras internas resolvem", () => {
  assert.equal(new Set(ids).size, ids.length, "ID duplicado");
  const existing = new Set(ids);
  const missing = [...html.matchAll(/\bhref="#([^" ]+)"/g)].map((m) => m[1]).filter((id) => !existing.has(id));
  assert.deepEqual(missing, []);
});

test("CTAs dos seis serviços abrem conversa contextual no WhatsApp", () => {
  const cards = [...html.matchAll(/<article class="service-card[\s\S]*?<\/article>/g)].map((m) => m[0]);
  assert.equal(cards.length, 6);
  for (const card of cards) {
    assert.match(card, /href="https:\/\/wa\.me\/5517988285557\?text=/);
    assert.match(card, /Consultar pelo WhatsApp/);
  }
});

test("todos os links WhatsApp usam o número correto e atributos seguros", () => {
  const links = whatsappLinks();
  assert.ok(links.length >= 14, `links encontrados: ${links.length}`);
  for (const [tag, href] of links) {
    assert.equal(new URL(href).pathname, "/5517988285557");
    assert.match(tag, /target="_blank"/);
    assert.match(tag, /rel="[^"]*noopener[^"]*noreferrer[^"]*"/);
  }
});

test("número de telefone permite chamada nativa", () => {
  assert.ok([...html.matchAll(/href="tel:\+5517988285557"/g)].length >= 2);
  assert.ok(html.includes("(17) 98828-5557"));
});

test("menu móvel mantém controles acessíveis e Escape", () => {
  assert.match(html, /<button class="menu-toggle"[^>]*aria-expanded="false"[^>]*aria-controls="main-nav"/);
  assert.match(html, /<nav class="main-nav" id="main-nav" aria-label="Navegação principal">/);
  assert.match(script, /event\.key === "Escape"/);
  assert.match(script, /mainNav\.classList\.toggle\("is-open", open\)/);
});

test("HTML contém metadados SEO e JSON-LD válido", () => {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, "JSON-LD ausente");
  const schema = JSON.parse(match[1]);
  assert.equal(schema["@type"], "LocalBusiness");
  assert.equal(schema.telephone, "+55-17-98828-5557");
  assert.ok(html.includes('<meta name="description"'));
  assert.ok(html.includes('<meta name="twitter:card"'));
  assert.ok(html.includes('<meta property="og:url"'));
  assert.ok(html.includes('<link rel="canonical"'));
});

test("metadados e estrutura não afirmam horário comercial não confirmado", () => {
  assert.doesNotMatch(html, /24 horas|Madrugada mediante agendamento|Disponibilidade 24/);
  assert.match(html, /Região mediante consulta/);
  assert.match(html, /disponibilidade para sua região/);
});

test("FAQ descreve o contato direto e não o antigo formulário", () => {
  const faq = html.match(/<section class="faq[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.ok(faq.includes("Como confirmo horário e disponibilidade?"));
  assert.ok(faq.includes("O clique confirma uma corrida?"));
  assert.doesNotMatch(faq, /planejador|formulário/);
});

test("página de privacidade corresponde ao comportamento atual", () => {
  const privacy = read("privacidade.html");
  assert.ok(privacy.includes("não possui formulário de solicitação"));
  assert.ok(privacy.includes("mensagem automaticamente"));
  assert.doesNotMatch(privacy, /planejador|dados de origem|destino, datas/);
  assert.ok(privacy.includes("Google Fonts"));
  assert.ok(privacy.includes("Cloudflare"));
});

test("404 aponta para início e WhatsApp sem falar em planejamento", () => {
  const notFound = read("404.html");
  assert.ok(notFound.includes("Voltar ao início"));
  assert.ok(notFound.includes("Solicitar corrida pelo WhatsApp"));
  assert.doesNotMatch(notFound, /planejar sua viagem/);
});

test("sem JavaScript, CTA e telefone continuam links HTML nativos", () => {
  assert.match(html, /<noscript><link rel="stylesheet" href="\/noscript\.css"><\/noscript>/);
  assert.match(html, /href="https:\/\/wa\.me\/5517988285557\?text=/);
  assert.match(html, /href="tel:\+5517988285557"/);
  assert.doesNotMatch(html, /onclick=/i);
});

test("JavaScript não persiste dados nem executa analytics ou chamadas de rede", () => {
  assert.doesNotMatch(script, /localStorage|sessionStorage|sendBeacon|XMLHttpRequest|\bfetch\s*\(/);
  assert.doesNotMatch(script, /data-prefill|trip-form|window\.open/);
});

test("links externos usam proteção contra acesso à janela de origem", () => {
  const links = [...html.matchAll(/<a\b[^>]*href="(https?:\/\/[^\"]+)"[^>]*>/g)];
  assert.ok(links.length > 0);
  for (const [tag] of links) {
    assert.match(tag, /target="_blank"/);
    assert.match(tag, /rel="[^"]*noopener[^"]*noreferrer[^"]*"/);
  }
});

test("assets locais referenciados pela página existem após build", () => {
  const refs = [...html.matchAll(/\b(?:href|src)="([^\"]+)"/g)].map((m) => m[1]);
  const missing = [];
  for (const ref of refs) {
    if (/^(?:https?:|mailto:|tel:|#|data:|javascript:)/i.test(ref)) continue;
    const pathname = new URL(ref, "https://local.invalid").pathname;
    const relative = pathname === "/" ? "index.html" : pathname === "/privacidade" ? "privacidade.html" : pathname.replace(/^\/+/, "");
    const target = resolve(dist, relative);
    if (!target.startsWith(dist + sep) || !existsSync(target)) missing.push(ref);
  }
  assert.deepEqual(missing, []);
});

test("build inclui 404, privacidade, headers e fallback sem JavaScript", () => {
  for (const file of ["index.html", "404.html", "privacidade.html", "noscript.css", "_headers", "robots.txt", "js/main.js"]) {
    assert.ok(existsSync(resolve(dist, file)), `dist/${file} ausente`);
  }
  assert.match(read("cloudflare.config.ts"), /notFoundHandling": "404-page"/);
  assert.match(read("wrangler.jsonc"), /"not_found_handling": "404-page"/);
  assert.match(read("_headers"), /Content-Security-Policy:/);
  assert.match(read("_headers"), /Strict-Transport-Security: max-age=31536000/);
});
