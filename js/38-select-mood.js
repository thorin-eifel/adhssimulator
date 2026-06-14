'use strict';
function selectMood(btn){
  moodChoice=btn.dataset.v;
  document.querySelectorAll('.mood-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  setTimeout(()=>{
    document.getElementById('mood-overlay').classList.remove('show');
    buildDebrief();
    show('debrief');
  },650);
}