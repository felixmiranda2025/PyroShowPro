// animations.js — Reveal on scroll con IntersectionObserver
(function() {
  // Activar fade-up al entrar en viewport
  var fadeEls = document.querySelectorAll('.fade-up');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(function(el) { observer.observe(el); });

  // Contador animado para stats
  var counters = document.querySelectorAll('.stat-num');
  var counterObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var raw = el.textContent.trim();
      var num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;

      var prefix = raw.match(/^[^0-9]*/)[0];
      var suffix = raw.replace(prefix, '').replace(/[0-9.]+/, '');
      var start = 0;
      var dur   = 1200;
      var t0    = null;

      function animNum(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
        var cur = start + (num - start) * eased;
        el.textContent = prefix + (Number.isInteger(num) ? Math.round(cur) : cur.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(animNum);
      }
      requestAnimationFrame(animNum);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function(c) { counterObs.observe(c); });

  // Parallax suave en orbs del hero
  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;
    var orbs = document.querySelectorAll('.hero-orb');
    orbs.forEach(function(orb, i) {
      orb.style.transform = 'translateY(' + (scrollY * (i === 0 ? 0.08 : 0.12)) + 'px)';
    });
  }, { passive: true });
})();
