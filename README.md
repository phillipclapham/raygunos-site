# RAYGUN OS Website

**Live Site:** [raygunos.com](https://raygunos.com)

Standalone website for RAYGUN OS — a complete cognitive operating system for experiment-driven minds. Built from 45 years of experiments, now open-sourced.

## What This Is

RAYGUN OS is a comprehensive cognitive architecture that explains how your brain actually filters reality, frames meaning, and operates in modes. Not productivity theater. Not borrowed frameworks. Pure experimentation with minds that run on fascination.

This site separates the universal methodology (RAYGUN OS) from commercial products (Adaptive Human), following the GTD/Zettelkasten model: open methodology + paid infrastructure.

## Tech Stack

**Pure vanilla web:**
- HTML5
- CSS3 (custom design system with CSS variables)
- Vanilla JavaScript (no frameworks)
- Zero build process

**Deployment:**
- Cloudflare Pages (auto-deploy from `main` branch)
- Custom domain: raygunos.com

**Why vanilla?**
- Fast load times (~1.1MB homepage, ~450KB framework page)
- No framework overhead or build complexity
- Works anywhere, maintainable by anyone
- Perfect for content-focused site

## Features

**Homepage:**
- Lab Field background (3-layer animated energy substrate)
- Raygun laser divider (signature interactive element)
- Experiment orbs (click anywhere to spawn)
- Space grid with floating planet
- Mad scientist card hovers with energy sweeps
- Scroll-triggered entrance animations
- Full dark mode support

**Framework Page:**
- 18,000 words of cognitive architecture content
- Evidence-tagged sections (PROVEN, SUPPORTED, EXTENSION)
- Interactive table of contents
- Orange laser dividers between major sections
- Glow-word highlights on key concepts
- Optimized for long-form reading

**Both Pages:**
- Sticky navigation header
- Mobile responsive (tested Chrome/Safari/Firefox)
- Performance optimized
- Comprehensive meta tags / Open Graph for sharing
- Accessible (proper alt text, semantic HTML)

## Running Locally

No build process required. Just open the files:

```bash
# Clone the repo
git clone https://github.com/phillipclapham/raygunos-site.git
cd raygunos-site

# Open in browser (macOS)
open index.html

# Or just double-click index.html in your file browser
```

That's it. Pure HTML/CSS/JS means it works immediately.

## Project Structure

```
raygunos-site/
├── index.html              # Homepage
├── framework.html          # Framework page (18k words)
├── assets/
│   └── images/            # Raygun logo, icons, backgrounds
├── styles/
│   ├── tokens.css         # Design system variables
│   ├── base.css           # Typography, reset, global styles
│   ├── components.css     # Reusable UI components
│   ├── navigation.css     # Header/nav styles
│   ├── hero.css           # Homepage hero section
│   ├── laser-divider.css  # Signature raygun laser
│   ├── space-background.css # Animated space grid
│   ├── homepage-content.css # Homepage sections
│   ├── framework-polish.css # Framework page enhancements
│   └── ...
└── scripts/
    ├── lab-field.js       # Animated background layers
    ├── laser-divider.js   # Raygun laser animation
    ├── experiment-orbs.js # Click-to-spawn orbs
    ├── scroll-reveals.js  # Entrance animations
    └── ...
```

## Content Source

Framework content lives in `/Documents/raygun-os/RAYGUN.md` (v5.0) — this is the source of truth. The website renders that content with visual polish and interactive elements.

Updates flow: `RAYGUN.md` → `framework.html` (manual sync as needed).

## Design System

**Color Palette (Orange-Led Mad Scientist):**
- Primary: Orange/Burnt Orange (`#E67E22` light, `#F39C12` dark)
- Accent 1: Gold (`#C9A961` light, `#D4AF37` dark)
- Accent 2: Magenta (`#db2777` light, `#ec4899` dark)
- Ecosystem nod: Teal (footer links, subtle)

**Typography:**
- Headings: Syne (geometric, bold)
- Body: Plus Jakarta Sans (humanist, readable)
- Code: Source Code Pro (monospace)

**Personality:**
- Mad scientist energy (not corporate)
- Orange glows, energy sweeps, particle effects
- Controlled chaos with intentional polish
- Share-worthy interactions

## Development Sessions

Built across 9 sessions (Nov 9-11, 2025), with ongoing updates:
- **Session 1-2:** Design system & infrastructure setup
- **Session 3-5:** Homepage build (hero, laser, content sections)
- **Session 6:** Homepage finish & polish
- **Session 7-7b:** Framework page structure & navigation
- **Session 8-8b:** Framework visual polish & content
- **Session 9:** Final polish, meta tags, performance, launch
- **Nov 17:** Examples, Science, Origin, Connect, Troubleshooting pages added
- **Nov 28:** v4.10 updates (body-mind synchronization)
- **Dec 25:** v5.0 Gap-First Reframe - major framework update
  - Physiological sigh breathing guide (double inhale nose, long exhale mouth)
  - Framework version/changelog updated
  - try-raygun.html breathing step updated
  - Based on insight from Vishal Patel

See `/Documents/flow/projects/raygunos_site/` for detailed session notes.

## Deployment

**Automatic:**
- Push to `main` branch
- Cloudflare Pages auto-deploys
- Live at raygunos.com within 1-2 minutes

**No build step, no environment variables, no secrets.** Just HTML/CSS/JS.

## Browser Support

Tested and working:
- Chrome (desktop + mobile)
- Safari (desktop + mobile)
- Firefox (desktop + mobile)

Graceful degradation:
- `prefers-reduced-motion` disables animations
- Dark mode respects system preference
- Works without JavaScript (content visible)

## License

Content: © 2025 Phillip Clapham. All rights reserved.

Code: Open for reference and learning. Please don't clone the site directly, but feel free to learn from the implementation.

## Credits

**Built by:** [Phillip Clapham](https://phillipclapham.com)
**Part of:** [Adaptive Human](https://adapthuman.com) ecosystem
**Content:** RAYGUN OS framework v5.0
**Development:** Partnership with Claude (Anthropic)

## Links

- **Live Site:** [raygunos.com](https://raygunos.com)
- **Framework:** [raygunos.com/framework.html](https://raygunos.com/framework.html)
- **Phillip Clapham:** [phillipclapham.com](https://phillipclapham.com)
- **Adaptive Human:** [adapthuman.com](https://adapthuman.com)
- **GitHub:** [github.com/phillipclapham/raygun-os](https://github.com/phillipclapham/raygun-os)

---

**Status:** ✅ Production live — v5.0 (Dec 25, 2025)

Built with vanilla HTML/CSS/JS. No frameworks. No build process. Just mad scientist energy and clean code.
