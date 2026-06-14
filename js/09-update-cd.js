'use strict';
function updateCd(secs){
  const el=document.getElementById('task-cd');if(!el)return;
  if(!secs){el.textContent='';return;}
  const m=String(Math.floor(secs/60)).padStart(2,'0'),s=String(secs%60).padStart(2,'0');
  el.textContent=`${m}:${s}`;
  el.className='task-cd'+(secs<=10?' urgent':secs<=25?' warn':'');
}