'use strict';
function lehrerAns(knew){
  document.getElementById('lehrer').classList.remove('show');
  if(!knew)drainFocus(5);
}