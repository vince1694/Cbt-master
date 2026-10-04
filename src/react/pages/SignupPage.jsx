import React, { useState } from 'react';
import { 
  IconBook, 
  IconUser, 
  IconMail, 
  IconLock, 
  IconEye, 
  IconEyeOff, 
  IconSpinner, 
  IconArrowRight, 
  IconMicroscope, 
  IconScale, 
  IconBriefcase,
  IconShieldCheck 
} from '../icons.jsx';
import { registerCandidate } from '../api.js';

export const SignupPage = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [department, setDepartment] = useState('Science');
  const [targetScore, setTargetScore] = useState(280);
  const [targetInstitution, setTargetInstitution] = useState('University of Lagos (UNILAG)');
  const [preferredCourse, setPreferredCourse] = useState('Computer Science');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const INSTITUTIONS = [
    'University of Lagos (UNILAG)',
    'University of Ibadan (UI)',
    'Obafemi Awolowo University (OAU)',
    'University of Nigeria, Nsukka (UNN)',
    'Ahmadu Bello University (ABU)',
    'Federal University of Technology, Akure (FUTA)',
    'University of Benin (UNIBEN)',
    'University of Ilorin (UNILORIN)',
    'Lagos State University (LASU)',
    'Covenant University',
    'Other Institution'
  ];

  const COURSES = [
    'Computer Science',
    'Medicine & Surgery',
    'Law (LL.B)',
    'Electrical/Electronics Engineering',
    'Mechanical Engineering',
    'Nursing Science',
    'Pharmacy',
    'Accounting',
    'Economics',
    'Mass Communication',
    'Business Administration',
    'Other Course'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    const result = await registerCandidate({
      name,
      email,
      password,
      department,
      targetScore,
      targetInstitution,
      preferredCourse
    });

    setLoading(false);

    if (result.success) {
      // Seamlessly navigate to OTP page with candidate info
      onNavigate('otp', { 
        email: result.email || email, 
        name: result.name || name,
        isNewRegistration: true 
      });
    } else {
      setErrorMessage(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page" id="auth-page-root">
      {/* Left Summary Panel */}
      <div className="auth-hero-panel">
        <div className="auth-hero-content">
          <div className="auth-logo-mark">
            <IconBook size={32} />
          </div>
          <h2 className="auth-hero-title">Start Your Free JAMB Prep Today</h2>
          <p className="auth-hero-desc">
            Join thousands of high-scoring candidates across Nigeria preparing with authentic past questions and instant analytics.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 700, marginBottom: '6px' }}>
                <IconShieldCheck size={20} />
                <span>Selected Track: {department}</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.5 }}>
                {department === 'Science' && 'Includes Use of English, Mathematics, Physics, Chemistry, and Biology past questions.'}
                {department === 'Arts' && 'Includes Use of English, Literature in English, Government, CRS/IRS, and History.'}
                {department === 'Commercial' && 'Includes Use of English, Mathematics, Economics, Commerce, and Financial Accounting.'}
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
              <div style={{ color: '#f59e0b', fontWeight: 700, marginBottom: '4px', fontSize: '0.9rem' }}>
                🎯 Target UTME Score: {targetScore} / 400
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>
                Your study schedule and readiness score will be calibrated for {targetInstitution}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-card" style={{ maxWidth: '520px' }}>
          <div className="auth-form-header">
            <h1 className="auth-form-title">Create Candidate Account</h1>
            <p className="auth-form-sub">Sign up with your study preferences to unlock your candidate dashboard</p>
          </div>

          {errorMessage && (
            <div className="auth-error-box" role="alert">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="auth-field-group">
              <label htmlFor="react-signup-name">Full Name</label>
              <div className="auth-input-wrap">
                <span className="input-icon"><IconUser size={18} /></span>
                <input
                  id="react-signup-name"
                  type="text"
                  className="auth-input"
                  placeholder="e.g. Ibrahim Adeleke"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label htmlFor="react-signup-email">Email Address</label>
              <div className="auth-input-wrap">
                <span className="input-icon"><IconMail size={18} /></span>
                <input
                  id="react-signup-email"
                  type="email"
                  className="auth-input"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field-group">
              <label htmlFor="react-signup-password">Password (minimum 6 characters)</label>
              <div className="auth-input-wrap">
                <span className="input-icon"><IconLock size={18} /></span>
                <input
                  id="react-signup-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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

            {/* Department Selection Cards */}
            <div className="auth-field-group">
              <label>Academic Track</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setDepartment('Science')}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '10px',
                    background: department === 'Science' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: department === 'Science' ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: department === 'Science' ? '#10b981' : '#cbd5e1',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  <IconMicroscope size={22} />
                  <span>Science</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDepartment('Arts')}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '10px',
                    background: department === 'Arts' ? 'rgba(168, 85, 247, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: department === 'Arts' ? '2px solid #a855f7' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: department === 'Arts' ? '#c084fc' : '#cbd5e1',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  <IconScale size={22} />
                  <span>Arts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDepartment('Commercial')}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '10px',
                    background: department === 'Commercial' ? 'rgba(59, 130, 246, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: department === 'Commercial' ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: department === 'Commercial' ? '#60a5fa' : '#cbd5e1',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  <IconBriefcase size={22} />
                  <span>Commercial</span>
                </button>
              </div>
            </div>

            {/* Target Score Slider */}
            <div className="auth-field-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label htmlFor="react-target-score">Target JAMB UTME Score</label>
                <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.95rem' }}>{targetScore} / 400</span>
              </div>
              <input
                id="react-target-score"
                type="range"
                min="180"
                max="360"
                step="5"
                value={targetScore}
                onChange={(e) => setTargetScore(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
            </div>

            {/* Target University & Course */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="auth-field-group">
                <label htmlFor="react-institution">Target University</label>
                <select
                  id="react-institution"
                  className="auth-input"
                  value={targetInstitution}
                  onChange={(e) => setTargetInstitution(e.target.value)}
                  style={{ cursor: 'pointer', height: '46px', padding: '0 12px' }}
                >
                  {INSTITUTIONS.map((inst) => (
                    <option key={inst} value={inst} style={{ background: '#1e293b', color: '#fff' }}>
                      {inst}
                    </option>
                  ))}
                </select>
              </div>

              <div className="auth-field-group">
                <label htmlFor="react-course">Preferred Course</label>
                <select
                  id="react-course"
                  className="auth-input"
                  value={preferredCourse}
                  onChange={(e) => setPreferredCourse(e.target.value)}
                  style={{ cursor: 'pointer', height: '46px', padding: '0 12px' }}
                >
                  {COURSES.map((c) => (
                    <option key={c} value={c} style={{ background: '#1e293b', color: '#fff' }}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? (
                <>
                  <IconSpinner size={18} />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account &amp; Verify Email</span>
                  <IconArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="auth-switch-text" style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            Already registered?{' '}
            <button
              className="auth-switch-link"
              onClick={() => onNavigate('login')}
              style={{ fontWeight: 700 }}
            >
              Sign In Instead
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
