# Relatório de testes funcionais — Táxi Central Rio Preto LS

**Data:** 22/10/2026
**Escopo:** bateria funcional local da versão e do pacote `dist/`; o adendo ao final registra a publicação posterior e sua verificação no site público. Nenhuma mensagem real foi enviada.

## Resultado

**APROVADO COM PENDÊNCIAS NÃO BLOQUEANTES** para os fluxos locais examinados. Oito verificações estáticas repetíveis passaram, junto com testes manuais funcionais no Chromium e em 11 larguras de viewport. Três defeitos foram reproduzidos, corrigidos e rechecados. Não foi possível confirmar a versão servida em produção, testar outros motores de navegador nem executar ferramentas automatizadas de acessibilidade/performance; essas limitações estão discriminadas abaixo. Este resultado técnico local não representa autorização para publicação oficial.

## Ambiente e procedimentos

- Projeto em `C:\Users\guilherme\Downloads\sitesClientes\taxiLuis`; testes no build local em `127.0.0.1:4173`.
- Navegador: Chromium pelo navegador embutido do Codex. Ferramentas de interação e leitura do DOM foram usadas nos fluxos.
- Runtime disponível: Node.js 24.21.0; `.nvmrc` define 22.18.0. O pacote `cf` requer Node `^22.23.0 || ^24.22.0 || ^26.12.0`, por isso o runtime disponível fica abaixo da faixa declarada.
- `npm run build`, `npm run test:static` (8 testes), `node --check js/main.js`, build CF e dry-run de deploy foram executados após limpar os fixtures temporários. Não se executou `npm run deploy`.
- `npm ci`: concluído após autorizar acesso ao registro; instalou as 110 dependências já fixadas no lockfile, sem adicionar pacotes. Node 24.21.0 emite aviso de engine porque `cf@1.0.0-beta.20` pede `^22.23.0 || ^24.22.0 || ^26.12.0`. Scripts opcionais de `esbuild` e `workerd` foram bloqueados pelo npm, mas build local e dry-run Cloudflare passaram.
- `npm audit --offline`: retornou 0 alertas por usar cache local. A consulta online atual encontrou **7 vulnerabilidades transitivas em ferramentas de desenvolvimento (5 altas, 2 moderadas, 0 críticas)**, relacionadas à árvore de `tailwindcss@3.4.17` (incluindo `braces`, `micromatch`, `fast-glob` e `postcss-selector-parser`). O relatório indicou como correção automática apenas Tailwind CSS 4, uma migração major; nenhuma atualização foi feita no escopo. O advisory consultado diz que `braces <= 3.0.3` está afetado e não lista versão corrigida. Isso pede avaliação/atualização planejada da toolchain, mesmo sem evidência de esses módulos fazerem parte dos assets estáticos publicados.
- Referência do advisory: [GitHub Advisory GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

## Cobertura funcional

| Área | Casos executados | Resultado |
|---|---|---|
| Menu e navegação | Abrir/fechar, clique externo, Escape, navegação por link, quatro cliques rápidos, redimensionar aberto entre 390 e 1024 px | Aprovado |
| Teclado e conteúdo | Tab/Shift+Tab, outline visível, skip link, FAQ via clique e Enter | Aprovado |
| CTAs e serviços | Seis links de prefill e sete opções de serviço, seleção, avanço sem seleção e campo de aeroporto condicional | Aprovado após correções |
| Formulário obrigatório | Campos vazios, espaços, corte por limites de caracteres, trim do nome e foco no primeiro erro | Aprovado |
| Dados e injeção | Apóstrofo, acentos, emoji, quebras de linha e texto `<img ...>`; resumo/mensagem permaneceram texto, sem criar elemento injetado | Aprovado |
| Datas e horários | Limites de mês/ano, ano bissexto, data passada, horário passado no dia atual, 00:00 e horários do dia seguinte | Aprovado |
| Ida e volta | Exibição, limpeza ao desativar, retorno igual/anterior, retorno futuro e campos incompletos | Aprovado |
| Transfer e viagem | Campos de voo/direção condicionalmente, limpeza ao trocar serviço, passageiros 1–5+ e cinco opções de bagagem | Aprovado |
| Mensagem e WhatsApp | Edição, confirmação para substituir, preservação ao recusar, restaurar, texto codificado e número 5517988285557 | Aprovado; abertura interceptada, nenhuma mensagem real enviada |
| JavaScript desativado | Menu móvel exposto como navegação estática, sem botão de menu inoperante; nove seções preservadas | Aprovado |
| Responsividade | Larguras 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 e 1920 px; início e etapas do formulário (30 observações largura/estado) | Sem overflow horizontal |
| Estática e pacote | 8 testes `node:test`: IDs/âncoras, serviços/prefills, WhatsApp, DOM seguro, persistência/JS externo, SEO/JSON-LD, recursos locais, 404/privacidade/noscript/CSP | 8/8 aprovados |

### Interpretação dos limites

As datas foram testadas no relógio local do ambiente em 22/10/2026. `2027-02-29` foi recusado pelo input nativo do Chromium. Para entradas excessivas, `.fill()` do driver tentou contornar `maxlength`; a lógica do app recusou os dados acima do limite e aceitou os valores exatos nos limites 80/200/200/500. Não foram feitas submissões reais.

## Defeitos corrigidos

1. O CTA “Viagens particulares” pré-selecionava “Outro serviço”; agora há opção própria e mapeamento correto.
2. Sem JavaScript, o menu móvel ficava inacessível; foi adicionado fallback `<noscript>` com navegação visível.
3. Em 320 px, o WhatsApp flutuante cobria o CTA secundário do hero; agora fica oculto enquanto o hero ou planejador está visível.

Passos de reprodução, evidência e regressão estão em `RELATORIO_BUGS.md`.

## Segurança, privacidade, acessibilidade e performance

- Oito testes estáticos confirmam destino WhatsApp/atributos de nova aba e codificação do texto, ausência de `innerHTML` no planejador, ausência de storage/analytics/fetch no script e referências estáticas locais presentes.
- Não houve envio de formulário para backend. O link WhatsApp foi interceptado: número, destino `_blank`, `noopener,noreferrer` e payload decodificado foram conferidos.
- Revisão manual de teclado/labels/erros/FAQ e ausência de overflow foi feita. **axe-core, auditoria WCAG completa, medição atualizada de contraste em toda a página, Lighthouse, Core Web Vitals e throttling de rede não foram executados.**
- Não foi possível capturar e salvar screenshots como arquivos no workspace usando a API do navegador disponível. Capturas mobile foram visualizadas durante a execução, mas não são anexos permanentes deste relatório.
- Sem Firefox, WebKit/Safari, aparelhos Android/iOS ou zoom real 200%/400%. Não foram avaliados cabeçalhos HTTP de produção nem comportamento de produção.
- A tentativa de consultar o Worker público não retornou conteúdo verificável neste ambiente. Portanto, produção, domínio, 404, HTTPS/cabeçalhos efetivos e paridade entre código publicado e local continuam não verificados.

## Validação de publicação

- Build local: **APROVADO**.
- Suíte estática local: **APROVADA, 8/8**.
- `cf build`: **APROVADO** (cf CLI; anotação de `EPERM` ao escrever log em diretório global, sem impedir a etapa).
- `cf deploy --dry-run`: **APROVADO**, saiu antes de upload (15 arquivos estáticos no pacote atual).
- `npm audit` online: **PENDENTE** — 7 alertas nas dependências de desenvolvimento; sem correção compatível automaticamente disponível sem migração major. O offline audit dá 0 porque usa cache, portanto não deve ser usado como confirmação de ausência de vulnerabilidades.
- Deploy/commit/push/PR: **não realizados**. O Git da cópia disponível é somente leitura; a tentativa anterior de clone falhou por DNS. Alterações seguem locais, na branch `main`, sem commit.

## Parecer

Não há defeito crítico ou alto reproduzido nos fluxos locais cobertos. O resultado **APROVADO COM PENDÊNCIAS NÃO BLOQUEANTES** vale para o código local. A aprovação final de publicação permanece condicionada aos itens de `CHECKLIST_PRE_PUBLICACAO.md`, especialmente confirmação das alegações, domínio, marca/foto, privacidade e validações em produção.

## Adendo pós-publicação — 22/10/2026

- O commit `f8d935cc4d6e0a9e995f763180c0a116f39dea2f` foi publicado na branch `main` do GitHub.
- O push acionou o build/deploy automático no Cloudflare Workers. Deployment `8a7f4242-cc39-4c51-b647-8808ced2e83b`, versão `5f7f36a9-1105-4caa-8818-e457da9f5beb`, registrado às 16:36:11 UTC.
- A URL pública foi aberta depois da implantação. A página inicial e as sete opções de serviço apareceram; o campo inteiro de data abriu o calendário, a seleção de 23/10/2026 funcionou e o campo de horário abriu as opções em intervalos de 15 minutos.
- Esta revisão de produção não preencheu dados pessoais nem abriu/enviou uma conversa real. Os cabeçalhos HTTP, 404, outros navegadores e aparelhos físicos continuam sem validação.
