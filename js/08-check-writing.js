'use strict';
function checkWriting(ta){
  const sub=document.getElementById('task-sub');
  if(sub)sub.disabled=ta.value.trim().length<(TM.queue[TM.idx%TM.queue.length]?.minChars||12);
}