/**
 * Word Glow Effects
 *
 * CSS handles the base glow styling (.glow-word, .glow-word-emphasis).
 * This script adds subtle reveal animations when words scroll into view.
 *
 * Optional enhancement - site works without it.
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize intersection observer for glow words
   */
  function initGlowReveal() {
    // Skip if reduced motion or no IntersectionObserver support
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const glowWords = document.querySelectorAll('.glow-word, .glow-word-emphasis');
    if (glowWords.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('glow-active');
        }
      });
    }, {
      threshold: 0.5 // Trigger when 50% visible
    });

    glowWords.forEach(word => {
      observer.observe(word);
    });
  }

  /**
   * Initialize on DOM ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initGlowReveal();
  }

  init();
})();
