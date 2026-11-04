# Ayovira

A single-page wellness marketing site plus a working customer account area:
sign up, log in, manage your profile and consent choices, download your data,
change your password, or delete your account.

Built with Next.js 16 (App Router), React 19, TypeScript and libSQL through
`@libsql/client`. Production data lives in a hosted Turso database; local
development falls back to a SQLite file when Turso is not configured.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build:

```bash
npm run build
npm run start
```

Requires Node.js 20.9 or newer (Node 24 recommended).

## What is built

- **Landing page** — announcement bar, sticky header, hero with an original SVG
  illustration, services icon strip, 3-step flow, free camps, goal statement,
  account sign-up section, FAQ, footer, SEO metadata, JSON-LD and sitemap.
- **Sign up** — `/signup` and the `#join` section on the landing page. Creates a
  real account and signs the person in. Collects name, mobile, optional email,
  area, role, interests, and two separate consent choices.
- **Log in** — `/login`, using mobile number or email plus password.
- **Customer dashboard** — `/dashboard`, `/dashboard/profile`,
  `/dashboard/settings`.
  - View profile and interests.
  - Update details, interests and consent choices.
  - Change password.
  - Download a JSON copy of the account data.
  - Delete the account and all sessions.
- **Privacy notice** — `/privacy`.
- **Security basics** — scrypt password hashing, HTTP-only session cookies,
  server-side validation, a hidden honeypot field, and in-memory rate limiting.
- **SEO** — canonical `https://ayovira.site`, keyword-focused titles and
  descriptions, Open Graph and Twitter cards, Organization / WebSite / WebPage /
  FAQ / Breadcrumb structured data, a sitemap, robots rules, and noindex headers
  for private account pages.
- **Data for the founder** — every account is stored in the configured Turso
  database (or `data/ayovira.db` locally). Use `npm run export:customers` to
  write a CSV into `exports/`.

## Project layout

```
app/
  page.tsx                  landing page
  login/ signup/            customer auth pages
  dashboard/                customer area (protected in layout)
  api/auth/                 signup, login, logout
  api/customer/             profile, export, delete, password
  privacy/                  privacy notice
  robots.ts sitemap.ts manifest.ts opengraph-image.tsx icon.svg
components/                 page sections and forms
lib/
  db.ts                     libSQL schema and queries
  auth.ts                   password hashing and sessions
  validation.ts             shared server-side validation
  types.ts                  roles, interests, types
  rate-limit.ts             simple in-memory limiter
  faq.ts                    FAQ copy (also used for JSON-LD)
data/                       local SQLite database (gitignored)
scripts/export-customers.mjs
```

## Environment variables

Copy `.env.example` to `.env.local` if you want to override defaults.

| Variable | Default | Purpose |
|---|---|---|
| `TURSO_DATABASE_URL` | _(unset)_ | Hosted Turso database URL |
| `TURSO_AUTH_TOKEN` | _(unset)_ | Turso database token |
| `DATABASE_PATH` | `./data/ayovira.db` | Local fallback file when Turso is not set |
| `NEXT_PUBLIC_SITE_URL` | `https://ayovira.site` | Canonical URL, sitemap, schema |
| `GOOGLE_SITE_VERIFICATION` | _(unset)_ | Google Search Console verification token |

When `TURSO_DATABASE_URL` is set, all reads and writes go to Turso and the local
file is ignored. Tables are created automatically on the first database request.
Without Turso, the app uses the local SQLite file so you can develop offline.

## Data model

`customers`: id, full name, mobile (unique), email (unique, optional), password
hash, area, role, interests, two consent flags, consent text version, source page,
UTM fields, created/updated timestamps.

`sessions`: hashed session token, customer id, created/expiry timestamps.
Sessions last 30 days and are removed when a customer deletes their account.

Export CSVs never include password hashes or session tokens.

## Founder placeholders still to confirm

These come from the build brief and should be checked before launch:

1. **Domain** — live at `https://ayovira.site`; verify it in Google Search
   Console and submit `https://ayovira.site/sitemap.xml`.
2. **Social accounts** — WhatsApp is linked; add the rest in
   `components/Footer.tsx` once the URLs are confirmed.
3. **Logo** — the header/footer use a recreated SVG wordmark. Replace it with the
   official transparent logo when available.
4. **Healthcare partner** — the camps section intentionally omits the "health
   check-ups with qualified partners" bullet until a partner is confirmed.
5. **Data retention period** — the privacy notice says it is still being
   confirmed.
6. **Privacy review** — have the notice and consent wording reviewed for the
   Digital Personal Data Protection Act, 2023.
7. **Analytics** — no GA4 or Meta Pixel is installed yet. Add these behind a
   consent banner when the founder is ready.
8. **Real camp photos** — replace the illustration after the first camp, with
   permission.

## Notes on honesty

The copy follows the brief's rules: no invented user counts, testimonials,
partner logos, "verified" claims or medical outcome promises. Services that are
not live are marked "Coming soon" or "Being built". Ayovira is described as a
connector, not a hospital or clinic.
