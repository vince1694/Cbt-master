/**
 * CBT Master — API Service & Backend Connector
 * Provides unified data access with graceful offline / local fallback.
 * When the Express + MongoDB server is connected, it syncs results to the cloud,
 * sends transactional emails, and fetches the national student leaderboard.
 */
import { Storage } from './storage.js';

const API_BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000/api'
  : '/api';

export const Api = {
  isOnline: false,

  /** Returns the base API URL — used by auth-view.js and other modules */
  _base() {
    return API_BASE;
  },

  /** Attach JWT token to fetch headers if available */
  _authHeaders() {
    const token = localStorage.getItem('cbt_auth_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },

  /**
   * Handle 401 Unauthorized — token expired or invalid.
   * Clears auth state and reloads to show login screen.
   */
  _handle401() {
    console.warn('[API] Token expired or invalid. Clearing session.');
    localStorage.removeItem('cbt_auth_token');
    localStorage.removeItem('cbt_user_email');
    // Fire a custom event so app.js can redirect to login
    window.dispatchEvent(new CustomEvent('cbt:session-expired'));
  },

  /**
   * Check if backend API server is reachable.
   */
  async checkServerHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(6000) // 6s timeout allows serverless functions to warm up
      });
      if (res.ok) {
        this.isOnline = true;
        return true;
      }
    } catch {
      this.isOnline = false;
    }
    return false;
  },

  /**
   * Register user (Cloud + local fallback).
   */
  async register(userData) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        if (res.status === 401) { this._handle401(); return { success: false, error: 'Session error.' }; }
        if (res.ok) {
          const data = await res.json();
          if (data.token) localStorage.setItem('cbt_auth_token', data.token);
          return data;
        }
        const err = await res.json();
        return { success: false, error: err.error || 'Registration failed.' };
      } catch (e) {
        console.warn('[API] Server registration failed, falling back to local storage.');
      }
    }
    return { success: true, user: userData, mode: 'local' };
  },

  /**
   * Login user (Cloud + local fallback).
   */
  async login(credentials) {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        if (res.status === 401) {
          const err = await res.json();
          return { success: false, error: err.error || 'Invalid email or password.' };
        }
        if (res.ok) {
          const data = await res.json();
          if (data.token) localStorage.setItem('cbt_auth_token', data.token);
          return data;
        }
      } catch (e) {
        console.warn('[API] Server login failed, falling back to local storage.');
      }
    }
    return { success: true, mode: 'local' };
  },

  /**
   * Save test result.
   * Persists locally first, then syncs to cloud + triggers result email.
   */
  async saveResult(testResult) {
    // Always persist locally first (guaranteed)
    const localEntry = Storage.saveTestResult(testResult);

    if (this.isOnline) {
      try {
        const token = localStorage.getItem('cbt_auth_token');
        const email = localStorage.getItem('cbt_user_email');

        const res = await fetch(`${API_BASE}/results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...this._authHeaders()
          },
          body: JSON.stringify({
            ...testResult,
            // Pass email so the server can trigger the result summary email
            candidateEmail: email || null,
            weakSubjects: testResult.weakSubjects || []
          })
        });

        if (res.status === 401) {
          this._handle401();
        }
      } catch (e) {
        console.warn('[API] Cloud result backup failed; local backup secure.');
      }
    }

    return localEntry;
  },

  /**
   * Request a password reset email.
   */
  async forgotPassword(email) {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      return { success: res.ok, message: data.message, error: data.error };
    } catch {
      return { success: false, error: 'No connection to server.' };
    }
  },

  /**
   * Fetch national UTME candidate leaderboard.
   * Returns live MongoDB data if server is online, otherwise returns a
   * curated offline leaderboard of sample Nigerian scholars.
   */
  async getLeaderboard() {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE}/leaderboard`, {
          headers: this._authHeaders()
        });
        if (res.status === 401) { this._handle401(); }
        if (res.ok) {
          const data = await res.json();
          // Normalize live data shape to match UI expectations
          return data.map((r, i) => ({
            rank: r.rank || i + 1,
            name: r.name || 'Anonymous',
            state: r.state || 'Nigeria',
            targetCourse: r.examTitle || r.department || 'General',
            institution: r.department || '—',
            projectedScore: r.scaledJambScore || Math.round((r.percentage / 100) * 400),
            score: r.score,
            total: r.total,
            percentage: r.percentage,
            examType: r.examType,
            date: r.date
          }));
        }
      } catch {}
    }

    // Offline / before first result — curated Nigerian scholars sample
    return [
      { rank: 1, name: 'Chinedu Eze', state: 'Anambra', targetCourse: 'Medicine & Surgery', institution: 'UI', projectedScore: 348 },
      { rank: 2, name: 'Amina Bello', state: 'Kano', targetCourse: 'Computer Science', institution: 'ABU', projectedScore: 335 },
      { rank: 3, name: 'Oluwaseun Adeleke', state: 'Osun', targetCourse: 'Law (LL.B)', institution: 'UNILAG', projectedScore: 326 },
      { rank: 4, name: 'Blessing Okon', state: 'Akwa Ibom', targetCourse: 'Pharmacy', institution: 'UNN', projectedScore: 318 },
      { rank: 5, name: 'Favour Adeyemi', state: 'Oyo', targetCourse: 'Accounting', institution: 'OAU', projectedScore: 312 },
      { rank: 6, name: 'Emeka Nwosu', state: 'Enugu', targetCourse: 'Mechanical Eng.', institution: 'UNIBEN', projectedScore: 305 }
    ];
  }
};
