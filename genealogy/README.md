# LINEAGE — Whitmore Family Heritage Archive
## Static Website — Complete Package

---

### Overview

A complete, production-ready static genealogy website built with pure HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools, no dependencies — just open `index.html` in a browser.

---

### File Structure

```
genealogy/
├── index.html          ← Home page (hero, ancestors, timeline, blog preview)
├── family.html         ← Family tree diagram + member profiles
├── history.html        ← Chronological timeline + heritage stories
├── blog.html           ← Stories, essays & article listing
├── gallery.html        ← Masonry photo gallery with lightbox
├── css/
│   └── styles.css      ← Complete stylesheet (1,200+ lines)
├── js/
│   └── main.js         ← All interactivity (no dependencies)
└── README.md           ← This file
```

---

### Pages

| Page | File | Key Features |
|------|------|--------------|
| **Home** | `index.html` | Hero with animations, nav cards, ancestor profiles, timeline preview, blog preview |
| **Family Tree** | `family.html` | SVG tree diagram, generational hierarchy, member profile cards |
| **History** | `history.html` | Alternating timeline, heritage story, pull quote, milestone events |
| **Stories** | `blog.html` | Featured article + sidebar, 3-column post grid, category filters, contribute CTA |
| **Gallery** | `gallery.html` | Masonry grid, category filtering, full lightbox with keyboard navigation |

---

### Design System

**Color Palette:**
- `--cream: #FAF6EF` — Page background
- `--parchment: #F2EBD9` — Section backgrounds
- `--gold: #B8860B` — Accents, tags, highlights
- `--brown: #6B4C2A` — Body text tones
- `--brown-dark: #3D2B1F` — Headings, navbars

**Typography:**
- Display: `Cormorant Garamond` (Google Fonts) — headings, hero
- Body: `EB Garamond` (Google Fonts) — prose text
- UI: `Jost` (Google Fonts) — labels, buttons, navigation

---

### Customization Guide

#### 1. Change the Family Name
Search and replace all instances of `Whitmore` across all HTML files.

#### 2. Add Real Photos
Replace placeholder emoji divs with `<img>` tags:
```html
<!-- Before -->
<div class="ancestor-photo-placeholder">👴</div>

<!-- After -->
<img class="ancestor-photo" src="images/elias-whitmore.jpg" alt="Elias Whitmore portrait, c.1865" />
```

#### 3. Add/Edit Family Members
In `family.html`, copy an existing `.member-card` block and update the name, dates, bio, and role.

#### 4. Add Timeline Events
In `history.html`, copy a `.timeline-event` block. Events alternate left/right automatically via CSS `nth-child`.

#### 5. Add Blog Posts
In `blog.html`, copy a `.blog-card` block into the `.blog-posts-grid` container.

#### 6. Add Gallery Items
In `gallery.html`, copy a `.gallery-item` block. Set the `data-cat` attribute to control which filter it appears under:
- `portraits` | `weddings` | `generations` | `events` | `documents` | `places`

---

### Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Sticky navigation with scroll detection
- ✅ Mobile hamburger menu with animated icon
- ✅ Keyboard-accessible search overlay (Ctrl+K / ⌘+K)
- ✅ Scroll-triggered animations (Intersection Observer API)
- ✅ Masonry gallery with category filtering
- ✅ Full-screen lightbox with keyboard navigation (←/→/Esc)
- ✅ Blog category filter buttons
- ✅ Scroll-to-top button
- ✅ Semantic HTML5 structure
- ✅ ARIA labels and roles throughout
- ✅ Smooth anchor scrolling
- ✅ Parallax hero background

---

### Hosting

Drop the entire folder onto any static host:

| Service | Notes |
|---------|-------|
| **GitHub Pages** | Free, custom domain support |
| **Netlify** | Free tier, drag-and-drop deploy |
| **Vercel** | Free tier, instant deploy |
| **AWS S3** | Static website hosting |
| **Any web host** | Upload via FTP — works anywhere |

No server-side processing, no database, no CMS required.

---

### Browser Support

Chrome 88+ · Firefox 85+ · Safari 14+ · Edge 88+

(All modern browsers — no IE11 support by design)

---

*Built with care for the Whitmore family — and for all families who believe that where you came from matters.*
