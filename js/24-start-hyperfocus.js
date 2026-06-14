'use strict';
// ── HYPERFOCUS ────────────────────────────────────────────────────
function startHyperfocus(){
  if(hyperfocusActive)return;
  hyperfocusActive=true;
  document.getElementById('hyperfocus-badge').classList.add('show');
  document.body.classList.add('hyperfocus');
  document.getElementById('thoughts').innerHTML='';
  document.getElementById('notifs').innerHTML='';
  later(60000,endHyperfocus);
}