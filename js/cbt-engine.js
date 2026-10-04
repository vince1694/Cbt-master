/**
 * CBT Engine for JAMB UTME & WAEC WASSCE
 * Powers exam timers, question navigation, 8-key shortcuts, on-screen calculator, scoring, and review
 */
import { Storage } from './storage.js';
import { Api } from './api.js';
import { calculateWaecGrade } from './questions/index.js';
import { SoundFX } from './sound-fx.js';

export class CbtEngine {
  constructor(options = {}) {
    this.questions = options.questions || [];
    this.mode = options.mode || "cbt"; // "cbt" or "study"
    this.examType = options.examType || "JAMB"; // "JAMB" or "WAEC"
    this.department = options.department || "Science";
    this.examTitle = options.examTitle || "CBT Practice Examination";
    this.durationSeconds = (options.durationMinutes || 45) * 60;
    this.timeLeftSeconds = this.durationSeconds;
    
    this.currentIndex = 0;
    this.userAnswers = {}; // { [questionId]: "A" | "B" | "C" | "D" }
    this.flagged = new Set();
    this.timerInterval = null;
    this.status = "idle"; // "idle", "running", "paused", "submitted"
    this.startTime = null;
    this.endTime = null;

    // Callbacks
    this.onTick = options.onTick || null;
    this.onQuestionChange = options.onQuestionChange || null;
    this.onSubmit = options.onSubmit || null;

    // Audio synthesizer for CBT audio feedback
    this.audioCtx = null;
  }

  init() {
    this.status = "running";
    this.startTime = Date.now();
    this.startTimer();
    this.setupKeyboardShortcuts();
  }

  // Play subtle feedback sound using Web Audio API
  playSound(type = "click") {
    const settings = Storage.getSettings();
    if (!settings.soundEnabled) return;

    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === "click") {
        osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.08);
      } else if (type === "flag") {
        osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.12);
      } else if (type === "finish") {
        osc.frequency.setValueAtTime(523.25, this.audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, this.audioCtx.currentTime + 0.2); // E5
        gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.35);
      }
    } catch {
      // Audio not supported or blocked
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.status !== "running") return;
      this.timeLeftSeconds--;

      if (this.onTick) {
        this.onTick(this.getFormattedTime(), this.timeLeftSeconds);
      }

      // 5-minute remaining warning sound
      if (this.timeLeftSeconds === 300) {
        SoundFX.playTimerAlert();
      }

      if (this.timeLeftSeconds <= 0) {
        this.submitExam(true); // Auto-submit when time is up
      }
    }, 1000);
  }

  getFormattedTime() {
    const hours = Math.floor(this.timeLeftSeconds / 3600);
    const minutes = Math.floor((this.timeLeftSeconds % 3600) / 60);
    const seconds = this.timeLeftSeconds % 60;

    const pad = n => n.toString().padStart(2, "0");
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  selectOption(key) {
    if (this.status === "submitted") return;
    const q = this.getCurrentQuestion();
    if (!q) return;

    this.userAnswers[q.id] = key;
    this.playSound("click");
    if (this.onQuestionChange) this.onQuestionChange(this.currentIndex);
  }

  clearOption() {
    if (this.status === "submitted") return;
    const q = this.getCurrentQuestion();
    if (!q) return;
    delete this.userAnswers[q.id];
    this.playSound("click");
    if (this.onQuestionChange) this.onQuestionChange(this.currentIndex);
  }

  toggleFlagCurrent() {
    const q = this.getCurrentQuestion();
    if (!q) return;
    if (this.flagged.has(q.id)) {
      this.flagged.delete(q.id);
    } else {
      this.flagged.add(q.id);
    }
    this.playSound("flag");
    if (this.onQuestionChange) this.onQuestionChange(this.currentIndex);
  }

  goToNext() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.playSound("click");
      if (this.onQuestionChange) this.onQuestionChange(this.currentIndex);
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.playSound("click");
      if (this.onQuestionChange) this.onQuestionChange(this.currentIndex);
    }
  }

  goToIndex(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      this.playSound("click");
      if (this.onQuestionChange) this.onQuestionChange(this.currentIndex);
    }
  }

  // Setup JAMB 8-key shortcuts (A, B, C, D, P, N, S, R)
  setupKeyboardShortcuts() {
    this.keyHandler = (e) => {
      // Ignore if user is inside an input box or calculator
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (this.status !== "running") return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        e.preventDefault();
        this.selectOption(key);
      } else if (key === 'N') {
        e.preventDefault();
        this.goToNext();
      } else if (key === 'P') {
        e.preventDefault();
        this.goToPrevious();
      } else if (key === 'R') {
        e.preventDefault();
        this.clearOption();
      } else if (key === 'S') {
        e.preventDefault();
        // Trigger submit confirmation modal
        const submitBtn = document.getElementById("cbt-submit-btn");
        if (submitBtn) submitBtn.click();
      }
    };

    window.addEventListener("keydown", this.keyHandler);
  }

  destroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.keyHandler) window.removeEventListener("keydown", this.keyHandler);
  }

  getSummary() {
    let answered = 0;
    let unanswered = 0;
    let flaggedCount = this.flagged.size;

    this.questions.forEach(q => {
      if (this.userAnswers[q.id]) {
        answered++;
      } else {
        unanswered++;
      }
    });

    return {
      total: this.questions.length,
      answered,
      unanswered,
      flagged: flaggedCount
    };
  }

  submitExam(autoSubmit = false) {
    if (this.status === "submitted") return;
    this.status = "submitted";
    this.endTime = Date.now();
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.playSound("finish");

    const timeSpentSeconds = this.durationSeconds - this.timeLeftSeconds;
    const timeSpentMinutes = Math.max(1, Math.round(timeSpentSeconds / 60));

    // Calculate score
    let correctCount = 0;
    const subjectBreakdown = {};

    this.questions.forEach(q => {
      const userChoice = this.userAnswers[q.id] || null;
      const isCorrect = userChoice === q.correctAnswer;

      if (isCorrect) correctCount++;

      // Subject stats
      if (!subjectBreakdown[q.subject]) {
        subjectBreakdown[q.subject] = { total: 0, correct: 0, percentage: 0 };
      }
      subjectBreakdown[q.subject].total++;
      if (isCorrect) subjectBreakdown[q.subject].correct++;
    });

    // Compute subject percentages
    Object.keys(subjectBreakdown).forEach(subj => {
      const data = subjectBreakdown[subj];
      data.percentage = Math.round((data.correct / data.total) * 100);
    });

    const scorePercentage = this.questions.length > 0
      ? Math.round((correctCount / this.questions.length) * 100)
      : 0;

    // Scaled JAMB score (Scale to 400 marks)
    const scaledJambScore = this.questions.length > 0
      ? Math.round((correctCount / this.questions.length) * 400)
      : 0;

    // WAEC Grade
    const waecGrade = calculateWaecGrade(scorePercentage);

    const result = {
      examType: this.examType,
      examTitle: this.examTitle,
      department: this.department,
      totalQuestions: this.questions.length,
      score: correctCount,
      percentage: scorePercentage,
      scaledJambScore,
      waecGrade,
      timeSpentMinutes,
      autoSubmitted: autoSubmit,
      subjectBreakdown,
      userAnswers: this.userAnswers,
      questions: this.questions
    };

    // Save to persistent storage locally
    Storage.saveTestResult(result);

    // Sync to cloud MongoDB + trigger student result summary email
    try {
      Api.saveResult(result).catch(e => console.warn('[CBT Engine] Cloud result sync notice:', e));
    } catch {
      // Offline fallback already secured in Storage
    }

    if (this.onSubmit) {
      this.onSubmit(result);
    }

    return result;
  }
}
