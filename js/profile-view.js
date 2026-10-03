/**
 * Profile View — Edit profile, change password, view stats summary, sign out.
 * Fetches fresh data from the backend if online; saves to local storage immediately.
 */
import { Storage } from './storage.js';
import { Auth } from './auth.js';
import { Api } from './api.js';

export const ProfileView = {

  render(container, { onBack, onLogout }) {
    const profile = Storage.getUserProfile();
    const analytics = Storage.getAnalytics();
    const history = Storage.getTestHistory();
    const isCloud = !!localStorage.getItem('cbt_auth_token');

    const avgScore = analytics.averagePercentage || 0;
    const totalTests = history.length || 0;
    const bestScore = history.reduce((best, t) => Math.max(best, t.percentage || 0), 0);
    const totalHours = Math.round((analytics.totalTimeMinutes || 0) / 60 * 10) / 10;

    container.innerHTML = `
      <div class="profile-page-wrapper">
        <!-- Top bar -->
        <div class="profile-topbar">
          <button class="btn-ghost" id="profile-back-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Dashboard
          </button>
          <button class="btn-danger-outline" id="profile-logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>

        <div class="profile-page-grid">
          <!-- Left: Avatar + Stats -->
          <div class="profile-sidebar">
            <div class="profile-avatar-card">
              <div class="profile-avatar-ring" id="profile-avatar-display">
                <span>${profile.name ? profile.name.charAt(0).toUpperCase() : '?'}</span>
              </div>
              <h2 class="profile-display-name">${profile.name || 'Student'}</h2>
              <p class="profile-display-email">${profile.email || ''}</p>
              <div class="profile-verification-badge ${isCloud ? 'verified' : 'local'}">
                ${isCloud
                  ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Verified Account'
                  : '⚡ Local Account'}
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="profile-stats-card">
              <h3 class="profile-section-title">Your Stats</h3>
              <div class="profile-stat-row">
                <span class="pstat-label">Total Tests</span>
                <span class="pstat-val">${totalTests}</span>
              </div>
              <div class="profile-stat-row">
                <span class="pstat-label">Avg Score</span>
                <span class="pstat-val">${avgScore.toFixed(1)}%</span>
              </div>
              <div class="profile-stat-row">
                <span class="pstat-label">Best Score</span>
                <span class="pstat-val">${bestScore.toFixed(1)}%</span>
              </div>
              <div class="profile-stat-row">
                <span class="pstat-label">Study Hours</span>
                <span class="pstat-val">${totalHours}h</span>
              </div>
              <div class="profile-stat-row">
                <span class="pstat-label">Day Streak</span>
                <span class="pstat-val">🔥 ${profile.streakDays || 0}</span>
              </div>
            </div>
          </div>

          <!-- Right: Edit Form -->
          <div class="profile-main">
            <div class="profile-edit-card">
              <h3 class="profile-section-title">Edit Profile</h3>
              <div id="profile-save-msg" class="profile-save-msg hidden"></div>

              <form id="profile-edit-form" class="profile-form" novalidate>
                <div class="profile-fields-row">
                  <div class="profile-field-group">
                    <label for="pf-name">Full Name</label>
                    <input type="text" id="pf-name" class="profile-input" value="${profile.name || ''}" placeholder="Your full name">
                  </div>
                  <div class="profile-field-group">
                    <label for="pf-dept">Department</label>
                    <select id="pf-dept" class="profile-input profile-select">
                      <option value="Science" ${profile.department === 'Science' ? 'selected' : ''}>🔬 Science</option>
                      <option value="Arts" ${profile.department === 'Arts' ? 'selected' : ''}>🎭 Arts</option>
                      <option value="Commercial" ${profile.department === 'Commercial' ? 'selected' : ''}>💼 Commercial</option>
                    </select>
                  </div>
                </div>

                <div class="profile-fields-row">
                  <div class="profile-field-group">
                    <label for="pf-target">Target JAMB Score</label>
                    <input type="number" id="pf-target" class="profile-input" value="${profile.targetJambScore || 280}" min="100" max="400" placeholder="e.g. 300">
                  </div>
                  <div class="profile-field-group">
                    <label for="pf-institution">Target Institution</label>
                    <input type="text" id="pf-institution" class="profile-input" value="${profile.targetInstitution || ''}" placeholder="e.g. University of Lagos">
                  </div>
                </div>

                <div class="profile-field-group">
                  <label for="pf-course">Preferred Course</label>
                  <input type="text" id="pf-course" class="profile-input" value="${profile.preferredCourse || ''}" placeholder="e.g. Medicine & Surgery">
                </div>

                <button type="submit" class="profile-save-btn" id="profile-save-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                  </svg>
                  Save Changes
                </button>
              </form>
            </div>

            <!-- Change Password -->
            <div class="profile-edit-card" style="margin-top:16px;">
              <h3 class="profile-section-title">Change Password</h3>
              <div id="pw-change-msg" class="profile-save-msg hidden"></div>
              ${isCloud ? `
              <form id="pw-change-form" class="profile-form" novalidate>
                <div class="profile-fields-row">
                  <div class="profile-field-group">
                    <label for="pf-pw-current">Current Password</label>
                    <input type="password" id="pf-pw-current" class="profile-input" placeholder="••••••••">
                  </div>
                  <div class="profile-field-group">
                    <label for="pf-pw-new">New Password</label>
                    <input type="password" id="pf-pw-new" class="profile-input" placeholder="Min. 6 characters">
                  </div>
                </div>
                <button type="submit" class="profile-save-btn" id="pw-change-btn">Update Password</button>
              </form>
              ` : `<p style="color:rgba(255,255,255,0.4);font-size:0.875rem;">Password changes are only available on cloud accounts. Create a free account to enable this.</p>`}
            </div>
          </div>
        </div>
      </div>
    `;

    this._bindEvents(profile, onBack, onLogout);
  },

  _bindEvents(profile, onBack, onLogout) {
    document.getElementById('profile-back-btn')?.addEventListener('click', onBack);

    document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
      if (confirm('Sign out of CBT Master?')) {
        Auth.logout();
        onLogout();
      }
    });

    // Profile edit form
    document.getElementById('profile-edit-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('profile-save-btn');
      const msg = document.getElementById('profile-save-msg');
      const updated = {
        name: document.getElementById('pf-name').value.trim(),
        department: document.getElementById('pf-dept').value,
        targetJambScore: parseInt(document.getElementById('pf-target').value) || 280,
        targetInstitution: document.getElementById('pf-institution').value.trim(),
        preferredCourse: document.getElementById('pf-course').value.trim()
      };

      if (!updated.name) {
        this._showMsg('profile-save-msg', 'Name cannot be empty.', false);
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Saving…';

      // Save locally always
      Storage.updateUserProfile(updated);

      // Update avatar initial
      const avatarEl = document.getElementById('profile-avatar-display');
      if (avatarEl) avatarEl.querySelector('span').textContent = updated.name.charAt(0).toUpperCase();

      // Sync to cloud if online
      if (Api.isOnline) {
        try {
          await fetch(`${Api._base()}/auth/profile`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', ...Api._authHeaders() },
            body: JSON.stringify(updated)
          });
        } catch { /* local save is the fallback */ }
      }

      btn.disabled = false;
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save Changes`;
      this._showMsg('profile-save-msg', '✅ Profile updated successfully!', true);
    });

    // Password change form
    document.getElementById('pw-change-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const currentPw = document.getElementById('pf-pw-current')?.value;
      const newPw = document.getElementById('pf-pw-new')?.value;
      const btn = document.getElementById('pw-change-btn');

      if (!currentPw || !newPw) return this._showMsg('pw-change-msg', 'Please fill in both fields.', false);
      if (newPw.length < 6) return this._showMsg('pw-change-msg', 'New password must be at least 6 characters.', false);

      btn.disabled = true;
      btn.textContent = 'Updating…';

      try {
        const res = await fetch(`${Api._base()}/auth/change-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...Api._authHeaders() },
          body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw })
        });
        const data = await res.json();
        if (res.ok) {
          this._showMsg('pw-change-msg', '✅ Password changed successfully!', true);
          document.getElementById('pf-pw-current').value = '';
          document.getElementById('pf-pw-new').value = '';
        } else {
          this._showMsg('pw-change-msg', data.error || 'Password update failed.', false);
        }
      } catch {
        this._showMsg('pw-change-msg', 'Connection error. Try again.', false);
      }

      btn.disabled = false;
      btn.textContent = 'Update Password';
    });
  },

  _showMsg(id, text, success) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = `profile-save-msg ${success ? 'profile-msg-success' : 'profile-msg-error'}`;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 4000);
  }
};
