/**
 * Scroll Reveals - ROBUST MOBILE VERSION
 * Works on all browsers, disables on mobile if problematic
 */

(function() {
  'use strict';

  console.log('%c🔥 Scroll reveals loading...', 'color: #E67E22; font-weight: bold;');

  // Detect mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('%c🔥 Reduced motion detected, skipping animations', 'color: #E67E22;');
    return;
  }

  /**
   * Initialize - ROBUST VERSION
   */
  function init() {
    const elements = document.querySelectorAll('.panel, .pull-quote, .section-title, .principle-card, .framework-cta');

    console.log(`%c🔥 Found ${elements.length} elements to animate (Mobile: ${isMobile})`, 'color: #E67E22; font-weight: bold;');

    if (elements.length === 0) return;

    // MOBILE FALLBACK: Just show everything immediately on mobile
    if (isMobile) {
      console.log('%c🔥 Mobile detected - showing all elements immediately', 'color: #E67E22;');
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // DESKTOP: Use Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01, // More permissive
      rootMargin: '50px' // Trigger earlier
    });

    // Observe all elements
    elements.forEach(el => observer.observe(el));

    console.log('%c🔥 Observer set up complete', 'color: #E67E22; font-weight: bold;');
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
