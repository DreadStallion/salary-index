# SEO Implementation Log
**Proyecto:** ussalaryindex.com

---

## 2026-05-27 — Auditoría inicial + fixes críticos

### Cambios implementados

#### 1. Fix sitemap — eliminar soft 404s
**Archivo:** `app/sitemap.ts`
**Qué:** Sitemap generaba 113×30=3,390 salary URLs pero solo 113×8=904 existen como páginas estáticas.
**Por qué:** Las 2,486 URLs inexistentes causan soft 404s que penalizan rankings.
**Fix:** Añadida constante SALARY_CITIES con las 8 ciudades generadas estáticamente.
**Impacto esperado:** Elimina señales negativas de crawl, mejora crawl budget.

#### 2. Organization + WebSite schema en root layout
**Archivo:** `app/layout.tsx`
**Qué:** Añadido JSON-LD con Organization y WebSite schema incluyendo SearchAction.
**Por qué:** Permite a Google y LLMs identificar SalaryIndex como entidad. SearchAction activa sitelinks searchbox.
**Impacto esperado:** Mejor presencia en Knowledge Graph, posibilidad de citación por IA.

#### 3. Open Graph + Twitter Card metadata
**Archivo:** `app/layout.tsx`
**Qué:** Añadido og:image, og:description, twitter:card completos.
**Por qué:** Sin OG metadata, compartir URLs en redes sociales no genera preview.
**Impacto esperado:** Mejor CTR en tráfico social.

#### 4. Metadata homepage mejorada
**Archivo:** `app/layout.tsx`
**Qué:** Title y description actualizados con keywords de alta intención.
**Por qué:** El title anterior era genérico. Ahora incluye "113 Roles", "30 Cities", "BLS OES".
**Impacto esperado:** Mejor CTR en SERPs.

#### 5. Creación /methodology
**Archivo:** `app/(site)/methodology/page.tsx`
**Qué:** Página completa explicando fuentes de datos, metodología de percentiles, ajuste geográfico.
**Por qué:** Footer enlazaba a 404. Página de metodología es crítica para confianza y AEO.
**Impacto esperado:** Confianza editorial, citabilidad por IA, fix de link roto.

#### 6. Creación /privacy-policy
**Archivo:** `app/(site)/privacy-policy/page.tsx`
**Qué:** Política de privacidad completa con GDPR, cookies, AdSense, Analytics.
**Por qué:** Requerida por Google AdSense para aprobación del sitio.
**Impacto esperado:** Desbloquea aprobación de AdSense → ingresos por visita.

#### 7. Fix metadata role pages
**Archivo:** `app/(site)/role/[role]/page.tsx`
**Qué:** "20 metropolitan markets" → "30 metropolitan markets" en title, description y body.
**Por qué:** Dato incorrecto. Hay 30 ciudades, no 20.
**Impacto esperado:** Precisión de datos, confianza.

#### 8. Privacy Policy en footer
**Archivo:** `app/(site)/layout.tsx`
**Qué:** Añadido link a /privacy-policy en footer.
**Por qué:** Visibilidad y accesibilidad de la política de privacidad.

---

## Pendiente (próximas iteraciones)

- [ ] Crear og-image.png (1200×630) para Open Graph
- [ ] Añadir BreadcrumbList schema en salary, role y city pages
- [ ] Expandir salary pages a las 30 ciudades (requiere revisión del límite de archivos)
- [ ] Crear /compare/[city-a]-vs-[city-b] pages
- [ ] Añadir FAQ schema a role y city pages
- [ ] Implementar IndexNow API
- [ ] Añadir email capture
- [ ] Crear scripts de auditoría automatizada
