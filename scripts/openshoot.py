#!/usr/bin/env python3
"""OpenShoot v0.1: generate offline preparation report only. No network I/O."""
import argparse
import json
import re
from pathlib import Path

VALID_ACCOUNT = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_-]{1,79}$")
ENDPOINT = "https://{account}.suitetalk.api.netsuite.com/services/mcp/v1/suiteapp/com.netsuite.mcpstandardtools"

def validate_account_id(account_id):
    if not isinstance(account_id, str) or not VALID_ACCOUNT.fullmatch(account_id):
        raise ValueError("Account ID must contain only letters, digits, hyphen or underscore, with 2-80 characters.")
    return account_id.upper()

def build_report(account_id, environment="unknown", client="claude"):
    account_id = validate_account_id(account_id)
    domain_id = account_id.lower().replace("_", "-")
    if environment not in {"unknown", "sandbox", "production", "release-preview"}:
        raise ValueError("Invalid environment.")
    if client not in {"claude", "chatgpt", "other"}:
        raise ValueError("Invalid client.")
    return {
        "project": "OpenShoot NetSuite",
        "version": "0.1",
        "status": "OFFLINE_PREPARATION_ONLY",
        "account_id": account_id,
        "environment_user_supplied": environment,
        "client_user_supplied": client,
        "candidate_standard_tools_mcp_endpoint": ENDPOINT.format(account=domain_id),
        "account_domain_id": domain_id,
        "endpoint_verified": False,
        "live_connection_attempted": False,
        "role_permissions_verified": False,
        "account_features_verified": False,
        "administrator_checklist": [
            "Confirm account version, environment and enabled features in NetSuite.",
            "Check Server SuiteScript, OAuth 2.0 and REST Web Services prerequisites per current Oracle documentation.",
            "Check MCP Standard Tools SuiteApp installation and tool availability.",
            "Review the intended non-Administrator role and minimum required MCP and OAuth permissions.",
            "Approve external AI client usage and information-sharing policy.",
            "Use the official supported Claude connector OAuth flow for the intended role.",
            "Validate tools and read-only operations with appropriately non-sensitive test records.",
            "Inspect subsidiaries, custom records, scripts, workflows and approval impacts where authorised.",
            "Document permission boundaries and test evidence before production rollout."
        ],
        "unknown_without_live_connection": [
            "Account or endpoint existence",
            "NetSuite release/feature flags",
            "SuiteApp installation",
            "Effective role access",
            "Live MCP tools",
            "Customer customisations"
        ],
        "references": [
            "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_4160616848.html",
            "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_0714082142.html"
        ]
    }

def main(argv=None):
    parser = argparse.ArgumentParser(description="Create offline NetSuite MCP preparation report")
    parser.add_argument("--account-id", required=True)
    parser.add_argument("--environment", default="unknown", choices=["unknown", "sandbox", "production", "release-preview"])
    parser.add_argument("--client", default="claude", choices=["claude", "chatgpt", "other"])
    parser.add_argument("--output", type=Path)
    args = parser.parse_args(argv)
    try:
        report = build_report(args.account_id, args.environment, args.client)
    except ValueError as exc:
        parser.error(str(exc))
    rendered = json.dumps(report, indent=2) + "\n"
    if args.output:
        if args.output.exists() and args.output.is_symlink():
            parser.error("Refusing to write through a symlink")
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(rendered, encoding="utf-8")
        print("Saved offline readiness report: " + str(args.output))
    else:
        print(rendered, end="")

if __name__ == "__main__":
    main()
