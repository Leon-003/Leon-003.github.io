const root=document.documentElement;
const themeBtn=document.getElementById("themeBtn");
const menuBtn=document.getElementById("menuBtn");
const mobileNav=document.getElementById("mobileNav");
const progress=document.getElementById("progress");
function applyTheme(theme){
 root.classList.toggle("light",theme==="light");
 if(themeBtn){themeBtn.textContent=theme==="light"?"☀":"☾";themeBtn.setAttribute("aria-label",theme==="light"?"Switch to dark theme":"Switch to light theme");}
}
applyTheme(localStorage.getItem("portfolio-theme")==="light"?"light":"dark");
themeBtn?.addEventListener("click",()=>{const next=root.classList.contains("light")?"dark":"light";localStorage.setItem("portfolio-theme",next);applyTheme(next);});
menuBtn?.addEventListener("click",()=>{const open=mobileNav?.classList.toggle("open")||false;menuBtn.setAttribute("aria-expanded",String(open));});
mobileNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mobileNav.classList.remove("open");menuBtn?.setAttribute("aria-expanded","false");}));
window.addEventListener("scroll",()=>{if(!progress)return;const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?window.scrollY/max*100:0)+"%";},{passive:true});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;document.querySelectorAll(".project-card").forEach(card=>card.classList.toggle("hidden",f!=="all"&&!((card.dataset.category||"").split(/\s+/).includes(f))));}));

document.addEventListener("DOMContentLoaded",()=>{
  const img=document.querySelector(".photo-frame img");
  if(img){
    img.addEventListener("error",()=>{
      const frame=img.parentElement;
      frame.innerHTML='<div style="height:100%;display:flex;align-items:center;justify-content:center;font:700 20px Space Grotesk;color:#0b1728;background:#fff">Abul Khayer Leon</div>';
    });
  }
});
