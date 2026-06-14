'use strict';
function decodeResult(code){
  try{
    const str=atob(code.trim().replace(/-/g,'+').replace(/_/g,'/')+'==');
    const p=str.split(',').map(Number);
    if(p.length<5||isNaN(p[0]))return null;
    return{focus:p[0],tasks:p[1],thoughts:p[2],notifs:p[3],diff:['leicht','mittel','intensiv'][p[4]]||'mittel'};
  }catch(e){return null;}
}