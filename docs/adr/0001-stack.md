# ADR 0001 — Stack e ferramenta de build

## Status
Aceito

## Contexto
Precisamos de uma stack que entregue performance máxima (Lighthouse ≥90, LCP<2.5s), custo de hospedagem próximo de zero, e baixa manutenção — para uma **landing page única**, sem área logada, sem conteúdo dinâmico por usuário. O usuário definiu explicitamente uma restrição não-negociável: **JavaScript vanilla, sem React, Vue ou qualquer framework de componentes**.

## Decisão
Usar **Vite** (template `vanilla`) como ferramenta de build/dev, com **HTML5 + CSS3 + JavaScript (ES Modules) puro** como linguagem de produção. Nenhum framework de UI. Deploy como site 100% estático (arquivos gerados em `dist/`) em um host estático (Netlify, Cloudflare Pages, GitHub Pages ou Vercel — custo zero no tier gratuito).

O papel do Vite é puramente de ferramenta de build: dev server com hot reload, bundling/minificação de CSS e JS, cache-busting de assets via hash de conteúdo. Ele não introduz nenhum modelo de componente, estado ou runtime — o HTML final é servido como está.

## Alternativas consideradas

1. **Astro** — geraria HTML estático com zero JS por padrão e "ilhas" de interatividade opcionais. Descartado porque estamos com uma página única sem necessidade real de partials entre múltiplas páginas nem de ilhas de framework — adicionaria uma camada de build/roteamento desnecessária para o escopo atual.
2. **11ty (Eleventy)** — SSG orientado a templates (Nunjucks/Liquid), útil quando há múltiplas páginas reaproveitando layout. Descartado pelo mesmo motivo: ganho baixo para uma única página, custo de aprendizado/dependência extra sem retorno proporcional.
3. **Zero build tools (HTML/CSS/JS servidos diretamente, sem bundler)** — a opção mais simples possível. Descartada porque perderíamos, sem esforço manual extra, otimizações que ajudam diretamente as metas de Lighthouse: minificação automática, hashing de cache, dev server com live reload durante a FASE 3.
4. **Next.js estático ou qualquer stack baseada em React/Vue** — descartada por restrição explícita do usuário.

## Consequências
- Node.js é necessário apenas em tempo de build/dev, nunca em produção.
- O bundle de produção não carrega runtime de framework algum — apenas o JS vanilla que escrevermos.
- Qualquer nova dependência de terceiros deve ser justificada individualmente (ver ADR 0003 sobre animações), já que o princípio geral é "o mínimo de JavaScript necessário".
- Pipeline de imagens (ADR 0005) roda como script Node separado, fora do Vite.
