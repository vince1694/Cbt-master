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
  STUDY_PLANNER: "jamb_waec_study_planner",
  PREMIUM: "cbt_master_premium_v1"
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
  theme: "light", // Default to light mode first
  fontSize: "medium", // small, medium, large
  jambKeyShortcuts: true
};

export const Storage = {
  _getUserSuffix() {
    try {
      const email = (localStorage.getItem('cbt_user_email') || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
      if (email) return `_${email}`;
      const session = localStorage.getItem('cbtmaster_session');
      if (session) {
        const parsed = JSON.parse(session);
        if (parsed.userId) return `_${String(parsed.userId).replace(/[^a-zA-Z0-9]/g, '_')}`;
      }
    } catch {}
    return '';
  },

  _getScopedKey(baseKey) {
    const suffix = this._getUserSuffix();
    return suffix ? `${baseKey}${suffix}` : baseKey;
  },

  // User Profile
  getUserProfile() {
    const scopedKey = this._getScopedKey(STORAGE_KEYS.USER_PROFILE);
    const raw = localStorage.getItem(scopedKey);
    const currentEmail = (localStorage.getItem('cbt_user_email') || '').trim().toLowerCase();
    const currentName = localStorage.getItem('cbt_user_name') || 'Candidate';

    const _buildFresh = (base = {}) => ({
      ...DEFAULT_PROFILE,
      ...base,
      name: currentName || base.name || 'Candidate',
      email: currentEmail || base.email || ''
    });

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // If the parsed profile email doesn't match current user, do NOT leak it!
        if (currentEmail && parsed.email && parsed.email.toLowerCase() !== currentEmail) {
          const fresh = _buildFresh();
          localStorage.setItem(scopedKey, JSON.stringify(fresh));
          return fresh;
        }
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          ...(currentEmail ? { email: currentEmail } : {}),
          ...(currentName && currentName !== 'Candidate' ? { name: currentName } : {})
        };
      } catch {}
    }

    // Try global key ONLY if it matches the current user's email
    const legacy = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (legacy) {
      try {
        const parsedLegacy = JSON.parse(legacy);
        if (!currentEmail || !parsedLegacy.email || parsedLegacy.email.toLowerCase() === currentEmail) {
          const merged = { ...DEFAULT_PROFILE, ...parsedLegacy, ...(currentEmail ? { email: currentEmail } : {}) };
          localStorage.setItem(scopedKey, JSON.stringify(merged));
          return merged;
        }
      } catch {}
    }

    const seeded = _buildFresh();
    localStorage.setItem(scopedKey, JSON.stringify(seeded));
    return seeded;
  },

  updateUserProfile(updatedData) {
    const current = this.getUserProfile();
    const merged = { ...current, ...updatedData };
    const scopedKey = this._getScopedKey(STORAGE_KEYS.USER_PROFILE);
    localStorage.setItem(scopedKey, JSON.stringify(merged));
    return merged;
  },

  // Test History
  getTestHistory() {
    const key = this._getScopedKey(STORAGE_KEYS.TEST_HISTORY);
    const raw = localStorage.getItem(key);
    if (raw) {
      try { return JSON.parse(raw); } catch { return []; }
    }
    // Never leak or copy test history from another user on the same device!
    return [];
  },

  setTestHistory(historyList) {
    const key = this._getScopedKey(STORAGE_KEYS.TEST_HISTORY);
    localStorage.setItem(key, JSON.stringify(Array.isArray(historyList) ? historyList : []));
  },

  saveTestResult(testResult) {
    const history = this.getTestHistory();
    const resultEntry = {
      id: "test_" + Date.now(),
      timestamp: new Date().toISOString(),
      ...testResult
    };
    history.unshift(resultEntry);
    const key = this._getScopedKey(STORAGE_KEYS.TEST_HISTORY);
    localStorage.setItem(key, JSON.stringify(history));

    // Update study time & streak
    this.incrementStudyTime(testResult.timeSpentMinutes || 5);
    return resultEntry;
  },

  // Bookmarks
  getBookmarks() {
    const key = this._getScopedKey(STORAGE_KEYS.BOOKMARKS);
    const raw = localStorage.getItem(key);
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
    const key = this._getScopedKey(STORAGE_KEYS.BOOKMARKS);
    localStorage.setItem(key, JSON.stringify(bookmarks));
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
    const key = this._getScopedKey(STORAGE_KEYS.DAILY_CHALLENGE);
    const raw = localStorage.getItem(key);
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
    const key = this._getScopedKey(STORAGE_KEYS.DAILY_CHALLENGE);
    localStorage.setItem(key, JSON.stringify(state));
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
    const key = this._getScopedKey(STORAGE_KEYS.ACHIEVEMENTS);
    const raw = localStorage.getItem(key);
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
      const key = this._getScopedKey(STORAGE_KEYS.ACHIEVEMENTS);
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    }
    return false;
  },

  // Study Planner
  getStudyPlanner() {
    const key = this._getScopedKey(STORAGE_KEYS.STUDY_PLANNER);
    const raw = localStorage.getItem(key);
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
    const key = this._getScopedKey(STORAGE_KEYS.STUDY_PLANNER);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  },

  clearUserData() {
    try {
      const keysToRemove = [
        STORAGE_KEYS.USER_PROFILE,
        STORAGE_KEYS.TEST_HISTORY,
        STORAGE_KEYS.BOOKMARKS,
        STORAGE_KEYS.DAILY_CHALLENGE,
        STORAGE_KEYS.ACHIEVEMENTS,
        STORAGE_KEYS.STUDY_PLANNER,
        STORAGE_KEYS.PREMIUM,
        'cbtmaster_premium',
        'cbt_premium_data'
      ];
      keysToRemove.forEach(k => localStorage.removeItem(k));
      Object.keys(localStorage)
        .filter(k => k.startsWith('jamb_waec_') || k.startsWith('cbt_') || k.startsWith('cbtmaster_'))
        .forEach(k => localStorage.removeItem(k));
    } catch (_) {}
  },

  // ── Premium Access ────────────────────────────────────────────────────────
  isPremiumActive() {
    try {
      // 1. Primary storage key check
      const raw1 = localStorage.getItem(STORAGE_KEYS.PREMIUM);
      if (raw1) {
        const d1 = JSON.parse(raw1);
        if (d1 && (d1.active === true || d1.isPremium === true)) return true;
      }

      // 2. Cross-check React bundle key ('cbtmaster_premium')
      const raw2 = localStorage.getItem('cbtmaster_premium');
      if (raw2) {
        const d2 = JSON.parse(raw2);
        if (d2 && (d2.isPremium === true || d2.active === true)) {
          // Self-heal and sync to primary key
          this.setPremium({ reference: d2.reference || 'restored', email: d2.email || '' });
          return true;
        }
      }

      // 3. User profile flag check
      const profile = this.getUserProfile();
      if (profile && profile.isPremium === true) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  },

  setPremium({ reference, email }) {
    const payload = {
      active: true,
      isPremium: true,
      reference: reference || "manual",
      email: email || "",
      activatedAt: new Date().toISOString()
    };
    // Sync both primary and React keys so all app views stay permanently unlocked
    try {
      localStorage.setItem(STORAGE_KEYS.PREMIUM, JSON.stringify(payload));
      localStorage.setItem('cbtmaster_premium', JSON.stringify(payload));
      const profile = this.getUserProfile();
      if (profile) {
        profile.isPremium = true;
        profile.premiumReference = reference || "manual";
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      }
    } catch {}
    return payload;
  },

  clearPremium() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PREMIUM);
      localStorage.removeItem('cbtmaster_premium');
      const profile = this.getUserProfile();
      if (profile) {
        profile.isPremium = false;
        profile.premiumReference = null;
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      }
    } catch {}
  },

  getPremiumData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PREMIUM) || localStorage.getItem('cbtmaster_premium');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
};
