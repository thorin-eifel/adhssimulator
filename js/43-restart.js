'use strict';
// ── RESTART ───────────────────────────────────────────────────────
function restart(){
  clearInterval(simTimer);allTO.forEach(clearTimeout);allTO=[];
  TM.stop();SFX.stop();
  document.body.classList.remove('phase-mild','phase-moderate','phase-intense','hyperfocus','medicated');
  document.getElementById('pause-overlay').classList.remove('show');
  document.getElementById('lehrer').classList.remove('show');
  document.getElementById('hyperfocus-badge').classList.remove('show');
  document.getElementById('baseline-badge').classList.remove('show');
  document.getElementById('adhd-start-overlay').classList.remove('show');
  document.getElementById('coping-prompt').classList.remove('show');
  document.getElementById('sim-end-overlay').classList.remove('show');
  document.getElementById('countdown-overlay').classList.remove('show');
  document.getElementById('vignette').style.boxShadow='none';
  clearInterval(copingRecoveryIv);copingRecoveryIv=null;
  hyperfocusActive=false;isPaused=false;phase='welcome';show('welcome');
}