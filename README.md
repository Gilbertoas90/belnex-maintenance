# BELNEX ENERGY — Website

<p align="center">
  Website institucional da <strong>BELNEX ENERGY</strong>, empresa sediada na Bélgica e especializada em soluções elétricas, energia solar, automação residencial, armazenamento em bateria, carregadores de veículos elétricos, segurança e conectividade.
</p>

<p align="center">
  <a href="https://belnexenergy.be"><strong>belnexenergy.be</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Cloudflare-Pages-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Pages">
  <img src="https://img.shields.io/badge/Resend-Email-000000?logo=resend&logoColor=white" alt="Resend">
  <img src="https://img.shields.io/badge/Status-Production-32CD32" alt="Production">
  <img src="https://img.shields.io/badge/License-Proprietary-red" alt="Proprietary License">
</p>

---

## Sobre o projeto

Landing page institucional da **BELNEX ENERGY**, especializada em instalações elétricas, energia solar, automação residencial — Smart Home e KNX — armazenamento em bateria, carregadores de veículos elétricos, segurança por câmeras e infraestrutura de redes.

O objetivo principal do website é apresentar os serviços da empresa de maneira profissional e gerar novos contatos por meio do formulário de solicitação de orçamento.

**Site em produção:** https://belnexenergy.be

## Stack

O projeto utiliza **HTML, CSS e JavaScript puro com Vite**, sem frameworks de interface como React ou Vue. Essa arquitetura mantém o website leve, rápido e adequado a uma landing page majoritariamente estática.

Principais tecnologias:

- **Vite** — desenvolvimento local e build de produção;
- **HTML5, CSS3 e JavaScript** — estrutura, apresentação e interatividade;
- **Cloudflare Pages** — hospedagem, CDN, HTTPS e deploy automático;
- **Cloudflare Pages Functions** — backend serverless do formulário;
- **Cloudflare Turnstile** — proteção contra spam e bots;
- **Resend** — envio das notificações e confirmações por e-mail;
- **Sharp** — geração de imagens responsivas em AVIF, WebP e JPEG;
- **i18n próprio** — suporte aos idiomas EN, FR, NL e DE;
- **GitHub** — versionamento e integração com o deploy.

A decisão técnica principal está documentada em [`docs/adr/0001-stack.md`](docs/adr/0001-stack.md).

## Decisões de arquitetura

O projeto utiliza design tokens, animações nativas em CSS, hierarquia visual orientada à conversão, imagens responsivas com dimensões explícitas e SEO estruturado.

Documentação:

- [`docs/adr/0002-design-system.md`](docs/adr/0002-design-system.md)
- [`docs/adr/0003-animation-strategy.md`](docs/adr/0003-animation-strategy.md)
- [`docs/adr/0004-visual-hierarchy-conversion.md`](docs/adr/0004-visual-hierarchy-conversion.md)
- [`docs/adr/0005-media-images.md`](docs/adr/0005-media-images.md)
- [`docs/adr/0006-seo-metadata.md`](docs/adr/0006-seo-metadata.md)
- [`docs/spec.md`](docs/spec.md)
- [`docs/plan.md`](docs/plan.md)
- [`docs/audit.md`](docs/audit.md)

## Funcionalidades

- navegação responsiva;
- seletor de idioma;
- hero section;
- apresentação dos serviços;
- carrossel com imagens e descrições;
- prova social, depoimentos e estatísticas;
- certificações;
- seção institucional;
- FAQ;
- CTA final;
- formulário de solicitação de orçamento;
- SEO, sitemap, robots.txt e dados estruturados;
- otimização de desempenho e acessibilidade.

## Formulário de contato

O formulário é processado por uma **Cloudflare Pages Function**, protegido pelo **Cloudflare Turnstile** e integrado ao **Resend**.

Fluxo de envio:

1. os dados são validados no frontend;
2. o Turnstile verifica a solicitação;
3. a Cloudflare Function valida e processa os dados;
4. a BELNEX ENERGY recebe uma notificação;
5. o cliente recebe uma confirmação automática.

Endpoint:

```text
functions/api/contact.ts
```

Rota pública:

```text
POST /api/contact
```

O frontend envia os dados para:

```text
/api/contact
```

## Variáveis de ambiente

As variáveis abaixo devem ser configuradas no **Cloudflare Pages**, separadamente para os ambientes **Production** e **Preview**, quando aplicável.

```text
RESEND_API_KEY
CONTACT_EMAIL
FROM_EMAIL
TURNSTILE_SECRET_KEY
```

Descrição:

- `RESEND_API_KEY` — chave da API do Resend;
- `CONTACT_EMAIL` — e-mail que receberá os pedidos de orçamento;
- `FROM_EMAIL` — remetente autorizado no domínio verificado do Resend;
- `TURNSTILE_SECRET_KEY` — chave secreta do Cloudflare Turnstile.

A chave pública do Turnstile fica no HTML:

```text
0x4AAAAAAD4jGQU5FkQe57PV
```

A chave secreta nunca deve ser versionada no repositório.

## Segurança

O projeto aplica boas práticas de segurança compatíveis com Cloudflare Pages:

- validação de payload no backend;
- limitação de tamanho do corpo da requisição;
- proteção contra HTML Injection nos e-mails;
- proteção contra Header Injection;
- rejeição de JSON malformado;
- rejeição de métodos não suportados;
- respostas JSON consistentes;
- Cloudflare Turnstile contra spam e automação;
- secrets lidos apenas via `context.env`;
- headers de segurança definidos em `public/_headers`.

Headers configurados:

- `Content-Security-Policy`;
- `Referrer-Policy`;
- `X-Content-Type-Options`;
- `X-Frame-Options`;
- `Permissions-Policy`;
- `Cache-Control`.

## SEO

O website inclui:

- title e meta description;
- canonical URL;
- Open Graph;
- Twitter Cards;
- favicon;
- `robots.txt`;
- `sitemap.xml`;
- JSON-LD com dados estruturados;
- HTML semântico;
- imagens com dimensões explícitas;
- conteúdo otimizado para uma empresa local de serviços técnicos na Bélgica.

## Performance

O projeto foi construído com foco em leveza e velocidade.

Principais práticas:

- JavaScript mínimo;
- CSS modular;
- ausência de frameworks de interface;
- imagens responsivas;
- formatos AVIF, WebP e JPEG;
- fontes self-hosted;
- preload de fontes essenciais;
- lazy loading em imagens não críticas;
- build estático com Vite;
- hospedagem via Cloudflare CDN.

## Acessibilidade

Boas práticas aplicadas:

- navegação por teclado;
- skip link;
- labels associados aos campos;
- mensagens de erro acessíveis;
- `aria-live` no status do formulário;
- contraste compatível com o tema escuro;
- estrutura semântica;
- estados de foco visíveis;
- textos alternativos e imagens decorativas tratadas corretamente.

## Estrutura do projeto

```text
.
├── docs/
│   ├── adr/
│   ├── audit.md
│   ├── plan.md
│   └── spec.md
├── functions/
│   └── api/
│       └── contact.ts
├── public/
│   ├── _headers
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── fonts/
│   └── images/
├── scripts/
│   └── optimize-images.mjs
├── src/
│   ├── i18n/
│   ├── js/
│   └── styles/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Scripts

Instalar dependências:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Gerar build de produção:

```bash
npm run build
```

Pré-visualizar o build:

```bash
npm run preview
```

O script de build também executa a otimização de imagens:

```bash
npm run build:images
```

## Build e deploy

O projeto está preparado para **Cloudflare Pages**.

Configuração recomendada:

```text
Build command: npm run build
Build output directory: dist
Functions directory: functions
```

O Cloudflare Pages detecta a pasta `functions/` e publica automaticamente a rota serverless:

```text
/api/contact
```

## Cloudflare Pages

A hospedagem em Cloudflare Pages fornece:

- CDN global;
- HTTPS automático;
- deploy a partir do GitHub;
- Functions serverless;
- compressão automática;
- cache de assets estáticos;
- execução na edge.

Arquivos importantes para Cloudflare:

```text
public/_headers
functions/api/contact.ts
```

## Imagens

As imagens originais são processadas com **Sharp** para gerar versões otimizadas em múltiplos tamanhos e formatos.

Formatos gerados:

- AVIF;
- WebP;
- JPEG.

O objetivo é reduzir peso de página sem sacrificar qualidade visual.

## Internacionalização

O projeto possui suporte multilíngue por meio de um sistema i18n próprio em JavaScript.

Idiomas suportados:

- English;
- Français;
- Nederlands;
- Deutsch.

Os conteúdos localizados ficam em:

```text
src/i18n/locales/
```

## Manutenção

Princípios de manutenção:

- manter o projeto simples;
- evitar dependências desnecessárias;
- priorizar performance;
- manter o backend limitado a Cloudflare Pages Functions;
- não introduzir frameworks de interface sem necessidade;
- manter respostas de API previsíveis;
- não versionar secrets;
- validar o build antes de cada deploy.

## Checklist de produção

Antes de publicar alterações:

- confirmar que não há secrets no repositório;
- rodar `npm run build`;
- verificar o formulário de contato;
- testar Turnstile em produção;
- confirmar envio via Resend;
- revisar headers em `public/_headers`;
- confirmar sitemap e robots;
- verificar responsividade;
- revisar console do navegador;
- confirmar deploy no Cloudflare Pages.

---

## Credits

Developed by **Gilberto Assunção Soares** *(Founder · Owner · Lead Developer)*

With collaboration from **Brunno Mota** *(Developer)*

- GitHub: https://github.com/Gilbertoas90
- Portfolio: https://brunnomota.com.br

---

## License

Copyright © 2026 **BELNEX ENERGY**.

All rights reserved.

This project, its source code, visual identity and associated materials are the exclusive property of **BELNEX ENERGY**. Unauthorized copying, redistribution, publication or commercial use is prohibited.
