/**
 * Laser Divider Animation - RAYGUN OS
 * Fires on page load (stays visible as divider)
 * Retracts + refires on theme toggle with new color
 * Respects prefers-reduced-motion and accessibility
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return; // Exit early - CSS will hide elements
  }

  // Elements
  const raygunImage = document.querySelector('.raygun-divider-section .raygun-image');
  const laserBeamDivider = document.querySelector('.laser-beam-divider');
  const beamFan = document.querySelector('.laser-beam-fan');
  const brainTarget = document.querySelector('.brain-target');
  const brainContainer = document.querySelector('.brain-target-container');
  const html = document.documentElement;

  if (!raygunImage || !laserBeamDivider || !beamFan || !brainTarget || !brainContainer) {
    console.warn('Raygun laser elements not found');
    return;
  }

  // Fade in raygun once image loads (prevents flip flash)
  if (raygunImage.complete) {
    raygunImage.classList.add('loaded');
  } else {
    raygunImage.addEventListener('load', () => {
      raygunImage.classList.add('loaded');
    });
  }

  let beamFired = false;
  let brainActivated = false;

  /**
   * Update gradient reference based on theme
   */
  function updateBeamGradient() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const gradientId = isDark ? 'beamGradientDark' : 'beamGradientLight';
    beamFan.setAttribute('fill', `url(#${gradientId})`);
  }

  /**
   * Fire the laser beam - stays visible as divider
   */
  function fireLaser() {
    // Ensure correct gradient for current theme
    updateBeamGradient();

    // Charge-up phase: raygun glows (skip on mobile to prevent Chrome artifacts)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) {
      raygunImage.classList.add('charging');
    }

    // Fire phase: beam fan fires
    setTimeout(() => {
      beamFan.classList.add('firing');
      beamFired = true;

      // Remove charging glow after beam fires
      setTimeout(() => {
        raygunImage.classList.remove('charging');
      }, 200);

      // Brain activation - triggered as beam nears completion
      setTimeout(() => {
        activateBrain();
      }, 700);

      // Transition to visible state - add visible before removing firing
      setTimeout(() => {
        beamFan.classList.add('visible');
        beamFan.classList.remove('firing');
      }, 1000);
    }, 300);
  }

  /**
   * Activate the brain target - glow and grow (always animate, even on re-activation)
   */
  function activateBrain() {
    // Always run activation animation, even if already activated
    // Remove any existing classes first for clean re-trigger
    brainTarget.classList.remove('activated', 'active');
    brainContainer.classList.remove('bursting');

    // Force reflow to restart animation
    void brainTarget.offsetWidth;

    // Trigger activation animation
    brainTarget.classList.add('activated');
    brainContainer.classList.add('bursting');
    brainActivated = true;

    // After activation animation, switch to sustained breathing
    setTimeout(() => {
      brainTarget.classList.remove('activated');
      brainTarget.classList.add('active');
    }, 800);

    // Remove burst class after animation completes
    setTimeout(() => {
      brainContainer.classList.remove('bursting');
    }, 1400);
  }

  /**
   * Deactivate brain (for theme toggle retract)
   */
  function deactivateBrain() {
    brainTarget.classList.remove('active');
    brainTarget.classList.remove('activated');
  }

  /**
   * Retract and refire laser (theme toggle behavior)
   */
  function retractAndRefire() {
    if (!beamFired) return; // Only retract if beam is already visible

    // Dim brain during retract
    deactivateBrain();

    // Remove visible class, add retracting
    beamFan.classList.remove('visible');
    beamFan.classList.add('retracting');

    setTimeout(() => {
      beamFan.classList.remove('retracting');

      // Fire again with new theme gradient (brain will reactivate with new colors)
      setTimeout(() => {
        fireLaser();
      }, 100);
    }, 600);
  }

  /**
   * Fire laser when divider enters viewport (Intersection Observer)
   */
  function setupViewportFiring() {
    const dividerSection = document.querySelector('.raygun-divider-section');
    if (!dividerSection) return;

    let hasFired = false; // Only fire once

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasFired) {
          hasFired = true;
          // Small delay to let section settle
          setTimeout(() => {
            fireLaser();
          }, 300);
          // Stop observing after first fire
          observer.unobserve(dividerSection);
        }
      });
    }, {
      threshold: 0.3 // Fire when 30% of section is visible
    });

    observer.observe(dividerSection);
  }

  /**
   * Retract + refire on theme toggle
   * Listen to toggleTheme function calls by observing theme attribute changes
   */
  function setupThemeToggle() {
    // Watch for theme attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          // Small delay to let theme transition start
          setTimeout(() => {
            retractAndRefire();
          }, 150);
        }
      });
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  /**
   * Brain click interaction - synaptic burst (desktop only for now)
   */
  function setupBrainClick() {
    let isAnimating = false; // Debounce flag

    brainTarget.addEventListener('click', () => {
      if (isAnimating || !brainActivated) {
        return; // Only works after brain is activated
      }

      isAnimating = true;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;

      if (!isMobile) {
        // Desktop: Synaptic burst effect
        brainContainer.classList.add('synaptic-firing');
        setTimeout(() => {
          brainContainer.classList.remove('synaptic-firing');
          isAnimating = false;
        }, 1500);
      } else {
        // Mobile: Simple pulse (no complex effects)
        brainTarget.style.transform = 'scale(1.4)';
        setTimeout(() => {
          brainTarget.style.transform = '';
          isAnimating = false;
        }, 300);
      }
    });
  }

  // Fade in brain once image loads
  if (brainTarget.complete) {
    brainTarget.classList.add('loaded');
  } else {
    brainTarget.addEventListener('load', () => {
      brainTarget.classList.add('loaded');
    });
  }

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupViewportFiring(); // Fire when visible, not on page load
      setupThemeToggle();
      setupBrainClick();
    });
  } else {
    // DOM already loaded
    setupViewportFiring(); // Fire when visible, not on page load
    setupThemeToggle();
    setupBrainClick();
  }

})();
