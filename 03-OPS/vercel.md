# Vercel Hosting

## What it does

Vercel hosts the SKS TALENTS site and provides preview and production deployment.

## Required env vars

- all variables from `.env.example` that are required for production
- `VERCEL_URL` is auto-populated by Vercel at runtime

## How it is used

- `vercel deploy` publishes preview builds.
- `vercel deploy --prod` publishes the production site.
- environment variables are configured in the Vercel dashboard.

## Key rotation

- Rotate API keys in service provider consoles.
- Update values in Vercel production env vars.

## Common errors

- build failures due to missing env vars
- failed deployments because project is not linked
- domain verification or CNAME mismatch on custom domains

## Docs

- Vercel docs: https://vercel.com/docs
