/**
 * Core English Past Questions (Compulsory for all departments in JAMB & WAEC)
 * Verified and vetted past questions with detailed explanations.
 */
export const englishQuestions = [
  {
    id: "eng_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Use of English",
    topic: "Lexis and Structure - Antonyms",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "In the sentence below, choose the word that is most nearly OPPOSITE in meaning to the underlined word:\n\n'The magistrate described the convict's conduct as completely **reprehensible**.'",
    options: [
      { key: "A", text: "Commendable" },
      { key: "B", text: "Repulsive" },
      { key: "C", text: "Deplorable" },
      { key: "D", text: "Suspicious" }
    ],
    correctAnswer: "A",
    explanation: "'Reprehensible' means blameworthy, shameful, or deserving severe reprimand. Therefore, the opposite in meaning is 'Commendable', which means worthy of praise, approval, or admiration. 'Deplorable' and 'Repulsive' are synonyms."
  },
  {
    id: "eng_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Use of English",
    topic: "Grammar - Concord & Agreement",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "Neither the principal nor the teachers _______ present at the inter-house sports symposium yesterday.",
    options: [
      { key: "A", text: "was" },
      { key: "B", text: "were" },
      { key: "C", text: "have been" },
      { key: "D", text: "is" },
    ],
    correctAnswer: "B",
    explanation: "According to the Rule of Proximity in subject-verb agreement: when subjects are joined by 'neither... nor' or 'either... or', the verb must agree in number and person with the nearer subject. Here, 'teachers' (plural) is closer to the verb than 'the principal' (singular). Hence, the plural past verb 'were' is correct."
  },
  {
    id: "eng_jamb_03",
    exam: "JAMB",
    year: "2023",
    subject: "Use of English",
    topic: "Oral Forms - Vowel Sounds",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "Choose the word that has the same vowel sound as the one represented by the underlined letter(s):\n\npl**ai**t",
    options: [
      { key: "A", text: "plate" },
      { key: "B", text: "flat" },
      { key: "C", text: "pleat" },
      { key: "D", text: "play" }
    ],
    correctAnswer: "B",
    explanation: "The word 'plait' is pronounced /plæt/ (with the short front vowel /æ/ as in 'flat', 'cat', 'trap'), not /pleɪt/. Therefore, 'flat' contains the exact same vowel sound /æ/."
  },
  {
    id: "eng_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "English Language",
    topic: "Grammar - Idiomatic Expressions",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "After years of dispute over the ancestral land, the two families finally agreed to **bury the hatchet**.\n\nThis means that the families agreed to:",
    options: [
      { key: "A", text: "surrender their legal claims in court" },
      { key: "B", text: "make peace and resolve their quarrel" },
      { key: "C", text: "hide weapons used during the boundary clash" },
      { key: "D", text: "divide the parcel of land equally" }
    ],
    correctAnswer: "B",
    explanation: "The idiom 'to bury the hatchet' means to settle grievances, forgive past enmity, and establish peaceful relations."
  },
  {
    id: "eng_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "English Language",
    topic: "Structure - Prepositions",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "The director congratulated Dr. Adeleke _______ his appointment as the new provost.",
    options: [
      { key: "A", text: "for" },
      { key: "B", text: "with" },
      { key: "C", text: "on" },
      { key: "D", text: "at" }
    ],
    correctAnswer: "C",
    explanation: "The verb 'congratulate' collogates strictly with the preposition 'on' (or 'upon'), not 'for'. One congratulates someone ON an achievement or milestone."
  },
  {
    id: "eng_jamb_04",
    exam: "JAMB",
    year: "2024",
    subject: "Use of English",
    topic: "Sentence Interpretation",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "Select the option that best explains the information conveyed in the sentence:\n\n'Had Amina prepared diligently for the test, she would not have felt down in the dumps.'",
    options: [
      { key: "A", text: "Amina prepared well and passed with flying colours." },
      { key: "B", text: "Amina did not prepare diligently, so she felt very sad and disappointed." },
      { key: "C", text: "Amina was sad despite preparing very hard." },
      { key: "D", text: "Amina prepared hard, but the examination was cancelled." }
    ],
    correctAnswer: "B",
    explanation: "The third conditional inversion ('Had Amina prepared...') indicates an unfulfilled condition in the past. Amina did not prepare, and 'down in the dumps' is an idiom meaning feeling depressed, unhappy, or gloomy."
  },
  {
    id: "eng_waec_03",
    exam: "WAEC",
    year: "2023",
    subject: "English Language",
    topic: "Lexis - Nearest in Meaning",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "Choose the option nearest in meaning to the underlined word:\n\n'The speaker gave an **extempore** speech that kept the audience enthralled.'",
    options: [
      { key: "A", text: "unrehearsed" },
      { key: "B", text: "lengthy" },
      { key: "C", text: "prepared" },
      { key: "D", text: "critical" }
    ],
    correctAnswer: "A",
    explanation: "'Extempore' refers to spoken or done without prior preparation or rehearsal; impromptu. Hence 'unrehearsed' is the nearest in meaning."
  },
  {
    id: "eng_jamb_05",
    exam: "JAMB",
    year: "2024",
    subject: "Use of English",
    topic: "Oral Forms - Syllable Stress",
    department: ["Science", "Arts", "Commercial"],
    passage: null,
    question: "Choose the option that has the correct primary stress placement for the word in capital letters:\n\nPHO-TO-GRAPH-IC",
    options: [
      { key: "A", text: "pho-TO-graph-ic" },
      { key: "B", text: "pho-to-GRAPH-ic" },
      { key: "C", text: "PHO-to-graph-ic" },
      { key: "D", text: "pho-to-graph-IC" }
    ],
    correctAnswer: "B",
    explanation: "Words ending with the suffix '-ic' or '-ical' take primary stress on the penultimate (second to last) syllable. Thus, pho-to-GRAPH-ic has its stress on the third syllable: /ˌfəʊ.təˈɡræf.ɪk/."
  },
  {
    id: "eng_waec_04",
    exam: "WAEC",
    year: "2023",
    subject: "English Language",
    topic: "Reading Comprehension",
    department: ["Science", "Arts", "Commercial"],
    passage: "Climate change presents an existential crisis across sub-Saharan Africa. Shifting rainfall patterns have disrupted planting seasons, while intense droughts in the Sahel basin have triggered farmer-herder skirmishes over grazing reserves. Mitigating this catastrophic trajectory requires sustainable agricultural transformation and renewable energy investments.",
    question: "According to the passage, the primary cause of farmer-herder skirmishes in the Sahel basin is:",
    options: [
      { key: "A", text: "scarcity of grazing land precipitated by severe droughts" },
      { key: "B", text: "deliberate political manipulation by foreign powers" },
      { key: "C", text: "the total collapse of renewable energy investments" },
      { key: "D", text: "the introduction of modern mechanized farm tools" }
    ],
    correctAnswer: "A",
    explanation: "The passage explicitly states: 'intense droughts in the Sahel basin have triggered farmer-herder skirmishes over grazing reserves', which directly points to scarcity of grazing land caused by drought."
  }
];
