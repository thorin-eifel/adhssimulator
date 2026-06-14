'use strict';
// ── AGGREGATE MODE ────────────────────────────────────────────────
function openAggregate(){
  const S=T[lang];
  document.getElementById('ui-agg-title').textContent=S.aggTitle||'Klassen-Übersicht';
  document.getElementById('ui-agg-sub').textContent=S.aggSub||'';
  document.getElementById('ui-agg-input-lbl').textContent=S.aggSub||'';
  document.getElementById('agg-codes').placeholder=S.aggPlaceholder||'';
  document.getElementById('agg-back-btn').textContent=S.aggBack||'← Zurück';
  document.getElementById('agg-link-btn').textContent=S.aggLinkBtn||'🔗 Link';
  document.getElementById('ui-agg-empty').textContent=S.aggEmpty||'';
  parseAggCodes();
  show('aggregate');
}