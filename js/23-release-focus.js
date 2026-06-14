'use strict';
function releaseFocus(containerEl){
  if(containerEl._trap){containerEl.removeEventListener('keydown',containerEl._trap);delete containerEl._trap;}
  if(containerEl._trapReturn){containerEl._trapReturn.focus();delete containerEl._trapReturn;}
}