'use strict';
function setDay(v){
  dayMode=v;
  ['gut','normal','schlecht'].forEach(k=>document.getElementById('day-'+k).classList.toggle('active',k===v));
}