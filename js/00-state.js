'use strict';

// ── STATE ─────────────────────────────────────────────────────────
let lang='de', diffLevel='mittel', medicationMode=false;
let focus=100, ticks=0, phase='welcome', isPaused=false;
let thoughtCount=0, notifCount=0, tasksCompleted=0;
let thoughtIdx=0, notifIdx=0;
let simTimer=null, allTO=[];
let currentTheme='default';
let hyperfocusActive=false, hyperfocusTaskIdx=-1;
let dayMode='normal';
let simStartTime=0, simPausedMs=0, simPausedAt=0;
const thoughtZones=new Set();
let teacherViewOpen=false;
const BASELINE_SECS=90, BASELINE_MS=90000;
let baselineEnabled=true;
let copingUsed=false, copingRecoveryIv=null;
let moodChoice=null;

const TOTAL_SECS=720; // 12 min base
let simDuration=720; // active duration, may be 480/720/960
let effectiveBaselineSecs=90, effectiveBaselineMs=90000; // scaled at sim start

const DIFF_CFG={
  leicht:  {drainMul:.45, thoughtGap:[14000,26000], notifGap:[20000,38000], phaseAt:[210000,450000,640000], fidgetAt:[240000,480000], lehrerAt:[200000,420000,620000]},
  mittel:  {drainMul:1.0, thoughtGap:[7000,13000],  notifGap:[11000,21000], phaseAt:[110000,290000,530000], fidgetAt:[180000,350000], lehrerAt:[130000,290000,470000]},
  intensiv:{drainMul:1.6, thoughtGap:[4000,8000],   notifGap:[6000,13000],  phaseAt:[55000,165000,350000],  fidgetAt:[90000,200000],  lehrerAt:[80000,200000,360000]},
};
