import React, { useState } from 'react';
import { 
  IconBook, 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconSpinner, 
  IconCheck, 
  IconArrowRight 
} from '../icons.jsx';
import { requestPasswordReset, completePasswordReset } from '../api.js';

export const ForgotPasswordPage = ({ onNavigate, initialEmail = '' }) => {
  const [step, setStep] = useState('request'); // 'request' | 'reset'
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    const result = await requestPasswordReset(email);
    setLoading(false);

    if (result.success) {
      setSuccessMessage('A 6-digit password reset code has been sent to your email.');
      setStep('reset');
    } else {
      setErrorMessage(result.error || 'Could not find an account with that email.');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length !== 6) {
      setErrorMessage('Please enter the 6-digit reset code from your email.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    const result = await completePasswordReset(email, otp, newPassword);
    setLoading(false);

    if (result.success) {
      setSuccessMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        onNavigate('login', { email });
      }, 1800);
    } else {
      setErrorMessage(result.error || 'Invalid or expired reset code.');
    }
  };

  return (
    <div className="auth-page" id="auth-page-root">
      <div className="auth-hero-panel">
        <div className="auth-hero-content">
          <div className="auth-logo-mark">
            <IconBook size={32} />
          </div>
          <h2 className="auth-hero-title">Reset Your Candidate Password</h2>
          <p className="auth-hero-desc">
            Recover access to your practice test history, diagnostic reports, and saved bookmarks securely.
          </p>

          <div style={{ marginTop: '2rem', padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600, marginBottom: '6px' }}>
              <IconCheck size={18} />
              <span>Instant Recovery</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Enter your registered email address and we'll send a 6-digit recovery code directly to your inbox.
            </p>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-card" style={{ maxWidth: '480px' }}>
          <div className="auth-form-header">
            <h1 className="auth-form-title">
              {step === 'request' ? 'Forgot Password' : 'Set New Password'}
            </h1>
            <p className="auth-form-sub">
              {step === 'request' 
                ? 'Enter your email to receive a password reset code' 
                : 'Enter the 6-digit code sent to your email and your new password'}
            </p>
          </div>

          {errorMessage && (
            <div className="auth-error-box" role="alert">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#10b981', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1.25rem', textAlign: 'center' }}>
              {successMessage}
            </div>
          )}

          {step === 'request' ? (
            <form onSubmit={handleRequestSubmit} className="auth-form" noValidate>
              <div className="auth-field-group">
                <label htmlFor="react-forgot-email">Registered Email Address</label>
                <div className="auth-input-wrap">
                  <span className="input-icon"><IconMail size={18} /></span>
                  <input
                    id="react-forgot-email"
                    type="email"
                    className="auth-input"
                    placeholder="candidate@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
                style={{ marginTop: '0.75rem' }}
              >
                {loading ? (
                  <>
                    <IconSpinner size={18} />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Code</span>
                    <IconArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="auth-form" noValidate>
              <div className="auth-field-group">
                <label htmlFor="react-reset-otp">6-Digit Recovery Code</label>
                <input
                  id="react-reset-otp"
                  type="text"
                  maxLength={6}
                  className="auth-input"
                  placeholder="e.g. 849201"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '1.2rem', fontWeight: 700 }}
                  required
                />
              </div>

              <div className="auth-field-group">
                <label htmlFor="react-new-password">New Password (min 6 characters)</label>
                <div className="auth-input-wrap">
                  <span className="input-icon"><IconLock size={18} /></span>
                  <input
                    id="react-new-password"
                    type={showPassword ? "text" : "password"}
                    className="auth-input"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-pw-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-field-group">
                <label htmlFor="react-confirm-password">Confirm New Password</label>
                <div className="auth-input-wrap">
                  <span className="input-icon"><IconLock size={18} /></span>
                  <input
                    id="react-confirm-password"
                    type={showPassword ? "text" : "password"}
                    className="auth-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
                style={{ marginTop: '0.75rem' }}
              >
                {loading ? (
                  <>
                    <IconSpinner size={18} />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password &amp; Continue</span>
                    <IconArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              type="button"
              className="auth-switch-link"
              onClick={() => onNavigate('login')}
              style={{ fontWeight: 600 }}
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
