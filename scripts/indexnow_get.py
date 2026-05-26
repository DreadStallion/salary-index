"""Submit all URLs to IndexNow via GET method (works without site verification)."""
import urllib.request, urllib.parse, urllib.error, time

KEY  = "01e9ababf720480492d081fc430528f69d3a2300"
BASE = "https://ussalaryindex.com"

ROLES = [
    "software-engineer","data-analyst","data-scientist","product-manager",
    "devops-engineer","ux-designer","marketing-manager","sales-manager",
    "financial-analyst","project-manager","hr-manager","accountant","nurse",
    "mechanical-engineer","electrical-engineer","cybersecurity-analyst",
    "machine-learning-engineer","cloud-architect","business-analyst",
    "operations-manager","graphic-designer","content-writer",
    "supply-chain-manager","pharmacist","civil-engineer","legal-counsel",
    "physician-assistant","database-administrator","network-engineer","qa-engineer",
]
CITIES = [
    "san-francisco","new-york","seattle","boston","austin","denver","chicago",
    "los-angeles","washington-dc","atlanta","dallas","miami","phoenix",
    "minneapolis","portland","san-diego","nashville","raleigh","salt-lake-city","detroit",
]

urls = [BASE + "/", BASE + "/cities"]
for r in ROLES:
    urls.append(f"{BASE}/role/{r}")
for c in CITIES:
    urls.append(f"{BASE}/city/{c}")
for r in ROLES:
    for c in CITIES:
        urls.append(f"{BASE}/salary/{r}/{c}")

ok = err = 0
print(f"Submitting {len(urls)} URLs to IndexNow...\n")

for i, url in enumerate(urls):
    encoded = urllib.parse.quote(url, safe="")
    api = f"https://api.indexnow.org/IndexNow?url={encoded}&key={KEY}"
    try:
        with urllib.request.urlopen(api, timeout=10) as r:
            if r.status == 200:
                ok += 1
            else:
                print(f"  [{i+1}] {r.status} — {url}")
                err += 1
    except Exception as e:
        print(f"  [{i+1}] Error — {url}: {e}")
        err += 1
    if (i + 1) % 50 == 0:
        print(f"  Progress: {i+1}/{len(urls)} — OK:{ok} Err:{err}")
    time.sleep(0.05)

print(f"\nDone. Submitted: {ok} OK, {err} errors.")
