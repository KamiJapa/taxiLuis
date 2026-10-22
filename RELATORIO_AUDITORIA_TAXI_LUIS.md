# Auditoria e preparação para publicação — Táxi Central Rio Preto LS

**Data:** 22/10/2026
**Endereço publicado que serviu de referência:** `https://taxi-central-rio-preto-ls.japa-kamitm.workers.dev/`
**Resultado:** **PUBLICAÇÃO PENDENTE**. A revisão local e o empacotamento foram concluídos. Esta auditoria não fez deploy, não conectou domínio, não alterou configurações externas e não enviou commit.

## Resumo

O planejador foi revisado para exigir os dados necessários, validar datas/horários e montar uma mensagem clara para o WhatsApp sem enviar nada automaticamente. Adicionei uma página 404, informações de privacidade, metadados sociais e pequenos ajustes de acessibilidade, segurança e contraste. O menu móvel, os principais caminhos do planejador e a renderização responsiva foram conferidos localmente.

O pacote compilou e o `cf deploy --dry-run` terminou sem upload. A versão pública continua sendo a anterior, publicada em 20/10/2026. A resposta HTTP de produção, os cabeçalhos publicados e o comportamento 404 em produção permanecem sem confirmação.

## Lista de auditoria solicitada

| # | Verificação | Status | Resultado e evidência |
|---|---|---|---|
| 01 | 404 amigável | **PENDENTE** | `404.html` foi criado, copiado para `dist/` e configurado com `notFoundHandling: "404-page"`. A rota inválida do Worker publicado não pôde ser confirmada sem consulta funcional/deploy da versão publicada. |
| 02 | Botões e CTAs | **APROVADO** | Os CTAs locais levam às seções correspondentes; os contatos usam o telefone `+55 17 98828-5557`. Nenhuma conversa foi aberta nem mensagem enviada durante a auditoria. |
| 03 | Links e âncoras | **APROVADO** | A verificação local não encontrou âncoras internas quebradas; links em nova aba incluem `noopener noreferrer`. URLs externas foram verificadas quanto à forma, sem validação de disponibilidade dos destinos. |
| 04 | Cases ou projetos publicados | **NÃO APLICÁVEL** | A página de transporte não apresenta portfólio de cases. |
| 05 | Formulário e confirmação | **NÃO APLICÁVEL** | Não há envio de formulário ao servidor. O fluxo prepara e deixa a pessoa revisar uma mensagem antes de decidir abrir o WhatsApp. |
| 06 | Página de agradecimento | **NÃO APLICÁVEL** | Não há submissão web nem confirmação de corrida pelo site. |
| 07 | FAQ | **APROVADO** | Há seis perguntas em elementos nativos de disclosure (`details/summary`); a primeira foi aberta durante a revisão local. |
| 08 | Alegações comerciais | **PENDENTE** | Atendimento 24 horas, atendimento todos os dias, madrugada mediante agendamento e destinos atendidos precisam de confirmação de quem opera o serviço. Não inventei tarifas, avaliações ou garantias. |
| 09 | CTA móvel fixo | **APROVADO** | CTA flutuante com área de toque adequada e safe-area; some quando o planejador está em foco para não cobrir os campos. Comportamento conferido em viewport móvel local. |
| 10 | `robots.txt` | **PENDENTE** | Existe e permite rastreamento (`Allow: /`). Confirmar a liberação de indexação para o endereço definitivo; `robots.txt` não substitui `noindex` nem controle de acesso. |
| 11 | Title SEO | **APROVADO** | Título único, em português, identificando o serviço e São José do Rio Preto. |
| 12 | Meta description | **APROVADO** | Descrição da oferta local presente no HTML e coerente com os serviços apresentados. |
| 13 | Canonical e compartilhamento social | **PENDENTE** | Canonical, `og:url` e imagem social apontam provisoriamente para `workers.dev`. Substituir pela URL definitiva antes da publicação oficial; a ilustração social atual é 3:2. |
| 14 | Endereço e mapa | **NÃO APLICÁVEL** | Nenhum endereço físico foi fornecido; não foi inventado endereço ou mapa. |
| 15 | Depoimentos e avaliações | **NÃO APLICÁVEL** | Não há avaliações ou depoimentos publicados. Nenhum foi criado. |
| 16 | Acessibilidade e imagens | **APROVADO** | HTML semântico, labels associados, FAQ nativo, skip link, foco visível, imagens com texto alternativo que identifica a ilustração e menu móvel operável por teclado. Menu testado com Escape. Amostras de texto pequeno ficaram entre 5,05:1 e 5,56:1 após os ajustes. |
| 17 | Dados estruturados locais | **PENDENTE** | JSON-LD passou em `JSON.parse` e não inventa endereço. Confirmar telefone, área atendida e alegações de disponibilidade com o responsável pelo serviço antes de declarar o schema pronto. |
| 18 | Privacidade e transparência | **PENDENTE** | `privacidade.html` descreve o processamento local e a abertura voluntária do WhatsApp, além de Google Fonts e Cloudflare. Revisão jurídica e confirmação do contato/termos finais ainda necessárias. |
| 19 | Analytics e rastreamento | **NÃO APLICÁVEL** | A auditoria estática não encontrou analytics, pixels, cookies ou armazenamento local do formulário. Não foram adicionados rastreadores. |
| 20 | Foto e identidade visual | **PENDENTE** | A ilustração de SUV foi mantida claramente identificada como referência, não como foto do veículo do Luís. A marca oficial não estava entre os arquivos; substituir pelo logo aprovado e obter aprovação da ilustração ou fotografia autorizada. A cor real não foi confirmada. |

## Verificações técnicas

### Fluxo do planejador

- Serviço precisa ser escolhido antes de avançar; as seis opções foram selecionadas localmente.
- Nome, origem, destino, data, horário, passageiros e bagagem são validados. Nome é aparado e limites de caracteres são informados no HTML.
- Data anterior ao dia local e horário passado no mesmo dia são recusados.
- Campos de aeroporto (direção, companhia e número do voo) aparecem condicionalmente.
- Campos de ida e volta aparecem quando ativados; retorno anterior à ida e horário de retorno anterior no mesmo dia são recusados.
- Um fluxo válido chegou à revisão, apresentou resumo e gerou mensagem com os dados do trajeto. A opção de cinco ou mais passageiros inclui confirmação de capacidade/disponibilidade, sem prometer acomodação.
- A mensagem personalizada é preservada ao cancelar a atualização; a pessoa pode restaurar o texto gerado.
- O link final é preparado para `wa.me` com codificação de URL. Nenhuma mensagem é enviada automaticamente.
- Campos de data e horário são inputs nativos de largura integral; no viewport móvel usado, mediram 312 × 50 px. Não resta popover que limite o clique a um ícone.

### Viewports e teclado

Foi registrada ausência de rolagem horizontal nestas larguras: 320, 375, 390, 768, 1024, 1440 e 1920 px. A captura mobile de 390 px mostrou o título, a descrição e os dois CTAs empilhados sem corte. O menu fechou com Escape e o foco visual está definido para teclado.

Essas verificações são manuais/DOM no navegador local. Playwright instalado no projeto, axe-core, Lighthouse e aparelhos físicos não estavam disponíveis; nenhum pacote foi adicionado para a auditoria. Portanto, a aprovação de acessibilidade é limitada aos itens observados e não equivale a uma certificação WCAG completa.

### Build, segurança e desempenho

- `npm run build`: passou; gerou `dist/` com páginas, CSS, JavaScript, imagem, favicon, `robots.txt` e `_headers`.
- `node --check js/main.js` e `node --check scripts/build.mjs`: passaram.
- `npm ls --depth=0`: passou com as dependências instaladas.
- `npm audit --offline`: 0 vulnerabilidades reportadas usando o cache local; a base de avisos não foi atualizada pela rede durante esta auditoria.
- `cf build`: terminou. O Wrangler reportou `EPERM` ao tentar escrever logs fora do workspace, mas concluiu a etapa de build.
- `cf deploy --dry-run`: código de saída 0; leu 14 arquivos estáticos e saiu antes do upload. Mesmo aviso de log `EPERM`.
- O Worker local configura `404-page` e `auto-trailing-slash`. `_headers` inclui CSP, `nosniff`, `DENY`, política de referrer, permissões de câmera/microfone/localização e cache estático. A documentação Cloudflare confirma suporte a `_headers` para Static Assets; cabeçalhos efetivamente recebidos pelo Worker não puderam ser medidos.
- A ilustração webp tem 102.776 bytes (cerca de 100,4 KiB). Lighthouse, Web Vitals e medição de produção não foram feitos; otimização/performance de campo fica pendente.
- `.nvmrc` pede Node 22.18.0; esse runtime não estava instalado. Build realizado com Node 24.21.0. O aviso Browserslist/caniuse-lite está desatualizado e não foi atualizado para evitar alteração de lockfile/dependências fora do escopo.

## Arquivos preparados

- `index.html`: textos, metadata, estrutura de dados, campos requeridos e conteúdo neutro para o site final.
- `js/main.js`: validações e mensagem do planejador, campos condicionais, menu e CTA flutuante.
- `styles.css`: campos nativos integrais, foco visível, responsividade e contraste.
- `cloudflare.config.ts`: página 404 e tratamento de HTML para Static Assets.
- `scripts/build.mjs`: inclui 404 e privacidade no diretório estático.
- `404.html` e `privacidade.html`: páginas novas.
- `README.md`: comandos e estado da preparação atualizados.

## Pendências antes da aprovação de publicação

1. Confirmar atendimento 24 horas, madrugada, áreas e serviços oferecidos.
2. Escolher o domínio definitivo, atualizar canonical e metadados sociais e decidir a indexação.
3. Entregar/aprovar a logomarca e aprovar a ilustração ou fornecer foto do carro com autorização.
4. Revisar a página de privacidade e o texto de atendimento.
5. Com autorização para publicar, consultar o estado final do Worker, verificar 404 e cabeçalhos HTTP, executar Lighthouse/axe ou equivalentes e só então fazer deploy.

## Estado do Git e publicação

Não foi possível abrir um checkout isolado/branch de auditoria neste ambiente: a raiz gerenciada disponível fica acima do repositório e o `.git` local é somente leitura. A tentativa de obter outro clone falhou por indisponibilidade de DNS/rede. As mudanças estão no diretório de trabalho local da branch `main`, sem commit ou push; o `HEAD` remoto não foi alterado. O deploy também foi deliberadamente omitido, de modo que o Worker público continua na versão anterior. O conteúdo local atual foi comparado ao `main` remoto antes das edições; as mudanças deste relatório não foram publicadas.
