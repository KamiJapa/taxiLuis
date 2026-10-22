# Checklist para publicação final

**Estado após auditoria local de 22/10/2026.** `APROVADO` significa verificado no código/pacote local, não necessariamente na URL de produção.

| # | Item | Estado | Critério/pendência |
|---:|---|---|---|
| 1 | Build e arquivos locais | **APROVADO** | Build, testes estáticos e dry-run passaram; dry-run não fez upload. |
| 2 | Conteúdo e navegação | **APROVADO** | Links/IDs únicos e menu testados localmente. |
| 3 | Fluxo principal de solicitação | **APROVADO** | Serviço, validações, revisão e montagem de mensagem. |
| 4 | Casos de entrada maliciosa e limites | **APROVADO** | Texto tratado como texto; comprimentos máximos validados. |
| 5 | Submissão em servidor | **NÃO APLICÁVEL** | O site não envia formulário a backend; conversa só abre por ação da pessoa. |
| 6 | Pagamento | **NÃO APLICÁVEL** | Não existe fluxo de pagamento. |
| 7 | WhatsApp e privacidade do fluxo | **APROVADO** | Link/payload conferidos com abertura interceptada; mensagem real não enviada. |
| 8 | Disponibilidade/alegações comerciais | **PENDENTE** | Confirmar atendimento 24 horas, madrugada mediante agendamento, áreas e serviços. |
| 9 | CTA móvel e datas/horários | **APROVADO** | Sobreposição em 320 px corrigida; seletor publicado de data/horário aberto e usado no navegador. |
| 10 | Indexação e robots | **PENDENTE** | `robots.txt` permite indexação. Confirmar intenção para domínio definitivo. |
| 11 | Title e description | **APROVADO** | Presentes no HTML local. |
| 12 | SEO social/canonical | **PENDENTE** | Substituir URL temporária `workers.dev` pelo domínio final. |
| 13 | Domínio e configuração pública | **PENDENTE** | Escolher/conectar domínio e validar DNS, HTTPS e canonical após autorização de publicação. |
| 14 | Endereço físico | **NÃO APLICÁVEL** | Nenhum endereço foi fornecido; não inventar. |
| 15 | Depoimentos/avaliações | **NÃO APLICÁVEL** | Nenhum publicado ou fabricado. |
| 16 | Acessibilidade e compatibilidade | **PENDENTE** | Axe em produção encontrou contraste/landmarks corrigidos localmente; ainda requer axe após correção, Firefox, zoom real e aparelhos físicos. |
| 17 | Schema de negócio local | **PENDENTE** | JSON-LD válido; confirmar telefone, área e alegações operacionais. |
| 18 | Privacidade | **PENDENTE** | Página local criada; requer revisão jurídica e confirmação dos termos/contato definitivos. |
| 19 | Analytics/cookies | **APROVADO** | Auditoria estática não encontrou rastreadores ou persistência no formulário. |
| 20 | Marca e imagem do carro | **PENDENTE** | Obter aprovação da ilustração ou imagem autorizada e arquivo de marca oficial. |
| 21 | 404 e headers de produção | **PENDENTE** | Rota inválida retorna 404 com corpo vazio; HSTS ausente e CSP de preconnect incompleta. Correções locais preparadas, aguardam publicação e rechecagem. |
| 22 | Performance de campo | **PENDENTE** | Lighthouse não executado; Web Vitals e rede limitada não medidos. |
| 23 | CI GitHub ↔ Cloudflare | **APROVADO** | Configuração do Workers Builds consultada. Deploy conectado usa Wrangler direto; novo `wrangler.jsonc` adiciona as opções de 404/HTML. |
| 24 | Revisão pública final | **PENDENTE** | Depois de resolver itens anteriores, validar URL, console, links, 404 e cabeçalhos sem enviar mensagens reais. |
| 25 | Dependências de build e advisories | **PENDENTE** | Consulta online anterior encontrou 7 alertas transitivos (5 altos, 2 moderados). Nova consulta falhou por DNS; avaliar atualização compatível antes do próximo ciclo. |

## Go/no-go

**Go técnico local:** build/testes estáticos aprovados, com cobertura incompleta em Firefox, Lighthouse e axe após correções.

**Go para publicação oficial:** não. A produção tem falha 404 comprovada e headers incompletos; correções locais ainda não publicadas. Nenhum deploy foi realizado nesta auditoria.
