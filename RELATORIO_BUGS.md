# Relatório de bugs — auditoria funcional

**Execução:** 22/10/2026 · Chromium local · build em `dist/` · nenhuma publicação.

| ID | Severidade | Estado | Resumo |
|---|---|---|---|
| QA-001 | Média | Corrigido e rechecado | CTA de viagem particular preenchia categoria errada |
| QA-002 | Baixa | Corrigido e rechecado | Navegação móvel não aparecia sem JavaScript |
| QA-003 | Baixa | Corrigido e rechecado | CTA flutuante sobrepunha o hero em 320 px |

## QA-001 — prefill de viagem particular

- **Reprodução:** clicar em “Viagens particulares” e avançar no planejador.
- **Esperado:** serviço correspondente pré-selecionado.
- **Observado antes:** prefill caía em “Outro serviço”, apesar do CTA mencionar viagem particular.
- **Correção:** opção selecionável “Viagem particular” e mapeamento `particular` para ela.
- **Regressão:** os seis prefills do site foram clicados e conferidos; as sete opções do planejador foram selecionadas.

## QA-002 — navegação sem JavaScript

- **Reprodução:** abrir a página em viewport móvel com o script principal removido/desativado e tentar usar o menu.
- **Esperado:** links de navegação acessíveis.
- **Observado antes:** o botão hamburger dependia do script, enquanto os links estavam ocultos.
- **Correção:** `noscript.css` apresenta a navegação no fluxo da página e esconde o controle inoperante; incluído no build e headers.
- **Regressão:** fixture temporário retirou o script em 390 px; seis links estavam visíveis, sem overflow. Fixture removido do pacote final.

## QA-003 — CTA flutuante no hero estreito

- **Reprodução:** carregar a página a 320 px de largura.
- **Esperado:** CTAs do hero completamente clicáveis.
- **Observado antes:** o botão flutuante de WhatsApp cobria parte do CTA secundário.
- **Correção:** `IntersectionObserver` oculta o CTA fixo enquanto o hero ou o planejador aparece.
- **Regressão:** a 320 px, CTA fixo oculto no hero, visível após sair do hero e oculto no planejador.

## Bugs em aberto

Nenhum bloqueador local reproduzido na cobertura realizada. Isso não significa aprovação de acessibilidade WCAG, compatibilidade multiplataforma ou funcionamento da versão publicada; limitações e itens pendentes estão em `RELATORIO_TESTES_COMPLETO.md` e `CHECKLIST_PRE_PUBLICACAO.md`.
