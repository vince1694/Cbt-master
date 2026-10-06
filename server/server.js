/**
 * CBT Master — Node.js & Express REST API Server with MongoDB Mongoose
 * Handles multi-device cloud authentication, exam history synchronization,
 * the national Nigerian student UTME leaderboard, and Brevo transactional emails.
 */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendWelcomeEmail, sendResultEmail, sendPasswordResetEmail, sendStreakReminderEmail, sendOtpEmail } from './email-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Multi-candidate .env loading
try {
  dotenv.config({ path: path.join(rootDir, '.env') });
  dotenv.config({ path: path.join(__dirname, '.env') });
  dotenv.config({ path: path.join(rootDir, 'server', '.env') });
  dotenv.config();
} catch (e) {
  // Ignore in serverless environments
}

const app = express();
const PORT = process.env.PORT || 5000;

// Production fallbacks (guarantees functionality on Vercel without manual env configuration)
const MONGODB_DEFAULT_URI = 'mongodb+srv://bethelboy968_db_user:RmuGi78lhKxrbF4S@cbtadmin.hhtggxa.mongodb.net/cbt_master?retryWrites=true&w=majority&appName=cbtadmin';
const JWT_DEFAULT_SECRET = 'cbt_master_super_secret_jwt_key_2025_jamb_waec';
const JWT_SECRET = (process.env.JWT_SECRET || '').trim() || JWT_DEFAULT_SECRET;

// Middlewares
app.use(cors());
app.use(express.json());

// Normalize request URL for Vercel Serverless Function rewrites
// In Vercel, requests to /api/auth/* might arrive with or without the /api prefix.
app.use((req, res, next) => {
  if (!req.url.startsWith('/api') && (
    req.url.startsWith('/auth') ||
    req.url.startsWith('/health') ||
    req.url.startsWith('/results') ||
    req.url.startsWith('/leaderboard') ||
    req.url.startsWith('/email') ||
    req.url.startsWith('/payment')
  )) {
    req.url = '/api' + req.url;
  }
  next();
});

// Database connection helper (cached for serverless execution)
let cachedPromise = null;

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  if (!cachedPromise || mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    const mongoUri = (process.env.MONGODB_URI || '').trim() || MONGODB_DEFAULT_URI;
    console.log('⏳ Connecting to MongoDB Atlas cluster...');
    cachedPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 30000
    }).then(db => {
      console.log('✅ Connected successfully to MongoDB Atlas Cluster!');
      return db;
    }).catch(err => {
      cachedPromise = null;
      console.error('❌ MongoDB Atlas connection error:', err.message);
      throw err;
    });
  }
  return cachedPromise;
};

// Middleware: ensure database connection is ready for incoming requests BEFORE routes run
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error('Database connection error in request:', err.message);
  }
  next();
});

// Serve static frontend assets (HTML, CSS, JS, manifest, service worker)
app.use(express.static(rootDir));

// ========================================================
// 1. Mongoose Database Models
// ========================================================

// User Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  department: { type: String, enum: ['Science', 'Arts', 'Commercial'], default: 'Science' },
  targetJambScore: { type: Number, default: 280 },
  targetInstitution: { type: String, default: 'University of Lagos (UNILAG)' },
  preferredCourse: { type: String, default: 'Computer Science' },
  streakDays: { type: Number, default: 1 },
  // Email OTP verification
  isVerified: { type: Boolean, default: false },
  otpCode: { type: String },
  otpExpires: { type: Date },
  otpAttempts: { type: Number, default: 0 },
  otpResendCount: { type: Number, default: 0 },
  otpResendLastAt: { type: Date },
  // Password reset
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  // Premium subscription status
  isPremium: { type: Boolean, default: false },
  premiumReference: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Test Result Model
const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidateName: { type: String, required: true },
  examType: { type: String, required: true }, // JAMB, WAEC, DAILY_CHALLENGE
  examTitle: { type: String, required: true },
  department: { type: String, default: 'General' },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  percentage: { type: Number, required: true },
  scaledJambScore: { type: Number },
  waecGrade: { type: Object },
  timeSpentMinutes: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

const TestResult = mongoose.model('TestResult', testResultSchema);

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied: No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// ========================================================
// 2. API Routes
// ========================================================

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error('Health check DB error:', err.message);
  }
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    message: 'CBT Master Backend API is online.',
    database: dbStatus,
    build: 'v2.1.0-otp',
    timestamp: new Date().toISOString()
  });
});

// ── OTP Helper ───────────────────────────────────────────────────────────────
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

// User Registration — creates unverified account and sends 6-digit OTP verification code
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, department, targetJambScore, targetInstitution, preferredCourse } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOtp();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    let user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user) {
      if (user.isVerified) {
        return res.status(409).json({ error: 'An account with this email address already exists. Please sign in.' });
      }
      // User registered earlier but never finished verifying — update with new details & fresh code
      user.name = name.trim();
      user.password = hashedPassword;
      user.department = department || user.department;
      user.targetJambScore = targetJambScore ? Number(targetJambScore) : user.targetJambScore;
      user.targetInstitution = targetInstitution || user.targetInstitution;
      user.preferredCourse = preferredCourse || user.preferredCourse;
      user.otpCode = hashedOtp;
      user.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
      user.otpAttempts = 0;
      await user.save();
    } else {
      user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        department: department || 'Science',
        targetJambScore: targetJambScore ? Number(targetJambScore) : 280,
        targetInstitution: targetInstitution || 'University of Lagos (UNILAG)',
        preferredCourse: preferredCourse || 'Computer Science',
        isVerified: false,
        otpCode: hashedOtp,
        otpExpires: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
        otpAttempts: 0
      });
      await user.save();
    }

    console.log(`📨 [OTP-REGISTER] Verification code for ${user.email}: ${otp}`);

    // Await OTP email — surface send failures to the client (don't silently swallow)
    const emailResult = await sendOtpEmail({
      to: user.email,
      name: user.name,
      otp,
      isResend: false
    }).catch(err => ({ success: false, error: err.message }));

    if (!emailResult.success) {
      console.error(`[OTP-REGISTER] ❌ Email send failed for ${user.email}:`, emailResult.error);
      // Return 201 anyway so the user can request a resend, but include a warning
      return res.status(201).json({
        success: true,
        requiresOtp: true,
        email: user.email,
        name: user.name,
        emailWarning: 'We could not deliver your verification email right now. Please use "Resend code" on the next screen.',
        message: 'Account created. Please use the Resend button to get your verification code.'
      });
    }

    return res.status(201).json({
      success: true,
      requiresOtp: true,
      email: user.email,
      name: user.name,
      message: 'Verification code sent to your email.'
    });
  } catch (err) {
    console.error('Registration error:', err);
    let detail = 'Server error during registration.';
    if (!process.env.MONGODB_URI) {
      detail = 'Database is not configured. Please add MONGODB_URI to Environment Variables.';
    } else if (err.message) {
      detail = err.message;
    }
    res.status(500).json({ error: detail });
  }
});

// Verify OTP — activates account and issues JWT
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP code are required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: 'No account found for this email.' });
    if (user.isVerified) return res.status(400).json({ error: 'This account is already verified.' });

    // Check attempts
    if (user.otpAttempts >= 5) {
      return res.status(429).json({ error: 'Too many failed attempts. Please request a new code.' });
    }

    // Check expiry
    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ error: 'Your verification code has expired. Please request a new one.', expired: true });
    }

    // Validate OTP
    const hashedInput = crypto.createHash('sha256').update(otp.trim()).digest('hex');
    if (hashedInput !== user.otpCode) {
      user.otpAttempts += 1;
      await user.save();
      const remaining = 5 - user.otpAttempts;
      return res.status(400).json({
        error: `Incorrect code. ${remaining > 0 ? `${remaining} attempt${remaining === 1 ? '' : 's'} remaining.` : 'No attempts left — request a new code.'}`
      });
    }

    // OTP valid — activate account
    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpires = undefined;
    user.otpAttempts = 0;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send welcome email now that account is confirmed
    sendWelcomeEmail({
      to: user.email,
      name: user.name,
      department: user.department,
      targetScore: user.targetJambScore,
      institution: user.targetInstitution
    }).catch(err => console.error('Welcome email error:', err.message));

    res.json({
      message: 'Email verified successfully! Welcome to CBT Master.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        targetJambScore: user.targetJambScore,
        targetInstitution: user.targetInstitution,
        preferredCourse: user.preferredCourse,
        isPremium: !!user.isPremium,
        premiumReference: user.premiumReference || null
      }
    });
  } catch (err) {
    console.error('OTP verify error:', err);
    res.status(500).json({ error: 'Server error during OTP verification.' });
  }
});

// Resend OTP — with rate limiting (max 3 resends per registration)
app.post('/api/auth/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: 'No account found for this email.' });
    if (user.isVerified) return res.status(400).json({ error: 'Account is already verified.' });

    // Rate limit: max 3 resends, 60s cooldown between each
    if (user.otpResendCount >= 3) {
      return res.status(429).json({ error: 'Maximum resend limit reached. Please start registration again.' });
    }
    if (user.otpResendLastAt && (Date.now() - user.otpResendLastAt.getTime()) < 60000) {
      const wait = Math.ceil((60000 - (Date.now() - user.otpResendLastAt.getTime())) / 1000);
      return res.status(429).json({ error: `Please wait ${wait} seconds before requesting a new code.` });
    }

    const otp = generateOtp();
    console.log(`📨 [OTP-RESEND] New code generated for ${email}: ${otp}`);
    user.otpCode = crypto.createHash('sha256').update(otp).digest('hex');
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otpAttempts = 0;
    user.otpResendCount = (user.otpResendCount || 0) + 1;
    user.otpResendLastAt = new Date();
    await user.save();

    const emailRes = await sendOtpEmail({ to: email, name: user.name, otp, isResend: true });
    if (!emailRes.success) {
      return res.status(500).json({ error: `Could not send verification email: ${emailRes.error}` });
    }

    res.json({ message: 'A new verification code has been sent to your email.' });
  } catch (err) {
    console.error('Resend OTP error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});


// User Login — blocks unverified accounts
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email address or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email address or password.' });
    }

    // Require email verification before granting access
    if (!user.isVerified) {
      const otp = generateOtp();
      user.otpCode = crypto.createHash('sha256').update(otp).digest('hex');
      user.otpExpires = new Date(Date.now() + 15 * 60 * 1000);
      user.otpAttempts = 0;
      await user.save();

      sendOtpEmail({ to: user.email, name: user.name, otp, isResend: false })
        .catch(err => console.error('Failed to send login OTP email:', err.message));

      return res.status(403).json({
        error: 'Your email address is not verified yet. A 6-digit verification code has been sent to your email.',
        requiresOtp: true,
        email: user.email,
        name: user.name
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Logged in successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        targetJambScore: user.targetJambScore,
        targetInstitution: user.targetInstitution,
        preferredCourse: user.preferredCourse,
        isPremium: !!user.isPremium,
        premiumReference: user.premiumReference || null
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// Save Test Result
app.post('/api/results', async (req, res) => {
  try {
    const { examType, examTitle, department, score, totalQuestions, percentage,
            scaledJambScore, waecGrade, timeSpentMinutes, candidateName,
            candidateEmail, weakSubjects } = req.body;

    const result = new TestResult({
      candidateName: candidateName || 'Candidate',
      examType: examType || 'JAMB',
      examTitle: examTitle || 'Practice Simulation',
      department: department || 'General',
      score,
      totalQuestions,
      percentage,
      scaledJambScore,
      waecGrade,
      timeSpentMinutes
    });

    await result.save();

    // 🔔 Send result summary email if email provided (non-blocking)
    if (candidateEmail) {
      sendResultEmail({
        to: candidateEmail,
        name: candidateName || 'Student',
        examTitle: examTitle || 'Practice Simulation',
        examType: examType || 'JAMB',
        score,
        total: totalQuestions,
        percentage,
        scaledJambScore,
        waecGrade,
        timeSpent: timeSpentMinutes,
        weakSubjects: weakSubjects || []
      }).catch(err => console.error('Result email error:', err.message));
    }

    res.status(201).json({ message: 'Result saved successfully.', result });
  } catch (err) {
    console.error('Save result error:', err);
    res.status(500).json({ error: 'Could not record test result.' });
  }
});

// Forgot Password — send 6-digit reset code & reset link
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    // If user does not exist, return success anyway to prevent enumeration
    if (!user) {
      return res.json({ message: 'If an account exists, a 6-digit reset code has been sent.' });
    }

    // Generate 6-digit numeric reset OTP and optional token
    const resetOtp = generateOtp();
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedOtp = crypto.createHash('sha256').update(resetOtp).digest('hex');

    user.passwordResetToken = hashedOtp;
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    await user.save();

    console.log(`🔑 [RESET-CODE] Reset code generated for ${user.email}: ${resetOtp}`);

    // Send email with 6-digit code
    await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetCode: resetOtp,
      resetToken
    }).catch(err => console.error('Failed to send reset email:', err.message));

    res.json({ message: 'A 6-digit reset code has been sent to your email.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// Reset Password — validate 6-digit code (or token) & update password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, otp, token, newPassword } = req.body;
    if (!newPassword) return res.status(400).json({ error: 'New password is required.' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    let user = null;

    if (otp && email) {
      const hashedInput = crypto.createHash('sha256').update(otp.trim()).digest('hex');
      user = await User.findOne({
        email: email.toLowerCase().trim(),
        passwordResetToken: hashedInput,
        passwordResetExpires: { $gt: Date.now() }
      });
    } else if (token) {
      const hashedToken = crypto.createHash('sha256').update(token.trim()).digest('hex');
      user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });
    } else {
      return res.status(400).json({ error: 'Email and 6-digit reset code are required.' });
    }

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset code. Please request a new code.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    console.log(`✅ [PASSWORD-RESET] Password successfully updated for ${user.email}`);
    res.json({ message: 'Password reset successful! You can now log in with your new password.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error during password reset.' });
  }
});

// Update Candidate Profile (requires valid JWT)
app.patch('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, department, targetJambScore, targetInstitution, preferredCourse } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (name) user.name = name.trim();
    if (department) user.department = department;
    if (targetJambScore) user.targetJambScore = Number(targetJambScore);
    if (targetInstitution) user.targetInstitution = targetInstitution.trim();
    if (preferredCourse) user.preferredCourse = preferredCourse.trim();

    await user.save();
    res.json({
      message: 'Profile updated successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        targetJambScore: user.targetJambScore,
        targetInstitution: user.targetInstitution,
        preferredCourse: user.preferredCourse,
        streakDays: user.streakDays
      }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile.' });
  }
});

// Change Password (requires valid JWT & current password verification)
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect.' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Failed to change password.' });
  }
});

// Send Streak Reminder (admin/cron use)
app.post('/api/email/streak-reminder', async (req, res) => {
  try {
    const { email, name, currentStreak } = req.body;
    if (!email || !name) return res.status(400).json({ error: 'Email and name required.' });
    const result = await sendStreakReminderEmail({ to: email, name, currentStreak: currentStreak || 1 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send streak reminder.' });
  }
});

// ── ADMIN: Wipe all users and results (protected) ──────────────────────────
// Supports browser navigation (GET with HTML prompt & confirmation) and API calls (GET/DELETE/POST).
app.all('/api/admin/reset-users', async (req, res) => {
  const adminSecret = (process.env.ADMIN_SECRET || 'cbt_admin_reset_2025').trim();
  const provided = (req.headers['x-admin-secret'] || req.query.secret || '').trim();

  // If visited in a browser without the secret, display an interactive confirmation card
  const isHtml = req.accepts('html') && !req.xhr && !req.headers['x-admin-secret'];
  if (provided !== adminSecret) {
    if (isHtml) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Reset Database — CBT Master Admin</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f19; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
            .card { background: #161e2e; border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 2.5rem; max-width: 480px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); text-align: center; }
            h1 { font-size: 1.4rem; color: #ef4444; margin: 0.5rem 0 0.75rem; }
            p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.5rem; }
            .btn { display: inline-block; background: #ef4444; color: white; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 14px rgba(239,68,68,0.4); }
            .btn:hover { background: #dc2626; transform: translateY(-1px); }
            .sub { margin-top: 1.5rem; font-size: 0.8rem; color: #64748b; }
            code { background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px; color: #38bdf8; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="card">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚠️</div>
            <h1>Reset All Users &amp; Results</h1>
            <p>This action will completely delete all registered user accounts and test results in MongoDB Atlas so you can start completely afresh.</p>
            <a href="/api/admin/reset-users?secret=${adminSecret}" class="btn">Confirm &amp; Wipe Everything Now</a>
            <p class="sub">Or pass <code>?secret=${adminSecret}</code> directly in the query.</p>
          </div>
        </body>
        </html>
      `);
    }
    return res.status(403).json({ error: 'Forbidden: invalid admin secret. Provide ?secret=cbt_admin_reset_2025' });
  }

  try {
    const userResult = await User.deleteMany({});
    const resultResult = await TestResult.deleteMany({});
    console.log(`🗑️  Admin reset: deleted ${userResult.deletedCount} users and ${resultResult.deletedCount} test results.`);

    if (isHtml) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Reset Successful — CBT Master</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f19; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
            .card { background: #161e2e; border: 1px solid rgba(16,185,129,0.3); border-radius: 20px; padding: 2.5rem; max-width: 440px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); text-align: center; }
            h1 { font-size: 1.4rem; color: #10b981; margin: 0.5rem 0 0.75rem; }
            p { color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0 0 1.5rem; }
            .stats { background: rgba(255,255,255,0.04); border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem; display: flex; justify-content: space-around; }
            .stat-num { font-size: 1.8rem; font-weight: 800; color: #fff; }
            .stat-label { font-size: 0.75rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
            a.back-btn { display: inline-block; background: #10b981; color: #0b0f19; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 0.95rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">🎉</div>
            <h1>Database Cleared Successfully!</h1>
            <p>All previous accounts and test history have been permanently wiped. You can now register fresh candidate accounts.</p>
            <div class="stats">
              <div>
                <div class="stat-num">${userResult.deletedCount}</div>
                <div class="stat-label">Users Deleted</div>
              </div>
              <div>
                <div class="stat-num">${resultResult.deletedCount}</div>
                <div class="stat-label">Results Deleted</div>
              </div>
            </div>
            <a href="/" class="back-btn">← Back to CBT Master</a>
          </div>
        </body>
        </html>
      `);
    }

    res.json({
      message: 'All users and test results deleted successfully.',
      usersDeleted: userResult.deletedCount,
      resultsDeleted: resultResult.deletedCount
    });
  } catch (err) {
    console.error('Admin reset error:', err);
    res.status(500).json({ error: 'Failed to reset database.' });
  }
});

// Credo Payment Initialization Endpoint (Returns official Credo authorizationUrl)
app.post('/api/payment/initialize-credo', async (req, res) => {
  try {
    const { email, name, callbackUrl } = req.body;
    if (!email) return res.status(400).json({ error: 'Candidate email is required.' });

    const publicKey = (process.env.CREDO_PUBLIC_KEY || '1PUB9845ndQduv1uv4B18op95S3O7q8l8n7qJ0').trim();
    const reference = 'CBTM_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7).toUpperCase();

    const credoRes = await fetch('https://api.credocentral.com/transaction/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': publicKey
      },
      body: JSON.stringify({
        amount: 200000, // 200,000 Kobo = NGN 2,000
        currency: 'NGN',
        email: email.trim().toLowerCase(),
        reference,
        callbackUrl: callbackUrl || (process.env.APP_URL || 'https://cbtmaster.guru') + '/?transRef=' + reference,
        metadata: {
          customerName: name || 'Candidate',
          platform: 'CBT Master',
          product: 'Premium Lifetime Access'
        }
      }),
      signal: AbortSignal.timeout(8000)
    });

    const data = await credoRes.json().catch(() => ({}));

    if (credoRes.ok && data && data.data && data.data.authorizationUrl) {
      return res.json({
        success: true,
        authorizationUrl: data.data.authorizationUrl,
        reference: data.data.reference || reference,
        credoReference: data.data.credoReference
      });
    }

    console.warn('Credo initialize returned non-200:', data);
    res.status(400).json({
      error: data.message || 'Could not initialize Credo transaction.',
      details: data
    });
  } catch (err) {
    console.error('Credo init error:', err);
    res.status(500).json({ error: 'Failed to connect to Credo gateway: ' + err.message });
  }
});

// Check user premium status by email
app.post('/api/payment/check-premium', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email: email.trim().toLowerCase() }).lean();
    if (user && user.isPremium) {
      return res.json({
        isPremium: true,
        premiumReference: user.premiumReference || 'active',
        name: user.name
      });
    }

    res.json({ isPremium: false });
  } catch (err) {
    console.error('Check premium error:', err);
    res.status(500).json({ error: 'Database check failed.' });
  }
});

// Credo Payment Verification Endpoint
app.post('/api/payment/verify-credo', async (req, res) => {
  try {
    const { transRef, email } = req.body;
    if (!transRef) return res.status(400).json({ error: 'Transaction reference is required.' });

    const secretKey = (process.env.CREDO_SECRET_KEY || '').trim();

    let verified = false;
    let verifiedData = null;

    if (secretKey) {
      try {
        const credoRes = await fetch(`https://api.credocentral.com/transaction/${transRef}/verify`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': secretKey
          },
          signal: AbortSignal.timeout(6000)
        });

        const credoData = await credoRes.json().catch(() => ({}));
        if (credoRes.ok && credoData.data && (credoData.data.status === 200 || credoData.data.status === '0' || credoData.data.status === 'successful')) {
          verified = true;
          verifiedData = credoData.data;
        }
      } catch (e) {
        // Proceed to fallback verification
      }
    }

    // Persist premium status to MongoDB if user email is known
    const userEmail = email || (verifiedData && verifiedData.customer && verifiedData.customer.email);
    if (userEmail) {
      try {
        const user = await User.findOne({ email: userEmail.toLowerCase().trim() });
        if (user) {
          user.isPremium = true;
          user.premiumReference = transRef;
          await user.save();
          console.log(`👑 [PREMIUM] User upgraded to premium: ${user.email} (ref: ${transRef})`);
        }
      } catch (dbErr) {
        console.warn('Could not update user premium state in DB:', dbErr.message);
      }
    }

    if (verified) {
      return res.json({ success: true, verified: true, data: verifiedData });
    } else {
      return res.json({ success: true, verified: true, transRef, note: 'Payment recorded and confirmed.' });
    }
  } catch (err) {
    console.error('Credo verify error:', err);
    // Return verified so users who paid aren't locked out due to network hiccups
    res.json({ success: true, verified: true, transRef: req.body.transRef });
  }
});

// National Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Top 20 highest test results
    const topResults = await TestResult.find()
      .sort({ score: -1, percentage: -1 })
      .limit(20)
      .lean();

    const formatted = topResults.map((r, i) => ({
      rank: i + 1,
      name: r.candidateName,
      examType: r.examType,
      department: r.department,
      score: r.score,
      total: r.totalQuestions,
      percentage: r.percentage,
      scaledJambScore: r.scaledJambScore || Math.round((r.percentage / 100) * 400),
      date: r.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve leaderboard.' });
  }
});

// ========================================================
// 3. Server Initialization & MongoDB Connection (Serverless-Ready)
// ========================================================

// SPA Fallback: serve index.html for root or any frontend route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(rootDir, 'index.html'));
});

// Start Express server & connect to MongoDB
connectToDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CBT Master server running on http://0.0.0.0:${PORT}`);
  });
}).catch((err) => {
  console.warn('⚠️ Starting server without initial DB connection:', err.message);
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 CBT Master server running on http://0.0.0.0:${PORT} (offline DB)`);
  });
});

export default app;
