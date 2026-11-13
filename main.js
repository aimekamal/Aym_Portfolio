/* main.js — helpers, link setup from config.js, and the English/Arabic switch (RTL). */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let lang='en',sel=null;
const root=document.documentElement;
if(!root.dataset.theme&&matchMedia('(prefers-color-scheme:light)').matches)root.dataset.theme='light';
/* config links */
$('#mail').href='mailto:'+CFG.email;$('#mail').textContent=CFG.email;$('#li').href=CFG.linkedin;$('#gh').href=CFG.github;$('#cv').href=$('#cv2').href=CFG.cv;
[$('#li'),$('#gh')].forEach(a=>{if(a.getAttribute('href')!='#'){a.target='_blank';a.rel='noopener'}});
/* language */
function setLang(l){lang=l;root.lang=l;root.dir=l=='ar'?'rtl':'ltr';
$$('[data-i18n]').forEach(e=>e.innerHTML=T[l][e.dataset.i18n]);
$('#lang').textContent=l=='ar'?'EN':'عربي';
try{localStorage.setItem('lang',l)}catch(e){}
showNode(sel);if($('#ov').open)fillOv(ovI)}
$('#lang').onclick=()=>setLang(lang=='en'?'ar':'en');
