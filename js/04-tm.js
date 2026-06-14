'use strict';
// ── TASK MANAGER ──────────────────────────────────────────────────
const TM={
  queue:[], idx:0, cdTimer:null, cdSecs:0, memPhase:0, taskShownAt:0, _advTimer:null, _expireTimer:null, baselineCount:0,
  build(){
    const N={480:16,720:24,960:32}[simDuration]||24;
    const pool=[...POOL];for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    this.queue=pool.slice(0,N);this.idx=0;this.baselineCount=0;
    hyperfocusTaskIdx=2+Math.floor(Math.random()*(Math.max(3,N-3)));
  },
  start(){this.build();this.show();},
  show(){
    if(phase==='debrief')return;
    const task=this.queue[this.idx%this.queue.length];
    this.memPhase=0;
    if(!hyperfocusActive&&this.idx%this.queue.length===hyperfocusTaskIdx)startHyperfocus();
    renderTask(task);
    updateDots();
    const sub=document.getElementById('task-sub');if(sub)sub.style.display='block';
    if(task.type==='merken'){
      if(sub){sub.disabled=true;sub.textContent='⏳ '+T[lang].memWarn;}
      this.startCd(task.showSecs||5,()=>{
        this.memPhase=2;
        renderMerkenRecall(task);
        if(sub){sub.disabled=false;sub.textContent=T[lang].taskSubBtn;}
        this.startCd(60,()=>this.expire());
      });
    } else if(task.type==='schreiben'){
      if(sub){sub.disabled=true;sub.textContent=T[lang].taskSubBtnWrite;}
      this.startCd(120,()=>this.advance());
    } else {
      if(sub)sub.style.display='none';
      this.startCd(task.type==='lesen'?100:80,()=>this.expire());
    }
  },
  startCd(secs,onEnd){
    clearInterval(this.cdTimer);this.cdSecs=secs;
    this.cdTimer=setInterval(()=>{
      this.cdSecs--;updateCd(this.cdSecs);
      if(this.cdSecs<=0){clearInterval(this.cdTimer);onEnd&&onEnd();}
    },1000);
    updateCd(secs);
  },
  submit(){
    if(this.memPhase===1)return;
    clearInterval(this.cdTimer);
    const task=this.queue[this.idx%this.queue.length];
    if(task.type==='schreiben'){
      const ta=document.querySelector('.task-ta');
      const L=task[lang]||task.de;
      if(!ta||ta.value.trim().length<(task.minChars||12)){
        ta&&ta.classList.add('shake');setTimeout(()=>ta&&ta.classList.remove('shake'),600);return;
      }
    }
    tasksCompleted++;
    SFX.sfxCorrect();
    this.advance();
  },
  advance(){
    clearInterval(this.cdTimer); updateCd(0);
    this._advTimer=setTimeout(()=>{
      this._advTimer=null;
      let next=this.idx+1;
      if(next>=this.queue.length){
        const bc=this.baselineCount;
        const tail=this.queue.slice(bc);
        for(let i=tail.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[tail[i],tail[j]]=[tail[j],tail[i]];}
        this.queue.splice(bc,tail.length,...tail);
        next=bc;
      }
      this.idx=next; this.show();
    }, 5000);
  },
  expire(){
    const task=this.queue[this.idx%this.queue.length];
    drainFocus(3);
    const btns=document.querySelectorAll('.answer-btn');
    if(btns.length&&task.ans!==undefined){
      btns.forEach(b=>b.disabled=true);
      if(btns[task.ans])btns[task.ans].classList.add('correct');
    }
    const card=document.querySelector('#task-display .card');
    if(card){
      const banner=document.createElement('div');
      banner.className='expiry-banner';
      banner.textContent=T[lang].expired||'Zeit abgelaufen!';
      card.appendChild(banner);
    }
    SFX.sfxWrong();
    this._expireTimer=setTimeout(()=>{this._expireTimer=null;this.advance();},1700);
  },
  stop(){clearInterval(this.cdTimer);clearTimeout(this._advTimer);clearTimeout(this._expireTimer);this._advTimer=null;this._expireTimer=null;},
};