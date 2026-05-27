# SEO Money Strategy — SalaryIndex
**Fecha:** 2026-05-27

---

## Modelo de monetización

| Canal | Estado | Potencial mensual |
|-------|--------|-------------------|
| Google AdSense | Pendiente aprobación | $50-500/mes (escala con tráfico) |
| API subscriptions | Pendiente KVK+Stripe | $29-499/mes por cliente |
| Job board affiliate | No implementado | $1-5 por click (LinkedIn, Indeed) |
| Email list | No implementado | Base para productos futuros |

---

## Mapa de intención de búsqueda

### Intención transaccional (más valiosa para AdSense + afiliados)
- "software engineer salary san francisco 2026"
- "nurse practitioner salary new york"
- "how much does a data scientist make in seattle"
- "software engineer salary vs data scientist"
- "best paying cities for software engineers"

### Intención comparativa (alta conversión)
- "software engineer vs data scientist salary"
- "san francisco vs austin salary comparison"
- "is $150k good salary in new york"

### Intención informacional (volumen + AEO)
- "average software engineer salary us"
- "what is a good salary in san francisco"
- "software engineer salary percentiles"
- "entry level data scientist salary"

### Intención de herramienta (retención + conversión)
- "salary calculator after taxes"
- "cost of living salary calculator"
- "salary converter city to city"

---

## Tipos de páginas necesarias

### Tier 1 — Ya existen, optimizar
- /salary/[role]/[city] — dinero real, intención directa
- /role/[role] — overview + hub de ciudad
- /city/[city] — hub por mercado
- /calculator — herramienta de retención

### Tier 2 — Crear pronto (alto impacto)
- /compare/[city-a]-vs-[city-b] — intención comparativa (ej: sf-vs-austin)
- /salary/[role]/[city]/[year] — datos históricos (futuro)
- /faq — AEO directo
- /methodology — autoridad + confianza
- /privacy-policy — legal (desbloquea AdSense)

### Tier 3 — Crear en 30-60 días
- /blog/[slug] — contenido editorial de autoridad
- /guides/[topic] — guías de negociación salarial
- /tools/[tool] — calculadoras adicionales

---

## Funnel orgánico

```
Google/Bing búsqueda de salario
        ↓
/salary/[role]/[city] o /role/[role]
        ↓
Tabla de ciudades → clicks a otras salary pages (retención)
        ↓
CTA: Calculator / API / Job boards (conversión)
        ↓
Anuncio AdSense o click a LinkedIn/Indeed (ingreso)
```

---

## Estrategia de conversión

### AdSense (activo cuando aprueben)
- Páginas salary tienen densidad de texto suficiente
- FAQ schema aumenta engagement → mejor RPM
- Calculadora tiene alta retención → más impressions

### API (activar tras KVK+Stripe)
- CTA en /developers ya existe
- Añadir CTA sutil en salary pages: "Need this data programmatically? Free API →"
- Añadir banner en homepage

### Job affiliates (implementar)
- LinkedIn + Indeed ya están enlazados en salary pages
- Considerar afiliación formal con Indeed Publisher Program
- Glassdoor tiene programa de afiliados

---

## Estrategia de autoridad (para ser citado por IA)

Para que ChatGPT, Perplexity, Google AI Overviews citen ussalaryindex.com:

1. **Respuestas directas al inicio de cada página** — primera frase debe ser la respuesta
2. **Datos verificables** — citar BLS OES explícitamente con año
3. **Estructurar con FAQ schema** — ya implementado en salary pages, extender a role/city
4. **Organization schema** — identificar la entidad como fuente confiable
5. **Página /methodology** — explica la fuente de datos con credibilidad
6. **Consistencia de datos** — mismos números en todas las páginas relacionadas

---

## Estrategia de automatización

- **Sitemap dinámico** — ya existe, arreglar URLs incorrectas
- **Metadata programática** — ya existe por página dinámica
- **Schema programático** — añadir a todas las páginas desde templates
- **Scripts de auditoría** — detectar páginas sin metadata, links rotos
- **IndexNow** — notificación automática a Bing/Yandex al deployer
