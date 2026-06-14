'use strict';
function revealNextBlock(currentN){
  const next=document.querySelector(`.reflect-q-block[data-q-idx="${currentN+1}"]`);
  if(next&&!next.classList.contains('revealed')){
    next.classList.add('revealed');
    setTimeout(()=>next.scrollIntoView({behavior:'smooth',block:'nearest'}),50);
  }
}