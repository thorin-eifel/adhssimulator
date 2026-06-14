'use strict';
// ── SOUND ENGINE ──────────────────────────────────────────────────
const _BG_MP3={klasse:'./bg-classroom.mp3',schulhof:'./bg-schoolyard.mp3',regen:'./bg-rain.mp3',bibliothek:'./bg-library.mp3'};
const _CHAOS_MP3='./bg-classroom-chaos.mp3';

const SFX={
  ctx:null, master:null, muted:false, scType:'klasse', _ids:[], _loop:null,
  _bgAudio:null, _chaosAudio:null, _chaosActive:false,

  init(t){this.scType=t},

  start(){
    if(this.scType!=='lautlos'){
      try{
        this.ctx=new(window.AudioContext||window.webkitAudioContext)();
        this.master=this.ctx.createGain();this.master.gain.value=.7;this.master.connect(this.ctx.destination);
      }catch(e){console.warn('WebAudio:',e)}
    }
    if(this.scType==='lautlos')return;

    const src=_BG_MP3[this.scType];
    if(src){
      this._bgAudio=new Audio(src);
      this._bgAudio.loop=true;
      this._bgAudio.volume=this.muted?0:0.4;
      this._bgAudio.play().catch(e=>console.warn('BG audio:',e));
    } else {
      this._scheduleAmbient();
    }
    this._chaosAudio=new Audio(_CHAOS_MP3);
    this._chaosAudio.loop=true;
    this._chaosAudio.volume=0;
    this._chaosAudio.play().catch(()=>{});
  },

  stop(){
    this._ids.forEach(clearTimeout);this._ids=[];
    if(this._loop){clearInterval(this._loop);this._loop=null}
    if(this.ctx){this.ctx.close().catch(()=>{});this.ctx=null}
    if(this._bgAudio){this._bgAudio.pause();this._bgAudio.currentTime=0;this._bgAudio=null;}
    if(this._chaosAudio){this._chaosAudio.pause();this._chaosAudio.currentTime=0;this._chaosAudio=null;}
    this._chaosActive=false;
  },

  toggle(){
    this.muted=!this.muted;
    if(this.master)this.master.gain.setTargetAtTime(this.muted?0:.7,this.ctx.currentTime,.3);
    const bgVol=this._chaosActive?0.15:0.4;
    const chVol=this._chaosActive?0.45:0;
    if(this._bgAudio)this._bgAudio.volume=this.muted?0:bgVol;
    if(this._chaosAudio)this._chaosAudio.volume=this.muted?0:chVol;
    return this.muted;
  },

  startChaos(){
    if(this._chaosActive||this.scType==='lautlos')return;
    this._chaosActive=true;
    if(this.muted)return;
    this._fadeTo(this._bgAudio,0.15,1200);
    this._fadeTo(this._chaosAudio,0.45,1200);
  },

  stopChaos(){
    if(!this._chaosActive)return;
    this._chaosActive=false;
    if(this.muted)return;
    this._fadeTo(this._chaosAudio,0,800);
    this._fadeTo(this._bgAudio,0.4,800);
  },

  _fadeTo(audio,targetVol,ms){
    if(!audio)return;
    const steps=20,interval=ms/steps;
    const startVol=audio.volume,delta=(targetVol-startVol)/steps;
    let step=0;
    const iv=setInterval(()=>{
      step++;audio.volume=Math.max(0,Math.min(1,startVol+delta*step));
      if(step>=steps){clearInterval(iv);audio.volume=targetVol;}
    },interval);
  },

  _g(v){const g=this.ctx.createGain();g.gain.value=v;g.connect(this.master);return g},
  _later(ms,fn){const id=setTimeout(()=>fn(),ms);this._ids.push(id)},
  _scheduleAmbient(){
    const ping=()=>{if(!this.muted&&this.ctx){this._ambientPing();}this._later(3000+Math.random()*8000,ping);};
    this._later(2000,ping);
  },
  _ambientPing(){
    if(!this.ctx)return;
    const now=this.ctx.currentTime;
    const freq=[200,280,140][Math.floor(Math.random()*3)];
    const osc=this.ctx.createOscillator(),g=this._g(0);
    osc.type='sine';osc.frequency.value=freq;
    g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(.04,now+.05);g.gain.exponentialRampToValueAtTime(.001,now+.6);
    osc.connect(g);osc.start(now);osc.stop(now+.65);
  },
  sfxCorrect(){
    if(!this.ctx||this.muted)return;
    const now=this.ctx.currentTime;
    [[523,.0],[659,.1],[784,.2]].forEach(([f,d])=>{
      const osc=this.ctx.createOscillator(),g=this._g(0);
      osc.type='triangle';osc.frequency.value=f;const t=now+d;
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.14,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.35);
      osc.connect(g);osc.start(t);osc.stop(t+.38);
    });
  },
  sfxWrong(){
    if(!this.ctx||this.muted)return;
    const now=this.ctx.currentTime;
    const osc=this.ctx.createOscillator(),g=this._g(0);
    osc.type='sawtooth';osc.frequency.setValueAtTime(180,now);osc.frequency.linearRampToValueAtTime(120,now+.3);
    g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(.12,now+.01);g.gain.exponentialRampToValueAtTime(.001,now+.35);
    osc.connect(g);osc.start(now);osc.stop(now+.38);
  },
  sfxPhase(){
    if(!this.ctx||this.muted)return;
    const now=this.ctx.currentTime;
    const osc=this.ctx.createOscillator(),g=this._g(0);
    osc.type='sine';osc.frequency.setValueAtTime(80,now);osc.frequency.exponentialRampToValueAtTime(40,now+.4);
    g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(.3,now+.03);g.gain.exponentialRampToValueAtTime(.001,now+.45);
    osc.connect(g);osc.start(now);osc.stop(now+.48);
  },
  sfxFidget(){
    if(!this.ctx||this.muted)return;
    const now=this.ctx.currentTime;
    const buf=this.ctx.createBuffer(1,this.ctx.sampleRate*.03,this.ctx.sampleRate);
    const data=buf.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*(1-i/data.length);
    const src=this.ctx.createBufferSource(),g=this._g(.25);src.buffer=buf;src.connect(g);src.start(now);src.stop(now+.03);
  },
  speak(arr){
    if(this.muted||!window.speechSynthesis||!arr.length)return;
    const u=new SpeechSynthesisUtterance(arr[Math.floor(Math.random()*arr.length)]);
    u.rate=.85;u.pitch=.95;u.volume=.35;u.lang=T[lang].langCode;
    speechSynthesis.speak(u);
  }
};