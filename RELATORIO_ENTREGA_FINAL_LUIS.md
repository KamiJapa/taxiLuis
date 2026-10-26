# Relatório de entrega para avaliação — Táxi Central Rio Preto LS — Luís

Data da revisão: 26 de outubro de 2026  
Branch preparada: `preview/blue-identity-luis-2026-10`  
Commit de implementação: `45d1ac28d4de00a1fd2d72692868883eb35716e3` (`Prepare blue taxi site evaluation branch`).

## Resumo executivo

Foi aplicada ao site existente uma nova identidade azul com áreas claras, mantido o contato direto pelo WhatsApp e removidas modalidades que os documentos do projeto ainda marcavam como pendentes de confirmação. O botão principal continua visível no primeiro viewport móvel.

O build, os testes estáticos, a validação HTML, a auditoria axe e a medição Lighthouse local passaram. A publicação pública de avaliação não foi concluída: a rede do ambiente bloqueou a chamada ao Cloudflare. O draft do ambiente agora inclui os domínios necessários para retentar a publicação; ainda precisa ser salvo e publicado nas configurações.

## Alterações visuais

- Cabeçalho e rodapé em azul-marinho `#0C2340`, hero azul `#123B70`, seções em branco-gelo `#F5F8FC` e azul claro, com dourado `#D6B77C` restrito a detalhes.
- Botões primários azuis, estados de foco visíveis e ícones SVG no lugar de glifos que apareciam como quadrados.
- Fonte remota removida; o site usa a pilha de fontes do sistema.
- O layout mantém as seções existentes e alterna fundos escuros e claros.

### Comparação visual com o conceito

| Ponto | Resultado implementado |
|---|---|
| Paleta e ritmo | Faixas navy, azul e claras, com dourado pontual, conforme a direção pedida. |
| Hero e CTA | Headline local, WhatsApp e telefone mantidos no topo; o CTA cabe no primeiro viewport móvel. |
| Tipografia | Hierarquia e espaçamento reproduzidos; usa fontes locais para não depender de um serviço externo. |
| Veículo | Mantida a ilustração existente e editada apenas a placa ilustrativa para “TAXI”; nenhuma fotografia do cliente foi inventada. |
| Serviços e texto | Conteúdo do conceito que sugeria serviços, números ou alegações não confirmados foi descartado. A cópia permanece limitada ao táxi, cidade e contato informados. |

## Alterações funcionais

- O CTA principal, os links das seções, os links de telefone e WhatsApp e o FAQ continuam com comportamento nativo.
- A seta no rodapé do hero agora navega para a introdução; ícones de seta e WhatsApp são SVG.
- WhatsApp preserva o número já verificado no repositório: `+55 17 98828-5557`. O clique abre a conversa; não envia mensagem nem confirma corrida automaticamente.
- A navegação móvel abre, fecha pelo teclado (`Escape`) e fecha após selecionar uma seção.
- Aeroporto, viagens entre cidades, transporte executivo e outras modalidades não confirmadas foram removidos da página e das perguntas frequentes.

## Veículo

O original `assets/images/corolla-cross-ilustrativo.webp` foi preservado. A nova versão `assets/images/corolla-cross-ilustrativo-taxi.webp` é uma ilustração WebP com “TAXI” na placa ilustrativa, em 1536 × 1024 e cerca de 79 KB (o original tem cerca de 101 KB). A página identifica a imagem como ilustração, sem alegar que ela retrata o carro real do Luís.

A imagem de referência/fotografia original enviada pelo cliente não estava anexada ao workspace. Para usá-la no lugar da ilustração, é necessário anexar o arquivo autorizado.

## SEO

- Title, description, Open Graph, Twitter Card, canonical e JSON-LD local usam a URL `workers.dev` já existente; não foi criado domínio fictício.
- `robots.txt` agora referencia `sitemap.xml`, que contém a home e a página de privacidade.
- O H1 inclui “Táxi em São José do Rio Preto”; imagens têm dimensões e texto alternativo.
- O conteúdo não promete posições de busca nem anuncia áreas ou serviços pendentes.

## Acessibilidade

- axe-core 4.14.0: nenhuma violação nas regras automatizadas WCAG 2.0/2.1 A/AA, WCAG 2.2 AA e best-practice executadas.
- `html-validate`: `index.html`, `404.html` e `privacidade.html` sem erros após corrigir landmarks, legenda da imagem e quebras do telefone.
- Playwright confirmou foco por teclado, menu, Escape, FAQ e ausência de overflow horizontal nos dez widths testados.
- Esses resultados automatizados não constituem declaração de conformidade integral WCAG. Não foi possível testar leitor de tela nem dispositivos físicos.

## Performance

Lighthouse 13.5.0, execução local em preset mobile Chromium, uma medição:

| Categoria | Resultado |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Métricas da execução: FCP 0,9 s; LCP 1,5 s; TBT 0 ms; CLS 0; Speed Index 0,9 s. São resultados de laboratório local, não métricas de campo ou garantia para outros dispositivos e redes.

## Segurança

- CSP foi restringida a recursos próprios após remover as fontes externas. Não foram adicionados analytics, cookies de rastreamento ou credenciais.
- `npm audit` reporta 11 vulnerabilidades nas ferramentas de desenvolvimento (5 altas e 6 moderadas). Atualizações compatíveis foram aplicadas ao lockfile, mas não eliminaram os avisos. A correção integral indicada pelo npm exige atualização major de Tailwind para 4.3.3 e alteração major do `cf`; não foi usada atualização `--force` nem migração incompatível.
- Os arquivos estáticos não carregam dependências de runtime npm.

## Testes e evidências

| Verificação | Resultado |
|---|---|
| `npm run build` | Passou. |
| `npm run test:static` | 17 passaram; 0 falharam. |
| `html-validate index.html 404.html privacidade.html` | Passou, sem erros. |
| Parsing de `sitemap.xml` | XML válido. |
| axe-core no Chromium | 0 violações automatizadas. |
| Playwright no Chromium | Home 200; privacidade 200; página inexistente 404; menu, FAQ e 13 âncoras internas verificados; sem erros de console/rede. |
| Larguras Playwright | 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px; sem overflow horizontal. |
| Firefox/WebKit | Não executados: os downloads do Playwright receberam `403 Domain forbidden`. |
| `npm audit` | 11 avisos restantes, detalhados em Segurança. |

Capturas reais feitas no Chromium local:

- [Desktop — primeiro viewport, 1440 px](screenshots/evidence-desktop-first-viewport.png)
- [Mobile — primeiro viewport, 390 px](screenshots/evidence-mobile-first-viewport.png)
- [Desktop — página completa, 1440 px](screenshots/evidence-desktop-1440.png)
- [Mobile — página completa, 390 px](screenshots/evidence-mobile-390.png)

## GitHub

- Repositório: `KamiJapa/taxiLuis`.
- `main` e o remoto estavam no commit base `ee929daeb3b409017637d6e4fc52fab00a3eee18` antes do trabalho.
- A branch de avaliação foi criada para manter `main` intacta. O push desta branch será confirmado após o registro deste relatório.
- Nenhum force push foi usado; nenhum outro repositório foi alterado.

## Cloudflare

- `wrangler deploy --dry-run --name taxi-central-rio-preto-ls-preview ...` passou e empacotou 17 arquivos.
- `wrangler whoami` confirmou que não há sessão Cloudflare autenticada nesta máquina.
- `wrangler deploy --temporary` falhou com `fetch failed` por bloqueio de rede. Não foi gerada URL pública e a versão principal não foi alterada.
- O draft do ambiente foi salvo com os destinos `api.cloudflare.com`, `*.workers.dev`, `cdn.playwright.dev` e `playwright.download.prss.microsoft.com`. O save confirmou `requires_publish: true`; ele não aplica a rede à máquina atual.
- Para retentar a publicação temporária, salve as mudanças nas configurações do ambiente e publique o ambiente; depois, reexecute o deploy e valide a URL gerada.

## Pendências

- Salvar e publicar o draft de egress do ambiente; então repetir o deploy temporário e os testes Firefox/WebKit.
- Anexar a imagem de referência/fotografia original autorizada, se deve substituir a ilustração.
- Luís aprovar a paleta azul e o design antes de qualquer substituição da publicação principal.
- Fornecer a logomarca oficial e concluir a revisão comercial/jurídica da política de privacidade.
- Reavaliar as vulnerabilidades restantes em uma tarefa própria de atualização major compatível.

## Aprovação

O site continua em estado de avaliação. A paleta e o design ainda dependem da aprovação do Luís. Nenhuma mensagem foi enviada ao cliente e nenhuma publicação principal foi feita.

Mensagem sugerida para encaminhar ao Luís, depois que a URL pública temporária estiver disponível:

> Luís, preparei uma versão de avaliação do site com a identidade azul e contato direto pelo WhatsApp. A imagem do carro continua identificada como ilustração. Quando puder, veja a versão e me diga se aprova as cores e o visual; a foto de referência original ainda está pendente.
