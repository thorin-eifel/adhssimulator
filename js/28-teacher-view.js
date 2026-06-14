'use strict';
// ── TEACHER VIEW ──────────────────────────────────────────────────
function toggleTeacherView(){
  teacherViewOpen=!teacherViewOpen;
  document.getElementById('teacher-view').classList.toggle('show',teacherViewOpen);
  if(teacherViewOpen)updateTeacherView();
}
function updateTeacherView(){
  if(!teacherViewOpen)return;
  const S=T[lang];
  const pm=S.tvPhases||{calm:'Calm',mild:'Light',moderate:'Active',intense:'Intense'};
  document.getElementById('tv-phase').textContent=pm[phase]||phase;
  document.getElementById('tv-focus').textContent=Math.round(focus)+'%';
  document.getElementById('tv-thoughts').textContent=thoughtCount;
  document.getElementById('tv-notifs').textContent=notifCount;
  document.getElementById('tv-hyper').textContent=hyperfocusActive?(S.tvHyperOn||'⚡'):(S.tvHyperOff||'—');
}