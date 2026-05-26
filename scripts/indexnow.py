import json
import urllib.request
import urllib.error

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
for role in ROLES:
    urls.append(f"{BASE}/role/{role}")
for city in CITIES:
    urls.append(f"{BASE}/city/{city}")
for role in ROLES:
    for city in CITIES:
        urls.append(f"{BASE}/salary/{role}/{city}")

print(f"Total URLs: {len(urls)}")

payload = {
    "host": HOST,
    "key": KEY,
    "keyLocation": f"{BASE}/{KEY}.txt",
    "urlList": urls,
}

body = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(
    "https://api.indexnow.org/indexnow",
    data=body,
    headers={
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "SalaryIndex/1.0",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        print(f"IndexNow response: {resp.status} {resp.reason}")
except urllib.error.HTTPError as e:
    body_text = e.read().decode()
    print(f"HTTP Error {e.code}: {e.reason}")
    print(body_text)
except Exception as e:
    print(f"Error: {e}")

# Also ping Bing directly
req_bing = urllib.request.Request(
    "https://www.bing.com/indexnow",
    data=body,
    headers={
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "SalaryIndex/1.0",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(req_bing, timeout=30) as resp:
        print(f"Bing IndexNow response: {resp.status} {resp.reason}")
except urllib.error.HTTPError as e:
    body_text = e.read().decode()
    print(f"Bing HTTP Error {e.code}: {e.reason}")
    print(body_text)
except Exception as e:
    print(f"Bing Error: {e}")
