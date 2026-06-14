'use strict';
function renderMerkenRecall(task){
  const S=T[lang],L=task[lang]||task.de||{};
  const taskNum=`<span style="font-size:.62rem;font-weight:800;text-transform:uppercase;letter-spacing:1.2px;color:var(--ctw-500)">Aufgabe ${(TM.idx%TM.queue.length)+1} / ${TM.queue.length}</span>`;
  document.getElementById('task-display').innerHTML=`<div class="card">
    <div class="task-meta">${taskNum}<span class="task-badge badge-merken">${S.merkenBadge}</span><span class="task-cd" id="task-cd"></span></div>
    <div class="task-q">${L.q||S.memRecall}</div>
    <div class="answer-opts">
      ${(L.opts||[]).map((o,i)=>`<button class="answer-btn" onclick="checkMC(this,${i},${task.ans})">${o}</button>`).join('')}
    </div>
  </div>`;
  const sub=document.getElementById('task-sub');
  if(sub)sub.style.display='none';
}