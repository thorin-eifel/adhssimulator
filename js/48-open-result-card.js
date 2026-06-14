'use strict';
// ── RESULT CARD ───────────────────────────────────────────────────
function openResultCard(){
  const S=T[lang];
  const ov=document.getElementById('result-card-overlay');
  document.getElementById('rc-eyebrow').textContent=S.rcEyebrow;
  const lbls=S.rcStatLabels||['Tasks','Thoughts','Distractions','Focus'];
  document.getElementById('rc-stats').innerHTML=[
    {v:tasksCompleted,l:lbls[0]},
    {v:thoughtCount,l:lbls[1]},
    {v:notifCount,l:lbls[2]},
    {v:`${Math.round(focus)}%`,l:lbls[3]},
  ].map(s=>`<div class="rc-stat"><div class="rc-stat-val">${s.v}</div><div class="rc-stat-lbl">${s.l}</div></div>`).join('');
  const quotes=S.rcQuotes||[];
  const qi=focus>=80?3:focus>=65?2:focus>=45?1:0;
  document.getElementById('rc-quote').textContent=`"${quotes[qi]||''}"`;
  const now=new Date();
  document.getElementById('rc-footer').textContent=`${now.toLocaleDateString('de-DE')} · ${S.rcEyebrow}`;
  document.getElementById('rc-tip').textContent=S.rcTip||'';
  document.getElementById('rc-close-btn').textContent=S.rcClose||'Close';
  ov.classList.add('show');
}