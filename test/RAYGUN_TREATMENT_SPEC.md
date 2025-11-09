# Raygun Mad Scientist Treatment - Technical Specification

**Purpose:** Transform existing `raygun_original_clear.png` into orange-led mad scientist icon using CSS effects, not asset modification.

**Philosophy:** Use existing PNG for brand recognition. Distinct personality through color treatment and effects, not different asset.

---

## Visual Goals

**Mad Scientist Energy:**
- Orange glow emanating from raygun body
- Subtle particle effects (energy leak, controlled chaos)
- Breathing animation (subtle, not distracting)
- On hover: intensify glow (curiosity reward)
- On click: burst effect (experiment triggered)

**Color Palette:**
- Primary glow: `var(--color-orange)` with `var(--glow-orange)` shadow
- Accent glow: `var(--color-gold)` highlights
- Particle colors: Orange, gold, occasional magenta burst

---

## CSS Implementation Approach

### Base Raygun Styling

```css
.raygun-icon {
  /* Base image */
  width: 120px; /* Adjust based on context */
  height: auto;
  filter: drop-shadow(0 0 8px rgba(230, 126, 34, 0.3));
  transition: all 0.3s ease;
}

/* Breathing animation - subtle energy */
.raygun-icon {
  animation: raygunBreathing 3s ease-in-out infinite;
}

@keyframes raygunBreathing {
  0%, 100% {
    filter: drop-shadow(0 0 8px rgba(230, 126, 34, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(230, 126, 34, 0.5));
  }
}

/* Hover: intensify (curiosity reward) */
.raygun-icon:hover {
  filter: drop-shadow(0 0 24px rgba(230, 126, 34, 0.7))
          drop-shadow(0 0 12px rgba(201, 169, 97, 0.4));
  transform: scale(1.05);
  cursor: pointer;
}

/* Dark mode: brighter, more intense */
body.dark-mode .raygun-icon {
  filter: drop-shadow(0 0 12px rgba(243, 156, 18, 0.5));
}

body.dark-mode .raygun-icon:hover {
  filter: drop-shadow(0 0 32px rgba(243, 156, 18, 0.8))
          drop-shadow(0 0 16px rgba(212, 175, 55, 0.5));
}
```

---

## Particle Effects Strategy

**Approach:** CSS pseudo-elements + JavaScript for dynamic spawning

### Option 1: Pure CSS (Static Particles)

```css
.raygun-container {
  position: relative;
}

/* Particle 1: Orange leak from barrel */
.raygun-container::before {
  content: '';
  position: absolute;
  top: 30%;
  right: -10px;
  width: 4px;
  height: 4px;
  background: var(--color-orange);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-orange);
  animation: particleDrift1 2s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes particleDrift1 {
  0% {
    transform: translate(0, 0);
    opacity: 0.6;
  }
  50% {
    transform: translate(8px, -4px);
    opacity: 0.3;
  }
  100% {
    transform: translate(0, 0);
    opacity: 0.6;
  }
}

/* Particle 2: Gold accent */
.raygun-container::after {
  content: '';
  position: absolute;
  top: 60%;
  right: -5px;
  width: 3px;
  height: 3px;
  background: var(--color-gold);
  border-radius: 50%;
  box-shadow: 0 0 6px var(--color-gold);
  animation: particleDrift2 3s ease-in-out infinite 0.5s;
  opacity: 0.5;
}

@keyframes particleDrift2 {
  0% {
    transform: translate(0, 0);
    opacity: 0.5;
  }
  50% {
    transform: translate(-6px, 6px);
    opacity: 0.2;
  }
  100% {
    transform: translate(0, 0);
    opacity: 0.5;
  }
}
```

### Option 2: JavaScript (Dynamic Particles - More Control)

**Better for clicks/interactions:**

```javascript
function spawnParticleBurst(element) {
  const rect = element.getBoundingClientRect();
  const colors = ['#E67E22', '#C9A961', '#db2777'];
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'burst-particle';
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(particle);

    const angle = (Math.PI * 2 * i) / particleCount;
    const distance = 40 + Math.random() * 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0.2)`, opacity: 0 }
    ], {
      duration: 600,
      easing: 'ease-out'
    }).onfinish = () => particle.remove();
  }
}

// Attach to raygun clicks
document.querySelector('.raygun-icon').addEventListener('click', (e) => {
  spawnParticleBurst(e.currentTarget);
});
```

---

## Charging Animation (Before Laser Fires)

**Context:** Raygun charges up before firing laser divider.

```css
.raygun-icon.charging {
  animation: raygunCharging 0.5s ease-in-out;
}

@keyframes raygunCharging {
  0% {
    filter: drop-shadow(0 0 8px rgba(230, 126, 34, 0.3));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 32px rgba(230, 126, 34, 0.9))
            drop-shadow(0 0 16px rgba(201, 169, 97, 0.6));
    transform: scale(1.1);
  }
  100% {
    filter: drop-shadow(0 0 12px rgba(230, 126, 34, 0.4));
    transform: scale(1);
  }
}
```

---

## Accessibility Considerations

**Respects prefers-reduced-motion:**

```css
@media (prefers-reduced-motion: reduce) {
  .raygun-icon {
    animation: none !important;
  }

  .raygun-container::before,
  .raygun-container::after {
    animation: none !important;
    opacity: 0; /* Hide particles entirely */
  }

  /* Keep hover effect but remove transform */
  .raygun-icon:hover {
    transform: none;
  }
}
```

---

## Recommended Implementation Order

**Session 3 (Hero Section):**
1. Base raygun styling with orange glow
2. Breathing animation
3. Hover intensify effect
4. Basic CSS particles (2-3 static particles)

**Session 4 (Laser Divider):**
5. Charging animation integration
6. JavaScript particle burst on laser fire

**Future Enhancement:**
7. More sophisticated particle systems if needed
8. Custom raygun asset (Phase 2 decision)

---

## Color Reference

**From tokens.css:**
- `var(--color-orange)` = #E67E22 (light), #F39C12 (dark)
- `var(--color-gold)` = #C9A961 (light), #D4AF37 (dark)
- `var(--color-magenta)` = #db2777 (light), #ec4899 (dark)
- `var(--glow-orange)` = 0 0 20px rgba(230, 126, 34, 0.5) (light)
- `var(--glow-orange-strong)` = 0 0 30px rgba(230, 126, 34, 0.8) (light)

**Laser Beam Gradients (FINAL):**
- **Light mode:** Teal (#008080) → Aqua (#20B2AA) → Tangerine (#FFB347) → Goldenrod (#DAA520)
  - Strategy: Start with ecosystem connection (teal), transition to orange warmth
- **Dark mode:** Red-Orange (#FF4500) → Dark Orange (#FF8C00) → Hot Pink (#FF69B4) → Lime (#ADFF2F)
  - Strategy: Radioactive chaos, mad scientist unstable energy, HOT from start

**Laser Animation Performance (CRITICAL):**
- **Fire duration:** `1000ms` (not 1200ms - slower feels sluggish)
- **Fire easing:** `cubic-bezier(0.25, 0.1, 0.25, 1)` (smooth swoosh)
- **Opacity flash:** 10% keyframe at `0.95 opacity` (immediate punch)
- **GPU hint:** `will-change: transform, opacity`
- **Retract duration:** `600ms`
- **Retract easing:** `cubic-bezier(0.65, 0, 0.35, 1)`
- **Mobile:** `filter: none` for performance
- See `laser-gradient-FINAL-v2.html` for reference implementation

---

## Success Criteria

**The raygun should:**
- ✅ Feel alive (breathing animation)
- ✅ Reward curiosity (hover intensifies)
- ✅ Signal action (click bursts)
- ✅ Be distinct from adapthuman.com teal raygun
- ✅ Respect reduced motion preferences
- ✅ Work in both light and dark modes

**It should NOT:**
- ❌ Be distracting (subtle breathing, not seizure-inducing)
- ❌ Require asset modification (CSS effects only)
- ❌ Dominate the page (supporting element, not hero)

---

*For Session 3 implementation*
*See tokens.css for color variables*
*See laser-gradient-test.html for gradient examples*
