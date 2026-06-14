'use strict';
// ── LEHRER ────────────────────────────────────────────────────────
function showLehrer(){
  if(phase==='debrief'||phase==='welcome')return;
  const S=T[lang];
  const msgs=S.lehrerMsgs;
  document.getElementById('lh-msg').textContent=msgs[Math.floor(Math.random()*msgs.length)];
  document.getElementById('lh-role').textContent=S.lehrerRole;
  document.getElementById('lehrer').classList.add('show');
  later(8000,()=>document.getElementById('lehrer').classList.remove('show'));
}