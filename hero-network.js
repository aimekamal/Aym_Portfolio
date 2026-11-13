/* hero-network.js — the animated node network in the hero (canvas). Tweak node count, link distance, colors here. */
/* hero network */
(()=>{const c=$('#net'),x=c.getContext('2d'),RM=matchMedia('(prefers-reduced-motion:reduce)').matches,hero=$('#top'),xy=$('#xy');
let w,h,N=[],m={x:-999,y:-999},run=true,A,B;
function size(){const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2),s=getComputedStyle(root);
A=s.getPropertyValue('--lilac-deep').trim();B=s.getPropertyValue('--lilac-soft').trim();w=r.width;h=r.height;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);
N=Array.from({length:Math.round(Math.min(80,w*h/15000))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:1+Math.random()*1.8}));draw(0)}
function draw(t){x.clearRect(0,0,w,h);const L=130;
for(const p of N){if(!RM){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy);if(d<190&&d>40){p.x+=dx*.006;p.y+=dy*.006}}}
x.lineWidth=1;
for(let i=0;i<N.length;i++){const p=N[i];
for(let j=i+1;j<N.length;j++){const q=N[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<L){x.globalAlpha=(1-d/L)*.55;x.strokeStyle=A;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();
if((i+j)%9==0&&!RM){const k=(t*.0003+i*.13)%1;x.globalAlpha=.9;x.fillStyle=B;x.beginPath();x.arc(p.x+(q.x-p.x)*k,p.y+(q.y-p.y)*k,2,0,7);x.fill()}}}
const d=Math.hypot(p.x-m.x,p.y-m.y);if(d<190){x.globalAlpha=(1-d/190)*.9;x.strokeStyle=B;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(m.x,m.y);x.stroke()}
x.globalAlpha=.9;x.fillStyle=d<190?B:A;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}
x.globalAlpha=1}
function loop(t){if(run&&!RM)draw(t);requestAnimationFrame(loop)}
hero.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top;xy.textContent='x:'+String(Math.round(m.x)).padStart(3,'0')+' y:'+String(Math.round(m.y)).padStart(3,'0');if(RM)draw(0)});
hero.addEventListener('pointerleave',()=>{m.x=m.y=-999});
new IntersectionObserver(e=>run=e[0].isIntersecting).observe(hero);
addEventListener('resize',size);size();requestAnimationFrame(loop)})();
