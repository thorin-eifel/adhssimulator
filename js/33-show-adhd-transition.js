'use strict';
function showAdhdTransition(){
  if(phase!=='baseline')return;
  TM.baselineCount=TM.idx;
  phase='calm';
  document.getElementById('baseline-badge').classList.remove('show');
  document.getElementById('ui-sim-label').textContent=T[lang].simLabel;
  const ov=document.getElementById('adhd-start-overlay');
  document.getElementById('aso-label').textContent=T[lang].asoLabel||'';
  document.getElementById('adhd-start-msg').textContent=T[lang].adhdStartMsg;
  ov.classList.add('show');
  setTimeout(()=>ov.classList.remove('show'),2800);
}