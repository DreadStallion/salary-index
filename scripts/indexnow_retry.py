"""
IndexNow submission with retry — runs until DNS propagates and verification succeeds.
"""
import json, time, urllib.request, urllib.error, sys

HOST = "ussalaryindex.com"
KEY  = "01e9ababf720480492d081fc430528f69d3a2300"
BASE = f"https://{HOST}"

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

print(f"Total URLs to submit: {len(urls)}")

payload = json.dumps({
    "host": HOST,
    "key": KEY,
    "keyLocation": f"{BASE}/{KEY}.txt",
    "urlList": urls,
}).encode("utf-8")

ENDPOINTS = [
    ("IndexNow", "https://api.indexnow.org/indexnow"),
    ("Bing",     "https://www.bing.com/indexnow"),
]

MAX_RETRIES = 20
WAIT_SECS   = 180  # 3 minutes between retries

for attempt in range(1, MAX_RETRIES + 1):
    print(f"\n[Attempt {attempt}/{MAX_RETRIES}] {time.strftime('%H:%M:%S')}")
    all_ok = True
    for name, endpoint in ENDPOINTS:
        req = urllib.request.Request(
            endpoint, data=payload,
            headers={"Content-Type": "application/json; charset=utf-8", "User-Agent": "SalaryIndex/1.0"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                print(f"  {name}: {resp.status} OK — URLs submitted successfully")
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"  {name}: {e.code} — {body[:120]}")
            all_ok = False
        except Exception as e:
            print(f"  {name}: Error — {e}")
            all_ok = False

    if all_ok:
        print("\nAll endpoints confirmed. IndexNow submission complete.")
        sys.exit(0)

    if attempt < MAX_RETRIES:
        print(f"  DNS still propagating — retrying in {WAIT_SECS//60} minutes...")
        time.sleep(WAIT_SECS)

print("\nMax retries reached. Run manually later: python scripts/indexnow_retry.py")
