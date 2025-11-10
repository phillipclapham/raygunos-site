/**
 * Scroll Reveals - STRIPPED DOWN VERSION
 * Fuck the complexity. Just make it work.
 */

(function() {
  'use strict';

  console.log('%c🔥 Scroll reveals loading...', 'color: #E67E22; font-weight: bold;');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('%c🔥 Reduced motion detected, skipping animations', 'color: #E67E22;');
    return;
  }

  /**
   * Initialize - SIMPLE VERSION
   */
  function init() {
    const elements = document.querySelectorAll('.panel, .pull-quote, .section-title, .principle-card, .framework-cta');

    console.log(`%c🔥 Found ${elements.length} elements to animate`, 'color: #E67E22; font-weight: bold;');

    if (elements.length === 0) return;

    // Set up observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        console.log(`%c🔥 Intersection:`, 'color: #E67E22;', entry.target.className, 'isIntersecting:', entry.isIntersecting);

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
          console.log(`%c🔥 Added is-visible to:`, 'color: #E67E22;', entry.target.className);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    // Observe all elements
    elements.forEach(el => observer.observe(el));

    console.log('%c🔥 Observer set up complete', 'color: #E67E22; font-weight: bold;');
  }

  // Run after DOM is ready AND after a brief delay to ensure layout
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }

})();
