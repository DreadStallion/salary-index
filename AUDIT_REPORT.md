# SalaryIndex Audit Report
*Sprint date: May 28, 2026*

## Executive Summary

ussalaryindex.com was functionally complete (652+ pages, correct data, good SEO metadata) but had three structural weaknesses: (1) the city page was visually broken against the paper/navy/gold design system, (2) section headings were styled `<div>` elements rather than semantic `<h2>` tags, harming AEO extractability, and (3) the pages lacked factual prose blocks that AI answer engines need to cite confidently. All three were corrected in this sprint, plus Dataset schema, source citations, and CSS polish.

---

## Current Strengths

- **Paper/navy/gold design system** — distinctive, professional, consistent across most pages
- **Rich metadata** — title templates, OG image, Twitter card all correct
- **FAQPage JSON-LD on salary detail pages** — already fully wired with 4 questions/answers per page
- **BreadcrumbList on salary detail pages** — already present
- **Organization + WebSite + SearchAction schema** — in root layout
- **Data table styling** — `.data-table` CSS class is clean and consistent
- **Mobile responsiveness** — media queries cover all main layout breakpoints
- **Google Analytics + AdSense** — correctly wired in root layout
- **Methodology page** — accurate, well-written content
- **Google Analytics G-1MC7PJSWDN** — live
- **Static export** — fast, Cloudflare-compatible
- **DatasetCTA component** — dark navy box with preview table, use cases, dual CTAs

---

## Main Weaknesses (before this sprint)

### 1. City page design was completely broken
`city/[city]/page.tsx` used raw Tailwind dark classes (`text-white`, `bg-gray-900`, `text-blue-400`, `border-gray-800`) which clash with the paper/navy/gold system used everywhere else. The result: city pages looked like a different website.

### 2. No semantic headings for AEO/AIO
Section labels like "COMPENSATION DISTRIBUTION", "FREQUENTLY ASKED QUESTIONS", "SAME ROLE — OTHER MARKETS" were styled `<div>` elements. AI answer engines cannot extract headings from `<div>` tags — only from `<h1>`–`<h6>`. Google's AI Overviews, Perplexity, and ChatGPT all rely on heading structure to identify topic sections.

### 3. No factual answer block
The salary detail pages opened with a data grid but no prose summary. For AEO, the page needs to state the core answer in plain text so AI systems can quote it directly. "The median salary for X in Y is $Z per year" needs to appear as readable prose, not only inside JSON-LD or tables.

### 4. No Dataset schema
The site sells a CSV/Excel dataset product but had no `Dataset` schema in JSON-LD. This is a missed opportunity for Google's Dataset Search indexing.

### 5. BreadcrumbList missing from role and city pages
Only the salary detail pages had BreadcrumbList JSON-LD. Role and city pages had none, meaning Google couldn't render breadcrumb trails in SERPs for those pages.

### 6. Home page description mentioned Glassdoor and Indeed
The intro paragraph claimed data was "cross-referenced with Glassdoor and Indeed market data." This is not documented in the methodology and was removed — only BLS OES is the stated source.

### 7. DatasetCTA had identical URLs for paid and sample
Both buttons pointed to the same Gumroad URL. The secondary button text ("Download free salary sample →") implied a distinct free file that didn't exist at a separate URL. Fixed by relabeling the button to "Preview free sample on Gumroad →".

### 8. No source citation on salary pages
The bottom of salary detail pages had no source attribution block, making it harder for AI systems to assess data provenance when crawling page content.

### 9. CSS gaps
- No `scroll-behavior: smooth`
- No `a:focus-visible` outline (accessibility issue)
- `details summary` had no transition for expand/collapse
- `.source-box` utility class did not exist

---

## Visual Hierarchy Audit

| Page | Before | After |
|------|--------|-------|
| `/salary/[role]/[city]` | Strong — data grid, FAQ, tables | Strong + factual answer block, semantic h2s, source citation |
| `/role/[role]` | Good design, missing h2s | + factual answer block, semantic h2 for table section, BreadcrumbList JSON-LD |
| `/city/[city]` | Broken — dark Tailwind classes | Fully redesigned to match site system; + stats cards, factual answer block, BreadcrumbList JSON-LD |
| `/` (home) | Good structure, bad description | + stats bar chips, corrected description, methodology link |
| `/methodology` | Excellent | Unchanged |
| `/calculator` | Good | Unchanged |

---

## AEO / AIO Audit

### What AI systems need to extract answers:
1. Factual prose at the top of the page (not just inside tables or JSON-LD)
2. Semantic heading structure (`<h2>`, `<h3>`) to identify topic sections
3. FAQPage JSON-LD with verbatim question/answer pairs
4. BreadcrumbList JSON-LD for page context
5. Clear source attribution with date

### Status after sprint:

| Signal | Salary pages | Role pages | City pages |
|--------|-------------|------------|------------|
| Factual prose block | ✓ Added | ✓ Added | ✓ Added |
| Semantic h2 for sections | ✓ Added | ✓ Added | ✓ Added |
| FAQPage JSON-LD | ✓ Existed | — | — |
| BreadcrumbList JSON-LD | ✓ Existed | ✓ Added | ✓ Added |
| Source citation box | ✓ Added | — | — |
| Dataset schema (root) | ✓ Added | ✓ Added | ✓ Added |

---

## Priority Fixes Applied

1. **City page full redesign** — paper/navy/gold system, data-table class, summary cards, factual answer block
2. **Semantic h2 headings** — all section labels converted on salary, role, and city pages
3. **Factual answer blocks** — added after title on salary, role, and city pages
4. **Dataset schema** — added to root layout `@graph`
5. **BreadcrumbList JSON-LD** — added to role and city pages
6. **Home page** — removed Glassdoor/Indeed reference, added stats bar chips
7. **DatasetCTA** — secondary button copy fixed; no-context headline improved
8. **Source citation box** — added to salary detail pages with gold left border
9. **CSS polish** — scroll-behavior, focus-visible, source-box class, details transition

---

## Historical Charts Note

The site does not have historical salary trend charts (no chart library is installed). The salary data includes a `yoyChange` field which is surfaced as a "+X% YOY" tag. If historical visualizations are needed in the future, a lightweight option like Chart.js or Recharts could be added without breaking SSG — but this would require historical time-series data beyond what's currently in `data/salaries.ts`.

---

## Build Status

**Build passes clean.**
- 1,787 static pages generated (0 errors, 0 type errors)
- TypeScript check: PASS
- All 30 city pages, 113 role pages, 904 salary detail pages, compare pages all generated
