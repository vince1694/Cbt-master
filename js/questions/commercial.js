/**
 * Commercial Department Past Questions (JAMB & WAEC)
 * Subjects: Economics, Commerce, Financial Accounting
 * Real vetted past questions with step-by-step financial calculations and economics principles.
 */
export const commercialQuestions = [
  // ================= ECONOMICS =================
  {
    id: "econs_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Economics",
    topic: "Elasticity of Demand & Supply",
    department: ["Commercial", "Arts", "Science"],
    question: "When the price of a commodity increases from ₦200 to ₦250, the quantity demanded falls from 500 units to 350 units. Calculate the price elasticity of demand (PED).",
    options: [
      { key: "A", text: "1.20" },
      { key: "B", text: "0.83" },
      { key: "C", text: "1.50" },
      { key: "D", text: "0.60" }
    ],
    correctAnswer: "A",
    explanation: "Percentage change in quantity demanded = ((350 - 500) / 500) * 100% = -150/500 * 100% = -30%.\nPercentage change in price = ((250 - 200) / 200) * 100% = 50/200 * 100% = +25%.\nPED = |% ΔQd / % ΔP| = |-30% / 25%| = 1.20.\nSince PED > 1, demand for the commodity is price elastic."
  },
  {
    id: "econs_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Economics",
    topic: "Market Structures",
    department: ["Commercial", "Arts"],
    question: "Under perfect competition, a firm achieves profit-maximizing equilibrium in both the short-run and long-run where:",
    options: [
      { key: "A", text: "Marginal Cost (MC) = Marginal Revenue (MR) = Price (P)" },
      { key: "B", text: "Average Cost (AC) = Total Revenue (TR)" },
      { key: "C", text: "Marginal Revenue (MR) = 0" },
      { key: "D", text: "Average Revenue (AR) > Marginal Cost (MC)" }
    ],
    correctAnswer: "A",
    explanation: "In perfect competition, price equals Average Revenue (AR) and Marginal Revenue (MR) because firms are price takers. The profit maximization condition is MC = MR, hence MC = MR = P."
  },
  {
    id: "econs_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Economics",
    topic: "National Income & Inflation",
    department: ["Commercial", "Arts"],
    question: "Cost-push inflation is primarily caused by an increase in:",
    options: [
      { key: "A", text: "the cost of factors of production such as wages and raw materials" },
      { key: "B", text: "aggregate demand over aggregate supply" },
      { key: "C", text: "the total money supply in circulation by the central bank" },
      { key: "D", text: "consumer credit availability" }
    ],
    correctAnswer: "A",
    explanation: "Cost-push inflation occurs when the overall price level increases due to increases in the cost of production (wages, fuel, raw materials, import duties), causing the aggregate supply curve to shift leftward. Demand-pull is caused by excess aggregate demand."
  },
  {
    id: "econs_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Economics",
    topic: "Money & Banking",
    department: ["Commercial"],
    question: "Which of the following is a monetary policy tool utilized by the Central Bank of Nigeria (CBN) to contract the money supply during inflation?",
    options: [
      { key: "A", text: "Selling government securities via Open Market Operations (OMO)" },
      { key: "B", text: "Reducing the Cash Reserve Ratio (CRR)" },
      { key: "C", text: "Lowering the Monetary Policy Rate (MPR)" },
      { key: "D", text: "Purchasing treasury bills from commercial banks" }
    ],
    correctAnswer: "A",
    explanation: "When the Central Bank SELLS securities through Open Market Operations (OMO), it absorbs liquidity/cash from the commercial banking system, reducing their lending power and contracting the total money supply to curb inflation."
  },

  // ================= COMMERCE =================
  {
    id: "comm_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Commerce",
    topic: "Aids to Trade - Insurance",
    department: ["Commercial"],
    question: "The insurance principle which stipulates that the insured should not be allowed to make a profit from a loss, but only restored to their prior financial state, is:",
    options: [
      { key: "A", text: "Indemnity" },
      { key: "B", text: "Insurable Interest" },
      { key: "C", text: "Uberrimae Fidei (Utmost Good Faith)" },
      { key: "D", text: "Subrogation" }
    ],
    correctAnswer: "A",
    explanation: "The Principle of Indemnity states that the insured person must be compensated only to the exact amount of the financial loss incurred, ensuring they neither gain nor profit from an insurance claim. (Note: Life assurance is exempt from strict indemnity)."
  },
  {
    id: "comm_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Commerce",
    topic: "Business Organizations",
    department: ["Commercial"],
    question: "A major difference between a Private Limited Company and a Public Limited Company is that a Private Limited Company:",
    options: [
      { key: "A", text: "cannot invite the general public to subscribe for its shares or debentures" },
      { key: "B", text: "has unlimited liability for its shareholders" },
      { key: "C", text: "must end its name with 'Plc'" },
      { key: "D", text: "must have a minimum of 50 directors" }
    ],
    correctAnswer: "A",
    explanation: "Under corporate law (CAMA in Nigeria), a Private Limited Company ('Ltd') restricts the right to transfer shares and is legally prohibited from inviting the public to subscribe for its shares or debentures. Public companies ('Plc') can issue shares to the public on the Stock Exchange."
  },
  {
    id: "comm_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Commerce",
    topic: "International Trade",
    department: ["Commercial"],
    question: "A document issued by a shipping company acknowledging the receipt of goods on board a vessel and detailing the shipment terms is called a:",
    options: [
      { key: "A", text: "Bill of Lading" },
      { key: "B", text: "Consular Invoice" },
      { key: "C", text: "Certificate of Origin" },
      { key: "D", text: "Letter of Hypothecation" }
    ],
    correctAnswer: "A",
    explanation: "A Bill of Lading (B/L) is a vital shipping document that serves three main purposes: (1) a receipt for cargo loaded on board, (2) evidence of the contract of carriage, and (3) a document of title to the goods."
  },
  {
    id: "comm_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Commerce",
    topic: "Warehousing & Logistics",
    department: ["Commercial"],
    question: "A bonded warehouse is a secured facility operated under customs control where:",
    options: [
      { key: "A", text: "imported goods are stored until customs import duties are fully paid" },
      { key: "B", text: "perishable agricultural items are frozen for export" },
      { key: "C", text: "counterfeit confiscated goods are permanently destroyed" },
      { key: "D", text: "retail goods are packaged and labeled for local distribution" }
    ],
    correctAnswer: "A",
    explanation: "A bonded warehouse is licensed by the government customs authority to store dutiable goods. Dutiable goods can undergo manipulation or packaging inside without paying duties until they are released into the domestic market."
  },

  // ================= FINANCIAL ACCOUNTING =================
  {
    id: "acc_jamb_01",
    exam: "JAMB",
    year: "2023",
    subject: "Financial Accounting",
    topic: "Accounting Equation & Double Entry",
    department: ["Commercial"],
    question: "If total assets of a firm are ₦1,250,000 and total liabilities are ₦450,000, what is the value of Owner's Equity (Capital)?",
    options: [
      { key: "A", text: "₦800,000" },
      { key: "B", text: "₦1,700,000" },
      { key: "C", text: "₦950,000" },
      { key: "D", text: "₦700,000" }
    ],
    correctAnswer: "A",
    explanation: "The fundamental accounting equation is: Assets = Capital (Owner's Equity) + Liabilities.\nTherefore: Capital = Assets - Liabilities\nCapital = ₦1,250,000 - ₦450,000 = ₦800,000."
  },
  {
    id: "acc_waec_01",
    exam: "WAEC",
    year: "2023",
    subject: "Financial Accounting",
    topic: "Bank Reconciliation Statement",
    department: ["Commercial"],
    question: "In preparing a Bank Reconciliation Statement, uncredited cheques (deposits in transit) are:",
    options: [
      { key: "A", text: "added to balance as per bank statement or deducted from cash book balance" },
      { key: "B", text: "deducted from bank statement balance" },
      { key: "C", text: "credited to the customer's personal account" },
      { key: "D", text: "debited to the Profit and Loss Account" }
    ],
    correctAnswer: "A",
    explanation: "Uncredited cheques are cheques received and already entered on the debit side of the cash book, but which have not yet cleared or been credited by the bank. When starting from the Bank Statement balance, they are added to arrive at the Cash Book balance."
  },
  {
    id: "acc_jamb_02",
    exam: "JAMB",
    year: "2022",
    subject: "Financial Accounting",
    topic: "Depreciation of Fixed Assets",
    department: ["Commercial"],
    question: "A delivery van was purchased for ₦2,000,000. It has an estimated useful life of 5 years and a residual scrap value of ₦200,000. Using the straight-line method, calculate the annual depreciation charge.",
    options: [
      { key: "A", text: "₦360,000" },
      { key: "B", text: "₦400,000" },
      { key: "C", text: "₦440,000" },
      { key: "D", text: "₦320,000" }
    ],
    correctAnswer: "A",
    explanation: "Straight-line annual depreciation = (Cost of Asset - Residual Value) / Useful life in years\nAnnual Depreciation = (₦2,000,000 - ₦200,000) / 5 = ₦1,800,000 / 5 = ₦360,000 per year."
  },
  {
    id: "acc_waec_02",
    exam: "WAEC",
    year: "2022",
    subject: "Financial Accounting",
    topic: "Correction of Errors",
    department: ["Commercial"],
    question: "A transaction where an entire sales transaction of ₦50,000 to Babatunde was omitted completely from both the Sales Day Book and Babatunde's Personal Account is known as an:",
    options: [
      { key: "A", text: "Error of Omission" },
      { key: "B", text: "Error of Commission" },
      { key: "C", text: "Error of Principle" },
      { key: "D", text: "Compensating Error" }
    ],
    correctAnswer: "A",
    explanation: "An Error of Omission occurs when a transaction is completely missed or omitted from both sides of the double-entry records. Because neither debit nor credit was recorded, the trial balance still balances."
  },
  {
    id: "econs_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Economics",
    topic: "Fiscal Policy & Taxation",
    department: ["Commercial", "Arts"],
    question: "A tax system where higher income earners pay a progressively higher proportion of their total income as tax compared to lower income earners is termed:",
    options: [
      { key: "A", text: "Progressive tax" },
      { key: "B", text: "Regressive tax" },
      { key: "C", text: "Proportional flat tax" },
      { key: "D", text: "Specific excise duty" }
    ],
    correctAnswer: "A",
    explanation: "A progressive tax places a higher tax rate on high-income earners than on low-income earners, promoting income redistribution and equity. Regressive taxes take a larger percentage of income from low earners."
  },
  {
    id: "comm_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Commerce",
    topic: "Negotiable Instruments",
    department: ["Commercial"],
    question: "The party who writes and signs a Bill of Exchange, ordering payment to be made, is referred to as the:",
    options: [
      { key: "A", text: "Drawer" },
      { key: "B", text: "Drawee" },
      { key: "C", text: "Payee" },
      { key: "D", text: "Endorsee" }
    ],
    correctAnswer: "A",
    explanation: "In a Bill of Exchange: The 'Drawer' is the party creating and signing the bill (the creditor). The 'Drawee' is the party directed to pay (the debtor/bank). The 'Payee' is the party to whom payment is ultimately made."
  },
  {
    id: "acc_jamb_03",
    exam: "JAMB",
    year: "2024",
    subject: "Financial Accounting",
    topic: "Working Capital Analysis",
    department: ["Commercial"],
    question: "Calculate the Working Capital of a firm with the following balances:\nInventory: ₦180,000, Trade Receivables: ₦120,000, Bank Balance: ₦50,000, Trade Payables: ₦110,000, Accrued Expenses: ₦40,000.",
    options: [
      { key: "A", text: "₦200,000" },
      { key: "B", text: "₦350,000" },
      { key: "C", text: "₦150,000" },
      { key: "D", text: "₦240,000" }
    ],
    correctAnswer: "A",
    explanation: "Working Capital = Total Current Assets - Total Current Liabilities.\nCurrent Assets = Inventory (₦180,000) + Receivables (₦120,000) + Bank (₦50,000) = ₦350,000.\nCurrent Liabilities = Payables (₦110,000) + Accrued Expenses (₦40,000) = ₦150,000.\nWorking Capital = ₦350,000 - ₦150,000 = ₦200,000."
  }
];
