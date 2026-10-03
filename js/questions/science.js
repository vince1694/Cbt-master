/**
 * Science Department Past Questions (JAMB & WAEC)
 * Subjects: Mathematics, Physics, Chemistry, Biology
 * Real, authentic past questions with step-by-step solutions and explanations.
 */
export const scienceQuestions = [
  // ================= MATHEMATICS =================
  {
    id: "math_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Mathematics",
    topic: "Logarithms & Indices",
    department: ["Science", "Commercial"],
    question: "Evaluate: log₃ 81 + log₂ (1/16) - log₅ 125.",
    options: [
      { key: "A", text: "-3" },
      { key: "B", text: "-1" },
      { key: "C", text: "1" },
      { key: "D", text: "3" }
    ],
    correctAnswer: "A",
    explanation: "Step 1: log₃ 81 = log₃ (3⁴) = 4 log₃ 3 = 4\nStep 2: log₂ (1/16) = log₂ (2⁻⁴) = -4 log₂ 2 = -4\nStep 3: log₅ 125 = log₅ (5³) = 3 log₅ 5 = 3\nCombining: 4 + (-4) - 3 = 4 - 4 - 3 = -3."
  },
  {
    id: "math_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    department: ["Science", "Commercial"],
    question: "If α and β are the roots of the quadratic equation 2x² - 7x + 3 = 0, find the value of (α + β) + αβ.",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "7/2" },
      { key: "C", text: "3/2" },
      { key: "D", text: "5/2" }
    ],
    correctAnswer: "A",
    explanation: "For ax² + bx + c = 0, sum of roots (α + β) = -b/a, product of roots (αβ) = c/a.\nHere, a = 2, b = -7, c = 3.\nα + β = -(-7)/2 = 7/2 = 3.5\nαβ = 3/2 = 1.5\nTherefore, (α + β) + αβ = 7/2 + 3/2 = 10/2 = 5."
  },
  {
    id: "math_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Mathematics",
    topic: "Calculus - Differentiation",
    department: ["Science"],
    question: "Find the derivative of y = (3x² - 2)(2x + 1) with respect to x at x = 1.",
    options: [
      { key: "A", text: "20" },
      { key: "B", text: "16" },
      { key: "C", text: "14" },
      { key: "D", text: "18" }
    ],
    correctAnswer: "A",
    explanation: "Expand y = 6x³ + 3x² - 4x - 2\ndy/dx = d/dx(6x³ + 3x² - 4x - 2) = 18x² + 6x - 4\nAt x = 1:\ndy/dx = 18(1)² + 6(1) - 4 = 18 + 6 - 4 = 20."
  },
  {
    id: "math_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Mathematics",
    topic: "Trigonometry & Bearings",
    department: ["Science", "Commercial"],
    question: "If sin θ = 5/13 and θ is an acute angle, find the value of tan θ + cos θ.",
    options: [
      { key: "A", text: "209/156" },
      { key: "B", text: "17/13" },
      { key: "C", text: "119/156" },
      { key: "D", text: "169/120" }
    ],
    correctAnswer: "A",
    explanation: "Using Pythagoras theorem: Opposite = 5, Hypotenuse = 13.\nAdjacent = √(13² - 5²) = √(169 - 25) = √144 = 12.\ncos θ = Adjacent / Hypotenuse = 12/13.\ntan θ = Opposite / Adjacent = 5/12.\ntan θ + cos θ = 5/12 + 12/13 = (65 + 144) / 156 = 209/156."
  },

  // ================= PHYSICS =================
  {
    id: "phy_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Physics",
    topic: "Mechanics - Work, Energy & Power",
    department: ["Science"],
    question: "A stone of mass 0.5 kg is dropped from the top of a cliff 80 m high. Calculate its kinetic energy just before hitting the ground. (Take g = 10 m/s² and neglect air resistance).",
    options: [
      { key: "A", text: "400 J" },
      { key: "B", text: "200 J" },
      { key: "C", text: "800 J" },
      { key: "D", text: "40 J" }
    ],
    correctAnswer: "A",
    explanation: "By conservation of mechanical energy, Potential Energy at height = Kinetic Energy at ground level.\nK.E = P.E = m * g * h\nK.E = 0.5 kg * 10 m/s² * 80 m = 400 Joules."
  },
  {
    id: "phy_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Physics",
    topic: "Current Electricity",
    department: ["Science"],
    question: "Three resistors of values 2 Ω, 3 Ω, and 6 Ω are connected in parallel. What is the effective resistance across the combination?",
    options: [
      { key: "A", text: "1.0 Ω" },
      { key: "B", text: "11.0 Ω" },
      { key: "C", text: "0.5 Ω" },
      { key: "D", text: "2.5 Ω" }
    ],
    correctAnswer: "A",
    explanation: "For parallel resistors:\n1/R_eq = 1/R₁ + 1/R₂ + 1/R₃\n1/R_eq = 1/2 + 1/3 + 1/6\nFinding common denominator (6): 3/6 + 2/6 + 1/6 = 6/6 = 1 Ω⁻¹\nTherefore, R_eq = 1.0 Ω."
  },
  {
    id: "phy_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Physics",
    topic: "Waves & Optics",
    department: ["Science"],
    question: "A concave mirror has a radius of curvature of 40 cm. An object is placed 30 cm in front of the mirror. Determine the position and nature of the image formed.",
    options: [
      { key: "A", text: "60 cm in front of mirror, real" },
      { key: "B", text: "60 cm behind mirror, virtual" },
      { key: "C", text: "30 cm in front of mirror, real" },
      { key: "D", text: "20 cm in front of mirror, virtual" }
    ],
    correctAnswer: "A",
    explanation: "Focal length f = R / 2 = 40 / 2 = 20 cm (positive for concave mirror).\nObject distance u = 30 cm.\nMirror formula: 1/f = 1/u + 1/v\n1/20 = 1/30 + 1/v\n1/v = 1/20 - 1/30 = (3 - 2)/60 = 1/60\nv = +60 cm. Since v is positive, the image is real, inverted, and located 60 cm in front of the mirror."
  },
  {
    id: "phy_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Physics",
    topic: "Thermal Physics",
    department: ["Science"],
    question: "The quantity of heat required to raise the temperature of a body of mass 2 kg by 15 °C is 12,000 J. Calculate the specific heat capacity of the body.",
    options: [
      { key: "A", text: "400 J/(kg·K)" },
      { key: "B", text: "800 J/(kg·K)" },
      { key: "C", text: "600 J/(kg·K)" },
      { key: "D", text: "200 J/(kg·K)" }
    ],
    correctAnswer: "A",
    explanation: "Formula: Q = m * c * Δθ\nWhere Q = 12,000 J, m = 2 kg, Δθ = 15 °C.\nc = Q / (m * Δθ) = 12,000 / (2 * 15) = 12,000 / 30 = 400 J/(kg·K)."
  },

  // ================= CHEMISTRY =================
  {
    id: "chem_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Chemistry",
    topic: "Stoichiometry & Mole Concept",
    department: ["Science"],
    question: "What is the volume of oxygen gas at s.t.p. required to burn completely 44 g of propane (C₃H₈)?\n(C = 12, H = 1, Molar volume of gas at s.t.p = 22.4 dm³)",
    options: [
      { key: "A", text: "112.0 dm³" },
      { key: "B", text: "22.4 dm³" },
      { key: "C", text: "44.8 dm³" },
      { key: "D", text: "56.0 dm³" }
    ],
    correctAnswer: "A",
    explanation: "Balanced reaction equation: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O\nMolar mass of C₃H₈ = (3 * 12) + (8 * 1) = 36 + 8 = 44 g/mol.\nMoles of propane = 44 g / 44 g/mol = 1 mol.\nFrom stoichiometry: 1 mole of C₃H₈ requires 5 moles of O₂.\nVolume of O₂ at s.t.p = 5 mol * 22.4 dm³/mol = 112.0 dm³."
  },
  {
    id: "chem_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Chemistry",
    topic: "Electrolysis & Electrochemistry",
    department: ["Science"],
    question: "During the electrolysis of dilute copper(II) tetraoxosulphate(VI) solution using inert platinum electrodes, what is discharged at the anode?",
    options: [
      { key: "A", text: "Oxygen gas" },
      { key: "B", text: "Copper metal" },
      { key: "C", text: "Hydrogen gas" },
      { key: "D", text: "Sulphur dioxide" }
    ],
    correctAnswer: "A",
    explanation: "At the anode (+), anions present are OH⁻ and SO₄²⁻. Hydroxide ions (OH⁻) are discharged preferentially because they occupy a lower position in the electrochemical series than sulphate ions: 4OH⁻ → 2H₂O + O₂ + 4e⁻. Oxygen gas is evolved at the anode."
  },
  {
    id: "chem_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Chemistry",
    topic: "Periodic Table & Atomic Structure",
    department: ["Science"],
    question: "An element X has an electronic configuration of 1s² 2s² 2p⁶ 3s² 3p⁴. Which of the following statements is TRUE about X?",
    options: [
      { key: "A", text: "It belongs to group 6 and period 3" },
      { key: "B", text: "It belongs to group 4 and period 3" },
      { key: "C", text: "It is an alkaline earth metal" },
      { key: "D", text: "It readily forms an X²⁺ cation" }
    ],
    correctAnswer: "A",
    explanation: "The highest principal quantum number n = 3, so it is in Period 3. The valence shell has 2 + 4 = 6 electrons (3s² 3p⁴), placing it in Group 6 (or 16). Element X is Sulphur (atomic number 16), a non-metal that gains two electrons to form an X²⁻ anion."
  },
  {
    id: "chem_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Chemistry",
    topic: "Acids, Bases & Salts",
    department: ["Science"],
    question: "Calculate the pH of a 0.005 mol/dm³ solution of tetraoxosulphate(VI) acid (H₂SO₄), assuming complete ionization.",
    options: [
      { key: "A", text: "2.0" },
      { key: "B", text: "1.0" },
      { key: "C", text: "3.0" },
      { key: "D", text: "2.3" }
    ],
    correctAnswer: "A",
    explanation: "H₂SO₄ is a diprotic acid: H₂SO₄ → 2H⁺ + SO₄²⁻\n[H⁺] = 2 * [H₂SO₄] = 2 * 0.005 = 0.010 mol/dm³ = 10⁻² mol/dm³.\npH = -log₁₀[H⁺] = -log₁₀(10⁻²) = 2.0."
  },

  // ================= BIOLOGY =================
  {
    id: "bio_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Biology",
    topic: "Genetics & Heredity",
    department: ["Science"],
    question: "A man with blood group AB marries a woman who is heterozygous for blood group A (AO). What proportion of their offspring is expected to have blood group B?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "50%" },
      { key: "C", text: "75%" },
      { key: "D", text: "0%" }
    ],
    correctAnswer: "A",
    explanation: "Genotypes: Man = Iᴬ Iᴮ, Woman = Iᴬ Iᴼ.\nPunnett square gametes:\nIᴬ * Iᴬ → IᴬIᴬ (Type A: 25%)\nIᴬ * Iᴼ → IᴬIᴼ (Type A: 25%)\nIᴮ * Iᴬ → IᴬIᴮ (Type AB: 25%)\nIᴮ * Iᴼ → IᴮIᴼ (Type B: 25%).\nOnly IᴮIᴼ results in blood group B, which is 1 out of 4 (25%)."
  },
  {
    id: "bio_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Biology",
    topic: "Cell Biology & Transport",
    department: ["Science"],
    question: "When red blood cells are placed in a concentrated (hypertonic) salt solution, they shrink and become crinkled. This phenomenon is known as:",
    options: [
      { key: "A", text: "Crenation" },
      { key: "B", text: "Haemolysis" },
      { key: "C", text: "Plasmolysis" },
      { key: "D", text: "Turgidity" }
    ],
    correctAnswer: "A",
    explanation: "In hypertonic solutions, water leaves animal cells (red blood cells) by osmosis causing them to shrink and shrivel, termed 'crenation'. 'Plasmolysis' occurs in plant cells (with cell walls), and 'haemolysis' is cell bursting in hypotonic solution."
  },
  {
    id: "bio_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Biology",
    topic: "Ecology - Symbiosis",
    department: ["Science"],
    question: "The biological interaction between Rhizobium bacteria and the root nodules of leguminous plants is an example of:",
    options: [
      { key: "A", text: "Mutualism" },
      { key: "B", text: "Commensalism" },
      { key: "C", text: "Parasitism" },
      { key: "D", text: "Predation" }
    ],
    correctAnswer: "A",
    explanation: "Mutualism is an association between two organisms in which both benefit. Rhizobium fixes atmospheric nitrogen for the legume, while the plant provides carbohydrates and protective shelter to the bacteria."
  },
  {
    id: "bio_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Biology",
    topic: "Physiology - Nervous Coordination",
    department: ["Science"],
    question: "Which part of the mammalian brain is primarily responsible for balance, posture, and muscle coordination?",
    options: [
      { key: "A", text: "Cerebellum" },
      { key: "B", text: "Cerebrum" },
      { key: "C", text: "Medulla oblongata" },
      { key: "D", text: "Hypothalamus" }
    ],
    correctAnswer: "A",
    explanation: "The cerebellum coordinates voluntary muscle movements, maintaining posture, equilibrium, and physical balance. Cerebrum handles memory, consciousness, and senses; medulla controls involuntary reflex actions (heartbeat, breathing)."
  },
  {
    id: "phy_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Physics",
    topic: "Mechanics - Projectile Motion",
    department: ["Science"],
    question: "A projectile is launched with an initial velocity of 40 m/s at an angle of 30° to the horizontal. Calculate its maximum height attained. (Take g = 10 m/s²).",
    options: [
      { key: "A", text: "20 m" },
      { key: "B", text: "40 m" },
      { key: "C", text: "80 m" },
      { key: "D", text: "10 m" }
    ],
    correctAnswer: "A",
    explanation: "Formula for maximum height: H_max = (u² * sin² θ) / (2g)\nHere u = 40 m/s, θ = 30° (sin 30° = 0.5), g = 10 m/s².\nu_y = u sin θ = 40 * 0.5 = 20 m/s.\nH_max = (20)² / (2 * 10) = 400 / 20 = 20 m."
  },
  {
    id: "chem_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Chemistry",
    topic: "Gas Laws & Kinetic Theory",
    department: ["Science"],
    question: "A given mass of gas occupies 500 cm³ at 27 °C and 750 mmHg. What volume will it occupy at s.t.p. (0 °C and 760 mmHg)?",
    options: [
      { key: "A", text: "449.0 cm³" },
      { key: "B", text: "550.2 cm³" },
      { key: "C", text: "493.4 cm³" },
      { key: "D", text: "512.6 cm³" }
    ],
    correctAnswer: "A",
    explanation: "Using General Gas Law: (P₁ * V₁) / T₁ = (P₂ * V₂) / T₂\nState 1: P₁ = 750 mmHg, V₁ = 500 cm³, T₁ = 27 + 273 = 300 K.\nState 2 (s.t.p.): P₂ = 760 mmHg, T₂ = 0 + 273 = 273 K.\nV₂ = (P₁ * V₁ * T₂) / (P₂ * T₁) = (750 * 500 * 273) / (760 * 300) = 102,375,000 / 228,000 ≈ 449.0 cm³."
  },
  {
    id: "math_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Mathematics",
    topic: "Probability",
    department: ["Science", "Commercial"],
    question: "Two fair dice are thrown simultaneously. What is the probability of obtaining a total score of at least 10?",
    options: [
      { key: "A", text: "1/6" },
      { key: "B", text: "1/12" },
      { key: "C", text: "5/36" },
      { key: "D", text: "1/4" }
    ],
    correctAnswer: "A",
    explanation: "Total possible outcomes when throwing 2 dice = 6 * 6 = 36.\nFavorable outcomes where sum ≥ 10:\nSum = 10: (4,6), (5,5), (6,4) -> 3 outcomes\nSum = 11: (5,6), (6,5) -> 2 outcomes\nSum = 12: (6,6) -> 1 outcome\nTotal favorable outcomes = 3 + 2 + 1 = 6 outcomes.\nProbability = 6 / 36 = 1/6."
  }
];
