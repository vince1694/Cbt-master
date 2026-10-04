/**
 * Paywall — Premium Access Gate (powered by Credo)
 * Shows a premium upgrade modal and processes payment via Credo inline widget.
 * On success calls Storage.setPremium() to unlock all features permanently.
 *
 * Key info:
 *  - Frontend uses PUBLIC key only (window.CREDO_PUBLIC_KEY set in index.html)
 *  - Secret key lives ONLY on the server (server/.env) for webhook verification
 *  - Credo amounts are in Kobo (smallest unit): NGN 2,000 = 200000 kobo
 */
import { Storage } from './storage.js';
import { Api } from './api.js';

const PREMIUM_AMOUNT_KOBO = 200000;  // NGN 2,000

const PREMIUM_FEATURES = [
  { icon: '🎯', title: 'Unlimited JAMB & WAEC Simulations', desc: 'Full mock exams with real-time timer & scoring' },
  { icon: '📊', title: 'Diagnostic Intelligence Analytics', desc: 'SVG performance curves, subject mastery heat maps' },
  { icon: '📚', title: 'Full Question Bank (1,000+ Q&A)', desc: 'Past questions from 2016-2024 with explanations' },
  { icon: '📖', title: 'The Life Changer Novel Hub', desc: 'All chapters, characters, themes & 28+ practice questions' },
  { icon: '📅', title: 'Personalized Study Planner', desc: 'Daily targets, countdown & syllabus tracker' },
  { icon: '🏆', title: 'Badges & Achievements', desc: 'Unlock 15+ achievement badges as you progress' },
  { icon: '📐', title: 'Formula & Grammar Vault', desc: 'Full cheatsheets: equations, concord rules & mnemonics' },
  { icon: '🏛️', title: 'JAMB Course Guide (100+ courses)', desc: 'O-level requirements, cut-off marks, subject combos' },
];

function getUserEmail() {
  try {
    return (localStorage.getItem('cbt_user_email') || Storage.getUserProfile().email || '').trim();
  } catch {
    return '';
  }
}
function getUserName() {
  try { return Storage.getUserProfile().name || 'Candidate'; } catch { return 'Candidate'; }
}
function generateRef() {
  return 'CBTM_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

export const Paywall = {
  isActive() {
    return Storage.isPremiumActive();
  },

  require(onGranted, featureName = 'this feature') {
    if (this.isActive()) { onGranted(); return; }
    this.showModal(onGranted, featureName);
  },

  showModal(onGranted = null, featureName = 'this feature') {
    document.getElementById('paywall-modal-backdrop')?.remove();
    const backdrop = document.createElement('div');
    backdrop.id = 'paywall-modal-backdrop';
    backdrop.className = 'pw-backdrop';
    backdrop.setAttribute('role', 'dialog');
    backdrop.setAttribute('aria-modal', 'true');

    backdrop.innerHTML = `
      <div class="pw-modal" id="pw-modal-card">
        <button class="pw-close-btn" id="pw-close-btn" aria-label="Close">&times;</button>

        <div class="pw-header">
          <div class="pw-crown">&#128081;</div>
          <div class="pw-header-text">
            <h2 class="pw-title">Unlock Full Premium Access</h2>
            <p class="pw-subtitle">
              <strong>${featureName}</strong> is a premium feature.
              Get <strong>lifetime access</strong> to everything CBT Master offers for a one-time payment.
            </p>
          </div>
        </div>

        <div class="pw-price-row">
          <div class="pw-price-badge">
            <span class="pw-price-amount">&#8358;2,000</span>
            <span class="pw-price-label">One-time &bull; Lifetime Access</span>
          </div>
          <div class="pw-competitor-note">
            <span class="pw-strike">Competitors charge &#8358;4,000+</span>
            <span class="pw-saving">&#10003; You save 50%</span>
          </div>
        </div>

        <ul class="pw-features-list" id="pw-features-list">
          ${PREMIUM_FEATURES.map(f => `
            <li class="pw-feature-item">
              <span class="pw-feat-icon">${f.icon}</span>
              <div class="pw-feat-text">
                <strong>${f.title}</strong>
                <span>${f.desc}</span>
              </div>
            </li>
          `).join('')}
        </ul>

        <div class="pw-cta-section">
          <button class="pw-pay-btn" id="pw-pay-btn">
            <span class="pw-pay-icon">&#128275;</span>
            <span>Pay &#8358;2,000 &amp; Unlock Now</span>
          </button>
          <p class="pw-security-note">
            &#128274; Secured by Credo &nbsp;&bull;&nbsp; Card, bank transfer &amp; USSD accepted
          </p>
          <button class="pw-later-btn" id="pw-later-btn">Maybe later</button>
        </div>

        <div class="pw-loading-overlay hidden" id="pw-loading-overlay">
          <div class="pw-spinner"></div>
          <p>Opening secure payment&hellip;</p>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add('pw-visible'));

    const closeModal = () => {
      backdrop.classList.remove('pw-visible');
      setTimeout(() => backdrop.remove(), 300);
    };

    document.getElementById('pw-close-btn').addEventListener('click', closeModal);
    document.getElementById('pw-later-btn').addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    const esc = (e) => { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); } };
    document.addEventListener('keydown', esc);

    document.getElementById('pw-pay-btn').addEventListener('click', () => {
      this._initiateCredo({ onGranted, closeModal });
    });
  },

  _initiateCredo({ onGranted, closeModal }) {
    const email = getUserEmail();
    const name  = getUserName();
    const loadingEl = document.getElementById('pw-loading-overlay');

    if (!email) {
      alert('Could not find your email. Please log out and log back in, then try again.');
      return;
    }

    if (loadingEl) {
      loadingEl.classList.remove('hidden');
      const p = loadingEl.querySelector('p');
      if (p) p.textContent = 'Loading secure payment…';
    }

    // Ensure Credo script is loaded — retry loading it if CredoWidget is undefined
    this._ensureCredoScript().then(() => {
      this._openCredoWidget({ onGranted, closeModal, email, name, loadingEl });
    }).catch(() => {
      if (loadingEl) loadingEl.classList.add('hidden');
      this._showPaymentFallback({ closeModal });
    });
  },

  _ensureCredoScript() {
    return new Promise((resolve, reject) => {
      // Already loaded
      if (typeof window.CredoWidget !== 'undefined') {
        return resolve();
      }

      // Remove any broken/stale script tag first
      const existing = document.querySelector('script[src*="credocentral.com"]');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.src = 'https://pay.credocentral.com/inline.js';
      script.async = true;

      const timeout = setTimeout(() => {
        script.onload = null;
        script.onerror = null;
        reject(new Error('Credo script load timeout'));
      }, 8000);

      script.onload = () => {
        clearTimeout(timeout);
        // Give the script a tick to define CredoWidget
        setTimeout(() => {
          if (typeof window.CredoWidget !== 'undefined') resolve();
          else reject(new Error('CredoWidget not defined after load'));
        }, 300);
      };
      script.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('Credo script failed to load'));
      };

      document.head.appendChild(script);
    });
  },

  _openCredoWidget({ onGranted, closeModal, email, name, loadingEl }) {
    const publicKey = window.CREDO_PUBLIC_KEY;
    if (!publicKey || publicKey.includes('REPLACE')) {
      if (loadingEl) loadingEl.classList.add('hidden');
      console.warn('[Paywall] Credo public key not set.');
      this._showPaymentFallback({ closeModal });
      return;
    }

    // Safety timeout — if widget doesn't open within 12s, show fallback
    let widgetOpened = false;
    const safetyTimer = setTimeout(() => {
      if (!widgetOpened) {
        console.warn('[Paywall] Credo widget timed out — showing fallback');
        if (loadingEl) loadingEl.classList.add('hidden');
        this._showPaymentFallback({ closeModal });
      }
    }, 12000);

    try {
      console.log('[Paywall] Opening Credo widget with key:', publicKey.substring(0, 8) + '...');
      const handler = window.CredoWidget.setup({
        key: publicKey,
        email: email,
        amount: PREMIUM_AMOUNT_KOBO,
        currency: 'NGN',
        reference: generateRef(),
        channels: ['CARD', 'BANK_TRANSFER', 'USSD'],
        metadata: {
          customerName: name,
          platform: 'CBT Master',
          product: 'Premium Access (Lifetime)'
        },
        callBack: (response) => {
          widgetOpened = true;
          clearTimeout(safetyTimer);
          if (loadingEl) loadingEl.classList.add('hidden');
          console.log('[Paywall] Credo callBack response:', response);
          if (response && (response.status === 'success' || response.status === 'PAID' || response.status === 200 || response.status === 0)) {
            const transRef = response.reference || response.transactionRef || ('credo_' + Date.now());
            Storage.setPremium({ reference: transRef, email });

            // Persist premium status to MongoDB in cloud
            fetch(`${Api._base()}/payment/verify-credo`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ transRef, email })
            }).catch(e => console.warn('[Paywall] Cloud verification sync notice:', e));

            closeModal();
            this._showSuccessToast();
            if (onGranted) setTimeout(onGranted, 700);
          } else {
            console.warn('[Paywall] Credo payment not completed:', response);
          }
        },
        onClose: () => {
          widgetOpened = true;
          clearTimeout(safetyTimer);
          if (loadingEl) loadingEl.classList.add('hidden');
        }
      });

      if (loadingEl) loadingEl.classList.add('hidden');
      handler.openIframe();
      widgetOpened = true;
      clearTimeout(safetyTimer);
    } catch (err) {
      clearTimeout(safetyTimer);
      if (loadingEl) loadingEl.classList.add('hidden');
      console.error('[Paywall] Credo widget error:', err);
      this._showPaymentFallback({ closeModal });
    }
  },


  _showPaymentFallback({ closeModal }) {
    const section = document.querySelector('.pw-cta-section');
    if (!section) return;
    const featureList = document.getElementById('pw-features-list');
    if (featureList) featureList.style.display = 'none';

    section.innerHTML = `
      <div class="pw-fallback-box">
        <h3>&#128179; Pay via Bank Transfer</h3>
        <p>Our secure checkout could not load. Use any option below and we will activate your account:</p>
        <div class="pw-alt-option">
          <strong>Bank Transfer</strong>
          <span>Bank: <em>Contact us for bank details</em></span>
          <span>Amount: <strong>&#8358;2,000</strong></span>
        </div>
        <div class="pw-alt-option">
          <strong>WhatsApp Activation</strong>
          <span>Send proof to <a href="https://wa.me/2348000000000" target="_blank" rel="noopener">+234 800 000 0000</a></span>
          <span>We activate within 5 minutes.</span>
        </div>
        <button class="pw-later-btn" id="pw-alt-close">Close</button>
      </div>
    `;
    document.getElementById('pw-alt-close')?.addEventListener('click', closeModal);
  },

  _showSuccessToast() {
    const t = document.createElement('div');
    t.className = 'pw-success-toast';
    t.innerHTML = `
      <span class="pw-toast-icon">&#10003;</span>
      <div><strong>Premium Unlocked!</strong><span>Welcome to CBT Master Premium &#127881;</span></div>
    `;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('pw-toast-visible'));
    setTimeout(() => { t.classList.remove('pw-toast-visible'); setTimeout(() => t.remove(), 400); }, 4500);
  }
};
