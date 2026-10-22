# Relatório de reformulação UX/UI — Táxi Central Rio Preto LS

**Data:** 22/10/2026  
**Projeto:** Táxi Central Rio Preto LS — Luís  
**Repositório:** https://github.com/KamiJapa/taxiLuis  
**Worker:** https://taxi-central-rio-preto-ls.japa-kamitm.workers.dev/

## A. Diagnóstico inicial

A versão anterior direcionava o CTA do hero para um planejador de três etapas. Para iniciar um contato, o visitante precisava escolher um serviço e preencher dados de viagem antes de chegar à mensagem. O fluxo dependia de JavaScript e os CTAs usavam âncoras `#planejar` ou textos que prometiam planejamento.

Isso criava etapas desnecessárias para pessoas que só queriam falar com o motorista. O conteúdo também precisava evitar apresentar como confirmadas informações comerciais ainda pendentes, como atendimento 24 horas e regiões de cobertura.

## B. Mudanças implementadas

- `index.html`: hero com proposta direta, localização, WhatsApp e telefone; CTAs de serviço ligados a conversas contextuais; planejamento removido; FAQ e chamadas atualizados; metadados e JSON-LD revisados.
- `js/main.js`: removido o código do planejador; mantidos menu móvel acessível, Escape, ano do rodapé e comportamento do CTA flutuante.
- `styles.css`: removidos estilos de formulário/calendário/resumo; mantidos o tema escuro e dourado, hierarquia editorial e layout responsivo; adicionados foco visível e estilos dos contatos diretos.
- `404.html` e `privacidade.html`: conteúdo alinhado à solicitação por contato direto, sem formulário nem promessa de corrida confirmada.
- `tests/audit.static.test.mjs`: testes do planejador antigo substituídos por 17 verificações para CTAs, links, acessibilidade básica, privacidade, 404, metadados e artefatos da build.
- `README.md` e `package.json`: descrição e instruções ajustadas ao fluxo atual.

## C. Fluxo anterior versus novo

| Versão anterior | Nova versão |
|---|---|
| Abrir planejador, avançar por três etapas e fornecer dados antes do contato | Um toque no link abre a conversa do WhatsApp |
| JavaScript necessário para montar o pedido | Link HTML nativo; funciona sem JavaScript |
| Mensagem longa baseada em formulário | Saudação curta opcional; cada serviço pode acrescentar contexto |

O site não confirma uma corrida e não envia mensagens automaticamente.

## D. Preservação visual

O tema escuro com detalhes dourados, o estilo editorial, a ilustração existente do veículo e a estrutura responsiva foram preservados. A mudança concentra a hierarquia na marca, na frase principal, no WhatsApp e no telefone. A ilustração continua identificada como ilustrativa.

## E. Testes

| Verificação | Resultado |
|---|---|
| `npm run build` | **APROVADO** — gerou `dist/`; aviso informativo de `caniuse-lite` desatualizado. |
| `npm run test:static` | **APROVADO** — 17 aprovados, 0 falhas. |
| `node --check js/main.js` | **APROVADO**. |
| `git diff --check` | **APROVADO** após remover linhas vazias extras no fim dos arquivos. |
| `npm ls --depth=0` | **APROVADO** — `cf@1.0.0-beta.20`, `tailwindcss@3.4.17`, `wrangler@4.151.3`. |
| `npx wrangler deploy --dry-run` | **APROVADO** — empacotou 15 arquivos de `dist`; sem upload. |
| Playwright Chromium | **APROVADO PARCIALMENTE** — menu e Escape; links de WhatsApp conferidos sem envio; 10 larguras (320, 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px) sem overflow horizontal; CTA visível na primeira tela mobile testada. |
| Firefox | **BLOQUEADO** — o processo do Firefox não iniciou (`exitCode=3221225506`). |
| WebKit | **PENDENTE** — não repetido nesta reformulação. |
| axe-core 4.13.0 | **APROVADO PARCIALMENTE** — 0 violações reportadas em início, privacidade e 404. O axe marcou verificações de contraste e `aria-prohibited-attr` como incompletas; avaliação automatizada não demonstra conformidade WCAG integral. |
| Lighthouse | **BLOQUEADO** — CLI não disponível no projeto e o ambiente não consegue acessar o registry para obter ferramentas. Nenhuma pontuação foi estimada. |
| `npm audit` | **BLOQUEADO** — `ENOTFOUND registry.npmjs.org`. A consulta atual não pôde atualizar o estado dos avisos. |
| Resposta HTTP pública | **BLOQUEADA** — a requisição HTTPS terminou com “Este host não é conhecido”; o ambiente não resolveu o host para conferir conteúdo e cabeçalhos. |

Node disponível: `v24.21.0`; `.nvmrc` indica `22.23.0`. O build foi executado com a versão instalada.

## F. Segurança e acessibilidade

Os links externos para WhatsApp mantêm `rel="noopener noreferrer"`; os CTAs principais são links nativos para telefone e WhatsApp. A navegação móvel aceita teclado e Escape. Não foi encontrado armazenamento local, analytics ou envio de dados no JavaScript revisado.

O relatório de auditoria anterior registrava sete alertas transitivos em dependências de desenvolvimento (cinco altos e dois moderados). Como `npm audit` não alcançou o registry nesta rodada, não é possível confirmar se os alertas permanecem iguais nem listar advisories atuais com evidência nova. As ferramentas estão na cadeia de build, e não foram encontradas nos arquivos estáticos publicados. Recomenda-se repetir `npm audit` com acesso ao registry e planejar uma atualização compatível de Tailwind 3; não foi usado `npm audit fix --force` nem feita migração para Tailwind 4.

O axe não substitui inspeção manual. Permanecem por verificar ampliação/zoom, leitores de tela, operação real por teclado em todos os componentes e dispositivos físicos.

## G. Pendências comerciais

- Confirmar horários de atendimento, inclusive madrugada e atendimento 24 horas.
- Aprovar as modalidades e regiões efetivamente atendidas.
- Fornecer logotipo oficial e fotografia autorizada do veículo, se desejado.
- Confirmar texto final e responsável/contato para a política de privacidade.
- Escolher o domínio definitivo antes de atualizar canonical, sitemap e indexação.

Informações não confirmadas não foram apresentadas como fatos. Não foram criados depoimentos, avaliações, tarifas ou certificações.

## H. Pendências técnicas

- Reexecutar axe-core com inspeção manual de contraste e foco.
- Executar os fluxos completos no Firefox e WebKit; Firefox permaneceu bloqueado nesta máquina.
- Executar Lighthouse mobile e desktop quando a ferramenta estiver disponível e registrar pontuações e métricas reais.
- Repetir `npm audit` com rede para o registry e avaliar os alertas vigentes.
- Revalidar a resposta HTTP pública após o deploy para confirmar 404 e cabeçalhos.

## I. Estado de publicação

O commit `925ebb0a74623ab8033aaed1433a68fa122914c2` foi enviado à branch `main` do GitHub. O Workers Builds recebeu o evento `push_event` para esse mesmo commit e concluiu build e deploy com `build_outcome: success`.

Cloudflare registrou deployment `fef9fd10-60b4-44db-81f5-4ca901aa615c`, versão `e2b84f01-8061-425c-9811-5e417aa983b1`, com 100% do tráfego, às 18:04:33 UTC de 22/10/2026. A requisição à URL pública não pôde ser confirmada nesta sessão por falha de resolução DNS (“Este host não é conhecido”); o status do plano de controle confirma o deployment, mas não substitui uma verificação HTTP do site.

O CLI local do Wrangler (`4.151.3`) não está autenticado nesta sessão. O `--dry-run` local passou. O deployment de produção foi feito pelo Workers Builds conectado ao GitHub. Nenhuma alteração de DNS ou domínio foi realizada.

## J. Próximas ações

1. Repetir a verificação HTTP do site público quando a resolução DNS estiver disponível.
2. Apresentar a experiência atualizada ao Luís para revisão do conteúdo comercial.
3. Resolver as pendências comerciais e de acessibilidade antes da entrega definitiva.
4. Atualizar domínio e metadados somente após escolha do domínio oficial.
