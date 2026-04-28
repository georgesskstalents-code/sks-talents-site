# Turnstile Anti-bot

## What it does

Cloudflare Turnstile protects lead forms from abuse and spam.

## Required env vars

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

## How it is used

- `components/TurnstileWidget.tsx` renders the client-side widget.
- server routes validate Turnstile responses before accepting form submissions.

## Key rotation

- Rotate keys in Cloudflare when needed.
- Update both site and secret keys in Vercel and local environment.

## Common errors

- widget not rendering: invalid site key
- validation failures: wrong secret key or missing token
- CORS issues: browser restrictions on Turnstile endpoint

## Docs

- Turnstile docs: https://developers.cloudflare.com/turnstile
