/**
 * Auth View - Login & Signup Page Renderer
 * Beautiful, modern auth UI with smooth transitions and form validation
 */
import { Auth } from './auth.js';
import { Api } from './api.js';

export const AuthView = {

  render(containerId, onAuthSuccess) {
    this._containerId = containerId;
    this._onAuthSuccess = onAuthSuccess;
    const container = document.getElementById(containerId) || document.body;
    this._showLogin(container, onAuthSuccess);

    // Auto-open reset password modal if URL contains reset parameters
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const resetToken = urlParams.get('resetToken') || urlParams.get('token');
      const resetOtp = urlParams.get('resetOtp') || urlParams.get('code');
      const resetEmail = urlParams.get('email') || '';
      if (resetToken || resetOtp || urlParams.has('reset')) {
        setTimeout(() => {
          this._showForgotPasswordModal({ email: resetEmail, otp: resetOtp || '', token: resetToken || '' });
        }, 350);
      }
    } catch {}
  },

  _showLogin(container, onAuthSuccess) {
    document.documentElement.setAttribute("data-auth-page", "true");
    container.innerHTML = `
      <div class="auth-page" id="auth-page-root">
        <!-- Left Panel -->
        <div class="auth-hero-panel">
          <div class="auth-hero-content">
            <div class="auth-logo-mark">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <h2 class="auth-hero-title">Nigeria's #1 CBT Practice Platform</h2>
            <p class="auth-hero-desc">
              Prepare smarter with vetted JAMB UTME & WAEC WASSCE past questions,
              real-time analytics, and authentic exam simulations.
            </p>
            <div class="auth-features-list">
              <div class="auth-feature-item">
                <span class="feat-icon">✓</span>
                <span>Authentic past questions — Science, Arts & Commercial</span>
              </div>
              <div class="auth-feature-item">
                <span class="feat-icon">✓</span>
                <span>Real JAMB CBT simulation with 8-key shortcuts</span>
              </div>
              <div class="auth-feature-item">
                <span class="feat-icon">✓</span>
                <span>Step-by-step explanations for every question</span>
              </div>
              <div class="auth-feature-item">
                <span class="feat-icon">✓</span>
                <span>Personal dashboard with score analytics & streaks</span>
              </div>
            </div>
            <div class="auth-hero-stats">
              <div class="hero-stat">
                <span class="hero-stat-num">500+</span>
                <span class="hero-stat-label">Vetted Questions</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-num">3</span>
                <span class="hero-stat-label">Departments</span>
              </div>
              <div class="hero-stat">
                <span class="hero-stat-num">JAMB + WAEC</span>
                <span class="hero-stat-label">Both Exams</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Form -->
        <div class="auth-form-panel">
          <div class="auth-form-card" id="auth-form-card">

            <!-- Login Form -->
            <div class="auth-form-section" id="login-section">
              <div class="auth-form-header">
                <h1 class="auth-form-title">Welcome Back</h1>
                <p class="auth-form-sub">Sign in to continue your preparation journey</p>
              </div>

              <div id="login-error-box" class="auth-error-box hidden"></div>
              <div id="login-success-box" class="auth-success-box hidden" style="background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.35);color:#10b981;border-radius:10px;padding:12px 16px;font-size:0.9rem;font-weight:600;margin-bottom:1.25rem;text-align:center;line-height:1.5;"></div>

              <form id="login-form" class="auth-form" novalidate>
                <div class="auth-field-group">
                  <label for="login-email">Email Address</label>
                  <div class="auth-input-wrap">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input type="email" id="login-email" class="auth-input" placeholder="yourname@example.com" autocomplete="email" required>
                  </div>
                </div>

                <div class="auth-field-group">
                  <div class="field-label-row">
                    <label for="login-password">Password</label>
                    <button type="button" class="forgot-link" id="forgot-pw-btn">Forgot password?</button>
                  </div>
                  <div class="auth-input-wrap">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input type="password" id="login-password" class="auth-input" placeholder="Enter your password" autocomplete="current-password" required>
                    <button type="button" class="toggle-pw-btn" data-target="login-password" aria-label="Toggle password visibility">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="submit" class="auth-submit-btn" id="login-submit-btn">
                  <span class="btn-text">Sign In</span>
                  <span class="btn-spinner hidden">
                    <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </span>
                </button>
              </form>

              <p class="auth-switch-text" style="margin-top: 1.25rem;">
                Don't have an account?
                <button class="auth-switch-link" id="go-signup-btn">Create one free</button>
              </p>
            </div>

            <!-- Signup Form -->
            <div class="auth-form-section hidden" id="signup-section">
              <div class="auth-form-header">
                <h1 class="auth-form-title">Create Account</h1>
                <p class="auth-form-sub">Start your free JAMB & WAEC preparation today</p>
              </div>

              <div id="signup-error-box" class="auth-error-box hidden"></div>

              <form id="signup-form" class="auth-form" novalidate>
                <div class="auth-fields-row">
                  <div class="auth-field-group">
                    <label for="signup-name">Full Name</label>
                    <div class="auth-input-wrap">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <input type="text" id="signup-name" class="auth-input" placeholder="E.g. Emeka Okafor" autocomplete="name" required>
                    </div>
                  </div>
                  <div class="auth-field-group">
                    <label for="signup-dept">Department</label>
                    <div class="auth-input-wrap">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <select id="signup-dept" class="auth-input auth-select">
                        <option value="Science">🔬 Science</option>
                        <option value="Arts">🎭 Arts</option>
                        <option value="Commercial">💼 Commercial</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="auth-field-group">
                  <label for="signup-email">Email Address</label>
                  <div class="auth-input-wrap">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <input type="email" id="signup-email" class="auth-input" placeholder="yourname@example.com" autocomplete="email" required>
                  </div>
                </div>

                <div class="auth-fields-row">
                  <div class="auth-field-group">
                    <label for="signup-password">Password</label>
                    <div class="auth-input-wrap">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <input type="password" id="signup-password" class="auth-input" placeholder="Min. 6 characters" autocomplete="new-password" required>
                      <button type="button" class="toggle-pw-btn" data-target="signup-password" aria-label="Toggle password visibility">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="auth-field-group">
                    <label for="signup-target-score">Target JAMB Score</label>
                    <div class="auth-input-wrap">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="6"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                      </svg>
                      <input type="number" id="signup-target-score" class="auth-input" placeholder="250 – 400" min="100" max="400" value="280">
                    </div>
                  </div>
                </div>

                <div class="auth-fields-row">
                  <div class="auth-field-group">
                    <label for="signup-institution">Target University</label>
                    <div class="auth-input-wrap">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <input type="text" id="signup-institution" class="auth-input" placeholder="E.g. University of Lagos" autocomplete="off">
                    </div>
                  </div>
                  <div class="auth-field-group">
                    <label for="signup-course">Preferred Course</label>
                    <div class="auth-input-wrap">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                      <input type="text" id="signup-course" class="auth-input" placeholder="E.g. Medicine, Law, Engineering" autocomplete="off">
                    </div>
                  </div>
                </div>

                <button type="submit" class="auth-submit-btn" id="signup-submit-btn">
                  <span class="btn-text">Create My Account</span>
                  <span class="btn-spinner hidden">
                    <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </span>
                </button>
              </form>

              <p class="auth-switch-text">
                Already have an account?
                <button class="auth-switch-link" id="go-login-btn">Sign in here</button>
              </p>
            </div>

          </div>
        </div>
      </div>
    `;

    this._bindEvents(container, onAuthSuccess);
  },

  _bindEvents(container, onAuthSuccess) {
    // Toggle between login and signup
    const goSignup = document.getElementById("go-signup-btn");
    const goLogin = document.getElementById("go-login-btn");
    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const formCard = document.getElementById("auth-form-card");

    goSignup?.addEventListener("click", () => {
      loginSection.classList.add("hidden");
      signupSection.classList.remove("hidden");
      formCard.classList.add("signup-mode");
    });

    goLogin?.addEventListener("click", () => {
      signupSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
      formCard.classList.remove("signup-mode");
    });

    // Toggle password visibility
    container.querySelectorAll(".toggle-pw-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (!input) return;
        input.type = input.type === "password" ? "text" : "password";
      });
    });

    // Login form submission
    const loginForm = document.getElementById("login-form");
    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleLogin(onAuthSuccess);
    });

    // Signup form submission
    const signupForm = document.getElementById("signup-form");
    signupForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSignup(onAuthSuccess);
    });

    // Forgot Password — opens animated modal
    const forgotBtn = document.getElementById('forgot-pw-btn');
    forgotBtn?.addEventListener('click', () => this._showForgotPasswordModal());
  },

  _setLoading(btnId, isLoading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const text = btn.querySelector(".btn-text");
    const spinner = btn.querySelector(".btn-spinner");
    btn.disabled = isLoading;
    if (isLoading) {
      text?.classList.add("hidden");
      spinner?.classList.remove("hidden");
    } else {
      text?.classList.remove("hidden");
      spinner?.classList.add("hidden");
    }
  },

  _showError(boxId, message) {
    const box = document.getElementById(boxId);
    if (!box) return;
    box.textContent = message;
    box.classList.remove("hidden");
    box.style.background = "";
    box.style.borderColor = "";
    box.style.color = "";
  },

  _hideError(boxId) {
    document.getElementById(boxId)?.classList.add("hidden");
  },

  async _handleLogin(onAuthSuccess) {
    this._hideError('login-error-box');
    document.getElementById('login-success-box')?.classList.add('hidden');
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!email || !password) {
      this._showError('login-error-box', 'Please enter your email and password.');
      return;
    }

    this._setLoading('login-submit-btn', true);

    const loginBtn = document.getElementById('login-submit-btn');

    // Helper: show / update the warm-up hint below the button
    const _setHint = (msg) => {
      let hint = document.getElementById('login-warmup-hint');
      if (!hint) {
        hint = document.createElement('div');
        hint.id = 'login-warmup-hint';
        hint.style.cssText = [
          'text-align:center',
          'color:rgba(255,255,255,0.65)',
          'font-size:0.82rem',
          'margin-top:10px',
          'line-height:1.5',
          'padding:8px 12px',
          'background:rgba(16,185,129,0.08)',
          'border:1px solid rgba(16,185,129,0.2)',
          'border-radius:8px'
        ].join(';');
        loginBtn?.parentNode?.insertBefore(hint, loginBtn.nextSibling);
      }
      hint.textContent = msg;
    };
    const _cleanupHint = () => {
      document.getElementById('login-warmup-hint')?.remove();
    };

    // Auto-retry up to 3 times — handles Render free-tier cold starts (30-60s wake time)
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 8000;  // 8s between retries
    const PER_TRY_TIMEOUT = 18000; // 18s per attempt

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt === 1) {
          // Show hint after 5s on first attempt
          setTimeout(() => {
            if (document.getElementById('login-submit-btn')?.disabled) {
              _setHint('⏳ Server is waking up — this takes up to 30 seconds on first visit. Please hold on…');
            }
          }, 5000);
        } else {
          _setHint(`🔄 Retrying… (attempt ${attempt} of ${MAX_RETRIES})`);
        }

        const res = await fetch(`${Api._base()}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase(), password }),
          signal: AbortSignal.timeout(PER_TRY_TIMEOUT)
        });
        _cleanupHint();

        const data = await res.json().catch(() => ({}));

        // ✅ Successful login
        if (res.ok && data.token) {
          localStorage.setItem('cbt_auth_token', data.token);
          localStorage.setItem('cbt_user_email', email.toLowerCase());
          if (data.user && data.user.name) {
            localStorage.setItem('cbt_user_name', data.user.name);
          }
          const userId = (data.user && (data.user.id || data.user._id)) || 'cloud_' + Date.now();
          localStorage.setItem('cbtmaster_session', JSON.stringify({
            userId,
            createdAt: Date.now(),
            expiry: Date.now() + (30 * 24 * 60 * 60 * 1000)
          }));
          Auth.syncUserFromCloud(data.user, userId);
          if (data.user) {
            Storage.updateUserProfile({
              name: data.user.name || email.split('@')[0],
              email: data.user.email || email.toLowerCase(),
              department: data.user.department || 'Science',
              targetJambScore: data.user.targetJambScore || 280,
              targetInstitution: data.user.targetInstitution || 'University of Lagos (UNILAG)',
              preferredCourse: data.user.preferredCourse || 'Computer Science'
            });

            // Automatically restore premium access across devices
            if (data.user.isPremium) {
              Storage.setPremium({
                reference: data.user.premiumReference || 'cloud_synced',
                email: email.toLowerCase()
              });
            }
          }
          this._setLoading('login-submit-btn', false);
          this._animateSuccess(() => onAuthSuccess(data.user || { name: data.user?.name || email.split('@')[0], email }));
          return;
        }

        // ❌ Server responded but credentials wrong — no point retrying
        this._setLoading('login-submit-btn', false);
        _cleanupHint();
        if (res.status === 401) {
          // Try offline cache as last resort
          const localResult = Auth.login({ email, password });
          if (localResult.success) {
            this._animateSuccess(() => onAuthSuccess(localResult.user));
            return;
          }
          this._showError('login-error-box', data.error || 'Incorrect email or password. Please check and try again.');
        } else {
          this._showError('login-error-box', data.error || 'Could not sign in. Please try again.');
        }
        return;

      } catch (err) {
        // Timeout or network failure
        const isLastAttempt = attempt === MAX_RETRIES;
        console.warn(`[Auth] Login attempt ${attempt} failed:`, err.message);

        if (!isLastAttempt) {
          // Wait before retrying
          _setHint(`⏳ Server is still starting up… retrying in ${RETRY_DELAY / 1000}s (${attempt}/${MAX_RETRIES})`);
          await new Promise(r => setTimeout(r, RETRY_DELAY));
        } else {
          // All retries exhausted
          _cleanupHint();
          this._setLoading('login-submit-btn', false);

          // Offline cache fallback
          const localResult = Auth.login({ email, password });
          if (localResult.success) {
            this._animateSuccess(() => onAuthSuccess(localResult.user));
            return;
          }

          this._showError(
            'login-error-box',
            '🔄 The server is taking longer than usual to start. Please wait 30 seconds and tap Sign In again.'
          );
        }
      }
    }
  },

  _switchToLoginWithSuccess(email, message) {
    const loginSection = document.getElementById("login-section");
    const signupSection = document.getElementById("signup-section");
    const formCard = document.getElementById("auth-form-card");

    if (signupSection && loginSection) {
      signupSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
      formCard?.classList.remove("signup-mode");
    }

    const emailInput = document.getElementById('login-email');
    if (emailInput && email) {
      emailInput.value = email;
    }

    const pwInput = document.getElementById('login-password');
    if (pwInput) {
      pwInput.value = '';
      setTimeout(() => pwInput.focus(), 250);
    }

    const successBox = document.getElementById('login-success-box');
    if (successBox) {
      successBox.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
          <span style="font-size:1.4rem;">🎉</span>
          <div style="text-align:left;">
            <strong>${message || 'Account created successfully!'}</strong><br>
            <span style="font-size:0.86rem;opacity:0.95;">Please enter your password below to sign in to your dashboard.</span>
          </div>
        </div>
      `;
      successBox.classList.remove('hidden');
    }
  },

  async _handleSignup(onAuthSuccess) {
    this._hideError('signup-error-box');
    const name = document.getElementById('signup-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const password = document.getElementById('signup-password')?.value;
    const department = document.getElementById('signup-dept')?.value || 'Science';
    const targetScore = parseInt(document.getElementById('signup-target-score')?.value, 10) || 280;
    const targetInstitution = document.getElementById('signup-institution')?.value.trim() || 'University of Lagos (UNILAG)';
    const preferredCourse = document.getElementById('signup-course')?.value.trim() || 'Computer Science';

    if (!name || !email || !password) {
      this._showError('signup-error-box', 'Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      this._showError('signup-error-box', 'Password must be at least 6 characters.');
      return;
    }

    this._setLoading('signup-submit-btn', true);

    try {
      const res = await fetch(`${Api._base()}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase(),
          password,
          department,
          targetJambScore: targetScore,
          targetInstitution,
          preferredCourse
        }),
        signal: AbortSignal.timeout(15000)
      });

      const data = await res.json().catch(() => ({}));
      this._setLoading('signup-submit-btn', false);

      if (res.ok) {
        if (data.token) {
          // Direct seamless onboarding: log in immediately
          localStorage.setItem('cbt_auth_token', data.token);
          localStorage.setItem('cbt_user_email', email.toLowerCase());
          localStorage.setItem('cbt_user_name', name);
          const userId = (data.user && (data.user.id || data.user._id)) || 'cloud_' + Date.now();
          localStorage.setItem('cbtmaster_session', JSON.stringify({
            userId,
            createdAt: Date.now(),
            expiry: Date.now() + (30 * 24 * 60 * 60 * 1000)
          }));
          Auth.syncUserFromCloud(data.user, userId);
          Storage.updateUserProfile({
            name,
            email: email.toLowerCase(),
            department,
            targetJambScore: targetScore,
            targetInstitution,
            preferredCourse
          });
          this._animateSuccess(() => onAuthSuccess(data.user || { name, email }));
          return;
        }

        // Fallback for legacy endpoints: switch to login with email prefilled
        this._switchToLoginWithSuccess(
          email.toLowerCase(),
          data.message || 'Account created successfully!'
        );
        return;
      } else if (res.status === 409) {
        this._showError('signup-error-box', 'An account with this email address already exists. Please sign in instead.');
        return;
      } else {
        this._showError('signup-error-box', data.error || 'Registration failed. Please try again.');
        return;
      }

    } catch (err) {
      this._setLoading('signup-submit-btn', false);
      console.error('[Auth] Registration network error:', err);
      const isTimeout = err.name === 'TimeoutError' || err.name === 'AbortError';
      this._showError(
        'signup-error-box',
        isTimeout
          ? '⏱ The server is taking too long to respond. Please try again in a few seconds.'
          : '📶 Could not reach server. Please check your internet connection.'
      );
    }
  },

  _showOtpScreen(email, name, onAuthSuccess) {
    const formCard = document.getElementById('auth-form-card');
    if (!formCard) return;

    formCard.innerHTML = `
      <div class="auth-form-section" id="otp-section">
        <div class="auth-form-header" style="text-align:center;">
          <div style="font-size:2.5rem;margin-bottom:8px;">&#9993;&#65039;</div>
          <h1 class="auth-form-title">Check Your Email</h1>
          <p class="auth-form-sub">
            We sent a 6-digit verification code to<br>
            <strong style="color:var(--jamb-emerald);font-size:1.02rem;">${email}</strong>
          </p>
        </div>
        <div class="otp-help-tip">
          <span style="font-size:1.15rem;line-height:1;">💡</span>
          <span><strong>Cannot find the email?</strong> Check your <strong>Spam</strong>, <strong>Junk</strong>, or <strong>Promotions</strong> folder. On phones, Gmail often routes automated codes there.</span>
        </div>
        <div id="otp-error-box" class="auth-error-box hidden"></div>
        <div id="otp-success-msg" class="otp-success-msg hidden">&#10003; Email verified! Signing you in&#8230;</div>
        <div class="otp-boxes-row" id="otp-boxes-row">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" data-idx="0" id="otp-box-0" autocomplete="one-time-code">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" data-idx="1" id="otp-box-1">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" data-idx="2" id="otp-box-2">
          <span class="otp-dash">&#8212;</span>
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" data-idx="3" id="otp-box-3">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" data-idx="4" id="otp-box-4">
          <input class="otp-box" type="text" inputmode="numeric" maxlength="1" data-idx="5" id="otp-box-5">
        </div>
        <button class="auth-submit-btn" id="otp-submit-btn" disabled>
          <span class="btn-text">Verify Email</span>
          <span class="btn-spinner hidden">
            <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </span>
        </button>
        <div class="otp-resend-row">
          <span class="otp-resend-prompt">Didn't get it?</span>
          <button class="otp-resend-btn" id="otp-resend-btn" disabled>
            Resend code (<span id="otp-countdown">60</span>s)
          </button>
        </div>
        <button class="auth-switch-link" id="otp-back-btn" style="margin-top:8px;display:block;width:100%;text-align:center;">
          &#8592; Back to Sign Up
        </button>
      </div>
    `;

    const boxes = Array.from(document.querySelectorAll('.otp-box'));
    const submitBtn = document.getElementById('otp-submit-btn');
    const errBox = document.getElementById('otp-error-box');
    const getOtp = () => boxes.map(b => b.value).join('');
    const checkComplete = () => { submitBtn.disabled = getOtp().length < 6; };

    // Auto-advance + digit-only input
    boxes.forEach((box, i) => {
      box.addEventListener('input', () => {
        box.value = box.value.replace(/\D/g, '').slice(-1);
        if (box.value && i < 5) boxes[i + 1].focus();
        checkComplete();
      });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && i > 0) {
          boxes[i - 1].value = '';
          boxes[i - 1].focus();
          checkComplete();
        }
      });
    });

    // Paste all 6 digits at once
    boxes[0].addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
      pasted.split('').forEach((ch, idx) => { if (boxes[idx]) boxes[idx].value = ch; });
      boxes[Math.min(pasted.length, 5)].focus();
      checkComplete();
    });

    setTimeout(() => boxes[0].focus(), 100);

    // Submit OTP
    const doVerify = async () => {
      const otp = getOtp();
      if (otp.length < 6) return;
      errBox.classList.add('hidden');
      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').classList.add('hidden');
      submitBtn.querySelector('.btn-spinner').classList.remove('hidden');

      try {
        const res = await fetch(`${Api._base()}/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp })
        });
        const data = await res.json();
        if (res.ok) {
          // Account is now verified on the server.
          // DON'T auto-login — force user to enter password on the login page.
          // Clear any stale session state to ensure Auth.isLoggedIn() returns false.
          localStorage.removeItem('cbt_auth_token');
          localStorage.removeItem('cbt_user_email');
          localStorage.removeItem('cbt_user_name');
          localStorage.removeItem('cbtmaster_session');
          localStorage.removeItem('cbtmaster_current_user');

          const successMsg = document.getElementById('otp-success-msg');
          if (successMsg) {
            successMsg.textContent = '✓ Email verified! Redirecting to Sign In…';
            successMsg.classList.remove('hidden');
          }
          boxes.forEach(b => { b.disabled = true; b.style.borderColor = 'rgba(0,200,150,0.6)'; });

          // Redirect to login page after a short delay
          setTimeout(() => {
            // Re-render auth page (clean state, no session)
            this.render(this._containerId, onAuthSuccess);

            // Ensure login section is visible, not signup
            const loginSection = document.getElementById("login-section");
            const signupSection = document.getElementById("signup-section");
            const formCard = document.getElementById("auth-form-card");
            if (loginSection && signupSection) {
              signupSection.classList.add("hidden");
              loginSection.classList.remove("hidden");
              formCard?.classList.remove("signup-mode");
            }

            // Pre-fill the verified email
            const emailInput = document.getElementById('login-email');
            if (emailInput) emailInput.value = email;

            // Show success banner
            const successBox = document.getElementById('login-success-box');
            if (successBox) {
              successBox.innerHTML = `🎉 <strong>Account verified!</strong><br>Enter your password to sign in to your dashboard.`;
              successBox.classList.remove('hidden');
            }

            // Focus the password field for quick sign-in
            setTimeout(() => document.getElementById('login-password')?.focus(), 100);
          }, 1200);
        } else {
          errBox.textContent = data.error || 'Incorrect code. Try again.';
          errBox.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.querySelector('.btn-text').classList.remove('hidden');
          submitBtn.querySelector('.btn-spinner').classList.add('hidden');
          boxes.forEach(b => b.classList.add('otp-shake'));
          setTimeout(() => boxes.forEach(b => b.classList.remove('otp-shake')), 500);
        }
      } catch {
        errBox.textContent = 'Connection error. Please try again.';
        errBox.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').classList.remove('hidden');
        submitBtn.querySelector('.btn-spinner').classList.add('hidden');
      }
    };

    submitBtn.addEventListener('click', doVerify);
    document.getElementById('otp-back-btn')?.addEventListener('click', () => {
      this.render(this._containerId, onAuthSuccess);
      const loginSection = document.getElementById("login-section");
      const signupSection = document.getElementById("signup-section");
      const formCard = document.getElementById("auth-form-card");
      if (loginSection && signupSection) {
        loginSection.classList.add("hidden");
        signupSection.classList.remove("hidden");
        formCard?.classList.add("signup-mode");
      }
    });

    this._startOtpResend(email, boxes);
  },

  _startOtpResend(email, boxes) {
    const resendBtn = document.getElementById('otp-resend-btn');
    const countdownEl = document.getElementById('otp-countdown');
    if (!resendBtn || !countdownEl) return;
    resendBtn.disabled = true;
    let secs = 60;
    countdownEl.textContent = secs;
    const timer = setInterval(() => {
      secs--;
      if (countdownEl) countdownEl.textContent = secs;
      if (secs <= 0) {
        clearInterval(timer);
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.innerHTML = 'Resend code';
        }
      }
    }, 1000);
    resendBtn.onclick = async () => {
      resendBtn.disabled = true;
      resendBtn.textContent = 'Sending…';
      const errBox = document.getElementById('otp-error-box');
      try {
        const res = await fetch(`${Api._base()}/auth/resend-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok) {
          if (boxes) boxes.forEach(b => b.value = '');
          if (boxes && boxes[0]) boxes[0].focus();
          if (errBox) errBox.classList.add('hidden');
          clearInterval(timer);
          this._startOtpResend(email, boxes);
        } else {
          if (errBox) { errBox.textContent = data.error || 'Could not resend code.'; errBox.classList.remove('hidden'); }
          resendBtn.disabled = false;
          resendBtn.innerHTML = 'Resend code';
        }
      } catch {
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend code';
      }
    };
  },

  _showForgotPasswordModal(initialData = {}) {
    // Remove any existing modal
    const existingModal = document.getElementById('forgot-pw-modal');
    if (existingModal) existingModal.remove();

    const initialEmail = initialData.email || '';
    const initialOtp = initialData.otp || '';
    const initialToken = initialData.token || '';
    const startInStep2 = Boolean(initialOtp || initialToken);

    const modal = document.createElement('div');
    modal.id = 'forgot-pw-modal';
    modal.innerHTML = `
      <div class="fpw-overlay" id="fpw-overlay">
        <div class="fpw-card" id="fpw-card">
          <button class="fpw-close" id="fpw-close" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          
          <div class="fpw-icon">🔐</div>
          <h2 class="fpw-title" id="fpw-title">${startInStep2 ? 'Set New Password' : 'Reset Password'}</h2>
          <p class="fpw-desc" id="fpw-desc">
            ${startInStep2
              ? `Enter your 6-digit code and choose a new password.`
              : `Enter your email address to receive a 6-digit verification code.`}
          </p>

          <div id="fpw-error" class="auth-error-box hidden" style="margin-bottom:12px;"></div>
          <div id="fpw-success" class="fpw-success hidden" style="margin-bottom:12px;">
            <div class="fpw-success-icon">✅</div>
            <p id="fpw-success-text">Password reset successful!</p>
          </div>

          <!-- STEP 1: Enter Email -->
          <form id="fpw-step1-form" class="fpw-form ${startInStep2 ? 'hidden' : ''}">
            <div class="auth-input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input type="email" id="fpw-email" class="auth-input" placeholder="Enter your email address" value="${initialEmail}" required autocomplete="email">
            </div>
            <button type="submit" class="auth-submit-btn" id="fpw-step1-btn" style="margin-top:8px;">
              <span class="btn-text">Send 6-Digit Code</span>
              <span class="btn-spinner hidden">
                <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </span>
            </button>
          </form>

          <!-- STEP 2: Enter 6-digit Code & New Password -->
          <form id="fpw-step2-form" class="fpw-form ${startInStep2 ? '' : 'hidden'}">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;font-size:0.82rem;color:rgba(255,255,255,0.7);">
              <span>Sent to: <strong id="fpw-active-email" style="color:var(--jamb-emerald);">${initialEmail}</strong></span>
              <button type="button" id="fpw-back-to-step1" style="background:none;border:none;color:rgba(255,255,255,0.45);font-size:0.8rem;cursor:pointer;text-decoration:underline;">Change</button>
            </div>

            <!-- 6-digit code input -->
            <div class="auth-input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <input type="text" id="fpw-code" class="auth-input" placeholder="6-digit reset code" value="${initialOtp}" maxlength="6" pattern="[0-9]{6}" required autocomplete="one-time-code" style="letter-spacing:4px;font-weight:700;font-family:monospace;font-size:1.1rem;text-align:center;">
            </div>

            <!-- New Password -->
            <div class="auth-input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input type="password" id="fpw-new-password" class="auth-input" placeholder="New password (min. 6 chars)" minlength="6" required autocomplete="new-password">
              <button type="button" class="toggle-pw-btn" data-target="fpw-new-password" aria-label="Toggle password">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>

            <!-- Confirm New Password -->
            <div class="auth-input-wrap">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input type="password" id="fpw-confirm-password" class="auth-input" placeholder="Confirm new password" minlength="6" required autocomplete="new-password">
            </div>

            <button type="submit" class="auth-submit-btn" id="fpw-step2-btn" style="margin-top:6px;">
              <span class="btn-text">Update Password</span>
              <span class="btn-spinner hidden">
                <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </span>
            </button>

            <div style="text-align:center;margin-top:8px;">
              <button type="button" id="fpw-resend-btn" style="background:none;border:none;color:var(--jamb-emerald);font-size:0.8rem;font-weight:600;cursor:pointer;text-decoration:underline;">Resend Code</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Animate in
    requestAnimationFrame(() => {
      modal.querySelector('.fpw-overlay')?.classList.add('fpw-visible');
    });

    // Close handler
    const closeModal = () => {
      modal.querySelector('.fpw-overlay')?.classList.remove('fpw-visible');
      setTimeout(() => modal.remove(), 300);
    };
    document.getElementById('fpw-close')?.addEventListener('click', closeModal);
    document.getElementById('fpw-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'fpw-overlay') closeModal();
    });

    // Password visibility toggle for inside modal
    modal.querySelectorAll('.toggle-pw-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        const input = document.getElementById(targetId);
        if (input) input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    const errBox = document.getElementById('fpw-error');
    const successBox = document.getElementById('fpw-success');
    const step1Form = document.getElementById('fpw-step1-form');
    const step2Form = document.getElementById('fpw-step2-form');
    const titleEl = document.getElementById('fpw-title');
    const descEl = document.getElementById('fpw-desc');
    const activeEmailEl = document.getElementById('fpw-active-email');

    // Back to Step 1
    document.getElementById('fpw-back-to-step1')?.addEventListener('click', () => {
      errBox?.classList.add('hidden');
      step2Form?.classList.add('hidden');
      step1Form?.classList.remove('hidden');
      if (titleEl) titleEl.textContent = 'Reset Password';
      if (descEl) descEl.textContent = "Enter your email address to receive a 6-digit verification code.";
      document.getElementById('fpw-email')?.focus();
    });

    // Resend Code handler
    document.getElementById('fpw-resend-btn')?.addEventListener('click', async () => {
      const email = (activeEmailEl?.textContent || document.getElementById('fpw-email')?.value || '').trim();
      if (!email) return;
      const resendBtn = document.getElementById('fpw-resend-btn');
      if (resendBtn) { resendBtn.disabled = true; resendBtn.textContent = 'Sending…'; }
      try {
        await fetch(`${Api._base()}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase() })
        });
        if (errBox) {
          errBox.textContent = '✓ A fresh 6-digit code has been sent to your email!';
          errBox.style.color = '#10b981';
          errBox.style.borderColor = 'rgba(16,185,129,0.3)';
          errBox.classList.remove('hidden');
        }
      } catch {
        if (errBox) {
          errBox.textContent = 'Could not resend code. Please try again.';
          errBox.classList.remove('hidden');
        }
      }
      setTimeout(() => {
        if (resendBtn) { resendBtn.disabled = false; resendBtn.textContent = 'Resend Code'; }
      }, 5000);
    });

    // STEP 1 Submission: Send Code
    step1Form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('fpw-email')?.value.trim();
      if (!email) return;

      const btn = document.getElementById('fpw-step1-btn');
      const text = btn?.querySelector('.btn-text');
      const spinner = btn?.querySelector('.btn-spinner');
      if (btn) btn.disabled = true;
      text?.classList.add('hidden');
      spinner?.classList.remove('hidden');
      errBox?.classList.add('hidden');

      try {
        const res = await fetch(`${Api._base()}/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.toLowerCase() }),
          signal: AbortSignal.timeout(15000)
        });
        const data = await res.json().catch(() => ({}));

        if (btn) btn.disabled = false;
        text?.classList.remove('hidden');
        spinner?.classList.add('hidden');

        // Transition to Step 2
        if (activeEmailEl) activeEmailEl.textContent = email;
        step1Form.classList.add('hidden');
        step2Form?.classList.remove('hidden');
        if (titleEl) titleEl.textContent = 'Set New Password';
        if (descEl) descEl.innerHTML = `Enter the 6-digit code sent to <strong style="color:var(--jamb-emerald);">${email}</strong>`;
        setTimeout(() => document.getElementById('fpw-code')?.focus(), 150);

      } catch (err) {
        if (btn) btn.disabled = false;
        text?.classList.remove('hidden');
        spinner?.classList.add('hidden');
        if (errBox) {
          errBox.textContent = 'Could not reach server. Please check your connection.';
          errBox.classList.remove('hidden');
        }
      }
    });

    // STEP 2 Submission: Validate Code & Set New Password
    step2Form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (activeEmailEl?.textContent || document.getElementById('fpw-email')?.value || '').trim();
      const otp = document.getElementById('fpw-code')?.value.trim();
      const newPassword = document.getElementById('fpw-new-password')?.value;
      const confirmPassword = document.getElementById('fpw-confirm-password')?.value;

      if (!otp || otp.length !== 6) {
        if (errBox) { errBox.textContent = 'Please enter the full 6-digit verification code.'; errBox.classList.remove('hidden'); }
        return;
      }
      if (!newPassword || newPassword.length < 6) {
        if (errBox) { errBox.textContent = 'Password must be at least 6 characters.'; errBox.classList.remove('hidden'); }
        return;
      }
      if (newPassword !== confirmPassword) {
        if (errBox) { errBox.textContent = 'Passwords do not match. Please verify.'; errBox.classList.remove('hidden'); }
        return;
      }

      const btn = document.getElementById('fpw-step2-btn');
      const text = btn?.querySelector('.btn-text');
      const spinner = btn?.querySelector('.btn-spinner');
      if (btn) btn.disabled = true;
      text?.classList.add('hidden');
      spinner?.classList.remove('hidden');
      errBox?.classList.add('hidden');

      try {
        const res = await fetch(`${Api._base()}/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.toLowerCase(),
            otp,
            token: initialToken,
            newPassword
          }),
          signal: AbortSignal.timeout(15000)
        });
        const data = await res.json().catch(() => ({}));

        if (btn) btn.disabled = false;
        text?.classList.remove('hidden');
        spinner?.classList.add('hidden');

        if (res.ok) {
          // Success!
          step2Form.style.display = 'none';
          if (titleEl) titleEl.style.display = 'none';
          if (descEl) descEl.style.display = 'none';
          if (successBox) {
            const successText = document.getElementById('fpw-success-text');
            if (successText) successText.textContent = '✓ Password reset successful! Redirecting to sign in…';
            successBox.classList.remove('hidden');
          }

          // Smoothly close modal and switch to login with email pre-filled
          setTimeout(() => {
            closeModal();

            // Ensure login mode is active
            const loginSection = document.getElementById('login-section');
            const signupSection = document.getElementById('signup-section');
            const formCard = document.getElementById('auth-form-card');
            if (loginSection && signupSection) {
              signupSection.classList.add('hidden');
              loginSection.classList.remove('hidden');
              formCard?.classList.remove('signup-mode');
            }

            // Pre-fill email
            const emailInput = document.getElementById('login-email');
            if (emailInput && email) emailInput.value = email;

            // Show login success banner
            const loginSuccess = document.getElementById('login-success-box');
            if (loginSuccess) {
              loginSuccess.innerHTML = `🎉 <strong>Password updated successfully!</strong><br>Please enter your new password to sign in to your dashboard.`;
              loginSuccess.classList.remove('hidden');
            }

            // Focus password
            setTimeout(() => document.getElementById('login-password')?.focus(), 150);
          }, 1200);

        } else {
          if (errBox) {
            errBox.textContent = data.error || 'Incorrect code or reset failed. Please check the code.';
            errBox.style.color = '';
            errBox.style.borderColor = '';
            errBox.classList.remove('hidden');
          }
        }
      } catch (err) {
        if (btn) btn.disabled = false;
        text?.classList.remove('hidden');
        spinner?.classList.add('hidden');
        if (errBox) {
          errBox.textContent = 'Server connection error. Please try again.';
          errBox.classList.remove('hidden');
        }
      }
    });
  },

  _animateSuccess(callback) {
    const authPage = document.getElementById('auth-page-root');
    if (authPage) {
      authPage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      authPage.style.opacity = '0';
      authPage.style.transform = 'scale(1.02)';
    }
    setTimeout(callback, 320);
  }
};
