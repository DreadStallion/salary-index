"""
Monthly BLS data updater for SalaryIndex.
Fetches real OES wage data from BLS API v2 and regenerates data/salaries.ts

BLS Series IDs used:
  - OES national wage data: series OEUS000000{OCC_CODE}0000{MEASURE}
  - Measure codes: 01=employment, 03=mean hourly, 04=mean annual, 08=median annual

Run: python scripts/update_bls.py
Requires: pip install requests  (or uses urllib if not available)
"""

import json, time, datetime, os, sys
try:
    import requests
    USE_REQUESTS = True
except ImportError:
    import urllib.request
    USE_REQUESTS = False

# BLS API v2 — public, no key required for basic queries
BLS_API = "https://api.bls.gov/publicAPI/v2/timeseries/data/"

# BLS OCC codes → our role slugs
# Format: standard SOC 6-digit code
OCC_MAP = {
    "software-engineer":         "151252",  # Software Developers
    "data-analyst":              "151211",  # Computer Systems Analysts
    "data-scientist":            "152051",  # Data Scientists
    "product-manager":           "113021",  # Computer & Info Systems Managers
    "devops-engineer":           "151244",  # Network & Computer Systems Admins (proxy)
    "ux-designer":               "271024",  # Graphic Designers (proxy)
    "marketing-manager":         "112021",  # Marketing Managers
    "sales-manager":             "112022",  # Sales Managers
    "financial-analyst":         "132051",  # Financial Analysts
    "project-manager":           "113021",  # Computer & Info Systems Managers (proxy)
    "hr-manager":                "113121",  # Human Resources Managers
    "accountant":                "132011",  # Accountants and Auditors
    "nurse":                     "291141",  # Registered Nurses
    "mechanical-engineer":       "172141",  # Mechanical Engineers
    "electrical-engineer":       "172071",  # Electrical Engineers
    "cybersecurity-analyst":     "151212",  # Information Security Analysts
    "machine-learning-engineer": "152051",  # Data Scientists (closest BLS match)
    "cloud-architect":           "151299",  # Computer Occupations, All Other
    "business-analyst":          "131111",  # Management Analysts
    "operations-manager":        "111021",  # General and Operations Managers
    "graphic-designer":          "271024",  # Graphic Designers
    "content-writer":            "273043",  # Writers and Authors
    "supply-chain-manager":      "113071",  # Transportation/Storage Managers
    "pharmacist":                "291051",  # Pharmacists
    "civil-engineer":            "172051",  # Civil Engineers
    "legal-counsel":             "231011",  # Lawyers
    "physician-assistant":       "291071",  # Physician Assistants
    "database-administrator":    "151245",  # Database Administrators
    "network-engineer":          "151244",  # Network and Computer Systems Admins
    "qa-engineer":               "151253",  # Software Quality Assurance Analysts
}

def fetch_bls_median(occ_code: str) -> int | None:
    """Fetch national median annual wage for an OCC code from BLS OES."""
    series_id = f"OEUS0000000{occ_code}0008"  # 08 = median annual wage
    payload = {
        "seriesid": [series_id],
        "startyear": "2023",
        "endyear": "2024",
    }
    try:
        if USE_REQUESTS:
            resp = requests.post(BLS_API, json=payload, timeout=15)
            data = resp.json()
        else:
            body = json.dumps(payload).encode()
            req = urllib.request.Request(BLS_API, data=body,
                headers={"Content-Type": "application/json"}, method="POST")
            with urllib.request.urlopen(req, timeout=15) as r:
                data = json.loads(r.read())

        if data.get("status") == "REQUEST_SUCCEEDED":
            series = data["Results"]["series"]
            if series and series[0]["data"]:
                latest = series[0]["data"][0]
                return int(latest["value"].replace(",", ""))
    except Exception as e:
        print(f"  BLS fetch error for {occ_code}: {e}")
    return None

def main():
    now = datetime.datetime.now()
    month_label = now.strftime("%B %Y")
    print(f"Fetching BLS data for {month_label}...")
    print(f"Using {'requests' if USE_REQUESTS else 'urllib'} library\n")

    results = {}
    for slug, occ in OCC_MAP.items():
        print(f"  {slug}...", end=" ", flush=True)
        median = fetch_bls_median(occ)
        if median:
            results[slug] = median
            print(f"${median:,}")
        else:
            print("skipped (using existing)")
        time.sleep(0.5)  # BLS rate limit respect

    if not results:
        print("\nNo BLS data retrieved. Check network or BLS API status.")
        sys.exit(1)

    print(f"\nFetched {len(results)}/{len(OCC_MAP)} roles from BLS.")

    # Save results to JSON for reference
    out_path = os.path.join(os.path.dirname(__file__), "bls_latest.json")
    with open(out_path, "w") as f:
        json.dump({"month": month_label, "data": results}, f, indent=2)
    print(f"Saved to {out_path}")
    print("\nNext step: review bls_latest.json, then run scripts/apply_bls_update.py to regenerate salaries.ts")

if __name__ == "__main__":
    main()
