/**
 * Paywall — Premium Access Gate (Rebuilt v3)
 * Dual-gateway: Credo inline widget (primary) + Paystack (secondary fallback)
 * Instant bank-transfer tab shown if both JS gateways fail.
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

        <!-- Tabs: Card/Online | Bank Transfer -->
        <div class="pw-tab-bar" id="pw-tab-bar" role="tablist">
          <button class="pw-tab active" id="pw-tab-card" role="tab" aria-selected="true">
            💳 Card / Online
          </button>
          <button class="pw-tab" id="pw-tab-bank" role="tab" aria-selected="false">
            🏦 Bank Transfer
          </button>
        </div>

        <!-- Panel: Card payment -->
        <div class="pw-panel" id="pw-panel-card">
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
            🔒 Secured by Credo &nbsp;&bull;&nbsp; Card, transfer &amp; USSD accepted
          </p>
          <div id="pw-gateway-status" class="pw-gateway-status hidden"></div>
        </div>

        <!-- Panel: Bank transfer -->
        <div class="pw-panel hidden" id="pw-panel-bank">
          <div class="pw-bank-card">
            <div class="pw-bank-header">
              <span>🏦</span>
              <span>Direct Bank Transfer</span>
            </div>
            <div class="pw-bank-row"><span>Bank</span><strong>Moniepoint MFB</strong></div>
            <div class="pw-bank-row"><span>Account Number</span>
              <strong id="pw-acct-num" class="pw-copyable" title="Tap to copy">8171521965</strong>
            </div>
            <div class="pw-bank-row"><span>Account Name</span><strong>Bethel David</strong></div>
            <div class="pw-bank-row"><span>Amount</span><strong class="pw-highlight">&#8358;2,000 exactly</strong></div>
            <div class="pw-bank-note">
              ⚡ After payment, send your proof via WhatsApp for instant activation.
            </div>
          </div>
          <a
            href="https://wa.me/2348052439479?text=Hi%2C%20I%20just%20paid%20%E2%82%A62%2C000%20for%20CBT%20Master%20Premium.%20Please%20activate%20my%20account%3A%20${encodeURIComponent(getUserEmail())}"
            target="_blank"
            rel="noopener noreferrer"
            class="pw-whatsapp-btn"
            id="pw-whatsapp-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Send Payment Proof on WhatsApp
          </a>
          <p class="pw-activate-note">Activation within 5 minutes during business hours (8am–10pm)</p>
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

    // ── Email input binding & WA link sync ──────────────────────────────
    const emailInput = document.getElementById('pw-email-input');
    const updateWaLink = () => {
      const curEmail = (emailInput?.value || getUserEmail()).trim();
      const waBtn = document.getElementById('pw-whatsapp-btn');
      if (waBtn) {
        waBtn.href = `https://wa.me/2348052439479?text=Hi%2C%20I%20just%20paid%20%E2%82%A62%2C000%20for%20CBT%20Master%20Premium.%20Please%20activate%20my%20account%3A%20${encodeURIComponent(curEmail || 'my account')}`;
      }
    };
    emailInput?.addEventListener('input', () => {
      const val = emailInput.value.trim();
      if (val) {
        try { localStorage.setItem('cbt_user_email', val); } catch {}
      }
      emailInput.classList.remove('pw-input-error');
      updateWaLink();
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

    // ── Tabs ─────────────────────────────────────────────────────────────
    const tabCard = document.getElementById('pw-tab-card');
    const tabBank = document.getElementById('pw-tab-bank');
    const panelCard = document.getElementById('pw-panel-card');
    const panelBank = document.getElementById('pw-panel-bank');

    tabCard.addEventListener('click', () => {
      tabCard.classList.add('active'); tabBank.classList.remove('active');
      tabCard.setAttribute('aria-selected', 'true'); tabBank.setAttribute('aria-selected', 'false');
      panelCard.classList.remove('hidden'); panelBank.classList.add('hidden');
    });
    tabBank.addEventListener('click', () => {
      tabBank.classList.add('active'); tabCard.classList.remove('active');
      tabBank.setAttribute('aria-selected', 'true'); tabCard.setAttribute('aria-selected', 'false');
      panelBank.classList.remove('hidden'); panelCard.classList.add('hidden');
      updateWaLink();
    });

    // ── Copy account number ───────────────────────────────────────────────
    document.getElementById('pw-acct-num')?.addEventListener('click', () => {
      navigator.clipboard?.writeText('8171521965').then(() => {
        const el = document.getElementById('pw-acct-num');
        if (el) { el.textContent = 'Copied! ✓'; setTimeout(() => { el.textContent = '8171521965'; }, 2000); }
      });
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

    this._setPayBtnState(true, 'Loading secure payment…');
    this._showGatewayStatus('Connecting to payment gateway…', 'info');

    try {
      await this._ensureScript('https://pay.credocentral.com/inline.js', () => typeof window.CredoWidget !== 'undefined', 8000);
    } catch {
      this._setPayBtnState(false);
      this._showGatewayStatus('Payment gateway took too long. Trying fallback…', 'warn');
      await new Promise(r => setTimeout(r, 600));
      // Try Paystack as secondary
      this._tryPaystack({ onGranted, closeModal, email, name });
      return;
    }

    this._openCredoWidget({ onGranted, closeModal, email, name });
  },

  _openCredoWidget({ onGranted, closeModal, email, name }) {
    const publicKey = window.CREDO_PUBLIC_KEY;
    if (!publicKey) {
      this._setPayBtnState(false);
      this._showGatewayStatus('Payment key not configured. Please use Bank Transfer tab.', 'error');
      return;
    }

    this._setPayBtnState(false);
    this._showGatewayStatus('');
    let opened = false;

    // Safety timeout
    const guard = setTimeout(() => {
      if (!opened) {
        this._showGatewayStatus('Gateway timed out. Switching to bank transfer.', 'warn');
        document.getElementById('pw-tab-bank')?.click();
      }
    }, 14000);

    try {
      const handler = window.CredoWidget.setup({
        key: publicKey,
        email,
        amount: PREMIUM_AMOUNT_KOBO,
        currency: 'NGN',
        reference: generateRef(),
        channels: ['CARD', 'BANK_TRANSFER', 'USSD'],
        metadata: { customerName: name, platform: 'CBT Master', product: 'Premium (Lifetime)' },
        callBack: (response) => {
          opened = true; clearTimeout(guard);
          console.log('[Paywall] Credo response:', response);
          const ok = response && (response.status === 'success' || response.status === 'PAID'
            || response.status === 200 || response.status === 0
            || String(response.status).toLowerCase() === 'successful');
          if (ok) {
            const ref = response.reference || response.transactionRef || ('credo_' + Date.now());
            this._grantPremium({ ref, email, onGranted, closeModal });
          }
        },
        onClose: () => { opened = true; clearTimeout(guard); }
      });
      handler.openIframe();
      opened = true;
      clearTimeout(guard);
    } catch (err) {
      clearTimeout(guard);
      console.error('[Paywall] Credo error:', err);
      this._showGatewayStatus('Could not open payment window. Use the Bank Transfer tab.', 'error');
      document.getElementById('pw-tab-bank')?.click();
    }
  },

  // ── Paystack fallback ─────────────────────────────────────────────────────
  async _tryPaystack({ onGranted, closeModal, email, name }) {
    const PS_KEY = window.PAYSTACK_PUBLIC_KEY || '';
    if (!PS_KEY) {
      // Skip paystack, go straight to bank transfer
      this._showGatewayStatus('Online payment unavailable. Please use the Bank Transfer tab.', 'warn');
      document.getElementById('pw-tab-bank')?.click();
      return;
    }

    this._setPayBtnState(true, 'Opening Paystack…');
    try {
      await this._ensureScript('https://js.paystack.co/v1/inline.js', () => typeof window.PaystackPop !== 'undefined', 8000);
    } catch {
      this._setPayBtnState(false);
      this._showGatewayStatus('Both payment gateways offline. Use Bank Transfer.', 'error');
      document.getElementById('pw-tab-bank')?.click();
      return;
    }

    this._setPayBtnState(false);
    try {
      const handler = window.PaystackPop.setup({
        key: PS_KEY,
        email,
        amount: PREMIUM_AMOUNT_KOBO,
        currency: 'NGN',
        ref: generateRef(),
        metadata: { name },
        callback: (response) => {
          this._grantPremium({ ref: response.reference, email, onGranted, closeModal });
        },
        onClose: () => {}
      });
      handler.openIframe();
    } catch {
      document.getElementById('pw-tab-bank')?.click();
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
