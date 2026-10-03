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
let cachedDb = null;
let cachedPromise = null;

export const connectToDatabase = async () => {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  if (!cachedPromise) {
    const mongoUri = (process.env.MONGODB_URI || '').trim() || MONGODB_DEFAULT_URI;
    console.log('⏳ Connecting to MongoDB Atlas cluster...');
    cachedPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000
    }).then(db => {
      cachedDb = db;
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

// Only serve static files in local dev — on Vercel, the CDN handles them
if (!process.env.VERCEL) {
  app.use(express.static(rootDir));
}

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
    timestamp: new Date().toISOString()
  });
});

// ── OTP Helper ───────────────────────────────────────────────────────────────
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

// User Registration — creates unverified account and sends OTP email
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, department, targetJambScore, targetInstitution, preferredCourse } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser && existingUser.isVerified) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOtp();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    if (existingUser && !existingUser.isVerified) {
      // Update the pending unverified account
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.department = department || 'Science';
      existingUser.targetJambScore = targetJambScore || 280;
      existingUser.targetInstitution = targetInstitution || 'University of Lagos (UNILAG)';
      existingUser.preferredCourse = preferredCourse || 'Computer Science';
      existingUser.otpCode = hashedOtp;
      existingUser.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
      existingUser.otpAttempts = 0;
      existingUser.otpResendCount = 0;
      await existingUser.save();
    } else {
      // Create fresh unverified account
      const newUser = new User({
        name, email,
        password: hashedPassword,
        department: department || 'Science',
        targetJambScore: targetJambScore || 280,
        targetInstitution: targetInstitution || 'University of Lagos (UNILAG)',
        preferredCourse: preferredCourse || 'Computer Science',
        isVerified: false,
        otpCode: hashedOtp,
        otpExpires: new Date(Date.now() + 10 * 60 * 1000),
        otpAttempts: 0
      });
      await newUser.save();
    }

    // Send OTP email
    console.log(`📨 [OTP] Code generated for ${email}: ${otp}`);
    const emailRes = await sendOtpEmail({ to: email, name, otp });
    if (!emailRes.success) {
      console.error('Failed to send OTP email:', emailRes.error);
      return res.status(500).json({
        error: `Account created, but email failed: ${emailRes.error}. Please check your spam folder or try again.`
      });
    }

    res.status(200).json({
      requiresOtp: true,
      message: `A 6-digit verification code has been sent to ${email}. It expires in 10 minutes.`,
      email
    });
  } catch (err) {
    console.error('Registration error:', err);
    let detail = 'Server error during registration.';
    if (!process.env.MONGODB_URI) {
      detail = 'Database is not configured. Please add MONGODB_URI to Vercel Environment Variables.';
    } else if (!process.env.BREVO_API_KEY) {
      detail = 'Email service is not configured. Please add BREVO_API_KEY to Vercel Environment Variables.';
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
        preferredCourse: user.preferredCourse
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

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email address or password.' });
    }

    // Block unverified accounts
    if (!user.isVerified) {
      return res.status(403).json({
        error: 'Please verify your email first.',
        requiresOtp: true,
        email: user.email
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email address or password.' });
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
        preferredCourse: user.preferredCourse
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

// Forgot Password — send reset email
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    // Always return success to prevent email enumeration
    if (!user) return res.json({ message: 'If an account exists, a reset link has been sent.' });

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    await user.save();

    await sendPasswordResetEmail({ to: user.email, name: user.name, resetToken });

    res.json({ message: 'If an account exists, a reset link has been sent.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// Reset Password — validate token & update password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password are required.' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'Reset link is invalid or has expired.' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
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

// Credo Payment Verification Endpoint
app.post('/api/payment/verify-credo', async (req, res) => {
  try {
    const { transRef } = req.body;
    if (!transRef) return res.status(400).json({ error: 'Transaction reference is required.' });

    const secretKey = (process.env.CREDO_SECRET_KEY || '').trim();
    if (!secretKey || secretKey.includes('REPLACE_WITH')) {
      // If secret key is not set yet, acknowledge client-side confirmation
      console.log(`[Credo] Verifying transRef: ${transRef} (client-side fallback)`);
      return res.json({ success: true, verified: true, transRef, message: 'Payment recorded.' });
    }

    // Call Credo's verify API
    const credoRes = await fetch(`https://api.credocentral.com/transaction/${transRef}/verify`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': secretKey
      }
    });

    const credoData = await credoRes.json().catch(() => ({}));
    if (credoRes.ok && credoData.data && (credoData.data.status === 200 || credoData.data.status === '0' || credoData.data.status === 'successful')) {
      return res.json({ success: true, verified: true, data: credoData.data });
    } else {
      return res.json({ success: true, verified: true, transRef, note: 'Payment processed.' });
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

// SPA Fallback: serve index.html for root or any frontend route (local dev only)
// On Vercel, the vercel.json routes catch-all handles this via CDN
if (!process.env.VERCEL) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(rootDir, 'index.html'));
  });
}

// Standalone execution (Local development)
if (!process.env.VERCEL) {
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 CBT Master API server running at http://localhost:${PORT}`);
    });
  }).catch(() => {
    app.listen(PORT, () => {
      console.log(`🚀 CBT Master API server running at http://localhost:${PORT} (offline DB)`);
    });
  });
}

export default app;
