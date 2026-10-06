import React, { useState, useEffect } from 'react';
import { 
  IconBook, 
  IconFlame, 
  IconAward, 
  IconLogOut, 
  IconPlay, 
  IconMicroscope, 
  IconScale, 
  IconBriefcase, 
  IconCheck, 
  IconShieldCheck,
  IconSpinner 
} from '../icons.jsx';
import { authStorage, fetchLeaderboard } from '../api.js';

export const DashboardPage = ({ 
  user, 
  onStartJamb, 
  onStartWaec, 
  onReviewTest, 
  onOpenStudyMode, 
  onOpenNovelStudy, 
  onLogout 
}) => {
  const [profile, setProfile] = useState(() => authStorage.getProfile() || {
    name: user?.name || authStorage.getUserName() || 'Candidate',
    email: user?.email || authStorage.getUserEmail() || '',
    department: user?.department || 'Science',
    targetJambScore: user?.targetJambScore || 280,
    targetInstitution: user?.targetInstitution || 'University of Lagos (UNILAG)',
    preferredCourse: user?.preferredCourse || 'Computer Science',
    streakDays: user?.streakDays || 1
  });

  const [testHistory, setTestHistory] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [activeSubjectModal, setActiveSubjectModal] = useState(false);

  useEffect(() => {
    // Load local test history
    try {
      const history = JSON.parse(localStorage.getItem('jamb_waec_test_history') || '[]');
      setTestHistory(history);
    } catch {
      setTestHistory([]);
    }
  }, []);

  const handleOpenLeaderboard = async () => {
    setShowLeaderboard(true);
    setLoadingLeaderboard(true);
    const data = await fetchLeaderboard();
    setLeaderboardData(data);
    setLoadingLeaderboard(false);
  };

  // Calculations
  const candidateName = profile.name || 'Candidate';
  const candidateEmail = profile.email || '';
  const department = profile.department || 'Science';
  const targetScore = profile.targetJambScore || 280;

  // Calculate average performance
  const testsTaken = testHistory.length;
  const avgPercentage = testsTaken > 0 
    ? Math.round(testHistory.reduce((sum, t) => sum + (t.percentage || 0), 0) / testsTaken)
    : 0;
  const projectedScore = testsTaken > 0 ? Math.round((avgPercentage / 100) * 400) : 0;
  const progressRatio = Math.min(100, Math.round((projectedScore / targetScore) * 100));

  const deptColors = {
    Science: { bg: '#10b981', light: 'rgba(16, 185, 129, 0.15)', text: '#34d399' },
    Arts: { bg: '#a855f7', light: 'rgba(168, 85, 247, 0.15)', text: '#c084fc' },
    Commercial: { bg: '#3b82f6', light: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' }
  };
  const currentDeptColor = deptColors[department] || deptColors.Science;

  const trackSubjects = {
    Science: ['Use of English', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    Arts: ['Use of English', 'Literature in English', 'Government', 'CRS / IRS', 'History'],
    Commercial: ['Use of English', 'Mathematics', 'Economics', 'Commerce', 'Financial Accounting']
  };

  return (
    <div className="dashboard-wrapper" style={{ padding: '1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
      
      {/* Candidate Profile Header Card */}
      <section className="profile-hero" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '1.5rem',
        background: 'var(--surface-base)',
        border: '1px solid var(--border-medium)',
        borderRadius: '16px',
        padding: '1.75rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.75rem',
            fontWeight: 800,
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
          }}>
            {candidateName.charAt(0).toUpperCase()}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {candidateName}
              </h1>
              <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                background: currentDeptColor.light,
                color: currentDeptColor.text,
                border: `1px solid ${currentDeptColor.bg}40`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {department === 'Science' && <IconMicroscope size={14} />}
                {department === 'Arts' && <IconScale size={14} />}
                {department === 'Commercial' && <IconBriefcase size={14} />}
                <span>{department} Track</span>
              </span>
            </div>

            <p style={{ margin: '6px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Aspiring for <strong style={{ color: 'var(--text-primary)' }}>{profile.preferredCourse}</strong> at <strong style={{ color: 'var(--text-primary)' }}>{profile.targetInstitution}</strong>
            </p>

            {candidateEmail && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                <span>✉️ {candidateEmail}</span>
                <span>•</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Active MERN Cloud Session</span>
              </div>
            )}
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '8px 14px',
            borderRadius: '12px',
            color: '#f59e0b'
          }}>
            <IconFlame size={20} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', lineHeight: 1 }}>{profile.streakDays || 1} Days</div>
              <div style={{ fontSize: '0.72rem', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Study Streak</div>
            </div>
          </div>

          <button
            onClick={handleOpenLeaderboard}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-secondary)',
              padding: '10px 14px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <IconAward size={18} />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#ef4444',
              padding: '10px 14px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            <IconLogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Target Progress & Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* Readiness Meter Card */}
        <div style={{
          background: 'var(--surface-base)',
          border: '1px solid var(--border-medium)',
          borderRadius: '14px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>JAMB Target Readiness</span>
            <span style={{ color: '#10b981', fontWeight: 800 }}>{progressRatio}%</span>
          </div>

          <div style={{ height: '8px', background: 'var(--surface-highlight)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div style={{ width: `${progressRatio}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)', transition: 'width 0.5s ease' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Projected Score: <strong style={{ color: 'var(--text-primary)' }}>{projectedScore > 0 ? `${projectedScore} / 400` : 'Take 1 exam'}</strong>
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Goal: <strong style={{ color: '#10b981' }}>{targetScore} / 400</strong>
            </span>
          </div>
        </div>

        {/* Exams Completed */}
        <div style={{
          background: 'var(--surface-base)',
          border: '1px solid var(--border-medium)',
          borderRadius: '14px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}>
            <IconBook size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{testsTaken}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Completed Practice Tests</div>
          </div>
        </div>

        {/* Average Accuracy */}
        <div style={{
          background: 'var(--surface-base)',
          border: '1px solid var(--border-medium)',
          borderRadius: '14px',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <IconShieldCheck size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {testsTaken > 0 ? `${avgPercentage}%` : '—'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Average Accuracy</div>
          </div>
        </div>

      </div>

      {/* Main Practice Actions Grid */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Start Exam Simulation &amp; Study
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        
        {/* Full JAMB CBT Simulator Launcher */}
        <div style={{
          background: 'var(--surface-base)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: '#10b981', color: '#022c22', fontSize: '0.75rem', fontWeight: 800, marginBottom: '12px' }}>
              OFFICIAL 4-SUBJECT SIMULATION
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>
              Full JAMB UTME Simulator
            </h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Experience the real JAMB test environment: 180 questions, 2-hour official countdown timer, 8-key keyboard shortcuts (A, B, C, D, P, N, S, R) and on-screen calculator.
            </p>
          </div>

          <button
            onClick={() => onStartJamb(department, 'full', null, 180)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#10b981',
              color: '#022c22',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'transform 0.15s, background 0.15s'
            }}
          >
            <IconPlay size={18} />
            <span>Launch JAMB Simulation</span>
          </button>
        </div>

        {/* Single Subject Practice */}
        <div style={{
          background: 'var(--surface-base)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', fontSize: '0.75rem', fontWeight: 800, marginBottom: '12px' }}>
              DIAGNOSTIC PRACTICE
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>
              Single Subject Practice
            </h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Drill down on specific subjects like Use of English, Mathematics, Physics, Chemistry, Literature, or Economics with instant answer explanations.
            </p>
          </div>

          <button
            onClick={() => setActiveSubjectModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'var(--surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <span>Choose Subject to Practice</span>
          </button>
        </div>

        {/* Compulsory Novel Study Hub */}
        <div style={{
          background: 'var(--surface-base)',
          border: '1.5px solid var(--border-medium)',
          borderRadius: '16px',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.15)', color: '#d97706', fontSize: '0.75rem', fontWeight: 800, marginBottom: '12px' }}>
              MANDATORY UTME LITERATURE
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px' }}>
              Compulsory Novel Hub
            </h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Read chapter summaries, character analyses, themes, and past questions for the compulsory JAMB literature novels.
            </p>
          </div>

          <button
            onClick={onOpenNovelStudy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: 'var(--surface-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
              padding: '12px 20px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            <IconBook size={18} />
            <span>Open Novel Hub</span>
          </button>
        </div>

      </div>

      {/* Recent Practice History Table */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
        Recent Practice Exam History
      </h2>

      {testHistory.length === 0 ? (
        <div style={{
          background: 'var(--surface-base)',
          border: '1px dashed var(--border-medium)',
          borderRadius: '14px',
          padding: '2.5rem',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 1rem', fontSize: '0.95rem' }}>
            No exams taken yet. Start your first JAMB or single-subject simulation to see your diagnostic reports!
          </p>
          <button
            onClick={() => onStartJamb(department, 'full', null, 180)}
            style={{
              background: '#10b981',
              color: '#022c22',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Take First Exam Now
          </button>
        </div>
      ) : (
        <div style={{
          background: 'var(--surface-base)',
          border: '1px solid var(--border-medium)',
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--surface-elevated)', borderBottom: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 16px' }}>Exam Title</th>
                <th style={{ padding: '12px 16px' }}>Score</th>
                <th style={{ padding: '12px 16px' }}>Projected UTME</th>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {testHistory.slice(0, 8).map((test, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {test.examTitle || 'JAMB UTME Simulation'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      background: test.percentage >= 60 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: test.percentage >= 60 ? '#059669' : '#ef4444'
                    }}>
                      {test.score} / {test.totalQuestions || test.total} ({test.percentage}%)
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#10b981', fontWeight: 700 }}>
                    {test.scaledJambScore || Math.round((test.percentage / 100) * 400)} / 400
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                    {new Date(test.date || Date.now()).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => onReviewTest(test)}
                      style={{
                        background: 'var(--surface-elevated)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                        fontWeight: 600
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Subject Picker Modal */}
      {activeSubjectModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '480px',
            width: '90%'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '0 0 1rem' }}>
              Select Subject for Practice
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0 0 1.25rem' }}>
              Choose any subject from your track for dedicated practice:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem' }}>
              {(trackSubjects[department] || trackSubjects.Science).map((subj) => (
                <button
                  key={subj}
                  onClick={() => {
                    setActiveSubjectModal(false);
                    onStartWaec(subj, 'standard');
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    textAlign: 'left',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{subj}</span>
                  <span style={{ color: '#10b981', fontSize: '0.85rem' }}>Start →</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveSubjectModal(false)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '620px',
            width: '90%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <IconAward size={24} className="" />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  National UTME Leaderboard
                </h3>
              </div>
              <button
                onClick={() => setShowLeaderboard(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {loadingLeaderboard ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  <IconSpinner size={24} />
                  <p style={{ marginTop: '8px' }}>Loading live MongoDB leaderboard...</p>
                </div>
              ) : leaderboardData.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>
                  No candidate scores recorded yet. Be the first to rank on the national board!
                </p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Rank</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Candidate</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Track</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>UTME Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '10px 8px', fontWeight: 800, color: idx < 3 ? '#f59e0b' : '#94a3b8' }}>
                          #{entry.rank || idx + 1}
                        </td>
                        <td style={{ padding: '10px 8px', color: '#fff', fontWeight: 600 }}>
                          {entry.name || 'Anonymous Scholar'}
                        </td>
                        <td style={{ padding: '10px 8px', color: '#94a3b8' }}>
                          {entry.department || 'Science'}
                        </td>
                        <td style={{ padding: '10px 8px', textAlign: 'right', color: '#10b981', fontWeight: 800 }}>
                          {entry.scaledJambScore || Math.round((entry.percentage / 100) * 400)} / 400
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'right' }}>
              <button
                onClick={() => setShowLeaderboard(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#10b981',
                  color: '#022c22',
                  border: 'none',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
