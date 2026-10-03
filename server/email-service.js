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
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dotenv = require('dotenv');
// Multi-candidate .env loading
try {
  dotenv.config({ path: path.join(rootDir, '.env') });
  dotenv.config({ path: path.join(__dirname, '.env') });
  dotenv.config({ path: path.join(rootDir, 'server', '.env') });
  dotenv.config();
} catch (e) {
  // Ignore in serverless environments without fs access
}

const { BrevoClient } = require('@getbrevo/brevo');

// ── Brevo Client (lazy — reads env at call time) ──────────────────────────────
let _brevo = null;
function getBrevo() {
  if (!_brevo) {
    const key = (process.env.BREVO_API_KEY || '').trim();
    if (!key) throw new Error('BREVO_API_KEY is not set in environment.');
    _brevo = new BrevoClient({ apiKey: key });
  }
  return _brevo;
}

function getSender() {
  const envSender = (process.env.EMAIL_SENDER_ADDRESS || '').trim();
  // Ensure we NEVER use an unverified/smtp login address such as bc5880001@smtp-brevo.com
  // 2bethel4u@gmail.com is the verified sender in Brevo.
  const senderEmail = (!envSender || envSender.includes('smtp-brevo.com') || envSender.includes('@smtp'))
    ? '2bethel4u@gmail.com'
    : envSender;

  return {
    name: process.env.EMAIL_SENDER_NAME || 'CBT Master',
    email: senderEmail
  };
}

const APP_URL = process.env.APP_URL || 'https://cbtmaster.guru';

// ── Base HTML wrapper ─────────────────────────────────────────────────────────
const baseTemplate = (content, headerBadge = 'OFFICIAL CANDIDATE AUTHENTICATION') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CBT Master Portal</title>
</head>
<body style="margin:0;padding:0;background:#090d16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#090d16;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:14px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.08);">

        <!-- Institutional Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#064e3b 0%,#047857 60%,#059669 100%);padding:28px 36px;border-bottom:3px solid #10b981;text-align:left;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="middle">
                  <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);border-radius:8px;padding:4px 10px;font-size:10px;font-weight:800;letter-spacing:1.5px;color:#d1fae5;text-transform:uppercase;margin-bottom:8px;">
                    ${headerBadge}
                  </div>
                  <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">CBT MASTER</h1>
                  <p style="color:#a7f3d0;margin:4px 0 0;font-size:12px;font-weight:600;letter-spacing:0.5px;">
                    National JAMB UTME &amp; WAEC Examination Preparation Portal
                  </p>
                </td>
                <td width="54" align="right" valign="middle">
                  <div style="width:48px;height:48px;background:rgba(255,255,255,0.15);border:1.5px solid rgba(255,255,255,0.3);border-radius:12px;text-align:center;line-height:48px;font-size:24px;">
                    &#9878;
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0f172a;padding:36px;color:#f8fafc;">
            ${content}
            <div style="border-top:1px solid rgba(255,255,255,0.08);margin:32px 0 20px;"></div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="color:#64748b;font-size:11px;line-height:1.7;">
                  <strong style="color:#94a3b8;">CBT Master Candidate Examination Portal</strong><br>
                  Federal Republic of Nigeria &middot; Automated Candidate Security System<br>
                  This is an official system transmission. Replies to this inbox are not monitored.
                </td>
                <td align="right" valign="bottom" style="color:#475569;font-size:11px;font-family:monospace;">
                  &copy; ${new Date().getFullYear()} CBT Master
                </td>
              </tr>
            </table>
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
  const digits = otp.split('').map(d =>
    `<span style="display:inline-block;background:#090d16;border:1.5px solid #10b981;border-radius:8px;width:46px;height:58px;line-height:58px;text-align:center;font-size:30px;font-weight:800;color:#ffffff;font-family:'Courier New',Courier,monospace;letter-spacing:0;margin:0 4px;box-shadow:0 4px 12px rgba(0,0,0,0.4);">${d}</span>`
  ).join('');

  return baseTemplate(`
    <h2 style="color:#ffffff;font-size:19px;font-weight:700;margin:0 0 10px;letter-spacing:-0.3px;">
      ${isResend ? 'Replacement Verification Passcode' : 'Candidate Identity Verification'}
    </h2>
    <p style="color:#94a3b8;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Hello <strong style="color:#ffffff;">${name || 'Candidate'}</strong>,<br>
      ${isResend
        ? 'A replacement verification passcode has been issued per your request. Enter the official 6-digit authorization code below to authenticate your candidate profile:'
        : 'An account registration request was initiated on the CBT Master examination portal. Enter the official 6-digit authorization code below to complete authentication:'}
    </p>

    <!-- Passcode Display Card -->
    <div style="background:#162032;border:1px solid rgba(16,185,129,0.35);border-radius:12px;padding:28px 20px;text-align:center;margin-bottom:24px;">
      <div style="color:#10b981;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;">
        Official One-Time Passcode (OTP)
      </div>
      <div style="margin-bottom:16px;">${digits}</div>
      <p style="color:#64748b;font-size:12px;font-weight:600;margin:0;">
        &bull; Passcode expires in 10 minutes &bull; Single-use authorization
      </p>
    </div>

    <!-- Security Protocol Advisory -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(15,23,42,0.7);border-left:4px solid #10b981;border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:24px;">
      <tr>
        <td style="color:#94a3b8;font-size:12px;line-height:1.6;">
          <strong style="color:#ffffff;">SECURITY PROTOCOL:</strong> This passcode is confidential. CBT Master invigilators and administrators will never contact you via telephone call, SMS, WhatsApp, or messaging requesting this code. If you did not initiate this registration, please disregard this transmission.
        </td>
      </tr>
    </table>

    <p style="color:#64748b;font-size:12px;line-height:1.6;margin:0;text-align:center;">
      Code not appearing on mobile? Check your <strong style="color:#94a3b8;">Spam</strong> or <strong style="color:#94a3b8;">Promotions</strong> tab.
    </p>
  `, 'CANDIDATE IDENTITY VERIFICATION');
}



async function sendEmail({ to, name, subject, html }) {
  try {
    const brevoPromise = getBrevo().transactionalEmails.sendTransacEmail({
      sender: getSender(),
      to: [{ email: to, name }],
      subject,
      htmlContent: html
    });
    // 8-second timeout to prevent serverless function hangs
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Brevo email API request timed out (8s limit)')), 8000)
    );
    const res = await Promise.race([brevoPromise, timeoutPromise]);
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
      ? `Verification Passcode: ${otp} — CBT Master Portal`
      : `Official Verification Code: ${otp} — CBT Master Portal`,
    html: otpHtml({ name, otp, isResend })
  });
}
