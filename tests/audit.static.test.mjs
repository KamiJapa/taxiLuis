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
  assert.match(hero, /<p class="hero__availability">24 HORAS<\/p>/);
  assert.ok(hero.includes("Táxi em São José do"));
  assert.match(hero, /href="https:\/\/wa\.me\/5517988285557\?text=/);
  assert.match(hero, /Solicitar corrida pelo WhatsApp/);
  assert.match(hero, /href="tel:\+5517988285557"/);
  assert.match(hero, /Fale diretamente com o Luís pelo WhatsApp\./);
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

test("serviço confirmado e CTAs usam contato direto no WhatsApp", () => {
  assert.match(html, /Corridas de táxi/);
  assert.match(html, /href="https:\/\/wa\.me\/5517988285557\?text=/);
  assert.match(html, /Falar com o Luís/);
  assert.doesNotMatch(html, /Aeroportos e hotéis|Viagens entre cidades|Transporte executivo|Viagens particulares/);
});

test("todos os links WhatsApp usam o número correto e atributos seguros", () => {
  const links = whatsappLinks();
  assert.ok(links.length >= 8, `links encontrados: ${links.length}`);
  for (const [tag, href] of links) {
    assert.equal(new URL(href).pathname, "/5517988285557");
    assert.match(tag, /target="_blank"/);
    assert.match(tag, /rel="[^"]*noopener[^"]*noreferrer[^"]*"/);
  }
});

test("blocos verdes, contato e foto do Corolla Cross", () => {
  assert.match(html, /class="hero__contact"[\s\S]*?<p class="hero__contact-name">Luís<\/p>[\s\S]*?Conversa direta/);
  assert.doesNotMatch(html.match(/<section class="hero__facts"[\s\S]*?<\/section>/)?.[0] ?? "", /Combine seu trajeto|Consulte disponibilidade/);
  assert.match(html, /class="service-feature"[\s\S]*?Solicite sua corrida[\s\S]*?class="button button--whatsapp"/);
  assert.match(html, /class="faq__contact-panel"[\s\S]*?Enviar uma pergunta/);
  assert.match(html, /class="faq__list"/);
  const buttons = [...html.matchAll(/<a\b([^>]*class="[^"]*\bbutton\b[^"]*"[^>]*)href="(https:\/\/wa\.me\/[^\"]*)"[^>]*>/g)];
  assert.ok(buttons.length >= 6, `botões WhatsApp: ${buttons.length}`);
  assert.ok(buttons.every(([, tag]) => /\bbutton--whatsapp\b/.test(tag)));
  assert.match(html, /class="direct-contact__phone" href="tel:\+5517988285557"><strong>Ligue(?:&nbsp;|\s)para(?:&nbsp;|\s)\(17\)(?:&nbsp;|\s)98828(?:&#8209;|-)5557<\/strong>/);
  assert.match(html, /assets\/images\/corolla-cross-luis-taxi\.webp/);
  assert.doesNotMatch(html, /ilustração|não é uma foto|não é uma fotografia/i);
  const css = read("styles.css");
  assert.match(css, /\.button--whatsapp\s*\{[^}]*background:\s*#25d366/i);
  assert.match(css, /\.button--whatsapp\s*\{[^}]*text-transform:\s*uppercase/i);
  assert.match(css, /\.hero__facts strong\s*\{\s*text-transform:\s*uppercase/);
  assert.match(css, /\.hero__facts small\s*\{\s*text-transform:\s*none/);
  assert.match(css, /\.service-feature h3\s*\{\s*text-transform:\s*uppercase/);
  assert.match(css, /\.service-feature p\s*\{\s*text-transform:\s*none/);
  assert.match(read("styles.css"), /\.faq__list details\s*\{[^}]*border-color/);
});

test("número de telefone permite chamada nativa", () => {
  assert.ok([...html.matchAll(/href="tel:\+5517988285557"/g)].length >= 2);
  assert.match(html, /\(17\)(?:&nbsp;|\s)98828(?:&#8209;|-)5557/);
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

test("metadados e estrutura usam apenas serviço e área confirmados", () => {
  assert.match(html, /class="wordmark__name">Táxi Central <b class="wordmark__owner">LUÍS<\/b><\/span>\s*<span class="wordmark__place">Rio Preto <i>LS<\/i>/);
  const vehicleCta = html.match(/<section class="vehicle[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(vehicleCta, /class="button button--whatsapp vehicle__cta" href="https:\/\/wa\.me\/5517988285557\?text=/);
  assert.match(vehicleCta, /Consultar uma corrida/);
  const location = html.match(/<section class="regions[\s\S]*?<\/section>/)?.[0] ?? "";
  assert.match(location, /O serviço informado é de transporte de passageiros e corridas\/viagens de táxi em São José do Rio Preto e região, inclusive interestaduais\./);
  assert.match(location, /Consulte valores, diretamente com o Luís\./);
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
  assert.ok(privacy.includes("não solicita arquivos de fonte a provedores externos"));
  assert.ok(privacy.includes("Cloudflare"));
  assert.doesNotMatch(privacy, /Google Fonts|Manrope/);
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
  for (const file of ["index.html", "404.html", "privacidade.html", "noscript.css", "_headers", "robots.txt", "sitemap.xml", "js/main.js", "assets/images/corolla-cross-luis-taxi.webp"]) {
    assert.ok(existsSync(resolve(dist, file)), `dist/${file} ausente`);
  }
  assert.match(read("cloudflare.config.ts"), /notFoundHandling": "404-page"/);
  assert.match(read("wrangler.jsonc"), /"not_found_handling": "404-page"/);
  assert.match(read("_headers"), /Content-Security-Policy:/);
  assert.match(read("_headers"), /Strict-Transport-Security: max-age=31536000/);
  assert.match(read("robots.txt"), /Sitemap: https:\/\/taxiluis\.vercel\.app\/sitemap\.xml/);
  assert.match(read("sitemap.xml"), /<loc>https:\/\/taxiluis\.vercel\.app\/privacidade<\/loc>/);
});
