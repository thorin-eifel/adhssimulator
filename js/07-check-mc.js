'use strict';
function checkMC(btn,i,correct){
  const btns=document.querySelectorAll('.answer-btn');
  btns.forEach(b=>b.disabled=true);
  if(i===correct){
    btn.classList.add('correct');
    SFX.sfxCorrect();
    tasksCompleted++;
    showAnswerFeedback(btn,true);
    setTimeout(()=>TM.advance(),950);
  } else {
    btn.classList.add('wrong');
    btns[correct].classList.add('correct');
    SFX.sfxWrong();
    drainFocus(4);
    showAnswerFeedback(btn,false);
    setTimeout(()=>TM.advance(),1500);
  }
}

function showAnswerFeedback(btn,isCorrect){
  const rect=btn.getBoundingClientRect();
  const el=document.createElement('div');
  el.className='answer-feedback '+(isCorrect?'af-correct':'af-wrong');
  el.textContent=isCorrect?'✓':'✗';
  el.style.cssText=`left:${Math.round(rect.left+rect.width/2)}px;top:${Math.round(rect.top)}px`;
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),700);
}