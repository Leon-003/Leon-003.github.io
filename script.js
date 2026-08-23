const root=document.documentElement;\nconst savedTheme=localStorage.getItem('portfolio-theme');\nif(savedTheme==='light') root.classList.add('light');
const themeBtn=document.getElementById("themeBtn");
const menuBtn=document.getElementById("menuBtn");
const mobileNav=document.getElementById("mobileNav");
const progress=document.getElementById("progress");

themeBtn.textContent=root.classList.contains("light")?"☀":"☾";\nthemeBtn.addEventListener("click",()=>{
  root.classList.toggle("light");\n  localStorage.setItem("portfolio-theme",root.classList.contains("light")?"light":"dark");
  themeBtn.textContent=root.classList.contains("light")?"☀":"☾";
  themeBtn.setAttribute("aria-label",root.classList.contains("light")?"Switch to dark theme":"Switch to light theme");
});

menuBtn.addEventListener("click",()=>{
  const open=mobileNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",String(open));
});
mobileNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mobileNav.classList.remove("open"); menuBtn.setAttribute("aria-expanded","false");
}));

window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(window.scrollY/max)*100:0)+"%";
},{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");observer.unobserve(e.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const filter=btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card=>{
      card.classList.toggle("hidden",filter!=="all" && !card.dataset.category.split(" ").includes(filter));
    });
  });
});

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".desktop-nav a")];
const navObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+entry.target.id));
    }
  });
},{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>navObserver.observe(s));
