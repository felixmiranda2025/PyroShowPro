// nav.js — Navbar scroll + hamburger
(function() {
  var nav       = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  // Scroll: añadir clase .scrolled
  window.addEventListener('scroll', function() {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  // Hamburger
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    // Cerrar al hacer clic en un link
    navLinks.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  // Marcar link activo segun seccion visible
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('.nav-links a[href^="#"]');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        links.forEach(function(l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function(s) { observer.observe(s); });
})();
