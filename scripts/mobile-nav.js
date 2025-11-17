/* ============================================
   MOBILE NAVIGATION
   Hamburger menu toggle functionality
   ============================================ */

function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const menuToggle = document.querySelector('.mobile-menu-toggle');

  if (!mobileNav || !menuToggle) return;

  // Toggle open class on mobile nav
  mobileNav.classList.toggle('open');

  // Toggle active class on hamburger (for X animation)
  menuToggle.classList.toggle('active');

  // Prevent body scroll when menu is open
  if (mobileNav.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close mobile menu when clicking a link
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      const mobileNav = document.getElementById('mobile-nav');
      const menuToggle = document.querySelector('.mobile-menu-toggle');

      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Close mobile menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const mobileNav = document.getElementById('mobile-nav');
      const menuToggle = document.querySelector('.mobile-menu-toggle');

      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});
