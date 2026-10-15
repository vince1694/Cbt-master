/**
 * Formula Cheatsheet & High-Yield Revision Hub
 * Comprehensive rapid revision cards for Mathematics, Physics, Chemistry,
 * Biology, Economics, Commercial & Accounts, Use of English, and Government/Arts.
 */

export const CHEATSHEET_DATA = {
  Mathematics: [
    {
      category: "Algebra",
      title: "Quadratic Formula & Nature of Roots",
      formula: "x = [-b ± √(b² - 4ac)] / 2a\nSum: α + β = -b/a\nProduct: αβ = c/a",
      explanation: "For equation ax² + bx + c = 0:\n• Discriminant Δ = b² - 4ac\n• Δ > 0: Two distinct real roots\n• Δ = 0: Two equal real roots (perfect square)\n• Δ < 0: Complex/imaginary roots\n• Quadratic from roots: x² - (sum)x + (product) = 0",
      tip: "If roots are α and β, the equation is x² - (α + β)x + αβ = 0."
    },
    {
      category: "Algebra",
      title: "Logarithm Laws & Base Change",
      formula: "log_b(xy) = log_b x + log_b y\nlog_b(x/y) = log_b x - log_b y\nlog_b(x^k) = k · log_b x\nChange of Base: log_b a = (log_c a) / (log_c b)",
      explanation: "Special identities:\n• log_a a = 1\n• log_a 1 = 0\n• a^(log_a x) = x\n• log_b (1/x) = -log_b x",
      tip: "Never distribute log over addition: log(x + y) ≠ log x + log y!"
    },
    {
      category: "Algebra",
      title: "Indices & Surds Rationalization",
      formula: "a^m · a^n = a^(m+n);  a^m / a^n = a^(m-n)\n(a^m)^n = a^(mn);  a^(-n) = 1/a^n\na^(1/n) = ⁿ√a;  a^(m/n) = ⁿ√(a^m)\nRationalizing: [1 / (√a + √b)] · [(√a - √b) / (√a - √b)]",
      explanation: "Surd Rules:\n• √(ab) = √a · √b\n• √(a/b) = √a / √b\n• Conjugate of (a + √b) is (a - √b)\n• (√a + √b)(√a - √b) = a - b",
      tip: "To rationalize a binomial denominator, multiply numerator and denominator by its conjugate."
    },
    {
      category: "Coordinate Geometry",
      title: "Distance, Midpoint, Slope & Lines",
      formula: "Distance: d = √[(x₂ - x₁)² + (y₂ - y₁)²]\nMidpoint: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)\nSlope: m = (y₂ - y₁) / (x₂ - x₁)\nLine Eq: y - y₁ = m(x - x₁)  or  y = mx + c",
      explanation: "Parallel & Perpendicular lines:\n• Parallel lines have identical slopes: m₁ = m₂\n• Perpendicular lines satisfy: m₁ · m₂ = -1 (m₂ = -1/m₁)\n• Angle between lines: tan θ = |(m₁ - m₂) / (1 + m₁m₂)|",
      tip: "The line perpendicular to 3x - 4y + 7 = 0 has a slope of -4/3."
    },
    {
      category: "Calculus",
      title: "Differentiation Rules",
      formula: "Power: d/dx(x^n) = n·x^(n-1)\nProduct: d/dx(uv) = u(dv/dx) + v(du/dx)\nQuotient: d/dx(u/v) = [v(du/dx) - u(dv/dx)] / v²\nChain Rule: dy/dx = (dy/du) · (du/dx)",
      explanation: "Trig Derivatives:\n• d/dx(sin x) = cos x\n• d/dx(cos x) = -sin x\n• d/dx(tan x) = sec² x\n• Stationary points occur where dy/dx = 0 (max if d²y/dx² < 0, min if d²y/dx² > 0).",
      tip: "At maximum or minimum turning points, dy/dx = 0."
    },
    {
      category: "Calculus",
      title: "Standard Integrals & Definite Integrals",
      formula: "∫ x^n dx = [x^(n+1) / (n + 1)] + C  (for n ≠ -1)\n∫ (1/x) dx = ln|x| + C\n∫ sin x dx = -cos x + C\n∫ cos x dx = sin x + C",
      explanation: "Area under a curve between x = a and x = b is given by ∫[a to b] y dx.\nVolume of revolution about x-axis: V = π ∫[a to b] y² dx.",
      tip: "Always remember to add the constant of integration (+ C) for indefinite integrals."
    },
    {
      category: "Series & Sequences",
      title: "AP & GP Formulas",
      formula: "AP: T_n = a + (n - 1)d;  S_n = (n/2)[2a + (n - 1)d]\nGP: T_n = ar^(n - 1);  S_n = a(1 - r^n) / (1 - r)\nSum to Infinity: S_∞ = a / (1 - r)  (for |r| < 1)",
      explanation: "• Arithmetic Mean of a and b = (a + b)/2\n• Geometric Mean of a and b = √(ab)\n• Common difference in AP: d = T₂ - T₁\n• Common ratio in GP: r = T₂ / T₁",
      tip: "Sum to infinity only exists when the common ratio |r| < 1."
    },
    {
      category: "Trigonometry",
      title: "Identities, Sine & Cosine Rules",
      formula: "sin²θ + cos²θ = 1;  1 + tan²θ = sec²θ\nSine Rule: a / sin A = b / sin B = c / sin C = 2R\nCosine Rule: a² = b² + c² - 2bc · cos A\nTriangle Area: Area = ½ab · sin C",
      explanation: "Double Angle Formulas:\n• sin 2θ = 2 sin θ cos θ\n• cos 2θ = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ\n• tan 2θ = (2 tan θ) / (1 - tan²θ)",
      tip: "Use the Cosine Rule when you are given 3 sides (SSS) or 2 sides and the included angle (SAS)."
    },
    {
      category: "Statistics",
      title: "Measures of Dispersion & Mean",
      formula: "Mean: x̄ = Σfx / Σf\nVariance: σ² = (Σfx² / Σf) - (x̄)²\nStandard Deviation: σ = √Variance\nCoefficient of Variation = (σ / x̄) · 100%",
      explanation: "• Mode = value with highest frequency\n• Median = middle value (or (N/2)th item in cumulative frequency curve)\n• Interquartile Range (IQR) = Q₃ - Q₁\n• Semi-interquartile Range = (Q₃ - Q₁) / 2",
      tip: "Adding a constant to every score changes the mean by that constant, but does NOT change the variance or standard deviation!"
    },
    {
      category: "Probability",
      title: "Permutations, Combinations & Probability",
      formula: "ⁿP_r = n! / (n - r)!\nⁿC_r = n! / [r! (n - r)!]\nP(A ∪ B) = P(A) + P(B) - P(A ∩ B)\nIndependent Events: P(A ∩ B) = P(A) · P(B)",
      explanation: "• Mutually Exclusive Events: P(A ∩ B) = 0 => P(A ∪ B) = P(A) + P(B)\n• Conditional Probability: P(A|B) = P(A ∩ B) / P(B)\n• 0! = 1 by definition",
      tip: "Use Permutation when ORDER matters (e.g. electing President, Vice President). Use Combination when order does NOT matter (e.g. selecting a committee)."
    },
    {
      category: "Mensuration",
      title: "2D & 3D Geometric Mensuration",
      formula: "Circle: Area = πr²;  Circumference = 2πr\nSector: Arc = (θ/360)·2πr;  Area = (θ/360)·πr²\nCylinder: Vol = πr²h;  Curved Area = 2πrh\nCone: Vol = ⅓πr²h;  Curved Area = πrl  (l = √(r² + h²))\nSphere: Vol = ⁴⁄₃πr³;  Surface Area = 4πr²",
      explanation: "Total surface area of closed cylinder = 2πrh + 2πr² = 2πr(h + r).\nTotal surface area of cone = πrl + πr² = πr(l + r).\nFrustum Volume = ⅓πH(R² + r² + Rr).",
      tip: "Watch out for whether a container is OPEN at one end, open at both ends, or fully CLOSED."
    },
    {
      category: "Commercial Arithmetic",
      title: "Simple & Compound Interest",
      formula: "Simple Interest: I = (P · R · T) / 100\nCompound Interest: A = P(1 + r/100)^n\nCompound Interest CI = A - P\nDepreciation: V = P(1 - r/100)^n",
      explanation: "Where:\n• P = Principal\n• R / r = Rate of interest per annum (%)\n• T / n = Time in years\n• A = Total amount accumulated at maturity",
      tip: "If compounded semi-annually (twice a year), divide rate by 2 and multiply time period n by 2!"
    }
  ],

  Physics: [
    {
      category: "Mechanics",
      title: "Uniformly Accelerated Motion & Projectiles",
      formula: "v = u + at\ns = ut + ½at²\nv² = u² + 2as\ns = [(u + v)/2] · t\nTime of Flight: T = (2u sin θ) / g\nMax Height: H = (u² sin² θ) / 2g\nRange: R = (u² sin 2θ) / g",
      explanation: "For vertical motion under gravity, a = -g (when moving up) and a = +g (when moving down).\n• At maximum height: v_y = 0\n• Maximum range occurs at launch angle θ = 45°",
      tip: "Maximum range R_max = u² / g when launched at 45°."
    },
    {
      category: "Mechanics",
      title: "Newton's Laws, Momentum & Collisions",
      formula: "F = ma = Δp / Δt\nImpulse: I = F · Δt = m(v - u)\nConservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
      explanation: "• Elastic collision: Both momentum and kinetic energy are conserved.\n• Inelastic collision: Momentum is conserved, KE is lost; bodies stick together: m₁u₁ + m₂u₂ = (m₁ + m₂)V\n• Rocket propulsion: F = v · (dm/dt)",
      tip: "Impulse equals the area under a Force-Time (F-t) graph."
    },
    {
      category: "Mechanics",
      title: "Work, Energy, Power & Machines",
      formula: "Work: W = F · s · cos θ\nKinetic Energy: KE = ½mv²\nPotential Energy: PE = mgh\nPower: P = W / t = F · v\nMechanical Advantage: MA = Load / Effort\nVelocity Ratio: VR = Dist_Effort / Dist_Load\nEfficiency: η = (MA / VR) · 100%",
      explanation: "Conservation of Energy: In a conservative field, KE + PE = Constant.\nFor an inclined plane of angle θ: VR = 1 / sin θ.\nFor a screw jack: VR = 2πr / pitch.\nFor gear system: VR = Teeth on driven gear / Teeth on driving gear.",
      tip: "Velocity ratio (VR) depends purely on the geometry of the machine and NEVER changes, whereas MA and Efficiency decrease due to friction."
    },
    {
      category: "Mechanics",
      title: "Circular Motion, Centripetal Force & SHM",
      formula: "Angular velocity: ω = v / r = 2πf\nCentripetal acceleration: a_c = v² / r = ω²r\nCentripetal force: F_c = mv² / r = mω²r\nSimple Pendulum: T = 2π√(l / g)\nLoaded Spring: T = 2π√(m / k)",
      explanation: "In Simple Harmonic Motion (SHM):\n• Acceleration a = -ω²x (directed towards equilibrium)\n• Maximum velocity at center: v_max = ωA\n• Maximum acceleration at extremes: a_max = ω²A",
      tip: "The period of a simple pendulum is INDEPENDENT of the mass of the bob!"
    },
    {
      category: "Gravitation",
      title: "Newton's Law of Gravitation & Satellites",
      formula: "F = (G · M · m) / r²\ng = GM / R²\nEscape Velocity: v_e = √(2gR) = √[(2GM) / R]\nOrbital Velocity: v_o = √(gR) = √[(GM) / R]",
      explanation: "Where G = Universal gravitational constant (6.67 × 10⁻¹¹ N·m²/kg²).\n• Kepler's 3rd Law: T² ∝ r³ (T²/r³ = Constant)\n• Note that v_e = √2 · v_o (Escape velocity is ~1.414 times orbital velocity).",
      tip: "On Earth's surface, escape velocity is approximately 11.2 km/s."
    },
    {
      category: "Thermal Physics",
      title: "Heat Capacity, Latent Heat & Expansivity",
      formula: "Q = mcΔθ  (Specific Heat Capacity)\nQ = CΔθ  (Heat Capacity C = mc)\nQ = mL  (Specific Latent Heat)\nLinear: α = ΔL / (L₁ · Δθ)\nArea: β = 2α;  Cubic: γ = 3α",
      explanation: "• Method of Mixtures: Heat Lost by hot body = Heat Gained by cold body + calorimeter.\n• Latent Heat of Fusion of ice = 3.36 × 10⁵ J/kg.\n• Latent Heat of Vaporization of water = 2.26 × 10⁶ J/kg.",
      tip: "During phase changes (melting, boiling), temperature remains CONSTANT: use Q = mL, not mcΔθ."
    },
    {
      category: "Waves & Optics",
      title: "Wave Speed, Snell's Law & Mirrors/Lenses",
      formula: "Wave Eq: v = fλ\nRefraction: n = sin i / sin r = c / v = Real Depth / Apparent Depth\nCritical Angle: sin c = 1 / n\nLens/Mirror: 1/f = 1/u + 1/v\nMagnification: m = v / u = Image Height / Object Height",
      explanation: "Sign Conventions:\n• Converging (convex lens / concave mirror): focal length f is POSITIVE.\n• Diverging (concave lens / convex mirror): focal length f is NEGATIVE.\n• Real image: v is positive; Virtual image: v is negative.",
      tip: "Power of a lens in Dioptres: P = 1 / f (in metres)."
    },
    {
      category: "Current Electricity",
      title: "Ohm's Law, Internal Resistance & Circuits",
      formula: "V = IR;  P = IV = I²R = V² / R\nEMF & Internal Resistance: E = I(R + r) = V + Ir\nLost Volts = Ir\nSeries: R_s = R₁ + R₂ + R₃\nParallel: 1/R_p = 1/R₁ + 1/R₂ => R_p = (R₁R₂) / (R₁ + R₂)",
      explanation: "Wheatstone Bridge at balance:\n• R₁ / R₂ = R₃ / R₄  (Galvanometer reads zero)\n• Conversion of Galvanometer to Ammeter: Connect small shunt resistor S in parallel: S = (I_g · R_g) / (I - I_g)\n• Conversion to Voltmeter: Connect high multiplier resistor M in series: M = (V / I_g) - R_g",
      tip: "Terminal p.d. V is strictly less than EMF E when current is flowing because of internal lost volts (Ir)."
    },
    {
      category: "Electrostatics & Magnetism",
      title: "Capacitance & Magnetic Forces",
      formula: "Capacitance: C = Q / V = (ε · A) / d\nStored Energy: W = ½QV = ½CV² = Q² / (2C)\nMagnetic Force on Charge: F = qvB sin θ\nMagnetic Force on Wire: F = BIL sin θ\nTransformer: V_p / V_s = N_p / N_s = I_s / I_p",
      explanation: "Capacitors in Series & Parallel (opposite of resistors!):\n• Parallel: C_total = C₁ + C₂ + C₃\n• Series: 1/C_total = 1/C₁ + 1/C₂\n• Transformer efficiency: η = (Output Power / Input Power) · 100% = (V_s I_s / V_p I_p) · 100%",
      tip: "Capacitors in parallel ADD directly, whereas resistors in series add directly."
    },
    {
      category: "Modern Physics",
      title: "Photoelectric Effect & Radioactive Half-Life",
      formula: "Photon Energy: E = hf = hc / λ\nPhotoelectric Eq: hf = W₀ + KE_max = hf₀ + ½mv_max²\nStopping Potential: eV_s = KE_max\nRadioactive Decay: N = N₀(½)^(t / T_½)\nMass-Energy: E = mc²",
      explanation: "Where:\n• h = Planck's constant (6.63 × 10⁻³⁴ J·s)\n• W₀ = Work function of metal = hf₀ (f₀ is threshold frequency)\n• T_½ = Half-life period\n• Decay constant λ = ln 2 / T_½ ≈ 0.693 / T_½",
      tip: "Increasing light INTENSITY increases photocurrent (number of electrons), but only increasing light FREQUENCY increases the maximum kinetic energy of emitted photoelectrons!"
    }
  ],

  Chemistry: [
    {
      category: "Stoichiometry",
      title: "Mole Concept, Molarity & Dilution",
      formula: "n = m / M  (mass / molar mass)\nn = V / 22.4 dm³  (at s.t.p.)\nn = (Number of particles) / N_A\nMolarity C = n / V = (m / M) / V(dm³)\nDilution: C₁V₁ = C₂V₂",
      explanation: "Avogadro's Number N_A = 6.02 × 10²³ particles/mol.\nAt s.t.p. (0 °C, 1 atm), 1 mole of any ideal gas occupies 22.4 dm³ = 22,400 cm³.\nPercentage Purity = (Mass of pure substance / Total mass of sample) · 100%.",
      tip: "Always convert volumes from cm³ to dm³ by dividing by 1,000 when computing molarity (mol/dm³)."
    },
    {
      category: "Gas Laws",
      title: "Combined Gas Laws & Graham's Diffusion",
      formula: "Boyle: P₁V₁ = P₂V₂  (T constant)\nCharles: V₁/T₁ = V₂/T₂  (P constant)\nCombined: (P₁V₁)/T₁ = (P₂V₂)/T₂\nIdeal Gas: PV = nRT\nDalton: P_total = P₁ + P₂ + P₃\nGraham: R₁ / R₂ = √(M₂ / M₁) = √(d₂ / d₁)",
      explanation: "Temperature MUST always be converted to Kelvin: T(K) = T(°C) + 273.\nStandard Temperature = 273 K; Standard Pressure = 760 mmHg = 1.013 × 10⁵ N/m².\nGraham's Law: Lighter gases (lower molar mass) diffuse faster than heavier gases.",
      tip: "Ammonia (NH₃, M=17) diffuses faster than Hydrogen Chloride (HCl, M=36.5). Ratio = √(36.5 / 17) ≈ 1.46."
    },
    {
      category: "Equilibrium & Energetics",
      title: "Chemical Equilibrium & Gibbs Free Energy",
      formula: "K_c = [C]^c · [D]^d / ([A]^a · [B]^b)\nΔH = ΣH(products) - ΣH(reactants)\nΔG = ΔH - TΔS",
      explanation: "For reaction aA + bB ⇌ cC + dD:\n• Le Chatelier's Principle: If an external stress is applied, equilibrium shifts to oppose it.\n• Increasing pressure shifts towards fewer gas moles.\n• For exothermic reactions (ΔH < 0), heating shifts equilibrium to the left.\n• Spontaneity criterion: Reaction is spontaneous if ΔG < 0.",
      tip: "A catalyst speeds up the forward and backward reactions EQUALLY; it does NOT change the position of equilibrium or the value of K_c."
    },
    {
      category: "Acids, Bases & Salts",
      title: "pH, pOH & Acid-Base Titration",
      formula: "pH = -log₁₀[H⁺]\npOH = -log₁₀[OH⁻]\npH + pOH = 14  (at 25 °C)\nK_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol²/dm⁶\nTitration: (C_a · V_a) / (C_b · V_b) = n_a / n_b",
      explanation: "Where:\n• C_a, C_b = molar concentrations of acid and base\n• V_a, V_b = volumes of acid and base reacted\n• n_a, n_b = mole ratio from balanced chemical equation\n• Strong acid + Weak base: Methyl Orange indicator (pH end point 3.1–4.4)\n• Weak acid + Strong base: Phenolphthalein indicator (pH end point 8.3–10.0)",
      tip: "If [H⁺] = 1 × 10⁻³ mol/dm³, pH = 3. If [OH⁻] = 1 × 10⁻⁴ mol/dm³, pOH = 4 and pH = 14 - 4 = 10."
    },
    {
      category: "Electrochemistry",
      title: "Faraday's Laws & Electrochemical Series",
      formula: "m = (M · I · t) / (n · F)\nQ = I · t\nCell EMF: E°_cell = E°_cathode - E°_anode",
      explanation: "Where:\n• m = mass of substance liberated (grams)\n• M = molar mass of element\n• I = current (Amperes); t = time in seconds\n• n = charge number / valency of ion (e.g. Cu²⁺ -> n = 2, Ag⁺ -> n = 1, Al³⁺ -> n = 3)\n• F = 1 Faraday = 96,500 Coulombs/mole of electrons\n• Oxidation occurs at the ANODE; Reduction occurs at the CATHODE (AnOx, RedCat).",
      tip: "To deposit 1 mole of Aluminium (Al³⁺), 3 Faradays (3 × 96,500 C) of charge are required."
    },
    {
      category: "Organic Chemistry",
      title: "Homologous Series General Formulas",
      formula: "Alkanes: C_n H_(2n+2)  (Saturated, substitution)\nAlkenes: C_n H_(2n)  (Unsaturated, addition)\nAlkynes: C_n H_(2n-2)  (Triple bond, addition)\nAlkanols: C_n H_(2n+1)OH\nAlkanoic Acids: C_n H_(2n+1)COOH\nEsters: R-COO-R'  (Sweet fruity smells)",
      explanation: "• Primary Alkanol oxidizes to Alkanal then Alkanoic acid.\n• Secondary Alkanol oxidizes to Alkanone (Ketone).\n• Saponification: Fat/Oil + Alkaline (NaOH/KOH) -> Soap + Glycerol.\n• Test for unsaturation: Decolorizes bromine water and acidified KMnO₄.",
      tip: "Ethanol heated with excess concentrated H₂SO₄ at 170 °C undergoes dehydration to yield Ethene (C₂H₄)."
    }
  ],

  Biology: [
    {
      category: "Genetics",
      title: "Mendelian Inheritance Ratios & Crosses",
      formula: "Monohybrid F2 Phenotypic: 3 : 1\nMonohybrid F2 Genotypic: 1 : 2 : 1\nDihybrid F2 Phenotypic: 9 : 3 : 3 : 1\nTest Cross: 1 : 1 (heterozygote × homozygous recessive)",
      explanation: "• Mendel's First Law: Law of Segregation of Genes\n• Mendel's Second Law: Law of Independent Assortment\n• Co-dominance / Incomplete dominance yields 1 : 2 : 1 in F2\n• Sex determination: Male = XY (heterogametic), Female = XX (homogametic)",
      tip: "A cross between a carrier female (X^H X^h) and normal male (X^H Y) produces 25% haemophilic sons, 0% haemophilic daughters."
    },
    {
      category: "Genetics & Blood",
      title: "ABO Blood Groups & Sickle Cell Genotypes",
      formula: "Blood Alleles: I^A, I^B, i\nGenotypes: I^A I^A, I^A i (A);  I^B I^B, I^B i (B);\nI^A I^B (AB);  ii (O)\nSickle Cell: HbA HbA (Normal), HbA HbS (Trait), HbS HbS (Sickler)",
      explanation: "• Universal Donor: Blood Group O (Rh-negative)\n• Universal Recipient: Blood Group AB (Rh-positive)\n• Rhesus incompatibility: Erythroblastosis foetalis occurs when Rh-negative mother carries Rh-positive foetus during second or subsequent pregnancies.",
      tip: "Individuals with HbA HbS trait have selective natural resistance against falciparum malaria."
    },
    {
      category: "Ecology",
      title: "Population Density & Mark-Recapture Index",
      formula: "Population Density = Total Population Size / Total Area\nLincoln-Petersen Index: N = (M · C) / R",
      explanation: "Where for mark-recapture:\n• N = Estimated total population\n• M = Number of animals marked and released in 1st sample\n• C = Total number of animals captured in 2nd sample\n• R = Number of marked animals recaptured in 2nd sample\n• Trophic pyramid: Only ~10% of energy is transferred from one trophic level to the next (Lindeman's 10% rule).",
      tip: "Because 90% of energy is lost as heat/metabolism at each trophic level, food chains rarely exceed 4 to 5 links."
    },
    {
      category: "Cell Physiology",
      title: "Respiration, Photosynthesis & RQ",
      formula: "Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP\nAnaerobic (Yeast): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP\nRespiratory Quotient: RQ = (Vol of CO₂ produced) / (Vol of O₂ consumed)",
      explanation: "• RQ for Carbohydrates = 1.0\n• RQ for Proteins = 0.8\n• RQ for Fats/Lipids = 0.7\n• Water Potential: Ψ = Ψ_s + Ψ_p (Water potential = Solute potential + Pressure potential)\n• Pure water has maximum water potential of zero (Ψ = 0).",
      tip: "Plasmolysis occurs when a plant cell is placed in a HYPERTONIC solution: water exits via exosmosis and cytoplasm shrinks away from cell wall."
    }
  ],

  Economics: [
    {
      category: "Microeconomics",
      title: "Elasticities of Demand & Supply",
      formula: "PED = (%ΔQ_d) / (%ΔP) = (ΔQ / ΔP) · (P₁ / Q₁)\nPES = (%ΔQ_s) / (%ΔP)\nIncome Elasticity: YED = (%ΔQ_d) / (%ΔY)\nCross Elasticity: XED = (%ΔQ_A) / (%ΔP_B)",
      explanation: "Interpretations:\n• |PED| > 1: Elastic; |PED| < 1: Inelastic; |PED| = 1: Unitary\n• YED > 0: Normal Good; YED < 0: Inferior Good (e.g. gari)\n• XED > 0: Substitute Goods (e.g. Milo and Bournvita)\n• XED < 0: Complementary Goods (e.g. Car and Petrol)\n• XED = 0: Unrelated Goods",
      tip: "Total revenue increases with price rise only when demand is INELASTIC."
    },
    {
      category: "Theory of Production",
      title: "Short-Run Cost & Revenue Equations",
      formula: "Total Cost: TC = TFC + TVC\nAverage Cost: AC = TC / Q = AFC + AVC\nMarginal Cost: MC = ΔTC / ΔQ\nTotal Revenue: TR = P · Q\nAverage Revenue: AR = TR / Q = P\nMarginal Revenue: MR = ΔTR / ΔQ",
      explanation: "Profit Maximization Condition:\n• Necessary condition: MC = MR\n• Sufficient condition: MC curve must cut MR curve from below\n• Normal profit occurs where TR = TC (AR = AC)\n• Shutdown point in short run: Price falls below minimum Average Variable Cost (P < AVC).",
      tip: "Marginal Cost (MC) intersects Average Variable Cost (AVC) and Average Total Cost (AC) at their MINIMUM points."
    },
    {
      category: "Macroeconomics",
      title: "National Income Accounting",
      formula: "GDP (Expenditure): GDP = C + I + G + (X - M)\nGNP = GDP + NFIA\nNNP = GNP - Depreciation (Capital Consumption)\nNational Income (NI) = NNP at factor cost\nReal GDP = [Nominal GDP / Price Deflator] · 100",
      explanation: "Where:\n• C = Private consumption; I = Investment; G = Government expenditure\n• X - M = Net exports\n• NFIA = Net Factor Income from Abroad\n• Personal Disposable Income = Personal Income - Direct Taxes",
      tip: "Transfer payments (pensions, gifts, unemployment benefits) are EXCLUDED from national income because they represent no productive output."
    },
    {
      category: "Macroeconomics",
      title: "Money Multiplier, Quantity Theory & Inflation",
      formula: "Fisher's Equation: M · V = P · T\nKeynesian Multiplier: K = 1 / MPS = 1 / (1 - MPC)\nMoney Multiplier: MM = 1 / Cash Reserve Ratio\nInflation Rate: [(CPI₂ - CPI₁) / CPI₁] · 100%",
      explanation: "Where in MV = PT:\n• M = Money supply; V = Velocity of money circulation\n• P = General price level; T = Volume of transactions\n• MPC + MPS = 1  (Marginal Propensity to Consume + Save = 1)\n• If MPC = 0.8, then MPS = 0.2 and Multiplier K = 1 / 0.2 = 5.",
      tip: "If government injects ₦100 million into an economy where MPC = 0.8, total national income increases by ₦100m × 5 = ₦500 million."
    }
  ],

  "Commercial & Accounts": [
    {
      category: "Accounting",
      title: "Accounting Equation & Balance Sheet",
      formula: "Assets = Capital + Liabilities\nCapital = Assets - Liabilities\nWorking Capital = Current Assets - Current Liabilities\nCapital Employed = Total Assets - Current Liabilities",
      explanation: "Fundamental Rules of Double Entry:\n• Debit the receiver / Debit all expenses and losses\n• Credit the giver / Credit all gains and revenues\n• Balance Sheet displays the financial position of a firm at a specific date.",
      tip: "Drawings decrease owner's Capital; Net Profit increases owner's Capital."
    },
    {
      category: "Financial Accounts",
      title: "Trading & Profit/Loss Equations",
      formula: "Cost of Goods Sold: COGS = Opening Stock + Net Purchases + Carriage Inwards - Closing Stock\nGross Profit = Turnover (Net Sales) - COGS\nNet Profit = Gross Profit + Other Incomes - Operating Expenses",
      explanation: "• Net Purchases = Purchases - Returns Outwards (Purchases Returns)\n• Net Sales = Sales - Returns Inwards (Sales Returns)\n• Carriage Inwards is added to Purchases; Carriage Outwards is an operating expense in Profit & Loss account.",
      tip: "Closing stock appears in BOTH the Trading Account (subtracted from goods available for sale) and the Balance Sheet (as a Current Asset)."
    },
    {
      category: "Financial Ratios",
      title: "Liquidity & Profitability Ratios",
      formula: "Current Ratio = Current Assets / Current Liabilities\nAcid-Test (Quick) Ratio = (Current Assets - Inventory) / Current Liabilities\nGross Profit Margin = (Gross Profit / Sales) · 100%\nNet Profit Margin = (Net Profit / Sales) · 100%\nROCE = [Operating Profit / Capital Employed] · 100%\nRate of Stock Turnover = COGS / Average Stock",
      explanation: "• Ideal Current Ratio is traditionally 2 : 1\n• Ideal Quick Ratio is 1 : 1 (tests immediate ability to pay debts without selling stock)\n• Average Stock = (Opening Stock + Closing Stock) / 2\n• Debtors Collection Period = (Trade Debtors / Credit Sales) · 365 days",
      tip: "Quick Ratio excludes Inventory/Stock because inventory cannot be converted into cash instantly."
    },
    {
      category: "Depreciation",
      title: "Straight-Line & Reducing Balance Methods",
      formula: "Straight Line: Annual Dep = (Cost - Scrap Value) / Useful Life\nReducing Balance: Dep = Book Value at start of year · Depreciation Rate",
      explanation: "• Straight-line depreciation charges equal amount every year.\n• Reducing balance charges higher depreciation in earlier years and progressively lower amounts in later years.\n• Net Book Value (NBV) = Historical Cost - Accumulated Depreciation.",
      tip: "Land does NOT depreciate under normal accounting standards; it appreciates."
    }
  ],

  "Use of English": [
    {
      category: "Concord & Syntax",
      title: "The Golden Concord Rules",
      formula: "Subject-Verb Agreement Principles",
      explanation: "1. Rule of Proximity: With 'Either...or' and 'Neither...nor', verb agrees with the CLOSER subject ('Neither the teacher nor the students WERE present').\n2. Accompaniment: Expressions like 'as well as', 'together with', 'in company of', 'alongside' do NOT make a subject plural. Verb agrees with the FIRST subject ('The president, alongside his ministers, IS travelling').\n3. Indefinite Pronouns: 'Everyone', 'everybody', 'nobody', 'each', 'either', 'neither' always take SINGULAR verbs ('Each of the suspects DENIES the claim').\n4. Collective Nouns acting as a unit take singular verbs ('The committee HAS submitted its report').",
      tip: "'More than one candidate HAS failed the test' (singular verb with 'more than one'!)."
    },
    {
      category: "Grammar & Structure",
      title: "Question Tags & Polarity Rules",
      formula: "Statement (+) → Tag (-)\nStatement (-) → Tag (+)",
      explanation: "Rules:\n• 'He is coming, isn't he?'\n• 'She rarely speaks, DOES she?' (Words like 'hardly', 'scarcely', 'rarely', 'barely', 'seldom' have negative force, so tag must be POSITIVE!).\n• 'Let's go, SHALL WE?'\n• 'I am late, AREN'T I?' (NOT amn't I).\n• Imperative commands take 'will you?': 'Close the door, will you?'",
      tip: "'He could scarcely hear the speaker, could he?' (Positive tag because 'scarcely' is negative!)."
    },
    {
      category: "Phonetics & Oral English",
      title: "Stress Patterns & Silent Letters",
      formula: "Syllable Accent Rules",
      explanation: "• Words ending in -ic, -sion, -tion, -ian, -cial have stress on the PENULTIMATE (second-to-last) syllable (e.g. eco-NO-mic, edu-CA-tion, spe-CI-fi-ca-tion).\n• Words ending in -ate, -ity, -ify, -phy, -gy have stress on the ANTEPENULTIMATE (third-to-last) syllable (e.g. de-MO-cra-cy, ca-PA-ci-ty, pho-TO-gra-phy).\n• Noun vs Verb shifts: Nouns stressed on 1st syllable (PRE-sent, IM-port, PRO-test); Verbs stressed on 2nd syllable (pre-SENT, im-PORT, pro-TEST).\n• Silent Letters: deBt, douBt, saLmon, PlumBer, suBtle, Psalm, reCeiPt, knoT.",
      tip: "'Plait' rhymes with 'flat' (/plæt/). 'Bury' rhymes with 'berry' (/beri/). 'Gauge' rhymes with 'page' (/ɡeɪdʒ/)."
    }
  ],

  "Government & Arts": [
    {
      category: "Political Science",
      title: "Forms of Government & Separation of Powers",
      formula: "Constitutional Principles",
      explanation: "• Separation of Powers (Baron de Montesquieu): Executive, Legislature, and Judiciary must be separated to prevent tyranny.\n• Checks and Balances: Each organ checks the excesses of other organs.\n• Rule of Law (A.V. Dicey): Supremacy of regular law, Equality before the law, Protection of individual fundamental human rights.\n• Parliamentary System: Executive is chosen from Legislature (fusion of powers); Head of State (Monarch/President) is ceremonial, Head of Government (Prime Minister) wields real power.\n• Presidential System: Executive is directly elected, separate from legislature; President is both Head of State and Head of Government.",
      tip: "Collective responsibility is the hallmark of the cabinet in a Parliamentary/Westminster system."
    },
    {
      category: "Nigerian Constitutional History",
      title: "Milestone Pre-Independence Constitutions",
      formula: "Chronology: 1922 → 1946 → 1951 → 1954",
      explanation: "1. Clifford Constitution (1922): Introduced the first ELECTIVE PRINCIPLE in Nigeria (4 legislative council seats: 3 for Lagos, 1 for Calabar).\n2. Richards Constitution (1946): Created Regional Councils (North, West, East) and promoted regionalism.\n3. Macpherson Constitution (1951): First nationwide constitutional conference; introduced semi-responsible government and ministerial positions.\n4. Lyttelton Constitution (1954): Established TRUE FEDERALISM in Nigeria, created the office of Regional Premiers and autonomous regions.",
      tip: "Elective principle was FIRST introduced by the Clifford Constitution of 1922."
    },
    {
      category: "Literature",
      title: "Figures of Speech & Literary Devices",
      formula: "Poetic & Dramatic Tropes",
      explanation: "• Metaphor: Direct comparison without 'like' or 'as' ('The classroom was a zoo').\n• Simile: Comparison using 'like' or 'as' ('He fought like a lion').\n• Synecdoche: Using a part to represent the whole ('All hands on deck').\n• Metonymy: Substituting the name of an attribute for that of the thing meant ('The Crown made an announcement').\n• Oxymoron: Placing contradictory words side by side ('bittersweet', 'deafening silence').\n• Irony: Contrast between expectation and reality (Verbal, Situational, Dramatic).\n• Enjambment: Running over of a sentence from one poetic line to the next without terminal punctuation.",
      tip: "'O death, where is thy sting?' is an APOSTROPHE (addressing an absent person or personified abstraction as if alive)."
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
            <span class="cs-pill-sec">JAMB &amp; WAEC Quick Reference (50+ Core Formulas)</span>
          </div>
          <h1 class="cs-title">Exam Formula &amp; Rule Cheatsheet</h1>
          <p class="cs-subtitle">High-yield equations, laws, concord rules, accounting balance equations, and memory tricks condensed for rapid review.</p>

          <!-- Search Bar -->
          <div class="cs-search-box">
            <span class="cs-search-icon">🔍</span>
            <input type="text" id="cs-search-input" class="cs-input" placeholder="Search formulas, laws, topics (e.g. quadratic, Snell, concord, moles, GDP, elasticity)..." value="${this.searchQuery}">
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
        card.explanation.toLowerCase().includes(q) ||
        (card.tip && card.tip.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      return `
        <div class="cs-empty-state">
          <span class="cs-empty-icon">🔎</span>
          <h3>No formula matched "${query}" in ${subject}</h3>
          <p>Try searching for a different keyword or explore another subject tab above.</p>
        </div>
      `;
    }

    return filtered.map((card) => `
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
            <span class="cs-tip-icon">💡 <strong>JAMB/WAEC Tip:</strong></span>
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
        if (grid) {
          grid.innerHTML = this.renderCardsHtml(this.activeSubject, this.searchQuery);
          this.attachCopyListeners(container);
        }
      });
    });

    // Search input
    const searchInput = container.querySelector("#cs-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim();
        const grid = container.querySelector("#cs-cards-grid");
        if (grid) {
          grid.innerHTML = this.renderCardsHtml(this.activeSubject, this.searchQuery);
          this.attachCopyListeners(container);
        }
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
        }).catch(() => {});
      });
    });
  }
};
