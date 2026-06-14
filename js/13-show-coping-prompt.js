'use strict';
function showCopingPrompt(){
  const S=T[lang];
  document.getElementById('cp-title').textContent=S.copingTitle||'💡 Strategie';
  document.getElementById('cp-sub').textContent=S.copingSub||'';
  document.getElementById('cp-btn').textContent=S.copingBtn||'✓';
  document.getElementById('coping-prompt').classList.add('show');
}