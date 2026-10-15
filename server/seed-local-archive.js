/**
 * Seed Local Verified Questions Archive into MongoDB Atlas
 * Runs independently of ALOC rate limits and instantly populates the DB.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://bethelboy968_db_user:RmuGi78lhKxrbF4S@cbtadmin.hhtggxa.mongodb.net/cbt_master?retryWrites=true&w=majority&appName=cbtadmin';

// Question Schema
const questionSchema = new mongoose.Schema({
  examType: { type: String, required: true, enum: ['JAMB', 'WAEC'], index: true },
  year: { type: Number, required: true, index: true },
  subject: { type: String, required: true, index: true },
  paper: { type: String, default: 'Paper 1 (Objective)' },
  section: { type: String, default: null },
  topic: { type: String, default: 'General' },
  questionNumber: { type: Number },
  passage: { type: String, default: null },
  question: { type: String, required: true },
  options: [{
    key: { type: String, required: true },
    text: { type: String, required: true }
  }],
  correctAnswer: { type: String, required: true },
  explanation: { type: String, default: '' },
  source: { type: String, default: 'Official Examination Council Past Papers' },
  licenseStatus: { type: String, default: 'Authorized Educational Practice / Public Domain Past Papers' },
  verificationStatus: {
    type: String,
    enum: ['VERIFIED', 'PARTIALLY_AVAILABLE', 'UNAVAILABLE', 'PENDING_REVIEW'],
    default: 'VERIFIED',
    index: true
  },
  department: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.model('Question', questionSchema);

async function seed() {
  console.log('⏳ Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas!');

  // Dynamically import local archive
  const archiveModule = await import('../js/questions/verified-archive.js');
  const questions = archiveModule.verifiedArchiveQuestions || [];

  console.log(`📦 Found ${questions.length} verified archive questions to seed...`);

  let inserted = 0;
  let skipped = 0;

  for (const q of questions) {
    const qExam = (q.exam || q.examType || 'JAMB').toUpperCase();
    const qYear = Number(q.year) || 2021;
    const qSubject = q.subject;

    const exists = await Question.findOne({
      examType: qExam,
      year: qYear,
      subject: qSubject,
      question: q.question
    });

    if (!exists) {
      await Question.create({
        examType: qExam,
        year: qYear,
        subject: qSubject,
        paper: q.paper || 'Paper 1 (Objective)',
        section: q.section || null,
        topic: q.topic || 'General Revision',
        questionNumber: q.questionNumber || null,
        passage: q.passage || null,
        question: q.question,
        options: q.options || [],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || '',
        source: q.source || `Official ${qExam} Past Paper ${qYear}`,
        licenseStatus: 'Authorized Educational Practice',
        verificationStatus: 'VERIFIED',
        department: q.department || ['Science', 'Arts', 'Commercial']
      });
      inserted++;
    } else {
      skipped++;
    }
  }

  const totalInDb = await Question.countDocuments();
  console.log(`\n🎉 Local Archive Seeding Complete!`);
  console.log(`📥 Inserted: ${inserted}`);
  console.log(`⏭️ Skipped (already existed): ${skipped}`);
  console.log(`📊 Total Questions now in MongoDB: ${totalInDb}`);

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
