'use strict';
// ── FOCUS METER ───────────────────────────────────────────────────
function updateMeter(){
  const bar=document.getElementById('m-bar');
  const val=document.getElementById('m-val-txt');
  const mood=document.getElementById('m-mood');
  if(!bar)return;
  const pct=Math.round(focus);
  bar.style.setProperty('--focus-pct', pct/100);
  if(val)val.textContent=pct+'%';
  const moods=T[lang].moods||[];
  if(mood){
    if(pct>80)mood.textContent=moods[0]||'';
    else if(pct>60)mood.textContent=moods[1]||'';
    else if(pct>40)mood.textContent=moods[2]||'';
    else if(pct>20)mood.textContent=moods[3]||'';
    else mood.textContent=moods[4]||'';
  }
}