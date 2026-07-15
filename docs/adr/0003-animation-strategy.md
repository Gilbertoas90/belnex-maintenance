# ADR 0003 — Estratégia de animação

## Status
Aceito

## Contexto
O usuário pediu scroll-driven animations com preferência por CSS nativo (`animation-timeline`), fallback via `IntersectionObserver`, micro-interações em hovers/CTAs, e respeito obrigatório a `prefers-reduced-motion`. Explicitamente vetado: bibliotecas pesadas só para fazer fade-in.

## Decisão

**Camada 1 — CSS nativo progressivo (`animation-timeline: view()`)**
Para navegadores com suporte (Chromium-based), seções usam `animation-timeline: view()` + `@keyframes` para revelar conteúdo conforme entra na viewport — sem JavaScript algum nesse caminho.

**Camada 2 — Fallback via IntersectionObserver**
Um único módulo `scroll-reveal.js` (~30 linhas) detecta suporte a `animation-timeline` via `CSS.supports('animation-timeline: view()')`. Se não suportado, usa um `IntersectionObserver` reutilizável que adiciona a classe `.is-visible` ao elemento, disparando uma `transition` CSS equivalente (opacity + translateY curto). Um observer, múltiplos elementos — não um observer por seção.

**Micro-interações (hover/focus em CTAs e cards)**
Exclusivamente CSS: `transition` em `transform`, `background-color`, `box-shadow` acionada por `:hover`/`:focus-visible`. Sem JS.

**`prefers-reduced-motion`**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```
Aplicado globalmente — quando ativo, todo o conteúdo aparece direto, sem qualquer fade/slide/timeline.

## Alternativas consideradas
- **GSAP + ScrollTrigger** — biblioteca robusta, mas ~60-70kB+ e overkill para fades/reveals simples; contraria o requisito explícito de manter JS mínimo.
- **AOS.js / ScrollReveal.js** — bibliotecas dedicadas para exatamente este caso de uso, mas ainda são uma dependência de terceiros externa quando o mesmo resultado é alcançável com ~30 linhas de JS vanilla + CSS.
- **Framer Motion** — biblioteca de animação para React; descartada por não haver React no projeto (ADR 0001).

## Consequências
- Zero dependências externas de animação.
- Precisa de teste cross-browser: `animation-timeline` ainda não é suportado em todos os browsers (situação em evolução) — por isso o fallback via IntersectionObserver não é opcional, é o caminho garantido de suporte universal.
- Toda animação decorativa é auditável e desligável em bloco via `prefers-reduced-motion`, atendendo ao critério de aceite de acessibilidade da spec.
