/**
 * React Client API Connector for Express + MongoDB
 */

const API_BASE = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:5000/api'
  : '/api';

export const getApiBase = () => API_BASE;

export const authStorage = {
  getToken: () => localStorage.getItem('cbt_auth_token'),
  setToken: (token) => localStorage.setItem('cbt_auth_token', token),
  removeToken: () => localStorage.removeItem('cbt_auth_token'),

  getUserEmail: () => localStorage.getItem('cbt_user_email'),
  setUserEmail: (email) => localStorage.setItem('cbt_user_email', email),

  getUserName: () => localStorage.getItem('cbt_user_name'),
  setUserName: (name) => localStorage.setItem('cbt_user_name', name),

  getSession: () => {
    try {
      const sess = localStorage.getItem('cbtmaster_session');
      if (!sess) return null;
      const parsed = JSON.parse(sess);
      if (parsed.expiry && Date.now() > parsed.expiry) {
        authStorage.clearAll();
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  },

  setSession: (userId, expiryDays = 30) => {
    const session = {
      userId,
      createdAt: Date.now(),
      expiry: Date.now() + (expiryDays * 24 * 60 * 60 * 1000)
    };
    localStorage.setItem('cbtmaster_session', JSON.stringify(session));
  },

  getProfile: () => {
    try {
      return JSON.parse(localStorage.getItem('jamb_waec_user_profile') || 'null');
    } catch {
      return null;
    }
  },

  setProfile: (profile) => {
    localStorage.setItem('jamb_waec_user_profile', JSON.stringify(profile));
  },

  clearAll: () => {
    const keys = [
      'cbtmaster_session',
      'cbtmaster_current_user',
      'cbt_auth_token',
      'cbt_user_email',
      'cbt_user_name',
      'jamb_waec_user_profile'
    ];
    keys.forEach(k => localStorage.removeItem(k));
    Object.keys(localStorage)
      .filter(k => k.startsWith('cbt_') || k.startsWith('cbtmaster_'))
      .forEach(k => localStorage.removeItem(k));
    try { sessionStorage.clear(); } catch {}
  }
};

/**
 * Check backend connection
 */
export async function checkServerHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(6000) });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Login with cold-start auto-retry
 */
export async function loginCandidate(email, password, onColdStartHint) {
  const MAX_RETRIES = 3;
  const PER_TRY_TIMEOUT = 18000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt === 1 && onColdStartHint) {
        setTimeout(() => onColdStartHint('⏳ Server is waking up — this takes ~30s on first visit...'), 4500);
      } else if (attempt > 1 && onColdStartHint) {
        onColdStartHint(`🔄 Reconnecting... (Attempt ${attempt} of ${MAX_RETRIES})`);
      }

      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
        signal: AbortSignal.timeout(PER_TRY_TIMEOUT)
      });

      const data = await res.json().catch(() => ({}));

      // Unverified account needing OTP
      if (res.status === 403 && data.requiresOtp) {
        return {
          success: false,
          requiresOtp: true,
          email: data.email || email,
          name: data.name || '',
          error: data.error || 'Please verify your 6-digit OTP code sent to your email.'
        };
      }

      if (res.ok && data.token) {
        authStorage.setToken(data.token);
        authStorage.setUserEmail(email.trim().toLowerCase());
        if (data.user?.name) authStorage.setUserName(data.user.name);
        
        const userId = data.user?.id || data.user?._id || ('user_' + Date.now());
        authStorage.setSession(userId);

        if (data.user) {
          const profile = {
            name: data.user.name || email.split('@')[0],
            email: data.user.email || email.trim().toLowerCase(),
            department: data.user.department || 'Science',
            targetJambScore: data.user.targetJambScore || 280,
            targetInstitution: data.user.targetInstitution || 'University of Lagos (UNILAG)',
            preferredCourse: data.user.preferredCourse || 'Computer Science',
            streakDays: data.user.streakDays || 1
          };
          authStorage.setProfile(profile);

          if (data.user.isPremium) {
            localStorage.setItem('cbtmaster_premium', JSON.stringify({
              isPremium: true,
              reference: data.user.premiumReference || 'cloud_synced',
              unlockedAt: new Date().toISOString()
            }));
          }
        }

        return { success: true, user: data.user, token: data.token };
      }

      return {
        success: false,
        error: data.error || 'Incorrect email or password. Please try again.'
      };

    } catch (err) {
      if (attempt === MAX_RETRIES) {
        return {
          success: false,
          error: 'Connection timeout. Please check your internet or retry in a few seconds.'
        };
      }
      await new Promise(r => setTimeout(r, 4000));
    }
  }

  return { success: false, error: 'Could not connect to server.' };
}

/**
 * Register candidate
 */
export async function registerCandidate(formData) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        department: formData.department || 'Science',
        targetScore: parseInt(formData.targetScore) || 280,
        targetInstitution: formData.targetInstitution || 'University of Lagos (UNILAG)',
        preferredCourse: formData.preferredCourse || 'Computer Science'
      }),
      signal: AbortSignal.timeout(25000)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      return {
        success: true,
        requiresOtp: !!data.requiresOtp,
        email: formData.email.trim().toLowerCase(),
        name: formData.name.trim(),
        message: data.message || 'Verification code sent to your email.'
      };
    }

    return {
      success: false,
      error: data.error || 'Registration failed. Please try again.'
    };
  } catch (err) {
    return {
      success: false,
      error: 'Network error. Please check your connection and retry.'
    };
  }
}

/**
 * Verify OTP
 */
export async function verifyOtp(email, otp) {
  try {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase(), otp: otp.trim() }),
      signal: AbortSignal.timeout(20000)
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.token) {
      authStorage.setToken(data.token);
      authStorage.setUserEmail(email.trim().toLowerCase());
      if (data.user?.name) authStorage.setUserName(data.user.name);

      const userId = data.user?.id || data.user?._id || ('user_' + Date.now());
      authStorage.setSession(userId);

      if (data.user) {
        authStorage.setProfile({
          name: data.user.name || email.split('@')[0],
          email: data.user.email || email.trim().toLowerCase(),
          department: data.user.department || 'Science',
          targetJambScore: data.user.targetJambScore || 280,
          targetInstitution: data.user.targetInstitution || 'University of Lagos (UNILAG)',
          preferredCourse: data.user.preferredCourse || 'Computer Science',
          streakDays: data.user.streakDays || 1
        });
      }

      return { success: true, user: data.user, token: data.token };
    }

    return {
      success: false,
      error: data.error || 'Invalid or expired OTP code.'
    };
  } catch {
    return { success: false, error: 'Network connection failed.' };
  }
}

/**
 * Resend OTP
 */
export async function resendOtp(email) {
  try {
    const res = await fetch(`${API_BASE}/auth/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
      signal: AbortSignal.timeout(15000)
    });
    const data = await res.json().catch(() => ({}));
    return { success: res.ok, message: data.message, error: data.error };
  } catch {
    return { success: false, error: 'Failed to contact server.' };
  }
}

/**
 * Forgot Password
 */
export async function requestPasswordReset(email) {
  try {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
      signal: AbortSignal.timeout(15000)
    });
    const data = await res.json().catch(() => ({}));
    return { success: res.ok, message: data.message, error: data.error };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}

/**
 * Reset Password
 */
export async function completePasswordReset(email, otp, newPassword) {
  try {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword
      }),
      signal: AbortSignal.timeout(15000)
    });
    const data = await res.json().catch(() => ({}));
    return { success: res.ok, message: data.message, error: data.error };
  } catch {
    return { success: false, error: 'Server error during password reset.' };
  }
}

/**
 * Fetch Leaderboard
 */
export async function fetchLeaderboard() {
  try {
    const token = authStorage.getToken();
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const res = await fetch(`${API_BASE}/leaderboard`, { headers, signal: AbortSignal.timeout(10000) });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return [];
}
