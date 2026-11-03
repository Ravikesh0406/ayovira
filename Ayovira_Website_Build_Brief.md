# Ayovira Website: Build Brief for the AI Agent

**How to use this file:** Give this whole document to your AI coding agent as the build prompt. It defines what to build, how it should look, the exact copy, the sign-up form, SEO, and the rules to follow. Anything marked **[FOUNDER TO CONFIRM]** needs a real value before launch. Use the placeholder shown until then.

---

## 0. The job in one paragraph

Build a **single-page, mobile-first marketing website** for **Ayovira**, a wellness ecosystem that helps people discover and connect with yoga, fitness, nutrition, meditation, and health check-up services in one place. The page has **one main goal: get visitors to join the Ayovira community through a short sign-up form.** The site is **visual and light on text**: big headline, icons, short lines, clear steps. Only the home page is built now. Other pages (services, providers, blog, login) come later, so the header links jump to sections on the same page.

**Launch location focus:** Faridabad, Haryana, India, expanding to the wider Delhi NCR later.

---

## 1. Brand and what must stay true

| Item | Value |
|---|---|
| Brand name | Ayovira |
| Tagline | Wellness Within Everyone's Reach. |
| Positioning line | A wellness ecosystem that connects people with wellness professionals and services in one place |
| Logo file | `Ayovira_Wellness_Logo.png` (deep green serif wordmark, terracotta swoosh under the "y", cream background). Ask the founder for a transparent-background version or recreate as SVG. Never stretch, recolour, or add effects to the logo. |
| Tone | Warm, calm, simple, caring. Plain words. Short sentences. No medical jargon. No hype. |

### Honesty rules (very important, these protect the brand)

The platform is **new and being built**. The copy must never imply things that are not true yet.

1. **Do not invent** numbers, testimonials, reviews, user counts, partner names, provider counts, awards, or press logos. No fake "10,000+ users" strip. Leave these out entirely until real.
2. **Do not say** services are "verified", "certified", "trusted network", or "available now" unless the founder confirms. Use "building", "coming soon", or "through confirmed partners".
3. **No health promises.** Never write "lose weight fast", "cure", "prevent disease", "guaranteed results", or any medical outcome claim. The goal is *awareness* and *access*, not treatment.
4. Ayovira is **not** a hospital or clinic. Clinical services are delivered only by qualified, authorised professionals. Include this in the FAQ and footer.
5. Packages are marked **Coming soon**.

---

## 2. Reference and inspiration: what to borrow from Bizzowl.com

The founder likes the feel of **bizzowl.com** (a platform that brings many services into one place). I reviewed its home page. Borrow the *structure and clarity*, not the content, visuals, or copy. Do not copy any text, images, or illustrations.

**What works on Bizzowl and should inform this build:**

- A slim **announcement bar** at the very top with one offer and one link.
- A **hero with one clear promise and two buttons**, plus a strong visual on the side.
- A **single quick-scan band** that shows the whole range of what the platform covers, rather than long descriptions.
- A **visual step-by-step flow** ("Step 1, 2, 3...") with small illustrated mockups instead of paragraphs.
- Sections that speak to **different audiences** ("find yourself below").
- A **FAQ** with direct contact details beside it.
- A **free-offer call to action** and a **newsletter-style join block** near the bottom.
- A **rich footer** with social icons, contact, and legal links.

**What NOT to copy:** their stat strips ("3,000+ startups helped"), testimonial walls, logos of partners, pricing, and mentor/provider cards. Ayovira has no such proof yet, so those blocks stay out (see honesty rules).

---

## 3. Design system

### 3.1 Colour palette

Based on the logo. Define as CSS variables.

| Token | Name | Hex | Use |
|---|---|---|---|
| `--forest` | Forest green | `#0F3B30` | Headlines, primary buttons, footer background, logo colour |
| `--terracotta` | Terracotta | `#C0664A` | Accent shapes, swoosh underline, icons, decorative elements, large text only |
| `--terracotta-deep` | Deep terracotta | `#A64B2E` | Any small text or button in terracotta (better contrast) |
| `--cream` | Cream | `#F7F3EA` | Main page background (matches the logo background) |
| `--sand` | Sand | `#E9E2D0` | Alternate section background, card borders, dividers |
| `--sage` | Soft sage | `#DCE7DF` | Light green panels, icon circles, subtle highlights |
| `--ink` | Ink | `#1E2B27` | Body text |
| `--white` | White | `#FFFFFF` | Form fields, cards on cream |

**Rules**
- Page background is **cream**. Alternate sections between cream, sand, and sage so the page has rhythm. Footer is forest green with cream text.
- Primary button: forest background, cream text. Hover: slightly lighter forest. Secondary button: transparent with forest outline.
- Do not use gradients, glassmorphism, or heavy shadows. Flat, warm, calm.
- All text must meet **WCAG AA contrast** (4.5:1 for body text). Do not put small text in plain terracotta on cream.

### 3.2 Typography

- **Headings:** a warm serif that echoes the logo wordmark. Recommended: **Fraunces** (Google Fonts), weight 600. Alternative: DM Serif Display.
- **Body and UI:** a clean geometric sans that matches the tagline in the logo. Recommended: **Montserrat** (weights 400, 500, 600). Alternative: Inter.
- Load fonts with `font-display: swap`. Self-host if possible for speed.

| Style | Desktop | Mobile |
|---|---|---|
| H1 (hero) | 60 px / 1.05 | 38 px / 1.1 |
| H2 (section) | 40 px / 1.15 | 28 px / 1.2 |
| H3 (small heading) | 22 px | 20 px |
| Body | 18 px / 1.6 | 16 px / 1.6 |
| Small / microcopy | 14 px | 14 px |

Keep line length under 70 characters. Use sentence case everywhere (no ALL CAPS labels, no tracked-out eyebrow text above every heading).

### 3.3 Shape, spacing, and feel

- Border radius: **16 px** on cards and form panels, **999 px** (pill) on buttons and chips.
- Section padding: 96 px top and bottom on desktop, 56 px on mobile.
- Max content width: 1160 px, centred.
- Generous white space. One idea per section.
- A **terracotta swoosh** (the curved underline from the logo) is the signature graphic. Use it once or twice as a hand-drawn underline or divider, not everywhere.

### 3.4 Imagery and icons

- **Icons:** one consistent line-icon set (Lucide or Phosphor), 2 px stroke, forest colour on sage circles.
- **Hero visual:** a simple **illustration**, not stock photos. A soft composition showing a person in a yoga pose, with small floating chips around them (Nutrition, Fitness, Meditation, Check-up) in sage and sand tones. Build it as SVG.
- **Photos:** none at launch. After the first camps, replace the camp section visual with a **real photo from a camp** (with permission). Never use stock photos of fake customers.
- Every image needs descriptive `alt` text.

### 3.5 Motion

- Keep it minimal. One gentle entrance on the hero on page load. Smooth scroll to sections. Accordion open/close on FAQ. Button hover states.
- No scroll-triggered fade-ins on every section. Respect `prefers-reduced-motion`.

### 3.6 Things to avoid (these make a page look generic)

- Putting one word of a headline in a different colour or italic.
- Numbered markers (01, 02, 03) except on the actual 3-step "How it works" section, which is a real sequence.
- Arrows ("→") on every button.
- The same rounded card repeated for everything.
- Long paragraphs. If a block has more than ~25 words, cut it.

---

## 4. Page structure (top to bottom)

Single page. Section IDs are used for header links and SEO anchors.

```
[ Announcement bar ]
[ Header: logo | How it works | What you'll find | Free camps | FAQ | [Join the community] ]

[ 1. Hero ]                       #top
[ 2. What you'll find (icon strip) ]   #services
[ 3. How it works (3 steps) ]     #how-it-works
[ 4. Free wellness camps ]        #camps
[ 5. Our goal (one statement) ]   #goal
[ 6. Join the community (FORM) ]  #join
[ 7. FAQ ]                        #faq
[ Footer ]
```

### 4.0 Announcement bar

- Full-width strip, forest background, cream text, 40 px tall, centred.
- Text: **Free wellness camps are coming to Faridabad. Join the community to hear first.** with a text link **Join** that scrolls to `#join`.
- Dismissible with a small close icon (remember dismissal for the session only).

### 4.1 Header

- Sticky on scroll. Cream background, thin sand bottom border appears after scrolling.
- Left: Ayovira logo (height 36 px desktop, 30 px mobile). Links to `#top`.
- Centre (desktop): How it works, What you'll find, Free camps, FAQ. Each is an anchor link.
- Right: primary pill button **Join the community** → `#join`.
- Mobile: logo left, **Join** button and a hamburger menu right. The menu opens a full-width panel with the same links.

### 4.2 Hero

**Layout (desktop):** two columns. Left 55 percent text, right 45 percent illustration. Left-aligned text. Mobile: text first, illustration below.

```
+---------------------------------------------------------------+
|  Your wellness,                         [ illustration:        |
|  all in one place.                        yoga figure +        |
|  ~~~~~ (terracotta swoosh)                floating chips:      |
|                                           Nutrition, Fitness,  |
|  Find and connect with yoga, fitness,     Meditation,          |
|  nutrition, meditation and health         Check-up ]           |
|  check-ups near you.                                           |
|                                                                |
|  [ Join the community ]  [ See how it works ]                  |
|                                                                |
|  Free to join   No spam   Leave anytime                        |
+---------------------------------------------------------------+
```

**Copy**
- H1: `Your wellness, all in one place.`
- Sub (max 25 words): `Find and connect with yoga, fitness, nutrition, meditation and health check-ups near you.`
- Primary button: `Join the community` (scrolls to `#join`)
- Secondary button: `See how it works` (scrolls to `#how-it-works`)
- Three small reassurance items with tiny check icons: `Free to join`, `No spam`, `Leave anytime`

The hero contains **no stats and no testimonials.**

### 4.3 What you'll find (single icon strip, not six cards)

**One compact band** on a sage background. Do **not** build separate cards with paragraphs. Show six small items in a single row (3 by 2 grid on mobile): an icon in a circle, with a one or two word label. Nothing else.

| Icon | Label |
|---|---|
| Lotus / yoga pose | Yoga |
| Dumbbell | Fitness and Zumba |
| Apple / leaf | Nutrition |
| Meditation / calm face | Meditation |
| Heart with pulse | Health check-ups |
| Gift / box | Wellness packages (small pill tag: `Coming soon`) |

- Section heading (H2): `Everything for your wellbeing, in one place`
- One line under heading: `Ayovira is a wellness ecosystem that connects you with the right professionals and services.`
- No other copy. No "learn more" links. This replaces the long About section.

> Wording note: avoid claiming "everything" is live. The line above says what Ayovira *is*, and the icon strip shows the range being built. The `Coming soon` tag on packages keeps it honest. The founder may soften the heading to `Wellness services, together in one place`.

### 4.4 How it works (3 steps, visual)

A real sequence, so numbered steps are appropriate. Three columns on desktop, stacked on mobile, connected by a thin dotted terracotta line.

| Step | Title | One-line description | Visual |
|---|---|---|---|
| 1 | Join the community | Sign up in under a minute. It's free. | Small phone mockup showing the sign-up form |
| 2 | Try a free camp | Join a wellness camp near you and experience it first-hand. | Illustration of a group doing yoga outdoors |
| 3 | Connect with the right service | Find yoga, fitness, nutrition or check-ups that suit you. | Illustration of a simple profile card with a "Connect" button |

H2: `How it works`

### 4.5 Free wellness camps

Two columns on a cream background. Left: a visual (illustration now, real camp photo later). Right: short text and a button.

- H2: `Free wellness camps for schools, workplaces and communities`
- Three short bullet lines with small icons (max 6 words each):
  - `Guided yoga and movement`
  - `Nutrition awareness`
  - `Health check-ups with qualified partners` *(only keep this line when the founder confirms the partner)*
- Button: `Request a camp` → opens a `mailto:` link to the founder's email with the subject `Wellness camp request` and a prefilled body asking for name, organisation, and city. **[FOUNDER TO CONFIRM email]**
- Small text: `Starting in Faridabad.`

### 4.6 Our goal (one statement, big type)

A full-width, centred, calm section on forest green with cream text. Just one large statement and one small supporting line. This is a breathing moment, not a content block.

- Large text (H2 size, serif): `Healthy habits start early. We help you begin.`
- Small line (max 20 words): `Our goal is to make people more aware of their wellness, so they can care for their health early and stay well in the years ahead.`

### 4.7 Join the community (the conversion section)

This is the most important section. Place it on a sand background with a white form card.

**Layout (desktop):** left column short pitch, right column form card. Mobile: heading, then form.

**Left side**
- H2: `Join the Ayovira community`
- Line: `Be the first to hear about free camps, wellness tips and new services near you.`
- Three small check items: `Free to join`, `We only message you with your permission`, `Leave anytime`

**Form card (right)**

| Field | Type | Required | Notes |
|---|---|---|---|
| Full name | text | Yes | Placeholder: `Your name` |
| Mobile number | tel | Yes | Indian 10-digit format. Prefix `+91` shown. Validate. |
| Email | email | No | Placeholder: `Optional` |
| Area in Faridabad (or city) | text | Yes | Placeholder: `e.g. Sector 21, Faridabad` |
| I am a | select | No | Options: Parent, Working professional, Student, Senior citizen, Wellness professional, Other |
| I'm interested in | multi-select chips | No | Yoga, Fitness and Zumba, Nutrition, Meditation, Health check-ups, All of these |

**Consent (two separate checkboxes, both unticked by default)**

1. `Send me wellness tips and updates from Ayovira on WhatsApp or email.`
2. `Contact me about Ayovira camps and services.`

- At least one box must be ticked to submit. Error: `Please tick at least one option so we know how you'd like to hear from us.`
- Below the boxes in small text: `We use your details only for what you've chosen. We never share your health details publicly. You can leave any time by messaging us. Read our privacy notice.`
- "Privacy notice" opens a **modal or anchor section** with a short plain-language privacy notice (see section 7). It must exist before launch.

**Do not ask for any health information on this form** (no conditions, weight, medicines, etc.). Health information needs a separate consent step later.

**Button:** `Join the community` (full width in the card).

**States**
- Loading: button shows `Joining...` and is disabled.
- Success: replace the form with a friendly message: `You're in. Thank you for joining Ayovira.` followed by `We'll reach out as you've chosen. Keep an eye out for our first free camp in Faridabad.` Do not promise a specific date.
- Error: `Something went wrong. Please try again, or message us at [email].` Keep the entered data.
- Field errors appear under the field, in plain language, never just a red border.

### 4.8 FAQ

Accordion (one open at a time), on cream. Left column: heading and contact details. Right column: questions.

- H2: `Questions, answered`
- Contact block: email and phone **[FOUNDER TO CONFIRM public phone number, currently `8582048456`, and email `theayovira@gmail.com`]**

| Question | Answer (keep under 40 words each) |
|---|---|
| What is Ayovira? | Ayovira is a wellness ecosystem. We help you discover and connect with yoga, fitness, nutrition, meditation and health check-up services in one place. We are still building, starting in Faridabad. |
| Is it free to join? | Yes. Joining the community is free. If any service ever has a fee, we will tell you clearly before you pay. |
| What are the free wellness camps? | Short community sessions with guided yoga and movement, nutrition awareness, and health check-ups with qualified partners. We start with schools and communities in Faridabad. |
| Is Ayovira a hospital or clinic? | No. Ayovira connects you with wellness services. Medical and clinical services are provided only by qualified, authorised professionals and partners. |
| What happens to my information? | We use your details only for what you agree to. We collect only what we need, and we never share your health details publicly. You can ask us to stop at any time. |
| I'm a trainer or wellness professional. Can I join? | Yes, we'd love to hear from you. Select "Wellness professional" in the form or email us. |

Mark up the FAQ with **FAQPage schema** (see section 6).

### 4.9 Footer

Forest green background, cream text.

```
[Ayovira logo (cream version)]              Contact
Wellness Within Everyone's Reach.           Ravikesh Kumar, Founder
                                            theayovira@gmail.com
[LinkedIn] [Instagram] [Facebook]           8582048456
                                            Faridabad, Haryana, India

Links: How it works | What you'll find | Free camps | FAQ | Join

-------------------------------------------------------------------
(c) 2026 Ayovira. All rights reserved.   Privacy notice
Ayovira is not a hospital or clinic. Clinical services are provided only by qualified, authorised professionals.
```

- Social icons are circular outlined buttons, cream on forest, with `aria-label`s. Open in a new tab with `rel="noopener noreferrer"`.
- Social URLs: **[FOUNDER TO CONFIRM]** Placeholders: `https://www.linkedin.com/company/ayovira`, `https://www.instagram.com/ayovira`, `https://www.facebook.com/ayovira`. If an account does not exist yet, hide that icon rather than linking to a placeholder.
- Use a cream/white version of the logo on the green footer.
- Copyright year should be generated automatically.

---

## 5. Exact copy deck (quick reference)

| Where | Copy |
|---|---|
| Browser tab title | Ayovira: Wellness Platform in Faridabad for Yoga, Fitness, Nutrition & Health Check-ups |
| Announcement bar | Free wellness camps are coming to Faridabad. Join the community to hear first. |
| Hero H1 | Your wellness, all in one place. |
| Hero sub | Find and connect with yoga, fitness, nutrition, meditation and health check-ups near you. |
| Primary CTA | Join the community |
| Secondary CTA | See how it works |
| Services H2 | Everything for your wellbeing, in one place |
| How it works H2 | How it works |
| Camps H2 | Free wellness camps for schools, workplaces and communities |
| Goal statement | Healthy habits start early. We help you begin. |
| Form H2 | Join the Ayovira community |
| Form button | Join the community |
| Success | You're in. Thank you for joining Ayovira. |
| Footer tagline | Wellness Within Everyone's Reach. |

---

## 6. SEO specification

> **Note on keywords:** the keyword list below is based on how people in Faridabad and India commonly search for these services, plus a quick look at what local listings use. It does **not** include search-volume data. After launch, check real demand in Google Search Console and Google Keyword Planner, and adjust.

### 6.1 Keyword map

**Primary (use in title, H1/H2, meta description)**
- wellness platform Faridabad
- yoga classes in Faridabad
- health check-up in Faridabad
- dietitian in Faridabad

**Secondary (use naturally in headings, FAQ, alt text)**
- yoga trainer in Faridabad
- home yoga classes Faridabad
- online yoga classes
- fitness trainer in Faridabad
- Zumba classes Faridabad
- meditation classes Faridabad
- nutritionist Faridabad
- full body health check-up Faridabad
- free wellness camp Faridabad
- school wellness programme
- corporate wellness programme India
- preventive health check-up

**Long-tail (use in FAQ answers and future blog posts)**
- how to find a good yoga trainer near me
- free health check-up camp in Faridabad
- wellness program for school students and parents
- employee wellness camp for companies in Delhi NCR
- yoga, diet and health check-up package

**Rules:** write for people first. Use each keyword naturally and do not repeat it unnaturally. The honest claim is "connect with" and "discover", not "best" or "top".

### 6.2 On-page SEO

- **One `<h1>` only:** the hero headline. Because the H1 is brand-led, also include a visually hidden or supporting sub-line containing "wellness platform in Faridabad".
- **Heading order:** H1, then H2 per section, H3 for small items. No skipped levels.
- **Title tag (under 60 characters):** `Ayovira | Wellness Platform in Faridabad`
- **Meta description (under 155 characters):** `Ayovira connects you with yoga, fitness, nutrition, meditation and health check-up services in Faridabad. Join the free wellness community.`
- **Canonical URL:** `https://www.ayovira.com/` **[FOUNDER TO CONFIRM domain]**
- **Language:** `<html lang="en-IN">`
- **Alt text** on every image, written for meaning, e.g. `Group practising yoga outdoors at a free Ayovira wellness camp`.
- **Anchor text:** descriptive ("Join the community", not "click here").
- **Internal anchors:** header and footer links use the section IDs.

### 6.3 Open Graph and social sharing

- `og:title`, `og:description`, `og:type=website`, `og:url`, `og:site_name=Ayovira`, `og:locale=en_IN`
- `og:image`: a **1200 x 630** image with the logo on cream plus the tagline. Create and include it.
- `twitter:card=summary_large_image` with matching title, description, and image.

### 6.4 Structured data (JSON-LD)

Add in `<head>`:

1. **Organization**: name Ayovira, URL, logo, `sameAs` (the real social URLs once confirmed), contact point (email and phone), address locality Faridabad, region Haryana, country IN.
2. **WebSite**: name and URL.
3. **FAQPage**: generated from the six FAQ items in section 4.8. Text must match the visible text exactly.

Do **not** add `LocalBusiness`, `MedicalOrganization`, `Review`, or `AggregateRating` schema. Ayovira is not a clinic, and there are no real reviews.

### 6.5 Technical SEO

- Provide `robots.txt` and `sitemap.xml` (single URL for now).
- Server-side or statically rendered HTML so search engines see all content.
- **Core Web Vitals targets:** LCP under 2.5 s, CLS under 0.1, INP under 200 ms, tested on a mid-range Android phone on 4G.
- Use modern image formats (WebP or AVIF) and `loading="lazy"` for images below the fold. Use SVG for the illustrations and icons.
- Compress and subset fonts. No render-blocking third-party scripts.
- Add a favicon set (32 px, 180 px Apple touch icon, SVG) and a `site.webmanifest`.
- HTTPS only. Redirect `http` to `https` and one version of the domain (with or without `www`) to the other.
- Set up **Google Search Console** and **Google Analytics 4** (instructions in section 9).
- Create a **Google Business Profile** later. It will matter for local search once there is a physical presence. Do not create fake location data now.

---

## 7. Privacy notice (minimum content, needed before launch)

A short plain-language notice, shown in a modal or an anchor section at the bottom of the page. It must say:

1. **Who we are:** Ayovira, with contact email.
2. **What we collect:** name, mobile number, email (optional), area, interests, and the consents ticked.
3. **Why:** to contact you about camps, wellness tips, and services, only as you have chosen.
4. **We do not collect health information** through this form.
5. **Sharing:** we do not sell your data. We share it only with service providers needed to run the site (for example, hosting or messaging tools).
6. **Your choices:** how to ask us to stop messages or delete your data (email).
7. **Retention:** how long details are kept. **[FOUNDER TO CONFIRM]**
8. **Children:** this form is for adults. Parents sign up on behalf of children where relevant.

> **[FOUNDER TO CONFIRM]** Have this notice checked by a qualified professional. India's data protection law (the Digital Personal Data Protection Act, 2023) affects how personal data is collected and handled, so the final wording and the consent text should be reviewed before you collect data at scale.

---

## 8. Form handling and data

### 8.1 Recommended stack (simple, fast, cheap)

- **Framework:** Next.js (App Router) with Tailwind CSS, deployed on Vercel. Alternative if the agent prefers: plain HTML, CSS and a little JavaScript on Netlify or Vercel. The design above works with either.
- **Where sign-ups go:** a **Google Sheet** through a small Google Apps Script web app or a serverless function. This is the easiest for the founder to read and export. Alternative: Airtable or Supabase.
- Keep the Sheet **private**. Never expose it publicly.

### 8.2 Columns to save for each sign-up

`timestamp`, `full_name`, `mobile`, `email`, `area`, `i_am_a`, `interests`, `consent_updates` (true/false), `consent_contact` (true/false), `consent_text_version`, `source_page`, `utm_source`, `utm_medium`, `utm_campaign`

Capture `utm_*` from the URL so the founder can see which camp, school flyer, QR code, or park conversation brought the person in. (Useful for tracking, because the founder runs camps and park outreach.)

### 8.3 Safeguards

- **Server-side validation** (never trust the browser). Name length, valid Indian mobile format, valid email if given.
- **Spam protection:** a hidden honeypot field plus simple rate limiting. Add Cloudflare Turnstile or reCAPTCHA only if spam appears.
- **No duplicates:** if the same mobile number signs up again, update the existing row and show the normal success message.
- Store the consent text version and timestamp with each sign-up.
- HTTPS only. Do not log personal data in public places.
- Do not add anyone to a WhatsApp group automatically. A person is contacted only on the channels they ticked, and anyone who asks to leave must be removed promptly.

---

## 9. Analytics and tracking

- **Google Analytics 4** with these events: `cta_click` (with location: hero, header, announcement, camps), `form_start`, `form_submit_success`, `form_submit_error`, `faq_open`, `social_click`.
- **Google Search Console:** verify the domain and submit the sitemap.
- A Meta (Facebook) Pixel is **optional** and only when the founder starts paid ads. If added, it must load only after cookie/consent acceptance.
- If tracking cookies are used, add a minimal consent banner. If only privacy-friendly analytics are used (for example Plausible), no banner may be needed. **[FOUNDER TO CONFIRM approach]**

---

## 10. Responsive and accessibility requirements

- **Mobile-first.** Most visitors will come from a phone (shared via WhatsApp, camps, and QR codes). Test at 360 px, 390 px, 768 px, 1024 px, 1440 px.
- Tap targets at least 44 x 44 px. Inputs 16 px or larger to prevent iOS zoom.
- Sticky mobile bar option: after the hero scrolls out of view, show a slim bottom bar with the `Join the community` button.
- Fully keyboard navigable, with a visible focus ring (2 px terracotta-deep outline).
- Semantic HTML: `header`, `nav`, `main`, `section`, `footer`. Form fields have visible `label`s and `aria-describedby` for errors.
- Accordion uses proper button and `aria-expanded` attributes.
- Colour contrast AA minimum. Do not rely on colour alone to show errors.
- Respect `prefers-reduced-motion`.
- Lighthouse targets: **Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100.**

---

## 11. Suggested file structure (if using Next.js)

```
/app
  layout.tsx            fonts, metadata, JSON-LD
  page.tsx              composes all sections
  api/signup/route.ts   validates and writes to Google Sheet
/components
  AnnouncementBar, Header, Hero, ServicesStrip,
  HowItWorks, Camps, Goal, JoinForm, Faq, Footer, PrivacyModal
/public
  logo.svg, logo-cream.svg, og-image.png, favicon files, illustrations/
/styles
  globals.css           CSS variables from section 3.1
robots.txt, sitemap.xml
```

---

## 12. Build order for the agent

1. Set up the project, CSS variables, fonts, and the base layout.
2. Build the header, announcement bar, and footer.
3. Build the hero and the SVG illustration.
4. Build the services icon strip, How it works, Camps, and Goal sections.
5. Build the sign-up form with validation and the Google Sheet connection.
6. Build the FAQ, the privacy notice, and the JSON-LD.
7. Add SEO metadata, sitemap, robots, and the Open Graph image.
8. Add analytics events.
9. Test on mobile, run Lighthouse, check accessibility, and fix issues.
10. Report back with a summary and a list of any placeholders still needing founder input.

---

## 13. Acceptance checklist

- [ ] Single page with all sections in the order above
- [ ] Palette, fonts, and logo match this brief
- [ ] Copy is short; no section has a long paragraph
- [ ] Services shown as **one icon strip**, not six text cards
- [ ] No fake stats, testimonials, partner logos, or "verified" claims
- [ ] No medical or outcome promises anywhere
- [ ] Form works end to end and saves to the private Sheet
- [ ] Two separate, unticked consent boxes, at least one required
- [ ] No health information requested in the form
- [ ] Privacy notice present and linked from the form and footer
- [ ] Footer has LinkedIn, Instagram, Facebook (only live accounts), contact details, and the "not a hospital or clinic" line
- [ ] Meta tags, Open Graph, JSON-LD (Organization, WebSite, FAQPage), sitemap, robots in place
- [ ] Lighthouse scores meet targets on mobile
- [ ] All **[FOUNDER TO CONFIRM]** items listed in the final report

---

## 14. Open items for the founder

| # | Item | Needed for |
|---|---|---|
| 1 | Domain name (for example ayovira.com) | Canonical URL, schema, email |
| 2 | Real LinkedIn, Instagram, Facebook links | Footer, schema |
| 3 | Public phone and email to show on the site | Footer, FAQ, schema |
| 4 | Where sign-ups should go (Google Sheet recommended) and who can view it | Form |
| 5 | Confirmed healthcare partner for check-ups | Camps section wording |
| 6 | Transparent or SVG version of the logo, plus a cream version for the footer | Header, footer |
| 7 | Privacy notice review and data retention period | Legal and trust |
| 8 | English only at launch, or add Hindi | Scope |
| 9 | Real camp photos with consent, once the first camp is done | Camps section |

---

*End of brief.*
