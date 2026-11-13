/* skills.js — the interactive skills constellation (SVG built from G and P in config.js). */
/* constellation */
const names=G.flatMap(g=>g.n),grp=n=>G.find(g=>g.n.includes(n)).k,shared=(a,b)=>(P[a]||[]).some(i=>(P[b]||[]).includes(i));
let mob=null;
function build(){const m=innerWidth<700;if(m===mob)return;mob=m;const svg=$('#map');svg.setAttribute('viewBox',m?'0 0 400 880':'0 0 900 600');
const C=m?[[200,130],[200,340],[200,550],[200,760]]:[[215,165],[685,165],[215,435],[685,435]],r=m?80:100,pos={};let ed='',nd='';
G.forEach((g,gi)=>{const[cx,cy]=C[gi];
nd+=`<g class="n hub" data-n="hub-${g.k}"><circle cx="${cx}" cy="${cy}" r="5"/><text class="gt" data-g="${g.k}" x="${cx}" y="${cy-r-36}" text-anchor="middle"></text></g>`;
g.n.forEach((n,i)=>{const a=i*2*Math.PI/g.n.length-Math.PI/2+.2,px=cx+r*Math.cos(a),py=cy+r*Math.sin(a);pos[n]={x:px,y:py,a,g:g.k};
ed+=`<line class="e" data-a="hub-${g.k}" data-b="${n}" x1="${cx}" y1="${cy}" x2="${px}" y2="${py}"/>`})});
for(let i=0;i<names.length;i++)for(let j=i+1;j<names.length;j++)if(shared(names[i],names[j]))ed+=`<line class="e x" data-a="${names[i]}" data-b="${names[j]}" x1="${pos[names[i]].x}" y1="${pos[names[i]].y}" x2="${pos[names[j]].x}" y2="${pos[names[j]].y}"/>`;
names.forEach(n=>{const p=pos[n],co=Math.cos(p.a),si=Math.sin(p.a),an=co>.3?'start':co<-.3?'end':'middle';
nd+=`<g class="n" data-n="${n}" tabindex="0" role="button" aria-label="${n}"><circle cx="${p.x}" cy="${p.y}" r="${m?9:7}"/><circle cx="${p.x}" cy="${p.y}" r="22" style="fill:transparent;stroke:none"/><text x="${p.x+co*16}" y="${p.y+si*16+4}" text-anchor="${an}">${n}</text></g>`});
svg.innerHTML=ed+nd;labels();hi(sel)}
function labels(){$$('.gt').forEach(t=>t.textContent=T[lang][t.dataset.g])}
function hi(n){const s=$('#map'),set=new Set();if(n){set.add(n);set.add('hub-'+grp(n));names.forEach(o=>{if(o!=n&&shared(n,o))set.add(o)})}
s.classList.toggle('dim',!!n);$$('#map .n').forEach(e=>{e.classList.toggle('on',set.has(e.dataset.n));e.classList.toggle('cur',e.dataset.n==sel)});
$$('#map .e').forEach(e=>e.classList.toggle('on',!!n&&(e.dataset.a==n||e.dataset.b==n)))}
function showNode(n){const t=T[lang],pn=$('#pn');labels();
if(!n){pn.innerHTML=`<p class="mono">${t.pick}</p>`;return}
const ps=P[n]||[];pn.innerHTML=`<h3>${n}</h3><p class="mono">${t.part.replace('{c}',t[grp(n)])}</p><p style="margin-top:.8rem">${ps.length?t.used+':':t.none}</p>`+(ps.length?`<div class="chips">${ps.map(i=>`<button data-p="${i}">${t['p'+i+'s']}</button>`).join('')}</div>`:'')}
function pick(n){sel=sel==n?null:n;hi(sel);showNode(sel)}
const map=$('#map');
map.addEventListener('click',e=>{const n=e.target.closest('.n:not(.hub)');if(n)pick(n.dataset.n)});
map.addEventListener('keydown',e=>{if(e.key=='Enter'||e.key==' '){const n=e.target.closest('.n:not(.hub)');if(n){e.preventDefault();pick(n.dataset.n)}}});
map.addEventListener('pointerover',e=>{if(e.pointerType!='mouse')return;const n=e.target.closest('.n:not(.hub)');hi(n?n.dataset.n:sel)});
map.addEventListener('pointerleave',()=>hi(sel));
$('#pn').addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(b)openOv(+b.dataset.p)});
addEventListener('resize',build);
