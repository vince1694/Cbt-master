/**
 * JAMB UTME Subject Combination & Course Directory Advisor
 * Authoritative guide to UTME subject combinations, O-level requirements,
 * and competitive score benchmarks for top Nigerian courses.
 */

export const COURSE_DIRECTORY = [
  // MEDICAL & HEALTH SCIENCES
  {
    course: "Medicine and Surgery (MBBS)",
    faculty: "Medical Sciences",
    utmeSubjects: ["Use of English", "Biology", "Chemistry", "Physics"],
    oLevelRequirements: "5 credits in English Language, Mathematics, Physics, Chemistry, and Biology at not more than one sitting.",
    competitiveScore: "285 - 320+",
    topUniversities: ["UI", "UNILAG", "OAU", "ABU", "UNN", "UNIBEN", "UNILORIN"],
    category: "Science"
  },
  {
    course: "Nursing Science",
    faculty: "Medical Sciences",
    utmeSubjects: ["Use of English", "Biology", "Chemistry", "Physics"],
    oLevelRequirements: "5 credits in English, Mathematics, Physics, Chemistry, and Biology.",
    competitiveScore: "260 - 290+",
    topUniversities: ["UNILAG", "OAU", "UNN", "UI", "UNIBEN", "FUTA"],
    category: "Science"
  },
  {
    course: "Pharmacy (PharmD)",
    faculty: "Medical Sciences",
    utmeSubjects: ["Use of English", "Biology", "Chemistry", "Physics"],
    oLevelRequirements: "5 credits in English, Mathematics, Physics, Chemistry, and Biology.",
    competitiveScore: "270 - 300+",
    topUniversities: ["UI", "OAU", "UNILAG", "UNN", "UNIBEN", "ABU"],
    category: "Science"
  },
  {
    course: "Medical Laboratory Science",
    faculty: "Medical Sciences",
    utmeSubjects: ["Use of English", "Biology", "Chemistry", "Physics"],
    oLevelRequirements: "5 credits in English, Mathematics, Physics, Chemistry, and Biology.",
    competitiveScore: "250 - 280+",
    topUniversities: ["UNN", "UNIBEN", "UNILAG", "ABU", "AAU"],
    category: "Science"
  },

  // ENGINEERING & TECHNOLOGY
  {
    course: "Computer Science",
    faculty: "Engineering & Sciences",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    oLevelRequirements: "5 credits in English, Mathematics, Physics, Chemistry, and any other science subject.",
    competitiveScore: "265 - 300+",
    topUniversities: ["UNILAG", "UI", "OAU", "FUTA", "UNN", "UNILORIN"],
    category: "Science"
  },
  {
    course: "Electrical & Electronics Engineering",
    faculty: "Engineering",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    oLevelRequirements: "5 credits in English, Mathematics, Physics, Chemistry, and Further Mathematics or Technical Drawing.",
    competitiveScore: "260 - 295+",
    topUniversities: ["UNILAG", "FUTA", "OAU", "UNN", "ABU", "UNIBEN"],
    category: "Science"
  },
  {
    course: "Mechanical Engineering",
    faculty: "Engineering",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    oLevelRequirements: "5 credits in English, Mathematics, Physics, Chemistry, and any other relevant subject.",
    competitiveScore: "255 - 290+",
    topUniversities: ["FUTA", "UNILAG", "OAU", "UNIBEN", "UNN", "FUTO"],
    category: "Science"
  },
  {
    course: "Civil Engineering",
    faculty: "Engineering",
    utmeSubjects: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    oLevelRequirements: "5 credits in English, Mathematics, Physics, Chemistry, and one other science subject.",
    competitiveScore: "250 - 285+",
    topUniversities: ["UNILAG", "OAU", "UI", "ABU", "UNILORIN", "FUTA"],
    category: "Science"
  },

  // LAW & ARTS
  {
    course: "Law (LL.B)",
    faculty: "Law",
    utmeSubjects: ["Use of English", "Literature in English", "Government", "Christian Religious Studies"],
    oLevelRequirements: "5 credits in English Language, Literature in English, Mathematics (pass/credit depending on uni), and two arts/social sciences.",
    competitiveScore: "275 - 310+",
    topUniversities: ["UNILAG", "UI", "OAU", "UNN", "UNIBEN", "UNILORIN", "ABU"],
    category: "Arts"
  },
  {
    course: "Mass Communication",
    faculty: "Arts & Social Sciences",
    utmeSubjects: ["Use of English", "Literature in English", "Government", "Economics"],
    oLevelRequirements: "5 credits in English Language, Mathematics, Literature in English, and any two other Arts or Social Science subjects.",
    competitiveScore: "255 - 285+",
    topUniversities: ["UNILAG", "UNN", "UNIBEN", "LASU", "KWASU", "OAU"],
    category: "Arts"
  },
  {
    course: "International Relations",
    faculty: "Arts & Social Sciences",
    utmeSubjects: ["Use of English", "Government", "Literature in English", "Economics"],
    oLevelRequirements: "5 credits in English, Mathematics, Government/History, and two other subjects.",
    competitiveScore: "245 - 275+",
    topUniversities: ["OAU", "Covenant", "UNILAG", "ABU"],
    category: "Arts"
  },

  // COMMERCIAL & MANAGEMENT SCIENCES
  {
    course: "Accounting",
    faculty: "Commercial & Management",
    utmeSubjects: ["Use of English", "Mathematics", "Economics", "Financial Accounting"],
    oLevelRequirements: "5 credits in English, Mathematics, Economics, Financial Accounting/Commerce, and any other social science subject.",
    competitiveScore: "260 - 295+",
    topUniversities: ["UNILAG", "UI", "OAU", "UNIBEN", "UNN", "ABU", "UNILORIN"],
    category: "Commercial"
  },
  {
    course: "Economics",
    faculty: "Commercial & Social Sciences",
    utmeSubjects: ["Use of English", "Mathematics", "Economics", "Commerce"],
    oLevelRequirements: "5 credits in English, Mathematics, Economics, and two other relevant subjects.",
    competitiveScore: "250 - 280+",
    topUniversities: ["UI", "UNILAG", "OAU", "UNIBEN", "UNN"],
    category: "Commercial"
  },
  {
    course: "Business Administration",
    faculty: "Commercial & Management",
    utmeSubjects: ["Use of English", "Mathematics", "Economics", "Commerce"],
    oLevelRequirements: "5 credits in English, Mathematics, Economics, and two other subjects.",
    competitiveScore: "240 - 270+",
    topUniversities: ["UNILAG", "OAU", "UNIBEN", "UNN", "ABU"],
    category: "Commercial"
  },
  {
    course: "Banking and Finance",
    faculty: "Commercial & Management",
    utmeSubjects: ["Use of English", "Mathematics", "Economics", "Financial Accounting"],
    oLevelRequirements: "5 credits in English, Mathematics, Economics, and two other subjects.",
    competitiveScore: "235 - 265+",
    topUniversities: ["UNILAG", "UNIBEN", "UNN", "UNILORIN"],
    category: "Commercial"
  }
];

export const SubjectAdvisor = {
  activeFaculty: "All",
  searchQuery: "",

  renderAdvisor(container) {
    const faculties = ["All", "Medical Sciences", "Engineering", "Law", "Commercial & Management"];

    const html = `
      <div class="advisor-page-wrapper">
        <!-- Hero Card -->
        <div class="adv-hero-card">
          <div class="adv-pill-group">
            <span class="adv-pill">🏛️ Official Course Directory</span>
            <span class="adv-pill-sec">JAMB Brochure Standards</span>
          </div>
          <h1 class="adv-title">JAMB Subject Combination Advisor</h1>
          <p class="adv-subtitle">
            Find the exact 4 UTME subjects, O-level requirements, and competitive cutoff benchmarks for your dream course.
          </p>

          <!-- Search Bar -->
          <div class="adv-search-box">
            <span class="adv-search-icon">🔍</span>
            <input type="text" id="adv-search-input" class="adv-input" placeholder="Search by course name, faculty, or university (e.g. Medicine, Law, UNILAG, Accounting)..." value="${this.searchQuery}">
          </div>
        </div>

        <!-- Faculty Tabs -->
        <div class="adv-tabs-row" id="adv-tabs-row">
          ${faculties.map(fac => `
            <button class="adv-tab-btn ${fac === this.activeFaculty ? 'active' : ''}" data-faculty="${fac}">
              ${fac}
            </button>
          `).join('')}
        </div>

        <!-- Course Cards Grid -->
        <div class="adv-grid" id="adv-cards-grid">
          ${this.renderCourseCards(this.activeFaculty, this.searchQuery)}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners(container);
  },

  renderCourseCards(faculty, query) {
    const filtered = COURSE_DIRECTORY.filter(item => {
      const matchFaculty = faculty === "All" || item.faculty.toLowerCase().includes(faculty.toLowerCase());
      if (!matchFaculty) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        item.course.toLowerCase().includes(q) ||
        item.faculty.toLowerCase().includes(q) ||
        item.utmeSubjects.some(s => s.toLowerCase().includes(q)) ||
        item.topUniversities.some(u => u.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      return `
        <div class="adv-empty">
          <span class="adv-empty-icon">🔎</span>
          <h3>No courses found matching "${query}"</h3>
          <p>Try searching for a different keyword or reset the faculty filter.</p>
        </div>
      `;
    }

    return filtered.map((c, idx) => `
      <div class="adv-card">
        <div class="adv-card-top">
          <span class="adv-dept-tag tag-${c.category.toLowerCase()}">${c.category} Track</span>
          <span class="adv-score-tag">🎯 Target: ${c.competitiveScore}</span>
        </div>

        <h3 class="adv-course-title">${c.course}</h3>
        <span class="adv-faculty-name">${c.faculty}</span>

        <div class="adv-utme-section">
          <span class="adv-sec-title">Compulsory 4 UTME Subjects:</span>
          <div class="adv-subject-badges">
            ${c.utmeSubjects.map((subj, i) => `
              <span class="adv-subj-badge ${i === 0 ? 'is-english' : ''}">
                ${i === 0 ? '⭐ ' : ''}${subj}
              </span>
            `).join('')}
          </div>
        </div>

        <div class="adv-olevel-box">
          <span class="adv-olevel-title">📋 O'Level (WAEC/NECO) Requirements:</span>
          <p class="adv-olevel-desc">${c.oLevelRequirements}</p>
        </div>

        <div class="adv-unis-row">
          <span class="adv-uni-label">Top Choice Universities:</span>
          <div class="adv-uni-chips">
            ${c.topUniversities.map(u => `<span class="adv-uni-chip">${u}</span>`).join('')}
          </div>
        </div>

        <button class="btn btn-primary adv-launch-btn" data-course="${encodeURIComponent(c.course)}" data-category="${c.category}" data-subjects="${encodeURIComponent(JSON.stringify(c.utmeSubjects))}">
          <span>🚀 Practice This Combination</span>
        </button>
      </div>
    `).join('');
  },

  attachEventListeners(container) {
    // Faculty tabs
    const tabs = container.querySelectorAll(".adv-tab-btn");
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        this.activeFaculty = btn.dataset.faculty;
        const grid = container.querySelector("#adv-cards-grid");
        grid.innerHTML = this.renderCourseCards(this.activeFaculty, this.searchQuery);
        this.attachLaunchButtons(container);
      });
    });

    // Search input
    const input = container.querySelector("#adv-search-input");
    if (input) {
      input.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        const grid = container.querySelector("#adv-cards-grid");
        grid.innerHTML = this.renderCourseCards(this.activeFaculty, this.searchQuery);
        this.attachLaunchButtons(container);
      });
    }

    this.attachLaunchButtons(container);
  },

  attachLaunchButtons(container) {
    const launchBtns = container.querySelectorAll(".adv-launch-btn");
    launchBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        const subjects = JSON.parse(decodeURIComponent(btn.dataset.subjects));
        const courseName = decodeURIComponent(btn.dataset.course);

        import('./questions/index.js').then(({ createJambSimulation }) => {
          const sim = createJambSimulation(category, subjects, 10);
          sim.title = `Target Exam: ${courseName} (4 Subjects)`;
          if (window.App && typeof window.App.startExam === "function") {
            window.App.startExam(sim);
          } else {
            window.location.hash = "#cbt";
          }
        });
      });
    });
  }
};
