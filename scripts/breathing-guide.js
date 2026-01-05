/**
 * Breathing Guide Component - Calm, Simple Pattern
 *
 * Pattern: 4-2-6-2 (inhale-hold-exhale-pause)
 * - Inhale: 4 seconds (circle expands)
 * - Hold: 2 seconds (gentle pause at peak)
 * - Exhale: 6 seconds (slow contraction - parasympathetic activation)
 * - Pause: 2 seconds (rest before next cycle)
 *
 * Total: 14 seconds per cycle, 2 cycles = 28 seconds
 *
 * Design principles:
 * - Body cue is STATIC (in HTML, always visible)
 * - Only 3 instruction text changes: inhale, hold, exhale
 * - Pause phase is silent (no text change)
 * - Smooth animations matched EXACTLY to timing
 */

(function() {
  'use strict';

  // Timing constants (in milliseconds)
  const INHALE_DURATION = 4000;
  const HOLD_DURATION = 2000;
  const EXHALE_DURATION = 6000;
  const PAUSE_DURATION = 2000;
  const MAX_CYCLES = 2;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Breathing Guide Controller
   */
  window.breathingGuide = {
    isRunning: false,
    cycleCount: 0,
    currentPhase: null,

    /**
     * Start breathing guide
     */
    start: function() {
      if (this.isRunning) {
        return;
      }

      this.isRunning = true;
      this.cycleCount = 0;

      // Get elements
      const circle = document.querySelector('.breathing-circle');
      const instruction = document.getElementById('breathing-instruction');

      if (!circle || !instruction) {
        console.error('Breathing guide elements not found');
        return;
      }

      // Reset circle to base state
      circle.className = 'breathing-circle';

      // If reduced motion, use simplified text-only guide
      if (prefersReducedMotion) {
        this.runSimplifiedGuide(instruction);
        return;
      }

      // Start first cycle
      this.runCycle(circle, instruction);
    },

    /**
     * Run one breathing cycle
     */
    runCycle: function(circle, instruction) {
      // Phase 1: Inhale (4 seconds)
      this.setPhase('inhale', circle, instruction);

      setTimeout(() => {
        // Phase 2: Hold (2 seconds)
        this.setPhase('hold', circle, instruction);

        setTimeout(() => {
          // Phase 3: Exhale (6 seconds)
          this.setPhase('exhale', circle, instruction);

          setTimeout(() => {
            // Phase 4: Pause (2 seconds) - silent, no text change
            this.setPhase('pause', circle, instruction);

            setTimeout(() => {
              // Cycle complete
              this.cycleCount++;

              if (this.cycleCount < MAX_CYCLES) {
                // Run next cycle
                this.runCycle(circle, instruction);
              } else {
                // All cycles complete
                this.complete(instruction);
              }
            }, PAUSE_DURATION);
          }, EXHALE_DURATION);
        }, HOLD_DURATION);
      }, INHALE_DURATION);
    },

    /**
     * Set breathing phase
     */
    setPhase: function(phase, circle, instruction) {
      this.currentPhase = phase;

      // Instruction text (only 3 visible states, pause is silent)
      const instructions = {
        inhale: 'Breathe in...',
        hold: 'Hold...',
        exhale: 'Breathe out slowly...',
        pause: 'Breathe out slowly...'  // Keep exhale text during pause
      };

      // Circle animation classes
      const circleClasses = {
        inhale: 'breathing-inhale',
        hold: 'breathing-hold',
        exhale: 'breathing-exhale',
        pause: 'breathing-pause'
      };

      instruction.textContent = instructions[phase];
      circle.className = 'breathing-circle ' + circleClasses[phase];
    },

    /**
     * Complete breathing guide
     */
    complete: function(instruction) {
      instruction.textContent = 'You touched the gap ✓';
      this.isRunning = false;

      // Auto-advance to next state after brief pause
      setTimeout(() => {
        if (window.experimentEngine) {
          experimentEngine.nextState();
        }
      }, 1500);
    },

    /**
     * Simplified guide (for reduced motion preference)
     */
    runSimplifiedGuide: function(instruction) {
      const phases = [
        // Cycle 1
        { text: 'Breathe in... (4 sec)', duration: INHALE_DURATION },
        { text: 'Hold... (2 sec)', duration: HOLD_DURATION },
        { text: 'Breathe out slowly... (6 sec)', duration: EXHALE_DURATION },
        { text: '...', duration: PAUSE_DURATION },
        // Cycle 2
        { text: 'Breathe in... (4 sec)', duration: INHALE_DURATION },
        { text: 'Hold... (2 sec)', duration: HOLD_DURATION },
        { text: 'Breathe out slowly... (6 sec)', duration: EXHALE_DURATION },
        { text: '...', duration: PAUSE_DURATION }
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
          this.complete(instruction);
        }
      };

      showPhase();
    },

    /**
     * Stop breathing guide
     */
    stop: function() {
      this.isRunning = false;
    }
  };

})();
