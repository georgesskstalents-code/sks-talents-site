# Resend Email Routing

## What it does

Resend handles email sending for the public lead forms and internal notifications.

## Required env vars

- `RESEND_API_KEY`
- `CONTACT_NOTIFICATION_EMAIL`
- `MAIL_FROM_EMAIL`
- `FEEDBACK_NOTIFICATION_EMAIL`
- `SITE_INTELLIGENCE_EMAIL`

## How it is used

- `lib/email.ts` sends lead notifications and guide emails.
- `app/api/*` routes call the email helper for contact, feedback, and newsletter events.

## Key rotation

- Generate a new API key from Resend.
- Update `RESEND_API_KEY` in `.env.local` locally and in Vercel production.

## Common errors

- invalid API key
- rate limit or blocked sender address
- missing `MAIL_FROM_EMAIL` or unsupported from address

## Docs

- Resend docs: https://resend.com/docs
