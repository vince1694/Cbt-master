import { Storage } from './storage.js';
import { Icons } from './icons.js';

export const CbtView = {
  render(containerId, engine, { onExamComplete, onExitExam }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const profile = Storage.getUserProfile();
    const candidateNumber = engine.examType === "JAMB"
      ? "2025" + Math.floor(10000000 + Math.random() * 90000000) + "AB"
      : "W25" + Math.floor(1000000 + Math.random() * 9000000);

    // Group questions by subject for subject tabs
    const subjectsMap = {};
    engine.questions.forEach((q, idx) => {
      if (!subjectsMap[q.subject]) {
        subjectsMap[q.subject] = [];
      }
      subjectsMap[q.subject].push(idx);
    });
    const subjectNames = Object.keys(subjectsMap);

    container.innerHTML = `
      <div class="cbt-fullscreen-wrapper" id="cbt-room">
        <!-- CBT Top Header -->
        <header class="cbt-header">
          <div class="cbt-candidate-info">
            <div class="candidate-avatar">
              ${Icons.jambLogo}
            </div>
            <div class="candidate-meta">
              <div class="candidate-name">${profile.name}</div>
              <div class="candidate-reg">Registration: <strong>${candidateNumber}</strong> • ${engine.examType} Console</div>
            </div>
          </div>

          <!-- Countdown Timer -->
          <div class="cbt-timer-container" id="cbt-timer-box">
            <span class="timer-icon" style="display: flex; align-items: center; color: var(--text-secondary);">${Icons.clock}</span>
            <span class="timer-digits" id="cbt-timer-display">${engine.getFormattedTime()}</span>
          </div>

          <!-- Controls: Calculator, Font Sizer, Exit -->
          <div class="cbt-header-tools">
            <button id="cbt-calc-btn" class="cbt-tool-btn" title="Open On-Screen Calculator">
              ${Icons.calc}
              <span>Calc</span>
            </button>

            <div class="font-sizer-tools">
              <button id="font-decrease-btn" class="cbt-tool-btn" title="Decrease font size">A-</button>
              <button id="font-increase-btn" class="cbt-tool-btn" title="Increase font size">A+</button>
            </div>

            <button id="cbt-exit-btn" class="cbt-tool-btn cbt-btn-danger" title="Exit Test">
              Exit
            </button>
          </div>
        </header>
            </button>
          </div>
        </header>

        <!-- Subject Navigation Tabs (e.g., English, Maths, Physics, Chemistry) -->
        <nav class="cbt-subject-tabs" id="cbt-subject-nav">
          ${subjectNames.map((subj, index) => `
            <button class="cbt-subj-tab ${index === 0 ? 'active' : ''}" data-subject="${subj}">
              <span class="subj-name">${subj}</span>
              <span class="subj-progress-pill" id="badge-${subj.replace(/\s+/g, '-')}">
                0/${subjectsMap[subj].length}
              </span>
            </button>
          `).join('')}
        </nav>

        <!-- Main CBT Workspace: Question Pane + Side Palette -->
        <div class="cbt-workspace">
          <!-- Question Pane -->
          <main class="cbt-question-pane" id="cbt-question-content">
            <!-- Dynamic Question Content rendered here -->
          </main>

          <!-- Question Palette / Grid Sidebar -->
          <aside class="cbt-palette-sidebar">
            <div class="palette-header">
              <h4>Question Palette</h4>
              <span class="palette-count" id="palette-count-text">
                ${engine.getSummary().answered} of ${engine.questions.length} answered
              </span>
            </div>

            <div class="palette-legend">
              <span class="legend-item"><span class="legend-dot dot-answered"></span> Answered</span>
              <span class="legend-item"><span class="legend-dot dot-unanswered"></span> Pending</span>
              <span class="legend-item"><span class="legend-dot dot-flagged"></span> Flagged</span>
            </div>

            <div class="palette-grid" id="cbt-palette-grid">
              <!-- Question index buttons generated here -->
            </div>

            <div class="palette-actions">
              <button id="cbt-flag-btn" class="btn-flag">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                <span id="flag-btn-text">Flag for Review</span>
              </button>
            </div>
          </aside>
        </div>

        <!-- CBT Bottom Navigation & 8-Key Instructions -->
        <footer class="cbt-footer">
          <div class="jamb-shortcuts-hint">
            <span class="hint-label">JAMB 8-Key Shortcuts:</span>
            <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd> Select • 
            <kbd>P</kbd> Previous • 
            <kbd>N</kbd> Next • 
            <kbd>R</kbd> Clear • 
            <kbd>S</kbd> Submit
          </div>

          <div class="cbt-nav-btns">
            <button id="cbt-prev-btn" class="btn-nav">
              ← Previous (P)
            </button>
            <button id="cbt-clear-btn" class="btn-nav btn-nav-clear">
              Clear Choice (R)
            </button>
            <button id="cbt-next-btn" class="btn-nav btn-nav-next">
              Next (N) →
            </button>
            <button id="cbt-submit-btn" class="btn-nav btn-nav-submit">
              Submit Exam (S)
            </button>
          </div>
        </footer>

        <!-- Built-in JAMB On-screen Calculator Dialog -->
        <div id="cbt-calculator-modal" class="calc-modal hidden">
          <div class="calc-header">
            <span>JAMB CBT Calculator</span>
            <button id="calc-close-btn" class="calc-close">&times;</button>
          </div>
          <div class="calc-display" id="calc-screen">0</div>
          <div class="calc-keypad">
            <button class="calc-btn op" data-calc="C">C</button>
            <button class="calc-btn op" data-calc="sqrt">√</button>
            <button class="calc-btn op" data-calc="%">%</button>
            <button class="calc-btn op" data-calc="/">÷</button>

            <button class="calc-btn num" data-calc="7">7</button>
            <button class="calc-btn num" data-calc="8">8</button>
            <button class="calc-btn num" data-calc="9">9</button>
            <button class="calc-btn op" data-calc="*">×</button>

            <button class="calc-btn num" data-calc="4">4</button>
            <button class="calc-btn num" data-calc="5">5</button>
            <button class="calc-btn num" data-calc="6">6</button>
            <button class="calc-btn op" data-calc="-">−</button>

            <button class="calc-btn num" data-calc="1">1</button>
            <button class="calc-btn num" data-calc="2">2</button>
            <button class="calc-btn num" data-calc="3">3</button>
            <button class="calc-btn op" data-calc="+">+</button>

            <button class="calc-btn num" data-calc="0">0</button>
            <button class="calc-btn num" data-calc=".">.</button>
            <button class="calc-btn op" data-calc="neg">±</button>
            <button class="calc-btn equal" data-calc="=">=</button>
          </div>
        </div>
      </div>
    `;

    // Hook engine events
    engine.onTick = (formattedTime, remainingSec) => {
      const display = document.getElementById("cbt-timer-display");
      const box = document.getElementById("cbt-timer-box");
      if (display) display.textContent = formattedTime;
      if (box) {
        if (remainingSec <= 300) {
          box.classList.add("timer-urgent");
        } else {
          box.classList.remove("timer-urgent");
        }
      }
    };

    engine.onQuestionChange = (index) => {
      this.renderCurrentQuestion(engine);
      this.updatePalette(engine);
      this.updateSubjectTabs(engine, subjectsMap);
    };

    engine.onSubmit = (result) => {
      if (onExamComplete) onExamComplete(result);
    };

    // Render initial question and palette
    this.renderCurrentQuestion(engine);
    this.updatePalette(engine);
    this.updateSubjectTabs(engine, subjectsMap);
    this.attachCbtEvents(engine, { onExitExam });
    this.initCalculator();
    this.initFontSizer();
  },

  renderCurrentQuestion(engine) {
    const qPane = document.getElementById("cbt-question-content");
    const q = engine.getCurrentQuestion();
    if (!qPane || !q) return;

    const userChoice = engine.userAnswers[q.id];
    const isFlagged = engine.flagged.has(q.id);

    // Update flag button text & active style
    const flagBtn = document.getElementById("cbt-flag-btn");
    const flagText = document.getElementById("flag-btn-text");
    if (flagBtn && flagText) {
      if (isFlagged) {
        flagBtn.classList.add("flagged-active");
        flagText.textContent = "Unflag Question";
      } else {
        flagBtn.classList.remove("flagged-active");
        flagText.textContent = "Flag for Review";
      }
    }

    qPane.innerHTML = `
      <div class="question-meta-bar">
        <div class="q-tags">
          <span class="q-badge q-exam-tag">${q.exam} ${q.year}</span>
          <span class="q-badge q-subject-tag">${q.subject}</span>
          ${q.topic ? `<span class="q-badge q-topic-tag">${q.topic}</span>` : ''}
        </div>
        <div class="q-progress-indicator">
          Question <strong>${engine.currentIndex + 1}</strong> of <strong>${engine.questions.length}</strong>
        </div>
      </div>

      <div class="question-body">
        ${q.passage ? `<div class="question-passage">${q.passage}</div>` : ''}
        <div class="question-text">${q.question.replace(/\n/g, '<br>')}</div>

        <div class="options-container">
          ${q.options.map(opt => {
            const isSelected = userChoice === opt.key;
            return `
              <div class="option-row ${isSelected ? 'selected' : ''}" data-key="${opt.key}">
                <div class="option-key">${opt.key}</div>
                <div class="option-label">${opt.text}</div>
              </div>
            `;
          }).join('')}
        </div>

        ${engine.mode === 'study' ? `
          <div class="study-mode-tutor-box">
            <button id="reveal-solution-btn" class="btn-tutor-reveal">
              💡 ${userChoice ? 'View Detailed Solution' : 'Check Answer & Solution'}
            </button>
            <div id="solution-details" class="solution-details hidden">
              <div class="correct-answer-header">
                Correct Option: <strong class="badge-answer">${q.correctAnswer}</strong>
                ${userChoice ? (userChoice === q.correctAnswer ? ' ✅ Your choice is Correct!' : ' ❌ Your choice was incorrect.') : ''}
              </div>
              <div class="solution-body">
                <strong>Vetted Explanation:</strong><br>
                ${q.explanation.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Option selection click
    const optionRows = qPane.querySelectorAll(".option-row");
    optionRows.forEach(row => {
      row.addEventListener("click", () => {
        const key = row.dataset.key;
        engine.selectOption(key);
      });
    });

    // Study mode reveal button
    const revealBtn = qPane.querySelector("#reveal-solution-btn");
    const solutionDetails = qPane.querySelector("#solution-details");
    if (revealBtn && solutionDetails) {
      revealBtn.addEventListener("click", () => {
        solutionDetails.classList.toggle("hidden");
        revealBtn.textContent = solutionDetails.classList.contains("hidden")
          ? "💡 Check Answer & Solution"
          : "Hide Solution";
      });
    }
  },

  updatePalette(engine) {
    const grid = document.getElementById("cbt-palette-grid");
    const countText = document.getElementById("palette-count-text");
    if (!grid) return;

    const summary = engine.getSummary();
    if (countText) {
      countText.textContent = `${summary.answered} of ${summary.total} answered`;
    }

    grid.innerHTML = engine.questions.map((q, idx) => {
      const isCurrent = idx === engine.currentIndex;
      const isAnswered = Boolean(engine.userAnswers[q.id]);
      const isFlagged = engine.flagged.has(q.id);

      let classes = ["palette-btn"];
      if (isCurrent) classes.push("current");
      if (isAnswered) classes.push("answered");
      if (isFlagged) classes.push("flagged");

      return `
        <button class="${classes.join(' ')}" data-index="${idx}">
          ${idx + 1}
        </button>
      `;
    }).join('');

    const btns = grid.querySelectorAll(".palette-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.index, 10);
        engine.goToIndex(idx);
      });
    });
  },

  updateSubjectTabs(engine, subjectsMap) {
    const currentQ = engine.getCurrentQuestion();
    if (!currentQ) return;

    // Highlight current active subject
    const tabs = document.querySelectorAll(".cbt-subj-tab");
    tabs.forEach(tab => {
      if (tab.dataset.subject === currentQ.subject) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }

      // Update answered count
      const subj = tab.dataset.subject;
      const questionIndices = subjectsMap[subj] || [];
      let answeredCount = 0;
      questionIndices.forEach(qIdx => {
        const q = engine.questions[qIdx];
        if (q && engine.userAnswers[q.id]) answeredCount++;
      });

      const pill = tab.querySelector(".subj-progress-pill");
      if (pill) {
        pill.textContent = `${answeredCount}/${questionIndices.length}`;
      }
    });
  },

  attachCbtEvents(engine, { onExitExam }) {
    // Navigation buttons
    const prevBtn = document.getElementById("cbt-prev-btn");
    const nextBtn = document.getElementById("cbt-next-btn");
    const clearBtn = document.getElementById("cbt-clear-btn");
    const flagBtn = document.getElementById("cbt-flag-btn");
    const submitBtn = document.getElementById("cbt-submit-btn");
    const exitBtn = document.getElementById("cbt-exit-btn");

    if (prevBtn) prevBtn.addEventListener("click", () => engine.goToPrevious());
    if (nextBtn) nextBtn.addEventListener("click", () => engine.goToNext());
    if (clearBtn) clearBtn.addEventListener("click", () => engine.clearOption());
    if (flagBtn) flagBtn.addEventListener("click", () => engine.toggleFlagCurrent());

    // Subject tabs jump to first question of that subject
    const tabs = document.querySelectorAll(".cbt-subj-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetSubject = tab.dataset.subject;
        const targetIndex = engine.questions.findIndex(q => q.subject === targetSubject);
        if (targetIndex !== -1) {
          engine.goToIndex(targetIndex);
        }
      });
    });

    // Exit Exam
    if (exitBtn) {
      exitBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to exit? Your progress in this session will not be graded.")) {
          engine.destroy();
          if (onExitExam) onExitExam();
        }
      });
    }

    // Submit Exam with Confirmation Modal
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        this.openSubmitModal(engine);
      });
    }
  },

  openSubmitModal(engine) {
    const summary = engine.getSummary();
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal-card modal-submit">
        <div class="modal-header">
          <h3>Confirm Examination Submission</h3>
        </div>
        <div class="modal-body">
          <p class="submit-modal-desc">
            You are about to submit your <strong>${engine.examTitle}</strong>. Review your progress summary before finalizing:
          </p>
          <div class="submit-summary-grid">
            <div class="summary-box box-total">
              <span class="num">${summary.total}</span>
              <span class="lbl">Total Questions</span>
            </div>
            <div class="summary-box box-answered">
              <span class="num">${summary.answered}</span>
              <span class="lbl">Answered</span>
            </div>
            <div class="summary-box box-unanswered">
              <span class="num">${summary.unanswered}</span>
              <span class="lbl">Unanswered</span>
            </div>
            <div class="summary-box box-flagged">
              <span class="num">${summary.flagged}</span>
              <span class="lbl">Flagged</span>
            </div>
          </div>
          ${summary.unanswered > 0 ? `
            <div class="alert-unanswered">
              ⚠️ Attention: You have <strong>${summary.unanswered} unanswered</strong> questions!
            </div>
          ` : ''}
        </div>
        <div class="modal-footer">
          <button class="btn-ghost" id="modal-resume-btn">Return to Exam</button>
          <button class="btn-primary btn-submit-final" id="modal-confirm-submit">Yes, Submit Now</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#modal-resume-btn").addEventListener("click", () => modal.remove());
    modal.querySelector("#modal-confirm-submit").addEventListener("click", () => {
      modal.remove();
      engine.submitExam(false);
    });
  },

  initCalculator() {
    const calcBtn = document.getElementById("cbt-calc-btn");
    const calcModal = document.getElementById("cbt-calculator-modal");
    const closeBtn = document.getElementById("calc-close-btn");
    const display = document.getElementById("calc-screen");

    if (!calcBtn || !calcModal) return;

    calcBtn.addEventListener("click", () => {
      calcModal.classList.toggle("hidden");
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        calcModal.classList.add("hidden");
      });
    }

    // Enable smooth dragging of the calculator
    const calcHeader = calcModal.querySelector(".calc-header");
    if (calcHeader) {
      calcHeader.style.cursor = "move";
      let isDragging = false;
      let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;

      calcHeader.addEventListener("mousedown", (e) => {
        if (e.target === closeBtn) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        const rect = calcModal.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        calcModal.style.bottom = "auto";
        calcModal.style.right = "auto";
        calcModal.style.left = `${initialLeft}px`;
        calcModal.style.top = `${initialTop}px`;
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        calcModal.style.left = `${initialLeft + dx}px`;
        calcModal.style.top = `${initialTop + dy}px`;
      });

      window.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }

    let currentVal = "0";
    let pendingOp = null;
    let storedVal = null;
    let resetOnNext = false;

    const updateScreen = () => {
      if (display) display.textContent = currentVal;
    };

    const keys = calcModal.querySelectorAll(".calc-btn");
    keys.forEach(btn => {
      btn.addEventListener("click", () => {
        const val = btn.dataset.calc;

        if (!isNaN(val) || val === ".") {
          if (resetOnNext) {
            currentVal = val === "." ? "0." : val;
            resetOnNext = false;
          } else {
            if (val === "." && currentVal.includes(".")) return;
            currentVal = currentVal === "0" && val !== "." ? val : currentVal + val;
          }
          updateScreen();
        } else if (val === "C") {
          currentVal = "0";
          pendingOp = null;
          storedVal = null;
          resetOnNext = false;
          updateScreen();
        } else if (val === "sqrt") {
          const num = parseFloat(currentVal);
          currentVal = num >= 0 ? Math.sqrt(num).toString() : "Error";
          resetOnNext = true;
          updateScreen();
        } else if (val === "%") {
          currentVal = (parseFloat(currentVal) / 100).toString();
          updateScreen();
        } else if (val === "neg") {
          currentVal = (parseFloat(currentVal) * -1).toString();
          updateScreen();
        } else if (["+", "-", "*", "/"].includes(val)) {
          storedVal = parseFloat(currentVal);
          pendingOp = val;
          resetOnNext = true;
        } else if (val === "=") {
          if (pendingOp && storedVal !== null) {
            const nextVal = parseFloat(currentVal);
            let res = 0;
            switch (pendingOp) {
              case "+": res = storedVal + nextVal; break;
              case "-": res = storedVal - nextVal; break;
              case "*": res = storedVal * nextVal; break;
              case "/": res = nextVal !== 0 ? storedVal / nextVal : "Error"; break;
            }
            currentVal = res.toString();
            pendingOp = null;
            storedVal = null;
            resetOnNext = true;
            updateScreen();
          }
        }
      });
    });
  },

  initFontSizer() {
    const incBtn = document.getElementById("font-increase-btn");
    const decBtn = document.getElementById("font-decrease-btn");
    const qContent = document.getElementById("cbt-question-content");

    let currentFontSize = 16;
    if (incBtn && qContent) {
      incBtn.addEventListener("click", () => {
        if (currentFontSize < 24) {
          currentFontSize += 2;
          qContent.style.fontSize = `${currentFontSize}px`;
        }
      });
    }
    if (decBtn && qContent) {
      decBtn.addEventListener("click", () => {
        if (currentFontSize > 14) {
          currentFontSize -= 2;
          qContent.style.fontSize = `${currentFontSize}px`;
        }
      });
    }
  }
};
