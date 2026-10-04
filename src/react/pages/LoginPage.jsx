import React, { useState } from 'react';
import { 
  IconBook, 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconSpinner, 
  IconArrowRight, 
  IconCheck, 
  IconShieldCheck 
} from '../icons.jsx';
import { loginCandidate } from '../api.js';

export const LoginPage = ({ onNavigate, onAuthSuccess, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warmupHint, setWarmupHint] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setErrorMessage('');
    setWarmupHint('');
    setLoading(true);

    const result = await loginCandidate(email, password, (hint) => {
      setWarmupHint(hint);
    });

    setLoading(false);
    setWarmupHint('');

    if (result.requiresOtp) {
      // Seamlessly navigate to OTP view with candidate email
      onNavigate('otp', { email: result.email || email, name: result.name || '' });
      return;
    }

    if (result.success) {
      onAuthSuccess(result.user);
    } else {
      setErrorMessage(result.error || 'Invalid email or password.');
    }
  };

  return (
    <div className="auth-page" id="auth-page-root">
      {/* Left Institutional Branding Panel */}
      <div className="auth-hero-panel">
        <div className="auth-hero-content">
          <div className="auth-logo-mark">
            <IconBook size={32} />
          </div>
          <h2 className="auth-hero-title">Nigeria's #1 CBT Practice Platform</h2>
          <p className="auth-hero-desc">
            Prepare smarter with authentic JAMB UTME & WAEC past questions,
            timed exam simulation, on-screen calculator, and step-by-step solutions.
          </p>

          <div className="auth-features-list">
            <div className="auth-feature-item">
              <span className="feat-icon"><IconCheck size={14} /></span>
              <span>Authentic past questions — Science, Arts & Commercial</span>
            </div>
            <div className="auth-feature-item">
              <span className="feat-icon"><IconCheck size={14} /></span>
              <span>Real 8-key JAMB CBT keyboard navigation & timer</span>
            </div>
            <div className="auth-feature-item">
              <span className="feat-icon"><IconCheck size={14} /></span>
              <span>Cloud result sync across all your mobile & desktop devices</span>
            </div>
            <div className="auth-feature-item">
              <span className="feat-icon"><IconCheck size={14} /></span>
              <span>Compulsory novel study hub with chapter-by-chapter summaries</span>
            </div>
          </div>

          <div className="auth-hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">500+</span>
              <span className="hero-stat-label">Vetted Questions</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">3 Tracks</span>
              <span className="hero-stat-label">All Departments</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">JAMB + WAEC</span>
              <span className="hero-stat-label">Official Syllabi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '20px', color: '#10b981', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>
              <IconShieldCheck size={16} />
              <span>Official Candidate Portal</span>
            </div>
            <h1 className="auth-form-title">Candidate Sign In</h1>
            <p className="auth-form-sub">Access your personal JAMB dashboard, test records and saved bookmarks</p>
          </div>

          {errorMessage && (
            <div className="auth-error-box" role="alert">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {warmupHint && (
            <div style={{
              textAlign: 'center',
              color: '#34d399',
              fontSize: '0.84rem',
              lineHeight: 1.5,
              padding: '10px 14px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '10px',
              marginBottom: '1rem',
              animation: 'pulse 1.8s infinite'
            }}>
              {warmupHint}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="auth-field-group">
              <label htmlFor="react-login-email">Email Address</label>
              <div className="auth-input-wrap">
                <span className="input-icon"><IconMail size={18} /></span>
                <input
                  id="react-login-email"
                  type="email"
                  className="auth-input"
                  placeholder="candidate@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field-group">
              <div className="field-label-row">
                <label htmlFor="react-login-password">Password</label>
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => onNavigate('forgot', { email })}
                >
                  Forgot password?
                </button>
              </div>
              <div className="auth-input-wrap">
                <span className="input-icon"><IconLock size={18} /></span>
                <input
                  id="react-login-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-pw-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              style={{ marginTop: '0.5rem' }}
            >
              {loading ? (
                <>
                  <IconSpinner size={18} />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <IconArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="auth-switch-text" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            New JAMB candidate?{' '}
            <button
              className="auth-switch-link"
              onClick={() => onNavigate('signup')}
              style={{ fontWeight: 700 }}
            >
              Create Account Free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
