/**
 * CBT Master — Brevo Email Service
 * Uses the @getbrevo/brevo v2 SDK (BrevoClient) to send transactional emails.
 * Uses createRequire to load the CJS package from our ESM server context.
 *
 * Email types:
 *  - Welcome / Registration confirmation
 *  - Test Result summary (JAMB / WAEC)
 *  - Password Reset
 *  - Daily Streak reminder
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dotenv = require('dotenv');
dotenv.config(); // ensure .env is loaded even when imported before server.js calls it
const { BrevoClient } = require('@getbrevo/brevo');

// ── Brevo Client (lazy — reads env at call time) ──────────────────────────────
let _brevo = null;
function getBrevo() {
  if (!_brevo) {
    const key = process.env.BREVO_API_KEY;
    if (!key) throw new Error('BREVO_API_KEY is not set in environment.');
    _brevo = new BrevoClient({ apiKey: key });
  }
  return _brevo;
}

function getSender() {
  return {
    name: process.env.EMAIL_SENDER_NAME || 'CBT Master',
    // Must match a verified sender in Brevo account (2bethel4u@gmail.com)
    email: process.env.EMAIL_SENDER_ADDRESS || '2bethel4u@gmail.com'
  };
}

const APP_URL = process.env.APP_URL || 'http://localhost:5500';

// ── Base HTML wrapper ─────────────────────────────────────────────────────────
const baseTemplate = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CBT Master</title>
</head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#6c63ff 0%,#f64f59 100%);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
            <div style="font-size:36px;margin-bottom:8px;">&#128218;</div>
            <h1 style="color:#fff;margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;">CBT Master</h1>
            <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;">Nigeria's #1 JAMB &amp; WAEC Practice Platform</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#1a1a2e;padding:40px;border-radius:0 0 16px 16px;">
            ${content}
            <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:32px 0;">
            <p style="color:rgba(255,255,255,0.3);font-size:11px;text-align:center;margin:0;line-height:1.7;">
              CBT Master &middot; Nigeria JAMB &amp; WAEC Practice<br>
              &copy; ${new Date().getFullYear()} CBT Master. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

// ── Template helpers ──────────────────────────────────────────────────────────

function welcomeHtml({ name, department, targetScore, institution }) {
  return baseTemplate(`
    <h2 style="color:#fff;font-size:22px;font-weight:700;margin:0 0 8px;">Welcome aboard, ${name}! &#127881;</h2>
    <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;margin:0 0 24px;">
      Your CBT Master account is ready. Practice JAMB UTME &amp; WAEC past questions with
      real exam simulations, detailed analytics, and a national leaderboard.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      <tr>
        <td width="33%" style="padding:4px;">
          <div style="background:rgba(108,99,255,0.15);border:1px solid rgba(108,99,255,0.3);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:22px;">&#127979;</div>
            <div style="color:rgba(255,255,255,0.45);font-size:10px;margin:4px 0 2px;text-transform:uppercase;letter-spacing:1px;">Department</div>
            <div style="color:#fff;font-size:13px;font-weight:600;">${department || 'Science'}</div>
          </div>
        </td>
        <td width="33%" style="padding:4px;">
          <div style="background:rgba(246,79,89,0.15);border:1px solid rgba(246,79,89,0.3);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:22px;">&#127919;</div>
            <div style="color:rgba(255,255,255,0.45);font-size:10px;margin:4px 0 2px;text-transform:uppercase;letter-spacing:1px;">Target Score</div>
            <div style="color:#fff;font-size:13px;font-weight:600;">${targetScore || 280}/400</div>
          </div>
        </td>
        <td width="33%" style="padding:4px;">
          <div style="background:rgba(0,200,150,0.15);border:1px solid rgba(0,200,150,0.3);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:22px;">&#127963;</div>
            <div style="color:rgba(255,255,255,0.45);font-size:10px;margin:4px 0 2px;text-transform:uppercase;letter-spacing:1px;">Target School</div>
            <div style="color:#fff;font-size:11px;font-weight:600;">${(institution || 'UNILAG').split('(')[0].trim()}</div>
          </div>
        </td>
      </tr>
    </table>
    <div style="text-align:center;margin-bottom:24px;">
      <a href="${APP_URL}" style="display:inline-block;background:linear-gradient(135deg,#6c63ff,#f64f59);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-weight:700;font-size:15px;">
        &#128640; Start Practising Now
      </a>
    </div>
    <p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.8;margin:0;">
      <strong style="color:rgba(255,255,255,0.8);">Quick tips:</strong><br>
      &#9989; Try the <strong>Daily Challenge</strong> every day<br>
      &#9989; Run a full <strong>JAMB Mock Exam</strong><br>
      &#9989; Check <strong>Analytics</strong> for weak subjects<br>
      &#9989; Compete on the <strong>National Leaderboard</strong>
    </p>
  `);
}

function resultHtml({ name, examTitle, examType, score, total, percentage, scaledJambScore, timeSpent, weakSubjects }) {
  const pct = Math.min(Math.max(percentage, 0), 100);
  const gradeColor = pct >= 80 ? '#00c896' : pct >= 60 ? '#6c63ff' : pct >= 50 ? '#f5a623' : '#f64f59';
  const gradeLabel = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Good' : pct >= 50 ? 'Average' : 'Needs Work';

  const jambBlock = examType === 'JAMB' ? `
    <div style="background:rgba(108,99,255,0.1);border:1px solid rgba(108,99,255,0.25);border-radius:12px;padding:16px;text-align:center;margin:16px 0;">
      <div style="color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:1px;">Scaled JAMB Score</div>
      <div style="color:#6c63ff;font-size:40px;font-weight:800;">${scaledJambScore || Math.round((pct / 100) * 400)}</div>
      <div style="color:rgba(255,255,255,0.4);font-size:12px;">out of 400</div>
    </div>` : '';

  const weakBlock = weakSubjects && weakSubjects.length ? `
    <div style="margin-top:20px;">
      <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:0 0 8px;">&#128204; <strong>Focus areas:</strong></p>
      ${weakSubjects.map(s => `<span style="display:inline-block;background:rgba(246,79,89,0.15);border:1px solid rgba(246,79,89,0.3);color:#f64f59;font-size:12px;padding:4px 12px;border-radius:50px;margin:3px;">${s}</span>`).join('')}
    </div>` : '';

  return baseTemplate(`
    <h2 style="color:#fff;font-size:20px;font-weight:700;margin:0 0 4px;">&#128202; Your Result is Ready, ${name}!</h2>
    <p style="color:rgba(255,255,255,0.45);font-size:13px;margin:0 0 24px;">${examTitle}</p>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;">
      <div style="color:rgba(255,255,255,0.6);font-size:13px;margin-bottom:4px;">Score &mdash; <span style="color:${gradeColor};font-weight:700;">${gradeLabel}</span></div>
      <div style="color:#fff;font-size:34px;font-weight:800;">${score} / ${total}</div>
      <div style="background:rgba(255,255,255,0.08);border-radius:50px;height:10px;margin:10px 0 14px;overflow:hidden;">
        <div style="background:${gradeColor};width:${pct}%;height:100%;border-radius:50px;"></div>
      </div>
      <div style="color:rgba(255,255,255,0.5);font-size:13px;">${pct}% correct &middot; &#9201; ${timeSpent || '&mdash;'} mins</div>
    </div>
    ${jambBlock}
    ${weakBlock}
    <div style="text-align:center;margin-top:28px;">
      <a href="${APP_URL}" style="display:inline-block;background:linear-gradient(135deg,#6c63ff,#f64f59);color:#fff;text-decoration:none;padding:13px 32px;border-radius:50px;font-weight:700;font-size:14px;">
        View Full Analytics
      </a>
    </div>
  `);
}

function resetHtml({ name, resetLink }) {
  return baseTemplate(`
    <h2 style="color:#fff;font-size:20px;font-weight:700;margin:0 0 8px;">&#128272; Reset Your Password</h2>
    <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;margin:0 0 24px;">
      Hi ${name}, click the button below to reset your CBT Master password.
      This link expires in <strong style="color:#f5a623;">15 minutes</strong>.
    </p>
    <div style="text-align:center;margin:28px 0;">
      <a href="${resetLink}" style="display:inline-block;background:linear-gradient(135deg,#f5a623,#f64f59);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-weight:700;font-size:15px;">
        &#128273; Reset My Password
      </a>
    </div>
    <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:0;">
      If you didn't request this, ignore this email &mdash; your account is safe.
    </p>
  `);
}

function streakHtml({ name, currentStreak }) {
  return baseTemplate(`
    <h2 style="color:#fff;font-size:20px;font-weight:700;margin:0 0 8px;">&#128293; Don't Break Your ${currentStreak}-Day Streak, ${name}!</h2>
    <p style="color:rgba(255,255,255,0.7);font-size:15px;line-height:1.7;margin:0 0 24px;">
      You haven't practised today yet. Just 5 minutes keeps your streak alive.
    </p>
    <div style="background:rgba(245,166,35,0.1);border:1px solid rgba(245,166,35,0.3);border-radius:14px;padding:20px;text-align:center;margin-bottom:24px;">
      <div style="font-size:42px;">&#128293;</div>
      <div style="color:#f5a623;font-size:36px;font-weight:800;">${currentStreak} Days</div>
      <div style="color:rgba(255,255,255,0.45);font-size:13px;">current streak &mdash; protect it!</div>
    </div>
    <div style="text-align:center;">
      <a href="${APP_URL}" style="display:inline-block;background:linear-gradient(135deg,#f5a623,#f64f59);color:#fff;text-decoration:none;padding:14px 36px;border-radius:50px;font-weight:700;font-size:15px;">
        &#9889; Take Today's Challenge
      </a>
    </div>
  `);
}

// ── Template: OTP Verification ───────────────────────────────────────────────
function otpHtml({ name, otp, isResend }) {
  // Split OTP into individual digits for the big display boxes
  const digits = otp.split('').map(d =>
    `<span style="display:inline-block;background:rgba(108,99,255,0.15);border:2px solid rgba(108,99,255,0.4);border-radius:12px;width:44px;height:56px;line-height:56px;text-align:center;font-size:28px;font-weight:800;color:#a78bfa;font-family:'JetBrains Mono',monospace;margin:0 3px;">${d}</span>`
  ).join('');

  return baseTemplate(`
    <h2 style="color:#fff;font-size:20px;font-weight:700;margin:0 0 6px;">
      ${isResend ? '📨 Here is your new code,' : '📨 Verify your email,'} ${name}!
    </h2>
    <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.7;margin:0 0 24px;">
      ${isResend
        ? 'You requested a new verification code. Enter it on the CBT Master signup screen.'
        : 'Enter this 6-digit code to complete your registration. It expires in <strong style="color:#f5a623;">10 minutes</strong>.'}
    </p>

    <!-- OTP Display -->
    <div style="background:rgba(108,99,255,0.08);border:1px solid rgba(108,99,255,0.2);border-radius:16px;padding:28px 20px;text-align:center;margin-bottom:24px;">
      <p style="color:rgba(255,255,255,0.45);font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;">Your Verification Code</p>
      <div style="margin-bottom:16px;">${digits}</div>
      <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0;">&#9201; Expires in 10 minutes</p>
    </div>

    <!-- Security Note -->
    <div style="background:rgba(246,79,89,0.08);border:1px solid rgba(246,79,89,0.2);border-radius:12px;padding:14px 16px;margin-bottom:24px;">
      <p style="color:rgba(255,255,255,0.6);font-size:12px;line-height:1.6;margin:0;">
        &#128274; <strong style="color:rgba(255,255,255,0.8);">Security notice:</strong>
        CBT Master will never ask for this code via phone or chat.
        If you did not create this account, ignore this email.
      </p>
    </div>

    <p style="color:rgba(255,255,255,0.4);font-size:12px;text-align:center;margin:0;">
      Didn't receive it? Check your spam folder or use the resend button on the app.
    </p>
  `);
}



async function sendEmail({ to, name, subject, html }) {
  try {
    const res = await getBrevo().transactionalEmails.sendTransacEmail({
      sender: getSender(),
      to: [{ email: to, name }],
      subject,
      htmlContent: html
    });
    // v2 SDK returns data directly (not wrapped in .body)
    const messageId = res?.messageId || res?.body?.messageId || 'sent';
    console.log(`📧 Email sent → ${to} | "${subject}"`);
    return { success: true, messageId };
  } catch (err) {
    console.error(`❌ Email failed → ${to}:`, err?.message || err);
    return { success: false, error: err?.message || String(err) };
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

export async function sendWelcomeEmail({ to, name, department, targetScore, institution }) {
  return sendEmail({
    to, name,
    subject: `Welcome to CBT Master, ${name}! Your journey starts now 🚀`,
    html: welcomeHtml({ name, department, targetScore, institution })
  });
}

export async function sendResultEmail({ to, name, examTitle, examType, score, total, percentage, scaledJambScore, waecGrade, timeSpent, weakSubjects }) {
  return sendEmail({
    to, name,
    subject: `📊 ${examType} result: ${score}/${total} (${percentage}%) — ${examTitle}`,
    html: resultHtml({ name, examTitle, examType, score, total, percentage, scaledJambScore, timeSpent, weakSubjects })
  });
}

export async function sendPasswordResetEmail({ to, name, resetToken }) {
  const resetLink = `${APP_URL}/reset-password?token=${resetToken}`;
  return sendEmail({
    to, name,
    subject: '🔐 Reset your CBT Master password',
    html: resetHtml({ name, resetLink })
  });
}

export async function sendStreakReminderEmail({ to, name, currentStreak }) {
  return sendEmail({
    to, name,
    subject: `🔥 ${name}, your ${currentStreak}-day streak is at risk!`,
    html: streakHtml({ name, currentStreak })
  });
}

export async function sendOtpEmail({ to, name, otp, isResend = false }) {
  return sendEmail({
    to, name,
    subject: isResend
      ? `📨 New verification code: ${otp} — CBT Master`
      : `📨 Your CBT Master verification code: ${otp}`,
    html: otpHtml({ name, otp, isResend })
  });
}
