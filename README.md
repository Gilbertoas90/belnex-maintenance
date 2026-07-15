# Belnex Energy — Website

Landing page institucional da Belnex Energy (Bélgica), especializada em soluções elétricas, energia solar, automação residencial (smart home), armazenamento em bateria, carregadores de veículos elétricos, segurança (CCTV) e redes/conectividade. Objetivo principal: geração de leads via formulário de orçamento.

Site em produção: **https://belnex.netlify.app**

## Stack

**HTML + CSS + JavaScript puro, via Vite (template vanilla) — sem framework de UI (React, Vue, etc.).**

Por quê: o site é uma landing page única, majoritariamente estática, sem estado complexo de aplicação. Um framework de componentes adicionaria peso e complexidade sem benefício real aqui — Vite entrega dev server, build otimizado (minificação, hashing de cache) e ES modules nativos, mantendo o bundle final mínimo e a hospedagem praticamente gratuita. Decisão detalhada em [`docs/adr/0001-stack.md`](docs/adr/0001-stack.md).

Outras peças do stack:
- **i18n próprio** (EN/FR/NL/DE), client-side, sem bibliotecas externas — troca de idioma instantânea via `data-i18n` + um dicionário por idioma em `src/i18n/locales/`.
- **Sharp** (script Node, não é dependência de runtime) para gerar imagens responsivas em AVIF/WebP/JPEG a partir das fotos originais.
- **Netlify** para deploy (build automático a cada push em `main`).

## Por que essas decisões

- **Design system com tokens semânticos** (cor, tipografia, espaçamento) em vez de valores soltos — ver [`docs/adr/0002-design-system.md`](docs/adr/0002-design-system.md).
- **Animações via CSS nativo** (`animation-timeline`) com fallback em JavaScript apenas quando necessário — zero bibliotecas de animação. Ver [`docs/adr/0003-animation-strategy.md`](docs/adr/0003-animation-strategy.md).
- **Um CTA primário por seção**, hierarquia visual pensada para conversão (o site "vende sozinho"). Ver [`docs/adr/0004-visual-hierarchy-conversion.md`](docs/adr/0004-visual-hierarchy-conversion.md).
- **Imagens responsivas com dimensões explícitas** para não causar layout shift. Ver [`docs/adr/0005-media-images.md`](docs/adr/0005-media-images.md).
- **SEO estruturado** (JSON-LD `ElectricalContractor`, Open Graph, sitemap). Ver [`docs/adr/0006-seo-metadata.md`](docs/adr/0006-seo-metadata.md).

O processo completo (problema de negócio, personas, requisitos, critérios de aceite, e a auditoria final de qualidade) está documentado em [`docs/spec.md`](docs/spec.md), [`docs/plan.md`](docs/plan.md) e [`docs/audit.md`](docs/audit.md).

## O que foi construído

Landing page de página única com: header com navegação e seletor de idioma, hero, faixa de categorias de serviço, seção "What We Do" com carrossel de cards (foto + descrição por categoria), prova social (depoimentos, estatísticas, certificações), seção sobre a empresa, FAQ (accordion nativo, sem JS), CTA final, formulário de orçamento com validação nativa, e footer.

Resultado de auditoria (Lighthouse, mobile e desktop): Performance, Accessibility, Best Practices e SEO todos ≥99/100, CLS 0.

## Rodando localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
```

## Estrutura

```
index.html               # página única
src/
  data/services.js       # taxonomia de serviços (fonte única de dados)
  i18n/                   # dicionários EN/FR/NL/DE + troca de idioma
  js/                     # comportamento (nav, formulário, carrossel, i18n, etc.)
  styles/                 # tokens + estilos por seção
  assets/images/          # fotos originais (processadas pelo pipeline)
scripts/
  optimize-images.mjs     # gera AVIF/WebP/JPEG responsivos
docs/
  spec.md, plan.md, adr/  # especificação, plano técnico e decisões de arquitetura
  audit.md                # auditoria final de qualidade
```

## Deploy

Deploy automático no Netlify a cada push em `main`. O código também é espelhado, em marcos de entrega, no repositório do cliente (`Gilbertoas90/belnex-energy-website`) como remote `client`.
