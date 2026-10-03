/**
 * Chemistry Past Questions — JAMB & WAEC
 * Stoichiometry, Periodic Table, Bonding, Organic Chemistry,
 * Electrochemistry, Chemical Equilibrium, Acids/Bases/Salts.
 */
export const chemistryQuestions = [
  {
    id: "chem_bank_01", exam: "JAMB", year: "2024", subject: "Chemistry",
    topic: "Stoichiometry & Mole Concept", department: ["Science"],
    question: "What volume of oxygen at s.t.p. is required for the complete combustion of 20 cm³ of butane (C₄H₁₀)?\n[All volumes measured at s.t.p.]",
    options: [
      { key: "A", text: "65 cm³" },
      { key: "B", text: "130 cm³" },
      { key: "C", text: "90 cm³" },
      { key: "D", text: "260 cm³" }
    ],
    correctAnswer: "B",
    explanation: "Balanced equation: 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O.\nFrom Gay-Lussac's Law: 2 volumes of butane react with 13 volumes of oxygen.\nRatio = 13/2 = 6.5.\nVolume of O₂ required = 20 cm³ × 6.5 = 130 cm³."
  },
  {
    id: "chem_bank_02", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Redox Reactions & Oxidation States", department: ["Science"],
    question: "What is the oxidation number of manganese in the potassium permanganate compound (KMnO₄)?",
    options: [
      { key: "A", text: "+5" },
      { key: "B", text: "+7" },
      { key: "C", text: "+6" },
      { key: "D", text: "+4" }
    ],
    correctAnswer: "B",
    explanation: "In KMnO₄: Potassium (K) has oxidation state +1, Oxygen (O) has -2 (× 4 = -8). Since the overall compound is neutral: (+1) + Mn + (-8) = 0 => Mn - 7 = 0 => Mn = +7."
  },
  {
    id: "chem_jamb_03", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Electrochemistry & Faraday's Laws", department: ["Science"],
    question: "Calculate the quantity of electricity required to deposit 0.60 g of copper from a CuSO₄ solution during electrolysis.\n[Cu = 63.5; 1 Faraday = 96,500 C]",
    options: [
      { key: "A", text: "911.8 C" },
      { key: "B", text: "3,647.2 C" },
      { key: "C", text: "1,823.6 C" },
      { key: "D", text: "455.9 C" }
    ],
    correctAnswer: "C",
    explanation: "Cu²⁺ + 2e⁻ → Cu. 1 mole of Cu requires 2 Faradays = 2 × 96,500 C = 193,000 C.\n63.5 g of Cu is deposited by 193,000 C.\nTherefore, 0.60 g of Cu is deposited by (0.60 × 193,000) / 63.5 = 115,800 / 63.5 ≈ 1,823.6 C."
  },
  {
    id: "chem_jamb_04", exam: "JAMB", year: "2022", subject: "Chemistry",
    topic: "Chemical Bonding & Shapes", department: ["Science"],
    question: "Which of the following molecules has a trigonal pyramidal shape?",
    options: [
      { key: "A", text: "BF₃ (Boron trifluoride)" },
      { key: "B", text: "CH₄ (Methane)" },
      { key: "C", text: "H₂O (Water)" },
      { key: "D", text: "NH₃ (Ammonia)" }
    ],
    correctAnswer: "D",
    explanation: "Ammonia (NH₃) has 3 bonded pairs and 1 lone pair of electrons on the central nitrogen atom (sp³ hybridization). Repulsion between lone-pair and bond-pairs reduces the tetrahedral angle to ~107°, producing a trigonal pyramidal geometry. BF₃ is trigonal planar; CH₄ is tetrahedral; H₂O is V-shaped (bent)."
  },
  {
    id: "chem_jamb_05", exam: "JAMB", year: "2024", subject: "Chemistry",
    topic: "Organic Chemistry - Alkanols & Functional Groups", department: ["Science"],
    question: "Which test distinguishes ethanol from 2-propanol?",
    options: [
      { key: "A", text: "Fehling's solution test" },
      { key: "B", text: "Iodoform test gives yellow PPT with both; Lucas test is faster for 2-propanol" },
      { key: "C", text: "Litmus paper test" },
      { key: "D", text: "Tollens' reagent reaction" }
    ],
    correctAnswer: "B",
    explanation: "Both ethanol (CH₃CH₂OH) and 2-propanol ((CH₃)₂CHOH) possess a CH₃-CH(OH)- group and yield a yellow triiodomethane (iodoform) precipitate with alkaline I₂. However, Lucas test (anhydrous ZnCl₂ + conc. HCl) differentiates them: 2-propanol (secondary alcohol) turns cloudy within 5-10 minutes, whereas ethanol (primary alcohol) does not react at room temperature."
  },
  {
    id: "chem_jamb_06", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Chemical Equilibrium & Le Chatelier's Principle", department: ["Science"],
    question: "For the endothermic reaction: N₂O₄(g) ⇌ 2NO₂(g)  (ΔH = +58 kJ/mol),\nan increase in temperature will:",
    options: [
      { key: "A", text: "Shift equilibrium to the left and lighten the color" },
      { key: "B", text: "Have no effect on equilibrium composition" },
      { key: "C", text: "Shift equilibrium to the right and deepen the reddish-brown color" },
      { key: "D", text: "Decrease the equilibrium constant K_c" }
    ],
    correctAnswer: "C",
    explanation: "According to Le Chatelier's Principle, increasing temperature favors the endothermic direction to absorb excess heat. Since the forward reaction is endothermic (ΔH > 0), the system shifts right, generating more brown NO₂(g) gas and increasing K_c."
  },
  {
    id: "chem_jamb_07", exam: "JAMB", year: "2022", subject: "Chemistry",
    topic: "Volumetric Analysis & Concentration", department: ["Science"],
    question: "Calculate the mass of sodium hydroxide (NaOH) required to prepare 250 cm³ of a 0.20 mol/dm³ aqueous solution. [Na = 23, O = 16, H = 1]",
    options: [
      { key: "A", text: "4.0 g" },
      { key: "B", text: "1.0 g" },
      { key: "C", text: "2.0 g" },
      { key: "D", text: "0.5 g" }
    ],
    correctAnswer: "C",
    explanation: "Molar mass of NaOH = 23 + 16 + 1 = 40 g/mol.\nVolume V = 250 cm³ = 0.25 dm³.\nMoles n = Concentration × Volume = 0.20 mol/dm³ × 0.25 dm³ = 0.05 mol.\nMass = moles × molar mass = 0.05 mol × 40 g/mol = 2.0 g."
  },
  {
    id: "chem_waec_01", exam: "WAEC", year: "2023", subject: "Chemistry",
    topic: "Gas Laws", department: ["Science"],
    question: "A given mass of gas occupies 500 cm³ at 27 °C and 760 mmHg. What volume will it occupy at 127 °C and 760 mmHg?",
    options: [
      { key: "A", text: "600.0 cm³" },
      { key: "B", text: "375.0 cm³" },
      { key: "C", text: "750.0 cm³" },
      { key: "D", text: "666.7 cm³" }
    ],
    correctAnswer: "D",
    explanation: "Since pressure is constant (760 mmHg), Charles's Law applies: V₁/T₁ = V₂/T₂.\nT₁ = 27 + 273 = 300 K; T₂ = 127 + 273 = 400 K.\nV₂ = V₁ × (T₂ / T₁) = 500 × (400 / 300) = 500 × 4/3 = 666.67 cm³."
  },
  {
    id: "chem_waec_02", exam: "WAEC", year: "2022", subject: "Chemistry",
    topic: "Metals & Extraction", department: ["Science"],
    question: "Cryolite (Na₃AlF₆) is added to molten bauxite (Al₂O₃) during the Hall-Héroult extraction process in order to:",
    options: [
      { key: "A", text: "Lower the melting point and improve electrical conductivity" },
      { key: "B", text: "Act as an oxidizing agent" },
      { key: "C", text: "Prevent corrosion of the graphite anodes" },
      { key: "D", text: "Precipitate aluminum hydroxide" }
    ],
    correctAnswer: "A",
    explanation: "Pure alumina melts at over 2050 °C, which is economically impractical. Dissolving alumina in molten cryolite lowers the operating bath temperature to about 950 °C and vastly improves the electrical conductivity of the electrolyte."
  },
  {
    id: "chem_jamb_08", exam: "JAMB", year: "2024", subject: "Chemistry",
    topic: "Thermochemistry", department: ["Science"],
    question: "When ammonium chloride dissolves in water, the temperature of the beaker drops noticeably. This dissolution process is:",
    options: [
      { key: "A", text: "Exothermic, with negative enthalpy of solution (ΔH < 0)" },
      { key: "B", text: "Endothermic, with positive enthalpy of solution (ΔH > 0)" },
      { key: "C", text: "Isothermal, with ΔH = 0" },
      { key: "D", text: "Combustion reaction" }
    ],
    correctAnswer: "B",
    explanation: "A decrease in temperature indicates heat is absorbed from the surroundings into the reaction mixture. Therefore, the process is endothermic and the enthalpy change of solution is positive (ΔH > 0)."
  },
  {
    id: "chem_jamb_09", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Organic Chemistry - Polymerization", department: ["Science"],
    question: "Nylon 6,6 is a synthetic polymer formed by condensation polymerization between:",
    options: [
      { key: "A", text: "Ethene and propene" },
      { key: "B", text: "Glucose and fructose" },
      { key: "C", text: "Hexanedioic acid and 1,6-diaminohexane" },
      { key: "D", text: "Phenol and methanal" }
    ],
    correctAnswer: "C",
    explanation: "Nylon 6,6 is synthesized from hexanedioic acid (adipic acid - 6 carbons) and 1,6-diaminohexane (hexamethylenediamine - 6 carbons) with the elimination of water molecules to form recurring amide linkages (-CONH-)."
  },
  {
    id: "chem_jamb_10", exam: "JAMB", year: "2022", subject: "Chemistry",
    topic: "Nuclear Chemistry & Radioactivity", department: ["Science"],
    question: "When a nucleus of ²³⁸₉₂U emits an alpha particle followed by two beta particles, the resulting nuclide has atomic number and mass number:",
    options: [
      { key: "A", text: "Atomic number 90, mass number 234" },
      { key: "B", text: "Atomic number 94, mass number 238" },
      { key: "C", text: "Atomic number 88, mass number 230" },
      { key: "D", text: "Atomic number 92, mass number 234" }
    ],
    correctAnswer: "D",
    explanation: "Alpha emission (⁴₂α): Mass decreases by 4 (238 - 4 = 234), Atomic number decreases by 2 (92 - 2 = 90). Two beta emissions (2 × ⁰₋₁β): Mass unchanged (234), Atomic number increases by 2 (90 + 2 = 92). Resulting nuclide is ²³⁴₉₂U (an isotope of uranium)."
  },
  {
    id: "chem_waec_03", exam: "WAEC", year: "2024", subject: "Chemistry",
    topic: "Redox & Oxidation Numbers", department: ["Science"],
    question: "Determine the oxidation number of chromium in the dichromate ion (Cr₂O₇²⁻):",
    options: [
      { key: "A", text: "+6" },
      { key: "B", text: "+7" },
      { key: "C", text: "+3" },
      { key: "D", text: "+12" }
    ],
    correctAnswer: "A",
    explanation: "Let oxidation state of Cr be x. Oxygen has oxidation state of -2. Equation: 2(x) + 7(-2) = -2 ⇒ 2x - 14 = -2 ⇒ 2x = 12 ⇒ x = +6."
  },
  {
    id: "chem_jamb_11", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Rates of Reaction", department: ["Science"],
    question: "Which of the following statements about catalysts is correct?",
    options: [
      { key: "A", text: "A catalyst shifts the position of chemical equilibrium to yield more product" },
      { key: "B", text: "A catalyst provides an alternative pathway with a lower activation energy" },
      { key: "C", text: "A catalyst increases the enthalpy change (ΔH) of the reaction" },
      { key: "D", text: "A catalyst is consumed permanently during the reaction" }
    ],
    correctAnswer: "B",
    explanation: "Catalysts speed up reactions by offering an alternate reaction pathway with lower activation energy (E_a). They accelerate both forward and reverse reactions equally, leaving equilibrium position and ΔH unaffected."
  },
  {
    id: "chem_jamb_12", exam: "JAMB", year: "2024", subject: "Chemistry",
    topic: "Separation Techniques", department: ["Science"],
    question: "A mixture of ammonium chloride and sodium chloride can best be separated by:",
    options: [
      { key: "A", text: "Fractional distillation" },
      { key: "B", text: "Filtration" },
      { key: "C", text: "Chromatography" },
      { key: "D", text: "Sublimation" }
    ],
    correctAnswer: "D",
    explanation: "Ammonium chloride (NH₄Cl) sublimes on heating (converts directly from solid to gas and re-deposits as sublimate on cooling), while sodium chloride (NaCl) remains as a solid residue because it has a high melting point and does not sublime."
  }
];
