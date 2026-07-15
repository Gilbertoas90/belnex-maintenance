# Audit — FASE 3 final (Belnex Energy landing page)

Data: 2026-07-13
Build auditado: produção (`npm run build` + `vite preview`), Lighthouse 12.8.2 via `npx`.

## Lighthouse

| Categoria | Mobile | Desktop | Meta (spec) |
|---|---|---|---|
| Performance | 100 | 100 | ≥ 90 |
| Accessibility | 100 | 100 | ≥ 90 |
| Best Practices | 100 | 100 | ≥ 90 |
| SEO | 100 | 100 | ≥ 90 |
| LCP | 1.5s | 0.3s | < 2.5s |
| CLS | 0 | 0.002 | < 0.1 |
| TBT | 0ms | 0ms | — |

Todas as metas de performance/acessibilidade/SEO da spec foram batidas com folga — resultado direto de zero framework JS, CSS/SVG no lugar de fotografia pesada, e fontes variáveis self-hosted pequenas (~50KB total).

## Responsividade

Testado sem overflow horizontal em 320px, 768px, 1440px e 1920px (spec exige 320–1920px). Verificação visual seção a seção feita durante a implementação; verificação programática (`scrollWidth` vs `innerWidth`) confirmada nos 4 breakpoints acima.

## Navegação por teclado

- Skip-link funcional (primeiro elemento focável, pula para `#main-content`).
- Nenhum `tabindex` positivo no código — ordem de tabulação segue o DOM natural.
- Único `tabindex="-1"` usado corretamente (foco programático na mensagem de sucesso do formulário).
- Menu mobile: `Escape` fecha e devolve foco ao botão; abrir move foco para o primeiro link.
- FAQ: `<details>/<summary>` nativo, operável por teclado sem JS.
- Formulário: primeiro campo inválido recebe foco automaticamente ao tentar enviar com erros.

## Checklist de critérios de aceite (spec.md §5)

| Critério | Status | Observação |
|---|---|---|
| Hero — CTA maior contraste, sem overflow em 320px | ✅ Atende | Verificado visualmente |
| Faixa de serviços — 7 categorias legíveis em <5s | ✅ Atende | Grid 2/4/7 colunas, ícones consistentes |
| Formulário — confirmação de envio bem-sucedido | ✅ Atende | Testado end-to-end (ver ressalva abaixo) |
| Formulário — erro inline acessível, sem perda de dados | ✅ Atende | `role="alert"`, foco no campo, dados preservados |
| CTA único por dobra | ✅ Atende | Checklist ADR 0004 aplicado a cada seção |
| Performance (Lighthouse ≥90 + LCP/CLS) | ✅ Atende | 100/100/100/100, ver tabela acima |
| Responsividade 320–1920px | ✅ Atende | Ver seção acima |
| `prefers-reduced-motion` desativa animações | ✅ Atende | Regra global + `.reveal` override verificados |
| Navegação por teclado, foco visível, sem dead-ends | ✅ Atende | Ver seção acima |

Todos os critérios de aceite mensuráveis da spec foram atendidos.

## O que ficou abaixo do especificado / pendências assumidas (honestidade, não silenciado)

Estes pontos já estavam sinalizados como gaps desde a FASE 0 (spec.md §7) e permanecem como placeholders claramente marcados no código (`data-placeholder="true"` + comentários), não como itens escondidos:

1. **Fotografia real**: hero, about e cards de serviço usam CSS/SVG em vez de fotos reais de projetos/equipe. Decisão deliberada (ver commit da tarefa 4) dado que não há fotografia licenciada disponível — também ajudou a bater LCP.
2. **Depoimentos, estatísticas e certificações**: conteúdo ilustrativo (Els V., Marc D., "500+ instalações", "RESCert Certified" etc.) pendente de substituição por dados reais do cliente.
3. **Envio do formulário**: a validação e a UI de sucesso/erro são reais e funcionam de ponta a ponta, mas a chamada de rede (`submitLead()` em `form.js`) é um stub documentado — nenhum backend/CRM de destino foi escolhido (já era fora de escopo na spec §6). Integração real (Formspree/Netlify Forms/endpoint próprio) é o próximo passo natural, não implementado aqui.
4. **Domínio/URL canônica**: atualizado para `https://belnexenergy.be/` (sem hífen) — confirmado via fetch do site legado real do cliente, substituindo o palpite anterior baseado no cartão de visita do brand book (que tinha um hífen).
5. **Endereço comercial**: JSON-LD usa apenas país (Bélgica) — telefone (+32 471 65 89 10), WhatsApp, email (contact@belnexenergy.be) e VAT (BE1038194067) já são reais, obtidos do site legado do cliente (belnexenergy.be); falta apenas o endereço físico (rua/número).
6. **Logo em vetor**: favicon e wordmark no header/footer são recriações simplificadas em SVG a partir do raster do brand book, não o arquivo vetorial oficial (que não foi fornecido).

Nenhum desses pontos é um desvio silencioso — todos foram comunicados no momento em que a decisão foi tomada, durante a implementação de cada tarefa.

## Fora do escopo (confirmado, não implementado — spec.md §6)

Blog, área de cliente autenticada, e-commerce completo, multi-idioma, portfólio filtrável, integração com CRM, chat ao vivo, calculadora de economia energética. Nenhum destes foi iniciado, conforme combinado.
