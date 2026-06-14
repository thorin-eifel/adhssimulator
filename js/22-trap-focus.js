'use strict';
// ── FOCUS TRAPPING ────────────────────────────────────────────────
function trapFocus(containerEl,returnEl){
  const sel='button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
  const els=[...containerEl.querySelectorAll(sel)].filter(e=>!e.disabled);
  containerEl._trapReturn=returnEl;
  if(els.length)els[0].focus();
  containerEl._trap=e=>{
    if(e.key!=='Tab'||!els.length)return;
    if(els.length===1){e.preventDefault();return;}
    if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els[els.length-1].focus();}
    else if(!e.shiftKey&&document.activeElement===els[els.length-1]){e.preventDefault();els[0].focus();}
  };
  containerEl.addEventListener('keydown',containerEl._trap);
}