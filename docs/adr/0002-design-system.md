# ADR 0002 — Sistema de design (tokens)

## Status
Aceito

## Contexto
O brand book da Belnex define uma paleta quase-monocromática (preto + verde-neon), tipografia Orbitron + Montserrat, ícones de linha para 7 categorias de serviço, e motivos gráficos técnicos (linhas diagonais, chevrons, grid de pontos). Precisamos de **tokens semânticos**, não cores/tamanhos soltos espalhados pelo CSS — isso é o que separa um site premium de um template genérico.

Também identificamos na FASE 0 uma inconsistência: o brand book indica Orbitron como fonte de display, mas o mockup de referência usa algo que se parece com uma grotesk bold para o H1 — Orbitron em blocos grandes de texto tende a prejudicar legibilidade (é uma fonte geométrica/tecnológica desenhada para poucos caracteres, não para leitura corrida).

## Decisão

### Cores — tokens semânticos por função, não por valor
```css
--color-bg-canvas: #050505;      /* fundo geral da página */
--color-bg-surface: #111111;     /* cards, seções alternadas */
--color-bg-elevated: #1B1B1B;    /* elementos elevados (modais, dropdowns) */
--color-text-primary: #FFFFFF;
--color-text-muted: #B3B3B3;     /* derivado, para texto secundário com contraste AA */
--color-accent: #8DFF00;         /* CTA primário, destaques pontuais */
--color-accent-hover: #6DFF00;
--color-border: rgba(255,255,255,0.12);
```
Regra: nenhum componente referencia hex diretamente — sempre via variável semântica. Isso permite trocar a "pele" da marca sem tocar em componentes.

### Tipografia — escala modular, razão 1.25 (Major Third)
Base 16px:
```
--text-xs:   0.8rem   (12.8px)
--text-sm:   1rem     (16px)
--text-base: 1rem     (16px)
--text-md:   1.25rem  (20px)
--text-lg:   1.5625rem (25px)
--text-xl:   1.953rem (31px)
--text-2xl:  2.441rem (39px)
--text-3xl:  3.052rem (49px)
--text-4xl:  3.815rem (61px)
```
- **Montserrat** (700–900) para todos os headings (H1–H6) e corpo de texto (400–500) — prioriza legibilidade em qualquer tamanho.
- **Orbitron** reservado exclusivamente para: wordmark do logo, e microtextos de destaque tech (eyebrows em maiúsculas, contadores/estatísticas) — nunca para blocos de texto corrido, resolvendo a inconsistência identificada na FASE 0.

### Espaçamento — múltiplos de 8px
```
--space-1: 4px   (exceção mínima, ajustes finos)
--space-2: 8px
--space-3: 16px
--space-4: 24px
--space-5: 32px
--space-6: 48px
--space-7: 64px
--space-8: 96px
--space-9: 128px
```
Espaçamento vertical entre seções: `--space-9` (128px) desktop, `--space-7` (64px) mobile — ver ADR 0004.

### Grid
- Container máximo: 1280px, gutter 24px desktop / 16px mobile.
- 12 colunas desktop (≥1024px), 4 colunas mobile (<768px).
- Breakpoints: 320, 480, 768, 1024, 1280, 1920px.

## Alternativas consideradas
- **Tailwind CSS** — descartado para esta UI. O design é altamente customizado (paleta contida, tipografia de assinatura, elementos gráficos técnicos únicos); utilitários genéricos tendem a fragmentar essa identidade em classes soltas e dificultam impor as regras semânticas acima. Preferimos CSS nativo com custom properties + nomenclatura BEM leve por componente/seção.
- **Orbitron para toda a hierarquia de headings** (conforme brand book literal) — descartado por legibilidade; ver justificativa acima.

## Consequências
- Um único arquivo `tokens.css` é a fonte da verdade de todo o sistema visual.
- Qualquer novo componente consome variáveis existentes antes de propor uma nova — revisão de PR deve rejeitar hex/px soltos fora de `tokens.css`.
