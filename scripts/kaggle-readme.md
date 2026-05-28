# U.S. Salary Dataset 2025 — Preview (100 rows)

This is a **100-row preview** of the full U.S. Salary Dataset covering 113 roles across 30 U.S. metropolitan areas.

## Full Dataset

**Get the complete dataset (3,360 records) for $19:**
→ https://dreadstallion.gumroad.com/l/tvhsz

**Live salary lookup tool:**
→ https://ussalaryindex.com

---

## What's in the preview

100 rows selected to represent:
- **13 job categories:** tech, healthcare, finance, management, marketing, engineering, design, HR, supply chain, education, trades
- **30 cities** (preview covers the highest-traffic 8: SF, NYC, Seattle, Boston, LA, Chicago, Austin, Atlanta)
- **Major roles:** Software Engineer, Data Scientist, AI Engineer, Physician, Financial Analyst, Registered Nurse, and more

---

## Schema

| Column | Type | Description |
|--------|------|-------------|
| `role` | string | Full job title |
| `role_slug` | string | URL-safe identifier |
| `city` | string | Metropolitan area name |
| `city_slug` | string | URL-safe identifier |
| `state` | string | U.S. state abbreviation |
| `category` | string | Job category |
| `median` | integer | Median annual salary (USD) |
| `p25` | integer | 25th percentile (entry level) |
| `p75` | integer | 75th percentile (senior) |
| `p90` | integer | 90th percentile (top earner) |
| `yoy_change` | float | Year-over-year % change |
| `source` | string | Data source |
| `updated` | string | Data currency |

---

## Methodology

- **Source:** U.S. Bureau of Labor Statistics Occupational Employment and Wage Statistics (OES), May 2025 release
- **Adjustment:** National BLS medians adjusted per city using cost-of-labor indices derived from regional wage differentials in the OES microdata
- **Rounding:** All salary figures rounded to nearest $5,000 for readability
- **Coverage:** 113 roles × 30 cities = 3,390 possible data points (3,360 with full data coverage)
- **Base year:** 2025 (BLS OES May 2025 survey)
- **YoY change:** Computed from sequential BLS OES releases

---

## Full Dataset Contents

| Dimension | Count |
|-----------|-------|
| Job roles | 113 |
| Cities | 30 |
| Total records | 3,360 |
| Percentile columns | 4 (P25, Median, P75, P90) |
| Formats | Excel (.xlsx) + CSV |

**Categories covered:**
Technology · Healthcare · Finance & Legal · Business & Management · Sales & Marketing · Engineering · Design & Creative · HR & People · Supply Chain · Education · Trades

**Cities covered:**
San Francisco · New York · Seattle · Boston · Los Angeles · San Diego · Sacramento · Washington DC · Baltimore · Philadelphia · Pittsburgh · Chicago · Austin · Dallas · Houston · Denver · Portland · Minneapolis · Atlanta · Miami · Tampa · Phoenix · Las Vegas · Nashville · Charlotte · Raleigh · Salt Lake City · Kansas City · Columbus · Detroit

---

## License

This dataset is provided for personal and commercial use.
Full dataset purchased via Gumroad includes unlimited use license.
Preview data (this file) is free for research and educational purposes.

---

## Citation

> ussalaryindex.com. (2026). *U.S. Salary Dataset 2025 — 113 Roles × 30 Cities*. Retrieved from https://ussalaryindex.com. Source: BLS OES May 2025.
