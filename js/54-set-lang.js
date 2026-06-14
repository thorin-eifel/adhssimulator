'use strict';
// ── SETLANG ───────────────────────────────────────────────────────
function setLang(l){
  lang=l;
  document.documentElement.lang=l;
  const S=T[l];
  document.getElementById('ui-title').innerHTML=S.title;
  document.getElementById('ui-sub').textContent=S.sub;
  document.getElementById('ui-theme-label').textContent=S.themeLabel;
  document.getElementById('ui-teacher-summary').textContent=S.teacherSummary;
  document.getElementById('ui-note').innerHTML=S.note;
  document.getElementById('ui-sc-label').textContent=S.scLabel;
  ['klasse','schulhof','regen','bibliothek','lautlos'].forEach(k=>{
    const el=document.getElementById('sc-'+k);
    if(el)el.textContent=S['sc_'+k];
  });
  ['gut','normal','schlecht'].forEach(k=>{
    const el=document.getElementById('day-'+k);
    if(el)el.textContent=S['day_'+k];
  });
  document.getElementById('ui-diff-lbl').textContent=S.diffLbl;
  ['leicht','mittel','intensiv'].forEach(k=>{
    const el=document.getElementById('diff-'+k);
    if(el)el.textContent=S['diff_'+k];
  });
  document.getElementById('med-label').textContent=medicationMode?S.medOn:S.medOff;
  document.getElementById('ui-start-btn').textContent=S.startBtn;
  document.getElementById('ui-sim-label').textContent=S.simLabel;
  document.getElementById('ui-focus-label').textContent=S.focusLabel;
  document.getElementById('ui-pause-lbl').textContent=S.pauseLbl;
  document.getElementById('ui-pause-note').textContent=S.pauseNote;
  document.getElementById('ui-resume-btn').textContent=S.resumeBtn;
  document.getElementById('med-badge').textContent=S.medBadge;
  document.getElementById('lh-role').textContent=S.lehrerRole;
  document.getElementById('lh-btn-lost').textContent=S.lehrerLost;
  document.getElementById('lh-btn-ok').textContent=S.lehrerOk;
  const featureTiles=[
    {i:'🎯',t:'Echte Aufgaben',d:'Du lernst wie alle anderen — Mathe, Lesen, Schreiben.'},
    {i:'💭',t:'Gedanken kommen einfach',d:'Ob du willst oder nicht — dein Kopf springt ständig.'},
    {i:'🔔',t:'Ablenkungen überall',d:'Das Klassenzimmer ist voller Dinge, die die Aufmerksamkeit stehlen.'},
    {i:'💡',t:'Zum Nachdenken',d:'Am Ende gibt es Fragen, die ihr gemeinsam besprechen könnt.'},
  ];
  ['f1','f2','f3','f4'].forEach((id,idx)=>{
    const ft=featureTiles[idx];
    document.getElementById('ui-'+id+'i').textContent=ft.i;
    document.getElementById('ui-'+id+'t').textContent=ft.t;
    document.getElementById('ui-'+id+'d').textContent=ft.d;
  });
  const bll=document.getElementById('ui-baseline-lbl');if(bll)bll.textContent=S.baselineLbl||'';
  updateMeter();
}