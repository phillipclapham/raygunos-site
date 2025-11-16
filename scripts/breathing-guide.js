/**
 * Breathing Guide Component
 * Animated breathing circle with timed instructions
 *
 * Pattern: 4s inhale, 2s hold, 4s exhale (repeat 2x = ~20s total)
 * Auto-advances to next state when complete
 */

(function() {
  'use strict';

  console.log('%c🫁 Breathing Guide loading...', 'color: #E67E22; font-weight: bold;');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Breathing Guide Controller
   */
  window.breathingGuide = {
    isRunning: false,
    cycleCount: 0,
    maxCycles: 2,
    currentPhase: null,

    /**
     * Start breathing guide
     */
    start: function() {
      if (this.isRunning) {
        console.log('%c🫁 Breathing guide already running', 'color: #E67E22;');
        return;
      }

      console.log('%c🫁 Starting breathing guide...', 'color: #E67E22;');

      this.isRunning = true;
      this.cycleCount = 0;
      this.currentPhase = 'inhale';

      // Get elements
      const circle = document.querySelector('.breathing-circle');
      const instruction = document.getElementById('breathing-instruction');

      if (!circle || !instruction) {
        console.error('Breathing guide elements not found');
        return;
      }

      // If reduced motion, skip animation and just show static guide
      if (prefersReducedMotion) {
        console.log('%c🫁 Reduced motion detected, using simplified guide', 'color: #E67E22;');
        this.runSimplifiedGuide(instruction);
        return;
      }

      // Start first cycle
      this.runCycle(circle, instruction);
    },

    /**
     * Run one breathing cycle (inhale → hold → exhale)
     */
    runCycle: function(circle, instruction) {
      console.log('%c🫁 Cycle', 'color: #E67E22;', this.cycleCount + 1, 'of', this.maxCycles);

      // Phase 1: Inhale (4 seconds)
      this.setPhase('inhale', circle, instruction);

      setTimeout(() => {
        // Phase 2: Hold (2 seconds)
        this.setPhase('hold', circle, instruction);

        setTimeout(() => {
          // Phase 3: Exhale (4 seconds)
          this.setPhase('exhale', circle, instruction);

          setTimeout(() => {
            // Cycle complete
            this.cycleCount++;

            if (this.cycleCount < this.maxCycles) {
              // Run next cycle
              this.runCycle(circle, instruction);
            } else {
              // All cycles complete
              this.complete(instruction);
            }
          }, 4000); // Exhale duration
        }, 2000); // Hold duration
      }, 4000); // Inhale duration
    },

    /**
     * Set breathing phase (inhale, hold, exhale)
     */
    setPhase: function(phase, circle, instruction) {
      this.currentPhase = phase;

      // Update instruction text
      const instructions = {
        inhale: 'Breathe in...',
        hold: 'Hold...',
        exhale: 'Breathe out...'
      };

      instruction.textContent = instructions[phase];

      // Update circle class for animation
      circle.className = 'breathing-circle breathing-' + phase;

      console.log('%c🫁 Phase:', 'color: #E67E22;', phase);
    },

    /**
     * Complete breathing guide
     */
    complete: function(instruction) {
      console.log('%c🫁 Breathing complete', 'color: #E67E22; font-weight: bold;');

      instruction.textContent = 'Complete ✓';

      this.isRunning = false;

      // Auto-advance to next state after 1 second
      setTimeout(() => {
        if (window.experimentEngine) {
          experimentEngine.nextState();
        }
      }, 1000);
    },

    /**
     * Simplified guide (for reduced motion)
     */
    runSimplifiedGuide: function(instruction) {
      console.log('%c🫁 Running simplified guide (no animation)', 'color: #E67E22;');

      // Just show text prompts without animation
      const phases = [
        { text: 'Breathe in slowly... (4 seconds)', duration: 4000 },
        { text: 'Hold... (2 seconds)', duration: 2000 },
        { text: 'Breathe out slowly... (4 seconds)', duration: 4000 },
        { text: 'Breathe in slowly... (4 seconds)', duration: 4000 },
        { text: 'Hold... (2 seconds)', duration: 2000 },
        { text: 'Breathe out slowly... (4 seconds)', duration: 4000 }
      ];

      let currentIndex = 0;

      const showPhase = () => {
        if (currentIndex < phases.length) {
          const phase = phases[currentIndex];
          instruction.textContent = phase.text;

          setTimeout(() => {
            currentIndex++;
            showPhase();
          }, phase.duration);
        } else {
          // Complete
          this.complete(instruction);
        }
      };

      showPhase();
    },

    /**
     * Stop breathing guide (if needed)
     */
    stop: function() {
      this.isRunning = false;
      console.log('%c🫁 Breathing guide stopped', 'color: #E67E22;');
    }
  };

  console.log('%c🫁 Breathing Guide ready', 'color: #E67E22; font-weight: bold;');

})();
