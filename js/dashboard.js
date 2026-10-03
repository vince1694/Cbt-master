/**
 * Dashboard Controller
 * Institutional ed-tech interface with bespoke vector icons, target tracking,
 * compulsory novel study hub, and diagnostic subject mastery.
 */
import { Storage } from './storage.js';
import { DEPARTMENTS } from './questions/index.js';
import { Icons } from './icons.js';
import { DailyChallenge } from './daily-challenge.js';
import { Paywall } from './paywall.js';

export const Dashboard = {
  render(containerId, { onStartJamb, onStartWaec, onReviewTest, onOpenStudyMode, onOpenNovelStudy, onOpenProfile }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const profile = Storage.getUserProfile();
    const analytics = Storage.getAnalytics();
    const history = Storage.getTestHistory();
    const bookmarks = Storage.getBookmarks();
    const currentDept = DEPARTMENTS[profile.department] || DEPARTMENTS.Science;

    // Projected JAMB score estimate based on actual performance (no fake readings)
    const hasTests = analytics.totalTestsTaken > 0;
    const projectedJamb = hasTests ? Math.round(analytics.averagePercentage * 4) : 0;
    const targetJamb = profile.targetJambScore || 280;
    const progressPercent = hasTests ? Math.min(100, Math.round((projectedJamb / targetJamb) * 100)) : 0;

    // Department vector icons
    const deptIconMap = {
      Science: Icons.microscope,
      Arts: Icons.scale,
      Commercial: Icons.briefcase
    };
    const activeDeptIcon = deptIconMap[profile.department] || Icons.book;

    container.innerHTML = `
      <div class="dashboard-wrapper">
        <!-- Candidate Profile Header -->
        <section class="profile-hero">
          <div class="profile-details">
            <div class="avatar-ring">
              <span>${profile.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <div class="profile-title-row">
                <h1 class="student-name">${profile.name}</h1>
                <span class="dept-badge" style="background: ${currentDept.color}18; color: ${currentDept.color}; border: 1px solid ${currentDept.color}40;">
                  ${activeDeptIcon} ${currentDept.name} Track
                </span>
              </div>
              <p class="aspirant-target">
                Aspiring Candidate for <strong>${profile.preferredCourse}</strong> at <strong>${profile.targetInstitution}</strong>
              </p>
            </div>
          </div>

          <div class="profile-actions">
            <div class="streak-pill" title="Consecutive Practice Days">
              ${Icons.flame}
              <div>
                <span class="streak-count">${profile.streakDays || 0} Days</span>
                <span class="streak-label">Study Streak</span>
              </div>
            </div>
            <button id="edit-profile-btn" class="btn-ghost" title="Edit Aspirant Profile & Target">
              ${Icons.edit}
              <span>Edit Target</span>
            </button>
          </div>
        </section>

        <!-- Exam Countdown Bar -->
        <section class="exam-status-bar" id="exam-status-bar-btn" style="cursor: pointer;" title="Open Study Planner & Syllabus Checklist">
          <div class="exam-countdown-group">
            <span class="countdown-badge">JAMB UTME 2025</span>
            <span>Official Examination Window Approaching • View Study Plan &amp; Syllabus Checklist →</span>
          </div>
        </section>

        <!-- Premium Upgrade Banner (free users only) -->
        ${!Storage.isPremiumActive() ? `
          <div class="pw-upgrade-banner" id="pw-upgrade-banner-btn" style="cursor:pointer;">
            <div class="pw-banner-text">
              <span class="pw-banner-icon">👑</span>
              <div class="pw-banner-copy">
                <strong>Unlock All Premium Features</strong>
                <span>Pay once &#8358;2,000 &bull; Competitors charge &#8358;4,000+ &bull; Lifetime access</span>
              </div>
            </div>
            <button class="pw-banner-btn" id="pw-banner-upgrade-btn">Upgrade Now &#8594;</button>
          </div>
        ` : ''}

        <!-- Daily 10-Question Sprint Challenge Mount -->
        <section id="daily-challenge-mount"></section>

        <!-- Compulsory Novel Featured Card -->
        <section class="novel-feature-card" id="novel-feature-card">
          <div class="novel-feat-book-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div class="novel-feat-info">
            <div class="novel-feat-tag">📌 JAMB COMPULSORY — All Departments · 2022–2025</div>
            <h3 class="novel-feat-title">
              <em>The Life Changer</em>
              <span class="novel-feat-author">by Khadija Abubakar Jalli</span>
            </h3>
            <p class="novel-feat-desc">
              Questions from this novel appear in <strong>every</strong> JAMB UTME Use of English paper.
              Study chapter summaries, all 9 characters, 5 major themes, and practice vetted past questions.
            </p>
          </div>
          <div class="novel-feat-actions">
            <div class="novel-feat-stats">
              <span class="nf-stat"><strong>28+</strong> Questions</span>
              <span class="nf-divider">·</span>
              <span class="nf-stat"><strong>9</strong> Characters</span>
              <span class="nf-divider">·</span>
              <span class="nf-stat"><strong>5</strong> Themes</span>
            </div>
            <button id="btn-open-novel-hub" class="btn-novel-open">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Open Novel Study Hub
            </button>
          </div>
        </section>

        <!-- Metrics Grid -->
        <section class="metrics-grid">
          <div class="metric-card metric-target">
            <div class="metric-header">
              <span class="metric-label">Target UTME Readiness</span>
              ${Icons.target}
            </div>
            <div class="target-comparison">
              <div class="score-display">
                <span class="current-score">${hasTests ? projectedJamb : '---'}</span>
                <span class="score-denom">/ 400</span>
              </div>
              <div class="target-subtext">
                Target: <strong>${targetJamb}</strong> ${hasTests ? `(${progressPercent}% ready)` : '&bull; Complete a mock test to calculate'}
              </div>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${progressPercent}%; background: ${currentDept.color};"></div>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Tests Completed</span>
              ${Icons.chart}
            </div>
            <div class="metric-val">${analytics.totalTestsTaken}</div>
            <div class="metric-sub">
              <span>JAMB: <strong>${analytics.jambTestsCount}</strong></span> • 
              <span>WAEC: <strong>${analytics.waecTestsCount}</strong></span>
            </div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Average Accuracy</span>
              ${Icons.award}
            </div>
            <div class="metric-val ${analytics.averagePercentage >= 65 ? 'text-success' : 'text-accent'}">
              ${analytics.averagePercentage}%
            </div>
            <div class="metric-sub">Personal Best: <strong>${analytics.highestScore}%</strong></div>
          </div>

          <div class="metric-card">
            <div class="metric-header">
              <span class="metric-label">Logged Study Time</span>
              ${Icons.clock}
            </div>
            <div class="metric-val">${Math.floor(profile.totalTimeMinutes / 60)}h ${profile.totalTimeMinutes % 60}m</div>
            <div class="metric-sub">Saved Questions: <strong>${bookmarks.length}</strong></div>
          </div>
        </section>

        <!-- Academic Super-Hub Navigation Grid -->
        <section class="superhub-section">
          <div class="superhub-grid">
            <div class="hub-card hub-questions ${!Storage.isPremiumActive() ? 'hub-locked' : ''}" id="hub-card-questions">
              <div class="hub-card-icon">📚</div>
              <div class="hub-card-text">
                <h4>Question Bank Explorer</h4>
                <p>120+ authentic past questions with step-by-step workings, topic filters, and quick 10-Q mini-drills.</p>
              </div>
              <span class="hub-arrow">→</span>
            </div>

            <div class="hub-card hub-formulas ${!Storage.isPremiumActive() ? 'hub-locked' : ''}" id="hub-card-formulas">
              <div class="hub-card-icon">📐</div>
              <div class="hub-card-text">
                <h4>Formula &amp; Grammar Vault</h4>
                <p>Rapid equations, gas laws, mechanics, concord rules, and memory mnemonics for exam revision.</p>
              </div>
              <span class="hub-arrow">→</span>
            </div>

            <div class="hub-card hub-advisor ${!Storage.isPremiumActive() ? 'hub-locked' : ''}" id="hub-card-advisor">
              <div class="hub-card-icon">🏛️</div>
              <div class="hub-card-text">
                <h4>JAMB Course Guide</h4>
                <p>Verify official 4 UTME subjects, O-level requirements, and cutoff scores for 100+ courses.</p>
              </div>
              <span class="hub-arrow">→</span>
            </div>

            <div class="hub-card hub-analytics ${!Storage.isPremiumActive() ? 'hub-locked' : ''}" id="hub-card-analytics">
              <div class="hub-card-icon">📊</div>
              <div class="hub-card-text">
                <h4>Diagnostic Intelligence</h4>
                <p>Visual SVG accuracy progression curve, subject mastery bars, and weak-topic detection.</p>
              </div>
              <span class="hub-arrow">→</span>
            </div>
          </div>
        </section>

        <!-- Exam Launch Hub (JAMB & WAEC separated by Department) -->
        <section class="exam-launcher-section">
          <div class="section-header-row">
            <div>
              <h2 class="section-title">Examination Portals</h2>
              <p class="section-subtitle">Real past questions categorized by examination council and academic faculty</p>
            </div>
            <!-- Department Selector Tabs -->
            <div class="dept-selector-tabs" id="dashboard-dept-tabs">
              <button class="dept-tab-btn ${profile.department === 'Science' ? 'active' : ''}" data-dept="Science">
                ${Icons.microscope} Science
              </button>
              <button class="dept-tab-btn ${profile.department === 'Arts' ? 'active' : ''}" data-dept="Arts">
                ${Icons.scale} Arts
              </button>
              <button class="dept-tab-btn ${profile.department === 'Commercial' ? 'active' : ''}" data-dept="Commercial">
                ${Icons.briefcase} Commercial
              </button>
            </div>
          </div>

          <div class="launcher-cards-grid">
            <!-- JAMB UTME Simulator Card -->
            <div class="launcher-card jamb-card">
              <div>
                <div class="launcher-badge jamb-badge">JAMB UTME CBT Console</div>
                <h3 class="launcher-title">4-Subject UTME Simulator</h3>
                <p class="launcher-desc">
                  Simulate the authentic computer-based testing hall with 4-subject combinations, official 8-key shortcuts (A, B, C, D, P, N, S, R), and on-screen calculator.
                </p>
                <div class="launcher-subjects-list">
                  <strong>Your Active 4-Subject Combination:</strong>
                  <div class="subject-tags" id="jamb-subject-tags">
                    ${currentDept.jambDefaults.map(s => `<span class="subject-tag">${s}</span>`).join('')}
                  </div>
                </div>
              </div>
              <div class="launcher-buttons">
                <button id="btn-start-jamb-sim" class="btn-primary">
                  ${Icons.play}
                  <span>Start UTME CBT Exam</span>
                </button>
                <button id="btn-open-jamb-tutor" class="btn-outline">
                  ${Icons.book}
                  <span>Tutor Mode</span>
                </button>
                <button id="btn-custom-jamb" class="btn-ghost" title="Customize your 4 subjects combination">
                  ${Icons.sliders}
                  <span>Custom Combo</span>
                </button>
              </div>
            </div>

            <!-- WAEC WASSCE Practice Card -->
            <div class="launcher-card waec-card">
              <div>
                <div class="launcher-badge waec-badge">WAEC / WASSCE Standard</div>
                <h3 class="launcher-title">Senior Certificate Mastery</h3>
                <p class="launcher-desc">
                  West African Senior School Certificate Examination past questions. Practice single subjects with official 9-point grading (A1 Distinction to F9).
                </p>
                <div class="waec-subject-picker">
                  <label for="waec-select-subject">Select Subject to Practice:</label>
                  <select id="waec-select-subject" class="custom-select">
                    ${currentDept.subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div class="launcher-buttons">
                <button id="btn-start-waec-exam" class="btn-secondary">
                  ${Icons.play}
                  <span>Start WAEC Practice</span>
                </button>
                <button id="btn-open-waec-tutor" class="btn-outline">
                  ${Icons.book}
                  <span>Tutor Mode</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Departmental Performance & Test History -->
        <section class="analytics-section">
          <div class="analytics-card">
            <h3 class="card-title">Subject Mastery & Diagnostic Breakdown</h3>
            <p class="card-subtitle">Real-time performance diagnostic indicating subjects requiring focused revision</p>
            <div class="subject-mastery-list">
              ${this.renderSubjectMastery(currentDept.subjects, analytics.subjectStats)}
            </div>
          </div>

          <!-- Quick Test History Table -->
          <div class="analytics-card">
            <div class="card-header-flex">
              <div>
                <h3 class="card-title">Recent Examination Performance</h3>
                <p class="card-subtitle">Audit past sessions and inspect detailed explanations</p>
              </div>
              <span class="history-count">${history.length} Tests</span>
            </div>
            ${history.length === 0 ? `
              <div class="empty-state">
                <p>No test sessions recorded yet. Launch your first JAMB or WAEC practice exam above.</p>
              </div>
            ` : `
              <div class="history-table-wrapper">
                <table class="history-table">
                  <thead>
                    <tr>
                      <th>Exam</th>
                      <th>Title</th>
                      <th>Score</th>
                      <th>Official Scale</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${history.slice(0, 5).map(item => `
                      <tr>
                        <td>
                          <span class="badge-mini ${item.examType === 'JAMB' ? 'badge-jamb' : 'badge-waec'}">
                            ${item.examType}
                          </span>
                        </td>
                        <td class="history-title-cell">${item.examTitle}</td>
                        <td><strong>${item.score}/${item.totalQuestions}</strong> (${item.percentage}%)</td>
                        <td>
                          ${item.examType === 'JAMB' 
                            ? `<span class="score-scaled">${item.scaledJambScore}/400</span>` 
                            : `<span class="badge-grade" style="color: ${item.waecGrade.color}">${item.waecGrade.grade}</span>`
                          }
                        </td>
                        <td>${new Date(item.timestamp).toLocaleDateString()}</td>
                        <td>
                          <button class="btn-table-review" data-test-id="${item.id}">Review</button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </section>
      </div>
    `;

    // Attach Event Listeners
    this.attachEventListeners({ onStartJamb, onStartWaec, onReviewTest, onOpenStudyMode, onOpenNovelStudy });
  },

  renderSubjectMastery(departmentSubjects, stats = {}) {
    return departmentSubjects.map(subject => {
      const stat = stats[subject] || { answered: 0, correct: 0 };
      const pct = stat.answered > 0 ? Math.round((stat.correct / stat.answered) * 100) : 0;
      let statusClass = "badge-status-neutral";
      let statusLabel = "Not Tested";

      if (stat.answered > 0) {
        if (pct >= 70) {
          statusClass = "badge-status-strong";
          statusLabel = "Strong";
        } else if (pct >= 50) {
          statusClass = "badge-status-medium";
          statusLabel = "Average";
        } else {
          statusClass = "badge-status-weak";
          statusLabel = "Needs Focus";
        }
      }

      return `
        <div class="mastery-item">
          <div class="mastery-label-row">
            <span class="mastery-subject-name">${subject}</span>
            <div class="mastery-meta">
              <span class="mastery-status ${statusClass}">${statusLabel}</span>
              <span class="mastery-pct">${pct}%</span>
            </div>
          </div>
          <div class="mastery-bar-bg">
            <div class="mastery-bar-fill" style="width: ${Math.max(4, pct)}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  attachEventListeners({ onStartJamb, onStartWaec, onReviewTest, onOpenStudyMode, onOpenNovelStudy }) {
    // Mount Daily Challenge Card
    const dcMount = document.getElementById("daily-challenge-mount");
    if (dcMount) {
      DailyChallenge.renderChallengeCard(dcMount);
    }

    // Premium upgrade banner clicks
    document.getElementById("pw-upgrade-banner-btn")?.addEventListener("click", () => {
      Paywall.showModal(null, 'CBT Master Premium');
    });
    document.getElementById("pw-banner-upgrade-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      Paywall.showModal(null, 'CBT Master Premium');
    });

    // Exam status countdown click
    document.getElementById("exam-status-bar-btn")?.addEventListener("click", () => {
      window.App?.navigateToStudyPlanner();
    });

    // Superhub Navigation Cards
    document.getElementById("hub-card-questions")?.addEventListener("click", () => {
      window.App?.navigateToQuestionBrowser();
    });
    document.getElementById("hub-card-formulas")?.addEventListener("click", () => {
      window.App?.navigateToCheatsheet();
    });
    document.getElementById("hub-card-advisor")?.addEventListener("click", () => {
      window.App?.navigateToSubjectAdvisor();
    });
    document.getElementById("hub-card-analytics")?.addEventListener("click", () => {
      window.App?.navigateToAnalytics();
    });

    // Edit Profile / Target Button
    const editProfileBtn = document.getElementById("edit-profile-btn");
    if (editProfileBtn) {
      editProfileBtn.addEventListener("click", () => {
        if (onOpenProfile) {
          onOpenProfile();
        } else {
          this.openEditProfileModal({ onStartJamb, onStartWaec, onReviewTest, onOpenStudyMode, onOpenNovelStudy, onOpenProfile });
        }
      });
    }

    // Department Tabs
    const deptTabs = document.querySelectorAll(".dept-tab-btn");
    deptTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const dept = tab.dataset.dept;
        Storage.updateUserProfile({ department: dept });
        this.render("main-app-container", { onStartJamb, onStartWaec, onReviewTest, onOpenStudyMode, onOpenNovelStudy, onOpenProfile });
      });
    });

    // Start JAMB CBT Exam
    const startJambBtn = document.getElementById("btn-start-jamb-sim");
    if (startJambBtn) {
      startJambBtn.addEventListener("click", () => {
        const profile = Storage.getUserProfile();
        if (onStartJamb) onStartJamb(profile.department, "cbt");
      });
    }

    // Start JAMB Tutor Mode
    const openJambTutorBtn = document.getElementById("btn-open-jamb-tutor");
    if (openJambTutorBtn) {
      openJambTutorBtn.addEventListener("click", () => {
        const profile = Storage.getUserProfile();
        if (onStartJamb) onStartJamb(profile.department, "study");
      });
    }

    // Custom 4-Subject Combo
    const customJambBtn = document.getElementById("btn-custom-jamb");
    if (customJambBtn) {
      customJambBtn.addEventListener("click", () => {
        this.openCustomJambModal({ onStartJamb });
      });
    }

    // Start WAEC Practice
    const startWaecBtn = document.getElementById("btn-start-waec-exam");
    if (startWaecBtn) {
      startWaecBtn.addEventListener("click", () => {
        const select = document.getElementById("waec-select-subject");
        const subject = select ? select.value : "English Language";
        if (onStartWaec) onStartWaec(subject, "cbt");
      });
    }

    // Start WAEC Tutor Mode
    const openWaecTutorBtn = document.getElementById("btn-open-waec-tutor");
    if (openWaecTutorBtn) {
      openWaecTutorBtn.addEventListener("click", () => {
        const select = document.getElementById("waec-select-subject");
        const subject = select ? select.value : "English Language";
        if (onStartWaec) onStartWaec(subject, "study");
      });
    }

    // Open Compulsory Novel Practice
    const novelBtn = document.getElementById("btn-open-novel-hub");
    if (novelBtn) {
      novelBtn.addEventListener("click", () => {
        if (onOpenNovelStudy) onOpenNovelStudy();
      });
    }

    // Review buttons in history table
    const reviewBtns = document.querySelectorAll(".btn-table-review");
    reviewBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const testId = btn.dataset.testId;
        const history = Storage.getTestHistory();
        const test = history.find(t => t.id === testId);
        if (test && onReviewTest) onReviewTest(test);
      });
    });

    // Edit Profile Modal
    const editBtn = document.getElementById("edit-profile-btn");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        this.openEditProfileModal({ onStartJamb, onStartWaec, onReviewTest, onOpenStudyMode, onOpenNovelStudy });
      });
    }
  },

  openCustomJambModal({ onStartJamb }) {
    const profile = Storage.getUserProfile();
    const currentDept = DEPARTMENTS[profile.department] || DEPARTMENTS.Science;
    const allDeptSubjects = currentDept.subjects;

    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3>Custom JAMB 4-Subject Combination</h3>
          <button class="modal-close-btn" id="modal-combo-close">&times;</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 0.88rem; color: var(--text-secondary);">
            Select <strong>exactly 4 subjects</strong> for your JAMB UTME simulation. Use of English is compulsory for all candidates nationwide.
          </p>

          <div class="form-group">
            <label>Choose Subjects:</label>
            <div class="combo-subjects-list" style="display: flex; flex-direction: column; gap: 0.45rem; margin-top: 0.35rem;">
              ${allDeptSubjects.map(s => {
                const isEnglish = s === "Use of English";
                const isDefault = currentDept.jambDefaults.includes(s);
                return `
                  <label style="display: flex; align-items: center; gap: 0.65rem; cursor: pointer; font-size: 0.9rem;">
                    <input type="checkbox" class="combo-check" value="${s}" ${isEnglish || isDefault ? 'checked' : ''} ${isEnglish ? 'disabled' : ''}>
                    <span>${s} ${isEnglish ? '<small style="color: #10b981; font-weight: 700;">(Compulsory)</small>' : ''}</span>
                  </label>
                `;
              }).join('')}
            </div>
            <div id="combo-count-indicator" style="font-size: 0.82rem; font-weight: 700; color: #10b981; margin-top: 0.4rem;">
              Selected 4 of 4 subjects
            </div>
          </div>

          <div class="form-group">
            <label for="combo-q-count">Questions Per Subject:</label>
            <select id="combo-q-count" class="custom-select">
              <option value="5">5 questions per subject (20 total - Quick test)</option>
              <option value="10" selected>10 questions per subject (40 total - Standard simulation)</option>
              <option value="15">15 questions per subject (60 total - Intensive mock)</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-ghost" id="modal-combo-cancel">Cancel</button>
          <button class="btn-outline" id="modal-combo-tutor">Study Mode</button>
          <button class="btn-primary" id="modal-combo-cbt">Start CBT Exam</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector("#modal-combo-close").addEventListener("click", closeModal);
    modal.querySelector("#modal-combo-cancel").addEventListener("click", closeModal);

    const checkboxes = modal.querySelectorAll(".combo-check");
    const countIndicator = modal.querySelector("#combo-count-indicator");

    const getSelected = () => {
      const selected = ["Use of English"];
      checkboxes.forEach(cb => {
        if (!cb.disabled && cb.checked) {
          selected.push(cb.value);
        }
      });
      return selected;
    };

    const updateCheckboxes = () => {
      const selected = getSelected();
      countIndicator.textContent = `Selected ${selected.length} of 4 subjects`;
      if (selected.length === 4) {
        countIndicator.style.color = "#10b981";
      } else {
        countIndicator.style.color = "#ef4444";
      }
    };

    checkboxes.forEach(cb => {
      cb.addEventListener("change", () => {
        const selected = getSelected();
        if (selected.length > 4) {
          cb.checked = false;
        }
        updateCheckboxes();
      });
    });

    const startWithMode = (mode) => {
      const selected = getSelected();
      if (selected.length !== 4) {
        alert("Please select exactly 4 subjects (including Use of English) to simulate JAMB UTME.");
        return;
      }
      const count = parseInt(modal.querySelector("#combo-q-count").value, 10) || 10;
      closeModal();
      if (onStartJamb) onStartJamb(profile.department, mode, selected, count);
    };

    modal.querySelector("#modal-combo-cbt").addEventListener("click", () => startWithMode("cbt"));
    modal.querySelector("#modal-combo-tutor").addEventListener("click", () => startWithMode("study"));
  },

  openEditProfileModal(callbacks) {
    const profile = Storage.getUserProfile();
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3>Edit Aspirant Profile & Target</h3>
          <button class="modal-close-btn" id="modal-close-x">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="edit-name">Your Full Name</label>
            <input type="text" id="edit-name" class="form-input" value="${profile.name}">
          </div>
          <div class="form-group">
            <label for="edit-dept">Academic Department</label>
            <select id="edit-dept" class="form-input">
              <option value="Science" ${profile.department === 'Science' ? 'selected' : ''}>Science</option>
              <option value="Arts" ${profile.department === 'Arts' ? 'selected' : ''}>Arts & Humanities</option>
              <option value="Commercial" ${profile.department === 'Commercial' ? 'selected' : ''}>Commercial & Social Sciences</option>
            </select>
          </div>
          <div class="form-group">
            <label for="edit-target">Target JAMB Score (out of 400)</label>
            <input type="number" id="edit-target" class="form-input" min="180" max="400" value="${profile.targetJambScore}">
          </div>
          <div class="form-group">
            <label for="edit-institution">Target University / Polytechnic</label>
            <input type="text" id="edit-institution" class="form-input" value="${profile.targetInstitution}">
          </div>
          <div class="form-group">
            <label for="edit-course">Intended Course of Study</label>
            <input type="text" id="edit-course" class="form-input" value="${profile.preferredCourse}">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-ghost" id="modal-cancel">Cancel</button>
          <button class="btn-primary" id="modal-save">Save Target</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector("#modal-close-x").addEventListener("click", closeModal);
    modal.querySelector("#modal-cancel").addEventListener("click", closeModal);

    modal.querySelector("#modal-save").addEventListener("click", () => {
      const name = modal.querySelector("#edit-name").value.trim() || profile.name;
      const department = modal.querySelector("#edit-dept").value;
      const targetJambScore = parseInt(modal.querySelector("#edit-target").value, 10) || 280;
      const targetInstitution = modal.querySelector("#edit-institution").value.trim() || profile.targetInstitution;
      const preferredCourse = modal.querySelector("#edit-course").value.trim() || profile.preferredCourse;

      Storage.updateUserProfile({
        name,
        department,
        targetJambScore,
        targetInstitution,
        preferredCourse
      });

      closeModal();
      this.render("main-app-container", callbacks);
    });
  }
};
