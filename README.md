# Táxi Central Rio Preto LS — Luís

Landing page em português para o Táxi Central Rio Preto LS, com contato direto pelo WhatsApp e telefone. O site não possui formulário, não envia mensagens automaticamente e não confirma corridas.

## Funcionalidades

- Solicitação de corrida em um toque pelo WhatsApp, sem formulário.
- Telefone clicável e links contextuais para iniciar uma conversa.
- Menu móvel, FAQ nativo e CTAs que funcionam sem JavaScript.
- Identidade azul e superfícies claras, com detalhes dourados discretos.
- Imagem ilustrativa com “TAXI” na placa; não é uma foto do veículo real.
- Páginas de privacidade e 404 para o Worker estático.

## Arquivos

- `index.html`, `styles.css`, `tailwind.css`, `noscript.css`, `js/main.js`: interface e interações.
- `assets/`: ilustração do veículo e ícone genérico provisório.
- `404.html`, `privacidade.html`, `robots.txt`, `sitemap.xml`, `_headers`: conteúdo e configuração de arquivos estáticos.
- `cloudflare.config.ts`: configuração de execução usada pelo `cf` CLI.
- `wrangler.jsonc`: configuração de execução lida pelo deploy conectado do Workers Builds (`npx wrangler deploy`).
- `wrangler.config.ts`: opções de build para o `cf` CLI.
- `scripts/build.mjs`: monta os arquivos finais em `dist/`.
- `screenshots/`: capturas de evidência da avaliação responsiva.
- `tests/`: verificações estáticas e fixtures temporários de auditoria.
- Relatórios: `RELATORIO_TESTES_COMPLETO.md`, `RELATORIO_BUGS.md`, `CHECKLIST_PRE_PUBLICACAO.md`, `PENDENCIAS_CLIENTE.md`.

## Build e verificações

Use Node 22.23.0, conforme `.nvmrc` e os requisitos de `cf`.

```sh
npm ci
npm run build
npm run test:static
```

`npm run build` gera `tailwind.css` e preenche `dist/`. `npm run test:static` executa as verificações estáticas existentes.

Para iniciar localmente depois do build: `npx wrangler dev --local --port 8787`.

## Cloudflare Workers

- Nome: `taxi-central-rio-preto-ls`.
- Endereço atual: <https://taxi-central-rio-preto-ls.japa-kamitm.workers.dev/>.
- Configuração: `cloudflare.config.ts` (deploy via `cf`) e `wrangler.jsonc` (deploy integrado atual via Wrangler), saída estática em `dist/`. Manter as opções de tratamento HTML e 404 alinhadas nos dois arquivos.
- Verificar o pacote sem publicar: `cf build` ou `npx wrangler deploy --dry-run --assets ./dist`.
- O Workers Builds do repositório está configurado para `npm run build` e `npx wrangler deploy --name taxi-central-rio-preto-ls --compatibility-date 2026-10-06 --assets ./dist`; o `wrangler.jsonc` fornece ao comando os modos de HTML e 404.
- `npm run deploy` publica no Worker principal da conta autenticada. Use esse comando somente quando a publicação principal estiver aprovada.
- Para uma avaliação isolada, use `npx wrangler deploy --temporary --name taxi-central-rio-preto-ls-preview --compatibility-date 2026-10-06 --assets ./dist`. Isso requer acesso de rede ao Cloudflare; não publica no Worker principal.

O endereço `workers.dev` é temporário até a escolha de um domínio oficial. Canonical, Open Graph e sitemap apontam para o endereço público atual. A integração de produção acompanha `main`; a branch de avaliação deste trabalho não substitui a publicação principal.

## Identidade, imagem e conteúdo

A ilustração do SUV branco foi preservada como imagem não documental e recebeu apenas a inscrição “TAXI” na placa ilustrativa. O arquivo original da ilustração continua em `assets/images/corolla-cross-ilustrativo.webp`. A foto/referência original enviada pelo cliente não está neste workspace; substitua a ilustração somente quando a imagem autorizada estiver disponível. O conteúdo atual afirma apenas o serviço de táxi e a cidade informados. A marca oficial e a aprovação final do novo azul ainda estão pendentes.

## Estado da publicação

A última publicação principal e as pendências anteriores estão registradas em `RELATORIO_REFORMULACAO_UX_LUIS.md`. O trabalho de avaliação atual está detalhado em `RELATORIO_ENTREGA_FINAL_LUIS.md`; publicação pública temporária depende de egress Cloudflare no ambiente.
