/**
 * Past Questions Browser & Mini-Drills Hub
 * Explore, search, bookmark, and launch targeted mini-drills on any topic.
 */
import { allQuestions } from './questions/index.js';
import { Storage } from './storage.js';

export const QuestionBrowser = {
  activeSubject: "All",
  activeExam: "All",
  activeYear: "All",
  searchQuery: "",
  pageSize: 15,
  currentPage: 1,

  renderBrowser(container) {
    const subjects = ["All", ...new Set(allQuestions.map(q => q.subject))].sort();
    const exams = ["All", "JAMB", "WAEC"];
    const years = ["All", "2024", "2023", "2022"];

    const html = `
      <div class="qb-page-wrapper">
        <!-- Hero Section -->
        <div class="qb-hero-card">
          <div class="qb-header-meta">
            <span class="qb-pill">📚 Question Bank Explorer</span>
            <span class="qb-stat-pill">Total: ${allQuestions.length} Vetted Questions</span>
          </div>
          <h1 class="qb-title">Past Questions & Topic Drills</h1>
          <p class="qb-subtitle">Filter authentic past questions, study detailed step-by-step solutions, or launch quick 10-question drills.</p>

          <!-- Search & Filter Controls -->
          <div class="qb-search-bar">
            <span class="qb-search-icon">🔍</span>
            <input type="text" id="qb-search-input" class="qb-input" placeholder="Search questions by keyword, topic, or concept (e.g. electrolysis, concord, log, mitosis)..." value="${this.searchQuery}">
          </div>

          <div class="qb-filters-row">
            <div class="qb-filter-group">
              <label>Subject:</label>
              <select id="qb-select-subject" class="qb-select">
                ${subjects.map(s => `<option value="${s}" ${s === this.activeSubject ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>

            <div class="qb-filter-group">
              <label>Exam Body:</label>
              <select id="qb-select-exam" class="qb-select">
                ${exams.map(e => `<option value="${e}" ${e === this.activeExam ? 'selected' : ''}>${e}</option>`).join('')}
              </select>
            </div>

            <div class="qb-filter-group">
              <label>Year:</label>
              <select id="qb-select-year" class="qb-select">
                ${years.map(y => `<option value="${y}" ${y === this.activeYear ? 'selected' : ''}>${y}</option>`).join('')}
              </select>
            </div>

            <button class="btn btn-primary qb-drill-btn" id="qb-btn-launch-drill">
              <span>⚡ Launch 10-Q Drill for this Filter</span>
            </button>
          </div>
        </div>

        <!-- Results Counter & Action Bar -->
        <div class="qb-results-bar">
          <span id="qb-results-count">Loading questions...</span>
        </div>

        <!-- Questions List -->
        <div class="qb-questions-list" id="qb-questions-list">
          <!-- Rendered dynamically -->
        </div>

        <!-- Pagination Controls -->
        <div class="qb-pagination-row" id="qb-pagination">
          <!-- Rendered dynamically -->
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners(container);
    this.updateResults(container);
  },

  getFilteredQuestions() {
    return allQuestions.filter(q => {
      if (this.activeSubject !== "All" && q.subject.toLowerCase() !== this.activeSubject.toLowerCase()) return false;
      if (this.activeExam !== "All" && q.exam.toUpperCase() !== this.activeExam.toUpperCase()) return false;
      if (this.activeYear !== "All" && q.year !== this.activeYear) return false;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inTopic = q.topic && q.topic.toLowerCase().includes(query);
        const inExp = q.explanation && q.explanation.toLowerCase().includes(query);
        if (!inQuestion && !inTopic && !inExp) return false;
      }
      return true;
    });
  },

  updateResults(container) {
    const filtered = this.getFilteredQuestions();
    const countEl = container.querySelector("#qb-results-count");
    if (countEl) {
      countEl.innerText = `Showing ${filtered.length} past questions matching current filters`;
    }

    const totalPages = Math.ceil(filtered.length / this.pageSize) || 1;
    if (this.currentPage > totalPages) this.currentPage = 1;

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const pageItems = filtered.slice(startIdx, startIdx + this.pageSize);

    const listEl = container.querySelector("#qb-questions-list");
    if (!listEl) return;

    if (pageItems.length === 0) {
      listEl.innerHTML = `
        <div class="qb-empty-box">
          <span class="qb-empty-icon">📂</span>
          <h3>No questions matched your search criteria</h3>
          <p>Try clearing your keyword or switching subjects.</p>
        </div>
      `;
      const pagEl = container.querySelector("#qb-pagination");
      if (pagEl) pagEl.innerHTML = "";
      return;
    }

    listEl.innerHTML = pageItems.map((q, idx) => {
      const globalIdx = startIdx + idx + 1;
      const isBookmarked = Storage.isBookmarked(q.id);

      return `
        <div class="qb-item-card" data-qid="${q.id}">
          <div class="qb-card-header">
            <div class="qb-meta-tags">
              <span class="qb-num-pill">#${globalIdx}</span>
              <span class="qb-tag-exam">${q.exam} ${q.year}</span>
              <span class="qb-tag-subject">${q.subject}</span>
              ${q.topic ? `<span class="qb-tag-topic">${q.topic}</span>` : ''}
            </div>
            <button class="qb-bookmark-btn ${isBookmarked ? 'active' : ''}" data-qid="${q.id}" title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}">
              <span>${isBookmarked ? '🔖 Saved' : '📑 Save'}</span>
            </button>
          </div>

          <div class="qb-question-text">
            ${q.passage ? `<div class="qb-passage-box"><strong>Passage:</strong><br>${q.passage}</div>` : ''}
            <p>${q.question.replace(/\n/g, '<br>')}</p>
          </div>

          <div class="qb-options-grid">
            ${q.options.map(opt => `
              <div class="qb-option-row ${opt.key === q.correctAnswer ? 'is-correct-preview' : ''}">
                <span class="qb-opt-key">${opt.key}</span>
                <span class="qb-opt-val">${opt.text}</span>
              </div>
            `).join('')}
          </div>

          <div class="qb-action-footer">
            <button class="qb-toggle-sol-btn" data-qid="${q.id}">
              <span>💡 View Full Solution & Workings</span>
            </button>
          </div>

          <div class="qb-solution-drawer" id="sol-${q.id}" style="display: none;">
            <div class="qb-solution-content">
              <div class="qb-correct-badge">✓ Correct Option: <strong>${q.correctAnswer}</strong></div>
              <p class="qb-explanation-text">${q.explanation.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Pagination HTML
    const pagEl = container.querySelector("#qb-pagination");
    if (pagEl) {
      if (totalPages <= 1) {
        pagEl.innerHTML = "";
      } else {
        pagEl.innerHTML = `
          <button class="qb-pag-btn" id="qb-prev-page" ${this.currentPage === 1 ? 'disabled' : ''}>← Previous</button>
          <span class="qb-page-indicator">Page ${this.currentPage} of ${totalPages}</span>
          <button class="qb-pag-btn" id="qb-next-page" ${this.currentPage === totalPages ? 'disabled' : ''}>Next →</button>
        `;

        const prev = pagEl.querySelector("#qb-prev-page");
        if (prev) {
          prev.addEventListener("click", () => {
            if (this.currentPage > 1) {
              this.currentPage--;
              this.updateResults(container);
              container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        }
        const next = pagEl.querySelector("#qb-next-page");
        if (next) {
          next.addEventListener("click", () => {
            if (this.currentPage < totalPages) {
              this.currentPage++;
              this.updateResults(container);
              container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        }
      }
    }

    this.attachCardActions(container);
  },

  attachEventListeners(container) {
    const subjSelect = container.querySelector("#qb-select-subject");
    if (subjSelect) {
      subjSelect.addEventListener("change", (e) => {
        this.activeSubject = e.target.value;
        this.currentPage = 1;
        this.updateResults(container);
      });
    }

    const examSelect = container.querySelector("#qb-select-exam");
    if (examSelect) {
      examSelect.addEventListener("change", (e) => {
        this.activeExam = e.target.value;
        this.currentPage = 1;
        this.updateResults(container);
      });
    }

    const yearSelect = container.querySelector("#qb-select-year");
    if (yearSelect) {
      yearSelect.addEventListener("change", (e) => {
        this.activeYear = e.target.value;
        this.currentPage = 1;
        this.updateResults(container);
      });
    }

    const searchInput = container.querySelector("#qb-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        this.currentPage = 1;
        this.updateResults(container);
      });
    }

    const drillBtn = container.querySelector("#qb-btn-launch-drill");
    if (drillBtn) {
      drillBtn.addEventListener("click", () => {
        const pool = this.getFilteredQuestions();
        if (pool.length === 0) {
          alert("No questions available for this filter. Please widen your selection.");
          return;
        }

        const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
        const examPayload = {
          examType: this.activeExam === "All" ? "PRACTICE" : this.activeExam,
          title: `10-Question Targeted Drill (${this.activeSubject !== 'All' ? this.activeSubject : 'Mixed Subjects'})`,
          department: "General",
          subjects: [this.activeSubject !== 'All' ? this.activeSubject : 'Mixed Subjects'],
          questions: shuffled,
          durationMinutes: 10,
          totalQuestions: shuffled.length,
          isStudyMode: true
        };

        if (window.App && typeof window.App.startExam === "function") {
          window.App.startExam(examPayload);
        } else {
          window.location.hash = "#cbt";
        }
      });
    }
  },

  attachCardActions(container) {
    // Solution toggles
    const solBtns = container.querySelectorAll(".qb-toggle-sol-btn");
    solBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const drawer = container.querySelector(`#sol-${qid}`);
        if (drawer) {
          const isOpen = drawer.style.display !== "none";
          drawer.style.display = isOpen ? "none" : "block";
          btn.innerHTML = isOpen ? "<span>💡 View Full Solution & Workings</span>" : "<span>✕ Hide Solution</span>";
        }
      });
    });

    // Bookmarks
    const bookmarkBtns = container.querySelectorAll(".qb-bookmark-btn");
    bookmarkBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const saved = Storage.toggleBookmark(qid);
        btn.classList.toggle("active", saved);
        btn.innerHTML = saved ? "<span>🔖 Saved</span>" : "<span>📑 Save</span>";
      });
    });
  }
};
