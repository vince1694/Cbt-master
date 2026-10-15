/**
 * Payment View — Dedicated Full-Page Premium Checkout (Credo + Bank Transfer)
 *
 * Zero-hang architecture:
 *  - Credo checkout opens in a new tab — never a blocking iframe
 *  - AbortController with hard timeout on every network call
 *  - No `this` binding bugs — all state helpers are module-scoped closures
 *  - Server endpoint → Direct Credo API fallback
 *  - Verification is optimistic: grants premium even on network hiccup
 */
import { Storage } from './storage.js';
import { Api } from './api.js';

const PREMIUM_AMOUNT_KOBO = 200000;
const PREMIUM_AMOUNT_NGN  = 2000;

const PREMIUM_BENEFITS = [
  { icon: '🎯', title: 'Unlimited Mock Exams', desc: 'JAMB UTME & WAEC WASSCE with live timer and scoring' },
  { icon: '📚', title: '1,000+ Past Questions', desc: 'Questions from 2016–2024 with detailed step-by-step explanations' },
  { icon: '📖', title: 'The Life Changer Novel Hub', desc: 'Full chapters, summaries, characters & 28+ practice questions' },
  { icon: '📊', title: 'Diagnostic Analytics', desc: 'Mastery radar charts, weak topic analysis & score trends' },
  { icon: '📅', title: 'Study Planner & Syllabus', desc: 'Daily study goals, revision calendar & target countdown' },
  { icon: '📐', title: 'Formula & Grammar Vault', desc: 'All equations, concord rules & memory mnemonics' },
  { icon: '🏛️', title: 'JAMB Course Guide', desc: 'Subject combinations & cut-off marks for 100+ courses' },
  { icon: '🏆', title: 'Achievement Badges', desc: '15+ unlockable milestones as you study and improve' }
];

function getUserEmail() {
  try {
    return (localStorage.getItem('cbt_user_email') || Storage.getUserProfile().email || '').trim();
  } catch { return ''; }
}

function getUserName() {
  try {
    return Storage.getUserProfile().name || localStorage.getItem('cbt_user_name') || 'Candidate';
  } catch { return 'Candidate'; }
}

function generateRef() {
  return 'CBTM_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7).toUpperCase();
}

/** Module-level toast — no `this` binding needed anywhere */
function showToast(msg = 'Premium Unlocked! 🎉') {
  const t = document.createElement('div');
  t.className = 'pw-success-toast';
  t.innerHTML = `
    <span class="pw-toast-icon">✓</span>
    <div>
      <strong>Premium Unlocked!</strong>
      <span>${msg}</span>
    </div>
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('pw-toast-visible'));
  setTimeout(() => { t.classList.remove('pw-toast-visible'); setTimeout(() => t.remove(), 400); }, 4500);
}

/** fetch() with a hard AbortController timeout — works in all modern browsers */
async function fetchWithTimeout(url, options, ms = 7000) {
  const ctrl = new AbortController();
  const id   = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(id);
  }
}

export const PaymentView = {

  render(container, { onBack, onGranted = null, featureName = 'Premium Access' } = {}) {
    const isAlreadyPremium = Storage.isPremiumActive();
    const currentEmail = getUserEmail();
    const currentName = getUserName();

    container.innerHTML = `
      <div class="payment-page-wrapper">
        <!-- Top Navigation -->
        <div class="payment-topbar">
          <button class="btn-ghost" id="payment-back-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Dashboard
          </button>
          <span class="payment-status-pill ${isAlreadyPremium ? 'status-unlocked' : 'status-locked'}">
            ${isAlreadyPremium ? '👑 Premium Active' : '🔒 Lifetime Upgrade'}
          </span>
        </div>

        ${isAlreadyPremium ? `
          <!-- Already Premium Banner -->
          <div class="payment-unlocked-card">
            <div class="unlocked-icon">🎉</div>
            <h2>You Have Full Lifetime Premium Access!</h2>
            <p>Your account is unlocked for all CBT Master mock exams, past questions, and learning hubs.</p>
            <button class="btn-primary" id="payment-continue-btn" style="margin-top: 1rem;">
              Continue to Dashboard
            </button>
          </div>
        ` : `
          <!-- Header Banner -->
          <div class="payment-hero-banner">
            <div class="payment-hero-badge">
              <span>👑 Lifetime Access</span>
            </div>
            <h1 class="payment-hero-title">Unlock Full CBT Master Premium</h1>
            <p class="payment-hero-sub">
              Get lifetime access to all mock tests, authentic past questions, and novel summaries for a one-time payment of <strong>&#8358;2,000</strong>. No renewals, no monthly fees.
            </p>
          </div>

          <!-- Price & Features Grid -->
          <div class="payment-content-grid">
            <!-- Left: Value Proposition -->
            <div class="payment-benefits-card">
              <div class="payment-price-tag-box">
                <div>
                  <span class="price-val">&#8358;2,000</span>
                  <span class="price-tenure">one-time payment &bull; lifetime validity</span>
                </div>
                <div class="price-discount-badge">
                  <span>50% OFF (Regular &#8358;4,000)</span>
                </div>
              </div>

              <h3 class="benefits-title">What You Get:</h3>
              <ul class="benefits-list">
                ${PREMIUM_BENEFITS.map(b => `
                  <li class="benefit-row">
                    <span class="benefit-ico">${b.icon}</span>
                    <div class="benefit-body">
                      <strong>${b.title}</strong>
                      <p>${b.desc}</p>
                    </div>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Right: Checkout Box -->
            <div class="payment-checkout-card">
              <!-- Tabs -->
              <div class="payment-tab-row" role="tablist">
                <button class="payment-tab active" id="ptab-online" role="tab" aria-selected="true">💳 Pay Online (Card, Bank &amp; USSD)</button>
                <button class="payment-tab" id="ptab-restore" role="tab" aria-selected="false">🔄 Restore Access</button>
              </div>

              <!-- Tab 1: Credo Online Payment -->
              <div class="payment-tab-panel" id="ppanel-online">
                <div class="payment-form-box">
                  <div class="form-group">
                    <label for="p-candidate-email">Email Address <span style="color:#94a3b8;font-weight:400">(for receipt &amp; unlock)</span>:</label>
                    <input type="email" id="p-candidate-email" class="payment-input"
                           value="${currentEmail}" placeholder="e.g. candidate@example.com" autocomplete="email"/>
                  </div>

                  <div class="form-group">
                    <label for="p-candidate-name">Full Name:</label>
                    <input type="text" id="p-candidate-name" class="payment-input"
                           value="${currentName}" placeholder="e.g. Chioma Okeke"/>
                  </div>

                  <button class="payment-cta-btn" id="p-credo-pay-btn">
                    <span class="pv-btn-ico">🔓</span>
                    <span id="p-credo-btn-text">Pay &#8358;2,000 via Credo Online</span>
                    <svg class="pv-spin-svg hidden" id="p-credo-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                  </button>

                  <p class="payment-security-text">
                    🔒 Secured by Credo Payments &bull; Instant activation via Card, USSD &amp; Bank Transfer
                  </p>

                  <!-- Status Banner -->
                  <div id="p-credo-status" class="payment-status-box" style="display:none"></div>

                  <!-- Post-Launch Verification Box (shown once payment checkout is opened) -->
                  <div id="p-verification-area" class="payment-verification-area" style="display:none">
                    <div class="verification-notice">
                      <span class="notice-icon">🌐</span>
                      <div>
                        <strong>Credo Checkout Opened in New Tab</strong>
                        <p>Complete payment on the Credo page, then tap below to activate your account immediately:</p>
                      </div>
                    </div>
                    <button class="payment-verify-btn" id="p-verify-btn">
                      ✅ I Have Completed Payment — Activate Now
                    </button>
                    <div class="reopen-link-wrap">
                      <span>Didn't open?</span>
                      <a href="#" id="p-reopen-link" target="_blank" rel="noopener noreferrer">Tap here to open Credo checkout</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Tab 2: Restore Access -->
              <div class="payment-tab-panel" id="ppanel-restore" style="display:none">
                <div class="restore-panel-box">
                  <h3>Already Purchased?</h3>
                  <p>Enter your registered email to instantly restore lifetime premium on this device:</p>
                  <div class="form-group" style="margin-top:1rem">
                    <label for="p-restore-email">Your Email Address:</label>
                    <input type="email" id="p-restore-email" class="payment-input"
                           value="${currentEmail}" placeholder="e.g. candidate@example.com"/>
                  </div>
                  <button class="payment-cta-btn" id="p-restore-submit-btn" style="margin-top:1rem">
                    🔄 Check &amp; Restore My Premium
                  </button>
                  <div id="p-restore-status" class="payment-status-box" style="display:none;margin-top:1rem"></div>
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    `;

    // ── Wire Top Navigation ──────────────────────────────────────────────────
    document.getElementById('payment-back-btn')?.addEventListener('click', () => {
      if (onBack) onBack();
    });

    document.getElementById('payment-continue-btn')?.addEventListener('click', () => {
      if (onBack) onBack();
    });

    if (isAlreadyPremium) return;

    // ── Wire Tabs ────────────────────────────────────────────────────────────
    // ── Wire Tabs ────────────────────────────────────────────────────────────
    const TABS   = ['ptab-online', 'ptab-restore'];
    const PANELS = ['ppanel-online', 'ppanel-restore'];

    function switchTab(activeTabId) {
      TABS.forEach((id, i) => {
        const t = document.getElementById(id);
        const p = document.getElementById(PANELS[i]);
        const on = id === activeTabId;
        t?.classList.toggle('active', on);
        t?.setAttribute('aria-selected', on ? 'true' : 'false');
        if (p) p.style.display = on ? '' : 'none';
      });
    }

    TABS.forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => switchTab(id));
    });

    const emailInput = document.getElementById('p-candidate-email');
    emailInput?.addEventListener('input', () => {
      const val = emailInput.value.trim();
      if (val) {
        try { localStorage.setItem('cbt_user_email', val); } catch {}
      }
    });

    // ── Credo Online Payment Handler (Zero-Hang) ─────────────────────────────
    let activeTransactionRef = null;

    const showStatus = (msg, type = 'info') => {
      const el = document.getElementById('p-credo-status');
      if (!el) return;
      el.textContent   = msg;
      el.className     = `payment-status-box status-${type}`;
      el.style.display = msg ? '' : 'none';
    };

    const setBtnLoading = (loading) => {
      const btn  = document.getElementById('p-credo-pay-btn');
      const txt  = document.getElementById('p-credo-btn-text');
      const spin = document.getElementById('p-credo-spinner');
      const ico  = btn?.querySelector('.pv-btn-ico');
      if (!btn) return;
      btn.disabled = loading;
      if (txt) txt.textContent = loading ? 'Connecting to Credo…' : 'Pay ₦2,000 via Credo Online';
      spin?.classList.toggle('hidden', !loading);
      if (ico) ico.style.display = loading ? 'none' : '';
    };

    document.getElementById('p-credo-pay-btn')?.addEventListener('click', () => {
      _runCredoInit();
    });

    async function _runCredoInit() {
      const email = (emailInput?.value || getUserEmail()).trim();
      const name  = (document.getElementById('p-candidate-name')?.value || getUserName()).trim();

      if (!email || !email.includes('@')) {
        showStatus('Please enter a valid email address to proceed.', 'error');
        emailInput?.focus();
        return;
      }

      setBtnLoading(true);
      showStatus('Initialising secure Credo checkout…', 'info');

      const ref = generateRef();
      activeTransactionRef = ref;
      let authUrl = null;

      // 1️⃣ Try server backend
      try {
        const res  = await fetchWithTimeout(`${Api._base()}/payment/initialize-credo`, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({ email, name, callbackUrl: window.location.origin + '/?transRef=' + ref })
        }, 7000);
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.authorizationUrl) {
          authUrl   = data.authorizationUrl;
          activeTransactionRef = data.reference || ref;
        }
      } catch (backendErr) {
        console.warn('[PaymentView] backend init failed, trying direct API:', backendErr.message);
      }

      // 2️⃣ Direct Credo API fallback
      if (!authUrl) {
        try {
          const pubKey    = (window.CREDO_PUBLIC_KEY || '1PUB9845ndQduv1uv4B18op95S3O7q8l8n7qJ0').trim();
          const directRes = await fetchWithTimeout('https://api.credocentral.com/transaction/initialize', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': pubKey },
            body   : JSON.stringify({
              amount  : PREMIUM_AMOUNT_KOBO,
              currency: 'NGN',
              email,
              reference: ref,
              metadata: { customerName: name, product: 'CBT Master Lifetime' }
            })
          }, 9000);
          const directData = await directRes.json().catch(() => ({}));
          if (directData?.data?.authorizationUrl) {
            authUrl = directData.data.authorizationUrl;
          }
        } catch (directErr) {
          console.warn('[PaymentView] direct Credo API failed:', directErr.message);
        }
      }

      setBtnLoading(false);

      // 3️⃣ Both failed → graceful fallback
      if (!authUrl) {
        showStatus('Online gateway is temporarily unavailable. Use Bank Transfer or try again shortly.', 'warn');
        switchTab('ptab-bank');
        return;
      }

      // 4️⃣ Open checkout in new tab — NEVER a blocking iframe
      const opened = window.open(authUrl, '_blank');
      showStatus('Credo checkout opened! Complete payment there, then tap the button below.', 'success');

      const verifyArea = document.getElementById('p-verification-area');
      const reopenLink = document.getElementById('p-reopen-link');
      if (verifyArea) verifyArea.style.display = '';
      if (reopenLink) reopenLink.href = authUrl;

      if (!opened) {
        showStatus('Popup blocked — tap the link below to open Credo checkout manually.', 'warn');
      }
    }

    // ── Verify Payment Button ────────────────────────────────────────────────
    document.getElementById('p-verify-btn')?.addEventListener('click', async () => {
      const vBtn  = document.getElementById('p-verify-btn');
      const email = (emailInput?.value || getUserEmail()).trim();
      const ref   = activeTransactionRef || ('CBTM_' + Date.now());

      if (!vBtn) return;
      vBtn.textContent = 'Verifying…';
      vBtn.disabled    = true;

      // Verify with Credo gateway
      try {
        const verifyRes = await fetchWithTimeout(`${Api._base()}/payment/verify-credo`, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({ transRef: ref, email })
        }, 10000);
        const data = await verifyRes.json().catch(() => ({}));

        if (verifyRes.ok && data.verified) {
          Storage.setPremium({ reference: ref, email });
          showToast('Premium Access Activated! Welcome to CBT Master 🎉');
          if (onGranted) setTimeout(onGranted, 600);
          else if (onBack) setTimeout(onBack, 800);
        } else {
          vBtn.textContent = '✅ I Have Completed Payment — Activate Now';
          vBtn.disabled = false;
          showStatus(data.error || 'Payment was not completed. Full payment of ₦2,000 is required.', 'error');
        }
      } catch (err) {
        vBtn.textContent = '✅ I Have Completed Payment — Activate Now';
        vBtn.disabled = false;
        showStatus('Could not verify transaction with gateway. Please check your network and retry.', 'error');
      }
    });

    // ── Restore Access Handler ───────────────────────────────────────────────
    document.getElementById('p-restore-submit-btn')?.addEventListener('click', async () => {
      const rEmailInput = document.getElementById('p-restore-email');
      const email       = (rEmailInput?.value || getUserEmail()).trim();
      const statusEl    = document.getElementById('p-restore-status');
      const rBtn        = document.getElementById('p-restore-submit-btn');

      if (!email || !email.includes('@')) {
        if (statusEl) {
          statusEl.textContent   = 'Please enter your registered email address.';
          statusEl.className     = 'payment-status-box status-error';
          statusEl.style.display = '';
        }
        rEmailInput?.focus();
        return;
      }

      if (rBtn) { rBtn.textContent = 'Checking Database…'; rBtn.disabled = true; }

      try {
        const res  = await fetchWithTimeout(`${Api._base()}/payment/check-premium`, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify({ email })
        }, 8000);
        const data = await res.json().catch(() => ({}));

        if (data.isPremium) {
          Storage.setPremium({ reference: data.premiumReference || 'restored', email });
          if (statusEl) {
            statusEl.textContent   = 'Verified! Lifetime access restored to this device. 🎉';
            statusEl.className     = 'payment-status-box status-success';
            statusEl.style.display = '';
          }
          showToast('Premium access restored! 🎉');
          setTimeout(() => { if (onGranted) onGranted(); else if (onBack) onBack(); }, 900);
        } else {
          if (statusEl) {
            statusEl.textContent   = 'No premium record found. If you paid via Bank Transfer, tap WhatsApp to confirm.';
            statusEl.className     = 'payment-status-box status-warn';
            statusEl.style.display = '';
          }
          if (rBtn) { rBtn.textContent = '🔄 Check & Restore My Premium'; rBtn.disabled = false; }
        }
      } catch {
        if (statusEl) {
          statusEl.textContent   = 'Network error — check your connection and try again.';
          statusEl.className     = 'payment-status-box status-error';
          statusEl.style.display = '';
        }
        if (rBtn) { rBtn.textContent = '🔄 Check & Restore My Premium'; rBtn.disabled = false; }
      }
    });
  },

  /** Exposed so app.js can call PaymentView._showToast(...) on page-load Credo callback */
  _showToast: showToast,
};
