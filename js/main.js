document.addEventListener("DOMContentLoaded",()=>{
  const d=window.PORTFOLIO_DATA;
  const $=s=>document.querySelector(s);
  const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  $("#profileName").textContent=d.profile.name;
  $("#profileIntro").textContent=d.profile.intro;
  $("#skills").innerHTML=d.profile.skills.map(x=>'<span class="tag">'+esc(x)+'</span>').join("");
  $("#year").textContent=new Date().getFullYear();

  const all=[...d.projects,...d.entryProjects,...d.vibeProjects];
  const cats=["전체",...new Set(all.map(x=>x.category))];
  $("#filters").innerHTML=cats.map((x,i)=>'<button class="filter '+(i===0?"active":"")+'" data-filter="'+esc(x)+'">'+esc(x)+'</button>').join("");
  const renderProjects=(filter="전체")=>{
    const list=filter==="전체"?all:all.filter(x=>x.category===filter);
    $("#projectGrid").innerHTML=list.length?list.map((p,i)=>card(p,i)).join(""):'<div class="empty">프로젝트를 추가하면 이곳에 표시됩니다.</div>';
  };
  const card=(p,i)=>'<article class="project-card reveal"><div class="project-top"><span class="project-num">0'+(i+1)+'</span><span class="tag">'+esc(p.category)+'</span></div><h3>'+esc(p.title)+'</h3><p>'+esc(p.description)+'</p><div class="tags">'+(p.tags||[]).map(t=>'<span class="tag">'+esc(t)+'</span>').join("")+'</div><div class="project-links">'+(p.github?'<a class="text-link" href="'+esc(p.github)+'" target="_blank" rel="noopener">GitHub ↗</a>':"")+(p.demo?'<a class="text-link" href="'+esc(p.demo)+'" target="_blank" rel="noopener">Demo ↗</a>':"")+'</div></article>';
  renderProjects();
  $("#filters").addEventListener("click",e=>{if(!e.target.matches(".filter"))return;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));e.target.classList.add("active");renderProjects(e.target.dataset.filter)});

  const mini=(items,el)=>$(el).innerHTML=items.length?items.map(x=>'<article class="mini-card"><h3>'+esc(x.title)+'</h3><p>'+esc(x.description)+'</p></article>').join(""):'<div class="empty">프로젝트를 추가하면 여기에 표시됩니다.</div>';
  mini(d.entryProjects,"#entryGrid");mini(d.vibeProjects,"#vibeGrid");

  $("#careerTimeline").innerHTML=d.career.length?d.career.map(x=>'<div class="timeline-item"><time>'+esc(x.date)+'</time><h3>'+esc(x.title)+'</h3><p>'+esc(x.description)+'</p></div>').join(""):'<div class="empty">이력 정보를 추가하면 타임라인으로 표시됩니다.</div>';
  const credentials=(items,el)=>$(el).innerHTML=items.length?items.map(x=>'<div class="credential"><strong>'+esc(x.title)+'</strong><span>'+esc(x.date||"")+(x.description?" · "+esc(x.description):"")+'</span></div>').join(""):'<div class="empty">추가 예정</div>';
  credentials(d.certificates,"#certificates");credentials(d.awards,"#awards");

  $("#repoGrid").innerHTML=d.repositories.map(r=>'<article class="repo-card"><div><h3>'+esc(r.name)+'</h3><p>'+esc(r.description)+'</p></div><a class="text-link" href="'+esc(r.url)+'" target="_blank" rel="noopener">Repository ↗</a></article>').join("");
  $("#stats").innerHTML='<div class="stat"><strong>'+all.length+'</strong><span>등록 프로젝트</span></div><div class="stat"><strong>'+d.entryProjects.length+'</strong><span>Entry 프로젝트</span></div><div class="stat"><strong>'+d.vibeProjects.length+'</strong><span>Vibe Coding</span></div><div class="stat"><strong>'+d.repositories.length+'</strong><span>GitHub 연결</span></div>';

  $("#menuBtn").addEventListener("click",()=>$("#nav").classList.toggle("open"));
  document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>$("#nav").classList.remove("open")));
});