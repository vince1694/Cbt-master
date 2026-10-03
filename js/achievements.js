/**
 * Achievements & Badges System
 * Gamification module with Nigerian UTME & WAEC academic milestones.
 */
import { Storage } from './storage.js';

export const BADGES_LIST = [
  {
    id: "first_test",
    title: "JAMB Aspirant",
    category: "Milestone",
    icon: "🎓",
    description: "Completed your very first CBT practice simulation.",
    condition: (history) => history.length >= 1
  },
  {
    id: "sharpshooter_80",
    title: "Sharpshooter (80%+)",
    category: "Mastery",
    icon: "🎯",
    description: "Scored 80% or higher in any JAMB or WAEC simulation test.",
    condition: (history) => history.some(t => (t.score / t.totalQuestions) >= 0.8)
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    category: "Speed",
    icon: "⚡",
    description: "Finished a full test in under 60% of the allocated examination time.",
    condition: (history) => history.some(t => t.timeSpentSeconds && t.durationSeconds && (t.timeSpentSeconds / t.durationSeconds) < 0.6)
  },
  {
    id: "streak_3",
    title: "Consistent Scholar",
    category: "Dedication",
    icon: "🔥",
    description: "Maintained a 3-day continuous daily practice streak.",
    condition: (history, profile, dc) => (dc && dc.streak >= 3) || (profile && profile.streakDays >= 3)
  },
  {
    id: "streak_7",
    title: "JAMB Gladiator",
    category: "Dedication",
    icon: "👑",
    description: "Maintained a 7-day continuous daily practice streak without missing a day.",
    condition: (history, profile, dc) => (dc && dc.streak >= 7) || (profile && profile.streakDays >= 7)
  },
  {
    id: "distinction_waec",
    title: "A1 Distinction",
    category: "Mastery",
    icon: "🌟",
    description: "Achieved an A1 grade (75%+) in a WAEC WASSCE examination simulation.",
    condition: (history) => history.some(t => t.examType === "WAEC" && (t.score / t.totalQuestions) >= 0.75)
  },
  {
    id: "novel_maestro",
    title: "Novel Maestro",
    category: "Reading",
    icon: "📚",
    description: "Completed practice questions for the compulsory novel 'The Life Changer'.",
    condition: (history) => history.some(t => t.title && t.title.toLowerCase().includes("novel"))
  },
  {
    id: "centurion_50",
    title: "Centurion (50+ Solved)",
    category: "Volume",
    icon: "🛡️",
    description: "Answered over 50 past questions across all subjects.",
    condition: (history) => {
      const totalAnswered = history.reduce((sum, t) => sum + (t.totalQuestions || 0), 0);
      return totalAnswered >= 50;
    }
  },
  {
    id: "scholar_100",
    title: "Grand Master (100+ Solved)",
    category: "Volume",
    icon: "🏆",
    description: "Answered over 100 past questions across all subjects.",
    condition: (history) => {
      const totalAnswered = history.reduce((sum, t) => sum + (t.totalQuestions || 0), 0);
      return totalAnswered >= 100;
    }
  },
  {
    id: "bookmark_collector",
    title: "Revision Master",
    category: "Study Habit",
    icon: "🔖",
    description: "Bookmarked 5 or more tough questions for later review.",
    condition: (history, profile, dc, bookmarks) => bookmarks && bookmarks.length >= 5
  }
];

export const Achievements = {
  /**
   * Evaluate all badges and save newly unlocked ones
   */
  evaluateBadges() {
    const history = Storage.getTestHistory();
    const profile = Storage.getUserProfile();
    const dc = Storage.getDailyChallengeState();
    const bookmarks = Storage.getBookmarks();
    const unlocked = Storage.getAchievements();

    const newlyUnlocked = [];

    BADGES_LIST.forEach(b => {
      if (!unlocked.includes(b.id)) {
        if (b.condition(history, profile, dc, bookmarks)) {
          Storage.unlockAchievement(b.id);
          newlyUnlocked.push(b);
        }
      }
    });

    return newlyUnlocked;
  },

  /**
   * Render achievements page / view
   */
  renderAchievementsPage(container) {
    this.evaluateBadges();
    const unlockedIds = Storage.getAchievements();
    const totalCount = BADGES_LIST.length;
    const unlockedCount = unlockedIds.length;
    const progressPct = Math.round((unlockedCount / totalCount) * 100);

    const html = `
      <div class="achievements-page-wrapper">
        <!-- Header Banner -->
        <div class="achievements-hero-card">
          <div class="ah-badge-info">
            <span class="ah-pill">🏆 Academic Honors & Badges</span>
            <h1 class="ah-title">Your Achievement Vault</h1>
            <p class="ah-subtitle">Unlock verified digital merit badges as you prepare for JAMB UTME & WAEC WASSCE.</p>
          </div>
          <div class="ah-progress-box">
            <div class="ah-stat-row">
              <span class="ah-stat-number">${unlockedCount} / ${totalCount}</span>
              <span class="ah-stat-label">Badges Unlocked</span>
            </div>
            <div class="ah-bar-outer">
              <div class="ah-bar-fill" style="width: ${progressPct}%"></div>
            </div>
            <span class="ah-pct-text">${progressPct}% Complete</span>
          </div>
        </div>

        <!-- Badges Grid -->
        <div class="achievements-grid">
          ${BADGES_LIST.map(badge => {
            const isUnlocked = unlockedIds.includes(badge.id);
            return `
              <div class="badge-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}">
                <div class="bc-top">
                  <div class="bc-icon-wrapper">
                    <span class="bc-icon">${badge.icon}</span>
                  </div>
                  <span class="bc-status-tag ${isUnlocked ? 'status-earned' : 'status-locked'}">
                    ${isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                  </span>
                </div>
                <div class="bc-content">
                  <span class="bc-category">${badge.category}</span>
                  <h3 class="bc-title">${badge.title}</h3>
                  <p class="bc-desc">${badge.description}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
};
