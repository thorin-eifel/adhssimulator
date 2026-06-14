'use strict';
function skipMood(){
  moodChoice=null;
  document.getElementById('mood-overlay').classList.remove('show');
  buildDebrief();
  show('debrief');
}