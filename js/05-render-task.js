'use strict';
// ── TASK RENDERERS ────────────────────────────────────────────────
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

function renderTask(task){
  const S=T[lang],L=task[lang]||task.de||{};
  const d=document.getElementById('task-display');
  const sub=document.getElementById('task-sub');
  const taskNum=`<span style="font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:var(--ctw-500)">Aufgabe ${(TM.idx%TM.queue.length)+1} / ${TM.queue.length}</span>`;
  if(task.type==='mathe'){
    d.innerHTML=`<div class="card">
      <div class="task-meta">${taskNum}<span class="task-badge badge-mathe">${S.mathBadge}</span><span class="task-cd" id="task-cd"></span></div>
      <div class="task-q">${task.q}</div>
      <div class="answer-opts">
        ${task.opts.map((o,i)=>`<button class="answer-btn" onclick="checkMC(this,${i},${task.ans})">${o}</button>`).join('')}
      </div>
    </div>`;
    if(sub)sub.style.display='none';
  } else if(task.type==='lesen'){
    d.innerHTML=`<div class="card">
      <div class="task-meta">${taskNum}<span class="task-badge badge-lesen">${S.lesenBadge}</span><span class="task-cd" id="task-cd"></span></div>
      <div class="task-text">${L.text||''}</div>
      <div class="task-q">${L.q||''}</div>
      <div class="answer-opts">
        ${(L.opts||task.opts||[]).map((o,i)=>`<button class="answer-btn" onclick="checkMC(this,${i},${task.ans})">${o}</button>`).join('')}
      </div>
    </div>`;
    if(sub)sub.style.display='none';
  } else if(task.type==='schreiben'){
    d.innerHTML=`<div class="card">
      <div class="task-meta">${taskNum}<span class="task-badge badge-schreiben">${S.schreibenBadge}</span><span class="task-cd" id="task-cd"></span></div>
      <div class="task-q">${L.prompt||''}</div>
      <textarea class="task-ta" placeholder="Schreib hier..." oninput="checkWriting(this)"></textarea>
    </div>`;
    if(sub){sub.style.display='block';sub.disabled=true;sub.textContent=S.taskSubBtnWrite;}
  } else if(task.type==='merken'){
    d.innerHTML=`<div class="card">
      <div class="task-meta">${taskNum}<span class="task-badge badge-merken">${S.merkenBadge}</span><span class="task-cd" id="task-cd"></span></div>
      <div class="task-q">${S.memShow}</div>
      <div class="mem-words">${(L.words||[]).map(w=>`<span class="mem-word">${w}</span>`).join('')}</div>
      <div class="mem-warn">${S.memWarn}</div>
    </div>`;
    if(sub){sub.style.display='block';sub.disabled=true;sub.textContent='⏳';}
  }
  updateCd(0);
}