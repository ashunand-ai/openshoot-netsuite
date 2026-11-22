#!/usr/bin/env python3
"""Offline, evidence-based NetSuite AI Connector admin readiness auditor.
No network requests, credentials, or NetSuite calls. Python 3.10+ stdlib only.
"""
import argparse
import json
import re
import sys
from pathlib import Path

ACCOUNT_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_-]{1,79}$")
SOURCE = "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4160616848.html"
CHECKS = [
    ("account_confirmed", "Account ID, environment and release confirmed in NetSuite", "administrator"),
    ("features_enabled", "Server SuiteScript, OAuth 2.0 and REST Web Services features verified", "administrator"),
    ("standard_tools_installed", "MCP Standard Tools SuiteApp installed", "administrator"),
    ("non_admin_role", "Selected connection role is not Administrator or full-access equivalent", "administrator"),
    ("mcp_permission", "Role has MCP Server Connection permission", "administrator"),
    ("oauth_permission", "Role has Log in using OAuth 2.0 Access Tokens permission (not legacy Access Tokens)", "administrator"),
    ("rest_permission", "Role has REST Web Services permission when using Standard Tools", "administrator"),
    ("file_cabinet_access", "Role can access the SuiteApp folder in File Cabinet", "administrator"),
    ("data_sharing_approved", "External AI client data-handling terms approved by customer", "customer"),
    ("oauth_authorized", "OAuth 2.0 Authorization Code + PKCE completed for the intended role", "user"),
    ("integration_record_verified", "Integration record state and AI Connector scope verified", "administrator"),
    ("tools_listed", "Supported MCP client displays appropriate tools", "user"),
    ("runtime_role_verified", "Runtime account and role verified from live tool results", "user"),
    ("read_only_smoke_test", "Approved read-only operation succeeds in target environment", "user"),
    ("customization_reviewed", "Custom records, fields, workflows, subsidiaries and scripts reviewed or exceptions documented", "administrator"),
    ("audit_logged", "Date, role, tested tools, results and blockers recorded without secrets", "administrator"),
]
STATUSES = {"pass", "fail", "unknown", "not_applicable"}
SECRET_KEYS = ("secret", "token", "password", "credential", "private_key", "authorization", "cookie")
ENDPOINT_ROOT = "https://{domain}.suitetalk.api.netsuite.com/services/mcp/v1"

def account_domain(account):
    if not isinstance(account, str) or not ACCOUNT_RE.fullmatch(account):
        raise ValueError("Invalid account ID; enter the account ID, not a URL.")
    return account.lower().replace("_", "-")

def endpoints(account):
    root = ENDPOINT_ROOT.format(domain=account_domain(account))
    return {
        "all_toolsets": root + "/all",
        "standard_tools_only": root + "/suiteapp/com.netsuite.mcpstandardtools",
    }

def load_evidence(path):
    if path is None:
        return {}
    evidence = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(evidence, dict):
        raise ValueError("Evidence must be a JSON object")
    if set(evidence) - {key for key, _, _ in CHECKS}:
        raise ValueError("Unknown evidence keys: " + ", ".join(sorted(set(evidence) - {key for key, _, _ in CHECKS})))
    for key, item in evidence.items():
        if not isinstance(item, dict) or item.get("status") not in STATUSES:
            raise ValueError("Evidence item " + key + " must contain a valid status")
        if set(item) - {"status", "reference", "observed_at"}:
            raise ValueError("Unsupported evidence fields for " + key)
        for field in ("reference", "observed_at"):
            value = item.get(field, "")
            if not isinstance(value, str) or len(value) > 240:
                raise ValueError("Evidence reference/timestamp must be short strings")
            if any(word in field.lower() for word in SECRET_KEYS):
                raise ValueError("Forbidden evidence field")
            if re.search(r"(?i)(bearer\s+\S+|password\s*[=:]|token\s*[=:]|client_secret\s*[=:])", value):
                raise ValueError("Possible secret in evidence; remove it")
    return evidence

def assess(account, environment, evidence=None):
    if environment not in {"sandbox", "production", "release-preview"}:
        raise ValueError("Environment must be sandbox, production or release-preview")
    ep = endpoints(account)
    evidence = evidence or {}
    checks = []
    for key, label, owner in CHECKS:
        item = evidence.get(key, {})
        status = item.get("status", "unknown")
        checks.append({
            "key": key, "description": label, "owner": owner,
            "status": status, "reference": item.get("reference", ""),
            "observed_at": item.get("observed_at", ""),
        })
    failed = [x["key"] for x in checks if x["status"] == "fail"]
    outstanding = [x["key"] for x in checks if x["status"] not in {"pass", "not_applicable"}]
    # N/A requires an actual reviewer; for safe release, no N/A on critical controls.
    mandatory = {"non_admin_role", "mcp_permission", "oauth_permission", "data_sharing_approved",
                 "oauth_authorized", "tools_listed", "runtime_role_verified", "read_only_smoke_test"}
    invalid_na = [x["key"] for x in checks if x["key"] in mandatory and x["status"] == "not_applicable"]
    no_proof = [x["key"] for x in checks if x["status"] == "pass" and not x["reference"].strip()]
    ready = not outstanding and not invalid_na and not no_proof
    return {
        "product": "OpenShoot NetSuite", "version": "0.2.0",
        "execution_mode": "OFFLINE_EVIDENCE_REVIEW_NO_NETWORK_CALLS",
        "environment": environment, "account_id": account,
        "endpoints_unverified": ep,
        "connection_test_performed_by_openshoot": False,
        "release_gate": "EVIDENCE_COMPLETE_UNVERIFIED_EXTERNALLY" if ready else "BLOCKED",
        "important": "Passing this checklist only reflects administrator-supplied evidence; it is not enterprise certification or independent live verification.",
        "failed": failed, "outstanding": outstanding, "missing_pass_references": no_proof,
        "invalid_not_applicable": invalid_na, "checks": checks, "source": SOURCE,
    }

def markdown(report):
    lines = [
        "# OpenShoot NetSuite — administrator readiness",
        "", "**Release gate:** " + report["release_gate"],
        "", "**Important:** " + report["important"],
        "", "Environment: `" + report["environment"] + "`",
        "Account ID: `" + report["account_id"] + "`",
        "", "## Candidate NetSuite MCP URLs (not tested)",
    ]
    for label, url in report["endpoints_unverified"].items():
        lines.append("- " + label + ": `" + url + "`")
    lines += ["", "## Evidence and outstanding actions",
              "| Check | Responsible | Status | Reference |", "|---|---|---|---|"]
    for c in report["checks"]:
        lines.append("| " + c["description"].replace("|", "/") + " | " + c["owner"] +
                     " | " + c["status"] + " | " + c["reference"].replace("|", "/") + " |")
    lines += ["", "## Safe next steps",
              "1. Complete missing administrator checks in the NetSuite UI.",
              "2. Connect in a supported AI client using its OAuth PKCE flow and a least-privilege role.",
              "3. List live tools, inspect runtime account/role and perform authorised read-only tests.",
              "4. Capture evidence references and re-run this report.",
              "5. Do not treat this offline review as a production certification.",
              "", "Official Oracle source: " + SOURCE, ""]
    return "\n".join(lines)

def main(argv=None):
    p = argparse.ArgumentParser(description="Generate offline NetSuite administrator readiness and evidence report")
    p.add_argument("--account-id", required=True)
    p.add_argument("--environment", choices=["sandbox", "production", "release-preview"], required=True)
    p.add_argument("--evidence", type=Path, help="Optional JSON status/reference evidence file")
    p.add_argument("--format", choices=["json", "markdown"], default="markdown")
    p.add_argument("--output", type=Path)
    p.add_argument("--strict", action="store_true", help="Exit 2 if evidence gate blocked")
    args = p.parse_args(argv)
    try:
        report = assess(args.account_id, args.environment, load_evidence(args.evidence))
        rendered = (json.dumps(report, indent=2) + "\n") if args.format == "json" else markdown(report)
        if args.output:
            if args.output.is_symlink():
                raise ValueError("Refusing to write through symlink")
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(rendered, encoding="utf-8")
            print("Wrote report: " + str(args.output))
        else:
            print(rendered)
        return 2 if args.strict and report["release_gate"] == "BLOCKED" else 0
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        print("ERROR: " + str(exc), file=sys.stderr)
        return 1

if __name__ == "__main__":
    sys.exit(main())
