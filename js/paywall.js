/**
 * Paywall — Premium Access Gate
 * Shows a stunning upgrade modal and processes payment via Paystack.
 * On success it calls Storage.setPremium() to unlock all features.
 */
import { Storage } from './storage.js';

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
  try { return (localStorage.getItem('cbt_user_email') || '').trim(); } catch { return ''; }
}
function getUserName() {
  try { return Storage.getUserProfile().name || 'Candidate'; } catch { return 'Candidate'; }
}

export const Paywall = {
  isActive() { return Storage.isPremiumActive(); },

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
          <div class="pw-crown">👑</div>
          <div class="pw-header-text">
            <h2 class="pw-title">Unlock Full Premium Access</h2>
            <p class="pw-subtitle">
              <strong>${featureName}</strong> is a premium feature.
              Get <strong>lifetime access</strong> to everything CBT Master offers.
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
            &#128274; Secured by Paystack &nbsp;&bull;&nbsp; Card, bank transfer &amp; USSD accepted
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
      this._initiatePaystack({ onGranted, closeModal });
    });
  },

  _initiatePaystack({ onGranted, closeModal }) {
    const email = getUserEmail();
    const name  = getUserName();
    const loadingEl = document.getElementById('pw-loading-overlay');

    if (!email) {
      alert('Could not find your email. Please log out and log back in, then try again.');
      return;
    }
    if (loadingEl) loadingEl.classList.remove('hidden');

    if (typeof window.PaystackPop === 'undefined') {
      if (loadingEl) loadingEl.classList.add('hidden');
      this._showPaymentFallback({ onGranted, closeModal });
      return;
    }

    try {
      const handler = window.PaystackPop.setup({
        key: window.PAYSTACK_PUBLIC_KEY || 'pk_live_REPLACE_WITH_YOUR_KEY',
        email,
        amount: 200000,
        currency: 'NGN',
        ref: 'CBTM_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        metadata: {
          custom_fields: [
            { display_name: 'Customer Name', variable_name: 'customer_name', value: name },
            { display_name: 'Platform', variable_name: 'platform', value: 'CBT Master' }
          ]
        },
        callback: (response) => {
          if (loadingEl) loadingEl.classList.add('hidden');
          if (response && response.reference) {
            Storage.setPremium({ reference: response.reference, email });
            closeModal();
            this._showSuccessToast();
            if (onGranted) setTimeout(onGranted, 700);
          }
        },
        onClose: () => {
          if (loadingEl) loadingEl.classList.add('hidden');
        }
      });
      handler.openIframe();
    } catch (err) {
      if (loadingEl) loadingEl.classList.add('hidden');
      console.error('[Paywall] Paystack error:', err);
      this._showPaymentFallback({ onGranted, closeModal });
    }
  },

  _showPaymentFallback({ onGranted, closeModal }) {
    const section = document.querySelector('.pw-cta-section');
    if (!section) return;
    document.getElementById('pw-features-list').style.display = 'none';
    section.innerHTML = `
      <div class="pw-fallback-box">
        <h3>&#128179; Alternative Payment</h3>
        <p>Paystack could not load. Use one of these options:</p>
        <div class="pw-alt-option">
          <strong>Bank Transfer</strong>
          <span>Bank: <em>GTBank</em></span>
          <span>Account: <code>0123456789</code> — CBT Master Platform</span>
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
    setTimeout(() => { t.classList.remove('pw-toast-visible'); setTimeout(() => t.remove(), 400); }, 4000);
  }
};
