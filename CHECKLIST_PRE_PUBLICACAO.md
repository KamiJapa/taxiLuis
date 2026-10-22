# Checklist para publicação final

**Estado após auditoria local de 22/10/2026.** `APROVADO` significa verificado no código/pacote local, não necessariamente na URL de produção.

| # | Item | Estado | Critério/pendência |
|---:|---|---|---|
| 1 | Build e arquivos locais | **APROVADO** | Build, dry-run e publicação em produção conferidos. |
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
| 16 | Acessibilidade e compatibilidade | **PENDENTE** | Verificação manual parcial passou. Rodar axe/WCAG e testar Firefox/WebKit, zoom e aparelhos reais antes do aceite. |
| 17 | Schema de negócio local | **PENDENTE** | JSON-LD válido; confirmar telefone, área e alegações operacionais. |
| 18 | Privacidade | **PENDENTE** | Página local criada; requer revisão jurídica e confirmação dos termos/contato definitivos. |
| 19 | Analytics/cookies | **APROVADO** | Auditoria estática não encontrou rastreadores ou persistência no formulário. |
| 20 | Marca e imagem do carro | **PENDENTE** | Obter aprovação da ilustração ou imagem autorizada e arquivo de marca oficial. |
| 21 | 404 e headers de produção | **PENDENTE** | Página principal publicada e acessível; respostas HTTP da rota 404 e headers efetivos ainda não conferidos. |
| 22 | Performance de campo | **PENDENTE** | Lighthouse, Web Vitals e rede limitada não foram medidos. |
| 23 | CI GitHub ↔ Cloudflare | **APROVADO** | Push na branch `main` acionou build/deploy automático; implantação consultada e site aberto após publicação. |
| 24 | Revisão pública final | **PENDENTE** | Depois de resolver itens anteriores, validar URL, console, links, 404 e cabeçalhos sem enviar mensagens reais. |
| 25 | Dependências de build e advisories | **PENDENTE** | Auditoria online encontrou 7 alertas transitivos (5 altos, 2 moderados) nas ferramentas de desenvolvimento; revisar atualização compatível do Tailwind/toolchain antes do próximo ciclo de publicação. |

## Go/no-go

**Go técnico local:** sim para os fluxos funcionais testados, com pendências não bloqueantes de compatibilidade/cobertura.

**Go para publicação oficial:** aguardar os itens pendentes, incluindo revisão dos alertas de dependências de build. Nenhum deploy foi realizado nesta auditoria.
