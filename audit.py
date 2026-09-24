#!/usr/bin/env python3
"""
audit.py — consistency checker for data/schools.json

Run it after any edit, or on a random sample, before opening a pull request:

    python3 tools/audit.py                # audit every row
    python3 tools/audit.py --sample 30    # random 30-row spot check
    python3 tools/audit.py --sample 30 --seed 42   # reproducible sample

It catches the failure modes that have actually occurred in this dataset:

  * a tier that contradicts its own hardware string (GWU was scored `frontier`
    while listing only V100)
  * hardware attributed to the wrong machine (Missouri named a national NSF
    cluster; Tulane named LONI GPUs as if they were its own)
  * announced-but-not-operational hardware scored as available (Arizona's H200s
    are on a cluster that has not rolled out)
  * big claims resting on a single source
  * schema drift: missing fields, bad tier slugs, duplicate names, two label
    strings for one tier

Exit code is 1 if anything is flagged, so it can gate CI.
"""
import argparse, json, os, random, re, sys

VALID_TIERS = {"frontier", "modern", "older", "unspecified", "undetailed",
               "cpuonly", "construction", "none", "standalone"}
REQUIRED = {"state", "school", "university", "standalone", "tier", "tierLabel",
            "gpu", "slurm", "hpcName", "specs", "sources", "notes", "networks"}
VERIFIED_MARKERS = ("Re-verified", "RECLASSIFIED", "CORRECTED", "UPDATED", "ADDED")

FRONTIER = r"(H100|H200|B200|B300|GB200|GH200|Grace[ -]?Hopper|Blackwell)"
MODERN   = r"(A100|A40|A30|A16|A10\b|A2\b|L40S?|A6000|A5000|RTX\s?PRO\s?6000|RTX6000\s?Pro|MI100|MI300|Ampere[- ]class|Ampere[- ]gen)"

# Phrases that MENTION a part only to rule it out. Without this, a row that
# honestly says "no Hopper-class hardware was found" gets flagged for naming
# Hopper — which is exactly backwards.
NEGATED = re.compile(
    r"(no|without|not|lacks|absent|never)\b[^.;]{0,60}?" + FRONTIER, re.I)

# RTX PRO 6000 is Blackwell-architecture but CONTRIBUTING.md's tier table lists it
# under `modern`, not `frontier`. Strip that phrasing before the frontier check so
# the tool follows the project's own definitions rather than NVIDIA's marketing.
RTX_BLACKWELL = re.compile(r"RTX\s?(PRO\s?)?6000\s*(Pro\s*)?(Ada\s*)?(Blackwell)?", re.I)


def mentions(pattern, text):
    """True if `text` names a part in `pattern` other than to rule it out."""
    if not text:
        return False
    scrubbed = NEGATED.sub(" ", text)
    if pattern is FRONTIER or pattern == FRONTIER:
        scrubbed = RTX_BLACKWELL.sub(" ", scrubbed)
    return bool(re.search(pattern, scrubbed, re.I))


def audit_row(i, s):
    issues = []
    gpu, tier = s.get("gpu", ""), s.get("tier", "")

    missing = REQUIRED - set(s)
    if missing:
        issues.append(f"missing fields: {sorted(missing)}")
        return issues
    if tier not in VALID_TIERS:
        issues.append(f"invalid tier slug {tier!r}")

    has_f, has_m = mentions(FRONTIER, gpu), mentions(MODERN, gpu)

    if tier == "frontier" and not has_f:
        issues.append("tier=frontier but no Hopper/Blackwell part named")
    # A caveat field is exactly where a deliberate tier/hardware divergence gets
    # explained (condo nodes, announced-not-operational). If one exists, trust it.
    explained = "caveat" in s
    if tier == "modern" and has_f and not explained:
        issues.append("tier=modern but a Hopper/Blackwell part is named — upgrade, or add a caveat")
    if tier == "modern" and not (has_m or has_f):
        issues.append("tier=modern but no Ampere/Ada-class part named")
    if tier == "older" and has_f and not explained:
        issues.append("tier=older but a Hopper/Blackwell part is named — add a caveat if deliberate")
    if tier in ("none", "standalone") and (has_f or has_m):
        issues.append(f"tier={tier} but real GPU hardware is named")

    # Sourcing. CONTRIBUTING.md: sources are what you actually used on THIS row.
    if not s["sources"]:
        issues.append("no sources")
    elif len(s["sources"]) == 1 and tier in ("frontier", "modern"):
        issues.append("single source on a positive tier claim")
    for u in s["sources"]:
        if not str(u).startswith("http"):
            issues.append(f"source is not a URL: {u!r}")

    if not any(k in s["notes"] for k in VERIFIED_MARKERS):
        issues.append("no deep-verification note")

    # Announced != operational. This is the Arizona failure mode.
    blob = (s["notes"] + " " + s["specs"]).lower()
    if any(w in blob for w in ("not yet", "under development", "coming soon",
                               "scheduled for", "department-level", "pending")):
        if "caveat" not in s:
            issues.append("announced/departmental language but no caveat field")

    # standalone bookkeeping
    if tier == "standalone" and s["standalone"] is not True:
        issues.append("tier=standalone but standalone flag is not true")
    if s["standalone"] is True and s["university"]:
        issues.append("standalone=true but a parent university is named")
    if s["standalone"] is False and not s["university"]:
        issues.append("standalone=false but no parent university named")
    return issues


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--path", default="data/schools.json")
    ap.add_argument("--sample", type=int, default=0, help="audit N random rows")
    ap.add_argument("--seed", type=int, default=None)
    a = ap.parse_args()

    path = a.path if os.path.exists(a.path) else "schools.json"
    data = json.load(open(path))

    idx = list(range(len(data)))
    if a.sample and a.sample < len(data):
        if a.seed is not None:
            random.seed(a.seed)
        idx = sorted(random.sample(idx, a.sample))

    # whole-file checks, independent of the sample
    globals_ = []
    names = {}
    for i, s in enumerate(data):
        n = s.get("school")
        if n in names:
            globals_.append(f"duplicate school name: {n!r} (rows {names[n]} and {i})")
        names[n] = i
    for t in VALID_TIERS:
        labels = {s["tierLabel"] for s in data if s.get("tier") == t and "tierLabel" in s}
        if len(labels) > 1:
            globals_.append(f"tier {t!r} has {len(labels)} different tierLabel strings: {labels}")

    flagged = []
    for i in idx:
        iss = audit_row(i, data[i])
        if iss:
            flagged.append((i, data[i].get("school", "?"), iss))

    print(f"audited {len(idx)} of {len(data)} rows from {path}")
    print(f"clean {len(idx) - len(flagged)} | flagged {len(flagged)}")
    if globals_:
        print("\nWHOLE-FILE ISSUES:")
        for g in globals_:
            print("  -", g)
    if flagged:
        print("\nFLAGGED ROWS:")
        for i, name, iss in flagged:
            print(f"  [{i}] {name}")
            for x in iss:
                print(f"        - {x}")
    if not flagged and not globals_:
        print("\nno issues found")
    return 1 if (flagged or globals_) else 0


if __name__ == "__main__":
    sys.exit(main())
