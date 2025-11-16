/**
 * RAYGUN Experiment State Machine
 * Guides users through 5-minute interactive RAYGUN experience
 *
 * State Flow:
 * landing → grind → frame → interrupt → gap → reframe → [BRANCH]
 * Branch A (curious): experiment → reflection → [ENDING]
 * Branch B (depleted): depleted → reflection → [ENDING]
 * Endings: celebration / subtle / troubleshoot
 */

(function() {
  'use strict';

  console.log('%c🧪 RAYGUN Experiment Engine loading...', 'color: #E67E22; font-weight: bold;');

  // State definitions
  const STATES = {
    LANDING: 'landing',
    GRIND: 'grind',
    FRAME: 'frame',
    INTERRUPT: 'interrupt',
    GAP: 'gap',
    REFRAME: 'reframe',
    EXPERIMENT: 'experiment',   // Path A
    DEPLETED: 'depleted',       // Path B
    REFLECTION: 'reflection',   // Convergence point
    CELEBRATION: 'celebration', // Ending 1
    SUBTLE: 'subtle',          // Ending 2
    TROUBLESHOOT: 'troubleshoot' // Ending 3
  };

  // State machine data
  const experimentData = {
    currentState: STATES.LANDING,
    grindTask: '',
    frameChoice: '',
    constraint: '',
    experiment: '',
    branch: '', // 'curious' or 'depleted'
    reflection: '', // 'yes', 'maybe', or 'no'
    timestamp: null
  };

  /**
   * Experiment Engine
   */
  window.experimentEngine = {

    /**
     * Initialize experiment
     */
    init: function() {
      console.log('%c🧪 Initializing experiment...', 'color: #E67E22;');

      // Check for saved experiment in localStorage
      this.loadExperiment();

      // Show current state
      this.showState(experimentData.currentState);

      // Initialize breathing guide if needed
      if (experimentData.currentState === STATES.INTERRUPT) {
        this.initBreathingGuide();
      }

      console.log('%c🧪 Experiment initialized:', 'color: #E67E22;', experimentData);
    },

    /**
     * Move to next state (sequential progression)
     */
    nextState: function() {
      const current = experimentData.currentState;
      console.log('%c🧪 Next state from:', 'color: #E67E22;', current);

      // Capture input from current state before transitioning
      this.captureInput(current);

      // Determine next state based on current
      let next = null;

      switch (current) {
        case STATES.LANDING:
          next = STATES.GRIND;
          break;
        case STATES.GRIND:
          next = STATES.FRAME;
          break;
        case STATES.FRAME:
          // Only advance if frame selected
          if (!experimentData.frameChoice) {
            alert('Please select how you\'re thinking about this task.');
            return;
          }
          next = STATES.INTERRUPT;
          break;
        case STATES.INTERRUPT:
          // This state auto-advances after breathing
          next = STATES.GAP;
          break;
        case STATES.GAP:
          next = STATES.REFRAME;
          break;
        case STATES.REFRAME:
          // This state branches via selectBranch(), not nextState()
          alert('Please choose: Are you curious, or does this feel impossible?');
          return;
        case STATES.EXPERIMENT:
          next = STATES.REFLECTION;
          break;
        case STATES.DEPLETED:
          next = STATES.REFLECTION;
          break;
        case STATES.REFLECTION:
          // This state branches via selectReflection(), not nextState()
          alert('Please select: Did you notice a shift?');
          return;
        default:
          console.warn('Unknown state or end state:', current);
          return;
      }

      if (next) {
        this.transitionTo(next);
      }
    },

    /**
     * Handle frame selection
     */
    selectFrame: function(frameType) {
      console.log('%c🧪 Frame selected:', 'color: #E67E22;', frameType);

      experimentData.frameChoice = frameType;

      // Show feedback
      const feedback = document.getElementById('frame-feedback');
      if (feedback) {
        feedback.style.display = 'block';

        // Auto-advance after 2 seconds
        setTimeout(() => {
          this.nextState();
        }, 2000);
      }
    },

    /**
     * Handle branch selection (Path A vs B)
     */
    selectBranch: function(branch) {
      console.log('%c🧪 Branch selected:', 'color: #E67E22;', branch);

      experimentData.branch = branch;

      // Transition to appropriate path
      if (branch === 'curious') {
        this.transitionTo(STATES.EXPERIMENT);
      } else if (branch === 'depleted') {
        this.transitionTo(STATES.DEPLETED);
      }
    },

    /**
     * Handle reflection selection (determines ending)
     */
    selectReflection: function(reflection) {
      console.log('%c🧪 Reflection selected:', 'color: #E67E22;', reflection);

      experimentData.reflection = reflection;

      // Determine ending based on reflection + branch
      let ending = null;

      if (reflection === 'yes') {
        // Felt shift → Celebration
        ending = STATES.CELEBRATION;
      } else if (reflection === 'maybe') {
        // Not sure → Subtle help
        ending = STATES.SUBTLE;
      } else if (reflection === 'no') {
        // Didn't work → Troubleshooting
        ending = STATES.TROUBLESHOOT;
      }

      if (ending) {
        this.transitionTo(ending);

        // If celebration, populate summary
        if (ending === STATES.CELEBRATION) {
          this.populateSummary();
        }
      }
    },

    /**
     * Transition to new state
     */
    transitionTo: function(newState) {
      console.log('%c🧪 Transitioning:', 'color: #E67E22;', experimentData.currentState, '→', newState);

      const oldState = experimentData.currentState;
      experimentData.currentState = newState;

      // Hide old state
      this.hideState(oldState);

      // Show new state
      this.showState(newState);

      // Save to localStorage
      this.saveExperiment();

      // Initialize special states
      if (newState === STATES.INTERRUPT) {
        // Start breathing guide
        setTimeout(() => {
          if (window.breathingGuide) {
            window.breathingGuide.start();
          }
        }, 500);
      }
    },

    /**
     * Show state
     */
    showState: function(stateName) {
      const stateEl = document.getElementById(`state-${stateName}`);
      if (stateEl) {
        stateEl.classList.add('active');

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('%c🧪 Showing state:', 'color: #E67E22;', stateName);
      } else {
        console.error('State element not found:', stateName);
      }
    },

    /**
     * Hide state
     */
    hideState: function(stateName) {
      const stateEl = document.getElementById(`state-${stateName}`);
      if (stateEl) {
        stateEl.classList.remove('active');
      }
    },

    /**
     * Capture input from current state
     */
    captureInput: function(stateName) {
      switch (stateName) {
        case STATES.GRIND:
          const grindInput = document.getElementById('grind-input');
          if (grindInput) {
            experimentData.grindTask = grindInput.value.trim();
          }
          break;
        case STATES.GAP:
          const constraintInput = document.getElementById('constraint-input');
          if (constraintInput) {
            experimentData.constraint = constraintInput.value.trim();
          }
          break;
        case STATES.EXPERIMENT:
          const experimentInput = document.getElementById('experiment-input');
          if (experimentInput) {
            experimentData.experiment = experimentInput.value.trim();
          }
          break;
      }

      console.log('%c🧪 Captured input:', 'color: #E67E22;', experimentData);
    },

    /**
     * Populate summary (for celebration ending)
     */
    populateSummary: function() {
      console.log('%c🧪 Populating summary...', 'color: #E67E22;');

      // Map frame choice to readable text
      const frameLabels = {
        'burden': 'A burden I have to push through',
        'obstacle': 'An obstacle in my way',
        'should': 'Something I should have done already',
        'failing': 'A problem I\'m failing at'
      };

      // Populate summary elements
      const summaryGrind = document.getElementById('summary-grind');
      const summaryFrame = document.getElementById('summary-frame');
      const summaryConstraint = document.getElementById('summary-constraint');
      const summaryExperiment = document.getElementById('summary-experiment');

      if (summaryGrind) {
        summaryGrind.textContent = experimentData.grindTask || '(You chose to just think about it)';
      }

      if (summaryFrame) {
        summaryFrame.textContent = frameLabels[experimentData.frameChoice] || 'Unknown frame';
      }

      if (summaryConstraint) {
        summaryConstraint.textContent = experimentData.constraint || '(You chose to just think about it)';
      }

      if (summaryExperiment) {
        summaryExperiment.textContent = experimentData.experiment || '(You followed Path B - Depletion)';
      }
    },

    /**
     * Initialize breathing guide
     */
    initBreathingGuide: function() {
      console.log('%c🧪 Initializing breathing guide...', 'color: #E67E22;');

      // Breathing guide will auto-start and call this.nextState() when complete
      // See breathing-guide.js for implementation
    },

    /**
     * Reset experiment (start over)
     */
    reset: function() {
      console.log('%c🧪 Resetting experiment...', 'color: #E67E22;');

      // Clear all data
      experimentData.currentState = STATES.LANDING;
      experimentData.grindTask = '';
      experimentData.frameChoice = '';
      experimentData.constraint = '';
      experimentData.experiment = '';
      experimentData.branch = '';
      experimentData.reflection = '';
      experimentData.timestamp = new Date().toISOString();

      // Clear inputs
      const inputs = document.querySelectorAll('.state-input');
      inputs.forEach(input => input.value = '');

      // Hide all states
      Object.values(STATES).forEach(state => {
        this.hideState(state);
      });

      // Show landing
      this.showState(STATES.LANDING);

      // Save to localStorage
      this.saveExperiment();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    /**
     * Save experiment to localStorage
     */
    saveExperiment: function() {
      try {
        experimentData.timestamp = new Date().toISOString();
        localStorage.setItem('raygun_experiment', JSON.stringify(experimentData));
        console.log('%c🧪 Saved to localStorage', 'color: #E67E22;');
      } catch (e) {
        console.error('Failed to save experiment:', e);
      }
    },

    /**
     * Load experiment from localStorage
     */
    loadExperiment: function() {
      try {
        const saved = localStorage.getItem('raygun_experiment');
        if (saved) {
          const data = JSON.parse(saved);

          // Check if saved experiment is recent (within 24 hours)
          const savedTime = new Date(data.timestamp);
          const now = new Date();
          const hoursSince = (now - savedTime) / (1000 * 60 * 60);

          if (hoursSince < 24) {
            // Restore saved experiment
            Object.assign(experimentData, data);

            // Restore input values
            if (data.grindTask) {
              const grindInput = document.getElementById('grind-input');
              if (grindInput) grindInput.value = data.grindTask;
            }

            if (data.constraint) {
              const constraintInput = document.getElementById('constraint-input');
              if (constraintInput) constraintInput.value = data.constraint;
            }

            if (data.experiment) {
              const experimentInput = document.getElementById('experiment-input');
              if (experimentInput) experimentInput.value = data.experiment;
            }

            console.log('%c🧪 Loaded from localStorage (within 24h):', 'color: #E67E22;', experimentData);
          } else {
            console.log('%c🧪 Saved experiment too old, starting fresh', 'color: #E67E22;');
          }
        }
      } catch (e) {
        console.error('Failed to load experiment:', e);
      }
    }
  };

  /**
   * Initialize on DOM ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      experimentEngine.init();
    });
  } else {
    experimentEngine.init();
  }

  console.log('%c🧪 RAYGUN Experiment Engine ready', 'color: #E67E22; font-weight: bold;');

})();
