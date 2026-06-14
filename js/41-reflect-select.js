'use strict';
// ── REFLECTION ────────────────────────────────────────────────────
function reflectSelect(btn){
  const q=btn.dataset.q;
  document.querySelectorAll(`.reflect-btn[data-q="${q}"]`).forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  revealNextBlock(+q);
}