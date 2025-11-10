/**
 * Scroll Reveals - Intersection Observer for fade/slide animations
 * Session 5: FIXED - Progressive enhancement architecture
 *
 * Architecture:
 * 1. Content is visible by default (no JS = accessible)
 * 2. JS checks what's in viewport vs below fold
 * 3. Only hides elements below fold for animation
 * 4. Reveals them when they scroll into view
 */

(function() {
  'use strict';

  // Signal that JavaScript is available
  document.documentElement.classList.add('js-enabled');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Check if element is currently in viewport
   */
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Element is in viewport if ANY part is visible
    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }

  /**
   * Set up Intersection Observer for scroll reveals
   */
  function initScrollReveals() {
    // Select all elements to animate
    const revealElements = document.querySelectorAll(`
      .panel,
      .pull-quote,
      .section-title,
      .principle-card,
      .framework-cta
    `);

    if (revealElements.length === 0) {
      console.log('%c👀 No elements to reveal', 'color: #E67E22;');
      return;
    }

    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      // Elements stay visible (default state), no animation
      revealElements.forEach(el => el.classList.add('visible'));
      console.log('%c👀 Scroll reveals disabled (reduced motion)', 'color: #E67E22; font-weight: bold;');
      return;
    }

    // Separate elements into "already visible" vs "needs revealing"
    const elementsToObserve = [];

    revealElements.forEach(el => {
      if (isInViewport(el)) {
        // Already in viewport - don't hide it, just mark as visible
        el.classList.add('visible');
      } else {
        // Below the fold - hide it for reveal animation
        el.classList.add('reveal');
        elementsToObserve.push(el);
      }
    });

    console.log(`%c👀 Scroll reveals: ${revealElements.length} total, ${revealElements.length - elementsToObserve.length} already visible, ${elementsToObserve.length} to reveal`, 'color: #E67E22; font-weight: bold;');

    // Only set up observer if there are elements to observe
    if (elementsToObserve.length === 0) {
      console.log('%c👀 All elements already visible, no observation needed', 'color: #E67E22;');
      return;
    }

    // Set up Intersection Observer for elements below fold
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: '50px' // Start animating slightly before element enters viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('visible');

          // Stop observing once revealed (animation only happens once)
          observer.unobserve(entry.target);

          console.log('%c👀 Revealed:', 'color: #E67E22;', entry.target);
        }
      });
    }, observerOptions);

    // Observe elements that need revealing
    elementsToObserve.forEach(el => {
      observer.observe(el);
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveals);
  } else {
    initScrollReveals();
  }

})();
