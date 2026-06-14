'use strict';
// ── INIT ─────────────────────────────────────────────────────────
// Keyboard shortcuts: 1-4 for MC answers during simulation
document.addEventListener('keydown',e=>{
  if(isPaused||phase==='welcome'||phase==='debrief'||phase==='baseline')return;
  const n=parseInt(e.key);
  if(n>=1&&n<=4&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
    if(['TEXTAREA','INPUT'].includes(document.activeElement?.tagName))return;
    const btns=[...document.querySelectorAll('.answer-btn')].filter(b=>!b.disabled);
    if(btns[n-1]){btns[n-1].click();e.preventDefault();}
  }
});

(()=>{
  try{const t=localStorage.getItem('lg_kinder_theme');if(t&&t!=='default'){setTheme(t);}}catch(e){}
  SFX.init('klasse');
  setLang('de');
  if(location.hash==='#aggregate'){
    setTimeout(()=>openAggregate(),100);
  }
})();