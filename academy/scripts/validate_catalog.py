#!/usr/bin/env python3
"""Validate OpenShoot video lesson catalog without network access."""
import argparse
import json
import re
import sys
from pathlib import Path

REQUIRED = {'id','title','audience','release','source_url','status','readiness','risk','video_script','lesson_path','outcome'}
ALLOWED_STATUS = {'researched','scripted','recorded','published'}
ALLOWED_RISK = {'read-only','configuration','financial-impact'}
ORACLE_HOST = 'https://docs.oracle.com/en/cloud/saas/netsuite/'

def validate(rows, root=None):
    failures=[]
    if not isinstance(rows,list) or not rows:
        return ['catalog must contain a non-empty list of lessons']
    ids=set()
    for n,entry in enumerate(rows,1):
        if not isinstance(entry,dict):
            failures.append(f'item {n} must be an object');continue
        missing=REQUIRED-set(entry)
        if missing: failures.append(f'item {n}: missing {sorted(missing)}')
        key=entry.get('id')
        if not isinstance(key,str) or not re.fullmatch(r'[a-z][a-z0-9-]{2,60}',key):
            failures.append(f'item {n}: invalid id')
        elif key in ids: failures.append(f'item {n}: duplicate id {key}')
        ids.add(key)
        if entry.get('status') not in ALLOWED_STATUS: failures.append(f'item {n}: invalid status')
        if entry.get('risk') not in ALLOWED_RISK: failures.append(f'item {n}: invalid risk')
        if not isinstance(entry.get('source_url'),str) or not entry['source_url'].startswith(ORACLE_HOST):
            failures.append(f'item {n}: source must be official Oracle NetSuite docs')
        if not isinstance(entry.get('readiness'),str) or len(entry['readiness']) < 12:
            failures.append(f'item {n}: readiness instructions too short')
        if root:
            for field in ('lesson_path','video_script'):
                path=entry.get(field)
                if not isinstance(path,str) or path.startswith('/') or '..' in Path(path).parts:
                    failures.append(f'item {n}: invalid {field} path');continue
                if not (Path(root)/path).is_file():failures.append(f'item {n}: missing {field}: {path}')
    return failures

def main(argv=None):
    p=argparse.ArgumentParser()
    p.add_argument('catalog',type=Path)
    p.add_argument('--root',type=Path)
    args=p.parse_args(argv)
    try: rows=json.loads(args.catalog.read_text(encoding='utf-8'))
    except (OSError, ValueError) as e:
        print('Invalid catalog: '+str(e),file=sys.stderr);return 1
    errors=validate(rows,args.root)
    if errors:
        print('\n'.join(errors),file=sys.stderr);return 1
    print(f'Validated {len(rows)} lessons; publication status is metadata, not a live UI test.')
    return 0

if __name__=='__main__':sys.exit(main())
