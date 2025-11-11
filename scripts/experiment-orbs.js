/**
 * Experiment Orbs - Click-to-Spawn Interaction
 *
 * Click anywhere on hero section to spawn an experiment orb.
 * Orb floats upward, fades out, and removes itself.
 *
 * Features:
 * - Random color (orange, gold, magenta)
 * - Float up animation
 * - Performance cap (max 15 active orbs)
 * - Respects prefers-reduced-motion
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Skip if reduced motion preferred
  if (prefersReducedMotion) return;

  // Color options
  const colors = [
    { bg: '#E67E22', name: 'orange' },  // Orange
    { bg: '#C9A961', name: 'gold' },    // Gold
    { bg: '#db2777', name: 'magenta' }  // Magenta
  ];

  // Track active orbs for performance
  let activeOrbs = 0;
  const MAX_ORBS = 15;

  /**
   * Create and animate an experiment orb
   */
  function createOrb(x, y) {
    // Performance cap
    if (activeOrbs >= MAX_ORBS) return;

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random size
    const size = 30 + Math.random() * 40; // 30-70px

    // Create orb element
    const orb = document.createElement('div');
    orb.style.position = 'fixed';
    orb.style.left = `${x}px`;
    orb.style.top = `${y}px`;
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.borderRadius = '50%';
    orb.style.background = `radial-gradient(circle, ${color.bg}, transparent)`;
    orb.style.boxShadow = `0 0 ${size}px ${color.bg}`;
    orb.style.filter = 'blur(10px)';
    orb.style.pointerEvents = 'none';
    orb.style.opacity = '0.6';
    orb.style.transform = 'translate(-50%, -50%)';
    orb.style.zIndex = '10';
    orb.style.transition = 'all 2s ease-out';

    document.body.appendChild(orb);
    activeOrbs++;

    // Trigger animation after a brief delay
    setTimeout(() => {
      // Float upward
      orb.style.top = `${y - 200 - Math.random() * 100}px`; // Float up 200-300px
      orb.style.opacity = '0';
      orb.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }, 50);

    // Remove after animation completes
    setTimeout(() => {
      document.body.removeChild(orb);
      activeOrbs--;
    }, 2100);
  }

  /**
   * Handle click events
   */
  function handleClick(e) {
    // On homepage: only spawn in hero section
    // On framework page: spawn anywhere in main content
    const heroSection = e.target.closest('.hero');
    const mainContent = e.target.closest('main');

    if (heroSection || mainContent) {
      createOrb(e.clientX, e.clientY);
    }
  }

  /**
   * Initialize click handler
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Add click listener to document (event delegation)
    document.addEventListener('click', handleClick);
  }

  init();
})();
