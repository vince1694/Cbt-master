/**
 * CBT Master - Automatic Questions Sync CLI Script
 * Synchronizes authentic past questions from ALOC directly into MongoDB Atlas.
 * Run with: node server/sync-questions.js
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const ALOC_BASE_URL = process.env.ALOC_API_BASE_URL || 'https://dev.aloc.com.ng/api/v1';
const ALOC_TOKEN = process.env.ALOC_API_TOKEN;
const SERVER_URL = `http://localhost:${process.env.PORT || 5000}`;

if (!ALOC_TOKEN) {
  console.error('❌ Error: ALOC_API_TOKEN is not defined in server/.env');
  process.exit(1);
}

const SYNC_TARGETS = [
  // JAMB Subjects
  { subject: 'mathematics', examType: 'jamb', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { subject: 'english-language', examType: 'jamb', years: [2018, 2019, 2020, 2021, 2022, 2023] },
  { subject: 'physics', examType: 'jamb', years: [2019, 2020, 2021, 2022] },
  { subject: 'chemistry', examType: 'jamb', years: [2019, 2020, 2021, 2022] },
  { subject: 'biology', examType: 'jamb', years: [2019, 2020, 2021, 2022] },
  { subject: 'economics', examType: 'jamb', years: [2019, 2020, 2021, 2022] },
  { subject: 'government', examType: 'jamb', years: [2019, 2020, 2021, 2022] }
];

async function runSync() {
  console.log('====================================================');
  console.log('🚀 CBT Master: Starting Verified Questions Sync from ALOC');
  console.log(`📡 ALOC Endpoint: ${ALOC_BASE_URL}`);
  console.log(`🌐 Target Server: ${SERVER_URL}`);
  console.log('====================================================\n');

  let totalInserted = 0;
  let totalSkipped = 0;

  for (const target of SYNC_TARGETS) {
    for (const year of target.years) {
      try {
        process.stdout.write(`⏳ Syncing ${target.examType.toUpperCase()} ${target.subject} (${year})... `);
        const res = await fetch(`${SERVER_URL}/api/questions/sync-aloc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subject: target.subject,
            year,
            examType: target.examType,
            limit: 15
          }),
          signal: AbortSignal.timeout(20000)
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          console.log(`✅ Fetched: ${data.totalFetched}, +Inserted: ${data.inserted}, Skipped: ${data.skipped} (Total in DB: ${data.totalInDb})`);
          totalInserted += (data.inserted || 0);
          totalSkipped += (data.skipped || 0);
        } else {
          console.log(`⚠️ Status ${res.status}: ${data.error || data.details || 'Unknown error'}`);
        }
      } catch (err) {
        console.log(`❌ Timeout/Network: ${err.message}`);
      }

      // 1.5s delay between requests to preserve free tier rate-limit
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log('\n====================================================');
  console.log(`🎉 Sync Completed!`);
  console.log(`📥 Total New Questions Inserted: ${totalInserted}`);
  console.log(`⏭️ Total Existing/Skipped: ${totalSkipped}`);
  console.log('====================================================\n');
}

runSync().catch(console.error);
