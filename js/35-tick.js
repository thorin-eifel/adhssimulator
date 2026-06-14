'use strict';
function tick(){
  if(isPaused||phase==='welcome'||phase==='debrief')return;
  ticks++;
  const elapsedMs=performance.now()-simStartTime-simPausedMs;
  const tm=document.getElementById('sim-timer');

  if(phase==='baseline'){
    const rem=Math.max(0,Math.floor(effectiveBaselineSecs-elapsedMs/1000));
    if(tm)tm.textContent=`${String(Math.floor(rem/60)).padStart(2,'0')}:${String(rem%60).padStart(2,'0')}`;
    updateTeacherView();
    if(elapsedMs>=effectiveBaselineMs)showAdhdTransition();
    return;
  }

  const adhdMs=elapsedMs-effectiveBaselineMs;
  const remSec=Math.max(0,Math.floor(simDuration-adhdMs/1000));
  if(tm)tm.textContent=`${String(Math.floor(remSec/60)).padStart(2,'0')}:${String(remSec%60).padStart(2,'0')}`;

  if(ticks%8===0){
    if(hyperfocusActive){
      focus=Math.min(100,focus+0.5);updateMeter();
    }else{
      const D=DIFF_CFG[diffLevel];
      const dayMod={gut:.72,normal:1,schlecht:1.35}[dayMode]||1;
      let drain=0.5*D.drainMul*dayMod;
      if(medicationMode)drain*=.38;
      if(phase==='moderate')drain*=1.5;
      if(phase==='intense')drain*=2.2;
      drainFocus(drain);
    }
  }
  if(!hyperfocusActive&&phase!=='calm'&&ticks%4===0){
    const D=DIFF_CFG[diffLevel];
    const dayMod={gut:1.4,normal:1,schlecht:.7}[dayMode]||1;
    const medMod=medicationMode?1.9:1;
    const [lo,hi]=D.thoughtGap;
    if(Math.random()<4000/(lo*dayMod*medMod+Math.random()*(hi-lo)*dayMod*medMod))spawnThought();
  }
  if(!hyperfocusActive&&phase!=='calm'&&ticks%5===0){
    const D=DIFF_CFG[diffLevel];
    const dayMod={gut:1.4,normal:1,schlecht:.7}[dayMode]||1;
    const medMod=medicationMode?1.9:1;
    const [lo,hi]=D.notifGap;
    if(Math.random()<5000/(lo*dayMod*medMod+Math.random()*(hi-lo)*dayMod*medMod))spawnNotif();
  }
  updateTeacherView();
  if(adhdMs/1000>=simDuration){endSim();return;}
}