'use strict';
// ── PAUSE / MUTE / FIDGET ─────────────────────────────────────────
function togglePause(){
  isPaused=!isPaused;
  const overlay=document.getElementById('pause-overlay');
  overlay.classList.toggle('show',isPaused);
  document.getElementById('pause-btn').classList.toggle('paused',isPaused);
  if(isPaused){
    simPausedAt=performance.now();
    if(TM.cdTimer)clearInterval(TM.cdTimer);
    trapFocus(overlay,document.getElementById('pause-btn'));
  }else{
    simPausedMs+=performance.now()-simPausedAt;
    releaseFocus(overlay);
    if(TM.cdSecs>0)TM.startCd(TM.cdSecs,()=>TM.advance());
  }
}