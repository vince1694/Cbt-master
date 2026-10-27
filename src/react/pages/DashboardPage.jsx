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
import { authStorage, fetchLeaderboard, fetchMyResults, fetchCandidatePublicActivities } from '../api.js';

export const DashboardPage = ({ 
  user, 
  onStartJamb, 
  onStartWaec, 
  onReviewTest, 
  onOpenStudyMode, 
  onOpenNovelStudy, 
  onLogout 
}) => {
  const [profile, setProfile] = useState(() => {
    const defaultProfile = {
      name: user?.name || authStorage.getUserName() || 'Candidate',
      email: user?.email || authStorage.getUserEmail() || '',
      department: user?.department || 'Science',
      targetJambScore: user?.targetJambScore || 280,
      targetInstitution: user?.targetInstitution || 'University of Lagos (UNILAG)',
      preferredCourse: user?.preferredCourse || 'Computer Science',
      streakDays: user?.streakDays || 1
    };
    const stored = authStorage.getProfile();
    if (stored && user?.email && stored.email && stored.email.toLowerCase() === user.email.toLowerCase()) {
      return { ...defaultProfile, ...stored };
    }
    return defaultProfile;
  });

  const [testHistory, setTestHistory] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);
  const [leaderboardFilter, setLeaderboardFilter] = useState('all');
  const [inspectingCandidate, setInspectingCandidate] = useState(null);
  const [loadingInspect, setLoadingInspect] = useState(false);
  const [activeSubjectModal, setActiveSubjectModal] = useState(false);
  const [selectedJambYear, setSelectedJambYear] = useState('2024');
  const [selectedWaecYear, setSelectedWaecYear] = useState('2024');
  const [selectedWaecPaper, setSelectedWaecPaper] = useState('Paper 1 (Objective)');

  useEffect(() => {
    // 1. Strictly load local test history isolated to this candidate
    const email = (user?.email || authStorage.getUserEmail() || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    const scopedKey = email ? `jamb_waec_test_history_${email}` : 'jamb_waec_test_history';
    try {
      const local = JSON.parse(localStorage.getItem(scopedKey) || '[]');
      setTestHistory(local);
    } catch {
      setTestHistory([]);
    }

    // 2. Sync personal cloud test history from MongoDB
    fetchMyResults().then(cloudResults => {
      if (Array.isArray(cloudResults) && cloudResults.length > 0) {
        const formatted = cloudResults.map(r => ({
          id: r._id || ('test_' + Date.now()),
          examType: r.examType,
          examTitle: r.examTitle,
          department: r.department,
          score: r.score,
          totalQuestions: r.totalQuestions,
          percentage: r.percentage,
          scaledJambScore: r.scaledJambScore || Math.round((r.percentage / 100) * 400),
          waecGrade: r.waecGrade,
          timeSpentMinutes: r.timeSpentMinutes,
          timestamp: r.createdAt
        }));
        setTestHistory(formatted);
        if (scopedKey) {
          localStorage.setItem(scopedKey, JSON.stringify(formatted));
        }
      }
    }).catch(() => {});
  }, [user]);

  const handleOpenLeaderboard = async (dept = leaderboardFilter) => {
    setShowLeaderboard(true);
    setLoadingLeaderboard(true);
    setInspectingCandidate(null);
    const data = await fetchLeaderboard(dept);
    setLeaderboardData(data);
    setLoadingLeaderboard(false);
  };

  const handleFilterLeaderboard = async (dept) => {
    setLeaderboardFilter(dept);
    setLoadingLeaderboard(true);
    const data = await fetchLeaderboard(dept);
    setLeaderboardData(data);
    setLoadingLeaderboard(false);
  };

  const handleInspectCandidate = async (candidateId) => {
    setLoadingInspect(true);
    setInspectingCandidate({ name: 'Loading Candidate...', loading: true });
    const publicData = await fetchCandidatePublicActivities(candidateId);
    setInspectingCandidate(publicData || { error: 'Could not load candidate records.' });
    setLoadingInspect(false);
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
              Experience the real JAMB test environment: 4-subject combination, official 8-key shortcuts (A, B, C, D, P, N, S, R) and on-screen calculator.
            </p>

            <div style={{ marginTop: '14px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Examination Year (2011–2026):
              </label>
              <select
                value={selectedJambYear}
                onChange={(e) => setSelectedJambYear(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: 'var(--surface-elevated, rgba(255,255,255,0.06))',
                  border: '1px solid var(--border-medium, rgba(255,255,255,0.15))',
                  color: 'var(--text-primary, #fff)',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                <option value="All">All Years Comprehensive Mix</option>
                <option value="2026">2026 (Upcoming Mock Session)</option>
                <option value="2025">2025 (Recent Session Archive)</option>
                <option value="2024">2024 UTME Past Paper (Verified)</option>
                <option value="2023">2023 UTME Past Paper (Verified)</option>
                <option value="2022">2022 UTME Past Paper (Verified)</option>
                <option value="2021">2021 UTME Past Paper (Verified)</option>
                <option value="2020">2020 UTME Past Paper (Verified)</option>
                <option value="2019">2019 UTME Past Paper (Verified)</option>
                <option value="2018">2018 UTME Past Paper (Verified)</option>
                <option value="2017">2017 UTME Past Paper (Verified)</option>
                <option value="2016">2016 UTME Past Paper (Verified)</option>
                <option value="2015">2015 UTME Past Paper (Verified)</option>
                <option value="2014">2014 UTME Past Paper (Verified)</option>
                <option value="2013">2013 UTME Past Paper (Verified)</option>
                <option value="2012">2012 UTME Past Paper (Verified)</option>
                <option value="2011">2011 UTME Past Paper (Verified)</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => onStartJamb(department, 'full', null, 40, selectedJambYear)}
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
            <span>Launch JAMB Simulation ({selectedJambYear === 'All' ? 'All Years' : selectedJambYear})</span>
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '0 0 0.5rem' }}>
              WAEC WASSCE Practice Console
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0 0 1rem' }}>
              Choose year, paper type, and subject from your academic track:
            </p>

            {/* WAEC Year and Paper pickers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1.2rem' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
                  Year (2011–2026):
                </label>
                <select
                  value={selectedWaecYear}
                  onChange={(e) => setSelectedWaecYear(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="All">All Years Mix</option>
                  <option value="2026">2026 (Upcoming Mock)</option>
                  <option value="2025">2025 (Recent Paper)</option>
                  <option value="2024">2024 (Verified)</option>
                  <option value="2023">2023 (Verified)</option>
                  <option value="2022">2022 (Verified)</option>
                  <option value="2021">2021 (Verified)</option>
                  <option value="2020">2020 (Verified)</option>
                  <option value="2019">2019 (Verified)</option>
                  <option value="2018">2018 (Verified)</option>
                  <option value="2017">2017 (Verified)</option>
                  <option value="2016">2016 (Verified)</option>
                  <option value="2015">2015 (Verified)</option>
                  <option value="2014">2014 (Verified)</option>
                  <option value="2013">2013 (Verified)</option>
                  <option value="2012">2012 (Verified)</option>
                  <option value="2011">2011 (Verified)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: 700 }}>
                  Paper Format:
                </label>
                <select
                  value={selectedWaecPaper}
                  onChange={(e) => setSelectedWaecPaper(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="Paper 1 (Objective)">Paper 1 (Objective)</option>
                  <option value="Paper 2 (Theory)">Paper 2 (Theory / Essay)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '1.5rem', maxHeight: '280px', overflowY: 'auto' }}>
              {(trackSubjects[department] || trackSubjects.Science).map((subj) => (
                <button
                  key={subj}
                  onClick={() => {
                    setActiveSubjectModal(false);
                    onStartWaec(subj, 'standard', selectedWaecYear, selectedWaecPaper);
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
                  <span style={{ color: '#10b981', fontSize: '0.85rem' }}>Practice ({selectedWaecYear === 'All' ? 'Mix' : selectedWaecYear}) →</span>
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
          background: 'rgba(5, 10, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '1rem'
        }}>
          <div style={{
            background: 'linear-gradient(165deg, #111827 0%, #0f172a 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '1.75rem',
            maxWidth: '780px',
            width: '100%',
            maxHeight: '88vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)'
                  }}>
                    🏆
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0, letterSpacing: '-0.02em' }}>
                      National UTME Leaderboard
                    </h3>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                      Official JAMB 400-Point Scoring • Verified Candidate Profiles
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowLeaderboard(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94a3b8',
                  borderRadius: '10px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                ✕
              </button>
            </div>

            {/* Department Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '4px' }}>
              {[
                { id: 'all', label: '🌟 All Departments' },
                { id: 'Science', label: '🔬 Science' },
                { id: 'Arts', label: '🎨 Arts' },
                { id: 'Commercial', label: '📊 Commercial' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleFilterLeaderboard(tab.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: leaderboardFilter === tab.id ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: leaderboardFilter === tab.id ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                    color: leaderboardFilter === tab.id ? '#34d399' : '#94a3b8',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Leaderboard Table / Cards */}
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
              {loadingLeaderboard ? (
                <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#94a3b8' }}>
                  <IconSpinner size={28} />
                  <p style={{ marginTop: '12px', fontSize: '0.9rem' }}>Loading verified Nigerian scholar rankings...</p>
                </div>
              ) : leaderboardData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '14px', border: '1px dashed rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🎯</div>
                  <h4 style={{ color: '#f8fafc', margin: '0 0 6px', fontSize: '1.05rem' }}>No Scores in this Track Yet</h4>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem', maxWidth: '360px', marginInline: 'auto' }}>
                    Complete a 4-subject JAMB UTME simulation or practice drill to claim the #1 spot on the national board!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {leaderboardData.map((entry, idx) => {
                    const isTop1 = idx === 0;
                    const isTop2 = idx === 1;
                    const isTop3 = idx === 2;
                    const rankNum = entry.rank || idx + 1;

                    // Check if entry represents current logged-in user
                    const isCurrentUser = (
                      (profile.email && entry.candidateEmail && profile.email.toLowerCase().trim() === entry.candidateEmail.toLowerCase().trim()) ||
                      (profile.name && entry.name && profile.name.trim().toLowerCase() === entry.name.trim().toLowerCase())
                    );

                    // Extract initials
                    const nameParts = (entry.name || 'Scholar Candidate').trim().split(/\s+/);
                    const initials = nameParts.length === 1
                      ? nameParts[0].substring(0, 2).toUpperCase()
                      : (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();

                    // Deterministic vibrant avatar background
                    const avatarGradients = [
                      'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                      'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                      'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                      'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                      'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)'
                    ];
                    let hash = 0;
                    for (let i = 0; i < (entry.name || '').length; i++) {
                      hash = entry.name.charCodeAt(i) + ((hash << 5) - hash);
                    }
                    const avatarBg = avatarGradients[Math.abs(hash) % avatarGradients.length];

                    // Competitiveness tier
                    const score = entry.scaledJambScore || 0;
                    let compBadge = { text: 'Developing', bg: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' };
                    if (score >= 300) {
                      compBadge = { text: '🏆 Elite (300+)', bg: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: 'rgba(168, 85, 247, 0.4)' };
                    } else if (score >= 250) {
                      compBadge = { text: '🌟 Highly Competitive', bg: 'rgba(16, 185, 129, 0.18)', color: '#34d399', border: 'rgba(16, 185, 129, 0.35)' };
                    } else if (score >= 200) {
                      compBadge = { text: '✅ Varsity Pass', bg: 'rgba(2, 132, 199, 0.18)', color: '#38bdf8', border: 'rgba(2, 132, 199, 0.35)' };
                    }

                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px 14px',
                          borderRadius: '12px',
                          background: isCurrentUser
                            ? 'rgba(16, 185, 129, 0.1)'
                            : isTop1
                            ? 'rgba(251, 191, 36, 0.06)'
                            : 'rgba(255, 255, 255, 0.03)',
                          border: isCurrentUser
                            ? '1px solid rgba(16, 185, 129, 0.45)'
                            : isTop1
                            ? '1px solid rgba(251, 191, 36, 0.3)'
                            : '1px solid rgba(255, 255, 255, 0.06)',
                          transition: 'transform 0.15s ease'
                        }}
                      >
                        {/* Rank Badge */}
                        <div style={{
                          minWidth: '40px',
                          textAlign: 'center',
                          fontWeight: 900,
                          fontSize: isTop1 || isTop2 || isTop3 ? '1.25rem' : '0.92rem',
                          color: isTop1 ? '#fbbf24' : isTop2 ? '#cbd5e1' : isTop3 ? '#f97316' : '#64748b'
                        }}>
                          {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : `#${rankNum}`}
                        </div>

                        {/* Candidate Avatar */}
                        <div style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: avatarBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.88rem',
                          color: '#ffffff',
                          flexShrink: 0,
                          boxShadow: isTop1 ? '0 0 10px rgba(251, 191, 36, 0.35)' : 'none'
                        }}>
                          {initials}
                        </div>

                        {/* Candidate Details */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem' }}>
                              {entry.name || 'Scholar Candidate'}
                            </span>
                            {isCurrentUser && (
                              <span style={{
                                background: '#10b981',
                                color: '#022c22',
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                letterSpacing: '0.04em'
                              }}>
                                YOU
                              </span>
                            )}
                            <span style={{
                              fontSize: '0.7rem',
                              color: entry.department === 'Science' ? '#38bdf8' : entry.department === 'Arts' ? '#c084fc' : '#fbbf24',
                              background: 'rgba(255, 255, 255, 0.05)',
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}>
                              {entry.department || 'Science'}
                            </span>
                          </div>
                          <div style={{
                            fontSize: '0.76rem',
                            color: '#94a3b8',
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {entry.course || 'Degree Candidate'} • {entry.institution || 'University Aspirant'}
                          </div>
                        </div>

                        {/* JAMB UTME Score & Status */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: '3px' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981', letterSpacing: '-0.02em' }}>
                              {score}
                            </span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                              / 400
                            </span>
                          </div>
                          <div style={{
                            display: 'inline-block',
                            marginTop: '2px',
                            padding: '2px 8px',
                            borderRadius: '10px',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            background: compBadge.bg,
                            color: compBadge.color,
                            border: `1px solid ${compBadge.border}`
                          }}>
                            {compBadge.text}
                          </div>
                        </div>

                        {/* Inspect Candidate Activities */}
                        <div style={{ flexShrink: 0 }}>
                          <button
                            type="button"
                            onClick={() => handleInspectCandidate(entry.candidateId || entry.name)}
                            title="Inspect Candidate Exam Performance"
                            style={{
                              background: 'rgba(16, 185, 129, 0.12)',
                              color: '#10b981',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              borderRadius: '8px',
                              padding: '6px 10px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.15s'
                            }}
                          >
                            <span>Activities</span>
                            <span style={{ fontSize: '0.85rem' }}>↗</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                💡 Rankings update automatically as students complete exams.
              </span>
              <button
                onClick={() => setShowLeaderboard(false)}
                style={{
                  padding: '9px 20px',
                  borderRadius: '10px',
                  background: '#10b981',
                  color: '#022c22',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.15s'
                }}
              >
                Close Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Public Dashboard & Activity Modal */}
      {inspectingCandidate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '680px',
            width: '92%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)'
                }}>
                  {inspectingCandidate.name ? inspectingCandidate.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                      {inspectingCandidate.name}
                    </h3>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10b981',
                      border: '1px solid rgba(16, 185, 129, 0.4)'
                    }}>
                      {inspectingCandidate.department || 'Science'} Track
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.88rem' }}>
                    Aspiring for <strong style={{ color: '#fff' }}>{inspectingCandidate.preferredCourse || 'Undergraduate Course'}</strong> at <strong style={{ color: '#fff' }}>{inspectingCandidate.targetInstitution || 'Target University'}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingCandidate(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Performance Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
              <div style={{ background: '#1e293b', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>Target UTME</div>
                <div style={{ color: '#38bdf8', fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>
                  {inspectingCandidate.targetJambScore || 280} / 400
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>Best Score</div>
                <div style={{ color: '#10b981', fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>
                  {inspectingCandidate.bestScaledJambScore || Math.round(((inspectingCandidate.highestScore || 0)/100)*400)} / 400
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>Average %</div>
                <div style={{ color: '#f59e0b', fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>
                  {inspectingCandidate.averagePercentage || 0}%
                </div>
              </div>

              <div style={{ background: '#1e293b', padding: '12px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 600 }}>Tests Taken</div>
                <div style={{ color: '#a855f7', fontSize: '1.25rem', fontWeight: 800, marginTop: '4px' }}>
                  {inspectingCandidate.totalTestsTaken || 0}
                </div>
              </div>
            </div>

            {/* Activities List */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>
                📋 Record of Test Activities
              </h4>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                {inspectingCandidate.recentActivities?.length || 0} session(s) recorded
              </span>
            </div>

            <div style={{ overflowY: 'auto', flex: 1, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '8px', background: '#090d16' }}>
              {inspectingCandidate.loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  <IconSpinner size={24} />
                  <p style={{ marginTop: '8px' }}>Loading candidate activity record...</p>
                </div>
              ) : (!inspectingCandidate.recentActivities || inspectingCandidate.recentActivities.length === 0) ? (
                <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem', fontSize: '0.88rem' }}>
                  No published test activity records found for this candidate yet.
                </p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ color: '#94a3b8', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Exam / Simulation</th>
                      <th style={{ padding: '8px', textAlign: 'left' }}>Track</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>Score</th>
                      <th style={{ padding: '8px', textAlign: 'right' }}>UTME Scale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectingCandidate.recentActivities.map((act, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                        <td style={{ padding: '8px', color: '#64748b' }}>
                          {act.date ? new Date(act.date).toLocaleDateString() : 'Recent'}
                        </td>
                        <td style={{ padding: '8px', color: '#fff', fontWeight: 600 }}>
                          {act.examTitle || act.examType || 'Practice Session'}
                        </td>
                        <td style={{ padding: '8px', color: '#94a3b8' }}>
                          {act.department || 'Science'}
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right', color: '#cbd5e1' }}>
                          {act.score} / {act.totalQuestions} ({Math.round(act.percentage)}%)
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right', color: '#10b981', fontWeight: 800 }}>
                          {act.scaledJambScore} / 400
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setInspectingCandidate(null)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#334155',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Back to Leaderboard
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
