# Relatório final de validação — Táxi Central Rio Preto LS

**Data:** 22/10/2026  
**Commit analisado:** `0f037e2806541c4428da0e93b260e691df5d8700`  
**Commit publicado:** `26e4804bfac04ad7ee6f9e1ea991bf3c2a60370f`  
**URL pública:** https://taxi-central-rio-preto-ls.japa-kamitm.workers.dev/  
**Veredito:** **PUBLICAÇÃO PENDENTE — CORREÇÕES NECESSÁRIAS**

## A. Resultado geral

A versão inicialmente auditada é o commit acima. Depois das verificações, as correções foram enviadas para `main` no GitHub; o Workers Builds recebeu o evento de push e concluiu build/deploy com sucesso. Cloudflare registrou deployment `bf555178-557b-4097-9001-f70cb5b713e6`, versão `5d5bd917-fe32-4983-94dc-773baabd6a87`, 100% do tráfego, em 22/10/2026 às 17:09:27 UTC. As verificações locais antes do envio passaram: build, 8/8 testes estáticos, sintaxe de `js/main.js`, `git diff --check` e dry-run do Wrangler (15 arquivos, sem upload).

Na versão pública anterior ao novo deploy, uma URL inexistente respondeu 404 sem corpo; HSTS não foi enviado; e a CSP bloqueou o preconnect do Google Fonts. A configuração conectada do Workers Builds executa Wrangler diretamente e não consome as opções de asset definidas para o `cf` CLI. As correções foram publicadas. Não foi possível revalidar a resposta HTTP após o deploy porque o DNS do domínio não resolveu neste ambiente (`Este host não é conhecido`).

## B. Testes e ambiente

- Windows, Node.js 24.21.0. `.nvmrc` especifica 22.23.0; a faixa declarada pelo pacote `cf` inclui 22.23.0, mas não 24.21.0.
- `npm ls --depth=0`: passou. Build, testes estáticos, `node --check js/main.js`, `git diff --check`, `cf build` e `npx wrangler deploy --dry-run ...`: passaram. A suíte contou 8 aprovados e 0 reprovados. `cf build` emitiu aviso de módulo ES no `cloudflare.config.ts`, mas terminou com sucesso.
- Playwright exploratório em Chromium e WebKit: navegação, menu, FAQ, sete serviços, seis prefills, campos condicionais, larguras 320–1920 px, navegação sem JS e cenários adversos observados. Sem overflow nos viewports examinados. Não são testes em aparelho físico.
- Firefox não iniciou (`spawn UNKNOWN`). Clique automatizado em controles nativos de data/hora não foi consistente em ambos os motores; preenchimento direto funcionou. O registro anterior documenta calendário e horário testados interativamente em Chromium. Não afirmo cobertura completa dos 17 fluxos em todos os motores.
- Uma execução anterior de axe na produção identificou contraste do crédito no rodapé e problemas de landmarks/nome acessível. Correções locais foram feitas, mas não reexecutadas com axe local nesta rodada porque a ferramenta não estava disponível.
- `npm audit` final não atualizou porque o registry falhou por DNS (`ENOTFOUND`). A última consulta online anterior encontrou 7 alertas (5 altos, 2 moderados). Lighthouse não foi executado: ferramenta não disponível e rede indisponível. Não há pontuações ou métricas reais a reportar.

| Resultado | Quantidade / situação |
|---|---|
| Aprovado | 8 testes estáticos; build, sintaxe, diff, `cf build`, dry-run; áreas funcionais exploratórias descritas acima |
| Reprovado na versão anterior | 1 falha reproduzida: 404 público vazio; 2 cabeçalhos/configuração discrepantes (HSTS ausente, CSP incompleta) |
| Publicação | Workers Builds concluiu com sucesso; revalidação HTTP pós-deploy bloqueada por DNS |
| Bloqueado/incompleto | Firefox, axe local após as correções, Lighthouse, zoom real 200/400%, aparelhos físicos e matriz completa de fluxos em três motores |

## C. Segurança e dependências

A auditoria online anterior listou 7 vulnerabilidades transitivas em ferramentas de desenvolvimento: 5 altas e 2 moderadas, zero críticas. Caminhos incluem `tailwindcss@3.4.17`, `chokidar@3.6.0 → braces@3.0.3`, `fast-glob@3.3.3 → micromatch@4.0.8 → braces@3.0.3` e `postcss-nested@6.2.0 → postcss-selector-parser@6.1.4`. A correção automática indicada requer atualização major do Tailwind; não rodei `npm audit fix --force` nem migrei para Tailwind 4. A última tentativa não conseguiu atualizar a consulta pelo registry devido a DNS.

Esses pacotes compõem as ferramentas de build e não foram encontrados nos assets estáticos publicados, reduzindo risco de execução no navegador, mas mantendo risco na máquina/CI de build. Recomenda-se planejar atualização compatível em mudança própria e repetir regressões. Referência de advisory consultada: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

| Resposta HTTP pública | Observação | Preparação local |
|---|---|---|
| HTTPS | A URL workers.dev usa HTTPS | Sem mudança |
| `Content-Type` | Correto nos arquivos testados; vazio na rota 404 | Wrangler com 404 personalizado |
| CSP | Presente, mas `connect-src 'self'` bloqueia preconnect de Google Fonts | Permite `fonts.googleapis.com` e `fonts.gstatic.com` |
| `X-Content-Type-Options` | `nosniff` | Mantido |
| `X-Frame-Options` | `DENY` | Mantido |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Mantido |
| `Permissions-Policy` | Câmera, microfone e geolocalização restringidos | Mantido |
| HSTS | Ausente na resposta pública | `max-age=31536000` em `_headers` |
| Cache-Control | HTML revalida; assets 1 ou 30 dias | Mantido |

Os headers foram incluídos no deploy bem-sucedido. Uma nova medição HTTP é necessária para confirmar que a resposta pública final entrega as diretivas esperadas.

## D. Acessibilidade

Axe na página pública reportou link de crédito sem sublinhado/contraste suficiente (1,66:1), topo sem landmark nomeado, CTA flutuante fora de landmark e divergência de nome acessível no CTA superior em WebKit. Ajustes locais: sublinhado do crédito, landmark nomeado, `<aside>` para contato flutuante e rótulo do CTA com o texto visível. Não foi possível repetir axe localmente após os ajustes. A versão em produção ainda mantém o estado anterior. Houve revisão manual parcial de teclado, foco, labels, navegação, menu Escape e layout. Isso não certifica WCAG 2.2 AA; faltam axe nos estados completos, zoom real 200/400%, áreas de toque e validação em todos os motores.

## E. Performance

**Lighthouse não executado.** Sem notas de Performance, Accessibility, Best Practices ou SEO e sem LCP, CLS, FCP, TBT ou INP. Registrar esses resultados em ambiente que tenha Lighthouse e Chromium funcionais; não foram inventados scores nem feitas otimizações sem medição.

## F. Cloudflare

- Worker publicado: `taxi-central-rio-preto-ls.japa-kamitm.workers.dev`.
- Antes da correção, uma rota inexistente retornava HTTP 404 com `Content-Length: 0`, sem `Content-Type` e sem corpo. Após o commit acima, Workers Builds concluiu build/deploy e Cloudflare registrou a versão `5d5bd917-fe32-4983-94dc-773baabd6a87` ativa com 100% do tráfego. A confirmação da rota e dos headers pós-deploy ficou bloqueada porque o hostname não resolveu via DNS no ambiente de auditoria.
- O comando do Workers Builds usa `npx wrangler deploy ... --assets ./dist`; ele não usa a configuração TypeScript do `cf` CLI. O novo `wrangler.jsonc` configura `not_found_handling: "404-page"` e `html_handling: "auto-trailing-slash"`; o dry-run reconheceu o arquivo e leu 15 assets.
- `/privacidade.html` redireciona para `/privacidade`; canonical e link interno locais foram alinhados a `/privacidade`.
- O deploy foi feito automaticamente após o push autorizado. Não houve alteração de DNS nem conexão de domínio personalizado.

## G. Privacidade e SEO

O formulário monta os dados em memória. A inspeção do código não encontrou armazenamento local, cookies, analytics, pixels, `fetch`, XHR ou beacon. Google Fonts é externo. WhatsApp só abre por ação do usuário; não foi enviada mensagem real. A política descreve esse fluxo, mas requer revisão jurídica e confirmação de contato/responsável.

Canonical e metadados sociais usam workers.dev temporário; `robots.txt` permite rastreamento. O domínio não foi inventado nem alterado. Após escolha: atualizar canonical, `og:url`, imagem social, Twitter Cards, sitemap e dados estruturados; decidir indexação com Luís.

## H. Checklist profissional (20 itens)

| # | Item | Estado | Evidência/pendência |
|---:|---|---|---|
| 1 | Página 404 | **PENDENTE** | Produção responde 404 vazio. |
| 2 | CTAs | **APROVADO** | Destinos conferidos; sem mensagem enviada. |
| 3 | Links personalizados | **APROVADO** | Âncoras locais verificadas. |
| 4 | Cases reais | **NÃO APLICÁVEL** | Sem portfólio de cases. |
| 5 | Agradecimento | **NÃO APLICÁVEL** | Sem submissão a backend. |
| 6 | Breadcrumbs | **NÃO APLICÁVEL** | Landing page simples. |
| 7 | FAQ | **APROVADO** | FAQ nativo conferido. |
| 8 | Promessas de atendimento | **PENDENTE** | Confirmar operação, horários, áreas e serviços. |
| 9 | CTA fixo mobile | **APROVADO** | Viewports móveis verificados. |
| 10 | robots.txt | **PENDENTE** | Permite indexação; decidir para domínio oficial. |
| 11 | Titles únicos | **APROVADO** | Title presente; rever páginas após deploy. |
| 12 | Meta descriptions | **APROVADO** | Presente no HTML. |
| 13 | Open Graph/Twitter | **PENDENTE** | URLs temporárias. |
| 14 | Mapas/rotas | **NÃO APLICÁVEL** | Endereço não fornecido. |
| 15 | Avaliações autênticas | **NÃO APLICÁVEL** | Nenhuma publicada. |
| 16 | Textos alternativos | **APROVADO** | Imagem tem alt; aprovação da imagem pendente. |
| 17 | SEO local | **PENDENTE** | Confirmar telefone, área e operação para schema. |
| 18 | Privacidade | **PENDENTE** | Revisão jurídica e contato final. |
| 19 | Analytics | **NÃO APLICÁVEL** | Nenhum encontrado no código. |
| 20 | Fotos reais autorizadas | **PENDENTE** | Aprovar ilustração ou fornecer imagem autorizada e logo. |

## Pendências do Luís

1. Escolher domínio e decidir indexação.
2. Aprovar marca/logo e ilustração, ou fornecer imagem autorizada.
3. Confirmar serviços, regiões, horário e atendimento noturno.
4. Confirmar telefone WhatsApp.
5. Aprovar conteúdo e afirmações comerciais.
6. Revisar privacidade e confirmar contato/responsável aplicável.

## Arquivos alterados

`README.md`, `_headers`, `index.html`, `privacidade.html`, `styles.css`, `tests/audit.static.test.mjs`, novo `wrangler.jsonc` e este relatório.

## Veredito

**APROVADO COM PENDÊNCIAS NÃO BLOQUEANTES.** Build e suíte estática passaram; GitHub e Cloudflare confirmam o commit e o deploy. A correção de 404/headers foi implantada, mas a resposta HTTP final não pôde ser retestada por falha DNS no ambiente. Lighthouse, Firefox e axe após correção permanecem pendentes, assim como domínio e aprovações comerciais. Nenhuma mensagem real foi enviada.
