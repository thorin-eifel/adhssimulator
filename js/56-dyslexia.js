'use strict';
// ── OPENDYSLEXIC TOGGLE ───────────────────────────────────────────
let dyslexicMode = (()=>{try{return localStorage.getItem('adhs_dyslexic')==='1'}catch{return false}})();

function toggleDyslexia(){
  dyslexicMode = !dyslexicMode;
  _applyDyslexia();
  try{localStorage.setItem('adhs_dyslexic', dyslexicMode?'1':'0');}catch{}
}

function _applyDyslexia(){
  document.body.classList.toggle('dyslexic', dyslexicMode);
  if(dyslexicMode && !document.getElementById('od-font')){
    const link=document.createElement('link');
    link.id='od-font';link.rel='stylesheet';
    link.href='https://fonts.cdnfonts.com/css/opendyslexic';
    document.head.appendChild(link);
  }
  const btn=document.getElementById('dyslexia-btn');
  if(btn){
    btn.classList.toggle('active', dyslexicMode);
    btn.textContent = dyslexicMode ? '🔤 OpenDyslexic-Schrift ✓' : '🔤 OpenDyslexic-Schrift';
  }
}

// restore on load
if(dyslexicMode) _applyDyslexia();
