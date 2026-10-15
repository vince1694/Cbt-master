/**
 * Central Past Questions Engine & Registry
 * Combines Science, Arts, Commercial, and English question banks
 */
import { englishQuestions } from './english.js';
import { scienceQuestions } from './science.js';
import { biologyQuestions } from './biology.js';
import { chemistryQuestions } from './chemistry.js';
import { artsQuestions } from './arts.js';
import { commercialQuestions } from './commercial.js';
import { generalQuestions } from './general.js';
import { novelQuestions } from './novel.js';
import { verifiedArchiveQuestions } from './verified-archive.js';

export const allQuestions = [
  ...englishQuestions,
  ...scienceQuestions,
  ...biologyQuestions,
  ...chemistryQuestions,
  ...artsQuestions,
  ...commercialQuestions,
  ...generalQuestions,
  ...novelQuestions,
  ...verifiedArchiveQuestions
];

export const DEPARTMENTS = {
  Science: {
    name: "Science",
    badge: "🔬 Science Track",
    color: "#10b981",
    description: "Engineering, Medicine, Computer Science, Natural Sciences & Pharmacy",
    jambDefaults: ["Use of English", "Mathematics", "Physics", "Chemistry"],
    subjects: ["Use of English", "Mathematics", "Physics", "Chemistry", "Biology", "Agricultural Science", "Civic Education"]
  },
  Arts: {
    name: "Arts & Humanities",
    badge: "⚖️ Arts Track",
    color: "#8b5cf6",
    description: "Law, Mass Communication, Political Science, International Relations & Theatre Arts",
    jambDefaults: ["Use of English", "Literature in English", "Government", "Christian Religious Studies"],
    subjects: ["Use of English", "Literature in English", "Government", "Christian Religious Studies", "History", "Civic Education"]
  },
  Commercial: {
    name: "Commercial & Social Sciences",
    badge: "📈 Commercial Track",
    color: "#f59e0b",
    description: "Accounting, Economics, Business Administration, Banking & Finance",
    jambDefaults: ["Use of English", "Mathematics", "Economics", "Financial Accounting"],
    subjects: ["Use of English", "Mathematics", "Economics", "Commerce", "Financial Accounting", "Agricultural Science", "Civic Education"]
  }
};

/**
 * Filter questions based on criteria
 */
export function getFilteredQuestions({ exam, department, subject, year }) {
  return allQuestions.filter(q => {
    if (exam && q.exam.toUpperCase() !== exam.toUpperCase()) return false;
    if (subject && q.subject.toLowerCase() !== subject.toLowerCase()) return false;
    if (year && year !== "All" && String(q.year) !== String(year)) return false;
    if (department && !q.department.includes(department)) return false;
    return true;
  });
}

/**
 * Get all unique subjects for a given exam and department
 */
export function getSubjectsForDepartment(departmentName, exam = null) {
  const dept = DEPARTMENTS[departmentName];
  if (!dept) return [];
  if (!exam) return dept.subjects;

  return dept.subjects.filter(subj => {
    return allQuestions.some(q => 
      q.subject.toLowerCase() === subj.toLowerCase() &&
      (!exam || q.exam.toUpperCase() === exam.toUpperCase())
    );
  });
}

/**
 * Generate a 4-Subject JAMB UTME CBT Exam
 * Supports year selection (2011–2026), subject combination, and verified markings
 */
export function createJambSimulation(departmentName, selectedSubjects = null, questionsPerSubject = 10, selectedYear = null) {
  const dept = DEPARTMENTS[departmentName] || DEPARTMENTS.Science;
  const subjectsToUse = selectedSubjects && selectedSubjects.length === 4 
    ? selectedSubjects 
    : dept.jambDefaults;

  let examQuestions = [];
  const isYearSpecific = selectedYear && selectedYear !== "All";

  subjectsToUse.forEach(subj => {
    // 1. First priority: questions matching both subject and selected year
    let pool = allQuestions.filter(q => 
      q.exam === "JAMB" && 
      q.subject.toLowerCase() === subj.toLowerCase() &&
      (!isYearSpecific || String(q.year) === String(selectedYear))
    );

    // 2. If year-specific pool is smaller than requested, supplement with relevant past questions of the same subject
    if (pool.length < questionsPerSubject) {
      const extra = allQuestions.filter(q => 
        q.exam === "JAMB" &&
        q.subject.toLowerCase() === subj.toLowerCase() && 
        !pool.some(item => item.id === q.id)
      );
      pool = [...pool, ...extra];
    }

    // 3. Fallback to any exam for this subject if still insufficient
    if (pool.length < questionsPerSubject) {
      const generalExtra = allQuestions.filter(q =>
        q.subject.toLowerCase() === subj.toLowerCase() &&
        !pool.some(item => item.id === q.id)
      );
      pool = [...pool, ...generalExtra];
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, questionsPerSubject);

    if (picked.length > 0) {
      examQuestions.push(...picked);
    }
  });

  const yearTitle = isYearSpecific ? `(${selectedYear} Past Paper)` : `(${dept.name})`;

  return {
    examType: "JAMB",
    title: `JAMB UTME Simulation ${yearTitle}`,
    year: selectedYear || "Comprehensive",
    department: dept.name,
    subjects: subjectsToUse,
    questions: examQuestions,
    durationMinutes: 60,
    totalQuestions: examQuestions.length
  };
}

/**
 * Generate a single-subject or multi-subject WAEC WASSCE exam
 * Supports year selection (2011–2026) and paper selection
 */
export function createWaecExam(subject, questionsCount = 10, selectedYear = null, selectedPaper = null) {
  const isYearSpecific = selectedYear && selectedYear !== "All";

  let pool = allQuestions.filter(q => {
    if (q.exam !== "WAEC") return false;
    if (q.subject.toLowerCase() !== subject.toLowerCase()) return false;
    if (isYearSpecific && String(q.year) !== String(selectedYear)) return false;
    if (selectedPaper && q.paper && !q.paper.toLowerCase().includes(selectedPaper.toLowerCase())) return false;
    return true;
  });

  // Supplement if needed
  if (pool.length < questionsCount) {
    const extra = allQuestions.filter(q => 
      q.exam === "WAEC" &&
      q.subject.toLowerCase() === subject.toLowerCase() && 
      !pool.some(item => item.id === q.id)
    );
    pool = [...pool, ...extra];
  }

  // Cross-exam fallback if still insufficient
  if (pool.length < questionsCount) {
    const extra2 = allQuestions.filter(q => 
      q.subject.toLowerCase() === subject.toLowerCase() && 
      !pool.some(item => item.id === q.id)
    );
    pool = [...pool, ...extra2];
  }

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  const picked = shuffled.slice(0, questionsCount);
  const yearTitle = isYearSpecific ? `${selectedYear} ` : '';
  const paperTitle = selectedPaper ? ` [${selectedPaper}]` : '';

  return {
    examType: "WAEC",
    title: `WAEC WASSCE ${yearTitle}Past Questions: ${subject}${paperTitle}`,
    year: selectedYear || "Comprehensive",
    paper: selectedPaper || "Paper 1 (Objective)",
    subject: subject,
    questions: picked,
    durationMinutes: 30,
    totalQuestions: picked.length
  };
}

/**
 * Calculate Nigerian WAEC Grade from Percentage Score
 */
export function calculateWaecGrade(scorePercentage) {
  if (scorePercentage >= 75) return { grade: "A1", desc: "Excellent", remark: "Distinction", color: "#10b981" };
  if (scorePercentage >= 70) return { grade: "B2", desc: "Very Good", remark: "Distinction", color: "#10b981" };
  if (scorePercentage >= 65) return { grade: "B3", desc: "Good", remark: "Distinction", color: "#3b82f6" };
  if (scorePercentage >= 60) return { grade: "C4", desc: "Credit", remark: "Credit Pass", color: "#6366f1" };
  if (scorePercentage >= 55) return { grade: "C5", desc: "Credit", remark: "Credit Pass", color: "#8b5cf6" };
  if (scorePercentage >= 50) return { grade: "C6", desc: "Credit", remark: "Credit Pass", color: "#eab308" };
  if (scorePercentage >= 45) return { grade: "D7", desc: "Pass", remark: "Ordinary Pass", color: "#f97316" };
  if (scorePercentage >= 40) return { grade: "E8", desc: "Pass", remark: "Pass", color: "#f97316" };
  return { grade: "F9", desc: "Fail", remark: "Fail", color: "#ef4444" };
}
