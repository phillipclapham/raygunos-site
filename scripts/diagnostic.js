/**
 * Diagnostic Tool - Troubleshooting Page
 * Shows/hides recovery paths based on user selection
 */

(function() {
  'use strict';

  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', function() {
    initDiagnostic();
    checkForDeepLink();
  });

  function initDiagnostic() {
    const form = document.getElementById('diagnostic-form');
    const diagnosticPrompt = document.getElementById('diagnostic-prompt');
    const submitButton = form.querySelector('.btn-diagnose');

    if (!form) return;

    // Disable submit button initially
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.style.opacity = '0.5';
      submitButton.style.cursor = 'not-allowed';
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get selected radio button
      const selectedRadio = form.querySelector('input[name="failure-mode"]:checked');

      if (!selectedRadio) {
        return; // Button should be disabled, but double-check
      }

      const selectedPath = selectedRadio.value;

      // Hide diagnostic prompt
      if (diagnosticPrompt) {
        diagnosticPrompt.style.display = 'none';
      }

      // Show the selected recovery path
      showRecoveryPath(selectedPath);
    });

    // Handle radio button change - enable button when selection made
    const radios = form.querySelectorAll('input[name="failure-mode"]');
    radios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        // Enable submit button when any radio is selected
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.style.opacity = '1';
          submitButton.style.cursor = 'pointer';
        }
      });
    });
  }

  function showRecoveryPath(pathName) {
    // Hide all recovery paths
    const allPaths = document.querySelectorAll('.recovery-path');
    allPaths.forEach(function(path) {
      path.classList.remove('active');
    });

    // Show the selected path
    const selectedPath = document.getElementById('path-' + pathName);
    if (selectedPath) {
      selectedPath.classList.add('active');

      // Scroll to the recovery path smoothly
      setTimeout(function() {
        selectedPath.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }

  function checkForDeepLink() {
    // Check if URL has a hash (e.g., #depletion)
    const hash = window.location.hash;

    if (hash) {
      // Remove the # symbol
      const pathName = hash.substring(1);

      // Valid path names
      const validPaths = ['depletion', 'technique', 'habit', 'understanding'];

      if (validPaths.includes(pathName)) {
        // Select the corresponding radio button
        const radio = document.querySelector('input[name="failure-mode"][value="' + pathName + '"]');
        if (radio) {
          radio.checked = true;

          // Hide diagnostic prompt
          const diagnosticPrompt = document.getElementById('diagnostic-prompt');
          if (diagnosticPrompt) {
            diagnosticPrompt.style.display = 'none';
          }

          // Show the recovery path
          showRecoveryPath(pathName);
        }
      }
    }
  }

  // Global function for reset button
  window.resetDiagnostic = function() {
    // Scroll to top of diagnostic section
    const diagnosticSection = document.querySelector('.diagnostic-section');
    if (diagnosticSection) {
      diagnosticSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Hide all recovery paths
    const allPaths = document.querySelectorAll('.recovery-path');
    allPaths.forEach(function(path) {
      path.classList.remove('active');
    });

    // Show diagnostic prompt again
    const diagnosticPrompt = document.getElementById('diagnostic-prompt');
    if (diagnosticPrompt) {
      diagnosticPrompt.style.display = 'block';
    }

    // Uncheck all radio buttons
    const form = document.getElementById('diagnostic-form');
    if (form) {
      const radios = form.querySelectorAll('input[name="failure-mode"]');
      radios.forEach(function(radio) {
        radio.checked = false;
      });

      // Re-disable submit button
      const submitButton = form.querySelector('.btn-diagnose');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
      }
    }

    // Remove hash from URL
    history.pushState('', document.title, window.location.pathname + window.location.search);
  };
})();
