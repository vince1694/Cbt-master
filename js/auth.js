/**
 * Auth Manager - Login, Signup, Session, and Onboarding
 * Handles all authentication state with localStorage persistence
 */

const AUTH_KEYS = {
  SESSION: "cbtmaster_session",
  USERS_DB: "cbtmaster_users_db",
  CURRENT_USER: "cbtmaster_current_user"
};

export const Auth = {

  // ─── Session Management ─────────────────────────────────────────
  isLoggedIn() {
    // Check 1: cbtmaster_session (set by both local and cloud login)
    const session = localStorage.getItem(AUTH_KEYS.SESSION);
    if (session) {
      try {
        const { userId, expiry } = JSON.parse(session);
        if (userId && Date.now() < expiry) return true;
        // Session expired — clean up
        this.logout();
        return false;
      } catch {
        // Malformed session — fall through to JWT check
      }
    }
    // Check 2: JWT token + stored email (cloud login without a session object)
    const token = localStorage.getItem('cbt_auth_token');
    const email = localStorage.getItem('cbt_user_email');
    if (token && email) {
      // Decode the exp claim from the JWT without a library
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && Date.now() / 1000 < payload.exp) {
          // Restore the session so subsequent isLoggedIn() calls are fast
          const userId = payload.id || payload.userId || ('cloud_' + email);
          localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify({
            userId,
            createdAt: Date.now(),
            expiry: payload.exp * 1000
          }));
          return true;
        }
      } catch {
        // JWT malformed — clear it
        localStorage.removeItem('cbt_auth_token');
      }
    }
    return false;
  },

  getCurrentUser() {
    if (!this.isLoggedIn()) return null;
    try {
      const session = JSON.parse(localStorage.getItem(AUTH_KEYS.SESSION));
      const users = this._getUsers();
      const user = users.find(u => u.id === session.userId);
      if (user) return user;

      // Fallback: construct user from stored profile and email if available
      const savedProfile = JSON.parse(localStorage.getItem("jamb_waec_user_profile") || "null");
      if (savedProfile) {
        return {
          id: session.userId,
          name: savedProfile.name || localStorage.getItem('cbt_user_name') || 'Candidate',
          email: localStorage.getItem('cbt_user_email') || '',
          department: savedProfile.department || 'Science',
          targetJambScore: savedProfile.targetJambScore || 280,
          targetInstitution: savedProfile.targetInstitution || 'University of Lagos (UNILAG)',
          preferredCourse: savedProfile.preferredCourse || 'Computer Science',
          streakDays: savedProfile.streakDays || 1
        };
      }
      return null;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(AUTH_KEYS.SESSION);
    localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
    localStorage.removeItem('cbt_auth_token');
    localStorage.removeItem('cbt_user_email');
    localStorage.removeItem('cbt_user_name');
  },

  // ─── User Database ───────────────────────────────────────────────
  _getUsers() {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEYS.USERS_DB)) || [];
    } catch {
      return [];
    }
  },

  _saveUsers(users) {
    localStorage.setItem(AUTH_KEYS.USERS_DB, JSON.stringify(users));
  },

  _createSession(userId) {
    const session = {
      userId,
      createdAt: Date.now(),
      expiry: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
    };
    localStorage.setItem(AUTH_KEYS.SESSION, JSON.stringify(session));
  },

  // ─── Auth Actions ─────────────────────────────────────────────────
  signup({ name, email, password, department, targetScore, targetInstitution, preferredCourse }) {
    const users = this._getUsers();

    // Check email exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters." };
    }

    const newUser = {
      id: "user_" + Date.now() + Math.random().toString(36).slice(2, 7),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: this._hashPassword(password), // simple obfuscation for client-side
      department: department || "Science",
      targetJambScore: parseInt(targetScore) || 280,
      targetInstitution: targetInstitution || "University of Lagos (UNILAG)",
      preferredCourse: preferredCourse || "Medicine",
      streakDays: 0,
      lastStudyDate: null,
      totalTimeMinutes: 0,
      joinedAt: new Date().toISOString()
    };

    users.push(newUser);
    this._saveUsers(users);
    this._createSession(newUser.id);

    // Sync with Storage profile
    this._syncProfileToStorage(newUser);

    return { success: true, user: newUser };
  },

  login({ email, password }) {
    const users = this._getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!user) {
      return { success: false, error: "No account found with this email address." };
    }

    if (user.password !== this._hashPassword(password)) {
      return { success: false, error: "Incorrect password. Please try again." };
    }

    this._createSession(user.id);
    this._syncProfileToStorage(user);

    return { success: true, user };
  },

  // Simple reversible obfuscation (client-side only — not cryptographic)
  _hashPassword(pwd) {
    return btoa(unescape(encodeURIComponent(pwd + "_cbtmaster_salt")));
  },

  _syncProfileToStorage(user) {
    const profileData = {
      name: user.name,
      department: user.department,
      targetJambScore: user.targetJambScore,
      targetInstitution: user.targetInstitution,
      preferredCourse: user.preferredCourse,
      streakDays: user.streakDays || 0,
      totalTimeMinutes: user.totalTimeMinutes || 0,
      lastStudyDate: user.lastStudyDate
    };
    localStorage.setItem("jamb_waec_user_profile", JSON.stringify(profileData));
  },

  // Update user profile across both stores
  updateCurrentUserProfile(updates) {
    const session = JSON.parse(localStorage.getItem(AUTH_KEYS.SESSION) || "{}");
    if (!session.userId) return;

    const users = this._getUsers();
    const idx = users.findIndex(u => u.id === session.userId);
    if (idx === -1) return;

    users[idx] = { ...users[idx], ...updates };
    this._saveUsers(users);
    this._syncProfileToStorage(users[idx]);
  },

  // Synchronize a cloud-authenticated user into local offline cache
  syncUserFromCloud(userData, userId) {
    if (!userData) return;
    const users = this._getUsers();
    const email = (userData.email || '').trim().toLowerCase();
    const id = userId || userData.id || userData._id || ('user_' + Date.now());
    const existingIdx = users.findIndex(u => (email && u.email && u.email.toLowerCase() === email) || u.id === id);

    const record = {
      id,
      name: userData.name || 'Candidate',
      email,
      department: userData.department || 'Science',
      targetJambScore: userData.targetJambScore || 280,
      targetInstitution: userData.targetInstitution || 'University of Lagos (UNILAG)',
      preferredCourse: userData.preferredCourse || 'Computer Science',
      streakDays: userData.streakDays || 1,
      lastStudyDate: userData.lastStudyDate || null,
      totalTimeMinutes: userData.totalTimeMinutes || 0,
      joinedAt: userData.createdAt || new Date().toISOString()
    };

    if (existingIdx !== -1) {
      users[existingIdx] = { ...users[existingIdx], ...record };
    } else {
      users.push(record);
    }
    this._saveUsers(users);
  }
};
