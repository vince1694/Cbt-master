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
      { key: "A", text: "130 cm³" },
      { key: "B", text: "65 cm³" },
      { key: "C", text: "90 cm³" },
      { key: "D", text: "260 cm³" }
    ],
    correctAnswer: "A",
    explanation: "Balanced equation: 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O.\nFrom Gay-Lussac's Law: 2 volumes of butane react with 13 volumes of oxygen.\nRatio = 13/2 = 6.5.\nVolume of O₂ required = 20 cm³ × 6.5 = 130 cm³."
  },
  {
    id: "chem_bank_02", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Atomic Structure & Periodic Table", department: ["Science"],
    question: "An element X has an electronic configuration of 1s² 2s² 2p⁶ 3s² 3p⁴. Which of the following is true concerning element X?",
    options: [
      { key: "A", text: "It belongs to Group 6 (VIA) and Period 3" },
      { key: "B", text: "It belongs to Group 4 (IVA) and Period 3" },
      { key: "C", text: "It belongs to Group 6 (VIA) and Period 2" },
      { key: "D", text: "It forms an ionic bond by donating two electrons" }
    ],
    correctAnswer: "A",
    explanation: "The outermost principal quantum shell n = 3, so Period = 3. The valence shell contains 2 (3s) + 4 (3p) = 6 electrons, placing it in Group 16 / Group 6 (VIA). This element is Sulfur (atomic number 16), which tends to gain 2 electrons to form an X²⁻ anion."
  },
  {
    id: "chem_jamb_03", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Electrochemistry & Faraday's Laws", department: ["Science"],
    question: "Calculate the quantity of electricity required to deposit 0.60 g of copper from a CuSO₄ solution during electrolysis.\n[Cu = 63.5; 1 Faraday = 96,500 C]",
    options: [
      { key: "A", text: "1,823.6 C" },
      { key: "B", text: "911.8 C" },
      { key: "C", text: "3,647.2 C" },
      { key: "D", text: "455.9 C" }
    ],
    correctAnswer: "A",
    explanation: "Cu²⁺ + 2e⁻ → Cu. 1 mole of Cu requires 2 Faradays = 2 × 96,500 C = 193,000 C.\n63.5 g of Cu is deposited by 193,000 C.\nTherefore, 0.60 g of Cu is deposited by (0.60 × 193,000) / 63.5 = 115,800 / 63.5 ≈ 1,823.6 C."
  },
  {
    id: "chem_jamb_04", exam: "JAMB", year: "2022", subject: "Chemistry",
    topic: "Chemical Bonding & Shapes", department: ["Science"],
    question: "Which of the following molecules has a trigonal pyramidal shape?",
    options: [
      { key: "A", text: "NH₃ (Ammonia)" },
      { key: "B", text: "BF₃ (Boron trifluoride)" },
      { key: "C", text: "CH₄ (Methane)" },
      { key: "D", text: "H₂O (Water)" }
    ],
    correctAnswer: "A",
    explanation: "Ammonia (NH₃) has 3 bonded pairs and 1 lone pair of electrons on the central nitrogen atom (sp³ hybridization). Repulsion between lone-pair and bond-pairs reduces the tetrahedral angle to ~107°, producing a trigonal pyramidal geometry. BF₃ is trigonal planar; CH₄ is tetrahedral; H₂O is V-shaped (bent)."
  },
  {
    id: "chem_jamb_05", exam: "JAMB", year: "2024", subject: "Chemistry",
    topic: "Organic Chemistry - Alkanols & Functional Groups", department: ["Science"],
    question: "Which test distinguishes ethanol from 2-propanol?",
    options: [
      { key: "A", text: "Iodoform test gives yellow PPT with both; Lucas test is faster for 2-propanol" },
      { key: "B", text: "Fehling's solution test" },
      { key: "C", text: "Litmus paper test" },
      { key: "D", text: "Tollens' reagent reaction" }
    ],
    correctAnswer: "A",
    explanation: "Both ethanol (CH₃CH₂OH) and 2-propanol ((CH₃)₂CHOH) possess a CH₃-CH(OH)- group and yield a yellow triiodomethane (iodoform) precipitate with alkaline I₂. However, Lucas test (anhydrous ZnCl₂ + conc. HCl) differentiates them: 2-propanol (secondary alcohol) turns cloudy within 5-10 minutes, whereas ethanol (primary alcohol) does not react at room temperature."
  },
  {
    id: "chem_jamb_06", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Chemical Equilibrium & Le Chatelier's Principle", department: ["Science"],
    question: "For the endothermic reaction: N₂O₄(g) ⇌ 2NO₂(g)  (ΔH = +58 kJ/mol),\nan increase in temperature will:",
    options: [
      { key: "A", text: "Shift equilibrium to the right and deepen the reddish-brown color" },
      { key: "B", text: "Shift equilibrium to the left and lighten the color" },
      { key: "C", text: "Have no effect on equilibrium composition" },
      { key: "D", text: "Decrease the equilibrium constant K_c" }
    ],
    correctAnswer: "A",
    explanation: "According to Le Chatelier's Principle, increasing temperature favors the endothermic direction to absorb excess heat. Since the forward reaction is endothermic (ΔH > 0), the system shifts right, generating more brown NO₂(g) gas and increasing K_c."
  },
  {
    id: "chem_jamb_07", exam: "JAMB", year: "2022", subject: "Chemistry",
    topic: "Acids, Bases & Salts", department: ["Science"],
    question: "What is the pH of a 0.005 mol/dm³ solution of sulfuric acid (H₂SO₄), assuming complete ionization?",
    options: [
      { key: "A", text: "2.00" },
      { key: "B", text: "2.30" },
      { key: "C", text: "1.70" },
      { key: "D", text: "1.00" }
    ],
    correctAnswer: "A",
    explanation: "H₂SO₄ is a diprotic acid: H₂SO₄ → 2H⁺ + SO₄²⁻.\n[H⁺] = 2 × 0.005 mol/dm³ = 0.01 mol/dm³ = 10⁻² mol/dm³.\npH = -log₁₀[H⁺] = -log₁₀(10⁻²) = 2.00."
  },
  {
    id: "chem_waec_01", exam: "WAEC", year: "2023", subject: "Chemistry",
    topic: "Gas Laws", department: ["Science"],
    question: "A given mass of gas occupies 500 cm³ at 27 °C and 760 mmHg. What volume will it occupy at 127 °C and 760 mmHg?",
    options: [
      { key: "A", text: "666.7 cm³" },
      { key: "B", text: "600.0 cm³" },
      { key: "C", text: "375.0 cm³" },
      { key: "D", text: "750.0 cm³" }
    ],
    correctAnswer: "A",
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
      { key: "A", text: "Endothermic, with positive enthalpy of solution (ΔH > 0)" },
      { key: "B", text: "Exothermic, with negative enthalpy of solution (ΔH < 0)" },
      { key: "C", text: "Isothermal, with ΔH = 0" },
      { key: "D", text: "Combustion reaction" }
    ],
    correctAnswer: "A",
    explanation: "A decrease in temperature indicates heat is absorbed from the surroundings into the reaction mixture. Therefore, the process is endothermic and the enthalpy change of solution is positive (ΔH > 0)."
  },
  {
    id: "chem_jamb_09", exam: "JAMB", year: "2023", subject: "Chemistry",
    topic: "Organic Chemistry - Polymerization", department: ["Science"],
    question: "Nylon 6,6 is a synthetic polymer formed by condensation polymerization between:",
    options: [
      { key: "A", text: "Hexanedioic acid and 1,6-diaminohexane" },
      { key: "B", text: "Ethene and propene" },
      { key: "C", text: "Glucose and fructose" },
      { key: "D", text: "Phenol and methanal" }
    ],
    correctAnswer: "A",
    explanation: "Nylon 6,6 is synthesized from hexanedioic acid (adipic acid - 6 carbons) and 1,6-diaminohexane (hexamethylenediamine - 6 carbons) with the elimination of water molecules to form recurring amide linkages (-CONH-)."
  },
  {
    id: "chem_jamb_10", exam: "JAMB", year: "2022", subject: "Chemistry",
    topic: "Nuclear Chemistry & Radioactivity", department: ["Science"],
    question: "When a nucleus of ²³⁸₉₂U emits an alpha particle followed by two beta particles, the resulting nuclide has atomic number and mass number:",
    options: [
      { key: "A", text: "Atomic number 92, mass number 234" },
      { key: "B", text: "Atomic number 90, mass number 234" },
      { key: "C", text: "Atomic number 94, mass number 238" },
      { key: "D", text: "Atomic number 88, mass number 230" }
    ],
    correctAnswer: "A",
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
      { key: "A", text: "A catalyst provides an alternative pathway with a lower activation energy" },
      { key: "B", text: "A catalyst shifts the position of chemical equilibrium to yield more product" },
      { key: "C", text: "A catalyst increases the enthalpy change (ΔH) of the reaction" },
      { key: "D", text: "A catalyst is consumed permanently during the reaction" }
    ],
    correctAnswer: "A",
    explanation: "Catalysts speed up reactions by offering an alternate reaction pathway with lower activation energy (E_a). They accelerate both forward and reverse reactions equally, leaving equilibrium position and ΔH unaffected."
  },
  {
    id: "chem_jamb_12", exam: "JAMB", year: "2024", subject: "Chemistry",
    topic: "Separation Techniques", department: ["Science"],
    question: "A mixture of ammonium chloride and sodium chloride can best be separated by:",
    options: [
      { key: "A", text: "Sublimation" },
      { key: "B", text: "Fractional distillation" },
      { key: "C", text: "Filtration" },
      { key: "D", text: "Chromatography" }
    ],
    correctAnswer: "A",
    explanation: "Ammonium chloride (NH₄Cl) sublimes on heating (converts directly from solid to gas and re-deposits as sublimate on cooling), while sodium chloride (NaCl) remains as a solid residue because it has a high melting point and does not sublime."
  }
];
