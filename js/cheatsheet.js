/**
 * Formula Cheatsheet & High-Yield Revision Hub
 * Comprehensive rapid revision cards for Mathematics, Physics, Chemistry,
 * Biology, Economics, Commercial & Accounts, Use of English, and Government/Arts.
 * 
 * 100+ formulas per subject for complete JAMB UTME & WAEC WASSCE coverage.
 */

export const CHEATSHEET_DATA = {
  Mathematics: [
    // ─── ALGEBRA ──────────────────────────────────────────────
    {
      category: "Algebra",
      title: "Quadratic Formula & Nature of Roots",
      formula: "x = [-b ± √(b² - 4ac)] / 2a\nSum of roots: α + β = -b/a\nProduct of roots: αβ = c/a",
      explanation: "For ax² + bx + c = 0:\n• Discriminant Δ = b² - 4ac\n• Δ > 0: Two distinct real roots\n• Δ = 0: Two equal real roots\n• Δ < 0: Complex/imaginary roots\n• Equation from roots: x² - (α+β)x + αβ = 0",
      tip: "If one root is the reciprocal of the other, then c = a."
    },
    {
      category: "Algebra",
      title: "Completing the Square",
      formula: "ax² + bx + c = a(x + b/2a)² - (b² - 4ac)/4a\nVertex: (-b/2a, -(b²-4ac)/4a)",
      explanation: "Steps:\n1. Factor out 'a' from first two terms\n2. Add and subtract (b/2a)²\n3. Group perfect square trinomial\n• Minimum value of ax²+bx+c (a>0) = c - b²/4a\n• Maximum value (a<0) = c - b²/4a",
      tip: "The vertex of y = ax²+bx+c is always at x = -b/2a."
    },
    {
      category: "Algebra",
      title: "Logarithm Laws & Base Change",
      formula: "log_b(xy) = log_b x + log_b y\nlog_b(x/y) = log_b x - log_b y\nlog_b(x^k) = k · log_b x\nChange of Base: log_b a = (log_c a)/(log_c b)",
      explanation: "Special identities:\n• log_a a = 1\n• log_a 1 = 0\n• a^(log_a x) = x\n• log_b(1/x) = -log_b x\n• log₁₀ 10 = 1; log₁₀ 100 = 2; log₁₀ 1000 = 3",
      tip: "Never distribute log over addition: log(x+y) ≠ log x + log y!"
    },
    {
      category: "Algebra",
      title: "Indices & Surds Rationalization",
      formula: "a^m · a^n = a^(m+n); a^m / a^n = a^(m-n)\n(a^m)^n = a^(mn); a^(-n) = 1/a^n\na^(1/n) = ⁿ√a; a^(m/n) = ⁿ√(a^m)\nRationalizing: 1/(√a+√b) × (√a-√b)/(√a-√b)",
      explanation: "Surd Rules:\n• √(ab) = √a · √b\n• √(a/b) = √a / √b\n• Conjugate of (a+√b) is (a-√b)\n• (√a+√b)(√a-√b) = a - b",
      tip: "To rationalize a binomial denominator, multiply numerator and denominator by its conjugate."
    },
    {
      category: "Algebra",
      title: "Partial Fractions",
      formula: "Linear factors: A/(x-a) + B/(x-b)\nRepeated: A/(x-a) + B/(x-a)²\nIrreducible quadratic: (Ax+B)/(x²+bx+c)",
      explanation: "Steps:\n1. Factor denominator completely\n2. Set up partial fraction form\n3. Multiply both sides by LCD\n4. Solve for constants using substitution or comparison",
      tip: "Always verify the degree of numerator < degree of denominator. If not, perform polynomial long division first."
    },
    {
      category: "Algebra",
      title: "Polynomial Remainder & Factor Theorems",
      formula: "Factor Theorem: (x-a) is a factor of f(x) iff f(a) = 0\nRemainder Theorem: f(x) ÷ (x-a) gives remainder f(a)",
      explanation: "• To find factors of f(x), test f(±1), f(±2), f(±3)...\n• If f(a) = 0, then (x-a) is a factor\n• Synthetic division provides quotient and remainder efficiently\n• For cubic ax³+bx²+cx+d: sum of roots = -b/a, sum of products in pairs = c/a, product of roots = -d/a",
      tip: "When testing possible rational roots, try factors of the constant term divided by factors of the leading coefficient."
    },
    {
      category: "Algebra",
      title: "Simultaneous Equations (Linear & Quadratic)",
      formula: "Linear: a₁x + b₁y = c₁; a₂x + b₂y = c₂\nSolve by Elimination, Substitution, or Cramer's Rule\nCramer: x = |c₁ b₁; c₂ b₂| / |a₁ b₁; a₂ b₂|",
      explanation: "For one linear + one quadratic:\n1. Express one variable from linear equation\n2. Substitute into quadratic\n3. Solve resulting quadratic\n4. Back-substitute for other variable",
      tip: "In Cramer's Rule, if the determinant D = 0, the system either has no solution or infinitely many solutions."
    },
    {
      category: "Algebra",
      title: "Inequalities & Absolute Values",
      formula: "|x| < a ⟹ -a < x < a\n|x| > a ⟹ x < -a or x > a\nQuadratic inequality: factor, find critical points, test intervals",
      explanation: "Rules:\n• If both sides > 0, you can square an inequality\n• Multiplying/dividing by a negative number REVERSES the inequality sign\n• For (x-a)(x-b) > 0: x < a or x > b (when a < b)\n• For (x-a)(x-b) < 0: a < x < b",
      tip: "When solving |2x-3| ≤ 5, write -5 ≤ 2x-3 ≤ 5, then solve: -1 ≤ x ≤ 4."
    },
    {
      category: "Algebra",
      title: "Binomial Theorem & Expansion",
      formula: "(a+b)^n = Σ(k=0 to n) ⁿCₖ · a^(n-k) · b^k\nGeneral term: T_(r+1) = ⁿCᵣ · a^(n-r) · b^r\n(1+x)^n ≈ 1 + nx + n(n-1)x²/2! + ... (|x|<1)",
      explanation: "Properties:\n• Number of terms = n + 1\n• Sum of binomial coefficients = 2ⁿ\n• Middle term when n is even: T_(n/2 + 1)\n• Two middle terms when n is odd: T_(n+1)/2 and T_(n+3)/2\n• Pascal's Triangle: each number = sum of two numbers above it",
      tip: "To find the coefficient of x³ in (2+3x)⁵: Use T₄ = ⁵C₃ · 2² · (3x)³ = 10 · 4 · 27x³ = 1080x³."
    },
    {
      category: "Algebra",
      title: "Sets, Venn Diagrams & Set Operations",
      formula: "n(A∪B) = n(A) + n(B) - n(A∩B)\nn(A∪B∪C) = n(A)+n(B)+n(C)-n(A∩B)-n(A∩C)-n(B∩C)+n(A∩B∩C)\nn(A') = n(U) - n(A)",
      explanation: "Set Laws:\n• De Morgan's: (A∪B)' = A'∩B'; (A∩B)' = A'∪B'\n• Distributive: A∩(B∪C) = (A∩B)∪(A∩C)\n• A\\B = A∩B' (set difference)\n• A⊂B means A is a subset of B",
      tip: "In a Venn diagram problem, always start filling from the innermost intersection outward."
    },
    {
      category: "Algebra",
      title: "Matrices & Determinants (2×2)",
      formula: "A = |a b; c d|\ndet(A) = ad - bc\nA⁻¹ = (1/det A) × |d -b; -c a|\nMatrix multiplication: (AB)ᵢⱼ = Σ Aᵢₖ · Bₖⱼ",
      explanation: "Properties:\n• A matrix has an inverse only if det(A) ≠ 0 (non-singular)\n• (AB)⁻¹ = B⁻¹A⁻¹\n• Identity matrix I: AI = IA = A\n• To solve AX = B: X = A⁻¹B",
      tip: "A singular matrix (det = 0) has no inverse and the system has either no solution or infinitely many."
    },
    {
      category: "Algebra",
      title: "Binary Operations & Modular Arithmetic",
      formula: "Closure: a*b ∈ S for all a,b ∈ S\nAssociativity: (a*b)*c = a*(b*c)\nIdentity: a*e = e*a = a\nInverse: a*a⁻¹ = a⁻¹*a = e",
      explanation: "Modular Arithmetic:\n• a ≡ b (mod n) means n divides (a-b)\n• Addition mod n: (a+b) mod n\n• Multiplication mod n: (a·b) mod n\n• Base conversion: Divide repeatedly by new base, read remainders upward",
      tip: "In base 2 (binary): 13₁₀ = 1101₂. To convert: 13÷2=6r1, 6÷2=3r0, 3÷2=1r1, 1÷2=0r1 → read upward."
    },
    {
      category: "Algebra",
      title: "Number Bases & Conversion",
      formula: "Base 10 to Base n: Divide repeatedly by n\nBase n to Base 10: Multiply each digit by n^(position)\nBase a to Base b: Convert a→10→b",
      explanation: "Examples:\n• 101101₂ = 1·2⁵+0·2⁴+1·2³+1·2²+0·2¹+1·2⁰ = 32+8+4+1 = 45₁₀\n• 25₁₀ to base 8: 25÷8=3r1, 3÷8=0r3 → 31₈\n• Addition in base: carry when sum ≥ base",
      tip: "When adding in base 2: 1+1 = 10₂ (carry 1). When adding in base 5: 3+4 = 12₅ (carry 1)."
    },

    // ─── COORDINATE GEOMETRY ──────────────────────────────────
    {
      category: "Coordinate Geometry",
      title: "Distance, Midpoint, Slope & Lines",
      formula: "Distance: d = √[(x₂-x₁)²+(y₂-y₁)²]\nMidpoint: M = ((x₁+x₂)/2, (y₁+y₂)/2)\nSlope: m = (y₂-y₁)/(x₂-x₁)\nLine: y-y₁ = m(x-x₁) or y = mx+c",
      explanation: "Parallel & Perpendicular:\n• Parallel: m₁ = m₂\n• Perpendicular: m₁·m₂ = -1\n• Angle between lines: tan θ = |(m₁-m₂)/(1+m₁m₂)|",
      tip: "The perpendicular to 3x-4y+7=0 has slope -4/3."
    },
    {
      category: "Coordinate Geometry",
      title: "Equation of a Circle",
      formula: "Standard: (x-a)²+(y-b)² = r²\nGeneral: x²+y²+2gx+2fy+c = 0\nCenter: (-g,-f); Radius: r = √(g²+f²-c)",
      explanation: "• The circle passes through a point if the point satisfies the equation\n• Length of tangent from external point (x₁,y₁): L = √(x₁²+y₁²+2gx₁+2fy₁+c)\n• Tangent at point (x₁,y₁): xx₁+yy₁+g(x+x₁)+f(y+y₁)+c = 0",
      tip: "If g²+f²-c < 0, the equation represents no real circle (imaginary circle)."
    },
    {
      category: "Coordinate Geometry",
      title: "Division of Line Segment & Collinearity",
      formula: "Internal Division (m:n):\nx = (mx₂+nx₁)/(m+n), y = (my₂+ny₁)/(m+n)\nExternal Division (m:n):\nx = (mx₂-nx₁)/(m-n), y = (my₂-ny₁)/(m-n)",
      explanation: "Collinearity Test:\n• Three points A, B, C are collinear if:\n  Area of triangle = ½|x₁(y₂-y₃)+x₂(y₃-y₁)+x₃(y₁-y₂)| = 0\n• Or if slope AB = slope BC",
      tip: "The centroid of a triangle with vertices (x₁,y₁), (x₂,y₂), (x₃,y₃) is ((x₁+x₂+x₃)/3, (y₁+y₂+y₃)/3)."
    },
    {
      category: "Coordinate Geometry",
      title: "Perpendicular Distance & Area",
      formula: "Distance from point (x₁,y₁) to line ax+by+c=0:\nd = |ax₁+by₁+c| / √(a²+b²)\nTriangle Area = ½|x₁(y₂-y₃)+x₂(y₃-y₁)+x₃(y₁-y₂)|",
      explanation: "• Distance between two parallel lines ax+by+c₁=0 and ax+by+c₂=0:\n  d = |c₁-c₂| / √(a²+b²)\n• Equation of line through intersection of two lines: L₁+kL₂=0",
      tip: "Always write the line equation in the form ax+by+c=0 before computing perpendicular distance."
    },

    // ─── CALCULUS ─────────────────────────────────────────────
    {
      category: "Calculus",
      title: "Differentiation Rules",
      formula: "Power: d/dx(xⁿ) = nxⁿ⁻¹\nProduct: d/dx(uv) = u(dv/dx)+v(du/dx)\nQuotient: d/dx(u/v) = [v(du/dx)-u(dv/dx)]/v²\nChain: dy/dx = (dy/du)·(du/dx)",
      explanation: "Trig Derivatives:\n• d/dx(sin x) = cos x\n• d/dx(cos x) = -sin x\n• d/dx(tan x) = sec²x\n• d/dx(eˣ) = eˣ\n• d/dx(ln x) = 1/x\n• Stationary points: dy/dx = 0",
      tip: "At max: d²y/dx² < 0. At min: d²y/dx² > 0. Point of inflexion: d²y/dx² = 0."
    },
    {
      category: "Calculus",
      title: "Standard Integrals & Definite Integrals",
      formula: "∫xⁿ dx = x^(n+1)/(n+1) + C (n≠-1)\n∫(1/x) dx = ln|x| + C\n∫sin x dx = -cos x + C\n∫cos x dx = sin x + C\n∫eˣ dx = eˣ + C",
      explanation: "• Area under curve from a to b: ∫[a,b] y dx\n• Area between curves: ∫[a,b] |f(x)-g(x)| dx\n• Volume of revolution (x-axis): V = π∫[a,b] y² dx\n• Volume of revolution (y-axis): V = π∫[a,b] x² dy",
      tip: "Always add +C for indefinite integrals. For definite integrals, substitute limits: F(b)-F(a)."
    },
    {
      category: "Calculus",
      title: "Maxima, Minima & Rate of Change",
      formula: "Velocity: v = ds/dt\nAcceleration: a = dv/dt = d²s/dt²\nRate of change of area: dA/dt = (dA/dr)·(dr/dt)",
      explanation: "Applications:\n• Maximum/minimum problems: Set dy/dx = 0, solve, test with d²y/dx²\n• Increasing function: dy/dx > 0\n• Decreasing function: dy/dx < 0\n• Gradient of tangent at point = value of dy/dx at that point\n• Normal has slope = -1/(dy/dx)",
      tip: "If a particle has velocity v = 3t² - 12t + 9, it is at rest when v = 0: 3t² - 12t + 9 = 0."
    },
    {
      category: "Calculus",
      title: "Integration by Substitution & Parts",
      formula: "Substitution: ∫f(g(x))·g'(x)dx = ∫f(u)du\nParts: ∫u dv = uv - ∫v du\nLIATE rule for choosing u: Log, Inverse trig, Algebraic, Trig, Exponential",
      explanation: "Common substitutions:\n• For √(a²-x²): let x = a sin θ\n• For √(a²+x²): let x = a tan θ\n• For ∫(ax+b)ⁿ dx: let u = ax+b",
      tip: "In integration by parts, choose u as the function that simplifies when differentiated (use LIATE priority)."
    },

    // ─── SERIES & SEQUENCES ──────────────────────────────────
    {
      category: "Series & Sequences",
      title: "AP & GP Formulas",
      formula: "AP: Tₙ = a+(n-1)d; Sₙ = (n/2)[2a+(n-1)d]\nGP: Tₙ = arⁿ⁻¹; Sₙ = a(1-rⁿ)/(1-r)\nS∞ = a/(1-r) for |r| < 1",
      explanation: "• Arithmetic Mean of a,b = (a+b)/2\n• Geometric Mean of a,b = √(ab)\n• Common difference: d = T₂-T₁\n• Common ratio: r = T₂/T₁",
      tip: "Sum to infinity only exists when |r| < 1."
    },
    {
      category: "Series & Sequences",
      title: "Arithmetic & Geometric Means",
      formula: "AM of a,b = (a+b)/2\nGM of a,b = √(ab)\nHM of a,b = 2ab/(a+b)\nAM ≥ GM ≥ HM (for positive numbers)",
      explanation: "Inserting means:\n• k arithmetic means between a and b: d = (b-a)/(k+1)\n• k geometric means between a and b: r = (b/a)^(1/(k+1))\n• Sum of first n natural numbers: n(n+1)/2\n• Sum of squares: n(n+1)(2n+1)/6",
      tip: "The AM-GM inequality states that for positive numbers, the arithmetic mean is always ≥ the geometric mean."
    },

    // ─── TRIGONOMETRY ─────────────────────────────────────────
    {
      category: "Trigonometry",
      title: "Identities, Sine & Cosine Rules",
      formula: "sin²θ+cos²θ = 1; 1+tan²θ = sec²θ\nSine Rule: a/sinA = b/sinB = c/sinC = 2R\nCosine Rule: a² = b²+c²-2bc·cosA\nArea = ½ab·sinC",
      explanation: "Double Angles:\n• sin2θ = 2sinθ cosθ\n• cos2θ = cos²θ-sin²θ = 2cos²θ-1 = 1-2sin²θ\n• tan2θ = 2tanθ/(1-tan²θ)",
      tip: "Use Cosine Rule for SSS or SAS; use Sine Rule for AAS or ASA."
    },
    {
      category: "Trigonometry",
      title: "Compound Angle Formulas",
      formula: "sin(A±B) = sinA cosB ± cosA sinB\ncos(A±B) = cosA cosB ∓ sinA sinB\ntan(A±B) = (tanA ± tanB)/(1 ∓ tanA tanB)",
      explanation: "Half-Angle Formulas:\n• sin(A/2) = ±√[(1-cosA)/2]\n• cos(A/2) = ±√[(1+cosA)/2]\n• tan(A/2) = sinA/(1+cosA) = (1-cosA)/sinA",
      tip: "sin75° = sin(45°+30°) = sin45°cos30° + cos45°sin30° = (√6+√2)/4."
    },
    {
      category: "Trigonometry",
      title: "Exact Trig Values (Special Angles)",
      formula: "sin0°=0, sin30°=½, sin45°=√2/2, sin60°=√3/2, sin90°=1\ncos0°=1, cos30°=√3/2, cos45°=√2/2, cos60°=½, cos90°=0\ntan0°=0, tan30°=√3/3, tan45°=1, tan60°=√3, tan90°=∞",
      explanation: "CAST rule for signs in quadrants:\n• All positive in Q1 (0°-90°)\n• Sin positive in Q2 (90°-180°)\n• Tan positive in Q3 (180°-270°)\n• Cos positive in Q4 (270°-360°)",
      tip: "Remember 'All Students Take Calculus' for which trig functions are positive in each quadrant."
    },
    {
      category: "Trigonometry",
      title: "Inverse Trig & Trigonometric Equations",
      formula: "sin⁻¹(sinθ) = θ for -90°≤θ≤90°\ncos⁻¹(cosθ) = θ for 0°≤θ≤180°\ntan⁻¹(tanθ) = θ for -90°<θ<90°",
      explanation: "General Solutions:\n• sinθ = sinα ⟹ θ = nπ+(-1)ⁿα\n• cosθ = cosα ⟹ θ = 2nπ±α\n• tanθ = tanα ⟹ θ = nπ+α\n• For sinθ = k: solutions in [0°,360°] are θ and (180°-θ)",
      tip: "For 2sinx - 1 = 0 in [0°,360°]: sinx = ½, so x = 30° or x = 150°."
    },
    {
      category: "Trigonometry",
      title: "Bearings & Angles of Elevation/Depression",
      formula: "Bearing = Angle measured clockwise from North (000° to 360°)\nAngle of Elevation: tan θ = opposite/adjacent = height/distance\nAngle of Depression = Angle of Elevation (alternate angles)",
      explanation: "• Back bearing = Forward bearing ± 180°\n• In bearing problems, always draw North line at each point\n• For two observers: use simultaneous trig equations\n• Height of tower: h = d·tanθ",
      tip: "If a bearing is 045°, the back bearing is 045°+180° = 225°."
    },

    // ─── STATISTICS ───────────────────────────────────────────
    {
      category: "Statistics",
      title: "Measures of Central Tendency",
      formula: "Mean: x̄ = Σfx/Σf\nMedian: L + [(N/2 - F)/f]·h\nMode: L + [(f₁-f₀)/(2f₁-f₀-f₂)]·h",
      explanation: "• Mean is affected by extreme values\n• Median is the middle value (resistant to outliers)\n• Mode is the most frequent value\n• For grouped data: use interpolation formulas\n• Weighted Mean = Σ(wᵢxᵢ)/Σwᵢ",
      tip: "For an odd number of observations, median is the middle value. For even: average of the two middle values."
    },
    {
      category: "Statistics",
      title: "Measures of Dispersion",
      formula: "Variance: σ² = (Σfx²/Σf) - x̄²\nStd Dev: σ = √Variance\nRange = Max - Min\nIQR = Q₃ - Q₁\nCoefficient of Variation = (σ/x̄)·100%",
      explanation: "• Q₁ = (N+1)/4 th value\n• Q₂ = (N+1)/2 th value (median)\n• Q₃ = 3(N+1)/4 th value\n• Semi-IQR = (Q₃-Q₁)/2\n• Mean Deviation = Σf|x-x̄|/Σf",
      tip: "Adding a constant to every score changes the mean but NOT variance or standard deviation."
    },
    {
      category: "Statistics",
      title: "Cumulative Frequency & Percentiles",
      formula: "Percentile Pₖ = L + [(kN/100 - F)/f]·h\nDecile Dₖ = L + [(kN/10 - F)/f]·h\nQuartile Qₖ = L + [(kN/4 - F)/f]·h",
      explanation: "• Draw ogive (cumulative frequency curve) to estimate median, quartiles, percentiles\n• Median = P₅₀ = Q₂ = D₅\n• For box plots: Min, Q₁, Q₂ (median), Q₃, Max\n• Outlier: value < Q₁-1.5·IQR or > Q₃+1.5·IQR",
      tip: "To estimate the 70th percentile from an ogive, read across from 0.7N on the y-axis to the curve, then down to the x-axis."
    },

    // ─── PROBABILITY ──────────────────────────────────────────
    {
      category: "Probability",
      title: "Permutations, Combinations & Probability",
      formula: "ⁿPᵣ = n!/(n-r)!\nⁿCᵣ = n!/[r!(n-r)!]\nP(A∪B) = P(A)+P(B)-P(A∩B)\nIndependent: P(A∩B) = P(A)·P(B)",
      explanation: "• Mutually Exclusive: P(A∩B)=0 → P(A∪B)=P(A)+P(B)\n• Conditional: P(A|B) = P(A∩B)/P(B)\n• Complement: P(A') = 1-P(A)\n• 0! = 1 by definition",
      tip: "Permutation when ORDER matters (electing President, VP). Combination when order doesn't matter (selecting a committee)."
    },
    {
      category: "Probability",
      title: "Probability Distributions & Expected Value",
      formula: "Expected Value: E(X) = Σxᵢ·P(xᵢ)\nVariance: Var(X) = E(X²) - [E(X)]²\nBinomial: P(X=r) = ⁿCᵣ · pʳ · qⁿ⁻ʳ (q=1-p)",
      explanation: "Binomial distribution properties:\n• Mean = np\n• Variance = npq\n• Standard deviation = √(npq)\n• Used when: fixed n trials, two outcomes, constant probability p",
      tip: "For a fair coin tossed 10 times, P(exactly 3 heads) = ¹⁰C₃(½)³(½)⁷ = 120/1024."
    },
    {
      category: "Probability",
      title: "Tree Diagrams & Conditional Probability",
      formula: "P(A then B) = P(A)·P(B|A)\nBayes' Theorem: P(A|B) = P(B|A)·P(A)/P(B)\nP(at least 1) = 1 - P(none)",
      explanation: "Without replacement changes probabilities:\n• Drawing 2 red from 5 red + 3 blue (without replacement):\n  P = (5/8)·(4/7) = 20/56 = 5/14\n• With replacement: P = (5/8)·(5/8) = 25/64",
      tip: "P(at least one six in 3 dice throws) = 1 - P(no six)³ = 1 - (5/6)³ = 91/216."
    },

    // ─── MENSURATION ──────────────────────────────────────────
    {
      category: "Mensuration",
      title: "2D & 3D Geometric Mensuration",
      formula: "Circle: A=πr², C=2πr\nSector: Arc=(θ/360)·2πr; Area=(θ/360)·πr²\nCylinder: V=πr²h; CSA=2πrh\nCone: V=⅓πr²h; CSA=πrl (l=√(r²+h²))\nSphere: V=⁴⁄₃πr³; SA=4πr²",
      explanation: "• TSA of closed cylinder = 2πrh+2πr² = 2πr(h+r)\n• TSA of cone = πrl+πr² = πr(l+r)\n• Frustum Volume = ⅓πH(R²+r²+Rr)\n• Hemisphere: V=⅔πr³; TSA=3πr²",
      tip: "Watch out for OPEN vs CLOSED containers — open at one end omits one πr² from TSA."
    },
    {
      category: "Mensuration",
      title: "Areas of Plane Figures",
      formula: "Triangle: A=½bh = ½ab·sinC = √[s(s-a)(s-b)(s-c)] (Heron's)\nParallelogram: A=bh; Rhombus: A=½d₁d₂\nTrapezium: A=½(a+b)h\nRegular Polygon: A=½nR²·sin(360°/n)",
      explanation: "Where s = (a+b+c)/2 (semi-perimeter)\n• Equilateral triangle: A=(√3/4)a²; h=(√3/2)a\n• Interior angle of regular n-gon: (n-2)·180°/n\n• Exterior angle = 360°/n\n• Sum of interior angles = (n-2)·180°",
      tip: "Heron's formula is useful when only the three sides of a triangle are known."
    },

    // ─── COMMERCIAL ARITHMETIC ────────────────────────────────
    {
      category: "Commercial Arithmetic",
      title: "Simple & Compound Interest",
      formula: "SI: I = PRT/100\nCI: A = P(1+r/100)ⁿ; CI = A-P\nDepreciation: V = P(1-r/100)ⁿ",
      explanation: "• P = Principal; R/r = Rate (%); T/n = Time\n• A = Total amount at maturity\n• If compounded semi-annually: r→r/2, n→2n\n• If compounded quarterly: r→r/4, n→4n",
      tip: "If compounded semi-annually, divide rate by 2 and multiply time by 2!"
    },
    {
      category: "Commercial Arithmetic",
      title: "Profit, Loss, Discount & Tax",
      formula: "Profit = SP - CP; Loss = CP - SP\n%Profit = (Profit/CP)·100%\nDiscount = Marked Price - Selling Price\n%Discount = (Discount/MP)·100%\nVAT Amount = Rate% × Price",
      explanation: "• SP = CP(1 + %Profit/100)\n• SP = CP(1 - %Loss/100)\n• SP after discount: SP = MP(1 - d/100)\n• Successive discounts: Final SP = MP(1-d₁/100)(1-d₂/100)",
      tip: "Two successive discounts of 10% and 20% are NOT the same as a single 30% discount."
    },
    {
      category: "Commercial Arithmetic",
      title: "Ratio, Proportion & Variation",
      formula: "Direct: y = kx (y ∝ x)\nInverse: y = k/x (y ∝ 1/x)\nJoint: y = kxz (y ∝ xz)\nPartial: y = kx + c",
      explanation: "• If y varies directly as x: y₁/x₁ = y₂/x₂\n• If y varies inversely as x: y₁x₁ = y₂x₂\n• If y varies as x² and inversely as z: y = kx²/z\n• Proportional division: share = (part/total parts)·amount",
      tip: "Always find the constant k first using the given condition, then use it to find unknowns."
    },

    // ─── VECTORS & TRANSFORMATIONS ────────────────────────────
    {
      category: "Vectors",
      title: "Vector Operations & Position Vectors",
      formula: "|a| = √(x²+y²)\na·b = |a||b|cosθ = x₁x₂+y₁y₂\nUnit vector: â = a/|a|\nMidpoint: M = (a+b)/2",
      explanation: "• Parallel vectors: a = kb (scalar multiple)\n• Perpendicular vectors: a·b = 0\n• Triangle law: AB + BC = AC\n• Parallelogram law: AC = AB + AD\n• Resultant of two vectors: R = √(F₁²+F₂²+2F₁F₂cosθ)",
      tip: "Two vectors are perpendicular if and only if their dot product equals zero."
    },
    {
      category: "Transformations",
      title: "Transformations in the Plane",
      formula: "Reflection in x-axis: (x,y)→(x,-y)\nReflection in y-axis: (x,y)→(-x,y)\nReflection in y=x: (x,y)→(y,x)\nRotation 90° CCW: (x,y)→(-y,x)\nRotation 180°: (x,y)→(-x,-y)",
      explanation: "Translation by vector (a,b): (x,y)→(x+a,y+b)\nEnlargement center O, scale factor k: (x,y)→(kx,ky)\n• Area scale factor = k²\n• Under enlargement, angles preserved, parallel lines remain parallel",
      tip: "Under enlargement with scale factor k, the area is multiplied by k² and the length by |k|."
    },

    // ─── LOGIC & MAPPING ─────────────────────────────────────
    {
      category: "Logic",
      title: "Mathematical Logic & Truth Tables",
      formula: "Conjunction: p∧q (AND)\nDisjunction: p∨q (OR)\nImplication: p→q (If...then)\nBiconditional: p↔q (If and only if)\nNegation: ~p (NOT p)",
      explanation: "Truth Table for p→q:\n• T→T = T; T→F = F; F→T = T; F→F = T\n• Contrapositive of p→q is ~q→~p (logically equivalent)\n• Converse of p→q is q→p\n• Inverse of p→q is ~p→~q",
      tip: "The contrapositive always has the same truth value as the original statement."
    },
    {
      category: "Mapping & Functions",
      title: "Functions, Domain & Range",
      formula: "One-to-one (Injective): f(a)=f(b) ⟹ a=b\nOnto (Surjective): every element in codomain has a preimage\nBijective: both injective and surjective\nComposite: (f∘g)(x) = f(g(x))",
      explanation: "• Domain: set of all valid inputs\n• Range: set of all possible outputs\n• Inverse function f⁻¹: swap x and y, solve for y\n• f(f⁻¹(x)) = f⁻¹(f(x)) = x\n• Vertical line test: determines if relation is a function",
      tip: "To find the inverse, replace f(x) with y, swap x and y, then solve for y."
    },

    // ─── ADDITIONAL TOPICS ────────────────────────────────────
    {
      category: "Linear Programming",
      title: "Linear Programming & Optimization",
      formula: "Objective Function: Z = ax+by (maximize or minimize)\nConstraints: linear inequalities\nFeasible region: intersection of all constraint regions",
      explanation: "Steps:\n1. Define variables\n2. Write objective function\n3. Write constraints as inequalities\n4. Graph constraints, shade feasible region\n5. Evaluate objective at each vertex (corner point)\n6. Maximum/minimum occurs at a vertex",
      tip: "The optimal solution always occurs at a corner point (vertex) of the feasible region."
    },
    {
      category: "Numerical Methods",
      title: "Numerical Methods (Trapezium Rule)",
      formula: "Trapezium Rule: ∫[a,b] y dx ≈ (h/2)[y₀+yₙ+2(y₁+y₂+...+yₙ₋₁)]\nwhere h = (b-a)/n",
      explanation: "• n = number of strips (intervals)\n• n+1 = number of ordinates (y-values)\n• More strips → better approximation\n• Over-estimates area under concave-up curves\n• Under-estimates area under concave-down curves",
      tip: "The trapezium rule is exact for linear functions (straight lines)."
    }
  ],

  Physics: [
    // ─── MECHANICS ────────────────────────────────────────────
    {
      category: "Mechanics",
      title: "Uniformly Accelerated Motion & Projectiles",
      formula: "v = u+at\ns = ut+½at²\nv² = u²+2as\ns = [(u+v)/2]·t\nFlight Time: T = (2u sinθ)/g\nMax Height: H = (u²sin²θ)/2g\nRange: R = (u²sin2θ)/g",
      explanation: "• Vertical motion under gravity: a = ±g\n• At max height: vᵧ = 0\n• Max range at θ = 45°: R_max = u²/g\n• Complementary angles (θ and 90°-θ) give same range",
      tip: "Maximum range R_max = u²/g when launched at 45°."
    },
    {
      category: "Mechanics",
      title: "Newton's Laws & Momentum",
      formula: "F = ma = Δp/Δt\nImpulse: I = F·Δt = m(v-u)\nConservation: m₁u₁+m₂u₂ = m₁v₁+m₂v₂\nRecoil: m₁v₁ = -m₂v₂",
      explanation: "• Elastic: both momentum and KE conserved\n• Perfectly Inelastic: bodies stick together\n  m₁u₁+m₂u₂ = (m₁+m₂)V\n• Coefficient of restitution: e = relative speed of separation/relative speed of approach\n• e=1: perfectly elastic; e=0: perfectly inelastic",
      tip: "Impulse = area under Force-Time graph."
    },
    {
      category: "Mechanics",
      title: "Work, Energy & Power",
      formula: "W = F·s·cosθ\nKE = ½mv²\nPE = mgh\nP = W/t = F·v\nElastic PE = ½ke² = ½Fe",
      explanation: "• Conservation of Energy: KE+PE = constant (conservative field)\n• Work-Energy Theorem: Net work = ΔKE\n• Efficiency = (useful output/total input)·100%\n• Power = energy/time = force × velocity",
      tip: "When a ball falls from height h, v = √(2gh) at impact (ignoring air resistance)."
    },
    {
      category: "Mechanics",
      title: "Machines & Mechanical Advantage",
      formula: "MA = Load/Effort\nVR = Distance_Effort/Distance_Load\nEfficiency: η = (MA/VR)·100%\nInclined Plane: VR = 1/sinθ\nPulley System: VR = number of supporting ropes",
      explanation: "Common machines:\n• Lever: VR = effort arm/load arm\n• Wheel & Axle: VR = R/r\n• Screw Jack: VR = 2πr/pitch\n• Gear System: VR = teeth driven/teeth driver\n• Block & tackle: VR = number of pulleys",
      tip: "VR depends only on geometry and never changes. MA and efficiency decrease due to friction."
    },
    {
      category: "Mechanics",
      title: "Circular Motion & Centripetal Force",
      formula: "ω = v/r = 2πf = 2π/T\naᶜ = v²/r = ω²r\nFᶜ = mv²/r = mω²r\nBanking angle: tanθ = v²/(rg)",
      explanation: "• Centripetal force always points toward center\n• On banked curve without friction: tanθ = v²/(rg)\n• Minimum speed at top of vertical circle: v = √(gr)\n• Period of revolution: T = 2πr/v",
      tip: "Centripetal force is NOT a new force — it's the net force toward the center (tension, gravity, friction, etc.)."
    },
    {
      category: "Mechanics",
      title: "Simple Harmonic Motion (SHM)",
      formula: "a = -ω²x\nv = ω√(A²-x²)\nv_max = ωA (at center)\na_max = ω²A (at extremes)\nSimple Pendulum: T = 2π√(l/g)\nSpring: T = 2π√(m/k)",
      explanation: "• Displacement: x = A sin(ωt) or x = A cos(ωt)\n• KE = ½mω²(A²-x²); PE = ½mω²x²\n• Total energy = ½mω²A² = constant\n• At equilibrium: max KE, zero PE\n• At extremes: zero KE, max PE",
      tip: "Period of a simple pendulum is independent of mass and amplitude (for small angles)."
    },
    {
      category: "Mechanics",
      title: "Equilibrium, Moments & Center of Gravity",
      formula: "Moment = Force × perpendicular distance\nΣ Clockwise moments = Σ Anti-clockwise moments\nCouple = F × d (two equal, opposite, parallel forces)\nResultant of parallel forces: R = F₁+F₂",
      explanation: "Conditions for equilibrium:\n1. ΣF = 0 (net force = 0)\n2. ΣM = 0 (net moment about any point = 0)\n• Centre of gravity: point where entire weight acts\n• Stable equilibrium: CG rises when displaced\n• Unstable: CG falls when displaced\n• Neutral: CG stays at same height",
      tip: "A body is more stable when its CG is lower and its base is wider."
    },
    {
      category: "Mechanics",
      title: "Hooke's Law & Elasticity",
      formula: "F = ke (Hooke's Law, within elastic limit)\nStress = F/A (N/m²)\nStrain = e/l (dimensionless)\nYoung's Modulus: E = Stress/Strain = Fl/(Ae)",
      explanation: "• k = spring constant (N/m)\n• e = extension\n• Elastic PE = ½ke² = ½Fe = area under F-e graph\n• Elastic limit: beyond this, material doesn't return to original length\n• Yield point: material begins to flow plastically\n• Springs in series: 1/k = 1/k₁+1/k₂\n• Springs in parallel: k = k₁+k₂",
      tip: "Springs in series are like resistors in series (inverse addition). Springs in parallel add directly."
    },
    {
      category: "Mechanics",
      title: "Friction & Motion on Inclined Planes",
      formula: "f = μR (limiting friction)\nStatic friction: f_s ≤ μ_s R\nKinetic friction: f_k = μ_k R\nOn incline: Component along plane = mg sinθ\nNormal force: R = mg cosθ",
      explanation: "• μ_s > μ_k (static > kinetic coefficient)\n• Angle of repose: tanα = μ\n• For motion up incline: F > mg sinθ + μmg cosθ\n• For motion down incline: net force = mg sinθ - μmg cosθ\n• On smooth incline (μ=0): a = g sinθ",
      tip: "The angle at which a body just starts to slide down an incline equals the angle of repose (tanα = μ)."
    },

    // ─── GRAVITATION ──────────────────────────────────────────
    {
      category: "Gravitation",
      title: "Newton's Law of Gravitation & Satellites",
      formula: "F = GMm/r²\ng = GM/R²\nEscape velocity: vₑ = √(2gR)\nOrbital velocity: v₀ = √(gR) = √(GM/R)\nKepler's 3rd: T² ∝ r³",
      explanation: "• G = 6.67×10⁻¹¹ N·m²/kg²\n• vₑ = √2·v₀ ≈ 1.414·v₀\n• g varies with altitude: g' = g(R/(R+h))²\n• g varies with depth: g' = g(1-d/R)\n• Geostationary orbit: T = 24 hrs, above equator",
      tip: "On Earth's surface, escape velocity ≈ 11.2 km/s."
    },

    // ─── THERMAL PHYSICS ──────────────────────────────────────
    {
      category: "Thermal Physics",
      title: "Heat Capacity & Latent Heat",
      formula: "Q = mcΔθ (specific heat capacity)\nQ = CΔθ (heat capacity C=mc)\nQ = mL (specific latent heat)\nHeat lost = Heat gained (mixtures)",
      explanation: "• Lf (ice) = 3.36×10⁵ J/kg\n• Lv (water) = 2.26×10⁶ J/kg\n• c (water) = 4200 J/(kg·K)\n• Method of mixtures: m₁c₁Δθ₁ = m₂c₂Δθ₂",
      tip: "During phase changes (melting, boiling), temperature stays CONSTANT: use Q=mL, not mcΔθ."
    },
    {
      category: "Thermal Physics",
      title: "Thermal Expansion",
      formula: "Linear: ΔL = αL₁Δθ; L₂ = L₁(1+αΔθ)\nArea: β = 2α; ΔA = βA₁Δθ\nCubic: γ = 3α; ΔV = γV₁Δθ\nApparent expansion: γₐ = γ_liquid - γ_vessel",
      explanation: "• α = coefficient of linear expansivity\n• β = coefficient of area expansivity\n• γ = coefficient of volume expansivity\n• Bimetallic strip: two metals with different α bonded together\n• Anomalous expansion of water: max density at 4°C",
      tip: "Water is densest at 4°C — ice floats because it's less dense than liquid water at 4°C."
    },
    {
      category: "Thermal Physics",
      title: "Gas Laws & Kinetic Theory",
      formula: "Boyle: P₁V₁ = P₂V₂ (T const)\nCharles: V₁/T₁ = V₂/T₂ (P const)\nPressure Law: P₁/T₁ = P₂/T₂ (V const)\nIdeal Gas: PV = nRT\nKE = ³⁄₂kT = ½mc²",
      explanation: "• T must be in Kelvin: T(K) = T(°C)+273\n• R = 8.314 J/(mol·K)\n• k = 1.38×10⁻²³ J/K (Boltzmann constant)\n• PV = NkT (N = number of molecules)\n• rms speed: c_rms = √(3RT/M) = √(3kT/m)",
      tip: "At absolute zero (0 K = -273°C), an ideal gas has zero volume and zero molecular motion."
    },
    {
      category: "Thermal Physics",
      title: "Heat Transfer Mechanisms",
      formula: "Conduction: Q/t = kA(θ₁-θ₂)/L\nStefan's Law: P = σεAT⁴\nConvection: natural (density) & forced (fan/pump)\nThermos flask: minimizes all three modes",
      explanation: "• k = thermal conductivity (W/(m·K))\n• σ = 5.67×10⁻⁸ W/(m²·K⁴) (Stefan-Boltzmann constant)\n• ε = emissivity (black body ε=1)\n• Good conductors: metals (Cu, Al)\n• Good insulators: air, wood, plastic, rubber",
      tip: "Black bodies are the best absorbers AND the best emitters of radiant heat."
    },
    {
      category: "Thermal Physics",
      title: "Evaporation & Humidity",
      formula: "Relative Humidity = (SVP at dew point / SVP at air temp)·100%\nRH = (mass of water vapour / mass at saturation)·100%\nDew Point: temperature at which air becomes saturated",
      explanation: "Factors affecting evaporation rate:\n• Temperature (higher = faster)\n• Wind/air movement\n• Surface area\n• Humidity (lower = faster)\n• Boiling vs evaporation: boiling occurs throughout liquid at fixed temp; evaporation occurs at surface at any temp",
      tip: "Dew forms when air temperature falls to the dew point (100% relative humidity)."
    },

    // ─── WAVES & OPTICS ───────────────────────────────────────
    {
      category: "Waves & Optics",
      title: "Wave Properties & Equations",
      formula: "v = fλ\nT = 1/f\nSpeed of sound in air ≈ 340 m/s\nSpeed of light: c = 3×10⁸ m/s",
      explanation: "Wave types:\n• Transverse: vibration ⊥ direction of travel (light, water)\n• Longitudinal: vibration ∥ direction (sound)\n• Electromagnetic spectrum order: Radio, Micro, IR, Visible, UV, X-ray, Gamma\n• Properties: reflection, refraction, diffraction, interference",
      tip: "Sound cannot travel through a vacuum; light can."
    },
    {
      category: "Waves & Optics",
      title: "Snell's Law & Total Internal Reflection",
      formula: "n = sin i/sin r = c/v = real depth/apparent depth\nCritical angle: sin c = 1/n = n₂/n₁\nn₁ sin θ₁ = n₂ sin θ₂",
      explanation: "• Total internal reflection occurs when:\n  1. Light travels from denser to less dense medium\n  2. Angle of incidence > critical angle\n• Applications: optical fibers, mirages, prisms\n• For glass (n≈1.5): critical angle ≈ 42°",
      tip: "Total internal reflection ONLY occurs when light travels from a denser to a less dense medium."
    },
    {
      category: "Waves & Optics",
      title: "Mirrors & Lenses",
      formula: "Mirror/Lens: 1/f = 1/u + 1/v\nMagnification: m = v/u = image height/object height\nPower of lens: P = 1/f (dioptres, f in metres)\nLens maker: 1/f = (n-1)[1/R₁ - 1/R₂]",
      explanation: "Sign Conventions:\n• Converging (convex lens/concave mirror): f positive\n• Diverging (concave lens/convex mirror): f negative\n• Real image: v positive; Virtual image: v negative\n• Combined lenses: P = P₁+P₂ (or 1/f = 1/f₁+1/f₂)",
      tip: "A concave mirror produces a real image when object is beyond F, and a virtual image when object is between F and the mirror."
    },
    {
      category: "Waves & Optics",
      title: "Interference & Diffraction",
      formula: "Constructive: path difference = nλ\nDestructive: path difference = (n+½)λ\nYoung's slits: y = λD/d\nDiffraction grating: d sinθ = nλ",
      explanation: "• For Young's double slit: fringe spacing y = λD/d\n  (D = distance to screen, d = slit separation)\n• Stationary waves: nodes and antinodes\n• Fundamental frequency (1st harmonic): f₁ = v/(2L) for string\n• Harmonics: fₙ = nf₁",
      tip: "Coherent sources (same frequency, constant phase difference) are required for sustained interference patterns."
    },
    {
      category: "Waves & Optics",
      title: "Sound — Resonance & Doppler Effect",
      formula: "Closed pipe: f₁ = v/(4L) (odd harmonics only: f₁, 3f₁, 5f₁...)\nOpen pipe: f₁ = v/(2L) (all harmonics: f₁, 2f₁, 3f₁...)\nDoppler: f' = f(v±v_o)/(v∓v_s)",
      explanation: "• Beat frequency = |f₁-f₂|\n• Resonance: vibration at natural frequency with maximum amplitude\n• End correction: e ≈ 0.6r (radius of pipe)\n• Effective length = L+e (closed) or L+2e (open)\n• Doppler: approaching → higher pitch; receding → lower pitch",
      tip: "In the Doppler formula, use + in numerator when observer moves TOWARD source, - when moving AWAY."
    },
    {
      category: "Waves & Optics",
      title: "Electromagnetic Spectrum",
      formula: "c = fλ = 3×10⁸ m/s (for all EM waves in vacuum)\nE = hf = hc/λ (photon energy)",
      explanation: "EM spectrum (increasing frequency/energy):\n• Radio → Microwave → Infrared → Visible → UV → X-rays → Gamma\n• Visible light order: Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV)\n• Red: longest wavelength, lowest frequency\n• Violet: shortest wavelength, highest frequency",
      tip: "All EM waves travel at the speed of light (3×10⁸ m/s) in vacuum but differ in frequency and wavelength."
    },

    // ─── CURRENT ELECTRICITY ──────────────────────────────────
    {
      category: "Current Electricity",
      title: "Ohm's Law, Resistance & Circuits",
      formula: "V = IR; P = IV = I²R = V²/R\nE = I(R+r) = V+Ir\nSeries: R = R₁+R₂+R₃\nParallel: 1/R = 1/R₁+1/R₂",
      explanation: "• Terminal p.d. V < EMF E (when current flows)\n• Lost volts = Ir\n• For 2 resistors in parallel: R = R₁R₂/(R₁+R₂)\n• Resistivity: R = ρL/A\n• Temperature coefficient: R_T = R₀(1+αT)",
      tip: "Terminal p.d. equals EMF only when no current flows (open circuit)."
    },
    {
      category: "Current Electricity",
      title: "Wheatstone Bridge & Potentiometer",
      formula: "Balanced Bridge: R₁/R₂ = R₃/R₄\nPotentiometer: E₁/E₂ = L₁/L₂\nMeter Bridge: R = S·l/(100-l)",
      explanation: "• At balance: no current through galvanometer\n• Potentiometer measures EMF (not terminal p.d.)\n• Advantages of potentiometer over voltmeter:\n  - No current drawn from cell being measured\n  - Gives true EMF\n• Sensitivity improved by longer wire or more sensitive galvanometer",
      tip: "The potentiometer draws no current from the source being measured, so it gives a more accurate reading of EMF."
    },
    {
      category: "Current Electricity",
      title: "Electrical Energy, Power & Cost",
      formula: "Energy: W = Pt = VIt = I²Rt = V²t/R\n1 kWh = 3.6×10⁶ J\nCost = (Power in kW × Time in hours × rate per kWh)",
      explanation: "• Fuse rating: choose fuse slightly above normal current\n  I = P/V (for mains appliances)\n• Heating element: Q = I²Rt = mcΔθ\n• Efficiency of heater = mcΔθ/(I²Rt)×100%",
      tip: "A 2 kW heater used for 3 hours at ₦50/kWh costs: 2×3×50 = ₦300."
    },
    {
      category: "Current Electricity",
      title: "Galvanometer Conversion",
      formula: "To Ammeter: Shunt S = IgRg/(I-Ig) [parallel]\nTo Voltmeter: Multiplier M = V/Ig - Rg [series]",
      explanation: "• Ammeter: low resistance device, connected in SERIES\n• Voltmeter: high resistance device, connected in PARALLEL\n• Shunt is a LOW resistance in parallel with galvanometer\n• Multiplier is a HIGH resistance in series with galvanometer",
      tip: "An ideal ammeter has zero resistance; an ideal voltmeter has infinite resistance."
    },

    // ─── ELECTROSTATICS & CAPACITANCE ─────────────────────────
    {
      category: "Electrostatics",
      title: "Coulomb's Law & Electric Field",
      formula: "F = kQ₁Q₂/r² (k = 9×10⁹ N·m²/C²)\nE = F/q = kQ/r² (electric field strength)\nV = kQ/r (electric potential)\nW = qV (work done)",
      explanation: "• Field lines: from positive to negative\n• Uniform field between parallel plates: E = V/d\n• Force on charge in uniform field: F = qE = qV/d\n• Electric flux: Φ = EA\n• Like charges repel; unlike charges attract",
      tip: "Inside a charged hollow conductor, the electric field is zero (Faraday cage effect)."
    },
    {
      category: "Electrostatics",
      title: "Capacitance & Energy Storage",
      formula: "C = Q/V = εA/d\nEnergy: W = ½QV = ½CV² = Q²/(2C)\nParallel: C = C₁+C₂+C₃\nSeries: 1/C = 1/C₁+1/C₂",
      explanation: "• ε = ε₀εᵣ (permittivity = free space × relative)\n• ε₀ = 8.85×10⁻¹² F/m\n• Dielectric increases capacitance by factor εᵣ\n• Capacitors in parallel: same voltage, charges add\n• Capacitors in series: same charge, voltages add",
      tip: "Capacitors combine OPPOSITE to resistors: parallel = add, series = reciprocal."
    },

    // ─── MAGNETISM & EM INDUCTION ─────────────────────────────
    {
      category: "Magnetism",
      title: "Magnetic Fields & Forces",
      formula: "F = BIL sinθ (force on wire)\nF = qvB sinθ (force on charge)\nMagnetic flux: Φ = BA cosθ\nTorque on coil: τ = BINA cosθ",
      explanation: "• Fleming's Left Hand Rule (motor): Thumb=Force, Index=Field, Middle=Current\n• Solenoid: B = μ₀nI (n = turns per unit length)\n• Earth's magnetic field: geographic N ≈ magnetic S\n• Declination: angle between geographic and magnetic north\n• Dip/Inclination: angle of field with horizontal",
      tip: "A current-carrying conductor in a magnetic field experiences a force (motor effect) — this is the principle of an electric motor."
    },
    {
      category: "Electromagnetism",
      title: "Electromagnetic Induction & Transformers",
      formula: "Faraday: EMF = -NΔΦ/Δt = -NΔBA/Δt\nTransformer: Vₚ/Vₛ = Nₚ/Nₛ = Iₛ/Iₚ\nEfficiency: η = (VₛIₛ)/(VₚIₚ)·100%\nAC: V = V₀ sin(ωt); I = I₀ sin(ωt)",
      explanation: "• Lenz's Law: induced current opposes the change causing it\n• Fleming's Right Hand Rule (generator): Thumb=Motion, Index=Field, Middle=Induced EMF\n• Step-up: Vₛ > Vₚ (Nₛ > Nₚ)\n• Step-down: Vₛ < Vₚ (Nₛ < Nₚ)\n• Power loss in transmission: P = I²R (reduced by high voltage)",
      tip: "Power is transmitted at high voltage (and low current) to minimize I²R losses in the cables."
    },
    {
      category: "Electromagnetism",
      title: "AC Circuits & RMS Values",
      formula: "V_rms = V₀/√2; I_rms = I₀/√2\nPower (AC): P = I_rms·V_rms = I₀V₀/2\nFrequency of mains (Nigeria): 50 Hz\nReactance: Xc = 1/(2πfC); XL = 2πfL",
      explanation: "• RMS values give equivalent DC heating effect\n• For purely resistive AC circuit: I and V in phase\n• Capacitive circuit: I leads V by 90°\n• Inductive circuit: I lags V by 90°\n• Impedance: Z = √(R²+(XL-Xc)²)",
      tip: "RMS values are what AC meters read, and what we use to calculate power in AC circuits."
    },

    // ─── MODERN PHYSICS ───────────────────────────────────────
    {
      category: "Modern Physics",
      title: "Photoelectric Effect",
      formula: "E = hf = hc/λ\nhf = W₀+KE_max = hf₀+½mv²_max\nStopping potential: eVₛ = KE_max\nThreshold freq: f₀ = W₀/h",
      explanation: "• h = 6.63×10⁻³⁴ J·s (Planck's constant)\n• W₀ = work function = minimum energy to remove electron\n• Increasing intensity → more photoelectrons (higher current)\n• Increasing frequency → higher KE of electrons\n• Below threshold frequency: NO emission regardless of intensity",
      tip: "Increasing light INTENSITY increases photocurrent but only increasing FREQUENCY increases the max KE of photoelectrons."
    },
    {
      category: "Modern Physics",
      title: "Radioactivity & Nuclear Physics",
      formula: "N = N₀(½)^(t/T½)\nDecay constant: λ = ln2/T½ ≈ 0.693/T½\nActivity: A = λN\nE = mc² (mass-energy equivalence)\nMass defect: Δm = (Z·mₚ+N·mₙ)-M_nucleus",
      explanation: "• α particle: ⁴₂He (2 protons, 2 neutrons)\n• β particle: ⁰₋₁e (electron from neutron→proton conversion)\n• γ ray: electromagnetic radiation (no mass, no charge)\n• Penetrating power: α < β < γ\n• Ionizing power: α > β > γ\n• Binding energy = Δm·c²",
      tip: "After n half-lives, the fraction remaining = (½)ⁿ. After 3 half-lives: ⅛ remains."
    },
    {
      category: "Modern Physics",
      title: "Atomic Models & Energy Levels",
      formula: "Bohr model: Eₙ = -13.6/n² eV (hydrogen)\nEnergy of photon emitted: E = E₁-E₂ = hf\n1 eV = 1.6×10⁻¹⁹ J",
      explanation: "• Ground state: n=1 (lowest energy)\n• Excited states: n=2,3,4...\n• Emission: electron drops to lower level, releases photon\n• Absorption: electron jumps to higher level, absorbs photon\n• Line spectrum: characteristic of each element",
      tip: "The hydrogen spectrum series: Lyman (UV, to n=1), Balmer (visible, to n=2), Paschen (IR, to n=3)."
    },
    {
      category: "Modern Physics",
      title: "X-rays & Thermionic Emission",
      formula: "KE of electron: eV = ½mv²\nMinimum wavelength: λ_min = hc/(eV)\nIntensity ∝ filament current\nPenetration ∝ accelerating voltage",
      explanation: "X-ray production:\n1. Heated cathode emits electrons (thermionic emission)\n2. Electrons accelerated by high p.d.\n3. Strike target (anode), produce X-rays\n• Characteristic X-rays: depend on target material\n• Continuous spectrum: bremsstrahlung radiation\n• Applications: medical imaging, crystallography",
      tip: "Hard X-rays (high voltage, short wavelength) are more penetrating; soft X-rays (low voltage, long wavelength) are less penetrating."
    },

    // ─── FLUIDS & PRESSURE ────────────────────────────────────
    {
      category: "Fluids",
      title: "Pressure & Archimedes' Principle",
      formula: "P = F/A = ρgh\nAtmospheric: P₀ = 1.013×10⁵ Pa = 760 mmHg\nArchimedes: Upthrust = ρ_fluid·V_displaced·g\nRelative Density = ρ_substance/ρ_water",
      explanation: "Flotation: An object floats when upthrust = weight\n• Fraction submerged = ρ_object/ρ_fluid\n• Hydraulic press: F₁/A₁ = F₂/A₂ (Pascal's principle)\n• Manometer: P_gas = P_atm ± ρgh\n• Barometer: measures atmospheric pressure",
      tip: "An object sinks if its density > fluid density; floats if density < fluid density; hovers if density = fluid density."
    },
    {
      category: "Fluids",
      title: "Viscosity & Surface Tension",
      formula: "Stokes' Law: F = 6πηrv\nTerminal velocity: v_t = 2r²(ρ_s-ρ_f)g/(9η)\nSurface tension: γ = F/L\nCapillary rise: h = 2γcosθ/(ρgr)",
      explanation: "• η = coefficient of viscosity\n• At terminal velocity: drag + upthrust = weight\n• Surface tension: force per unit length along surface\n• Soap reduces surface tension (surfactant)\n• Capillarity: water rises in narrow tubes; mercury depresses",
      tip: "Viscosity decreases with increasing temperature for liquids but increases for gases."
    },

    // ─── ADDITIONAL PHYSICS TOPICS ────────────────────────────
    {
      category: "Measurements",
      title: "Units, Dimensions & Measurements",
      formula: "SI Base Units: m, kg, s, A, K, mol, cd\nForce: [MLT⁻²]; Energy: [ML²T⁻²]\nPower: [ML²T⁻³]; Pressure: [ML⁻¹T⁻²]\nVernier: 0.01cm; Micrometer: 0.001cm",
      explanation: "• Systematic errors: consistent offset (zero error, calibration)\n• Random errors: scatter around true value (parallax)\n• Accuracy: closeness to true value\n• Precision: reproducibility of measurements\n• Percentage error = (error/actual value)·100%",
      tip: "Dimensional analysis can verify formulas: both sides of an equation must have the same dimensions."
    },
    {
      category: "Measurements",
      title: "Scalar & Vector Quantities",
      formula: "Scalars: speed, mass, energy, time, temperature\nVectors: velocity, force, acceleration, displacement, momentum\nResultant: R = √(F₁²+F₂²+2F₁F₂cosθ)\nDirection: tanα = F₂sinθ/(F₁+F₂cosθ)",
      explanation: "• Scalar: magnitude only\n• Vector: magnitude and direction\n• Resolution: Fx = Fcosθ, Fy = Fsinθ\n• Two equal forces at angle θ: R = 2Fcos(θ/2)\n• Equilibrant: equal and opposite to resultant",
      tip: "Two perpendicular forces of 3N and 4N have resultant = √(9+16) = 5N."
    }
  ],

  Chemistry: [
    // ─── STOICHIOMETRY ────────────────────────────────────────
    {
      category: "Stoichiometry",
      title: "Mole Concept, Molarity & Dilution",
      formula: "n = m/M (mass/molar mass)\nn = V/22.4 dm³ (at s.t.p.)\nn = N/Nₐ (particles/Avogadro's)\nMolarity C = n/V(dm³)\nDilution: C₁V₁ = C₂V₂",
      explanation: "• Nₐ = 6.02×10²³ particles/mol\n• At s.t.p. (0°C, 1atm): 1 mol gas = 22.4 dm³\n• At r.t.p. (25°C, 1atm): 1 mol gas ≈ 24 dm³\n• % purity = (pure mass/total mass)·100%\n• % yield = (actual yield/theoretical yield)·100%",
      tip: "Always convert volumes from cm³ to dm³ (÷1000) when computing molarity."
    },
    {
      category: "Stoichiometry",
      title: "Empirical & Molecular Formulas",
      formula: "Empirical formula: simplest whole number ratio\nMolecular formula = n × Empirical formula\nn = Molecular mass / Empirical formula mass",
      explanation: "Steps to find empirical formula:\n1. Write % composition of each element\n2. Divide each by atomic mass → mole ratio\n3. Divide by smallest mole value\n4. Round to nearest whole numbers\n5. Multiply by molecular mass ratio for molecular formula",
      tip: "CH₂O (empirical) could be C₂H₄O₂ (molecular) if molar mass is 60 g/mol."
    },
    {
      category: "Stoichiometry",
      title: "Balancing Equations & Stoichiometric Calculations",
      formula: "Balanced equation: atoms conserved on both sides\nMole ratio from coefficients\nLimiting reagent: reagent that runs out first\nExcess reagent: reagent left over",
      explanation: "Steps for stoichiometric calculations:\n1. Write balanced equation\n2. Calculate moles of given substance\n3. Use mole ratio to find moles of required substance\n4. Convert moles to required unit (mass, volume, etc.)\n• 1 dm³ = 1000 cm³ = 1 litre",
      tip: "The limiting reagent determines the maximum amount of product formed."
    },

    // ─── GAS LAWS ─────────────────────────────────────────────
    {
      category: "Gas Laws",
      title: "Combined Gas Laws & Graham's Diffusion",
      formula: "Boyle: P₁V₁ = P₂V₂\nCharles: V₁/T₁ = V₂/T₂\nCombined: P₁V₁/T₁ = P₂V₂/T₂\nIdeal Gas: PV = nRT\nGraham: R₁/R₂ = √(M₂/M₁)",
      explanation: "• T must be in Kelvin (T = °C+273)\n• Dalton: P_total = P₁+P₂+P₃...\n• Lighter gases diffuse faster\n• R = 8.314 J/(mol·K) or 0.0821 L·atm/(mol·K)",
      tip: "NH₃ (M=17) diffuses faster than HCl (M=36.5). Ratio = √(36.5/17) ≈ 1.46."
    },
    {
      category: "Gas Laws",
      title: "Vapour Pressure & Dalton's Law",
      formula: "P_total = P_dry gas + SVP_water\nMole fraction: Xₐ = nₐ/(nₐ+n_b)\nPartial pressure: Pₐ = Xₐ·P_total",
      explanation: "• SVP (Saturated Vapour Pressure) depends only on temperature\n• Collection over water: P_gas = P_atm - P_water\n• Boiling occurs when SVP = atmospheric pressure\n• At higher altitudes, lower P_atm → lower boiling point",
      tip: "When collecting gas over water, always subtract water vapour pressure to get the true gas pressure."
    },

    // ─── ATOMIC STRUCTURE & BONDING ───────────────────────────
    {
      category: "Atomic Structure",
      title: "Electronic Configuration & Periodic Trends",
      formula: "Max electrons per shell: 2n²\n1st: 2, 2nd: 8, 3rd: 18, 4th: 32\nFilling order: 1s 2s 2p 3s 3p 4s 3d 4p...\nAufbau principle, Hund's rule, Pauli exclusion",
      explanation: "Periodic Trends:\n• Atomic radius: decreases across period, increases down group\n• Ionization energy: increases across period, decreases down group\n• Electronegativity: increases across period, decreases down group\n• Electron affinity: generally increases across period\n• Metallic character: increases down group, decreases across period",
      tip: "Fluorine is the most electronegative element (EN = 4.0). Francium is the most electropositive."
    },
    {
      category: "Chemical Bonding",
      title: "Types of Chemical Bonds",
      formula: "Ionic: Metal + Non-metal (electron transfer)\nCovalent: Non-metal + Non-metal (electron sharing)\nMetallic: Metal + Metal (sea of electrons)\nDative/Coordinate: both electrons from one atom",
      explanation: "Properties comparison:\n• Ionic: high MP/BP, conduct when molten/dissolved, crystalline\n• Covalent: low MP/BP, don't conduct, molecular\n• Metallic: high MP, conduct, malleable, ductile\n• Van der Waals forces: weakest intermolecular force\n• Hydrogen bonding: strong intermolecular force (H-F, H-O, H-N)",
      tip: "Water has an unusually high boiling point for its molecular size because of strong hydrogen bonding."
    },
    {
      category: "Chemical Bonding",
      title: "Shapes of Molecules (VSEPR)",
      formula: "Linear: 2 bond pairs, 0 lone pairs (180°)\nTrigonal planar: 3 bp, 0 lp (120°)\nTetrahedral: 4 bp, 0 lp (109.5°)\nV-shaped/Bent: 2 bp, 2 lp\nTrigonal pyramidal: 3 bp, 1 lp (107°)",
      explanation: "Examples:\n• CO₂: linear; BF₃: trigonal planar\n• CH₄: tetrahedral; NH₃: trigonal pyramidal\n• H₂O: bent/V-shaped\n• Lone pairs compress bond angles\n• SF₆: octahedral (90°)",
      tip: "Lone pairs repel more strongly than bond pairs, reducing the bond angle."
    },

    // ─── EQUILIBRIUM & ENERGETICS ─────────────────────────────
    {
      category: "Equilibrium",
      title: "Chemical Equilibrium & Le Chatelier",
      formula: "Kc = [C]^c·[D]^d / [A]^a·[B]^b\nKp = (Pc^c·Pd^d) / (Pa^a·Pb^b)\nΔH = ΣH(products) - ΣH(reactants)",
      explanation: "Le Chatelier's Principle:\n• ↑Concentration of reactant → shifts RIGHT\n• ↑Pressure → shifts to fewer gas moles\n• ↑Temperature + exothermic → shifts LEFT\n• Catalyst: speeds up both directions equally, no shift\n• Kc changes only with temperature",
      tip: "A catalyst does NOT change the position of equilibrium or Kc — it only speeds up the rate."
    },
    {
      category: "Energetics",
      title: "Enthalpy Changes & Hess's Law",
      formula: "ΔH = ΣH(products) - ΣH(reactants)\nΔH = Σ(bonds broken) - Σ(bonds formed)\nHess's Law: ΔH is path-independent\nΔG = ΔH - TΔS",
      explanation: "Standard enthalpy changes:\n• Formation: elements → compound (ΔHf°)\n• Combustion: substance + O₂ → CO₂+H₂O (ΔHc°)\n• Neutralization: acid + base → salt+water (-57 kJ/mol for strong acid+strong base)\n• Exothermic: ΔH < 0 (heat released)\n• Endothermic: ΔH > 0 (heat absorbed)",
      tip: "Bond breaking is ENDOTHERMIC; bond forming is EXOTHERMIC."
    },

    // ─── ACIDS, BASES & SALTS ─────────────────────────────────
    {
      category: "Acids & Bases",
      title: "pH, pOH & Acid-Base Titration",
      formula: "pH = -log₁₀[H⁺]\npOH = -log₁₀[OH⁻]\npH + pOH = 14 (at 25°C)\nKw = [H⁺][OH⁻] = 1.0×10⁻¹⁴\nTitration: CaVa/CbVb = na/nb",
      explanation: "Indicators:\n• Strong acid + Strong base → any indicator (pH 7)\n• Strong acid + Weak base → Methyl Orange (pH 3-4)\n• Weak acid + Strong base → Phenolphthalein (pH 8-10)\n• Weak acid + Weak base → no suitable single indicator",
      tip: "If [H⁺] = 10⁻³, pH = 3. If [OH⁻] = 10⁻⁴, pOH = 4 and pH = 10."
    },
    {
      category: "Acids & Bases",
      title: "Acid-Base Theories",
      formula: "Arrhenius: Acid → H⁺; Base → OH⁻\nBrønsted-Lowry: Acid = proton donor; Base = proton acceptor\nLewis: Acid = electron pair acceptor; Base = electron pair donor",
      explanation: "• Conjugate acid-base pairs: differ by one proton\n• Strong acids: HCl, HNO₃, H₂SO₄ (fully dissociate)\n• Strong bases: NaOH, KOH (fully dissociate)\n• Weak acid: CH₃COOH (partially dissociates)\n• Amphoteric/amphiprotic: can act as acid or base (H₂O, Al₂O₃, ZnO)",
      tip: "Water is amphiprotic — it can donate a proton (acting as acid) or accept one (acting as base)."
    },
    {
      category: "Acids & Bases",
      title: "Salts & Solubility Rules",
      formula: "Salt = product of acid-base reaction\nAcid salt: still has replaceable H (e.g. NaHCO₃)\nNormal salt: all H replaced (e.g. Na₂CO₃)\nBasic salt: excess base (e.g. Zn(OH)Cl)",
      explanation: "Solubility Rules:\n• All Na⁺, K⁺, NH₄⁺ salts are SOLUBLE\n• All NO₃⁻ (nitrates) are SOLUBLE\n• All Cl⁻ are soluble EXCEPT AgCl, PbCl₂\n• All SO₄²⁻ are soluble EXCEPT BaSO₄, PbSO₄\n• All CO₃²⁻ are INSOLUBLE except Na₂CO₃, K₂CO₃\n• All OH⁻ are INSOLUBLE except NaOH, KOH, Ca(OH)₂",
      tip: "To test for SO₄²⁻: add BaCl₂ + dilute HCl → white precipitate (BaSO₄) insoluble in excess acid."
    },

    // ─── ELECTROCHEMISTRY ─────────────────────────────────────
    {
      category: "Electrochemistry",
      title: "Faraday's Laws & Electrolysis",
      formula: "m = MIt/(nF)\nQ = It\nE°cell = E°cathode - E°anode\n1 Faraday = 96500 C/mol",
      explanation: "• Oxidation at ANODE; Reduction at CATHODE\n• AnOx-RedCat mnemonic\n• Preferential discharge: less electropositive cations discharged first\n  Order: Au³⁺ > Ag⁺ > Cu²⁺ > H⁺ > Zn²⁺ > Na⁺\n• At anode: OH⁻ > Cl⁻ > SO₄²⁻ > NO₃⁻",
      tip: "To deposit 1 mol Al (Al³⁺), 3 Faradays (3×96500 C) are required."
    },
    {
      category: "Electrochemistry",
      title: "Electrochemical Series & Cell EMF",
      formula: "E°cell = E°cathode - E°anode\nSpontaneous: E°cell > 0\nActivity series (most to least reactive):\nK > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au",
      explanation: "• More reactive metals have more negative E°\n• Zinc-copper cell: Zn anode (-), Cu cathode (+)\n• Standard hydrogen electrode (SHE): E° = 0.00 V\n• Sacrificial protection: coat with more reactive metal (Zn on Fe = galvanizing)\n• Corrosion: requires water + oxygen + an electrolyte",
      tip: "Metals above hydrogen in the activity series can displace H₂ from dilute acids."
    },

    // ─── ORGANIC CHEMISTRY ────────────────────────────────────
    {
      category: "Organic Chemistry",
      title: "Homologous Series & General Formulas",
      formula: "Alkanes: CₙH₂ₙ₊₂ (substitution)\nAlkenes: CₙH₂ₙ (addition)\nAlkynes: CₙH₂ₙ₋₂ (addition)\nAlkanols: CₙH₂ₙ₊₁OH\nAlkanoic acids: CₙH₂ₙ₊₁COOH\nEsters: RCOOR'",
      explanation: "Homologous series properties:\n• Differ by CH₂ (14 g/mol)\n• Same general formula\n• Same functional group\n• Similar chemical properties\n• Gradual change in physical properties\n• Increasing boiling point with chain length",
      tip: "Ethanol + excess conc. H₂SO₄ at 170°C → dehydration → Ethene (C₂H₄)."
    },
    {
      category: "Organic Chemistry",
      title: "IUPAC Naming Convention",
      formula: "Meth=1C, Eth=2C, Prop=3C, But=4C, Pent=5C\nHex=6C, Hept=7C, Oct=8C, Non=9C, Dec=10C\nSuffix: -ane (alkane), -ene (alkene), -ol (alcohol), -al (aldehyde), -one (ketone), -oic acid",
      explanation: "Rules:\n1. Find longest carbon chain\n2. Number from end nearest to substituent/functional group\n3. Name substituents with position numbers\n4. Alphabetical order for multiple substituents\n5. Use di-, tri- for repeated substituents\n• Isomers: same molecular formula, different structural formula",
      tip: "2-methylpropane and butane are structural isomers (both C₄H₁₀)."
    },
    {
      category: "Organic Chemistry",
      title: "Types of Organic Reactions",
      formula: "Addition: C=C + X₂ → C-C with X on each C\nSubstitution: H replaced by another atom/group\nElimination: removal of small molecule (H₂O, HX)\nPolymerization: many monomers → polymer\nCracking: large → smaller molecules",
      explanation: "• Addition: alkenes + Br₂, H₂, HCl, H₂O\n• Free radical substitution: alkanes + Cl₂ (UV light)\n• Nucleophilic substitution: haloalkanes + NaOH\n• Esterification: alcohol + acid → ester + water (conc. H₂SO₄ catalyst)\n• Saponification: ester/fat + NaOH → soap + glycerol",
      tip: "Alkenes decolorize bromine water (test for unsaturation); alkanes do not."
    },
    {
      category: "Organic Chemistry",
      title: "Functional Group Tests",
      formula: "Alkene: decolorizes Br₂ water and KMnO₄\nAldehyde: reduces Tollens' (Ag mirror) & Fehling's (red ppt)\nKetone: does NOT reduce Tollens' or Fehling's\nCarboxylic acid: effervesces with NaHCO₃ (CO₂)",
      explanation: "• Starch: turns blue-black with iodine solution\n• Protein: Biuret test → purple/violet colour\n• Reducing sugar: reduces Fehling's → brick-red ppt\n• Fat/oil: translucent spot on paper\n• Primary alcohol + acidified K₂Cr₂O₇ → orange to green",
      tip: "Tollens' test: warm with ammoniacal AgNO₃ — aldehyde gives silver mirror; ketone gives NO reaction."
    },
    {
      category: "Organic Chemistry",
      title: "Petroleum & Industrial Chemistry",
      formula: "Fractional distillation: separation by boiling point\nCracking: C₁₂H₂₆ → C₈H₁₈ + C₂H₄ + C₂H₄\nReforming: straight chain → branched chain (higher octane)",
      explanation: "Fractions (increasing BP):\n• Gas (C₁-C₄): cooking gas, LPG\n• Petrol/Gasoline (C₅-C₁₂): fuel for cars\n• Kerosene (C₁₂-C₁₆): jet fuel, lighting\n• Diesel (C₁₅-C₂₀): heavy vehicles\n• Lubricating oil, Bitumen/Asphalt (C₃₀+): roads\n• Octane number: measure of anti-knock quality",
      tip: "Fractions with lower boiling points are collected at the TOP of the fractionating column."
    },
    {
      category: "Organic Chemistry",
      title: "Polymers — Addition & Condensation",
      formula: "Addition polymer: nCH₂=CH₂ → (-CH₂-CH₂-)ₙ\nCondensation: monomer + monomer → polymer + H₂O\nExamples: polyethylene, PVC, nylon, terylene",
      explanation: "• Addition polymers: polythene, PVC, polypropylene, polystyrene, Teflon\n• Condensation polymers: nylon (diamine + diacid), terylene (diol + diacid), proteins (amino acids), starch (glucose)\n• Natural polymers: starch, cellulose, proteins, rubber, DNA\n• Vulcanization: cross-linking rubber with sulfur for strength",
      tip: "PVC = polyvinyl chloride = polymer of chloroethene (vinyl chloride, CH₂=CHCl)."
    },

    // ─── REDOX REACTIONS ──────────────────────────────────────
    {
      category: "Redox",
      title: "Oxidation Numbers & Redox Reactions",
      formula: "Oxidation: loss of electrons, increase in ox. number\nReduction: gain of electrons, decrease in ox. number\nOIL RIG: Oxidation Is Loss, Reduction Is Gain\nLEO GER: Loss of Electrons Oxidation, Gain Reduction",
      explanation: "Rules for oxidation numbers:\n• Free element = 0\n• Monatomic ion = charge\n• H = +1 (except in hydrides: -1)\n• O = -2 (except in peroxides: -1)\n• Sum of ox. numbers = charge on species\n• F is always -1",
      tip: "In H₂O₂, oxygen has oxidation number -1 (not -2). In NaH, hydrogen has oxidation number -1."
    },

    // ─── REACTION KINETICS ────────────────────────────────────
    {
      category: "Kinetics",
      title: "Rate of Reaction & Factors",
      formula: "Rate = Δ[product]/Δt = -Δ[reactant]/Δt\nRate = k[A]^m[B]^n (Rate law)\nArrhenius: k = Ae^(-Ea/RT)",
      explanation: "Factors affecting rate:\n• Temperature: ↑10°C ≈ doubles rate\n• Concentration: ↑concentration → ↑rate\n• Surface area: ↑surface area → ↑rate (powder > lumps)\n• Catalyst: lowers activation energy\n• Pressure (gases): ↑pressure → ↑rate\n• Nature of reactants",
      tip: "A catalyst provides an alternative pathway with lower activation energy — it is not used up."
    },
    {
      category: "Kinetics",
      title: "Activation Energy & Collision Theory",
      formula: "Ea = activation energy (min energy for reaction)\nEffective collision = sufficient energy + correct orientation\nCatalyst lowers Ea but doesn't change ΔH",
      explanation: "Energy profile diagrams:\n• Exothermic: products lower than reactants\n• Endothermic: products higher than reactants\n• Ea = energy barrier between reactants and transition state\n• ΔH = E(products) - E(reactants)\n• With catalyst: lower peak (lower Ea), same ΔH",
      tip: "A catalyst lowers the activation energy but does NOT change the enthalpy change (ΔH) of the reaction."
    },

    // ─── ENVIRONMENTAL & INDUSTRIAL ───────────────────────────
    {
      category: "Environmental Chemistry",
      title: "Water Treatment & Pollution",
      formula: "Hard water: Ca²⁺ and Mg²⁺ ions present\nTemporary hardness: Ca(HCO₃)₂ — removed by boiling\nPermanent hardness: CaSO₄ — removed by Na₂CO₃, ion exchange",
      explanation: "Water treatment steps:\n1. Screening (remove debris)\n2. Sedimentation/Coagulation (alum)\n3. Filtration (sand filter)\n4. Chlorination (kill bacteria)\n• Water pollution: sewage, industrial waste, oil spills\n• Air pollution: SO₂ (acid rain), CO (toxic), CO₂ (greenhouse)",
      tip: "Temporary hardness is caused by dissolved Ca(HCO₃)₂ — boiling decomposes it to insoluble CaCO₃."
    },
    {
      category: "Industrial Chemistry",
      title: "Industrial Processes",
      formula: "Haber Process: N₂+3H₂ ⇌ 2NH₃ (450°C, 200atm, Fe catalyst)\nContact Process: 2SO₂+O₂ ⇌ 2SO₃ (450°C, V₂O₅)\nSolvay Process: NaCl+NH₃+CO₂+H₂O → NaHCO₃+NH₄Cl",
      explanation: "Haber Process conditions:\n• Temperature: 450°C (compromise)\n• Pressure: 200 atm (favors product)\n• Catalyst: finely divided iron\n• Forward reaction is exothermic (ΔH < 0)\n• Contact Process makes H₂SO₄\n• Solvay Process makes Na₂CO₃ (soda ash)",
      tip: "In the Haber Process, lower temperature favors yield but slows rate — 450°C is a compromise."
    },

    // ─── TRANSITION METALS & QUALITATIVE ANALYSIS ─────────────
    {
      category: "Transition Metals",
      title: "Properties & Colour of Compounds",
      formula: "Variable oxidation states\nColoured compounds\nCatalytic activity\nComplex ion formation",
      explanation: "Common colours:\n• Cu²⁺: blue; Fe²⁺: green; Fe³⁺: brown/yellow\n• MnO₄⁻: purple; Cr₂O₇²⁻: orange; CrO₄²⁻: yellow\n• [Cu(NH₃)₄]²⁺: deep blue\n• Precipitates with NaOH:\n  Cu²⁺→blue ppt; Fe²⁺→green ppt (turns brown); Fe³⁺→reddish-brown ppt\n  Zn²⁺→white ppt (dissolves in excess); Al³⁺→white ppt (dissolves in excess)",
      tip: "Fe(OH)₂ (green) slowly turns brown in air as Fe²⁺ oxidizes to Fe³⁺."
    },
    {
      category: "Qualitative Analysis",
      title: "Gas Tests & Ion Identification",
      formula: "H₂: burns with pop sound\nO₂: relights glowing splint\nCO₂: turns limewater milky\nNH₃: turns moist red litmus blue\nCl₂: bleaches moist litmus\nSO₂: decolorizes KMnO₄/K₂Cr₂O₇",
      explanation: "Anion tests:\n• Cl⁻: AgNO₃ → white ppt (soluble in NH₃)\n• Br⁻: AgNO₃ → cream ppt\n• I⁻: AgNO₃ → yellow ppt\n• SO₄²⁻: BaCl₂ → white ppt\n• CO₃²⁻: acid → effervescence (CO₂)\n• NO₃⁻: brown ring test",
      tip: "Distinguish CO₂ from SO₂: both turn limewater milky, but only SO₂ decolorizes acidified KMnO₄."
    },

    // ─── NUCLEAR & RADIOACTIVITY ──────────────────────────────
    {
      category: "Nuclear Chemistry",
      title: "Radioactivity & Nuclear Equations",
      formula: "Alpha decay: ᴬZX → ᴬ⁻⁴Z₋₂Y + ⁴₂He\nBeta decay: ᴬZX → ᴬZ₊₁Y + ⁰₋₁e\nHalf-life: N = N₀(½)^(t/T½)\nNuclear fission vs fusion",
      explanation: "• Fission: heavy nucleus splits (e.g. U-235 in nuclear reactors)\n• Fusion: light nuclei combine (e.g. H→He in the sun)\n• Fusion releases more energy per unit mass\n• Applications of radioisotopes:\n  Medicine: Co-60 (cancer treatment)\n  Agriculture: C-14 (carbon dating)\n  Industry: thickness measurement",
      tip: "Carbon-14 dating is used for organic materials up to ~50,000 years old."
    }
  ],

  Biology: [
    // ─── GENETICS ─────────────────────────────────────────────
    {
      category: "Genetics",
      title: "Mendelian Inheritance Ratios",
      formula: "Monohybrid F2 Phenotypic: 3:1\nMonohybrid F2 Genotypic: 1:2:1\nDihybrid F2 Phenotypic: 9:3:3:1\nTest Cross: 1:1 (heterozygous × homozygous recessive)",
      explanation: "• Law of Segregation: alleles separate during gamete formation\n• Law of Independent Assortment: genes on different chromosomes assort independently\n• Co-dominance: 1:2:1 in F2 (both alleles expressed)\n• Incomplete dominance: blending of phenotypes",
      tip: "Cross carrier female (X^H X^h) × normal male (X^H Y): 25% haemophilic sons, 0% haemophilic daughters."
    },
    {
      category: "Genetics",
      title: "ABO Blood Groups & Genotypes",
      formula: "Alleles: Iᴬ, Iᴮ, i\nGroup A: IᴬIᴬ or Iᴬi\nGroup B: IᴮIᴮ or Iᴮi\nGroup AB: IᴬIᴮ (co-dominant)\nGroup O: ii (recessive)",
      explanation: "• Universal Donor: O Rh-negative\n• Universal Recipient: AB Rh-positive\n• Rh incompatibility: Rh- mother + Rh+ fetus → erythroblastosis fetalis (2nd pregnancy)\n• Sickle Cell: HbAHbA (normal), HbAHbS (carrier/trait), HbSHbS (sickle cell anemia)",
      tip: "Individuals with HbAHbS genotype have resistance to malaria (selective advantage)."
    },
    {
      category: "Genetics",
      title: "Sex Determination & Sex-Linked Inheritance",
      formula: "Male: XY (heterogametic)\nFemale: XX (homogametic)\nSex-linked: genes on X chromosome\nColour blindness, Haemophilia: X-linked recessive",
      explanation: "• Males are more likely to express X-linked recessive traits\n• Carrier female: heterozygous (X^H X^h)\n• Affected female: homozygous recessive (X^h X^h) — rare\n• Y-linked traits: passed only father to son (e.g., hairy ear pinna)\n• Barr body: inactivated X chromosome in females",
      tip: "A carrier mother has a 50% chance of passing the recessive allele to each child."
    },
    {
      category: "Genetics",
      title: "Mutations & Genetic Variation",
      formula: "Gene mutation: change in DNA base sequence\nChromosomal mutation: change in chromosome structure/number\nDown Syndrome: Trisomy 21 (47 chromosomes)\nTurner Syndrome: XO (45 chromosomes)",
      explanation: "Types of mutations:\n• Point mutation: substitution, insertion, deletion\n• Chromosomal: translocation, inversion, duplication, deletion\n• Polyploidy: multiple chromosome sets (3n, 4n)\n• Causes: radiation, chemicals (mutagens), errors in replication\n• Most mutations are harmful; rare beneficial ones drive evolution",
      tip: "Sickle cell anemia is caused by a single point mutation: glutamic acid → valine in hemoglobin."
    },
    {
      category: "Genetics",
      title: "DNA Structure & Protein Synthesis",
      formula: "DNA: double helix, A=T, G≡C\nRNA: single strand, A=U, G≡C\nCodon: 3 bases code for 1 amino acid\n64 codons: 61 coding + 3 stop codons",
      explanation: "Protein synthesis:\n1. Transcription: DNA → mRNA (in nucleus)\n2. Translation: mRNA → protein (on ribosomes)\n• mRNA carries genetic code to ribosomes\n• tRNA brings amino acids\n• rRNA forms ribosomes\n• Start codon: AUG (methionine)\n• Stop codons: UAA, UAG, UGA",
      tip: "DNA replication is semi-conservative — each new DNA molecule has one old and one new strand."
    },

    // ─── CELL BIOLOGY ─────────────────────────────────────────
    {
      category: "Cell Biology",
      title: "Cell Structure & Organelles",
      formula: "Cell = Cell membrane + Cytoplasm + Nucleus\nPlant cell extras: Cell wall, Chloroplasts, Large vacuole\nAnimal cell: Centrioles, no cell wall",
      explanation: "Organelle functions:\n• Nucleus: DNA, controls cell activities\n• Mitochondria: aerobic respiration (powerhouse)\n• Ribosomes: protein synthesis\n• ER (rough): protein transport; (smooth): lipid synthesis\n• Golgi body: packaging and secretion\n• Lysosomes: digestion of worn-out organelles\n• Chloroplasts: photosynthesis (plants only)",
      tip: "Mitochondria and chloroplasts have their own DNA — evidence for endosymbiotic theory."
    },
    {
      category: "Cell Biology",
      title: "Cell Division — Mitosis & Meiosis",
      formula: "Mitosis: 2n → 2n (2 identical cells)\nMeiosis: 2n → n (4 genetically different cells)\nMitosis: growth & repair\nMeiosis: gamete formation",
      explanation: "Mitosis stages: PMAT (Prophase, Metaphase, Anaphase, Telophase)\nMeiosis differences:\n• Two divisions (meiosis I and II)\n• Crossing over in prophase I\n• Independent assortment\n• Results in genetic variation\n• Reduces chromosome number by half",
      tip: "Meiosis produces HAPLOID cells (gametes); mitosis produces DIPLOID cells."
    },
    {
      category: "Cell Biology",
      title: "Enzymes & Their Properties",
      formula: "Lock and Key model: enzyme + substrate → enzyme-substrate complex\nOptimum temperature: ~37°C (body enzymes)\nOptimum pH varies: pepsin (pH 2), trypsin (pH 8)",
      explanation: "Properties of enzymes:\n• Biological catalysts (proteins)\n• Specific: each enzyme acts on one substrate\n• Not consumed in reaction (reusable)\n• Affected by temperature, pH, substrate concentration\n• Denatured by extreme heat or pH\n• Inhibitors: competitive and non-competitive",
      tip: "Enzymes lower the activation energy of reactions without being consumed."
    },
    {
      category: "Cell Biology",
      title: "Transport Across Cell Membranes",
      formula: "Diffusion: high → low concentration (passive)\nOsmosis: water from dilute → concentrated (passive)\nActive transport: low → high (requires ATP)\nWater potential: Ψ = Ψs + Ψp",
      explanation: "• Plasmolysis: plant cell in hypertonic solution\n• Turgidity: plant cell in hypotonic solution\n• Crenation: animal cell in hypertonic solution\n• Haemolysis: animal cell in hypotonic solution (bursts)\n• Facilitated diffusion: through channel proteins (passive)\n• Endocytosis/Exocytosis: bulk transport",
      tip: "Plasmolysis occurs when water exits a plant cell by osmosis — the cytoplasm shrinks from the cell wall."
    },

    // ─── RESPIRATION & PHOTOSYNTHESIS ─────────────────────────
    {
      category: "Metabolism",
      title: "Respiration — Aerobic & Anaerobic",
      formula: "Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP\nAnaerobic (yeast): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP\nAnaerobic (muscle): C₆H₁₂O₆ → 2C₃H₆O₃ (lactic acid) + 2 ATP\nRQ = CO₂ produced / O₂ consumed",
      explanation: "RQ values:\n• Carbohydrates: RQ = 1.0\n• Proteins: RQ = 0.8\n• Fats: RQ = 0.7\n• Stages: Glycolysis (cytoplasm) → Krebs cycle (matrix) → ETC (cristae)\n• ATP: universal energy currency of the cell",
      tip: "Aerobic respiration produces 38 ATP per glucose vs only 2 ATP in anaerobic."
    },
    {
      category: "Metabolism",
      title: "Photosynthesis — Light & Dark Reactions",
      formula: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light energy, chlorophyll)\nLight reaction: H₂O → O₂ + H⁺ + e⁻ (thylakoids)\nDark reaction (Calvin cycle): CO₂ fixation (stroma)",
      explanation: "Factors affecting rate:\n• Light intensity: ↑rate up to saturation\n• CO₂ concentration: ↑rate up to saturation\n• Temperature: optimum ~25-35°C\n• Chlorophyll: green pigment absorbs red & blue light\n• Compensation point: rate of photosynthesis = rate of respiration",
      tip: "At the compensation point, all O₂ produced is used for respiration — no net gas exchange."
    },

    // ─── ECOLOGY ──────────────────────────────────────────────
    {
      category: "Ecology",
      title: "Population & Mark-Recapture",
      formula: "Population Density = Total Population/Area\nLincoln Index: N = (M×C)/R\nGrowth rate = (Births-Deaths)/Time\nCarrying capacity: maximum sustainable population",
      explanation: "• N = estimated total population\n• M = marked animals released\n• C = total recaptured in 2nd sample\n• R = marked recaptured\n• Assumptions: no births, deaths, immigration, emigration between samples\n• Lindeman's 10% rule: only 10% energy transfers between trophic levels",
      tip: "Food chains rarely exceed 4-5 links because 90% of energy is lost as heat at each level."
    },
    {
      category: "Ecology",
      title: "Food Chains, Webs & Trophic Levels",
      formula: "Producer → Primary Consumer → Secondary Consumer → Tertiary Consumer\nEnergy flow: Sun → Producers → Consumers → Decomposers\nPyramid of Numbers/Biomass/Energy",
      explanation: "• Producers: autotrophs (plants, algae)\n• Primary consumers: herbivores\n• Secondary consumers: carnivores (eat herbivores)\n• Tertiary consumers: top predators\n• Decomposers: bacteria, fungi (nutrient recycling)\n• Carbon cycle, Nitrogen cycle, Water cycle",
      tip: "Pyramid of energy is ALWAYS upright; pyramids of numbers and biomass can be inverted."
    },
    {
      category: "Ecology",
      title: "Ecological Succession & Biomes",
      formula: "Primary succession: bare rock → climax community\nSecondary succession: disturbed area → climax community\nPioneer species → intermediate species → climax species",
      explanation: "Nigerian biomes:\n• Mangrove/Swamp forest: coastal, salt-tolerant\n• Tropical rainforest: south, high rainfall, biodiversity\n• Guinea savanna: middle belt\n• Sudan savanna: north\n• Sahel savanna: far north, near desert\n• Each biome has characteristic plants and animals",
      tip: "Pioneer species (lichens, mosses) are the first colonizers — they modify the environment for later species."
    },
    {
      category: "Ecology",
      title: "Nutrient Cycling — Carbon & Nitrogen",
      formula: "Carbon cycle: Photosynthesis ↔ Respiration + Combustion + Decomposition\nNitrogen cycle: N₂ → NH₃ → NO₂⁻ → NO₃⁻ → Plant protein\nNitrogen fixation: N₂ → NH₃ (Rhizobium, lightning, Haber process)",
      explanation: "Nitrogen cycle bacteria:\n• Nitrogen-fixing: Rhizobium (legume root nodules), Azotobacter\n• Nitrifying: Nitrosomonas (NH₃→NO₂⁻), Nitrobacter (NO₂⁻→NO₃⁻)\n• Denitrifying: Pseudomonas (NO₃⁻→N₂)\n• Decomposers: break down dead organisms → NH₃",
      tip: "Legumes (beans, groundnuts) have nitrogen-fixing Rhizobium bacteria in their root nodules."
    },
    {
      category: "Ecology",
      title: "Conservation & Environmental Pollution",
      formula: "Pollution types: Air, Water, Land, Noise\nGreenhouse effect: CO₂, CH₃ trap heat\nOzone depletion: CFCs destroy O₃\nAcid rain: SO₂ + NO₂ + H₂O → H₂SO₄ + HNO₃",
      explanation: "Conservation strategies:\n• Game reserves, National parks\n• Afforestation/Reforestation\n• Controlled burning\n• Wildlife protection laws\n• Sustainable farming\n• Water treatment before discharge\n• Biological indicators of pollution",
      tip: "Eutrophication: excess nutrients → algal bloom → decomposition → oxygen depletion → fish death."
    },

    // ─── HUMAN BIOLOGY ────────────────────────────────────────
    {
      category: "Human Biology",
      title: "Digestive System & Enzymes",
      formula: "Starch → Maltose → Glucose (amylase, maltase)\nProtein → Peptides → Amino acids (pepsin, trypsin, peptidase)\nFats → Fatty acids + Glycerol (lipase)\nBile: emulsifies fats (not an enzyme)",
      explanation: "• Mouth: salivary amylase (pH 7)\n• Stomach: pepsin + HCl (pH 2)\n• Duodenum: pancreatic enzymes + bile\n• Ileum: final digestion + absorption (villi)\n• Large intestine: water absorption\n• Villi increase surface area for absorption",
      tip: "Bile is NOT an enzyme — it emulsifies fats into smaller droplets to increase surface area for lipase."
    },
    {
      category: "Human Biology",
      title: "Circulatory System & Heart",
      formula: "Cardiac output = Stroke volume × Heart rate\nBlood flow: Body→Vena cava→Right atrium→Right ventricle→Pulmonary artery→Lungs→Pulmonary vein→Left atrium→Left ventricle→Aorta→Body",
      explanation: "Blood components:\n• Red blood cells: carry O₂ (haemoglobin)\n• White blood cells: immune defence (phagocytes, lymphocytes)\n• Platelets: blood clotting\n• Plasma: transport of dissolved substances\n• Arteries: thick walls, carry blood AWAY from heart\n• Veins: thin walls, valves, carry blood TO heart\n• Capillaries: one cell thick, exchange of materials",
      tip: "Arteries carry oxygenated blood EXCEPT the pulmonary artery. Veins carry deoxygenated blood EXCEPT the pulmonary vein."
    },
    {
      category: "Human Biology",
      title: "Respiratory System & Gas Exchange",
      formula: "Breathing rate × Tidal volume = Ventilation rate\nInspiration: diaphragm contracts (flattens), ribs move up\nExpiration: diaphragm relaxes (domes), ribs move down",
      explanation: "Gas exchange in alveoli:\n• Large surface area (300 million alveoli)\n• Thin walls (one cell thick)\n• Rich blood supply\n• Moist surface\n• Concentration gradient maintained\n• O₂: alveoli → blood; CO₂: blood → alveoli\n• Haemoglobin + O₂ ⇌ Oxyhaemoglobin",
      tip: "Carbon monoxide (CO) binds to haemoglobin 200× more strongly than oxygen, causing CO poisoning."
    },
    {
      category: "Human Biology",
      title: "Excretory System & Kidney Function",
      formula: "Nephron: Bowman's capsule → PCT → Loop of Henle → DCT → Collecting duct\nGlomerular filtration → Selective reabsorption → Secretion → Excretion",
      explanation: "• Ultrafiltration: blood filtered at glomerulus (small molecules pass)\n• Reabsorption: glucose, amino acids, water, salts reabsorbed in tubules\n• Excretion: urine = water + urea + salts\n• ADH: controls water reabsorption (more ADH = more water reabsorbed)\n• Dialysis: artificial kidney for kidney failure\n• Osmoregulation: maintaining constant water/salt balance",
      tip: "Glucose in urine (glycosuria) indicates diabetes mellitus — glucose concentration exceeds renal threshold."
    },
    {
      category: "Human Biology",
      title: "Nervous System & Reflex Actions",
      formula: "Reflex arc: Receptor → Sensory neuron → Relay neuron → Motor neuron → Effector\nSynapse: electrical impulse → chemical transmission (neurotransmitter)\nBrain: cerebrum, cerebellum, medulla oblongata",
      explanation: "• Sensory neurons: carry impulses FROM receptors to CNS\n• Motor neurons: carry impulses FROM CNS to effectors\n• Relay neurons: connect sensory and motor neurons in spinal cord\n• Reflexes: involuntary, rapid, protective\n• Synapse: tiny gap, one-way transmission via neurotransmitter (e.g. acetylcholine)",
      tip: "Reflex actions are involuntary and don't involve the brain — they're controlled by the spinal cord."
    },
    {
      category: "Human Biology",
      title: "Endocrine System & Hormones",
      formula: "Insulin: lowers blood glucose (pancreas)\nGlucagon: raises blood glucose (pancreas)\nAdrenaline: fight-or-flight (adrenal glands)\nThyroxine: metabolic rate (thyroid)\nGrowth hormone: growth (pituitary)",
      explanation: "• Hormones: chemical messengers in blood\n• Slower but longer-lasting than nervous system\n• Diabetes mellitus: insufficient insulin production\n• Goitre: iodine deficiency → enlarged thyroid\n• Pituitary: master gland (controls other glands)\n• Feedback mechanisms: negative feedback maintains homeostasis",
      tip: "Type 1 diabetes: pancreas produces no insulin. Type 2 diabetes: body cells don't respond to insulin."
    },
    {
      category: "Human Biology",
      title: "Reproductive System & Development",
      formula: "Menstrual cycle: ~28 days\nFSH → follicle development\nLH → ovulation (day 14)\nOestrogen → uterine lining thickens\nProgesterone → maintains uterine lining",
      explanation: "• Fertilization: sperm + egg → zygote (in fallopian tube)\n• Implantation: blastocyst embeds in uterine wall\n• Placenta: exchange of materials, produces HCG\n• Gestation: ~40 weeks (280 days)\n• Contraception: barrier, hormonal, natural methods\n• STIs: HIV/AIDS, gonorrhoea, syphilis",
      tip: "Identical twins result from ONE fertilized egg splitting. Fraternal twins from TWO separate eggs."
    },

    // ─── PLANT BIOLOGY ────────────────────────────────────────
    {
      category: "Plant Biology",
      title: "Transport in Plants — Xylem & Phloem",
      formula: "Transpiration: water loss from leaves (stomata)\nTranspiration pull: creates negative pressure\nRoot pressure: pushes water up\nTranslocation: transport of sucrose in phloem",
      explanation: "• Xylem: dead cells, thick walls, carries water+minerals UP (one-way)\n• Phloem: living cells, carries organic solutes UP and DOWN (two-way)\n• Transpiration factors: temperature, humidity, wind, light\n• Potometer: measures transpiration rate\n• Cohesion-tension theory: explains water transport in tall trees",
      tip: "Stomata open during the day (for photosynthesis) and close at night, reducing water loss."
    },
    {
      category: "Plant Biology",
      title: "Plant Growth & Hormones",
      formula: "Auxins: promote cell elongation, phototropism, geotropism\nGibberellins: stem elongation, seed germination\nCytokinins: cell division\nEthylene: fruit ripening\nAbscisic acid: dormancy, stomatal closure",
      explanation: "Tropisms:\n• Phototropism: growth toward/away from light\n  - Shoot: positive (toward light)\n  - Root: negative (away from light)\n• Geotropism: response to gravity\n  - Shoot: negative (away from gravity)\n  - Root: positive (toward gravity)\n• Auxin redistributes to shaded side → unequal growth",
      tip: "Auxin on the shaded side of a stem causes more elongation, bending the shoot TOWARD the light."
    },
    {
      category: "Plant Biology",
      title: "Plant Reproduction & Seed Germination",
      formula: "Flower parts: Sepals, Petals, Stamens (♂), Carpels (♀)\nPollination → Fertilization → Seed → Fruit\nDouble fertilization: sperm+egg→zygote; sperm+polar nuclei→endosperm",
      explanation: "Pollination types:\n• Self-pollination: same flower or same plant\n• Cross-pollination: between different plants\n• Wind-pollinated: small, no scent, exposed anthers/stigma\n• Insect-pollinated: colourful, scented, nectar\n• Germination conditions: water, oxygen, warmth, (light for some)\n• Epigeal: cotyledons above ground; Hypogeal: below ground",
      tip: "Double fertilization is unique to flowering plants (angiosperms)."
    },

    // ─── CLASSIFICATION & EVOLUTION ───────────────────────────
    {
      category: "Classification",
      title: "Taxonomy & Five Kingdoms",
      formula: "Kingdom → Phylum → Class → Order → Family → Genus → Species\nMnemonic: King Philip Came Over For Good Spaghetti\nBinomial nomenclature: Genus species (e.g., Homo sapiens)",
      explanation: "Five Kingdoms:\n1. Monera: bacteria (prokaryotes)\n2. Protista: amoeba, paramecium (unicellular eukaryotes)\n3. Fungi: mushrooms, yeast (decomposers)\n4. Plantae: plants (autotrophs)\n5. Animalia: animals (heterotrophs)\n• Viruses are NOT classified in any kingdom (non-living)",
      tip: "Genus name is capitalized, species name is lowercase. Both are italicized: Homo sapiens."
    },
    {
      category: "Evolution",
      title: "Evolution & Natural Selection",
      formula: "Darwin's theory: Variation → Competition → Survival of fittest → Reproduction\nLamarck's theory: Use and disuse + Inheritance of acquired characteristics (DISPROVED)\nEvidence: fossils, comparative anatomy, embryology, biochemistry",
      explanation: "• Natural selection: organisms with favorable traits survive and reproduce\n• Adaptation: feature that increases survival\n• Speciation: formation of new species\n• Isolation: geographic, reproductive\n• Homologous structures: same origin, different function (evidence for evolution)\n• Analogous structures: different origin, same function (convergent evolution)",
      tip: "Lamarck's theory of inheritance of acquired characteristics has been disproved — you can't inherit a weightlifter's muscles."
    },

    // ─── DISEASES & IMMUNITY ──────────────────────────────────
    {
      category: "Health",
      title: "Diseases — Causes & Prevention",
      formula: "Pathogens: bacteria, viruses, fungi, protozoa\nVector-borne: malaria (Anopheles), sleeping sickness (tsetse fly)\nDeficiency: kwashiorkor (protein), scurvy (vitamin C), rickets (vitamin D)",
      explanation: "Prevention methods:\n• Vaccination: artificial active immunity\n• Hygiene: handwashing, clean water\n• Vector control: insecticides, mosquito nets\n• Quarantine: isolation of infected individuals\n• Antibiotics: kill bacteria (NOT viruses)\n• Antiretrovirals: manage HIV (don't cure)",
      tip: "Antibiotics work on BACTERIA only — they are ineffective against viral infections."
    },
    {
      category: "Health",
      title: "Immunity — Active & Passive",
      formula: "Active immunity: body makes own antibodies\nPassive immunity: receives ready-made antibodies\nNatural active: infection\nArtificial active: vaccination\nNatural passive: breast milk, placenta\nArtificial passive: antiserum injection",
      explanation: "• Antigens: foreign molecules that trigger immune response\n• Antibodies: proteins produced by lymphocytes (B cells)\n• Phagocytes: engulf and destroy pathogens (phagocytosis)\n• Memory cells: provide long-lasting immunity\n• HIV attacks T-helper cells → weakened immunity → AIDS",
      tip: "Active immunity is long-lasting (memory cells); passive immunity is short-lived (no memory)."
    }
  ],

  Economics: [
    // ─── MICROECONOMICS ───────────────────────────────────────
    {
      category: "Microeconomics",
      title: "Demand, Supply & Equilibrium",
      formula: "Demand Law: Price↑ → Quantity demanded↓\nSupply Law: Price↑ → Quantity supplied↑\nEquilibrium: Qd = Qs\nExcess demand: Qd > Qs (shortage)\nExcess supply: Qs > Qd (surplus)",
      explanation: "Shift factors:\n• Demand shifts: income, preferences, population, substitutes, complements, expectations\n• Supply shifts: input costs, technology, government policy, weather\n• Movement along curve: change in OWN price\n• Shift of curve: change in OTHER factors",
      tip: "A shift of the demand curve is caused by non-price factors. A movement along the curve is caused by price change."
    },
    {
      category: "Microeconomics",
      title: "Elasticities of Demand & Supply",
      formula: "PED = (%ΔQd)/(%ΔP) = (ΔQ/ΔP)·(P₁/Q₁)\nPES = (%ΔQs)/(%ΔP)\nYED = (%ΔQd)/(%ΔY)\nXED = (%ΔQₐ)/(%ΔP_b)",
      explanation: "• |PED| > 1: Elastic; |PED| < 1: Inelastic; |PED| = 1: Unitary\n• YED > 0: Normal good; YED < 0: Inferior good\n• XED > 0: Substitutes; XED < 0: Complements; XED = 0: Unrelated\n• Factors affecting PED: availability of substitutes, necessity vs luxury, proportion of income, time",
      tip: "Total revenue increases with price rise only when demand is INELASTIC (|PED| < 1)."
    },
    {
      category: "Microeconomics",
      title: "Consumer Theory — Utility & Indifference",
      formula: "Total Utility (TU) = Σ Marginal Utilities\nMarginal Utility (MU) = ΔTU/ΔQ\nLaw of Diminishing MU: MU decreases as consumption increases\nEquilibrium: MUₐ/Pₐ = MU_b/P_b",
      explanation: "• TU is maximized when MU = 0\n• Consumer surplus = what willing to pay - what actually paid\n• Budget line: shows combinations affordable\n• Indifference curve: shows combinations giving equal satisfaction\n• Equilibrium: point of tangency between budget line and highest IC",
      tip: "A rational consumer maximizes satisfaction by equalizing the marginal utility per naira across all goods."
    },
    {
      category: "Microeconomics",
      title: "Theory of Production & Costs",
      formula: "TC = TFC + TVC\nAC = TC/Q = AFC + AVC\nMC = ΔTC/ΔQ\nTR = P·Q\nAR = TR/Q = P\nMR = ΔTR/ΔQ",
      explanation: "Profit Maximization:\n• MC = MR (necessary condition)\n• MC cuts MR from below (sufficient condition)\n• Normal profit: TR = TC (AR = AC)\n• Shutdown (short run): P < AVC\n• Law of diminishing returns: adding more variable input eventually decreases marginal product",
      tip: "MC intersects AVC and AC at their MINIMUM points."
    },
    {
      category: "Microeconomics",
      title: "Market Structures",
      formula: "Perfect competition: many firms, identical products, P = MR = AR\nMonopoly: one firm, unique product, MR < AR\nOligopoly: few firms, interdependent\nMonopolistic competition: many firms, differentiated products",
      explanation: "Perfect competition:\n• Price taker, normal profit in long run\n• Free entry and exit\nMonopoly:\n• Price maker, supernormal profit possible in long run\n• Barriers to entry\n• MR < P (downward-sloping demand)\n• Deadweight loss (allocative inefficiency)",
      tip: "In perfect competition, firms are price TAKERS. In monopoly, the firm is a price MAKER."
    },
    {
      category: "Microeconomics",
      title: "Factor Markets — Wages & Rent",
      formula: "MRP = MPP × Price (Marginal Revenue Product)\nFirm hires until: MRP = Wage rate\nEconomic rent = Earnings - Transfer earnings\nQuasi-rent: short-run rent on fixed factors",
      explanation: "Wage determination:\n• Supply and demand for labour\n• Minimum wage: floor above equilibrium → unemployment\n• Trade unions: bargain for higher wages\n• Wage differentials: skills, training, risk, location\n• Monopsony: single buyer of labour → lower wages than competitive market",
      tip: "A minimum wage set BELOW the equilibrium wage has no effect on the market."
    },

    // ─── MACROECONOMICS ───────────────────────────────────────
    {
      category: "Macroeconomics",
      title: "National Income Accounting",
      formula: "GDP = C+I+G+(X-M)\nGNP = GDP+NFIA\nNNP = GNP-Depreciation\nNI = NNP at factor cost\nReal GDP = (Nominal GDP/Deflator)·100",
      explanation: "• C = Consumption; I = Investment; G = Government spending\n• X-M = Net exports\n• NFIA = Net Factor Income from Abroad\n• Personal Disposable Income = Personal Income - Direct Taxes\n• Transfer payments are EXCLUDED (no productive output)\n• Methods: Income, Output, Expenditure",
      tip: "Transfer payments (pensions, gifts, benefits) are EXCLUDED from national income — no productive output."
    },
    {
      category: "Macroeconomics",
      title: "Money, Banking & Inflation",
      formula: "Fisher's: MV = PT\nMultiplier: K = 1/MPS = 1/(1-MPC)\nMoney Multiplier: MM = 1/CRR\nInflation Rate = [(CPI₂-CPI₁)/CPI₁]·100%",
      explanation: "• MPC + MPS = 1\n• If MPC = 0.8: K = 1/0.2 = 5\n• Types of inflation: demand-pull, cost-push\n• Demand-pull: too much money chasing too few goods\n• Cost-push: rising production costs → higher prices\n• Hyperinflation: extremely rapid, excessive inflation",
      tip: "If government injects ₦100m where MPC=0.8, total income increases by ₦100m × 5 = ₦500m."
    },
    {
      category: "Macroeconomics",
      title: "Fiscal & Monetary Policy",
      formula: "Fiscal Policy: government spending and taxation\nBudget surplus: G < T (contractionary)\nBudget deficit: G > T (expansionary)\nMonetary Policy: money supply and interest rates",
      explanation: "Fiscal tools:\n• Taxation: direct (income tax) vs indirect (VAT)\n• Government spending\n• Progressive tax: higher income → higher rate\n• Regressive tax: takes larger % from lower income\nMonetary tools:\n• Open Market Operations: buy/sell government bonds\n• Reserve ratio: change required reserves\n• Interest rate: raise to contract, lower to expand",
      tip: "During recession, expansionary policy: ↑Government spending, ↓Taxes, ↓Interest rates, Buy bonds."
    },
    {
      category: "Macroeconomics",
      title: "International Trade & Balance of Payments",
      formula: "Absolute advantage: lower cost of production\nComparative advantage: lower opportunity cost\nBalance of Payments = Current Account + Capital Account + Financial Account\nTerms of Trade = (Export Price Index/Import Price Index)·100",
      explanation: "• Free trade: no restrictions\n• Protectionism: tariffs, quotas, subsidies, embargoes\n• Exchange rate: price of one currency in terms of another\n• Appreciation: currency value rises\n• Depreciation: currency value falls\n• WTO promotes free trade; ECOWAS for West Africa",
      tip: "A country should specialize in producing goods where it has the lowest opportunity cost (comparative advantage)."
    },
    {
      category: "Macroeconomics",
      title: "Economic Development & Growth",
      formula: "GDP growth rate = [(GDP₂-GDP₁)/GDP₁]·100%\nPer capita income = GDP/Population\nHDI = f(Life expectancy, Education, Income)\nGini coefficient: 0 = perfect equality, 1 = perfect inequality",
      explanation: "Indicators of development:\n• GDP per capita, literacy rate, life expectancy\n• Infant mortality rate, access to healthcare\n• Development challenges: poverty, inequality, corruption\n• Economic systems: capitalism, socialism, mixed economy\n• Nigeria: mixed economy with government intervention\n• Sources of government revenue: oil, taxes, customs duties",
      tip: "High GDP doesn't necessarily mean high development — distribution of income matters (Gini coefficient)."
    },
    {
      category: "Macroeconomics",
      title: "Unemployment — Types & Measures",
      formula: "Unemployment rate = (Unemployed/Labour force)·100%\nLabour force = Employed + Unemployed\nLabour force participation rate = (Labour force/Working age pop)·100%",
      explanation: "Types:\n• Frictional: between jobs (short-term)\n• Structural: skills mismatch, technological change\n• Cyclical: due to recession\n• Seasonal: due to seasons (farming, tourism)\n• Disguised: underemployment in agriculture\n• Consequences: loss of output, poverty, social problems\n• Phillips curve: inverse relationship between unemployment and inflation",
      tip: "Full employment does NOT mean 0% unemployment — it means only frictional and structural unemployment exist."
    },
    {
      category: "Macroeconomics",
      title: "Population & Labour Economics",
      formula: "Population growth rate = (Birth rate - Death rate) + Net migration\nDependency ratio = (Under 15 + Over 65) / (15-64) × 100%\nPopulation doubling time ≈ 70 / Growth rate %",
      explanation: "Malthusian theory:\n• Population grows geometrically; food grows arithmetically\n• Positive checks: famine, disease, war\n• Preventive checks: birth control\n• Demographic transition: high BR&DR → high BR, low DR → low BR&DR\n• Optimum population: max output per capita\n• Nigeria: large young population, high dependency ratio",
      tip: "Nigeria's population is growing faster than its food production — a Malthusian concern."
    },
    {
      category: "Macroeconomics",
      title: "Public Finance & Taxation",
      formula: "Tax revenue = Tax rate × Tax base\nCanons of taxation (Adam Smith): Equity, Certainty, Convenience, Economy\nLaffer curve: tax rate vs tax revenue (inverted U)",
      explanation: "Types of taxes:\n• Direct: income tax, company tax, capital gains tax\n• Indirect: VAT, customs duties, excise duties\n• Progressive: rate increases with income\n• Proportional: constant rate for all incomes\n• Regressive: rate decreases with income\n• Incidence of tax: who actually bears the burden",
      tip: "The incidence of indirect tax falls more on consumers when demand is inelastic."
    },

    // ─── NIGERIAN ECONOMY ─────────────────────────────────────
    {
      category: "Nigerian Economy",
      title: "Agriculture & Industrialization in Nigeria",
      formula: "Contribution of agriculture to GDP: ~25%\nContribution of oil: ~50% of government revenue\nContribution of services: ~50% of GDP",
      explanation: "Agricultural challenges:\n• Land tenure system, poor infrastructure\n• Insufficient mechanization, poor storage\n• Climate change, pests\nIndustrialization strategies:\n• Import substitution (ISI)\n• Export promotion\n• SAP (1986): structural adjustment programme\n• NEEDS, Vision 20:2020, ERGP\n• ECOWAS, AU: regional/continental cooperation",
      tip: "Nigeria's economy is still heavily dependent on crude oil — diversification is a major policy goal."
    },
    {
      category: "Nigerian Economy",
      title: "Money & Financial Institutions in Nigeria",
      formula: "CBN functions: issue currency, banker to government, lender of last resort, monetary policy\nCommercial banks: accept deposits, give loans\nDevelopment banks: long-term development finance",
      explanation: "Financial institutions:\n• Central Bank of Nigeria (CBN)\n• Commercial banks (First Bank, GTBank, Access, UBA)\n• Microfinance banks\n• Insurance companies\n• Nigerian Stock Exchange (NSE)\n• NDIC: insures depositors\n• Money market: short-term; Capital market: long-term",
      tip: "The CBN uses monetary policy tools (OMO, CRR, interest rate, moral suasion) to control money supply."
    }
  ],

  "Commercial & Accounts": [
    // ─── ACCOUNTING FUNDAMENTALS ──────────────────────────────
    {
      category: "Accounting",
      title: "Accounting Equation & Double Entry",
      formula: "Assets = Capital + Liabilities\nCapital = Assets - Liabilities\nWorking Capital = Current Assets - Current Liabilities\nCapital Employed = Total Assets - Current Liabilities",
      explanation: "Double Entry Rules:\n• Debit the receiver / Debit expenses & losses\n• Credit the giver / Credit gains & revenues\n• Every transaction has equal debit and credit entries\n• Trial balance: sum of debits = sum of credits",
      tip: "Drawings decrease Capital; Net Profit increases Capital."
    },
    {
      category: "Accounting",
      title: "Trading & Profit/Loss Account",
      formula: "COGS = Opening Stock + Net Purchases + Carriage In - Closing Stock\nGross Profit = Net Sales - COGS\nNet Profit = Gross Profit + Other Income - Expenses",
      explanation: "• Net Purchases = Purchases - Returns Outwards\n• Net Sales = Sales - Returns Inwards\n• Carriage Inwards: added to purchases (cost of goods)\n• Carriage Outwards: operating expense in P&L\n• Discount received: other income\n• Discount allowed: operating expense",
      tip: "Closing stock appears in both Trading Account (credit) and Balance Sheet (current asset)."
    },
    {
      category: "Accounting",
      title: "Balance Sheet Structure",
      formula: "Non-current Assets + Current Assets = Capital + Non-current Liabilities + Current Liabilities\nNet Assets = Total Assets - Total Liabilities = Owner's Equity",
      explanation: "Assets classification:\n• Non-current: land, buildings, equipment, vehicles (>1 year)\n• Current: stock, debtors, cash, bank, prepaid (≤1 year)\nLiabilities classification:\n• Non-current: long-term loans, mortgage (>1 year)\n• Current: creditors, bank overdraft, accruals (≤1 year)\n• Capital = Opening capital + Net profit - Drawings",
      tip: "A bank overdraft is a CURRENT LIABILITY; a bank balance is a CURRENT ASSET."
    },
    {
      category: "Accounting",
      title: "Adjustments — Accruals & Prepayments",
      formula: "Adjusted expense = Cash paid - Prepaid + Accrued\nPrepayment: paid in advance (current asset)\nAccrual: owed but not yet paid (current liability)",
      explanation: "• Prepaid rent: shows as current asset on balance sheet\n• Accrued wages: shows as current liability\n• Matching principle: expenses matched to revenue period\n• Provision for bad debts: estimated unrecoverable debts\n• Bad debts written off: debited to P&L as expense\n• Increase in provision: expense; Decrease: income",
      tip: "If rent paid is ₦120,000 but ₦20,000 is for next year: P&L shows ₦100,000, BS shows ₦20,000 prepaid."
    },

    // ─── FINANCIAL RATIOS ─────────────────────────────────────
    {
      category: "Financial Ratios",
      title: "Liquidity & Profitability Ratios",
      formula: "Current Ratio = CA/CL (ideal: 2:1)\nQuick Ratio = (CA-Stock)/CL (ideal: 1:1)\nGP Margin = (GP/Sales)·100%\nNP Margin = (NP/Sales)·100%\nROCE = (Operating Profit/Capital Employed)·100%",
      explanation: "• Stock Turnover = COGS/Average Stock\n• Average Stock = (Opening+Closing)/2\n• Debtors Collection = (Debtors/Credit Sales)·365\n• Creditors Payment = (Creditors/Credit Purchases)·365\n• Gearing = (Long-term Liabilities/Capital Employed)·100%",
      tip: "Quick Ratio excludes stock because stock cannot be instantly converted to cash."
    },
    {
      category: "Financial Ratios",
      title: "Investment & Efficiency Ratios",
      formula: "EPS = Net Profit / Number of Shares\nDividend per share = Total Dividends / Number of Shares\nDividend yield = (DPS/Market Price)·100%\nP/E Ratio = Market Price / EPS\nAsset Turnover = Sales / Total Assets",
      explanation: "• Higher P/E = higher growth expectations\n• Dividend cover = EPS / DPS\n• Return on equity = (NP/Shareholders' equity)·100%\n• Break-even = Fixed Costs / (SP - VC per unit)\n• Margin of safety = Actual sales - Break-even sales",
      tip: "P/E ratio indicates how much investors are willing to pay per ₦1 of earnings."
    },

    // ─── DEPRECIATION ─────────────────────────────────────────
    {
      category: "Depreciation",
      title: "Straight-Line & Reducing Balance",
      formula: "Straight Line: Dep = (Cost-Scrap)/Useful Life\nReducing Balance: Dep = Book Value × Rate%\nNBV = Cost - Accumulated Depreciation",
      explanation: "• Straight-line: equal charge every year\n• Reducing balance: higher in early years\n• Revaluation method: for small items (tools)\n  Depreciation = Opening value + Additions - Closing value\n• Profit/Loss on disposal = Proceeds - NBV at date of sale\n• Land does NOT depreciate",
      tip: "Land does NOT depreciate. Buildings DO depreciate."
    },

    // ─── PARTNERSHIP ACCOUNTS ─────────────────────────────────
    {
      category: "Partnership",
      title: "Partnership Appropriation Account",
      formula: "Net Profit → Interest on capital → Salary → Residual profit shared in PSR\nPartner's Current Account: Capital + Salary + Interest + Share of profit - Drawings - Interest on drawings",
      explanation: "• Partnership deed: agreement specifying terms\n• Profit sharing ratio (PSR): agreed ratio\n• Interest on capital: compensation for investment\n• Partner's salary: compensation for extra work\n• Interest on drawings: penalty for withdrawals\n• If no deed: profits shared equally, no interest/salary",
      tip: "In the absence of a partnership agreement, profits and losses are shared EQUALLY."
    },
    {
      category: "Partnership",
      title: "Admission, Retirement & Dissolution",
      formula: "Goodwill = average super-profit × number of years\nSuper-profit = Actual profit - Normal profit\nRevaluation: assets revalued, gain/loss shared in OLD ratio",
      explanation: "Admission of partner:\n1. Revalue assets and liabilities\n2. Calculate and record goodwill\n3. Adjust capital accounts\nRetirement:\n1. Revalue assets\n2. Calculate goodwill\n3. Pay retiring partner\nDissolution: all assets sold, liabilities paid, balance distributed",
      tip: "Goodwill is shared in the OLD ratio when a new partner is admitted."
    },

    // ─── COMPANY ACCOUNTS ─────────────────────────────────────
    {
      category: "Company Accounts",
      title: "Share Capital & Debentures",
      formula: "Authorized (Nominal) capital: maximum allowed\nIssued capital: shares actually issued\nPaid-up capital: amount paid by shareholders\nShare premium: excess paid over nominal value",
      explanation: "Types of shares:\n• Ordinary shares: voting rights, variable dividends\n• Preference shares: fixed dividend, priority in liquidation\n• Cumulative preference: unpaid dividends accumulate\n• Debentures: loan capital, fixed interest, NOT ownership\n• Retained earnings: undistributed profits\n• Reserves: capital reserve (non-distributable) + revenue reserve (distributable)",
      tip: "Debenture holders are CREDITORS, not owners. They receive interest regardless of profit."
    },
    {
      category: "Company Accounts",
      title: "Published Accounts & Standards",
      formula: "Directors' report + Income statement + Balance sheet + Cash flow statement + Notes\nIFRS / IAS: International accounting standards\nNAS / SAS: Nigerian standards",
      explanation: "Accounting concepts:\n• Going concern: business continues operating\n• Accruals/Matching: recognize when earned/incurred\n• Prudence/Conservatism: anticipate losses, not gains\n• Consistency: same methods year to year\n• Materiality: significant items disclosed separately\n• Business entity: separate from owner",
      tip: "The going concern concept assumes the business will continue operating — assets valued at cost, not liquidation value."
    },

    // ─── COST ACCOUNTING ──────────────────────────────────────
    {
      category: "Cost Accounting",
      title: "Cost Classification & Break-Even",
      formula: "Total Cost = Fixed Cost + Variable Cost\nBreak-Even Quantity = FC/(SP-VC per unit)\nBreak-Even Revenue = FC/Contribution margin ratio\nContribution = SP - VC per unit\nMargin of Safety = Actual - Break-even",
      explanation: "Cost classification:\n• By nature: materials, labour, overheads\n• By behaviour: fixed, variable, semi-variable\n• By function: production, administration, selling\n• Direct costs: traceable to product\n• Indirect costs (overheads): not directly traceable\n• Contribution per unit = SP - VC",
      tip: "At break-even point, total revenue = total costs, so profit = 0."
    },
    {
      category: "Cost Accounting",
      title: "Budgeting & Variance Analysis",
      formula: "Variance = Actual - Budget\nFavourable: actual better than budget\nAdverse/Unfavourable: actual worse than budget\nFlexible budget: adjusted for actual activity level",
      explanation: "Types of budgets:\n• Sales budget, Production budget, Cash budget\n• Master budget: summary of all budgets\n• Fixed budget: based on one activity level\n• Flexible budget: adjusted for actual output\n• Zero-based budgeting: justify every expense from zero\n• Cash budget: tracks cash inflows and outflows",
      tip: "A favourable sales variance means actual sales exceeded budgeted sales."
    },

    // ─── COMMERCE & TRADE ─────────────────────────────────────
    {
      category: "Commerce",
      title: "Trade & Commerce Fundamentals",
      formula: "Commerce = Trade + Aids to Trade\nTrade = Home trade + International trade\nAids: Banking, Insurance, Transport, Advertising, Warehousing, Communication",
      explanation: "Types of trade:\n• Wholesale: buys in bulk from manufacturers, sells to retailers\n• Retail: sells to final consumers\n• E-commerce: buying and selling online\n• Chain of distribution: Manufacturer → Wholesaler → Retailer → Consumer\n• Functions of middlemen: break bulk, storage, transport, credit",
      tip: "Some manufacturers sell directly to consumers (direct marketing), eliminating middlemen."
    },
    {
      category: "Commerce",
      title: "Business Organizations",
      formula: "Sole proprietorship → Partnership → Private Ltd (Ltd) → Public Ltd (PLC)\nCooperative societies: formed by members with common interest\nPublic corporations: owned by government",
      explanation: "Features:\n• Sole trader: unlimited liability, easy to form\n• Partnership: 2-20 partners, partnership deed\n• Private Ltd: limited liability, cannot sell shares publicly\n• PLC: limited liability, shares traded on stock exchange\n• Cooperative: one member one vote, shared profits\n• Public corporation: government-owned, provides essential services",
      tip: "Limited liability means shareholders can only lose the amount they invested — personal assets are protected."
    },
    {
      category: "Commerce",
      title: "Insurance Principles",
      formula: "Premium: amount paid for insurance cover\nIndemnity: compensation for actual loss (not profit)\nSubrogation: insurer takes rights after claim payment\nContribution: multiple insurers share the loss",
      explanation: "Principles of insurance:\n1. Utmost good faith: disclose all material facts\n2. Insurable interest: must have financial interest\n3. Indemnity: restore to position before loss\n4. Proximate cause: nearest cause of loss\n5. Subrogation: insurer assumes rights\n6. Contribution: sharing between multiple insurers\n• Life assurance: not indemnity (pays agreed sum)",
      tip: "Life ASSURANCE pays a guaranteed sum; general INSURANCE indemnifies for actual loss."
    },
    {
      category: "Commerce",
      title: "Banking Services & Instruments",
      formula: "Cheque: written order to bank to pay\nBank draft: guaranteed payment instrument\nStanding order: regular fixed payments\nDirect debit: variable regular payments",
      explanation: "Banking services:\n• Current account: frequent transactions, cheque book\n• Savings account: interest-bearing, limited withdrawals\n• Fixed deposit: higher interest, locked for period\n• Overdraft: spending beyond balance (short-term loan)\n• Letter of credit: guarantees payment in international trade\n• ATM, POS, mobile banking, internet banking",
      tip: "A crossed cheque must be paid into a bank account — it cannot be cashed over the counter."
    },
    {
      category: "Commerce",
      title: "International Trade Documents",
      formula: "Bill of lading: shipping document (receipt)\nInvoice: list of goods and prices\nBill of exchange: written promise to pay\nLetter of credit: bank guarantee of payment\nCertificate of origin: proves country of manufacture",
      explanation: "Terms of trade:\n• FOB (Free on Board): seller pays until goods loaded\n• CIF (Cost, Insurance, Freight): seller pays until destination port\n• Ex-works: buyer pays all costs from factory\n• Trade barriers: tariffs, quotas, subsidies, embargoes\n• Free trade zones: areas with reduced trade restrictions",
      tip: "Under FOB terms, risk transfers to the buyer once goods are loaded on the ship."
    }
  ],

  "Use of English": [
    // ─── CONCORD RULES ────────────────────────────────────────
    {
      category: "Concord",
      title: "Subject-Verb Agreement (Golden Rules)",
      formula: "Subject-Verb Agreement: singular subject → singular verb; plural subject → plural verb",
      explanation: "1. Proximity: 'Either...or' / 'Neither...nor' — verb agrees with CLOSER subject\n   'Neither the teacher nor the students WERE present'\n2. Accompaniment: 'as well as', 'together with', 'alongside' don't make subject plural\n   'The president, alongside his ministers, IS travelling'\n3. Indefinite pronouns: 'everyone', 'nobody', 'each', 'either' take SINGULAR verbs\n4. Collective nouns (unit): 'The committee HAS submitted its report'",
      tip: "'More than one candidate HAS failed the test' — singular verb with 'more than one'!"
    },
    {
      category: "Concord",
      title: "Concord with Quantities & Amounts",
      formula: "Amount of money/time/distance (single unit) → singular verb\nNumber of + plural noun → plural verb\nA number of → plural; The number of → singular",
      explanation: "• 'Ten thousand naira IS not enough' (single amount)\n• 'Five kilometres IS a long distance' (single measurement)\n• 'A number of students WERE present' (several students)\n• 'The number of students WAS large' (the total number)\n• 'All the water IS gone' (uncountable → singular)\n• 'All the books ARE here' (countable → plural)",
      tip: "'The news IS good' — 'news' is uncountable and takes a singular verb."
    },
    {
      category: "Concord",
      title: "Concord with Titles, Subjects & None",
      formula: "Titles of books, films = singular: 'Things Fall Apart IS a novel'\nSubjects: 'Mathematics IS interesting'; 'Economics IS useful'\nNone: 'None of them WAS present' (singular, formal)",
      explanation: "• Diseases: 'Measles IS common among children'\n• Games: 'Draughts IS a board game'\n• Countries: 'The United States IS a superpower'\n• 'Politics IS a dirty game' (as a subject)\n• 'His politics ARE questionable' (as views/beliefs)\n• 'The scissors ARE on the table' (always plural)",
      tip: "Words like scissors, trousers, spectacles, pliers are ALWAYS plural — 'a pair of scissors IS on the table'."
    },

    // ─── TENSES ───────────────────────────────────────────────
    {
      category: "Tenses",
      title: "Verb Tenses — Forms & Usage",
      formula: "Simple Present: He writes\nPresent Continuous: He is writing\nPresent Perfect: He has written\nSimple Past: He wrote\nPast Perfect: He had written (before another past event)\nFuture: He will write",
      explanation: "Common errors:\n• 'He has GONE' (not 'has went')\n• 'She CAME yesterday' (not 'has came')\n• 'I HAVE BEEN waiting since morning' (not 'am waiting since')\n• Sequence of tenses: if main clause is past, subordinate usually past too\n• 'He said he WAS coming' (reported speech)",
      tip: "Use past perfect (had + past participle) for the EARLIER of two past events: 'He had left before I arrived.'"
    },
    {
      category: "Tenses",
      title: "Conditional Sentences (If Clauses)",
      formula: "Type 0: If + present, present (facts)\nType 1: If + present, will + base (possible future)\nType 2: If + past, would + base (unlikely present)\nType 3: If + past perfect, would have + pp (impossible past)",
      explanation: "Examples:\n• Type 0: 'If water boils, it evaporates'\n• Type 1: 'If it rains, I will stay home'\n• Type 2: 'If I were rich, I would travel' (use 'were' not 'was')\n• Type 3: 'If I had studied, I would have passed'\n• Mixed: 'If I had studied (past), I would be successful now (present)'",
      tip: "In Type 2 conditional, always use 'were' for all persons: 'If I WERE you...' (not 'If I was')."
    },

    // ─── QUESTION TAGS ────────────────────────────────────────
    {
      category: "Grammar",
      title: "Question Tags & Polarity Rules",
      formula: "Positive statement → Negative tag\nNegative statement → Positive tag\n'He is coming, ISN'T HE?'\n'She rarely speaks, DOES SHE?'",
      explanation: "Special cases:\n• 'barely', 'scarcely', 'rarely', 'hardly', 'seldom' are NEGATIVE → positive tag\n• 'Let's go, SHALL WE?'\n• 'I am late, AREN'T I?' (not 'amn't I')\n• Imperative: 'Close the door, WILL YOU?'\n• 'Everyone came, DIDN'T THEY?'\n• 'Nobody called, DID THEY?'",
      tip: "'He could scarcely hear, COULD HE?' — 'scarcely' is negative, so the tag is positive."
    },
    {
      category: "Grammar",
      title: "Reported/Indirect Speech",
      formula: "Direct → Indirect: tense shifts back one step\nPresent → Past; Past → Past Perfect\n'He said, \"I am going\"' → 'He said that he WAS going'",
      explanation: "Changes:\n• am/is → was; are → were\n• will → would; can → could\n• today → that day; tomorrow → the following day\n• yesterday → the previous day\n• here → there; this → that; these → those\n• Commands: 'He told me TO close the door'",
      tip: "Universal truths don't change tense: 'He said the earth IS round' (not 'was round')."
    },

    // ─── COMMON ERRORS ────────────────────────────────────────
    {
      category: "Common Errors",
      title: "Frequently Tested Wrong Expressions",
      formula: "Common corrections for JAMB & WAEC",
      explanation: "✗ 'He is MATURED' → ✓ 'He is MATURE' (adjective, not verb)\n✗ 'I and my friend' → ✓ 'My friend and I'\n✗ 'He is a STAFF' → ✓ 'He is a MEMBER OF STAFF'\n✗ 'Cope up with' → ✓ 'Cope WITH'\n✗ 'Discuss about' → ✓ 'Discuss' (no preposition)\n✗ 'Congratulate for' → ✓ 'Congratulate ON'\n✗ 'Comprise of' → ✓ 'Comprise' or 'is comprised of'",
      tip: "Never say 'discuss about' — just say 'discuss': 'Let us discuss the matter' (not 'discuss about')."
    },
    {
      category: "Common Errors",
      title: "Preposition Errors & Collocations",
      formula: "Arrive AT (a place); Arrive IN (a city/country)\nConfer ON/UPON (a title); Confer WITH (discuss)\nConsist OF (comprise); Insist ON\nDisappointed IN (a person); Disappointed WITH (a thing)",
      explanation: "More corrections:\n• Preside OVER (not 'at'): 'He presided over the meeting'\n• Congratulate ON (not 'for')\n• Acquit OF (not 'from')\n• Connive AT (not 'with')\n• Militate AGAINST (not 'toward')\n• 'Superior TO' not 'superior than'\n• 'Different FROM' not 'different to/than'",
      tip: "'He is superior TO me' (not 'superior than me'). Comparative adjectives like superior, inferior, prefer take 'to'."
    },
    {
      category: "Common Errors",
      title: "Commonly Confused Words",
      formula: "Affect (verb) vs Effect (noun/verb)\nPrincipal (head/main) vs Principle (rule)\nStationary (not moving) vs Stationery (writing materials)\nPractice (noun) vs Practise (verb)",
      explanation: "More pairs:\n• Complement (complete) vs Compliment (praise)\n• Discreet (careful) vs Discrete (separate)\n• Emigrate (leave) vs Immigrate (enter)\n• Loose (adjective) vs Lose (verb)\n• Advice (noun) vs Advise (verb)\n• Licence (noun) vs License (verb)\n• Council (body) vs Counsel (advice/advise)",
      tip: "Affect = verb (The news affected him). Effect = noun (The effect was positive) or verb meaning 'to bring about'."
    },

    // ─── PHONETICS ────────────────────────────────────────────
    {
      category: "Phonetics",
      title: "Stress Patterns & Syllable Rules",
      formula: "Words ending in -ic, -sion, -tion, -ian: stress on PENULTIMATE syllable\nWords ending in -ate, -ity, -ify, -phy, -gy: stress on ANTEPENULTIMATE\nNoun/Verb shifts: Nouns on 1st syllable, Verbs on 2nd",
      explanation: "Examples:\n• eco-NO-mic, edu-CA-tion, mu-SI-cian\n• de-MO-cra-cy, ca-PA-ci-ty, pho-TO-gra-phy\n• Noun: PRE-sent, IM-port; Verb: pre-SENT, im-PORT\n• Silent letters: deBt, douBt, saLmon, pLumBer, suBtle, pSalm, reCeiPt\n• Homophones: night/knight, write/right, flower/flour",
      tip: "'Plait' rhymes with 'flat' (/plæt/). 'Bury' rhymes with 'berry' (/beri/). 'Gauge' rhymes with 'page'."
    },
    {
      category: "Phonetics",
      title: "Vowel & Consonant Sounds",
      formula: "English vowels: 12 pure vowels + 8 diphthongs = 20 vowel sounds\nConsonants: 24 consonant sounds\nTotal: 44 sounds (phonemes) from 26 letters",
      explanation: "Short vowels: /ɪ/ (pit), /e/ (pet), /æ/ (pat), /ɒ/ (pot), /ʌ/ (put), /ʊ/ (pull), /ə/ (about)\nLong vowels: /iː/ (peel), /ɑː/ (palm), /ɔː/ (port), /uː/ (pool), /ɜː/ (pearl)\nDiphthongs: /eɪ/ (pay), /aɪ/ (pie), /ɔɪ/ (boy), /aʊ/ (cow), /əʊ/ (go), /ɪə/ (ear), /eə/ (air), /ʊə/ (pure)",
      tip: "The word 'enough' has the sounds /ɪ-n-ʌ-f/ — the 'gh' is pronounced as /f/."
    },
    {
      category: "Phonetics",
      title: "Rhyming Words & Sound Patterns",
      formula: "Rhyme: words with same ending sound\nAlliteration: repetition of initial consonant sound\nAssonance: repetition of vowel sounds\nConsonance: repetition of consonant sounds",
      explanation: "Tricky rhymes in JAMB:\n• 'cough' rhymes with 'off' (/kɒf/)\n• 'bough' rhymes with 'cow' (/baʊ/)\n• 'rough' rhymes with 'stuff' (/rʌf/)\n• 'through' rhymes with 'blue' (/θruː/)\n• 'though' rhymes with 'go' (/ðəʊ/)\n• 'thought' rhymes with 'caught' (/θɔːt/)",
      tip: "Words spelled similarly may NOT rhyme: cough, bough, rough, through, though all end in '-ough' but sound different!"
    },

    // ─── COMPREHENSION & SUMMARY ──────────────────────────────
    {
      category: "Comprehension",
      title: "Comprehension Strategies",
      formula: "Read passage carefully → Identify main idea → Answer in own words → Refer back to passage for evidence",
      explanation: "Tips:\n• Read questions first to know what to look for\n• Identify topic sentence (usually first sentence of paragraph)\n• Look for signal words: however, therefore, moreover, consequently\n• Distinguish fact from opinion\n• Infer meaning from context (vocabulary in context)\n• Don't bring outside knowledge — answer from passage",
      tip: "For 'In your own words' questions, paraphrase the answer — don't copy directly from the passage."
    },
    {
      category: "Summary",
      title: "Summary Writing Techniques",
      formula: "Identify key points → Eliminate repetition → Use own words → Stay within word limit → Write in one paragraph",
      explanation: "Steps:\n1. Read passage and identify the required focus\n2. List ALL relevant points\n3. Select the required number of points\n4. Write in connected sentences (not bullet points)\n5. Count words, trim if over limit\n6. Use linking words: furthermore, additionally, moreover\n• Avoid: repetition, examples, quotations, personal opinions",
      tip: "In WAEC, you typically need 5-6 points in about 100 words. Each point should be a distinct idea."
    },

    // ─── FIGURES OF SPEECH ────────────────────────────────────
    {
      category: "Literary Devices",
      title: "Figures of Speech",
      formula: "Simile: comparison using 'like/as'\nMetaphor: direct comparison\nPersonification: giving human qualities to non-human\nHyperbole: deliberate exaggeration",
      explanation: "• Simile: 'He fought LIKE a lion'\n• Metaphor: 'The classroom WAS a zoo'\n• Personification: 'The wind WHISPERED through the trees'\n• Hyperbole: 'I've told you a MILLION times'\n• Irony: contrast between expectation and reality\n• Euphemism: mild expression for harsh reality ('passed away' for 'died')\n• Oxymoron: contradictory terms ('deafening silence')",
      tip: "Simile uses 'like' or 'as'; metaphor does NOT. 'He is a lion' = metaphor. 'He is like a lion' = simile."
    },
    {
      category: "Literary Devices",
      title: "More Literary Devices & Techniques",
      formula: "Synecdoche: part represents whole\nMetonymy: associated name replaces the thing\nApostrophe: addressing absent/dead person\nOnomatopoeia: words that sound like their meaning",
      explanation: "• Synecdoche: 'All HANDS on deck' (hands = workers)\n• Metonymy: 'The CROWN made an announcement' (crown = king/queen)\n• Apostrophe: 'O DEATH, where is thy sting?'\n• Onomatopoeia: buzz, hiss, splash, bang\n• Alliteration: 'Peter Piper Picked a Peck'\n• Paradox: seemingly contradictory but true statement\n• Sarcasm: bitter, cutting irony",
      tip: "Onomatopoeia: the word imitates the sound it describes — 'The bee BUZZED past my ear.'"
    },

    // ─── LETTER & ESSAY WRITING ───────────────────────────────
    {
      category: "Writing",
      title: "Formal & Informal Letter Format",
      formula: "Formal: Writer's address → Date → Recipient's address → Salutation → Body → Close (Yours faithfully)\nInformal: Writer's address → Date → Salutation (Dear...) → Body → Close (Yours sincerely)",
      explanation: "Formal letter:\n• 'Dear Sir/Madam' → 'Yours faithfully'\n• 'Dear Mr./Mrs. X' → 'Yours sincerely'\n• Title/Subject line after salutation\n• Formal tone, no slang\nInformal letter:\n• 'Dear John' → 'Yours sincerely/Warm regards'\n• Conversational tone allowed\n• Can include personal details",
      tip: "If you don't know the recipient's name: 'Dear Sir/Madam' → 'Yours faithfully'. If you know the name: 'Dear Mr. X' → 'Yours sincerely'."
    },
    {
      category: "Writing",
      title: "Essay Types & Structure",
      formula: "Introduction (thesis) → Body paragraphs (3-4) → Conclusion\nNarrative: tells a story (past tense)\nDescriptive: paints a picture (vivid language)\nArgumentative: presents and defends a position\nExpository: explains or informs",
      explanation: "Essay writing tips:\n• Introduction: hook, background, thesis statement\n• Body: topic sentence + supporting details + examples\n• Conclusion: restate thesis, summarize, final thought\n• Use transitional words: firstly, moreover, however, in conclusion\n• Avoid: first person in argumentative, slang, text language\n• WAEC expects 450+ words",
      tip: "Start with a strong hook: a question, quote, or startling fact to grab the reader's attention."
    },

    // ─── VOCABULARY ───────────────────────────────────────────
    {
      category: "Vocabulary",
      title: "Word Formation — Prefixes & Suffixes",
      formula: "Prefix changes meaning: un-, dis-, re-, pre-, mis-, anti-\nSuffix changes word class: -tion (noun), -ly (adverb), -ful (adj), -ise (verb)\nRoot words: base form of the word",
      explanation: "Examples:\n• happy → unhappy (prefix changes meaning)\n• beauty → beautiful → beautifully (suffixes change class)\n• act → action → activate → active → actively\n• Common prefixes: anti- (against), auto- (self), bio- (life), mono- (one), poly- (many)\n• Common suffixes: -ment (noun), -ness (noun), -able (adj), -ous (adj), -ify (verb)",
      tip: "Adding a prefix usually doesn't change the word class: 'happy' (adj) → 'unhappy' (adj)."
    },
    {
      category: "Vocabulary",
      title: "Idioms & Idiomatic Expressions",
      formula: "Idiom: expression whose meaning differs from literal meaning\n'Kick the bucket' = die\n'Break the ice' = start a conversation\n'Burn bridges' = destroy relationships",
      explanation: "Common JAMB/WAEC idioms:\n• 'To bury the hatchet' = make peace\n• 'To let the cat out of the bag' = reveal a secret\n• 'To turn over a new leaf' = change behavior\n• 'A storm in a teacup' = fuss over nothing\n• 'To sit on the fence' = remain neutral\n• 'To take with a grain/pinch of salt' = be skeptical\n• 'The last straw' = final problem that causes breakdown",
      tip: "Idioms cannot be translated literally — learn them as fixed expressions."
    }
  ],

  "Government & Arts": [
    // ─── POLITICAL SCIENCE ────────────────────────────────────
    {
      category: "Political Science",
      title: "Forms of Government",
      formula: "Democracy: government by the people\nMonarchy: rule by king/queen\nOligarchy: rule by few\nTheocracy: rule based on religion\nAutocracy/Dictatorship: rule by one person",
      explanation: "Types of democracy:\n• Direct democracy: citizens vote on every issue (Athens)\n• Representative/Indirect: citizens elect representatives\n• Liberal democracy: free elections + human rights\n• Presidential: president = head of state + government\n• Parliamentary: PM = head of government, separate head of state",
      tip: "The US practices presidential democracy; the UK practices parliamentary democracy."
    },
    {
      category: "Political Science",
      title: "Separation of Powers & Checks and Balances",
      formula: "Legislature: makes laws (National Assembly)\nExecutive: enforces laws (President + Cabinet)\nJudiciary: interprets laws (Courts)\nMontesquieu: advocate of separation of powers",
      explanation: "Checks and Balances:\n• Legislature checks Executive: approve budget, confirm appointments, impeach\n• Executive checks Legislature: veto bills, propose legislation\n• Judiciary checks both: judicial review (declare laws unconstitutional)\n• Independent judiciary: security of tenure, fixed salary\n• Rule of Law (Dicey): supremacy of law, equality before law, rights protected",
      tip: "The judiciary is the guardian of the constitution — it can declare any law unconstitutional."
    },
    {
      category: "Political Science",
      title: "Federalism vs Unitarism",
      formula: "Federal: power shared between central + regional governments\nUnitary: power concentrated in central government\nConfederal: loose union, members retain sovereignty",
      explanation: "Nigerian federalism:\n• 36 states + FCT\n• Federal, State, Local governments\n• Exclusive list: federal only (defense, currency, foreign affairs)\n• Concurrent list: both federal + state (education, health)\n• Residual list: state only\n• Revenue allocation: federation account\n• Fiscal federalism: sharing of national revenue",
      tip: "In Nigeria, the exclusive legislative list contains items ONLY the federal government can legislate on."
    },
    {
      category: "Political Science",
      title: "Political Parties & Party Systems",
      formula: "One-party: single party (e.g., old China)\nTwo-party: two dominant parties (US: Democrats, Republicans)\nMulti-party: many parties (Nigeria currently)\nDominant-party: one party always wins despite competition",
      explanation: "Functions of political parties:\n• Aggregate interests of citizens\n• Educate the electorate\n• Recruit political leaders\n• Contest elections\n• Form government (ruling party)\n• Serve as opposition (checks government)\n• Pressure groups vs political parties: PGs don't seek power directly",
      tip: "Nigeria has had multi-party democracy since 1999 — APC, PDP, LP, etc."
    },
    {
      category: "Political Science",
      title: "Electoral Systems",
      formula: "FPTP: First Past the Post (simple majority)\nProportional Representation: seats ∝ votes\nAbsolute majority: 50%+1\nSimple majority: more than any other candidate",
      explanation: "Nigerian electoral system:\n• President: 25% votes in ⅔ of states + plurality\n• Governor: simple majority\n• INEC: Independent National Electoral Commission\n• Voter registration, voting, counting, declaration\n• Electoral malpractice: vote-buying, rigging, violence\n• Electoral reforms: card reader, BVAS, IReV",
      tip: "To win Nigeria's presidential election, a candidate must get the most votes AND at least 25% of votes in ⅔ of states."
    },
    {
      category: "Political Science",
      title: "Fundamental Human Rights",
      formula: "Chapter IV, 1999 Constitution:\nRight to life, dignity, personal liberty, fair hearing,\nprivate/family life, thought/conscience/religion,\nexpression/press, assembly/association, movement,\nfreedom from discrimination",
      explanation: "Limitations on rights:\n• Rights can be limited in the interest of:\n  - Public order, public safety, public morality\n  - Defense of Nigeria\n  - Public health\n• Rights can be suspended during state of emergency\n• ECHR, ACHPR: regional human rights instruments\n• Ombudsman: investigates citizen complaints against government",
      tip: "Fundamental rights are NOT absolute — they can be limited in the interest of public safety and order."
    },
    {
      category: "Political Science",
      title: "Public Administration & Civil Service",
      formula: "Civil service: permanent, career employees of government\nPolitical neutrality: civil servants serve any ruling party\nAnonymity: work behind the scenes\nMerit system: appointment based on qualifications",
      explanation: "Features of civil service:\n• Security of tenure (permanent employment)\n• Hierarchical structure\n• Impartiality and neutrality\n• Expertise and continuity\n• Bureaucracy: Weber's characteristics\n• Problems: red tape, corruption, inefficiency\n• Civil service reforms: restructuring, rightsizing, monetization",
      tip: "Civil servants provide continuity in government — they remain while political office holders change."
    },

    // ─── NIGERIAN CONSTITUTIONAL HISTORY ──────────────────────
    {
      category: "Nigerian History",
      title: "Pre-Independence Constitutions",
      formula: "Clifford (1922) → Richards (1946) → Macpherson (1951) → Lyttelton (1954) → Independence (1960)",
      explanation: "1. Clifford (1922): first ELECTIVE PRINCIPLE (4 elected seats: 3 Lagos, 1 Calabar)\n2. Richards (1946): regional councils (N, W, E), promoted regionalism\n3. Macpherson (1951): nationwide conference, semi-responsible government\n4. Lyttelton (1954): TRUE FEDERALISM, regional premiers, regional autonomy\n5. Independence (1960): parliamentary system, Queen as head of state\n6. Republican (1963): first republic, president as head of state",
      tip: "Elective principle was FIRST introduced by the Clifford Constitution of 1922."
    },
    {
      category: "Nigerian History",
      title: "Post-Independence Political Development",
      formula: "1st Republic (1960-66): Parliamentary\n2nd Republic (1979-83): Presidential\n3rd Republic (aborted): 1993\n4th Republic (1999-present): Presidential",
      explanation: "Military coups and regimes:\n• 1966: Nzeogwu coup → Ironsi → Gowon counter-coup\n• 1967-70: Nigerian Civil War (Biafra)\n• 1975: Murtala Mohammed\n• 1976-79: Obasanjo (transition to 2nd Republic)\n• 1983: Buhari coup; 1985: Babangida\n• 1993: Abacha; 1998: Abubakar (transition)\n• 1999: Return to democracy (Obasanjo elected)",
      tip: "Nigeria's Civil War (1967-1970) was caused by attempted secession of Eastern Region (Biafra)."
    },
    {
      category: "Nigerian History",
      title: "Nigerian Government Structure",
      formula: "Federal: President + Vice President + Ministers\nState: Governor + Deputy + Commissioners\nLocal: Chairman + Vice Chairman + Councillors\nLegislature: Senate (109) + House of Reps (360)",
      explanation: "Key institutions:\n• Supreme Court: highest court in Nigeria\n• Court of Appeal: second highest\n• Federal High Court: federal matters\n• State High Court: state matters\n• Sharia Court: Islamic law (Northern states)\n• Customary Court: customary law\n• National Judicial Council (NJC): recommends judicial appointments",
      tip: "Nigeria has 774 local government areas across 36 states and the FCT."
    },

    // ─── INTERNATIONAL ORGANIZATIONS ──────────────────────────
    {
      category: "International Relations",
      title: "International Organizations",
      formula: "UN (1945): maintain peace, 193 members\nAU (2002): formerly OAU (1963), 55 African states\nECOWAS (1975): 15 West African states\nCommonwealth: former British colonies",
      explanation: "UN Organs:\n• General Assembly: all members, one vote each\n• Security Council: 5 permanent (US, UK, France, Russia, China) + 10 non-permanent; veto power\n• Secretariat: headed by Secretary-General\n• ICJ: International Court of Justice (The Hague)\n• ECOSOC: economic and social issues\n• Specialized agencies: WHO, UNESCO, UNICEF, ILO",
      tip: "The 5 permanent members of the UN Security Council have VETO power — any one can block a resolution."
    },
    {
      category: "International Relations",
      title: "Nigeria's Foreign Policy",
      formula: "Africa as centerpiece\nPrinciples: non-alignment, non-interference, mutual respect\nCitizen diplomacy\nECOWAS peacekeeping (ECOMOG)",
      explanation: "Nigeria's contributions:\n• ECOMOG: peacekeeping in Liberia, Sierra Leone\n• Anti-apartheid: supported liberation of South Africa\n• Technical Aid Corps (TAC): skilled Nigerians to developing countries\n• Concentric circles: Africa first, then rest of world\n• AU membership, OPEC membership (oil producing nations)\n• D-8: developing 8 Muslim-majority countries",
      tip: "Africa is the cornerstone of Nigeria's foreign policy — all other relationships are secondary."
    },

    // ─── LITERATURE ───────────────────────────────────────────
    {
      category: "Literature",
      title: "Literary Terms & Genres",
      formula: "Prose: novels, short stories (narrative fiction)\nPoetry: poems (verse, stanzas, rhyme)\nDrama: plays (acts, scenes, dialogue)\nNon-fiction: essays, autobiography, biography",
      explanation: "Literary elements:\n• Plot: sequence of events (exposition → rising action → climax → falling action → resolution)\n• Setting: time and place\n• Theme: central message/idea\n• Characterization: flat/round, static/dynamic\n• Point of view: 1st person, 3rd person (limited/omniscient)\n• Tone: writer's attitude; Mood: reader's feeling",
      tip: "The climax is the turning point of the story — the moment of highest tension."
    },
    {
      category: "Literature",
      title: "Figures of Speech & Poetic Devices",
      formula: "Metaphor: direct comparison\nSimile: comparison with 'like/as'\nSynecdoche: part for whole\nMetonymy: associated name\nOxymoron: contradictory words together",
      explanation: "More devices:\n• Irony: verbal (saying opposite), situational (unexpected outcome), dramatic (audience knows, character doesn't)\n• Enjambment: sentence runs from one line to next\n• Caesura: pause within a line of poetry\n• Alliteration: repetition of initial consonant sounds\n• Assonance: repetition of vowel sounds\n• Anaphora: repetition at beginning of successive lines\n• Apostrophe: addressing absent person/thing",
      tip: "'O death, where is thy sting?' is APOSTROPHE — addressing an abstraction as if present."
    },
    {
      category: "Literature",
      title: "African Literary Movements",
      formula: "Négritude: celebration of African identity (Senghor, Césaire)\nAfrican literary tradition: oral → written\nColonial literature → Post-independence → Contemporary",
      explanation: "Notable African writers:\n• Chinua Achebe: Things Fall Apart\n• Wole Soyinka: first African Nobel laureate (1986)\n• Ngũgĩ wa Thiong'o: Decolonizing the Mind\n• Chimamanda Adichie: Half of a Yellow Sun\n• Okot p'Bitek: Song of Lawino\n• Themes: colonialism, cultural conflict, political corruption, identity, tradition vs modernity",
      tip: "Wole Soyinka became the first African to win the Nobel Prize in Literature in 1986."
    },
    {
      category: "Literature",
      title: "Prose Analysis & Narrative Techniques",
      formula: "Flashback: going back in time\nForeshadowing: hints about future events\nStream of consciousness: continuous flow of thoughts\nSatire: using humor to criticize\nAllegory: symbolic representation",
      explanation: "Narrative techniques:\n• First person: narrator is a character ('I')\n• Third person limited: narrator knows one character's thoughts\n• Third person omniscient: narrator knows all characters' thoughts\n• Unreliable narrator: biased or deceptive\n• Frame narrative: story within a story\n• Epistolary: written as letters/documents",
      tip: "An unreliable narrator forces the reader to question the truth of the story being told."
    },
    {
      category: "Literature",
      title: "Drama & Theatre Terms",
      formula: "Tragedy: hero's downfall due to tragic flaw (hamartia)\nComedy: humorous, happy ending\nTragicomedy: mix of both\nSoliloquy: character speaks thoughts alone\nAside: character speaks to audience, not other characters",
      explanation: "Drama elements:\n• Act: major division of a play\n• Scene: subdivision of an act\n• Dialogue: conversation between characters\n• Monologue: long speech by one character\n• Stage directions: instructions for actors/director\n• Protagonist: main character; Antagonist: opponent\n• Catharsis: emotional cleansing through tragedy",
      tip: "In a soliloquy, the character reveals their inner thoughts to the audience while alone on stage."
    },
    {
      category: "Literature",
      title: "Poetry Analysis & Forms",
      formula: "Sonnet: 14 lines (Shakespearean: 3 quatrains + couplet; Petrarchan: octave + sestet)\nOde: lyrical poem of praise\nElegy: poem of mourning\nEpic: long narrative poem about heroic deeds\nBallad: narrative poem/song",
      explanation: "Poetry analysis:\n• Rhyme scheme: pattern of end rhymes (ABAB, AABB, ABBA)\n• Metre/Rhythm: pattern of stressed/unstressed syllables\n• Stanza: group of lines (couplet=2, tercet=3, quatrain=4)\n• Free verse: no fixed rhyme or metre\n• Blank verse: unrhymed iambic pentameter\n• Imagery: vivid descriptions appealing to senses",
      tip: "A Shakespearean sonnet has rhyme scheme ABAB CDCD EFEF GG — the final couplet often reveals the 'volta' (turn)."
    }
  ]
};

export const Cheatsheet = {
  activeSubject: "Mathematics",
  searchQuery: "",

  renderCheatsheet(container) {
    const subjects = Object.keys(CHEATSHEET_DATA);
    const totalFormulas = subjects.reduce((acc, subj) => acc + CHEATSHEET_DATA[subj].length, 0);

    const html = `
      <div class="cheatsheet-page-wrapper">
        <!-- Hero Header -->
        <div class="cs-hero-card">
          <div class="cs-badge-row">
            <span class="cs-pill">📐 High-Yield Formula Vault</span>
            <span class="cs-pill-sec">JAMB &amp; WAEC Quick Reference (${totalFormulas}+ Core Formulas)</span>
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
              <span class="cs-tab-count">${CHEATSHEET_DATA[subj].length}</span>
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
