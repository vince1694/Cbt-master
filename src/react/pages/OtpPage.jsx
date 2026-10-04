import React, { useState, useEffect, useRef } from 'react';
import { 
  IconBook, 
  IconMail, 
  IconShieldCheck, 
  IconSpinner, 
  IconCheck, 
  IconArrowRight 
} from '../icons.jsx';
import { verifyOtp, resendOtp } from '../api.js';

export const OtpPage = ({ email, name = '', onNavigate, onAuthSuccess }) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(45);
  const [resendMessage, setResendMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first box automatically
    inputRefs.current[0]?.focus();
  }, []);

  // Resend countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleChange = (index, value) => {
    // Handle single character
    const char = value.slice(-1).replace(/[^0-9]/g, '');
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setErrorMessage('');

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 filled
    if (char && index === 5 && newDigits.every(d => d !== '')) {
      handleVerify(newDigits.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);

    if (pasted.length === 6) {
      inputRefs.current[5]?.focus();
      handleVerify(pasted);
    } else if (pasted.length < 6) {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const handleVerify = async (codeToVerify) => {
    const otpCode = codeToVerify || digits.join('');
    if (otpCode.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    setIsVerifying(true);

    const result = await verifyOtp(email, otpCode);

    setLoading(false);

    if (result.success) {
      // Direct instant dashboard navigation
      onAuthSuccess(result.user);
    } else {
      setIsVerifying(false);
      setErrorMessage(result.error || 'Invalid or expired verification code.');
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setResendMessage('Sending fresh code...');
    setErrorMessage('');
    const result = await resendOtp(email);
    if (result.success) {
      setResendMessage('A new 6-digit code has been dispatched to your email.');
      setResendCooldown(50);
      setDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      setResendMessage('');
      setErrorMessage(result.error || 'Could not resend code. Please try again.');
    }
  };

  return (
    <div className="auth-page" id="auth-page-root">
      <div className="auth-hero-panel">
        <div className="auth-hero-content">
          <div className="auth-logo-mark">
            <IconShieldCheck size={36} />
          </div>
          <h2 className="auth-hero-title">Account Security Verification</h2>
          <p className="auth-hero-desc">
            We've sent a 6-digit verification code to protect your student records and keep your practice history secure.
          </p>

          <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600, marginBottom: '6px' }}>
              <IconCheck size={18} />
              <span>Brevo Cloud Security</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Check your inbox or spam folder for an email from <strong>CBT Master Verification</strong>. The code expires in 15 minutes.
            </p>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-card" style={{ maxWidth: '480px', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#10b981' }}>
            <IconMail size={28} />
          </div>

          <h1 className="auth-form-title">Enter Verification Code</h1>
          <p className="auth-form-sub" style={{ margin: '0 auto 1.5rem', maxWidth: '380px' }}>
            We sent a 6-digit confirmation code to{' '}
            <strong style={{ color: '#fff' }}>{email}</strong>
          </p>

          {errorMessage && (
            <div className="auth-error-box" role="alert" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {resendMessage && (
            <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#34d399', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
              {resendMessage}
            </div>
          )}

          {/* 6 Digit Input Boxes */}
          <div 
            style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '1.5rem 0' }}
            onPaste={handlePaste}
          >
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                disabled={loading}
                style={{
                  width: '50px',
                  height: '60px',
                  textAlign: 'center',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#fff',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: digit ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: digit ? '0 0 12px rgba(16, 185, 129, 0.25)' : 'none'
                }}
              />
            ))}
          </div>

          <button
            type="button"
            className="auth-submit-btn"
            onClick={() => handleVerify()}
            disabled={loading || digits.join('').length !== 6}
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            {loading ? (
              <>
                <IconSpinner size={18} />
                <span>Verifying Account...</span>
              </>
            ) : (
              <>
                <span>Confirm &amp; Access Dashboard</span>
                <IconArrowRight size={18} />
              </>
            )}
          </button>

          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#94a3b8' }}>
            Didn't receive the code?{' '}
            {resendCooldown > 0 ? (
              <span style={{ color: '#64748b' }}>
                Resend in <strong style={{ color: '#cbd5e1' }}>{resendCooldown}s</strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 700, cursor: 'pointer', padding: 0 }}
              >
                Resend Code
              </button>
            )}
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Wrong email address? Return to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
