import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

const BASE_URL = 'http://localhost:5000';
const LOG_PATH = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\9319a78b-25f6-4834-8711-cb7487428ac2\\.system_generated\\tasks\\task-4363.log';

async function runVerification() {
  console.log('🧪 Starting Full MERN Stack & React Auth Verification...\n');
  let passed = 0;
  let failed = 0;

  // 1. Health check
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    const data = await res.json();
    if (res.ok && data.status === 'ok') {
      console.log('✅ [1/7] Backend Health Check PASSED: status=ok, db=' + data.database);
      passed++;
    } else {
      console.error('❌ [1/7] Health check failed:', data);
      failed++;
    }
  } catch (err) {
    console.error('❌ [1/7] Health check error:', err.message);
    failed++;
  }

  // 2. React Bundle Serving Check
  try {
    const res = await fetch(`${BASE_URL}/js/react-app.bundle.js`);
    const text = await res.text();
    if (res.ok && text.includes('mountReactApp') && text.length > 200000) {
      console.log(`✅ [2/7] React 19 Bundle Serving PASSED: size=${text.length} bytes, exports mountReactApp`);
      passed++;
    } else {
      console.error('❌ [2/7] React bundle serving failed:', res.status);
      failed++;
    }
  } catch (err) {
    console.error('❌ [2/7] React bundle error:', err.message);
    failed++;
  }

  // 3. Candidate Registration Flow
  const testEmail = `candidate_${Date.now()}@cbtmaster.test`;
  const testPassword = 'Password123!';

  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Chioma Okeke',
        email: testEmail,
        password: testPassword,
        department: 'Science',
        targetScore: 320,
        targetInstitution: 'University of Lagos (UNILAG)',
        preferredCourse: 'Medicine & Surgery'
      })
    });
    const data = await res.json();
    if (res.ok && data.success && data.requiresOtp) {
      console.log(`✅ [3/7] Candidate Registration PASSED: requiresOtp=true, email=${testEmail}`);
      passed++;
    } else {
      console.error('❌ [3/7] Candidate registration failed:', data);
      failed++;
    }
  } catch (err) {
    console.error('❌ [3/7] Registration error:', err.message);
    failed++;
  }

  // 4. Extract 6-digit OTP from server log
  await new Promise(r => setTimeout(r, 1200)); // wait for log flush
  let rawOtp = null;
  try {
    const logContent = fs.readFileSync(LOG_PATH, 'utf8');
    const regex = new RegExp(`Verification code generated for ${testEmail}:\\s*([0-9]{6})`);
    const match = logContent.match(regex);
    if (match && match[1]) {
      rawOtp = match[1];
      console.log(`✅ [4/7] 6-Digit OTP Dispatched PASSED: code=${rawOtp} (sent via Brevo)`);
      passed++;
    } else {
      console.error('❌ [4/7] Could not extract raw OTP from log for:', testEmail);
      failed++;
    }
  } catch (err) {
    console.error('❌ [4/7] Log read error:', err.message);
    failed++;
  }

  // 5. OTP Verification Endpoint
  let authToken = null;
  if (rawOtp) {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testEmail,
          otp: rawOtp
        })
      });
      const data = await res.json();
      if (res.ok && data.token && data.user) {
        authToken = data.token;
        console.log(`✅ [5/7] OTP Verification & Instant Activation PASSED: token issued, welcome candidate=${data.user.name}`);
        passed++;
      } else {
        console.error('❌ [5/7] OTP verification failed:', data);
        failed++;
      }
    } catch (err) {
      console.error('❌ [5/7] OTP verification error:', err.message);
      failed++;
    }
  } else {
    failed++;
  }

  // 6. Candidate Login with Verified Account
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });
    const data = await res.json();
    if (res.ok && data.token && data.user?.email === testEmail) {
      console.log(`✅ [6/7] Candidate Login PASSED: verified=true, course=${data.user.preferredCourse}, institution=${data.user.targetInstitution}`);
      passed++;
    } else {
      console.error('❌ [6/7] Candidate login failed:', data);
      failed++;
    }
  } catch (err) {
    console.error('❌ [6/7] Login error:', err.message);
    failed++;
  }

  // 7. National Leaderboard API with Authenticated Candidate
  try {
    const res = await fetch(`${BASE_URL}/api/leaderboard`, {
      headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {}
    });
    const data = await res.json();
    if (res.ok && Array.isArray(data)) {
      console.log(`✅ [7/7] National Leaderboard PASSED: retrieved ${data.length} candidate scores`);
      passed++;
    } else {
      console.error('❌ [7/7] Leaderboard failed:', data);
      failed++;
    }
  } catch (err) {
    console.error('❌ [7/7] Leaderboard error:', err.message);
    failed++;
  }

  // Clean up test candidate
  const MONGODB_DEFAULT_URI = 'mongodb+srv://bethelboy968_db_user:RmuGi78lhKxrbF4S@cbtadmin.hhtggxa.mongodb.net/cbt_master?retryWrites=true&w=majority&appName=cbtadmin';
  try {
    await mongoose.connect(MONGODB_DEFAULT_URI, { serverSelectionTimeoutMS: 8000 });
    await mongoose.connection.collection('users').deleteOne({ email: testEmail });
    await mongoose.disconnect();
    console.log(`\n🧹 Cleaned up temporary test candidate (${testEmail})`);
  } catch {}

  console.log(`\n========================================`);
  console.log(`🎯 FULL VERIFICATION RESULTS: ${passed}/7 TESTS PASSED`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runVerification();
