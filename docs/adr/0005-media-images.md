# ADR 0005 — Imagens e mídia

## Status
Aceito

## Contexto
Metas de performance da spec: LCP < 2.5s, CLS < 0.1, Lighthouse Performance ≥90. O site é fortemente visual (fotografia noturna/tech em quase todas as seções), então o tratamento de imagem é crítico para bater essas metas.

## Decisão

- **Formatos modernos com fallback:** cada imagem é servida via `<picture>` com fontes AVIF → WebP → JPEG (fallback), geradas a partir do arquivo original em tempo de build.
- **Responsivo via `srcset`/`sizes`:** múltiplos tamanhos gerados por imagem (ex: 480w, 768w, 1024w, 1440w, 1920w) para que o navegador baixe apenas a resolução necessária ao viewport.
- **Dimensões explícitas:** todo `<img>` declara `width`/`height` (ou usa `aspect-ratio` no CSS do container) para reservar espaço no layout e evitar CLS.
- **Lazy loading seletivo:** `loading="lazy"` + `decoding="async"` em todas as imagens, **exceto** a imagem do hero, que é a candidata a LCP e usa `loading="eager"` + `fetchpriority="high"`.
- **Pipeline de build:** script Node (`scripts/optimize-images.mjs`, usando Sharp) processa os originais em `src/assets/images/` e gera as variantes otimizadas para `dist/`/`public/`. Roda como etapa do build, não manualmente por imagem.

## Alternativas consideradas
- **CDN de imagem on-the-fly (Cloudinary, imgix, etc.)** — ofereceria otimização automática e transformação por URL, mas introduz uma dependência paga/externa e uma chamada de rede adicional em runtime. Descartado nesta fase para manter o site 100% estático e custo de hospedagem ~zero (ADR 0001). Pode ser revisitado se o volume de imagens/projetos crescer muito (ex: galeria de portfólio futura).
- **Servir apenas JPEG/PNG sem pipeline de otimização** — mais simples, mas inviabilizaria a meta de Lighthouse Performance ≥90 com o volume de fotografia full-bleed que o design pede.

## Consequências
- Toda imagem nova precisa passar pelo script de otimização antes de entrar no HTML — isso é uma etapa documentada no plano de implementação (FASE 3), não uma opção.
- Fotos reais (quando chegarem, substituindo os placeholders da spec) devem ser adicionadas em `src/assets/images/` na resolução mais alta disponível; o pipeline cuida do resto.
