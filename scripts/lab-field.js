/**
 * Lab Field Background - Layers 2 & 3
 *
 * Layer 2: Drifting orbs (3-5 floating experiments)
 * Layer 3: Micro bursts (particle explosions every 3-5s)
 *
 * Respects prefers-reduced-motion and optimizes for mobile.
 */

(function() {
  'use strict';

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile detection for performance optimization
  const isMobile = window.innerWidth <= 768;

  // Number of orbs based on device
  const orbCount = isMobile ? 3 : 5;

  /**
   * Initialize drifting orbs (Layer 2)
   */
  function initDriftingOrbs() {
    const container = document.querySelector('.lab-field-orbs');
    if (!container) return;

    const colors = ['orb-orange', 'orb-gold', 'orb-magenta'];
    const orbs = [];

    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = `orb ${colors[i % colors.length]}`;

      // Random size (smaller on mobile)
      const size = isMobile
        ? 100 + Math.random() * 80  // 100-180px on mobile
        : 150 + Math.random() * 150; // 150-300px on desktop

      // Random starting position
      const x = 10 + Math.random() * 80; // 10-90% from left
      const y = 10 + Math.random() * 80; // 10-90% from top

      // Random drift speed (for parallax)
      const speed = 0.3 + Math.random() * 0.7; // 0.3-1.0

      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.left = `${x}%`;
      orb.style.top = `${y}%`;
      orb.dataset.speed = speed;

      // Add drift animation (CSS keyframe) if motion allowed
      if (!prefersReducedMotion) {
        const duration = 30 + Math.random() * 20; // 30-50s
        orb.style.animation = `orbDrift${(i % 3) + 1} ${duration}s ease-in-out infinite`;
        orb.style.animationDelay = `${Math.random() * 3}s`;
      }

      container.appendChild(orb);
      orbs.push(orb);
    }

    // Add parallax on scroll if motion allowed
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        orbs.forEach(orb => {
          const speed = parseFloat(orb.dataset.speed);
          const yPos = -(scrollY * speed * 0.3); // Reduced parallax intensity
          orb.style.transform = `translateY(${yPos}px)`;
        });
      });
    }
  }

  /**
   * Add drift animation keyframes dynamically
   */
  function addOrbAnimations() {
    if (prefersReducedMotion) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes orbDrift1 {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(30px, -20px); }
        50% { transform: translate(-20px, 30px); }
        75% { transform: translate(40px, 10px); }
      }

      @keyframes orbDrift2 {
        0%, 100% { transform: translate(0, 0); }
        33% { transform: translate(-40px, 30px); }
        66% { transform: translate(20px, -25px); }
      }

      @keyframes orbDrift3 {
        0%, 100% { transform: translate(0, 0); }
        50% { transform: translate(25px, 35px); }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Initialize micro bursts (Layer 3)
   */
  function initMicroBursts() {
    if (prefersReducedMotion || isMobile) return; // Skip on mobile for performance

    const container = document.querySelector('.lab-field-orbs'); // Reuse orbs container
    if (!container) return;

    const colors = ['#E67E22', '#C9A961', '#db2777']; // Orange, gold, magenta

    function createBurst() {
      // Random position
      const x = 10 + Math.random() * 80; // 10-90%
      const y = 10 + Math.random() * 80;

      // Random color
      const color = colors[Math.floor(Math.random() * colors.length)];

      // Create burst container
      const burst = document.createElement('div');
      burst.style.position = 'absolute';
      burst.style.left = `${x}%`;
      burst.style.top = `${y}%`;
      burst.style.pointerEvents = 'none';

      // Create 5-8 particles
      const particleCount = 5 + Math.floor(Math.random() * 4);

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.borderRadius = '50%';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 8px ${color}`;
        particle.style.opacity = '0.8';

        // Random direction
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const distance = 20 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        // Animate particle
        particle.style.transition = 'all 0.8s ease-out';
        burst.appendChild(particle);

        // Trigger animation after a brief delay
        setTimeout(() => {
          particle.style.transform = `translate(${tx}px, ${ty}px)`;
          particle.style.opacity = '0';
        }, 50);
      }

      container.appendChild(burst);

      // Remove burst after animation
      setTimeout(() => {
        container.removeChild(burst);
      }, 1000);
    }

    // Create burst every 3-5 seconds
    function scheduleBurst() {
      createBurst();
      const nextBurst = 3000 + Math.random() * 2000; // 3-5s
      setTimeout(scheduleBurst, nextBurst);
    }

    // Start after initial page load
    setTimeout(scheduleBurst, 2000);
  }

  /**
   * Initialize all lab field effects
   */
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    addOrbAnimations();
    initDriftingOrbs();
    initMicroBursts();
  }

  init();
})();
