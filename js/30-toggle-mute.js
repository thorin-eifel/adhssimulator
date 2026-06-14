'use strict';
function toggleMute(){const m=SFX.toggle();document.getElementById('mute-btn').textContent=m?'🔇':'🔊';}
function fidgetClick(){SFX.sfxFidget();}