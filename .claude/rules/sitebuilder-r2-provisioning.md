---
name: sitebuilder-r2-provisioning
description: Use when deploying SiteBuilder sites — R2 folder setup.
---

# R2 provisioning for SiteBuilder builds (proven live 10 Sep 2026)

## Rule
Every SiteBuilder deploy must auto-run boilerplate `scripts/provision-r2.mjs`, which creates
one folder per service derived from client.spec.yaml:

    <bucket>/<clientKey>/<service-slug>/.keep

- **Bucket: `site-images`** (this is where rigbysplastering, heatingservicesltd etc. live).
  NOT lmb-client-assets — that bucket is for other client assets. (A first run wrongly
  targeted lmb-client-assets because of a bad env default; corrected live.)
- clientKey = site domain without TLD (multiskimplastering.co.uk → `multiskimplastering`).
- Plus a `general/` folder alongside the service folders.
- Verified live: multiskimplastering/ got 14 folders (13 services + general).

## Failure mode to avoid
The script's default on missing/mismatched credentials is a SILENT DRY-RUN (prints plan,
exit 0) — that is how multiskim's first deploy skipped provisioning without anyone noticing.
Any boilerplate change should make provisioning failure LOUD (fail the deploy), or at minimum
print an unmissable warning. Never trust 'deploy succeeded' to mean 'R2 folders exist' —
verify by listing the bucket.

## Verification recipe (boto3, credentials in env)
```python
import boto3, os
s3 = boto3.client('s3',
    endpoint_url=os.environ.get('R2_ENDPOINT') or f"https://{os.environ['CLOUDFLARE_ACCOUNT_ID']}.r2.cloudflarestorage.com",
    aws_access_key_id=os.environ['CLOUDFLARE_R2_ACCESS_KEY_ID'],
    aws_secret_access_key=os.environ['CLOUDFLARE_R2_SECRET_ACCESS_KEY'], region_name='auto')
names = [o['Key'] for o in s3.list_objects_v2(Bucket='site-images', MaxKeys=1000).get('Contents', [])]
hits = [n for n in names if n.startswith('<clientKey>/')]
```
Note: system python lacks boto3; `pip install --break-system-packages boto3` or use a venv.

## Related (back-burner) idea — client upload dashboard
Vince wants (eventually) a secret unguessable path on each client's own domain, password-
gated, letting clients upload photos into their own R2 service folders. Two variants were
discussed (handler inside the site's existing Worker vs standalone multi-client dashboard);
NOT built, parked by Vince 10 Sep. Revisit and pick a variant with Vince before building.

## Clone-media cross-reference
Niche image libraries (generic per-niche folders, optional Gemini variation pass) are the
source for filling these folders; client-site media must never leak between clients.