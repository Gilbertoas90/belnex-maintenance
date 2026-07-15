# Spec — Belnex Energy Landing Page

Status: **aguardando aprovação**
Fase: FASE 1 (SDD)
Idioma do conteúdo do site: **Inglês** (empresa sediada na Bélgica — decisão registrada na FASE 0)
Idioma deste documento: Português (BR)

---

## 1. Problema e objetivo de negócio

A Belnex Energy vende um portfólio integrado (elétrica, solar, smart home, baterias, EV charging, heat pumps, segurança) mas hoje não tem um site que comunique isso com o mesmo nível de sofisticação da sua identidade visual. Sem um site premium, a marca compete visualmente com eletricistas genéricos, apesar de ter um posicionamento tech/premium real.

**O que o site precisa provocar no visitante:** confiança imediata de que a Belnex é um fornecedor único, tecnicamente competente e premium para todo o ecossistema de energia residencial/comercial — não "mais um eletricista".

**Ação de conversão primária:** preencher o formulário **"Request a Quote"** (nome, contato, tipo de serviço de interesse, mensagem breve).

**Ação de conversão secundária:** contato direto (telefone/WhatsApp/email) para quem já está decidido e quer pular o formulário.

---

## 2. Personas e jornada

### Persona A — Proprietário residencial ("Homeowner Hugo")
- Contexto: dono de casa/apartamento na Bélgica, 35–55 anos, pesquisa no **desktop à noite** ou no **mobile durante o dia** depois de ver o carro de um vizinho com EV charger ou painéis solares.
- Motivação: reduzir conta de energia, valorizar o imóvel, ter casa "inteligente" sem lidar com múltiplos fornecedores.
- Jornada: chega via busca no Google ("solar panels installer Belgium" / "EV charger installation") ou indicação → vê o hero → escaneia os ícones de serviço → quer validar que a empresa é confiável (prova social) → lê "o que fazemos" → decide pedir orçamento.

### Persona B — Decisor de PME ("Business Owner Bianca")
- Contexto: gerente/dono de pequeno comércio ou escritório, pesquisa no **desktop em horário comercial**, comparando 2–3 fornecedores.
- Motivação: reduzir custo operacional de energia, compliance/segurança elétrica, projeto "chave na mão" sem gerenciar múltiplos contratados.
- Jornada: chega via referência ou busca ("commercial solar installation Belgium") → quer entender escopo de serviços e capacidade técnica rapidamente → busca prova de projetos executados → decide agendar/orçar.

### Padrão de leitura assumido
Ambos escaneiam em **F/Z**: hero (headline + CTA) → ícones de serviço (scan horizontal) → prova social → detalhamento de serviços → CTA final. Mobile via Instagram/redes sociais segue um padrão mais linear (scroll vertical direto), por isso cada seção precisa funcionar sozinha, sem depender de contexto da anterior.

---

## 3. Requisitos funcionais (seções da landing page única)

Ordem de scroll e propósito de conversão declarado por seção:

### 3.1 Header / Navegação
- Logo Belnex + âncoras de navegação (Services, Solutions, About, FAQ, Contact) + CTA "Request a Quote" sempre visível (sticky).
- **Propósito:** permitir acesso rápido ao CTA em qualquer ponto do scroll sem forçar o usuário a voltar ao topo.

### 3.2 Hero
- Headline com eyebrow ("Smart Energy for a Modern Life"), H1 ("Smart Energy for Modern Living"), subheadline (solução + geografia), CTA primário único ("Request a Quote"), imagem de casa moderna à noite com solar.
- **Propósito:** comunicar em <3s o que a empresa faz, para quem, e dar o primeiro CTA. Um único CTA primário, sem competição visual.

### 3.3 Faixa de categorias de serviço (6 ícones)
- Electrical, Smart Home, Solar & Storage, EV Charging, Security, Networking — ícone + label + descrição curta.
- Os 16 serviços específicos do cliente (Electrical Installations, Electrical Renovation, Electrical Inspection, Smart Home, KNX Automation, Solar Energy, Battery Storage, EV Chargers, Security Cameras, CCTV, Networking, Fiber Optics, Wi-Fi Solutions, Commercial Electrical, Industrial Electrical, Maintenance) são agrupados nessas 6 categorias — atualizado a partir da lista de serviços real fornecida (substituiu o agrupamento inicial de 7 categorias da FASE 0/2, que incluía "Heat Pumps", não ofertado).
- **Propósito:** prova rápida de amplitude do portfólio ("fornecedor único"), reduz a necessidade do visitante de procurar em outro site por um serviço que falta.

### 3.4 "What We Do" + cards de serviço
- Texto institucional curto + cards por categoria, cada um listando os serviços específicos daquela categoria (tags), com link para detalhe.
- **Propósito:** aprofundar a promessa da faixa de ícones com a lista concreta de serviços e link secundário ("View All Services").

### 3.5 Prova social
- Depoimentos de clientes, número de projetos/anos de atuação, selos/certificações do setor elétrico belga.
- **Propósito:** neutralizar a objeção principal ("é uma empresa confiável e certificada?") antes de pedir dados de contato.
- *(Placeholder até termos depoimentos e certificações reais — ver seção de fora de escopo/gaps)*

### 3.6 Sobre a Belnex
- Missão, fundador (Gilberto Assunção), diferencial (portfólio integrado + posicionamento premium/tech), foto do time/fundador.
- **Propósito:** humanizar a marca e reforçar credibilidade técnica antes do FAQ/CTA final.

### 3.7 FAQ
- 5–7 perguntas objetivas (ex: "Do you work with both residential and commercial clients?", "How long does an installation take?", "Do you offer financing?").
- **Propósito:** remover as últimas objeções que impediriam o preenchimento do formulário.

### 3.8 CTA final
- Bloco de alto contraste, headline de fechamento + botão "Request a Quote".
- **Propósito:** última chance de conversão para quem leu tudo mas ainda não agiu — sem novo conteúdo, só reforço de CTA.

### 3.9 Contato / Formulário de orçamento
- Formulário (nome, email, telefone, tipo de serviço — dropdown agrupado por categoria com os 16 serviços específicos, mensagem), dados de contato direto, mapa/área de atuação.
- **Propósito:** capturar o lead com informação suficiente para qualificação inicial pela equipe comercial.

### 3.10 Footer
- Links de navegação, redes sociais, informações legais, logo.
- **Propósito:** SEO (links internos) e completude institucional; não é ponto de conversão.

---

## 4. Requisitos não funcionais

| Requisito | Meta |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse Best Practices | ≥ 90 |
| Lighthouse SEO | ≥ 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Responsividade | 320px a 1920px, sem scroll horizontal, sem quebra de layout |
| Acessibilidade | WCAG 2.1 AA (contraste, navegação por teclado, `alt` em imagens, labels de formulário, `prefers-reduced-motion`) |
| Peso de JS | Vanilla JS apenas; sem framework de componentes (React/Vue/etc.) |

---

## 5. Critérios de aceite (Given/When/Then)

**Hero**
- Given um visitante em um dispositivo mobile (320px), When a página carrega, Then o H1, subheadline e CTA primário são visíveis sem scroll horizontal e o CTA é o elemento de maior contraste visual da dobra.

**Faixa de serviços**
- Given um visitante rolando a página, When ele passa pela faixa de 6 ícones, Then consegue identificar todas as categorias de serviço em menos de 5 segundos de leitura (labels curtos, ícones consistentes com o brand book).

**Formulário de contato**
- Given um visitante preenche o formulário de orçamento com dados válidos, When ele envia, Then recebe confirmação visual de envio bem-sucedido e uma mensagem de próximos passos (ex: "we'll contact you within 1 business day").
- Given um visitante tenta enviar o formulário com um campo obrigatório vazio, When ele clica em enviar, Then vê uma mensagem de erro inline associada ao campo (acessível via `aria-describedby`), sem perda dos dados já preenchidos.

**CTA por dobra**
- Given qualquer seção da página, When inspecionada isoladamente, Then existe no máximo um CTA com estilo de botão primário (preenchido, verde-neon) visível na dobra — CTAs adicionais, se existirem, usam estilo secundário (outline).

**Performance**
- Given a página publicada, When medida via Lighthouse (mobile, throttling padrão), Then Performance/Accessibility/Best Practices/SEO ≥ 90 e LCP < 2.5s.

**Responsividade**
- Given a página em qualquer largura entre 320px e 1920px, When renderizada, Then nenhum elemento causa overflow horizontal e a hierarquia de leitura (hero → serviços → prova social → CTA) se mantém.

**Movimento**
- Given um usuário com `prefers-reduced-motion: reduce` ativado no sistema, When a página carrega, Then nenhuma animação de scroll ou transição decorativa é executada (conteúdo aparece direto, sem fade/slide).

**Acessibilidade**
- Given navegação exclusiva por teclado, When o usuário pressiona Tab repetidamente, Then todos os elementos interativos (nav, CTA, formulário) recebem foco visível em ordem lógica, sem "dead ends".

---

## 6. Fora de escopo (nesta versão)

- Blog / centro de conteúdo
- Área de cliente autenticada (login, portal de acompanhamento de projeto)
- E-commerce completo (carrinho, checkout, pagamento online)
- Multi-idioma (apenas inglês nesta versão; FR/NL/PT podem ser uma fase futura)
- Página de projetos/portfólio detalhada com filtros (apenas prova social resumida na home)
- Integração com CRM/automação de marketing (o formulário apenas envia o lead; integração é uma fase futura)
- Chat ao vivo / chatbot
- Calculadora de economia energética interativa

---

## 7. Gaps de conteúdo assumidos como placeholder

Registrados na FASE 0, mantidos aqui para rastreabilidade — serão implementados como placeholders claramente identificáveis até que ativos reais sejam fornecidos:
- Depoimentos de clientes (texto placeholder, marcado para substituição)
- Certificações/selos do setor elétrico belga (badge genérico)
- Fotos reais de equipe/projetos (usar estilo de fotografia noturna/tech compatível com o brand book)
- Endereço comercial (rua/número) — telefone, WhatsApp, email e VAT já obtidos do site legado do cliente (belnexenergy.be)
- Logo em formato vetorial (recriar em SVG a partir da referência raster)
