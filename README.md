# Táxi Central Rio Preto LS — Luís

Landing page estática com identidade preta, dourada e branca e planejador de solicitações em três etapas. O passageiro escolhe o serviço, informa o trajeto, revisa ou edita a mensagem e decide quando abri-la no WhatsApp do motorista. O site não confirma corridas nem armazena os dados do formulário.

## Estrutura

- index.html: conteúdo, metadados e dados estruturados locais.
- styles.css: identidade visual e ajustes responsivos.
- src/input.css e tailwind.config.js: entrada e configuração do Tailwind CSS.
- js/main.js: menu e planejador de viagens em JavaScript puro.
- assets/images/corolla-cross-ilustrativo.webp: ilustração principal gerada para este projeto.
- assets/icons/taxi.svg: ícone genérico de táxi usado como favicon provisório.
- _headers: cabeçalhos de segurança e cache para Cloudflare Pages.
- robots.txt: permite a indexação depois que o cliente aprovar a publicação.
- scripts/build.mjs: copia a página e os assets para dist/.

## Requisitos e build

Use Node.js 22 ou superior. O site servido em produção é somente HTML, CSS, JavaScript e imagens estáticas; Node.js é usado apenas para compilar o Tailwind e montar a pasta de saída.

    npm ci
    npm run build

O build do Tailwind gera tailwind.css. O script de build reúne os arquivos publicáveis em dist/. Abra dist/index.html por um servidor estático local para a revisão final; não é necessário backend.

## Imagens, marca e licenças

assets/images/corolla-cross-ilustrativo.webp foi gerada com o imagegen integrado para compor o layout. Prompt registrado:

    Create a photorealistic premium automotive editorial image for a Brazilian executive taxi landing page. Wide landscape 3:2 composition, a pearl-white Toyota Corolla Cross in the Brazilian 2025 facelift style, front three-quarter view, parked in a refined dark charcoal studio with subtle warm gold light accents and a clean polished floor. The white SUV is the single dominant subject and fully visible, positioned slightly right of center, with generous dark negative space on the left for website text. Accurate compact crossover proportions, contemporary grille and headlamp treatment, no visible badges or readable text, no people, no watermark, no fake taxi signage, realistic lighting and restrained premium atmosphere. This is a visual illustration only and must not be represented as the client's actual car.

A imagem é uma ilustração gerada por IA, não uma fotografia editorial, não é prova da versão exata do veículo e não representa o carro do Luís. O carro informado pelo cliente continua sendo Corolla Cross 2026; a cor real ainda não foi confirmada. O texto visível identifica a imagem ilustrativa.

As referências editoriais foram consultadas para orientar o tipo de composição. A página do Vale do Paraopeba descreve a reestilização 2025; a página do AutoPapo descreve os detalhes da nova dianteira; a listagem da Central Veículos identifica um Corolla Cross XRE 2025 branco; e a página da Maggi Toyota respondeu sem conteúdo textual acessível na consulta. Nenhuma imagem dessas páginas foi baixada, copiada ou usada no site. A disponibilidade de visualização não concede licença comercial:

- [Folha Vale do Paraopeba — linha 2025](https://valedoparaopeba.com.br/corolla-cross-tem-reestilizacao-e-novos-equipamentos-na-linha-2025/)
- [Maggi Toyota — Corolla Cross](https://www.maggitoyota.com.br/corolla-cross)
- [Central Veículos Cascavel — anúncio XRE 2025 branco](https://www.centralveiculoscascavel.com.br/veiculo/toyota/toyota-corolla-cross-20-xre-cvt-aut-2025-68999)
- [AutoPapo — Corolla Cross 2025](https://autopapo.com.br/noticia/toyota-corolla-cross-2025/)

As duas logomarcas oficiais citadas no briefing não estavam incluídas nos anexos recebidos; só havia os arquivos de texto do briefing. O cabeçalho usa o nome comercial em texto, sem redesenhar a marca. O favicon atual é um ícone genérico de táxi, não uma versão da logomarca. Antes da publicação oficial, inserir os arquivos da marca aprovados pelo cliente e derivar o favicon deles. Fotografias reais do veículo só devem substituir a ilustração depois de recebidas com autorização de uso.

## SEO e domínio

O título, a descrição, os metadados Open Graph e os dados estruturados usam apenas informações fornecidas. Não há endereço físico, avaliações, tarifas, URL canônica, sitemap ou domínio presumido. A imagem Open Graph não recebeu URL absoluta: adicionar og:image, canonical e sitemap.xml depois de conhecer o domínio definitivo. Após o primeiro deploy, registre a URL *.pages.dev efetivamente criada ou o domínio próprio autorizado e atualize esses itens.

## Deploy — Cloudflare Workers

O site está publicado como Worker estático, com os arquivos gerados em `dist/`:

- Worker: `taxi-central-rio-preto-ls`.
- URL pública: https://taxi-central-rio-preto-ls.japa-kamitm.workers.dev.
- Diretório raiz do projeto: raiz do repositório.
- Build: `npm run build`.
- Deploy: `npm run deploy` (executa `cf deploy`).
- Node.js: 22; `.nvmrc` fixa 22.18.0.
- Arquivos de configuração: `cloudflare.config.ts` e `wrangler.config.ts`.
- Cloudflare Access permanece desativado para permitir acesso público ao site.

O Worker foi publicado em 20/10/2026. Para deploys automáticos por push, conecte o GitHub em Workers & Pages > Worker > Settings > Builds > Connect, autorize o app Cloudflare para o repositório KamiJapa/taxiLuis e selecione `main`. Depois, use `npm run build` como Build command e `npm run deploy` como Deploy command. A autorização GitHub é uma etapa única da conta; até que seja concluída, novos pushes não iniciam builds no Cloudflare. Ative Preview builds se quiser implantações de branches de teste.

Consulte a documentação de [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/), [configuração de build](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/) e [Static Assets](https://developers.cloudflare.com/workers/static-assets/).

## Verificação e relatório

Depois de executar npm run build, revisar a pasta dist/ e concluir o fluxo no navegador:

1. Escolher cada serviço e confirmar a seleção antes de avançar.
2. Validar origem, destino, data, horário e retorno.
3. Confirmar os campos condicionais de transfer e ida e volta.
4. Editar a mensagem, voltar, alterar os dados e escolher se a mensagem personalizada deve ser mantida ou atualizada.
5. Restaurar a mensagem e conferir que o link final usa https://wa.me/5517988285557?text= com encodeURIComponent.
6. Abrir a conversa de WhatsApp e conferir o texto, sem enviá-lo automaticamente.
7. Revisar menu, âncoras, foco pelo teclado, mobile, HTTPS e console depois do deploy.

O deploy do Worker foi concluído. A integração GitHub para builds automáticos e um domínio próprio ainda não foram configurados. A marca oficial e autorização para usar fotos reais também estão pendentes.

Verificações executadas nesta preparação:

- npm run build: passou; criou dist/ com index, CSS, JavaScript, imagens, robots.txt e _headers.
- node --check js/main.js e node --check scripts/build.mjs: passaram.
- npm install --package-lock-only --ignore-scripts --offline: passou; conferiu o package-lock existente, 74 pacotes e zero vulnerabilidades reportadas.
- Checagens estáticas: passaram para JSON-LD válido, três etapas, seis opções de serviço, âncoras internas, caminhos locais, URL e codificação do WhatsApp e ausência de armazenamento ou chamadas de rede.
- `cf build` e `cf deploy --dry-run`: passaram; o Worker estático incluiu a pasta `dist/`.
- `cf deploy`: passou; versão `e618ebaf-c7ca-4196-a1af-4a5b23c80cf4` publicada na URL acima.
- Revisão visual no navegador, aparelhos reais e console após deploy: pendentes.

## Informações a confirmar antes da publicação oficial

- Arquivos oficiais das duas versões da logomarca e autorização de uso.
- Fotografias do Corolla Cross 2026 do Luís, com autorização, ou aprovação expressa da ilustração gerada.
- Cor real do veículo, caso o cliente queira divulgá-la.
- Autorização do app Cloudflare para integrar o repositório GitHub e automatizar builds da branch `main`.
- Domínio próprio, se o cliente quiser usar um endereço personalizado.
