'use strict';
// ── OpenDyslexic toggle shared across all doku pages ─────────────
(function(){
  let on = false;
  try { on = localStorage.getItem('adhs_dyslexic') === '1'; } catch {}

  function apply(){
    document.body.classList.toggle('dyslexic', on);
    if (on && !document.getElementById('od-font')) {
      const l = document.createElement('link');
      l.id = 'od-font'; l.rel = 'stylesheet';
      l.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
      document.head.appendChild(l);
    }
    document.querySelectorAll('.topbar-dy-btn').forEach(btn => {
      btn.classList.toggle('active', on);
      btn.title = on ? 'Standardschrift' : 'OpenDyslexic-Lesehilfe';
    });
  }

  window.toggleDyslexia = function(){
    on = !on;
    try { localStorage.setItem('adhs_dyslexic', on ? '1' : '0'); } catch {}
    apply();
  };

  if (on) apply();
})();
