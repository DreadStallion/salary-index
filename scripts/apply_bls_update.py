"""
Reads bls_latest.json, updates the BASE_SALARIES in data/salaries.ts,
rebuilds the site, and deploys to Cloudflare Pages.

Run after update_bls.py: python scripts/apply_bls_update.py
"""

import json, os, re, subprocess, sys, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLS_JSON = os.path.join(ROOT, "scripts", "bls_latest.json")
SALARIES_TS = os.path.join(ROOT, "data", "salaries.ts")

def round5k(n):
    return round(n / 5000) * 5000

def main():
    if not os.path.exists(BLS_JSON):
        print("bls_latest.json not found. Run update_bls.py first.")
        sys.exit(1)

    with open(BLS_JSON) as f:
        bls = json.load(f)

    month = bls["month"]
    new_medians = bls["data"]
    print(f"Applying BLS update for {month} ({len(new_medians)} roles)")

    with open(SALARIES_TS, "r", encoding="utf-8") as f:
        content = f.read()

    # Update month label
    content = re.sub(r"updatedAt: '[^']*'", f"updatedAt: '{month}'", content)

    # Update each BASE_SALARY entry median
    for slug, new_median in new_medians.items():
        # Match the line for this slug and update median value
        pattern = rf"('{re.escape(slug)}':\s*\{{[^}}]*?median:\s*)(\d+)"
        replacement = lambda m: m.group(1) + str(round5k(new_median))
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open(SALARIES_TS, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Updated {SALARIES_TS}")

    # Rebuild
    print("\nBuilding...")
    result = subprocess.run(["npx", "next", "build"], cwd=ROOT, capture_output=True, text=True)
    if result.returncode != 0:
        print("Build failed:")
        print(result.stdout[-2000:])
        print(result.stderr[-2000:])
        sys.exit(1)
    print("Build successful.")

    # Deploy
    print("\nDeploying to Cloudflare Pages...")
    result = subprocess.run(
        ["wrangler", "pages", "deploy", "out", "--project-name", "salary-index"],
        cwd=ROOT, capture_output=True, text=True
    )
    if result.returncode != 0:
        print("Deploy failed:")
        print(result.stdout)
        print(result.stderr)
        sys.exit(1)

    print(result.stdout[-500:])
    print(f"\nDeploy complete for {month}.")

    # Re-run IndexNow
    indexnow = os.path.join(ROOT, "scripts", "indexnow_retry.py")
    print("Submitting URLs to IndexNow...")
    subprocess.Popen([sys.executable, indexnow])
    print("IndexNow submission started in background.")

if __name__ == "__main__":
    main()
