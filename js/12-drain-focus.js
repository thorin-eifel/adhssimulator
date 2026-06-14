'use strict';
// ── FOCUS DRAIN + COPING ──────────────────────────────────────────
function drainFocus(amount){
  focus=Math.max(0,focus-amount);
  updateMeter();
  if(!copingUsed&&focus<55&&phase!=='calm'&&phase!=='baseline'&&phase!=='welcome'&&phase!=='debrief'){
    copingUsed=true;
    setTimeout(showCopingPrompt,800);
  }
}