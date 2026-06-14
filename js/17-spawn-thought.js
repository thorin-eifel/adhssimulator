'use strict';
function spawnThought(){
  const thoughts=T[lang].thoughts;
  if(!thoughts||!thoughts.length)return;
  const text=thoughts[thoughtIdx%thoughts.length];
  thoughtIdx++;thoughtCount++;

  const r=Math.random();
  const size=r<0.15?'t-sm':r<0.45?'t-md':r<0.80?'t-lg':'t-xl';

  const el=document.createElement('div');
  el.className=`thought ${size}`;

  const wide=window.innerWidth>=1200;
  const leftRange=wide?[3,72]:[4,56];
  const topRange=wide?[11,60]:[14,52];
  const left=leftRange[0]+Math.random()*(leftRange[1]-leftRange[0]);
  const top=topRange[0]+Math.random()*(topRange[1]-topRange[0]);
  el.style.cssText=`left:${left}%;top:${top}%`;
  el.innerHTML=`${text}<span class="x" onclick="this.parentNode.remove()">×</span>`;
  document.getElementById('thoughts').appendChild(el);

  const dur={'t-sm':5000,'t-md':7000,'t-lg':9500,'t-xl':12000}[size]||7000;
  later(dur,()=>{if(el.parentNode)el.remove();});
}