// بيانات المشروعات (تعليمية / عرضية) - كل مشروع: id,title,desc,year,location,img,sector
const projectsData = [
  {id:1, title:"محطة شمسية مدرسية - الهرم", desc:"لوحات شمسية لتغذية مدرسة محلية بالطاقة وتقليل فاتورة الكهرباء.", year:2023, location:"الهرم", img:"images/solar-school.jpg", sector:"solar"},
  {id:2, title:"محطة شمسية على محطة مياه - أبو رواش", desc:"نظام شمسي لتشغيل مضخات مياه معالجة.", year:2022, location:"أبو رواش", img:"images/solar-water.jpg", sector:"solar"},
  {id:3, title:"تحويل إنارة الشوارع إلى LED", desc:"مشروع لتحويل أعمدة الإنارة لليد لتخفيض الاستهلاك.", year:2021, location:"الجيزة", img:"images/led-street.jpg", sector:"efficiency"},
  {id:4, title:"محطة شحن سيارات كهربائية - 6 أكتوبر", desc:"نقطة شحن لسيارات كهربائية في حي 6 أكتوبر.", year:2024, location:"6 أكتوبر", img:"images/ev-charger.jpg", sector:"grid"},
  {id:5, title:"ورشة تعليم الطاقة المتجددة - الدقي", desc:"مركز تدريب فني لتعليم طاقة شمسية وصيانة بطاريات.", year:2023, location:"الدقي", img:"images/training-center.jpg", sector:"education"},
  {id:6, title:"شبكة ذكية لتوزيع الحمل", desc:"نظام مراقبة ذكي لتوزيع الأحمال وتقليل الفاقد.", year:2022, location:"الشيخ زايد", img:"images/smart-grid.jpg", sector:"grid"},
  {id:7, title:"حملة تبديل مصابيح المنازل", desc:"مبادرة لتوزيع مصابيح LED على الأسر المستحقة.", year:2020, location:"المناطق الريفية", img:"images/led-donation.jpg", sector:"efficiency"},
  {id:8, title:"نظام إدارة الطاقة للمباني الحكومية", desc:"تحسين استهلاك الطاقة في مبنى إداري بتقنيات تحكم.", year:2021, location:"الجيزة", img:"images/building-energy.jpg", sector:"efficiency"},
  {id:9, title:"شبكة الكفاءات الخضراء", desc:"برنامج تدريبي للطلاب لتصميم مشاريع طاقة مستدامة.", year:2024, location:"المدارس المحلية", img:"images/green-training.jpg", sector:"education"},
  {id:10, title:"لوحة توجيه استهلاك الطاقة للمنازل", desc:"لوحة تفاعلية تعلم الأسر كيفية تقليل الاستهلاك.", year:2023, location:"بعض الأحياء", img:"images/home-dashboard.jpg", sector:"education"}
];

// عناصر DOM
const projectsGrid = document.getElementById('projectsGrid');
const sectorButtons = document.getElementById('sectorButtons');
const siteSearch = document.getElementById('siteSearch');
const clearSearch = document.getElementById('clearSearch');
const timelineList = document.getElementById('timelineList');
const timelineProjects = document.getElementById('timelineProjects');

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalYear = document.getElementById('modalYear');
const modalLocation = document.getElementById('modalLocation');

const stat_total = document.getElementById('stat_total');
const stat_solar = document.getElementById('stat_solar');
const stat_eff = document.getElementById('stat_eff');

// عرض بطاقة مشروع
function createProjectCard(p){
  const el = document.createElement('div');
  el.className = 'project';
  el.innerHTML = `
    <img src="${p.img || 'images/default.jpg'}" alt="${p.title}">
    <div class="body">
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="meta"><span>${p.location}</span><span>${p.year}</span></div>
    </div>
  `;
  el.addEventListener('click', ()=> openModal(p));
  return el;
}

// رندر قائمة المشاريع
function renderProjects(list){
  projectsGrid.innerHTML = '';
  if(list.length===0){ projectsGrid.innerHTML = '<p class="muted">لا توجد مشاريع مطابقة.</p>'; return; }
  list.forEach(p => projectsGrid.appendChild(createProjectCard(p)));
}

// تهيئة افتراضية
renderProjects(projectsData);
updateStats();
renderTimeline();

// فلاتر القطاع
sectorButtons.addEventListener('click', (e)=>{
  const btn = e.target.closest('.chip');
  if(!btn) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  const sector = btn.dataset.sector;
  if(sector === 'all') renderProjects(projectsData);
  else renderProjects(projectsData.filter(p=>p.sector===sector));
});

// بحث حي
siteSearch.addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  if(!q){ const active = document.querySelector('.chip.active'); active ? active.click() : renderProjects(projectsData); return; }
  const results = projectsData.filter(p=>{
    return p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || String(p.year).includes(q) || p.location.toLowerCase().includes(q) || p.sector.toLowerCase().includes(q);
  });
  renderProjects(results);
});

// مسح البحث
clearSearch.addEventListener('click', ()=>{ siteSearch.value=''; siteSearch.dispatchEvent(new Event('input')); });

// مودال
function openModal(p){
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
  modalImg.src = p.img || 'images/default.jpg';
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalYear.textContent = p.year;
  modalLocation.textContent = p.location;
}
closeModal.addEventListener('click', ()=> { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); });

// اغلاق بالخارج و Esc
window.addEventListener('click', (e)=>{ if(e.target === modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }});
window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape'){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }});

// خط زمني
function renderTimeline(){
  const byYear = {};
  projectsData.forEach(p=>{
    const y = p.year || 'قيد التنفيذ';
    byYear[y] = byYear[y] || [];
    byYear[y].push(p);
  });
  const years = Object.keys(byYear).sort((a,b)=> Number(b) - Number(a));
  timelineList.innerHTML='';
  years.forEach(y=>{
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.textContent = y;
    item.addEventListener('click', ()=> {
      timelineProjects.innerHTML = '';
      byYear[y].forEach(p => timelineProjects.appendChild(createProjectCard(p)));
      // scroll to timeline projects
      item.scrollIntoView({behavior:'smooth',block:'center'});
    });
    timelineList.appendChild(item);
  });
}

// احسب إحصائيات
function updateStats(){
  stat_total.textContent = projectsData.length;
  stat_solar.textContent = projectsData.filter(p=>p.sector==='solar').length;
  stat_eff.textContent = projectsData.filter(p=>p.sector==='efficiency').length;
}

// ------------------------------------------------------------------
// الآلات الحاسبة
// 1) V + I -> P
document.getElementById('calc_v_to_p').addEventListener('click', ()=>{
  const v = parseFloat(document.getElementById('v_to_p_v').value);
  const i = parseFloat(document.getElementById('v_to_p_i').value);
  const out = document.getElementById('res_v_to_p');
  if(isNaN(v) || isNaN(i)){ out.textContent = 'ادخل قيم صحيحة للجهد والتيار'; return; }
  const p = v * i;
  out.textContent = `${p.toLocaleString(undefined, {maximumFractionDigits:2})} واط (W)`;
});

// 2) V + R -> I
document.getElementById('calc_v_to_i').addEventListener('click', ()=>{
  const v = parseFloat(document.getElementById('v_to_i_v').value);
  const r = parseFloat(document.getElementById('v_to_i_r').value);
  const out = document.getElementById('res_v_to_i');
  if(isNaN(v) || isNaN(r) || r === 0){ out.textContent = 'ادخل قيم صحيحة (المقاومة لا تساوي صفر)'; return; }
  const i = v / r;
  out.textContent = `${i.toLocaleString(undefined, {maximumFractionDigits:3})} أمبير (A)`;
});

// 3) استهلاك و تكلفة
document.getElementById('calc_consume').addEventListener('click', ()=>{
  const w = parseFloat(document.getElementById('cons_p').value); // W
  const hours = parseFloat(document.getElementById('cons_h').value);
  const price = parseFloat(document.getElementById('cons_price').value);
  const out = document.getElementById('res_consume');
  if(isNaN(w) || isNaN(hours) || isNaN(price)){ out.textContent = 'ادخل كل القيم المطلوبة'; return; }
  const monthly_kwh = (w * hours * 30) / 1000; // kWh
  const cost = monthly_kwh * price;
  out.innerHTML = `الاستهلاك الشهري: <strong>${monthly_kwh.toFixed(2)} kWh</strong><br>التكلفة الشهرية: <strong>${cost.toFixed(2)} جنيه</strong>`;
});


// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ========== Chatbot ==========

// فتح/غلق الشات
const chatIcon = document.getElementById("chat-icon");
const chatBox = document.getElementById("chatbot");

chatIcon.addEventListener("click", () => {
  if (chatBox.style.display === "flex") {
    chatBox.style.display = "none";
  } else {
    chatBox.style.display = "flex";
  }
});


// إرسال رسالة
document.getElementById("sendBtn").addEventListener("click", sendMessage);
document.getElementById("chatText").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const input = document.getElementById("chatText");
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";
  setTimeout(() => botReply(text), 600);
}

function addMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = "msg " + type;
  msg.textContent = text;
  document.getElementById("chat-body").appendChild(msg);
  msg.scrollIntoView();
}

function botReply(text) {
  const q = text.toLowerCase();
  let answer = "آسف، مش لاقي إجابة دلوقتي.";

  // البحث في المشاريع
  const project = db.projects.find(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
  );

  if (project) {
    answer = `${project.title}: ${project.desc} 📍 ${project.location} (${project.date})`;
  } else if (q.includes("كم") && q.includes("منجز")) {
    answer = `عدد المشاريع المنجزة: ${db.projects.filter(p=>p.category==="completed").length}`;
  } else if (q.includes("كم") && q.includes("جاري")) {
    answer = `عدد المشاريع الجارية: ${db.projects.filter(p=>p.category==="ongoing").length}`;
  } else if (q.includes("مبادرة")) {
    answer = `عدد المبادرات: ${db.projects.filter(p=>p.category==="initiative").length}`;
  }

  addMessage(answer, "bot");
}

// المودال
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

// اغلاق عند الضغط على زر ×
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// اغلاق عند الضغط خارج المودال (على الخلفية)
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
// اغلاق المودال بزر Escape
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});
