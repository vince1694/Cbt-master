/**
 * LocalStorage Persistence and State Manager
 * Handles user profile, test history, bookmarks, streaks, and analytics
 */

const STORAGE_KEYS = {
  USER_PROFILE: "jamb_waec_user_profile",
  TEST_HISTORY: "jamb_waec_test_history",
  BOOKMARKS: "jamb_waec_bookmarks",
  SETTINGS: "jamb_waec_settings",
  DAILY_CHALLENGE: "jamb_waec_daily_challenge",
  ACHIEVEMENTS: "jamb_waec_achievements",
  STUDY_PLANNER: "jamb_waec_study_planner"
};

const DEFAULT_PROFILE = {
  name: "Candidate",
  department: "Science", // Science, Arts, Commercial
  targetJambScore: 280,
  targetInstitution: "University of Lagos (UNILAG)",
  preferredCourse: "Computer Science",
  streakDays: 0,
  lastStudyDate: null,
  totalTimeMinutes: 0
};

const DEFAULT_SETTINGS = {
  soundEnabled: true,
  theme: "dark",
  fontSize: "medium", // small, medium, large
  jambKeyShortcuts: true
};

export const Storage = {
  // User Profile
  getUserProfile() {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    try {
      const parsed = JSON.parse(raw);
      // Automatically purge legacy mock or demo user state
      if (parsed.name === "Demo Student" || parsed.name === "Future Scholar" || parsed.email === "demo@cbtmaster.ng") {
        const cleaned = {
          ...DEFAULT_PROFILE,
          name: localStorage.getItem('cbt_user_name') || "Candidate",
          email: localStorage.getItem('cbt_user_email') || "",
          streakDays: 0,
          totalTimeMinutes: 0,
          lastStudyDate: null
        };
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(cleaned));
        return cleaned;
      }
      return { ...DEFAULT_PROFILE, ...parsed };
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  updateUserProfile(updatedData) {
    const current = this.getUserProfile();
    const merged = { ...current, ...updatedData };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(merged));
    return merged;
  },

  // Test History
  getTestHistory() {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_HISTORY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  saveTestResult(testResult) {
    const history = this.getTestHistory();
    const resultEntry = {
      id: "test_" + Date.now(),
      timestamp: new Date().toISOString(),
      ...testResult
    };
    history.unshift(resultEntry);
    localStorage.setItem(STORAGE_KEYS.TEST_HISTORY, JSON.stringify(history));

    // Update study time & streak
    this.incrementStudyTime(testResult.timeSpentMinutes || 5);
    return resultEntry;
  },

  // Bookmarks
  getBookmarks() {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  toggleBookmark(questionId) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(questionId);
    let isBookmarked = false;
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(questionId);
      isBookmarked = true;
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return isBookmarked;
  },

  isBookmarked(questionId) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(questionId);
  },

  // Settings
  getSettings() {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  updateSettings(newSettings) {
    const current = this.getSettings();
    const merged = { ...current, ...newSettings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
    return merged;
  },

  incrementStudyTime(minutes) {
    const profile = this.getUserProfile();
    const today = new Date().toISOString().split("T")[0];
    
    let streak = profile.streakDays || 1;
    if (profile.lastStudyDate) {
      const last = new Date(profile.lastStudyDate);
      const now = new Date(today);
      const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak += 1;
      } else if (diffDays > 1) {
        streak = 1;
      }
    }

    this.updateUserProfile({
      totalTimeMinutes: (profile.totalTimeMinutes || 0) + minutes,
      lastStudyDate: today,
      streakDays: streak
    });
  },

  // Compute Overall Performance Analytics
  getAnalytics() {
    const history = this.getTestHistory();
    if (history.length === 0) {
      return {
        totalTestsTaken: 0,
        averagePercentage: 0,
        highestScore: 0,
        jambTestsCount: 0,
        waecTestsCount: 0,
        subjectStats: {}
      };
    }

    let totalScore = 0;
    let highestScore = 0;
    let jambCount = 0;
    let waecCount = 0;
    const subjectStats = {};

    history.forEach(item => {
      const pct = (item.score / item.totalQuestions) * 100;
      totalScore += pct;
      if (pct > highestScore) highestScore = pct;

      if (item.examType === "JAMB") jambCount++;
      if (item.examType === "WAEC") waecCount++;

      // Subject-level breakdown
      if (item.subjectBreakdown) {
        Object.entries(item.subjectBreakdown).forEach(([subject, stat]) => {
          if (!subjectStats[subject]) {
            subjectStats[subject] = { answered: 0, correct: 0 };
          }
          subjectStats[subject].answered += stat.total;
          subjectStats[subject].correct += stat.correct;
        });
      }
    });

    const averagePercentage = Math.round(totalScore / history.length);

    return {
      totalTestsTaken: history.length,
      averagePercentage,
      highestScore: Math.round(highestScore),
      jambTestsCount: jambCount,
      waecTestsCount: waecCount,
      subjectStats
    };
  },

  // Daily Challenge State
  getDailyChallengeState() {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE);
    const today = new Date().toISOString().split("T")[0];
    const defaultState = {
      date: today,
      completed: false,
      score: 0,
      total: 10,
      streak: 1,
      lastCompletedDate: null
    };
    if (!raw) return defaultState;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.date !== today) {
        // New day, reset completed status but preserve streak logic
        const lastDate = parsed.lastCompletedDate;
        let streak = parsed.streak || 1;
        if (lastDate) {
          const diff = Math.round((new Date(today) - new Date(lastDate)) / (1000 * 60 * 60 * 24));
          if (diff > 1) streak = 0; // Streak broken if missed a day
        }
        return {
          date: today,
          completed: false,
          score: 0,
          total: 10,
          streak: streak,
          lastCompletedDate: lastDate
        };
      }
      return parsed;
    } catch {
      return defaultState;
    }
  },

  saveDailyChallengeResult(score, total = 10) {
    const today = new Date().toISOString().split("T")[0];
    const current = this.getDailyChallengeState();
    let streak = current.streak || 0;
    if (!current.completed) {
      streak += 1;
    }
    const state = {
      date: today,
      completed: true,
      score,
      total,
      streak,
      lastCompletedDate: today
    };
    localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify(state));
    // Also reward achievement if streak >= 3
    if (streak >= 3) {
      this.unlockAchievement("streak_3");
    }
    if (streak >= 7) {
      this.unlockAchievement("streak_7");
    }
    return state;
  },

  // Achievements System
  getAchievements() {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  },

  unlockAchievement(badgeId) {
    const list = this.getAchievements();
    if (!list.includes(badgeId)) {
      list.push(badgeId);
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
      return true;
    }
    return false;
  },

  // Study Planner
  getStudyPlanner() {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDY_PLANNER);
    const defaultPlanner = {
      targetExamDate: "2025-04-19",
      targetScore: 280,
      dailyQuestionTarget: 30,
      completedTopics: [],
      notes: ""
    };
    if (!raw) return defaultPlanner;
    try {
      return { ...defaultPlanner, ...JSON.parse(raw) };
    } catch {
      return defaultPlanner;
    }
  },

  updateStudyPlanner(patch) {
    const current = this.getStudyPlanner();
    const updated = { ...current, ...patch };
    localStorage.setItem(STORAGE_KEYS.STUDY_PLANNER, JSON.stringify(updated));
    return updated;
  }
};
