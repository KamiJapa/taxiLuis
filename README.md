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

## Deploy — Cloudflare Pages

Compatibilidade preparada para Pages com integração Git:

- Diretório raiz do projeto: raiz do repositório.
- Comando de build: npm run build.
- Diretório de saída: dist.
- Preset: None / sem framework.
- Node.js para o build: versão 22; .nvmrc fixa 22.18.0.
- Servidor de produção: nenhum.
- Pages Functions, Workers e banco de dados: não utilizados.

1. Envie o conteúdo desta pasta para a branch de produção main do repositório KamiJapa/taxiLuis.
2. No painel Cloudflare, abra Workers & Pages e crie uma aplicação Pages com integração Git.
3. Conecte e autorize a integração do GitHub, selecione KamiJapa/taxiLuis e a branch main.
4. Escolha o preset None e configure npm run build como comando e dist como diretório de saída. Se o painel solicitar uma versão de Node, informe 22.18.0.
5. Inicie o deploy e teste o endereço real *.pages.dev, inclusive no celular. A integração Git do Pages cria novos deploys para pushes na branch de produção e endereços de prévia para outras branches, conforme os controles configurados no painel.
6. Quando houver domínio próprio autorizado, adicione-o em Custom domains nas configurações do projeto e atualize canonical, Open Graph e sitemap com a URL definitiva.

Confira a documentação atual do [Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/), [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) e do arquivo [_headers](https://developers.cloudflare.com/pages/configuration/headers/).

O repositório KamiJapa/taxiLuis estava vazio no momento da preparação. A cópia local já tem branch main e remote origin configurados, sem commits ou push. Para revisar e publicar a primeira versão no GitHub a partir deste diretório:

    git init -b main
    git add -A
    git commit -m "feat: landing page Taxi Central Rio Preto LS"
    git push -u origin main

O init já foi feito nesta cópia e pode ser omitido. O commit e o push não foram realizados nesta preparação.

## Verificação e relatório

Depois de executar npm run build, revisar a pasta dist/ e concluir o fluxo no navegador:

1. Escolher cada serviço e confirmar a seleção antes de avançar.
2. Validar origem, destino, data, horário e retorno.
3. Confirmar os campos condicionais de transfer e ida e volta.
4. Editar a mensagem, voltar, alterar os dados e escolher se a mensagem personalizada deve ser mantida ou atualizada.
5. Restaurar a mensagem e conferir que o link final usa https://wa.me/5517988285557?text= com encodeURIComponent.
6. Abrir a conversa de WhatsApp e conferir o texto, sem enviá-lo automaticamente.
7. Revisar menu, âncoras, foco pelo teclado, mobile, HTTPS e console depois do deploy.

Nenhum deploy foi realizado. A hospedagem Cloudflare, branch de produção, URL Pages e domínio ainda não foram confirmados. A marca oficial e autorização para usar fotos reais também estão pendentes.

Verificações executadas nesta preparação:

- npm run build: passou; criou dist/ com index, CSS, JavaScript, imagens, robots.txt e _headers.
- node --check js/main.js e node --check scripts/build.mjs: passaram.
- npm install --package-lock-only --ignore-scripts --offline: passou; conferiu o package-lock existente, 74 pacotes e zero vulnerabilidades reportadas.
- Checagens estáticas: passaram para JSON-LD válido, três etapas, seis opções de serviço, âncoras internas, caminhos locais, URL e codificação do WhatsApp e ausência de armazenamento ou chamadas de rede.
- Revisão no navegador e teste HTTP local: não concluídos. A automação do Windows bloqueou a leitura da URL atual, e o sandbox negou a conexão por socket com o servidor local.
- Testes depois do deploy, incluindo HTTPS, layout em aparelhos reais e console: pendentes porque nenhum deploy ocorreu.

## Informações a confirmar antes da publicação oficial

- Arquivos oficiais das duas versões da logomarca e autorização de uso.
- Fotografias do Corolla Cross 2026 do Luís, com autorização, ou aprovação expressa da ilustração gerada.
- Cor real do veículo, caso o cliente queira divulgá-la.
- URL pages.dev ou domínio próprio definitivo.
- Branch de produção escolhida no painel e autorização para publicar.
