const ICONS = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  analytics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V4M4 20h17"/><path d="m7 15 4-4 3 2 6-7"/><path d="M17 6h3v3"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><path d="M3 20c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><circle cx="17" cy="9" r="2.4"/><path d="M16.2 15.2c2.4.3 4.3 1.7 4.8 4.3"/></svg>',
  depts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20V8l8-4 8 4v12"/><path d="M9 20v-6h6v6"/></svg>',
  leave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>',
  jobs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/><path d="m6 8 1 1 2-2"/></svg>',
  loans: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20M12 14h.01"/></svg>',
  pay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M7 8h7a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h9"/></svg>',
  me: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c1-3.5 3.8-5.2 7-5.2S18 16.5 19 20"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M14 3v6h6"/></svg>'
  ,attendance: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h3M8 16h3"/><path d="m14 15 2 2 4-5"/></svg>'
};

const NAV_HR = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard", section: "Overview" },
  { id: "analytics", label: "Analytics", icon: "analytics", section: "Overview" },
  { id: "employees", label: "Employees", icon: "people", section: "People" },
  { id: "departments", label: "Departments", icon: "depts", section: "People" },
  { id: "tasks", label: "Task Management", icon: "tasks", section: "People" },
  { id: "leave", label: "Leave Requests", icon: "leave", section: "Time & attendance" },
  { id: "attendance", label: "Attendance", icon: "attendance", section: "Time & attendance" },
  { id: "roster", label: "Roster & OT", icon: "jobs", section: "Time & attendance" },
  { id: "jobs", label: "Recruitment", icon: "jobs", section: "Talent & pay" },
  { id: "loans", label: "Loan Approvals", icon: "loans", section: "Talent & pay" },
  { id: "payroll", label: "Payroll", icon: "pay", section: "Talent & pay" }
];

const NAV_STAFF = [
  { id: "home", label: "My workspace", icon: "dashboard", section: "My workspace" },
  { id: "profile", label: "My profile", icon: "me", section: "My workspace" },
  { id: "tasks", label: "My tasks", icon: "tasks", section: "My workspace" },
  { id: "leave", label: "My leave", icon: "leave", section: "Requests" },
  { id: "loans", label: "My loans", icon: "loans", section: "Requests" },
  { id: "attendance", label: "Attendance", icon: "attendance", section: "Requests" },
  { id: "payslip", label: "Payslip", icon: "pay", section: "Career & pay" },
  { id: "jobs", label: "Internal jobs", icon: "jobs", section: "Career & pay" }
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
  ],
  attendance: [
    { id: "at1", employeeId: "e1", date: "2026-09-14", status: "Present", note: "Campus attendance" },
    { id: "at2", employeeId: "e6", date: "2026-09-14", status: "Present", note: "Campus attendance" },
    { id: "at3", employeeId: "e7", date: "2026-09-14", status: "On Leave", note: "Approved leave" },
    { id: "at4", employeeId: "e10", date: "2026-09-14", status: "Present", note: "Campus attendance" }
  ],
  tasks: [
    { id: "t1", title: "Prepare September payroll review", description: "Confirm employee changes and allowances before payroll sign-off.", employeeId: "e10", status: "In Progress", priority: "High", startDate: "2026-09-21", dueDate: "2026-09-30" },
    { id: "t2", title: "Update laboratory safety files", description: "Collect the current safety certificates for Biology laboratory staff.", employeeId: "e11", status: "New", priority: "Normal", startDate: "2026-09-25", dueDate: "2026-10-05" },
    { id: "t3", title: "Review annual leave balances", description: "Check approved leave records against the current staff register.", employeeId: "e10", status: "Pending", priority: "Normal", startDate: "2026-09-14", dueDate: "2026-09-25" },
    { id: "t4", title: "Submit field research progress summary", description: "Prepare a concise update for the Computer Science applied research meeting.", employeeId: "e12", status: "Done", priority: "Low", startDate: "2026-09-10", dueDate: "2026-09-20" }
  ]
};

const KEY = "unre-hr-v4";
const DEMO_PASS = "unre2026";
const configuredApiBase = document.querySelector("meta[name='unre-api-base']")?.content;
// Directly opened files have no API origin, so use the local demo automatically.
// GitHub Pages is static hosting, so it can only use the browser demo unless
// an API base is explicitly configured.
let DEMO_MODE = new URLSearchParams(location.search).get("demo") === "1" ||
  location.protocol === "file:" ||
  (location.hostname.endsWith(".github.io") && !configuredApiBase) ||
  localStorage.getItem("unre-demo-mode") === "true";
const API_BASE = (configuredApiBase || "/api").replace(/\/$/, "");
let csrfToken = null;
let state = load();
let viewMode = {
  employees: "All", employeeStatus: "All", employeeDept: "All", employeeView: "cards", employeePage: 1,
  leave: "list", leaveQuery: "", leaveStatus: "All", leaveType: "All", leavePage: 1,
  leaveMonth: "", portal: "hr", attendanceMonth: todayIso().slice(0, 7),
  attendanceQuery: "", attendanceDept: "All", attendanceDate: todayIso(), payrollPeriod: todayIso().slice(0, 7),
  taskView: "board", taskQuery: "", taskStatus: "All", taskDept: "All", taskMonth: todayIso().slice(0, 7),
  payrollQuery: "", payrollRange: "Monthly", payrollSummaryYear: todayIso().slice(0, 4),
  payrollCompanyYear: todayIso().slice(0, 4), recruitQuery: "", recruitStatus: "All",
  recruitJob: "All", recruitPage: 1, dashboardYear: todayIso().slice(0, 4),
  analyticsYear: todayIso().slice(0, 4), analyticsRows: []
};
let session = null;

const FILE_KINDS = ["Resume", "Achievement certificate", "Qualification", "ID / appointment letter", "Profile picture", "Other"];
const FILE_MAX = 1200000;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (!Array.isArray(data.notifications)) data.notifications = [];
      if (!Array.isArray(data.attendance)) data.attendance = structuredClone(SEED.attendance);
      if (!Array.isArray(data.tasks)) data.tasks = structuredClone(SEED.tasks);
      if (!Array.isArray(data.payroll)) data.payroll = [];
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
function save() { if (DEMO_MODE) localStorage.setItem(KEY, JSON.stringify(state)); }
async function apiRequest(path, options = {}) {
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = { Accept: "application/json", ...(options.body && !isFormData ? { "Content-Type": "application/json" } : {}), ...(options.headers || {}) };
  if (csrfToken && !["GET", "HEAD"].includes((options.method || "GET").toUpperCase())) headers["X-CSRF-Token"] = csrfToken;
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { credentials: "same-origin", ...options, headers });
  } catch (error) {
    throw new Error(`Could not reach the UNRE HR backend. Start it with "npm start" and open http://localhost:3000. For a browser-only demo, open index.html?demo=1. ${error.message}`);
  }
  let payload = null;
  try { payload = await response.json(); } catch (_) {}
  if (!response.ok) throw new Error(payload?.error || `Request failed (${response.status})`);
  return payload;
}
function fromApiEmployee(row) {
  return { id: row.id, employeeNumber: row.employee_number, name: row.name, role: row.role,
    type: row.employee_type || "Staff", dept: row.department_name || "", departmentId: row.department_id,
    email: row.email, status: row.status, salary: Number(row.annual_salary || 0), phone: row.phone,
    hiredOn: row.hired_on?.slice(0, 10) || "" };
}
function fromApiLeave(row) {
  const employee = state.employees.find((item) => item.id === row.employee_id);
  return { id: row.id, employee: employee?.name || row.employee_name, employeeId: row.employee_id,
    dept: employee?.dept || "", type: row.leave_type, start: row.starts_on?.slice(0, 10),
    end: row.ends_on?.slice(0, 10), note: row.note || "", status: row.status };
}
function fromApiAttendance(row) {
  return { id: row.id, employeeId: row.employee_id, date: row.attendance_date?.slice(0, 10),
    status: row.status, note: row.note || "" };
}
function fromApiLoan(row) {
  const employee = state.employees.find((item) => item.id === row.employee_id);
  return { id: row.id, employee: employee?.name || row.employee_name, employeeId: row.employee_id,
    dept: employee?.dept || "", kind: row.purpose || "Staff loan", amount: Number(row.amount),
    term: Number(row.term_months), reason: row.purpose || "", repaid: Number(row.repaid || 0), status: row.status };
}
function fromApiPayroll(row) {
  return { id: row.id, employeeId: row.employee_id, employee: row.employee_name, department: row.department_name || "",
    period: row.period?.slice(0, 10), payDate: row.pay_date?.slice(0, 10),
    basicSalary: Number(row.basic_salary || row.gross), housingAllowance: Number(row.housing_allowance || 0),
    bonus: Number(row.bonus || 0), overtime: Number(row.overtime || 0),
    gross: Number(row.gross), nasfund: Number(row.nasfund), tax: Number(row.paye),
    loan: Number(row.loan_recovery), otherDeductions: Number(row.other_deductions || 0),
    net: Number(row.net), totalDays: Number(row.total_days || 0), workingDays: Number(row.working_days || 0),
    status: row.status || "Completed" };
}
function fromApiTask(row) {
  const employee = state.employees.find((item) => item.id === row.employee_id);
  return { id: row.id, title: row.title, description: row.description || "", employeeId: row.employee_id,
    employee: employee?.name || row.employee_name || "Unassigned", dept: employee?.dept || row.department_name || "",
    status: row.status, priority: row.priority || "Normal", startDate: row.start_date?.slice(0, 10) || "",
    dueDate: row.due_date?.slice(0, 10) || "" };
}
function fromApiJob(row) {
  const department = state.departments.find((item) => item.id === row.department_id);
  return { id: row.id, title: row.title, dept: department?.name || row.department_name || "",
    departmentId: row.department_id, status: row.status, desc: row.description || "",
    type: row.appointment_type || "Full-Time", band: row.employee_type || "Staff",
    pay: row.salary_range || "", location: row.location || "", closesOn: row.closes_on?.slice(0, 10) || "", applicants: 0 };
}
function fromApiApplication(row) {
  const employee = state.employees.find((item) => item.id === row.employee_id);
  return { id: row.id, jobId: row.job_id, employeeId: row.employee_id, employee: employee?.name || row.applicant_name,
    at: row.created_at?.slice(0, 10) || todayIso(), education: row.education || "",
    email: row.applicant_email || "", experience: row.experience || "", statement: row.statement || "", status: row.status,
    interviewAt: row.interview_at ? dateTimeLocalValue(row.interview_at) : "",
    contractSalary: row.agreed_salary ? Number(row.agreed_salary) : undefined,
    contractStatus: row.status === "Contract signed" ? "Signed" : undefined };
}
function dateTimeLocalValue(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  const pad = (part) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
function fromApiDocument(row) {
  return { id: row.id, employeeId: row.employee_id, applicationId: row.application_id,
    kind: row.kind, name: row.filename, mime: row.content_type || "", size: Number(row.size_bytes || 0),
    uploadedAt: row.created_at?.slice(0, 10) || todayIso(), updatedAt: row.created_at?.slice(0, 10) || todayIso(),
    storageKey: row.storage_key };
}
function fromApiNotification(row) {
  return { id: row.id, title: row.title, message: row.body, createdAt: row.created_at?.slice(0, 10) || todayIso(),
    read: Boolean(row.read_at), recipientRole: session?.role };
}
async function loadCoreFromApi() {
  const requests = [
    apiRequest("/employees"), DEMO_MODE || session?.role === "staff" ? Promise.resolve({ data: [] }) : apiRequest("/departments"),
    apiRequest("/attendance"), apiRequest("/loans"), apiRequest("/payroll")
  ];
  const [employees, departments, attendance, loans, payroll] = await Promise.all(requests);
  const leave = await apiRequest("/leave");
  const [jobs, applications, documents, notifications, tasks] = await Promise.all([
    apiRequest("/jobs"), apiRequest("/applications"), apiRequest("/documents"), apiRequest("/notifications"), apiRequest("/tasks")
  ]);
  state.employees = (employees.data || []).map(fromApiEmployee);
  state.departments = (departments.data || []).map((row) => ({
    id: row.id, name: row.name, code: row.code, description: row.description || "",
    blurb: row.description || "", location: row.location || "", head: row.head_employee_id || ""
  }));
  state.leave = (leave.data || []).map(fromApiLeave);
  state.attendance = (attendance.data || []).map(fromApiAttendance);
  state.loans = (loans.data || []).map(fromApiLoan);
  state.payroll = (payroll.data || []).map(fromApiPayroll);
  state.jobs = (jobs.data || []).map(fromApiJob);
  state.applications = (applications.data || []).map(fromApiApplication);
  state.documents = (documents.data || []).map(fromApiDocument);
  state.notifications = (notifications.data || []).map(fromApiNotification);
  state.tasks = (tasks.data || []).map(fromApiTask);
}
async function refreshCoreAfterApi() {
  if (!DEMO_MODE) { await loadCoreFromApi(); route(); }
}
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
async function markNotificationRead(id) {
  const item = (state.notifications || []).find((n) => n.id === id);
  if (!item) return;
  item.read = true;
  if (!DEMO_MODE) {
    try { await apiRequest(`/notifications/${id}/read`, { method: "POST" }); } catch (error) { toast(error.message); return; }
  }
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
  const map = { Pending: "b-pending", Approved: "b-approved", Completed: "b-approved", Rejected: "b-rejected", Active: "b-active", Inactive: "b-closed", "On Leave": "b-leave", Open: "b-open", Draft: "b-draft", Closed: "b-closed", Expired: "b-closed", Accepted: "b-approved", Shortlisted: "b-open", Interviewed: "b-leave", Declined: "b-rejected", "Contract signed": "b-approved", New: "b-draft", "In Progress": "b-open", Done: "b-approved" };
  return `<span class="badge ${map[status] || "b-draft"}">${esc(status)}</span>`;
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
function todayIso() {
  const date = new Date();
  const pad = (part) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
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
function jobExpired(job) {
  return job.status === "Open" && Boolean(job.closesOn) && job.closesOn < todayIso();
}
function jobAccepting(job) {
  return job.status === "Open" && !jobExpired(job);
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
function monthDateRange(period) {
  const [year, month] = period.split("-").map(Number);
  const days = new Date(year, month, 0).getDate();
  return { start: `${period}-01`, end: `${period}-${String(days).padStart(2, "0")}`, days };
}
function workingDaysInMonth(period) {
  const { days } = monthDateRange(period);
  const [year, month] = period.split("-").map(Number);
  let workingDays = 0;
  for (let day = 1; day <= days; day += 1) {
    const weekday = new Date(year, month - 1, day).getDay();
    if (weekday !== 0 && weekday !== 6) workingDays += 1;
  }
  return workingDays;
}
function payrollWeekStart(value) {
  const date = new Date(`${value}T00:00:00`);
  date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function roundCurrency(amount) {
  return Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
}
function payslip(emp, period = viewMode.payrollPeriod, adjustments = {}) {
  const basicGross = roundCurrency(adjustments.basicSalary ?? emp.salary / 12);
  const housingAllowance = roundCurrency(adjustments.housingAllowance || 0);
  const bonus = roundCurrency(adjustments.bonus || 0);
  const otherDeductions = roundCurrency(adjustments.otherDeductions || 0);
  const overtime = roundCurrency(overtimeRecords().filter((entry) =>
    entry.employeeId === emp.id && String(entry.date || "").slice(0, 7) === period
  ).reduce((sum, entry) => sum + overtimePay(entry), 0));
  const gross = roundCurrency(basicGross + housingAllowance + bonus + overtime);
  const nasfund = roundCurrency(basicGross * 0.06);
  const employerNasfund = roundCurrency(basicGross * 0.084);
  const annual = (basicGross + housingAllowance + bonus + overtime) * 12;
  let annualTax = 0;
  if (annual > 17500) {
    const t = annual - 17500;
    if (t <= 25000) annualTax = t * 0.22;
    else if (t <= 82500) annualTax = 25000 * 0.22 + (t - 25000) * 0.3;
    else annualTax = 25000 * 0.22 + 57500 * 0.3 + (t - 82500) * 0.35;
  }
  const tax = roundCurrency(annualTax / 12);
  const loans = state.loans.filter((l) => l.employee === emp.name && l.status === "Approved" && (l.amount - (l.repaid || 0)) > 0);
  const loan = roundCurrency(loans.reduce((s, l) => s + loanMonthly(l), 0));
  const net = roundCurrency(gross - nasfund - tax - loan - otherDeductions);
  return { gross, baseGross: basicGross, basicSalary: basicGross, overtime, housingAllowance, bonus, otherDeductions,
    nasfund, employerNasfund, tax, loan, net, loans };
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

function shiftMonthIso(iso, amount) {
  const [year, month] = iso.split("-").map(Number);
  const date = new Date(year, month - 1 + amount, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
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

function attendanceRecords() {
  if (!Array.isArray(state.attendance)) state.attendance = [];
  return state.attendance;
}

function attendanceFor(employeeId, date) {
  return attendanceRecords().find((entry) => entry.employeeId === employeeId && entry.date === date);
}

function syncLeaveAttendance() {
  const records = attendanceRecords();
  state.leave.forEach((leave) => {
    const employee = state.employees.find((item) => item.name === leave.employee);
    if (!employee) return;
    if (leave.status === "Approved") {
      for (let date = leave.start; date <= leave.end; date = addDaysIso(date, 1)) {
        const existing = attendanceFor(employee.id, date);
        if (existing && existing.source !== "leave") continue;
        const record = existing || { id: uid("at"), employeeId: employee.id, date };
        record.status = "On Leave";
        record.note = `Approved ${leave.type.toLowerCase()} leave`;
        record.source = "leave";
        record.leaveId = leave.id;
        if (!existing) records.push(record);
      }
    } else {
      for (let index = records.length - 1; index >= 0; index -= 1) {
        if (records[index].source === "leave" && records[index].leaveId === leave.id) records.splice(index, 1);
      }
    }
  });
}

function syncEmploymentStatuses() {
  state.employees.forEach((employee) => {
    const onApprovedLeave = state.leave.some((leave) =>
      leave.employee === employee.name &&
      leave.status === "Approved" &&
      leave.start <= todayIso() &&
      leave.end >= todayIso()
    );
    if (onApprovedLeave) employee.status = "On Leave";
    else if (employee.status === "On Leave") employee.status = "Active";
  });
}

function reconcileHrRecords() {
  syncLeaveAttendance();
  syncEmploymentStatuses();
}

function renderAttendance() {
  const date = viewMode.attendanceDate || todayIso();
  const month = viewMode.attendanceMonth || date.slice(0, 7);
  const [year, monthNumber] = month.split("-").map(Number);
  const days = new Date(year, monthNumber, 0).getDate();
  const query = (viewMode.attendanceQuery || "").trim().toLowerCase();
  const selectedEmployees = state.employees.filter((employee) =>
    (!query || `${employee.name} ${employee.dept} ${employee.role}`.toLowerCase().includes(query)) &&
    (viewMode.attendanceDept === "All" || employee.dept === viewMode.attendanceDept)
  );
  const rows = selectedEmployees.sort((a, b) => a.name.localeCompare(b.name)).map((employee) => {
    const record = attendanceFor(employee.id, date);
    return { employee, record };
  });
  const present = rows.filter((row) => row.record?.status === "Present").length;
  const absent = rows.filter((row) => row.record?.status === "Absent").length;
  const leave = rows.filter((row) => row.record?.status === "On Leave").length;
  const remote = rows.filter((row) => row.record?.status === "Remote").length;
  const selectedEmployeeIds = new Set(selectedEmployees.map((employee) => employee.id));
  const monthRecords = attendanceRecords().filter((entry) => entry.date.startsWith(month) && selectedEmployeeIds.has(entry.employeeId));
  const monthPresent = monthRecords.filter((entry) => ["Present", "Remote"].includes(entry.status)).length;
  const monthRate = monthRecords.length ? Math.round(monthPresent / monthRecords.length * 100) : 0;
  const monthLabel = new Date(year, monthNumber - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const deptOptions = [...new Set(state.employees.map((employee) => employee.dept))].sort();
  const weekdayOffset = new Date(year, monthNumber - 1, 1).getDay();
  const cells = Array.from({ length: weekdayOffset }, () => `<div class="attendance-grid-spacer"></div>`);
  for (let day = 1; day <= days; day += 1) {
    const iso = `${month}-${String(day).padStart(2, "0")}`;
    const entries = state.employees.map((employee) => ({ employee, record: attendanceFor(employee.id, iso) }))
      .filter(({ employee, record }) => record && (!query || `${employee.name} ${employee.dept} ${employee.role}`.toLowerCase().includes(query)) &&
        (viewMode.attendanceDept === "All" || employee.dept === viewMode.attendanceDept));
    cells.push(`<button type="button" class="attendance-day${iso === date ? " is-selected" : ""}" data-attendance-day="${iso}">
      <strong>${day}</strong><span>${entries.length ? `${entries.length} recorded` : "—"}</span>
      ${entries.length ? `<small>${entries.slice(0, 3).map(({ employee, record }) => `<i class="att-dot att-${record.status.toLowerCase().replaceAll(" ", "-")}" title="${esc(employee.name)}: ${esc(record.status)}"></i>`).join("")}${entries.length > 3 ? `<em>+${entries.length - 3}</em>` : ""}</small>` : ""}
    </button>`);
  }
  const notRecorded = rows.length - present - absent - leave - remote;
  return `
    <div class="page-head"><div><span class="eyebrow">PEOPLE OPERATIONS</span><h2>Attendance</h2><p>Review the monthly register and update daily employee attendance.</p></div>
      <button class="btn btn-primary" data-open="attendance">+ Record attendance</button></div>
    <div class="stats">
      <div class="stat"><div class="k">Monthly attendance rate</div><div class="n">${monthRecords.length ? `${monthRate}%` : "—"}</div><div class="s">${monthRecords.length} recorded employee-days</div></div>
      <div class="stat"><div class="k">Present</div><div class="n">${present}</div><div class="s">For the selected date</div></div>
      <div class="stat"><div class="k">Absent</div><div class="n">${absent}</div><div class="s">For the selected date</div></div>
      <div class="stat"><div class="k">On leave / remote</div><div class="n">${leave} / ${remote}</div><div class="s">${notRecorded} not recorded on selected date</div></div>
    </div>
    <section class="card attendance-calendar">
      <div class="card-heading"><div><span class="eyebrow">MONTHLY REGISTER</span><h3>${esc(monthLabel)}</h3></div>
        <div class="attendance-month-actions"><button class="btn btn-ghost" data-attendance-shift="-1" aria-label="Previous month">‹</button>
          <input id="attendance-month" type="month" value="${month}" aria-label="Attendance month" />
          <button class="btn btn-ghost" data-attendance-shift="1" aria-label="Next month">›</button>
          <button class="btn btn-ghost" data-attendance-export>Download report</button></div></div>
      <div class="attendance-legend"><span><i class="att-dot att-present"></i>Present</span><span><i class="att-dot att-absent"></i>Absent</span><span><i class="att-dot att-on-leave"></i>On leave</span><span><i class="att-dot att-remote"></i>Remote</span></div>
      <div class="attendance-month-grid">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => `<div class="attendance-weekday">${day}</div>`).join("")}${cells.join("")}</div>
    </section>
    <section class="card attendance-register">
      <div class="card-heading"><div><span class="eyebrow">DAILY REGISTER</span><h3>${new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h3></div></div>
      <div class="leave-filters"><input class="search" id="attendance-search" type="search" placeholder="Search employee or department" value="${esc(viewMode.attendanceQuery || "")}" />
        <select id="attendance-department" class="compact-select"><option value="All">All departments</option>${deptOptions.map((dept) => `<option${viewMode.attendanceDept === dept ? " selected" : ""}>${esc(dept)}</option>`).join("")}</select>
        <input id="attendance-date" type="date" value="${date}" aria-label="Register date" /></div>
      <div class="attendance-table-wrap"><table class="plain"><thead><tr><th>Employee</th><th>Department</th><th>Appointment</th><th>Status</th><th>Note</th><th></th></tr></thead><tbody>
      ${rows.map(({ employee, record }) => `<tr>
        <td><div class="person-top">${employeeAvatarHtml(employee)}<strong>${esc(employee.name)}</strong></div></td>
        <td>${esc(employee.dept)}</td><td>${esc(employee.type)}</td>
        <td>${record ? badge(record.status) : `<span class="badge b-draft">Not recorded</span>`}</td>
        <td>${esc(record?.note || "—")}</td>
        <td><button class="btn btn-ghost" data-open="attendance" data-attendance-employee="${employee.id}" data-attendance-date="${date}">Edit</button></td>
      </tr>`).join("")}
      ${rows.length ? "" : `<tr><td colspan="6"><div class="empty">No employees match these filters.</div></td></tr>`}
    </tbody></table></div>
    </section>`;
}

function renderAttendanceStaff() {
  const person = me();
  const records = attendanceRecords().filter((entry) => entry.employeeId === person.id).sort((a, b) => b.date.localeCompare(a.date));
  const month = viewMode.attendanceMonth || todayIso().slice(0, 7);
  const monthRecords = records.filter((entry) => entry.date.startsWith(month));
  const present = monthRecords.filter((entry) => entry.status === "Present").length;
  const absent = monthRecords.filter((entry) => entry.status === "Absent").length;
  const remote = monthRecords.filter((entry) => entry.status === "Remote").length;
  const onLeave = monthRecords.filter((entry) => entry.status === "On Leave").length;
  const monthPresent = monthRecords.filter((entry) => ["Present", "Remote"].includes(entry.status)).length;
  const monthRate = monthRecords.length ? Math.round(monthPresent / monthRecords.length * 100) : 0;
  return `
    <div class="page-head"><div><span class="eyebrow">SELF-SERVICE</span><h2>My attendance</h2><p>Your personal attendance history and approved leave days.</p></div>
      <input id="attendance-month" type="month" value="${month}" aria-label="Attendance month" /></div>
    <div class="stats">
      <div class="stat"><div class="k">Attendance rate</div><div class="n">${monthRecords.length ? `${monthRate}%` : "—"}</div><div class="s">${monthRecords.length} recorded employee-days this month</div></div>
      <div class="stat"><div class="k">Present</div><div class="n">${present}</div><div class="s">Recorded on campus this month</div></div>
      <div class="stat"><div class="k">Absent</div><div class="n">${absent}</div><div class="s">Contact HR with questions</div></div>
      <div class="stat"><div class="k">Remote / on leave</div><div class="n">${remote} / ${onLeave}</div><div class="s">${monthRecords.length} total records this month</div></div>
    </div>
    <div class="card"><div class="card-heading"><div><span class="eyebrow">PERSONAL HISTORY</span><h3>${new Date(`${month}-01T00:00:00`).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</h3></div></div>
      <div class="attendance-table-wrap"><table class="plain"><thead><tr><th>Date</th><th>Status</th><th>Note</th></tr></thead><tbody>
      ${monthRecords.map((entry) => `<tr><td>${entry.date}</td><td>${badge(entry.status)}</td><td>${esc(entry.note || "—")}</td></tr>`).join("") || `<tr><td colspan="3"><div class="empty">No attendance records for this month.</div></td></tr>`}
    </tbody></table></div></div>`;
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
  reconcileHrRecords();
  save();
  const items = navItems();
  const fallback = items[0].id;
  const hash = (location.hash || "#/" + fallback).replace("#/", "");
  const page = items.some((n) => n.id === hash) ? hash : fallback;
  if (page !== hash) location.hash = "#/" + page;
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.page === page));
  const hr = {
    dashboard: renderDashboard, analytics: renderAnalytics, employees: renderEmployees, departments: renderDepartments, tasks: renderTasks,
    leave: renderLeaveHr, jobs: renderJobsHr, loans: renderLoansHr, attendance: renderAttendance, roster: renderRoster, payroll: renderPayrollHr
  };
  const staff = {
    home: renderStaffHome, profile: renderProfile, tasks: renderTasks, leave: renderLeaveStaff, loans: renderLoansStaff,
    attendance: renderAttendanceStaff, payslip: renderPayslip, jobs: renderJobsStaff
  };
  document.getElementById("view").innerHTML = (isHr() ? hr : staff)[page]();
  bindPage(page);
}

function renderNav() {
  let section = "";
  document.getElementById("nav").innerHTML = navItems().map((n) => {
    const heading = n.section !== section ? `<div class="nav-heading">${n.section}</div>` : "";
    section = n.section;
    return `${heading}<a href="#/${n.id}" data-page="${n.id}">${ICONS[n.icon]}<span>${n.label}</span></a>`;
  }).join("");
}

function countsByType() {
  const types = ["Faculty", "Staff", "Adjunct", "Research"];
  return types.map((t) => ({ t, n: state.employees.filter((e) => e.type === t).length }));
}

function renderAnalytics() {
  const dateYears = [
    todayIso(),
    ...(state.payroll || []).map((record) => record.period),
    ...attendanceRecords().map((record) => record.date),
    ...(state.leave || []).flatMap((record) => [record.start, record.end]),
    ...(state.applications || []).map((record) => record.at)
  ];
  const years = [...new Set(dateYears.filter((date) => /^\d{4}/.test(String(date || ""))).map((date) => String(date).slice(0, 4)))]
    .sort((a, b) => b.localeCompare(a));
  const reportYear = years.includes(viewMode.analyticsYear) ? viewMode.analyticsYear : years[0];
  viewMode.analyticsYear = reportYear;
  const employees = state.employees || [];
  const tasks = Array.isArray(state.tasks) ? state.tasks : [];
  const applications = (state.applications || []).filter((application) => String(application.at || "").startsWith(reportYear));
  const attendance = attendanceRecords().filter((record) => String(record.date || "").startsWith(reportYear));
  const leave = (state.leave || []).filter((record) => record.start <= `${reportYear}-12-31` && (record.end || record.start) >= `${reportYear}-01-01`);
  const payroll = (state.payroll || []).filter((record) =>
    String(record.period || "").startsWith(reportYear) && record.status !== "Rejected"
  );
  const countBy = (records, key) => records.reduce((counts, record) => {
    const value = record[key] || "Unspecified";
    counts.set(value, (counts.get(value) || 0) + 1);
    return counts;
  }, new Map());
  const statusCounts = [...countBy(employees, "status")].sort((a, b) => a[0].localeCompare(b[0]));
  const typeCounts = [...countBy(employees, "type")].sort((a, b) => a[0].localeCompare(b[0]));
  const taskStatuses = ["New", "In Progress", "Pending", "Done"].map((status) => ({
    label: status, value: tasks.filter((task) => task.status === status).length
  }));
  const departmentCounts = (state.departments || []).map((department) => ({
    name: department.name,
    value: employees.filter((employee) => employee.dept === department.name).length
  })).sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
  const monthlyPayroll = Array.from({ length: 12 }, (_, index) => {
    const month = `${reportYear}-${String(index + 1).padStart(2, "0")}`;
    const rows = payroll.filter((record) => String(record.period || "").slice(0, 7) === month);
    return {
      month,
      gross: rows.reduce((sum, record) => sum + Number(record.gross || 0), 0),
      net: rows.reduce((sum, record) => sum + Number(record.net || 0), 0)
    };
  });
  const maxGross = Math.max(1, ...monthlyPayroll.map((month) => month.gross));
  const payrollGross = payroll.reduce((sum, record) => sum + Number(record.gross || 0), 0);
  const applicationStage = (application) => application.contractStatus === "Signed" ? "Contract signed" : application.status;
  const appStatuses = ["Pending", "Shortlisted", "Interviewed", "Accepted", "Contract signed", "Declined"]
    .map((status) => ({ label: status, value: applications.filter((application) => applicationStage(application) === status).length }));
  const attendanceStatuses = [...countBy(attendance, "status")].sort((a, b) => b[1] - a[1]);
  const leaveStatuses = [...countBy(leave, "status")].sort((a, b) => a[0].localeCompare(b[0]));
  const taskOwners = new Map();
  tasks.forEach((task) => {
    const employee = employees.find((item) => item.id === task.employeeId);
    const owner = employee?.name || task.employee || "Unassigned";
    const row = taskOwners.get(owner) || { name: owner, department: employee?.dept || task.dept || "—", assigned: 0, done: 0, overdue: 0 };
    row.assigned += 1;
    if (task.status === "Done") row.done += 1;
    if (task.status !== "Done" && task.dueDate && task.dueDate < todayIso()) row.overdue += 1;
    taskOwners.set(owner, row);
  });
  const taskOwnerRows = [...taskOwners.values()].sort((a, b) => b.assigned - a.assigned || a.name.localeCompare(b.name)).slice(0, 6);
  const activeEmployees = employees.filter((employee) => employee.status === "Active").length;
  const taskDone = tasks.filter((task) => task.status === "Done").length;
  const taskCompletion = tasks.length ? Math.round(taskDone / tasks.length * 100) : 0;
  const maxDepartment = Math.max(1, ...departmentCounts.map((department) => department.value));
  const typeTotal = typeCounts.reduce((sum, [, count]) => sum + count, 0);
  let typeOffset = 0;
  const typeColors = ["#6078ed", "#22a47b", "#e99a36", "#3099c7", "#e45b4d", "#8b5cf6"];
  const typeRing = typeTotal ? `conic-gradient(${typeCounts.map(([, count], index) => {
    const start = typeOffset;
    typeOffset += count / typeTotal * 100;
    return `${typeColors[index % typeColors.length]} ${start}% ${typeOffset}%`;
  }).join(", ")})` : "conic-gradient(#e9ebf2 0% 100%)";
  const reportRows = [
    ...statusCounts.map(([label, value]) => ["Workforce status", label, value, "Current snapshot"]),
    ...typeCounts.map(([label, value]) => ["Employee type", label, value, "Current snapshot"]),
    ...departmentCounts.map((department) => ["Department headcount", department.name, department.value, "Current snapshot"]),
    ...taskStatuses.map((status) => ["Task status", status.label, status.value, "Current tasks"]),
    ...appStatuses.map((status) => ["Application status", status.label, status.value, reportYear]),
    ...attendanceStatuses.map(([label, value]) => ["Attendance status", label, value, reportYear]),
    ...leaveStatuses.map(([label, value]) => ["Leave status", label, value, reportYear]),
    ...monthlyPayroll.flatMap((month) => [
      ["Gross payroll", month.month, month.gross, "Kina"],
      ["Net payroll", month.month, month.net, "Kina"]
    ]),
    ...taskOwnerRows.map((owner) => ["Task completion", owner.name, `${owner.done}/${owner.assigned}`, owner.department])
  ];
  viewMode.analyticsRows = reportRows;
  return `
    <div class="page-head"><div><span class="eyebrow">HR OFFICE · WORKFORCE INSIGHTS</span><h2>Analytics</h2><p>Explore UNRE workforce, attendance, recruitment, task, and payroll records.</p></div>
      <div class="analytics-actions"><label class="compact-select"><span class="sr-only">Analytics reporting year</span><select id="analytics-year">${years.map((year) => `<option${year === reportYear ? " selected" : ""}>${year}</option>`).join("")}</select></label><button class="btn btn-ghost" data-analytics-export>Download report</button></div></div>
    <div class="stats analytics-stats">
      <div class="stat"><div class="k">Employees</div><div class="n">${employees.length}</div><div class="s">${activeEmployees} currently active</div></div>
      <div class="stat"><div class="k">Tasks completed</div><div class="n">${tasks.length ? `${taskCompletion}%` : "—"}</div><div class="s">${tasks.length ? `${taskDone} of ${tasks.length} current tasks` : "No current tasks assigned"}</div></div>
      <div class="stat"><div class="k">Applications</div><div class="n">${applications.length}</div><div class="s">Received in ${reportYear}</div></div>
      <div class="stat"><div class="k">Gross payroll</div><div class="n analytics-money">${kina(payrollGross)}</div><div class="s">${payroll.length} non-rejected entries · ${reportYear}</div></div>
    </div>
    <div class="analytics-layout">
      <section class="card analytics-workforce">
        <div class="card-heading"><div><span class="eyebrow">WORKFORCE</span><h3>Employee status</h3></div><button class="link" data-go="employees">View employees →</button></div>
        <div class="analytics-feature"><div class="analytics-progress" style="--analytics-progress:${employees.length ? activeEmployees / employees.length * 100 : 0}%"><div><strong>${employees.length ? Math.round(activeEmployees / employees.length * 100) : 0}%</strong><span>active</span></div></div>
          <div class="analytics-legend">${statusCounts.length ? statusCounts.map(([label, value], index) => `<div><span><i class="analytics-dot analytics-dot-${index % 6}"></i>${esc(label)}</span><strong>${value}</strong></div>`).join("") : `<div class="empty">No employee records.</div>`}</div></div>
      </section>
      <section class="card analytics-task-progress">
        <div class="card-heading"><div><span class="eyebrow">TASK MANAGEMENT</span><h3>Task status</h3></div><button class="link" data-go="tasks">View tasks →</button></div>
        <p class="analytics-highlight"><strong>${tasks.length ? `${taskCompletion}%` : "—"}</strong>${tasks.length ? "of current assigned tasks are complete" : "No current tasks to report"} <span>${taskDone}/${tasks.length} tasks</span></p>
        <div class="analytics-status-bars">${taskStatuses.map((status, index) => `<div class="analytics-status-row"><span>${status.label}</span><div class="analytics-bar"><i class="analytics-bar-${index}" style="width:${tasks.length ? status.value / tasks.length * 100 : 0}%"></i></div><strong>${status.value}</strong></div>`).join("")}</div>
      </section>
      <section class="card analytics-payroll">
        <div class="card-heading"><div><span class="eyebrow">PAYROLL · ${reportYear}</span><h3>Monthly payroll</h3></div><button class="link" data-go="payroll">View payroll →</button></div>
        ${payroll.length ? `<div class="analytics-month-chart">${monthlyPayroll.map((month) => {
          const label = new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(`${month.month}-01T00:00:00`));
          return `<div class="analytics-month"><div class="analytics-month-bars" title="${esc(label)} · Gross ${kina2(month.gross)} · Net ${kina2(month.net)}">
              <i class="analytics-gross-bar" style="height:${month.gross ? Math.max(2, month.gross / maxGross * 100) : 0}%"></i><i class="analytics-net-bar" style="height:${month.net ? Math.max(2, month.net / maxGross * 100) : 0}%"></i></div><small>${label}</small></div>`;
        }).join("")}</div><div class="analytics-chart-legend"><span><i class="analytics-gross-bar"></i>Gross pay</span><span><i class="analytics-net-bar"></i>Net pay</span><strong>${kina(payrollGross)} gross total</strong></div>` : `<div class="empty analytics-empty-chart">No payroll entries recorded for ${reportYear}.</div>`}
      </section>
      <section class="card analytics-composition">
        <div class="card-heading"><div><span class="eyebrow">EMPLOYEE TYPE</span><h3>Workforce composition</h3></div></div>
        <div class="analytics-feature"><div class="analytics-type-ring" style="--analytics-ring:${typeRing}"><div><strong>${employees.length}</strong><span>employees</span></div></div>
          <div class="analytics-legend">${typeCounts.length ? typeCounts.map(([label, value], index) => `<div><span><i class="analytics-dot analytics-dot-${index % 6}"></i>${esc(label)}</span><strong>${value}</strong></div>`).join("") : `<div class="empty">No employee records.</div>`}</div></div>
      </section>
      <section class="card analytics-departments">
        <div class="card-heading"><div><span class="eyebrow">TEAMS</span><h3>Employees by department</h3></div><button class="link" data-go="departments">View departments →</button></div>
        <div class="analytics-department-list">${departmentCounts.length ? departmentCounts.map((department) => `<div class="analytics-department-row"><span title="${esc(department.name)}">${esc(department.name)}</span><div class="analytics-bar"><i style="width:${department.value / maxDepartment * 100}%"></i></div><strong>${department.value}</strong></div>`).join("") : `<div class="empty">No department records.</div>`}</div>
      </section>
      <section class="card analytics-recruitment">
        <div class="card-heading"><div><span class="eyebrow">RECRUITMENT · ${reportYear}</span><h3>Application pipeline</h3></div><button class="link" data-go="jobs">View recruitment →</button></div>
        <div class="analytics-status-bars">${appStatuses.map((status, index) => `<div class="analytics-status-row"><span>${esc(status.label)}</span><div class="analytics-bar"><i class="analytics-bar-${index % 4}" style="width:${applications.length ? status.value / applications.length * 100 : 0}%"></i></div><strong>${status.value}</strong></div>`).join("")}</div>
        <p class="analytics-footnote">${applications.length} application${applications.length === 1 ? "" : "s"} received in ${reportYear}</p>
      </section>
      <section class="card analytics-attendance">
        <div class="card-heading"><div><span class="eyebrow">TIME &amp; ATTENDANCE · ${reportYear}</span><h3>Recorded attendance</h3></div><button class="link" data-go="attendance">View register →</button></div>
        ${attendanceStatuses.length ? `<div class="analytics-status-bars">${attendanceStatuses.map(([label, value], index) => `<div class="analytics-status-row"><span>${esc(label)}</span><div class="analytics-bar"><i class="analytics-bar-${index % 4}" style="width:${attendance.length ? value / attendance.length * 100 : 0}%"></i></div><strong>${value}</strong></div>`).join("")}</div><p class="analytics-footnote">${attendance.length} attendance records in ${reportYear}</p>` : `<div class="empty">No attendance records for ${reportYear}.</div>`}
      </section>
      <section class="card analytics-leave">
        <div class="card-heading"><div><span class="eyebrow">STAFF WELLBEING · ${reportYear}</span><h3>Leave requests</h3></div><button class="link" data-go="leave">View leave →</button></div>
        ${leaveStatuses.length ? `<div class="analytics-status-bars">${leaveStatuses.map(([label, value], index) => `<div class="analytics-status-row"><span>${esc(label)}</span><div class="analytics-bar"><i class="analytics-bar-${index % 4}" style="width:${leave.length ? value / leave.length * 100 : 0}%"></i></div><strong>${value}</strong></div>`).join("")}</div><p class="analytics-footnote">${leave.length} request${leave.length === 1 ? "" : "s"} overlap ${reportYear}</p>` : `<div class="empty">No leave requests overlap ${reportYear}.</div>`}
      </section>
      <section class="card analytics-assignees">
        <div class="card-heading"><div><span class="eyebrow">TASK DELIVERY</span><h3>Task completion by assignee</h3></div><button class="link" data-go="tasks">Manage tasks →</button></div>
        ${taskOwnerRows.length ? `<div class="analytics-table-wrap"><table class="plain analytics-table"><thead><tr><th>Employee</th><th>Department</th><th>Tasks</th><th>Complete</th><th>Overdue</th></tr></thead><tbody>${taskOwnerRows.map((owner) => `<tr><td><strong>${esc(owner.name)}</strong></td><td>${esc(owner.department)}</td><td>${owner.assigned}</td><td>${owner.done} (${Math.round(owner.done / owner.assigned * 100)}%)</td><td>${owner.overdue}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty">No tasks have been assigned.</div>`}
      </section>
    </div>`;
}

function renderDashboard() {
  const pendingLeave = state.leave.filter((l) => l.status === "Pending");
  const pendingLoans = state.loans.filter((l) => l.status === "Pending");
  const openJobs = state.jobs.filter(jobAccepting);
  const onLeave = state.employees.filter((e) => e.status === "On Leave").length;
  const activeEmployees = state.employees.filter((e) => e.status === "Active").length;
  const applications = state.applications || [];
  const pendingApplications = applications.filter((app) => app.status === "Pending");
  const types = countsByType();
  const maxType = Math.max(...types.map((x) => x.n), 1);
  const years = [...new Set([todayIso().slice(0, 4), ...(state.payroll || []).map((record) => String(record.period || "").slice(0, 4)).filter(Boolean)])]
    .sort((a, b) => b.localeCompare(a));
  const payrollYear = years.includes(viewMode.dashboardYear) ? viewMode.dashboardYear : years[0];
  viewMode.dashboardYear = payrollYear;
  const payroll = (state.payroll || []).filter((record) =>
    String(record.period || "").slice(0, 4) === payrollYear && record.status !== "Rejected"
  );
  const payParts = [
    { label: "Basic salary", key: "basicSalary", color: "#6078ed" },
    { label: "Housing allowance", key: "housingAllowance", color: "#22a47b" },
    { label: "Bonus", key: "bonus", color: "#e99a36" },
    { label: "Overtime", key: "overtime", color: "#3099c7" }
  ].map((part) => ({ ...part, amount: payroll.reduce((sum, record) => sum + Number(record[part.key] || 0), 0) }));
  const payTotal = payParts.reduce((sum, part) => sum + part.amount, 0);
  let payOffset = 0;
  const payRing = payTotal > 0 ? `conic-gradient(${payParts.map((part) => {
    const start = payOffset;
    payOffset += part.amount / payTotal * 100;
    return `${part.color} ${start}% ${payOffset}%`;
  }).join(", ")})` : "conic-gradient(#e9ebf2 0% 100%)";
  const monthlyPayroll = Array.from({ length: 12 }, (_, index) => {
    const month = `${payrollYear}-${String(index + 1).padStart(2, "0")}`;
    const rows = payroll.filter((record) => String(record.period || "").slice(0, 7) === month);
    return { month, gross: rows.reduce((sum, record) => sum + Number(record.gross || 0), 0), count: rows.length };
  });
  const maxGross = Math.max(1, ...monthlyPayroll.map((item) => item.gross));
  const payrollThisMonth = (state.payroll || []).filter((record) =>
    String(record.period || "").slice(0, 7) === todayIso().slice(0, 7) && record.status !== "Rejected"
  );
  const currentMonthNet = payrollThisMonth.reduce((sum, record) => sum + Number(record.net || 0), 0);
  const todayAttendance = attendanceRecords().filter((record) => record.date === todayIso());
  const present = todayAttendance.filter((record) => record.status === "Present" || record.status === "Remote").length;
  const upcomingInterviews = applications.filter((app) => app.interviewAt &&
    new Date(app.interviewAt).getTime() >= Date.now() &&
    ["Pending", "Shortlisted", "Interviewed"].includes(app.status))
    .sort((a, b) => a.interviewAt.localeCompare(b.interviewAt)).slice(0, 4);
  const recentApplications = [...applications].sort((a, b) => String(b.at).localeCompare(String(a.at))).slice(0, 5);
  const departmentCounts = state.departments.map((department) => ({
    ...department, count: state.employees.filter((employee) => employee.dept === department.name).length
  })).sort((a, b) => b.count - a.count);
  const notifications = notificationsForSession();
  return `
    <div class="page-head"><div><span class="eyebrow">HR OFFICE · VUDAL CAMPUS</span><h2>Dashboard</h2><p>Your workforce overview and the latest HR activity.</p></div>
      <button class="btn btn-primary" data-open="employee">${ICONS.people}<span>Add employee</span></button></div>
    <div class="stats dashboard-stats">
      <div class="stat"><div class="k">Total employees <span class="icon-chip ic-p">${ICONS.people}</span></div><div class="n">${state.employees.length}</div><div class="s">Across ${state.departments.length} departments</div></div>
      <div class="stat"><div class="k">Active staff <span class="icon-chip ic-g">${ICONS.people}</span></div><div class="n">${activeEmployees}</div><div class="s">Currently active</div></div>
      <div class="stat"><div class="k">On leave <span class="icon-chip ic-o">${ICONS.leave}</span></div><div class="n">${onLeave}</div><div class="s">Employees away</div></div>
      <div class="stat"><div class="k">Open positions <span class="icon-chip ic-b">${ICONS.jobs}</span></div><div class="n">${openJobs.length}</div><div class="s">Accepting applications</div></div>
      <div class="stat"><div class="k">Applications <span class="icon-chip ic-r">${ICONS.people}</span></div><div class="n">${applications.length}</div><div class="s">${pendingApplications.length} need review</div></div>
      <div class="stat"><div class="k">Payroll net · this month <span class="icon-chip ic-g">${ICONS.pay}</span></div><div class="n dashboard-stat-money">${kina(currentMonthNet)}</div><div class="s">${payrollThisMonth.length} entries · pending and completed</div></div>
    </div>
    <div class="dashboard-overview">
      <section class="card dashboard-pay-history">
        <div class="card-heading"><div><span class="eyebrow">PAY HISTORY</span><h3>Monthly payroll</h3></div>
          <label class="compact-select"><span class="sr-only">Payroll dashboard year</span><select id="dashboard-payroll-year">${years.map((year) => `<option${year === payrollYear ? " selected" : ""}>${year}</option>`).join("")}</select></label>
        </div>
        <div class="dashboard-chart">${monthlyPayroll.map((item) => {
          const label = new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(`${item.month}-01T00:00:00`));
          return `<div class="dashboard-chart-col" title="${esc(label)} ${payrollYear}: ${kina2(item.gross)} · ${item.count} entries">
            <span class="dashboard-chart-value">${item.gross ? kina(item.gross) : ""}</span>
            <div class="dashboard-chart-track"><span style="height:${item.gross ? Math.max(5, item.gross / maxGross * 100) : 0}%"></span></div>
            <small>${label}</small></div>`;
        }).join("")}</div>
        <div class="dashboard-chart-legend"><span>${payrollYear} gross payroll</span><strong>${kina(payTotal)} total pay components</strong></div>
      </section>
      <section class="card dashboard-pay-breakdown">
        <div class="card-heading"><div><span class="eyebrow">COMPANY PAY</span><h3>Pay breakdown</h3></div><button class="link" data-go="payroll">View payroll →</button></div>
        <div class="pay-donut-wrap"><div class="pay-donut" style="--pay-ring:${payRing}"><div><strong>${payroll.length}</strong><small>entries</small></div></div>
          <div class="pay-donut-legend">${payParts.map((part) => `<div><span><i style="--legend-color:${part.color}"></i>${part.label}</span><strong>${kina(part.amount)}</strong></div>`).join("")}</div>
        </div>
        ${payroll.length ? `<div class="dashboard-pay-total"><span>Gross payroll</span><strong>${kina(payroll.reduce((sum, record) => sum + Number(record.gross || 0), 0))}</strong></div>` : `<div class="empty dashboard-empty">Payroll totals will appear after entries are generated.</div>`}
      </section>
      <section class="card dashboard-workforce">
        <div class="card-heading"><div><span class="eyebrow">WORKFORCE</span><h3>Employee structure</h3></div><span class="card-total">${state.employees.length} total</span></div>
        ${types.map((item) => `<div class="bar-row"><span>${esc(item.t)}</span><div class="bar"><span style="width:${item.n / maxType * 100}%"></span></div><b>${item.n}</b></div>`).join("")}
        <div class="dashboard-team-list">${departmentCounts.slice(0, 4).map((department) => `<div><span>${esc(department.name)}</span><strong>${department.count}</strong></div>`).join("")}</div>
      </section>
      <section class="card dashboard-attendance">
        <div class="card-heading"><div><span class="eyebrow">ATTENDANCE</span><h3>Today's register</h3></div><button class="link" data-go="attendance">View register →</button></div>
        <div class="attendance-dashboard-numbers">
          <div><strong>${present}</strong><span>Present / remote</span></div>
          <div><strong>${todayAttendance.filter((record) => record.status === "On Leave").length}</strong><span>On leave</span></div>
          <div><strong>${todayAttendance.filter((record) => record.status === "Absent").length}</strong><span>Absent</span></div>
          <div><strong>${Math.max(0, state.employees.length - todayAttendance.length)}</strong><span>Not recorded</span></div>
        </div>
        <p class="meta dashboard-attendance-note">${new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date(`${todayIso()}T00:00:00`))} · ${todayAttendance.length} of ${state.employees.length} employees recorded</p>
      </section>
      <section class="card dashboard-recent-apps">
        <div class="card-heading"><div><span class="eyebrow">RECRUITMENT</span><h3>Recent applications</h3></div><button class="link" data-go="jobs">View all →</button></div>
        ${recentApplications.length ? recentApplications.map((app) => {
          const job = state.jobs.find((item) => item.id === app.jobId);
          return `<button class="dashboard-application" type="button" data-app="${app.id}">
            ${employeeAvatarHtml(app.employeeId ? state.employees.find((employee) => employee.id === app.employeeId) || app.employee : app.employee)}
            <span><strong>${esc(app.employee)}</strong><small>${esc(job?.title || "Job posting")} · ${esc(app.at)}</small></span>${badge(app.status)}</button>`;
        }).join("") : `<div class="empty">Applications will appear here when staff apply for an open job.</div>`}
      </section>
      <section class="card dashboard-interviews">
        <div class="card-heading"><div><span class="eyebrow">SCHEDULE</span><h3>Upcoming interviews</h3></div><button class="link" data-go="jobs">Recruitment →</button></div>
        ${upcomingInterviews.length ? upcomingInterviews.map((app) => {
          const job = state.jobs.find((item) => item.id === app.jobId);
          const at = new Date(app.interviewAt);
          return `<button class="dashboard-interview" type="button" data-app="${app.id}">
            <span class="dashboard-interview-date"><strong>${at.toLocaleDateString("en", { day: "2-digit" })}</strong><small>${at.toLocaleDateString("en", { month: "short" })}</small></span>
            <span><strong>${esc(app.employee)}</strong><small>${esc(job?.title || "Job posting")} · ${at.toLocaleString("en", { dateStyle: "medium", timeStyle: "short" })}</small></span>
          </button>`;
        }).join("") : `<div class="empty">No upcoming interviews are scheduled.</div>`}
      </section>
      <section class="card dashboard-leave">
        <div class="card-heading"><div><span class="eyebrow">NEEDS ATTENTION</span><h3>Leave requests</h3><p class="meta">${pendingLeave.length} awaiting HR review</p></div><button class="link" data-go="leave">View all →</button></div>
        ${pendingLeave.length ? `<div class="dashboard-leave-table-wrap"><table class="plain dashboard-leave-table"><thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Status</th></tr></thead><tbody>
          ${pendingLeave.slice(0, 5).map((leave) => `<tr><td><strong>${esc(leave.employee)}</strong><small>${esc(leave.dept || "")}</small></td><td>${esc(leave.type)}</td><td>${esc(leave.start)}${leave.end && leave.end !== leave.start ? ` – ${esc(leave.end)}` : ""}</td><td>${badge(leave.status)}</td></tr>`).join("")}
        </tbody></table></div>` : `<div class="empty">No leave waiting on HR.</div>`}
      </section>
      <section class="card dashboard-activity">
        <div class="card-heading"><div><span class="eyebrow">RECENT ACTIVITY</span><h3>Notifications</h3></div></div>
        ${notifications.length ? notifications.slice(0, 5).map((n) => `
          <div class="leave-mini notification-row">
            <div><strong>${esc(n.title || n.employeeName || "Notification")}</strong><div class="meta">${esc(n.message || `${n.action} ${n.fileKind}`)}</div><div class="meta">${esc(n.createdAt)}</div></div>
            <button class="btn btn-ghost" data-notification="${n.id}">View</button>
          </div>`).join("") : `<div class="empty">No new notifications.</div>`}
      </section>
      <section class="card dashboard-loans"><div class="card-heading"><div><span class="eyebrow">STAFF SUPPORT</span><h3>Loans awaiting decision</h3></div><button class="link" data-go="loans">Review →</button></div>
        ${pendingLoans.length ? pendingLoans.map((l) => `<div class="leave-mini"><div><strong>${l.employee}</strong><div class="meta">${l.kind} · ${kina(l.amount)} · ${l.term} months</div></div>${badge(l.status)}</div>`).join("") : `<div class="empty">No loan files in the queue.</div>`}
      </section>
    </div>`;
}

function renderEmployees() {
  const filter = viewMode.employees;
  const types = ["All", "Faculty", "Staff", "Adjunct", "Research"];
  const q = (viewMode.empQ || "").trim().toLowerCase();
  const matching = state.employees.filter((employee) =>
    (filter === "All" || employee.type === filter) &&
    (viewMode.employeeStatus === "All" || employee.status === viewMode.employeeStatus) &&
    (viewMode.employeeDept === "All" || employee.dept === viewMode.employeeDept) &&
    (!q || `${employee.name} ${employee.email} ${employee.role} ${employee.dept} ${employee.employeeNumber || ""}`.toLowerCase().includes(q))
  ).sort((a, b) => a.name.localeCompare(b.name));
  const pageSize = 12;
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  viewMode.employeePage = Math.min(Math.max(1, viewMode.employeePage), pageCount);
  const list = matching.slice((viewMode.employeePage - 1) * pageSize, viewMode.employeePage * pageSize);
  const departments = [...new Set(state.employees.map((employee) => employee.dept).filter(Boolean))].sort();
  const active = state.employees.filter((employee) => employee.status === "Active").length;
  const onLeave = state.employees.filter((employee) => employee.status === "On Leave").length;
  const inactive = state.employees.filter((employee) => employee.status === "Inactive").length;
  return `
    <div class="page-head"><div><span class="eyebrow">PEOPLE DIRECTORY</span><h2>Employees</h2><p>Browse staff records, contact details, appointments, and personnel files.</p></div>
      <button class="btn btn-primary" data-open="employee">+ Add employee</button></div>
    <div class="stats employee-stats">
      <div class="stat"><div class="k">Total employees</div><div class="n">${state.employees.length}</div><div class="s">Across ${departments.length} departments</div></div>
      <div class="stat"><div class="k">Active</div><div class="n">${active}</div><div class="s">Currently employed</div></div>
      <div class="stat"><div class="k">On leave</div><div class="n">${onLeave}</div><div class="s">Approved absence</div></div>
      <div class="stat"><div class="k">Inactive</div><div class="n">${inactive}</div><div class="s">Not currently active</div></div>
    </div>
    <section class="card employee-directory">
      <div class="card-heading"><div><span class="eyebrow">STAFF REGISTER</span><h3>Employee directory</h3><p class="meta">${matching.length} matching record${matching.length === 1 ? "" : "s"}</p></div>
        <div class="employee-view-toggle"><button class="btn ${viewMode.employeeView === "cards" ? "btn-primary" : "btn-ghost"}" data-employee-view="cards">Cards</button><button class="btn ${viewMode.employeeView === "list" ? "btn-primary" : "btn-ghost"}" data-employee-view="list">List</button><button class="btn btn-ghost" data-employee-export>Export CSV</button></div></div>
      <div class="employee-filters"><input class="search" id="emp-search" type="search" placeholder="Search name, email, role, or ID" value="${esc(viewMode.empQ || "")}" />
        <div class="filters">${types.map((type) => `<button class="chip ${filter === type ? "on" : ""}" data-filter="${type}">${type}</button>`).join("")}</div>
        <select class="compact-select" id="employee-status"><option value="All">All statuses</option>${["Active","On Leave","Inactive"].map((status) => `<option${viewMode.employeeStatus === status ? " selected" : ""}>${status}</option>`).join("")}</select>
        <select class="compact-select" id="employee-department"><option value="All">All departments</option>${departments.map((department) => `<option${viewMode.employeeDept === department ? " selected" : ""}>${esc(department)}</option>`).join("")}</select>
        <button class="btn btn-ghost" data-employee-reset>Clear filters</button></div>
      ${viewMode.employeeView === "cards" ? `<div class="cards employee-cards">${list.map((employee) => `
        <article class="person clickable employee-card" data-emp="${employee.id}" role="button" tabindex="0"><div class="row-between"><div class="person-top">${employeeAvatarHtml(employee)}
          <div><strong>${esc(employee.name)}</strong><div class="meta">${esc(employee.role)}</div></div></div>${badge(employee.status)}</div>
          <div class="employee-card-meta"><span>${esc(employee.dept || "Department not set")}</span><span>${esc(employee.type || "Appointment not set")}</span></div>
          <div class="employee-card-meta"><span>${esc(employee.email)}</span><span>${esc(employee.phone || "Phone not recorded")}</span></div>
          <div class="employee-card-meta"><span>Hired ${employee.hiredOn ? esc(employee.hiredOn) : "date not recorded"}</span><span>${empDocs(employee.id).length} files</span></div>
          <div class="meta hint-click">Open personnel record &amp; files</div></article>`).join("") || `<div class="empty">No employees match these filters.</div>`}</div>` : `
        <div class="employee-table-wrap"><table class="plain employee-table"><thead><tr><th>Employee</th><th>Employee ID</th><th>Department</th><th>Appointment</th><th>Hired</th><th>Contact</th><th>Status</th><th></th></tr></thead><tbody>
          ${list.map((employee) => `<tr class="employee-row" data-emp="${employee.id}" tabindex="0"><td><div class="person-top">${employeeAvatarHtml(employee)}<span><strong>${esc(employee.name)}</strong><small>${esc(employee.role)}</small></span></div></td>
            <td>${esc(employee.employeeNumber || "—")}</td><td>${esc(employee.dept || "—")}</td><td>${esc(employee.type || "—")}</td><td>${esc(employee.hiredOn || "—")}</td>
            <td>${esc(employee.email)}<small>${esc(employee.phone || "Phone not recorded")}</small></td><td>${badge(employee.status)}</td><td><button class="btn btn-ghost" data-emp="${employee.id}">Open</button></td></tr>`).join("") || `<tr><td colspan="8"><div class="empty">No employees match these filters.</div></td></tr>`}
        </tbody></table></div>`}
      <div class="recruitment-pagination"><span class="meta">Showing ${matching.length ? (viewMode.employeePage - 1) * pageSize + 1 : 0}–${Math.min(viewMode.employeePage * pageSize, matching.length)} of ${matching.length}</span>
        <div><button class="btn btn-ghost" data-employee-page="${Math.max(1, viewMode.employeePage - 1)}" ${viewMode.employeePage <= 1 ? "disabled" : ""}>Previous</button><span>Page ${viewMode.employeePage} of ${pageCount}</span><button class="btn btn-ghost" data-employee-page="${Math.min(pageCount, viewMode.employeePage + 1)}" ${viewMode.employeePage >= pageCount ? "disabled" : ""}>Next</button></div></div>
    </section>`;
}

function renderTasks() {
  const allTasks = Array.isArray(state.tasks) ? state.tasks : [];
  const tasks = isHr() ? allTasks : allTasks.filter((task) => task.employeeId === session.employeeId);
  const query = (viewMode.taskQuery || "").trim().toLowerCase();
  const matching = tasks.filter((task) => {
    const employee = state.employees.find((item) => item.id === task.employeeId);
    return (!query || `${task.title} ${task.description} ${employee?.name || task.employee || ""} ${employee?.dept || task.dept || ""}`.toLowerCase().includes(query)) &&
      (viewMode.taskStatus === "All" || task.status === viewMode.taskStatus) &&
      (viewMode.taskDept === "All" || employee?.dept === viewMode.taskDept);
  }).sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));
  const statusOrder = ["New", "In Progress", "Pending", "Done"];
  const overdue = tasks.filter((task) => task.status !== "Done" && task.dueDate && task.dueDate < todayIso()).length;
  const dueSoon = tasks.filter((task) => task.status !== "Done" && task.dueDate >= todayIso() && task.dueDate <= addDaysIso(todayIso(), 7)).length;
  const done = tasks.filter((task) => task.status === "Done").length;
  const departments = [...new Set(state.employees.map((employee) => employee.dept).filter(Boolean))].sort();
  const month = viewMode.taskMonth || todayIso().slice(0, 7);
  const [year, monthNumber] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const blanks = Array.from({ length: new Date(year, monthNumber - 1, 1).getDay() }, () => `<div class="task-calendar-spacer"></div>`);
  const calendarCells = blanks.concat(Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = `${month}-${String(day).padStart(2, "0")}`;
    const due = matching.filter((task) => task.dueDate === date);
    return `<div class="task-calendar-day"><strong>${day}</strong>${due.map((task) => `<article class="task-calendar-item task-priority-${(task.priority || "Normal").toLowerCase()}" title="${esc(task.title)} · ${esc(task.status)}"><b>${esc(task.title)}</b><span>${esc(state.employees.find((employee) => employee.id === task.employeeId)?.name || task.employee || "Unassigned")}</span>${badge(task.status)}</article>`).join("")}</div>`;
  }));
  const taskStatusControl = (task) => {
    const staffTransitions = {
      New: ["New", "In Progress"], "In Progress": ["In Progress", "Pending", "Done"],
      Pending: ["Pending", "In Progress", "Done"], Done: ["Done"]
    };
    const available = isHr() ? statusOrder : staffTransitions[task.status] || [task.status];
    return `<label class="sr-only" for="task-status-${task.id}">Update ${esc(task.title)} status</label><select id="task-status-${task.id}" class="task-status-select" data-task-status="${task.id}"${available.length === 1 ? " disabled" : ""}>${available.map((status) => `<option${task.status === status ? " selected" : ""}>${status}</option>`).join("")}</select>`;
  };
  const taskCard = (task) => {
    const employee = state.employees.find((item) => item.id === task.employeeId);
    const late = task.status !== "Done" && task.dueDate && task.dueDate < todayIso();
    return `<article class="task-card task-priority-${(task.priority || "Normal").toLowerCase()}">
      <div class="row-between"><span class="task-priority-label">${esc(task.priority || "Normal")} priority</span>${badge(task.status)}</div>
      <h4>${esc(task.title)}</h4><p>${esc(task.description || "No task details provided.")}</p>
      <div class="task-owner">${employeeAvatarHtml(employee || task.employee || "Employee")}<span><strong>${esc(employee?.name || task.employee || "Unassigned")}</strong><small>${esc(employee?.dept || task.dept || "Department not set")}</small></span></div>
      <div class="task-dates"><span>Start <b>${esc(task.startDate || "—")}</b></span><span class="${late ? "task-overdue" : ""}">${late ? "Overdue" : "Due"} <b>${esc(task.dueDate || "—")}</b></span></div>
      <div class="task-card-actions">${taskStatusControl(task)}</div>
    </article>`;
  };
  const currentView = viewMode.taskView || "board";
  return `
    <div class="page-head"><div><span class="eyebrow">${isHr() ? "PEOPLE OPERATIONS" : "SELF-SERVICE"}</span><h2>${isHr() ? "Task Management" : "My tasks"}</h2><p>${isHr() ? "Assign work, track due dates, and review progress across teams." : "Review your assigned work and keep task progress up to date."}</p></div>
      ${isHr() ? `<button class="btn btn-primary" data-open="task">+ Assign task</button>` : ""}</div>
    <div class="stats task-stats">
      <div class="stat"><div class="k">Total tasks</div><div class="n">${tasks.length}</div><div class="s">${isHr() ? "Across all assignees" : "Assigned to you"}</div></div>
      <div class="stat"><div class="k">In progress</div><div class="n">${tasks.filter((task) => task.status === "In Progress").length}</div><div class="s">Work underway</div></div>
      <div class="stat"><div class="k">Due soon</div><div class="n">${dueSoon}</div><div class="s">Due within 7 days</div></div>
      <div class="stat"><div class="k">${overdue ? "Overdue" : "Completed"}</div><div class="n">${overdue || done}</div><div class="s">${overdue ? "Needs attention" : "Tasks completed"}</div></div>
    </div>
    <section class="card task-workspace">
      <div class="card-heading"><div><span class="eyebrow">${isHr() ? "TEAM WORKSPACE" : "MY WORKSPACE"}</span><h3>Tasks &amp; deadlines</h3><p class="meta">${matching.length} matching task${matching.length === 1 ? "" : "s"}</p></div>
        <div class="task-view-tabs"><button class="${currentView === "board" ? "on" : ""}" data-task-view="board">Overview</button><button class="${currentView === "timeline" ? "on" : ""}" data-task-view="timeline">Timeline</button><button class="${currentView === "calendar" ? "on" : ""}" data-task-view="calendar">Calendar</button></div></div>
      <div class="task-filters"><input class="search" id="task-search" type="search" placeholder="Search tasks or assignees" value="${esc(viewMode.taskQuery || "")}" />
        <select id="task-filter-status" class="compact-select">${["All", ...statusOrder].map((status) => `<option${viewMode.taskStatus === status ? " selected" : ""}>${status}</option>`).join("")}</select>
        ${isHr() ? `<select id="task-filter-dept" class="compact-select"><option value="All">All departments</option>${departments.map((department) => `<option${viewMode.taskDept === department ? " selected" : ""}>${esc(department)}</option>`).join("")}</select><button class="btn btn-ghost" data-task-export>Export CSV</button>` : ""}</div>
      ${currentView === "board" ? `<div class="task-board-scroll"><div class="task-board">${statusOrder.map((status) => {
        const column = matching.filter((task) => task.status === status);
        return `<section class="task-column"><div class="task-column-heading"><h4>${status}</h4><span>${column.length}</span></div>${column.length ? column.map(taskCard).join("") : `<div class="task-column-empty">No tasks</div>`}</section>`;
      }).join("")}</div></div>` : currentView === "timeline" ? `<div class="task-timeline">${matching.map((task) => `<div class="task-timeline-row"><div class="task-timeline-date">${esc(task.dueDate || "No due date")}</div>${taskCard(task)}</div>`).join("") || `<div class="empty">No tasks match these filters.</div>`}</div>` : `
        <div class="task-calendar-heading"><button class="btn btn-ghost" data-task-month-shift="-1" aria-label="Previous month">‹</button><h4>${new Date(year, monthNumber - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" })}</h4><input id="task-month" type="month" value="${month}" aria-label="Task calendar month" /><button class="btn btn-ghost" data-task-month-shift="1" aria-label="Next month">›</button></div>
        <div class="task-calendar-grid">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => `<div class="task-calendar-weekday">${day}</div>`).join("")}${calendarCells.join("")}</div>`}
      ${!matching.length && currentView === "board" ? `<div class="empty">No tasks match these filters.</div>` : ""}
    </section>`;
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
  const today = todayIso();
  const currentlyAway = new Set(state.leave.filter((item) => item.status === "Approved" && item.start <= today && item.end >= today)
    .map((item) => item.employee)).size;
  const planned = state.leave.filter((item) => item.status === "Approved" && item.start > today);
  const query = (viewMode.leaveQuery || "").trim().toLowerCase();
  const matching = state.leave.filter((item) => {
    const employee = state.employees.find((person) => person.name === item.employee);
    const month = viewMode.leaveMonth || "";
    return (!query || `${item.employee} ${item.dept} ${employee?.role || ""} ${item.note || ""}`.toLowerCase().includes(query)) &&
      (viewMode.leaveStatus === "All" || item.status === viewMode.leaveStatus) &&
      (viewMode.leaveType === "All" || item.type === viewMode.leaveType) &&
      (!month || item.start.slice(0, 7) === month || item.end.slice(0, 7) === month || (item.start < `${month}-01` && item.end >= `${month}-01`));
  }).sort((a, b) => b.start.localeCompare(a.start));
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  viewMode.leavePage = Math.min(Math.max(1, viewMode.leavePage), pageCount);
  const pageItems = matching.slice((viewMode.leavePage - 1) * pageSize, viewMode.leavePage * pageSize);
  const listView = viewMode.leave === "list";
  return `
    <div class="page-head"><div><span class="eyebrow">PEOPLE OPERATIONS</span><h2>Leave management</h2><p>Review staff leave requests, coordinate planned absences, and keep the register up to date.</p></div>
      <div class="page-actions">
        <div class="seg"><button class="${listView ? "on" : ""}" data-leave-view="list">List</button><button class="${!listView ? "on" : ""}" data-leave-view="calendar">Calendar</button></div>
        <button class="btn btn-primary" data-open="leave">+ File for staff</button>
      </div></div>
    <div class="stats leave-stats">
      <div class="stat"><div class="k">Employees on leave today</div><div class="n">${currentlyAway}</div><div class="s">Approved active absences</div></div>
      <div class="stat"><div class="k">Planned leave</div><div class="n">${planned.length}</div><div class="s">Upcoming approved requests</div></div>
      <div class="stat"><div class="k">Pending requests</div><div class="n">${pending.length}</div><div class="s">Awaiting HR review</div></div>
      <div class="stat"><div class="k">Requests this month</div><div class="n">${state.leave.filter((item) => item.start.startsWith(today.slice(0, 7))).length}</div><div class="s">All request statuses</div></div>
    </div>
    ${listView ? `<section class="card leave-register">
      <div class="card-heading"><div><span class="eyebrow">LEAVE REGISTER</span><h3>Requests &amp; decisions</h3><p class="meta">${matching.length} matching request${matching.length === 1 ? "" : "s"}</p></div>
        <button class="btn btn-ghost" data-leave-export>Download report</button></div>
      <div class="leave-filters"><input class="search" id="leave-search" type="search" placeholder="Search employee, department, or note" value="${esc(viewMode.leaveQuery || "")}" />
        <select id="leave-status" class="compact-select">${["All","Pending","Approved","Rejected"].map((status) => `<option${viewMode.leaveStatus === status ? " selected" : ""}>${status}</option>`).join("")}</select>
        <select id="leave-type" class="compact-select">${["All", ...new Set(state.leave.map((item) => item.type))].map((type) => `<option${viewMode.leaveType === type ? " selected" : ""}>${esc(type)}</option>`).join("")}</select>
        <input id="leave-month" type="month" value="${viewMode.leaveMonth || ""}" aria-label="Filter leave by month" />
        <button class="btn btn-ghost" data-leave-reset>Clear filters</button></div>
      <div class="attendance-table-wrap"><table class="plain leave-table"><thead><tr><th>Employee</th><th>Department</th><th>Type</th><th>Days</th><th>Start</th><th>End</th><th>Status</th><th>Decision</th></tr></thead><tbody>
        ${pageItems.map((item) => `<tr><td><strong>${esc(item.employee)}</strong></td><td>${esc(item.dept)}</td><td>${esc(item.type)}</td><td>${daysBetween(item.start, item.end)}</td><td>${item.start}</td><td>${item.end}</td><td>${badge(item.status)}</td>
          <td>${item.status === "Pending" ? `<div class="leave-decision"><button class="btn btn-ok" data-leave="${item.id}" data-act="Approved">Approve</button><button class="btn btn-danger" data-leave="${item.id}" data-act="Rejected">Reject</button></div>` : `<span class="meta">${esc(item.note || "—")}</span>`}</td></tr>`).join("") || `<tr><td colspan="8"><div class="empty">No leave requests match these filters.</div></td></tr>`}
      </tbody></table></div>
      <div class="recruitment-pagination"><span class="meta">Showing ${matching.length ? (viewMode.leavePage - 1) * pageSize + 1 : 0}–${Math.min(viewMode.leavePage * pageSize, matching.length)} of ${matching.length}</span>
        <div><button class="btn btn-ghost" data-leave-page="${Math.max(1, viewMode.leavePage - 1)}" ${viewMode.leavePage <= 1 ? "disabled" : ""}>Previous</button><span>Page ${viewMode.leavePage} of ${pageCount}</span><button class="btn btn-ghost" data-leave-page="${Math.min(pageCount, viewMode.leavePage + 1)}" ${viewMode.leavePage >= pageCount ? "disabled" : ""}>Next</button></div></div>
    </section>` : renderCalendar()}`;
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
  const month = viewMode.leaveMonth || todayIso().slice(0, 7);
  const [year, monthNumber] = month.split("-").map(Number);
  const startDay = new Date(year, monthNumber - 1, 1).getDay();
  const days = new Date(year, monthNumber, 0).getDate();
  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push("<div></div>");
  for (let d = 1; d <= days; d++) {
    const iso = `${month}-${String(d).padStart(2, "0")}`;
    const hits = state.leave.filter((l) => l.status !== "Rejected" && l.start <= iso && l.end >= iso);
    cells.push(`<div class="day"><b>${d}</b>${hits.map((h) => `<div class="mark ${h.status === "Pending" ? "mark-pending" : ""}" title="${esc(h.employee)} · ${esc(h.type)} · ${esc(h.status)}">${esc(h.employee.split(" ").pop())}</div>`).join("")}</div>`);
  }
  const label = new Date(year, monthNumber - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" });
  return `<div class="card leave-calendar"><div class="card-heading"><div><span class="eyebrow">ABSENCE PLANNER</span><h3>${esc(label)}</h3></div>
    <div class="attendance-month-actions"><button class="btn btn-ghost" data-leave-shift="-1" aria-label="Previous month">‹</button><input id="leave-month" type="month" value="${month}" aria-label="Leave calendar month" /><button class="btn btn-ghost" data-leave-shift="1" aria-label="Next month">›</button></div></div>
    <div class="attendance-legend"><span><i class="leave-calendar-key"></i>Approved</span><span><i class="leave-calendar-key is-pending"></i>Pending review</span></div>
    <div class="calendar">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => `<div class="cal-h">${d}</div>`).join("")}${cells.join("")}</div></div>`;
}

function renderJobsHr() {
  const applications = state.applications || [];
  const shortlisted = applications.filter((app) => ["Shortlisted", "Interviewed", "Accepted", "Contract signed"].includes(app.status));
  const interviewed = applications.filter((app) => ["Interviewed", "Accepted", "Contract signed"].includes(app.status));
  const hired = applications.filter((app) => app.status === "Contract signed" || app.contractStatus === "Signed");
  const upcoming = applications.filter((app) => app.interviewAt && new Date(app.interviewAt).getTime() >= Date.now() &&
    ["Pending", "Shortlisted", "Interviewed"].includes(app.status))
    .sort((a, b) => a.interviewAt.localeCompare(b.interviewAt)).slice(0, 5);
  const matching = applications.filter((app) => {
    const job = state.jobs.find((item) => item.id === app.jobId);
    const q = (viewMode.recruitQuery || "").trim().toLowerCase();
    return (!q || `${app.employee} ${app.email || ""} ${job?.title || ""}`.toLowerCase().includes(q)) &&
      (viewMode.recruitStatus === "All" || app.status === viewMode.recruitStatus) &&
      (viewMode.recruitJob === "All" || app.jobId === viewMode.recruitJob);
  }).sort((a, b) => String(b.at).localeCompare(String(a.at)));
  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(matching.length / pageSize));
  viewMode.recruitPage = Math.min(Math.max(1, viewMode.recruitPage), pageCount);
  const pageApps = matching.slice((viewMode.recruitPage - 1) * pageSize, viewMode.recruitPage * pageSize);
  const vacancies = state.jobs.filter((job) => job.status === "Draft" || jobAccepting(job));
  const closedJobs = state.jobs.filter((job) => job.status === "Closed" || jobExpired(job));
  const stageNames = ["Pending", "Shortlisted", "Interviewed", "Accepted", "Declined", "Contract signed"];
  return `
    <div class="page-head"><div><span class="eyebrow">TALENT &amp; PAY</span><h2>Recruitment</h2><p>Manage vacancies, review applicants, and coordinate interviews.</p></div>
      <button class="btn btn-primary" data-open="job">+ Create job</button></div>
    <div class="stats recruitment-stats">
      <div class="stat"><div class="k">Open vacancies</div><div class="n">${state.jobs.filter(jobAccepting).length}</div><div class="s">Accepting applications</div></div>
      <div class="stat"><div class="k">Applications</div><div class="n">${applications.length}</div><div class="s">${applications.filter((app) => app.status === "Pending").length} awaiting review</div></div>
      <div class="stat"><div class="k">Shortlisted</div><div class="n">${shortlisted.length}</div><div class="s">Advanced candidates</div></div>
      <div class="stat"><div class="k">Interviewed</div><div class="n">${interviewed.length}</div><div class="s">Interview stage or beyond</div></div>
      <div class="stat"><div class="k">Declined</div><div class="n">${applications.filter((app) => app.status === "Declined").length}</div><div class="s">Not progressing</div></div>
      <div class="stat"><div class="k">Hired</div><div class="n">${hired.length}</div><div class="s">Contract signed</div></div>
    </div>
    <div class="grid-2 recruitment-overview">
      <section class="card recruitment-vacancies">
        <div class="card-heading"><div><span class="eyebrow">CURRENT VACANCIES</span><h3>${vacancies.length} job${vacancies.length === 1 ? "" : "s"} posted</h3></div></div>
        <div class="cards">${vacancies.length ? vacancies.map((job) => jobCard(job, true)).join("") : `<div class="empty">No open vacancies. Create a job draft to get started.</div>`}</div>
        ${closedJobs.length ? `<details class="closed-vacancies"><summary>Closed postings (${closedJobs.length})</summary><div class="cards">${closedJobs.map((job) => jobCard(job, true)).join("")}</div></details>` : ""}
      </section>
      <section class="card">
        <div class="card-heading"><div><span class="eyebrow">INTERVIEW SCHEDULE</span><h3>Upcoming interviews</h3></div></div>
        ${upcoming.length ? `<div class="interview-list">${upcoming.map((app) => {
          const job = state.jobs.find((item) => item.id === app.jobId);
          const date = new Date(app.interviewAt);
          return `<button class="interview-item" type="button" data-app="${app.id}">
            <span class="interview-date"><strong>${date.toLocaleDateString("en", { day: "2-digit" })}</strong><small>${date.toLocaleDateString("en", { month: "short" })}</small></span>
            <span><strong>${esc(app.employee)}</strong><small>${esc(job?.title || "Job posting")} · ${date.toLocaleTimeString("en", { hour: "numeric", minute: "2-digit" })}</small></span>
            ${badge(app.status)}</button>`;
        }).join("")}</div>` : `<div class="empty">No interviews are scheduled yet. Schedule one from an applicant's review.</div>`}
      </section>
    </div>
    <section class="card recruitment-register">
      <div class="card-heading recruitment-register-heading"><div><span class="eyebrow">CANDIDATE PIPELINE</span><h3>Applications</h3><p class="meta">${matching.length} candidate${matching.length === 1 ? "" : "s"} · showing ${matching.length ? (viewMode.recruitPage - 1) * pageSize + 1 : 0}–${Math.min(viewMode.recruitPage * pageSize, matching.length)}</p></div>
        <button class="btn btn-ghost" data-recruitment-export>Download report</button>
      </div>
      <div class="toolbar recruitment-filters">
        <input class="search" id="recruitment-search" type="search" placeholder="Search candidate or job title..." value="${esc(viewMode.recruitQuery)}" />
        <label class="compact-select"><span class="sr-only">Filter applicants by status</span><select id="recruitment-status"><option>All</option>${stageNames.map((status) => `<option${status === viewMode.recruitStatus ? " selected" : ""}>${status}</option>`).join("")}</select></label>
        <label class="compact-select"><span class="sr-only">Filter applicants by posting</span><select id="recruitment-job"><option value="All">All job postings</option>${state.jobs.map((job) => `<option value="${job.id}"${job.id === viewMode.recruitJob ? " selected" : ""}>${esc(job.title)}</option>`).join("")}</select></label>
      </div>
      <div class="recruitment-table-wrap"><table class="plain recruitment-table"><thead><tr><th>Candidate</th><th>Job title</th><th>Applied</th><th>Status</th><th>Interview</th><th>Action</th></tr></thead><tbody>
        ${pageApps.map((app) => {
          const job = state.jobs.find((item) => item.id === app.jobId);
          const interview = app.interviewAt ? new Date(app.interviewAt).toLocaleString("en", { dateStyle: "medium", timeStyle: "short" }) : "Not scheduled";
          return `<tr data-app="${app.id}" class="candidate-row">
            <td><strong>${esc(app.employee)}</strong><div class="meta">${esc(app.email || (app.employeeId ? "Internal staff" : "External applicant"))}</div></td>
            <td>${esc(job?.title || "Removed posting")}<div class="meta">${esc(job?.dept || "")}</div></td>
            <td>${esc(app.at)}</td><td>${badge(app.status)}</td><td>${esc(interview)}</td>
            <td><button class="btn btn-ghost" data-app="${app.id}">Review</button></td>
          </tr>`;
        }).join("") || `<tr><td colspan="6"><div class="empty">${applications.length ? "No candidates match these filters." : "Applications will appear here when staff apply for an open posting."}</div></td></tr>`}
      </tbody></table></div>
      <div class="recruitment-pagination"><span class="meta">Showing ${matching.length ? (viewMode.recruitPage - 1) * pageSize + 1 : 0}–${Math.min(viewMode.recruitPage * pageSize, matching.length)} of ${matching.length}</span>
        <div><button class="btn btn-ghost" data-recruitment-page="${viewMode.recruitPage - 1}"${viewMode.recruitPage <= 1 ? " disabled" : ""}>Previous</button><span>Page ${viewMode.recruitPage} of ${pageCount}</span><button class="btn btn-ghost" data-recruitment-page="${viewMode.recruitPage + 1}"${viewMode.recruitPage >= pageCount ? " disabled" : ""}>Next</button></div>
      </div>
    </section>`;
}

function renderJobsStaff() {
  const open = state.jobs.filter(jobAccepting);
  const person = me();
  return `
    <div class="page-head"><div><h2>Internal jobs</h2><p>Open UNRE vacancies you can apply for</p></div></div>
    <div class="cards">${open.map((j) => jobCard(j, false, person)).join("")}</div>`;
}

function jobCard(j, hr, person) {
  const expired = jobExpired(j);
  const displayStatus = expired ? "Expired" : j.status;
  const apps = jobApps(j.id);
  const applied = person && apps.some((a) => a.employeeId === person.id || a.employee === person.name);
  const pending = apps.filter((a) => a.status === "Pending").length;
  return `
    <article class="job clickable" data-job="${j.id}" role="button" tabindex="0">
      <div class="row-between"><div class="icon-chip ic-p">${ICONS.jobs}</div>${badge(displayStatus)}</div>
      <h3 style="margin:12px 0 4px">${esc(j.title)}</h3><div class="meta">${esc(j.dept)}</div><p class="meta">${esc(j.desc)}</p>
      <div class="kv"><span>${esc(j.type || "Full-Time")}</span><span>${esc(j.band || "Staff")}</span><span>${esc(j.pay)}</span><span>${apps.length} applicants${hr && pending ? ` · ${pending} new` : ""}</span></div>
      ${j.closesOn ? `<div class="meta job-closes">Closes ${esc(j.closesOn)}</div>` : ""}
      ${hr && j.status === "Draft" ? `<div class="actions"><button class="btn btn-brand" data-publish="${j.id}">Publish</button></div>` : ""}
      ${hr && jobAccepting(j) ? `<div class="actions"><button class="btn btn-ghost" data-close-job="${j.id}">Close posting</button></div>` : ""}
      ${hr && j.status === "Closed" ? `<div class="actions"><button class="btn btn-ghost" data-reopen-job="${j.id}">Reopen posting</button></div>` : ""}
      ${!hr && jobAccepting(j) ? `<div class="actions">${applied ? `<span class="badge b-approved">Applied</span>` : `<button class="btn btn-primary" data-apply="${j.id}">Apply</button>`}</div>` : ""}
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
  const records = state.payroll || [];
  const years = [...new Set([todayIso().slice(0, 4), ...records.map((record) => String(record.period || "").slice(0, 4)).filter(Boolean)])]
    .sort((a, b) => b.localeCompare(a));
  const periods = [...new Set([viewMode.payrollPeriod, ...records.map((record) => String(record.period || "").slice(0, 7)).filter(Boolean)])]
    .sort((a, b) => b.localeCompare(a));
  const period = periods.includes(viewMode.payrollPeriod) ? viewMode.payrollPeriod : periods[0];
  viewMode.payrollPeriod = period;
  const summaryYear = years.includes(viewMode.payrollSummaryYear) ? viewMode.payrollSummaryYear : years[0];
  const companyYear = years.includes(viewMode.payrollCompanyYear) ? viewMode.payrollCompanyYear : years[0];
  viewMode.payrollSummaryYear = summaryYear;
  viewMode.payrollCompanyYear = companyYear;
  const allPeriodRows = records.filter((record) => String(record.period || "").slice(0, 7) === period);
  const query = (viewMode.payrollQuery || "").trim().toLowerCase();
  const rows = allPeriodRows
    .filter((record) => `${record.employee} ${record.department || ""}`.toLowerCase().includes(query))
    .sort((a, b) => String(a.employee).localeCompare(String(b.employee)));
  const counted = allPeriodRows.filter((record) => record.status !== "Rejected");
  const total = (key) => counted.reduce((sum, record) => sum + Number(record[key] || 0), 0);
  const summaryRows = records.filter((record) =>
    String(record.period || "").slice(0, 4) === summaryYear && record.status !== "Rejected"
  );
  const summaryGroups = new Map();
  summaryRows.forEach((record) => {
    const date = viewMode.payrollRange === "Weekly" ? (record.payDate || record.period) : record.period;
    const key = viewMode.payrollRange === "Yearly" ? String(record.period).slice(0, 4) :
      viewMode.payrollRange === "Weekly" ? payrollWeekStart(date) : String(record.period).slice(0, 7);
    const group = summaryGroups.get(key) || { period: key, gross: 0, net: 0 };
    group.gross += Number(record.gross || 0);
    group.net += Number(record.net || 0);
    summaryGroups.set(key, group);
  });
  const trend = [...summaryGroups.values()].sort((a, b) => a.period.localeCompare(b.period)).slice(-12);
  const maxGross = Math.max(1, ...trend.map((item) => item.gross));
  const companyRecords = records.filter((record) =>
    String(record.period || "").slice(0, 4) === companyYear && record.status !== "Rejected"
  );
  const companyTotal = (key) => companyRecords.reduce((sum, record) => sum + Number(record[key] || 0), 0);
  const fmtPeriod = (value) => new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(`${value}-01T00:00:00`));
  return `
    <div class="page-head"><div><span class="eyebrow">TALENT &amp; PAY</span><h2>Payroll</h2><p>${fmtPeriod(period)} · Payroll register and processing</p></div>
      <button class="btn btn-primary" data-open="payroll">+ Add payroll</button></div>
    <div class="stats">
      <div class="stat"><div class="k">Gross payroll</div><div class="n">${kina(total("gross"))}</div><div class="s">${counted.length} active entries</div></div>
      <div class="stat"><div class="k">Net payroll</div><div class="n">${kina(total("net"))}</div><div class="s">Pending and completed</div></div>
      <div class="stat"><div class="k">NASFUND · staff 6%</div><div class="n">${kina(total("nasfund"))}</div><div class="s">Employee contributions</div></div>
      <div class="stat"><div class="k">PAYE</div><div class="n">${kina(total("tax"))}</div><div class="s">PNG income tax</div></div>
      <div class="stat"><div class="k">Pending review</div><div class="n">${allPeriodRows.filter((record) => record.status === "Pending").length}</div><div class="s">Awaiting HR finalisation</div></div>
    </div>
    <div class="grid-2 payroll-overview">
      <div class="card"><div class="card-heading"><div><span class="eyebrow">PAY HISTORY</span><h3>Payroll summary</h3></div>
        <div class="payroll-filters">
          <label class="compact-select"><span class="sr-only">Payroll summary interval</span><select id="payroll-summary-range">${["Yearly", "Monthly", "Weekly"].map((range) => `<option${viewMode.payrollRange === range ? " selected" : ""}>${range}</option>`).join("")}</select></label>
          <label class="compact-select"><span class="sr-only">Payroll summary year</span><select id="payroll-summary-year">${years.map((year) => `<option${summaryYear === year ? " selected" : ""}>${year}</option>`).join("")}</select></label>
        </div>
      </div>
      <label class="payroll-period-filter"><span>Payroll list period</span><select id="payroll-period">${periods.map((item) => `<option value="${item}"${item === period ? " selected" : ""}>${fmtPeriod(item)}</option>`).join("")}</select></label>
      ${trend.some((item) => item.gross > 0) ? trend.map((item) => {
        const label = viewMode.payrollRange === "Yearly" ? item.period :
          viewMode.payrollRange === "Weekly" ? `Week of ${item.period}` :
            new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(`${item.period}-01T00:00:00`));
        return `<div class="payroll-trend-row"><span>${label}</span><div class="bar"><span style="width:${Math.max(2, item.gross / maxGross * 100)}%"></span></div><strong>${kina(item.gross)}</strong><small>${kina(item.net)} net</small></div>`;
      }).join("") : `<div class="empty">Payroll summaries will appear after the first entry is generated.</div>`}
      </div>
      <div class="card"><div class="card-heading"><div><span class="eyebrow">ANNUAL BREAKDOWN</span><h3>Company pay</h3></div>
        <label class="compact-select"><span class="sr-only">Company pay year</span><select id="payroll-company-year">${years.map((year) => `<option${companyYear === year ? " selected" : ""}>${year}</option>`).join("")}</select></label>
      </div>
        <div class="pay-row"><span>Basic salary</span><strong>${kina(companyTotal("basicSalary"))}</strong></div>
        <div class="pay-row"><span>Housing allowance</span><strong>${kina(companyTotal("housingAllowance"))}</strong></div>
        <div class="pay-row"><span>Bonus and overtime</span><strong>${kina(companyTotal("bonus") + companyTotal("overtime"))}</strong></div>
        <div class="pay-row"><span>Loan recoveries</span><strong>${kina(companyTotal("loan"))}</strong></div>
        <div class="pay-row total"><span>Net pay</span><span>${kina(companyTotal("net"))}</span></div>
      </div>
    </div>
    <div class="card payroll-register">
      <div class="card-heading payroll-register-heading"><div><span class="eyebrow">PAYROLL REGISTER</span><h3>Payroll list</h3><p class="meta">${allPeriodRows.length} entries · ${fmtPeriod(period)}</p></div>
        <button class="btn btn-ghost" data-payroll-export>Download report</button>
      </div>
      <div class="toolbar"><input class="search" id="payroll-search" type="search" placeholder="Search employee or department..." value="${esc(viewMode.payrollQuery || "")}" />
        <span class="meta">${allPeriodRows.filter((record) => record.status === "Completed").length} completed · ${allPeriodRows.filter((record) => record.status === "Rejected").length} rejected</span>
      </div>
      <div class="payroll-table-wrap"><table class="plain payroll-table"><thead><tr>
        <th>Employee</th><th>Total / working days</th><th>Basic</th><th>HRA</th><th>Bonus</th><th>Overtime</th><th>NASFUND</th><th>PAYE</th><th>Loan</th><th>Other</th><th>Net pay</th><th>Status</th><th>Action</th>
      </tr></thead><tbody>${rows.map((record) => `<tr>
        <td><strong>${esc(record.employee)}</strong><div class="meta">${esc(record.department || "")}</div></td>
        <td>${Number(record.totalDays || 0)} / ${Number(record.workingDays || 0)}</td>
        <td>${kina2(record.basicSalary ?? record.gross)}</td><td>${kina2(record.housingAllowance || 0)}</td><td>${kina2(record.bonus || 0)}</td>
        <td>${kina2(record.overtime || 0)}</td><td>${kina2(record.nasfund || 0)}</td><td>${kina2(record.tax || 0)}</td><td>${kina2(record.loan || 0)}</td>
        <td>${kina2(record.otherDeductions || 0)}</td><td><strong>${kina2(record.net)}</strong></td><td>${badge(record.status || "Completed")}</td>
        <td>${record.status === "Pending" ? `<div class="payroll-actions"><button class="btn btn-ok" data-payroll-status="${record.id}" data-status="Completed">Complete</button><button class="btn btn-danger" data-payroll-status="${record.id}" data-status="Rejected">Reject</button></div>` : "—"}</td>
      </tr>`).join("") || `<tr><td colspan="13"><div class="empty">${query ? "No payroll entries match your search." : "No payroll entries for this period yet. Add an employee payroll entry to begin."}</div></td></tr>`}</tbody></table></div>
    </div>`;
}

function renderPayslip() {
  const person = me();
  const ownPayroll = (state.payroll || []).filter((record) =>
    record.employeeId === person.id && record.status === "Completed"
  ).sort((a, b) => String(b.period).localeCompare(String(a.period)));
  const currentPeriodEntry = (state.payroll || []).find((record) =>
    record.employeeId === person.id && String(record.period || "").slice(0, 7) === viewMode.payrollPeriod
  );
  const savedPayroll = currentPeriodEntry || ownPayroll[0];
  const p = savedPayroll ? {
    ...savedPayroll,
    baseGross: Number(savedPayroll.basicSalary ?? savedPayroll.gross),
    employerNasfund: Number(savedPayroll.basicSalary ?? savedPayroll.gross) * 0.084,
    loans: state.loans.filter((loan) => (loan.employeeId === person.id || loan.employee === person.name) &&
      loan.status === "Approved" && (loan.amount - (loan.repaid || 0)) > 0)
  } : payslip(person);
  const payrollMonth = savedPayroll ? String(savedPayroll.period).slice(0, 7) : viewMode.payrollPeriod;
  return `
    <div class="page-head"><div><h2>Payslip</h2><p>${new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date(`${payrollMonth}-01T00:00:00`))} · ${esc(person.name)}</p></div></div>
    ${savedPayroll?.status === "Completed" ? `<div class="card payslip-status"><strong>Finalised payroll</strong>${badge(savedPayroll.status)}</div>` :
      savedPayroll?.status === "Pending" ? `<div class="card payslip-status"><strong>Payroll awaiting HR review</strong>${badge(savedPayroll.status)}</div>` :
        savedPayroll?.status === "Rejected" ? `<div class="card payslip-status"><strong>Payroll entry was rejected</strong>${badge(savedPayroll.status)}</div>` :
          `<div class="card payslip-status"><strong>Estimated payslip</strong><span class="meta">Your payslip will be finalised after HR generates and completes this period's payroll.</span></div>`}
    <div class="grid-2">
      <div class="card">
        <h3>${savedPayroll ? "Final pay" : "Estimated pay"}</h3>
        <div class="pay-row"><span>Basic salary</span><span>${kina2(p.baseGross)}</span></div>
        <div class="pay-row"><span>Housing allowance</span><span>+ ${kina2(p.housingAllowance || 0)}</span></div>
        <div class="pay-row"><span>Bonus</span><span>+ ${kina2(p.bonus || 0)}</span></div>
        <div class="pay-row"><span>Approved overtime</span><span>+ ${kina2(p.overtime)}</span></div>
        <div class="pay-row"><span>NASFUND employee 6%</span><span>− ${kina2(p.nasfund)}</span></div>
        <div class="pay-row"><span>PAYE (PNG bands, simplified)</span><span>− ${kina2(p.tax)}</span></div>
        <div class="pay-row"><span>Staff loan repayment</span><span>− ${kina2(p.loan)}</span></div>
        <div class="pay-row"><span>Other deductions</span><span>− ${kina2(p.otherDeductions || 0)}</span></div>
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
  const completedPayroll = (state.payroll || []).find((record) =>
    record.employeeId === person.id && String(record.period || "").slice(0, 7) === viewMode.payrollPeriod &&
    record.status === "Completed"
  );
  const p = completedPayroll || payslip(person);
  const myLeave = state.leave.filter((l) => l.employee === person.name);
  const pendingL = myLeave.filter((l) => l.status === "Pending").length;
  const myLoans = state.loans.filter((l) => l.employee === person.name);
  const pendingN = myLoans.filter((l) => l.status === "Pending").length;
  const annualLeft = Math.max(0, 20 - leaveUsed(person.name, "Annual"));
  const sickLeft = Math.max(0, 15 - leaveUsed(person.name, "Sick"));
  const applications = (state.applications || []).filter((application) =>
    application.employeeId === person.id || application.employee === person.name
  ).sort((a, b) => String(b.at).localeCompare(String(a.at)));
  const openJobs = state.jobs.filter(jobAccepting);
  const monthAttendance = attendanceRecords().filter((record) =>
    record.employeeId === person.id && String(record.date || "").slice(0, 7) === todayIso().slice(0, 7)
  );
  const presentDays = monthAttendance.filter((record) => record.status === "Present" || record.status === "Remote").length;
  const pendingPayroll = (state.payroll || []).find((record) =>
    record.employeeId === person.id && String(record.period || "").slice(0, 7) === viewMode.payrollPeriod &&
    record.status === "Pending"
  );
  const notifications = notificationsForSession();
  const firstName = person.name.replace(/^(Dr|Prof)\.\s*/i, "").split(/\s+/)[0];
  return `
    <div class="page-head"><div><span class="eyebrow">STAFF SELF-SERVICE · VUDAL CAMPUS</span><h2>Welcome, ${esc(firstName)}</h2>
      <p>${esc(person.role)} · ${esc(person.dept)} · ${new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date(`${todayIso()}T00:00:00`))}</p></div>
      <button class="btn btn-primary" data-open="leave">Request leave</button></div>
    <div class="stats dashboard-staff-stats">
      <div class="stat"><div class="k">Annual leave remaining <span class="icon-chip ic-p">${ICONS.leave}</span></div><div class="n">${annualLeft}<small> days</small></div><div class="s">of 20 days · ${pendingL} request${pendingL === 1 ? "" : "s"} pending</div></div>
      <div class="stat"><div class="k">Sick leave remaining <span class="icon-chip ic-o">${ICONS.leave}</span></div><div class="n">${sickLeft}<small> days</small></div><div class="s">of 15 days available</div></div>
      <div class="stat"><div class="k">Net pay · ${esc(new Intl.DateTimeFormat("en", { month: "short" }).format(new Date(`${viewMode.payrollPeriod}-01T00:00:00`)))} <span class="icon-chip ic-g">${ICONS.pay}</span></div><div class="n dashboard-stat-money">${kina(p.net)}</div><div class="s">${completedPayroll ? "Finalised payslip" : pendingPayroll ? "Payroll awaiting HR review" : "Current estimated pay"}</div></div>
      <div class="stat"><div class="k">Job applications <span class="icon-chip ic-b">${ICONS.jobs}</span></div><div class="n">${applications.length}</div><div class="s">${applications.filter((application) => application.status === "Pending").length} under review</div></div>
    </div>
    <div class="dashboard-overview staff-dashboard-overview">
      <section class="card staff-profile-card">
        <div class="card-heading"><div><span class="eyebrow">MY WORKSPACE</span><h3>Employment overview</h3></div>${badge(person.status)}</div>
        <div class="staff-profile-summary">${employeeAvatarHtml(person)}<div><strong>${esc(person.name)}</strong><small>${esc(person.role)}</small><small>${esc(person.dept)} · ${esc(person.type)}</small></div></div>
        <div class="dashboard-profile-data"><div><span>Annual salary</span><strong>${kina(person.salary)}</strong></div><div><span>Attendance this month</span><strong>${presentDays} day${presentDays === 1 ? "" : "s"}</strong></div><div><span>Loan requests pending</span><strong>${pendingN}</strong></div></div>
        <button class="link" data-go="profile">View my profile →</button>
      </section>
      <section class="card staff-actions-card"><div class="card-heading"><div><span class="eyebrow">QUICK ACTIONS</span><h3>What would you like to do?</h3></div></div>
        <div class="staff-quick-actions">
          <button type="button" data-open="leave"><span class="icon-chip ic-p">${ICONS.leave}</span><strong>Request leave</strong><small>Submit dates and reason to HR</small></button>
          <button type="button" data-open="loan"><span class="icon-chip ic-g">${ICONS.loans}</span><strong>Apply for a loan</strong><small>Check your request status</small></button>
          <button type="button" data-go="payslip"><span class="icon-chip ic-o">${ICONS.pay}</span><strong>View payslip</strong><small>Review deductions and net pay</small></button>
          <button type="button" data-go="jobs"><span class="icon-chip ic-b">${ICONS.jobs}</span><strong>Browse internal jobs</strong><small>${openJobs.length} open position${openJobs.length === 1 ? "" : "s"}</small></button>
        </div>
      </section>
      <section class="card staff-applications-card"><div class="card-heading"><div><span class="eyebrow">CAREER &amp; DEVELOPMENT</span><h3>My job applications</h3></div><button class="link" data-go="jobs">Browse jobs →</button></div>
        ${applications.length ? applications.slice(0, 4).map((application) => {
          const job = state.jobs.find((item) => item.id === application.jobId);
          return `<button class="staff-application-row" type="button" data-job="${application.jobId}">
            <span><strong>${esc(job?.title || "Job posting")}</strong><small>Applied ${esc(application.at)}</small></span>${badge(application.status)}</button>`;
        }).join("") : `<div class="empty">You have not applied for an internal position yet. Browse current vacancies when you are ready.</div>`}
      </section>
      <section class="card staff-leave-card"><div class="card-heading"><div><span class="eyebrow">TIME OFF</span><h3>Recent leave requests</h3></div><button class="link" data-go="leave">View leave →</button></div>
        ${myLeave.length ? [...myLeave].sort((a, b) => String(b.start).localeCompare(String(a.start))).slice(0, 4).map((leave) =>
          `<div class="leave-mini"><div><strong>${esc(leave.type)}</strong><div class="meta">${esc(leave.start)}${leave.end && leave.end !== leave.start ? ` → ${esc(leave.end)}` : ""}</div></div>${badge(leave.status)}</div>`
        ).join("") : `<div class="empty">No leave requests on file.</div>`}
      </section>
      <section class="card staff-notifications-card"><div class="card-heading"><div><span class="eyebrow">UPDATES</span><h3>Notifications</h3></div></div>
        ${notifications.length ? notifications.slice(0, 5).map((n) => `
          <div class="leave-mini notification-row">
            <div><strong>${esc(n.title || "Notification")}</strong><div class="meta">${esc(n.message || "")}</div><div class="meta">${esc(n.createdAt)}</div></div>
            <button class="btn btn-ghost" data-notification="${n.id}">View</button>
          </div>`).join("") : `<div class="empty">No new notifications.</div>`}
      </section>
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
      <div><h3 style="margin:0">${esc(emp.name)}</h3><div class="meta">${esc(emp.role)}</div></div>
    </div>
    <div class="kv" style="margin-top:0"><span>${esc(emp.type)}</span><span>${esc(emp.dept)}</span>${emp.employeeNumber ? `<span>ID ${esc(emp.employeeNumber)}</span>` : ""}<span>Hired ${esc(emp.hiredOn || "date not recorded")}</span>${badge(emp.status)}</div>
    <p class="modal-copy">${esc(emp.email)}${emp.phone ? ` · ${esc(emp.phone)}` : ""} · annual ${kina(emp.salary)}</p>
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
  if (!DEMO_MODE && !doc.dataUrl) { downloadProtectedDocument(doc, fromAppId); return; }
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
async function downloadProtectedDocument(doc, fromAppId) {
  try {
    const response = await fetch(`${API_BASE}/documents/${encodeURIComponent(doc.id)}/download`, { credentials: "same-origin" });
    if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || `Download failed (${response.status})`); }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const emp = doc.employeeId ? state.employees.find((e) => e.id === doc.employeeId) : null;
    const back = fromAppId ? `<button type="button" class="link" data-app-back="${fromAppId}">← Back to application</button>` : emp ? `<button type="button" class="link" data-emp-back="${emp.id}">← Back to ${esc(emp.name)}</button>` : "";
    const isImg = (doc.mime || "").startsWith("image/");
    showModal(`${back}<h3 style="margin-top:10px">${esc(doc.name)}</h3><div class="file-preview">${isImg ? `<img src="${url}" alt="${esc(doc.name)}" />` : `<iframe title="${esc(doc.name)}" src="${url}"></iframe>`}</div><div class="modal-actions"><a class="btn btn-primary" href="${url}" download="${esc(doc.name)}">Download</a><button type="button" class="btn btn-ghost" data-close>Close</button></div>`, true);
  } catch (error) { toast(error.message); }
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
  if (!DEMO_MODE) {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("employee_id", emp.id);
      form.append("kind", fields.kind || "Other");
      if (fields.replaceId) form.append("replace_id", fields.replaceId);
      await apiRequest("/documents/upload", { method: "POST", body: form });
      await loadCoreFromApi();
      toast(`Recorded ${fields.kind || "file"} metadata. Configure private object storage for file bytes.`);
      return true;
    } catch (error) { toast(error.message); return false; }
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
              <div><strong>${esc(a.employee)}</strong>
                <div class="meta">${a.employeeId ? "Internal" : "External"} · filed ${esc(a.at)} · ${appDocs(a).length} file${appDocs(a).length === 1 ? "" : "s"}</div>
                <div class="meta">${fit.qualified ? "Likely qualifies" : "May not meet the bar"} · score ${fit.score}</div>
              </div></div>
            ${badge(a.status)}
          </button>`;
      }).join("") : `<div class="empty">No applications yet.</div>`)
    : (mine
      ? `<div class="card" style="margin:0;box-shadow:none"><p class="meta">You applied on ${esc(mine.at)}.</p>${badge(mine.status)}<p class="modal-copy">${esc(mine.statement || "")}</p></div>`
      : `<p class="meta">You have not applied for this posting.</p>`);
  showModal(`
    <h3>${esc(j.title)}</h3>
    <div class="kv" style="margin-top:0"><span>${esc(j.dept)}</span><span>${esc(j.type || "Full-Time")}</span><span>${esc(j.band || "Staff")}</span><span>${esc(j.pay)}</span>${j.closesOn ? `<span>Closes ${esc(j.closesOn)}</span>` : ""}${badge(jobExpired(j) ? "Expired" : j.status)}</div>
    <p class="modal-copy">${esc(j.desc)}</p>
    <h4 class="modal-sub">${hr ? `${apps.length} applications — review candidates, shortlist, schedule interviews, then select` : "Your application"}</h4>
    ${list}
    <div class="modal-actions">
      <button type="button" class="btn btn-ghost" data-close>Close</button>
      ${hr && j.status === "Draft" ? `<button type="button" class="btn btn-brand" data-publish="${j.id}">Publish</button>` : ""}
      ${hr && jobAccepting(j) ? `<button type="button" class="btn btn-ghost" data-close-job="${j.id}">Close posting</button>` : ""}
      ${hr && j.status === "Closed" ? `<button type="button" class="btn btn-ghost" data-reopen-job="${j.id}">Reopen posting</button>` : ""}
      ${!hr && jobAccepting(j) && !mine ? `<button type="button" class="btn btn-primary" data-apply="${j.id}">Apply</button>` : ""}
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
  const contractSigned = app.contractStatus === "Signed" || app.status === "Contract signed";
  const stageActions = {
    Pending: [["Shortlisted", "Shortlist", "btn-ok"], ["Declined", "Decline", "btn-danger"]],
    Shortlisted: [["Interviewed", "Mark interviewed", "btn-ok"], ["Declined", "Decline", "btn-danger"]],
    Interviewed: [["Accepted", "Select candidate", "btn-ok"], ["Declined", "Decline", "btn-danger"]]
  }[app.status] || [];
  const interviewValue = app.interviewAt || "";
  showModal(`
    <button type="button" class="link" data-job-back="${j.id}">← Back to ${esc(j.title)}</button>
    <h3 style="margin-top:10px">${esc(app.employee)}</h3>
    <div class="kv" style="margin-top:0">
      <span>${app.employeeId ? "Internal staff" : "External"}</span>
      <span>Applied ${esc(app.at)}</span>
      ${app.email ? `<span>${esc(app.email)}</span>` : ""}
      ${emp ? `<span>${esc(emp.role)} · ${esc(emp.dept)}</span>` : ""}
      ${badge(app.status)}
      ${contractSigned ? badge("Contract signed") : ""}
    </div>
    <div class="fit-box ${fit.qualified ? "fit-yes" : "fit-no"}">
      <div class="row-between"><strong>${fit.qualified ? "Qualifies for shortlist" : "Does not clearly qualify"}</strong><span>Score ${fit.score}/100</span></div>
      <div class="bar" style="margin:10px 0 8px"><span style="width:${fit.score}%"></span></div>
      <ul class="fit-list">${fit.reasons.map((r) => `<li>${r}</li>`).join("")}</ul>
    </div>
    <h4 class="modal-sub">Education</h4>
    <p class="modal-copy">${esc(app.education || "Not supplied.")}</p>
    <h4 class="modal-sub">Experience</h4>
    <p class="modal-copy">${esc(app.experience || "Not supplied.")}</p>
    <h4 class="modal-sub">Statement</h4>
    <p class="modal-copy">${esc(app.statement || "No covering statement.")}</p>
    ${emp ? `<p class="meta">On file: ${esc(emp.email)} · ${kina(emp.salary)} annual · ${esc(emp.status)}</p>` : ""}
    <h4 class="modal-sub">Applicant files</h4>
    <p class="meta">${emp
      ? "Personnel files from this staff record, including resume and certificates."
      : "Files submitted with this external application."}</p>
    ${fileRowsHtml(docs, { fromAppId: app.id, empty: emp ? "No personnel files on this staff record yet." : "No files were attached to this application." })}
    <h4 class="modal-sub">Interview schedule</h4>
    <form id="f-interview" class="interview-scheduler">
      <input type="hidden" name="applicationId" value="${app.id}" />
      <label for="interview-at">Date and time</label><input id="interview-at" name="interviewAt" type="datetime-local" value="${esc(interviewValue)}" />
      <button class="btn btn-ghost" type="submit">Save schedule</button>
    </form>
    <div class="modal-actions">
      <button type="button" class="btn btn-ghost" data-job-back="${j.id}">Back</button>
      ${stageActions.map(([status, label, cls]) => `<button type="button" class="btn ${cls}" data-app-act="${status}" data-app-id="${app.id}">${label}</button>`).join("")}
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

async function applyToJob(jobId) {
  const person = me();
  const job = state.jobs.find((j) => j.id === jobId);
  if (!person || !job || !jobAccepting(job)) {
    toast("This posting is no longer accepting applications.");
    return;
  }
  state.applications = state.applications || [];
  if (state.applications.some((a) => a.jobId === job.id && (a.employeeId === person.id || a.employee === person.name))) return;
  const application = {
    id: uid("a"),
    jobId: job.id,
    employee: person.name,
    employeeId: person.id,
    at: todayIso(),
    email: person.email,
    education: `${person.type} appointment at UNRE`,
    experience: `${person.role}, ${person.dept}`,
    statement: "Internal application submitted from staff self-service.",
    status: "Pending"
  };
  if (!DEMO_MODE) {
    try {
      const result = await apiRequest("/applications", { method: "POST", body: JSON.stringify({
        job_id: job.id, employee_id: person.id, applicant_name: person.name, applicant_email: person.email,
        education: application.education, experience: application.experience, statement: application.statement, status: "Pending"
      }) });
      application.id = result.id;
    } catch (error) { toast(error.message); return; }
  }
  state.applications.push(application);
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

function openModal(kind, attendanceEmployeeId, attendanceDate) {
  if (kind === "payroll" && !isHr()) return;
  if (kind === "task" && !isHr()) return;
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
  const attendanceEmployee = attendanceEmployeeId || (person ? person.id : state.employees[0]?.id);
  const attendanceRecord = attendanceFor(attendanceEmployee, attendanceDate || todayIso());
  const forms = {
    attendance: `<h3>Record attendance</h3><form id="f-attendance">
      <div class="field"><label>Employee</label><select name="employeeId">${state.employees.map((employee) => `<option value="${employee.id}"${employee.id === attendanceEmployee ? " selected" : ""}>${esc(employee.name)}</option>`).join("")}</select></div>
      <div class="field"><label>Date</label><input type="date" name="date" value="${attendanceDate || todayIso()}" required /></div>
      <div class="field"><label>Status</label><select name="status"><option${attendanceRecord?.status === "Present" ? " selected" : ""}>Present</option><option${attendanceRecord?.status === "Absent" ? " selected" : ""}>Absent</option><option${attendanceRecord?.status === "On Leave" ? " selected" : ""}>On Leave</option><option${attendanceRecord?.status === "Remote" ? " selected" : ""}>Remote</option></select></div>
      <div class="field"><label>Note</label><textarea name="note" rows="2">${esc(attendanceRecord?.note || "")}</textarea></div>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save attendance</button></div></form>`,
    employee: `<h3>Add employee</h3><form class="form-grid" id="f-emp">
      <div class="span-2"><label>Full name</label><input name="name" required /></div>
      <div><label>Role</label><input name="role" required /></div>
      <div><label>Type</label><select name="type"><option>Faculty</option><option>Staff</option><option>Adjunct</option><option>Research</option></select></div>
      <div><label>Department</label><select name="dept">${deptOpts}</select></div>
      <div><label>Email</label><input name="email" type="email" required /></div>
      <div><label>Employee ID (optional)</label><input name="employeeNumber" maxlength="80" /></div>
      <div><label>Phone (optional)</label><input name="phone" type="tel" maxlength="40" /></div>
      <div><label>Hire date (optional)</label><input name="hiredOn" type="date" /></div>
      <div class="span-2"><label>Annual salary (Kina)</label><input name="salary" type="number" min="1" required /></div>
      <div class="span-2"><label>Profile photo</label><input type="file" name="photo" accept="image/*" /></div>
      <p class="meta span-2">Record a hire date, employee ID, and contact details when available. In demo mode, staff can sign in with the demo password. Backend self-service accounts must be provisioned separately.</p>
      <div class="span-2 modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save</button></div></form>`,
    task: `<h3>Assign a task</h3><form id="f-task">
      <div class="field"><label for="task-title">Task title</label><input id="task-title" name="title" maxlength="180" required /></div>
      <div class="field"><label for="task-assignee">Assign to</label><select id="task-assignee" name="employeeId" required>${state.employees.filter((employee) => employee.status !== "Inactive").map((employee) => `<option value="${employee.id}">${esc(employee.name)} · ${esc(employee.dept)}</option>`).join("")}</select></div>
      <div class="form-grid"><div><label for="task-priority">Priority</label><select id="task-priority" name="priority"><option>Normal</option><option>High</option><option>Low</option></select></div>
        <div><label for="task-start">Start date</label><input id="task-start" name="startDate" type="date" value="${todayIso()}" required /></div>
        <div><label for="task-due">Due date</label><input id="task-due" name="dueDate" type="date" value="${addDaysIso(todayIso(), 7)}" required /></div></div>
      <div class="field"><label for="task-description">Description</label><textarea id="task-description" name="description" rows="4" maxlength="2000" required></textarea></div>
      <p class="meta">The assignee can view this task in My tasks and update its progress.</p>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Assign task</button></div></form>`,
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
      <div class="field"><label for="job-title">Job title</label><input id="job-title" name="title" required /></div>
      <div class="field"><label for="job-department">Department</label><select id="job-department" name="dept">${deptOpts}</select></div>
      <div class="form-grid"><div><label for="job-type">Appointment</label><select id="job-type" name="type"><option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Tenure-Track</option></select></div>
      <div><label for="job-band">Employee band</label><select id="job-band" name="band"><option>Faculty</option><option>Staff</option><option>Adjunct</option><option>Research</option></select></div></div>
      <div class="form-grid"><div><label for="job-pay">Annual salary range</label><input id="job-pay" name="pay" placeholder="K48k–K55k" required /></div>
      <div><label for="job-location">Location</label><input id="job-location" name="location" placeholder="UNRE campus" value="UNRE campus" /></div></div>
      <div class="field"><label for="job-closes">Application closing date</label><input id="job-closes" name="closesOn" type="date" min="${todayIso()}" required /></div>
      <div class="field"><label for="job-description">Role description and requirements</label><textarea id="job-description" name="desc" rows="4" required></textarea></div>
      <p class="meta">The posting is saved as a draft. Review it and publish when ready for internal applications.</p>
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
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save overtime</button></div></form>`,
    payroll: `<h3>Add payroll</h3><form id="f-payroll">
      <div class="field"><label for="payroll-employee">Employee name</label><select name="employeeId" id="payroll-employee" required>${empOpts}</select></div>
      <div class="form-grid"><div><label for="payroll-pay-date">Select pay date</label><input id="payroll-pay-date" name="payDate" type="date" value="${todayIso()}" required /></div>
        <div><label for="payroll-basic">Basic salary (monthly Kina)</label><input id="payroll-basic" name="basicSalary" type="number" min="0.01" step="0.01" value="${((state.employees[0]?.salary || 0) / 12).toFixed(2)}" required /></div></div>
      <div class="form-grid"><div><label for="payroll-hra">Housing allowance</label><input id="payroll-hra" name="housingAllowance" type="number" min="0" step="0.01" value="0" /></div>
        <div><label for="payroll-bonus">Bonus</label><input id="payroll-bonus" name="bonus" type="number" min="0" step="0.01" value="0" /></div></div>
      <div class="field"><label for="payroll-other-deductions">Other authorised deductions</label><input id="payroll-other-deductions" name="otherDeductions" type="number" min="0" step="0.01" value="0" /></div>
      <div class="payroll-preview" id="payroll-preview" aria-live="polite"></div>
      <p class="meta">PNG PAYE, employee NASFUND (6%), approved loan recovery, and recorded overtime are included in the calculation. New entries are saved as Pending for review.</p>
      <div class="modal-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Generate payroll</button></div></form>`
  };
  back.innerHTML = `<div class="modal">${forms[kind]}</div>`;
  back.classList.remove("hidden");
  if (kind === "payroll") {
    const form = document.getElementById("f-payroll");
    const refresh = () => updatePayrollPreview(form);
    form.addEventListener("input", refresh);
    form.addEventListener("change", (event) => {
      if (event.target.name === "employeeId") {
        const employee = state.employees.find((item) => item.id === event.target.value);
        if (employee) document.getElementById("payroll-basic").value = (employee.salary / 12).toFixed(2);
      }
      refresh();
    });
    refresh();
  }
}

function updatePayrollPreview(form) {
  if (!form) return;
  const employee = state.employees.find((item) => item.id === form.elements.employeeId.value);
  const period = form.elements.payDate.value.slice(0, 7);
  const preview = document.getElementById("payroll-preview");
  if (!employee || !period || !preview) return;
  const existing = (state.payroll || []).some((record) =>
    record.employeeId === employee.id && String(record.period || "").slice(0, 7) === period &&
    record.status !== "Rejected"
  );
  if (existing) {
    preview.innerHTML = `<strong>Payroll already exists for ${esc(employee.name)} in ${esc(period)}.</strong> Choose another employee or pay date.`;
    form.querySelector('[type="submit"], button:not([type="button"])').disabled = true;
    return;
  }
  form.querySelector('[type="submit"], button:not([type="button"])').disabled = false;
  const pay = payslip(employee, period, {
    basicSalary: Number(form.elements.basicSalary.value),
    housingAllowance: Number(form.elements.housingAllowance.value),
    bonus: Number(form.elements.bonus.value),
    otherDeductions: Number(form.elements.otherDeductions.value)
  });
  const submit = form.querySelector('[type="submit"], button:not([type="button"])');
  submit.disabled = pay.net < 0;
  preview.innerHTML = `<div><span>Gross pay</span><strong>${kina2(pay.gross)}</strong></div>
    <div><span>NASFUND · PAYE · loan</span><strong>${kina2(pay.nasfund)} · ${kina2(pay.tax)} · ${kina2(pay.loan)}</strong></div>
    <div class="payroll-preview-net"><span>Estimated net pay</span><strong>${kina2(pay.net)}</strong></div>
    <small>${pay.net < 0 ? "Deductions exceed gross pay. Adjust the amounts to continue." : `${monthDateRange(period).days} calendar days · ${workingDaysInMonth(period)} working days`}</small>`;
}

function closeModal() { document.getElementById("modal").classList.add("hidden"); }

function bindPage(page) {
  document.querySelectorAll("[data-go]").forEach((b) => { b.onclick = () => { location.hash = "#/" + b.dataset.go; }; });
  const analyticsYear = document.getElementById("analytics-year");
  if (analyticsYear) analyticsYear.onchange = () => {
    viewMode.analyticsYear = analyticsYear.value;
    route();
  };
  document.querySelectorAll("[data-analytics-export]").forEach((button) => {
    button.onclick = () => {
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const lines = [
        ["Category", "Measure", "Value", "Period"],
        ...viewMode.analyticsRows.map((row) => row.map(csvCell))
      ].map((row) => row.join(","));
      const url = URL.createObjectURL(new Blob(["\uFEFF", lines.join("\r\n")], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `unre-hr-analytics-${viewMode.analyticsYear}.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  });
  const dashboardPayrollYear = document.getElementById("dashboard-payroll-year");
  if (dashboardPayrollYear) dashboardPayrollYear.onchange = () => {
    viewMode.dashboardYear = dashboardPayrollYear.value;
    route();
  };
  const payrollPeriod = document.getElementById("payroll-period");
  if (payrollPeriod) payrollPeriod.onchange = () => {
    viewMode.payrollPeriod = payrollPeriod.value;
    viewMode.payrollSummaryYear = payrollPeriod.value.slice(0, 4);
    viewMode.payrollCompanyYear = payrollPeriod.value.slice(0, 4);
    viewMode.payrollQuery = "";
    route();
  };
  const payrollSummaryRange = document.getElementById("payroll-summary-range");
  if (payrollSummaryRange) payrollSummaryRange.onchange = () => {
    viewMode.payrollRange = payrollSummaryRange.value;
    route();
  };
  const payrollSummaryYear = document.getElementById("payroll-summary-year");
  if (payrollSummaryYear) payrollSummaryYear.onchange = () => {
    viewMode.payrollSummaryYear = payrollSummaryYear.value;
    route();
  };
  const payrollCompanyYear = document.getElementById("payroll-company-year");
  if (payrollCompanyYear) payrollCompanyYear.onchange = () => {
    viewMode.payrollCompanyYear = payrollCompanyYear.value;
    route();
  };
  const payrollSearch = document.getElementById("payroll-search");
  if (payrollSearch) payrollSearch.oninput = () => {
    viewMode.payrollQuery = payrollSearch.value;
    route();
    const next = document.getElementById("payroll-search");
    if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
  };
  document.querySelectorAll("[data-payroll-export]").forEach((button) => {
    button.onclick = () => {
      const records = (state.payroll || []).filter((record) =>
        String(record.period || "").slice(0, 7) === viewMode.payrollPeriod
      );
      if (!records.length) { toast("There are no payroll entries to download for this period."); return; }
      const columns = [
        ["Employee", "employee"], ["Department", "department"], ["Pay date", "payDate"],
        ["Status", "status"], ["Total days", "totalDays"], ["Working days", "workingDays"],
        ["Basic salary", "basicSalary"], ["Housing allowance", "housingAllowance"],
        ["Bonus", "bonus"], ["Overtime", "overtime"], ["Gross", "gross"],
        ["NASFUND", "nasfund"], ["PAYE", "tax"], ["Loan recovery", "loan"],
        ["Other deductions", "otherDeductions"], ["Net pay", "net"]
      ];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [columns.map(([label]) => csvCell(label)).join(","),
        ...records.map((record) => columns.map(([, key]) => csvCell(record[key])).join(","))].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `unre-payroll-${viewMode.payrollPeriod}.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  });
  document.querySelectorAll("[data-payroll-status]").forEach((button) => {
    button.onclick = async () => {
      const record = (state.payroll || []).find((item) => item.id === button.dataset.payrollStatus);
      const nextStatus = button.dataset.status;
      if (!record || record.status !== "Pending" || !["Completed", "Rejected"].includes(nextStatus)) return;
      if (!DEMO_MODE) {
        try {
          await apiRequest(`/payroll/${record.id}`, { method: "PATCH", body: JSON.stringify({ status: nextStatus }) });
          await loadCoreFromApi();
        } catch (error) { toast(error.message); return; }
      } else {
        record.status = nextStatus;
      }
      save();
      toast(`Payroll ${nextStatus.toLowerCase()} for ${record.employee}.`);
      route();
    };
  });
  document.querySelectorAll("[data-open]").forEach((b) => {
    b.onclick = () => openModal(b.dataset.open, b.dataset.attendanceEmployee, b.dataset.attendanceDate);
  });
  document.querySelectorAll("#view [data-app]").forEach((button) => {
    button.onclick = (event) => {
      if (button.tagName === "TR" && event.target.closest("button")) return;
      event.stopPropagation();
      openAppModal(button.dataset.app);
    };
  });
  const recruitmentSearch = document.getElementById("recruitment-search");
  if (recruitmentSearch) recruitmentSearch.oninput = () => {
    viewMode.recruitQuery = recruitmentSearch.value;
    viewMode.recruitPage = 1;
    route();
    const next = document.getElementById("recruitment-search");
    if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
  };
  const recruitmentStatus = document.getElementById("recruitment-status");
  if (recruitmentStatus) recruitmentStatus.onchange = () => {
    viewMode.recruitStatus = recruitmentStatus.value;
    viewMode.recruitPage = 1;
    route();
  };
  const recruitmentJob = document.getElementById("recruitment-job");
  if (recruitmentJob) recruitmentJob.onchange = () => {
    viewMode.recruitJob = recruitmentJob.value;
    viewMode.recruitPage = 1;
    route();
  };
  document.querySelectorAll("[data-recruitment-page]").forEach((button) => {
    button.onclick = () => {
      viewMode.recruitPage = Number(button.dataset.recruitmentPage);
      route();
    };
  });
  document.querySelectorAll("[data-recruitment-export]").forEach((button) => {
    button.onclick = () => {
      const rows = (state.applications || []).filter((app) => {
        const job = state.jobs.find((item) => item.id === app.jobId);
        const query = (viewMode.recruitQuery || "").trim().toLowerCase();
        return (!query || `${app.employee} ${app.email || ""} ${job?.title || ""}`.toLowerCase().includes(query)) &&
          (viewMode.recruitStatus === "All" || app.status === viewMode.recruitStatus) &&
          (viewMode.recruitJob === "All" || app.jobId === viewMode.recruitJob);
      });
      if (!rows.length) { toast("There are no candidates to download for these filters."); return; }
      const columns = [
        ["Candidate", "employee"], ["Email", "email"], ["Job title", "job"],
        ["Applied", "at"], ["Status", "status"], ["Interview date", "interviewAt"],
        ["Education", "education"], ["Experience", "experience"]
      ];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [columns.map(([label]) => csvCell(label)).join(","),
        ...rows.map((app) => columns.map(([, key]) => {
          const job = state.jobs.find((item) => item.id === app.jobId);
          return csvCell(key === "job" ? job?.title || "" : app[key]);
        }).join(","))].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `unre-recruitment-${todayIso()}.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  });
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
  document.querySelectorAll("[data-filter]").forEach((b) => { b.onclick = () => { viewMode.employees = b.dataset.filter; viewMode.employeePage = 1; route(); }; });
  const attendanceDate = document.getElementById("attendance-date");
  if (attendanceDate) attendanceDate.onchange = () => {
    viewMode.attendanceDate = attendanceDate.value;
    viewMode.attendanceMonth = attendanceDate.value.slice(0, 7);
    route();
  };
  const attendanceMonth = document.getElementById("attendance-month");
  if (attendanceMonth) attendanceMonth.onchange = () => {
    if (!attendanceMonth.value) { route(); return; }
    viewMode.attendanceMonth = attendanceMonth.value;
    if (!viewMode.attendanceDate.startsWith(attendanceMonth.value)) viewMode.attendanceDate = `${attendanceMonth.value}-01`;
    route();
  };
  document.querySelectorAll("[data-attendance-shift]").forEach((button) => {
    button.onclick = () => {
      viewMode.attendanceMonth = shiftMonthIso(viewMode.attendanceMonth || todayIso().slice(0, 7), Number(button.dataset.attendanceShift));
      viewMode.attendanceDate = `${viewMode.attendanceMonth}-01`;
      route();
    };
  });
  document.querySelectorAll("[data-attendance-day]").forEach((button) => {
    button.onclick = () => { viewMode.attendanceDate = button.dataset.attendanceDay; route(); };
  });
  const attendanceSearch = document.getElementById("attendance-search");
  if (attendanceSearch) attendanceSearch.oninput = () => {
    viewMode.attendanceQuery = attendanceSearch.value;
    route();
    const next = document.getElementById("attendance-search");
    if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
  };
  const attendanceDepartment = document.getElementById("attendance-department");
  if (attendanceDepartment) attendanceDepartment.onchange = () => { viewMode.attendanceDept = attendanceDepartment.value; route(); };
  document.querySelectorAll("[data-attendance-export]").forEach((button) => {
    button.onclick = () => {
      const month = viewMode.attendanceMonth || todayIso().slice(0, 7);
      const rows = attendanceRecords().filter((record) => record.date.startsWith(month)).map((record) => {
        const employee = state.employees.find((item) => item.id === record.employeeId);
        return { employee: employee?.name || "", department: employee?.dept || "", appointment: employee?.type || "", ...record };
      });
      if (!rows.length) { toast("There are no attendance records to download for this month."); return; }
      const columns = [["Employee","employee"],["Department","department"],["Appointment","appointment"],["Date","date"],["Status","status"],["Note","note"]];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [columns.map(([label]) => csvCell(label)).join(","), ...rows.map((record) => columns.map(([, key]) => csvCell(record[key])).join(","))].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `unre-attendance-${month}.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  });
  const leaveSearch = document.getElementById("leave-search");
  if (leaveSearch) leaveSearch.oninput = () => {
    viewMode.leaveQuery = leaveSearch.value;
    viewMode.leavePage = 1;
    route();
    const next = document.getElementById("leave-search");
    if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
  };
  const leaveStatus = document.getElementById("leave-status");
  if (leaveStatus) leaveStatus.onchange = () => { viewMode.leaveStatus = leaveStatus.value; viewMode.leavePage = 1; route(); };
  const leaveType = document.getElementById("leave-type");
  if (leaveType) leaveType.onchange = () => { viewMode.leaveType = leaveType.value; viewMode.leavePage = 1; route(); };
  const leaveMonth = document.getElementById("leave-month");
  if (leaveMonth) leaveMonth.onchange = () => { viewMode.leaveMonth = leaveMonth.value; viewMode.leavePage = 1; route(); };
  document.querySelectorAll("[data-leave-shift]").forEach((button) => {
    button.onclick = () => { viewMode.leaveMonth = shiftMonthIso(viewMode.leaveMonth || todayIso().slice(0, 7), Number(button.dataset.leaveShift)); viewMode.leavePage = 1; route(); };
  });
  document.querySelectorAll("[data-leave-page]").forEach((button) => {
    button.onclick = () => { viewMode.leavePage = Number(button.dataset.leavePage); route(); };
  });
  document.querySelectorAll("[data-leave-reset]").forEach((button) => {
    button.onclick = () => { viewMode.leaveQuery = ""; viewMode.leaveStatus = "All"; viewMode.leaveType = "All"; viewMode.leaveMonth = ""; viewMode.leavePage = 1; route(); };
  });
  document.querySelectorAll("[data-leave-export]").forEach((button) => {
    button.onclick = () => {
      const query = (viewMode.leaveQuery || "").trim().toLowerCase();
      const rows = state.leave.filter((item) => {
        const employee = state.employees.find((person) => person.name === item.employee);
        const month = viewMode.leaveMonth || "";
        return (!query || `${item.employee} ${item.dept} ${employee?.role || ""} ${item.note || ""}`.toLowerCase().includes(query)) &&
          (viewMode.leaveStatus === "All" || item.status === viewMode.leaveStatus) &&
          (viewMode.leaveType === "All" || item.type === viewMode.leaveType) &&
          (!month || item.start.slice(0, 7) === month || item.end.slice(0, 7) === month || (item.start < `${month}-01` && item.end >= `${month}-01`));
      });
      if (!rows.length) { toast("There are no leave requests to download for these filters."); return; }
      const columns = [["Employee","employee"],["Department","dept"],["Type","type"],["Start","start"],["End","end"],["Days","days"],["Status","status"],["Note","note"]];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [columns.map(([label]) => csvCell(label)).join(","), ...rows.map((item) => columns.map(([, key]) => csvCell(key === "days" ? daysBetween(item.start, item.end) : item[key])).join(","))].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `unre-leave-${viewMode.leaveMonth || "all"}.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  });
  const employeeSearch = document.getElementById("emp-search");
  if (employeeSearch) employeeSearch.oninput = () => {
    viewMode.empQ = employeeSearch.value;
    viewMode.employeePage = 1;
    route();
    const next = document.getElementById("emp-search");
    if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
  };
  const employeeStatus = document.getElementById("employee-status");
  if (employeeStatus) employeeStatus.onchange = () => { viewMode.employeeStatus = employeeStatus.value; viewMode.employeePage = 1; route(); };
  const employeeDepartment = document.getElementById("employee-department");
  if (employeeDepartment) employeeDepartment.onchange = () => { viewMode.employeeDept = employeeDepartment.value; viewMode.employeePage = 1; route(); };
  document.querySelectorAll("[data-employee-view]").forEach((button) => {
    button.onclick = () => { viewMode.employeeView = button.dataset.employeeView; route(); };
  });
  document.querySelectorAll("[data-employee-page]").forEach((button) => {
    button.onclick = () => { viewMode.employeePage = Number(button.dataset.employeePage); route(); };
  });
  document.querySelectorAll("[data-employee-reset]").forEach((button) => {
    button.onclick = () => { viewMode.empQ = ""; viewMode.employees = "All"; viewMode.employeeStatus = "All"; viewMode.employeeDept = "All"; viewMode.employeePage = 1; route(); };
  });
  document.querySelectorAll("[data-employee-export]").forEach((button) => {
    button.onclick = () => {
      const query = (viewMode.empQ || "").trim().toLowerCase();
      const rows = state.employees.filter((employee) =>
        (viewMode.employees === "All" || employee.type === viewMode.employees) &&
        (viewMode.employeeStatus === "All" || employee.status === viewMode.employeeStatus) &&
        (viewMode.employeeDept === "All" || employee.dept === viewMode.employeeDept) &&
        (!query || `${employee.name} ${employee.email} ${employee.role} ${employee.dept} ${employee.employeeNumber || ""}`.toLowerCase().includes(query))
      );
      if (!rows.length) { toast("There are no employee records to download for these filters."); return; }
      const columns = [["Employee ID","employeeNumber"],["Name","name"],["Role","role"],["Department","dept"],["Appointment","type"],["Email","email"],["Phone","phone"],["Hire date","hiredOn"],["Status","status"]];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [columns.map(([label]) => csvCell(label)).join(","), ...rows.map((employee) => columns.map(([, key]) => csvCell(employee[key])).join(","))].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `unre-employees-${todayIso()}.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  });
  const taskSearch = document.getElementById("task-search");
  if (taskSearch) taskSearch.oninput = () => {
    viewMode.taskQuery = taskSearch.value;
    route();
    const next = document.getElementById("task-search");
    if (next) { next.focus(); next.setSelectionRange(next.value.length, next.value.length); }
  };
  const taskStatusFilter = document.getElementById("task-filter-status");
  if (taskStatusFilter) taskStatusFilter.onchange = () => { viewMode.taskStatus = taskStatusFilter.value; route(); };
  const taskDepartmentFilter = document.getElementById("task-filter-dept");
  if (taskDepartmentFilter) taskDepartmentFilter.onchange = () => { viewMode.taskDept = taskDepartmentFilter.value; route(); };
  document.querySelectorAll("[data-task-view]").forEach((button) => {
    button.onclick = () => { viewMode.taskView = button.dataset.taskView; route(); };
  });
  const taskMonth = document.getElementById("task-month");
  if (taskMonth) taskMonth.onchange = () => {
    if (!taskMonth.value) { route(); return; }
    viewMode.taskMonth = taskMonth.value;
    route();
  };
  document.querySelectorAll("[data-task-month-shift]").forEach((button) => {
    button.onclick = () => { viewMode.taskMonth = shiftMonthIso(viewMode.taskMonth || todayIso().slice(0, 7), Number(button.dataset.taskMonthShift)); route(); };
  });
  document.querySelectorAll("[data-task-status]").forEach((select) => {
    select.onchange = async () => {
      const task = (state.tasks || []).find((item) => item.id === select.dataset.taskStatus);
      const status = select.value;
      if (!task || (!isHr() && task.employeeId !== session.employeeId)) return;
      if (!["New", "In Progress", "Pending", "Done"].includes(status)) { route(); return; }
      if (!DEMO_MODE) {
        try {
          await apiRequest(`/tasks/${task.id}`, { method: "PATCH", body: JSON.stringify({ status }) });
          await loadCoreFromApi();
        } catch (error) { toast(error.message); route(); return; }
      } else {
        task.status = status;
      }
      save();
      toast(`Task updated: ${status}.`);
      route();
    };
  });
  document.querySelectorAll("[data-task-export]").forEach((button) => {
    button.onclick = () => {
      const query = (viewMode.taskQuery || "").trim().toLowerCase();
      const rows = (state.tasks || []).filter((task) => {
        const employee = state.employees.find((item) => item.id === task.employeeId);
        return (!query || `${task.title} ${task.description} ${employee?.name || task.employee || ""} ${employee?.dept || task.dept || ""}`.toLowerCase().includes(query)) &&
          (viewMode.taskStatus === "All" || task.status === viewMode.taskStatus) &&
          (viewMode.taskDept === "All" || employee?.dept === viewMode.taskDept);
      });
      if (!rows.length) { toast("There are no tasks to download for these filters."); return; }
      const columns = [["Task","title"],["Description","description"],["Assignee","employee"],["Department","dept"],["Priority","priority"],["Start date","startDate"],["Due date","dueDate"],["Status","status"]];
      const csvCell = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [columns.map(([label]) => csvCell(label)).join(","), ...rows.map((task) => {
        const employee = state.employees.find((item) => item.id === task.employeeId);
        const values = { ...task, employee: employee?.name || task.employee || "", dept: employee?.dept || task.dept || "" };
        return columns.map(([, key]) => csvCell(values[key])).join(",");
      })].join("\r\n");
      const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `unre-tasks-${todayIso()}.csv`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };
  });
  document.querySelectorAll("[data-leave-view]").forEach((b) => { b.onclick = () => { viewMode.leave = b.dataset.leaveView; route(); }; });
  document.querySelectorAll("[data-attendance]").forEach((b) => { b.onclick = () => {
    if (!isHr()) return;
    const item = attendanceRecords().find((entry) => entry.id === b.dataset.attendance);
    if (!item) return;
    item.status = b.dataset.act;
    save();
    toast(`Attendance updated for ${state.employees.find((employee) => employee.id === item.employeeId)?.name || "employee"}.`);
    route();
  }; });
  document.querySelectorAll("[data-leave]").forEach((b) => { b.onclick = async () => {
    if (!isHr()) return;
    const item = state.leave.find((l) => l.id === b.dataset.leave);
    if (!item || !["Approved", "Rejected"].includes(b.dataset.act)) return;
    const status = b.dataset.act;
    if (!DEMO_MODE) {
      try {
        await apiRequest(`/leave/${item.id}`, { method: "PATCH", body: JSON.stringify({ status }) });
        await refreshCoreAfterApi();
      } catch (error) { toast(error.message); return; }
    }
    const updated = state.leave.find((leave) => leave.id === item.id);
    if (!updated) { toast("Leave request was updated, but could not be found after refresh."); return; }
    updated.status = status;
    const emp = state.employees.find((e) => e.name === item.employee);
    if (emp) {
      addNotification({
        type: "request-status",
        employeeId: emp.id,
        title: `Leave ${status.toLowerCase()}`,
        message: `Your ${item.type.toLowerCase()} leave request for ${item.start} to ${item.end} was ${status.toLowerCase()}.`,
        targetPage: "leave"
      });
    }
    reconcileHrRecords();
    save(); toast(`Leave ${status.toLowerCase()} for ${item.employee}.`); route();
  }; });
  document.querySelectorAll("[data-publish]").forEach((b) => { b.onclick = async (e) => {
    e.stopPropagation();
    const job = state.jobs.find((j) => j.id === b.dataset.publish);
    if (!DEMO_MODE) {
      try { await apiRequest(`/jobs/${job.id}`, { method: "PATCH", body: JSON.stringify({ status: "Open" }) }); }
      catch (error) { toast(error.message); return; }
    }
    job.status = "Open";
    save(); toast("Posting is now open."); route();
  }; });
  document.querySelectorAll("[data-close-job], [data-reopen-job]").forEach((button) => {
    button.onclick = async (event) => {
      event.stopPropagation();
      const job = state.jobs.find((item) => item.id === button.dataset.closeJob || item.id === button.dataset.reopenJob);
      const status = button.hasAttribute("data-close-job") ? "Closed" : "Open";
      if (!job || !isHr()) return;
      if (!DEMO_MODE) {
        try { await apiRequest(`/jobs/${job.id}`, { method: "PATCH", body: JSON.stringify({ status }) }); }
        catch (error) { toast(error.message); return; }
      }
      job.status = status;
      save();
      toast(status === "Closed" ? "Posting closed to new applications." : "Posting is accepting applications again.");
      route();
    };
  });
  document.querySelectorAll("[data-apply]").forEach((b) => { b.onclick = async (e) => {
    e.stopPropagation();
    await applyToJob(b.dataset.apply);
    if (!DEMO_MODE) await loadCoreFromApi();
    route();
  }; });
  document.querySelectorAll("[data-loan]").forEach((b) => { b.onclick = async () => {
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
    if (!DEMO_MODE) {
      try { await apiRequest(`/loans/${item.id}`, { method: "PATCH", body: JSON.stringify({ status: item.status, repaid: item.repaid || 0 }) }); await refreshCoreAfterApi(); }
      catch (error) { toast(error.message); return; }
    }
    save(); toast(`Loan ${item.status.toLowerCase()} for ${item.employee}.`); route();
  }; });
}

document.getElementById("modal").addEventListener("click", async (e) => {
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
    const allowed = {
      Pending: ["Shortlisted", "Declined"],
      Shortlisted: ["Interviewed", "Declined"],
      Interviewed: ["Accepted", "Declined"]
    };
    const nextStatus = decide.dataset.appAct;
    if (!app || !allowed[app.status]?.includes(nextStatus)) return;
    const job = state.jobs.find((j) => j.id === app.jobId);
    if (!DEMO_MODE) {
      try {
        await apiRequest(`/applications/${app.id}`, { method: "PATCH", body: JSON.stringify({ status: nextStatus }) });
        await loadCoreFromApi();
      } catch (error) { toast(error.message); return; }
    }
    app.status = nextStatus;
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
    const job = state.jobs.find((j) => j.id === pub.dataset.publish);
    if (!job || !isHr()) return;
    if (job.closesOn && job.closesOn < todayIso()) { toast("Choose a future closing date before publishing this posting."); return; }
    if (!DEMO_MODE) {
      try { await apiRequest(`/jobs/${job.id}`, { method: "PATCH", body: JSON.stringify({ status: "Open" }) }); }
      catch (error) { toast(error.message); return; }
      await loadCoreFromApi();
    } else {
      job.status = "Open";
    }
    save(); toast("Posting is now open."); route(); openJobModal(job.id); return;
  }
  const closeJob = e.target.closest("[data-close-job], [data-reopen-job]");
  if (closeJob) {
    const jobId = closeJob.dataset.closeJob || closeJob.dataset.reopenJob;
    const job = state.jobs.find((item) => item.id === jobId);
    const status = closeJob.hasAttribute("data-close-job") ? "Closed" : "Open";
    if (!job || !isHr()) return;
    if (!DEMO_MODE) {
      try { await apiRequest(`/jobs/${job.id}`, { method: "PATCH", body: JSON.stringify({ status }) }); }
      catch (error) { toast(error.message); return; }
      await loadCoreFromApi();
    } else {
      job.status = status;
    }
    save();
    toast(status === "Closed" ? "Posting closed to new applications." : "Posting is accepting applications again.");
    route();
    openJobModal(job.id);
    return;
  }
  const apply = e.target.closest("[data-apply]");
  if (apply) { await applyToJob(apply.dataset.apply); if (!DEMO_MODE) await loadCoreFromApi(); route(); openJobModal(apply.dataset.apply); }
  const contract = e.target.closest("[data-contract]");
  if (contract) { openContractModal(contract.dataset.contract); }
});
document.getElementById("modal").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  if (form.id === "f-interview") {
    if (!isHr()) return;
    const app = (state.applications || []).find((item) => item.id === data.applicationId);
    const interviewAt = String(data.interviewAt || "");
    if (!app) { toast("Application not found."); return; }
    if (interviewAt && (!Number.isFinite(Date.parse(interviewAt)) || Date.parse(interviewAt) <= Date.now())) {
      toast("Choose a future interview date and time.");
      return;
    }
    if (!DEMO_MODE) {
      try {
        await apiRequest(`/applications/${app.id}`, { method: "PATCH", body: JSON.stringify({
          interview_at: interviewAt ? new Date(interviewAt).toISOString() : null
        }) });
        await loadCoreFromApi();
      } catch (error) { toast(error.message); return; }
    } else {
      app.interviewAt = interviewAt;
    }
    save();
    toast(interviewAt ? `Interview scheduled for ${app.employee}.` : `Interview schedule cleared for ${app.employee}.`);
    route();
    openAppModal(app.id);
    return;
  }
  if (form.id === "f-contract") {
    if (!isHr()) return;
      let app = (state.applications || []).find((item) => item.id === data.applicationId);
      let job = app && state.jobs.find((item) => item.id === app.jobId);
      let emp = app && app.employeeId ? state.employees.find((item) => item.id === app.employeeId) : null;
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
    if (!DEMO_MODE) {
      try {
        await apiRequest(`/applications/${app.id}/sign`, {
          method: "POST", body: JSON.stringify({ agreed_salary: salary })
        });
        await loadCoreFromApi();
        app = state.applications.find((item) => item.id === data.applicationId);
        job = app && state.jobs.find((item) => item.id === app.jobId);
        emp = app?.employeeId ? state.employees.find((item) => item.id === app.employeeId) : null;
        if (!app || !job || !emp) { toast("The signed contract was saved, but the updated employee record could not be loaded."); return; }
      } catch (error) { toast(error.message); return; }
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
    app.status = "Contract signed";
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
  if (form.id === "f-payroll") {
    if (!isHr()) return;
    const employee = state.employees.find((item) => item.id === data.employeeId);
    const period = String(data.payDate || "").slice(0, 7);
    const payDate = data.payDate;
    if (!employee || !/^\d{4}-\d{2}-\d{2}$/.test(payDate) || !period) {
      toast("Choose an employee and a valid pay date.");
      return;
    }
    if ((state.payroll || []).some((record) =>
      record.employeeId === employee.id && String(record.period || "").slice(0, 7) === period &&
      record.status !== "Rejected"
    )) {
      toast(`${employee.name} already has payroll for ${period}.`);
      return;
    }
    const adjustments = {
      basicSalary: Number(data.basicSalary),
      housingAllowance: Number(data.housingAllowance || 0),
      bonus: Number(data.bonus || 0),
      otherDeductions: Number(data.otherDeductions || 0)
    };
    if (Object.values(adjustments).some((amount) => !Number.isFinite(amount) || amount < 0) || adjustments.basicSalary <= 0) {
      toast("Enter a valid basic salary and non-negative allowances and deductions.");
      return;
    }
    const totals = payslip(employee, period, adjustments);
    if (totals.net < 0) {
      toast("Deductions exceed gross pay. Review the payroll amounts.");
      return;
    }
    const { days } = monthDateRange(period);
    const record = {
      id: uid("pay"), employeeId: employee.id, employee: employee.name, department: employee.dept,
      period: `${period}-01`, payDate, basicSalary: adjustments.basicSalary,
      housingAllowance: adjustments.housingAllowance, bonus: adjustments.bonus, overtime: totals.overtime,
      gross: totals.gross, nasfund: totals.nasfund, tax: totals.tax, loan: totals.loan,
      otherDeductions: adjustments.otherDeductions, net: totals.net,
      totalDays: days, workingDays: workingDaysInMonth(period), status: "Pending"
    };
    if (!DEMO_MODE) {
      try {
        const saved = await apiRequest("/payroll", { method: "POST", body: JSON.stringify({
          employee_id: employee.id, period: record.period, pay_date: payDate,
          basic_salary: record.basicSalary, housing_allowance: record.housingAllowance,
          bonus: record.bonus, overtime: record.overtime, other_deductions: record.otherDeductions,
          total_days: record.totalDays, working_days: record.workingDays
        }) });
        Object.assign(record, fromApiPayroll({ ...saved, employee_name: employee.name, department_name: employee.dept }));
        state.payroll.unshift(record);
      } catch (error) { toast(error.message); return; }
    } else {
      state.payroll = state.payroll || [];
      state.payroll.unshift(record);
    }
    viewMode.payrollPeriod = period;
    viewMode.payrollSummaryYear = period.slice(0, 4);
    viewMode.payrollCompanyYear = period.slice(0, 4);
    viewMode.payrollQuery = "";
    toast(`Payroll generated for ${employee.name}. It is pending HR review.`);
    save();
    closeModal();
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
    if (file && file.size > FILE_MAX) { toast("Profile photo is too large. Use one under 1 MB."); return; }
    const department = state.departments.find((item) => item.name === data.dept);
    const employee = {
      id: uid("e"), employeeNumber: data.employeeNumber.trim(), name: data.name.trim(), role: data.role.trim(),
      type: data.type, dept: data.dept, email: data.email.trim().toLowerCase(), phone: data.phone.trim(),
      hiredOn: data.hiredOn, status: "Active", salary: Number(data.salary), password: DEMO_PASS
    };
    if (!DEMO_MODE) {
      try {
        const saved = await apiRequest("/employees", { method: "POST", body: JSON.stringify({
          employee_number: employee.employeeNumber || null, name: employee.name, role: employee.role,
          employee_type: employee.type, department_id: department?.id || null, email: employee.email,
          phone: employee.phone || null, hired_on: employee.hiredOn || null, status: "Active",
          annual_salary: employee.salary
        }) });
        await loadCoreFromApi();
        if (file) {
          const persistedEmployee = state.employees.find((item) => item.id === saved.id);
          if (!persistedEmployee) { toast("Employee was created, but its profile could not be loaded."); return; }
          const uploaded = await storeUploadedFile(file, { employeeId: persistedEmployee.id, kind: "Profile picture" });
          if (!uploaded) {
            closeModal();
            route();
            openEmployeeModal(persistedEmployee.id);
            return;
          }
        }
      } catch (error) { toast(error.message); return; }
    } else {
      if (file) {
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
        } catch (_) { toast("Could not read the profile photo."); return; }
      }
      state.employees.push(employee);
      if (department) department.members += 1;
    }
    toast("Employee added. They can use staff self-service.");
  }
  if (form.id === "f-task") {
    if (!isHr()) return;
    const employee = state.employees.find((item) => item.id === data.employeeId);
    if (!employee || !data.title.trim() || !data.description.trim() || !data.startDate || !data.dueDate || data.dueDate < data.startDate) {
      toast("Choose an assignee and enter a title, description, and valid task dates.");
      return;
    }
    const task = {
      id: uid("t"), title: data.title.trim(), description: data.description.trim(), employeeId: employee.id,
      employee: employee.name, dept: employee.dept, startDate: data.startDate, dueDate: data.dueDate,
      priority: ["Low", "Normal", "High"].includes(data.priority) ? data.priority : "Normal", status: "New"
    };
    if (!DEMO_MODE) {
      try {
        await apiRequest("/tasks", { method: "POST", body: JSON.stringify({
          title: task.title, description: task.description, employee_id: task.employeeId,
          start_date: task.startDate, due_date: task.dueDate, priority: task.priority, status: task.status
        }) });
        await loadCoreFromApi();
      } catch (error) { toast(error.message); return; }
    } else {
      state.tasks = state.tasks || [];
      state.tasks.unshift(task);
    }
    toast(`Task assigned to ${employee.name}.`);
    save();
    closeModal();
    route();
    return;
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
    if (!DEMO_MODE) {
      try {
        await apiRequest("/leave", { method: "POST", body: JSON.stringify({
          employee_id: emp.id, leave_type: data.type, starts_on: data.start, ends_on: data.end, note: data.note, status: "Pending"
        }) });
        await loadCoreFromApi();
      } catch (error) { toast(error.message); return; }
    }
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
    const department = state.departments.find((item) => item.name === data.dept);
    const closesOn = String(data.closesOn || "");
    if (!data.title.trim() || !data.desc.trim() || !data.pay.trim() ||
        !/^\d{4}-\d{2}-\d{2}$/.test(closesOn) || closesOn < todayIso() ||
        Number.isNaN(Date.parse(`${closesOn}T00:00:00`))) {
      toast("Enter a job title, description, salary range, and a valid future closing date.");
      return;
    }
    if (!DEMO_MODE) {
      try {
        await apiRequest("/jobs", { method: "POST", body: JSON.stringify({
          title: data.title.trim(), department_id: department?.id || null, description: data.desc.trim(),
          salary_range: data.pay.trim(), closes_on: closesOn, appointment_type: data.type,
          employee_type: data.band, location: data.location.trim(), status: "Draft"
        }) });
        await loadCoreFromApi();
      } catch (error) { toast(error.message); return; }
    } else {
      state.jobs.unshift({ id: uid("j"), title: data.title.trim(), dept: data.dept, status: "Draft",
        desc: data.desc.trim(), type: data.type, band: data.band, pay: data.pay.trim(),
        location: data.location.trim(), closesOn, applicants: 0 });
    }
    toast("Job draft saved. Review it, then publish it when ready.");
    save();
    closeModal();
    route();
    return;
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
    if (!DEMO_MODE) {
      try {
        await apiRequest("/loans", { method: "POST", body: JSON.stringify({
          employee_id: emp.id, amount, term_months: Number(data.term), purpose: data.reason, status: "Pending"
        }) });
        await loadCoreFromApi();
      } catch (error) { toast(error.message); return; }
    }
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
  if (form.id === "f-attendance") {
    if (!isHr()) return;
    const employee = state.employees.find((item) => item.id === data.employeeId);
    if (!employee || !data.date || !data.status) {
      toast("Choose an employee, date, and attendance status.");
      return;
    }
    const existing = attendanceFor(data.employeeId, data.date);
    if (existing) {
      existing.status = data.status;
      existing.note = data.note;
    } else {
      attendanceRecords().unshift({ id: uid("at"), employeeId: data.employeeId, date: data.date, status: data.status, note: data.note });
    }
    if (!DEMO_MODE) {
      try {
        if (existing) await apiRequest(`/attendance/${existing.id}`, { method: "PATCH", body: JSON.stringify({ status: data.status, note: data.note }) });
        else await apiRequest("/attendance", { method: "POST", body: JSON.stringify({ employee_id: data.employeeId, attendance_date: data.date, status: data.status, note: data.note }) });
        await loadCoreFromApi();
      } catch (error) { toast(error.message); return; }
    }
    toast(`Attendance saved for ${employee.name}.`);
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

function setPortal(kind) {
  viewMode.portal = kind;
  document.querySelectorAll("[data-portal]").forEach((b) => b.classList.toggle("on", b.dataset.portal === kind));
  document.getElementById("hr-email-field").classList.toggle("hidden", kind !== "hr");
  document.getElementById("staff-email-field").classList.toggle("hidden", kind !== "staff");
  document.getElementById("email").required = kind === "hr";
  document.getElementById("staff-username").required = kind === "staff";
  document.getElementById("login-title").textContent = kind === "hr" ? "HR sign in" : "Staff sign in";
  document.getElementById("login-lede").textContent = kind === "hr"
    ? "Approve leave, loans, payroll, and recruitment for the university."
    : "File leave and loans, see your payslip, and apply for internal jobs.";
  document.getElementById("login-btn").textContent = kind === "hr" ? "Enter HR office" : "Enter self-service";
  document.getElementById("login-hint").innerHTML = kind === "hr"
    ? `HR demo: <strong>hr@unre.ac.pg</strong> / <strong>${DEMO_PASS}</strong>`
    : `Enter your UNRE work email as your username. Demo password: <strong>${DEMO_PASS}</strong>.`;
}

document.querySelectorAll("[data-portal]").forEach((b) => { b.onclick = () => setPortal(b.dataset.portal); });

function showApp() {
  document.getElementById("auth").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  viewMode.taskView = "board";
  viewMode.taskQuery = "";
  viewMode.taskStatus = "All";
  viewMode.taskDept = "All";
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

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.getElementById("password").value;
  let email;
  if (viewMode.portal === "hr") {
    email = document.getElementById("email").value.trim().toLowerCase();
  } else {
    email = document.getElementById("staff-username").value.trim().toLowerCase();
    if (!email) { toast("Enter your UNRE work email username."); return; }
  }
  if (!DEMO_MODE) {
    try {
      const result = await apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      csrfToken = result.csrfToken;
      session = { ...result.user, label: result.user.role === "hr" ? result.user.email : (state.employees.find((item) => item.id === result.user.employeeId)?.name || result.user.email) };
      await loadCoreFromApi();
    } catch (error) {
      toast(error.message || "Unable to sign in.");
      return;
    }
  } else if (viewMode.portal === "hr") {
    if (email !== "hr@unre.ac.pg" || password !== DEMO_PASS) { toast("HR sign-in is hr@unre.ac.pg / unre2026."); return; }
    session = { role: "hr", email, label: email };
  } else {
    const emp = state.employees.find((x) => x.email === email);
    if (!emp || password !== (emp.password || DEMO_PASS)) { toast("Invalid username or password."); return; }
    session = { role: "staff", employeeId: emp.id, email: emp.email, label: emp.name };
  }
  sessionStorage.setItem("unre-session", JSON.stringify(session));
  showApp();
});

document.getElementById("logout").addEventListener("click", async () => {
  if (!DEMO_MODE && session) { try { await apiRequest("/auth/logout", { method: "POST" }); } catch (_) {} }
  session = null;
  csrfToken = null;
  sessionStorage.removeItem("unre-session");
  sessionStorage.removeItem("unre-user");
  document.body.classList.remove("role-staff", "role-hr");
  document.getElementById("app").classList.add("hidden");
  document.getElementById("auth").classList.remove("hidden");
  location.hash = "";
});

window.addEventListener("hashchange", route);
function restoreDemoSession() {
  try {
    const saved = JSON.parse(sessionStorage.getItem("unre-session") || "null");
    if (saved?.role) { session = saved; showApp(); }
  } catch (_) {}
}

async function initializeApp() {
  if (DEMO_MODE) {
    restoreDemoSession();
    return;
  }
  let health;
  try {
    health = await fetch(`${API_BASE}/health`, { headers: { Accept: "application/json" } });
  } catch (_) {
    return;
  }
  const contentType = health.headers.get("content-type") || "";
  const staticOnlyResponse = !contentType.includes("application/json") &&
    ([404, 405].includes(health.status) || (health.ok && contentType.includes("text/html")));
  if (staticOnlyResponse) {
    DEMO_MODE = true;
    restoreDemoSession();
    return;
  }
  if (!contentType.includes("application/json")) return;
  try {
    const result = await apiRequest("/auth/me");
    csrfToken = result.csrfToken;
    session = { ...result.user, label: result.user.role === "hr" ? result.user.email : result.user.email };
    await loadCoreFromApi();
    sessionStorage.setItem("unre-session", JSON.stringify(session));
    showApp();
  } catch (_) {}
}
initializeApp();
