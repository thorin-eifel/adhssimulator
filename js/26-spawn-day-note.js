'use strict';
// ── DAY MODE ──────────────────────────────────────────────────────
function spawnDayNote(){
  if(dayMode==='normal')return;
  const S=T[lang];
  const el=document.createElement('div');
  el.className='notif';
  el.innerHTML=`<div class="notif-ico">${dayMode==='gut'?'😴':'😫'}</div><div><div class="notif-app">${S.dayLbl}</div><div class="notif-msg">${dayMode==='gut'?S.dayNote_gut:S.dayNote_schlecht}</div></div>`;
  el.onclick=()=>el.remove();
  document.getElementById('notifs').appendChild(el);
  later(6000,()=>{if(el.parentNode)el.remove();});
}