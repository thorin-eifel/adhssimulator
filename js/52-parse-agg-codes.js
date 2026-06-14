'use strict';
function parseAggCodes(){
  const S=T[lang];
  const raw=document.getElementById('agg-codes').value;
  const results=raw.split('\n').map(l=>l.trim()).filter(Boolean).map(decodeResult).filter(Boolean);
  const container=document.getElementById('agg-results');
  if(!results.length){
    container.innerHTML=`<p class="agg-empty">${S.aggEmpty||'Noch keine Ergebnisse.'}</p>`;
    return;
  }
  const n=results.length;
  const avgFocus=Math.round(results.reduce((a,r)=>a+r.focus,0)/n);
  const avgTasks=(results.reduce((a,r)=>a+r.tasks,0)/n).toFixed(1);
  const bins=[0,0,0,0];
  results.forEach(r=>{if(r.focus<40)bins[0]++;else if(r.focus<60)bins[1]++;else if(r.focus<80)bins[2]++;else bins[3]++;});
  const binLabels=['<40%','40–59%','60–79%','80%+'];
  const maxBin=Math.max(...bins,1);
  const distHtml=bins.map((c,i)=>`<div class="agg-bar-row">
    <div class="agg-bar-lbl">${binLabels[i]}</div>
    <div class="agg-bar-track"><div class="agg-bar-fill" style="width:${Math.round(c/maxBin*100)}%"></div></div>
    <div class="agg-bar-count">${c}</div>
  </div>`).join('');
  container.innerHTML=`
    <div class="agg-stats">
      <div class="agg-stat"><big>${n}</big><small>${S.aggStudents||'Schüler·innen'}</small></div>
      <div class="agg-stat"><big>${avgFocus}%</big><small>${S.aggAvgFocus||'Ø Fokus'}</small></div>
      <div class="agg-stat"><big>${avgTasks}</big><small>${S.aggAvgTasks||'Ø Aufgaben'}</small></div>
    </div>
    <div class="agg-dist">
      <div class="agg-dist-title">${S.aggDistTitle||'Verteilung'}</div>
      ${distHtml}
    </div>`;
}