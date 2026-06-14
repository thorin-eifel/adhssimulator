'use strict';
// ── RESULT CODE (aggregate) ───────────────────────────────────────
function encodeResult(){
  const di={leicht:0,mittel:1,intensiv:2}[diffLevel]||1;
  const raw=`${Math.round(focus)},${tasksCompleted},${thoughtCount},${notifCount},${di}`;
  return btoa(raw).replace(/=/g,'');
}