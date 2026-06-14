'use strict';
(function(){
  if(new URLSearchParams(location.search).get('ref')==='praesentation'){
    const btn=document.getElementById('ui-back-praes-btn');
    if(btn) btn.style.display='';
  }
})();
