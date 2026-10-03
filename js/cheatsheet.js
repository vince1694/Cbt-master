/**
 * Formula Cheatsheet & High-Yield Revision Hub
 * Comprehensive rapid revision cards for Mathematics, Physics, Chemistry,
 * Biology, English Grammar, and Economics/Commercial.
 */

export const CHEATSHEET_DATA = {
  Mathematics: [
    {
      category: "Algebra",
      title: "Quadratic Formula & Nature of Roots",
      formula: "x = [-b ± √(b² - 4ac)] / 2a",
      explanation: "For ax² + bx + c = 0. Discriminant Δ = b² - 4ac:\n• Δ > 0: Two distinct real roots\n• Δ = 0: Two equal real roots\n• Δ < 0: Complex/imaginary roots\n• Sum of roots: α + β = -b/a\n• Product of roots: αβ = c/a",
      tip: "If roots are α and β, equation is x² - (α + β)x + αβ = 0."
    },
    {
      category: "Algebra",
      title: "Logarithm Laws",
      formula: "log_b(xy) = log_b x + log_b y\nlog_b(x/y) = log_b x - log_b y\nlog_b(x^k) = k · log_b x",
      explanation: "Change of base: log_b a = (log_c a) / (log_c b).\nAlso: log_a a = 1, log_a 1 = 0, and a^(log_a x) = x.",
      tip: "Never distribute log over addition: log(x + y) ≠ log x + log y!"
    },
    {
      category: "Calculus",
      title: "Differentiation Standard Derivatives",
      formula: "d/dx(x^n) = n·x^(n-1)\nd/dx(sin x) = cos x\nd/dx(cos x) = -sin x",
      explanation: "• Product Rule: d/dx(uv) = u(dv/dx) + v(du/dx)\n• Quotient Rule: d/dx(u/v) = [v(du/dx) - u(dv/dx)] / v²\n• Chain Rule: dy/dx = (dy/du) · (du/dx)",
      tip: "At stationary points (max/min/inflection), dy/dx = 0."
    },
    {
      category: "Series & Sequences",
      title: "AP & GP Formulas",
      formula: "AP: T_n = a + (n - 1)d;  S_n = (n/2)[2a + (n - 1)d]\nGP: T_n = ar^(n - 1);  S_n = a(1 - r^n)/(1 - r)",
      explanation: "For GP with |r| < 1, sum to infinity is S_∞ = a / (1 - r).\nArithmetic mean between a and b is (a + b)/2.\nGeometric mean between a and b is √(ab).",
      tip: "JAMB loves questions asking for the 10th term or sum to infinity of decaying series."
    },
    {
      category: "Trigonometry",
      title: "Trigonometric Identities & Sine/Cosine Rules",
      formula: "sin²θ + cos²θ = 1\nSine Rule: a / sin A = b / sin B = c / sin C = 2R\nCosine Rule: a² = b² + c² - 2bc · cos A",
      explanation: "Area of any triangle = ½ab·sin C.\nDouble angle: sin 2θ = 2 sin θ cos θ; cos 2θ = cos²θ - sin²θ.",
      tip: "Use Cosine Rule when given 3 sides (SSS) or 2 sides and an included angle (SAS)."
    }
  ],
  Physics: [
    {
      category: "Mechanics",
      title: "Equations of Uniformly Accelerated Motion",
      formula: "v = u + at\ns = ut + ½at²\nv² = u² + 2as\ns = [(u + v)/2] · t",
      explanation: "Where u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement.\nFor vertical motion under gravity, replace a with g (or -g when moving upward).",
      tip: "At maximum vertical height, final velocity v = 0. Time to reach max height = u/g."
    },
    {
      category: "Mechanics",
      title: "Newton's Second Law & Momentum",
      formula: "F = ma = Δp / Δt\nImpulse I = F · Δt = m(v - u)",
      explanation: "Conservation of Linear Momentum: In a closed system, m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂.\n• Elastic collision: Kinetic energy is conserved.\n• Inelastic collision: Objects stick together: m₁u₁ + m₂u₂ = (m₁ + m₂)V.",
      tip: "Impulse equals the area under a force-time graph."
    },
    {
      category: "Electricity",
      title: "Ohm's Law, Resistance & Electrical Power",
      formula: "V = IR\nP = IV = I²R = V²/R\nW = Pt = IVt",
      explanation: "• Series resistors: R_total = R₁ + R₂ + R₃\n• Parallel resistors: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃\n• For two parallel resistors: R = (R₁·R₂) / (R₁ + R₂)",
      tip: "In series, current is constant. In parallel, potential difference is constant."
    },
    {
      category: "Waves & Optics",
      title: "Wave Equation & Snell's Law",
      formula: "v = fλ\nRefractive Index n = sin i / sin r = c / v = Real Depth / Apparent Depth",
      explanation: "Critical angle c: sin c = 1 / n.\nLens/Mirror formula: 1/f = 1/u + 1/v.\nMagnification m = v / u = Image Height / Object Height.",
      tip: "For real images from convex lenses, v is positive. For virtual images, v is negative."
    }
  ],
  Chemistry: [
    {
      category: "Stoichiometry",
      title: "Mole Concept & Gas Volumes",
      formula: "n = m / M  (mass / molar mass)\nn = V / 22.4 dm³  (at s.t.p.)\nConcentration C = n / V = (m / M) / V",
      explanation: "Avogadro's constant N_A = 6.02 × 10²³ particles/mol.\nDilution formula: C₁V₁ = C₂V₂.\nAt s.t.p. (0 °C, 1 atm), 1 mole of any ideal gas occupies 22.4 dm³ (22,400 cm³).",
      tip: "Always convert volumes from cm³ to dm³ by dividing by 1,000 when calculating molarity."
    },
    {
      category: "Gas Laws",
      title: "Boyle's, Charles's & Ideal Gas Laws",
      formula: "Boyle's: P₁V₁ = P₂V₂  (T constant)\nCharles's: V₁/T₁ = V₂/T₂  (P constant)\nGeneral: (P₁V₁)/T₁ = (P₂V₂)/T₂\nIdeal: PV = nRT",
      explanation: "Where T MUST always be in Kelvin: T(K) = T(°C) + 273.\nStandard Temperature = 273 K (0 °C); Standard Pressure = 760 mmHg = 1.013 × 10⁵ N/m².",
      tip: "Forgetting to convert Celsius to Kelvin is the #1 mistake candidates make in JAMB gas law questions!"
    },
    {
      category: "Electrochemistry",
      title: "Faraday's Laws of Electrolysis",
      formula: "m = Z · I · t = (M · I · t) / (n · F)",
      explanation: "Where m = mass deposited, Z = electrochemical equivalent, I = current (A), t = time in seconds, M = molar mass, n = number of electrons transferred, F = 1 Faraday = 96,500 C/mol.",
      tip: "Quantity of charge Q = I · t (seconds). Remember to convert minutes or hours into seconds!"
    }
  ],
  "Use of English": [
    {
      category: "Concord & Agreement",
      title: "The Golden Concord Rules",
      formula: "Subject + Verb Agreement Rules",
      explanation: "1. Rule of Proximity: With 'Either...or' or 'Neither...nor', verb agrees with the CLOSER subject.\n2. Accompaniment: 'As well as', 'together with', 'in addition to', 'alongside' do NOT make a plural subject; verb agrees with the FIRST subject.\n3. Indefinite Pronouns: 'Everyone', 'everybody', 'each', 'none' take SINGULAR verbs.\n4. Fractions/Percentages: Verb depends on the noun of the preposition: 'Two-thirds of the water IS gone' vs 'Two-thirds of the students ARE present'.",
      tip: "'The manager, together with his workers, WAS invited' (NOT were)."
    },
    {
      category: "Oral English",
      title: "Silent Letters & Tricky Pronunciations",
      formula: "Phonetics & Stress Patterns",
      explanation: "• Silent 'b': doubt, debt, comb, tomb, subtle, climb.\n• Silent 'p': receipt, psalm, pneumatic, psychology.\n• Silent 'k': knife, knot, knob, knee.\n• The letter 'plait' is pronounced /plæt/ (like 'flat'), NOT /pleɪt/.\n• Noun vs Verb Stress: Nouns accented on 1st syllable (CON-duct, PRO-duce), Verbs accented on 2nd syllable (con-DUCT, pro-DUCE).",
      tip: "Look out for syllables ending in -tion, -sion, -ic: stress falls on the PENULTIMATE (second-to-last) syllable!"
    }
  ],
  Commercial: [
    {
      category: "Economics",
      title: "Elasticity of Demand & Supply",
      formula: "PED = (% Change in Q_d) / (% Change in Price) = (ΔQ / ΔP) · (P / Q)",
      explanation: "• |PED| > 1: Elastic demand (price change causes bigger quantity change)\n• |PED| < 1: Inelastic demand (necessities like salt, fuel)\n• |PED| = 1: Unitary elastic\n• Cross Elasticity > 0: Substitute goods (e.g., Milo and Bournvita)\n• Cross Elasticity < 0: Complementary goods (e.g., Car and Petrol)",
      tip: "Normal goods have positive income elasticity; inferior goods have negative income elasticity."
    },
    {
      category: "Accounting",
      title: "Accounting Equation & Trial Balance",
      formula: "Assets = Capital + Liabilities\nNet Profit = Gross Profit - Operating Expenses",
      explanation: "• Working Capital = Current Assets - Current Liabilities\n• Cost of Goods Sold (COGS) = Opening Stock + Purchases - Closing Stock\n• Gross Profit = Turnover (Sales) - COGS\n• Golden Rule: Debit what comes in / all expenses; Credit what goes out / all gains.",
      tip: "Errors not affecting trial balance: Omission, Commission, Principle, Original Entry, Reversal of entries, Compensating errors."
    }
  ]
};

export const Cheatsheet = {
  activeSubject: "Mathematics",
  searchQuery: "",

  renderCheatsheet(container) {
    const subjects = Object.keys(CHEATSHEET_DATA);

    const html = `
      <div class="cheatsheet-page-wrapper">
        <!-- Hero Header -->
        <div class="cs-hero-card">
          <div class="cs-badge-row">
            <span class="cs-pill">📐 High-Yield Formula Vault</span>
            <span class="cs-pill-sec">JAMB & WAEC Quick Reference</span>
          </div>
          <h1 class="cs-title">Exam Formula & Rule Cheatsheet</h1>
          <p class="cs-subtitle">High-yield equations, laws, concord rules, and memory tricks condensed for rapid review.</p>

          <!-- Search Bar -->
          <div class="cs-search-box">
            <span class="cs-search-icon">🔍</span>
            <input type="text" id="cs-search-input" class="cs-input" placeholder="Search formulas, laws, topics (e.g. quadratic, Snell, concord, moles)..." value="${this.searchQuery}">
          </div>
        </div>

        <!-- Subject Navigation Tabs -->
        <div class="cs-tabs-row" id="cs-tabs-container">
          ${subjects.map(subj => `
            <button class="cs-tab-btn ${subj === this.activeSubject ? 'active' : ''}" data-subject="${subj}">
              <span>${subj}</span>
            </button>
          `).join('')}
        </div>

        <!-- Cards Container -->
        <div class="cs-cards-grid" id="cs-cards-grid">
          ${this.renderCardsHtml(this.activeSubject, this.searchQuery)}
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners(container);
  },

  renderCardsHtml(subject, query) {
    const rawList = CHEATSHEET_DATA[subject] || [];
    const filtered = rawList.filter(card => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        card.title.toLowerCase().includes(q) ||
        card.category.toLowerCase().includes(q) ||
        card.formula.toLowerCase().includes(q) ||
        card.explanation.toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      return `
        <div class="cs-empty-state">
          <span class="cs-empty-icon">🔎</span>
          <h3>No formula matched "${query}"</h3>
          <p>Try searching for a different keyword or switch subject tabs.</p>
        </div>
      `;
    }

    return filtered.map((card, idx) => `
      <div class="cs-card">
        <div class="cs-card-top">
          <span class="cs-cat-badge">${card.category}</span>
          <button class="cs-copy-btn" title="Copy formula" data-copy="${encodeURIComponent(card.formula)}">📋 Copy</button>
        </div>
        <h3 class="cs-card-title">${card.title}</h3>
        
        <div class="cs-formula-box">
          <code>${card.formula.replace(/\n/g, '<br>')}</code>
        </div>

        <div class="cs-card-explanation">
          <p>${card.explanation.replace(/\n/g, '<br>')}</p>
        </div>

        ${card.tip ? `
          <div class="cs-exam-tip">
            <span class="cs-tip-icon">💡 <strong>JAMB Tip:</strong></span>
            <span>${card.tip}</span>
          </div>
        ` : ''}
      </div>
    `).join('');
  },

  attachEventListeners(container) {
    // Subject tabs
    const tabBtns = container.querySelectorAll(".cs-tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeSubject = btn.dataset.subject;
        const grid = container.querySelector("#cs-cards-grid");
        grid.innerHTML = this.renderCardsHtml(this.activeSubject, this.searchQuery);
        this.attachCopyListeners(container);
      });
    });

    // Search input
    const searchInput = container.querySelector("#cs-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        const grid = container.querySelector("#cs-cards-grid");
        grid.innerHTML = this.renderCardsHtml(this.activeSubject, this.searchQuery);
        this.attachCopyListeners(container);
      });
    }

    this.attachCopyListeners(container);
  },

  attachCopyListeners(container) {
    const copyBtns = container.querySelectorAll(".cs-copy-btn");
    copyBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const text = decodeURIComponent(btn.dataset.copy);
        navigator.clipboard.writeText(text).then(() => {
          const original = btn.innerText;
          btn.innerText = "✓ Copied!";
          setTimeout(() => { btn.innerText = original; }, 1800);
        });
      });
    });
  }
};
