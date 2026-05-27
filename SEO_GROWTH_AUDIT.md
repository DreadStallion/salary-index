# SEO Growth Audit — SalaryIndex (ussalaryindex.com)
**Fecha:** 2026-05-27 | **Auditado por:** SEO Growth System

---

## Estado actual del proyecto

- **Stack:** Next.js App Router, output:export (estático), Cloudflare Pages
- **Páginas generadas:** ~18,724 archivos estáticos
- **Roles:** 113 | **Ciudades activas en deploy:** 8 de 30 | **Ciudades en datos:** 30
- **Rutas principales:** /, /role/[role], /city/[city], /salary/[role]/[city], /compare/[slug], /calculator, /state/[state], /cities, /embed, /developers
- **Analytics:** GA4 instalado (G-1MC7PJSWDN) | AdSense instalado (pendiente aprobación)
- **Search Console:** verificado, sitemap enviado ayer
- **Indexación actual:** homepage indexada, resto pendiente

---

## Problemas críticos (bloquean tráfico o ingresos)

### P1 — CRÍTICO: Sitemap incluye 2,486 URLs que dan 404
El sitemap.ts genera salary pages para 113 roles × 30 ciudades = 3,390 URLs.
Pero generateStaticParams en salary/[role]/[city] solo genera 113 × 8 = 904 páginas.
Las 2,486 URLs restantes devuelven 404. Google las penaliza como soft 404.
**Fix:** Sincronizar sitemap con TOP_CITIES.

### P2 — CRÍTICO: No existe /privacy-policy
AdSense REQUIERE una página de política de privacidad para aprobar el sitio.
Sin ella la aprobación puede ser rechazada.
**Fix:** Crear página /privacy-policy.

### P3 — CRÍTICO: No existe /methodology
Footer enlaza a /methodology → 404. Links rotos penalizan SEO.
**Fix:** Crear página /methodology.

### P4 — ALTO: Metadata desactualizada en role pages
role/[role]/page.tsx dice "20 metropolitan markets" → deberían ser 30.
**Fix:** Actualizar copy.

### P5 — ALTO: Sin Organization + WebSite schema en root layout
Google y los LLMs no pueden identificar automáticamente la entidad del sitio.
**Fix:** Añadir JSON-LD en app/layout.tsx.

### P6 — ALTO: Sin Open Graph image
Cuando alguien comparte una URL en redes sociales o Slack no hay preview visual.
Reduce CTR de tráfico social.
**Fix:** Añadir og:image por defecto.

---

## Oportunidades rápidas (impacto en 1-7 días)

- Añadir BreadcrumbList schema en todas las páginas dinámicas
- Añadir WebSite schema con SearchAction (potencia el sitelinks searchbox en Google)
- Fix metadata: "30 markets" en vez de "20 markets"
- Crear /methodology (confianza + SEO de autoridad)
- Crear /privacy-policy (desbloquea AdSense)
- Añadir canonical URL explícito en todas las páginas
- Añadir Twitter card metadata

---

## Oportunidades de alto impacto (2-8 semanas)

- Expandir salary pages a las 30 ciudades (actualmente solo 8)
- Crear páginas /compare/[city-a]-vs-[city-b] (intención comparativa alta)
- Crear página /api (landing para desarrolladores con intención comercial)
- Crear contenido editorial: "Best paying cities for X" (fácil de rankear)
- Añadir email capture en homepage y salary pages
- Crear /faq con preguntas frecuentes de salario (AEO)
- Implementar IndexNow para notificar indexación inmediata

---

## Riesgos

| Riesgo | Impacto | Probabilidad |
|--------|---------|--------------|
| AdSense rechazado por falta de privacy policy | Alto | Alta |
| Penalización soft 404 por sitemap incorrecto | Alto | Media |
| Thin content en páginas de estado | Medio | Media |
| Contenido duplicado entre role/city y salary pages | Bajo | Baja |

---

## Acciones priorizadas por impacto económico

| # | Acción | Impacto | Esfuerzo | Dinero |
|---|--------|---------|----------|--------|
| 1 | Fix sitemap (eliminar soft 404s) | Alto | Bajo | AdSense + rankings |
| 2 | Crear /privacy-policy | Alto | Bajo | Desbloquea AdSense |
| 3 | Crear /methodology | Medio | Bajo | Confianza + autoridad |
| 4 | Organization + WebSite schema | Alto | Bajo | AEO + Google Knowledge |
| 5 | Fix metadata 20→30 markets | Bajo | Mínimo | CTR |
| 6 | BreadcrumbList schema | Medio | Bajo | Rankings + CTR |
| 7 | Expandir salary pages a 30 ciudades | Alto | Medio | +2,486 páginas indexables |
| 8 | City comparison pages | Alto | Medio | Tráfico comparativo |
| 9 | Email capture | Alto | Bajo | Lista para monetizar |
| 10 | IndexNow API | Medio | Bajo | Velocidad de indexación |
