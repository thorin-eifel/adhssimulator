'use strict';
function useCoping(){
  const S=T[lang];
  document.getElementById('cp-btn').disabled=true;
  const fb=document.getElementById('cp-feedback');
  fb.textContent=S.copingFeedback||'Fokus erholt sich …';
  fb.classList.add('show');
  clearInterval(copingRecoveryIv);
  let ticks=0;
  copingRecoveryIv=setInterval(()=>{
    ticks++;
    focus=Math.min(100,focus+0.5);
    updateMeter();
    if(ticks>=20){clearInterval(copingRecoveryIv);copingRecoveryIv=null;}
  },1000);
  setTimeout(()=>document.getElementById('coping-prompt').classList.remove('show'),2200);
}