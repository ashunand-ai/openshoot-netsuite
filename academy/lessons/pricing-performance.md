# Find margin leaks with Item Pricing Performance Workbook

**Audience:** CFOs and sales operations  
**Oracle release:** 2026.2 August-September  
**Status:** Scripted tutorial; not verified in a live NetSuite tenant  
**Risk classification:** read-only

## Why this matters

A NetSuite workbook can expose pricing leakage that used to require a custom consulting report. This walkthrough uses Oracle's published capability and focuses on reducing repetitive professional-services setup or training work. It does not replace complex design, security or audit assurance.

## Before you begin

Confirm Item Pricing Performance Workbook and relevant analytics permissions are available. Access and UI vary by account and role. Use a sandbox or authorised non-sensitive training data; do not share credentials or customer data.

## Step-by-step administrator/user workflow

1. Open Analytics Home and locate the Item Pricing Performance workbook card or search.
2. Review price, units sold, revenue, cost and margin in the item-level view.
3. Apply item, period, price-level, currency and subsidiary context where available.
4. Compare configured item prices against historical realised pricing and margins.
5. Flag outliers for finance review, accounting for rebates, FX and cost allocation.
6. Do not change item pricing based solely on the analysis; request an approved pricing process.

## What good looks like

Item margin review and pricing anomaly checklist. Ask the user to save an evidence reference, timestamp, applicable role and unresolved blocker in a private location.

## Troubleshooting

If menus or tools are unavailable, first check account release, feature entitlement, role access and the latest Oracle instructions. Do not escalate privileges without administrator approval. If the outcome differs from NetSuite, treat NetSuite source records as authoritative and stop before further actions.

## Official Oracle source

https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_155557612.html

## Video companion

[Production script](../videos/pricing-performance.md). Scripts are not rendered videos and do not imply live tenant validation.
