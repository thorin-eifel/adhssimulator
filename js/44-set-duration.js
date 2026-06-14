'use strict';
// ── DURATION SELECTOR ─────────────────────────────────────────────
function setDuration(secs){
  simDuration=secs;
  document.querySelectorAll('.dur-btn').forEach(b=>{
    b.classList.toggle('sel',+b.dataset.dur===secs);
  });
}