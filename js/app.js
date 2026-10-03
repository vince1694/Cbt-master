/**
 * Main Application Orchestrator & Router
 * Coordinates Auth, Dashboard, CBT Engine, Result Slips, Bookmarks, Settings,
 * Novel Hub, Daily Challenge, Badges, Cheatsheet, Advisor, Question Explorer, and Analytics.
 */
import { Storage } from './storage.js';
import { Auth } from './auth.js';
import { AuthView } from './auth-view.js';
import { Api } from './api.js';
import { 
  DEPARTMENTS, 
  createJambSimulation, 
  createWaecExam, 
  allQuestions 
} from './questions/index.js';
import { CbtEngine } from './cbt-engine.js';
import { CbtView } from './cbt-view.js';
import { Dashboard } from './dashboard.js';
import { ResultView } from './result-view.js';
import { NovelHub } from './novel-hub.js';
import { DailyChallenge } from './daily-challenge.js';
import { Achievements } from './achievements.js';
import { Cheatsheet } from './cheatsheet.js';
import { SubjectAdvisor } from './subject-advisor.js';
import { QuestionBrowser } from './question-browser.js';
import { AnalyticsView } from './analytics-view.js';
import { StudyPlanner } from './study-planner.js';
import { ProfileView } from './profile-view.js';

class JambWaecApp {
  constructor() {
    this.currentView = "dashboard";
    this.activeEngine = null;
    this.activeResult = null;
  }

  init() {
    window.App = this;
    this.applySettings();

    // Ping backend and sync online status (non-blocking)
    Api.checkServerHealth().then(online => {
      if (online) console.log('[CBT Master] Backend API connected ✅');
    });

    // Handle JWT expiry — redirect to login cleanly
    window.addEventListener('cbt:session-expired', () => {
      Auth.logout();
      this._showAuth();
    });

    // Show auth if not logged in
    if (!Auth.isLoggedIn()) {
      this._showAuth();
    } else {
      this._bootMainApp();
    }
  }

  _showAuth() {
    const header = document.getElementById("app-header");
    if (header) header.style.display = "none";

    AuthView.render("main-app-container", (user) => {
      if (header) header.style.display = "";
      this._bootMainApp();
    });
  }

  _bootMainApp() {
    const header = document.getElementById("app-header");
    if (header) header.style.display = "";
    this.renderHeader();
    this.navigateToDashboard();
    this.bindGlobalEvents();
  }

  applySettings() {
    const settings = Storage.getSettings();
    document.documentElement.setAttribute("data-theme", settings.theme || "dark");
  }

  renderHeader() {
    const headerContainer = document.getElementById("app-header");
    if (!headerContainer) return;

    const profile = Storage.getUserProfile();
    const settings = Storage.getSettings();
    const currentDept = DEPARTMENTS[profile.department] || DEPARTMENTS.Science;

    headerContainer.innerHTML = `
      <div class="header-inner">
        <div class="header-brand" id="brand-home-link">
          <div class="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <div>
            <span class="brand-title">CBT Master</span>
            <span class="brand-sub">JAMB &amp; WAEC Platform</span>
          </div>
        </div>

        <nav class="header-nav" id="main-nav">
          <button class="nav-link ${this.currentView === 'dashboard' ? 'active' : ''}" id="nav-dashboard-btn">
            Dashboard
          </button>
          <button class="nav-link ${this.currentView === 'questions' ? 'active' : ''}" id="nav-questions-btn">
            📚 Question Bank
          </button>
          <button class="nav-link ${this.currentView === 'planner' ? 'active' : ''}" id="nav-planner-btn">
            📅 Study Plan
          </button>
          <button class="nav-link ${this.currentView === 'cheatsheet' ? 'active' : ''}" id="nav-cheatsheet-btn">
            📐 Formulas
          </button>
          <button class="nav-link ${this.currentView === 'advisor' ? 'active' : ''}" id="nav-advisor-btn">
            🏛️ Course Guide
          </button>
          <button class="nav-link ${this.currentView === 'analytics' ? 'active' : ''}" id="nav-analytics-btn">
            📊 Analytics
          </button>
          <button class="nav-link ${this.currentView === 'badges' ? 'active' : ''}" id="nav-badges-btn">
            🏆 Badges
          </button>
          <button class="nav-link ${this.currentView === 'bookmarks' ? 'active' : ''}" id="nav-bookmarks-btn">
            🔖 Saved
          </button>
        </nav>

        <div class="header-controls">
          <button id="toggle-theme-btn" class="icon-tool-btn" title="Toggle Dark/Light Mode">
            ${settings.theme === 'light' ? '🌙' : '☀️'}
          </button>
          <div class="user-chip" id="header-user-chip" title="View profile">
            <span class="chip-avatar">${profile.name.charAt(0).toUpperCase()}</span>
            <span class="chip-name">${profile.name.split(' ')[0]}</span>
            <span class="chip-dept-dot" style="background: ${currentDept.color};"></span>
          </div>
          <button class="icon-tool-btn mobile-menu-btn" id="mobile-menu-btn" title="Menu" aria-label="Open navigation menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Nav Drawer -->
      <div class="mobile-nav-drawer hidden" id="mobile-nav-drawer">
        <button class="mobile-nav-item" id="mnav-dashboard">🏠 Dashboard</button>
        <button class="mobile-nav-item" id="mnav-planner">📅 Study Plan &amp; Countdown</button>
        <button class="mobile-nav-item" id="mnav-questions">📚 Question Bank &amp; Drills</button>
        <button class="mobile-nav-item" id="mnav-cheatsheet">📐 Formula Cheatsheet</button>
        <button class="mobile-nav-item" id="mnav-advisor">🏛️ Course Guide &amp; Subjects</button>
        <button class="mobile-nav-item" id="mnav-analytics">📊 Performance Analytics</button>
        <button class="mobile-nav-item" id="mnav-badges">🏆 Badges &amp; Achievements</button>
        <button class="mobile-nav-item" id="mnav-novel">📖 The Life Changer Hub</button>
        <button class="mobile-nav-item" id="mnav-bookmarks">🔖 Saved Questions</button>
        <button class="mobile-nav-item" id="mnav-profile">👤 Aspirant Profile &amp; Settings</button>
        <div class="mobile-nav-separator"></div>
        <button class="mobile-nav-item mobile-nav-danger" id="mnav-logout">🚪 Sign Out</button>
      </div>
    `;

    this._bindHeaderEvents();
  }

  _bindHeaderEvents() {
    const homeLink = document.getElementById("brand-home-link");
    const navDash = document.getElementById("nav-dashboard-btn");
    const navQuestions = document.getElementById("nav-questions-btn");
    const navCheatsheet = document.getElementById("nav-cheatsheet-btn");
    const navAdvisor = document.getElementById("nav-advisor-btn");
    const navAnalytics = document.getElementById("nav-analytics-btn");
    const navBadges = document.getElementById("nav-badges-btn");
    const navBookmarks = document.getElementById("nav-bookmarks-btn");
    const themeBtn = document.getElementById("toggle-theme-btn");
    const userChip = document.getElementById("header-user-chip");
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");

    mobileMenuBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileDrawer?.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!mobileDrawer?.contains(e.target) && e.target !== mobileMenuBtn) {
        mobileDrawer?.classList.add("hidden");
      }
    });

    const closeMobileNav = () => mobileDrawer?.classList.add("hidden");

    // Mobile nav items
    document.getElementById("mnav-dashboard")?.addEventListener("click", () => { closeMobileNav(); this.navigateToDashboard(); });
    document.getElementById("mnav-planner")?.addEventListener("click", () => { closeMobileNav(); this.navigateToStudyPlanner(); });
    document.getElementById("mnav-questions")?.addEventListener("click", () => { closeMobileNav(); this.navigateToQuestionBrowser(); });
    document.getElementById("mnav-cheatsheet")?.addEventListener("click", () => { closeMobileNav(); this.navigateToCheatsheet(); });
    document.getElementById("mnav-advisor")?.addEventListener("click", () => { closeMobileNav(); this.navigateToSubjectAdvisor(); });
    document.getElementById("mnav-analytics")?.addEventListener("click", () => { closeMobileNav(); this.navigateToAnalytics(); });
    document.getElementById("mnav-badges")?.addEventListener("click", () => { closeMobileNav(); this.navigateToAchievements(); });
    document.getElementById("mnav-novel")?.addEventListener("click", () => { closeMobileNav(); this.navigateToNovelHub(); });
    document.getElementById("mnav-bookmarks")?.addEventListener("click", () => { closeMobileNav(); this.navigateToBookmarks(); });
    document.getElementById("mnav-profile")?.addEventListener("click", () => { closeMobileNav(); this.navigateToProfile(); });
    document.getElementById("mnav-logout")?.addEventListener("click", () => { closeMobileNav(); this._handleLogout(); });

    if (userChip) {
      userChip.addEventListener("click", () => {
        this.navigateToProfile();
      });
    }

    const navPlanner = document.getElementById("nav-planner-btn");
    if (homeLink) homeLink.addEventListener("click", () => this.navigateToDashboard());
    if (navDash) navDash.addEventListener("click", () => this.navigateToDashboard());
    if (navPlanner) navPlanner.addEventListener("click", () => this.navigateToStudyPlanner());
    if (navQuestions) navQuestions.addEventListener("click", () => this.navigateToQuestionBrowser());
    if (navCheatsheet) navCheatsheet.addEventListener("click", () => this.navigateToCheatsheet());
    if (navAdvisor) navAdvisor.addEventListener("click", () => this.navigateToSubjectAdvisor());
    if (navAnalytics) navAnalytics.addEventListener("click", () => this.navigateToAnalytics());
    if (navBadges) navBadges.addEventListener("click", () => this.navigateToAchievements());
    if (navBookmarks) navBookmarks.addEventListener("click", () => this.navigateToBookmarks());

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = Storage.getSettings();
        const nextTheme = current.theme === 'light' ? 'dark' : 'light';
        Storage.updateSettings({ theme: nextTheme });
        this.applySettings();
        themeBtn.textContent = nextTheme === 'light' ? '🌙' : '☀️';
      });
    }
  }

  _handleLogout() {
    if (confirm("Sign out of CBT Master?")) {
      Auth.logout();
      window.location.reload();
    }
  }

  navigateToDashboard() {
    this.currentView = "dashboard";
    this.renderHeader();
    Dashboard.render("main-app-container", {
      onStartJamb: (dept, mode, customSubjects, count) => this.startJambExam(dept, mode, customSubjects, count),
      onStartWaec: (subject, mode) => this.startWaecExam(subject, mode),
      onReviewTest: (testData) => this.navigateToResult(testData),
      onOpenStudyMode: () => this.navigateToQuestionBrowser(),
      onOpenNovelStudy: () => this.navigateToNovelHub(),
      onOpenProfile: () => this.navigateToProfile()
    });
  }

  navigateToProfile() {
    this.currentView = "profile";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (container) {
      ProfileView.render(container, {
        onBack: () => this.navigateToDashboard(),
        onLogout: () => this._handleLogout()
      });
    }
  }

  navigateToQuestionBrowser() {
    this.currentView = "questions";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (container) QuestionBrowser.renderBrowser(container);
  }

  navigateToCheatsheet() {
    this.currentView = "cheatsheet";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (container) Cheatsheet.renderCheatsheet(container);
  }

  navigateToStudyPlanner() {
    this.currentView = "planner";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (container) StudyPlanner.renderPlanner(container);
  }

  navigateToSubjectAdvisor() {
    this.currentView = "advisor";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (container) SubjectAdvisor.renderAdvisor(container);
  }

  navigateToAnalytics() {
    this.currentView = "analytics";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (container) AnalyticsView.renderAnalyticsPage(container);
  }

  navigateToAchievements() {
    this.currentView = "badges";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (container) Achievements.renderAchievementsPage(container);
  }

  navigateToNovelHub() {
    this.currentView = "novel";
    this.renderHeader();
    NovelHub.render("main-app-container", {
      onBack: () => this.navigateToDashboard(),
      onStartQuiz: (questions, title) => {
        if (!questions || questions.length === 0) {
          alert("No questions available for this selection.");
          return;
        }
        this.startExam({
          examType: "JAMB",
          title: `Novel Quiz: ${title}`,
          department: "All Departments",
          subjects: ["Compulsory Novel"],
          questions: questions,
          durationMinutes: Math.max(10, Math.ceil(questions.length * 1.5)),
          mode: "study"
        });
      }
    });
  }

  /**
   * Generic exam starter for any test payload
   */
  startExam(payload) {
    this.activeEngine = new CbtEngine({
      questions: payload.questions,
      examType: payload.examType || "JAMB",
      department: payload.department || "General",
      examTitle: payload.title || "Practice Exam",
      durationMinutes: payload.durationMinutes || 30,
      mode: payload.mode || "cbt"
    });

    this.currentView = "cbt";
    this.activeEngine.init();

    CbtView.render("main-app-container", this.activeEngine, {
      onExamComplete: (result) => {
        this.activeResult = result;
        if (payload.isDailyChallenge) {
          Storage.saveDailyChallengeResult(result.score, result.totalQuestions);
        }
        Achievements.evaluateBadges();
        this.navigateToResult(result);
      },
      onExitExam: () => {
        this.navigateToDashboard();
      }
    });
  }

  startJambExam(departmentName, mode = "cbt", customSubjects = null, questionsPerSubject = 10) {
    const examData = createJambSimulation(departmentName, customSubjects, questionsPerSubject);
    this.startExam({
      examType: "JAMB",
      title: examData.title,
      department: departmentName,
      subjects: examData.subjects,
      questions: examData.questions,
      durationMinutes: mode === "study" ? 180 : examData.durationMinutes,
      mode: mode
    });
  }

  startWaecExam(subject, mode = "cbt") {
    const examData = createWaecExam(subject, 10);
    const profile = Storage.getUserProfile();
    this.startExam({
      examType: "WAEC",
      title: examData.title,
      department: profile.department,
      subjects: [subject],
      questions: examData.questions,
      durationMinutes: mode === "study" ? 120 : examData.durationMinutes,
      mode: mode
    });
  }

  navigateToResult(resultData) {
    this.currentView = "result";
    ResultView.render("main-app-container", resultData, {
      onReturnDashboard: () => this.navigateToDashboard(),
      onRetakeExam: (oldResult) => {
        if (oldResult.examType === "JAMB") {
          this.startJambExam(oldResult.department, "cbt");
        } else {
          this.startWaecExam(oldResult.questions[0]?.subject || "Mathematics", "cbt");
        }
      }
    });
  }

  navigateToBookmarks() {
    this.currentView = "bookmarks";
    this.renderHeader();
    const container = document.getElementById("main-app-container");
    if (!container) return;

    const bookmarkedIds = Storage.getBookmarks();
    const savedQuestions = allQuestions.filter(q => bookmarkedIds.includes(q.id));

    container.innerHTML = `
      <div class="bookmarks-page">
        <div class="bookmarks-header">
          <div>
            <h2>Saved Questions for Revision</h2>
            <p>Review questions you've marked during your study sessions.</p>
          </div>
          <button id="btn-back-from-bookmarks" class="btn-primary">← Back to Dashboard</button>
        </div>

        ${savedQuestions.length === 0 ? `
          <div class="empty-state">
            <span class="empty-icon">⭐</span>
            <h3>No Bookmarked Questions Yet</h3>
            <p>While taking practice tests or exploring the question bank, click the <strong>Bookmark</strong> button on challenging questions to review them here anytime.</p>
          </div>
        ` : `
          <div class="review-questions-list">
            ${savedQuestions.map((q, idx) => `
              <div class="review-question-card review-correct">
                <div class="review-q-header">
                  <div class="q-meta-left">
                    <span class="q-number-pill">Saved #${idx + 1}</span>
                    <span class="q-tag">${q.exam} ${q.year}</span>
                    <span class="q-tag tag-subject">${q.subject}</span>
                  </div>
                  <button class="btn-remove-bookmark" data-qid="${q.id}">Remove</button>
                </div>
                <div class="review-q-body">
                  <div class="review-question-text">${q.question.replace(/\n/g, '<br>')}</div>
                  <div class="review-options">
                    ${q.options.map(opt => `
                      <div class="review-opt-row ${opt.key === q.correctAnswer ? 'opt-correct-answer' : ''}">
                        <div class="opt-bullet">${opt.key}</div>
                        <div class="opt-text">${opt.text}</div>
                        ${opt.key === q.correctAnswer ? '<span class="status-marker marker-correct">✓ Correct</span>' : ''}
                      </div>
                    `).join('')}
                  </div>
                  <div class="explanation-box">
                    <div class="explanation-title">📚 Explanation:</div>
                    <div class="explanation-content">${q.explanation.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    document.getElementById("btn-back-from-bookmarks")?.addEventListener("click", () => {
      this.navigateToDashboard();
    });

    const removeBtns = container.querySelectorAll(".btn-remove-bookmark");
    removeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        Storage.toggleBookmark(qid);
        this.navigateToBookmarks();
      });
    });
  }

  bindGlobalEvents() {
    window.addEventListener("beforeunload", (e) => {
      if (this.activeEngine && this.activeEngine.status === "running") {
        e.preventDefault();
        e.returnValue = "You have an active examination session in progress!";
      }
    });
  }
}

// Bootstrap application on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new JambWaecApp();
  app.init();
});
