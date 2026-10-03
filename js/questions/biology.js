/**
 * Biology Past Questions — JAMB & WAEC
 * Cell biology, genetics, ecology, human physiology, reproduction
 */
export const biologyQuestions = [

  // ── CELL BIOLOGY ─────────────────────────────────────────
  {
    id: "bio_bank_jamb_01", exam: "JAMB", year: "2023", subject: "Biology",
    topic: "Cell Structure & Function", department: ["Science"],
    question: "Which organelle is responsible for the production of ATP through aerobic respiration in eukaryotic cells?",
    options: [
      { key: "A", text: "Ribosome" },
      { key: "B", text: "Golgi apparatus" },
      { key: "C", text: "Endoplasmic reticulum" },
      { key: "D", text: "Mitochondrion" }
    ],
    correctAnswer: "D",
    explanation: "The mitochondrion is the 'powerhouse of the cell'. It is the site of aerobic respiration where glucose is oxidized to produce ATP (adenosine triphosphate) through the Krebs cycle and oxidative phosphorylation."
  },
  {
    id: "bio_cell_wall_01", exam: "JAMB", year: "2022", subject: "Biology",
    topic: "Cell Structure & Function", department: ["Science"],
    question: "The cell wall of plant cells is composed primarily of:",
    options: [
      { key: "A", text: "Chitin" },
      { key: "B", text: "Peptidoglycan" },
      { key: "C", text: "Cellulose" },
      { key: "D", text: "Murein" }
    ],
    correctAnswer: "C",
    explanation: "Plant cell walls are composed primarily of cellulose, a polysaccharide made of glucose units linked by β-1,4-glycosidic bonds. Chitin is found in fungal cell walls; peptidoglycan/murein in bacterial cell walls."
  },
  {
    id: "bio_waec_01", exam: "WAEC", year: "2023", subject: "Biology",
    topic: "Cell Division", department: ["Science"],
    question: "During which phase of mitosis do chromosomes align at the equatorial plate (metaphase plate)?",
    options: [
      { key: "A", text: "Prophase" },
      { key: "B", text: "Metaphase" },
      { key: "C", text: "Anaphase" },
      { key: "D", text: "Telophase" }
    ],
    correctAnswer: "B",
    explanation: "Metaphase is when chromosomes are most condensed and align along the cell's equatorial plane (metaphase plate). Spindle fibres from opposite poles attach to the centromeres, ready to pull chromatids apart."
  },
  {
    id: "bio_jamb_03", exam: "JAMB", year: "2024", subject: "Biology",
    topic: "Cell Division", department: ["Science"],
    question: "Meiosis results in the production of:",
    options: [
      { key: "A", text: "2 diploid daughter cells identical to the parent cell" },
      { key: "B", text: "4 haploid cells genetically different from the parent" },
      { key: "C", text: "2 haploid cells identical to each other" },
      { key: "D", text: "4 diploid cells with crossing over" }
    ],
    correctAnswer: "B",
    explanation: "Meiosis produces 4 haploid (n) daughter cells that are genetically unique due to crossing over (recombination) during Prophase I and independent assortment during Metaphase I."
  },

  // ── GENETICS ─────────────────────────────────────────────
  {
    id: "bio_jamb_04", exam: "JAMB", year: "2023", subject: "Biology",
    topic: "Genetics & Heredity", department: ["Science"],
    question: "In a monohybrid cross between two heterozygous parents (Aa × Aa), what is the expected phenotypic ratio of offspring?",
    options: [
      { key: "A", text: "1:2:1" },
      { key: "B", text: "3:1" },
      { key: "C", text: "1:1" },
      { key: "D", text: "9:3:3:1" }
    ],
    correctAnswer: "B",
    explanation: "Aa × Aa produces: AA : 2Aa : aa (genotypic 1:2:1), but phenotypically, AA and Aa both show the dominant trait, giving a 3 dominant : 1 recessive phenotypic ratio."
  },
  {
    id: "bio_waec_02", exam: "WAEC", year: "2023", subject: "Biology",
    topic: "Genetics & Heredity", department: ["Science"],
    question: "Sickle cell anaemia is caused by a mutation in the gene coding for:",
    options: [
      { key: "A", text: "Haemoglobin" },
      { key: "B", text: "Insulin" },
      { key: "C", text: "Fibrinogen" },
      { key: "D", text: "Myoglobin" }
    ],
    correctAnswer: "A",
    explanation: "Sickle cell anaemia results from a point mutation in the HBB gene on chromosome 11, changing glutamic acid to valine at position 6 of the beta-globin chain of haemoglobin, causing red blood cells to sickle under low oxygen conditions."
  },
  {
    id: "bio_jamb_05", exam: "JAMB", year: "2022", subject: "Biology",
    topic: "Genetics & Heredity", department: ["Science"],
    question: "A man with blood group AB marries a woman with blood group O. What blood groups are possible in their children?",
    options: [
      { key: "A", text: "A and B only" },
      { key: "B", text: "A, B, AB, and O" },
      { key: "C", text: "AB and O only" },
      { key: "D", text: "O only" }
    ],
    correctAnswer: "A",
    explanation: "Man (AB = I^A I^B) × Woman (O = ii). Possible offspring: I^A i (Blood group A) and I^B i (Blood group B). Therefore, only blood groups A and B are possible — not AB or O."
  },
  {
    id: "bio_waec_03", exam: "WAEC", year: "2022", subject: "Biology",
    topic: "Genetics & Heredity", department: ["Science"],
    question: "Colour blindness is an X-linked recessive trait. A woman who is a carrier (X^N X^n) marries a normal-visioned man (X^N Y). What is the probability of having a colour-blind son?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "50%" },
      { key: "C", text: "75%" },
      { key: "D", text: "100%" }
    ],
    correctAnswer: "A",
    explanation: "Cross: X^N X^n × X^N Y gives: X^N X^N (normal female), X^N X^n (carrier female), X^N Y (normal male), X^n Y (colour-blind male). Out of 4 offspring, 1 is a colour-blind son = 25% of all offspring (or 50% of sons)."
  },

  // ── HUMAN PHYSIOLOGY ─────────────────────────────────────
  {
    id: "bio_jamb_06", exam: "JAMB", year: "2024", subject: "Biology",
    topic: "Human Physiology – Digestion", department: ["Science"],
    question: "Bile, which emulsifies fats during digestion, is produced by the _______ and stored in the _______.",
    options: [
      { key: "A", text: "Pancreas; duodenum" },
      { key: "B", text: "Liver; gall bladder" },
      { key: "C", text: "Stomach; liver" },
      { key: "D", text: "Gall bladder; small intestine" }
    ],
    correctAnswer: "B",
    explanation: "Bile is produced (synthesized) by the liver from bilirubin and cholesterol, then stored in the gall bladder. It is released into the duodenum via the bile duct during digestion to emulsify (break down) fat droplets."
  },
  {
    id: "bio_waec_04", exam: "WAEC", year: "2024", subject: "Biology",
    topic: "Human Physiology – Circulation", department: ["Science"],
    question: "The bicuspid (mitral) valve is located between the:",
    options: [
      { key: "A", text: "Right atrium and right ventricle" },
      { key: "B", text: "Left atrium and left ventricle" },
      { key: "C", text: "Left ventricle and aorta" },
      { key: "D", text: "Right ventricle and pulmonary artery" }
    ],
    correctAnswer: "B",
    explanation: "The bicuspid (mitral) valve separates the left atrium from the left ventricle, preventing backflow of blood during ventricular contraction. The tricuspid valve is on the right side between the right atrium and right ventricle."
  },
  {
    id: "bio_jamb_07", exam: "JAMB", year: "2025", subject: "Biology",
    topic: "Human Physiology – Excretion", department: ["Science"],
    question: "The functional unit of the kidney responsible for filtering blood and producing urine is the:",
    options: [
      { key: "A", text: "Glomerulus" },
      { key: "B", text: "Renal tubule" },
      { key: "C", text: "Bowman's capsule" },
      { key: "D", text: "Nephron" }
    ],
    correctAnswer: "D",
    explanation: "The nephron is the complete functional unit of the kidney. Each kidney contains approximately 1 million nephrons. Each nephron consists of the glomerulus, Bowman's capsule, proximal convoluted tubule, loop of Henle, distal convoluted tubule, and collecting duct — all working together to filter blood and concentrate urine."
  },
  {
    id: "bio_waec_05", exam: "WAEC", year: "2025", subject: "Biology",
    topic: "Human Physiology – Nervous System", department: ["Science"],
    question: "Which part of the human brain is responsible for maintaining balance, posture, and coordination of muscular activities?",
    options: [
      { key: "A", text: "Cerebrum" },
      { key: "B", text: "Medulla oblongata" },
      { key: "C", text: "Cerebellum" },
      { key: "D", text: "Hypothalamus" }
    ],
    correctAnswer: "C",
    explanation: "The cerebellum (hindbrain) coordinates voluntary muscle movements, maintains posture and balance. The cerebrum handles conscious thought; the medulla oblongata controls involuntary functions (breathing, heart rate); the hypothalamus regulates homeostasis and hormones."
  },

  // ── ECOLOGY & ENVIRONMENT ────────────────────────────────
  {
    id: "bio_jamb_08", exam: "JAMB", year: "2023", subject: "Biology",
    topic: "Ecology", department: ["Science"],
    question: "In an ecosystem, which trophic level contains organisms that obtain energy by eating both plants and animals?",
    options: [
      { key: "A", text: "Primary consumers (herbivores)" },
      { key: "B", text: "Omnivores — secondary or tertiary consumers" },
      { key: "C", text: "Producers (autotrophs)" },
      { key: "D", text: "Decomposers (saprophytes)" }
    ],
    correctAnswer: "B",
    explanation: "Omnivores consume both plants and animals, placing them at multiple trophic levels (secondary and/or tertiary consumers). Examples include humans, bears, and rats. They occupy a flexible position in food webs."
  },
  {
    id: "bio_waec_06", exam: "WAEC", year: "2023", subject: "Biology",
    topic: "Ecology", department: ["Science"],
    question: "Nitrogen is returned to the atmosphere from the soil through the process of:",
    options: [
      { key: "A", text: "Nitrification" },
      { key: "B", text: "Nitrogen fixation" },
      { key: "C", text: "Denitrification" },
      { key: "D", text: "Ammonification" }
    ],
    correctAnswer: "C",
    explanation: "Denitrification is the process by which denitrifying bacteria (e.g., Pseudomonas denitrificans) in the soil convert nitrates (NO₃⁻) and nitrites (NO₂⁻) back into atmospheric nitrogen gas (N₂), completing the nitrogen cycle."
  },
  {
    id: "bio_jamb_09", exam: "JAMB", year: "2022", subject: "Biology",
    topic: "Ecology", department: ["Science"],
    question: "The relationship between a shark and a remora fish (which feeds on the shark's food scraps without harming or benefiting the shark) is an example of:",
    options: [
      { key: "A", text: "Mutualism" },
      { key: "B", text: "Parasitism" },
      { key: "C", text: "Predation" },
      { key: "D", text: "Commensalism" }
    ],
    correctAnswer: "D",
    explanation: "Commensalism is a relationship where one organism (the remora) benefits while the other (the shark) is neither harmed nor helped. Mutualism benefits both; parasitism harms the host; predation involves one organism killing another."
  },

  // ── PLANT BIOLOGY ────────────────────────────────────────
  {
    id: "bio_jamb_10", exam: "JAMB", year: "2024", subject: "Biology",
    topic: "Plant Physiology", department: ["Science"],
    question: "Photosynthesis takes place in two stages. The light-dependent reactions occur in the _______, while the light-independent reactions (Calvin cycle) occur in the _______.",
    options: [
      { key: "A", text: "Stroma; thylakoid membrane" },
      { key: "B", text: "Thylakoid membrane; stroma" },
      { key: "C", text: "Chlorophyll; cytoplasm" },
      { key: "D", text: "Matrix; cristae" }
    ],
    correctAnswer: "B",
    explanation: "Light-dependent reactions occur in the thylakoid membranes (grana), using light energy to produce ATP, NADPH, and O₂ via photolysis of water. The Calvin cycle (light-independent) occurs in the stroma, using ATP and NADPH to fix CO₂ into glucose."
  },
  {
    id: "bio_waec_07", exam: "WAEC", year: "2022", subject: "Biology",
    topic: "Plant Physiology", department: ["Science"],
    question: "Water moves up through the xylem vessels of plants primarily by the mechanism of:",
    options: [
      { key: "A", text: "Root pressure alone" },
      { key: "B", text: "Transpiration-cohesion-tension mechanism" },
      { key: "C", text: "Active transport by phloem cells" },
      { key: "D", text: "Capillarity without cohesion" }
    ],
    correctAnswer: "B",
    explanation: "Water rises in xylem primarily through the transpiration-cohesion-tension (TCT) mechanism: transpiration from leaves creates tension that pulls water upward; cohesion between water molecules and adhesion to xylem walls maintain a continuous water column."
  },

  // ── REPRODUCTION ────────────────────────────────────────
  {
    id: "bio_jamb_11", exam: "JAMB", year: "2025", subject: "Biology",
    topic: "Reproduction", department: ["Science"],
    question: "In humans, fertilization of the egg by a sperm cell normally takes place in the:",
    options: [
      { key: "A", text: "Uterus" },
      { key: "B", text: "Ovary" },
      { key: "C", text: "Fallopian tube (oviduct)" },
      { key: "D", text: "Cervix" }
    ],
    correctAnswer: "C",
    explanation: "Fertilization normally occurs in the Fallopian tube (oviduct), specifically in the ampulla region. After ovulation, the egg is swept into the fallopian tube where it may be fertilized by sperm. The fertilized egg (zygote) then travels to the uterus for implantation."
  },
  {
    id: "bio_waec_08", exam: "WAEC", year: "2024", subject: "Biology",
    topic: "Reproduction", department: ["Science"],
    question: "Which hormone triggers ovulation in the female menstrual cycle?",
    options: [
      { key: "A", text: "Follicle Stimulating Hormone (FSH)" },
      { key: "B", text: "Luteinizing Hormone (LH)" },
      { key: "C", text: "Oestrogen" },
      { key: "D", text: "Progesterone" }
    ],
    correctAnswer: "B",
    explanation: "A sudden surge in Luteinizing Hormone (LH) — called the 'LH surge' — triggers ovulation (release of the mature egg from the Graafian follicle) around day 14 of the 28-day cycle. FSH stimulates follicle development; oestrogen and progesterone maintain the uterine lining."
  }
];
