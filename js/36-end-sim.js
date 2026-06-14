'use strict';
// ── END SIMULATION ────────────────────────────────────────────────
function endSim(){
  if(phase==='debrief')return;
  phase='debrief';
  clearInterval(simTimer);allTO.forEach(clearTimeout);allTO=[];
  TM.stop();SFX.stop();
  document.body.classList.remove('phase-mild','phase-moderate','phase-intense','hyperfocus');
  document.getElementById('hyperfocus-badge').classList.remove('show');
  document.getElementById('baseline-badge').classList.remove('show');
  document.getElementById('adhd-start-overlay').classList.remove('show');
  hyperfocusActive=false;
  const overlay=document.getElementById('sim-end-overlay');
  document.getElementById('sim-end-msg').textContent=T[lang].simEndMsg;
  overlay.classList.add('show');
  setTimeout(()=>{
    overlay.classList.remove('show');
    showMoodCheck();
  },1800);
}