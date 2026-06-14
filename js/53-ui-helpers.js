'use strict';
// ── UI HELPERS ────────────────────────────────────────────────────
function selectSc(el){document.querySelectorAll('.sc-btn').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');SFX.init(el.dataset.sc);}
function setDiff(v){diffLevel=v;document.querySelectorAll('.opt-btn').forEach(b=>b.classList.toggle('active',b.dataset.val===v));}
function toggleMed(){
  medicationMode=!medicationMode;
  document.getElementById('med-btn').classList.toggle('active',medicationMode);
  document.getElementById('med-dot').style.background=medicationMode?'var(--green)':'';
  document.getElementById('med-label').textContent=medicationMode?T[lang].medOn:T[lang].medOff;
}

function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');}

function setTheme(t){
  currentTheme=t;
  if(t==='default'){document.documentElement.removeAttribute('data-theme');}else{document.documentElement.setAttribute('data-theme',t);}
  try{localStorage.setItem('lg_kinder_theme',t);}catch(e){}
  document.querySelectorAll('.theme-swatch').forEach(el=>el.classList.toggle('active',el.dataset.theme===t));
}