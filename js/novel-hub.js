/**
 * Novel Study Hub — "The Life Changer" & "Sweet Sixteen"
 * Interactive study page with chapter summaries, characters, themes, and practice quiz
 */
import { novelQuestions } from './questions/novel.js';
import { Storage } from './storage.js';

export const NovelHub = {

  render(containerId, { onBack, onStartQuiz }) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const bookmarks = Storage.getBookmarks();

    container.innerHTML = `
      <div class="novel-hub-wrapper">

        <!-- Back bar -->
        <div class="novel-hub-topbar">
          <button class="btn-ghost novel-back-btn" id="novel-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back to Dashboard
          </button>
          <div class="novel-hub-badge">
            <span class="badge-dot"></span>
            JAMB Compulsory Novel · 2022–2025
          </div>
        </div>

        <!-- Hero -->
        <section class="novel-hero">
          <div class="novel-hero-book">
            <div class="book-cover">
              <div class="book-spine"></div>
              <div class="book-front">
                <div class="book-title-area">
                  <div class="book-star">★ JAMB UTME</div>
                  <h2>The Life Changer</h2>
                  <p>Khadija Abubakar Jalli</p>
                </div>
                <div class="book-bottom-band">
                  <span>Compulsory Novel · All Departments</span>
                </div>
              </div>
            </div>
          </div>
          <div class="novel-hero-info">
            <div class="novel-hero-tag">📖 JAMB Compulsory Novel — 2022, 2023, 2024 &amp; 2025</div>
            <h1 class="novel-hero-title">The Life Changer</h1>
            <p class="novel-hero-author">by <strong>Dr. Khadija Abubakar Jalli</strong></p>
            <p class="novel-hero-desc">
              A powerful story of university life in Nigeria — told through a mother's wisdom to her daughters.
              Explore the dangers of moral weakness, the beauty of integrity, and education as the ultimate life changer.
            </p>
            <div class="novel-hero-stats">
              <div class="novel-stat">
                <span class="novel-stat-n">${novelQuestions.filter(q => q.topic && q.topic.includes('Life Changer')).length}</span>
                <span class="novel-stat-l">Practice Questions</span>
              </div>
              <div class="novel-stat">
                <span class="novel-stat-n">5</span>
                <span class="novel-stat-l">Core Themes</span>
              </div>
              <div class="novel-stat">
                <span class="novel-stat-n">8</span>
                <span class="novel-stat-l">Key Characters</span>
              </div>
              <div class="novel-stat">
                <span class="novel-stat-n">2022–25</span>
                <span class="novel-stat-l">JAMB Years</span>
              </div>
            </div>
            <div class="novel-hero-actions">
              <button class="btn-primary novel-quiz-btn" id="novel-quiz-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Start Practice Quiz (${novelQuestions.filter(q=>q.topic&&q.topic.includes('Life Changer')).length} Questions)
              </button>
              <button class="btn-outline" id="novel-ss-quiz-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Sweet Sixteen Quiz
              </button>
            </div>
          </div>
        </section>

        <!-- Tab Navigation -->
        <div class="novel-tabs" id="novel-tabs">
          <button class="novel-tab active" data-tab="summary">📋 Summary</button>
          <button class="novel-tab" data-tab="characters">👥 Characters</button>
          <button class="novel-tab" data-tab="themes">💡 Themes</button>
          <button class="novel-tab" data-tab="pastqs">📝 Past Questions</button>
          <button class="novel-tab" data-tab="sweetsixt">📗 Sweet Sixteen</button>
        </div>

        <!-- Tab Content -->
        <div class="novel-tab-content" id="novel-tab-content">
          ${NovelHub._renderSummaryTab()}
        </div>

      </div>
    `;

    NovelHub._bindTabEvents(container, onBack, onStartQuiz);
  },

  _bindTabEvents(container, onBack, onStartQuiz) {
    // Back button
    document.getElementById("novel-back-btn")?.addEventListener("click", onBack);

    // Quiz buttons
    document.getElementById("novel-quiz-btn")?.addEventListener("click", () => {
      const tlcQuestions = novelQuestions.filter(q => q.topic && q.topic.includes('Life Changer'));
      if (onStartQuiz) onStartQuiz(tlcQuestions, "The Life Changer");
    });
    document.getElementById("novel-ss-quiz-btn")?.addEventListener("click", () => {
      const ssQuestions = novelQuestions.filter(q => q.topic && q.topic.includes('Sweet Sixteen'));
      if (onStartQuiz) onStartQuiz(ssQuestions, "Sweet Sixteen");
    });

    // Tabs
    const tabs = container.querySelectorAll(".novel-tab");
    const contentArea = document.getElementById("novel-tab-content");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const tabId = tab.dataset.tab;
        let html = "";
        switch (tabId) {
          case "summary":    html = NovelHub._renderSummaryTab(); break;
          case "characters": html = NovelHub._renderCharactersTab(); break;
          case "themes":     html = NovelHub._renderThemesTab(); break;
          case "pastqs":     html = NovelHub._renderPastQuestionsTab(); break;
          case "sweetsixt":  html = NovelHub._renderSweetSixteenTab(); break;
        }
        contentArea.innerHTML = html;
        contentArea.scrollTop = 0;

        // Bind accordion in past questions
        if (tabId === "pastqs") {
          NovelHub._bindAccordion(contentArea);
        }
      });
    });
  },

  _renderSummaryTab() {
    return `
      <div class="novel-content-section">
        <div class="novel-overview-grid">
          <div class="novel-overview-card">
            <div class="nov-card-header">
              <span class="nov-card-icon">📖</span>
              <h3>About the Novel</h3>
            </div>
            <p>
              <strong>The Life Changer</strong> is a 2021 novel by Nigerian academic and author
              <strong>Dr. Khadija Abubakar Jalli</strong>. It was selected by JAMB as the compulsory novel
              for UTME candidates from 2022 to 2025, meaning questions from it appear in the
              <em>Use of English</em> section of JAMB for all candidates regardless of department.
            </p>
            <p>
              The novel is set primarily at <strong>Ahmadu Bello University (ABU), Zaria</strong>, Kaduna State.
              It uses a storytelling framework where a university lecturer-mother, Ummi, tells cautionary
              and inspirational stories to her three daughters on the eve of the eldest's university admission.
            </p>
          </div>

          <div class="novel-overview-card">
            <div class="nov-card-header">
              <span class="nov-card-icon">📌</span>
              <h3>Quick Reference Facts</h3>
            </div>
            <ul class="nov-facts-list">
              <li><span>Author:</span> Dr. Khadija Abubakar Jalli</li>
              <li><span>Year Published:</span> 2021</li>
              <li><span>JAMB Years:</span> 2022, 2023, 2024, 2025</li>
              <li><span>Primary Setting:</span> ABU Zaria, Kaduna State</li>
              <li><span>Genre:</span> Contemporary Nigerian fiction / Campus novel</li>
              <li><span>Narrative Style:</span> Frame narrative (storytelling within a story)</li>
              <li><span>Subject:</span> Use of English (compulsory for all)</li>
              <li><span>Number of chapters:</span> Multiple episodic chapters</li>
            </ul>
          </div>
        </div>

        <div class="novel-storylines">
          <h3 class="nov-section-title">The Three Main Story Lines</h3>
          <div class="storyline-cards">

            <div class="storyline-card storyline-red">
              <div class="storyline-icon">⚠️</div>
              <div class="storyline-body">
                <h4>Salma's Story — A Cautionary Tale</h4>
                <p>
                  Salma, a vain and proud student at ABU, refuses to stay in the university hostel
                  due to her inflated sense of social status. She befriends Honourable Habib, a corrupt
                  politician, and neglects her studies. Desperately behind academically, she resorts to
                  examination malpractice in Moral Philosophy (GST) and is caught.
                  Despite Habib's attempt to bribe committee member Kabir, Kabir deceives them,
                  pockets the money, and does nothing. <strong>Salma is expelled from ABU.</strong>
                </p>
                <div class="storyline-lesson">
                  <strong>Lesson:</strong> Pride, wrong associations, and dishonesty lead to total ruin.
                </div>
              </div>
            </div>

            <div class="storyline-card storyline-green">
              <div class="storyline-icon">⭐</div>
              <div class="storyline-body">
                <h4>Lawal's Story — The True Life Changer</h4>
                <p>
                  Lawal was a destitute young man who sold secondhand books near the ABU campus.
                  Professor Omar saw his extraordinary intelligence and passion for learning despite
                  his poverty. Omar decided to sponsor Lawal's university education and mentor him.
                  <strong>Lawal graduated, pursued further studies, and eventually became a professor himself</strong>
                  — the living definition of a "life changer". This story is the novel's most uplifting thread.
                </p>
                <div class="storyline-lesson">
                  <strong>Lesson:</strong> Education pursued with integrity is the greatest equalizer.
                </div>
              </div>
            </div>

            <div class="storyline-card storyline-amber">
              <div class="storyline-icon">🎭</div>
              <div class="storyline-body">
                <h4>Talle's Story — Appearances Are Deceptive</h4>
                <p>
                  Talle was the most well-known, quiet, and seemingly pious man in his village of Lafayette.
                  Everyone respected him as the model of moral uprightness. Yet in a shocking revelation,
                  <strong>his house was discovered to have been used as the hideout for a kidnapped child held for ransom</strong>.
                  Talle was a criminal behind a virtuous mask. Ummi uses this story to warn her daughters
                  never to judge people by outward appearances alone.
                </p>
                <div class="storyline-lesson">
                  <strong>Lesson:</strong> Character is what you do when no one is watching.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  _renderCharactersTab() {
    const characters = [
      {
        name: "Ummi (Dr. Ummi)",
        role: "Protagonist / Narrator",
        color: "#10b981",
        emoji: "👩‍🏫",
        description: "A Senior Lecturer in Sociology at ABU, Zaria. She is married to Professor Omar. Ummi is the novel's moral compass — wise, caring, and proactive. She gathers her three daughters to tell them cautionary and inspiring stories about campus life before the eldest, Bint, leaves for university.",
        traits: ["Wise", "Caring", "Protective", "Morally upright"],
        significance: "She is the narrative frame — everything we learn comes through her storytelling. She represents the ideal parent: engaged, open, and value-centered."
      },
      {
        name: "Professor Omar",
        role: "Ummi's husband / Mentor",
        color: "#3b82f6",
        emoji: "👨‍🏫",
        description: "A respected Professor at ABU who embodies academic integrity and compassionate mentorship. His decision to sponsor and mentor the impoverished Lawal is the central act of the novel's inspirational storyline. He represents what education can do when given selflessly.",
        traits: ["Principled", "Compassionate", "Academic integrity", "Selfless"],
        significance: "Omar's action toward Lawal is what the title 'The Life Changer' directly refers to — education as a transformative force given by a caring mentor."
      },
      {
        name: "Bint",
        role: "Ummi's eldest daughter",
        color: "#8b5cf6",
        emoji: "👧",
        description: "The eldest of Ummi and Omar's three daughters, Bint has just been admitted to university. Her imminent departure is the catalyst for Ummi's storytelling. Bint represents every young Nigerian student on the threshold of campus life — full of excitement but potentially unaware of the dangers ahead.",
        traits: ["Curious", "Young", "Impressionable"],
        significance: "Bint functions as the primary audience and surrogate for the reader — we experience all of Ummi's cautionary stories through Bint's perspective."
      },
      {
        name: "Teemah & Jamila",
        role: "Ummi's other daughters",
        color: "#6366f1",
        emoji: "👭",
        description: "Teemah (middle daughter) and Jamila (youngest) also listen to Ummi's stories. They represent younger students who will one day face the same crossroads as Bint. Their presence reinforces that Ummi's lessons are for all stages of youth, not just university entry.",
        traits: ["Younger", "Attentive", "Learning"],
        significance: "Their presence creates the storytelling audience and emphasizes that moral education should begin early, not wait until university."
      },
      {
        name: "Salma",
        role: "The cautionary protagonist",
        color: "#ef4444",
        emoji: "😔",
        description: "Salma is a vain, materialistic ABU student who refuses hostel accommodation due to pride, forms a relationship with corrupt politician Habib, neglects her studies, and resorts to cheating in her final exams. She is caught, and despite bribery attempts on her behalf, she is expelled from ABU.",
        traits: ["Vain", "Dishonest", "Impressionable", "Materialistic"],
        significance: "Salma is the novel's primary cautionary character — her story is the longest and most detailed warning about the consequences of moral weakness on campus."
      },
      {
        name: "Honourable Habib",
        role: "Corrupt politician",
        color: "#f59e0b",
        emoji: "🏛️",
        description: "A politician who gives Salma a lift in his Mercedes-Benz and enters a relationship with her. Habib is wealthy but morally corrupt — he attempts to bribe the examination malpractice committee to save Salma after she is caught cheating. He represents Nigeria's corrupting political class.",
        traits: ["Corrupt", "Influential", "Manipulative"],
        significance: "Habib represents the corrupting influence of wealth and political power. His failed bribery attempt shows that corruption ultimately defeats even those who use it."
      },
      {
        name: "Kabir",
        role: "Corrupt committee member",
        color: "#64748b",
        emoji: "🎭",
        description: "A member of ABU's Examination Malpractice Committee. Kabir accepts the bribe offered by Habib on Salma's behalf but then does absolutely nothing to help her. He is a fraud and cheat within the very system supposed to punish cheating.",
        traits: ["Fraudulent", "Greedy", "Duplicitous"],
        significance: "Kabir represents layers of corruption — even the corrupt cannot trust each other. His character shows that using dishonesty to escape dishonesty's consequences is futile."
      },
      {
        name: "Lawal",
        role: "The inspirational student",
        color: "#10b981",
        emoji: "🌟",
        description: "A desperately poor young man who sold secondhand books near ABU's campus. Despite his poverty, he had exceptional intelligence and a hunger for learning. Professor Omar noticed him, sponsored his education, and mentored him. Lawal eventually graduated and became a professor himself.",
        traits: ["Intelligent", "Hardworking", "Resilient", "Grateful"],
        significance: "Lawal is the embodiment of the novel's title — he is the person whose life was literally changed by education and a compassionate mentor. His story is the novel's most hopeful narrative."
      },
      {
        name: "Talle",
        role: "The deceiver",
        color: "#f43f5e",
        emoji: "🎭",
        description: "Talle was the most respected, quiet, and outwardly pious man in the village of Lafayette. Everyone considered him the moral standard of the community. But in a shocking revelation, his house was discovered to be the hiding place for a kidnapped child held for ransom. He was convicted of kidnapping.",
        traits: ["Deceptive", "Hypocritical", "Criminal"],
        significance: "Talle's story is a powerful illustration of the gap between appearance and reality. He teaches that moral character cannot be judged by outward reputation or social standing."
      }
    ];

    return `
      <div class="novel-content-section">
        <div class="characters-intro">
          <h3>Key Characters in The Life Changer</h3>
          <p>Understanding each character's role and significance is essential — JAMB regularly tests character identification, motivation, and symbolic meaning.</p>
        </div>
        <div class="characters-grid">
          ${characters.map(c => `
            <div class="character-card">
              <div class="char-card-header" style="border-left: 3px solid ${c.color};">
                <span class="char-emoji">${c.emoji}</span>
                <div>
                  <h4 class="char-name">${c.name}</h4>
                  <span class="char-role" style="color:${c.color};">${c.role}</span>
                </div>
              </div>
              <p class="char-desc">${c.description}</p>
              <div class="char-traits">
                ${c.traits.map(t => `<span class="trait-pill" style="background:${c.color}18; color:${c.color};">${t}</span>`).join("")}
              </div>
              <div class="char-significance">
                <strong>Exam Tip:</strong> ${c.significance}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  _renderThemesTab() {
    const themes = [
      {
        title: "Education as a Life Changer",
        icon: "🎓",
        color: "#10b981",
        desc: "The novel's central thesis is that education — pursued honestly and with purpose — is the single most powerful force that can transform a person's life, regardless of background. Lawal's story (from poverty to professor) is the clearest embodiment of this theme.",
        examples: ["Lawal's transformation from street seller to professor", "Omar's sponsorship of Lawal", "The contrast between Lawal's disciplined path and Salma's wasted opportunity"]
      },
      {
        title: "Examination Malpractice & Its Consequences",
        icon: "🚫",
        color: "#ef4444",
        desc: "The novel presents examination malpractice as a catastrophic moral failure with irreversible real-world consequences. Salma's cheating in Moral Philosophy results in her expulsion — losing years of study in one dishonest act.",
        examples: ["Salma caught cheating in GST Moral Philosophy", "The invigilator's vigilance", "Expulsion as an irreversible consequence", "The irony of cheating in a 'Moral Philosophy' course"]
      },
      {
        title: "Deception and False Appearances",
        icon: "🎭",
        color: "#8b5cf6",
        desc: "Multiple characters in the novel are not what they appear to be. Talle appears pious but is a kidnapper. Salma appears confident but is morally hollow. Habib appears helpful but is corrupt. The novel warns that character cannot be read from surface behavior.",
        examples: ["Talle — the 'Quiet One' revealed as kidnapper", "Salma's lies to Habib about her identity", "Kabir accepting a bribe while pretending to help"]
      },
      {
        title: "Parental Guidance and Moral Upbringing",
        icon: "👨‍👩‍👧",
        color: "#3b82f6",
        desc: "The entire narrative structure of the novel — Ummi telling stories to her daughters — argues that proactive parental guidance is critical. Parents who engage their children in open, honest conversations about life's dangers provide an invaluable protective shield.",
        examples: ["Ummi gathering daughters for stories", "Omar modeling integrity through his treatment of Lawal", "The contrast between guided children and unguided students like Salma"]
      },
      {
        title: "Peer Influence and Social Pressure",
        icon: "👥",
        color: "#f59e0b",
        desc: "Salma's downfall is partly driven by her desire to maintain a certain social image — refusing the hostel to seem superior, associating with Habib for status. The novel shows how susceptibility to social pressure can corrupt even those with potential.",
        examples: ["Salma refusing the hostel for social image", "Her association with Habib driven by material attraction", "The pressure of appearing 'sophisticated' on campus"]
      }
    ];

    return `
      <div class="novel-content-section">
        <div class="themes-intro">
          <h3>Major Themes — The Life Changer</h3>
          <p>JAMB tests themes directly. Know not just <em>what</em> the themes are, but <em>which characters and events</em> illustrate them.</p>
        </div>
        <div class="themes-list">
          ${themes.map((t, i) => `
            <div class="theme-card" style="--theme-color: ${t.color};">
              <div class="theme-card-header">
                <span class="theme-number">${i + 1}</span>
                <span class="theme-icon">${t.icon}</span>
                <h4>${t.title}</h4>
              </div>
              <p class="theme-desc">${t.desc}</p>
              <div class="theme-examples-label">Key evidence in the text:</div>
              <ul class="theme-examples">
                ${t.examples.map(e => `<li>• ${e}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  _renderPastQuestionsTab() {
    const tlcQs = novelQuestions.filter(q => q.topic && q.topic.includes("Life Changer"));
    const byYear = {};
    tlcQs.forEach(q => {
      if (!byYear[q.year]) byYear[q.year] = [];
      byYear[q.year].push(q);
    });

    const years = Object.keys(byYear).sort((a,b) => b - a);

    return `
      <div class="novel-content-section">
        <div class="pastqs-intro">
          <h3>Past JAMB Questions — The Life Changer</h3>
          <p>These are verified past questions. Click on any year to expand and study. Reveal answers by clicking each question.</p>
        </div>
        <div class="novel-pastqs-accordion" id="novel-accordion">
          ${years.map(year => `
            <div class="accordion-item" data-year="${year}">
              <button class="accordion-trigger">
                <div class="acc-trigger-left">
                  <span class="acc-year-badge">JAMB ${year}</span>
                  <span class="acc-q-count">${byYear[year].length} question${byYear[year].length > 1 ? 's' : ''}</span>
                </div>
                <svg class="acc-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <div class="accordion-body">
                ${byYear[year].map((q, idx) => `
                  <div class="novel-q-card" id="nq-${q.id}">
                    <div class="novel-q-num">Q${idx + 1} · <span>${q.topic || 'The Life Changer'}</span></div>
                    <p class="novel-q-text">${q.question}</p>
                    <div class="novel-q-options">
                      ${q.options.map(opt => `
                        <div class="novel-opt" data-key="${opt.key}" data-correct="${q.correctAnswer}" data-qid="${q.id}">
                          <span class="opt-key">${opt.key}</span>
                          <span class="opt-text">${opt.text}</span>
                        </div>
                      `).join("")}
                    </div>
                    <div class="novel-q-explanation hidden" id="nqexp-${q.id}">
                      <div class="explanation-title">📚 Explanation:</div>
                      <div>${q.explanation}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  _bindAccordion(container) {
    // Accordion expand/collapse
    container.querySelectorAll(".accordion-trigger").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".accordion-item");
        const isOpen = item.classList.contains("open");
        // Close all
        container.querySelectorAll(".accordion-item.open").forEach(i => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });

    // Option selection
    container.querySelectorAll(".novel-opt").forEach(opt => {
      opt.addEventListener("click", () => {
        const qid = opt.dataset.qid;
        const correct = opt.dataset.correct;
        const key = opt.dataset.key;

        // Clear siblings
        const card = opt.closest(".novel-q-card");
        card.querySelectorAll(".novel-opt").forEach(o => {
          o.classList.remove("opt-selected", "opt-correct", "opt-wrong");
        });

        // Mark selected
        opt.classList.add("opt-selected");
        if (key === correct) {
          opt.classList.add("opt-correct");
        } else {
          opt.classList.add("opt-wrong");
          // Show correct answer
          card.querySelectorAll(`.novel-opt[data-key="${correct}"]`).forEach(co => {
            co.classList.add("opt-correct");
          });
        }

        // Show explanation
        const expBox = document.getElementById(`nqexp-${qid}`);
        if (expBox) expBox.classList.remove("hidden");
      });
    });

    // Open first accordion by default
    const first = container.querySelector(".accordion-item");
    if (first) first.classList.add("open");
  },

  _renderSweetSixteenTab() {
    const ssQs = novelQuestions.filter(q => q.topic && q.topic.includes("Sweet Sixteen"));

    return `
      <div class="novel-content-section">

        <!-- Sweet Sixteen overview -->
        <div class="ss-hero-card">
          <div class="ss-book-mini">
            <div class="ss-book-cover">
              <div class="ss-book-inner">
                <div class="ss-book-label">JAMB Novel</div>
                <h3>Sweet Sixteen</h3>
                <p>Bolaji Abdullahi</p>
              </div>
            </div>
          </div>
          <div class="ss-info">
            <div class="ss-tag">📗 Previous JAMB Compulsory Novel · 2018–2021</div>
            <h2 class="ss-title">Sweet Sixteen</h2>
            <p class="ss-author">by <strong>Bolaji Abdullahi</strong></p>
            <p class="ss-desc">
              A touching epistolary novel — told as a father's long letter to his daughter, Aliya,
              on the occasion of her sixteenth birthday. Papa shares life wisdom, explores womanhood,
              identity, relationships, integrity, and what it means to be a principled Nigerian young woman.
            </p>
            <div class="ss-facts">
              <div class="ss-fact"><span>Author:</span> Bolaji Abdullahi</div>
              <div class="ss-fact"><span>JAMB Years:</span> 2018, 2019, 2020, 2021</div>
              <div class="ss-fact"><span>Form:</span> Epistolary (letter-based) novel</div>
              <div class="ss-fact"><span>Setting:</span> Contemporary Nigeria</div>
            </div>
          </div>
        </div>

        <!-- SS Key Characters -->
        <div class="ss-section">
          <h3 class="nov-section-title">Key Characters</h3>
          <div class="ss-chars-grid">
            <div class="ss-char-card">
              <span class="ss-char-emoji">👨</span>
              <h4>Papa</h4>
              <p>The narrator and primary voice. A Nigerian journalist and public figure who writes a long, heartfelt letter to his daughter on her 16th birthday. He is wise, loving, politically aware, and deeply concerned about Aliya's moral and personal development.</p>
            </div>
            <div class="ss-char-card">
              <span class="ss-char-emoji">👧</span>
              <h4>Aliya</h4>
              <p>Papa's sixteen-year-old daughter. She is the primary audience of the letter. Aliya is intelligent, curious, and on the cusp of adulthood. She represents the young Nigerian woman navigating identity, pressure, and choices.</p>
            </div>
            <div class="ss-char-card">
              <span class="ss-char-emoji">👩</span>
              <h4>Mama</h4>
              <p>Aliya's mother, Papa's wife. She plays a supportive background role in the story. The family dynamic reflects a relatively stable, educated Nigerian household where both parents are engaged with their daughter's future.</p>
            </div>
          </div>
        </div>

        <!-- SS Themes -->
        <div class="ss-section">
          <h3 class="nov-section-title">Major Themes in Sweet Sixteen</h3>
          <div class="ss-themes">
            <div class="ss-theme"><span>🧭</span><div><strong>Identity and Womanhood</strong> — What it means to grow into a principled Nigerian woman</div></div>
            <div class="ss-theme"><span>💝</span><div><strong>Paternal Love</strong> — A father's deep, protective love expressed through wisdom-sharing</div></div>
            <div class="ss-theme"><span>🏛️</span><div><strong>Integrity and Moral Character</strong> — Doing what is right regardless of social pressure</div></div>
            <div class="ss-theme"><span>🗳️</span><div><strong>Civic Responsibility</strong> — Political awareness and duties as a Nigerian citizen</div></div>
            <div class="ss-theme"><span>📚</span><div><strong>Education and Purpose</strong> — Pursuing learning with a clear sense of values and goals</div></div>
          </div>
        </div>

        <!-- SS Past Questions -->
        <div class="ss-section">
          <h3 class="nov-section-title">Past JAMB Questions — Sweet Sixteen</h3>
          <div class="novel-pastqs-accordion" id="ss-accordion">
            ${ssQs.map((q, idx) => `
              <div class="novel-q-card" id="ssq-${q.id}">
                <div class="novel-q-num">Q${idx + 1} · JAMB ${q.year} · <span>${q.topic}</span></div>
                <p class="novel-q-text">${q.question}</p>
                <div class="novel-q-options">
                  ${q.options.map(opt => `
                    <div class="novel-opt" data-key="${opt.key}" data-correct="${q.correctAnswer}" data-qid="${q.id}">
                      <span class="opt-key">${opt.key}</span>
                      <span class="opt-text">${opt.text}</span>
                    </div>
                  `).join("")}
                </div>
                <div class="novel-q-explanation hidden" id="ssqexp-${q.id}">
                  <div class="explanation-title">📚 Explanation:</div>
                  <div>${q.explanation}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    `;
  }
};
