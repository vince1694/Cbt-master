/**
 * Arts & Humanities Department Past Questions (JAMB & WAEC)
 * Subjects: Literature in English, Government, Christian Religious Studies (CRS), History
 * Real vetted past questions with thorough contextual explanations.
 */
export const artsQuestions = [
  // ================= LITERATURE IN ENGLISH =================
  {
    id: "lit_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Literature in English",
    topic: "Literary Devices & Figures of Speech",
    department: ["Arts"],
    question: "The line 'The sun was a golden medallion stamped upon the twilight sky' is an example of:",
    options: [
      { key: "A", text: "Metaphor" },
      { key: "B", text: "Simile" },
      { key: "C", text: "Personification" },
      { key: "D", text: "Hyperbole" }
    ],
    correctAnswer: "A",
    explanation: "A metaphor is a figure of speech that makes a direct comparison between two unlike entities without using connective words such as 'like' or 'as'. Here, the sun is directly stated to be a golden medallion."
  },
  {
    id: "lit_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Literature in English",
    topic: "Drama - Dramatic Irony",
    department: ["Arts"],
    question: "When the audience knows a vital piece of information that one or more characters on stage are ignorant of, this device is called:",
    options: [
      { key: "A", text: "Dramatic irony" },
      { key: "B", text: "Tragic flaw" },
      { key: "C", text: "Catharsis" },
      { key: "D", text: "Foreshadowing" }
    ],
    correctAnswer: "A",
    explanation: "Dramatic irony occurs when the audience or reader understands the implications of a situation on stage, but the characters involved remain completely unaware, heightening dramatic tension."
  },
  {
    id: "lit_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Literature in English",
    topic: "Poetry - Tone & Mood",
    department: ["Arts"],
    question: "A poem composed specifically in mourning or lamentation for a deceased person or a solemn grief is known as a(n):",
    options: [
      { key: "A", text: "Elegy" },
      { key: "B", text: "Ode" },
      { key: "C", text: "Ballad" },
      { key: "D", text: "Sonnet" }
    ],
    correctAnswer: "A",
    explanation: "An elegy is a sorrowful or mournful poem typically expressing grief for someone who has died. An ode is a poem of praise; a ballad tells a folk story; a sonnet is a 14-line structured lyrical poem."
  },
  {
    id: "lit_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Literature in English",
    topic: "Literary Appreciation",
    department: ["Arts"],
    question: "'Peter Piper picked a peck of pickled peppers' exemplifies:",
    options: [
      { key: "A", text: "Alliteration" },
      { key: "B", text: "Assonance" },
      { key: "C", text: "Onomatopoeia" },
      { key: "D", text: "Oxymoron" }
    ],
    correctAnswer: "A",
    explanation: "Alliteration is the repetition of the same initial consonant sound in a series of closely connected words (here, the repetition of the /p/ sound)."
  },

  // ================= GOVERNMENT =================
  {
    id: "govt_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Government",
    topic: "Constitutional Development in Nigeria",
    department: ["Arts"],
    question: "Which pre-independence Nigerian constitution introduced the principle of federalism by creating three autonomous regions (Northern, Western, and Eastern)?",
    options: [
      { key: "A", text: "Lyttelton Constitution of 1954" },
      { key: "B", text: "Clifford Constitution of 1922" },
      { key: "C", text: "Richards Constitution of 1946" },
      { key: "D", text: "Macpherson Constitution of 1951" }
    ],
    correctAnswer: "A",
    explanation: "The Oliver Lyttelton Constitution of 1954 established true federalism in Nigeria. It shared legislative powers between the federal government and regional governments through the Exclusive, Concurrent, and Residual legislative lists, creating regional premiers and regional civil services."
  },
  {
    id: "govt_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Government",
    topic: "Political Concepts - Rule of Law",
    department: ["Arts"],
    question: "The concept of the Rule of Law as expounded by Professor A.V. Dicey includes all the following EXCEPT:",
    options: [
      { key: "A", text: "Immunity of political leaders from criminal prosecution" },
      { key: "B", text: "Supremacy of the law" },
      { key: "C", text: "Equality before the law" },
      { key: "D", text: "Predominance of the legal spirit and fundamental human rights" }
    ],
    correctAnswer: "A",
    explanation: "A.V. Dicey's three pillars of the Rule of Law are: (1) Absolute supremacy of regular law over arbitrary power, (2) Equality before the law (no person is above the law), and (3) Primacy of the individual rights. Blanket immunity contradicts equality before regular laws."
  },
  {
    id: "govt_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Government",
    topic: "Systems of Government",
    department: ["Arts"],
    question: "In a parliamentary system of government, the head of state and head of government are separated. The executive is drawn from and directly accountable to the:",
    options: [
      { key: "A", text: "Legislature" },
      { key: "B", text: "Judiciary" },
      { key: "C", text: "Civil Service Commission" },
      { key: "D", text: "Electoral Commission" }
    ],
    correctAnswer: "A",
    explanation: "In a parliamentary (Cabinet) system, ministers and the Prime Minister must be members of parliament (the legislature). The cabinet can be dissolved by a vote of no confidence passed by the legislature."
  },
  {
    id: "govt_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Government",
    topic: "International Organizations",
    department: ["Arts"],
    question: "The administrative headquarters of the Economic Community of West African States (ECOWAS) Commission is located in:",
    options: [
      { key: "A", text: "Abuja, Nigeria" },
      { key: "B", text: "Accra, Ghana" },
      { key: "C", text: "Dakar, Senegal" },
      { key: "D", text: "Lome, Togo" }
    ],
    correctAnswer: "A",
    explanation: "The ECOWAS Commission headquarters is situated in Abuja, Nigeria. (ECOWAS Bank for Investment and Development is in Lome, Togo)."
  },

  // ================= CHRISTIAN RELIGIOUS STUDIES (CRS) =================
  {
    id: "crs_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Christian Religious Studies",
    topic: "Old Testament - The Kings of Israel",
    department: ["Arts"],
    question: "King Solomon's apostasy and the eventual division of the United Monarchy of Israel was primarily caused by:",
    options: [
      { key: "A", text: "his foreign wives who influenced him to worship pagan deities" },
      { key: "B", text: "the rebellion of the prophet Nathan" },
      { key: "C", text: "military invasion from Egypt and Assyria" },
      { key: "D", text: "his refusal to construct the Temple in Jerusalem" }
    ],
    correctAnswer: "A",
    explanation: "According to 1 Kings 11, King Solomon loved many foreign women (Moabites, Ammonites, Edomites, Sidonians, Hittites). When he grew old, his wives turned his heart after other gods (Ashtoreth, Chemosh, Molech), provoking God's anger and leading to the kingdom's partition under Rehoboam."
  },
  {
    id: "crs_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Christian Religious Studies",
    topic: "New Testament - The Early Church",
    department: ["Arts"],
    question: "Who was chosen by casting lots to replace Judas Iscariot among the twelve Apostles in Acts 1?",
    options: [
      { key: "A", text: "Matthias" },
      { key: "B", text: "Joseph Barsabbas (Justus)" },
      { key: "C", text: "Stephen" },
      { key: "D", text: "Barnabas" }
    ],
    correctAnswer: "A",
    explanation: "In Acts 1:21-26, two men were put forward: Joseph called Barsabbas (also known as Justus) and Matthias. After prayer, they cast lots, and the lot fell on Matthias; so he was added to the eleven apostles."
  },
  {
    id: "crs_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Christian Religious Studies",
    topic: "Epistles of Paul",
    department: ["Arts"],
    question: "According to Apostle Paul in 1 Corinthians 13, the greatest of the three enduring virtues (Faith, Hope, and Love) is:",
    options: [
      { key: "A", text: "Love (Charity)" },
      { key: "B", text: "Faith" },
      { key: "C", text: "Hope" },
      { key: "D", text: "Wisdom" }
    ],
    correctAnswer: "A",
    explanation: "1 Corinthians 13:13 concludes: 'And now abide faith, hope, love, these three; but the greatest of these is love.'"
  },

  // ================= HISTORY =================
  {
    id: "hist_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "History",
    topic: "Pre-Colonial Kingdoms",
    department: ["Arts"],
    question: "In the pre-colonial Oyo Empire, the council of senior chiefs responsible for checking the powers of the Alaafin was known as the:",
    options: [
      { key: "A", text: "Oyo Mesi" },
      { key: "B", text: "Ogboni Society" },
      { key: "C", text: "Are Ona Kakanfo" },
      { key: "D", text: "Ilari" }
    ],
    correctAnswer: "A",
    explanation: "The Oyo Mesi was the council of seven hereditary noble kingmakers led by the Bashorun. They vetted royal decrees and could present an empty calabash with parrot eggs to an autocratic Alaafin, mandating his ritual suicide."
  },
  {
    id: "hist_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "History",
    topic: "Colonial Rule & Resistance",
    department: ["Arts"],
    question: "The 1929 Aba Women's War in Southeastern Nigeria was sparked primarily by rumors and attempts by the British colonial administration to:",
    options: [
      { key: "A", text: "tax women and count their domestic livestock and produce" },
      { key: "B", text: "ban traditional palm oil trade" },
      { key: "C", text: "impose monarchical rule through warrant chiefs" },
      { key: "D", text: "force women into compulsory military enlistment" }
    ],
    correctAnswer: "A",
    explanation: "The Aba Women's Riot of 1929 broke out after warrant chief Okugo attempted to conduct a census of women and their livestock in Oloko under instructions from district officer Cook, leading women to fear direct colonial taxation."
  },
  {
    id: "govt_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Government",
    topic: "Electoral Systems - Proportional Representation",
    department: ["Arts"],
    question: "An electoral system in which parliamentary seats are allocated to political parties in direct proportion to the percentage of total votes they poll nationally is known as:",
    options: [
      { key: "A", text: "Proportional Representation" },
      { key: "B", text: "First-Past-The-Post system" },
      { key: "C", text: "Alternative Vote system" },
      { key: "D", text: "Second Ballot system" }
    ],
    correctAnswer: "A",
    explanation: "Proportional Representation (PR) ensures that minority parties gain legislative representation matching their overall vote share, preventing the 'winner-takes-all' outcome typical of single-member plurality (First-Past-The-Post)."
  },
  {
    id: "lit_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Literature in English",
    topic: "Drama - Dramatic Devices",
    department: ["Arts"],
    question: "A speech delivered by a single character alone on stage that reveals their innermost thoughts, moral conflicts, and secrets to the audience is a:",
    options: [
      { key: "A", text: "Soliloquy" },
      { key: "B", text: "Monologue" },
      { key: "C", text: "Aside" },
      { key: "D", text: "Epilogue" }
    ],
    correctAnswer: "A",
    explanation: "A soliloquy is spoken by an actor while alone on stage to voice their inner psyche directly to the audience. A monologue is an extended speech addressed to other characters who are present on stage."
  }
];
