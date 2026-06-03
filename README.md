# TrillioTek — Company Website

A modern, responsive, scroll-animated marketing site for **TrillioTek**, a web
solutions company building high-performance, AI-friendly websites.

Built with **Next.js 14 (App Router)**, **Tailwind CSS** and **Framer Motion**.

---

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Production

```bash
npm run build
npm run start
```

---

## Tech stack

- **Next.js 14** (App Router, static export-friendly)
- **Tailwind CSS** for styling + custom design tokens
- **Framer Motion** for scroll-triggered reveals & micro-interactions
- **Google Fonts** — Bricolage Grotesque (display) + Hanken Grotesk (body)

## Highlights

- Fully **responsive** (mobile → desktop), with a mobile drawer nav
- **Scroll animations** on every section (reveals, staggers, parallax-y floats)
- Scroll **progress bar**, sticky condensing navbar, animated marquee
- Light, warm editorial theme with grain texture and gradient-mesh accents
- Working **contact form** (opens the visitor's mail client to
  `georgedevid97@gmail.com`)
- Real portfolio: Nature's Trim, St. Thomas Malankara Catholic Church,
  The TiNY HUB, Health Dialogue Kozhikode, ChromaCut AI

## Project structure

```
src/
  app/
    layout.jsx      # fonts, metadata
    page.jsx        # assembles all sections
    globals.css     # tokens, grain, utilities
  components/
    Navbar.jsx      Hero.jsx       Marquee.jsx
    Services.jsx    Projects.jsx   Industries.jsx
    Process.jsx     Contact.jsx    Footer.jsx
    Reveal.jsx      ScrollProgress.jsx
public/
  projects/         # portfolio screenshots
```

## Customizing

- **Colors / fonts** → `tailwind.config.js` and `src/app/globals.css`
- **Services** → `src/components/Services.jsx`
- **Portfolio** → `src/components/Projects.jsx` (edit the `PROJECTS` array;
  drop new screenshots into `public/projects/`)
- **Industries** → `src/components/Industries.jsx`
- **Contact email / locations** → `src/components/Contact.jsx` & `Footer.jsx`

## Deploy

Push to GitHub and import into **Vercel** — zero config. Or run
`npm run build` and host the output anywhere that runs Node.

---

© TrillioTek — India & Canada · georgedevid97@gmail.com
