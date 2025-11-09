# Lab Field Background - Technical Specification

**Purpose:** Create "stepping into an active mad scientist laboratory" atmosphere using 3-layer approach: energy substrate + drifting orbs + micro bursts.

**Philosophy:** Controlled chaos. Things are happening, experiments in progress, but not overwhelming. Respects reduced motion.

---

## Visual Goals

**The Feeling:**
- Warm, energetic atmosphere
- Reality slightly warped (subtle turbulence)
- Experiments drifting in suspension (orbs)
- Occasional micro reactions (small bursts)
- Depth (parallax, multiple layers)

**NOT:**
- Overwhelming or distracting
- Seizure-inducing (slow, gentle)
- Competing with content (background, not foreground)

---

## Three-Layer Architecture

### Layer 1: Energy Substrate (Base)

**What:** Warm noise/turbulence. The "field" itself - constant, gentle movement.

**Implementation Strategy:**

```css
.lab-field-substrate {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;

  /* Base color with slight gradient */
  background:
    radial-gradient(circle at 30% 50%, var(--lab-field-accent), transparent 50%),
    radial-gradient(circle at 70% 30%, var(--lab-field-accent), transparent 50%),
    var(--lab-field-base);

  /* Subtle animation: reality warping */
  animation: substrateWarp 20s ease-in-out infinite;
  opacity: 0.4;
}

@keyframes substrateWarp {
  0%, 100% {
    filter: blur(60px) brightness(1);
    transform: scale(1);
  }
  50% {
    filter: blur(80px) brightness(1.1);
    transform: scale(1.02);
  }
}

/* Dark mode: deeper, more mysterious */
body.dark-mode .lab-field-substrate {
  opacity: 0.3;
}
```

**Alternative: CSS Noise Texture**

If more texture needed:

```css
.lab-field-substrate {
  background-image:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.3"/></svg>'),
    radial-gradient(circle at 30% 50%, var(--lab-field-accent), transparent 50%),
    var(--lab-field-base);
  background-blend-mode: overlay;
}
```

---

### Layer 2: Drifting Orbs (Middle)

**What:** 3-5 floating orbs. Slow parallax drift. Like experiments suspended in the lab field.

**Colors:** Orange, gold, magenta (section-specific colors)

**Implementation Strategy:**

**HTML Structure:**

```html
<div class="lab-field-orbs">
  <div class="orb orb-orange" data-speed="0.5"></div>
  <div class="orb orb-gold" data-speed="0.7"></div>
  <div class="orb orb-magenta" data-speed="0.3"></div>
</div>
```

**CSS:**

```css
.lab-field-orbs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.2;
  will-change: transform;
}

.orb-orange {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, var(--color-orange), transparent);
  top: 20%;
  left: 15%;
  animation: orbDrift1 30s ease-in-out infinite;
}

.orb-gold {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, var(--color-gold), transparent);
  top: 60%;
  left: 70%;
  animation: orbDrift2 40s ease-in-out infinite;
}

.orb-magenta {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--color-magenta), transparent);
  top: 40%;
  left: 85%;
  animation: orbDrift3 35s ease-in-out infinite;
}

@keyframes orbDrift1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(30px, -20px);
  }
  50% {
    transform: translate(-20px, 30px);
  }
  75% {
    transform: translate(40px, 10px);
  }
}

@keyframes orbDrift2 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-40px, 30px);
  }
  66% {
    transform: translate(20px, -25px);
  }
}

@keyframes orbDrift3 {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(25px, 35px);
  }
}

/* Dark mode: more visible */
body.dark-mode .orb {
  opacity: 0.3;
}
```

**JavaScript: Parallax on Scroll**

```javascript
function initOrbParallax() {
  const orbs = document.querySelectorAll('.orb');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    orbs.forEach(orb => {
      const speed = parseFloat(orb.dataset.speed);
      const yPos = -(scrollY * speed);
      orb.style.transform = `translateY(${yPos}px)`;
    });
  });
}
```

---

### Layer 3: Micro Bursts (Top)

**What:** Small particle explosions every 3-5 seconds. Chemical reaction feel. Random positions.

**Implementation Strategy:**

**JavaScript Approach (Best Control):**

```javascript
function initMicroBursts() {
  const container = document.querySelector('.lab-field-bursts');
  if (!container) return;

  function createBurst() {
    // Random position
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    // Random color
    const colors = ['#E67E22', '#C9A961', '#db2777'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create burst container
    const burst = document.createElement('div');
    burst.className = 'micro-burst';
    burst.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: 0;
      height: 0;
      pointer-events: none;
    `;
    container.appendChild(burst);

    // Create particles
    const particleCount = 5;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'burst-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: ${color};
        border-radius: 50%;
        opacity: 0.6;
      `;
      burst.appendChild(particle);

      // Animate outward
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 20 + Math.random() * 10;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 0.6 },
        { transform: `translate(${tx}px, ${ty}px) scale(0.2)`, opacity: 0 }
      ], {
        duration: 800,
        easing: 'ease-out'
      });
    }

    // Remove burst after animation
    setTimeout(() => burst.remove(), 1000);
  }

  // Trigger bursts every 3-5 seconds
  function scheduleBurst() {
    createBurst();
    const nextBurst = 3000 + Math.random() * 2000;
    setTimeout(scheduleBurst, nextBurst);
  }

  scheduleBurst();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initMicroBursts);
```

**HTML Structure:**

```html
<div class="lab-field-bursts"></div>
```

**CSS:**

```css
.lab-field-bursts {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.micro-burst {
  will-change: transform;
}

.burst-particle {
  box-shadow: 0 0 6px currentColor;
}
```

---

## Accessibility: Reduced Motion

**Critical:** All movement stops for users who prefer reduced motion.

```css
@media (prefers-reduced-motion: reduce) {
  /* Substrate: freeze, keep as static background */
  .lab-field-substrate {
    animation: none !important;
    filter: blur(60px);
    transform: none;
  }

  /* Orbs: hide entirely */
  .orb {
    display: none;
  }

  /* Bursts: hide entirely */
  .lab-field-bursts {
    display: none;
  }
}
```

**JavaScript Check:**

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Don't initialize orb parallax or micro bursts
  return;
}

initOrbParallax();
initMicroBursts();
```

---

## Performance Considerations

**Will-change:** Use sparingly, only on animated elements.

```css
.orb {
  will-change: transform;
}

.micro-burst {
  will-change: transform;
}
```

**GPU Acceleration:**
- Use `transform` instead of `top`/`left` for animations
- Use `opacity` instead of visibility changes
- Keep blur values reasonable (60-80px max)

**Particle Cleanup:**
- Remove burst elements after animation completes
- Limit active bursts to 2-3 concurrent max
- Use requestAnimationFrame for scroll parallax

---

## Integration Strategy

**HTML Structure (in index.html):**

```html
<body>
  <!-- Lab Field Background (fixed, behind everything) -->
  <div class="lab-field-substrate"></div>
  <div class="lab-field-orbs">
    <div class="orb orb-orange" data-speed="0.5"></div>
    <div class="orb orb-gold" data-speed="0.7"></div>
    <div class="orb orb-magenta" data-speed="0.3"></div>
  </div>
  <div class="lab-field-bursts"></div>

  <!-- Page Content -->
  <main class="content">
    <!-- Hero, sections, etc. -->
  </main>
</body>
```

**JavaScript File:** `scripts/lab-field.js`

Initialize all three layers:
1. Substrate (CSS only, no JS needed)
2. Orb parallax (scroll listener)
3. Micro bursts (interval-based spawning)

---

## Session 3 Implementation Order

1. **Substrate first:** Get the base feeling right
2. **Test in both modes:** Light and dark
3. **Add orbs:** Static positions, test visibility
4. **Add orb animation:** Drift keyframes
5. **Test parallax:** Scroll behavior
6. **Add micro bursts:** Start with 1, verify feels right
7. **Tune timing:** Adjust burst frequency (3-5s)
8. **Reduced motion test:** Verify all movement stops

---

## Color Reference

**From tokens.css:**

**Light Mode:**
- `--lab-field-base: #fef3e7` (warm cream)
- `--lab-field-noise: #f4d4b0` (peachy warmth)
- `--lab-field-accent: rgba(230, 126, 34, 0.15)` (orange tint)

**Dark Mode:**
- `--lab-field-base: #1a1410` (deep brown-black)
- `--lab-field-noise: #2d1f14` (darker burnt sienna)
- `--lab-field-accent: rgba(243, 156, 18, 0.2)` (brighter orange tint)

---

## Success Criteria

**The Lab Field should:**
- ✅ Feel alive (subtle movement, things happening)
- ✅ Create atmosphere (mad scientist lab energy)
- ✅ Stay in background (doesn't compete with content)
- ✅ Work in both themes (warm light, mysterious dark)
- ✅ Respect reduced motion (freeze or hide)

**It should NOT:**
- ❌ Distract from content (background, not show)
- ❌ Cause performance issues (GPU-accelerated, efficient)
- ❌ Trigger accessibility issues (respects all preferences)
- ❌ Overwhelm the user (controlled chaos, not actual chaos)

---

*For Session 3 implementation*
*See tokens.css for color variables*
*Test substrate alone first, then add layers incrementally*
