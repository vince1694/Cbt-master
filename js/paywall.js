/**
 * Paywall — Premium Access Gate
 * Powered strictly by Credo inline payment gateway (Card, Bank Transfer, USSD).
 * Full mobile-first bottom-sheet design — never hangs.
 */
import { Storage } from './storage.js';
import { Api } from './api.js';

const PREMIUM_AMOUNT_KOBO = 200000;  // NGN 2,000
const PREMIUM_AMOUNT_NGN  = 2000;

const PREMIUM_FEATURES = [
  { icon: '🎯', title: 'Unlimited Mock Exams', desc: 'JAMB + WAEC with real-time timer' },
  { icon: '📊', title: 'Smart Analytics', desc: 'Subject mastery & score trends' },
  { icon: '📚', title: '1,000+ Past Questions', desc: '2016–2024 with explanations' },
  { icon: '📖', title: 'Life Changer Novel Hub', desc: 'Full chapters + 28 practice Q&A' },
  { icon: '📅', title: 'Study Planner', desc: 'Daily targets & countdown timer' },
  { icon: '🏆', title: 'Badges & Achievements', desc: '15+ badges as you progress' },
  { icon: '📐', title: 'Formula & Grammar Vault', desc: 'Equations, concord & mnemonics' },
  { icon: '🏛️', title: 'JAMB Course Guide', desc: '100+ courses with cut-off marks' },
];

function getUserEmail() {
  try { return (localStorage.getItem('cbt_user_email') || Storage.getUserProfile().email || '').trim(); } catch { return ''; }
}
function getUserName() {
  try { return Storage.getUserProfile().name || 'Candidate'; } catch { return 'Candidate'; }
}
function generateRef() {
  return 'CBTM_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6).toUpperCase();
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
    backdrop.setAttribute('aria-label', 'Premium upgrade');

    backdrop.innerHTML = `
      <div class="pw-modal" id="pw-modal-card" role="document">

        <!-- Close -->
        <button class="pw-close-btn" id="pw-close-btn" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <!-- Hero badge -->
        <div class="pw-hero-section">
          <div class="pw-crown-wrap">
            <span class="pw-crown-icon">👑</span>
          </div>
          <h2 class="pw-title">Unlock Premium Access</h2>
          <p class="pw-subtitle">
            <strong>${featureName}</strong> requires Premium.
            Get <strong>lifetime access</strong> for a one-time payment — no subscription ever.
          </p>
        </div>

        <!-- Price banner -->
        <div class="pw-price-banner">
          <div class="pw-price-left">
            <span class="pw-price-main">&#8358;2,000</span>
            <span class="pw-price-tag">One-time &bull; Lifetime access</span>
          </div>
          <div class="pw-price-right">
            <span class="pw-was-price">&#8358;4,000+</span>
            <span class="pw-save-chip">&#10003; 50% off</span>
          </div>
        </div>

        <!-- Features -->
        <ul class="pw-features-grid" id="pw-features-grid">
          ${PREMIUM_FEATURES.map(f => `
            <li class="pw-feat-row">
              <span class="pw-feat-ico">${f.icon}</span>
              <div class="pw-feat-body">
                <strong>${f.title}</strong>
                <span>${f.desc}</span>
              </div>
            </li>
          `).join('')}
        </ul>

        <!-- Candidate Email (for receipt & activation) -->
        <div class="pw-email-box">
          <label for="pw-email-input" class="pw-email-label">Candidate Email (for receipt &amp; account activation)</label>
          <div class="pw-email-input-wrap">
            <svg class="pw-email-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <input type="email" id="pw-email-input" class="pw-email-input" placeholder="candidate@example.com" value="${getUserEmail()}" autocomplete="email" />
          </div>
        </div>

        <!-- Card / Online Payment Box -->
        <div class="pw-panel" id="pw-panel-card" style="margin-top: 1.25rem;">
          <button class="pw-pay-btn" id="pw-pay-btn">
            <span class="pw-pay-ico">🔓</span>
            <span id="pw-pay-btn-text">Pay &#8358;2,000 &amp; Unlock Now</span>
            <span class="pw-pay-spinner hidden" id="pw-pay-spinner">
              <svg class="pw-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </span>
          </button>
          <p class="pw-security-note">
            🔒 Secured by Credo Payments &nbsp;&bull;&nbsp; Instant activation via Card, Transfer &amp; USSD
          </p>
          <div id="pw-gateway-status" class="pw-gateway-status hidden"></div>
        </div>

        <!-- Already paid? -->
        <p class="pw-already-paid">
          Already paid?
          <button class="pw-restore-btn" id="pw-restore-btn">Restore access</button>
        </p>

        <button class="pw-later-btn" id="pw-later-btn">Maybe later</button>

      </div>
    `;

    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add('pw-visible'));

    // ── Email input binding ──────────────────────────────────────────────
    const emailInput = document.getElementById('pw-email-input');
    emailInput?.addEventListener('input', () => {
      const val = emailInput.value.trim();
      if (val) {
        try { localStorage.setItem('cbt_user_email', val); } catch {}
      }
      emailInput.classList.remove('pw-input-error');
    });

    // ── Wire close ───────────────────────────────────────────────────────
    const closeModal = () => {
      backdrop.classList.remove('pw-visible');
      setTimeout(() => backdrop.remove(), 300);
    };
    document.getElementById('pw-close-btn').addEventListener('click', closeModal);
    document.getElementById('pw-later-btn').addEventListener('click', closeModal);
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); }
    });

    // ── Pay button ────────────────────────────────────────────────────────
    document.getElementById('pw-pay-btn').addEventListener('click', () => {
      this._initiateCredo({ onGranted, closeModal });
    });

    // ── Restore access ────────────────────────────────────────────────────
    document.getElementById('pw-restore-btn')?.addEventListener('click', () => {
      this._restoreAccess({ onGranted, closeModal });
    });
  },

  // ── Credo gateway ────────────────────────────────────────────────────────

  _setPayBtnState(loading, message = null) {
    const btn = document.getElementById('pw-pay-btn');
    const txt = document.getElementById('pw-pay-btn-text');
    const spin = document.getElementById('pw-pay-spinner');
    if (!btn) return;
    btn.disabled = loading;
    if (txt) txt.textContent = message || (loading ? 'Opening secure payment…' : 'Pay ₦2,000 & Unlock Now');
    spin?.classList.toggle('hidden', !loading);
    const ico = btn.querySelector('.pw-pay-ico');
    if (ico) ico.style.display = loading ? 'none' : '';
  },

  _showGatewayStatus(msg, type = 'info') {
    const el = document.getElementById('pw-gateway-status');
    if (!el) return;
    el.textContent = msg;
    el.className = `pw-gateway-status pw-status-${type}`;
    el.classList.remove('hidden');
  },

  async _initiateCredo({ onGranted, closeModal }) {
    const emailInput = document.getElementById('pw-email-input');
    const email = (emailInput?.value || getUserEmail()).trim();
    const name  = getUserName();

    if (!email || !email.includes('@')) {
      this._showGatewayStatus('Please enter a valid email address above to proceed.', 'error');
      emailInput?.classList.add('pw-input-error');
      emailInput?.focus();
      return;
    }

    this._setPayBtnState(true, 'Connecting to Credo…');
    this._showGatewayStatus('Initializing secure Credo checkout…', 'info');

    const ref = generateRef();
    let authUrl = null;

    try {
      // 1. Try server endpoint
      const res = await fetch(`${Api._base()}/payment/initialize-credo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, callbackUrl: window.location.origin + '/?transRef=' + ref }),
        signal: AbortSignal.timeout(6000)
      });
      const data = await res.json();
      if (res.ok && data.authorizationUrl) {
        authUrl = data.authorizationUrl;
      }
    } catch {
      // 2. Direct Credo API fallback
      try {
        const pubKey = window.CREDO_PUBLIC_KEY || '1PUB9845ndQduv1uv4B18op95S3O7q8l8n7qJ0';
        const dRes = await fetch('https://api.credocentral.com/transaction/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': pubKey },
          body: JSON.stringify({
            amount: PREMIUM_AMOUNT_KOBO,
            currency: 'NGN',
            email,
            reference: ref,
            metadata: { customerName: name, product: 'CBT Master Lifetime' }
          }),
          signal: AbortSignal.timeout(8000)
        });
        const dData = await dRes.json();
        if (dRes.ok && dData.data && dData.data.authorizationUrl) {
          authUrl = dData.data.authorizationUrl;
        }
      } catch (err) {
        console.warn('Direct Credo init notice:', err);
      }
    }

    this._setPayBtnState(false);

    if (!authUrl) {
      this._showGatewayStatus('Could not reach online payment gateway. Please check your internet connection and try again.', 'warn');
      return;
    }

    // Launch checkout cleanly
    this._showGatewayStatus('Credo checkout opened in new tab! Complete your ₦2,000 payment, then tap Verify below.', 'success');
    window.open(authUrl, '_blank');

    // Update button to Verify
    const btn = document.getElementById('pw-pay-btn');
    const txt = document.getElementById('pw-pay-btn-text');
    if (txt) txt.textContent = '✅ I Have Completed Payment — Verify Now';
    if (btn) {
      btn.onclick = async () => {
        btn.disabled = true;
        if (txt) txt.textContent = 'Verifying payment with gateway…';
        try {
          const vRes = await fetch(`${Api._base()}/payment/verify-credo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transRef: ref, email }),
            signal: AbortSignal.timeout(10000)
          });
          const vData = await vRes.json().catch(() => ({}));
          if (vRes.ok && vData.verified) {
            this._grantPremium({ ref, email, onGranted, closeModal });
          } else {
            btn.disabled = false;
            if (txt) txt.textContent = '✅ I Have Completed Payment — Verify Now';
            this._showGatewayStatus(vData.error || 'Payment was not completed. Full payment of ₦2,000 is required.', 'error');
          }
        } catch {
          btn.disabled = false;
          if (txt) txt.textContent = '✅ I Have Completed Payment — Verify Now';
          this._showGatewayStatus('Could not verify transaction with gateway. Please check your connection and retry.', 'error');
        }
      };
    }
  },

  // ── Script loader ─────────────────────────────────────────────────────────
  _ensureScript(src, readyCheck, timeout = 8000) {
    return new Promise((resolve, reject) => {
      if (readyCheck()) return resolve();
      document.querySelector(`script[src="${src}"]`)?.remove();
      const s = document.createElement('script');
      s.src = src; s.async = true;
      const t = setTimeout(() => { s.onload = s.onerror = null; reject(new Error('timeout')); }, timeout);
      s.onload = () => {
        clearTimeout(t);
        setTimeout(() => { readyCheck() ? resolve() : reject(new Error('not defined')); }, 400);
      };
      s.onerror = () => { clearTimeout(t); reject(new Error('load error')); };
      document.head.appendChild(s);
    });
  },

  // ── Grant premium & sync ──────────────────────────────────────────────────
  _grantPremium({ ref, email, onGranted, closeModal }) {
    Storage.setPremium({ reference: ref, email });

    // Sync to MongoDB
    fetch(`${Api._base()}/payment/verify-credo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transRef: ref, email })
    }).catch(() => {});

    closeModal();
    this._showSuccessToast();
    if (onGranted) setTimeout(onGranted, 700);
  },

  // ── Restore access ────────────────────────────────────────────────────────
  async _restoreAccess({ onGranted, closeModal }) {
    const emailInput = document.getElementById('pw-email-input');
    const email = (emailInput?.value || getUserEmail()).trim();
    if (!email || !email.includes('@')) {
      this._showGatewayStatus('Please enter your email in the field above to restore access.', 'error');
      emailInput?.classList.add('pw-input-error');
      emailInput?.focus();
      return;
    }

    const btn = document.getElementById('pw-restore-btn');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Checking…'; btn.disabled = true;

    try {
      const res = await fetch(`${Api._base()}/payment/check-premium`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: AbortSignal.timeout(8000)
      });
      const data = await res.json();
      if (data.isPremium) {
        Storage.setPremium({ reference: data.premiumReference || 'restored', email });
        closeModal();
        this._showSuccessToast('Premium access restored! 🎉');
        if (onGranted) setTimeout(onGranted, 700);
      } else {
        btn.textContent = 'No premium found';
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
      }
    } catch {
      btn.textContent = orig; btn.disabled = false;
    }
  },

  // ── Toast ─────────────────────────────────────────────────────────────────
  _showSuccessToast(msg = null) {
    const t = document.createElement('div');
    t.className = 'pw-success-toast';
    t.innerHTML = `
      <span class="pw-toast-icon">✓</span>
      <div>
        <strong>Premium Unlocked!</strong>
        <span>${msg || 'Welcome to CBT Master Premium 🎉'}</span>
      </div>
    `;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add('pw-toast-visible'));
    setTimeout(() => { t.classList.remove('pw-toast-visible'); setTimeout(() => t.remove(), 400); }, 4500);
  }
};
