'use strict';
function copyAggLink(){
  const url=location.href.split('#')[0]+'#aggregate';
  navigator.clipboard.writeText(url).catch(()=>{});
  const btn=document.getElementById('agg-link-btn');
  const orig=btn.textContent;
  btn.textContent=T[lang].aggLinkCopied||'✓ Kopiert!';
  setTimeout(()=>btn.textContent=orig,2000);
}