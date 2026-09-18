const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><path d="M3 20c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16.2 15.2c2.4.3 4.3 1.7 4.8 4.3"/></svg>',
  depts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6"/></svg>',
  leave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
  jobs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  loans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20M12 14h.01"/></svg>',
  pay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M7 8h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h9"/></svg>',
  me: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c1-3.5 3.8-5.2 7-5.2S18 16.5 19 20"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v6h6"/></svg>'
};

const NAV_HR = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "employees", label: "Employees", icon: "people" },
  { id: "departments", label: "Departments", icon: "depts" },
  { id: "leave", label: "Leave Requests", icon: "leave" },
  { id: "jobs", label: "Job Postings", icon: "jobs" },
  { id: "loans", label: "Loan Approvals", icon: "loans" },
  { id: "roster", label: "Roster & OT", icon: "jobs" },
  { id: "payroll", label: "Payroll", icon: "pay" }
];

const NAV_STAFF = [
  { id: "home", label: "My workspace", icon: "dashboard" },
  { id: "leave", label: "My leave", icon: "leave" },
  { id: "loans", label: "My loans", icon: "loans" },
  { id: "payslip", label: "Payslip", icon: "pay" },
  { id: "jobs", label: "Internal jobs", icon: "jobs" },
  { id: "profile", label: "My profile", icon: "me" }
];

const SEED = {
  employees: [
    { id: "e1", name: "Dr. Sarah Chen", role: "Professor & Dept Head", type: "Faculty", dept: "Computer Science", email: "s.chen@unre.ac.pg", status: "Active", salary: 128000, password: "unre2026" },
    { id: "e2", name: "Dr. James Okonkwo", role: "Professor & Dept Head", type: "Faculty", dept: "Mathematics", email: "j.okonkwo@unre.ac.pg", status: "Active", salary: 124000, password: "unre2026" },
    { id: "e3", name: "Dr. Maria Santos", role: "Professor & Dept Head", type: "Faculty", dept: "Biology", email: "m.santos@unre.ac.pg", status: "On Leave", salary: 121000, password: "unre2026" },
    { id: "e4", name: "Dr. Robert Kim", role: "Professor & Dept Head", type: "Faculty", dept: "Business Administration", email: "r.kim@unre.ac.pg", status: "Active", salary: 118000, password: "unre2026" },
    { id: "e5", name: "Patricia Williams", role: "Head Librarian", type: "Staff", dept: "Library Services", email: "p.williams@unre.ac.pg", status: "Active", salary: 72000, password: "unre2026" },
    { id: "e6", name: "Michael Torres", role: "Associate Professor", type: "Faculty", dept: "Computer Science", email: "m.torres@unre.ac.pg", status: "Active", salary: 98000, password: "unre2026" },
    { id: "e7", name: "David Park", role: "Lecturer", type: "Faculty", dept: "Mathematics", email: "d.park@unre.ac.pg", status: "On Leave", salary: 76000, password: "unre2026" },
    { id: "e8", name: "Kevin Zhang", role: "Senior Lecturer", type: "Faculty", dept: "Computer Science", email: "k.zhang@unre.ac.pg", status: "Active", salary: 88000, password: "unre2026" },
    { id: "e9", name: "Emily Rodriguez", role: "Visiting Lecturer", type: "Adjunct", dept: "Biology", email: "e.rodriguez@unre.ac.pg", status: "Active", salary: 52000, password: "unre2026" },
    { id: "e10", name: "Helen Kavo", role: "HR Officer", type: "Staff", dept: "Business Administration", email: "h.kavo@unre.ac.pg", status: "Active", salary: 54000, password: "unre2026" },
    { id: "e11", name: "Peter Namaliu", role: "Lab Technician", type: "Staff", dept: "Biology", email: "p.namaliu@unre.ac.pg", status: "Active", salary: 48000, password: "unre2026" },
    { id: "e12", name: "Grace Tovue", role: "Research Fellow", type: "Research", dept: "Computer Science", email: "g.tovue@unre.ac.pg", status: "Active", salary: 69000, password: "unre2026" }
  ],
  departments: [
    { id: "d1", name: "Computer Science", code: "CS", blurb: "Computing for agriculture, GIS, and campus systems.", members: 4, location: "Tech Hall", head: "Dr. Sarah Chen", description: "Computer Science teaches programming, data, and digital systems that support UNRE’s natural-resource mandate. Staff run undergraduate computing, GIS for field programmes, and the university’s teaching labs in Tech Hall. The department also supports campus information systems and applied research in machine learning for agriculture and environment." },
    { id: "d2", name: "Mathematics", code: "MATH", blurb: "Pure and applied mathematics for science programmes.", members: 2, location: "Science Block A", head: "Dr. James Okonkwo", description: "Mathematics provides core quantitative teaching for science, agriculture, and business students. The unit covers calculus, statistics, and applied modelling used in field trials and resource economics. Staff in Science Block A also support visiting lecturers for service courses across campus." },
    { id: "d3", name: "Biology", code: "BIO", blurb: "Biological sciences, teaching labs, and field research.", members: 3, location: "Life Sciences Center", head: "Dr. Maria Santos", description: "Biology covers organismal biology, ecology, and laboratory skills linked to PNG’s forests, crops, and coastal systems. The Life Sciences Center houses teaching labs, specimen prep, and technician support for undergraduate practicals. Research and adjunct staff contribute to field programmes with schools of natural resources." },
    { id: "d4", name: "Business Administration", code: "BUS", blurb: "Management, records, and campus administration.", members: 2, location: "Commerce Wing", head: "Dr. Robert Kim", description: "Business Administration teaches management, accounting, and administration for students who will run farms, cooperatives, and public offices. The Commerce Wing also hosts academic coordination and some central HR functions. Staff work with other faculties on student records, programme logistics, and professional short courses." },
    { id: "d5", name: "Library Services", code: "LIB", blurb: "Campus library, journals, and information literacy.", members: 1, location: "Main Library", head: "Patricia Williams", description: "Library Services runs the Main Library: lending, e-resources, and information literacy for students and academic staff. The team maintains print holdings on agriculture and environment and supports researchers with journals and interlibrary access. Opening hours and collection development follow the academic calendar." }
  ],
  leave: [
    { id: "l1", employee: "David Park", dept: "Mathematics", type: "Sick", start: "2026-09-10", end: "2026-09-14", note: "Medical procedure and recovery", status: "Pending" },
    { id: "l2", employee: "Kevin Zhang", dept: "Computer Science", type: "Personal", start: "2026-09-15", end: "2026-09-16", note: "Personal appointment", status: "Approved" },
    { id: "l3", employee: "Emily Rodriguez", dept: "Biology", type: "Annual", start: "2026-09-20", end: "2026-09-27", note: "Family vacation", status: "Approved" },
    { id: "l4", employee: "Dr. Maria Santos", dept: "Biology", type: "Annual", start: "2026-09-08", end: "2026-09-18", note: "Conference and field leave", status: "Approved" },
    { id: "l5", employee: "Peter Namaliu", dept: "Biology", type: "Emergency", start: "2026-08-22", end: "2026-08-23", note: "Family emergency", status: "Rejected" }
  ],
  jobs: [
    { id: "j1", title: "Academic Coordinator", dept: "Business Administration", status: "Draft", desc: "Coordinate academic programs, manage student records, and support department operations.", type: "Full-Time", band: "Staff", pay: "K55k–K65k", applicants: 0 },
    { id: "j2", title: "Visiting Lecturer — Statistics", dept: "Mathematics", status: "Open", desc: "One-year visiting position teaching undergraduate statistics courses.", type: "Contract", band: "Adjunct", pay: "K50k–K60k", applicants: 4 },
    { id: "j3", title: "Lab Technician", dept: "Biology", status: "Open", desc: "Manage biology teaching labs, prepare materials, and maintain equipment.", type: "Full-Time", band: "Staff", pay: "K48k–K55k", applicants: 4 },
    { id: "j4", title: "Assistant Professor — Machine Learning", dept: "Computer Science", status: "Open", desc: "Tenure-track assistant professor specializing in machine learning and AI.", type: "Tenure-Track", band: "Faculty", pay: "K95k–K120k", applicants: 5 }
  ],
  loans: [
    { id: "n1", employee: "Helen Kavo", dept: "Business Administration", kind: "Education", amount: 8500, term: 18, reason: "Postgraduate fees at UNRE", status: "Pending", salary: 54000 },
    { id: "n2", employee: "Peter Namaliu", dept: "Biology", kind: "Emergency", amount: 2500, term: 6, reason: "Medical costs for dependent", status: "Pending", salary: 48000 },
    { id: "n3", employee: "Kevin Zhang", dept: "Computer Science", kind: "Housing", amount: 18000, term: 24, reason: "Staff housing bond and relocation", status: "Approved", salary: 88000, repaid: 4500 },
    { id: "n4", employee: "Grace Tovue", dept: "Computer Science", kind: "Salary advance", amount: 3000, term: 3, reason: "Advance against September payroll", status: "Rejected", salary: 69000 }
  ],
  applications: [
    { id: "a1", jobId: "j4", employee: "Michael Torres", employeeId: "e6", at: "2026-08-12", education: "PhD Computer Science, University of Queensland", experience: "Associate Professor, UNRE Computer Science — 6 years teaching software engineering and introductory ML.", statement: "I already convene CS electives and can take the machine-learning stream without a long handover.", status: "Pending" },
    { id: "a2", jobId: "j4", employee: "Dr. Aileen Wani", employeeId: null, at: "2026-08-20", education: "PhD Machine Learning, Australian National University", experience: "Postdoctoral fellow, CSIRO Data61 — 3 years on crop-yield models and satellite imagery.", statement: "I want to build an applied ML group at UNRE focused on agriculture and environment data.", status: "Pending" },
    { id: "a3", jobId: "j4", employee: "Grace Tovue", employeeId: "e12", at: "2026-08-22", education: "MSc Computing, UNRE; BSc Mathematics", experience: "Research Fellow, UNRE CS — 2 years on campus data projects.", statement: "I am ready to move from research fellow to a teaching-and-research faculty appointment.", status: "Pending" },
    { id: "a4", jobId: "j4", employee: "Simon Pokana", employeeId: null, at: "2026-08-28", education: "BSc Information Systems, UPNG", experience: "IT officer, provincial administration — 4 years desktop support.", statement: "I hope to teach programming and grow into research later.", status: "Pending" },
    { id: "a5", jobId: "j4", employee: "Kevin Zhang", employeeId: "e8", at: "2026-09-02", education: "PhD Software Engineering, University of Auckland", experience: "Senior Lecturer, UNRE CS — algorithms and databases.", statement: "ML is adjacent to my teaching. I can cover the post while a specialist is recruited, or take it if preferred.", status: "Pending" },
    { id: "a6", jobId: "j3", employee: "Peter Namaliu", employeeId: "e11", at: "2026-08-15", education: "Diploma in Laboratory Science, POMTech", experience: "Lab Technician, UNRE Biology — already prepares teaching practicals.", statement: "This posting matches my current role; I am applying to confirm the continuing appointment.", status: "Pending" },
    { id: "a7", jobId: "j3", employee: "Ruth Gawi", employeeId: null, at: "2026-08-18", education: "BSc Biology, UNRE", experience: "Graduate intern, National Agricultural Research Institute — sample prep and autoclave work.", statement: "I trained in the Life Sciences labs as a student and can start with little supervision.", status: "Pending" },
    { id: "a8", jobId: "j3", employee: "Helen Kavo", employeeId: "e10", at: "2026-08-25", education: "Diploma in Office Administration", experience: "HR Officer, Business Administration — no lab roster.", statement: "I am seeking a change of department and am willing to train on equipment.", status: "Pending" },
    { id: "a9", jobId: "j3", employee: "Thomas Kapi", employeeId: null, at: "2026-09-01", education: "Certificate in Workplace Safety; secondary science", experience: "Storehand, campus works — chemical store access but no teaching-lab experience.", statement: "I can lift, store, and inventory. I have not run student practicals.", status: "Pending" },
    { id: "a10", jobId: "j2", employee: "David Park", employeeId: "e7", at: "2026-08-11", education: "MSc Statistics, University of Melbourne", experience: "Lecturer, UNRE Mathematics — undergraduate calculus and intro stats.", statement: "I already teach the service statistics stream and can cover the visiting load this year.", status: "Pending" },
    { id: "a11", jobId: "j2", employee: "Emily Rodriguez", employeeId: "e9", at: "2026-08-14", education: "MSc Biology; postgraduate teaching certificate", experience: "Visiting Lecturer, Biology — some quantitative ecology, not a stats specialist.", statement: "I can teach applied statistics for biology students on a one-year contract.", status: "Pending" },
    { id: "a12", jobId: "j2", employee: "Dr. Lillian Soso", employeeId: null, at: "2026-08-19", education: "PhD Statistics, University of Canterbury", experience: "Adjunct lecturer, Divine Word University — 5 years first-year statistics.", statement: "Available for a one-year visiting post; I have PNG undergraduate teaching experience.", status: "Pending" },
    { id: "a13", jobId: "j2", employee: "Patricia Williams", employeeId: "e5", at: "2026-08-30", education: "MLIS Library Science", experience: "Head Librarian — information literacy workshops, not credit-bearing statistics.", statement: "I enjoy teaching workshops and would like to try a formal statistics class.", status: "Pending" }
  ],
  documents: [
    { id: "f1", employeeId: "e1", kind: "Resume", name: "Chen_academic_CV.pdf", uploadedAt: "2026-03-04", updatedAt: "2026-08-18", mime: "text/html", body: "Curriculum vitae — Dr. Sarah Chen, Professor & Head, Computer Science, UNRE. PhD in computing; teaching and applied GIS for agriculture." },
    { id: "f2", employeeId: "e1", kind: "Achievement certificate", name: "UNRE_teaching_excellence_2025.pdf", uploadedAt: "2026-02-20", updatedAt: "2026-02-20", mime: "text/html", body: "Certificate of teaching excellence, 2025 academic year, Papua New Guinea University of Natural Resources and Environment." },
    { id: "f3", employeeId: "e6", kind: "Resume", name: "Torres_CV.pdf", uploadedAt: "2026-06-01", updatedAt: "2026-08-12", mime: "text/html", body: "Curriculum vitae — Michael Torres, Associate Professor, Computer Science. Software engineering and introductory machine learning." },
    { id: "f4", employeeId: "e7", kind: "Qualification", name: "Park_MSc_Statistics.pdf", uploadedAt: "2026-01-15", updatedAt: "2026-01-15", mime: "text/html", body: "Master of Science in Statistics, University of Melbourne. Awarded to David Park." },
    { id: "f5", employeeId: "e10", kind: "Resume", name: "Kavo_HR_CV.pdf", uploadedAt: "2026-04-08", updatedAt: "2026-09-01", mime: "text/html", body: "Curriculum vitae — Helen Kavo, HR Officer, Business Administration. Campus records, leave, and staff support." },
    { id: "f6", employeeId: "e10", kind: "Achievement certificate", name: "Kavo_records_workshop.pdf", uploadedAt: "2026-05-22", updatedAt: "2026-05-22", mime: "text/html", body: "Certificate of completion: public-sector records management workshop, 2026." },
    { id: "f7", employeeId: "e12", kind: "Achievement certificate", name: "Tovue_research_award.pdf", uploadedAt: "2026-07-09", updatedAt: "2026-07-09", mime: "text/html", body: "UNRE research fellow award — Grace Tovue, Computer Science, campus data projects." },
    { id: "f8", employeeId: "e11", kind: "Qualification", name: "Namaliu_lab_diploma.pdf", uploadedAt: "2026-03-30", updatedAt: "2026-03-30", mime: "text/html", body: "Diploma in Laboratory Science, POMTech — Peter Namaliu." },
    { id: "f9", employeeId: "e8", kind: "Resume", name: "Zhang_academic_CV.pdf", uploadedAt: "2026-05-10", updatedAt: "2026-09-01", mime: "text/html", body: "Curriculum vitae — Kevin Zhang, Senior Lecturer, Computer Science, UNRE. PhD Software Engineering, University of Auckland. Algorithms, databases, and adjacent machine-learning teaching." },
    { id: "f10", employeeId: "e9", kind: "Resume", name: "Rodriguez_CV.pdf", uploadedAt: "2026-07-02", updatedAt: "2026-08-14", mime: "text/html", body: "Curriculum vitae — Emily Rodriguez, Visiting Lecturer, Biology. MSc Biology; postgraduate teaching certificate. Quantitative ecology and undergraduate practicals." },
    { id: "f11", employeeId: "e5", kind: "Resume", name: "Williams_library_CV.pdf", uploadedAt: "2026-04-18", updatedAt: "2026-08-30", mime: "text/html", body: "Curriculum vitae — Patricia Williams, Head Librarian, UNRE. MLIS; information literacy workshops and campus collections." },
    { id: "f12", employeeId: "e12", kind: "Resume", name: "Tovue_CS_CV.pdf", uploadedAt: "2026-06-20", updatedAt: "2026-08-22", mime: "text/html", body: "Curriculum vitae — Grace Tovue, Research Fellow, Computer Science. MSc Computing, UNRE; campus data projects and teaching support." },
    { id: "f13", applicationId: "a2", kind: "Resume", name: "Wani_ML_CV.pdf", uploadedAt: "2026-08-20", updatedAt: "2026-08-20", mime: "text/html", body: "Curriculum vitae — Dr. Aileen Wani. PhD Machine Learning, Australian National University. CSIRO Data61 postdoctoral fellow on crop-yield models and satellite imagery." },
    { id: "f14", applicationId: "a2", kind: "Qualification", name: "Wani_PhD_ANU.pdf", uploadedAt: "2026-08-20", updatedAt: "2026-08-20", mime: "text/html", body: "Doctor of Philosophy in Machine Learning, Australian National University — Aileen Wani." },
    { id: "f15", applicationId: "a4", kind: "Resume", name: "Pokana_IS_CV.pdf", uploadedAt: "2026-08-28", updatedAt: "2026-08-28", mime: "text/html", body: "Curriculum vitae — Simon Pokana. BSc Information Systems, UPNG. IT officer, provincial administration — desktop support and campus systems." },
    { id: "f16", applicationId: "a7", kind: "Resume", name: "Gawi_biology_CV.pdf", uploadedAt: "2026-08-18", updatedAt: "2026-08-18", mime: "text/html", body: "Curriculum vitae — Ruth Gawi. BSc Biology, UNRE. Graduate intern, National Agricultural Research Institute — sample prep and autoclave work." },
    { id: "f17", applicationId: "a9", kind: "Resume", name: "Kapi_safety_CV.pdf", uploadedAt: "2026-09-01", updatedAt: "2026-09-01", mime: "text/html", body: "Curriculum vitae — Thomas Kapi. Certificate in Workplace Safety. Storehand, campus works — chemical store access." },
    { id: "f18", applicationId: "a12", kind: "Resume", name: "Soso_statistics_CV.pdf", uploadedAt: "2026-08-19", updatedAt: "2026-08-19", mime: "text/html", body: "Curriculum vitae — Dr. Lillian Soso. PhD Statistics, University of Canterbury. Adjunct lecturer, Divine Word University — first-year statistics." },
    { id: "f19", applicationId: "a12", kind: "Qualification", name: "Soso_PhD_Canterbury.pdf", uploadedAt: "2026-08-19", updatedAt: "2026-08-19", mime: "text/html", body: "Doctor of Philosophy in Statistics, University of Canterbury — Lillian Soso." }
  ]
};

const KEY = "unre-hr-v4";
const DEMO_PASS = "unre2026";
let state = load();
let viewMode = { employees: "All", leave: "list", portal: "hr" };
let session = null;

const FILE_KINDS = ["Resume", "Achievement certificate", "Qualification", "ID / appointment letter", "Profile picture", "Other"];
const FILE_MAX = 1200000;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (!Array.isArray(data.notifications)) data.notifications = [];
      if (!Array.isArray(data.documents)) data.documents = structuredClone(SEED.documents);
      else {
        const have = new Set(data.documents.map((d) => d.id));
        SEED.documents.forEach((d) => { if (!have.has(d.id)) data.documents.push(d); });
      }

      return data;
    }
  } catch (_) {}
  const initial = structuredClone(SEED);
  initial.notifications = [];
  return initial;
}
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function unreadFileNotifications() {
  return (state.notifications || []).filter((n) => n.type === "file-update" && !n.read);
}
function notificationsForSession() {
  if (!session) return [];
  return (state.notifications || []).filter((n) =>
    !n.read && (session.role === "hr" ? n.recipientRole === "hr" : n.employeeId === session.employeeId)
  );
}
function addNotification(notification) {
  state.notifications = state.notifications || [];
  state.notifications.unshift({
    id: uid("n"),
    createdAt: todayIso(),
    read: false,
    ...notification
  });
}
function addFileNotification(employee, doc, action) {
  addNotification({
    type: "file-update",
    recipientRole: "hr",
    employeeId: employee.id,
    documentId: doc.id,
    employeeName: employee.name,
    fileName: doc.name,
    fileKind: doc.kind,
    action,
  });
}
function updateNotificationControl() {
  const button = document.getElementById("file-notifications");
  if (!button) return;
  const count = notificationsForSession().length;
  button.classList.toggle("hidden", count === 0);
  button.innerHTML = `&#128276; Notifications <span class="notification-count">${count}</span>`;
}
function markNotificationRead(id) {
  const item = (state.notifications || []).find((n) => n.id === id);
  if (!item) return;
  item.read = true;
  save();
  updateNotificationControl();
}
function uid(prefix) { return prefix + Math.random().toString(36).slice(2, 8); }
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add("hidden"), 2400);
}
function initials(name) {
  return String(name || "").split(" ").filter(Boolean).slice(-2).map((p) => p[0]).join("").replace(".", "").slice(0, 2).toUpperCase();
}
function generatedAvatarDataUrl(name) {
  const initialsText = initials(name);
  const palette = [
    ["#4f46c8", "#7c3aed"],
    ["#0f766e", "#14b8a6"],
    ["#b45309", "#f59e0b"],
    ["#be123c", "#fb7185"],
    ["#1d4ed8", "#60a5fa"],
    ["#15803d", "#4ade80"]
  ];
  const hash = [...String(name || "")].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const [start, end] = palette[hash % palette.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="${esc(name || "Employee")} profile picture">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${start}"/>
          <stop offset="100%" stop-color="${end}"/>
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="40" fill="url(#g)"/>
      <circle cx="40" cy="30" r="15" fill="rgba(255,255,255,0.16)"/>
      <path d="M19 66c2.5-10.5 11.5-17 21-17s18.7 6.2 21 17" fill="rgba(255,255,255,0.14)"/>
      <text x="40" y="46" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff" letter-spacing="1">${initialsText}</text>
    </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
function employeePhoto(employee) {
  if (!employee) return null;
  if (employee.photoDataUrl) return { dataUrl: employee.photoDataUrl, name: `${employee.name} profile picture`, mime: "image/*" };
  const photo = (state.documents || [])
    .filter((d) => d.employeeId === employee.id && d.dataUrl && ((d.mime || "").startsWith("image/") || /\.(png|jpe?g|webp|gif)$/i.test(d.name || "")))
    .sort((a, b) => String(b.updatedAt || b.uploadedAt).localeCompare(String(a.updatedAt || a.uploadedAt)))
    [0];
  return photo || null;
}
function employeeAvatarHtml(employeeOrName) {
  const employee = typeof employeeOrName === "string"
    ? state.employees.find((e) => e.name === employeeOrName) || null
    : employeeOrName || null;
  if (!employee) {
    const label = String(employeeOrName || "Employee");
    return `<div class="avatar"><img src="${generatedAvatarDataUrl(label)}" alt="${esc(label)} profile picture" /></div>`;
  }
  const photo = employeePhoto(employee);
  if (photo) {
    return `<div class="avatar"><img src="${photo.dataUrl}" alt="${esc(employee.name)} profile picture" /></div>`;
  }
  return `<div class="avatar"><img src="${generatedAvatarDataUrl(employee.name)}" alt="${esc(employee.name)} profile picture" /></div>`;
}
function badge(status) {
  const map = { Pending: "b-pending", Approved: "b-approved", Rejected: "b-rejected", Active: "b-active", "On Leave": "b-leave", Open: "b-open", Draft: "b-draft", Closed: "b-closed", Accepted: "b-approved", Declined: "b-rejected", "Contract signed": "b-approved" };
  return `<span class="badge ${map[status] || "b-draft"}">${status}</span>`;
}
function deptStaff(name) {
  return state.employees.filter((e) => e.dept === name);
}
function empDocs(employeeId) {
  return (state.documents || [])
    .filter((d) => d.employeeId === employeeId)
    .slice()
    .sort((a, b) => String(b.updatedAt || b.uploadedAt).localeCompare(String(a.updatedAt || a.uploadedAt)));
}
function appDocs(app) {
  if (!app) return [];
  const byId = new Map();
  if (app.employeeId) empDocs(app.employeeId).forEach((d) => byId.set(d.id, d));
  (state.documents || [])
    .filter((d) => d.applicationId === app.id)
    .forEach((d) => byId.set(d.id, d));
  return [...byId.values()].sort((a, b) => String(b.updatedAt || b.uploadedAt).localeCompare(String(a.updatedAt || a.uploadedAt)));
}
function fileRowsHtml(docs, opts = {}) {
  if (!docs.length) {
    return `<div class="empty">${opts.empty || "No resume, certificates, or other files yet."}</div>`;
  }
  return docs.map((d) => `
    <div class="file-row">
      <div class="person-top">
        <div class="icon-chip ic-p">${ICONS.file}</div>
        <div>
          <strong>${esc(d.name)}</strong>
          <div class="meta">${esc(d.kind)}${d.size ? ` · ${fileSizeLabel(d.size)}` : ""}</div>
          <div class="meta">Uploaded ${esc(d.uploadedAt)}${d.updatedAt && d.updatedAt !== d.uploadedAt ? ` · updated ${esc(d.updatedAt)}` : ""}</div>
        </div>
      </div>
      <div class="file-acts">
        <button type="button" class="btn btn-ghost" data-file-view="${d.id}"${opts.fromAppId ? ` data-from-app="${opts.fromAppId}"` : ""}>View</button>
        ${opts.edit ? `<button type="button" class="btn btn-ghost" data-file-replace="${d.id}">Update</button>` : ""}
      </div>
    </div>`).join("");
}
function todayIso() { return "2026-09-14"; }
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function fileSizeLabel(n) {
  if (!n) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${Math.round(n / 1024)} KB`;
  return `${(n / 1048576).toFixed(1)} MB`;
}
function canEditEmpFiles(emp) {
  if (!emp) return false;
  if (isHr()) return true;
  return session?.role === "staff" && session.employeeId === emp.id;
}
function jobApps(jobId) {
  return (state.applications || []).filter((a) => a.jobId === jobId);
}
function syncApplicants(job) {
  job.applicants = jobApps(job.id).length;
}
function applicationFit(job, app) {
  const emp = app.employeeId ? state.employees.find((e) => e.id === app.employeeId) : null;
  const reasons = [];
  let score = 38;
  if (emp) {
    if (emp.type === job.band) { score += 24; reasons.push(`Appointment type ${emp.type} matches the ${job.band} band.`); }
    else { score += 6; reasons.push(`Internal ${emp.type}; this posting is ${job.band}.`); }
    if (emp.dept === job.dept) { score += 14; reasons.push(`Already works in ${job.dept}.`); }
    else { reasons.push(`Currently in ${emp.dept}, not ${job.dept}.`); }
    if (emp.status === "Active") { score += 8; reasons.push("Currently active on the roster."); }
    else { score -= 6; reasons.push(`Employment status is ${emp.status}.`); }
  } else {
    reasons.push("External applicant (not on the current UNRE payroll).");
    if (job.band === "Faculty" && /PhD|Doctor/i.test(app.education || "")) {
      score += 26; reasons.push("Doctoral qualification fits a faculty appointment.");
    } else if (job.band === "Faculty") {
      score -= 8; reasons.push("Faculty posts normally need a doctorate or equivalent.");
    }
    if (job.band === "Staff" && /technician|lab|coordinator|admin|library/i.test(`${app.experience} ${app.education}`)) {
      score += 22; reasons.push("Experience lines up with staff duties.");
    }
    if (job.band === "Adjunct" && /lectur|teach|adjunct|statistics|tutor/i.test(`${app.experience} ${app.education}`)) {
      score += 22; reasons.push("Teaching experience fits an adjunct / visiting post.");
    }
  }
  const hay = `${app.education} ${app.experience} ${app.statement}`.toLowerCase();
  const keys = job.title.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 4);
  const hits = [...new Set(keys.filter((k) => hay.includes(k)))];
  if (hits.length) { score += Math.min(16, hits.length * 5); reasons.push(`File mentions: ${hits.slice(0, 4).join(", ")}.`); }
  score = Math.max(8, Math.min(99, score));
  return { score, qualified: score >= 70, reasons };
}
function kina(n) { return "K" + Number(n).toLocaleString("en-PG", { maximumFractionDigits: 0 }); }
function kina2(n) { return "K" + Number(n).toLocaleString("en-PG", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function jobSalaryRange(pay) {
  const values = [...String(pay || "").matchAll(/K\s*([\d,.]+)\s*([km]?)/gi)]
    .map((match) => Number(match[1].replace(/,/g, "")) * (match[2].toLowerCase() === "m" ? 1000000 : match[2].toLowerCase() === "k" ? 1000 : 1))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (!values.length) return null;
  return { min: Math.min(...values), max: Math.max(...values) };
}
function isHr() { return session?.role === "hr"; }
function me() {
  if (!session || session.role !== "staff") return null;
  return state.employees.find((e) => e.id === session.employeeId);
}
function navItems() { return isHr() ? NAV_HR : NAV_STAFF; }
function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000) + 1;
}
function leaveUsed(name, type) {
  return state.leave.filter((l) => l.employee === name && l.type === type && l.status === "Approved")
    .reduce((s, l) => s + daysBetween(l.start, l.end), 0);
}
function loanEligible(emp, amount) {
  const active = state.loans.filter((l) => l.employee === emp.name && l.status === "Approved");
  const outstanding = active.reduce((s, l) => s + (l.amount - (l.repaid || 0)), 0);
  const cap = emp.salary * 0.4;
  if (active.length >= 1 && outstanding > 0) return { ok: false, reason: "Already has an outstanding staff loan." };
  if (amount + outstanding > cap) return { ok: false, reason: `Exceeds 40% of annual salary (${kina(cap)}).` };
  return { ok: true, reason: "Within policy: one loan, max 40% of annual salary." };
}
function loanMonthly(l) {
  const remaining = l.amount - (l.repaid || 0);
  const paidMonths = l.amount ? Math.floor((l.repaid || 0) / (l.amount / l.term)) : 0;
  const left = Math.max(1, l.term - paidMonths);
  return remaining / left;
}
function payslip(emp) {
  const gross = emp.salary / 12;
  const nasfund = gross * 0.06;
  const employerNasfund = gross * 0.084;
  const annual = emp.salary;
  let annualTax = 0;
  if (annual > 17500) {
    const t = annual - 17500;
    if (t <= 25000) annualTax = t * 0.22;
    else if (t <= 82500) annualTax = 25000 * 0.22 + (t - 25000) * 0.3;
    else annualTax = 25000 * 0.22 + 57500 * 0.3 + (t - 82500) * 0.35;
  }
  const tax = annualTax / 12;
  const loans = state.loans.filter((l) => l.employee === emp.name && l.status === "Approved" && (l.amount - (l.repaid || 0)) > 0);
  const loan = loans.reduce((s, l) => s + loanMonthly(l), 0);
  const overtime = overtimeRecords().filter((entry) => entry.employeeId === emp.id).reduce((s, entry) => s + overtimePay(entry), 0);
  const net = gross + overtime - nasfund - tax - loan;
  return { gross: gross + overtime, baseGross: gross, overtime, nasfund, employerNasfund, tax, loan, net, loans };
}

function rosterRecords() {
  if (!Array.isArray(state.roster)) state.roster = [];
  return state.roster;
}

function isTeachingRosterEmployee(employee) {
  return employee && (
    employee.type === "Faculty" ||
    /lecturer|tutor|professor|academic/i.test(employee.role || "")
  );
}

function addDaysIso(iso, days) {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return formatLocalIso(date);
}

function addMonthsIso(iso, months) {
  const date = new Date(`${iso}T00:00:00`);
  date.setMonth(date.getMonth() + months);
  return formatLocalIso(date);
}

function formatLocalIso(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function rosterPeriodLabel(shift) {
  const employee = state.employees.find((e) => e.id === shift.employeeId);
  return isTeachingRosterEmployee(employee) ? "Semester roster" : "Two-week roster";
}

function overtimeRecords() {
  if (!Array.isArray(state.overtime)) state.overtime = [];
  return state.overtime;
}

function rosterHours(shift) {
  const start = new Date(`2026-09-14T${shift.start}`);
  const end = new Date(`2026-09-14T${shift.end}`);
  let dailyHours = (end - start) / 3600000;
  if (dailyHours < 0) dailyHours += 24;
  dailyHours = Math.max(0, dailyHours - Number(shift.breakMinutes || 0) / 60);
  const startDate = shift.startDate || shift.date || todayIso();
  const endDate = shift.endDate || startDate;
  let workdays = 0;
  for (let date = startDate; date <= endDate; date = addDaysIso(date, 1)) {
    const day = new Date(`${date}T00:00:00`).getDay();
    if (day !== 0 && day !== 6) workdays += 1;
  }
  return dailyHours * Math.max(1, workdays);
}

function overtimePay(entry) {
  const emp = state.employees.find((e) => e.id === entry.employeeId);
  if (!emp) return 0;
  const hourly = emp.salary / 12 / 173.33;
  return Number(entry.hours || 0) * hourly * Number(entry.multiplier || 1.5);
}

function renderRoster() {
  const roster = rosterRecords();
  const overtime = overtimeRecords();
  const totalHours = roster.reduce((sum, shift) => sum + rosterHours(shift), 0);
  const totalOt = overtime.reduce((sum, entry) => sum + Number(entry.hours || 0), 0);
  const totalOtPay = overtime.reduce((sum, entry) => sum + overtimePay(entry), 0);
  return `
    <div class="page-head"><div><h2>Roster &amp; OT</h2><p>Plan shifts, track scheduled hours, and calculate approved overtime.</p></div>
      <button class="btn btn-primary" data-open="roster">+ Add shift</button>
      <button class="btn btn-ghost" data-open="overtime">+ Record OT</button></div>
    <div class="stats">
      <div class="stat"><div class="k">Scheduled shifts</div><div class="n">${roster.length}</div><div class="s">Current roster</div></div>
      <div class="stat"><div class="k">Roster hours</div><div class="n">${totalHours.toFixed(1)}</div><div class="s">Scheduled this period</div></div>
      <div class="stat"><div class="k">Overtime hours</div><div class="n">${totalOt.toFixed(1)}</div><div class="s">Recorded for payroll</div></div>
      <div class="stat"><div class="k">OT payable</div><div class="n">${kina(totalOtPay)}</div><div class="s">At approved multipliers</div></div>
    </div>
    <div class="grid-2">
      <div class="card"><h3>Roster</h3>
        ${roster.length ? roster.map((shift) => {
          const emp = state.employees.find((e) => e.id === shift.employeeId);
          const startDate = shift.startDate || shift.date;
          const endDate = shift.endDate || startDate;
          return `<div class="leave-mini"><div><strong>${emp ? emp.name : "Unassigned"}</strong><div class="meta">${startDate} → ${endDate} · ${shift.start}–${shift.end} · ${rosterPeriodLabel(shift)}</div></div><span>${rosterHours(shift).toFixed(1)} hrs</span></div>`;
        }).join("") : `<div class="empty">No shifts have been added yet.</div>`}
      </div>
      <div class="card"><h3>Overtime register</h3>
        ${overtime.length ? overtime.map((entry) => {
          const emp = state.employees.find((e) => e.id === entry.employeeId);
          return `<div class="leave-mini"><div><strong>${emp ? emp.name : "Unknown employee"}</strong><div class="meta">${entry.date} · ${entry.reason || "Approved overtime"}</div></div><span>${Number(entry.hours || 0).toFixed(1)} hrs · ${kina(overtimePay(entry))}</span></div>`;
        }).join("") : `<div class="empty">No overtime has been recorded yet.</div>`}
      </div>
    </div>`;
}

function route() {
  if (!session) return;
  const items = navItems();
  const fallback = items[0].id;
  const hash = (location.hash || "#/" + fallback).replace("#/", "");
  const page = items.some((n) => n.id === hash) ? hash : fallback;
  if (page !== hash) location.hash = "#/" + page;
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.page === page));
  const hr = {
    dashboard: renderDashboard, employees: renderEmployees, departments: renderDepartments,
    leave: renderLeaveHr, jobs: renderJobsHr, loans: renderLoansHr, roster: renderRoster, payroll: renderPayrollHr
  };
  const staff = {
    home: renderStaffHome, leave: renderLeaveStaff, loans: renderLoansStaff,
    payslip: renderPayslip, jobs: renderJobsStaff, profile: renderProfile
  };
  document.getElementById("view").innerHTML = (isHr() ? hr : staff)[page]();
  bindPage(page);
}

function renderNav() {
  document.getElementById("nav").innerHTML = navItems().map((n) =>
    `<a href="#/${n.id}" data-page="${n.id}">${ICONS[n.icon]}${n.label}</a>`
  ).join("");
}

function countsByType() {
  const types = ["Faculty", "Staff", "Adjunct", "Research"];
  return types.map((t) => ({ t, n: state.employees.filter((e) => e.type === t).length }));
}

function renderDashboard() {
  const pendingLeave = state.leave.filter((l) => l.status === "Pending");
  const pendingLoans = state.loans.filter((l) => l.status === "Pending");
  const openJobs = state.jobs.filter((j) => j.status === "Open");
  const onLeave = state.employees.filter((e) => e.status === "On Leave").length;
  const types = countsByType();
  const max = Math.max(...types.map((x) => x.n), 1);
  const notifications = notificationsForSession();
  return `
    <div class="page-head"><div><h2>Dashboard</h2><p>University of Natural Resources and Environment — HR office</p></div></div>
    <div class="stats">
      <div class="stat"><div class="k">Total Employees <span class="icon-chip ic-p">${ICONS.people}</span></div><div class="n">${state.employees.length}</div><div class="s">${onLeave} currently on leave</div></div>
      <div class="stat"><div class="k">Departments <span class="icon-chip ic-g">${ICONS.depts}</span></div><div class="n">${state.departments.length}</div><div class="s">Academic units</div></div>
      <div class="stat"><div class="k">Pending Leave <span class="icon-chip ic-o">${ICONS.leave}</span></div><div class="n">${pendingLeave.length}</div><div class="s">Awaiting approval</div></div>
      <div class="stat"><div class="k">Open Positions <span class="icon-chip ic-r">${ICONS.jobs}</span></div><div class="n">${openJobs.length}</div><div class="s">Active postings</div></div>
    </div>
    <div class="grid-2">
      <div class="card"><h3>Employees by Type</h3>${types.map((x) => `<div class="bar-row"><span>${x.t}</span><div class="bar"><span style="width:${(x.n / max) * 100}%"></span></div><b>${x.n}</b></div>`).join("")}</div>
      <div class="card"><h3>Pending Leave Requests <button class="link" data-go="leave">View all</button></h3>
        ${pendingLeave.length ? pendingLeave.map((l) => `<div class="leave-mini"><div><strong>${l.employee}</strong><div class="meta">${l.type} · ${l.start}</div></div>${badge(l.status)}</div>`).join("") : `<div class="empty">No leave waiting on HR.</div>`}
      </div>
    </div>
    <div class="grid-2" style="margin-top:14px">
      <div class="card"><h3>Notifications</h3>
        ${notifications.length ? notifications.slice(0, 5).map((n) => `
          <div class="leave-mini notification-row">
            <div><strong>${esc(n.title || n.employeeName || "Notification")}</strong><div class="meta">${esc(n.message || `${n.action} ${n.fileKind}`)}</div><div class="meta">${esc(n.createdAt)}</div></div>
            <button class="btn btn-ghost" data-notification="${n.id}">View</button>
          </div>`).join("") : `<div class="empty">No new notifications.</div>`}
      </div>
      <div class="card"><h3>Staff loans awaiting decision <button class="link" data-go="loans">Review</button></h3>
        ${pendingLoans.length ? pendingLoans.map((l) => `<div class="leave-mini"><div><strong>${l.employee}</strong><div class="meta">${l.kind} · ${kina(l.amount)} · ${l.term} months</div></div>${badge(l.status)}</div>`).join("") : `<div class="empty">No loan files in the queue.</div>`}
      </div>
      <div class="card"><h3>Policy watch</h3><p class="meta">Leave within 3 working days. Loans: one outstanding facility, 40% of annual salary. Repayments are taken from monthly payroll with NASFUND and PAYE.</p></div>
    </div>`;
}

function renderEmployees() {
  const filter = viewMode.employees;
  const q = (viewMode.empQ || "").toLowerCase();
  const list = state.employees.filter((e) => (filter === "All" || e.type === filter) && (`${e.name} ${e.email} ${e.role} ${e.dept}`.toLowerCase().includes(q)));
  const types = ["All", "Faculty", "Staff", "Adjunct", "Research"];
  return `
    <div class="page-head"><div><h2>Employees</h2><p>${state.employees.length} faculty and staff members — each can sign in to self-service</p></div>
      <button class="btn btn-primary" data-open="employee">+ Add Employee</button></div>
    <div class="toolbar">
      <input class="search" id="emp-search" placeholder="Search by name, email, or position..." value="${viewMode.empQ || ""}" />
      <div class="filters">${types.map((t) => `<button class="chip ${filter === t ? "on" : ""}" data-filter="${t}">${t}</button>`).join("")}</div>
    </div>
    <div class="cards">${list.map((e) => `
      <article class="person clickable" data-emp="${e.id}" role="button" tabindex="0"><div class="row-between"><div class="person-top">${employeeAvatarHtml(e)}
        <div><strong>${e.name}</strong><div class="meta">${e.role}</div><div class="meta">${e.email}</div></div></div>${badge(e.status)}</div>
        <div class="kv"><span>${e.dept}</span><span>${e.type}</span><span>${kina(e.salary)}</span><span>${empDocs(e.id).length} files</span></div>
        <div class="meta hint-click">Open record, certificates &amp; resume</div></article>`).join("")}</div>`;
}

function renderDepartments() {
  return `
    <div class="page-head"><div><h2>Departments</h2><p>${state.departments.length} academic departments — click a card for the full brief and staff list</p></div>
      <button class="btn btn-primary" data-open="department">+ Add Department</button></div>
    <div class="cards">${state.departments.map((d) => {
      const n = deptStaff(d.name).length;
      return `
      <article class="dept clickable" data-dept="${d.id}" role="button" tabindex="0">
        <div class="icon-chip ic-g">${ICONS.depts}</div>
        <h3 style="margin:12px 0 4px">${d.name}</h3><div class="meta">${d.code}</div><p class="meta">${d.blurb}</p>
        <div class="kv"><span>${n} members</span><span>${d.location}</span></div>
        <div class="meta" style="margin-top:8px">Head: ${d.head}</div>
        <div class="meta hint-click">Open description &amp; staff</div></article>`;
    }).join("")}</div>`;
}

function renderLeaveHr() {
  const pending = state.leave.filter((l) => l.status === "Pending");
  const history = state.leave.filter((l) => l.status !== "Pending");
  const listView = viewMode.leave === "list";
  return `
    <div class="page-head"><div><h2>Leave Requests</h2><p>${pending.length} pending · ${state.leave.length} total — staff file these from self-service</p></div>
      <div style="display:flex;gap:8px;align-items:center">
        <div class="seg"><button class="${listView ? "on" : ""}" data-leave-view="list">List</button><button class="${!listView ? "on" : ""}" data-leave-view="calendar">Calendar</button></div>
        <button class="btn btn-ghost" data-open="leave">File for staff</button>
      </div></div>
    ${listView ? `
      <h3 style="margin:0 0 10px;font-size:13px;letter-spacing:.08em;color:var(--muted)">PENDING APPROVAL</h3>
      <div class="cards">${pending.length ? pending.map((l) => leaveCard(l, true)).join("") : `<div class="card empty">Queue is clear.</div>`}</div>
      <h3 style="margin:22px 0 10px;font-size:13px;letter-spacing:.08em;color:var(--muted)">HISTORY</h3>
      <div class="cards">${history.map((l) => leaveCard(l, false)).join("")}</div>` : renderCalendar()}`;
}

function renderLeaveStaff() {
  const person = me();
  const mine = state.leave.filter((l) => l.employee === person.name);
  const pending = mine.filter((l) => l.status === "Pending");
  const annualLeft = 20 - leaveUsed(person.name, "Annual");
  const sickLeft = 15 - leaveUsed(person.name, "Sick");
  return `
    <div class="page-head"><div><h2>My leave</h2><p>Request time off. HR must approve before it is rostered.</p></div>
      <button class="btn btn-primary" data-open="leave">Request leave</button></div>
    <div class="stats">
      <div class="stat"><div class="k">Annual remaining</div><div class="n">${Math.max(0, annualLeft)}</div><div class="s">of 20 days</div></div>
      <div class="stat"><div class="k">Sick remaining</div><div class="n">${Math.max(0, sickLeft)}</div><div class="s">of 15 days</div></div>
      <div class="stat"><div class="k">Waiting on HR</div><div class="n">${pending.length}</div><div class="s">Not yet decided</div></div>
    </div>
    <div class="cards">${mine.length ? mine.map((l) => leaveCard(l, false)).join("") : `<div class="card empty">You have not filed any leave yet.</div>`}</div>`;
}

function leaveCard(l, canDecide) {
  const employee = state.employees.find((e) => e.name === l.employee);
  return `
    <article class="person"><div class="row-between"><div class="person-top">${employeeAvatarHtml(employee || l.employee)}
      <div><strong>${l.employee}</strong><div class="meta">${l.dept}</div></div></div>${badge(l.status)}</div>
      <div class="kv"><span>Type ${l.type}</span><span>Start ${l.start}</span><span>End ${l.end}</span></div>
      <p class="meta">${l.note}</p>
      ${canDecide && l.status === "Pending" ? `<div class="actions">
        <button class="btn btn-ok" data-leave="${l.id}" data-act="Approved">Approve</button>
        <button class="btn btn-danger" data-leave="${l.id}" data-act="Rejected">Reject</button></div>` : ""}
    </article>`;
}

function renderCalendar() {
  const startDay = new Date(2026, 8, 1).getDay();
  const days = new Date(2026, 9, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push("<div></div>");
  for (let d = 1; d <= days; d++) {
    const iso = `2026-09-${String(d).padStart(2, "0")}`;
    const hits = state.leave.filter((l) => l.status !== "Rejected" && l.start <= iso && l.end >= iso);
    cells.push(`<div class="day"><b>${d}</b>${hits.map((h) => `<div class="mark">${h.employee.split(" ").pop()}</div>`).join("")}</div>`);
  }
  return `<div class="card"><h3>September 2026</h3><div class="calendar">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => `<div class="cal-h">${d}</div>`).join("")}${cells.join("")}</div></div>`;
}

function renderJobsHr() {
  return `
    <div class="page-head"><div><h2>Job Postings</h2><p>${state.jobs.filter((j) => j.status === "Open").length} open positions</p></div>
      <button class="btn btn-primary" data-open="job">+ New Posting</button></div>
    <div class="cards">${state.jobs.map((j) => jobCard(j, true)).join("")}</div>`;
}

function renderJobsStaff() {
  const open = state.jobs.filter((j) => j.status === "Open");
  const person = me();
  return `
    <div class="page-head"><div><h2>Internal jobs</h2><p>Open UNRE vacancies you can apply for</p></div></div>
    <div class="cards">${open.map((j) => jobCard(j, false, person)).join("")}</div>`;
}

function jobCard(j, hr, person) {
  const apps = jobApps(j.id);
  const applied = person && apps.some((a) => a.employeeId === person.id || a.employee === person.name);
  const pending = apps.filter((a) => a.status === "Pending").length;
  return `
    <article class="job clickable" data-job="${j.id}" role="button" tabindex="0">
      <div class="row-between"><div class="icon-chip ic-p">${ICONS.jobs}</div>${badge(j.status)}</div>
      <h3 style="margin:12px 0 4px">${j.title}</h3><div class="meta">${j.dept}</div><p class="meta">${j.desc}</p>
      <div class="kv"><span>${j.type}</span><span>${j.band}</span><span>${j.pay}</span><span>${apps.length} applicants${hr && pending ? ` · ${pending} to review` : ""}</span></div>
      ${hr && j.status === "Draft" ? `<div class="actions"><button class="btn btn-brand" data-publish="${j.id}">Publish</button></div>` : ""}
      ${!hr && j.status === "Open" ? `<div class="actions">${applied ? `<span class="badge b-approved">Applied</span>` : `<button class="btn btn-primary" data-apply="${j.id}">Apply</button>`}</div>` : ""}
      <div class="meta hint-click">${hr ? "Open to review applicants" : "Open posting details"}</div>
    </article>`;
}

function renderLoansHr() {
  const pending = state.loans.filter((l) => l.status === "Pending");
  const rest = state.loans.filter((l) => l.status !== "Pending");
  return `
    <div class="page-head"><div><h2>Loan Approvals</h2><p>Staff file from self-service. Approved loans deduct from payroll.</p></div>
      <button class="btn btn-primary" data-open="loan">File for staff</button></div>
    <div class="stats">
      <div class="stat"><div class="k">In queue</div><div class="n">${pending.length}</div><div class="s">Need HR decision</div></div>
      <div class="stat"><div class="k">Active book</div><div class="n">${kina(state.loans.filter((l) => l.status === "Approved").reduce((s, l) => s + (l.amount - (l.repaid || 0)), 0))}</div><div class="s">Outstanding principal</div></div>
      <div class="stat"><div class="k">Policy cap</div><div class="n">40%</div><div class="s">Of annual salary</div></div>
      <div class="stat"><div class="k">Rule</div><div class="n">1</div><div class="s">Loan at a time</div></div>
    </div>
    <h3 style="margin:8px 0 10px;font-size:13px;letter-spacing:.08em;color:var(--muted)">AWAITING APPROVAL</h3>
    <div class="cards">${pending.map((l) => loanCard(l, true)).join("") || `<div class="card empty">No applications waiting.</div>`}</div>
    <h3 style="margin:22px 0 10px;font-size:13px;letter-spacing:.08em;color:var(--muted)">LEDGER</h3>
    <div class="cards">${rest.map((l) => loanCard(l, false)).join("")}</div>`;
}

function renderLoansStaff() {
  const person = me();
  const mine = state.loans.filter((l) => l.employee === person.name);
  const check = loanEligible(person, 0);
  return `
    <div class="page-head"><div><h2>My loans</h2><p>Education, housing, emergency, and salary advances. Max 40% of annual salary.</p></div>
      <button class="btn btn-primary" data-open="loan">Apply for a loan</button></div>
    <div class="card" style="margin-bottom:14px"><p class="meta">${check.ok ? "You may apply. HR will confirm policy before funds are released. Repayment is a payroll deduction." : check.reason}</p></div>
    <div class="cards">${mine.length ? mine.map((l) => loanCard(l, false)).join("") : `<div class="card empty">No loan applications yet.</div>`}</div>`;
}

function loanCard(l, canDecide) {
  const emp = state.employees.find((e) => e.name === l.employee);
  const check = emp ? loanEligible(emp, l.status === "Pending" ? l.amount : 0) : { ok: true };
  const remaining = l.amount - (l.repaid || 0);
  const pct = l.status === "Approved" ? Math.min(100, ((l.repaid || 0) / l.amount) * 100) : 0;
  const instal = l.status === "Approved" && remaining > 0 ? loanMonthly(l) : 0;
  return `
    <article class="loan"><div class="row-between"><div><strong>${l.employee}</strong><div class="meta">${l.dept} · ${l.kind}</div></div>${badge(l.status)}</div>
      <div class="kv"><span>${kina(l.amount)}</span><span>${l.term} months</span>${emp && isHr() ? `<span>Salary ${kina(emp.salary)}</span>` : ""}</div>
      <p class="meta">${l.reason}</p>
      ${l.status === "Approved" ? `<div class="bar" style="margin-top:10px"><span style="width:${pct}%"></span></div>
        <div class="meta">Repaid ${kina(l.repaid || 0)} · remaining ${kina(remaining)}${instal ? ` · payroll ${kina2(instal)}/month` : ""}</div>` : ""}
      ${canDecide && l.status === "Pending" ? `<p class="meta">${check.ok ? "Passes policy check." : check.reason}</p>
        <div class="actions"><button class="btn btn-ok" data-loan="${l.id}" data-act="Approved">Approve</button>
        <button class="btn btn-danger" data-loan="${l.id}" data-act="Rejected">Reject</button></div>` : ""}
    </article>`;
}

function renderPayrollHr() {
  const rows = state.employees.map((e) => ({ e, p: payslip(e) }));
  const net = rows.reduce((s, r) => s + r.p.net, 0);
  return `
    <div class="page-head"><div><h2>Payroll</h2><p>September 2026 register — NASFUND, PAYE, and loan deductions</p></div></div>
    <div class="stats">
      <div class="stat"><div class="k">Net payroll</div><div class="n">${kina(net)}</div><div class="s">This month</div></div>
      <div class="stat"><div class="k">NASFUND (staff 6%)</div><div class="n">${kina(rows.reduce((s, r) => s + r.p.nasfund, 0))}</div><div class="s">Employee contributions</div></div>
      <div class="stat"><div class="k">PAYE</div><div class="n">${kina(rows.reduce((s, r) => s + r.p.tax, 0))}</div><div class="s">Withholding</div></div>
      <div class="stat"><div class="k">Loan recoveries</div><div class="n">${kina(rows.reduce((s, r) => s + r.p.loan, 0))}</div><div class="s">From payslips</div></div>
    </div>
    <div class="card" style="overflow:auto">
      <table class="plain"><thead><tr><th>Staff</th><th>Gross</th><th>OT</th><th>NASFUND</th><th>PAYE</th><th>Loan</th><th>Net</th></tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r.e.name}<div class="meta">${r.e.dept}</div></td><td>${kina2(r.p.gross)}</td><td>${kina2(r.p.overtime)}</td><td>${kina2(r.p.nasfund)}</td><td>${kina2(r.p.tax)}</td><td>${kina2(r.p.loan)}</td><td><strong>${kina2(r.p.net)}</strong></td></tr>`).join("")}</tbody></table>
    </div>`;
}

function renderPayslip() {
  const person = me();
  const p = payslip(person);
  return `
    <div class="page-head"><div><h2>Payslip</h2><p>September 2026 · ${person.name}</p></div></div>
    <div class="grid-2">
      <div class="card">
        <h3>This month</h3>
        <div class="pay-row"><span>Gross (annual ÷ 12)</span><span>${kina2(p.baseGross)}</span></div>
        <div class="pay-row"><span>Approved overtime</span><span>+ ${kina2(p.overtime)}</span></div>
        <div class="pay-row"><span>NASFUND employee 6%</span><span>− ${kina2(p.nasfund)}</span></div>
        <div class="pay-row"><span>PAYE (PNG bands, simplified)</span><span>− ${kina2(p.tax)}</span></div>
        <div class="pay-row"><span>Staff loan repayment</span><span>− ${kina2(p.loan)}</span></div>
        <div class="pay-row total"><span>Net pay</span><span>${kina2(p.net)}</span></div>
      </div>
      <div class="card">
        <h3>Employer side</h3>
        <p class="meta">UNRE also remits NASFUND employer 8.4% (${kina2(p.employerNasfund)}) on your behalf. This is not taken from your net pay.</p>
        ${p.loans.length ? p.loans.map((l) => `<div class="leave-mini"><div><strong>${l.kind}</strong><div class="meta">${kina2(loanMonthly(l))} this month</div></div>${badge("Approved")}</div>`).join("") : `<p class="meta">No active loan deduction.</p>`}
      </div>
    </div>`;
}

function renderStaffHome() {
  const person = me();
  const p = payslip(person);
  const myLeave = state.leave.filter((l) => l.employee === person.name);
  const pendingL = myLeave.filter((l) => l.status === "Pending").length;
  const myLoans = state.loans.filter((l) => l.employee === person.name);
  const pendingN = myLoans.filter((l) => l.status === "Pending").length;
  const notifications = notificationsForSession();
  return `
    <div class="page-head"><div><h2>Welcome, ${person.name.split(" ").slice(-1)[0]}</h2>
      <p>${person.role} · ${person.dept} · staff self-service</p></div></div>
    <div class="stats">
      <div class="stat"><div class="k">Status</div><div class="n" style="font-size:22px">${person.status}</div><div class="s">Employment</div></div>
      <div class="stat"><div class="k">Leave with HR</div><div class="n">${pendingL}</div><div class="s">Waiting for a decision</div></div>
      <div class="stat"><div class="k">Loan with HR</div><div class="n">${pendingN}</div><div class="s">Applications in queue</div></div>
      <div class="stat"><div class="k">Net this month</div><div class="n" style="font-size:26px">${kina(p.net)}</div><div class="s">After NASFUND, PAYE, loans</div></div>
    </div>
    <div class="grid-2">
      <div class="card"><h3>Notifications</h3>
        ${notifications.length ? notifications.slice(0, 5).map((n) => `
          <div class="leave-mini notification-row">
            <div><strong>${esc(n.title || "Notification")}</strong><div class="meta">${esc(n.message || "")}</div><div class="meta">${esc(n.createdAt)}</div></div>
            <button class="btn btn-ghost" data-notification="${n.id}">View</button>
          </div>`).join("") : `<div class="empty">No new notifications.</div>`}
      </div>
      <div class="card"><h3>Quick actions</h3>
        <div class="actions"><button class="btn btn-primary" data-open="leave">Request leave</button>
        <button class="btn btn-ghost" data-open="loan">Apply for a loan</button></div>
        <p class="meta" style="margin-top:12px">HR sees every request in the office queue. You will get Approved or Rejected on this portal.</p></div>
      <div class="card"><h3>Recent leave</h3>
        ${myLeave.slice(0, 4).map((l) => `<div class="leave-mini"><div><strong>${l.type}</strong><div class="meta">${l.start} → ${l.end}</div></div>${badge(l.status)}</div>`).join("") || `<div class="empty">No leave on file.</div>`}
      </div>
    </div>`;
}

function renderProfile() {
  const person = me();
  const docs = empDocs(person.id);
  return `
    <div class="page-head"><div><h2>My profile</h2><p>Your UNRE employment record and personnel files</p></div>
      <button class="btn btn-primary" data-emp="${person.id}">Open personnel files</button></div>
    <div class="card clickable" style="max-width:560px" data-emp="${person.id}" role="button" tabindex="0">
      <div class="person-top">${employeeAvatarHtml(person)}
        <div><strong>${person.name}</strong><div class="meta">${person.role}</div></div></div>
      <div class="pay-row" style="margin-top:16px"><span>Email</span><span>${person.email}</span></div>
      <div class="pay-row"><span>Department</span><span>${person.dept}</span></div>
      <div class="pay-row"><span>Appointment</span><span>${person.type}</span></div>
      <div class="pay-row"><span>Status</span><span>${person.status}</span></div>
      <div class="pay-row total"><span>Annual salary</span><span>${kina(person.salary)}</span></div>
      <p class="meta">${docs.length} file${docs.length === 1 ? "" : "s"} on record — resume, achievement certificates, qualifications. You can view, upload, or replace them. HR sees the same files from the Employees list.</p>
      <div class="meta hint-click">Open profile modal with files</div>
    </div>`;
}

function showModal(html, wide) {
  const back = document.getElementById("modal");
  back.innerHTML = `<div class="modal${wide ? " wide" : ""}">${html}</div>`;
  back.classList.remove("hidden");
}

function fileKindOptions(selected) {
  return FILE_KINDS.map((k) => `<option${k === selected ? " selected" : ""}>${k}</option>`).join("");
}

function fileBlobUrl(doc) {
  if (doc.dataUrl) {
    const parts = String(doc.dataUrl).split(",");
    const head = parts[0] || "";
    const b64 = parts[1] || "";
    const mime = (head.match(/:(.*?);/) || [])[1] || doc.mime || "application/octet-stream";
    try {
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      return URL.createObjectURL(new Blob([arr], { type: mime }));
    } catch (_) {
      return doc.dataUrl;
    }
  }
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${esc(doc.name)}</title>
    <style>body{font-family:Georgia,serif;max-width:640px;margin:40px auto;padding:0 20px;color:#1c1917}
    .k{letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:#78716c}</style></head>
    <body><p class="k">UNRE personnel file</p><h1>${esc(doc.kind)}</h1>
    <p><strong>${esc(doc.name)}</strong></p>
    <p>${esc(doc.body || "No preview text on this file.")}</p>
    <p class="k">Filed ${esc(doc.uploadedAt)}${doc.updatedAt && doc.updatedAt !== doc.uploadedAt ? ` · updated ${esc(doc.updatedAt)}` : ""}</p></body></html>`;
  return URL.createObjectURL(new Blob([html], { type: "text/html" }));
}

function readFileData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function persistDocs() {
  try {
    save();
    return true;
  } catch (_) {
    toast("Could not save. Use a smaller file (under 1 MB).");
    return false;
  }
}

function openEmployeeModal(employeeId, fromDeptId) {
  const emp = state.employees.find((e) => e.id === employeeId);
  if (!emp) return;
  if (!isHr() && session?.employeeId !== emp.id) return;
  const docs = empDocs(emp.id);
  const edit = canEditEmpFiles(emp);
  const backDept = fromDeptId ? `<button type="button" class="link" data-dept-back="${fromDeptId}">← Back to department</button>` : "";
  const list = fileRowsHtml(docs, { edit });
  showModal(`
    ${backDept}
    <div class="person-top" style="${fromDeptId ? "margin-top:10px" : ""}">
      ${employeeAvatarHtml(emp)}
      <div><h3 style="margin:0">${emp.name}</h3><div class="meta">${emp.role}</div></div>
    </div>
    <div class="kv" style="margin-top:0"><span>${emp.role}</span><span>${emp.dept}</span><span>${emp.type}</span>${badge(emp.status)}</div>
    <p class="modal-copy">${emp.email} · annual ${kina(emp.salary)}</p>
    <h4 class="modal-sub">Personnel files</h4>
    <p class="meta">${isHr() ? "You can view, upload, and replace personnel files. Employees can manage their own files from My profile." : "You can upload or replace your personnel files. HR can view every update."}</p>
    ${list}
    ${edit ? `<form id="f-doc">
      <input type="hidden" name="employeeId" value="${emp.id}" />
      ${fromDeptId ? `<input type="hidden" name="fromDept" value="${fromDeptId}" />` : ""}
      <h4 class="modal-sub">Upload a new file</h4>
      <div class="form-grid">
        <div><label>Type</label><select name="kind">${fileKindOptions("Resume")}</select></div>
        <div><label>File</label><input type="file" name="file" id="doc-new-file" accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,image/*,application/pdf" required /></div>
      </div>
      <p class="meta">PDF, Word, or image. Max 1 MB for this demo (stored in this browser).</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close>Close</button>
        <button class="btn btn-primary" type="submit">Upload file</button>
      </div>
    </form>
    <input type="file" id="doc-replace-file" class="hidden" accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx,image/*,application/pdf" />`
    : `<div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Close</button></div>`}
  `, true);
}

function canViewDoc(doc) {
  if (!doc) return false;
  if (isHr()) return true;
  return Boolean(doc.employeeId && session?.employeeId === doc.employeeId);
}

function openFileViewer(docId, fromAppId) {
  const doc = (state.documents || []).find((d) => d.id === docId);
  if (!canViewDoc(doc)) return;
  const emp = doc.employeeId ? state.employees.find((e) => e.id === doc.employeeId) : null;
  const url = fileBlobUrl(doc);
  const isImg = (doc.mime || "").startsWith("image/") || /\.(png|jpe?g|webp|gif)$/i.test(doc.name || "");
  const backLink = fromAppId
    ? `<button type="button" class="link" data-app-back="${fromAppId}">← Back to application</button>`
    : emp
      ? `<button type="button" class="link" data-emp-back="${emp.id}">← Back to ${esc(emp.name)}</button>`
      : `<button type="button" class="link" data-close>← Close</button>`;
  const backAct = fromAppId
    ? `data-app-back="${fromAppId}"`
    : emp
      ? `data-emp-back="${emp.id}"`
      : "data-close";
  showModal(`
    ${backLink}
    <h3 style="margin-top:10px">${esc(doc.name)}</h3>
    <div class="kv" style="margin-top:0"><span>${esc(doc.kind)}</span>${emp ? `<span>${esc(emp.name)}</span>` : ""}<span>Filed ${esc(doc.uploadedAt)}</span>${doc.updatedAt ? `<span>Updated ${esc(doc.updatedAt)}</span>` : ""}</div>
    <div class="file-preview">
      ${isImg && doc.dataUrl
        ? `<img src="${doc.dataUrl}" alt="${esc(doc.name)}" />`
        : `<iframe title="${esc(doc.name)}" src="${url}"></iframe>`}
    </div>
    <div class="modal-actions">
      <button type="button" class="btn btn-ghost" ${backAct}>Back</button>
      <a class="btn btn-primary" href="${url}" target="_blank" rel="noopener">Open in new tab</a>
    </div>
  `, true);
}

async function storeUploadedFile(file, fields) {
  if (!file) { toast("Choose a file first."); return false; }
  if (file.size > FILE_MAX) { toast("File is too large. Use one under 1 MB."); return false; }
  const emp = state.employees.find((e) => e.id === fields.employeeId);
  if (!emp || !canEditEmpFiles(emp)) { toast("Only the employee can update personnel files."); return false; }
  if (fields.kind === "Profile picture" && !file.type.startsWith("image/")) {
    toast("Profile picture must be an image file.");
    return false;
  }
  let dataUrl;
  try {
    dataUrl = await readFileData(file);
  } catch (_) {
    toast("Could not read that file.");
    return false;
  }
  state.documents = state.documents || [];
  if (fields.replaceId) {
    const doc = state.documents.find((d) => d.id === fields.replaceId && d.employeeId === emp.id);
    if (!doc) { toast("File not found."); return false; }
    doc.name = file.name;
    doc.mime = file.type || "application/octet-stream";
    doc.size = file.size;
    doc.dataUrl = dataUrl;
    doc.body = "";
    doc.updatedAt = todayIso();
    if (doc.kind === "Profile picture") emp.photoDataUrl = dataUrl;
    if (!persistDocs()) return false;
    if (session?.role === "staff") {
      addFileNotification(emp, doc, "Updated");
      save();
    }
    toast(`Updated ${doc.kind} for ${emp.name}.`);
  } else {
    const doc = {
      id: uid("f"),
      employeeId: emp.id,
      kind: FILE_KINDS.includes(fields.kind) ? fields.kind : "Other",
      name: file.name,
      mime: file.type || "application/octet-stream",
      size: file.size,
      dataUrl,
      uploadedAt: todayIso(),
      updatedAt: todayIso()
    };
    if (doc.kind === "Profile picture") emp.photoDataUrl = dataUrl;
    state.documents.unshift(doc);
    if (!persistDocs()) {
      state.documents.shift();
      return false;
    }
    if (session?.role === "staff") {
      addFileNotification(emp, doc, "Uploaded");
      save();
    }
    toast(`Uploaded ${fields.kind || "file"} — HR can see it.`);
  }
  return true;
}

function openDeptModal(id) {
  const d = state.departments.find((x) => x.id === id);
  if (!d) return;
  const staff = deptStaff(d.name);
  const desc = d.description || d.blurb || "No description on file.";
  showModal(`
    <h3>${d.name}</h3>
    <div class="kv" style="margin-top:0"><span>${d.code}</span><span>${d.location}</span><span>Head: ${d.head}</span></div>
    <p class="modal-copy">${desc}</p>
    <h4 class="modal-sub">${staff.length} staff in this department</h4>
    ${staff.length ? staff.map((e) => `
      <button type="button" class="app-row" data-emp="${e.id}" data-from-dept="${d.id}">
        <div class="person-top">${employeeAvatarHtml(e)}
          <div><strong>${e.name}</strong><div class="meta">${e.role} · ${e.type} · ${empDocs(e.id).length} files</div></div></div>
        ${badge(e.status)}
      </button>`).join("") : `<div class="empty">No employees assigned yet.</div>`}
    <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Close</button></div>
  `, true);
}

function openJobModal(id) {
  const j = state.jobs.find((x) => x.id === id);
  if (!j) return;
  const apps = jobApps(j.id);
  const person = me();
  const mine = person && apps.find((a) => a.employeeId === person.id || a.employee === person.name);
  const hr = isHr();
  const list = hr
    ? (apps.length ? apps.map((a) => {
        const fit = applicationFit(j, a);
        return `
          <button type="button" class="app-row" data-app="${a.id}">
            <div class="person-top">${employeeAvatarHtml(a.employeeId ? state.employees.find((e) => e.id === a.employeeId) || a.employee : a.employee)}
              <div><strong>${a.employee}</strong>
                <div class="meta">${a.employeeId ? "Internal" : "External"} · filed ${a.at} · ${appDocs(a).length} file${appDocs(a).length === 1 ? "" : "s"}</div>
                <div class="meta">${fit.qualified ? "Likely qualifies" : "May not meet the bar"} · score ${fit.score}</div>
              </div></div>
            ${badge(a.status)}
          </button>`;
      }).join("") : `<div class="empty">No applications yet.</div>`)
    : (mine
      ? `<div class="card" style="margin:0;box-shadow:none"><p class="meta">You applied on ${mine.at}.</p>${badge(mine.status)}<p class="modal-copy">${mine.statement || ""}</p></div>`
      : `<p class="meta">You have not applied for this posting.</p>`);
  showModal(`
    <h3>${j.title}</h3>
    <div class="kv" style="margin-top:0"><span>${j.dept}</span><span>${j.type}</span><span>${j.band}</span><span>${j.pay}</span>${badge(j.status)}</div>
    <p class="modal-copy">${j.desc}</p>
    <h4 class="modal-sub">${hr ? `${apps.length} applications — open an applicant to view files, then accept or decline` : "Your application"}</h4>
    ${list}
    <div class="modal-actions">
      <button type="button" class="btn btn-ghost" data-close>Close</button>
      ${hr && j.status === "Draft" ? `<button type="button" class="btn btn-brand" data-publish="${j.id}">Publish</button>` : ""}
      ${!hr && j.status === "Open" && !mine ? `<button type="button" class="btn btn-primary" data-apply="${j.id}">Apply</button>` : ""}
    </div>
  `, true);
}

function openAppModal(id) {
  if (!isHr()) return;
  const app = (state.applications || []).find((a) => a.id === id);
  if (!app) return;
  const j = state.jobs.find((x) => x.id === app.jobId);
  const emp = app.employeeId ? state.employees.find((e) => e.id === app.employeeId) : null;
  const fit = applicationFit(j, app);
  const docs = appDocs(app);
  const contractSigned = app.contractStatus === "Signed";
  showModal(`
    <button type="button" class="link" data-job-back="${j.id}">← Back to ${j.title}</button>
    <h3 style="margin-top:10px">${app.employee}</h3>
    <div class="kv" style="margin-top:0">
      <span>${app.employeeId ? "Internal staff" : "External"}</span>
      <span>Applied ${app.at}</span>
      ${emp ? `<span>${emp.role} · ${emp.dept}</span>` : ""}
      ${badge(app.status)}
      ${contractSigned ? badge("Contract signed") : ""}
    </div>
    <div class="fit-box ${fit.qualified ? "fit-yes" : "fit-no"}">
      <div class="row-between"><strong>${fit.qualified ? "Qualifies for shortlist" : "Does not clearly qualify"}</strong><span>Score ${fit.score}/100</span></div>
      <div class="bar" style="margin:10px 0 8px"><span style="width:${fit.score}%"></span></div>
      <ul class="fit-list">${fit.reasons.map((r) => `<li>${r}</li>`).join("")}</ul>
    </div>
    <h4 class="modal-sub">Education</h4>
    <p class="modal-copy">${app.education || "Not supplied."}</p>
    <h4 class="modal-sub">Experience</h4>
    <p class="modal-copy">${app.experience || "Not supplied."}</p>
    <h4 class="modal-sub">Statement</h4>
    <p class="modal-copy">${app.statement || "No covering statement."}</p>
    ${emp ? `<p class="meta">On file: ${emp.email} · ${kina(emp.salary)} annual · ${emp.status}</p>` : ""}
    <h4 class="modal-sub">Applicant files</h4>
    <p class="meta">${emp
      ? "Personnel files from this staff record, including resume and certificates."
      : "Files submitted with this external application."}</p>
    ${fileRowsHtml(docs, { fromAppId: app.id, empty: emp ? "No personnel files on this staff record yet." : "No files were attached to this application." })}
    <div class="modal-actions">
      <button type="button" class="btn btn-ghost" data-job-back="${j.id}">Back</button>
      ${app.status === "Pending" ? `
        <button type="button" class="btn btn-danger" data-app-act="Declined" data-app-id="${app.id}">Decline</button>
        <button type="button" class="btn btn-ok" data-app-act="Accepted" data-app-id="${app.id}">Accept</button>` : ""}
      ${app.status === "Accepted" && app.employeeId && !contractSigned ? `<button type="button" class="btn btn-brand" data-contract="${app.id}">Sign contract</button>` : ""}
    </div>
  `, true);
}

function openContractModal(id) {
  if (!isHr()) return;
  const app = (state.applications || []).find((item) => item.id === id);
  const job = app && state.jobs.find((item) => item.id === app.jobId);
  const emp = app && app.employeeId ? state.employees.find((item) => item.id === app.employeeId) : null;
  if (!app || !job || !emp || app.status !== "Accepted" || app.contractStatus === "Signed") return;
  const range = jobSalaryRange(job.pay);
  const defaultSalary = range ? Math.round((range.min + range.max) / 2) : emp.salary;
  showModal(`
    <h3>Sign employment contract</h3>
    <p class="modal-copy"><strong>${esc(emp.name)}</strong> will be appointed as <strong>${esc(job.title)}</strong>.</p>
    <form id="f-contract">
      <input type="hidden" name="applicationId" value="${app.id}" />
      <div class="field"><label>New annual salary (Kina)</label><input name="salary" type="number" min="1" step="1" value="${defaultSalary}" required /></div>
      <p class="meta">${range ? `Agreed salary must be between ${kina(range.min)} and ${kina(range.max)} for the advertised range ${esc(job.pay)}.` : `The advertised pay is ${esc(job.pay)}.`}</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-close>Cancel</button>
        <button class="btn btn-primary">Sign contract with HR</button>
      </div>
    </form>
  `, true);
}

function applyToJob(jobId) {
  const person = me();
  const job = state.jobs.find((j) => j.id === jobId);
  if (!person || !job) return;
  state.applications = state.applications || [];
  if (state.applications.some((a) => a.jobId === job.id && (a.employeeId === person.id || a.employee === person.name))) return;
  state.applications.push({
    id: uid("a"),
    jobId: job.id,
    employee: person.name,
    employeeId: person.id,
    at: "2026-09-14",
    education: `${person.type} appointment at UNRE`,
    experience: `${person.role}, ${person.dept}`,
    statement: "Internal application submitted from staff self-service.",
    status: "Pending"
  });
  addNotification({
    type: "request-submitted",
    recipientRole: "hr",
    title: "New job application",
    employeeName: person.name,
    message: `${person.name} applied for ${job.title}.`,
    targetPage: "jobs"
  });
  syncApplicants(job);
  save();
  toast("Application sent to HR.");
}

function openModal(kind) {
  const back = document.getElementById("modal");
  const person = me();
  const empOpts = state.employees.map((e) => `<option value="${e.id}">${e.name}</option>`).join("");
  const deptOpts = state.departments.map((d) => `<option>${d.name}</option>`).join("");
  const rosterEmployee = state.employees[0];
  const rosterStart = todayIso();
  const rosterEnd = rosterEmployee && isTeachingRosterEmployee(rosterEmployee)
    ? addMonthsIso(rosterStart, 6)
    : addDaysIso(rosterStart, 13);
  const staffLeave = person ? `<input type="hidden" name="employee" value="${person.id}" /><p class="meta" style="margin-bottom:12px">Filing as <strong>${person.name}</strong></p>` : `<div class="field"><label>Employee</label><select name="employee">${empOpts}</select></div>`;
  const forms = {
    employee: `<h3>Add employee</h3><form class="form-grid" id="f-emp">
      <div class="span-2"><label>Full name</label><input name="name" required /></div>
      <div><label>Role</label><input name="role" required /></div>
      <div><label>Type</label><select name="type"><option>Faculty</option><option>Staff</option><option>Adjunct</option><option>Research</option></select></div>
      <div><label>Department</label><select name="dept">${deptOpts}</select></div>
      <div><label>Email</label><input name="email" type="email" required /></div>
      <div class="span-2"><label>Annual salary (Kina)</label><input name="salary" type="number" min="1" required /></div>
      <div class="span-2"><label>Profile photo</label><input type="file" name="photo" accept="image/*" /></div>
      <p class="meta span-2">They can sign in on Staff self-service with this email and password unre2026. The uploaded photo is shown in their profile and staff portal.</p>
      <div class="span-2 modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save</button></div></form>`,
    department: `<h3>Add department</h3><form id="f-dept">
      <div class="field"><label>Name</label><input name="name" required /></div>
      <div class="field"><label>Code</label><input name="code" required /></div>
      <div class="field"><label>Location</label><input name="location" required /></div>
      <div class="field"><label>Head of department</label><input name="head" required /></div>
      <div class="field"><label>Short summary</label><textarea name="blurb" rows="2"></textarea></div>
      <div class="field"><label>Full description</label><textarea name="description" rows="4"></textarea></div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save</button></div></form>`,
    leave: `<h3>${person ? "Request leave" : "New leave request"}</h3><form id="f-leave">${staffLeave}
      <div class="field"><label>Type</label><select name="type"><option>Annual</option><option>Sick</option><option>Personal</option><option>Emergency</option><option>Research</option></select></div>
      <div class="form-grid"><div><label>Start</label><input type="date" name="start" required /></div>
      <div><label>End</label><input type="date" name="end" required /></div></div>
      <div class="field" style="margin-top:12px"><label>Reason</label><textarea name="note" rows="3" required></textarea></div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Submit to HR</button></div></form>`,
    job: `<h3>New job posting</h3><form id="f-job">
      <div class="field"><label>Title</label><input name="title" required /></div>
      <div class="field"><label>Department</label><select name="dept">${deptOpts}</select></div>
      <div class="form-grid"><div><label>Appointment</label><select name="type"><option>Full-Time</option><option>Contract</option><option>Tenure-Track</option></select></div>
      <div><label>Band</label><select name="band"><option>Faculty</option><option>Staff</option><option>Adjunct</option><option>Research</option></select></div></div>
      <div class="field" style="margin-top:12px"><label>Pay range</label><input name="pay" placeholder="K48k–K55k" required /></div>
      <div class="field"><label>Description</label><textarea name="desc" rows="3" required></textarea></div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save draft</button></div></form>`,
    loan: `<h3>${person ? "Loan application" : "Staff loan application"}</h3><form id="f-loan">${staffLeave}
      <div class="field"><label>Loan type</label><select name="kind"><option>Education</option><option>Housing</option><option>Emergency</option><option>Salary advance</option></select></div>
      <div class="form-grid"><div><label>Amount (Kina)</label><input type="number" name="amount" min="500" required /></div>
      <div><label>Term (months)</label><input type="number" name="term" min="1" max="36" value="12" required /></div></div>
      <div class="field" style="margin-top:12px"><label>Purpose</label><textarea name="reason" rows="3" required></textarea></div>
      <p class="meta">If HR approves, repayments come out of your monthly payslip.</p>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Submit to HR</button></div></form>`,
    roster: `<h3>Add roster shift</h3><form id="f-roster">
      <div class="field"><label>Employee</label><select name="employeeId" id="roster-employee">${empOpts}</select></div>
      <p class="meta" id="roster-period-help">Teaching staff use a semester roster (6 months). Other employees use a two-week roster (14 days).</p>
      <div class="form-grid"><div><label>Starting date</label><input type="date" name="startDate" value="${rosterStart}" required /></div><div><label>Finishing date</label><input type="date" name="endDate" value="${rosterEnd}" required /></div></div>
      <div class="form-grid"><div><label>Break (minutes)</label><input type="number" name="breakMinutes" min="0" value="30" required /></div><div><label>Roster period</label><input id="roster-period" value="${isTeachingRosterEmployee(rosterEmployee) ? "6 months (semester)" : "14 days (two weeks)"}" readonly /></div></div>
      <div class="form-grid"><div><label>Start</label><input type="time" name="start" value="08:00" required /></div><div><label>End</label><input type="time" name="end" value="16:30" required /></div></div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save shift</button></div></form>`,
    overtime: `<h3>Record overtime</h3><form id="f-overtime">
      <div class="field"><label>Employee</label><select name="employeeId">${empOpts}</select></div>
      <div class="form-grid"><div><label>Date</label><input type="date" name="date" value="${todayIso()}" required /></div><div><label>Hours</label><input type="number" name="hours" min="0.25" step="0.25" required /></div></div>
      <div class="form-grid"><div><label>Multiplier</label><select name="multiplier"><option value="1.5">1.5× Standard OT</option><option value="2">2× Public holiday</option></select></div><div><label>Reason</label><input name="reason" required placeholder="Exam marking" /></div></div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save overtime</button></div></form>`
  };
  back.innerHTML = `<div class="modal">${forms[kind]}</div>`;
  back.classList.remove("hidden");
}

function closeModal() { document.getElementById("modal").classList.add("hidden"); }

function bindPage(page) {
  document.querySelectorAll("[data-go]").forEach((b) => { b.onclick = () => { location.hash = "#/" + b.dataset.go; }; });
  document.querySelectorAll("[data-open]").forEach((b) => { b.onclick = () => openModal(b.dataset.open); });
  document.querySelectorAll("[data-notification]").forEach((b) => { b.onclick = () => {
    const item = (state.notifications || []).find((n) => n.id === b.dataset.notification);
    if (!item) return;
    markNotificationRead(item.id);
    if (item.targetPage) location.hash = "#/" + item.targetPage;
    if (item.employeeId && item.type === "file-update") openEmployeeModal(item.employeeId);
  }; });
  document.querySelectorAll("[data-dept]").forEach((b) => {
    b.onclick = () => openDeptModal(b.dataset.dept);
    b.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDeptModal(b.dataset.dept); } };
  });
  document.querySelectorAll("[data-job]").forEach((b) => {
    const open = () => openJobModal(b.dataset.job);
    b.onclick = (e) => { if (e.target.closest("button")) return; open(); };
    b.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } };
  });
  document.querySelectorAll("#view [data-emp]").forEach((b) => {
    const open = () => openEmployeeModal(b.dataset.emp, b.dataset.fromDept);
    b.onclick = (e) => {
      if (e.target.closest("button") && e.currentTarget !== e.target.closest("button")) return;
      open();
    };
    b.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } };
  });
  document.querySelectorAll("[data-filter]").forEach((b) => { b.onclick = () => { viewMode.employees = b.dataset.filter; route(); }; });
  const s = document.getElementById("emp-search");
  if (s) s.oninput = () => { viewMode.empQ = s.value; route(); const n = document.getElementById("emp-search"); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } };
  document.querySelectorAll("[data-leave-view]").forEach((b) => { b.onclick = () => { viewMode.leave = b.dataset.leaveView; route(); }; });
  document.querySelectorAll("[data-leave]").forEach((b) => { b.onclick = () => {
    if (!isHr()) return;
    const item = state.leave.find((l) => l.id === b.dataset.leave);
    item.status = b.dataset.act;
    const emp = state.employees.find((e) => e.name === item.employee);
    if (emp) {
      emp.status = item.status === "Approved" ? "On Leave" : "Active";
      addNotification({
        type: "request-status",
        employeeId: emp.id,
        title: `Leave ${item.status.toLowerCase()}`,
        message: `Your ${item.type.toLowerCase()} leave request for ${item.start} to ${item.end} was ${item.status.toLowerCase()}.`,
        targetPage: "leave"
      });
    }
    save(); toast(`Leave ${item.status.toLowerCase()} for ${item.employee}.`); route();
  }; });
  document.querySelectorAll("[data-publish]").forEach((b) => { b.onclick = (e) => {
    e.stopPropagation();
    state.jobs.find((j) => j.id === b.dataset.publish).status = "Open";
    save(); toast("Posting is now open."); route();
  }; });
  document.querySelectorAll("[data-apply]").forEach((b) => { b.onclick = (e) => {
    e.stopPropagation();
    applyToJob(b.dataset.apply);
    route();
  }; });
  document.querySelectorAll("[data-loan]").forEach((b) => { b.onclick = () => {
    if (!isHr()) return;
    const item = state.loans.find((l) => l.id === b.dataset.loan);
    const emp = state.employees.find((e) => e.name === item.employee);
    if (b.dataset.act === "Approved") {
      const check = loanEligible(emp, item.amount);
      if (!check.ok) { toast(check.reason); return; }
      item.repaid = item.repaid || 0;
    }
    item.status = b.dataset.act;
    addNotification({
      type: "request-status",
      employeeId: emp.id,
      title: `Loan ${item.status.toLowerCase()}`,
      message: `Your ${item.kind.toLowerCase()} loan application for ${kina(item.amount)} was ${item.status.toLowerCase()}.`,
      targetPage: "loans"
    });
    save(); toast(`Loan ${item.status.toLowerCase()} for ${item.employee}.`); route();
  }; });
}

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal" || e.target.closest("[data-close]")) { closeModal(); return; }
  const empBack = e.target.closest("[data-emp-back]");
  if (empBack) { openEmployeeModal(empBack.dataset.empBack); return; }
  const appBack = e.target.closest("[data-app-back]");
  if (appBack) { openAppModal(appBack.dataset.appBack); return; }
  const deptBack = e.target.closest("[data-dept-back]");
  if (deptBack) { openDeptModal(deptBack.dataset.deptBack); return; }
  const empBtn = e.target.closest("[data-emp]");
  if (empBtn) { openEmployeeModal(empBtn.dataset.emp, empBtn.dataset.fromDept); return; }
  const viewFile = e.target.closest("[data-file-view]");
  if (viewFile) { openFileViewer(viewFile.dataset.fileView, viewFile.dataset.fromApp); return; }
  const replace = e.target.closest("[data-file-replace]");
  if (replace) {
    const input = document.getElementById("doc-replace-file");
    if (!input) return;
    input.dataset.replaceId = replace.dataset.fileReplace;
    input.click();
    return;
  }
  const back = e.target.closest("[data-job-back]");
  if (back) { openJobModal(back.dataset.jobBack); return; }
  const decide = e.target.closest("[data-app-act]");
  if (decide) {
    if (!isHr()) return;
    const app = state.applications.find((a) => a.id === decide.dataset.appId);
    if (!app || app.status !== "Pending") return;
    const job = state.jobs.find((j) => j.id === app.jobId);
    app.status = decide.dataset.appAct;
    if (app.employeeId) {
      addNotification({
        type: "request-status",
        employeeId: app.employeeId,
        title: `Job application ${app.status.toLowerCase()}`,
        message: `Your application for ${job ? job.title : "the internal job"} was ${app.status.toLowerCase()}.`,
        targetPage: "jobs"
      });
    }
    save();
    toast(`${app.employee} ${app.status.toLowerCase()} for this posting.`);
    route();
    openJobModal(app.jobId);
    return;
  }
  const appBtn = e.target.closest("[data-app]");
  if (appBtn) { openAppModal(appBtn.dataset.app); return; }
  const pub = e.target.closest("[data-publish]");
  if (pub) {
    state.jobs.find((j) => j.id === pub.dataset.publish).status = "Open";
    save(); toast("Posting is now open."); route(); openJobModal(pub.dataset.publish); return;
  }
  const apply = e.target.closest("[data-apply]");
  if (apply) { applyToJob(apply.dataset.apply); route(); openJobModal(apply.dataset.apply); }
  const contract = e.target.closest("[data-contract]");
  if (contract) { openContractModal(contract.dataset.contract); }
});
document.getElementById("modal").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  if (form.id === "f-contract") {
    if (!isHr()) return;
    const app = (state.applications || []).find((item) => item.id === data.applicationId);
    const job = app && state.jobs.find((item) => item.id === app.jobId);
    const emp = app && app.employeeId ? state.employees.find((item) => item.id === app.employeeId) : null;
    const salary = Number(data.salary);
    const range = jobSalaryRange(job?.pay);
    if (!app || !job || !emp || app.status !== "Accepted" || app.contractStatus === "Signed") {
      toast("This employment offer is no longer available.");
      return;
    }
    if (!Number.isFinite(salary) || salary <= 0 || (range && (salary < range.min || salary > range.max))) {
      toast(range ? `Salary must be between ${kina(range.min)} and ${kina(range.max)}.` : "Enter a valid annual salary.");
      return;
    }
    const previousDept = state.departments.find((item) => item.name === emp.dept);
    const nextDept = state.departments.find((item) => item.name === job.dept);
    if (previousDept && previousDept !== nextDept) previousDept.members = Math.max(0, (previousDept.members || 0) - 1);
    if (nextDept && previousDept !== nextDept) nextDept.members = (nextDept.members || 0) + 1;
    emp.role = job.title;
    emp.salary = salary;
    emp.dept = job.dept;
    emp.type = job.band;
    app.contractStatus = "Signed";
    app.contractSalary = salary;
    app.contractSignedAt = todayIso();
    addNotification({
      type: "request-status",
      employeeId: emp.id,
      title: "Employment contract signed",
      message: `Your contract for ${job.title} is signed. Your annual salary is ${kina(salary)}.`,
      targetPage: "profile"
    });
    save();
    closeModal();
    toast(`${emp.name}'s contract is signed. Role and payslip updated.`);
    route();
    return;
  }
  if (form.id === "f-doc") {
    const file = form.querySelector("#doc-new-file")?.files[0];
    const ok = await storeUploadedFile(file, { employeeId: data.employeeId, kind: data.kind });
    if (ok) { route(); openEmployeeModal(data.employeeId, data.fromDept); }
    return;
  }
  if (form.id === "f-emp") {
    const file = form.querySelector('input[name="photo"]')?.files[0];
    const employee = { id: uid("e"), name: data.name, role: data.role, type: data.type, dept: data.dept, email: data.email.toLowerCase(), status: "Active", salary: Number(data.salary), password: DEMO_PASS };
    if (file) {
      if (file.size > FILE_MAX) { toast("Profile photo is too large. Use one under 1 MB."); return; }
      try {
        employee.photoDataUrl = await readFileData(file);
        state.documents = state.documents || [];
        state.documents.unshift({
          id: uid("f"),
          employeeId: employee.id,
          kind: "Profile picture",
          name: file.name,
          mime: file.type || "image/png",
          size: file.size,
          dataUrl: employee.photoDataUrl,
          uploadedAt: todayIso(),
          updatedAt: todayIso()
        });
      } catch (_) {
        toast("Could not read the profile photo.");
        return;
      }
    }
    state.employees.push(employee);
    const d = state.departments.find((x) => x.name === data.dept);
    if (d) d.members += 1;
    fillStaffSelect();
    toast("Employee added. They can use staff self-service.");
  }
  if (form.id === "f-dept") {
    state.departments.push({ id: uid("d"), name: data.name, code: data.code.toUpperCase(), blurb: data.blurb, description: data.description || data.blurb, members: 0, location: data.location, head: data.head });
    toast("Department added.");
  }
  if (form.id === "f-leave") {
    const emp = state.employees.find((x) => x.id === data.employee);
    if (session.role === "staff" && emp.id !== session.employeeId) { toast("You can only file your own leave."); return; }
    const request = { id: uid("l"), employee: emp.name, dept: emp.dept, type: data.type, start: data.start, end: data.end, note: data.note, status: "Pending" };
    state.leave.unshift(request);
    addNotification({
      type: "request-submitted",
      recipientRole: "hr",
      title: "New leave request",
      employeeName: emp.name,
      message: `${emp.name} submitted ${data.type.toLowerCase()} leave for ${data.start} to ${data.end}.`,
      targetPage: "leave"
    });
    toast("Leave submitted to HR.");
  }
  if (form.id === "f-job") {
    if (!isHr()) return;
    state.jobs.unshift({ id: uid("j"), title: data.title, dept: data.dept, status: "Draft", desc: data.desc, type: data.type, band: data.band, pay: data.pay, applicants: 0 });
    toast("Draft posting saved.");
  }
  if (form.id === "f-loan") {
    const emp = state.employees.find((x) => x.id === data.employee);
    if (session.role === "staff" && emp.id !== session.employeeId) { toast("You can only apply for your own loan."); return; }
    const amount = Number(data.amount);
    const check = loanEligible(emp, amount);
    if (!check.ok && state.loans.some((l) => l.employee === emp.name && l.status === "Approved" && (l.amount - (l.repaid || 0)) > 0)) {
      toast(check.reason); return;
    }
    state.loans.unshift({ id: uid("n"), employee: emp.name, dept: emp.dept, kind: data.kind, amount, term: Number(data.term), reason: data.reason, status: "Pending", salary: emp.salary });
    addNotification({
      type: "request-submitted",
      recipientRole: "hr",
      title: "New loan application",
      employeeName: emp.name,
      message: `${emp.name} submitted a ${data.kind.toLowerCase()} loan application for ${kina(amount)}.`,
      targetPage: "loans"
    });
    toast("Loan application submitted to HR.");
  }
  if (form.id === "f-roster") {
    if (data.endDate < data.startDate) {
      toast("Finishing date must be on or after the starting date.");
      return;
    }
    const employee = state.employees.find((item) => item.id === data.employeeId);
    const expectedEnd = isTeachingRosterEmployee(employee)
      ? addMonthsIso(data.startDate, 6)
      : addDaysIso(data.startDate, 13);
    if (data.endDate !== expectedEnd) {
      toast(isTeachingRosterEmployee(employee)
        ? "Lecturer and tutor rosters must cover exactly six months."
        : "This employee's roster must cover exactly two weeks.");
      return;
    }
    rosterRecords().unshift({
      id: uid("r"),
      employeeId: data.employeeId,
      startDate: data.startDate,
      endDate: data.endDate,
      start: data.start,
      end: data.end,
      breakMinutes: Number(data.breakMinutes)
    });
    toast("Roster shift saved.");
  }
  if (form.id === "f-overtime") {
    overtimeRecords().unshift({
      id: uid("ot"),
      employeeId: data.employeeId,
      date: data.date,
      hours: Number(data.hours),
      multiplier: Number(data.multiplier),
      reason: data.reason
    });
    toast("Overtime saved and included in payroll.");
  }
  save();
  closeModal();
  route();
});

document.getElementById("modal").addEventListener("change", async (e) => {
  if (e.target.id === "roster-employee" || e.target.name === "startDate") {
    const employeeId = document.getElementById("roster-employee")?.value;
    const employee = state.employees.find((item) => item.id === employeeId);
    const start = document.querySelector('#f-roster [name="startDate"]');
    const end = document.querySelector('#f-roster [name="endDate"]');
    const period = document.getElementById("roster-period");
    const help = document.getElementById("roster-period-help");
    if (employee && start && end) {
      const teaching = isTeachingRosterEmployee(employee);
      end.value = teaching ? addMonthsIso(start.value, 6) : addDaysIso(start.value, 13);
      if (period) period.value = teaching ? "6 months (semester)" : "14 days (two weeks)";
      if (help) help.textContent = teaching
        ? "Lecturers and tutors are rostered for the semester. The default period is 6 months."
        : "This employee uses a two-week roster. HR can set a different finishing date when needed.";
    }
    return;
  }
  if (e.target.id !== "doc-replace-file") return;
  const file = e.target.files[0];
  const replaceId = e.target.dataset.replaceId;
  const doc = (state.documents || []).find((d) => d.id === replaceId);
  if (!doc) return;
  const fromDept = document.querySelector("#f-doc [name=fromDept]")?.value;
  const ok = await storeUploadedFile(file, { employeeId: doc.employeeId, replaceId });
  e.target.value = "";
  if (ok) { route(); openEmployeeModal(doc.employeeId, fromDept); }
});

function fillStaffSelect() {
  const sel = document.getElementById("staff-email");
  sel.innerHTML = state.employees.map((e) => `<option value="${e.id}">${e.name} — ${e.email}</option>`).join("");
}

function setPortal(kind) {
  viewMode.portal = kind;
  document.querySelectorAll("[data-portal]").forEach((b) => b.classList.toggle("on", b.dataset.portal === kind));
  document.getElementById("hr-email-field").classList.toggle("hidden", kind !== "hr");
  document.getElementById("staff-email-field").classList.toggle("hidden", kind !== "staff");
  document.getElementById("login-title").textContent = kind === "hr" ? "HR sign in" : "Staff sign in";
  document.getElementById("login-lede").textContent = kind === "hr"
    ? "Approve leave, loans, payroll, and recruitment for the university."
    : "File leave and loans, see your payslip, and apply for internal jobs.";
  document.getElementById("login-btn").textContent = kind === "hr" ? "Enter HR office" : "Enter self-service";
  document.getElementById("login-hint").innerHTML = kind === "hr"
    ? `HR demo: <strong>hr@unre.ac.pg</strong> / <strong>${DEMO_PASS}</strong>`
    : `Any staff in the list, password <strong>${DEMO_PASS}</strong>. Try David Park for a pending leave.`;
}

document.querySelectorAll("[data-portal]").forEach((b) => { b.onclick = () => setPortal(b.dataset.portal); });

function showApp() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  document.body.classList.toggle("role-staff", session.role === "staff");
  document.body.classList.toggle("role-hr", session.role === "hr");
  document.getElementById("acting-label").textContent = session.role === "hr" ? "HR office · signed in as" : "Staff self-service · signed in as";
  document.getElementById("actor-pill").textContent = session.label;
  updateNotificationControl();
  document.getElementById("side-title").textContent = session.role === "hr" ? "UNRE HR" : "UNRE Staff";
  document.getElementById("side-sub").textContent = session.role === "hr" ? "Natural Resources & Environment" : "Self-service portal";
  location.hash = session.role === "hr" ? "#/dashboard" : "#/home";
  renderNav();
  route();
}

document.getElementById("file-notifications").addEventListener("click", () => {
  location.hash = "#/dashboard";
});
window.addEventListener("storage", (e) => {
  if (e.key !== KEY || !e.newValue) return;
  try {
    state = JSON.parse(e.newValue);
    if (session) {
      updateNotificationControl();
      route();
    }
  } catch (_) {
    toast("Could not refresh employee file updates.");
  }
});

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  if (viewMode.portal === "hr") {
    const email = document.getElementById("email").value.trim().toLowerCase();
    if (email !== "hr@unre.ac.pg" || password !== DEMO_PASS) {
      toast("HR sign-in is hr@unre.ac.pg / unre2026.");
      return;
    }
    session = { role: "hr", email, label: "hr@unre.ac.pg" };
  } else {
    const emp = state.employees.find((x) => x.id === document.getElementById("staff-email").value);
    if (!emp || password !== (emp.password || DEMO_PASS)) {
      toast("Use a listed staff member and password unre2026.");
      return;
    }
    session = { role: "staff", employeeId: emp.id, email: emp.email, label: emp.name };
  }
  sessionStorage.setItem("unre-session", JSON.stringify(session));
  showApp();
});

document.getElementById("logout").addEventListener("click", () => {
  session = null;
  sessionStorage.removeItem("unre-session");
  sessionStorage.removeItem("unre-user");
  document.body.classList.remove("role-staff", "role-hr");
  document.getElementById("app").classList.add("hidden");
  document.getElementById("auth").classList.remove("hidden");
  location.hash = "";
});

window.addEventListener("hashchange", route);
fillStaffSelect();
try {
  const saved = JSON.parse(sessionStorage.getItem("unre-session") || "null");
  if (saved?.role) { session = saved; showApp(); }
} catch (_) {}
