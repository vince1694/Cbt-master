/**
 * General & Cross-Departmental Past Questions (JAMB & WAEC)
 * Subjects: Civic Education (Compulsory in WAEC), Agricultural Science
 * Real, authentic past questions with vetted educational explanations.
 */
export const generalQuestions = [
  // ================= CIVIC EDUCATION =================
  {
    id: "civic_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Civic Education",
    topic: "Citizenship & Fundamental Human Rights",
    department: ["Science", "Arts", "Commercial"],
    question: "Which of the following fundamental human rights is classified as non-derogable (cannot be suspended even during a state of emergency)?",
    options: [
      { key: "A", text: "Right to life (except through execution of lawful court sentence)" },
      { key: "B", text: "Right to peaceful assembly and association" },
      { key: "C", text: "Right to freedom of movement" },
      { key: "D", text: "Right to personal liberty" }
    ],
    correctAnswer: "A",
    explanation: "Under Section 33 of the 1999 Constitution of the Federal Republic of Nigeria (as amended), the right to life is protected, and freedom from torture and inhuman treatment is an absolute human right that cannot be derogated from arbitrarily."
  },
  {
    id: "civic_waec_02",
    exam: "WAEC",
    year: "2023",
    subject: "Civic Education",
    topic: "Drug Abuse & Law Enforcement",
    department: ["Science", "Arts", "Commercial"],
    question: "The primary government agency mandated in Nigeria to combat the cultivation, trafficking, and unauthorized consumption of illicit narcotics is:",
    options: [
      { key: "A", text: "National Drug Law Enforcement Agency (NDLEA)" },
      { key: "B", text: "National Agency for Food and Drug Administration and Control (NAFDAC)" },
      { key: "C", text: "Economic and Financial Crimes Commission (EFCC)" },
      { key: "D", text: "Nigeria Security and Civil Defence Corps (NSCDC)" }
    ],
    correctAnswer: "A",
    explanation: "The NDLEA was established by Decree No. 48 of 1989 (now an Act of Parliament) to eliminate illicit trafficking and abuse of hard narcotic substances. NAFDAC regulates food, packaged water, chemicals, and pharmaceuticals."
  },
  {
    id: "civic_jamb_01",
    exam: "JAMB",
    year: "2024",
    subject: "Civic Education",
    topic: "Democracy & Electoral Process",
    department: ["Science", "Arts", "Commercial"],
    question: "Political apathy among eligible voters in a democratic nation can be minimized through:",
    options: [
      { key: "A", text: "intensive civic voter education and institutional transparency" },
      { key: "B", text: "imposition of heavy fines on non-voters" },
      { key: "C", text: "banning political debates in the mass media" },
      { key: "D", text: "postponing elections indefinitely" }
    ],
    correctAnswer: "A",
    explanation: "Political apathy stems from ignorance, distrust in the electoral process, and lack of civic consciousness. Public enlightenment and ensuring credible, transparent balloting rebuild civic engagement."
  },

  // ================= AGRICULTURAL SCIENCE =================
  {
    id: "agric_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Agricultural Science",
    topic: "Soil Science - Soil Fertility",
    department: ["Science", "Commercial"],
    question: "The process whereby soluble plant nutrients are washed down beyond the reach of plant root systems by percolating rainwater is called:",
    options: [
      { key: "A", text: "Leaching" },
      { key: "B", text: "Capillarity" },
      { key: "C", text: "Erosion" },
      { key: "D", text: "Infiltration" }
    ],
    correctAnswer: "A",
    explanation: "Leaching is the downward movement and loss of soluble mineral salts and plant nutrients through the soil profile caused by gravitational percolation of water beyond root extraction depth."
  },
  {
    id: "agric_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Agricultural Science",
    topic: "Animal Husbandry - Ruminant Digestion",
    department: ["Science", "Commercial"],
    question: "In the digestive system of ruminant livestock (such as cattle, sheep, and goats), the true stomach that secretes digestive gastric juices is the:",
    options: [
      { key: "A", text: "Abomasum" },
      { key: "B", text: "Rumen (Paunch)" },
      { key: "C", text: "Reticulum (Honeycomb)" },
      { key: "D", text: "Omasum (Manyplies)" }
    ],
    correctAnswer: "A",
    explanation: "Ruminants possess four stomach compartments: Rumen (largest fermentation chamber), Reticulum (hardware/honeycomb), Omasum (water reabsorption), and the Abomasum, which corresponds to the true monogastric stomach secreting hydrochloric acid and pepsin."
  },
  {
    id: "agric_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Agricultural Science",
    topic: "Crop Protection - Plant Diseases",
    department: ["Science", "Commercial"],
    question: "The viral disease affecting cassava in West Africa characterized by distorted, chlorotic leaves with mosaic yellow and green patterns is transmitted by:",
    options: [
      { key: "A", text: "Whitefly (Bemisia tabaci)" },
      { key: "B", text: "Stem borer (Busseola fusca)" },
      { key: "C", text: "Variegated grasshopper (Zonocerus variegatus)" },
      { key: "D", text: "Aphids" }
    ],
    correctAnswer: "A",
    explanation: "Cassava Mosaic Disease (CMD) is caused by the Cassava mosaic geminivirus and is vectored and spread from infected to healthy cassava plants primarily by the whitefly (*Bemisia tabaci*)."
  }
];
