# Calendly Booking

## What it does

Calendly provides booking links for client consultations and conversion flows.

## Required env vars

- `CALENDLY_URL`
- `NEXT_PUBLIC_CALENDLY_URL`

## How it is used

- `components/CalendlyButton.tsx` and sector pages use the booking URL.
- appointment forms and CTA buttons rely on the public Calendly link.

## Key rotation

- Update the Calendly URL if the booking page changes.
- No secret required beyond the public link.

## Common errors

- broken link: incorrect or expired Calendly event URL
- embed issues: verify the URL is valid for public access

## Docs

- Calendly docs: https://help.calendly.com/hc/en-us
