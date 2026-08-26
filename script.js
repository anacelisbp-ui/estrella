const qs=(s,c=document)=>c.querySelector(s),qsa=(s,c=document)=>[...c.querySelectorAll(s)];
qs('#year').textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
}),{threshold:.09});
qsa('.reveal').forEach(el=>observer.observe(el));

qsa('.color-buttons button').forEach(button=>button.addEventListener('click',()=>{
  qsa('.color-buttons button').forEach(b=>b.classList.remove('active'));
  button.classList.add('active');
  document.querySelector('.photo-ocean').style.boxShadow=`0 25px 80px ${button.dataset.color}99`;
}));

const lightbox=qs('#lightbox'),lightboxImage=qs('img',lightbox),caption=qs('p',lightbox);
qsa('[data-image]').forEach(button=>button.addEventListener('click',()=>{
  const renderedImage=button.querySelector('img');
  lightboxImage.src=renderedImage?.currentSrc||renderedImage?.src||button.dataset.image;
  lightboxImage.alt=button.getAttribute('aria-label')||button.textContent.trim();
  caption.textContent=button.textContent.trim();
  lightbox.showModal();
}));
qs('.close',lightbox).addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox)lightbox.close()});

qsa('[data-checkout]').forEach(link=>link.addEventListener('click',event=>{
  if(link.getAttribute('href')==='#'){event.preventDefault();alert('El enlace de checkout se añadirá aquí cuando esté disponible.');}
}));

const dailyOfferCountdown=qs('#offer-countdown');
if(dailyOfferCountdown){
  const renderOfferCountdown=()=>{
    const now=new Date();
    const nextMidnight=new Date(now);
    nextMidnight.setHours(24,0,0,0);
    const remaining=Math.max(0,nextMidnight-now);
    const hours=Math.floor(remaining/3600000);
    const minutes=Math.floor((remaining%3600000)/60000);
    const seconds=Math.floor((remaining%60000)/1000);
    dailyOfferCountdown.textContent=[hours,minutes,seconds].map(value=>String(value).padStart(2,'0')).join(':');
  };
  renderOfferCountdown();
  window.setInterval(renderOfferCountdown,1000);
}
