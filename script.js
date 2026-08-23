const root=document.documentElement;
const themeBtn=document.getElementById("themeBtn");
const menuBtn=document.getElementById("menuBtn");
const mobileNav=document.getElementById("mobileNav");
const progress=document.getElementById("progress");

function applyTheme(theme){
  root.classList.toggle("light",theme==="light");
  if(themeBtn){
    themeBtn.textContent=theme==="light"?"☀":"☾";
    themeBtn.setAttribute("aria-label",theme==="light"?"Switch to dark theme":"Switch to light theme");
  }
}
applyTheme(localStorage.getItem("portfolio-theme")==="light"?"light":"dark");

themeBtn?.addEventListener("click",()=>{
  const next=root.classList.contains("light")?"dark":"light";
  localStorage.setItem("portfolio-theme",next);
  applyTheme(next);
});

menuBtn?.addEventListener("click",()=>{
  const open=mobileNav?.classList.toggle("open")||false;
  menuBtn.setAttribute("aria-expanded",String(open));
});
mobileNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mobileNav.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded","false");
}));

window.addEventListener("scroll",()=>{
  if(!progress)return;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?window.scrollY/max*100:0)+"%";
},{passive:true});

if("IntersectionObserver" in window){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
}else{
  document.querySelectorAll(".reveal").forEach(el=>el.classList.add("show"));
}

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter=btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card=>{
      const categories=(card.dataset.category||"").split(/\s+/);
      card.classList.toggle("hidden",filter!=="all"&&!categories.includes(filter));
    });
  });
});

const navLinks=[...document.querySelectorAll(".desktop-nav a")];
const sections=[...document.querySelectorAll("main section[id]")];
if("IntersectionObserver" in window){
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
      }
    });
  },{rootMargin:"-35% 0px -55% 0px"});
  sections.forEach(s=>navObserver.observe(s));
}
