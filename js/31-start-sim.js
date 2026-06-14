'use strict';
// ── SIMULATION ENGINE ─────────────────────────────────────────────
function startSim(){
  ticks=0;focus=100;phase='calm';
  thoughtCount=0;notifCount=0;tasksCompleted=0;thoughtIdx=0;notifIdx=0;
  isPaused=false;hyperfocusActive=false;thoughtZones.clear();
  copingUsed=false;clearInterval(copingRecoveryIv);copingRecoveryIv=null;moodChoice=null;
  document.body.classList.remove('phase-mild','phase-moderate','phase-intense','hyperfocus','medicated');
  document.getElementById('notifs').innerHTML='';
  document.getElementById('thoughts').innerHTML='';
  document.getElementById('fidget').classList.remove('show','fidget-urgent');
  document.getElementById('pause-overlay').classList.remove('show');
  document.getElementById('lehrer').classList.remove('show');
  document.getElementById('med-badge').classList.remove('show');
  document.getElementById('med-wearoff').classList.remove('show');
  document.getElementById('hyperfocus-badge').classList.remove('show');
  document.getElementById('baseline-badge').classList.remove('show');
  document.getElementById('adhd-start-overlay').classList.remove('show');
  document.getElementById('ui-sim-label').textContent=T[lang].simLabel;
  allTO.forEach(clearTimeout);allTO=[];
  SFX.start();
  if(medicationMode){document.getElementById('med-badge').classList.add('show');}
  updateMeter();show('simulation');
  TM.start();
  showCountdown(_launchSim);
}