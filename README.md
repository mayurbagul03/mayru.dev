# Mayur Bagul — Portfolio

A single-page portfolio built with HTML, Tailwind CSS, vanilla JavaScript, and a small Node.js/Express backend for the contact form.

**Theme:** Ink Navy & Muted Amber — deep matte-black background, flat charcoal cards with hairline borders, warm amber accents.

## Structure

```
portfolio/
├── public/                 # everything served to the browser
│   ├── index.html          # single page: Home, About, Projects, Experience, Certifications, Contact
│   ├── css/style.css       # compiled Tailwind output (generated — do not edit by hand)
│   ├── js/main.js          # renders content.json into the page + all interactivity
│   ├── data/content.json   # ← YOUR CONTENT LIVES HERE (name, projects, experience, skills, links)
│   └── assets/             # profile.jpg + resume.pdf go here
├── src/input.css           # Tailwind source (edit this, not css/style.css)
├── server.js                # Express server + /api/contact endpoint
├── data/messages.json       # contact form submissions land here if email isn't configured
├── tailwind.config.js       # color tokens, fonts, animations
├── .env.example              # copy to .env and fill in for real email delivery
└── package.json
```

## Quick start

```bash
npm install
cp .env.example .env      # optional, only needed for real email delivery
npm run build:css         # compile Tailwind once
npm start                 # runs at http://localhost:3000
```

For local development with auto-rebuild:

```bash
npm run dev
```

## Editing your content

Open `public/data/content.json` — everything on the page (name, summary, skills,
projects, experience, certifications, links, email) is driven from this one file.
No HTML editing required for routine updates.

Add your real photo and résumé to `public/assets/`:
- `profile.jpg` — shown in the Home section
- `resume.pdf` — linked from "Download Résumé" and "Important Links"

## Contact form

`POST /api/contact` accepts `{ name, email, subject, message }`.

- If `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS` are set in `.env`, messages are emailed via Nodemailer to `CONTACT_TO_EMAIL`.
- If not configured, messages are appended to `data/messages.json` instead, so nothing is lost during local development.
- Rate-limited to 10 requests / 15 minutes per IP.

For Gmail, use an [App Password](https://myaccount.google.com/apppasswords) rather than your normal password.

## Deployment notes

This is a standard Node/Express app — deploy it anywhere that runs Node (Render, Railway, Fly.io, a VPS, etc.):

1. Set the environment variables from `.env.example` on your host.
2. Run `npm install && npm run build:css` during the build step.
3. Start with `npm start`.

## Customizing the design

Color tokens, fonts, and animation timing live in `tailwind.config.js`. Reusable component
classes (`.btn-primary`, `.card`, `.nav-link`, `.section-tag`, etc.) live in `src/input.css`.
After changing either file, re-run `npm run build:css`.
