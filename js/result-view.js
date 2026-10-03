/**
 * Result Slip and Detailed Examination Review Controller
 * Generates official result slips, subject breakdown cards, and in-depth question explanations
 */
import { Storage } from './storage.js';

export const ResultView = {
  render(containerId, resultData, { onReturnDashboard, onRetakeExam }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const profile = Storage.getUserProfile();
    const isJamb = resultData.examType === "JAMB";

    container.innerHTML = `
      <div class="result-page-container">
        <!-- Top Navigation -->
        <div class="result-top-bar">
          <button id="btn-back-dashboard" class="btn-ghost">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Dashboard
          </button>
          <div class="result-actions-top">
            <button id="btn-share-whatsapp" class="btn-whatsapp">
              <span>📱 Share on WhatsApp</span>
            </button>
            <button id="btn-print-slip" class="btn-outline">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Print Result Slip
            </button>
            <button id="btn-retake-exam" class="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
              Retake Exam
            </button>
          </div>
        </div>

        <!-- Official Result Slip Card -->
        <div class="result-slip-card" id="printable-result-slip">
          <div class="slip-header">
            <div class="slip-emblem">
              ${isJamb ? '🇳🇬 JAMB UTME' : '🎓 WAEC WASSCE'}
            </div>
            <div class="slip-title-block">
              <h2>${isJamb ? 'JOINT ADMISSIONS AND MATRICULATION BOARD' : 'WEST AFRICAN EXAMINATIONS COUNCIL'}</h2>
              <h3>OFFICIAL PRACTICE EXAMINATION RESULT NOTIFICATION</h3>
              <p class="slip-meta">${resultData.examTitle} • ${resultData.department} Department</p>
            </div>
          </div>

          <!-- Candidate Details Strip -->
          <div class="candidate-strip">
            <div class="strip-col">
              <span class="strip-label">Candidate Name:</span>
              <span class="strip-value">${profile.name}</span>
            </div>
            <div class="strip-col">
              <span class="strip-label">Department:</span>
              <span class="strip-value">${resultData.department}</span>
            </div>
            <div class="strip-col">
              <span class="strip-label">Date Completed:</span>
              <span class="strip-value">${new Date().toLocaleDateString()}</span>
            </div>
            <div class="strip-col">
              <span class="strip-label">Time Spent:</span>
              <span class="strip-value">${resultData.timeSpentMinutes} mins</span>
            </div>
          </div>

          <!-- Overall Performance Score Hero -->
          <div class="slip-score-hero">
            ${isJamb ? `
              <div class="jamb-aggregate-box">
                <span class="score-label">AGGREGATE UTME SCORE</span>
                <div class="aggregate-number">${resultData.scaledJambScore} <span class="denom">/ 400</span></div>
                <div class="performance-tag ${resultData.scaledJambScore >= 250 ? 'tag-high' : 'tag-moderate'}">
                  ${resultData.scaledJambScore >= 250 ? '🌟 Highly Competitive for University Admission' : '⚡ Keep Practicing to Reach Target'}
                </div>
              </div>
            ` : `
              <div class="waec-grade-box">
                <span class="score-label">OFFICIAL WAEC GRADE</span>
                <div class="waec-grade-letter" style="color: ${resultData.waecGrade.color}">${resultData.waecGrade.grade}</div>
                <div class="waec-remark">
                  <strong>${resultData.waecGrade.desc}</strong> (${resultData.waecGrade.remark})
                </div>
              </div>
            `}

            <div class="quick-stats-pills">
              <div class="stat-pill">
                <span class="pill-title">Accuracy</span>
                <span class="pill-data">${resultData.percentage}%</span>
              </div>
              <div class="stat-pill">
                <span class="pill-title">Correct Questions</span>
                <span class="pill-data text-success">${resultData.score} / ${resultData.totalQuestions}</span>
              </div>
              <div class="stat-pill">
                <span class="pill-title">Incorrect / Unanswered</span>
                <span class="pill-data text-danger">${resultData.totalQuestions - resultData.score}</span>
              </div>
            </div>
          </div>

          <!-- Subject Breakdown Grid -->
          <div class="subject-breakdown-section">
            <h4 class="breakdown-title">Subject Performance Analysis</h4>
            <div class="subject-cards-grid">
              ${Object.entries(resultData.subjectBreakdown || {}).map(([subject, stat]) => `
                <div class="sub-breakdown-card">
                  <div class="card-subject-name">${subject}</div>
                  <div class="card-subject-score">
                    <strong>${stat.correct}</strong> / ${stat.total}
                    <span class="subj-pct">(${stat.percentage}%)</span>
                  </div>
                  <div class="sub-bar-bg">
                    <div class="sub-bar-fill" style="width: ${stat.percentage}%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Comprehensive Question Review Section -->
        <section class="review-section">
          <div class="review-header-flex">
            <div>
              <h3 class="review-title">Step-by-Step Question Review & Vetted Explanations</h3>
              <p class="review-subtitle">Review every question, examine correct options, and study pedagogical explanations</p>
            </div>
            <!-- Filter buttons: All, Incorrect, Correct -->
            <div class="review-filter-buttons" id="review-filters">
              <button class="btn-filter active" data-filter="all">All (${resultData.questions.length})</button>
              <button class="btn-filter" data-filter="incorrect">Incorrect (${resultData.totalQuestions - resultData.score})</button>
              <button class="btn-filter" data-filter="correct">Correct (${resultData.score})</button>
            </div>
          </div>

          <!-- Questions Review List -->
          <div class="review-questions-list" id="review-questions-container">
            ${this.renderReviewQuestions(resultData, "all")}
          </div>
        </section>
      </div>
    `;

    // Attach Event Listeners
    this.attachReviewEvents(resultData, { onReturnDashboard, onRetakeExam });
  },

  renderReviewQuestions(resultData, filter) {
    const list = resultData.questions.map((q, idx) => {
      const userChoice = (resultData.userAnswers || {})[q.id] || null;
      const isCorrect = userChoice === q.correctAnswer;
      const isBookmarked = Storage.isBookmarked(q.id);

      if (filter === "correct" && !isCorrect) return null;
      if (filter === "incorrect" && isCorrect) return null;

      return `
        <div class="review-question-card ${isCorrect ? 'review-correct' : 'review-incorrect'}">
          <div class="review-q-header">
            <div class="q-meta-left">
              <span class="q-number-pill">Question ${idx + 1}</span>
              <span class="q-tag">${q.exam} ${q.year}</span>
              <span class="q-tag tag-subject">${q.subject}</span>
              ${q.topic ? `<span class="q-tag tag-topic">${q.topic}</span>` : ''}
            </div>
            <div class="q-meta-right">
              <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" data-qid="${q.id}" title="Save for later study">
                ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
              </button>
              <span class="answer-badge ${isCorrect ? 'badge-correct' : 'badge-wrong'}">
                ${isCorrect ? '✓ Correct' : (userChoice ? '✗ Wrong Choice' : '⚠️ Unanswered')}
              </span>
            </div>
          </div>

          <div class="review-q-body">
            ${q.passage ? `<div class="review-passage">${q.passage}</div>` : ''}
            <div class="review-question-text">${q.question.replace(/\n/g, '<br>')}</div>

            <div class="review-options">
              ${q.options.map(opt => {
                const isSelected = userChoice === opt.key;
                const isTheRightOne = opt.key === q.correctAnswer;
                let optClass = "";
                if (isTheRightOne) optClass = "opt-correct-answer";
                if (isSelected && !isTheRightOne) optClass = "opt-user-wrong";

                return `
                  <div class="review-opt-row ${optClass}">
                    <div class="opt-bullet">${opt.key}</div>
                    <div class="opt-text">${opt.text}</div>
                    ${isTheRightOne ? '<span class="status-marker marker-correct">Correct Answer</span>' : ''}
                    ${isSelected && !isTheRightOne ? '<span class="status-marker marker-wrong">Your Choice</span>' : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Vetted Explanation Accordion/Block -->
            <div class="explanation-box">
              <div class="explanation-title">
                <span>📚 Vetted Pedagogical Explanation:</span>
              </div>
              <div class="explanation-content">
                ${q.explanation.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        </div>
      `;
    }).filter(Boolean);

    if (list.length === 0) {
      return `
        <div class="empty-state">
          <p>No questions match the selected filter.</p>
        </div>
      `;
    }

    return list.join('');
  },

  attachReviewEvents(resultData, { onReturnDashboard, onRetakeExam }) {
    // Back to dashboard
    const backBtn = document.getElementById("btn-back-dashboard");
    if (backBtn && onReturnDashboard) {
      backBtn.addEventListener("click", onReturnDashboard);
    }

    // Retake exam
    const retakeBtn = document.getElementById("btn-retake-exam");
    if (retakeBtn && onRetakeExam) {
      retakeBtn.addEventListener("click", () => onRetakeExam(resultData));
    }

    // Print Result Slip
    const printBtn = document.getElementById("btn-print-slip");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Share on WhatsApp
    const whatsappBtn = document.getElementById("btn-share-whatsapp");
    if (whatsappBtn) {
      whatsappBtn.addEventListener("click", () => {
        const profile = Storage.getUserProfile();
        const pct = Math.round((resultData.score / resultData.totalQuestions) * 100);
        const scoreStr = resultData.scaledJambScore 
          ? `${resultData.scaledJambScore} / 400 (${pct}%)` 
          : `${resultData.score} / ${resultData.totalQuestions} (${pct}%)`;
        
        const text = encodeURIComponent(
          `🎯 *CBT Master — Official Examination Practice Result*\n\n` +
          `👤 *Candidate:* ${profile.name}\n` +
          `📚 *Simulation:* ${resultData.examTitle}\n` +
          `🏆 *Performance:* ${scoreStr}\n` +
          `⏱️ *Time Spent:* ${resultData.timeSpentMinutes} mins\n\n` +
          `🔥 Practice authentic JAMB & WAEC past questions with detailed solutions and The Life Changer novel hub on CBT Master!`
        );
        window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
      });
    }

    // Filters (All / Incorrect / Correct)
    const filterBtns = document.querySelectorAll(".btn-filter");
    const container = document.getElementById("review-questions-container");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;
        if (container) {
          container.innerHTML = this.renderReviewQuestions(resultData, filter);
          this.bindBookmarkButtons();
        }
      });
    });

    this.bindBookmarkButtons();
  },

  bindBookmarkButtons() {
    const bookmarkBtns = document.querySelectorAll(".btn-bookmark");
    bookmarkBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const isNowBookmarked = Storage.toggleBookmark(qid);
        if (isNowBookmarked) {
          btn.classList.add("bookmarked");
          btn.innerHTML = "★ Bookmarked";
        } else {
          btn.classList.remove("bookmarked");
          btn.innerHTML = "☆ Bookmark";
        }
      });
    });
  }
};
