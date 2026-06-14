'use strict';
// ── DEBRIEF BUILDER ───────────────────────────────────────────────
function buildDebrief(){
  const S=T[lang];
  document.getElementById('ui-db-title').innerHTML=S.dbTitle;
  document.getElementById('ui-db-sub').textContent=S.dbSub;
  document.getElementById('ui-sym-title').innerHTML=S.symTitle;
  document.getElementById('ui-super-title').innerHTML=S.superTitle;
  document.getElementById('ui-anec-title').textContent=S.anecTitle;
  document.getElementById('ui-help-title').innerHTML=S.helpTitle;
  document.getElementById('ui-db-foot').textContent=S.dbFoot;
  // Reflection questions (sequential reveal)
  const rSec=document.getElementById('reflect-section');
  if(rSec){
    const moodEmoji={overwhelmed:'😤',stressed:'😰',neutral:'😐',calm:'😌',good:'😊'};
    const moodVals=S.moodVals||{};
    const moodBadge=moodChoice?`<div class="reflect-mood-badge"><span class="mood-emoji">${moodEmoji[moodChoice]||''}</span><span>${S.moodLabel||''} ${moodVals[moodChoice]||''}</span></div>`:'';
    const q1opts=(S.reflectQ1opts||[]).map(o=>`<button class="reflect-btn" data-q="1" onclick="reflectSelect(this)">${o.l}</button>`).join('');
    const q2opts=(S.reflectQ2opts||[]).map(o=>`<button class="reflect-btn" data-q="2" onclick="reflectSelect(this)">${o.l}</button>`).join('');
    rSec.innerHTML=`<div class="reflect-card">
      <div class="reflect-eyebrow">${S.reflectTitle||'Reflexion'}</div>
      ${moodBadge}
      <div class="reflect-q-block revealed" data-q-idx="1">
        <p class="reflect-q-text">${S.reflectQ1||''}</p>
        <div class="reflect-opts">${q1opts}</div>
      </div>
      <div class="reflect-q-block" data-q-idx="2">
        <p class="reflect-q-text">${S.reflectQ2||''}</p>
        <div class="reflect-opts">${q2opts}</div>
      </div>
      <div class="reflect-q-block" data-q-idx="3" style="border-bottom:none;margin-bottom:0;padding-bottom:0">
        <p class="reflect-q-text">${S.reflectQ3||''}</p>
        <textarea class="reflect-ta" placeholder="${S.reflectQ3placeholder||''}" rows="3"
          oninput="this.style.height='auto';this.style.height=this.scrollHeight+'px';revealNextBlock(3)"></textarea>
      </div>
    </div>`;
  }
  const lbl=S.statLabels;
  const bench=S.statBenchmarks||[];
  document.getElementById('stats').innerHTML=[
    {v:`${tasksCompleted}/${TM.queue.length}`,l:lbl[0],b:bench[0]},
    {v:thoughtCount,l:lbl[1],b:bench[1]},
    {v:notifCount,l:lbl[2],b:bench[2]},
    {v:`${Math.round(focus)}%`,l:lbl[3],b:bench[3]},
  ].map(s=>`<div class="stat"><big>${s.v}</big><small>${s.l}</small>${s.b?`<span class="stat-bench">${s.b}</span>`:''}</div>`).join('');
  document.getElementById('sym-grid').innerHTML=(S.syms||[]).map(s=>`<div class="sym"><em>${s.i}</em><h3>${s.t}</h3><p>${s.p}</p></div>`).join('');
  document.getElementById('super-grid').innerHTML=(S.superpowers||[]).map(s=>`<div class="super-card"><em>${s.i}</em><h3>${s.t}</h3><p>${s.p}</p></div>`).join('');
  document.getElementById('anec-grid').innerHTML=(S.anecdotes||[]).map(a=>`<div class="anec-card"><p>${a.t}</p><span class="anec-tag">${a.tag}</span></div>`).join('');
  document.getElementById('help-grid').innerHTML=(S.helpItems||[]).map(h=>`<div class="help-item"><div class="help-ico">${h.i}</div><div class="help-text"><strong>${h.t}</strong><span>${h.d}</span></div></div>`).join('');
  document.getElementById('tg-eyebrow').textContent=S.tgEyebrow;
  document.getElementById('tg-disc-title').textContent=S.tgDiscTitle;
  document.getElementById('tg-msg-title').textContent=S.tgMsgTitle;
  document.getElementById('tg-next-title').textContent=S.tgNextTitle;
  document.getElementById('tg-questions').innerHTML=(S.tgQuestions||[]).map((q,i)=>`<div class="tg-q"><span class="tg-q-num">${i+1}</span><span>${q}</span></div>`).join('');
  document.getElementById('tg-messages').innerHTML=(S.tgMessages||[]).map(m=>`<div class="tg-tip">${m}</div>`).join('');
  document.getElementById('tg-tips').innerHTML=(S.tgTips||[]).map(t=>`<div class="tg-tip">${t}</div>`).join('');
}