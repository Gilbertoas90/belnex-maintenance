# ADR 0004 — Hierarquia visual e conversão

## Status
Aceito

## Contexto
O site precisa "vender sozinho": cada seção deve mover o visitante em direção ao CTA de orçamento, sem competição visual entre múltiplos elementos de ação. A spec já define um padrão de leitura F/Z e um único CTA primário por dobra como critério de aceite.

## Decisão

1. **Um CTA primário (verde-neon preenchido) por dobra, no máximo.** Qualquer ação adicional na mesma seção usa estilo secundário (outline verde sobre fundo escuro) ou vira link textual com seta (`→`), nunca outro botão preenchido competindo pela mesma atenção.
2. **Contraste funcional, não decorativo:** fundo quase-preto (`--color-bg-canvas`/`--color-bg-surface`) + texto branco garante contraste máximo para leitura. O verde-neon (`--color-accent`) é reservado exclusivamente para ações e destaques pontuais (CTA, ícones, sublinhados de ênfase) — nunca em blocos grandes de texto ou fundo, para não cansar o olho nem reduzir a legibilidade percebida.
3. **Whitespace generoso entre seções:** espaçamento vertical mínimo de `--space-9` (128px) desktop / `--space-7` (64px) mobile entre seções (tokens do ADR 0002), evitando a sensação de "tudo espremido" comum em templates baratos.
4. **Direção de leitura F/Z:** em telas largas, texto-chave (eyebrow, headline, CTA) alinhado à esquerda, imagem de apoio à direita — replicando a composição do mockup de referência. Em mobile, empilhamento vertical com o CTA sempre logo após a promessa central da seção (não no fim de um bloco longo de texto).
5. **Checklist obrigatório por seção nova:** "qual é o único CTA primário desta dobra, e o que compete visualmente com ele?" — se a resposta for "mais de um elemento", a seção é redesenhada antes de aprovação.

## Alternativas consideradas
- **Múltiplos CTAs coloridos por seção** (padrão comum em templates genéricos, ex: botão de "saiba mais" + "compre agora" + "fale conosco" todos com o mesmo peso visual) — descartado por diluir a taxa de conversão e confundir a ação esperada.
- **Verde-neon como cor de fundo de seções inteiras** — descartado por reduzir contraste de leitura e por fugir do uso "de assinatura pontual" que dá ao verde seu impacto (se está em toda parte, deixa de chamar atenção onde importa: o CTA).

## Consequências
- Design review de cada seção nova passa pelo checklist do item 5 antes de ir para implementação.
- Copywriting e design andam juntos: um CTA por dobra implica também **um objetivo de conteúdo por dobra** (a seção não pode tentar comunicar duas mensagens concorrentes).
