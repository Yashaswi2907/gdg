const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));
const LS_KEY = "resume_builder_v1";

const nameInput = qs("#name");
const emailInput = qs("#email");
const phoneInput = qs("#phone");
const websiteInput = qs("#website");
const linkedinInput = qs("#linkedin");

const educationList = qs("#education-list");
const experienceList = qs("#experience-list");
const projectList = qs("#project-list");
const skillList = qs("#skill-list");

const eduSchool = qs("#edu-school");
const eduDegree = qs("#edu-degree");
const eduYear = qs("#edu-year");
const addEduBtn = qs("#add-education");

const expRole = qs("#exp-role");
const expCompany = qs("#exp-company");
const expDuration = qs("#exp-duration");
const expDesc = qs("#exp-desc");
const addExpBtn = qs("#add-experience");

const projTitle = qs("#proj-title");
const projLink = qs("#proj-link");
const projDesc = qs("#proj-desc");
const addProjBtn = qs("#add-project");

const skillName = qs("#skill-name");
const skillLevel = qs("#skill-level");
const skillLevelVal = qs("#skill-level-val");
const addSkillBtn = qs("#add-skill");

const previewRoot = qs("#preview-root");
const previewName = qs("#preview-name");
const previewContact = qs("#preview-contact");
const previewEducation = qs("#preview-education");
const previewExperience = qs("#preview-experience");
const previewProjects = qs("#preview-projects");
const previewSkills = qs("#preview-skills");

const btnSave = qs("#btnSave");
const btnLoad = qs("#btnLoad");
const btnClear = qs("#btnClear");
const btnPrint = qs("#btnPrint");


qsa('input[name="template"]').forEach(r => {
  r.addEventListener("change", () => {
    previewRoot.className = r.value === "modern" ? "template-modern" : "template-classic";
    saveToLocal();
  });
});


[nameInput,emailInput,phoneInput,websiteInput,linkedinInput].forEach(inp => {
  inp.addEventListener("input", renderPreview);
});
nameInput.addEventListener("input", () => {
  if (nameInput.value.length > 50) {
    nameInput.value = nameInput.value.slice(0,50);
  }
});


skillLevel.addEventListener("input", () => {
  skillLevelVal.innerText = `${skillLevel.value}%`;
});


function createRemoveButton(onClick){
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "✕";
  btn.title = "Remove";
  btn.addEventListener("click", onClick);
  return btn;
}


addEduBtn.addEventListener("click", () => {
  const s = eduSchool.value.trim();
  const d = eduDegree.value.trim();
  const y = eduYear.value.trim();
  if (!s || !d) { alert("Please enter at least School and Degree."); return; }

  const wrap = document.createElement("div");
  wrap.className = "entry";
  const meta = document.createElement("div");
  meta.className = "meta";
  meta.innerText = `${s} — ${d} ${y ? `(${y})` : ""}`;
  wrap.appendChild(meta);
  wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
  educationList.appendChild(wrap);

  
  eduSchool.value = ""; eduDegree.value = ""; eduYear.value = "";
  renderPreview(); saveToLocal();
});


addExpBtn.addEventListener("click", () => {
  const role = expRole.value.trim();
  const comp = expCompany.value.trim();
  const dur = expDuration.value.trim();
  const desc = expDesc.value.trim();
  if (!role || !comp) { alert("Please enter Role and Company."); return; }

  const wrap = document.createElement("div");
  wrap.className = "entry";
  const meta = document.createElement("div"); meta.className="meta";
  meta.innerHTML = `<strong>${role}</strong> • ${comp} ${dur ? `(${dur})` : ""}<div style="font-size:13px;color:#445;">${desc}</div>`;
  wrap.appendChild(meta);
  wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
  experienceList.appendChild(wrap);

  expRole.value=""; expCompany.value=""; expDuration.value=""; expDesc.value="";
  renderPreview(); saveToLocal();
});


addProjBtn.addEventListener("click", () => {
  const t = projTitle.value.trim(); const link = projLink.value.trim(); const desc = projDesc.value.trim();
  if (!t) { alert("Please enter project title."); return; }

  const wrap = document.createElement("div");
  wrap.className = "entry";
  const meta = document.createElement("div"); meta.className="meta";
  meta.innerHTML = `<strong>${t}</strong> ${link ? `• <a href="${link}" target="_blank">${link}</a>` : ""}<div style="font-size:13px;color:#445;">${desc}</div>`;
  wrap.appendChild(meta);
  wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
  projectList.appendChild(wrap);

  projTitle.value=""; projLink.value=""; projDesc.value="";
  renderPreview(); saveToLocal();
});


addSkillBtn.addEventListener("click", () => {
  const nm = skillName.value.trim(); const lvl = parseInt(skillLevel.value,10);
  if (!nm) { alert("Please enter a skill name."); return; }

  const wrap = document.createElement("div");
  wrap.className = "entry";
  const meta = document.createElement("div"); meta.className="meta";
  meta.innerText = `${nm} — ${lvl}%`;
  const hidden = document.createElement("input");
  hidden.type="hidden"; hidden.value = JSON.stringify({name:nm,level:lvl});
  wrap.appendChild(meta);
  wrap.appendChild(hidden);
  wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
  skillList.appendChild(wrap);

  skillName.value=""; skillLevel.value=75; skillLevelVal.innerText="75%";
  renderPreview(); saveToLocal();
});


function renderPreview(){
  
  const name = nameInput.value.trim() || "Your Name";
  previewName.innerText = name;

  const contactParts = [];
  if (emailInput.value.trim()) contactParts.push(emailInput.value.trim());
  if (phoneInput.value.trim()) contactParts.push(phoneInput.value.trim());
  if (websiteInput.value.trim()) contactParts.push(websiteInput.value.trim());
  if (linkedinInput.value.trim()) contactParts.push(linkedinInput.value.trim());
  previewContact.innerText = contactParts.join(" · ") || "Email · Phone · Website";

  // Education
  previewEducation.innerHTML = "";
  qsa("#education-list .entry").forEach(e => {
    const text = e.querySelector(".meta").innerText;
    const li = document.createElement("li"); li.textContent = text;
    previewEducation.appendChild(li);
  });

  previewExperience.innerHTML = "";
  qsa("#experience-list .entry").forEach(e => {
    const text = e.querySelector(".meta").innerHTML;
    const li = document.createElement("li"); li.innerHTML = text;
    previewExperience.appendChild(li);
  });

  previewProjects.innerHTML = "";
  qsa("#project-list .entry").forEach(e => {
    const text = e.querySelector(".meta").innerHTML;
    const li = document.createElement("li"); li.innerHTML = text;
    previewProjects.appendChild(li);
  });

  previewSkills.innerHTML = "";
  qsa("#skill-list .entry").forEach(e => {
    // hidden contains JSON {name,level}
    const hidden = e.querySelector("input[type='hidden']");
    let obj = {name: e.querySelector(".meta").innerText.split(" — ")[0], level: 0};
    if (hidden) obj = JSON.parse(hidden.value);
    const card = document.createElement("div"); card.className = "skill-card";
    card.innerHTML = `<div class="skill-name">${obj.name}</div>
      <div class="bar"><i style="width:${obj.level}%"></i></div>`;
    previewSkills.appendChild(card);
  });
}

function collectData(){
  return {
    meta: {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      website: websiteInput.value,
      linkedin: linkedinInput.value,
      template: qs('input[name="template"]:checked').value
    },
    education: qsa("#education-list .entry").map(e => ({ text: e.querySelector(".meta").innerText })),
    experience: qsa("#experience-list .entry").map(e => ({ html: e.querySelector(".meta").innerHTML })),
    projects: qsa("#project-list .entry").map(e => ({ html: e.querySelector(".meta").innerHTML })),
    skills: qsa("#skill-list .entry").map(e => {
      const hidden = e.querySelector("input[type='hidden']");
      return hidden ? JSON.parse(hidden.value) : {name: e.querySelector(".meta").innerText.split(" — ")[0], level:0};
    })
  };
}
function saveToLocal(){
  const d = collectData();
  localStorage.setItem(LS_KEY, JSON.stringify(d));
}
function loadFromLocal(){
  const raw = localStorage.getItem(LS_KEY);
  if(!raw) { alert("No saved data found."); return; }
  const d = JSON.parse(raw);

  nameInput.value = d.meta.name || "";
  emailInput.value = d.meta.email || "";
  phoneInput.value = d.meta.phone || "";
  websiteInput.value = d.meta.website || "";
  linkedinInput.value = d.meta.linkedin || "";
  qsa('input[name="template"]').forEach(r => { r.checked = (r.value === (d.meta.template || "classic")); });
  previewRoot.className = (d.meta.template === "modern") ? "template-modern" : "template-classic";

  educationList.innerHTML = ""; experienceList.innerHTML = ""; projectList.innerHTML = ""; skillList.innerHTML = "";

  (d.education || []).forEach(it => {
    const wrap = document.createElement("div"); wrap.className="entry";
    const meta = document.createElement("div"); meta.className="meta"; meta.innerText = it.text;
    wrap.appendChild(meta); wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
    educationList.appendChild(wrap);
  });
  (d.experience || []).forEach(it => {
    const wrap = document.createElement("div"); wrap.className="entry";
    const meta = document.createElement("div"); meta.className="meta"; meta.innerHTML = it.html;
    wrap.appendChild(meta); wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
    experienceList.appendChild(wrap);
  });
  (d.projects || []).forEach(it => {
    const wrap = document.createElement("div"); wrap.className="entry";
    const meta = document.createElement("div"); meta.className="meta"; meta.innerHTML = it.html;
    wrap.appendChild(meta); wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
    projectList.appendChild(wrap);
  });
  (d.skills || []).forEach(it => {
    const wrap = document.createElement("div"); wrap.className="entry";
    const meta = document.createElement("div"); meta.className="meta"; meta.innerText = `${it.name} — ${it.level}%`;
    const hidden = document.createElement("input"); hidden.type="hidden"; hidden.value = JSON.stringify(it);
    wrap.appendChild(meta); wrap.appendChild(hidden);
    wrap.appendChild(createRemoveButton(()=>{ wrap.remove(); renderPreview(); saveToLocal(); }));
    skillList.appendChild(wrap);
  });

  renderPreview();
}

btnSave.addEventListener("click", () => { saveToLocal(); alert("Saved locally"); });
btnLoad.addEventListener("click", () => { loadFromLocal(); });
btnClear.addEventListener("click", () => {
  if (!confirm("Clear all data and reset form?")) return;
  localStorage.removeItem(LS_KEY);
  location.reload();
});

btnPrint.addEventListener("click", () => {
  // ensure preview is up-to-date
  renderPreview();
  window.print();
});

["input","change"].forEach(evt=>{
  document.addEventListener(evt, () => { renderPreview(); saveToLocal(); });
});

(function init(){
  const raw = localStorage.getItem(LS_KEY);
  if (raw) loadFromLocal();
  renderPreview();
})();
