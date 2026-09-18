const DATA_URL="videos.json";
const meta={
youtube:{title:"YouTube / Documentary / Infographics",kicker:"01 / STORY & INFORMATION",desc:"Story-driven edits, documentaries, explainers and information-rich visuals."},
motion:{title:"Motion Graphics",kicker:"02 / MOTION DESIGN",desc:"Kinetic typography, logo animation, 2D/3D motion and visual effects."},
saas:{title:"SaaS Animation",kicker:"03 / PRODUCT STORYTELLING",desc:"Product demos, UI animation, explainers, feature launches and onboarding."},
ads:{title:"Advertisement",kicker:"04 / COMMERCIAL",desc:"Cinematic commercials, social ads, product campaigns and conversion-focused edits."}
};
const params=new URLSearchParams(location.search), cat=params.get("cat")||"youtube";
const m=meta[cat]||meta.youtube;
document.title=m.title+" — Dipjoy Howlader";
document.getElementById("kicker").textContent=m.kicker;
document.getElementById("title").textContent=m.title;
document.getElementById("desc").textContent=m.desc;
fetch(DATA_URL).then(r=>r.json()).then(all=>{
 const items=all.filter(v=>v.category===cat);
 const box=document.getElementById("videos");
 if(!items.length){box.innerHTML=`<div class="empty"><span>CURATING THIS COLLECTION</span><h2>Your next great project will appear here.</h2><p>Add videos from the Admin page and paste their entries into <code>videos.json</code>.</p></div>`;return;}
 box.innerHTML=items.map(v=>`<article class="video-card"><div class="video-wrap"><video controls preload="metadata" playsinline poster="${v.thumbnail||""}" src="${v.url}"></video></div><div class="video-info"><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.description||"")}</p></div></article>`).join("");
}).catch(()=>document.getElementById("videos").innerHTML='<div class="empty"><h2>Could not load the portfolio data.</h2><p>Make sure videos.json exists and is valid JSON.</p></div>');
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}