// QuestionGenerator.js - High-Stakes Exam Engine (MCAT, Gaokao, JAMB, AP, CSAT)
import { MANUAL_QUESTIONS } from './ManualQuestions';

const QuestionGenerator = {
  // Utility Functions
  random: (arr) => arr[Math.floor(Math.random() * arr.length)],

  randomNum: (min, max, decimals = 0) => {
    const num = Math.random() * (max - min) + min;
    return decimals > 0 ? parseFloat(num.toFixed(decimals)) : Math.floor(num);
  },

  // Constants
  CONSTANTS: {
    R: 8.314, // J/(mol·K)
    F: 96485, // C/mol
    Na: 6.022e23, // avg number
    h: 6.626e-34, // Js
    c: 3.0e8, // m/s
    kw: 1.0e-14
  },

  // =========================================================================
  // MCAT (Medical College Admission Test) - Critical Reasoning & Biochem focus
  // =========================================================================
  generateMCAT() {
    // Topic: Enzymatic Kinetics (Michaelis-Menten)
    const km = this.randomNum(1, 10, 1); // mM
    const vmax = this.randomNum(50, 200); // µmol/min
    const s = this.randomNum(2, 20); // mM

    const v = (vmax * s) / (km + s);

    // Distractors
    const d1 = (vmax * s) / (km - s); // Wrong formula sign
    const d2 = (vmax * km) / (s + km); // Swapped variables
    const d3 = vmax / 2; // Assuming Vmax/2 logic incorrectly

    return {
      id: `mcat_${Date.now()}_${Math.random()}`,
      examType: "MCAT",
      topic: "Biochemistry / Kinetics",
      difficulty: "Hard",
      type: "Critical Reasoning",
      icon: "🧬",
      question: `An enzyme follows Michaelis-Menten kinetics with a Km of ${km} mM and a Vmax of ${vmax} µmol/min.\n\nAt a substrate concentration of ${s} mM, what is the initial reaction velocity (V₀)?`,
      options: [
        { id: "A", text: `${v.toFixed(1)} µmol/min` },
        { id: "B", text: `${d1.toFixed(1)} µmol/min` },
        { id: "C", text: `${d2.toFixed(1)} µmol/min` },
        { id: "D", text: `${d3.toFixed(1)} µmol/min` }
      ],
      answer: `${v.toFixed(1)} µmol/min`,
      correctOptionId: "A",
      solution: [
        "1. Recall the Michaelis-Menten equation: V₀ = (Vmax · [S]) / (Km + [S])",
        `2. Substitute values: V₀ = (${vmax} · ${s}) / (${km} + ${s})`,
        `3. Calculate numerator: ${vmax * s}`,
        `4. Calculate denominator: ${km + s}`,
        `5. Divide: ${(vmax * s)} / ${(km + s)} ≈ ${v.toFixed(1)} µmol/min`,
        "Key Concept: At high [S] >> Km, V₀ approaches Vmax, but here [S] is comparable to Km."
      ]
    };
  },

  // =========================================================================
  // Gaokao (China) - Complex Calculation & Synthesis
  // =========================================================================
  generateGaokao() {
    // Topic: Solubility Product (Ksp) & Common Ion Effect
    const ksp = 1.8e-10;
    const naclConc = this.randomNum(0.01, 0.1, 2); // M

    // s (solubility) approx Ksp / [Cl-] because s is small
    const s = ksp / naclConc;

    // Distractors
    const d1 = Math.sqrt(ksp);
    const d2 = ksp * naclConc;
    const d3 = naclConc / ksp;

    return {
      id: `gk_${Date.now()}_${Math.random()}`,
      examType: "Gaokao",
      topic: "Chemical Equilibrium",
      difficulty: "Hard",
      type: "Calculation",
      icon: "🐉",
      question: `At 25°C, the Ksp of AgCl is 1.8 × 10⁻¹⁰. Calculate the solubility (mol/L) of AgCl in a ${naclConc} M NaCl solution.\n(Assume volume change is negligible and complete dissociation of NaCl).`,
      options: [
        { id: "A", text: `${s.toExponential(1)} mol/L` },
        { id: "B", text: `${d1.toExponential(1)} mol/L` },
        { id: "C", text: `${d2.toExponential(1)} mol/L` },
        { id: "D", text: "1.3 × 10⁻⁵ mol/L" }
      ],
      answer: `${s.toExponential(1)} mol/L`,
      correctOptionId: "A",
      solution: [
        "1. Write dissolution equilibrium: AgCl(s) ⇌ Ag⁺(aq) + Cl⁻(aq)",
        "2. Identify Common Ion source: NaCl -> Na⁺ + Cl⁻. [Cl⁻]initial = " + naclConc + " M",
        "3. Set up Ksp expression: Ksp = [Ag⁺][Cl⁻]",
        "4. Let s be solubility of AgCl. [Ag⁺] = s, [Cl⁻] = " + naclConc + " + s",
        `5. Since Ksp is very small, assume s << ${naclConc}, so [Cl⁻] ≈ ${naclConc}`,
        `6. 1.8e-10 = (s)(${naclConc})`,
        `7. s = 1.8e-10 / ${naclConc} = ${s.toExponential(1)} M`,
        "This demonstrates the drastic reduction in solubility due to the Common Ion Effect."
      ]
    };
  },

  // =========================================================================
  // JAMB (Nigeria) - Organic Chemistry & Industrial Processes
  // =========================================================================
  generateJAMB() {
    const reactions = [
      {
        q: "Which sequence correctly converts Ethanol to Ethanoic Acid?",
        a: "Oxidation with KMnO₄/H⁺",
        d1: "Dehydration with H₂SO₄",
        d2: "Reduction with LiAlH₄",
        d3: "Esterification with Methanol",
        exp: "Ethanol (primary alcohol) oxidizes to Ethanoic Acid using a strong oxidizing agent like acidified KMnO₄ or K₂Cr₂O₇."
      },
      {
        q: "What is the major product formed when Propene reacts with HBr obeys Markovnikov's rule?",
        a: "2-bromopropane",
        d1: "1-bromopropane",
        d2: "1,2-dibromopropane",
        d3: "Propan-2-ol",
        exp: "According to Markovnikov's rule, the H adds to the carbon with more hydrogens, and Br adds to the more substituted carbon."
      },
      {
        q: "The industrial preparation of Ammonia uses which process and catalyst?",
        a: "Haber Process; Iron catalyst",
        d1: "Contact Process; Vanadium(V) Oxide",
        d2: "Solvay Process; Nickel",
        d3: "Ostwald Process; Platinum",
        exp: "The Haber process combines N₂ and H₂ to form NH₃ using an Iron catalyst at high pressure and moderate temperature."
      }
    ];

    const item = this.random(reactions);

    return {
      id: `jamb_${Date.now()}_${Math.random()}`,
      examType: "JAMB (UTME)",
      topic: "Organic/Industrial Chemistry",
      difficulty: "Hard",
      type: "Concept",
      icon: "🇳🇬",
      question: item.q,
      options: [
        { id: "A", text: item.a },
        { id: "B", text: item.d1 },
        { id: "C", text: item.d2 },
        { id: "D", text: item.d3 }
      ],
      answer: item.a,
      correctOptionId: "A",
      solution: [
        `Correct Answer: ${item.a}`,
        `Reasoning: ${item.exp}`,
        "Distractor Analysis:",
        `- ${item.d1}: Incorrect specific reagent/rule application.`,
        `- ${item.d2}: Incorrect reaction type (e.g. reduction vs oxidation).`
      ]
    };
  },

  // =========================================================================
  // AP Chemistry (US) - Electrochemistry & Nernst Equation
  // =========================================================================
  generateAP() {
    const eCat = this.randomNum(0.34, 1.5, 2);
    const eAnode = this.randomNum(-2.7, -0.1, 2);
    const standardCellPot = (eCat - eAnode).toFixed(2);

    const d1 = (eCat + eAnode).toFixed(2);
    const d2 = (eAnode - eCat).toFixed(2);
    const d3 = (eCat * -1).toFixed(2);

    return {
      id: `ap_${Date.now()}_${Math.random()}`,
      examType: "AP Chemistry",
      topic: "Electrochemistry",
      difficulty: "Medium",
      type: "Calculation",
      icon: "⚡",
      question: `A galvanic cell has a cathode with E° = ${eCat} V and an anode with E° = ${eAnode} V. Calculate the standard cell potential (E°cell).`,
      options: [
        { id: "A", text: `${standardCellPot} V` },
        { id: "B", text: `${d1} V` },
        { id: "C", text: `${d2} V` },
        { id: "D", text: `${d3} V` }
      ],
      answer: `${standardCellPot} V`,
      correctOptionId: "A",
      solution: [
        "1. Standard Cell Potential formula: E°cell = E°cathode - E°anode",
        "   (Reduction potential of cathode minus reduction potential of anode)",
        `2. Substitute: ${eCat} V - (${eAnode} V)`,
        `3. ${eCat} + ${Math.abs(eAnode)} = ${standardCellPot} V`,
        "4. A positive E°cell indicates a spontaneous reaction."
      ]
    };
  },

  // =========================================================================
  // CSAT (South Korea) - Quantitative Stoichiometry
  // =========================================================================
  generateCSAT() {
    const c = this.random([1, 2, 3, 4]);
    const h = this.random([4, 6, 8, 10]);
    const volFuel = 10;
    const volCO2 = volFuel * c;
    const volH2O = volFuel * (h / 2);
    const formula = `C${c}H${h}`;

    return {
      id: `csat_${Date.now()}_${Math.random()}`,
      examType: "CSAT (Suneung)",
      topic: "Stoichiometry",
      difficulty: "Hard",
      type: "Quantitative Analysis",
      icon: "🇰🇷",
      question: `Complete combustion of ${volFuel} mL of a gaseous hydrocarbon CxHy produces ${volCO2} mL of CO₂ and ${volH2O} mL of H₂O vapor at the same temperature and pressure.\n\nDetermine the molecular formula of the hydrocarbon.`,
      options: [
        { id: "A", text: formula },
        { id: "B", text: `C${c + 1}H${h}` },
        { id: "C", text: `C${c}H${h - 2}` },
        { id: "D", text: `C${Math.max(1, c - 1)}H${h}` }
      ],
      answer: formula,
      correctOptionId: "A",
      solution: [
        "1. According to Avogadro's Law, volume ratio = mole ratio at constant T, P.",
        `2. Ratio Fuel : CO₂ : H₂O = ${volFuel} : ${volCO2} : ${volH2O}`,
        `3. Simplify Ratio -> 1 : ${volCO2 / volFuel} : ${volH2O / volFuel}`,
        "4. This means 1 molecule of Fuel contains:",
        `   - ${volCO2 / volFuel} Carbon atoms (from CO₂)`,
        `   - ${(volH2O / volFuel) * 2} Hydrogen atoms (from H₂O, since each has 2 H)`,
        `5. Therefore x = ${c}, y = ${h} -> Formula: ${formula}`
      ]
    };
  },

  // =========================================================================
  // Common Test (Japan) - Data Interpretation
  // =========================================================================
  generateCommonTest() {
    const n = 1;
    const v1 = this.randomNum(10, 20);
    const v2 = this.randomNum(30, 50);
    const pTarget = this.randomNum(1, 5);
    const tTarget = (pTarget * v1) / (n * 0.08206);
    const tWrong = (pTarget * v2) / (n * 0.08206);

    return {
      id: `jp_${Date.now()}_${Math.random()}`,
      examType: "Common Test",
      topic: "States of Matter",
      difficulty: "Hard",
      type: "Data Interpretation",
      icon: "🇯🇵",
      question: `Consider 1 mol of an ideal gas. Line A represents the P-T relationship at Volume V₁ = ${v1} L. Line B represents the P-T relationship at Volume V₂ = ${v2} L.\n\nCalculate the temperature (T) on Line A when the pressure is ${pTarget} atm. (R = 0.082 L·atm/K·mol).`,
      options: [
        { id: "A", text: `${Math.round(tTarget)} K` },
        { id: "B", text: `${Math.round(tWrong)} K` },
        { id: "C", text: `${Math.round(tTarget / 2)} K` },
        { id: "D", text: `${Math.round(tTarget * 2)} K` }
      ],
      answer: `${Math.round(tTarget)} K`,
      correctOptionId: "A",
      solution: [
        "1. Ideal Gas Law: PV = nRT -> P = (nR/V)T",
        "2. This is a linear relationship P = mT where slope m = nR/V.",
        `3. For Line A (Volume V₁ = ${v1} L):`,
        `   T = PV / nR = (${pTarget} atm × ${v1} L) / (1 mol × 0.082 L·atm/K·mol)`,
        `4. Calculation: ${pTarget * v1} / 0.082 ≈ ${Math.round(tTarget)} K`
      ]
    };
  },

  // Master function to generate mixed exam-style set OR specific focused sets
  generateQuestionSet(count = 10, specificExam = null) {
    // 1. Collect Manual Questions
    let manualPool = [];
    Object.values(MANUAL_QUESTIONS).forEach(questions => {
      manualPool = [...manualPool, ...questions];
    });

    // Filter manual questions if specific exam requested
    if (specificExam) {
      manualPool = manualPool.filter(q =>
        q.examType.toLowerCase().includes(specificExam.toLowerCase())
      );
    }

    // Shuffle manual pool
    manualPool = manualPool.sort(() => Math.random() - 0.5);

    // 2. Prepare Generators
    const generators = {
      'MCAT': this.generateMCAT.bind(this),
      'GAOKAO': this.generateGaokao.bind(this),
      'JAMB': this.generateJAMB.bind(this),
      'AP': this.generateAP.bind(this),
      'CSAT': this.generateCSAT.bind(this),
      'COMMON_TEST': this.generateCommonTest.bind(this)
    };

    let selectedGenerators = [];
    if (specificExam && generators[specificExam]) {
      selectedGenerators = [generators[specificExam]];
    } else {
      selectedGenerators = Object.values(generators);
    }

    const questions = [];

    // 3. Fill from Manual Pool first
    for (let i = 0; i < count && i < manualPool.length; i++) {
      const mq = manualPool[i];
      // Shuffle options for manual questions
      const shuffledOptions = mq.options.sort(() => Math.random() - 0.5);
      const correctIndex = shuffledOptions.findIndex(opt => opt.id === mq.correctOptionId);

      const safeQ = {
        ...mq,
        icon: mq.icon || '📝',
        type: mq.type || 'Standard',
        options: shuffledOptions.map((opt, idx) => ({ ...opt, id: String.fromCharCode(65 + idx) })),
        correctOptionId: String.fromCharCode(65 + correctIndex)
      };
      questions.push(safeQ);
    }

    // 4. Generate Remainder
    const remainingCount = count - questions.length;

    for (let i = 0; i < remainingCount; i++) {
      const gen = this.random(selectedGenerators);
      const q = gen();

      // Shuffle options and fix correctOptionId mapping logic
      const shuffledOptions = q.options.sort(() => Math.random() - 0.5);
      const correctIndex = shuffledOptions.findIndex(opt => opt.text === q.answer || opt.text.includes(q.answer));

      // Reset IDs to A, B, C, D for display
      q.options = shuffledOptions.map((opt, idx) => ({ ...opt, id: String.fromCharCode(65 + idx) }));
      // Update correctOptionId to match the new position
      q.correctOptionId = String.fromCharCode(65 + correctIndex);

      questions.push(q);
    }

    // Final Shuffle of the mixed set
    return questions.sort(() => Math.random() - 0.5);
  }
};

export default QuestionGenerator;