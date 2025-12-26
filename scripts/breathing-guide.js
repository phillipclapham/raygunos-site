/**
 * Breathing Guide Component - Physiological Sigh + Body Reset
 *
 * Pattern: Physiological sigh (double inhale through nose, long exhale through mouth)
 * Plus body relaxation cues - teaches the full "touch the gap" technique from RAYGUN v5.0
 *
 * Sequence per cycle:
 * 1. First inhale through nose (2s)
 * 2. Second inhale/sniff through nose (1s) - fills alveoli
 * 3. Body cue: "Relax shoulders, unclench jaw" (1s pause)
 * 4. Long exhale through mouth (5s)
 * 5. "Let the story pause" (1s pause)
 *
 * Total: ~10s per cycle, 2 cycles = ~20s
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

      console.log('%c🫁 Starting breathing guide (physiological sigh)...', 'color: #E67E22;');

      this.isRunning = true;
      this.cycleCount = 0;
      this.currentPhase = 'inhale1';

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
     * Run one breathing cycle (physiological sigh + body reset)
     */
    runCycle: function(circle, instruction) {
      console.log('%c🫁 Cycle', 'color: #E67E22;', this.cycleCount + 1, 'of', this.maxCycles);

      // Phase 1: First inhale through nose (2 seconds)
      this.setPhase('inhale1', circle, instruction);

      setTimeout(() => {
        // Phase 2: Second inhale/sniff (1 second)
        this.setPhase('inhale2', circle, instruction);

        setTimeout(() => {
          // Phase 3: Body cue (1 second)
          this.setPhase('body', circle, instruction);

          setTimeout(() => {
            // Phase 4: Long exhale through mouth (5 seconds)
            this.setPhase('exhale', circle, instruction);

            setTimeout(() => {
              // Phase 5: Story pause (1 second)
              this.setPhase('story', circle, instruction);

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
              }, 1000); // Story pause duration
            }, 5000); // Exhale duration
          }, 1000); // Body cue duration
        }, 1000); // Second inhale duration
      }, 2000); // First inhale duration
    },

    /**
     * Set breathing phase
     */
    setPhase: function(phase, circle, instruction) {
      this.currentPhase = phase;

      // Update instruction text
      const instructions = {
        inhale1: 'Breathe in through nose...',
        inhale2: '...and a little more',
        body: 'Relax shoulders, unclench jaw',
        exhale: 'Long breath out through mouth...',
        story: 'Let the story pause'
      };

      // Update circle animation class
      const circleClasses = {
        inhale1: 'breathing-inhale',
        inhale2: 'breathing-inhale',
        body: 'breathing-hold',
        exhale: 'breathing-exhale',
        story: 'breathing-hold'
      };

      instruction.textContent = instructions[phase];
      circle.className = 'breathing-circle ' + circleClasses[phase];

      console.log('%c🫁 Phase:', 'color: #E67E22;', phase);
    },

    /**
     * Complete breathing guide
     */
    complete: function(instruction) {
      console.log('%c🫁 Breathing complete', 'color: #E67E22; font-weight: bold;');

      instruction.textContent = 'You touched the gap ✓';

      this.isRunning = false;

      // Auto-advance to next state after 1.5 seconds
      setTimeout(() => {
        if (window.experimentEngine) {
          experimentEngine.nextState();
        }
      }, 1500);
    },

    /**
     * Simplified guide (for reduced motion)
     */
    runSimplifiedGuide: function(instruction) {
      console.log('%c🫁 Running simplified guide (no animation)', 'color: #E67E22;');

      // Text prompts without animation - physiological sigh pattern
      const phases = [
        { text: 'Breathe in through nose... (2 sec)', duration: 2000 },
        { text: '...and a little more (1 sec)', duration: 1000 },
        { text: 'Relax shoulders, unclench jaw', duration: 1000 },
        { text: 'Long breath out through mouth... (5 sec)', duration: 5000 },
        { text: 'Let the story pause', duration: 1000 },
        { text: 'Breathe in through nose... (2 sec)', duration: 2000 },
        { text: '...and a little more (1 sec)', duration: 1000 },
        { text: 'Relax shoulders, unclench jaw', duration: 1000 },
        { text: 'Long breath out through mouth... (5 sec)', duration: 5000 },
        { text: 'Let the story pause', duration: 1000 }
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

  console.log('%c🫁 Breathing Guide ready (physiological sigh pattern)', 'color: #E67E22; font-weight: bold;');

})();
