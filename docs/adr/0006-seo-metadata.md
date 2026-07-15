# ADR 0006 — SEO e metadados

## Status
Aceito

## Contexto
O objetivo de negócio é geração de leads locais (Bélgica) para serviços de elétrica/solar/smart home/EV/heat pump/segurança. O site precisa ser descobrível em buscas de serviço + intenção local, e compartilhável com preview correto em redes sociais.

## Decisão

- **Hierarquia de headings semântica:** exatamente um `<h1>` (hero), `<h2>` por seção principal, sem pular níveis (não usar `<h3>` sem um `<h2>` pai na mesma seção).
- **Open Graph completo:** `og:title`, `og:description`, `og:image` (1200×630, formato específico para social, não reaproveitar a imagem do hero diretamente), `og:url`, `og:type=website`, `og:locale`. Twitter Card (`summary_large_image`) espelhando os mesmos dados.
- **Schema.org via JSON-LD:** tipo `ElectricalContractor` (mais específico que `Organization` genérico, ajuda em rich results de negócio local), incluindo `name`, `address` (placeholder até termos endereço comercial real), `telephone` (placeholder), `areaServed` (Bélgica), `sameAs` (redes sociais), `makesOffer` listando os 16 serviços específicos do cliente (atualizado quando a lista de serviços real substituiu o agrupamento inicial de 7 categorias da FASE 0).
- **Sitemap e robots:** `sitemap.xml` gerado no build (mesmo sendo página única, referencia âncoras principais para completude), `robots.txt` permitindo indexação total.
- **Meta description única e persuasiva** (não genérica), `<link rel="canonical">` apontando para a URL de produção.

## Alternativas consideradas
- **Schema.org tipo `Organization` genérico** — descartado por ser menos específico; tipos de negócio local/setorial (`ElectricalContractor`, subtipo de `LocalBusiness`) tendem a ser mais úteis para rich results de busca local, que é exatamente o caso de uso da Belnex.
- **Omitir JSON-LD nesta fase** (deixar só meta tags básicas) — descartado porque o custo de implementação é baixo e o ganho potencial em SEO local é alto, especialmente dado o objetivo de geração de leads.

## Consequências
- JSON-LD contém placeholders explícitos (endereço, telefone comercial) que precisam ser atualizados assim que os dados reais chegarem — rastreado como pendência aberta da spec (seção "Gaps de conteúdo").
- Validação obrigatória antes de considerar a FASE 3 concluída: Rich Results Test / validador schema.org sem erros.
