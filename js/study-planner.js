/**
 * Interactive Study Planner & Live JAMB Countdown
 * Features real-time countdown to UTME, syllabus topic checklists,
 * daily question goal tracker, and customized weekly study schedule.
 */
import { Storage } from './storage.js';

export const OFFICIAL_SYLLABUS = {
  "Mathematics": [
    { id: "m_1", topic: "Number and Numeration (Indices, Logarithms, Surds, Sets)" },
    { id: "m_2", topic: "Algebra (Simultaneous, Quadratic, Polynomials, Inequalities)" },
    { id: "m_3", topic: "Progressions (AP, GP, Arithmetic & Geometric Means)" },
    { id: "m_4", topic: "Matrices & Determinants (2x2, 3x3 inverses and applications)" },
    { id: "m_5", topic: "Trigonometry (Ratios, Identities, Sine & Cosine Rules)" },
    { id: "m_6", topic: "Calculus (Differentiation, Integration, Maxima/Minima)" },
    { id: "m_7", topic: "Coordinate Geometry (Equations of lines, circles, midpoints)" },
    { id: "m_8", topic: "Statistics & Probability (Mean, Median, Standard Deviation, Permutations)" }
  ],
  "Use of English": [
    { id: "e_1", topic: "Reading Comprehension (Identifying main ideas, tone, mood)" },
    { id: "e_2", topic: "Lexis and Structure (Antonyms and Synonyms in context)" },
    { id: "e_3", topic: "Grammatical Concord (Proximity, Accompaniment, Collective Nouns)" },
    { id: "e_4", topic: "Oral English (Vowel sounds: monophthongs & diphthongs)" },
    { id: "e_5", topic: "Oral English (Consonant sounds: clusters, silent letters)" },
    { id: "e_6", topic: "Stress & Intonation (Syllabic stress, emphatic stress, word accent)" },
    { id: "e_7", topic: "Compulsory Novel: The Life Changer (All 9 Chapters & Themes)" }
  ],
  "Physics": [
    { id: "p_1", topic: "Mechanics (Equations of Motion, Vectors, Projectiles, Momentum)" },
    { id: "p_2", topic: "Energy & Work (Conservation of Energy, Power, Simple Machines)" },
    { id: "p_3", topic: "Thermal Physics (Gas Laws, Heat Transfer, Specific Heat Capacity)" },
    { id: "p_4", topic: "Waves & Optics (Reflection, Refraction, Snell's Law, Sound Resonance)" },
    { id: "p_5", topic: "Electricity & Magnetism (Ohm's Law, Resistors, Magnetic Fields)" },
    { id: "p_6", topic: "Modern Physics (Photoelectric Effect, Radioactivity, Nuclear Energy)" }
  ],
  "Chemistry": [
    { id: "c_1", topic: "Particulate Nature of Matter & Atomic Structure" },
    { id: "c_2", topic: "Stoichiometry & Mole Concept (Gas volumes, reacting masses)" },
    { id: "c_3", topic: "Chemical Bonding & Shapes of Molecules (Ionic, Covalent, Hybridization)" },
    { id: "c_4", topic: "Electrochemistry & Electrolysis (Faraday's Laws, Redox Equations)" },
    { id: "c_5", topic: "Rates of Reaction & Chemical Equilibrium (Le Chatelier's Principle)" },
    { id: "c_6", topic: "Organic Chemistry (Alkanes, Alkenes, Alkanols, Polymers, Esters)" }
  ],
  "Biology": [
    { id: "b_1", topic: "Cell Biology & Organization of Life" },
    { id: "b_2", topic: "Nutrition & Transport Systems in Plants and Animals" },
    { id: "b_3", topic: "Respiration & Excretory Mechanisms" },
    { id: "b_4", topic: "Reproduction & Development in Organisms" },
    { id: "b_5", topic: "Genetics, Heredity & Sickle Cell / Blood Group Inheritance" },
    { id: "b_6", topic: "Ecology (Biomes, Nutrient Cycles, Symbiosis, Adaptation)" }
  ],
  "Economics": [
    { id: "ec_1", topic: "Basic Economic Concepts (Scarcity, Choice, Scale of Preference)" },
    { id: "ec_2", topic: "Demand, Supply & Price Determination (Elasticity PED/PES)" },
    { id: "ec_3", topic: "Theory of Production & Law of Diminishing Returns" },
    { id: "ec_4", topic: "Market Structures (Perfect Competition, Monopoly, Oligopoly)" },
    { id: "ec_5", topic: "National Income Accounting (GDP, GNP, Real Income)" },
    { id: "ec_6", topic: "Money, Banking & Monetary/Fiscal Policy in Nigeria" }
  ]
};

export const StudyPlanner = {
  countdownTimerId: null,
  activeSubjectTab: "Mathematics",

  renderPlanner(container) {
    const plannerData = Storage.getStudyPlanner();
    const profile = Storage.getUserProfile();
    const history = Storage.getTestHistory();

    // Calculate questions answered today
    const todayStr = new Date().toISOString().split("T")[0];
    const testsToday = history.filter(t => t.timestamp && t.timestamp.startsWith(todayStr));
    const questionsToday = testsToday.reduce((sum, t) => sum + (t.totalQuestions || 0), 0);
    const targetDaily = plannerData.dailyQuestionTarget || 30;
    const dailyPct = Math.min(100, Math.round((questionsToday / targetDaily) * 100));

    // Target exam date
    const targetDate = new Date(plannerData.targetExamDate || "2025-04-19T08:00:00");
    const subjects = Object.keys(OFFICIAL_SYLLABUS);

    const html = `
      <div class="planner-page-wrapper">
        <!-- Hero Card with Live Countdown Clock -->
        <div class="sp-hero-card">
          <div class="sp-hero-left">
            <div class="sp-pill-row">
              <span class="sp-pill">⏱️ Real-Time Countdown</span>
              <span class="sp-pill-sec">Official Examination Target</span>
            </div>
            <h1 class="sp-title">JAMB UTME Exam Countdown</h1>
            <p class="sp-subtitle">Target Examination Date: <strong>${targetDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>

            <!-- 4-Box Digital Clock -->
            <div class="sp-countdown-boxes" id="sp-countdown-boxes">
              <div class="sp-clock-box">
                <span class="sp-clock-num" id="cd-days">--</span>
                <span class="sp-clock-lbl">Days</span>
              </div>
              <div class="sp-clock-box">
                <span class="sp-clock-num" id="cd-hours">--</span>
                <span class="sp-clock-lbl">Hours</span>
              </div>
              <div class="sp-clock-box">
                <span class="sp-clock-num" id="cd-minutes">--</span>
                <span class="sp-clock-lbl">Minutes</span>
              </div>
              <div class="sp-clock-box">
                <span class="sp-clock-num" id="cd-seconds">--</span>
                <span class="sp-clock-lbl">Seconds</span>
              </div>
            </div>
          </div>

          <!-- Daily Goal Progress Card -->
          <div class="sp-goal-box">
            <div class="sp-goal-top">
              <span class="sp-goal-badge">🎯 Today's Goal</span>
              <span class="sp-goal-stat"><strong>${questionsToday}</strong> / ${targetDaily} Qs</span>
            </div>
            <div class="sp-goal-meter">
              <div class="sp-goal-fill" style="width: ${dailyPct}%;"></div>
            </div>
            <span class="sp-goal-msg">
              ${questionsToday >= targetDaily 
                ? '🎉 Excellent work! Daily question quota achieved.' 
                : `${targetDaily - questionsToday} more questions to meet today's quota.`}
            </span>
            <button class="btn btn-primary sp-quick-drill-btn" id="sp-btn-drill-today">
              <span>🚀 Practice 10 Qs Now</span>
            </button>
          </div>
        </div>

        <!-- Weekly Study Timetable Generator Card -->
        <div class="sp-timetable-card">
          <div class="sp-card-header">
            <h3>📅 Recommended Weekly Schedule (${profile.department} Track)</h3>
            <span class="sp-header-tag">Balanced Subject Rotation</span>
          </div>
          <div class="sp-days-grid">
            <div class="sp-day-col">
              <span class="sp-day-name">Monday</span>
              <div class="sp-day-subj">Use of English</div>
              <div class="sp-day-task">Concord &amp; Antonyms</div>
            </div>
            <div class="sp-day-col">
              <span class="sp-day-name">Tuesday</span>
              <div class="sp-day-subj">${profile.department === 'Science' ? 'Mathematics' : profile.department === 'Arts' ? 'Literature' : 'Economics'}</div>
              <div class="sp-day-task">Calculus / Poetry / PED</div>
            </div>
            <div class="sp-day-col">
              <span class="sp-day-name">Wednesday</span>
              <div class="sp-day-subj">${profile.department === 'Science' ? 'Physics' : profile.department === 'Arts' ? 'Government' : 'Commerce'}</div>
              <div class="sp-day-task">Mechanics / Constitutions</div>
            </div>
            <div class="sp-day-col">
              <span class="sp-day-name">Thursday</span>
              <div class="sp-day-subj">${profile.department === 'Science' ? 'Chemistry' : profile.department === 'Arts' ? 'CRS / IRS' : 'Accounting'}</div>
              <div class="sp-day-task">Stoichiometry / Balance Sheet</div>
            </div>
            <div class="sp-day-col">
              <span class="sp-day-name">Friday</span>
              <div class="sp-day-subj">Novel Study</div>
              <div class="sp-day-task">The Life Changer (2 Chs)</div>
            </div>
            <div class="sp-day-col is-weekend">
              <span class="sp-day-name">Saturday</span>
              <div class="sp-day-subj">Full Mock Simulation</div>
              <div class="sp-day-task">4-Subject Timed CBT</div>
            </div>
            <div class="sp-day-col is-weekend">
              <span class="sp-day-name">Sunday</span>
              <div class="sp-day-subj">Weekly Review</div>
              <div class="sp-day-task">Weak Topics &amp; Formulas</div>
            </div>
          </div>
        </div>

        <!-- Official Syllabus Checklist Section -->
        <div class="sp-syllabus-card">
          <div class="sp-card-header">
            <div>
              <h3>📋 Official JAMB Syllabus Checklist</h3>
              <p class="sp-header-sub">Check off topics as you master them to track syllabus completion.</p>
            </div>
          </div>

          <!-- Subject Tabs -->
          <div class="sp-syllabus-tabs" id="sp-syllabus-tabs">
            ${subjects.map(s => `
              <button class="sp-s-tab ${s === this.activeSubjectTab ? 'active' : ''}" data-subject="${s}">
                ${s}
              </button>
            `).join('')}
          </div>

          <!-- Checklist Items -->
          <div class="sp-checklist-items" id="sp-checklist-items">
            ${this.renderChecklistHtml(this.activeSubjectTab)}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.startCountdown(targetDate);
    this.attachEventListeners(container);
  },

  renderChecklistHtml(subject) {
    const topics = OFFICIAL_SYLLABUS[subject] || [];
    const plannerData = Storage.getStudyPlanner();
    const completed = plannerData.completedTopics || [];

    const completedCount = topics.filter(t => completed.includes(t.id)).length;
    const pct = Math.round((completedCount / topics.length) * 100);

    return `
      <div class="sp-syllabus-status">
        <span>Completion: <strong>${completedCount} / ${topics.length}</strong> topics mastered (${pct}%)</span>
        <div class="sp-s-meter"><div class="sp-s-fill" style="width: ${pct}%"></div></div>
      </div>
      <div class="sp-topics-list">
        ${topics.map(t => {
          const isDone = completed.includes(t.id);
          return `
            <label class="sp-topic-item ${isDone ? 'is-done' : ''}">
              <input type="checkbox" class="sp-topic-checkbox" data-tid="${t.id}" ${isDone ? 'checked' : ''}>
              <span class="sp-topic-checkmark"></span>
              <span class="sp-topic-text">${t.topic}</span>
            </label>
          `;
        }).join('')}
      </div>
    `;
  },

  startCountdown(targetDate) {
    if (this.countdownTimerId) {
      clearInterval(this.countdownTimerId);
    }

    const updateClock = () => {
      const now = new Date();
      let diff = targetDate - now;
      if (diff < 0) diff = 0;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const dEl = document.getElementById("cd-days");
      const hEl = document.getElementById("cd-hours");
      const mEl = document.getElementById("cd-minutes");
      const sEl = document.getElementById("cd-seconds");

      if (dEl) dEl.innerText = String(days).padStart(2, '0');
      if (hEl) hEl.innerText = String(hours).padStart(2, '0');
      if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
      if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
    };

    updateClock();
    this.countdownTimerId = setInterval(updateClock, 1000);
  },

  attachEventListeners(container) {
    // Quick Drill Button
    const drillBtn = container.querySelector("#sp-btn-drill-today");
    if (drillBtn) {
      drillBtn.addEventListener("click", () => {
        window.location.hash = "#questions";
        if (window.App && typeof window.App.navigateToQuestionBrowser === "function") {
          window.App.navigateToQuestionBrowser();
        }
      });
    }

    // Syllabus Subject Tabs
    const tabs = container.querySelectorAll(".sp-s-tab");
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        this.activeSubjectTab = btn.dataset.subject;
        const box = container.querySelector("#sp-checklist-items");
        if (box) {
          box.innerHTML = this.renderChecklistHtml(this.activeSubjectTab);
          this.attachCheckboxListeners(container);
        }
      });
    });

    this.attachCheckboxListeners(container);
  },

  attachCheckboxListeners(container) {
    const checkboxes = container.querySelectorAll(".sp-topic-checkbox");
    checkboxes.forEach(cb => {
      cb.addEventListener("change", () => {
        const tid = cb.dataset.tid;
        const plannerData = Storage.getStudyPlanner();
        let completed = plannerData.completedTopics || [];

        if (cb.checked) {
          if (!completed.includes(tid)) completed.push(tid);
        } else {
          completed = completed.filter(id => id !== tid);
        }

        Storage.updateStudyPlanner({ completedTopics: completed });
        const box = container.querySelector("#sp-checklist-items");
        if (box) {
          box.innerHTML = this.renderChecklistHtml(this.activeSubjectTab);
          this.attachCheckboxListeners(container);
        }
      });
    });
  }
};
