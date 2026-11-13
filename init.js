/* init.js — starts everything. Keep this file last. */
/* init */
build();let sv='en';try{sv=localStorage.getItem('lang')||'en'}catch(e){}
setLang(sv=='ar'?'ar':'en');
