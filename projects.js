/* projects.js — project click-to-preview overlay and scroll-reveal animation. */
/* project overlay */
const ov=$('#ov');let ovI=1;
function fillOv(i){$('#ot').textContent=T[lang]['p'+i+'t'];$('#oc').textContent=T[lang]['p'+i+'c'];
const s=$('.p[data-i="'+i+'"] svg').cloneNode(true);$('#os').replaceChildren(s);$('#os').className='vz';
$('#os').firstChild.classList.add('viz');ov.dataset.i=i}
function openOv(i){ovI=i;fillOv(i);ov.showModal()}
$$('.p').forEach(p=>{p.onclick=()=>openOv(+p.dataset.i);p.onkeydown=e=>{if(e.key=='Enter'||e.key==' '){e.preventDefault();openOv(+p.dataset.i)}}});
$('#x').onclick=()=>ov.close();
ov.addEventListener('click',e=>{if(e.target===ov)ov.close()});
/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(e=>io.observe(e));
