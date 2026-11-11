(()=>{
const P=[['index.html','Welcome'],['story.html','Our Story'],['moments.html','Moments'],['letter.html','Letter']];
const cur=location.pathname.split('/').pop()||'index.html';
document.body.insertAdjacentHTML('afterbegin','<div class="curtain"></div><nav class="nav"><a href="index.html" class="mark">A ♥</a><div>'+P.map(p=>`<a href="${p[0]}"${p[0]==cur?' class="on"':''}>${p[1]}</a>`).join('')+'</div></nav>');
const c=document.querySelector('.curtain');
const r=(a,b)=>a+Math.random()*(b-a);
function heart(x,y,n){for(let i=0;i<n;i++){const s=document.createElement('span');s.className='fh';s.textContent='♥';
s.style.cssText=`left:${x}px;top:${y}px;font-size:${r(10,24)}px;--x:${r(-70,70)}px;animation-delay:${i*40}ms`;
document.body.appendChild(s);setTimeout(()=>s.remove(),1700)}}
document.addEventListener('click',e=>{
const a=e.target.closest('a[href]');
if(a&&!a.target&&/^[\w-]+\.html$/.test(a.getAttribute('href'))&&!e.metaKey&&!e.ctrlKey){e.preventDefault();c.classList.add('out');setTimeout(()=>location.href=a.href,650)}
heart(e.clientX,e.clientY,e.target.closest('[data-burst]')?10:3)});
addEventListener('pageshow',e=>{if(e.persisted){c.style.animation='none';c.style.transform='translateY(-101%)'}});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
if(document.body.dataset.hearts)setInterval(()=>{const s=document.createElement('span');s.className='dr';s.textContent='♥';
s.style.cssText=`left:${r(2,96)}vw;font-size:${r(12,26)}px;--x:${r(-40,40)}px`;document.body.appendChild(s);setTimeout(()=>s.remove(),10000)},2200);
// Gallery lightbox
const g=[...document.querySelectorAll('.gal figure')];
if(g.length){const lb=document.querySelector('.lb'),im=lb.querySelector('img'),cp=lb.querySelector('p');let i=0;
const show=n=>{i=(n+g.length)%g.length;im.src=g[i].querySelector('img').src;im.alt=g[i].querySelector('img').alt;cp.textContent=g[i].querySelector('figcaption').textContent;lb.classList.add('open')};
const close=()=>lb.classList.remove('open');
g.forEach((f,n)=>{f.tabIndex=0;f.addEventListener('click',()=>show(n));f.addEventListener('keydown',e=>e.key=='Enter'&&show(n))});
lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=e=>{e.stopPropagation();show(i-1)};lb.querySelector('.nx').onclick=e=>{e.stopPropagation();show(i+1)};
lb.onclick=e=>{if(e.target==lb)close()};
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key=='Escape')close();if(e.key=='ArrowLeft')show(i-1);if(e.key=='ArrowRight')show(i+1)})}
const nb=document.getElementById('noteBtn');if(nb)nb.onclick=()=>document.getElementById('note').classList.toggle('open');
// Letter
const L=document.querySelector('.paper');
if(L){L.querySelectorAll('.say').forEach(p=>{p.innerHTML=p.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ')});
document.getElementById('seal').onclick=function(){this.classList.add('gone');L.classList.add('open');
const ws=[...L.querySelectorAll('.w')];ws.forEach((w,i)=>setTimeout(()=>w.classList.add('on'),700+i*55));
setTimeout(()=>L.querySelector('.sign').classList.add('on'),1100+ws.length*55)};
const sb=document.getElementById('surprise');
sb.onclick=()=>{document.getElementById('sur').classList.add('open');for(let i=0;i<30;i++)setTimeout(()=>heart(r(0,innerWidth),r(innerHeight*.4,innerHeight),1),i*70)}}
})();
