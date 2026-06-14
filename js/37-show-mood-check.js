'use strict';
// ── MOOD CHECK-IN ─────────────────────────────────────────────────
function showMoodCheck(){
  const S=T[lang];
  document.getElementById('mood-prompt').textContent=S.moodPrompt||'Wie fühlst du dich gerade?';
  document.getElementById('mood-skip').textContent=S.moodSkip||'Überspringen →';
  document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('sel'));
  document.getElementById('mood-overlay').classList.add('show');
}