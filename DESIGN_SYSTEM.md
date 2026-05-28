# SalaryIndex Design System
*As of sprint: May 28, 2026*

---

## Color System

All colors are defined as CSS custom properties in `app/globals.css`. Never use raw hex in components — always use the variable.

| Variable | Hex | Usage |
|----------|-----|-------|
| `--navy` | `#0b1f3a` | Primary color — H1 headings, table headers, borders, key data |
| `--navy-dark` | `#071529` | Top bar background, deepest dark surfaces |
| `--gold` | `#b8962e` | Accent — border-left highlights, tags, CTA button background |
| `--gold-lt` | `#d4af55` | Light gold — used on dark navy backgrounds for legibility |
| `--paper` | `#f7f6f2` | Page background — warm off-white |
| `--paper-alt` | `#eeecea` | Alternating row background (slightly darker paper) |
| `--ink` | `#12213a` | Body text on light backgrounds |
| `--ink-muted` | `#4a5568` | Secondary text, breadcrumbs, labels, timestamps |
| `--border` | `#d0cdc7` | Borders on tables, cards, separators |
| `--green` | `#1a6640` | Positive YoY growth figures |
| `--red` | `#8b1a1a` | Negative values (reserved for future use) |

**Dark surface colors** (used only inside `.DatasetCTA` component, not as CSS vars):
- Background: `#0a1628`
- Surface: `#0d1f3c`
- Border: `#1e3a5f`
- Gold on dark: `#c9a227`
- Text muted: `#7a90a8` / `#8a9bb5`
- Text primary: `#f0ead8`

---

## Typography

**Primary font:** Georgia, Times New Roman, serif — used for all headings and body text.

**Monospace font:** Courier New, Courier, monospace — used exclusively for salary numbers (`formatSalary()` output) and the `.mono` utility class.

| Use | Size | Weight | Notes |
|-----|------|--------|-------|
| H1 (page title) | 26–28px | 700 | `color: var(--navy)`, `letter-spacing: -0.01em` |
| H2 (section label) | 11px | 600 | `text-transform: uppercase`, `letter-spacing: 0.1em`, `color: var(--ink-muted)` |
| Body text | 15px | 400 | `line-height: 1.6` |
| Table headers | 11px | 600 | `text-transform: uppercase`, `letter-spacing: 0.08em` |
| Table data | 13.5px | 400 | Right-aligned by default, left-aligned for first column |
| Salary figures | 17–34px | 700 | Courier New, monospace |
| Metadata / timestamps | 13px | 400 | `color: var(--ink-muted)` |
| Tags / labels | 10–11px | 600 | `letter-spacing: 0.1em`, `text-transform: uppercase` |
| Breadcrumbs | 12px | 400 | `color: var(--ink-muted)` |
| Factual answer block | 14px | 400 | `line-height: 1.8`, key terms bolded |

---

## Layout

**Max width:** 1100px, centered with `margin: 0 auto`, `padding: 0 24px`

**Page structure (top to bottom):**
1. Site topbar — `--navy-dark` background, data badges (hidden on mobile)
2. Dataset promo banner — dark, gold link
3. Site header — `--navy` background, `--gold` 3px bottom border
4. `<main>` — `--paper` background, `padding: 40px 24px`
5. Footer — `--navy` background, `--gold` 3px top border

**Content patterns:**

| Pattern | Implementation |
|---------|---------------|
| Section header + rule | `<h2>` at 11px uppercase + `<span>` with `flex: 1, height: 1, background: var(--border)` |
| Stat summary cards | CSS Grid `repeat(3, 1fr)`, `gap: 2`, white cards with `--border` |
| Alternating rows | `i % 2 === 0 ? 'white' : 'var(--paper-alt)'` |
| Gold-bordered call-out | `border: 1px solid var(--border); border-left: 4px solid var(--gold)` |
| Navy-bordered call-out | `border: 1px solid var(--border); border-left: 4px solid var(--navy)` |

---

## Components

### `.data-table`
CSS class in `globals.css`. Apply to all data tables.
- `<th>`: `--navy` background, cream text, 11px uppercase
- `<td>`: right-aligned, 13.5px, `--border` bottom
- `.median` modifier: Courier New, 700, `--navy`
- Hover: `#ede9e0` background with `transition: background 0.12s ease`

### `.nav-row`
Used on home page for role/city list links.
- `display: flex`, `justify-content: space-between`
- `border-left: 3px solid transparent`
- Hover: `border-left-color: var(--gold)`, background `#ede9e0`
- Transition: `border-color 0.15s ease, background 0.15s ease`

### `.tag`
Small badge. `border: 1px solid var(--gold)`, `color: var(--gold)`, 10px uppercase.

### `.source-box`
Citation box for data attribution. `border: 1px solid var(--border)`, `border-left: 4px solid var(--gold)`, white background, 12px muted text.

### `DatasetCTA` (`components/DatasetCTA.tsx`)
Dark navy promotional block. Props: `role?: string`, `city?: string`.
- Headline is contextual: role+city / role-only / city-only / no context
- Primary CTA: `#c9a227` button → Gumroad full dataset
- Secondary CTA: transparent border button → "Preview free sample on Gumroad"
- Preview table: 5 representative rows
- Use cases: 5 labeled chips at bottom

### Factual Answer Block
Inline prose paragraph immediately after title. No component — inline JSX.
- `border: 1px solid var(--border); border-left: 4px solid var(--gold)`
- White background, 14px, `line-height: 1.8`
- Key data (salary figures) styled with `fontFamily: 'Courier New, monospace'`
- Used on: salary detail pages, role pages, city pages

### Source Citation Box (`.source-box`)
Appears at page bottom. States BLS OES source, data date, links to `/methodology`.
- Currently used on salary detail pages only

---

## Motion / Transitions

| Element | Transition |
|---------|------------|
| `.nav-row` hover | `border-color 0.15s ease, background 0.15s ease` |
| `.data-table tr` hover | `background 0.12s ease` |
| `details summary` (FAQ) | `background 0.15s ease` — open state shows `--paper-alt` |
| Page scroll | `scroll-behavior: smooth` on `html` element |

**Focus states:**
- `a:focus-visible`: `outline: 2px solid var(--gold); outline-offset: 2px; border-radius: 1px`
- Visible for keyboard navigation; hidden for mouse users (`:focus-visible` not `:focus`)

---

## JSON-LD Schema Map

| Page | Schema types present |
|------|---------------------|
| Root layout | Organization, WebSite (SearchAction), Dataset |
| `/salary/[role]/[city]` | FAQPage, BreadcrumbList |
| `/role/[role]` | BreadcrumbList |
| `/city/[city]` | BreadcrumbList |
| All others | Inherit root layout schemas |
