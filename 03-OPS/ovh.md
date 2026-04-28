# OVH DNS

## What it does

OVH manages the `skstalents.fr` DNS zone and the `www` alias.

## DNS records to update for Vercel

- Type: A, Name: `@`, Value: `76.76.21.21`, TTL: `3600`
- Type: CNAME, Name: `www`, Value: `cname.vercel-dns.com.`, TTL: `3600`

## What not to change

- MX records
- SPF / DKIM / DMARC records
- existing email DNS settings

## Common errors

- SSL not issuing: incorrect A/CNAME values or propagation delay
- domain not found: wrong zone selected
- mixed DNS entries for `www` or apex

## Docs

- OVH DNS docs: https://www.ovh.com/world/dedicated/help/dns/
