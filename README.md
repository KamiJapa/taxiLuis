# Táxi Central Rio Preto LS — Luís

Landing page em português para o Táxi Central Rio Preto LS. O CTA principal abre diretamente uma conversa no WhatsApp do Luís; nenhum formulário ou dado de viagem é exigido. O site não confirma corridas nem envia mensagens automaticamente.

## Funcionalidades

- Solicitação de corrida em um toque pelo WhatsApp, sem formulário ou cadastro.
- Links contextuais para cada modalidade; telefone com chamada direta.
- Menu móvel acessível, FAQ nativo e navegação sem JavaScript para os CTAs.
- Páginas de privacidade e 404 para o Worker estático.

## Arquivos

- `index.html`, `styles.css`, `tailwind.css`, `noscript.css`, `js/main.js`: interface e interações.
- `assets/`: ilustração do veículo e ícone genérico provisório.
- `404.html`, `privacidade.html`, `robots.txt`, `_headers`: conteúdo e configuração de arquivos estáticos.
- `cloudflare.config.ts`: configuração de execução usada pelo `cf` CLI.
- `wrangler.jsonc`: configuração de execução lida pelo deploy conectado do Workers Builds (`npx wrangler deploy`).
- `wrangler.config.ts`: opções de build para o `cf` CLI.
- `scripts/build.mjs`: monta os arquivos finais em `dist/`.
- `tests/`: verificações estáticas e fixtures temporários de auditoria.
- Relatórios: `RELATORIO_TESTES_COMPLETO.md`, `RELATORIO_BUGS.md`, `CHECKLIST_PRE_PUBLICACAO.md`, `PENDENCIAS_CLIENTE.md`.

## Build e verificações

Use a versão Node definida em `.nvmrc` (22.23.0 ou compatível com `cf`).

```sh
npm ci
npm run build
npm run test:static
```

O `npm run build` gera `tailwind.css` e preenche `dist/`. `npm run test:static` executa os testes do Node sem instalar dependências adicionais.

## Cloudflare Workers

- Nome: `taxi-central-rio-preto-ls`.
- Endereço atual: <https://taxi-central-rio-preto-ls.japa-kamitm.workers.dev/>.
- Configuração: `cloudflare.config.ts` (deploy via `cf`) e `wrangler.jsonc` (deploy integrado atual via Wrangler), saída estática em `dist/`. Manter as opções de tratamento HTML e 404 alinhadas nos dois arquivos.
- Verificar o pacote sem publicar: `cf build` e `cf deploy --dry-run`.
- O Workers Builds do repositório está configurado para `npm run build` e `npx wrangler deploy --name taxi-central-rio-preto-ls --compatibility-date 2026-10-06 --assets ./dist`; o `wrangler.jsonc` fornece ao comando os modos de HTML e 404.
- Publicar explicitamente: `cf deploy` (ou `npm run deploy`).

O endereço `workers.dev` é temporário até a escolha de um domínio oficial. Depois disso, atualizar canonical, metadados sociais, sitemap e indexação. O push de `main` acionou o build e o deploy automático no Cloudflare; o resultado foi conferido no endereço público.

## Identidade, imagem e conteúdo

A imagem principal é uma ilustração gerada para o layout e está identificada como ilustrativa; não é fotografia do veículo real. A logomarca oficial ainda precisa ser fornecida. Confirmar disponibilidade, áreas e modalidades de atendimento antes de tratar essas informações como aprovadas para publicação definitiva. Não há endereço, tarifas ou depoimentos inventados.

## Estado da publicação

A publicação mais recente é registrada no relatório `RELATORIO_REFORMULACAO_UX_LUIS.md`.
