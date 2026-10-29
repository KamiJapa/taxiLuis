# Relatório de validação — Táxi Central Rio Preto LS

Data: 29 de outubro de 2026

Escopo: quatro ajustes solicitados no texto de finalização, auditoria local e preparação para revisão.

URL de produção informada: <https://taxiluis.vercel.app/>.

## Resumo

Os quatro ajustes foram implementados no projeto. O build e os 18 testes estáticos passaram. A validação local com Chromium não encontrou overflow nas oito larguras verificadas, erros de console nem falhas no menu e no FAQ.

O domínio público não pôde ser validado nesta execução: a tentativa de acesso foi bloqueada pelo proxy de rede com HTTP 403. As alterações estão apenas no workspace; não houve commit, push nem deploy, conforme solicitado no texto recebido.

## Alterações

| Pedido | Antes | Depois |
|---|---|---|
| Nome no cabeçalho móvel | O cabeçalho mostrava “Táxi Central / Rio Preto LS”. | “LUÍS” aparece ao lado de “Táxi Central” na primeira linha; “Rio Preto LS” e o menu permanecem. |
| Destaque na primeira tela | Não havia destaque de horário antes do H1. | “24 HORAS” aparece centralizado antes do título. O texto não promete chegada imediata. |
| CTA na seção do veículo | “Consultar uma corrida” era um link textual. | É um botão verde `#25D366`, com foco visível e destino para WhatsApp `5517988285557`. |
| Redação de Localização | A seção descrevia apenas corridas em São José do Rio Preto, SP. | Os dois parágrafos agora correspondem à redação fornecida, incluindo região/interestaduais e “Consulte valores, diretamente com o Luís.” |

O fundo azul-marinho/azul, os demais elementos verdes de WhatsApp, a imagem atual do Corolla Cross, os outros CTAs e o telefone `+55 17 98828-5557` foram preservados. A imagem atual `assets/images/corolla-cross-luis-taxi.webp` não foi modificada nesta tarefa; a autenticidade do veículo não foi reavaliada independentemente.

Também alinhei canonical, Open Graph, Twitter Card, `robots.txt` e `sitemap.xml` à URL Vercel informada no pedido. O arquivo README foi atualizado com o endereço e a limitação de verificação pública.

## Arquivos modificados

- `index.html` — cabeçalho, destaque 24 HORAS, botão do veículo e texto de Localização; metadados sociais e canonical.
- `styles.css` — estilo do nome, destaque e estado ativo do CTA.
- `privacidade.html` — canonical e Open Graph.
- `robots.txt` e `sitemap.xml` — URLs da produção Vercel informada.
- `tests/audit.static.test.mjs` — assertions para os novos requisitos e domínio.
- `README.md` — estado da publicação informado.
- `RELATORIO_ENTREGA_FINAL_LUIS.md` — este relatório.

Nenhuma dependência foi adicionada. A página continua em HTML/CSS/JavaScript e Tailwind já existentes.

## Skills e ferramentas

- Skill `frontend-testing-debugging`: consultada e aplicada para definir a validação da interface.
- O plugin Browser não estava disponível nesta sessão; usei Playwright já disponível no ambiente com Chromium local.
- Não usei skills indisponíveis nem instalei ferramentas ou dependências.

## Verificações

| Verificação | Resultado | Evidência/limite |
|---|---|---|
| `npm run build` | APROVADO | Gerou `dist/`. O build emitiu apenas o aviso de que `caniuse-lite` está desatualizado. |
| `npm run test:static` | APROVADO | 18 passaram, 0 falharam. |
| `git diff --check` | APROVADO | Sem erros de whitespace. |
| Identidade e primeira tela | APROVADO | Página local respondeu HTTP 200; título, LUÍS, 24 HORAS e CTA foram encontrados. |
| Botão do veículo | APROVADO | Fundo computado `rgb(37, 211, 102)`; link usa `https://wa.me/5517988285557` com texto pré-preenchido. |
| Responsividade | APROVADO | Chromium em 320, 360, 375, 390, 414, 768, 1024 e 1440 px; `scrollWidth` igual à viewport em todos. |
| Interações | APROVADO | Menu abriu e fechou com Escape; item de FAQ expandiu. O destino dos links de telefone/WhatsApp foi conferido; nenhuma ligação ou mensagem foi iniciada. |
| Console | APROVADO | Nenhum erro de página ou console durante a navegação local. |
| URL pública Vercel | BLOQUEADO | `curl -I -L https://taxiluis.vercel.app/` recebeu HTTP 403 do proxy de rede antes de permitir confirmar o site. Isso não confirma que a Vercel esteja bloqueando visitantes. |
| Outros navegadores e acessibilidade automatizada | PENDENTE | Esta execução verificou Chromium; não executou axe, Firefox, WebKit nem leitor de tela. |

Capturas locais: `/tmp/taxiluis-desktop.png` e `/tmp/taxiluis-mobile.png`.

## Situação

**Pronto para revisão local; publicação pendente.** Para disponibilizar essas mudanças no site público, falta a etapa de publicação autorizada e confirmar o resultado em `https://taxiluis.vercel.app/`. O estado público de acesso sem autenticação continua sem confirmação nesta execução.
