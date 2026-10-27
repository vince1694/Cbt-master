/**
 * CBT Master — High-Yield Formula Vault Expansion
 * Adds 40 authentic, rigorously vetted formulas & revision rules for each of the 8 subjects:
 * Mathematics, Physics, Chemistry, Biology, Economics, Commercial & Accounts, Use of English, Government & Arts.
 */

export const EXTRA_FORMULAS = {
  Mathematics: [
    // Calculus & Coordinate Geometry
    {
      category: "Calculus",
      title: "Product Rule of Differentiation",
      formula: "d/dx [u · v] = u(dv/dx) + v(du/dx)",
      explanation: "Used when differentiating the product of two functions. Differentiate the first while keeping second constant, then differentiate second while keeping first constant.",
      tip: "If y = x² · sin x, then dy/dx = 2x sin x + x² cos x."
    },
    {
      category: "Calculus",
      title: "Quotient Rule of Differentiation",
      formula: "d/dx [u / v] = [v(du/dx) - u(dv/dx)] / v²",
      explanation: "Remember the mnemonic: 'Low d-High minus High d-Low, over the square of what's below'.",
      tip: "Always ensure v ≠ 0 in the domain. Be careful with the minus sign in the numerator."
    },
    {
      category: "Calculus",
      title: "Chain Rule (Function of a Function)",
      formula: "dy/dx = (dy/du) · (du/dx)",
      explanation: "Used for composite functions like y = (3x² - 5)⁴. Let u = 3x² - 5, so y = u⁴. Then dy/dx = 4u³ · 6x = 24x(3x² - 5)³.",
      tip: "Power rule shortcut: d/dx [f(x)]ⁿ = n[f(x)]ⁿ⁻¹ · f'(x)."
    },
    {
      category: "Calculus",
      title: "Standard Derivatives Cheat Table",
      formula: "d/dx(xⁿ) = n·xⁿ⁻¹\nd/dx(sin x) = cos x\nd/dx(cos x) = -sin x\nd/dx(tan x) = sec² x\nd/dx(eˣ) = eˣ\nd/dx(ln x) = 1/x",
      explanation: "Core building blocks for all JAMB UTME differential calculus questions.",
      tip: "Notice that derivatives of 'co-' functions (cos, cot, cosec) always have negative signs."
    },
    {
      category: "Calculus",
      title: "Stationary Points & Maxima/Minima",
      formula: "Stationary point when dy/dx = 0\n• Maximum if d²y/dx² < 0\n• Minimum if d²y/dx² > 0\n• Inflexion point if d²y/dx² = 0",
      explanation: "1. Find dy/dx and equate to 0 to get x-values.\n2. Substitute x into d²y/dx² to test concavity.\n3. Substitute x into original equation to get coordinates.",
      tip: "At maximum: curve bends down (negative second derivative). At minimum: curve bends up (positive)."
    },
    {
      category: "Calculus",
      title: "Indefinite Integration & Power Rule",
      formula: "∫ xⁿ dx = (xⁿ⁺¹)/(n + 1) + C  (for n ≠ -1)\n∫ 1/x dx = ln|x| + C\n∫ eᵏˣ dx = (1/k)eᵏˣ + C",
      explanation: "Integration is the reverse process of differentiation. Always add the arbitrary constant of integration (+ C) for indefinite integrals.",
      tip: "Common trap: ∫ (1/x) dx is ln|x| + C, NEVER x⁰/0!"
    },
    {
      category: "Calculus",
      title: "Definite Integration & Area Under Curve",
      formula: "Area = ∫[a to b] y dx = F(b) - F(a)\nArea between curves: ∫[a to b] [f(x) - g(x)] dx",
      explanation: "Definite integrals evaluate to a specific numerical value. No '+ C' is needed.",
      tip: "If area lies below the x-axis, the integral evaluates to negative; take absolute value for geometric area."
    },
    {
      category: "Calculus",
      title: "Trigonometric Integrals",
      formula: "∫ sin(kx) dx = -(1/k) cos(kx) + C\n∫ cos(kx) dx = (1/k) sin(kx) + C\n∫ sec²(kx) dx = (1/k) tan(kx) + C",
      explanation: "Frequent in WAEC and JAMB. Pay close attention to signs: integrating sin yields -cos.",
      tip: "∫ sin(2x) dx = -½ cos(2x) + C. Don't forget the factor of 1/k!"
    },
    {
      category: "Coordinate Geometry",
      title: "Distance Between Two Points",
      formula: "d = √[(x₂ - x₁)² + (y₂ - y₁)²]",
      explanation: "Derived directly from Pythagoras' Theorem on the Cartesian coordinate plane.",
      tip: "If coordinates are (0,0) and (x,y), distance is simply √(x² + y²)."
    },
    {
      category: "Coordinate Geometry",
      title: "Midpoint & Division of Line Segment",
      formula: "Midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2)\nInternal ratio m:n = ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))",
      explanation: "Midpoint is simply the average of x-coordinates and average of y-coordinates.",
      tip: "For external division by ratio m:n, replace '+' with '-' in formula: (mx₂ - nx₁)/(m - n)."
    },
    {
      category: "Coordinate Geometry",
      title: "Gradient (Slope) of a Straight Line",
      formula: "m = (y₂ - y₁) / (x₂ - x₁) = tan θ",
      explanation: "θ is the angle of inclination of the line with the positive x-axis.",
      tip: "Horizontal lines have m = 0; vertical lines have undefined (infinite) gradient."
    },
    {
      category: "Coordinate Geometry",
      title: "Parallel and Perpendicular Lines Condition",
      formula: "Parallel lines: m₁ = m₂\nPerpendicular lines: m₁ · m₂ = -1 ⟹ m₂ = -1/m₁",
      explanation: "Perpendicular gradients are negative reciprocals of each other.",
      tip: "If line 1 has slope ⅔, any perpendicular line has slope -3/2."
    },
    {
      category: "Coordinate Geometry",
      title: "Equation of a Straight Line Forms",
      formula: "Point-Slope: y - y₁ = m(x - x₁)\nSlope-Intercept: y = mx + c\nGeneral Form: Ax + By + C = 0 (Slope m = -A/B)",
      explanation: "Use point-slope when given a point and gradient; convert to slope-intercept for easy interpretation.",
      tip: "The gradient of 3x + 4y - 12 = 0 is m = -3/4, and y-intercept c = 3."
    },
    {
      category: "Coordinate Geometry",
      title: "Perpendicular Distance from Point to Line",
      formula: "d = |Ax₁ + By₁ + C| / √(A² + B²)",
      explanation: "Calculates the shortest (perpendicular) distance from point P(x₁, y₁) to line Ax + By + C = 0.",
      tip: "Always ensure the line equation is in standard Ax + By + C = 0 form before substituting."
    },
    {
      category: "Coordinate Geometry",
      title: "Equation of a Circle",
      formula: "Standard: (x - a)² + (y - b)² = r²\nGeneral: x² + y² + 2gx + 2fy + c = 0\nCentre: (-g, -f); Radius r = √(g² + f² - c)",
      explanation: "A circle centered at origin (0,0) has equation x² + y² = r².",
      tip: "If g² + f² - c < 0, the equation represents an imaginary circle with no real points."
    },
    {
      category: "Trigonometry",
      title: "Fundamental Pythagorean Identities",
      formula: "sin² θ + cos² θ = 1\n1 + tan² θ = sec² θ\n1 + cot² θ = cosec² θ",
      explanation: "Essential identities for simplifying expressions and proving trigonometric equations.",
      tip: "To find tan θ when sin θ is known: tan θ = sin θ / √(1 - sin² θ)."
    },
    {
      category: "Trigonometry",
      title: "Double Angle Formulas",
      formula: "sin 2θ = 2 sin θ cos θ\ncos 2θ = cos² θ - sin² θ = 2 cos² θ - 1 = 1 - 2 sin² θ\ntan 2θ = (2 tan θ) / (1 - tan² θ)",
      explanation: "High frequency in JAMB. Note the three alternate forms of cos 2θ.",
      tip: "Rearranging: cos² θ = (1 + cos 2θ)/2 and sin² θ = (1 - cos 2θ)/2 (half-angle substitutions)."
    },
    {
      category: "Trigonometry",
      title: "Compound Angle Formulas",
      formula: "sin(A ± B) = sin A cos B ± cos A sin B\ncos(A ± B) = cos A cos B ∓ sin A sin B\ntan(A ± B) = (tan A ± tan B) / (1 ∓ tan A tan B)",
      explanation: "Notice sign flip for cosine: cos(A + B) has a minus sign, cos(A - B) has a plus sign.",
      tip: "Use to find exact values: sin 75° = sin(45° + 30°) = (√6 + √2)/4."
    },
    {
      category: "Trigonometry",
      title: "Sine Rule and Cosine Rule for Non-Right Triangles",
      formula: "Sine Rule: a/sin A = b/sin B = c/sin C = 2R\nCosine Rule: a² = b² + c² - 2bc cos A\ncos A = (b² + c² - a²) / 2bc",
      explanation: "Use Sine Rule when given 2 angles and 1 side. Use Cosine Rule when given 3 sides (SSS) or 2 sides and included angle (SAS).",
      tip: "R in the Sine Rule is the radius of the circumcircle circumscribing the triangle."
    },
    {
      category: "Trigonometry",
      title: "Area of a Triangle Formulas",
      formula: "1. Area = ½ a b sin C\n2. Hero's Formula: Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2\n3. Base-Height: Area = ½ × base × height",
      explanation: "Hero's formula is ideal when all three sides are integers.",
      tip: "If a triangle has sides 5, 12, 13: s = 15, Area = √[15(10)(3)(2)] = √900 = 30."
    },
    {
      category: "Trigonometry",
      title: "Angles of Elevation, Depression & Bearings",
      formula: "Angle of Elevation = Angle of Depression (Alternate angles)\n3-Figure Bearing: Measured clockwise from North (000° to 360°)\nReverse Bearing: θ + 180° (if θ < 180°) or θ - 180° (if θ > 180°)",
      explanation: "Bearings are always written with 3 digits (e.g. 045°, 090°, 240°).",
      tip: "If the bearing of B from A is 070°, the bearing of A from B is 070° + 180° = 250°."
    },
    {
      category: "Sequences & Series",
      title: "Arithmetic Progression (A.P.)",
      formula: "n-th term: Tₙ = a + (n - 1)d\nSum of first n terms: Sₙ = n/2 [2a + (n - 1)d] = n/2 (a + l)",
      explanation: "a = first term, d = common difference (T₂ - T₁), l = last term.",
      tip: "If 3 numbers are in A.P., let them be (a - d), a, (a + d) to simplify their sum."
    },
    {
      category: "Sequences & Series",
      title: "Geometric Progression (G.P.)",
      formula: "n-th term: Tₙ = a · rⁿ⁻¹\nSum Sₙ = a(1 - rⁿ)/(1 - r) [r < 1] or a(rⁿ - 1)/(r - 1) [r > 1]\nSum to Infinity: S_∞ = a / (1 - r) (converges only if |r| < 1)",
      explanation: "a = first term, r = common ratio (T₂ / T₁).",
      tip: "A G.P. has a sum to infinity ONLY when -1 < r < 1."
    },
    {
      category: "Statistics",
      title: "Mean, Median & Mode of Ungrouped Data",
      formula: "Mean x̄ = (Σ x) / n\nMedian: Middle value when sorted in ascending order\nMode: Value with highest frequency",
      explanation: "If n is even, median is average of the two middle terms: ½(T_(n/2) + T_(n/2 + 1)).",
      tip: "Empirical relationship for moderately skewed distributions: Mode = 3 Median - 2 Mean."
    },
    {
      category: "Statistics",
      title: "Variance and Standard Deviation",
      formula: "Variance σ² = [Σ(x - x̄)²] / n = (Σ x²)/n - (x̄)²\nStandard Deviation σ = √Variance\nFor grouped data: σ = √[(Σ f(x - x̄)²) / Σ f]",
      explanation: "Standard deviation measures the dispersion or spread of data around the mean.",
      tip: "Adding a constant k to all data points leaves variance and standard deviation UNCHANGED!"
    },
    {
      category: "Statistics",
      title: "Mean Deviation & Semi-Interquartile Range",
      formula: "Mean Deviation = [Σ |x - x̄|] / n\nInterquartile Range = Q₃ - Q₁\nSemi-Interquartile Range = (Q₃ - Q₁) / 2",
      explanation: "Q₁ = 25th percentile (lower quartile), Q₃ = 75th percentile (upper quartile).",
      tip: "Interquartile range is robust against extreme outliers compared to standard deviation."
    },
    {
      category: "Probability",
      title: "Fundamental Probability Laws",
      formula: "P(A) = n(A) / n(S)\nAddition (Mutually Exclusive): P(A ∪ B) = P(A) + P(B)\nGeneral Addition: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)\nComplement: P(A') = 1 - P(A)",
      explanation: "n(A) = favorable outcomes, n(S) = total possible outcomes in sample space.",
      tip: "0 ≤ P(A) ≤ 1. Probability can NEVER be negative or greater than 1."
    },
    {
      category: "Probability",
      title: "Independent & Conditional Probability",
      formula: "Independent Events: P(A ∩ B) = P(A) · P(B)\nConditional Probability: P(A | B) = P(A ∩ B) / P(B)\nMultiplication Law: P(A ∩ B) = P(A) · P(B | A)",
      explanation: "Events are independent if occurrence of one does not affect the occurrence of the other.",
      tip: "Tossing a coin twice or rolling two dice are always independent events."
    },
    {
      category: "Permutations & Combinations",
      title: "Counting Principles: ⁿPᵣ and ⁿCᵣ",
      formula: "Permutation (Order matters): ⁿPᵣ = n! / (n - r)!\nCombination (Order does not matter): ⁿCᵣ = n! / [r!(n - r)!]\nCircular arrangement of n items: (n - 1)!",
      explanation: "Permutation is for arrangements (codes, races, ranks). Combination is for selections (teams, committees).",
      tip: "ⁿCᵣ = ⁿC_(n - r). E.g. ¹⁰C₈ = ¹⁰C₂ = (10 × 9)/2 = 45."
    },
    {
      category: "Vectors",
      title: "Vector Magnitude & Unit Vector",
      formula: "r = xi + yj ⟹ |r| = √(x² + y²)\nUnit vector r̂ = r / |r| = (xi + yj) / √(x² + y²)",
      explanation: "A unit vector has a magnitude of exactly 1 and points in the same direction as r.",
      tip: "If r = 3i - 4j, magnitude |r| = √(3² + (-4)²) = 5; unit vector = ⅗i - ⅘j."
    },
    {
      category: "Vectors",
      title: "Dot (Scalar) Product & Angle Between Vectors",
      formula: "a · b = |a||b| cos θ = a₁b₁ + a₂b₂\ncos θ = (a · b) / (|a| |b|)\nPerpendicular test: a · b = 0",
      explanation: "If dot product equals 0, the two vectors are perpendicular (orthogonal).",
      tip: "i · i = j · j = 1; while i · j = j · i = 0."
    },
    {
      category: "Geometry",
      title: "Polygon Angle Sum Theorems",
      formula: "Sum of interior angles = (n - 2) × 180° = (2n - 4) × 90°\nEach interior angle (regular n-gon) = [(n - 2) × 180°] / n\nSum of exterior angles = 360° (for ANY convex polygon)\nEach exterior angle = 360° / n",
      explanation: "Interior angle + Exterior angle = 180° at any vertex.",
      tip: "A regular hexagon (n = 6): Exterior = 360/6 = 60°, Interior = 180 - 60 = 120°."
    },
    {
      category: "Geometry",
      title: "Circle Theorems Rapid Summary",
      formula: "1. Angle at center = 2 × angle at circumference (subtended by same arc)\n2. Angle in semicircle = 90°\n3. Angles in same segment are equal\n4. Opposite angles of cyclic quadrilateral sum to 180°\n5. Alternate segment theorem: Angle between tangent and chord = angle in alternate segment",
      explanation: "Core circle theorems recurring in 100% of WAEC and JAMB geometry sections.",
      tip: "Tangents drawn from an external point to a circle are equal in length."
    },
    {
      category: "Mensuration",
      title: "Arc Length, Sector Area & Segment Area",
      formula: "Arc length L = (θ/360°) × 2πr = rθ (when θ in radians)\nSector Area A = (θ/360°) × πr² = ½ r² θ\nSegment Area = Sector Area - Triangle Area = ½ r²(θ - sin θ)",
      explanation: "θ is the angle subtended by the arc at the center of the circle.",
      tip: "To convert degrees to radians: multiply by (π/180°). 180° = π rad."
    },
    {
      category: "Mensuration",
      title: "3D Solid Volumes and Surface Areas",
      formula: "Cylinder: V = πr²h; Total Surface Area = 2πr(r + h)\nCone: V = ⅓πr²h; Curved Surface Area = πrl (where l = √(r²+h²))\nSphere: V = (4/3)πr³; Surface Area = 4πr²",
      explanation: "Memorize the relationship between radius, vertical height, and slant height for a cone: l² = r² + h².",
      tip: "A hemisphere has Curved Surface Area = 2πr², but Total Surface Area = 3πr² (includes flat circular base)."
    },
    {
      category: "Commercial Math",
      title: "Simple & Compound Interest",
      formula: "Simple Interest: I = (P × R × T) / 100\nCompound Amount: A = P(1 + r/n)^(nt)\nCompound Interest CI = A - P",
      explanation: "P = principal, R = annual rate %, T = time in years, n = compounding periods per year.",
      tip: "For semi-annual compounding (twice a year): rate is halved (r/2) and periods doubled (2t)."
    },
    {
      category: "Commercial Math",
      title: "Profit, Loss & Percentage Discount",
      formula: "Profit = Selling Price (SP) - Cost Price (CP)\n% Profit = (Profit / CP) × 100%\n% Loss = (Loss / CP) × 100%\nMarked Price - Discount = Selling Price",
      explanation: "Percentage profit or loss is ALWAYS calculated on the COST PRICE (CP), never on selling price.",
      tip: "If an item is sold at 20% profit: SP = 1.20 × CP. To find CP: CP = SP / 1.20."
    },
    {
      category: "Commercial Math",
      title: "Depreciation (Reducing Balance Method)",
      formula: "Book Value V = P(1 - r)ⁿ",
      explanation: "P = original cost, r = annual depreciation rate as a decimal, n = number of years.",
      tip: "Notice the minus sign compared to compound interest formula."
    },
    {
      category: "Algebra",
      title: "Linear Programming & Constraints",
      formula: "Objective Function: Z = ax + by (Maximize or Minimize)\nOptimal solution always occurs at one of the vertices (corner points) of the feasible region.",
      explanation: "Steps: 1. Graph inequality boundaries. 2. Shade feasible region. 3. Find coordinates of all corner vertices. 4. Evaluate Z at each vertex.",
      tip: "Test the corner points: the maximum value of Z among vertices is the global maximum."
    },
    {
      category: "Algebra",
      title: "Direct, Inverse & Joint Variation",
      formula: "Direct: y = kx\nInverse: y = k / x ⟹ xy = k\nJoint: y = k(xz) / w",
      explanation: "k is the constant of proportionality. Always solve for k first using initial conditions.",
      tip: "If y varies inversely as x², then y₁ · x₁² = y₂ · x₂²."
    }
  ],

  Physics: [
    {
      category: "Mechanics",
      title: "Newton's Laws of Motion",
      formula: "1st: v = const if F_net = 0\n2nd: F = dp/dt = ma (when mass is constant)\n3rd: F_AB = -F_BA (Equal and opposite action-reaction)",
      explanation: "Force is in Newtons (N), mass in kg, acceleration in m/s². 1 N = 1 kg·m/s².",
      tip: "Action and reaction forces act on TWO DIFFERENT bodies, so they never cancel each other out."
    },
    {
      category: "Mechanics",
      title: "Momentum & Principle of Conservation of Momentum",
      formula: "Linear Momentum p = m · v\nConservation: m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂\nInelastic (stick together): m₁u₁ + m₂u₂ = (m₁ + m₂)V",
      explanation: "Total momentum before collision equals total momentum after collision, provided no external resultant force acts.",
      tip: "In an elastic collision, BOTH momentum and kinetic energy are conserved. In inelastic, only momentum is conserved."
    },
    {
      category: "Mechanics",
      title: "Impulse of a Force",
      formula: "Impulse J = F · Δt = Δp = m(v - u)",
      explanation: "Impulse is the change in momentum. The unit is N·s or kg·m/s. Area under a Force-Time graph equals impulse.",
      tip: "Airbags increase collision time Δt, thereby reducing the impact force F on passengers."
    },
    {
      category: "Mechanics",
      title: "Work, Energy and Power",
      formula: "Work W = F · d · cos θ\nKinetic Energy KE = ½mv² = p² / 2m\nGravitational PE = mgh\nPower P = W / t = F · v",
      explanation: "Work is done only when displacement occurs in the direction of force. 1 Joule = 1 N·m.",
      tip: "If kinetic energy doubles, momentum increases by a factor of √2 (since p = √(2m·KE))."
    },
    {
      category: "Mechanics",
      title: "Friction & Angle of Friction",
      formula: "Limiting Friction F_s = μ_s · R\nDynamic Friction F_k = μ_k · R\nOn inclined plane at angle of repose θ: μ = tan θ",
      explanation: "μ is the dimensionless coefficient of friction. R is the normal reaction force (R = mg on flat horizontal surface).",
      tip: "Static friction coefficient μ_s is always greater than kinetic friction coefficient μ_k."
    },
    {
      category: "Mechanics",
      title: "Circular Motion & Centripetal Acceleration",
      formula: "Angular velocity ω = θ/t = 2π/T = 2πf\nLinear speed v = ω · r\nCentripetal acceleration a_c = v² / r = ω²r\nCentripetal Force F_c = (mv²) / r = mω²r",
      explanation: "Centripetal force is always directed inward towards the center of rotation, perpendicular to instantaneous velocity.",
      tip: "At the top of a vertical circular loop: minimum speed to avoid falling is v_min = √(rg)."
    },
    {
      category: "Mechanics",
      title: "Simple Harmonic Motion (SHM) Kinematics",
      formula: "Displacement: x = A sin(ωt)\nVelocity: v = ω√(A² - x²); Max velocity v_max = ωA (at x=0)\nAcceleration: a = -ω²x; Max acceleration a_max = ω²A (at x=±A)",
      explanation: "In SHM, acceleration is directly proportional to displacement and always directed towards equilibrium position.",
      tip: "Velocity is maximum at the equilibrium position (center); acceleration is maximum at the turning points (extremes)."
    },
    {
      category: "Mechanics",
      title: "Simple Pendulum & Mass-Spring Periods",
      formula: "Simple Pendulum: T = 2π√(L / g)\nMass-Spring: T = 2π√(m / k)\nFrequency f = 1/T = (1/2π)√(g/L)",
      explanation: "Period of a simple pendulum depends ONLY on length L and gravitational acceleration g, INDEPENDENT of bob mass or amplitude (for small angles).",
      tip: "To double the period of a pendulum, you must increase its length by a factor of 4."
    },
    {
      category: "Mechanics",
      title: "Gravitational Law & Orbital Velocity",
      formula: "Newton's Gravity: F = G(m₁m₂) / r²\nGravitational Field Strength g = GM / R²\nOrbital speed v_orb = √(GM / r)\nEscape velocity v_esc = √(2gR) = √(2GM / R)",
      explanation: "G = 6.67 × 10⁻¹¹ N·m²/kg². Escape velocity on Earth is approximately 11.2 km/s.",
      tip: "Escape velocity is exactly √2 times orbital velocity near Earth's surface (v_esc = √2 · v_orb)."
    },
    {
      category: "Mechanics",
      title: "Simple Machines: Mechanical Advantage, VR & Efficiency",
      formula: "Mechanical Advantage MA = Load / Effort = L / E\nVelocity Ratio VR = Distance moved by Effort / Distance moved by Load\nEfficiency η = (MA / VR) × 100% = (Work Output / Work Input) × 100%",
      explanation: "For an ideal (100% frictionless) machine, MA = VR. In reality, MA < VR due to friction.",
      tip: "For an inclined plane of length L and height h: VR = L / h = 1 / sin θ."
    },
    {
      category: "Thermal Physics",
      title: "Heat Capacity & Specific Heat Capacity",
      formula: "Heat absorbed/lost: Q = m · c · Δθ\nHeat Capacity C = m · c = Q / Δθ\nMethod of Mixtures: Heat Lost = Heat Gained\nm₁c₁(θ₁ - θ_final) = m₂c₂(θ_final - θ₂)",
      explanation: "c is specific heat capacity in J/(kg·K). Water has high specific heat capacity: c = 4200 J/(kg·K).",
      tip: "Neglect heat loss to surroundings unless calorimeter water equivalent is stated."
    },
    {
      category: "Thermal Physics",
      title: "Specific Latent Heat of Fusion & Vaporization",
      formula: "Q = m · L\nFusion (ice to water at 0°C): L_f = 3.36 × 10⁵ J/kg\nVaporization (water to steam at 100°C): L_v = 2.26 × 10⁶ J/kg",
      explanation: "Latent heat causes phase change with NO change in temperature.",
      tip: "Total heat to convert ice at -10°C to steam at 100°C: Q = m c_ice Δθ₁ + m L_f + m c_water Δθ₂ + m L_v."
    },
    {
      category: "Thermal Physics",
      title: "Thermal Expansion of Solids (Linear, Superficial, Cubical)",
      formula: "Linear: ΔL = L₀ · α · Δθ ⟹ L = L₀(1 + αΔθ)\nSuperficial: β ≈ 2α; ΔA = A₀ · β · Δθ\nCubical: γ ≈ 3α; ΔV = V₀ · γ · Δθ",
      explanation: "α is coefficient of linear expansivity (K⁻¹ or °C⁻¹).",
      tip: "Relationship: α : β : γ = 1 : 2 : 3. If linear expansivity is 1.2 × 10⁻⁵, cubical is 3.6 × 10⁻⁵."
    },
    {
      category: "Thermal Physics",
      title: "Ideal Gas Laws Combined",
      formula: "Boyle's: P₁V₁ = P₂V₂ (at const T)\nCharles': V₁/T₁ = V₂/T₂ (at const P)\nPressure: P₁/T₁ = P₂/T₂ (at const V)\nGeneral Gas Equation: (P₁V₁)/T₁ = (P₂V₂)/T₂ = nR",
      explanation: "Temperature MUST ALWAYS be converted to Absolute Kelvin scale: T(K) = θ(°C) + 273.",
      tip: "At STP: Standard Temperature = 273 K (0°C), Standard Pressure = 760 mmHg = 1.013 × 10⁵ N/m²."
    },
    {
      category: "Thermal Physics",
      title: "Relative Humidity & Dew Point",
      formula: "Relative Humidity (RH) = [S.V.P. at Dew Point / S.V.P. at Air Temp] × 100%\nRH = (Partial Pressure of Water Vapor / S.V.P. at current Temp) × 100%",
      explanation: "S.V.P. = Saturated Vapor Pressure. Dew point is the temperature at which water vapor in air becomes saturated.",
      tip: "When RH = 100%, condensation starts, dew forms, and wet-and-dry bulb thermometer readings are identical."
    },
    {
      category: "Waves & Sound",
      title: "Universal Wave Equation",
      formula: "v = f · λ = λ / T\nWave number k = 2π / λ\nAngular frequency ω = 2πf",
      explanation: "v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m), T = period (s).",
      tip: "When a wave travels from one medium to another (e.g. air to glass), frequency f remains constant while v and λ change."
    },
    {
      category: "Waves & Sound",
      title: "Stationary (Standing) Waves in Stretched Strings",
      formula: "Wave speed on string: v = √(T / μ) where μ = mass/length\nFundamental frequency (1st harmonic): f₁ = v / (2L) = (1/2L)√(T/μ)\nHarmonics: f_n = n · f₁ (n = 1, 2, 3, ...)",
      explanation: "T is tension in the string in Newtons, μ is linear mass density (kg/m).",
      tip: "To double the fundamental frequency of a wire, tension T must be quadrupled."
    },
    {
      category: "Waves & Sound",
      title: "Acoustic Resonance in Pipes (Open vs Closed)",
      formula: "Closed Pipe (one end closed):\nλ₁ = 4L ⟹ f₁ = v / (4L); Harmonics: 1f₁, 3f₁, 5f₁ (ODD only)\nOpen Pipe (both ends open):\nλ₁ = 2L ⟹ f₁ = v / (2L); Harmonics: 1f₁, 2f₁, 3f₁, 4f₁ (ALL harmonics)",
      explanation: "An open pipe produces a richer musical quality because it contains all integer harmonics.",
      tip: "For closed pipe resonance tube: end correction e can be accounted as L₁ + e = λ/4 and L₂ + e = 3λ/4 ⟹ λ = 2(L₂ - L₁)."
    },
    {
      category: "Waves & Sound",
      title: "Beat Frequency and Doppler Effect",
      formula: "Beat Frequency f_beat = |f₁ - f₂|\nDoppler Effect: f' = f [(v ± v_obs) / (v ∓ v_source)]",
      explanation: "Beats occur when two sound waves of slightly different frequencies superimpose, causing periodic waxing and waning of loudness.",
      tip: "Approaching source: observed frequency rises (f' > f). Receding source: observed frequency drops (f' < f)."
    },
    {
      category: "Optics",
      title: "Snell's Law & Refractive Index",
      formula: "n = sin i / sin r = v₁ / v₂ = λ₁ / λ₂\nReal vs Apparent Depth: n = Real Depth / Apparent Depth\nCritical Angle: sin C = 1 / n",
      explanation: "Light traveling from a denser to a rarer medium bends AWAY from normal. When angle of incidence i > C, Total Internal Reflection occurs.",
      tip: "Refractive index of water is 4/3 (1.33); glass is 3/2 (1.50); diamond is 2.42."
    },
    {
      category: "Optics",
      title: "Mirror and Thin Lens Equation",
      formula: "1/f = 1/u + 1/v\nMagnification m = v / u = Image Height / Object Height\nLens Power P = 1 / f (in meters) [Dioptres, D]",
      explanation: "Sign convention (Real is Positive):\n• f is positive for concave mirror & convex lens\n• f is negative for convex mirror & concave lens\n• v is positive for real images, negative for virtual images.",
      tip: "A converging lens with focal length 20 cm has power P = 1 / 0.20 m = +5.0 Dioptres."
    },
    {
      category: "Optics",
      title: "Compound Microscope & Astronomical Telescope",
      formula: "Microscope Magnification: M = m_obj × m_eye = (v_o / u_o) × (D / f_e)\nTelescope in Normal Adjustment: M = f_o / f_e\nLength of Telescope Tube: L = f_o + f_e",
      explanation: "D is the near point distance for normal eye (typically 25 cm). f_o = focal length of objective, f_e = focal length of eyepiece.",
      tip: "For high magnification in a telescope: choose an objective with long focal length and an eyepiece with short focal length."
    },
    {
      category: "Electricity",
      title: "Coulomb's Electrostatic Force Law",
      formula: "F = (1 / 4πε₀) · (q₁q₂ / r²) = k · (q₁q₂ / r²)\nElectric Field E = F / q = k · q / r²\nElectric Potential V = k · q / r",
      explanation: "k = 1/(4πε₀) ≈ 9.0 × 10⁹ N·m²/C². Like charges repel, opposite charges attract.",
      tip: "Electric field strength E is a vector (N/C or V/m); electric potential V is a scalar (Volts)."
    },
    {
      category: "Electricity",
      title: "Capacitance & Energy in a Capacitor",
      formula: "C = Q / V = (ε₀ · A) / d\nParallel Plate with Dielectric: C = (ε_r · ε₀ · A) / d\nEnergy Stored: W = ½ Q V = ½ C V² = Q² / (2C)",
      explanation: "Capacitance is measured in Farads (F). Inserting a dielectric of relative permittivity ε_r multiplies capacitance by ε_r.",
      tip: "Series capacitors add inversely: 1/C_eq = 1/C₁ + 1/C₂. Parallel capacitors add directly: C_eq = C₁ + C₂."
    },
    {
      category: "Electricity",
      title: "Ohm's Law, Resistivity & Temperature Effect",
      formula: "V = I · R\nResistance R = (ρ · L) / A = (4ρ · L) / (πd²)\nTemperature effect: R_θ = R₀(1 + αθ)",
      explanation: "ρ is electrical resistivity (Ω·m), L is length, A is cross-sectional area. If wire radius is halved, resistance increases by factor of 4.",
      tip: "Doubling wire length doubles resistance; doubling wire diameter divides resistance by 4."
    },
    {
      category: "Electricity",
      title: "Internal Resistance & Terminal Voltage",
      formula: "E = I(R + r) = V + Ir\nTerminal p.d. V = E - Ir\nLost Volts = I · r\nMax Power Transfer Theorem: occurs when external R = internal r",
      explanation: "E is electromotive force (EMF), r is internal resistance of cell, R is external load resistance.",
      tip: "When cell is in open circuit (no current flowing, I = 0): Terminal p.d. equals EMF."
    },
    {
      category: "Electricity",
      title: "Kirchhoff's Laws of Electric Circuits",
      formula: "1st (Current Law): Σ I_in = Σ I_out (Conservation of Charge)\n2nd (Voltage Law): Σ E = Σ (I · R) around any closed loop (Conservation of Energy)",
      explanation: "Junction rule: algebraic sum of currents entering a node equals zero. Loop rule: sum of potential differences around any closed loop is zero.",
      tip: "Kirchhoff's Current Law reflects conservation of charge; Voltage Law reflects conservation of energy."
    },
    {
      category: "Electricity",
      title: "Electrical Energy and Power (Joule's Law)",
      formula: "Power P = I · V = I²R = V² / R\nEnergy E = P · t = I V t = I² R t\nCost of Electricity = Power(kW) × Time(hours) × Unit Tariff(₦/kWh)",
      explanation: "1 kilowatt-hour (kWh) = 1000 W × 3600 s = 3.6 × 10⁶ Joules (commercial unit of electricity).",
      tip: "When resistors are in series, use P = I²R (current is same). When in parallel, use P = V²/R (voltage is same)."
    },
    {
      category: "Magnetism",
      title: "Magnetic Force on Moving Charge & Wire",
      formula: "Force on charge: F = q · v · B · sin θ\nForce on straight conductor: F = B · I · L · sin θ\nMagnetic Flux Φ = B · A · cos θ (Weber, Wb)",
      explanation: "B is magnetic flux density in Tesla (T). Direction of force is given by Fleming's Left Hand Rule.",
      tip: "If a charged particle moves parallel to a magnetic field (θ = 0°), magnetic force F = 0."
    },
    {
      category: "Magnetism",
      title: "Faraday's & Lenz's Laws of Induction",
      formula: "Induced EMF E = -N · (dΦ / dt)\nTransformer equation: V_s / V_p = N_s / N_p = I_p / I_s (for 100% ideal)",
      explanation: "Lenz's Law (the negative sign) states that the direction of induced current always opposes the change in flux producing it.",
      tip: "Step-up transformer: N_s > N_p (voltage increases, current decreases). Step-down: N_s < N_p."
    },
    {
      category: "AC Circuits",
      title: "Reactance & Impedance in AC Circuits",
      formula: "Inductive Reactance: X_L = 2πfL = ωL\nCapacitive Reactance: X_C = 1 / (2πfC) = 1 / (ωC)\nImpedance of RLC series: Z = √[R² + (X_L - X_C)²]\nOhm's Law in AC: V_rms = I_rms · Z",
      explanation: "Reactance is measured in Ohms (Ω). Current lags voltage by 90° in inductor; leads voltage by 90° in capacitor.",
      tip: "At DC (f = 0): X_L = 0 (inductor acts as short circuit), X_C = ∞ (capacitor blocks direct current)."
    },
    {
      category: "AC Circuits",
      title: "Resonance in RLC Series Circuit",
      formula: "Resonance occurs when X_L = X_C\nResonant Frequency: f₀ = 1 / [2π√(LC)]\nImpedance at resonance: Z_min = R\nCurrent at resonance: I_max = V / R",
      explanation: "At resonance, voltage and current are perfectly in phase (power factor cos φ = 1).",
      tip: "Resonant circuits are used for tuning radio and television receivers to select stations."
    },
    {
      category: "Modern Physics",
      title: "Photoelectric Effect (Einstein's Equation)",
      formula: "E_photon = h · f = h · c / λ\nhf = W₀ + KE_max = hf₀ + ½ m v_max² = hf₀ + e · V_s",
      explanation: "h = 6.63 × 10⁻³⁴ J·s (Planck's constant). W₀ is work function, f₀ is threshold frequency, V_s is stopping potential.",
      tip: "Photoelectric emission depends ONLY on frequency (must exceed f₀), NOT on intensity. Intensity only affects the rate of emission."
    },
    {
      category: "Modern Physics",
      title: "De Broglie Wavelength of Matter",
      formula: "λ = h / p = h / (m · v) = h / √(2m · KE)",
      explanation: "States that moving matter possesses both wave and particle duality. Proposed by Louis de Broglie.",
      tip: "Electrons with small mass have measurable de Broglie wavelengths, enabling electron microscopes."
    },
    {
      category: "Modern Physics",
      title: "Radioactive Decay Law & Half-Life",
      formula: "Decay Law: N = N₀ · e^(-λt) = N₀ · (½)^(t / T_half)\nHalf-Life T_½ = ln 2 / λ = 0.693 / λ\nActivity A = λ · N",
      explanation: "N₀ is original undecayed nuclei, N is remaining nuclei after time t, λ is decay constant.",
      tip: "After 3 half-lives, remaining fraction = (½)³ = ⅛ (12.5% remaining, 87.5% decayed)."
    },
    {
      category: "Modern Physics",
      title: "Mass Defect & Nuclear Binding Energy",
      formula: "Mass defect: Δm = [Z·m_p + (A - Z)m_n] - M_nucleus\nBinding Energy: E = Δm · c²\nUsing atomic mass units: E = Δm(amu) × 931.5 MeV",
      explanation: "Binding energy per nucleon (E / A) determines nuclear stability. Iron-56 has the highest binding energy per nucleon.",
      tip: "Nuclear fission splits heavy nuclei (e.g. U-235); nuclear fusion combines light nuclei (e.g. Deuterium + Tritium)."
    },
    {
      category: "Fluids",
      title: "Pressure in Liquids & Archimedes' Principle",
      formula: "Hydrostatic Pressure: P = h · ρ · g\nTotal Pressure: P_tot = P_atm + hρg\nUpthrust U = Weight of liquid displaced = V_displaced · ρ_liquid · g",
      explanation: "Archimedes' Principle: When a body is wholly or partially immersed in a fluid, it experiences an upthrust equal to the weight of fluid displaced.",
      tip: "Principle of Floatation: A floating body displaces its OWN WEIGHT of fluid (Upthrust = Weight of body)."
    },
    {
      category: "Fluids",
      title: "Continuity Equation & Bernoulli's Principle",
      formula: "Continuity: A₁v₁ = A₂v₂ = Volume flow rate Q (m³/s)\nBernoulli: P + ½ρv² + ρgh = constant",
      explanation: "As fluid flows into a narrow constriction, velocity increases and pressure decreases (Venturi effect).",
      tip: "Aerofoil lift, atomizers, and carburettors all operate on Bernoulli's principle."
    },
    {
      category: "Fluids",
      title: "Surface Tension & Capillary Rise",
      formula: "Surface tension γ = Force / Length = F / L (N/m)\nCapillary rise in tube: h = (2γ cos θ) / (r · ρ · g)",
      explanation: "θ is the contact angle. For pure water in clean glass, θ ≈ 0°, so cos θ = 1.",
      tip: "Adding detergents or heating water decreases its surface tension, enhancing cleaning power."
    },
    {
      category: "Optics",
      title: "Diffraction Grating & Dispersion",
      formula: "d · sin θ = n · λ\nGrating element d = 1 / N (where N = lines per meter)",
      explanation: "n is the order of the diffraction maximum (n = 1, 2, 3...).",
      tip: "Red light has longer wavelength than blue light (λ_red > λ_blue), so red is diffracted more by a grating, but refracted less by a prism."
    }
  ],

  Chemistry: [
    {
      category: "Physical Chemistry",
      title: "Mole Concept & Avogadro's Constant",
      formula: "Moles n = Mass(g) / Molar Mass(g/mol) = Number of particles / N_A\nN_A = 6.022 × 10²³ particles/mol\nVolume of gas at STP = n × 22.4 dm³ (or 24 dm³ at RTP)",
      explanation: "The mole is the standard SI unit for amount of substance.",
      tip: "Always convert volumes to dm³: 1000 cm³ = 1 dm³ = 1 Liter."
    },
    {
      category: "Physical Chemistry",
      title: "Molarity, Molality & Dilution Equation",
      formula: "Molarity M = Moles of solute / Volume of solution (dm³)\nM = [Mass(g) × 1000] / [Molar Mass × Volume(cm³)]\nDilution: C₁V₁ = C₂V₂",
      explanation: "When diluting a solution with water, the number of moles of solute remains constant.",
      tip: "To prepare 0.5 M solution from 2.0 M: C₁V₁ = C₂V₂ ⟹ 2(V₁) = 0.5(500) ⟹ V₁ = 125 cm³."
    },
    {
      category: "Physical Chemistry",
      title: "Percentage Purity & Percentage Yield",
      formula: "% Purity = [Mass of pure substance / Total mass of impure sample] × 100%\n% Yield = [Actual experimental yield / Theoretical stoichiometric yield] × 100%",
      explanation: "Actual yield is almost always lower than theoretical yield due to side reactions or incomplete recovery.",
      tip: "Calculate theoretical yield using mole ratios from the balanced chemical equation."
    },
    {
      category: "Physical Chemistry",
      title: "Empirical and Molecular Formula",
      formula: "Molecular Formula = (Empirical Formula)ₙ\nn = Molar Mass / Empirical Formula Mass\nRelative Vapor Density (V.D.): Molar Mass = 2 × V.D.",
      explanation: "Empirical formula gives the simplest whole-number ratio of atoms in a compound.",
      tip: "If a compound has V.D. = 39, its molar mass is 2 × 39 = 78 g/mol (Benzene, C₆H₆)."
    },
    {
      category: "Physical Chemistry",
      title: "Gas Laws: Graham's Law of Diffusion",
      formula: "R₁ / R₂ = √(M₂ / M₁) = √(d₂ / d₁) = t₂ / t₁",
      explanation: "Rate of diffusion of a gas is inversely proportional to the square root of its density or molar mass.",
      tip: "Lighter gases diffuse faster than heavier gases. NH₃ (17 g/mol) diffuses faster than HCl (36.5 g/mol)."
    },
    {
      category: "Physical Chemistry",
      title: "Dalton's Law of Partial Pressures",
      formula: "P_total = P_A + P_B + P_C + ...\nPartial Pressure P_A = Mole fraction x_A × P_total\nMole fraction x_A = n_A / (n_A + n_B + ...)",
      explanation: "When gas is collected over water: P_dry gas = P_total - Saturated Vapor Pressure of water.",
      tip: "Always subtract water vapor pressure (aqueous tension) when gas is collected over water."
    },
    {
      category: "Physical Chemistry",
      title: "Enthalpy Changes & Hess's Law",
      formula: "ΔH_reaction = Σ ΔH_f(products) - Σ ΔH_f(reactants)\nΔH_reaction = Σ (Bond Energies Broken) - Σ (Bond Energies Formed)\nExothermic: ΔH < 0; Endothermic: ΔH > 0",
      explanation: "Hess's Law: The total enthalpy change for a chemical reaction is independent of the pathway taken.",
      tip: "Bond breaking is ENDOTHERMIC (absorbs energy, +); bond forming is EXOTHERMIC (releases energy, -)."
    },
    {
      category: "Physical Chemistry",
      title: "Gibbs Free Energy & Spontaneity",
      formula: "ΔG = ΔH - T · ΔS\n• ΔG < 0: Reaction is SPONTANEOUS\n• ΔG = 0: System is at EQUILIBRIUM\n• ΔG > 0: Reaction is NON-SPONTANEOUS",
      explanation: "ΔH = enthalpy change, T = temperature in Kelvin, ΔS = entropy change (measure of disorder).",
      tip: "If ΔH is negative and ΔS is positive, the reaction is spontaneous at ALL temperatures."
    },
    {
      category: "Physical Chemistry",
      title: "Rate of Reaction & Collision Theory",
      formula: "Rate = -Δ[Reactant]/Δt = +Δ[Product]/Δt\nRate Law: Rate = k [A]ᵐ [B]ⁿ\nOverall Reaction Order = m + n",
      explanation: "Factors increasing rate: temperature (increases kinetic energy & fraction of molecules with E ≥ E_a), concentration, surface area, and catalyst.",
      tip: "A catalyst speeds up a reaction by providing an alternative reaction pathway with LOWER activation energy E_a, leaving ΔH unchanged."
    },
    {
      category: "Physical Chemistry",
      title: "Chemical Equilibrium (Kc and Kp)",
      formula: "For aA + bB ⇌ cC + dD:\nK_c = ([C]ᶜ [D]ᵈ) / ([A]ᵃ [B]ᵇ)\nLe Chatelier's: System shifts to counteract any imposed change",
      explanation: "Pure solids and pure liquids are omitted from equilibrium constant expressions.",
      tip: "Temperature is the ONLY factor that changes the numerical value of equilibrium constant K_c."
    },
    {
      category: "Inorganic Chemistry",
      title: "pH, pOH and Ion Product of Water (Kw)",
      formula: "pH = -log₁₀[H⁺] = -log₁₀[H₃O⁺]\npOH = -log₁₀[OH⁻]\npH + pOH = 14 (at 25°C)\nK_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ mol²/dm⁶",
      explanation: "[H⁺] = 10^(-pH). Neutral solution has pH = 7, acidic pH < 7, basic pH > 7.",
      tip: "If [OH⁻] = 1.0 × 10⁻⁴ M, pOH = 4, so pH = 14 - 4 = 10."
    },
    {
      category: "Inorganic Chemistry",
      title: "Acid-Base Titration Equation",
      formula: "(C_a · V_a) / n_a = (C_b · V_b) / n_b",
      explanation: "C_a = conc of acid, V_a = volume of acid, n_a = mole coefficient of acid in balanced equation; C_b, V_b, n_b for base.",
      tip: "For H₂SO₄ + 2NaOH ⟶ Na₂SO₄ + 2H₂O: n_a = 1, n_b = 2. Never forget the mole ratio!"
    },
    {
      category: "Inorganic Chemistry",
      title: "Buffer Solutions & Henderson-Hasselbalch",
      formula: "Acidic Buffer (Weak acid + its conjugate salt):\npH = pK_a + log([Salt] / [Acid])\nBasic Buffer: pOH = pK_b + log([Salt] / [Base])",
      explanation: "A buffer solution resists changes in pH when small amounts of acid or base are added.",
      tip: "Example of acidic buffer: CH₃COOH + CH₃COONa. Blood is buffered by H₂CO₃ / HCO₃⁻ system."
    },
    {
      category: "Electrochemistry",
      title: "Faraday's 1st Law of Electrolysis",
      formula: "m = Z · Q = Z · I · t\nMass m = (Molar Mass · I · t) / (n · F)",
      explanation: "m = mass deposited (g), I = current (A), t = time (s), n = valence / electrons transferred, F = Faraday's constant (96,500 C/mol).",
      tip: "1 Faraday (96,500 C) deposits 1 mole of monovalent ion (Ag⁺), ½ mole of divalent ion (Cu²⁺), ⅓ mole of trivalent ion (Al³⁺)."
    },
    {
      category: "Electrochemistry",
      title: "Faraday's 2nd Law of Electrolysis",
      formula: "m₁ / E₁ = m₂ / E₂\nEquivalent weight E = Molar Mass / Valence",
      explanation: "When the same quantity of electricity passes through different electrolytes, the masses of substances liberated are directly proportional to their chemical equivalents.",
      tip: "Passing 1 F through CuSO₄ and AgNO₃ deposits: 108g of Ag (108/1) and 31.75g of Cu (63.5/2)."
    },
    {
      category: "Electrochemistry",
      title: "Standard Electrode Potential & Cell EMF",
      formula: "E°_cell = E°_cathode (reduction) - E°_anode (oxidation)\nSpontaneous if E°_cell > 0\nΔG° = -n · F · E°_cell",
      explanation: "Anode is where oxidation occurs (loss of e⁻). Cathode is where reduction occurs (gain of e⁻). Mnemonic: AN OX, RED CAT.",
      tip: "In a Daniell Cell (Zn | Zn²⁺ || Cu²⁺ | Cu): E° = +0.34 - (-0.76) = +1.10 V."
    },
    {
      category: "Organic Chemistry",
      title: "Homologous Series General Formulas",
      formula: "Alkanes: CₙH₂ₙ₊₂ (Saturated, substitution reactions)\nAlkenes: CₙH₂ₙ (Unsaturated double bond C=C, addition)\nAlkynes: CₙH₂ₙ₋₂ (Unsaturated triple bond C≡C)\nAlkanols (Alcohols): CₙH₂ₙ₊₁OH\nAlkanoic Acids: CₙH₂ₙ₊₁COOH\nAlkanoates (Esters): R-COO-R'",
      explanation: "Adjacent members of a homologous series differ by a -CH₂- unit (mass of 14 amu).",
      tip: "Bromine water test: Alkenes and alkynes decolorize brown bromine water immediately; alkanes do not."
    },
    {
      category: "Organic Chemistry",
      title: "Oxidation Cascade of Primary and Secondary Alcohols",
      formula: "Primary alcohol ⟶ [O] ⟶ Alkanal (Aldehyde) ⟶ [O] ⟶ Alkanoic acid\nSecondary alcohol ⟶ [O] ⟶ Alkanone (Ketone)\nTertiary alcohol ⟶ Resistant to oxidation",
      explanation: "Common oxidizing agents: Acidified K₂Cr₂O₇ (orange to green) or Acidified KMnO₄ (purple to colorless).",
      tip: "Ethanol (CH₃CH₂OH) oxidizes to Ethanal (CH₃CHO), then to Ethanoic acid (CH₃COOH)."
    },
    {
      category: "Organic Chemistry",
      title: "Esterification & Saponification",
      formula: "Esterification: Alkanoic acid + Alkanol ⇌ (conc. H₂SO₄) ⇌ Ester + Water\nSaponification (Soap making): Fat/Oil + 3NaOH ⟶ Glycerol + 3 Soap (Sodium salt)",
      explanation: "Esters have characteristic pleasant, fruity odors used in flavorings and perfumes.",
      tip: "Conc. H₂SO₄ acts as both a catalyst and a dehydrating agent to shift equilibrium toward ester formation."
    },
    {
      category: "Organic Chemistry",
      title: "Isomerism: Structural vs Geometric",
      formula: "Structural: Chain, Position, Functional Group isomers\nGeometric (Stereo): Cis-Trans isomerism (requires restricted C=C rotation with different groups on each carbon)",
      explanation: "Compounds with identical molecular formula but different structural arrangements.",
      tip: "Functional group isomers: Ethanol (CH₃CH₂OH) and Methoxymethane (CH₃-O-CH₃) both share formula C₂H₆O."
    },
    {
      category: "Inorganic Chemistry",
      title: "Solubility Product Constant (Ksp)",
      formula: "For A_x B_y(s) ⇌ xA^(y+) + yB^(x-):\nK_sp = [A^(y+)]ˣ · [B^(x-)]ʸ\nPrecipitation occurs if Ionic Product > K_sp",
      explanation: "Applies to sparingly soluble salts. Common ion effect decreases the solubility of the salt.",
      tip: "For AgCl: K_sp = [Ag⁺][Cl⁻] = s². Solubility s = √(K_sp)."
    },
    {
      category: "Inorganic Chemistry",
      title: "Periodic Trends Summary",
      formula: "Across a Period (Left ⟶ Right):\n• Atomic radius DECREASES\n• Ionization energy INCREASES\n• Electronegativity INCREASES\nDown a Group (Top ⟶ Bottom):\n• Atomic radius INCREASES\n• Ionization energy DECREASES",
      explanation: "Fluorine is the most electronegative element (Pauling scale 4.0). Cesium/Francium are the most electropositive.",
      tip: "Noble gases have the highest first ionization energies in their respective periods due to stable octet shells."
    },
    {
      category: "Inorganic Chemistry",
      title: "Oxidation Numbers Rules",
      formula: "1. Free element = 0 (e.g. O₂, Na, Cl₂)\n2. Group 1 metals = +1; Group 2 = +2\n3. Oxygen = -2 (except in peroxides H₂O₂ where it is -1, and OF₂ where it is +2)\n4. Hydrogen = +1 (except in metal hydrides NaH where it is -1)\n5. Sum in neutral compound = 0; in polyatomic ion = ion charge",
      explanation: "Oxidation is an increase in oxidation state; Reduction is a decrease in oxidation state.",
      tip: "In KMnO₄: 1(+1) + Mn + 4(-2) = 0 ⟹ Mn = +7."
    },
    {
      category: "Inorganic Chemistry",
      title: "Qualitative Cation Analysis Tests",
      formula: "• Cu²⁺ + NaOH ⟶ Pale blue ppt, insoluble in excess; + NH₃ ⟶ Deep blue solution\n• Fe²⁺ + NaOH ⟶ Dirty green ppt, insoluble in excess\n• Fe³⁺ + NaOH ⟶ Reddish-brown ppt, insoluble in excess\n• Zn²⁺ + NaOH ⟶ White gelatinous ppt, SOLUBLE in excess (amphoteric)\n• Al³⁺ + NaOH ⟶ White ppt, SOLUBLE in excess",
      explanation: "Confirmatory distinguishing test: Zn²⁺ ppt is soluble in excess aqueous ammonia; Al³⁺ and Pb²⁺ are insoluble in excess NH₃.",
      tip: "To distinguish Al³⁺ from Pb²⁺: add dilute HCl or KI. Pb²⁺ forms yellow ppt (PbI₂) with KI, Al³⁺ does not."
    },
    {
      category: "Inorganic Chemistry",
      title: "Qualitative Anion Analysis Tests",
      formula: "• CO₃²⁻ + dilute acid ⟶ Effervescence of CO₂ (turns lime water milky)\n• SO₄²⁻ + BaCl₂ + dilute HCl ⟶ White precipitate of BaSO₄ (insoluble in acid)\n• Cl⁻ + AgNO₃ + dilute HNO₃ ⟶ White ppt of AgCl (soluble in aqueous NH₃)\n• NO₃⁻ + FeSO₄ + conc. H₂SO₄ ⟶ Brown Ring test at liquid junction",
      explanation: "Acidifying with dilute acid before adding reagents removes interfering carbonate ions.",
      tip: "AgCl ppt dissolves in dilute NH₃; AgBr dissolves only in concentrated NH₃; AgI is insoluble in NH₃."
    },
    {
      category: "Inorganic Chemistry",
      title: "Allotropy of Carbon and Sulfur",
      formula: "Carbon Allotropes: Diamond (giant 3D tetrahedral network, hardest natural substance, non-conductor) vs Graphite (hexagonal layers, sp² hybridized, free mobile electrons, electrical conductor)\nSulfur Allotropes: Rhombic (stable below 96°C) vs Monoclinic (stable above 96°C)",
      explanation: "Allotropy is the existence of an element in two or more different physical forms in the same physical state.",
      tip: "Graphite conducts electricity because each carbon atom uses only 3 valence electrons for bonding, leaving 1 delocalized electron."
    },
    {
      category: "Nuclear Chemistry",
      title: "Radioactive Emissions (Alpha, Beta, Gamma)",
      formula: "Alpha decay (⁴₂He): ᴬ_Z X ⟶ ᴬ⁻⁴_(Z-2) Y + ⁴₂α\nBeta decay (⁰₋₁e): ᴬ_Z X ⟶ ᴬ_(Z+1) Y + ⁰₋₁β\nGamma emission (⁰₀γ): High-energy electromagnetic photon, no mass or charge change",
      explanation: "Alpha has highest ionizing power, lowest penetrating power (stopped by paper). Gamma has highest penetrating power (stopped by thick lead).",
      tip: "In beta emission, atomic number Z increases by 1, while mass number A remains constant."
    },
    {
      category: "Industrial Chemistry",
      title: "Haber Process for Ammonia Synthesis",
      formula: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)   ΔH = -92 kJ/mol\nOptimal conditions:\n• Catalyst: Finely divided Iron (Fe) with promoter K₂O / Al₂O₃\n• Temperature: 450°C - 500°C\n• Pressure: 200 atm",
      explanation: "Exothermic reaction: Lower temp favors yield but slows rate; 450°C is an economic compromise temperature.",
      tip: "High pressure (200 atm) favors ammonia production because 4 moles of gaseous reactants produce 2 moles of products."
    },
    {
      category: "Industrial Chemistry",
      title: "Contact Process for Sulfuric Acid",
      formula: "Key stage: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)   ΔH = -197 kJ/mol\nConditions: Vanadium(V) oxide (V₂O₅) catalyst, 450°C, 1 - 2 atm\nSO₃ + H₂SO₄ ⟶ H₂S₂O₇ (Oleum); Oleum + H₂O ⟶ 2H₂SO₄",
      explanation: "SO₃ is not dissolved directly in water because the reaction is violently exothermic, producing a corrosive acid mist.",
      tip: "V₂O₅ replaced expensive Platinum as catalyst in modern Contact Process plants."
    },
    {
      category: "Environmental Chemistry",
      title: "Greenhouse Effect & Acid Rain Chemistry",
      formula: "Greenhouse Gases: CO₂, CH₄, N₂O, CFCs, H₂O vapor\nAcid Rain Formations:\nSO₂ + H₂O ⟶ H₂SO₃; 2SO₂ + O₂ + 2H₂O ⟶ 2H₂SO₄\n4NO₂ + O₂ + 2H₂O ⟶ 4HNO₃",
      explanation: "Acid rain has pH < 5.6, corroding limestone structures and leaching aluminum toxic to aquatic life.",
      tip: "Carbon monoxide (CO) is toxic because it binds irreversibly with hemoglobin to form carboxyhemoglobin, blocking oxygen transport."
    },
    {
      category: "Physical Chemistry",
      title: "Quantum Numbers & Electronic Configuration",
      formula: "n: Principal quantum number (shell 1,2,3,4...)\nl: Azimuthal/orbital angular momentum (0 to n-1: s=0, p=1, d=2, f=3)\nm_l: Magnetic (-l to +l)\nm_s: Spin (+½, -½)\nMax electrons per shell = 2n²",
      explanation: "Aufbau principle: electrons fill lower-energy orbitals first. Hund's rule: degenerate orbitals are filled singly before pairing.",
      tip: "Chromium (Z=24): [Ar] 4s¹ 3d⁵ (half-filled stability); Copper (Z=29): [Ar] 4s¹ 3d¹⁰ (fully-filled stability)."
    },
    {
      category: "Physical Chemistry",
      title: "Electronegativity Difference & Bond Types",
      formula: "• ΔEN > 1.7: Predominantly IONIC bond (electron transfer)\n• 0.4 ≤ ΔEN ≤ 1.7: POLAR COVALENT bond (unequal sharing, dipole moment)\n• ΔEN < 0.4: NON-POLAR COVALENT bond (equal sharing)",
      explanation: "Ionic bonds form between metals and non-metals; covalent between non-metals.",
      tip: "Water (H₂O) has polar covalent bonds and a bent shape (104.5°), giving it a net dipole moment."
    },
    {
      category: "Physical Chemistry",
      title: "VSEPR Molecular Geometry Summary",
      formula: "• 2 pairs, 0 lone: Linear (180°, BeCl₂, CO₂)\n• 3 pairs, 0 lone: Trigonal Planar (120°, BF₃)\n• 4 pairs, 0 lone: Tetrahedral (109.5°, CH₄)\n• 4 pairs, 1 lone: Trigonal Pyramidal (107°, NH₃)\n• 4 pairs, 2 lone: Bent / V-shaped (104.5°, H₂O)",
      explanation: "Lone pair - lone pair repulsion > lone pair - bond pair repulsion > bond pair - bond pair repulsion.",
      tip: "Each lone pair compresses the standard tetrahedral bond angle (109.5°) by approximately 2.5°."
    },
    {
      category: "Physical Chemistry",
      title: "Raoult's Law & Colligative Properties",
      formula: "Raoult's Law: P_solution = x_solvent · P°_solvent\nBoiling point elevation: ΔT_b = K_b · m · i\nFreezing point depression: ΔT_f = K_f · m · i\nOsmotic Pressure: Π = i · M · R · T",
      explanation: "Colligative properties depend solely on the NUMBER of solute particles, not their chemical identity.",
      tip: "i is the van 't Hoff factor. For glucose i = 1; for NaCl i = 2; for CaCl₂ i = 3."
    },
    {
      category: "Inorganic Chemistry",
      title: "Hardness of Water & Treatment",
      formula: "Temporary Hardness: Ca(HCO₃)₂ and Mg(HCO₃)₂ (Removed by boiling)\nCa(HCO₃)₂ ⟶[heat]⟶ CaCO₃↓ + H₂O + CO₂\nPermanent Hardness: CaSO₄, MgSO₄, CaCl₂ (Removed by Washing Soda)\nCaSO₄ + Na₂CO₃ ⟶ CaCO₃↓ + Na₂SO₄",
      explanation: "Hard water does not lather readily with soap, producing insoluble scum (calcium stearate).",
      tip: "Ion exchange resin (Zeolite / Permutit) removes BOTH temporary and permanent hardness efficiently."
    },
    {
      category: "Physical Chemistry",
      title: "Standard Conditions (STP vs RTP)",
      formula: "STP: T = 273.15 K (0°C), P = 1 atm = 101.3 kPa, V_m = 22.4 dm³/mol\nRTP: T = 298.15 K (25°C), P = 1 atm = 101.3 kPa, V_m = 24.0 dm³/mol",
      explanation: "Always check whether question specifies STP (22.4 dm³) or RTP / room condition (24.0 dm³).",
      tip: "1 mole of ANY ideal gas occupies 22.4 dm³ at STP."
    },
    {
      category: "Organic Chemistry",
      title: "Reactions of Benzene (Electrophilic Substitution)",
      formula: "• Nitration: Benzene + HNO₃ / conc. H₂SO₄ (50°C) ⟶ Nitrobenzene + H₂O\n• Halogenation: Benzene + Cl₂ / FeCl₃ ⟶ Chlorobenzene + HCl\n• Alkylation (Friedel-Crafts): Benzene + CH₃Cl / AlCl₃ ⟶ Methylbenzene (Toluene) + HCl",
      explanation: "Benzene undergoes substitution rather than addition reactions because addition would destroy its stable aromatic resonance ring.",
      tip: "The electrophile in nitration is the nitronium ion (NO₂⁺)."
    },
    {
      category: "Organic Chemistry",
      title: "Polymers and Polymerization",
      formula: "Addition Polymerization: n(CH₂=CH₂) ⟶ -[-CH₂-CH₂-]-ₙ (Polyethylene)\nCondensation Polymerization: Monomers with two functional groups react eliminating small molecules (H₂O, HCl)\nExamples: Nylon-6,6 (Polyamide), Terylene/Dacron (Polyester)",
      explanation: "Thermoplastics soften on heating and can be remolded (polyethene, PVC). Thermosetting plastics decompose on heating (Bakelite).",
      tip: "Natural rubber is a polymer of isoprene (2-methylbuta-1,3-diene). Vulcanization adds sulfur bridges to increase elasticity."
    },
    {
      category: "Inorganic Chemistry",
      title: "Extraction of Metals: Iron in the Blast Furnace",
      formula: "Ore: Hematite (Fe₂O₃)\n1. C + O₂ ⟶ CO₂; CO₂ + C ⟶ 2CO (Reducing agent)\n2. Fe₂O₃ + 3CO ⟶ 2Fe + 3CO₂ (Reduction of iron)\n3. CaCO₃ ⟶ CaO + CO₂; CaO + SiO₂ ⟶ CaSiO₃ (Slag formation)",
      explanation: "Limestone (CaCO₃) acts as a flux to remove acidic silica impurities (sand) as molten slag.",
      tip: "Molten slag floats on top of molten iron at the bottom of the blast furnace, preventing re-oxidation."
    },
    {
      category: "Organic Chemistry",
      title: "Carbohydrates, Proteins & Lipids Tests",
      formula: "• Reducing Sugar: Benedict's / Fehling's solution (brick-red precipitate of Cu₂O on boiling)\n• Starch: Iodine solution (turns blue-black)\n• Protein: Biuret test (turns violet/purple with dilute CuSO₄ + NaOH)\n• Fats/Oils: Sudan III test (red staining) or Translucent grease spot test on paper",
      explanation: "Sucrose is a NON-REDUCING sugar; it must be hydrolyzed with dilute acid before testing positive with Benedict's.",
      tip: "Glucose, fructose, and maltose are reducing sugars; sucrose and starch are non-reducing."
    }
  ],

  Biology: [
    {
      category: "Genetics",
      title: "Mendelian Monohybrid Cross Ratios",
      formula: "F₁ Cross (Aa × Aa):\nGenotypic ratio = 1 AA : 2 Aa : 1 aa (1:2:1)\nPhenotypic ratio = 3 Dominant : 1 Recessive (3:1)",
      explanation: "Mendel's First Law of Segregation: Alleles segregate during gamete formation so that each gamete carries only one allele.",
      tip: "A test cross (crossing dominant phenotype with homozygous recessive aa) produces 1:1 ratio if heterozygous."
    },
    {
      category: "Genetics",
      title: "Mendelian Dihybrid Cross Ratio",
      formula: "F₂ Phenotypic ratio (AaBb × AaBb) = 9 : 3 : 3 : 1\n• 9 Both Dominant (A_B_)\n• 3 Dominant A, Recessive b (A_bb)\n• 3 Recessive a, Dominant B (aaB_)\n• 1 Both Recessive (aabb)",
      explanation: "Mendel's Second Law of Independent Assortment: Genes for different traits assort independently of one another during gamete formation.",
      tip: "If genes are linked on the same chromosome, the 9:3:3:1 ratio is modified."
    },
    {
      category: "Genetics",
      title: "Co-dominance, Incomplete Dominance & ABO Blood Groups",
      formula: "ABO Alleles: Iᴬ, Iᴮ, i\n• Type A: IᴬIᴬ or Iᴬi\n• Type B: IᴮIᴮ or Iᴮi\n• Type AB: IᴬIᴮ (Co-dominant)\n• Type O: ii (Recessive)\nUniversal Donor: O negative; Universal Recipient: AB positive",
      explanation: "In co-dominance, both alleles are fully expressed in the heterozygote (e.g. AB blood type).",
      tip: "Incomplete dominance (e.g. Mirabilis jalapa): Red × White produces 100% Pink (1:2:1 phenotypic ratio)."
    },
    {
      category: "Genetics",
      title: "Sex-Linked Inheritance (Hemophilia & Color Blindness)",
      formula: "Normal female: XᴴXᴴ; Carrier female: XᴴXʰ; Affected female: XʰXʰ\nNormal male: XᴴY; Affected male: XʰY",
      explanation: "Sex-linked traits are carried on the non-homologous portion of the X chromosome. Males inherit their single X from their mother, so they express recessive sex-linked traits much more frequently.",
      tip: "A father CANNOT pass an X-linked condition to his son, because he gives his son the Y chromosome."
    },
    {
      category: "Genetics",
      title: "DNA vs RNA Comparison & Base Pairing",
      formula: "DNA: Double helix, Deoxyribose sugar, Bases: A, T, C, G\nRNA: Single strand, Ribose sugar, Bases: A, U, C, G\nChargaff's Rule: %A = %T and %C = %G (A=T with 2 hydrogen bonds; C≡G with 3 hydrogen bonds)",
      explanation: "DNA replication is semi-conservative: each daughter molecule contains one parent strand and one newly synthesized strand.",
      tip: "If a DNA sample contains 30% Adenine, it also contains 30% Thymine, leaving 40% for Cytosine (20%) and Guanine (20%)."
    },
    {
      category: "Cell Biology",
      title: "Mitosis vs Meiosis Summary",
      formula: "Mitosis: 1 division ⟶ 2 diploid (2n) identical daughter cells\nMeiosis: 2 divisions ⟶ 4 haploid (n) genetically varied gametes",
      explanation: "Mitosis occurs for growth, tissue repair, and asexual reproduction. Meiosis occurs during gametogenesis (sperm and egg production).",
      tip: "Crossing over occurs during Prophase I of Meiosis, resulting in genetic recombination and variation."
    },
    {
      category: "Cell Biology",
      title: "Cell Organelles & Specialized Functions",
      formula: "• Mitochondria: Aerobic respiration (ATP synthesis, 'Powerhouse')\n• Ribosome: Protein synthesis\n• Chloroplast: Photosynthesis (contains chlorophyll)\n• Golgi Apparatus: Packaging, sorting & secretion of proteins\n• Lysosome: Intracellular digestion & hydrolytic destruction of waste",
      explanation: "Endoplasmic Reticulum: Rough ER has attached ribosomes; Smooth ER synthesizes lipids and detoxifies poisons.",
      tip: "Cells with high metabolic activity (like liver and muscle cells) contain abundant mitochondria."
    },
    {
      category: "Physiology",
      title: "Photosynthesis Equations (Light & Dark Stages)",
      formula: "Overall: 6CO₂ + 6H₂O ⟶[light & chlorophyll]⟶ C₆H₁₂O₆ + 6O₂\nLight Stage (Grana/Thylakoids): Photolysis of water: 2H₂O ⟶ 4H⁺ + 4e⁻ + O₂\nDark Stage / Calvin Cycle (Stroma): Carbon fixation: CO₂ + ATP + NADPH ⟶ Glucose",
      explanation: "Oxygen released during photosynthesis comes entirely from the photolysis of WATER, not from carbon dioxide.",
      tip: "The primary carbon dioxide acceptor in C3 plants is RuBP (Ribulose 1,5-bisphosphate)."
    },
    {
      category: "Physiology",
      title: "Cellular Respiration (Aerobic vs Anaerobic)",
      formula: "Aerobic: C₆H₁₂O₆ + 6O₂ ⟶ 6CO₂ + 6H₂O + 38 ATP (Net 36-38 ATP)\nAnaerobic in Yeast (Fermentation): C₆H₁₂O₆ ⟶ 2C₂H₅OH + 2CO₂ + 2 ATP\nAnaerobic in Human Muscle: C₆H₁₂O₆ ⟶ 2 Lactic Acid + 2 ATP",
      explanation: "Stages of aerobic respiration: 1. Glycolysis (Cytoplasm) 2. Krebs Cycle (Mitochondrial Matrix) 3. Electron Transport Chain (Inner Membrane).",
      tip: "Glycolysis requires NO oxygen and yields a net gain of 2 ATP and 2 Pyruvate molecules."
    },
    {
      category: "Physiology",
      title: "Enzyme Action & Michaelis-Menten Kinetics",
      formula: "Enzyme + Substrate ⇌ Enzyme-Substrate Complex ⟶ Enzyme + Product\nFactors: Temperature (optimum 37-40°C in humans), pH, Substrate concentration",
      explanation: "Enzymes are biological protein catalysts that lower the activation energy of biochemical reactions without being consumed.",
      tip: "Excessive heat (above 50°C) denatures enzymes permanently by disrupting their tertiary hydrogen bonds."
    },
    {
      category: "Physiology",
      title: "Digestive Enzymes & Sites of Production",
      formula: "• Salivary Amylase (Ptyalin): Starch ⟶ Maltose (Mouth, pH ~6.8)\n• Pepsin: Protein ⟶ Peptones (Stomach, pH ~1.5 - 2.0 with HCl)\n• Trypsin: Proteins/Peptones ⟶ Peptides (Duodenum, pH ~8.0 from Pancreas)\n• Lipase: Fats ⟶ Fatty acids + Glycerol (Pancreatic juice)\n• Bile: Produced in Liver, stored in Gallbladder (Emulsifies fats, NO enzymes)",
      explanation: "Bile contains no enzymes, but its alkaline bile salts neutralize acidic stomach chyme and emulsify fats into tiny droplets.",
      tip: "Pepsin works only in acidic medium; trypsin works only in alkaline medium."
    },
    {
      category: "Physiology",
      title: "Circulatory System & Human Heart Structure",
      formula: "Double Circulation = Pulmonary (Heart ⟶ Lungs ⟶ Heart) + Systemic (Heart ⟶ Body ⟶ Heart)\nRight side of heart pumps DEOXYGENATED blood; Left side pumps OXYGENATED blood",
      explanation: "Bicuspid (Mitral) valve separates left atrium and left ventricle; Tricuspid valve separates right atrium and right ventricle.",
      tip: "The left ventricle has the thickest muscular wall because it must pump blood at high pressure throughout the entire body."
    },
    {
      category: "Physiology",
      title: "Blood Components and Functions",
      formula: "Blood = Plasma (55%) + Formed Elements (45%)\n• Erythrocytes (RBC): Biconcave, no nucleus, contains hemoglobin for O₂ transport\n• Leucocytes (WBC): Phagocytes (engulf bacteria) & Lymphocytes (produce antibodies)\n• Thrombocytes (Platelets): Blood clotting cascade (Prothrombin ⟶ Thrombin ⟶ Fibrinogen ⟶ Fibrin)",
      explanation: "Vitamin K and Calcium ions (Ca²⁺) are essential cofactors for the blood clotting cascade.",
      tip: "Mature mammalian red blood cells lack a nucleus to provide maximum internal space for hemoglobin."
    },
    {
      category: "Physiology",
      title: "Respiratory Volumes & Gaseous Exchange",
      formula: "Tidal Volume (TV) ≈ 500 mL (normal quiet breath)\nVital Capacity (VC) = TV + IRV + ERV (maximum air exhaled after max inhalation)\nTotal Lung Capacity = Vital Capacity + Residual Volume (RV)",
      explanation: "Gas exchange in alveoli occurs by simple diffusion across the thin, moist alveolar-capillary membrane.",
      tip: "Residual volume is the volume of air remaining in lungs even after the most forceful expiration; lungs never collapse completely."
    },
    {
      category: "Physiology",
      title: "Osmoregulation & Nephron Function in Kidney",
      formula: "Nephron steps:\n1. Ultrafiltration (Bowman's Capsule & Glomerulus)\n2. Selective Reabsorption (Proximal Convoluted Tubule: all glucose & amino acids)\n3. Water balance (Loop of Henle & Collecting Duct via ADH / Vasopressin)",
      explanation: "High blood osmotic pressure stimulates the posterior pituitary to secrete ADH, increasing water reabsorption and producing concentrated urine.",
      tip: "Presence of glucose in urine (glucosuria) is a clinical symptom of Diabetes mellitus (lack of insulin)."
    },
    {
      category: "Physiology",
      title: "Endocrine Hormones Summary Table",
      formula: "• Insulin: Beta cells of Pancreas (lowers blood glucose: Glucose ⟶ Glycogen)\n• Glucagon: Alpha cells of Pancreas (raises blood glucose: Glycogen ⟶ Glucose)\n• Adrenaline: Adrenal medulla ('Fight or flight' emergency hormone)\n• Thyroxine: Thyroid gland (controls basal metabolic rate; requires Iodine)\n• Growth Hormone (STH): Anterior Pituitary",
      explanation: "Endocrine glands are ductless glands that secrete hormones directly into the bloodstream.",
      tip: "Goitre (enlargement of the thyroid gland) is caused by nutritional deficiency of Iodine."
    },
    {
      category: "Physiology",
      title: "Nervous Coordination & Reflex Arc",
      formula: "Reflex Pathway: Receptor ⟶ Sensory Neurone ⟶ Relay/Interneurone (Spinal cord) ⟶ Motor Neurone ⟶ Effector (Muscle/Gland)",
      explanation: "A reflex action is an involuntary, rapid, automatic response to a stimulus designed for immediate survival.",
      tip: "At the synapse (gap between neurons), transmission is chemical via neurotransmitters like Acetylcholine."
    },
    {
      category: "Plant Physiology",
      title: "Transpiration & Translocation in Plants",
      formula: "Transpiration: Loss of water vapor mainly through stomata of leaves\nTranspiration pull driven by Cohesion-Tension theory\nXylem: Transports water and dissolved mineral salts upward\nPhloem: Translocates manufactured sucrose and amino acids bidirectionally",
      explanation: "Factors increasing transpiration: High temperature, bright light, high wind speed, low atmospheric humidity.",
      tip: "Translocation in phloem uses the Mass Flow (Pressure Flow) hypothesis."
    },
    {
      category: "Plant Physiology",
      title: "Plant Hormones (Phytohormones)",
      formula: "• Auxin (IAA): Apical dominance, cell elongation, phototropism\n• Gibberellins: Stem elongation, breaking seed dormancy, fruit growth\n• Cytokinins: Promotes cell division, delays leaf senescence (aging)\n• Abscisic Acid (ABA): Stress hormone, closes stomata during drought, promotes dormancy\n• Ethylene (Ethene): Gaseous hormone, accelerates fruit ripening",
      explanation: "Auxins migrate to the shaded side of shoots, stimulating faster cell elongation and causing positive phototropism (bending toward light).",
      tip: "Commercial application: Ethylene gas is used to ripen green bananas and tomatoes for market."
    },
    {
      category: "Plant Physiology",
      title: "Tropisms vs Nastic Movements",
      formula: "• Phototropism: Directional growth response to light (shoots positive, roots negative)\n• Geotropism: Response to gravity (roots positive, shoots negative)\n• Hydrotropism: Response to water\n• Nastic movements: Non-directional responses (e.g. Mimosa pudica leaves folding when touched)",
      explanation: "Tropisms are slow, permanent directional growth responses. Nastic movements are reversible, turgor-driven responses.",
      tip: "Roots are positively geotropic and positively hydrotropic."
    },
    {
      category: "Ecology",
      title: "Ecological Pyramids & 10% Energy Transfer Law",
      formula: "Trophic Levels: Producers (1st) ⟶ Primary Consumers (2nd) ⟶ Secondary Consumers (3rd) ⟶ Tertiary Consumers (4th)\nLindeman's 10% Law: Only ~10% of energy is transferred to the next trophic level; 90% is lost as heat, respiration, and excretion.",
      explanation: "Because of significant energy loss at each step, food chains rarely exceed 4 or 5 trophic levels.",
      tip: "Pyramids of energy are ALWAYS upright; pyramids of numbers or biomass can be inverted (e.g. parasites on a single tree)."
    },
    {
      category: "Ecology",
      title: "Ecological Sampling Formulas (Capture-Recapture)",
      formula: "Lincoln Index: Total Population N = (M × C) / R\nM = marked in 1st sample, C = total caught in 2nd sample, R = marked recaptured in 2nd sample\nPopulation Density = Total individuals counted / Total area sampled (m²)",
      explanation: "Used for estimating mobile animal populations (insects, fish, mice).",
      tip: "Assumes marks do not rub off, marked animals mix randomly, and no births/deaths occur during the short study interval."
    },
    {
      category: "Ecology",
      title: "Symbiotic Interactions (Mutualism, Commensalism, Parasitism)",
      formula: "• Mutualism (+ / +): Both species benefit (e.g. Rhizobium in legume roots, Lichen = Alga + Fungus)\n• Commensalism (+ / 0): One benefits, other unaffected (e.g. Remora fish on Shark, Epiphytic orchid on tree branch)\n• Parasitism (+ / -): Parasite benefits, host is harmed (e.g. Plasmodium in human, Tapeworm)",
      explanation: "Mycorrhiza is a mutualistic association between fungi and the roots of higher plants.",
      tip: "Nitrogen-fixing Rhizobium bacteria convert atmospheric nitrogen into nitrates in root nodules of leguminous plants."
    },
    {
      category: "Ecology",
      title: "Biogeochemical Cycles: Nitrogen Cycle",
      formula: "1. Nitrogen Fixation: N₂ ⟶ NH₄⁺ / NO₃⁻ (Rhizobium, Azotobacter, lightning)\n2. Nitrification: NH₄⁺ ⟶ NO₂⁻ (Nitrosomonas); NO₂⁻ ⟶ NO₃⁻ (Nitrobacter)\n3. Assimilation: Plants absorb NO₃⁻ to build plant proteins\n4. Denitrification: NO₃⁻ ⟶ N₂ gas (Pseudomonas denitrificans in waterlogged soils)",
      explanation: "Denitrification reduces soil fertility by releasing nitrates back into the atmosphere as free nitrogen gas.",
      tip: "Nitrosomonas converts ammonia to nitrite; Nitrobacter converts nitrite to nitrate."
    },
    {
      category: "Ecology",
      title: "Ecological Succession (Primary vs Secondary)",
      formula: "Bare rock ⟶ Pioneer species (Lichens/Mosses) ⟶ Herbaceous plants ⟶ Shrubs ⟶ Climax Community (Mature Forest)",
      explanation: "Primary succession begins on newly formed, lifeless surfaces without soil. Secondary succession occurs where an existing community was disturbed (fire, farming) but soil remains.",
      tip: "Secondary succession proceeds much faster than primary succession because fertile soil and seeds are already present."
    },
    {
      category: "Taxonomy",
      title: "Hierarchy of Biological Classification",
      formula: "Domain ⟶ Kingdom ⟶ Phylum (Division in plants) ⟶ Class ⟶ Order ⟶ Family ⟶ Genus ⟶ Species\nMnemonic: 'Dear King Philip Came Over For Good Soup'",
      explanation: "Species is the basic unit of classification. Organisms of the same species can interbreed to produce fertile offspring.",
      tip: "Binomial nomenclature: Genus is capitalized, species in lowercase; both italicized or underlined separately (e.g. Homo sapiens)."
    },
    {
      category: "Taxonomy",
      title: "The Five Kingdoms of Living Organisms",
      formula: "1. Monera: Prokaryotic, unicellular, no membrane-bound nucleus (Bacteria, Cyanobacteria)\n2. Protista: Eukaryotic, mostly unicellular (Amoeba, Euglena, Paramecium)\n3. Fungi: Heterotrophic, chitin cell wall, non-photosynthetic (Mushrooms, Yeast, Rhizopus)\n4. Plantae: Autotrophic, cellulose cell wall, photosynthetic\n5. Animalia: Heterotrophic, multicellular, no cell wall",
      explanation: "Euglena is unique because it possesses both plant features (chloroplasts, pyrenoid) and animal features (flagellum, eyespot, gullet).",
      tip: "Viruses are not classified in any of the five kingdoms because they are acellular (non-living outside host cells)."
    },
    {
      category: "Taxonomy",
      title: "Phylum Arthropoda Classes Comparison",
      formula: "• Insecta: 3 body parts (head, thorax, abdomen), 3 pairs of legs, wings usually present (e.g. Grasshopper, Housefly)\n• Arachnida: 2 body parts (cephalothorax & abdomen), 4 pairs of legs, no antennae (e.g. Spider, Scorpion)\n• Crustacea: 2 body parts, 5+ pairs of legs, 2 pairs of antennae, gills (e.g. Crab, Prawn)\n• Myriapoda: Elongated body, many segments (Chilopoda: Centipede 1 pair/segment; Diplopoda: Millipede 2 pairs/segment)",
      explanation: "Arthropods are characterized by chitinous exoskeletons and jointed appendages.",
      tip: "Centipedes are carnivorous with poison claws; millipedes are herbivorous with no poison claws."
    },
    {
      category: "Evolution",
      title: "Lamarckism vs Darwinian Natural Selection",
      formula: "Lamarck: Inheritance of Acquired Characteristics & Law of Use and Disuse\nDarwin: Overproduction ⟶ Struggle for Existence ⟶ Variation ⟶ Survival of the Fittest (Natural Selection) ⟶ Speciation",
      explanation: "Lamarck's theory was disproved because changes acquired during an organism's lifetime (phenotypic) are not encoded in DNA and cannot be inherited.",
      tip: "Natural selection acts on pre-existing genetic variations caused by mutations and sexual recombination."
    },
    {
      category: "Evolution",
      title: "Homologous vs Analogous Structures",
      formula: "• Homologous: Same embryonic origin and basic structure, different functions (Divergent Evolution)\nExamples: Pentadactyl limb of human, bat wing, whale flipper, bird wing\n• Analogous: Different structural origins, same function (Convergent Evolution)\nExamples: Wing of a bird vs Wing of an insect",
      explanation: "Homologous organs provide compelling evidence of common evolutionary descent.",
      tip: "Pentadactyl limb structure (humerus, radius, ulna, carpals, metacarpals, phalanges) is universal across tetrapods."
    },
    {
      category: "Microbiology",
      title: "Diseases, Causative Agents & Vectors",
      formula: "• Malaria: Protozoan Plasmodium (Vector: Female Anopheles mosquito)\n• Sleeping Sickness (Trypanosomiasis): Trypanosoma (Vector: Tsetse fly)\n• Cholera: Bacterium Vibrio cholerae (Contaminated water/food, Housefly)\n• River Blindness: Nematode worm Onchocerca volvulus (Vector: Blackfly Simulium)\n• Tuberculosis: Bacterium Mycobacterium tuberculosis (Airborne droplets)",
      explanation: "Viruses cause Measles, Polio, Rabies, Influenza, and AIDS; Bacteria cause Typhoid, Cholera, and Tetanus.",
      tip: "Female Anopheles mosquitoes bite at night and tilt at a 45° angle to the surface; Culex mosquitoes rest parallel."
    },
    {
      category: "Physiology",
      title: "Human Reproduction & Menstrual Cycle",
      formula: "Phases: 1. Follicular Phase (FSH stimulates follicle maturation)\n2. Ovulation (LH surge causes release of ovum around Day 14)\n3. Luteal Phase (Corpus luteum secretes Progesterone)\n4. Menstruation (Drop in progesterone causes shedding of endometrium)",
      explanation: "Fertilization normally occurs in the Fallopian tube (Oviduct). Implantation occurs in the uterine endometrium.",
      tip: "Progesterone is the pregnancy hormone: it thickens and maintains the uterine lining for embryo implantation."
    },
    {
      category: "Physiology",
      title: "Structure of the Mammalian Eye & Accommodation",
      formula: "Distance Vision: Ciliary muscles RELAX, suspensory ligaments TIGHTEN, lens becomes THIN and flattened (focal length increases)\nNear Vision: Ciliary muscles CONTRACT, suspensory ligaments SLACKEN, lens becomes THICK and convex",
      explanation: "Rods are photoreceptors responsible for vision in dim light; Cones provide detailed color vision in bright light.",
      tip: "Myopia (short-sightedness): Image falls in front of retina, corrected with CONCAVE (diverging) lens. Hypermetropia: corrected with CONVEX lens."
    },
    {
      category: "Physiology",
      title: "Structure of the Mammalian Ear & Balance",
      formula: "Hearing: Pinna ⟶ Auditory Canal ⟶ Tympanic Membrane (Eardrum) ⟶ Ossicles (Malleus, Incus, Stapes) ⟶ Oval Window ⟶ Cochlea (Organ of Corti)\nBalance: Semicircular Canals (Dynamic balance/rotation) & Utricle/Saccule (Static balance/gravity)",
      explanation: "Eustachian tube equalizes air pressure between the middle ear cavity and the outside atmosphere.",
      tip: "The stapes (stirrup) is the smallest bone in the human body."
    },
    {
      category: "Physiology",
      title: "Skeletal System & Types of Movable Joints",
      formula: "• Ball and Socket: Movement in all planes (Shoulder and Hip joints)\n• Hinge Joint: Movement in one plane only (Elbow and Knee joints)\n• Pivot Joint: Rotational movement (Atlas and Axis vertebrae in neck)\n• Gliding Joint: Sliding movement (Carpals of wrist, Tarsals of ankle)",
      explanation: "Ligaments connect Bone to Bone; Tendons connect Muscle to Bone.",
      tip: "Synovial fluid secreted by the synovial membrane lubricates joints to eliminate friction."
    },
    {
      category: "Plant Reproduction",
      title: "Pollination: Wind vs Insect Pollinated Flowers",
      formula: "• Insect Pollinated: Large colorful petals, scented, nectar present, sticky spiky pollen, stigma enclosed inside flower\n• Wind Pollinated: Small dull green petals, no scent/nectar, light smooth powdery pollen in large quantities, feathery pendulous stigmas",
      explanation: "Double fertilization in angiosperms: One sperm fertilizes the egg to form diploid zygote (2n); second sperm fertilizes two polar nuclei to form triploid endosperm (3n).",
      tip: "Endosperm (3n) provides nourishment for the developing plant embryo inside the seed."
    },
    {
      category: "Plant Physiology",
      title: "Seed Germination (Epigeal vs Hypogeal)",
      formula: "• Epigeal: Hypocotyl elongates, pulling cotyledons ABOVE ground (e.g. Bean, Castor oil, Sunflower)\n• Hypogeal: Epicotyl elongates, leaving cotyledons BELOW ground (e.g. Maize, Broad bean, Pea)",
      explanation: "Essential conditions for germination: Water (activates enzymes), Oxygen (aerobic respiration), and suitable Temperature.",
      tip: "Light is generally not required for the initial stages of seed germination."
    },
    {
      category: "Cell Biology",
      title: "Diffusion, Osmosis, and Plasmolysis",
      formula: "• Turgor Pressure: Inward push of cell wall against protoplast\n• Hypotonic solution: Plant cell absorbs water and becomes TURGID; Animal cell SWELLS and LYSES (bursts)\n• Hypertonic solution: Plant cell loses water, cytoplasm shrinks from cell wall (PLASMOLYSIS); Animal cell CRENATES",
      explanation: "Osmosis is the net movement of water molecules from a region of higher water potential to lower water potential across a semi-permeable membrane.",
      tip: "A plant cell does not burst in pure water because its rigid cellulose cell wall provides counter turgor pressure."
    },
    {
      category: "Physiology",
      title: "Thermoregulation in Mammals",
      formula: "Hot Environment:\n• Vasodilation (arterioles widen, more blood flow to skin surface, heat radiation)\n• Sweating (evaporative cooling)\nCold Environment:\n• Vasoconstriction (arterioles narrow to conserve core heat)\n• Shivering (involuntary muscle contractions generate metabolic heat)\n• Piloerection (hairs stand up trapping insulating layer of air)",
      explanation: "Thermoregulation is monitored and controlled by the hypothalamus in the brain.",
      tip: "Vasodilation and vasoconstriction involve the arterioles supplying superficial capillary loops, not the capillaries themselves."
    },
    {
      category: "Genetics",
      title: "Mutation Types (Gene vs Chromosomal)",
      formula: "• Gene (Point) Mutations: Sickle Cell Anemia (Substitution of Adenine by Thymine: Glutamic acid replaced by Valine in hemoglobin beta chain)\n• Chromosomal Aneuploidy: Down Syndrome (Trisomy 21: 47 chromosomes), Turner Syndrome (45, XO), Klinefelter Syndrome (47, XXY)",
      explanation: "Non-disjunction of homologous chromosomes during Anaphase I of Meiosis causes aneuploidy.",
      tip: "Sickle cell heterozygotes (HbAS) possess natural selective resistance against severe malaria (heterozygote advantage)."
    }
  ],

  Economics: [
    {
      category: "Microeconomics",
      title: "Price Elasticity of Demand (PED)",
      formula: "PED = (% Change in Quantity Demanded) / (% Change in Price)\nPED = (ΔQ / ΔP) × (P₁ / Q₁)\n• |PED| > 1: Elastic (Flatter curve)\n• |PED| < 1: Inelastic (Steeper curve)\n• |PED| = 1: Unitary Elastic (Rectangular hyperbola)\n• |PED| = 0: Perfectly Inelastic (Vertical line)\n• |PED| = ∞: Perfectly Elastic (Horizontal line)",
      explanation: "Because demand slopes downward, PED is mathematically negative; economists take the absolute value.",
      tip: "Goods with many close substitutes (e.g. luxury items) have elastic demand; necessities (e.g. salt, water, basic medicine) have inelastic demand."
    },
    {
      category: "Microeconomics",
      title: "Income & Cross Elasticity of Demand",
      formula: "Income Elasticity (YED) = (% ΔQ) / (% ΔIncome)\n• YED > 0: Normal Good (YED > 1 = Luxury good)\n• YED < 0: Inferior Good\nCross Elasticity (XED) = (% ΔQ_A) / (% ΔP_B)\n• XED > 0: Substitutes (e.g. Tea and Coffee)\n• XED < 0: Complements (e.g. Cars and Petrol)\n• XED = 0: Unrelated goods",
      explanation: "XED measures responsiveness of demand for good A following a change in price of good B.",
      tip: "If price of butter rises and demand for margarine increases, XED is positive, confirming they are substitutes."
    },
    {
      category: "Microeconomics",
      title: "Price Elasticity of Supply (PES)",
      formula: "PES = (% Change in Quantity Supplied) / (% Change in Price)\nPES = (ΔQ_s / ΔP) × (P / Q_s)",
      explanation: "Measures responsiveness of producers to a change in price. Supply is more elastic in the long run than in the short run.",
      tip: "Any straight-line supply curve passing through the origin has a PES of exactly 1 throughout its entire length."
    },
    {
      category: "Microeconomics",
      title: "Utility Theory & Equi-Marginal Principle",
      formula: "Total Utility TU = Σ MU\nMarginal Utility MU = ΔTU / ΔQ\nConsumer Equilibrium: (MU_x / P_x) = (MU_y / P_y) = MU of money",
      explanation: "Law of Diminishing Marginal Utility: As more units of a good are consumed, the satisfaction derived from each additional unit declines.",
      tip: "A rational consumer maximizes utility when the marginal utility per naira spent is equal across all goods consumed."
    },
    {
      category: "Microeconomics",
      title: "Short-Run Production & Law of Diminishing Returns",
      formula: "Total Product TP\nAverage Product AP = TP / L\nMarginal Product MP = ΔTP / ΔL\nWhen MP > AP: AP is rising\nWhen MP = AP: AP is at its MAXIMUM\nWhen MP < AP: AP is falling\nWhen MP = 0: TP is at its MAXIMUM",
      explanation: "States that as increasing units of a variable factor are added to fixed factors, MP eventually declines.",
      tip: "Stage II of production (from maximum AP to MP = 0) is the only rational economic operating zone."
    },
    {
      category: "Microeconomics",
      title: "Short-Run Cost Functions",
      formula: "Total Cost TC = Total Fixed Cost (TFC) + Total Variable Cost (TVC)\nAverage Total Cost ATC = TC / Q = AFC + AVC\nAverage Fixed Cost AFC = TFC / Q (Continuously declining rectangular hyperbola)\nAverage Variable Cost AVC = TVC / Q\nMarginal Cost MC = ΔTC / ΔQ = ΔTVC / ΔQ",
      explanation: "Fixed costs do not change with output (even when Q = 0, TC = TFC). Variable costs change directly with output.",
      tip: "The MC curve always intersects both the AVC and ATC curves at their LOWEST points."
    },
    {
      category: "Microeconomics",
      title: "Revenue Functions & Profit Maximization Rule",
      formula: "Total Revenue TR = Price × Quantity = P × Q\nAverage Revenue AR = TR / Q = Price P (AR curve is always the Demand curve)\nMarginal Revenue MR = ΔTR / ΔQ\nGolden Profit Maximization Rule: MC = MR (and MC must be rising)",
      explanation: "Applies to ALL market structures (Perfect Competition, Monopoly, Oligopoly, Monopolistic Competition).",
      tip: "Under Perfect Competition: P = AR = MR (horizontal demand curve). Under Monopoly: MR lies below AR."
    },
    {
      category: "Microeconomics",
      title: "Market Structures Comparison",
      formula: "• Perfect Competition: Many buyers & sellers, homogeneous product, free entry/exit, price taker (P = AR = MR), normal profit in long run\n• Monopoly: Single seller, unique product, high barriers to entry, price maker, supernormal profit in long run\n• Oligopoly: Few large dominant firms, mutual interdependence, kinked demand curve, non-price competition\n• Monopolistic Competition: Many sellers, differentiated products, brand loyalty",
      explanation: "In perfect competition, firms earn only normal profits in long-run equilibrium where P = MC = min ATC.",
      tip: "The kinked demand curve in oligopoly explains price rigidity/stickiness."
    },
    {
      category: "Macroeconomics",
      title: "National Income Accounting Methods",
      formula: "1. Expenditure Method: GDP = C + I + G + (X - M)\n2. Income Method: GDP = Wages + Rent + Interest + Profits\n3. Output/Value Added Method: GDP = Σ (Value of Gross Output - Intermediate Consumption)",
      explanation: "C = Household Consumption, I = Gross Private Investment, G = Government Spending, X = Exports, M = Imports.",
      tip: "Transfer payments (e.g. pensions, student bursaries, unemployment benefits) are EXCLUDED from national income because no goods/services are produced in exchange."
    },
    {
      category: "Macroeconomics",
      title: "GNP, NNP, National Income & Per Capita Income",
      formula: "GNP = GDP + Net Factor Income from Abroad (NFIA)\nNet National Product NNP = GNP - Depreciation (Capital Consumption Allowance)\nNational Income (at factor cost) = NNP - Indirect Taxes + Subsidies\nPer Capita Income = National Income / Total Population",
      explanation: "NFIA = Factor income earned by citizens abroad minus factor income earned by foreign residents domestically.",
      tip: "If a country has higher GDP than GNP, it indicates foreigners earn more within the country than citizens earn abroad."
    },
    {
      category: "Macroeconomics",
      title: "Nominal vs Real GDP & GDP Deflator",
      formula: "Real GDP = (Nominal GDP / GDP Deflator) × 100\nReal GDP = (Nominal GDP / Consumer Price Index) × 100\nGDP Deflator = (Nominal GDP / Real GDP) × 100",
      explanation: "Nominal GDP is evaluated at current market prices; Real GDP is evaluated at constant base-year prices, filtering out inflation.",
      tip: "Economic growth is measured by the percentage increase in REAL GDP, not nominal GDP."
    },
    {
      category: "Macroeconomics",
      title: "Keynesian Multiplier & Consumption Function",
      formula: "Consumption: C = a + b·Y (where a = autonomous consumption, b = MPC)\nMPC + MPS = 1 (Marginal Propensity to Consume + Save)\nInvestment Multiplier k = 1 / MPS = 1 / (1 - MPC) = ΔY / ΔI",
      explanation: "If MPC = 0.8, then MPS = 0.2, and Multiplier k = 1 / 0.2 = 5. A ₦10 billion investment increases national income by ₦50 billion.",
      tip: "The higher the MPC, the larger the multiplier effect on national income."
    },
    {
      category: "Macroeconomics",
      title: "Inflation Rate & Consumer Price Index (CPI)",
      formula: "CPI = (Cost of Basket in Current Year / Cost of Basket in Base Year) × 100\nInflation Rate = [(CPI_current - CPI_previous) / CPI_previous] × 100%\nReal Wage = (Nominal Wage / CPI) × 100",
      explanation: "Types: Demand-Pull (excessive aggregate demand) vs Cost-Push (rising wages, raw materials, fuel costs).",
      tip: "Inflation benefits debtors (borrowers) and harms creditors (lenders) when interest rates are fixed."
    },
    {
      category: "Macroeconomics",
      title: "Types of Unemployment",
      formula: "Unemployment Rate = (Number of Unemployed / Total Labor Force) × 100%\nTypes:\n• Frictional: Transition between jobs\n• Structural: Mismatch of skills due to technological advancement\n• Cyclical / Demand-Deficient: Recession in business cycle\n• Seasonal: Seasonal variations (e.g. agriculture, tourism)",
      explanation: "Labor force includes individuals willing and able to work between legal working ages (15-64 years), excluding full-time students and retirees.",
      tip: "Disguised unemployment occurs when marginal productivity of labor is zero (too many workers on one task)."
    },
    {
      category: "Money & Banking",
      title: "Quantity Theory of Money (Fisher's Equation)",
      formula: "M · V = P · T (or M · V = P · Y)\nM = Money Supply, V = Velocity of money circulation, P = General Price Level, T/Y = Volume of Transactions/Output",
      explanation: "Assuming V and T are constant in the short run, any percentage increase in Money Supply (M) causes an equal percentage increase in Price Level (P).",
      tip: "Directly explains why excessive government money printing leads directly to hyperinflation."
    },
    {
      category: "Money & Banking",
      title: "Bank Credit Creation & Money Multiplier",
      formula: "Credit Creation Multiplier = 1 / Cash Reserve Ratio (CRR)\nTotal Deposit Created = Initial Cash Deposit × (1 / CRR)\nNew Loans Created = Total Deposit Created - Initial Deposit",
      explanation: "Commercial banks create credit by lending out excess deposits over the statutory reserve ratio set by the Central Bank of Nigeria (CBN).",
      tip: "If CRR = 10% (0.10) and initial deposit is ₦1,000,000, total money supply created = ₦1,000,000 / 0.10 = ₦10,000,000."
    },
    {
      category: "Public Finance",
      title: "Fiscal Policy Tools & Budget Types",
      formula: "Budget Deficit: Government Expenditure > Government Revenue\nBudget Surplus: Government Revenue > Government Expenditure\nBalanced Budget: Expenditure = Revenue",
      explanation: "Expansionary Fiscal Policy (to fight recession): Lower taxes, increase government spending. Contractionary Fiscal Policy (to fight inflation): Raise taxes, cut government spending.",
      tip: "Fiscal policy is administered by the Ministry of Finance; monetary policy is administered by the Central Bank."
    },
    {
      category: "Public Finance",
      title: "Taxation Systems (Progressive, Regressive, Proportional)",
      formula: "• Progressive: Average tax rate increases as income increases (e.g. PAYE)\n• Proportional: Flat rate for all income levels\n• Regressive: Tax takes a larger percentage of lower incomes (e.g. VAT, excise duties)",
      explanation: "Canons of Taxation (Adam Smith): Equity, Certainty, Convenience, and Economy.",
      tip: "Indirect taxes on necessities (like Value Added Tax on food) are regressive in nature."
    },
    {
      category: "International Trade",
      title: "Theory of Comparative Advantage (David Ricardo)",
      formula: "Opportunity Cost of Good A = Output of Good B / Output of Good A",
      explanation: "A country should specialize in producing and exporting goods for which it has a LOWER opportunity cost, and import goods where its opportunity cost is higher.",
      tip: "Even if country A has an absolute advantage in all goods, mutually beneficial trade can still occur based on comparative advantage."
    },
    {
      category: "International Trade",
      title: "Terms of Trade (TOT) Formula",
      formula: "Terms of Trade = (Index of Export Prices / Index of Import Prices) × 100",
      explanation: "TOT > 100: Favorable terms of trade (exports buy more imports). TOT < 100: Unfavorable terms of trade.",
      tip: "Developing nations exporting primary commodities often face deteriorating terms of trade (Prebisch-Singer hypothesis)."
    },
    {
      category: "International Trade",
      title: "Balance of Payments (BOP) Accounts",
      formula: "BOP = Current Account + Capital Account + Financial Account + Net Errors & Omissions = 0\nCurrent Account = Visible Trade Balance (Merchandise Exports - Imports) + Invisible Balance (Services) + Net Income + Net Transfers",
      explanation: "BOP records all economic and financial transactions between residents of a country and the rest of the world over a year.",
      tip: "A deficit in the current account must be financed by a surplus in the financial/capital account or borrowing from reserves."
    },
    {
      category: "International Trade",
      title: "Exchange Rate Determination (Purchasing Power Parity)",
      formula: "Nominal Exchange Rate e = P_foreign / P_domestic\nDevaluation: Official reduction in value of domestic currency under FIXED exchange rate system\nDepreciation: Market-driven fall in currency value under FLOATING exchange rate system",
      explanation: "Marshall-Lerner Condition: Currency devaluation improves the trade balance only if PED_exports + PED_imports > 1.",
      tip: "Devaluation makes domestic exports cheaper to foreigners and foreign imports more expensive to citizens."
    },
    {
      category: "Demography",
      title: "Population Growth Rate & Demographic Transition",
      formula: "Natural Growth Rate = (Birth Rate - Death Rate)\nNet Migration = Immigration - Emigration\nTotal Population Growth = (Births - Deaths) + (Immigrants - Emigrants)\nDependency Ratio = [(Population < 15 + Population > 64) / Working Age Population (15-64)] × 100",
      explanation: "Malthusian Population Theory: Population grows geometrically (1, 2, 4, 8...), while food production grows arithmetically (1, 2, 3, 4...).",
      tip: "Malthusian checks: Preventive checks (moral restraint, late marriage) vs Positive checks (war, famine, pestilence)."
    },
    {
      category: "Economic Growth",
      title: "Harrod-Domar Growth Model",
      formula: "Growth Rate (g) = Savings Ratio (s) / Capital-Output Ratio (k)\ng = s / k",
      explanation: "Economic growth depends directly on the level of domestic savings and investment, and inversely on capital efficiency (k).",
      tip: "To double economic growth from 4% to 8%, a country must either double its savings rate or make capital twice as efficient."
    },
    {
      category: "Microeconomics",
      title: "Consumer and Producer Surplus",
      formula: "Consumer Surplus = Maximum price consumers willing to pay - Actual market price paid\nProducer Surplus = Actual market price received - Minimum price producers willing to accept\nTotal Social Surplus = Consumer Surplus + Producer Surplus",
      explanation: "Consumer surplus is the area below the demand curve and above the market price line.",
      tip: "First-degree price discrimination converts 100% of consumer surplus into monopoly profit."
    },
    {
      category: "Microeconomics",
      title: "Price Ceilings & Price Floors",
      formula: "Price Ceiling (Maximum Price): Set BELOW equilibrium price ⟶ Causes SHORTAGE / Excess Demand\nPrice Floor (Minimum Price, e.g. Minimum Wage): Set ABOVE equilibrium price ⟶ Causes SURPLUS / Excess Supply",
      explanation: "Price ceilings are imposed to protect consumers from high prices; often lead to black markets and rationing.",
      tip: "A price ceiling set ABOVE equilibrium or a price floor set BELOW equilibrium has NO economic effect."
    },
    {
      category: "Microeconomics",
      title: "Economies and Diseconomies of Scale",
      formula: "Internal Economies: Technical, Financial, Marketing, Managerial, Risk-bearing (causes falling Long-Run Average Cost LRAC)\nDiseconomies: Bureaucracy, communication breakdown, managerial inefficiency (causes rising LRAC)",
      explanation: "The LRAC curve is traditionally U-shaped (envelope curve) due to initial economies followed by diseconomies of scale.",
      tip: "Minimum Efficient Scale (MES) is the lowest output level at which a firm minimizes its long-run average cost."
    },
    {
      category: "Microeconomics",
      title: "Indifference Curve Analysis & Budget Line",
      formula: "Budget Line: P_x · X + P_y · Y = Money Income (M)\nSlope of Budget Line = -P_x / P_y\nMarginal Rate of Substitution MRS_xy = ΔY / ΔX = MU_x / MU_y\nTangency Condition: MRS_xy = P_x / P_y",
      explanation: "Indifference curves are convex to the origin (diminishing MRS), downward sloping, and never intersect.",
      tip: "Higher indifference curves represent higher levels of utility and satisfaction."
    },
    {
      category: "Microeconomics",
      title: "Monopoly Deadweight Loss & Inefficiency",
      formula: "Allocative Inefficiency: P > MC\nProductive Inefficiency: Output not at minimum ATC\nDeadweight Loss = Loss in Total Social Welfare due to monopoly output restriction",
      explanation: "Monopolies produce lower output and charge higher prices compared to competitive markets.",
      tip: "Natural monopolies (e.g. national power grids, water utilities) have extremely high fixed costs and continuous economies of scale."
    },
    {
      category: "Development Economics",
      title: "Gini Coefficient & Lorenz Curve",
      formula: "Gini Coefficient = Area A / (Area A + Area B)\n• Gini = 0: Complete Income Equality\n• Gini = 1: Absolute Income Inequality (one person has all wealth)",
      explanation: "The Lorenz curve plots cumulative percentage of population against cumulative percentage of income earned.",
      tip: "The further the Lorenz curve bows away from the 45-degree line of perfect equality, the higher the Gini coefficient and inequality."
    },
    {
      category: "Macroeconomics",
      title: "Central Bank Monetary Policy Tools",
      formula: "• Cash Reserve Ratio (CRR): High CRR ⟶ banks lend less (contracts money supply)\n• Monetary Policy Rate (MPR): Benchmark interest rate (High MPR ⟶ loans cost more)\n• Open Market Operations (OMO): Selling treasury bills mops up excess liquidity\n• Liquidity Ratio: Fraction of liquid assets to total liabilities",
      explanation: "Used to maintain price stability, protect exchange rate, and manage inflation.",
      tip: "To curb inflation: CBN RAISES the MPR and SELLS government treasury bills in Open Market Operations."
    },
    {
      category: "Macroeconomics",
      title: "Philips Curve (Inflation vs Unemployment)",
      formula: "Short-run Philips Curve: Inverse relationship between Inflation Rate and Unemployment Rate\nLong-run Philips Curve: Vertical line at the Natural Rate of Unemployment (NAIRU)",
      explanation: "In the short run, lowering unemployment tends to increase wage inflation. In the long run, there is no trade-off.",
      tip: "Stagflation (simultaneous high inflation and high unemployment) shifts the short-run Philips curve to the right."
    },
    {
      category: "International Trade",
      title: "Trade Barriers (Tariff, Quota, Embargo, Subsidy)",
      formula: "• Specific Tariff: Fixed money tax per unit imported (e.g. ₦50 per kg)\n• Ad Valorem Tariff: Percentage tax on CIF value of import (e.g. 20% on value)\n• Import Quota: Physical limit on quantity of good imported",
      explanation: "Tariffs generate government revenue; quotas do not generate government revenue unless quota licenses are auctioned.",
      tip: "An embargo is a total, complete prohibition on trade with a specific country or commodity."
    },
    {
      category: "Microeconomics",
      title: "Income and Substitution Effects",
      formula: "Price Fall ⟶ Total Price Effect = Substitution Effect + Income Effect\n• Normal Good: Both substitution and income effects increase quantity demanded\n• Inferior Good: Substitution effect is positive, but income effect is negative (Total demand still rises)\n• Giffen Good: Negative income effect outweighs positive substitution effect (Demand falls when price falls)",
      explanation: "Substitution effect is ALWAYS negative (cheaper good substituted for dearer good).",
      tip: "All Giffen goods are inferior goods, but not all inferior goods are Giffen goods."
    },
    {
      category: "Microeconomics",
      title: "Elasticity and Total Revenue Relationship",
      formula: "• If Demand is ELASTIC (|PED| > 1): Price cut ⟶ Total Revenue RISES\n• If Demand is INELASTIC (|PED| < 1): Price cut ⟶ Total Revenue FALLS (Price hike raises revenue)\n• If Demand is UNITARY (|PED| = 1): Price change ⟶ Total Revenue stays UNCHANGED",
      explanation: "Explains pricing strategies for business firms and tax incidence for governments.",
      tip: "Farmers with inelastic harvest supply suffer falling total revenue during bumper harvest years (Paradox of Plenty)."
    },
    {
      category: "Microeconomics",
      title: "Externalities and Market Failure",
      formula: "Social Cost = Private Cost + External Cost (Negative Externality, e.g. pollution)\nSocial Benefit = Private Benefit + External Benefit (Positive Externality, e.g. education, vaccines)\nMarket Failure occurs when Marginal Social Benefit ≠ Marginal Social Cost",
      explanation: "Negative externalities lead to overproduction; positive externalities lead to underproduction by the free market.",
      tip: "Corrective remedies: Pigouvian taxes on polluters; government subsidies for positive externalities."
    },
    {
      category: "Macroeconomics",
      title: "Circular Flow of Income (Four-Sector Model)",
      formula: "National Income Y = C + I + G + (X - M)\nInjections J = I + G + X\nLeakages/Withdrawals W = S + T + M\nEquilibrium Condition: Injections (J) = Leakages (W)",
      explanation: "Savings (S), Taxes (T), and Imports (M) withdraw money from circular flow; Investment (I), Government spending (G), and Exports (X) inject money.",
      tip: "If Injections > Leakages, national income expands; if Leakages > Injections, national income contracts."
    },
    {
      category: "Macroeconomics",
      title: "Automatic Stabilizers in Fiscal Policy",
      formula: "Examples: Progressive income taxes (PAYE) & Unemployment benefits",
      explanation: "Policies that automatically cushion economic fluctuations without requiring explicit legislative action.",
      tip: "During boom times, rising incomes push taxpayers into higher tax brackets, dampening inflationary pressures automatically."
    },
    {
      category: "Public Finance",
      title: "Incidence of Taxation (Elasticity Rule)",
      formula: "• When Demand is more inelastic than Supply: Consumers bear the GREATER tax burden\n• When Supply is more inelastic than Demand: Producers bear the GREATER tax burden\n• When Demand is perfectly inelastic: Consumers bear 100% of the tax burden",
      explanation: "Tax incidence refers to the ultimate distribution of a tax's economic burden between buyers and sellers.",
      tip: "Governments place high excise duties on cigarettes and alcohol because inelastic demand allows passing the tax to consumers."
    },
    {
      category: "Development Economics",
      title: "Human Development Index (HDI)",
      formula: "HDI = Geometric Mean of 3 Indices: [Life Expectancy Index × Education Index × GNI Index]^(1/3)",
      explanation: "Combines 1. Long and healthy life (Life expectancy at birth), 2. Knowledge (Expected & Mean years of schooling), 3. Decent standard of living (GNI per capita PPP).",
      tip: "HDI ranges from 0 to 1. Scores above 0.800 indicate very high human development."
    }
  ],

  "Commercial & Accounts": [
    {
      category: "Financial Accounting",
      title: "Core Accounting Equation",
      formula: "Assets = Capital (Owner's Equity) + Liabilities\nCapital = Assets - Liabilities\nClosing Capital = Opening Capital + Additional Capital + Net Profit - Drawings",
      explanation: "The bedrock of double-entry bookkeeping. Every financial transaction keeps this equation in balance.",
      tip: "Drawings REDUCE owner's equity/capital; Net Profit INCREASES owner's equity."
    },
    {
      category: "Financial Accounting",
      title: "Double Entry Golden Rules",
      formula: "1. Personal Accounts (Persons/Firms): Debit the Receiver, Credit the Giver\n2. Real Accounts (Assets/Property): Debit what comes in, Credit what goes out\n3. Nominal Accounts (Expenses & Incomes): Debit all Expenses & Losses, Credit all Incomes & Gains",
      explanation: "Every debit entry must have an equal and corresponding credit entry across ledger accounts.",
      tip: "Assets and Expenses have normal DEBIT balances; Liabilities, Capital, and Revenues have normal CREDIT balances."
    },
    {
      category: "Financial Accounting",
      title: "Books of Original Entry (Prime Entry)",
      formula: "• Sales Day Book: Records credit sales of goods\n• Purchases Day Book: Records credit purchases of goods\n• Returns Inwards (Sales Returns) Book: Credit note issued\n• Returns Outwards (Purchases Returns) Book: Debit note issued\n• Cash Book: All cash and bank receipts and payments\n• General Journal: Non-routine transactions (fixed assets on credit, opening/closing entries, correction of errors)",
      explanation: "Prime entry books summarize transactions before posting to individual ledger accounts.",
      tip: "Trade discount is deducted on the invoice and NEVER recorded in the ledger accounts; only cash discount is recorded."
    },
    {
      category: "Financial Accounting",
      title: "Trial Balance Errors (Not Affecting Balance)",
      formula: "1. Error of Omission: Transaction completely omitted\n2. Error of Commission: Correct amount entered in wrong person's account\n3. Error of Principle: Violates accounting concepts (e.g. recording asset purchase as expense)\n4. Error of Original Entry: Incorrect amount recorded in prime book\n5. Error of Complete Reversal: Debit and credit sides reversed\n6. Compensating Errors: Two independent errors cancel each other out",
      explanation: "A Trial Balance agreeing is proof of mathematical equality of debits and credits, but NOT proof of absolute accuracy.",
      tip: "Capitalizing repairs to motor vehicles is an Error of Principle."
    },
    {
      category: "Financial Accounting",
      title: "Suspense Account & Error Correction",
      formula: "Opened when Trial Balance fails to balance.\n• Difference on debit side ⟶ Suspense account debited\n• Difference on credit side ⟶ Suspense account credited\nErrors affecting trial balance (one-sided errors, transposition, miscasting) are cleared through the Suspense Account.",
      explanation: "Once all errors are discovered and rectified via journal entries, the Suspense Account balance becomes zero.",
      tip: "Overcasting sales book means sales credit was too high; correct by debiting Sales and crediting Suspense."
    },
    {
      category: "Financial Accounting",
      title: "Bank Reconciliation Statement",
      formula: "Balance per Cash Book (Adjusted)\n+ Unpresented Cheques (Issued but not yet presented at bank)\n- Uncredited Cheques / Lodgments (Paid in but not yet cleared by bank)\n= Balance as per Bank Statement",
      explanation: "Adjust the Cash Book first for: Bank charges, standing orders, direct debits, credit transfers, and dishonored cheques.",
      tip: "A credit balance in the Bank Statement indicates money in the bank (positive cash); a debit balance means an overdraft."
    },
    {
      category: "Financial Accounting",
      title: "Depreciation: Straight Line Method",
      formula: "Annual Depreciation = (Cost - Estimated Residual Value) / Useful Life (years)\nDepreciation Rate = (Annual Depreciation / Cost) × 100%",
      explanation: "Depreciation expense is constant every year throughout the asset's economic lifespan.",
      tip: "Accumulated Depreciation is a contra-asset account deducted from Cost in the Balance Sheet to give Net Book Value (NBV)."
    },
    {
      category: "Financial Accounting",
      title: "Depreciation: Reducing (Diminishing) Balance",
      formula: "Annual Depreciation = Depreciation Rate (%) × Net Book Value (NBV)\nNBV = Cost - Accumulated Depreciation to date",
      explanation: "Produces highest depreciation charge in the early years of asset life when maintenance costs are lowest.",
      tip: "Scrap/residual value is NOT subtracted before applying percentage rate in reducing balance method."
    },
    {
      category: "Financial Accounting",
      title: "Bad Debts & Provision for Doubtful Debts",
      formula: "Bad Debts written off: Dr Bad Debts (P&L), Cr Debtors (Receivables)\nProvision for Doubtful Debts = % × (Total Debtors - Bad Debts written off)\nIncrease in provision: Debited to P&L; Decrease in provision: Credited to P&L",
      explanation: "Follows the Prudence (Conservatism) concept: never anticipate profits, provide for all probable losses.",
      tip: "In the Balance Sheet: Net Debtors = Total Debtors - Bad debts written off - Provision for Doubtful Debts."
    },
    {
      category: "Financial Accounting",
      title: "Accruals and Prepayments Adjustments",
      formula: "Expense Account: Paid + Accrued at end - Prepaid at end = True Expense for year\nIncome Account: Received + Accrued at end - Received in advance = True Income for year",
      explanation: "Accrued expenses are current liabilities (owed). Prepayments are current assets (paid in advance).",
      tip: "Accrual concept: match revenues and expenses to the period in which they are incurred, not when cash changes hands."
    },
    {
      category: "Financial Accounting",
      title: "Trading Account (Cost of Goods Sold & Gross Profit)",
      formula: "Cost of Goods Sold (COGS) = Opening Stock + Net Purchases + Carriage Inwards - Closing Stock\nNet Purchases = Purchases - Returns Outwards\nNet Sales = Sales - Returns Inwards\nGross Profit = Net Sales - COGS",
      explanation: "Carriage Inwards (freight on purchases) is added to purchases; Carriage Outwards is an operating expense in Profit & Loss.",
      tip: "Closing stock appears in BOTH Trading Account (deducted from cost of goods available) and Balance Sheet (Current Asset)."
    },
    {
      category: "Financial Accounting",
      title: "Profit & Loss Account (Net Profit)",
      formula: "Net Profit = Gross Profit + Other Incomes (Discounts received, rent received) - Operating Expenses",
      explanation: "Operating expenses include rent, salaries, electricity, depreciation, bad debts, advertising, and carriage outwards.",
      tip: "Interest on loans is treated as an operating/finance expense in P&L, not a deduction from gross profit in trading account."
    },
    {
      category: "Financial Accounting",
      title: "Balance Sheet Classification of Assets & Liabilities",
      formula: "Assets:\n• Non-Current (Fixed): Land & Buildings, Machinery, Motor Vehicles, Furniture\n• Current: Stock, Debtors (Receivables), Bank, Cash\nLiabilities:\n• Current: Creditors (Payables), Bank Overdraft, Accrued Expenses\n• Non-Current (Long-Term): Debentures, Bank Loan, Mortgage\nWorking Capital = Current Assets - Current Liabilities",
      explanation: "Working capital (Net Current Assets) measures the short-term financial solvency of the enterprise.",
      tip: "Liquidity order for current assets: Stock (least liquid) ⟶ Debtors ⟶ Bank ⟶ Cash (most liquid)."
    },
    {
      category: "Financial Accounting",
      title: "Liquidity Ratios Analysis",
      formula: "Current Ratio = Current Assets / Current Liabilities (Ideal: 2:1)\nAcid-Test (Quick) Ratio = (Current Assets - Stock) / Current Liabilities (Ideal: 1:1)",
      explanation: "The Quick Ratio excludes inventory because stock cannot be converted into cash immediately.",
      tip: "A quick ratio below 1:1 suggests the firm may struggle to settle immediate short-term obligations."
    },
    {
      category: "Financial Accounting",
      title: "Profitability Ratios Analysis",
      formula: "Gross Profit Margin = (Gross Profit / Sales) × 100%\nNet Profit Margin = (Net Profit / Sales) × 100%\nReturn on Capital Employed (ROCE) = [Operating Profit / Capital Employed] × 100%\nCapital Employed = Total Assets - Current Liabilities = Owner's Equity + Long-Term Debts",
      explanation: "ROCE is the primary measure of how efficiently management utilizes all available long-term capital.",
      tip: "Markup = Gross Profit / Cost of Goods Sold; Margin = Gross Profit / Selling Price. If markup is 25% (¼), margin is 20% (⅕)."
    },
    {
      category: "Financial Accounting",
      title: "Activity / Turnover Ratios Analysis",
      formula: "Rate of Stock Turnover = COGS / Average Stock\nAverage Stock = (Opening Stock + Closing Stock) / 2\nDebtors Collection Period = (Trade Debtors / Credit Sales) × 365 days\nCreditors Payment Period = (Trade Creditors / Credit Purchases) × 365 days",
      explanation: "Stock turnover measures how many times inventory is sold and replaced over the year.",
      tip: "A high rate of stock turnover indicates rapid sales and efficient inventory management."
    },
    {
      category: "Partnership Accounts",
      title: "Partnership Appropriation Account",
      formula: "Net Profit from P&L\n+ Interest on Drawings (Dr to partners' current accounts)\n- Interest on Capital (Cr to partners' current accounts)\n- Partner Salaries / Bonuses (Cr to partners' current accounts)\n= Residual Profit / Loss shared according to Profit-Sharing Ratio",
      explanation: "Interest on drawings is an income to the partnership firm; interest on capital and salaries are appropriations of profit.",
      tip: "In the absence of a Partnership Agreement (Partnership Act 1890): Profits/losses shared equally; NO interest on capital or drawings; NO salaries; 5% interest on partner advances/loans."
    },
    {
      category: "Partnership Accounts",
      title: "Partners' Capital vs Current Accounts",
      formula: "Fixed Capital Method: Capital accounts remain fixed; all drawings, share of profit, interest, and salaries go to Current Accounts\nFluctuating Capital Method: Only one Capital account maintained for each partner combining capital and all transactions",
      explanation: "A debit balance on a partner's current account indicates the partner has overdrawn and owes the firm.",
      tip: "Goodwill on admission of a new partner is credited to existing partners in their OLD profit-sharing ratio."
    },
    {
      category: "Company Accounts",
      title: "Types of Share Capital",
      formula: "• Authorized (Nominal) Capital: Maximum capital registered with Corporate Affairs Commission (CAC)\n• Issued Capital: Portion of authorized capital offered to shareholders\n• Called-Up Capital: Portion of issued capital demanded from shareholders\n• Paid-Up Capital = Called-Up Capital - Calls in Arrears",
      explanation: "Calls in advance are treated as current liabilities until the call becomes due.",
      tip: "Preference shareholders receive a fixed dividend rate and have priority over ordinary shareholders upon liquidation."
    },
    {
      category: "Company Accounts",
      title: "Debentures vs Ordinary Shares",
      formula: "Debentures = Long-term debt capital (Creditor status, fixed interest paid regardless of profit, secured on company assets)\nOrdinary Shares = Equity ownership capital (Variable dividends paid only from profits, voting rights, bear ultimate business risk)",
      explanation: "Debenture interest is an expense charged in P&L before tax; share dividends are an appropriation of profit after tax.",
      tip: "Failure to pay debenture interest can lead to liquidation; skipping equity dividends cannot."
    },
    {
      category: "Manufacturing Accounts",
      title: "Manufacturing Account (Production Cost)",
      formula: "Direct Materials Used (Opening + Purchases + Carriage In - Closing)\n+ Direct Labor (Wages of factory workers)\n+ Direct Expenses (Royalties, design costs)\n= Prime Cost\n+ Factory Overheads (Rent, depreciation of machinery, factory supervisor)\n+ Opening Work-in-Progress - Closing Work-in-Progress\n= Cost of Finished Goods Produced (transferred to Trading Account)",
      explanation: "Prime Cost is the sum of all direct costs traceable to the finished product.",
      tip: "Administrative, selling, and distribution expenses are NEVER included in Manufacturing Account; they go directly to P&L."
    },
    {
      category: "Non-Profit Accounts",
      title: "Receipts & Payments vs Income & Expenditure",
      formula: "• Receipts & Payments: Summary of Cash Book (records all cash in/out, capital and revenue, no accruals)\n• Income & Expenditure: Equivalent to P&L (records only revenue income and expenditure for the period on accrual basis)\nSurplus of Income over Expenditure = Increases Accumulated Fund",
      explanation: "Accumulated Fund in clubs/societies is the equivalent of Capital in commercial trading enterprises.",
      tip: "Accumulated Fund = Total Assets - Total Liabilities at the start of the year."
    },
    {
      category: "Non-Profit Accounts",
      title: "Subscriptions Account Adjustments",
      formula: "Income to I&E = Subscriptions Received + Accrued at end - Accrued at start - Prepaid at end + Prepaid at start",
      explanation: "Subscriptions received in advance are current liabilities; subscriptions in arrears are current assets.",
      tip: "Life membership subscriptions are normally credited to a special fund and transferred to income over a period of years."
    },
    {
      category: "Single Entry",
      title: "Incomplete Records & Statement of Affairs",
      formula: "Opening Capital = Opening Assets - Opening Liabilities\nClosing Capital = Closing Assets - Closing Liabilities\nProfit = Closing Capital + Drawings - Additional Capital Introduced - Opening Capital",
      explanation: "A Statement of Affairs is identical in format to a Balance Sheet, prepared to deduce capital when proper double-entry records are missing.",
      tip: "To find credit sales in incomplete records: construct a Total Debtors Account."
    },
    {
      category: "Departmental Accounts",
      title: "Departmental Accounts Allocation of Expenses",
      formula: "• Rent & Rates: Allocated by floor area occupied (m²)\n• Electricity & Heating: By floor area or meter readings\n• Advertising & Salesmen Commission: By sales turnover ratio\n• Depreciation of Machinery: By asset value ratio",
      explanation: "Enables management to identify which department is operating profitably and which is running at a loss.",
      tip: "Direct expenses specific to a department are charged directly to that department."
    },
    {
      category: "Commerce",
      title: "Aids to Trade (Commerce Support Pillars)",
      formula: "Commerce = Trade (Home & Foreign) + Aids to Trade\nAids: Banking, Insurance, Warehousing, Transport, Advertising, Communication",
      explanation: "Aids to trade bridge the gap between production and consumption, eliminating barriers of distance, risk, time, and information.",
      tip: "Warehousing creates TIME utility; transportation creates PLACE utility."
    },
    {
      category: "Commerce",
      title: "Insurance Principles (Uberrimae Fidei & Indemnity)",
      formula: "1. Utmost Good Faith (Uberrimae Fidei): Disclose all material facts\n2. Insurable Interest: Must suffer financial loss from damage\n3. Indemnity: Restore to original financial position, NO profit from loss\n4. Subrogation: Stepping into insurer's shoes after settlement\n5. Contribution: Shared compensation across multiple insurers\n6. Proximate Cause: Direct dominant cause of loss",
      explanation: "Life assurance and personal accident contracts are NOT contracts of indemnity (human life cannot be valued financially).",
      tip: "Under the principle of Average: Claim = (Sum Insured / Actual Value) × Actual Loss."
    },
    {
      category: "Commerce",
      title: "Wholesaler Functions in Channel of Distribution",
      formula: "Manufacturer ⟶ Wholesaler ⟶ Retailer ⟶ Consumer\nFunctions: Bulk breaking, financing manufacturer, warehousing stock, market information feedback, risk bearing",
      explanation: "The wholesaler purchases in large quantities from manufacturers and sells in smaller lots to retailers.",
      tip: "Eliminating the middleman does not eliminate the functions of the middleman; they must be absorbed by someone else."
    },
    {
      category: "Commerce",
      title: "Types of Business Units (Sole Trader to Public Co)",
      formula: "• Sole Proprietorship: 1 owner, unlimited liability, lack of continuity\n• Partnership: 2-20 partners, deed of partnership, unlimited liability (except limited partners)\n• Private Ltd Co (Ltd): Min 2 shareholders, restricted share transfer, limited liability, separate legal entity\n• Public Ltd Co (Plc): Min 7 shareholders, shares traded on Stock Exchange, audited public accounts",
      explanation: "Limited liability means shareholders lose only the amount invested/unpaid on their shares if the company goes bankrupt.",
      tip: "A legal entity (incorporated company) can sue and be sued in its own name, own property, and enjoys perpetual succession."
    },
    {
      category: "Commerce",
      title: "Stock Exchange & Capital Market Instruments",
      formula: "• Bulls: Speculators who buy expecting stock prices to rise\n• Bears: Speculators who sell expecting stock prices to fall\n• Stags: Speculators who apply for new share issues expecting to sell at premium",
      explanation: "Primary market deals with new issues of securities (IPOs); Secondary market deals with trading of already existing securities.",
      tip: "Securities and Exchange Commission (SEC) is the apex regulatory body of the Nigerian capital market."
    },
    {
      category: "Commerce",
      title: "Documents Used in Buying and Selling",
      formula: "1. Letter of Inquiry (Buyer ⟶ Seller)\n2. Quotation / Proforma Invoice (Seller ⟶ Buyer)\n3. Purchase Order (Buyer ⟶ Seller)\n4. Delivery Note & Advice Note (Accompanying goods)\n5. Invoice (Bill giving details of goods, prices, terms)\n6. Credit Note (Reduces invoice amount: for returns or overcharge)\n7. Debit Note (Increases invoice amount: for undercharge)\n8. Statement of Account & Receipt",
      explanation: "A credit note is printed in red ink to distinguish it from an invoice.",
      tip: "Trade discount is stated on the invoice; cash discount is offered as an incentive for prompt payment."
    },
    {
      category: "Commerce",
      title: "International Trade Terms (Incoterms)",
      formula: "• FOB (Free on Board): Seller pays transport up to ship loading; buyer pays freight and insurance\n• CIF (Cost, Insurance, and Freight): Seller pays goods cost, marine insurance, and freight to destination port\n• FAS (Free Alongside Ship): Seller delivers goods alongside ship at port\n• Ex-Works: Buyer collects goods directly at seller's factory/warehouse",
      explanation: "Bill of Lading acts as: 1. Document of title, 2. Receipt for goods, 3. Contract of carriage.",
      tip: "A clean bill of lading confirms goods were received on board in apparent good condition without defects."
    },
    {
      category: "Commerce",
      title: "Consumer Protection Legislation",
      formula: "Agencies: Federal Competition and Consumer Protection Commission (FCCPC), NAFDAC, SON (Standards Organisation of Nigeria)\nConsumer Rights: Right to safety, right to be informed, right to choose, right to be heard, right to redress",
      explanation: "Caveat Emptor ('Let the buyer beware') is increasingly supplemented by consumer protection laws.",
      tip: "NAFDAC regulates food, drugs, cosmetics, and packaged water; SON regulates industrial standards and manufactured goods."
    },
    {
      category: "Financial Accounting",
      title: "Accounting Concepts & Conventions",
      formula: "1. Business Entity: Business is separate from owner\n2. Going Concern: Entity will continue operating indefinitely\n3. Money Measurement: Only transactions quantifiable in money recorded\n4. Historical Cost: Assets recorded at purchase price\n5. Realization: Revenue recognized when goods delivered/risk transferred\n6. Consistency: Same accounting policies applied year after year\n7. Materiality: Minor items need not follow strict accounting rules",
      explanation: "Fundamental accounting assumptions underlying financial statement preparation.",
      tip: "Charging a ₦5,000 waste paper basket as an expense rather than depreciating it as an asset is justified by the Materiality convention."
    },
    {
      category: "Commerce",
      title: "Commercial Banks vs Central Bank Functions",
      formula: "Central Bank: Banker to government and commercial banks, issues currency notes and coins, implements monetary policy, lender of last resort, manages foreign reserves\nCommercial Banks: Accept deposits, grant loans and overdrafts, facilitate payments, agent of credit creation",
      explanation: "Central Bank does not interact with the general public or maintain private individual accounts.",
      tip: "The Central Bank of Nigeria (CBN) was established by the CBN Act of 1958."
    },
    {
      category: "Financial Accounting",
      title: "Control Accounts (Sales & Purchases Ledgers)",
      formula: "Sales Ledger Control Account (Debtors Control):\nDr Balance b/f + Credit Sales + Dishonored Cheques\n- Cash/Cheques Received - Returns Inwards - Discounts Allowed - Bad Debts = Closing Debtors\nPurchases Ledger Control Account (Creditors Control):\nCr Balance b/f + Credit Purchases\n- Payments to Creditors - Returns Outwards - Discounts Received = Closing Creditors",
      explanation: "Acts as an independent self-balancing check on the accuracy of personal ledger accounts.",
      tip: "Contra entry: when a firm is both a supplier and customer, the smaller balance is set off against the larger."
    },
    {
      category: "Financial Accounting",
      title: "Inventory Valuation (FIFO vs LIFO vs AVCO)",
      formula: "• FIFO (First In, First Out): Oldest stock issued first; closing stock valued at most recent prices (higher profit during inflation)\n• LIFO (Last In, First Out): Newest stock issued first; closing stock valued at older prices (lower profit during inflation)\n• AVCO (Weighted Average Cost): Issued and closing stock valued at weighted average price",
      explanation: "IAS 2 (Inventories) prohibits the use of LIFO for financial reporting; inventories must be valued at Lower of Cost and Net Realizable Value (NRV).",
      tip: "In periods of rising prices (inflation), FIFO produces higher ending inventory and higher net profit."
    },
    {
      category: "Commerce",
      title: "Types of Cheques & Crossings",
      formula: "• Order Cheque: Payable to named payee or order (requires endorsement)\n• Bearer Cheque: Payable to whoever holds it (no endorsement needed)\n• Crossed Cheque: Two parallel transverse lines on face (must be paid into bank account, cannot be cashed over counter)\n• Restrictive Crossing: '& Co', 'Account Payee Only', 'Not Negotiable'",
      explanation: "A post-dated cheque carries a future date and cannot be honored by the bank before that date.",
      tip: "A stale cheque is presented for payment after 6 months from the date of issue (bank will refuse payment)."
    },
    {
      category: "Commerce",
      title: "Advertising Media Types & Public Relations",
      formula: "Media: Print (Newspapers, Magazines), Broadcast (Television, Radio), Outdoor (Billboards, Transit), Digital/Online\nPublic Relations (PR): Deliberate, planned effort to establish and maintain mutual understanding between organization and public",
      explanation: "Advertising is paid, non-personal promotion; Public Relations focuses on corporate goodwill and reputation.",
      tip: "Informative advertising creates awareness of new products; Persuasive advertising aims to convince consumers to choose a specific brand."
    },
    {
      category: "Commerce",
      title: "Warehousing Types & Bonded Warehouses",
      formula: "• Private Warehouse: Owned by individual firms for their own inventory\n• Public Warehouse: Available to general public for rental fee\n• Bonded Warehouse: Government-supervised warehouse for storing dutiable imported goods before customs tariffs are paid",
      explanation: "Goods stored in a bonded warehouse can be processed, packaged, or re-exported without paying customs duty.",
      tip: "Goods are released from a bonded warehouse only after the importer presents a customs release note proving import duties have been paid."
    }
  ],

  "Use of English": [
    {
      category: "Grammar & Concord",
      title: "Proximity Rule with Correlative Conjunctions",
      formula: "Either ... or / Neither ... nor / Not only ... but also\nVerb agrees in number and person with the NEAREST subject.",
      explanation: "• Neither the teacher nor the students WERE present.\n• Neither the students nor the teacher WAS present.",
      tip: "Focus entirely on the subject immediately preceding the verb."
    },
    {
      category: "Grammar & Concord",
      title: "As Well As / Accompanied By / Along With Rule",
      formula: "Subject₁ + (as well as / together with / along with / accompanied by / in addition to) + Subject₂ ⟹ Verb agrees strictly with Subject₁",
      explanation: "Parenthetical prepositional phrases do not change the number of the true grammatical subject.",
      tip: "• The principal, together with his teachers, WAS honored (principal is singular!)."
    },
    {
      category: "Grammar & Concord",
      title: "Indefinite Pronouns Concord",
      formula: "Everyone, Everybody, Someone, Somebody, Anyone, Anybody, Nobody, Each, Either, Neither, One ⟹ ALWAYS SINGULAR VERB",
      explanation: "Even when followed by plural prepositional phrases, these pronouns remain singular.",
      tip: "• 'Each of the candidates IS ready' (NOT 'are ready').\n• 'Everyone has his or her book' (standard formal concord)."
    },
    {
      category: "Grammar & Concord",
      title: "Collective Nouns Concord",
      formula: "Committee, Jury, Army, Audience, Family, Team\n• Singular verb when acting as a unified single body\n• Plural verb when members act individually or are divided",
      explanation: "• 'The committee HAS submitted its report' (unified).\n• 'The committee WERE divided in their opinions' (individual disagreement).",
      tip: "Look at accompanying pronouns: 'its' demands singular verb; 'their' demands plural verb."
    },
    {
      category: "Grammar & Concord",
      title: "Nouns Always Plural in Form and Verb",
      formula: "Trousers, Scissors, Pliers, Tweezers, Spectacles, Binoculars, Clothes, Surroundings, Riches ⟹ PLURAL VERB\nSingular with 'A pair of': 'A pair of scissors IS on the table'",
      explanation: "These bipartite instruments consist of two joined halves and take plural verbs unless preceded by 'pair'.",
      tip: "• 'My scissors ARE blunt.' BUT: 'This pair of scissors IS sharp.'"
    },
    {
      category: "Grammar & Concord",
      title: "Uncountable Nouns Never in Plural",
      formula: "Information, Furniture, Equipment, Advice, Luggage, Baggage, News, Stationery, Scenery, Jewelry ⟹ NEVER take -s, ALWAYS SINGULAR VERB",
      explanation: "You cannot say 'informations' or 'furnitures'. To indicate number, use counters: 'two pieces of information', 'items of furniture'.",
      tip: "• 'The news WAS shocking' (News is singular, despite ending in 's')."
    },
    {
      category: "Grammar & Concord",
      title: "Plural Expressions of Quantity & Time",
      formula: "Amounts of money, periods of time, distances, weights ⟹ SINGULAR VERB when regarded as a single unit",
      explanation: "• Ten thousand naira IS a fair price.\n• Five years IS a long time to wait.\n• Fifty kilometers IS a daunting trek.",
      tip: "If the individual currency notes or coins are emphasized, use plural: 'Ten one-hundred naira notes WERE scattered on the floor.'"
    },
    {
      category: "Grammar & Concord",
      title: "The Number vs A Number Concord",
      formula: "'The number of' + plural noun ⟹ SINGULAR VERB\n'A number of' + plural noun ⟹ PLURAL VERB",
      explanation: "'The number' refers to the specific mathematical count (singular); 'A number' is an indefinite quantifier meaning 'many' (plural).",
      tip: "• 'The number of applicants HAS increased.'\n• 'A number of applicants HAVE arrived.'"
    },
    {
      category: "Grammar & Concord",
      title: "One of the ... Who / Which Relative Clause Concord",
      formula: "One of the + [plural noun] + who/which + PLURAL VERB\nTHE ONLY ONE of the + [plural noun] + who/which + SINGULAR VERB",
      explanation: "• Musa is one of the boys who PLAY football (the antecedent of 'who' is 'boys', so verb is plural).\n• Musa is the ONLY ONE of the boys who PLAYS football ('only one' is antecedent).",
      tip: "JAMB tests this distinction in almost every examination edition."
    },
    {
      category: "Grammar & Concord",
      title: "Inversion after Negative Adverbials",
      formula: "Hardly / Scarcely / Barely + had + Subject + Past Participle + WHEN ...\nNo sooner + had + Subject + Past Participle + THAN ...",
      explanation: "Negative adverbials at the beginning of a sentence trigger question word-order inversion (auxiliary before subject).",
      tip: "• 'Hardly had he arrived WHEN the bell rang' (NEVER use 'than' with hardly!).\n• 'No sooner had she spoken THAN he replied.'"
    },
    {
      category: "Lexis & Structure",
      title: "Conditionals Summary (Zero, 1st, 2nd, 3rd)",
      formula: "• Type 0 (Fact): If + present simple ⟶ present simple ('If you heat ice, it melts')\n• Type 1 (Real): If + present simple ⟶ will + base verb ('If it rains, we will stay')\n• Type 2 (Hypothetical): If + past simple ⟶ would + base verb ('If I were rich, I would travel')\n• Type 3 (Unfulfilled past): If + past perfect (had + V3) ⟶ would have + V3",
      explanation: "In subjunctive Type 2: use 'were' for all persons ('If I were you', 'If he were here').",
      tip: "• 'If she had studied, she WOULD HAVE PASSED the exam.' (Never say 'would have had studied')."
    },
    {
      category: "Lexis & Structure",
      title: "Subjunctive Mood Constructions",
      formula: "Verbs of urging/demanding: demand, insist, recommend, suggest, urge, propose + that + Subject + BASE VERB (Bare Infinitive)",
      explanation: "In formal subjunctive clauses, the verb remains in base form with no -s or past inflection.",
      tip: "• 'The doctor recommended that he TAKE (not takes) a rest.'\n• 'I insist that she BE (not is) informed immediately.'"
    },
    {
      category: "Lexis & Structure",
      title: "It is High Time / About Time Construction",
      formula: "It is high time / It is about time + Subject + PAST SIMPLE VERB",
      explanation: "Indicates that an action is already overdue and should have been done earlier.",
      tip: "• 'It is high time we LEFT' (NOT 'leave'). BUT without a subject: 'It is high time TO LEAVE'."
    },
    {
      category: "Lexis & Structure",
      title: "Question Tags Golden Rules",
      formula: "• Positive statement ⟶ Negative tag ('You are ready, aren't you?')\n• Negative statement ⟶ Positive tag ('She didn't call, did she?')\n• 'I am' ⟶ 'aren't I?'\n• 'Let's' ⟶ 'shall we?'\n• Imperatives ('Close the door') ⟶ 'will you?' / 'would you?'\n• Statements with negative words (scarcely, hardly, seldom, never) ⟶ POSITIVE TAG",
      explanation: "Words like 'barely', 'scarcely', and 'seldom' make the statement negative.",
      tip: "• 'He seldom visits, DOES HE?' (NOT 'doesn't he?')."
    },
    {
      category: "Lexis & Structure",
      title: "Causative Verbs (Have, Make, Let, Get)",
      formula: "• Make / Let / Have (active) + Object + BARE INFINITIVE ('She made him apologize')\n• Get (active) + Object + TO-INFINITIVE ('She got him to apologize')\n• Have / Get (passive) + Object + PAST PARTICIPLE ('I had my car repaired')",
      explanation: "'Let' means allow; 'Make' means force/compel; 'Have' means authorize/employ.",
      tip: "• 'The teacher made us DO (not to do) the assignment.'"
    },
    {
      category: "Lexis & Structure",
      title: "Prefer ... to vs Would Rather ... than",
      formula: "• Prefer [Noun/Gerund] TO [Noun/Gerund] ('I prefer tea to coffee')\n• Would rather + BARE INFINITIVE + THAN + BARE INFINITIVE ('I would rather walk than wait')\n• Would rather + Subject + PAST TENSE ('I would rather you stayed home')",
      explanation: "Never use 'than' with 'prefer'; never use 'to' with 'would rather'.",
      tip: "• 'He prefers swimming TO running' (NOT 'than running')."
    },
    {
      category: "Lexis & Structure",
      title: "Order of Adjectives Mnemonic",
      formula: "OSASCOMP:\nOpinion ⟶ Size ⟶ Age ⟶ Shape ⟶ Color ⟶ Origin ⟶ Material ⟶ Purpose + Noun",
      explanation: "Example: 'A beautiful (O) small (S) antique (A) round (Sh) black (C) Nigerian (Or) wooden (M) dining (P) table.'",
      tip: "JAMB often gives scrambled adjectives (e.g. 'a Nigerian wooden dark table' vs 'a dark Nigerian wooden table')."
    },
    {
      category: "Lexis & Structure",
      title: "Used to vs Be/Get Used to",
      formula: "• Used to + BARE INFINITIVE: Past habit no longer true ('I used to smoke')\n• Be / Get used to + GERUND (-ing): Accustomed to something ('I am used to waking up early')",
      explanation: "'Be used to' refers to familiarity, and takes a noun or gerund.",
      tip: "• 'She is used to LIVING in Lagos' (NOT 'live in Lagos')."
    },
    {
      category: "Lexis & Structure",
      title: "Dangling (Hanging) Modifiers Correction",
      formula: "The introductory participial phrase must modify the SUBJECT immediately following the comma.",
      explanation: "• Incorrect: 'Walking into the room, the fan fell.' (The fan was not walking!)\n• Correct: 'Walking into the room, HE saw the fan fall.'",
      tip: "Always ensure the person doing the action in the participial clause is the grammatical subject of the main clause."
    },
    {
      category: "Lexis & Structure",
      title: "Direct vs Indirect (Reported) Speech Tense Shifts",
      formula: "• Present Simple ⟶ Past Simple (is ⟶ was)\n• Present Continuous ⟶ Past Continuous (is doing ⟶ was doing)\n• Present Perfect / Past Simple ⟶ Past Perfect (has done / did ⟶ had done)\n• Will ⟶ Would; Can ⟶ Could; May ⟶ Might; Must ⟶ Had to\n• Today ⟶ that day; Yesterday ⟶ the previous day; Tomorrow ⟶ the next day; Here ⟶ there",
      explanation: "Universal truths do not change tense: 'He said the earth revolves around the sun.'",
      tip: "If reporting verb is in present tense ('He says...'), tenses do NOT shift."
    },
    {
      category: "Vocabulary & Idioms",
      title: "High-Frequency Confusing Words (Homophones & Paronyms)",
      formula: "• Compliment (praise) vs Complement (complete/supplement)\n• Stationery (writing materials with 'e' for envelope) vs Stationary (standing still with 'a')\n• Principle (moral rule/doctrine) vs Principal (head of school / chief capital)\n• Practice (noun in British English) vs Practise (verb)\n• Advice (noun) vs Advise (verb)",
      explanation: "British English spelling distinctions strictly tested in WAEC and JAMB.",
      tip: "Notice: Advice / Practice are nouns (c = noun); Advise / Practise are verbs (s = verb)."
    },
    {
      category: "Vocabulary & Idioms",
      title: "Essential Phrasal Verbs & Prepositional Collocations",
      formula: "• Abide BY (rules)\n• Account FOR (explain)\n• Agree WITH a person; Agree TO a proposal\n• Congratulate ON (not 'for')\n• Cope WITH (never 'cope up with' - incorrect!)\n• Look forward TO + verb-ing\n• Dispose OF (one 'f', not 'off')",
      explanation: "Fixed prepositional combinations tested in the lexis and structure section.",
      tip: "• 'He congratulated her ON her success.'\n• 'I look forward to MEETING you.'"
    },
    {
      category: "Vocabulary & Idioms",
      title: "Classic Idiomatic Expressions and Meanings",
      formula: "• Bite the bullet: Face a grim situation with courage\n• Burn the midnight oil: Study/work late into the night\n• Call it a day: Stop working on something\n• Once in a blue moon: Very rarely\n• Turn a deaf ear: Refuse to listen\n• Through thick and thin: Through good times and bad\n• Spill the beans: Reveal a secret prematurely",
      explanation: "Idioms must never be interpreted literally.",
      tip: "In JAMB, idiom questions test your ability to identify the precise figurative meaning."
    },
    {
      category: "Oral English",
      title: "Silent Letters Rules",
      formula: "• Silent 'b': comb, bomb, tomb, doubt, debt, subtle\n• Silent 'k': knight, knot, knife, knee, knowledge\n• Silent 'w': write, wrist, wrong, sword, answer\n• Silent 'p': psalm, psychology, receipt, pneumonia, cupboard\n• Silent 'l': calm, palm, salmon, talk, walk, should, would\n• Silent 't': whistle, castle, listen, fasten, ballet",
      explanation: "Vowels or consonants written in spelling but unpronounced in Received Pronunciation (RP).",
      tip: "The letter 'b' is always silent after 'm' at the end of a syllable (comb, climb, thumb)."
    },
    {
      category: "Oral English",
      title: "Vowel Sounds: Monophthongs vs Diphthongs",
      formula: "• Pure Vowels (Monophthongs): 12 sounds (7 short: /ɪ/, /e/, /æ/, /ɒ/, /ʌ/, /ʊ/, /ə/; 5 long: /iː/, /ɑː/, /ɔː/, /uː/, /ɜː/)\n• Diphthongs: 8 glide sounds (/eɪ/, /aɪ/, /ɔɪ/, /əʊ/, /aʊ/, /ɪə/, /eə/, /ʊə/)",
      explanation: "The schwa /ə/ is the most common vowel sound in spoken English (e.g. 'about' /əˈbaʊt/, 'teacher' /ˈtiːtʃə/).",
      tip: "'Blood' and 'flood' have the /ʌ/ sound (rhyming with 'mud'), NOT the /uː/ sound."
    },
    {
      category: "Oral English",
      title: "Consonant Sounds: Voiced vs Voiceless",
      formula: "• Voiceless /θ/: think, bath, author, cloth, through\n• Voiced /ð/: this, that, mother, bathe, breathe, though\n• Voiced /z/: boys, dogs, plays (after voiced sounds)\n• Voiceless /s/: cats, books, laugh (after voiceless sounds)",
      explanation: "Place your fingers on your throat: vocal cords vibrate during voiced sounds (/ð/, /v/, /z/, /b/, /d/, /g/), but do NOT vibrate during voiceless sounds (/θ/, /f/, /s/, /p/, /t/, /k/).",
      tip: "Noun 'bath' has voiceless /θ/; verb 'bathe' has voiced /ð/."
    },
    {
      category: "Oral English",
      title: "Syllable Stress Placement Rules",
      formula: "Two-syllable noun/adjective vs verb:\n• Noun/Adjective: Stress on FIRST syllable (CON-duct, PRE-sent, EX-port)\n• Verb: Stress on SECOND syllable (con-DUCT, pre-SENT, ex-PORT)",
      explanation: "Words ending in -tion, -sion, -ic, -ical: stress on PENULTIMATE (second-to-last) syllable: edu-CA-tion, sta-TIS-tics.",
      tip: "Words ending in -cy, -ty, -phy, -gy: stress on ANTEPENULTIMATE (third-to-last) syllable: de-MO-cra-cy, pho-TO-gra-phy."
    },
    {
      category: "Oral English",
      title: "Emphatic / Contrastive Stress Interpretation",
      formula: "Capitalized word in sentence is the stressed element carrying new or contrastive information.",
      explanation: "• 'Musa bought a RED car.' ⟶ Query: Did Musa buy a blue car? (No, a RED car)\n• 'MUSA bought a red car.' ⟶ Query: Did Sani buy a red car? (No, MUSA did)",
      tip: "The correct question to which the sentence provides an answer must disagree ONLY with the stressed/capitalized word."
    },
    {
      category: "Figures of Speech",
      title: "Figures of Speech (Tropes) Summary",
      formula: "• Simile: Comparison using 'like' or 'as' ('He fought like a lion')\n• Metaphor: Direct implied comparison without 'like' or 'as' ('He is a lion in battle')\n• Personification: Giving human qualities to inanimate objects ('The wind whispered through the trees')\n• Hyperbole: Deliberate exaggeration for emphasis ('I have told you a million times')",
      explanation: "Mastery of literary devices is essential for both comprehension poetry questions and General English.",
      tip: "A metaphor is an condensed simile with the connective markers omitted."
    },
    {
      category: "Figures of Speech",
      title: "Irony, Sarcasm, Oxymoron & Paradox",
      formula: "• Oxymoron: Two contradictory terms placed side by side ('bittersweet', 'deafening silence', 'cruel kindness')\n• Paradox: A seemingly self-contradictory statement that reveals a deeper truth ('The child is father of the man')\n• Irony: Discrepancy between expectation and reality",
      explanation: "Euphemism is substituting a mild or polite term for a harsh one ('passed away' instead of 'died').",
      tip: "Oxymoron involves adjacent contradictory words; Paradox involves a full contradictory statement."
    },
    {
      category: "Grammar & Concord",
      title: "Not Only ... But Also Concord & Parallelism",
      formula: "Parallel structure must follow both markers:\nNot only + [verb phrase] + but also + [verb phrase]\nNot only + [prepositional phrase] + but also + [prepositional phrase]",
      explanation: "• Incorrect: 'He not only lost his wallet, but also his keys.'\n• Correct: 'He lost not only his wallet but also his keys.'",
      tip: "Whatever part of speech follows 'not only' must also follow 'but also'."
    },
    {
      category: "Grammar & Concord",
      title: "Subject-Verb Concord with 'More than one'",
      formula: "'More than one' + singular noun ⟹ SINGULAR VERB\n'More than two / three' + plural noun ⟹ PLURAL VERB",
      explanation: "Even though 'more than one' implies a plural meaning, the grammatical head is the singular noun that follows.",
      tip: "• 'More than one candidate HAS failed the test' (NOT 'have failed')."
    },
    {
      category: "Grammar & Concord",
      title: "Many a ... Construction",
      formula: "'Many a' + singular noun ⟹ SINGULAR VERB",
      explanation: "Literary structure expressing a plural idea with singular grammatical form.",
      tip: "• 'Many a man HAS died for his country' (NOT 'have died')."
    },
    {
      category: "Grammar & Concord",
      title: "Subject Followed by Prepositional Phrases",
      formula: "The verb agrees with the NOUN BEFORE the preposition, not the noun in the prepositional phrase.",
      explanation: "• 'The smell of the flowers IS sweet' (smell is singular, ignore 'flowers').\n• 'The books on the shelf ARE dusty' (books is plural).",
      tip: "Cross out prepositional phrases starting with 'of', 'in', 'on', 'with' to find the true subject."
    },
    {
      category: "Lexis & Structure",
      title: "Lest + Should / Base Verb Construction",
      formula: "Lest + Subject + (should) + BASE VERB",
      explanation: "'Lest' means 'for fear that' or 'in order to avoid'. It already contains a negative meaning, so NEVER use 'not' after lest.",
      tip: "• 'He ran fast lest he (should) MISS the train' (Never say 'lest he will not miss')."
    },
    {
      category: "Oral English",
      title: "Intonation Patterns (Rising vs Falling Tune)",
      formula: "• Falling Tune (↘): Declarative statements, wh-questions (who, what, where), commands\n• Rising Tune (↗): Yes/No questions, polite requests, listing items before final fall",
      explanation: "• 'Where do you live?' ⟶ Falling intonation (↘)\n• 'Are you coming?' ⟶ Rising intonation (↗)",
      tip: "Wh-questions carry a falling tune, while polar Yes/No questions carry a rising tune."
    },
    {
      category: "Comprehension",
      title: "Fact vs Opinion & Tone of Passage",
      formula: "• Fact: Verifiable statement supported by objective evidence and statistics\n• Opinion: Value judgment, belief, interpretation (contains words like 'should', 'probably', 'best')\n• Author's Tone: Critical, Objective, Sarcastic, Humorous, Nostalgic, Pessimistic, Cynical",
      explanation: "Determining tone requires analyzing the emotional connotation of the author's adjectives and verbs.",
      tip: "If the author ridicules human vices with contempt, the tone is 'sarcastic' or 'satirical'."
    },
    {
      category: "Comprehension",
      title: "Contextual Deduction of Unfamiliar Words",
      formula: "Use surrounding clues: 1. Synonyms/Antonyms in adjacent clauses, 2. Root words/prefixes/suffixes, 3. Cause and effect connectors (because, therefore, hence)",
      explanation: "JAMB tests vocabulary in context. The same word can have different meanings in different passages.",
      tip: "Always substitute the four options into the original sentence to verify which one preserves identical grammatical and contextual sense."
    },
    {
      category: "Grammar & Concord",
      title: "Participles vs Gerunds Distinction",
      formula: "• Gerund = Verb-ing functioning as a NOUN (Subject, Object, Object of Preposition)\n• Present Participle = Verb-ing functioning as an ADJECTIVE or continuous verb tense",
      explanation: "• 'SWIMMING is good exercise' (Gerund, subject of sentence).\n• 'The SWIMMING boy shouted for help' (Participle, adjective modifying boy).",
      tip: "Possessive adjectives precede gerunds: 'I object to HIS (not him) coming late.'"
    },
    {
      category: "Grammar & Concord",
      title: "Relative Pronouns: Who vs Whom vs Whose",
      formula: "• Who: Subject pronoun (replaces he/she/they: 'The man WHO called')\n• Whom: Object pronoun (replaces him/her/them: 'The man WHOM I saw')\n• Whose: Possessive pronoun ('The man WHOSE car was stolen')",
      explanation: "Test: If the pronoun can be answered with 'he', use WHO. If answered with 'him', use WHOM.",
      tip: "After prepositions, always use whom: 'To WHOM it may concern', 'The officer with WHOM I spoke'."
    }
  ],

  "Government & Arts": [
    {
      category: "Political Science",
      title: "Forms of Government (Monarchy, Republic, Oligarchy, Aristocracy)",
      formula: "• Monarchy: Rule by hereditary sovereign (King/Queen)\n• Republic: Head of State is elected, not hereditary\n• Oligarchy: Rule by a small self-serving privileged minority\n• Aristocracy: Rule by the best qualified / nobility\n• Theocracy: Rule by religious leaders claiming divine authority\n• Autocracy / Totalitarianism: Unrestrained absolute power in single ruler",
      explanation: "Nigeria is a Federal Republic with an executive presidential system of government.",
      tip: "Constitutional monarchy (e.g. UK): Sovereign's powers are strictly limited by law and parliament."
    },
    {
      category: "Political Science",
      title: "Unitary vs Federal Systems of Government",
      formula: "• Unitary: All constitutional powers concentrated in a single central government (e.g. UK, France, Ghana)\n• Federal: Constitutional division of powers between central government and component units (e.g. Nigeria, USA, Canada)",
      explanation: "Federalism requires: Rigid written constitution, Supreme Court to resolve inter-governmental disputes, bicameral legislature.",
      tip: "Confederation: Weak central authority where sovereign component states retain the right to secede."
    },
    {
      category: "Political Science",
      title: "Presidential vs Parliamentary System Comparison",
      formula: "Presidential System:\n• Separation of powers between executive and legislature\n• President is both Head of State and Head of Government\n• Cabinet ministers appointed outside parliament\n• Fixed tenure of office\nParliamentary (Cabinet) System:\n• Fusion of powers (Executive chosen from within Parliament)\n• Split executive: Ceremonial Head of State (Monarch/President) vs Head of Government (Prime Minister)\n• Collective ministerial responsibility; Vote of No Confidence can dissolve government",
      explanation: "Nigeria practiced the parliamentary system in the First Republic (1960-1966) and switched to the presidential system in 1979.",
      tip: "In a parliamentary system, the Prime Minister is 'primus inter pares' (first among equals)."
    },
    {
      category: "Political Science",
      title: "Separation of Powers & Checks and Balances",
      formula: "Baron de Montesquieu (1748): 'The Spirit of the Laws'\nThree Organs of Government:\n1. Legislature: Enacts laws\n2. Executive: Implements and enforces laws\n3. Judiciary: Interprets laws and adjudicates disputes",
      explanation: "Checks and balances prevents tyranny by allowing each organ to restrain the powers of the other two.",
      tip: "Examples of checks: Presidential veto of bills; Legislative impeachment of President; Judicial review declaring laws unconstitutional."
    },
    {
      category: "Political Science",
      title: "Rule of Law (A.V. Dicey's Three Postulates)",
      formula: "1. Supremacy of regular law (absence of arbitrary power)\n2. Equality before the law (all citizens subject to ordinary law and courts)\n3. Protection of fundamental human rights by the constitution",
      explanation: "Limitations to Rule of Law: Diplomatic immunity, presidential immunity during tenure, state of emergency, delegated legislation.",
      tip: "Section 308 of the 1999 Nigerian Constitution confers immunity from criminal prosecution on the President, Vice-President, Governors, and Deputy Governors during their tenure."
    },
    {
      category: "Political Science",
      title: "Sovereignty: Definition and Characteristics",
      formula: "Jean Bodin (1576): The absolute, perpetual, and indivisible supreme power of a state\nCharacteristics: Permanence, Indivisibility, Comprehensiveness, Absoluteness, Inalienability",
      explanation: "Internal sovereignty: supreme authority over all individuals within territory. External sovereignty: independence from foreign control.",
      tip: "In a democracy, political (popular) sovereignty ultimately resides with the ELECTORATE (the citizens)."
    },
    {
      category: "Nigerian Politics",
      title: "Pre-Colonial Political Systems in Nigeria",
      formula: "• Hausa-Fulani (Northern): Centralized, authoritarian, Islamic Caliphate headed by Sultan/Emir; Hakimi, Alkali courts\n• Yoruba (Western): Constitutional monarchy with checks and balances; Alaafin checked by Oyomesi (council of chiefs) and Ogboni society\n• Igbo (Eastern): Decentralized, acephalous ('stateless'), republican, direct democracy through Village Assembly (Oha-na-eze), elders (Ama-ala), and age grades",
      explanation: "The Yoruba system permitted the Oyomesi to present an empty calabash (symbolizing rejection) to an autocratic Alaafin, compelling suicide.",
      tip: "Indirect Rule succeeded most in the North due to the existing centralized emirate structure, and failed in the East due to absence of centralized chiefs ('Warrant Chiefs' provoked the 1929 Aba Women's Riot)."
    },
    {
      category: "Nigerian Politics",
      title: "Colonial Constitutional Developments (1922 to 1960)",
      formula: "• Clifford Constitution (1922): Introduced the Elective Principle (4 elected seats: 3 in Lagos, 1 in Calabar); created first political party NNDP (Herbert Macaulay)\n• Richards Constitution (1946): Created Regional Assemblies (North, West, East); fostered regionalism\n• Macpherson Constitution (1951): First nationwide consultation; created central Council of Ministers and House of Representatives\n• Lyttelton Constitution (1954): Established formal FEDERALISM in Nigeria; created office of Premier for each region\n• Independence Constitution (1960): Granted national sovereignty; Queen of England remained ceremonial Head of State represented by Governor-General (Nnamdi Azikiwe)",
      explanation: "Chronological progression of Nigerian constitutions is tested in virtually every JAMB Government paper.",
      tip: "Herbert Macaulay is celebrated as the Father of Nigerian Nationalism."
    },
    {
      category: "Nigerian Politics",
      title: "Republican Constitution of 1963",
      formula: "Key features:\n• Severed ties with the British Crown; Nigeria became a Federal Republic\n• Replaced Governor-General with President as ceremonial Head of State (Nnamdi Azikiwe)\n• Supreme Court of Nigeria became the highest court of appeal (replaced British Privy Council)\n• Created the Mid-Western Region (4th region)",
      explanation: "Mid-Western Region was the only region created in Nigeria by democratic constitutional process (plebiscite in 1963).",
      tip: "The 1963 constitution retained the parliamentary cabinet system with Abubakar Tafawa Balewa as Prime Minister."
    },
    {
      category: "Nigerian Politics",
      title: "1979 and 1999 Constitutions of Nigeria",
      formula: "1979 Constitution: Abandoned British parliamentary model; adopted American Executive Presidential system (Alhaji Shehu Shagari as 1st executive president)\n1999 Constitution: Current operative constitution; 36 States and FCT Abuja; 109 Senators, 360 House of Reps members; 774 Local Government Areas",
      explanation: "Legislative powers divided into: 1. Exclusive List (Federal only: defense, currency, external affairs), 2. Concurrent List (Federal & State: education, health, agriculture), 3. Residual List (State only).",
      tip: "If a state law conflicts with a federal law on the concurrent list, the federal law prevails and the state law is void to the extent of its inconsistency (Doctrine of Covering the Field)."
    },
    {
      category: "Nigerian Politics",
      title: "Military Rule in Nigeria (1966 to 1999)",
      formula: "First Coup: January 15, 1966 (Led by Major Kaduna Nzeogwu; Gen. Aguiyi-Ironsi assumed power)\nUnification Decree No. 34 (1966): Ironsi abolished federalism and declared a unitary state (sparked counter-coup in July 1966 by Yakubu Gowon)\nCivil War: July 1967 - January 1970 ('No victor, no vanquished')\nReturn to Civil Rule: May 29, 1999 (Olusegun Obasanjo)",
      explanation: "Military regimes rule by decrees (central) and edicts (states), suspending constitutional fundamental rights.",
      tip: "General Yakubu Gowon created the first 12 states in Nigeria in May 1967, breaking the 4 regional blocs."
    },
    {
      category: "Public Administration",
      title: "Civil Service & Bureaucracy (Max Weber)",
      formula: "Weberian Characteristics: Hierarchy of authority, division of labor, formal rules and regulations, impersonality in official duties, merit-based recruitment and promotion\nCivil Service Principles: Anonymity, Neutrality, Impartiality, Permanence",
      explanation: "Civil servants execute government policies; ministers provide political direction and bear parliamentary responsibility.",
      tip: "Anonymity means civil servants are neither publicly blamed for policy failures nor publicly praised for policy successes; the political minister takes responsibility."
    },
    {
      category: "Public Administration",
      title: "Public Corporations vs Civil Service",
      formula: "Public Corporations (Statutory Boards):\n• Established by specific Act of Parliament\n• Capital provided by government; intended to be commercially viable or provide public utilities (e.g. NNPC, NPA, TCN)\n• Staffed by employees, not civil servants; governed by Board of Directors",
      explanation: "Privatization is the transfer of state-owned enterprises to private investors; Commercialization means making public enterprises operate for profit without government subsidies.",
      tip: "Public corporations are accountable to the public through annual reports submitted to the National Assembly and ministerial oversight."
    },
    {
      category: "Political Science",
      title: "Electoral Systems (FPTP vs Proportional Representation)",
      formula: "• First-Past-The-Post (Simple Majority): Candidate with highest number of votes wins (used in Nigeria and UK for legislative elections)\n• Absolute Majority: Winner must secure more than 50% of total votes cast (second ballot / runoff if no one reaches 50%)\n• Proportional Representation (PR): Seats allocated to political parties in direct proportion to percentage of popular vote won",
      explanation: "PR ensures minority representation and prevents 'winner-takes-all', but often leads to unstable coalition governments.",
      tip: "To win the Nigerian presidential election, a candidate must have: 1. The highest number of votes cast nationwide, AND 2. At least 25% of votes in at least two-thirds (24) of the 36 states and the FCT."
    },
    {
      category: "Political Science",
      title: "Political Parties vs Pressure Groups",
      formula: "• Political Party: Objective is to CONTEST elections and CAPTURE government power\n• Pressure (Interest) Group: Objective is to INFLUENCE government policies in favor of its members without seeking political office",
      explanation: "Pressure group methods: Lobbying, strikes, boycotts, peaceful protests, public petitions, court litigation.",
      tip: "Examples of Nigerian pressure groups: ASUU, NLC (Nigeria Labour Congress), NBA (Nigerian Bar Association), NMA (Nigerian Medical Association)."
    },
    {
      category: "International Affairs",
      title: "ECOWAS (Economic Community of West African States)",
      formula: "Established: May 28, 1975 (Treaty of Lagos)\nFounding Leaders: General Yakubu Gowon (Nigeria) & President Gnassingbé Eyadéma (Togo)\nHeadquarters: Abuja, Nigeria\nObjectives: Regional economic integration, free movement of persons (ECOWAS Passport), customs union, mutual defense (ECOMOG)",
      explanation: "ECOMOG (Ceasefire Monitoring Group) played prominent peacekeeping roles in Liberia and Sierra Leone.",
      tip: "ECOWAS currently comprises 15 West African nations."
    },
    {
      category: "International Affairs",
      title: "African Union (AU) & OAU History",
      formula: "OAU (Organisation of African Unity): Founded May 25, 1963 in Addis Ababa, Ethiopia (32 independent nations)\nTransformed into AU (African Union): 2002 in Durban, South Africa (inspired by 1999 Sirte Declaration)\nHeadquarters: Addis Ababa, Ethiopia",
      explanation: "OAU primary mission was total eradication of colonialism and apartheid in Africa; AU mission focuses on economic development, peace, democracy, and African integration (Agenda 2063).",
      tip: "The New Partnership for Africa's Development (NEPAD) and the African Peer Review Mechanism (APRM) are core AU socio-economic frameworks."
    },
    {
      category: "International Affairs",
      title: "United Nations (UN) Structure and Organs",
      formula: "Founded: October 24, 1945 in San Francisco (51 founding members; replacing League of Nations)\nSix Principal Organs:\n1. General Assembly (All member states, equal 1-vote)\n2. Security Council (15 members: 5 Permanent with VETO power [USA, UK, France, Russia, China] + 10 non-permanent elected for 2-year terms)\n3. Secretariat (Headed by Secretary-General)\n4. International Court of Justice (ICJ, The Hague, Netherlands)\n5. Economic and Social Council (ECOSOC)\n6. Trusteeship Council (Currently suspended)",
      explanation: "A single veto vote by any of the P5 permanent members defeats any substantive Security Council resolution.",
      tip: "The ICJ consists of 15 judges elected for 9-year terms by the General Assembly and Security Council."
    },
    {
      category: "International Affairs",
      title: "Commonwealth of Nations",
      formula: "Voluntary association of independent sovereign states comprising Britain and its former colonies (plus recent members like Rwanda and Mozambique)\nHead: British Monarch (King Charles III, ceremonial)\nSecretary-General headquarters: Marlborough House, London\nCore event: Commonwealth Heads of Government Meeting (CHOGM) held biennially",
      explanation: "Nigeria was suspended from the Commonwealth in November 1995 following the execution of Ken Saro-Wiwa, and reinstated in May 1999 upon return to democracy.",
      tip: "The Commonwealth has no formal constitution or treaty; members cooperate on shared values of democracy, rule of law, and education."
    },
    {
      category: "International Affairs",
      title: "Non-Aligned Movement (NAM)",
      formula: "Founded: 1961 in Belgrade, Yugoslavia (Origins in 1955 Bandung Conference, Indonesia)\nKey Founding Leaders: Josip Broz Tito (Yugoslavia), Jawaharlal Nehru (India), Gamal Abdel Nasser (Egypt), Kwame Nkrumah (Ghana), Sukarno (Indonesia)",
      explanation: "Formed during the Cold War by developing nations refusing to ally with either the Western capitalist bloc (USA/NATO) or Eastern communist bloc (USSR/Warsaw Pact).",
      tip: "Non-alignment is an active foreign policy of independent judgment on international issues, not passive neutrality or isolationism."
    },
    {
      category: "Nigerian Politics",
      title: "Nigerian Foreign Policy Principles",
      formula: "Primary Orientations:\n1. Afrocentricity (Africa as the centerpiece of Nigeria's foreign policy)\n2. Non-alignment in international affairs\n3. Respect for sovereign equality and territorial integrity of all states\n4. Non-interference in internal affairs of other nations\n5. Eradication of racial discrimination, colonialism, and apartheid",
      explanation: "Under the Murtala/Obasanjo regime in 1975-1976, Nigeria played a decisive role in recognizing the MPLA in Angola, confronting Western apartheid allies.",
      tip: "Nigeria earned the designation of a 'Frontline State' in Southern Africa despite being geographically situated in West Africa due to its immense financial and diplomatic support for anti-apartheid liberation movements."
    },
    {
      category: "Political Science",
      title: "Citizenship Acquisition & Deprivation",
      formula: "Modes of Acquisition:\n1. Birth (Parents or grandparents are citizens)\n2. Registration (Foreign women married to Nigerian men)\n3. Naturalization (Residence for at least 15 continuous years, good character, oath of allegiance)\nDeprivation: Treason, disloyalty, conviction for criminal offense within 7 years of naturalization",
      explanation: "Chapter III of the 1999 Constitution governs Nigerian citizenship.",
      tip: "A citizen by birth CANNOT be deprived of his or her Nigerian citizenship."
    },
    {
      category: "Literature in English",
      title: "Dramatic Elements & Terminology",
      formula: "• Protagonist: Main character around whom plot revolves\n• Antagonist: Main opposing force or adversary to protagonist\n• Tragic Flaw (Hamartia): Fatal character flaw causing hero's downfall\n• Catharsis: Purgation of emotions (pity and fear) experienced by audience\n• Dramatic Irony: Audience knows vital plot secrets unknown to characters\n• Soliloquy: Character speaks thoughts aloud while alone on stage\n• Aside: Brief remark addressed directly to audience, unheard by other characters on stage",
      explanation: "Aristotle's Poetics established the classical requirements of dramatic tragedy.",
      tip: "A soliloquy reveals internal psychological motivation; an aside provides quick witty commentary."
    },
    {
      category: "Literature in English",
      title: "Poetic Forms and Metric Structures",
      formula: "• Sonnet: 14-line lyric poem in iambic pentameter\n  - Petrarchan (Italian): Octave (8 lines, abbaabba) + Sestet (6 lines, cdecde)\n  - Shakespearean (English): 3 Quatrains (4 lines each) + 1 Heroic Couplet (abab cdcd efef gg)\n• Elegy: Mournful poem lamenting the death of an individual\n• Ode: Dignified lyric poem celebrating a noble subject\n• Ballad: Narrative poem composed in short stanzas suitable for singing\n• Free Verse: Poetry without fixed meter, rhyme, or rhythm",
      explanation: "In a Shakespearean sonnet, the final rhyming couplet (gg) delivers the central thematic resolution or twist (volta).",
      tip: "Blank verse is unrhymed iambic pentameter (da-DUM da-DUM da-DUM da-DUM da-DUM), the dominant medium of Shakespearean plays."
    },
    {
      category: "Literature in English",
      title: "Prose Narrative Points of View",
      formula: "• First Person ('I', 'we'): Narrator is an active participant; subjective, intimate perspective\n• Third Person Omniscient ('he', 'she', 'they'): All-knowing narrator who sees into the thoughts, feelings, and motives of all characters\n• Third Person Limited: Narrator tells story through the thoughts and eyes of a single chosen character\n• Stream of Consciousness: Unbroken, continuous flow of character's inner thoughts and sensory impressions",
      explanation: "Unreliable narrator: a first-person narrator whose credibility is compromised (e.g. by bias, youth, or mental instability).",
      tip: "Omniscient narrators can move freely across time and space."
    },
    {
      category: "Literature in English",
      title: "Figures of Sound in Poetry",
      formula: "• Alliteration: Repetition of initial consonant sounds in neighboring words ('Peter Piper picked a peck of pickled peppers')\n• Assonance: Repetition of identical vowel sounds within words ('The crumbling thunder of seas')\n• Consonance: Repetition of consonant sounds within or at ends of words ('stroke of luck')\n• Onomatopoeia: Words that imitate the natural sound of the object/action ('buzz', 'hiss', 'clang', 'splash')",
      explanation: "Sound devices create rhythm, musicality, and mood in poetic texts.",
      tip: "Rhyme scheme is mapped using lowercase letters (e.g. abab, aabb)."
    },
    {
      category: "Political Science",
      title: "Local Government Reforms in Nigeria (1976)",
      formula: "1976 Local Government Reform (Murtala/Obasanjo regime):\n• Recognized Local Government as the THIRD TIER of government\n• Introduced uniform single-tier system nationwide (multi-purpose councils)\n• Population benchmark: 150,000 to 800,000 residents per council\n• Statutory federal revenue allocation directly to local governments",
      explanation: "Abolished traditional rulers as chief executives of councils, relegating them to advisory Traditional Councils.",
      tip: "There are currently exactly 774 constitutionally recognized Local Government Areas in Nigeria."
    },
    {
      category: "Nigerian Politics",
      title: "Revenue Allocation Principles in Nigeria",
      formula: "Historical Commissions: Phillipson (1946), Hicks-Phillipson (1951), Raisman (1958), Aboyade (1977), Okigbo (1980)\nKey Criteria: Population, Equality of States, Internal Revenue Effort, Landmass & Terrain, Derivation (13% minimum derivation for oil-producing states in 1999 Constitution)",
      explanation: "Revenue Mobilisation Allocation and Fiscal Commission (RMAFC) is the statutory body responsible for monitoring and reviewing revenue sharing formulas.",
      tip: "Federation Account revenue is shared among Federal, State, and Local governments."
    },
    {
      category: "Political Science",
      title: "Delegated (Subordinate) Legislation",
      formula: "Laws made by non-parliamentary bodies under authority granted by an enabling Act of Parliament\nTypes: Orders-in-Council, Statutory Instruments (Ministerial regulations), Bye-laws (Local councils)\nControls: Judicial review (ultra vires doctrine), Parliamentary scrutiny, Public scrutiny, Ombudsperson",
      explanation: "Substantive Ultra Vires: body made a regulation beyond the subject matter permitted. Procedural Ultra Vires: body failed to follow specified enactment procedure.",
      tip: "Delegated legislation saves parliamentary time, handles emergencies, and provides technical expertise."
    },
    {
      category: "Political Science",
      title: "Ombudsperson (Public Complaints Commission)",
      formula: "Established in Nigeria: 1975 (Public Complaints Commission - PCC)\nRole: Independent watchdog that investigates citizen complaints against administrative injustice, abuse of office, bureaucratic red tape, and official victimization by government agencies",
      explanation: "Originated in Sweden (1809). The Ombudsperson has powers of investigation and recommendation, but lacks direct judicial power to prosecute or overturn court judgments.",
      tip: "Services of the Public Complaints Commission are free of charge to any aggrieved citizen."
    },
    {
      category: "Political Science",
      title: "Political Ideologies (Capitalism, Socialism, Communism, Fascism)",
      formula: "• Capitalism (Free Market): Private ownership of means of production, profit motive, price mechanism, minimal government interference (laissez-faire)\n• Socialism: State ownership of core major industries, redistribution of wealth, social welfare for all citizens\n• Communism (Karl Marx): Classless, stateless society; complete abolition of private property ('From each according to his ability, to each according to his needs')\n• Fascism: Dictatorial power, state supremacy above the individual, militarism, suppression of opposition",
      explanation: "Adam Smith's 'Wealth of Nations' (1776) laid foundation for classical capitalism.",
      tip: "Democratic socialism combines democratic political elections with public control of key economic sectors."
    },
    {
      category: "Nigerian Politics",
      title: "Census Controversies and History in Nigeria",
      formula: "National Population Censuses: 1952/53, 1962 (canceled), 1963, 1973 (canceled), 1991 (88.9 million), 2006 (140.4 million)\nAgency: National Population Commission (NPC)",
      explanation: "Census figures in Nigeria have been historically contentious because population size directly determines: 1. Legislative seat distribution, and 2. Revenue allocation from the Federation Account.",
      tip: "The 1962 census was nullified and rerun in 1963; the 1973 census conducted under Gen. Gowon was discarded due to widespread allegations of inflation."
    },
    {
      category: "Political Science",
      title: "Public Opinion: Measurement and Influences",
      formula: "Definition: The collective aggregate attitudes, views, and beliefs held by a significant portion of the adult population on public matters\nMeasurement: Opinion polls (Gallup, sampling), Referendums/Plebiscite, Letters to editors, Mass media, Elections",
      explanation: "Shaped by: Family, educational institutions, religious bodies, mass media, peer groups, and political parties.",
      tip: "A referendum is a direct vote by the entire electorate on a specific policy proposal or constitutional amendment."
    },
    {
      category: "Literature in English",
      title: "Literary Movements and Periods",
      formula: "• Renaissance (16th-17th c.): Humanism, rebirth of classical learning (Shakespeare, Marlowe)\n• Romanticism (late 18th-mid 19th c.): Emotion, sublime nature, individualism (Wordsworth, Keats, Shelley)\n• Victorian (19th c.): Industrialization, morality, realism (Dickens, Hardy)\n• Modernism (early-mid 20th c.): Alienation, fragmentation, disillusionment following World Wars (T.S. Eliot, Virginia Woolf)\n• Post-Colonial Literature: Decolonization, identity, cultural clash (Chinua Achebe, Wole Soyinka, Ngũgĩ wa Thiong'o)",
      explanation: "Wole Soyinka became the first African to win the Nobel Prize in Literature in 1986.",
      tip: "Chinua Achebe's 'Things Fall Apart' (1958) is considered the foundational masterpiece of modern African literature."
    },
    {
      category: "Political Science",
      title: "Judicial Independence Guarantees",
      formula: "Key safeguards:\n1. Security of tenure (judges cannot be arbitrarily dismissed before retirement age, except by two-thirds legislative address)\n2. Remuneration charged on Consolidated Revenue Fund (cannot be reduced during tenure)\n3. Appointment through independent National Judicial Council (NJC)\n4. Judicial immunity for official pronouncements",
      explanation: "Judicial independence is the bedrock of democracy, ensuring judges adjudicate without fear or favor.",
      tip: "In Nigeria, superior court judges retire at age 65 (High Courts) or age 70 (Court of Appeal and Supreme Court)."
    },
    {
      category: "Nigerian Politics",
      title: "Major Electoral Crises in Nigerian History",
      formula: "• 1964 Federal Election: Widespread boycott by UPGA (United Progressive Grand Alliance); constitutional deadlock between Azikiwe and Balewa\n• 1965 Western Regional Election: Widespread rigging and violence ('Operation Wetie'), causing collapse of the First Republic\n• June 12, 1993 Presidential Election: Widely recognized as Nigeria's freest and fairest election, won by MKO Abiola (SDP), annulled by Gen. Ibrahim Babangida",
      explanation: "The annulment of June 12 plunged Nigeria into a prolonged national crisis, culminating in Gen. Sani Abacha's regime.",
      tip: "June 12 is now officially celebrated as Nigeria's national Democracy Day."
    },
    {
      category: "Literature in English",
      title: "African Oral Literature (Orature) Forms",
      formula: "• Folktales (Trickster tales: Tortoise in West Africa, Anansi in Ghana, Hare in East Africa)\n• Proverbs: Condensed cultural wisdom ('Proverbs are the palm oil with which words are eaten')\n• Riddles: Witty questions testing intellectual sharpness\n• Praise Poetry (Oriki in Yoruba, Izibongo in Zulu): Eulogies of heroes, lineages, and deities\n• Myths and Legends: Sacred narratives explaining origins of the universe and heroic ancestors",
      explanation: "Oral literature relies on performance, spoken word, audience participation, and mnemonic repetition.",
      tip: "A myth involves gods and origins; a legend involves historical or semi-historical human heroes."
    },
    {
      category: "Political Science",
      title: "Types of Constitutions",
      formula: "• Written: Documented in a single formal text (Nigeria, USA)\n• Unwritten: Derived from statutes, conventions, judicial precedents, and historic charters (UK, New Zealand, Israel)\n• Rigid: Difficult amendment procedure requiring special supermajority (e.g. ⅔ of National Assembly + ⅔ of State Houses of Assembly in Nigeria)\n• Flexible: Amended through simple legislative majority like ordinary statutes (UK)",
      explanation: "A constitution establishes the fundamental principles and framework according to which a state is governed.",
      tip: "Written constitutions are almost always rigid; unwritten constitutions are flexible."
    },
    {
      category: "Nigerian Politics",
      title: "State Creation Milestones in Nigeria",
      formula: "• 1960: 3 Regions (Northern, Western, Eastern)\n• 1963: 4 Regions (+ Mid-Western Region)\n• 1967: 12 States (Gen. Yakubu Gowon)\n• 1976: 19 States (Gen. Murtala Muhammed)\n• 1987: 21 States (Gen. Ibrahim Babangida: Katsina & Akwa Ibom)\n• 1991: 30 States (Gen. Ibrahim Babangida)\n• 1996: 36 States (Gen. Sani Abacha: Ebonyi, Bayelsa, Nasarawa, Gombe, Ekiti, Zamfara)",
      explanation: "State creation was historically deployed to satisfy minority ethnic agitation and balance geopolitical representation.",
      tip: "The Federal Capital Territory (FCT) Abuja was created in 1976 by the Murtala Muhammed regime."
    },
    {
      category: "Literature in English",
      title: "Conflict and Plot Structure (Freytag's Pyramid)",
      formula: "1. Exposition (Introduction of setting, characters, background)\n2. Inciting Incident (Initial trigger that sets plot in motion)\n3. Rising Action (Escalating complications and tension)\n4. Climax (Turning point of maximum dramatic intensity)\n5. Falling Action (Events unfolding following climax)\n6. Resolution / Dénouement (Untying of plot knots and final outcome)",
      explanation: "Internal conflict (Character vs Self) vs External conflict (Character vs Character, Nature, or Society).",
      tip: "Dénouement (French for 'untying') is the final revelation or catastrophe concluding the drama."
    }
  ]
};
