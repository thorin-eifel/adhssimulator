'use strict';
function scheduleLehrer(times){
  times.forEach(t=>later(t,showLehrer));
}