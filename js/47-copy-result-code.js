'use strict';
function copyResultCode(){
  const code=encodeResult();
  navigator.clipboard.writeText(code).catch(()=>{});
  const btn=document.getElementById('ui-agg-btn');
  const orig=btn.textContent;
  btn.textContent=T[lang].aggCopied||'✓ Kopiert!';
  setTimeout(()=>btn.textContent=orig,2000);
}