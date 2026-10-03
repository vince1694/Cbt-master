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
      { key: "A", text: "3" },
      { key: "B", text: "-1" },
      { key: "C", text: "-3" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "C",
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
      { key: "A", text: "7/2" },
      { key: "B", text: "5" },
      { key: "C", text: "3/2" },
      { key: "D", text: "5/2" }
    ],
    correctAnswer: "B",
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
      { key: "A", text: "16" },
      { key: "B", text: "14" },
      { key: "C", text: "18" },
      { key: "D", text: "20" }
    ],
    correctAnswer: "D",
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
  {
    id: "math_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Mathematics",
    topic: "Probability",
    department: ["Science", "Commercial"],
    question: "Two fair dice are thrown simultaneously. What is the probability of obtaining a total score of at least 10?",
    options: [
      { key: "A", text: "1/12" },
      { key: "B", text: "5/36" },
      { key: "C", text: "1/6" },
      { key: "D", text: "1/4" }
    ],
    correctAnswer: "C",
    explanation: "Total possible outcomes when throwing 2 dice = 6 * 6 = 36.\nFavorable outcomes where sum ≥ 10:\nSum = 10: (4,6), (5,5), (6,4) -> 3 outcomes\nSum = 11: (5,6), (6,5) -> 2 outcomes\nSum = 12: (6,6) -> 1 outcome\nTotal favorable outcomes = 3 + 2 + 1 = 6 outcomes.\nProbability = 6 / 36 = 1/6."
  },
  {
    id: "math_jamb_04",
    exam: "JAMB",
    year: "2023",
    subject: "Mathematics",
    topic: "Sequences & Series (A.P.)",
    department: ["Science", "Commercial"],
    question: "The 3rd term of an arithmetic progression (A.P.) is 10 and the 8th term is 25. Find the first term (a) and the common difference (d).",
    options: [
      { key: "A", text: "a = 2, d = 4" },
      { key: "B", text: "a = 4, d = 3" },
      { key: "C", text: "a = 3, d = 5" },
      { key: "D", text: "a = 1, d = 3" }
    ],
    correctAnswer: "B",
    explanation: "In an A.P., T_n = a + (n - 1)d.\nT_3 = a + 2d = 10\nT_8 = a + 7d = 25\nSubtracting (a + 2d = 10) from (a + 7d = 25) gives: 5d = 15 => d = 3.\nSubstitute d = 3: a + 2(3) = 10 => a = 10 - 6 = 4.\nTherefore, a = 4, d = 3."
  },
  {
    id: "math_jamb_05",
    exam: "JAMB",
    year: "2022",
    subject: "Mathematics",
    topic: "Matrices & Determinants",
    department: ["Science"],
    question: "Find the determinant of the 2x2 matrix | 4  -2 | \n                          | 3   5 |.",
    options: [
      { key: "A", text: "14" },
      { key: "B", text: "26" },
      { key: "C", text: "-26" },
      { key: "D", text: "23" }
    ],
    correctAnswer: "B",
    explanation: "For matrix | a  b | \n           | c  d |, determinant = (ad - bc).\nDet = (4 * 5) - (-2 * 3) = 20 - (-6) = 20 + 6 = 26."
  },
  {
    id: "math_jamb_06",
    exam: "JAMB",
    year: "2023",
    subject: "Mathematics",
    topic: "Coordinate Geometry",
    department: ["Science"],
    question: "Find the equation of the straight line passing through the points (2, 3) and (6, 11).",
    options: [
      { key: "A", text: "y = 3x - 3" },
      { key: "B", text: "2y = x + 4" },
      { key: "C", text: "y = 2x - 1" },
      { key: "D", text: "y = 4x - 5" }
    ],
    correctAnswer: "C",
    explanation: "Gradient m = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (6 - 2) = 8 / 4 = 2.\nUsing point-slope formula y - y₁ = m(x - x₁):\ny - 3 = 2(x - 2) => y - 3 = 2x - 4 => y = 2x - 1."
  },
  {
    id: "math_jamb_07",
    exam: "JAMB",
    year: "2024",
    subject: "Mathematics",
    topic: "Calculus - Definite Integration",
    department: ["Science"],
    question: "Evaluate the definite integral ∫ from 1 to 3 of (3x² - 2x + 1) dx.",
    options: [
      { key: "A", text: "18" },
      { key: "B", text: "24" },
      { key: "C", text: "22" },
      { key: "D", text: "20" }
    ],
    correctAnswer: "D",
    explanation: "Indefinite integral: ∫(3x² - 2x + 1)dx = x³ - x² + x + C.\nEvaluating at upper limit x = 3: (3³ - 3² + 3) = 27 - 9 + 3 = 21.\nEvaluating at lower limit x = 1: (1³ - 1² + 1) = 1 - 1 + 1 = 1.\nDefinite value = 21 - 1 = 20."
  },
  {
    id: "math_jamb_08",
    exam: "JAMB",
    year: "2022",
    subject: "Mathematics",
    topic: "Set Theory",
    department: ["Science", "Commercial"],
    question: "In a class of 40 students, 25 offer Mathematics, 18 offer Physics, and 8 offer both subjects. How many students offer neither Mathematics nor Physics?",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "7" },
      { key: "C", text: "3" },
      { key: "D", text: "10" }
    ],
    correctAnswer: "A",
    explanation: "Total students n(U) = 40.\nn(M ∪ P) = n(M) + n(P) - n(M ∩ P) = 25 + 18 - 8 = 35 students offering at least one subject.\nStudents offering neither = n(U) - n(M ∪ P) = 40 - 35 = 5."
  },
  {
    id: "math_jamb_09",
    exam: "JAMB",
    year: "2024",
    subject: "Mathematics",
    topic: "Statistics - Measures of Dispersion",
    department: ["Science", "Commercial"],
    question: "Find the variance of the sample set of numbers: 2, 4, 6, 8, 10.",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "8" },
      { key: "C", text: "6" },
      { key: "D", text: "10" }
    ],
    correctAnswer: "B",
    explanation: "Mean = (2 + 4 + 6 + 8 + 10) / 5 = 30 / 5 = 6.\nSquared deviations from mean: (2-6)² = 16, (4-6)² = 4, (6-6)² = 0, (8-6)² = 4, (10-6)² = 16.\nSum of squared deviations = 16 + 4 + 0 + 4 + 16 = 40.\nVariance = 40 / 5 = 8."
  },
  {
    id: "math_jamb_10",
    exam: "JAMB",
    year: "2023",
    subject: "Mathematics",
    topic: "Binary Operations",
    department: ["Science"],
    question: "An operation * is defined on the set of real numbers by a * b = a + b - 2ab. Find the identity element e under this operation.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "1/2" },
      { key: "C", text: "0" },
      { key: "D", text: "2" }
    ],
    correctAnswer: "C",
    explanation: "By definition of identity element: a * e = a.\na + e - 2ae = a => e - 2ae = 0 => e(1 - 2a) = 0.\nFor this to hold for all real numbers a, e must equal 0."
  },
  {
    id: "math_waec_03",
    exam: "WAEC",
    year: "2023",
    subject: "Mathematics",
    topic: "Mensuration - Solid Geometry",
    department: ["Science", "Commercial"],
    question: "A solid cone has base radius 7 cm and vertical height 24 cm. Calculate its total surface area. [Take π = 22/7].",
    options: [
      { key: "A", text: "616 cm²" },
      { key: "B", text: "550 cm²" },
      { key: "C", text: "704 cm²" },
      { key: "D", text: "850 cm²" }
    ],
    correctAnswer: "C",
    explanation: "Slant height l = √(r² + h²) = √(7² + 24²) = √(49 + 576) = √625 = 25 cm.\nTotal Surface Area = πr(r + l) = (22/7) * 7 * (7 + 25) = 22 * 32 = 704 cm²."
  },
  {
    id: "math_waec_04",
    exam: "WAEC",
    year: "2022",
    subject: "Mathematics",
    topic: "Circle Geometry",
    department: ["Science", "Commercial"],
    question: "In a circle with centre O, chord AB subtends an angle of 100° at the centre. Find the angle subtended by chord AB at the circumference in the major segment.",
    options: [
      { key: "A", text: "80°" },
      { key: "B", text: "100°" },
      { key: "C", text: "25°" },
      { key: "D", text: "50°" }
    ],
    correctAnswer: "D",
    explanation: "Theorem: The angle subtended by an arc or chord at the centre of a circle is twice the angle subtended by it at any point on the circumference in the alternate segment.\nAngle at circumference = 100° / 2 = 50°."
  },
  {
    id: "math_waec_05",
    exam: "WAEC",
    year: "2024",
    subject: "Mathematics",
    topic: "Modular Arithmetic",
    department: ["Science", "Commercial"],
    question: "Solve for x in the congruence equation: 3x ≡ 4 (mod 5).",
    options: [
      { key: "A", text: "x ≡ 1 (mod 5)" },
      { key: "B", text: "x ≡ 2 (mod 5)" },
      { key: "C", text: "x ≡ 3 (mod 5)" },
      { key: "D", text: "x ≡ 4 (mod 5)" }
    ],
    correctAnswer: "C",
    explanation: "Testing values mod 5:\nFor x = 1: 3(1) = 3 ≡ 3 (mod 5)\nFor x = 2: 3(2) = 6 ≡ 1 (mod 5)\nFor x = 3: 3(3) = 9 ≡ 4 (mod 5). Matches!\nTherefore, x ≡ 3 (mod 5)."
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
      { key: "A", text: "200 J" },
      { key: "B", text: "400 J" },
      { key: "C", text: "800 J" },
      { key: "D", text: "40 J" }
    ],
    correctAnswer: "B",
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
      { key: "A", text: "11.0 Ω" },
      { key: "B", text: "0.5 Ω" },
      { key: "C", text: "1.0 Ω" },
      { key: "D", text: "2.5 Ω" }
    ],
    correctAnswer: "C",
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
      { key: "A", text: "60 cm behind mirror, virtual" },
      { key: "B", text: "30 cm in front of mirror, real" },
      { key: "C", text: "20 cm in front of mirror, virtual" },
      { key: "D", text: "60 cm in front of mirror, real" }
    ],
    correctAnswer: "D",
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
  {
    id: "phy_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Physics",
    topic: "Mechanics - Projectile Motion",
    department: ["Science"],
    question: "A projectile is launched with an initial velocity of 40 m/s at an angle of 30° to the horizontal. Calculate its maximum height attained. (Take g = 10 m/s²).",
    options: [
      { key: "A", text: "40 m" },
      { key: "B", text: "20 m" },
      { key: "C", text: "80 m" },
      { key: "D", text: "10 m" }
    ],
    correctAnswer: "B",
    explanation: "Formula for maximum height: H_max = (u² * sin² θ) / (2g)\nHere u = 40 m/s, θ = 30° (sin 30° = 0.5), g = 10 m/s².\nu_y = u sin θ = 40 * 0.5 = 20 m/s.\nH_max = (20)² / (2 * 10) = 400 / 20 = 20 m."
  },
  {
    id: "phy_jamb_04",
    exam: "JAMB",
    year: "2023",
    subject: "Physics",
    topic: "Gravitational Fields",
    department: ["Science"],
    question: "Two objects of masses m₁ and m₂ are separated by a distance r. If the distance between them is doubled, the gravitational force of attraction between them will be:",
    options: [
      { key: "A", text: "Doubled" },
      { key: "B", text: "Halved" },
      { key: "C", text: "Quadrupled" },
      { key: "D", text: "Quartered (one-fourth of original)" }
    ],
    correctAnswer: "D",
    explanation: "Newton's Law of Universal Gravitation states F = G(m₁m₂)/r². Since gravitational force is inversely proportional to the square of the distance (F ∝ 1/r²), doubling r (2r)² = 4r² reduces the force to 1/4 of its initial value."
  },
  {
    id: "phy_jamb_05",
    exam: "JAMB",
    year: "2022",
    subject: "Physics",
    topic: "Sound Waves & Resonance",
    department: ["Science"],
    question: "The fundamental frequency of a closed organ pipe is 220 Hz. If the velocity of sound in air is 330 m/s, calculate the length of the pipe.",
    options: [
      { key: "A", text: "37.5 cm" },
      { key: "B", text: "75.0 cm" },
      { key: "C", text: "18.75 cm" },
      { key: "D", text: "50.0 cm" }
    ],
    correctAnswer: "A",
    explanation: "For a closed pipe, the fundamental frequency f = v / (4L).\nL = v / (4f) = 330 / (4 * 220) = 330 / 880 = 0.375 m = 37.5 cm."
  },
  {
    id: "phy_jamb_06",
    exam: "JAMB",
    year: "2024",
    subject: "Physics",
    topic: "Capacitors & Electrostatics",
    department: ["Science"],
    question: "Two capacitors of capacitances 4 µF and 6 µF are connected in series. What is the equivalent capacitance of the combination?",
    options: [
      { key: "A", text: "10.0 µF" },
      { key: "B", text: "2.4 µF" },
      { key: "C", text: "5.0 µF" },
      { key: "D", text: "1.2 µF" }
    ],
    correctAnswer: "B",
    explanation: "For series capacitors: 1/C_eq = 1/C₁ + 1/C₂.\n1/C_eq = 1/4 + 1/6 = (3 + 2)/12 = 5/12.\nC_eq = 12 / 5 = 2.4 µF."
  },
  {
    id: "phy_jamb_07",
    exam: "JAMB",
    year: "2023",
    subject: "Physics",
    topic: "Modern Physics - Photoelectric Effect",
    department: ["Science"],
    question: "The work function of a metal is 3.0 × 10⁻¹⁹ J. If light of frequency 8.0 × 10¹⁴ Hz shines on the metal, calculate the maximum kinetic energy of the emitted photoelectrons. (h = 6.63 × 10⁻³⁴ J·s).",
    options: [
      { key: "A", text: "5.30 × 10⁻¹⁹ J" },
      { key: "B", text: "1.15 × 10⁻¹⁹ J" },
      { key: "C", text: "2.30 × 10⁻¹⁹ J" },
      { key: "D", text: "3.00 × 10⁻¹⁹ J" }
    ],
    correctAnswer: "C",
    explanation: "Einstein's photoelectric equation: K.E_max = hf - W₀.\nPhoton energy E = hf = 6.63 × 10⁻³⁴ * 8.0 × 10¹⁴ = 5.304 × 10⁻¹⁹ J.\nK.E_max = 5.304 × 10⁻¹⁹ - 3.0 × 10⁻¹⁹ = 2.304 × 10⁻¹⁹ J ≈ 2.30 × 10⁻¹⁹ J."
  },
  {
    id: "phy_jamb_08",
    exam: "JAMB",
    year: "2022",
    subject: "Physics",
    topic: "Electromagnetic Induction - Transformers",
    department: ["Science"],
    question: "A step-down transformer has 500 turns in the primary coil and 100 turns in the secondary coil. If an input alternating voltage of 240 V is applied to the primary, calculate the output secondary voltage.",
    options: [
      { key: "A", text: "120 V" },
      { key: "B", text: "24 V" },
      { key: "C", text: "60 V" },
      { key: "D", text: "48 V" }
    ],
    correctAnswer: "D",
    explanation: "Transformer formula: V_s / V_p = N_s / N_p.\nV_s = V_p * (N_s / N_p) = 240 * (100 / 500) = 240 * 0.2 = 48 V."
  },
  {
    id: "phy_jamb_09",
    exam: "JAMB",
    year: "2024",
    subject: "Physics",
    topic: "Elasticity & Hooke's Law",
    department: ["Science"],
    question: "A spiral spring is stretched by 4 cm when a force of 10 N is applied. Calculate the strain energy stored in the spring.",
    options: [
      { key: "A", text: "0.20 J" },
      { key: "B", text: "0.40 J" },
      { key: "C", text: "2.00 J" },
      { key: "D", text: "40.0 J" }
    ],
    correctAnswer: "A",
    explanation: "Energy stored in stretched elastic material W = 1/2 * F * e.\nHere F = 10 N, extension e = 4 cm = 0.04 m.\nW = 1/2 * 10 * 0.04 = 5 * 0.04 = 0.20 Joules."
  },
  {
    id: "phy_jamb_10",
    exam: "JAMB",
    year: "2023",
    subject: "Physics",
    topic: "Hydrostatics - Fluid Pressure",
    department: ["Science"],
    question: "A diver descends to a depth of 25 m in seawater of density 1025 kg/m³. Calculate the hydrostatic pressure exerted on the diver at this depth. (Take g = 10 m/s²).",
    options: [
      { key: "A", text: "1.03 × 10⁵ N/m²" },
      { key: "B", text: "2.56 × 10⁵ N/m²" },
      { key: "C", text: "5.12 × 10⁵ N/m²" },
      { key: "D", text: "2.56 × 10⁴ N/m²" }
    ],
    correctAnswer: "B",
    explanation: "Liquid pressure P = ρ * g * h.\nP = 1025 kg/m³ * 10 m/s² * 25 m = 256,250 N/m² ≈ 2.56 × 10⁵ N/m²."
  },
  {
    id: "phy_waec_03",
    exam: "WAEC",
    year: "2023",
    subject: "Physics",
    topic: "Thermal Expansion",
    department: ["Science"],
    question: "The anomalous expansion of water occurs over which of the following temperature intervals?",
    options: [
      { key: "A", text: "100 °C to 104 °C" },
      { key: "B", text: "-4 °C to 0 °C" },
      { key: "C", text: "0 °C to 4 °C" },
      { key: "D", text: "4 °C to 10 °C" }
    ],
    correctAnswer: "C",
    explanation: "Unlike other liquids which expand uniformly when heated, pure water contracts when heated from 0 °C to 4 °C, achieving its maximum density at 4 °C. This abnormal behavior is termed the anomalous expansion of water."
  },
  {
    id: "phy_waec_04",
    exam: "WAEC",
    year: "2022",
    subject: "Physics",
    topic: "Geometric Optics - Refraction",
    department: ["Science"],
    question: "A ray of light travels from water into air. If the refractive index of water is 1.33, calculate the critical angle for the water-air interface.",
    options: [
      { key: "A", text: "30.0°" },
      { key: "B", text: "42.0°" },
      { key: "C", text: "60.0°" },
      { key: "D", text: "48.8°" }
    ],
    correctAnswer: "D",
    explanation: "Critical angle formula: sin c = 1 / n.\nsin c = 1 / 1.333 ≈ 0.7502.\nc = sin⁻¹(0.7502) ≈ 48.6° (approx. 48.8°)."
  },
  {
    id: "phy_waec_05",
    exam: "WAEC",
    year: "2024",
    subject: "Physics",
    topic: "Nuclear Physics - Radioactivity",
    department: ["Science"],
    question: "A radioactive isotope has a half-life of 6 days. If an initial sample has an activity of 800 Bq, what will be its activity after 24 days?",
    options: [
      { key: "A", text: "50 Bq" },
      { key: "B", text: "100 Bq" },
      { key: "C", text: "200 Bq" },
      { key: "D", text: "25 Bq" }
    ],
    correctAnswer: "A",
    explanation: "Number of half-lives elapsed n = Total time / Half-life = 24 / 6 = 4 half-lives.\nRemaining activity A = A₀ / 2ⁿ = 800 / (2⁴) = 800 / 16 = 50 Bq."
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
      { key: "A", text: "22.4 dm³" },
      { key: "B", text: "44.8 dm³" },
      { key: "C", text: "112.0 dm³" },
      { key: "D", text: "56.0 dm³" }
    ],
    correctAnswer: "C",
    explanation: "Balanced reaction equation: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O\nMolar mass of C₃H₈ = (3 * 12) + (8 * 1) = 36 + 8 = 44 g/mol.\nMoles of propane = 44 g / 44 g/mol = 1 mol.\nFrom stoichiometry: 1 mole of C₃H₈ requires 5 moles of O₂.\nVolume of O₂ at s.t.p = 5 mol * 22.4 dm³/mol = 112.0 dm³."
  },
  {
    id: "chem_waec_electrolysis_01",
    exam: "WAEC",
    year: "2023",
    subject: "Chemistry",
    topic: "Electrolysis & Electrochemistry",
    department: ["Science"],
    question: "During the electrolysis of dilute copper(II) tetraoxosulphate(VI) solution using inert platinum electrodes, what is discharged at the anode?",
    options: [
      { key: "A", text: "Copper metal" },
      { key: "B", text: "Hydrogen gas" },
      { key: "C", text: "Sulphur dioxide" },
      { key: "D", text: "Oxygen gas" }
    ],
    correctAnswer: "D",
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
    id: "chem_waec_ph_01",
    exam: "WAEC",
    year: "2022",
    subject: "Chemistry",
    topic: "Acids, Bases & Salts",
    department: ["Science"],
    question: "Calculate the pH of a 0.005 mol/dm³ solution of tetraoxosulphate(VI) acid (H₂SO₄), assuming complete ionization.",
    options: [
      { key: "A", text: "1.0" },
      { key: "B", text: "2.0" },
      { key: "C", text: "3.0" },
      { key: "D", text: "2.3" }
    ],
    correctAnswer: "B",
    explanation: "H₂SO₄ is a diprotic acid: H₂SO₄ → 2H⁺ + SO₄²⁻\n[H⁺] = 2 * [H₂SO₄] = 2 * 0.005 = 0.010 mol/dm³ = 10⁻² mol/dm³.\npH = -log₁₀[H⁺] = -log₁₀(10⁻²) = 2.0."
  },
  {
    id: "chem_jamb_gas_01",
    exam: "JAMB",
    year: "2024",
    subject: "Chemistry",
    topic: "Gas Laws & Kinetic Theory",
    department: ["Science"],
    question: "A given mass of gas occupies 500 cm³ at 27 °C and 750 mmHg. What volume will it occupy at s.t.p. (0 °C and 760 mmHg)?",
    options: [
      { key: "A", text: "550.2 cm³" },
      { key: "B", text: "493.4 cm³" },
      { key: "C", text: "449.0 cm³" },
      { key: "D", text: "512.6 cm³" }
    ],
    correctAnswer: "C",
    explanation: "Using General Gas Law: (P₁ * V₁) / T₁ = (P₂ * V₂) / T₂\nState 1: P₁ = 750 mmHg, V₁ = 500 cm³, T₁ = 27 + 273 = 300 K.\nState 2 (s.t.p.): P₂ = 760 mmHg, T₂ = 0 + 273 = 273 K.\nV₂ = (P₁ * V₁ * T₂) / (P₂ * T₁) = (750 * 500 * 273) / (760 * 300) = 102,375,000 / 228,000 ≈ 449.0 cm³."
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
      { key: "A", text: "50%" },
      { key: "B", text: "75%" },
      { key: "C", text: "0%" },
      { key: "D", text: "25%" }
    ],
    correctAnswer: "D",
    explanation: "Genotypes: Man = Iᴬ Iᴮ, Woman = Iᴬ Iᴼ.\nPunnett square gametes:\nIᴬ * Iᴬ → IᴬIᴬ (Type A: 25%)\nIᴬ * Iᴼ → IᴬIᴼ (Type A: 25%)\nIᴮ * Iᴬ → IᴬIᴮ (Type AB: 25%)\nIᴮ * Iᴼ → IᴮIᴼ (Type B: 25%).\nOnly IᴮIᴼ results in blood group B, which is 1 out of 4 (25%)."
  },
  {
    id: "bio_waec_crenation_01",
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
      { key: "A", text: "Commensalism" },
      { key: "B", text: "Mutualism" },
      { key: "C", text: "Parasitism" },
      { key: "D", text: "Predation" }
    ],
    correctAnswer: "B",
    explanation: "Mutualism is an association between two organisms in which both benefit. Rhizobium fixes atmospheric nitrogen for the legume, while the plant provides carbohydrates and protective shelter to the bacteria."
  },
  {
    id: "bio_waec_cerebellum_01",
    exam: "WAEC",
    year: "2022",
    subject: "Biology",
    topic: "Physiology - Nervous Coordination",
    department: ["Science"],
    question: "Which part of the mammalian brain is primarily responsible for balance, posture, and muscle coordination?",
    options: [
      { key: "A", text: "Cerebrum" },
      { key: "B", text: "Medulla oblongata" },
      { key: "C", text: "Cerebellum" },
      { key: "D", text: "Hypothalamus" }
    ],
    correctAnswer: "C",
    explanation: "The cerebellum coordinates voluntary muscle movements, maintaining posture, equilibrium, and physical balance. Cerebrum handles memory, consciousness, and senses; medulla controls involuntary reflex actions (heartbeat, breathing)."
  }
];
