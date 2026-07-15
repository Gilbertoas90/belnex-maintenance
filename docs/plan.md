# Plan — Belnex Energy Landing Page

Status: **aguardando aprovação**
Fase: FASE 2 (SDD)
Depende de: `docs/spec.md` (aprovado) + ADRs em `docs/adr/`

Este documento assume as decisões registradas nos ADRs 0001–0006. Leia-os antes deste plano se precisar do "porquê" de alguma escolha.

---

## 1. Arquitetura de componentes

Como o projeto é **vanilla JS sem framework de componentes** (ADR 0001), "componente" aqui significa: um bloco de HTML semântico + um arquivo CSS com escopo por seção + (quando necessário) um módulo JS isolado com responsabilidade única. Não há reatividade nem estado compartilhado entre componentes — cada um é o mais "burro" possível.

| Componente | Responsabilidade | JS próprio? |
|---|---|---|
| **Header/Nav** | Logo, âncoras de navegação, CTA sticky, menu mobile (hambúrguer) | `nav.js` — toggle do menu mobile, classe `.scrolled` ao passar do hero |
| **Hero** | Headline, subheadline, CTA primário, imagem de fundo (candidata a LCP) | Nenhum (só CSS) |
| **ServiceIconsStrip** | 6 categorias de serviço agrupando os 16 serviços do cliente (ícone + label + descrição curta) | Nenhum (só CSS para hover) |
| **WhatWeDo** | Texto institucional + cards de serviço em carrossel horizontal | `carousel.js` — scroll nativo com `scroll-snap` + botões prev/next via `scrollBy()` |
| **SocialProof** | Depoimentos + estatísticas (projetos, anos, clientes) | `stat-counter.js` — anima contagem numérica ao entrar na viewport (reusa o observer de `scroll-reveal.js`) |
| **AboutSection** | Missão, fundador, diferencial de portfólio integrado | Nenhum |
| **FAQAccordion** | Perguntas frequentes | **Nenhum JS** — usa `<details>`/`<summary>` nativo (acessível e funcional sem JavaScript) |
| **FinalCTA** | Bloco de alto contraste, CTA de fechamento | Nenhum |
| **ContactForm** | Formulário de orçamento com validação e envio | `form.js` — validação via Constraint Validation API nativa, submit assíncrono, estados de sucesso/erro |
| **Footer** | Links, redes sociais, info legal | Nenhum |
| **ScrollReveal (transversal)** | Camada de animação de entrada ao rolar (ADR 0003) | `scroll-reveal.js` — único observer reutilizado por todas as seções |

Módulos JS compartilhados (não são "componentes" de UI, são utilitários):
- `scroll-reveal.js` — feature-detect de `animation-timeline`, fallback `IntersectionObserver`.
- `dom-utils.js` — helpers pequenos (ex: `qs`, `qsa`, debounce) se necessário, para evitar repetição.

## 2. Estrutura de pastas

```
belnex/
├── docs/
│   ├── spec.md
│   ├── plan.md
│   └── adr/
│       ├── 0001-stack.md
│       ├── 0002-design-system.md
│       ├── 0003-animation-strategy.md
│       ├── 0004-visual-hierarchy-conversion.md
│       ├── 0005-media-images.md
│       └── 0006-seo-metadata.md
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml            (gerado no build)
├── src/
│   ├── assets/
│   │   └── images/            (originais em alta resolução, entram no pipeline do ADR 0005)
│   ├── styles/
│   │   ├── tokens.css         (ADR 0002 — fonte da verdade de cor/tipografia/espaçamento)
│   │   ├── base.css           (reset + estilos de elemento base + @font-face)
│   │   ├── utilities.css      (container, visually-hidden, aspect-ratio helpers)
│   │   └── sections/
│   │       ├── header.css
│   │       ├── hero.css
│   │       ├── service-icons.css
│   │       ├── what-we-do.css
│   │       ├── social-proof.css
│   │       ├── about.css
│   │       ├── faq.css
│   │       ├── final-cta.css
│   │       ├── contact-form.css
│   │       └── footer.css
│   ├── js/
│   │   ├── main.js            (entry point — importa estilos e inicializa módulos)
│   │   ├── nav.js
│   │   ├── carousel.js
│   │   ├── scroll-reveal.js
│   │   ├── stat-counter.js
│   │   ├── faq.js              (apenas se algum reforço de acessibilidade for necessário além do <details> nativo)
│   │   └── form.js
│   └── data/
│       └── services.js        (6 categorias × 16 serviços — nome, ícone, descrição — fonte única para ServiceIconsStrip, WhatWeDo e dropdown do formulário)
├── scripts/
│   └── optimize-images.mjs    (pipeline Sharp — ADR 0005)
├── index.html                 (página única — todas as seções, nesta ordem)
├── vite.config.js
├── package.json
└── .gitignore
```

Observação: `data/services.js` evita duplicar a lista de categorias/serviços em três lugares do HTML (faixa de ícones + cards "What We Do" + dropdown do formulário) — um único array de dados, renderizado nos três pontos via pequenos helpers de template no `main.js`. Isso não é um framework, é só evitar repetição manual de markup.

## 3. Ordem de implementação (tarefas pequenas e verificáveis)

Cada tarefa abaixo vira um commit (ou pequeno grupo de commits) na FASE 3, com critério de "pronto" verificável.

1. **Scaffold do projeto** — Vite (`vanilla`), estrutura de pastas acima, `index.html` esqueleto, `package.json`, `.gitignore`.
   *Verificação:* `npm run dev` sobe sem erro; página em branco renderiza.
2. **Design tokens** — `tokens.css` (cores, escala tipográfica, espaçamento, grid) + `base.css` (reset, fontes self-hosted Montserrat/Orbitron).
   *Verificação:* página de teste temporária mostra a escala tipográfica e paleta corretas; removida antes do fim da FASE 3.
3. **Header/Nav** — desktop + menu mobile.
   *Verificação:* nav sticky, CTA sempre visível, menu mobile abre/fecha, navegável 100% por teclado.
4. **Hero** — headline, subheadline, CTA, imagem (com `fetchpriority="high"`).
   *Verificação:* critério de aceite "Hero" da spec (CTA com maior contraste, sem overflow em 320px).
5. **ServiceIconsStrip** — 6 categorias, consumindo `data/services.js`.
   *Verificação:* revisão manual de legibilidade (<5s para reconhecer as 6 categorias).
6. **WhatWeDo + carrossel** — texto + cards com `carousel.js`.
   *Verificação:* carrossel navegável via teclado, mouse e touch (scroll-snap nativo).
7. **SocialProof** — depoimentos + `stat-counter.js`.
   *Verificação:* placeholders marcados claramente; contraste de texto ≥ AA.
8. **AboutSection**.
   *Verificação:* hierarquia semântica correta (`h2` + parágrafos, sem pular níveis).
9. **FAQAccordion** — `<details>/<summary>` nativo.
   *Verificação:* funciona com JavaScript desabilitado; navegável por teclado.
10. **FinalCTA**.
    *Verificação:* único CTA primário na dobra (checklist do ADR 0004).
11. **ContactForm** — `form.js` com validação + estados de sucesso/erro.
    *Verificação:* critérios Given/When/Then da spec para formulário (erro inline acessível, confirmação de sucesso).
12. **Footer**.
    *Verificação:* links funcionam; nenhum CTA competindo com o CTA final.
13. **Scroll animations transversais** — aplicar `scroll-reveal.js` + CSS `animation-timeline` em todas as seções.
    *Verificação:* com `prefers-reduced-motion: reduce` ativo no SO, nada anima.
14. **Pipeline de imagens** — `optimize-images.mjs`, aplicar AVIF/WebP/srcset em todas as imagens reais/placeholder.
    *Verificação:* Lighthouse não acusa "serve images in next-gen formats" nem CLS por imagem sem dimensão.
15. **SEO/metadados** — headings semânticos, Open Graph, JSON-LD `ElectricalContractor`, sitemap, robots.txt.
    *Verificação:* Rich Results Test / validador schema.org sem erros.
16. **Auditoria final** — Lighthouse mobile + desktop, teste responsivo 320–1920px, teste de navegação por teclado, checklist completo dos critérios de aceite da spec.
    *Verificação:* relatório de auditoria apresentado ao usuário com status honesto de cada critério (feito / abaixo do esperado).

## 4. Fora do escopo deste plano
Repete o que já está em `docs/spec.md` §6 — nenhuma integração de backend/CRM real será implementada; o formulário de contato (tarefa 11) terá o endpoint de envio como ponto de integração explicitamente marcado (placeholder tipo Formspree/Netlify Forms ou similar), a ser substituído por uma integração real depois, fora desta versão.
