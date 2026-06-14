'use strict';
function updateDots(){
  const el=document.getElementById('tp-dots');if(!el||!TM.queue.length)return;
  const types=['mathe','lesen','schreiben','merken'];
  const cls=['qt','lt','st','mt'];
  const total=TM.queue.length,win=Math.min(total,14);
  const start=Math.max(0,Math.min(TM.idx%total-Math.floor(win/2),total-win));
  let html='';
  for(let i=start;i<start+win;i++){
    const t=TM.queue[i%total];
    const ci=types.indexOf(t.type);
    const tc=ci>=0?cls[ci]:'qt';
    const absIdx=TM.idx%total;
    const done=i<absIdx;const cur=i===absIdx;
    html+=`<span class="tp-dot${done?' done':''}${cur?' cur '+tc:''}"></span>`;
  }
  el.innerHTML=html;
}