'use strict';
function showCountdown(onDone){
  const S=T[lang];
  const overlay=document.getElementById('countdown-overlay');
  document.getElementById('cdo-msg').textContent=baselineEnabled?(S.cdMsgBaseline||S.cdMsg):S.cdMsg;
  document.getElementById('cdo-sub').textContent=baselineEnabled?(S.cdSubBaseline||S.cdSub):S.cdSub;
  const numEl=document.getElementById('cdo-num');
  let c=3;numEl.textContent=c;
  overlay.classList.add('show');
  const iv=setInterval(()=>{
    c--;
    if(c>0){numEl.textContent=c;}
    else{
      clearInterval(iv);
      overlay.style.transition='opacity .55s';
      overlay.classList.remove('show');
      setTimeout(()=>{overlay.style.transition='';onDone&&onDone();},580);
    }
  },1000);
}