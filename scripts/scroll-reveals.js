/**
 * Scroll Reveals - Intersection Observer for fade/slide animations
 * Session 5: Homepage core content
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    // Just add visible class to everything immediately
    document.querySelectorAll('.panel, .pull-quote, .section-title, .principle-card, .framework-cta').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  /**
   * Set up Intersection Observer for scroll reveals
   */
  function initScrollReveals() {
    const observerOptions = {
      threshold: 0.15, // Trigger when 15% visible
      rootMargin: '0px 0px -50px 0px' // Start slightly before element enters viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('visible');

          // Stop observing once revealed (animation only happens once)
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll reveal animations
    const revealElements = document.querySelectorAll(`
      .panel,
      .pull-quote,
      .section-title,
      .principle-card,
      .framework-cta
    `);

    revealElements.forEach(el => {
      observer.observe(el);
    });

    console.log(`%c👀 Scroll reveals active (${revealElements.length} elements)`, 'color: #E67E22; font-weight: bold;');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveals);
  } else {
    initScrollReveals();
  }

})();
