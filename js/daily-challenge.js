/**
 * Daily Challenge Mode
 * 10 dynamic questions curated daily from the question bank.
 * Tracks consecutive daily streaks, speed bonus, and instant answer review.
 */
import { allQuestions } from './questions/index.js';
import { Storage } from './storage.js';

export const DailyChallenge = {
  /**
   * Deterministic pseudo-random number generator for daily question consistency
   */
  getDailySeed() {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    let hash = 0;
    for (let i = 0; i < today.length; i++) {
      hash = (hash << 5) - hash + today.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  },

  /**
   * Generate today's 10 questions across subjects
   */
  getTodayQuestions() {
    const seed = this.getDailySeed();
    const shuffled = [...allQuestions].sort((a, b) => {
      const hashA = (a.id.charCodeAt(0) * 31 + seed) % 1000;
      const hashB = (b.id.charCodeAt(0) * 31 + seed) % 1000;
      return hashA - hashB;
    });

    // Pick 10 diverse questions (at least 2 English, 2 Science, 2 Social/Commercial, 2 Novel/General)
    const picked = [];
    const subjectsSeen = {};

    for (const q of shuffled) {
      if (picked.length >= 10) break;
      if (!subjectsSeen[q.subject] || subjectsSeen[q.subject] < 3) {
        picked.push(q);
        subjectsSeen[q.subject] = (subjectsSeen[q.subject] || 0) + 1;
      }
    }

    // Fallback if less than 10
    if (picked.length < 10) {
      for (const q of shuffled) {
        if (picked.length >= 10) break;
        if (!picked.some(p => p.id === q.id)) picked.push(q);
      }
    }

    return picked;
  },

  /**
   * Render the Daily Challenge Card on the Dashboard or Standalone Hub
   */
  renderChallengeCard(container) {
    const state = Storage.getDailyChallengeState();
    const streak = state.streak || 0;
    const isCompleted = state.completed;

    const html = `
      <div class="daily-challenge-card ${isCompleted ? 'is-completed' : ''}">
        <div class="dc-header">
          <div class="dc-badge-group">
            <span class="dc-pill-badge">🔥 Daily Challenge</span>
            <span class="dc-streak-badge">⚡ ${streak} Day Streak</span>
          </div>
          <span class="dc-date-tag">${new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
        </div>

        <div class="dc-body">
          <div class="dc-info-col">
            <h3 class="dc-title">${isCompleted ? 'Challenge Completed for Today!' : "Today's 10-Question Sprint"}</h3>
            <p class="dc-desc">
              ${isCompleted 
                ? `You scored <strong>${state.score}/${state.total}</strong> in today's challenge. Come back tomorrow at 12:00 AM to keep your ${streak}-day streak alive!` 
                : '10 mixed past questions across English, Sciences & Arts. Answer within 10 minutes to maintain your daily streak and earn badges.'}
            </p>
            ${isCompleted ? `
              <div class="dc-score-meter">
                <div class="dc-meter-bar" style="width: ${(state.score / state.total) * 100}%"></div>
              </div>
            ` : ''}
          </div>

          <div class="dc-action-col">
            ${isCompleted ? `
              <button class="btn btn-secondary dc-review-btn" id="btn-review-daily">
                <span>👁️ Review Solutions</span>
              </button>
            ` : `
              <button class="btn btn-primary dc-start-btn" id="btn-start-daily">
                <span>🚀 Start Today's Challenge (10 Qs)</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;

    const startBtn = container.querySelector("#btn-start-daily");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        this.launchChallenge();
      });
    }

    const reviewBtn = container.querySelector("#btn-review-daily");
    if (reviewBtn) {
      reviewBtn.addEventListener("click", () => {
        window.location.hash = "#question-browser";
      });
    }
  },

  /**
   * Launch challenge in CBT engine
   */
  launchChallenge() {
    const questions = this.getTodayQuestions();
    const examPayload = {
      examType: "DAILY_CHALLENGE",
      title: `Daily Sprint Challenge — ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`,
      department: "General",
      subjects: ["Mixed Subjects"],
      questions: questions,
      durationMinutes: 10,
      totalQuestions: questions.length,
      isDailyChallenge: true
    };

    if (window.App && typeof window.App.startExam === "function") {
      window.App.startExam(examPayload);
    } else {
      window.location.hash = "#cbt";
    }
  }
};
