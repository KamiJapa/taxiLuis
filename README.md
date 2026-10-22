# Táxi Central Rio Preto LS — Luís

Landing page em português com planejador de viagens em três etapas. O formulário valida localmente os dados, mostra um resumo e prepara uma mensagem para a pessoa revisar e abrir no WhatsApp. O site não confirma corridas, não envia dados a um backend e não armazena os campos do formulário.

## Funcionalidades

- Serviços de transporte urbano, intermunicipal, aeroporto, executivo, viagens particulares e outras solicitações.
- Formulário com datas e horários acessíveis pela área inteira do campo, validação de ida e volta e informações condicionais de transfer.
- Mensagem revisável antes da abertura do WhatsApp.
- Menu móvel, navegação por teclado, FAQ nativo e fallback de navegação quando JavaScript está desativado.
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

O commit `f8d935c` foi publicado em `main` e implantado no Worker `taxi-central-rio-preto-ls`. A página pública e os seletores de data/horário foram conferidos após o deploy. O relatório de testes registra os resultados, avisos de dependências e itens ainda pendentes. Nenhum dado de formulário foi enviado durante os testes.
