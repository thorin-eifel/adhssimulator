'use strict';
function endHyperfocus(){
  if(!hyperfocusActive)return;
  hyperfocusActive=false;
  document.getElementById('hyperfocus-badge').classList.remove('show');
  document.body.classList.remove('hyperfocus');
}