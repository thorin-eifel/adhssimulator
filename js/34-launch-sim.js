'use strict';
function _launchSim(){
  simStartTime=performance.now();simPausedMs=0;
  if(medicationMode)document.body.classList.add('medicated');
  const ratio=simDuration/TOTAL_SECS;
  effectiveBaselineSecs=baselineEnabled?Math.round(BASELINE_SECS*ratio):0;
  effectiveBaselineMs=effectiveBaselineSecs*1000;
  const offset=effectiveBaselineMs;
  const sc=t=>Math.round(t*ratio);
  if(baselineEnabled){
    phase='baseline';
    document.getElementById('ui-sim-label').textContent=T[lang].baselineLabel;
    document.getElementById('baseline-badge').classList.add('show');
  }else{
    phase='calm';
  }
  simTimer=setInterval(tick,1000);
  later(offset+sc(800),spawnDayNote);
  const D=DIFF_CFG[diffLevel];
  later(offset+sc(D.phaseAt[0]),()=>{phase='mild';document.body.classList.add('phase-mild');});
  later(offset+sc(D.phaseAt[1]),()=>{phase='moderate';document.body.classList.remove('phase-mild');document.body.classList.add('phase-moderate');SFX.sfxPhase();SFX.startChaos();});
  later(offset+sc(D.phaseAt[2]),()=>{phase='intense';document.body.classList.remove('phase-moderate');document.body.classList.add('phase-intense');SFX.sfxPhase();});
  later(offset+sc(D.fidgetAt[0]),()=>document.getElementById('fidget').classList.add('show'));
  later(offset+sc(D.fidgetAt[1]),()=>document.getElementById('fidget').classList.add('fidget-urgent'));
  scheduleLehrer(D.lehrerAt.map(t=>offset+sc(t)));
  if(medicationMode){later(offset+sc(480000),()=>{document.getElementById('med-wearoff').textContent=T[lang].wearoff;document.getElementById('med-wearoff').classList.add('show');later(4000,()=>document.getElementById('med-wearoff').classList.remove('show'));});}
}