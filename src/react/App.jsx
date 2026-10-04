import React, { useState, useEffect } from 'react';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { OtpPage } from './pages/OtpPage.jsx';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { authStorage } from './api.js';

export const App = ({ bridgeCallbacks = {} }) => {
  const [currentView, setCurrentView] = useState(() => {
    // Check URL hash first
    const hash = window.location.hash.replace('#', '');
    if (hash === 'signup') return 'signup';
    if (hash === 'forgot' || hash === 'reset') return 'forgot';
    if (hash === 'otp') return 'otp';

    // Check valid session
    const session = authStorage.getSession();
    const token = authStorage.getToken();
    if (session && token) {
      return 'dashboard';
    }
    return 'login';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return authStorage.getProfile();
  });

  const [navParams, setNavParams] = useState({});
  const [toast, setToast] = useState(null);

  // Toast auto-clear
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearInterval(timer);
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleNavigate = (view, params = {}) => {
    setNavParams(params);
    setCurrentView(view);
    window.location.hash = view;
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
    window.location.hash = 'dashboard';
    showToast(`Welcome back, ${user?.name || 'Candidate'}! You are ready to prepare.`);

    // Notify bridge orchestrator if present
    if (bridgeCallbacks.onAuthSuccess) {
      bridgeCallbacks.onAuthSuccess(user);
    }
  };

  const handleLogout = () => {
    authStorage.clearAll();
    setCurrentUser(null);
    setCurrentView('login');
    window.location.hash = 'login';
    showToast('Signed out successfully.', 'info');

    if (bridgeCallbacks.onLogout) {
      bridgeCallbacks.onLogout();
    }
  };

  return (
    <div className="cbt-react-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification Banner */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 99999,
          background: toast.type === 'error' ? '#ef4444' : '#10b981',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '10px',
          fontWeight: 700,
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideIn 0.3s ease'
        }}>
          <span>{toast.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main View Router */}
      <div style={{ flex: 1 }}>
        {currentView === 'login' && (
          <LoginPage
            onNavigate={handleNavigate}
            onAuthSuccess={handleAuthSuccess}
            initialEmail={navParams.email || ''}
          />
        )}

        {currentView === 'signup' && (
          <SignupPage
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'otp' && (
          <OtpPage
            email={navParams.email || authStorage.getUserEmail() || ''}
            name={navParams.name || ''}
            onNavigate={handleNavigate}
            onAuthSuccess={handleAuthSuccess}
          />
        )}

        {currentView === 'forgot' && (
          <ForgotPasswordPage
            onNavigate={handleNavigate}
            initialEmail={navParams.email || ''}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardPage
            user={currentUser}
            onStartJamb={(dept, mode, custom, count) => {
              if (bridgeCallbacks.onStartJamb) {
                bridgeCallbacks.onStartJamb(dept, mode, custom, count);
              }
            }}
            onStartWaec={(subject, mode) => {
              if (bridgeCallbacks.onStartWaec) {
                bridgeCallbacks.onStartWaec(subject, mode);
              }
            }}
            onReviewTest={(testData) => {
              if (bridgeCallbacks.onReviewTest) {
                bridgeCallbacks.onReviewTest(testData);
              }
            }}
            onOpenStudyMode={() => {
              if (bridgeCallbacks.onOpenStudyMode) {
                bridgeCallbacks.onOpenStudyMode();
              }
            }}
            onOpenNovelStudy={() => {
              if (bridgeCallbacks.onOpenNovelStudy) {
                bridgeCallbacks.onOpenNovelStudy();
              }
            }}
            onLogout={handleLogout}
          />
        )}
      </div>

    </div>
  );
};
