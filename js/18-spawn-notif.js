'use strict';
function spawnNotif(){
  const notifs=T[lang].notifs;
  if(!notifs||!notifs.length)return;
  const n=notifs[notifIdx%notifs.length];
  notifIdx++;notifCount++;
  const el=document.createElement('div');el.className='notif';
  el.innerHTML=`<div class="notif-ico">${n.i}</div><div><div class="notif-app">${n.a}</div><div class="notif-msg">${n.t}</div></div>`;
  el.onclick=()=>el.remove();
  const tray=document.getElementById('notifs');tray.appendChild(el);
  if(Math.random()<.2){
    const sc=SFX.scType;
    const pool=T[lang].speak[sc];
    if(pool&&pool.length)SFX.speak(pool);
  }
  later(5000,()=>el.remove());
  if(tray.children.length>3)tray.children[0].remove();
}