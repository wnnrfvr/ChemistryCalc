// phQuestionsData.js - Modular Question Data

// Question Templates with varied phrasings
export const questionTemplates = {
    directPH: [
      "What is the pH of a solution with [H+] = {concentration} M?",
      "Calculate the pH when the hydrogen ion concentration is {concentration} M.",
      "Determine the pH of a solution where [H+] = {concentration} M.",
      "Find the pH value for a solution containing {concentration} M hydrogen ions.",
      "If [H+] = {concentration} M, what is the pH?"
    ],
    
    hydroxidePH: [
      "Calculate the pH of a solution with [OH-] = {concentration} M.",
      "What is the pH when the hydroxide ion concentration is {concentration} M?",
      "Determine pH for a solution where [OH-] = {concentration} M.",
      "Find the pH if the hydroxide concentration equals {concentration} M.",
      "A solution has [OH-] = {concentration} M. Calculate its pH."
    ],
    
    bufferAcid: [
      "Calculate the pH of a buffer containing {acid_conc} M {acid_name} and {base_conc} M {base_name}.",
      "What is the pH of a buffer solution with {acid_conc} M {acid_name} and {base_conc} M {base_name}?",
      "Determine the pH for a buffer system: {acid_conc} M {acid_name} + {base_conc} M {base_name}.",
      "Find the pH of a buffer made from {acid_conc} M {acid_name} and {base_conc} M {base_name}.",
      "A buffer contains {acid_conc} M {acid_name} and {base_conc} M {base_name}. What's the pH?"
    ],
    
    mixingSolutions: [
      "Calculate the pH when mixing {vol1} mL of {conc1} M {compound1} with {vol2} mL of {conc2} M {compound2}.",
      "What is the pH after combining {vol1} mL of {conc1} M {compound1} and {vol2} mL of {conc2} M {compound2}?",
      "Determine the pH of the solution formed by mixing {vol1} mL of {conc1} M {compound1} with {vol2} mL of {conc2} M {compound2}.",
      "Find the pH resulting from {vol1} mL of {conc1} M {compound1} mixed with {vol2} mL of {conc2} M {compound2}.",
      "{vol1} mL of {conc1} M {compound1} is added to {vol2} mL of {conc2} M {compound2}. Calculate the pH."
    ]
  };
  
  // Acid-Base Pairs Database
  export const acidBasePairs = [
    {
      acidName: "acetic acid",
      acidFormula: "CH₃COOH",
      baseName: "sodium acetate",
      baseFormula: "CH₃COONa",
      pKa: 4.76,
      type: "weak",
      category: "carboxylic"
    },
    {
      acidName: "formic acid",
      acidFormula: "HCOOH",
      baseName: "sodium formate",
      baseFormula: "HCOONa",
      pKa: 3.75,
      type: "weak",
      category: "carboxylic"
    },
    {
      acidName: "benzoic acid",
      acidFormula: "C₆H₅COOH",
      baseName: "sodium benzoate",
      baseFormula: "C₆H₅COONa",
      pKa: 4.20,
      type: "weak",
      category: "aromatic"
    },
    {
      acidName: "hydrofluoric acid",
      acidFormula: "HF",
      baseName: "sodium fluoride",
      baseFormula: "NaF",
      pKa: 3.15,
      type: "weak",
      category: "halogen"
    },
    {
      acidName: "nitrous acid",
      acidFormula: "HNO₂",
      baseName: "sodium nitrite",
      baseFormula: "NaNO₂",
      pKa: 3.30,
      type: "weak",
      category: "nitrogen"
    },
    {
      acidName: "hypochlorous acid",
      acidFormula: "HClO",
      baseName: "sodium hypochlorite",
      baseFormula: "NaClO",
      pKa: 7.54,
      type: "weak",
      category: "halogen"
    },
    {
      acidName: "lactic acid",
      acidFormula: "CH₃CHOHCOOH",
      baseName: "sodium lactate",
      baseFormula: "CH₃CHOHCOONa",
      pKa: 3.86,
      type: "weak",
      category: "hydroxy"
    },
    {
      acidName: "hydrocyanic acid",
      acidFormula: "HCN",
      baseName: "sodium cyanide",
      baseFormula: "NaCN",
      pKa: 9.21,
      type: "weak",
      category: "cyanide"
    },
    {
      acidName: "phosphoric acid",
      acidFormula: "H₃PO₄",
      baseName: "sodium dihydrogen phosphate",
      baseFormula: "NaH₂PO₄",
      pKa: 2.15,
      type: "weak",
      category: "polyprotic"
    }
  ];
  
  // Base pairs for base buffer calculations
  export const basePairs = [
    {
      baseName: "ammonia",
      baseFormula: "NH₃",
      acidName: "ammonium chloride",
      acidFormula: "NH₄Cl",
      pKb: 4.76,
      type: "weak"
    },
    {
      baseName: "ethanolamine",
      baseFormula: "C₂H₅NO",
      acidName: "ethanolammonium chloride",
      acidFormula: "C₂H₅NOH⁺Cl⁻",
      pKb: 4.74,
      type: "weak"
    }
  ];
  
  // Strong acid-base combinations
  export const strongPairs = [
    {
      acidName: "hydrochloric acid",
      acidFormula: "HCl",
      baseName: "sodium hydroxide",
      baseFormula: "NaOH",
      type: "strong"
    },
    {
      acidName: "sulfuric acid",
      acidFormula: "H₂SO₄",
      baseName: "sodium hydroxide",
      baseFormula: "NaOH",
      type: "strong"
    }
  ];
  
  // Concentration ranges for different scenarios
  export const concentrationRanges = {
    hydrogen: [
      { value: 1.0e-2, display: "1.0 × 10⁻²" },
      { value: 1.0e-3, display: "1.0 × 10⁻³" },
      { value: 1.0e-4, display: "1.0 × 10⁻⁴" },
      { value: 1.0e-5, display: "1.0 × 10⁻⁵" },
      { value: 1.0e-6, display: "1.0 × 10⁻⁶" },
      { value: 1.0e-7, display: "1.0 × 10⁻⁷" },
      { value: 1.0e-8, display: "1.0 × 10⁻⁸" },
      { value: 1.0e-9, display: "1.0 × 10⁻⁹" },
      { value: 1.0e-10, display: "1.0 × 10⁻¹⁰" },
      { value: 1.0e-11, display: "1.0 × 10⁻¹¹" },
      { value: 1.0e-12, display: "1.0 × 10⁻¹²" }
    ],
    
    buffer: [0.05, 0.08, 0.10, 0.12, 0.15, 0.18, 0.20, 0.25, 0.30],
    
    volumes: [20.0, 25.0, 30.0, 40.0, 50.0, 60.0, 75.0, 80.0, 100.0, 120.0, 150.0]
  };
  
  // Difficulty levels
  export const difficultyLevels = {
    beginner: {
      label: "🌱 Beginner",
      color: "#4CAF50",
      description: "Simple pH calculations"
    },
    intermediate: {
      label: "📚 Intermediate",
      color: "#FF9800",
      description: "Buffer solutions & Henderson-Hasselbalch"
    },
    advanced: {
      label: "🔬 Advanced",
      color: "#F44336",
      description: "Mixed solutions & complex equilibria"
    }
  };
  
  // Question generation functions
  export const generateQuestion = (type, difficulty) => {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomConc = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    switch (type) {
      case 'directPH':
        const hConc = random(concentrationRanges.hydrogen);
        const template = random(questionTemplates.directPH);
        return {
          question: template.replace('{concentration}', hConc.display),
          solution: calculateDirectPH(hConc.value),
          difficulty: 'beginner',
          type: 'Direct pH Calculation'
        };
        
      case 'hydroxidePH':
        const ohConc = random(concentrationRanges.hydrogen);
        const ohTemplate = random(questionTemplates.hydroxidePH);
        return {
          question: ohTemplate.replace('{concentration}', ohConc.display),
          solution: calculateOHtoPH(ohConc.value),
          difficulty: 'beginner',
          type: 'pH from OH⁻'
        };
        
      case 'bufferAcid':
        const pair = random(acidBasePairs);
        const acidConc = randomConc(concentrationRanges.buffer);
        const baseConc = randomConc(concentrationRanges.buffer);
        const bufferTemplate = random(questionTemplates.bufferAcid);
        return {
          question: bufferTemplate
            .replace('{acid_conc}', acidConc)
            .replace('{acid_name}', `${pair.acidName} (${pair.acidFormula})`)
            .replace('{base_conc}', baseConc)
            .replace('{base_name}', `${pair.baseName} (${pair.baseFormula})`),
          solution: calculateBufferPH(acidConc, baseConc, pair.pKa, pair),
          difficulty: 'intermediate',
          type: 'Buffer Solution'
        };
        
      case 'mixingSolutions':
        const mixPair = random(acidBasePairs);
        const vol1 = random(concentrationRanges.volumes);
        const vol2 = random(concentrationRanges.volumes);
        const conc1 = randomConc(concentrationRanges.buffer);
        const conc2 = randomConc(concentrationRanges.buffer);
        const mixTemplate = random(questionTemplates.mixingSolutions);
        return {
          question: mixTemplate
            .replace('{vol1}', vol1)
            .replace('{conc1}', conc1)
            .replace('{compound1}', `${mixPair.acidName} (${mixPair.acidFormula})`)
            .replace('{vol2}', vol2)
            .replace('{conc2}', conc2)
            .replace('{compound2}', `${mixPair.baseName} (${mixPair.baseFormula})`),
          solution: calculateMixedSolution(vol1, conc1, vol2, conc2, mixPair.pKa, mixPair),
          difficulty: 'advanced',
          type: 'Mixed Solutions'
        };
        
      default:
        return generateQuestion('directPH', 'beginner');
    }
  };
  
  // Calculation functions
  const calculateDirectPH = (hConc) => {
    const pH = -Math.log10(hConc);
    return {
      steps: [
        "Using the pH formula: pH = -log[H⁺]",
        `pH = -log(${hConc.toExponential(1)})`,
        `pH = ${pH.toFixed(2)}`
      ],
      answer: pH.toFixed(2),
      explanation: "The pH is calculated as the negative logarithm (base 10) of the hydrogen ion concentration."
    };
  };
  
  const calculateOHtoPH = (ohConc) => {
    const pOH = -Math.log10(ohConc);
    const pH = 14 - pOH;
    return {
      steps: [
        "First, calculate pOH: pOH = -log[OH⁻]",
        `pOH = -log(${ohConc.toExponential(1)}) = ${pOH.toFixed(2)}`,
        "Then use: pH = 14.0 - pOH",
        `pH = 14.0 - ${pOH.toFixed(2)} = ${pH.toFixed(2)}`
      ],
      answer: pH.toFixed(2),
      explanation: "For hydroxide ion concentration, we first calculate pOH, then use the relationship pH + pOH = 14."
    };
  };
  
  const calculateBufferPH = (acidConc, baseConc, pKa, pair) => {
    const pH = pKa + Math.log10(baseConc / acidConc);
    return {
      steps: [
        "Using the Henderson-Hasselbalch equation:",
        "pH = pKa + log([A⁻]/[HA])",
        `pH = ${pKa} + log(${baseConc}/${acidConc})`,
        `pH = ${pKa} + ${Math.log10(baseConc / acidConc).toFixed(2)}`,
        `pH = ${pH.toFixed(2)}`
      ],
      answer: pH.toFixed(2),
      explanation: `This is a buffer solution containing a weak acid (${pair.acidFormula}) and its conjugate base (${pair.baseFormula}).`,
      formula: pair.acidFormula
    };
  };
  
  const calculateMixedSolution = (vol1, conc1, vol2, conc2, pKa, pair) => {
    const moles1 = (vol1 / 1000) * conc1;
    const moles2 = (vol2 / 1000) * conc2;
    const totalVol = (vol1 + vol2) / 1000;
    const finalConc1 = moles1 / totalVol;
    const finalConc2 = moles2 / totalVol;
    const pH = pKa + Math.log10(finalConc2 / finalConc1);
    
    return {
      steps: [
        `Calculate moles of ${pair.acidFormula}:`,
        `Moles = ${vol1} mL × ${conc1} M = ${moles1.toFixed(4)} mol`,
        `Calculate moles of ${pair.baseFormula}:`,
        `Moles = ${vol2} mL × ${conc2} M = ${moles2.toFixed(4)} mol`,
        `Total volume = ${totalVol.toFixed(3)} L`,
        `[${pair.acidFormula}] = ${moles1.toFixed(4)} / ${totalVol.toFixed(3)} = ${finalConc1.toFixed(3)} M`,
        `[${pair.baseFormula}] = ${moles2.toFixed(4)} / ${totalVol.toFixed(3)} = ${finalConc2.toFixed(3)} M`,
        "Apply Henderson-Hasselbalch equation:",
        `pH = ${pKa} + log(${finalConc2.toFixed(3)}/${finalConc1.toFixed(3)})`,
        `pH = ${pH.toFixed(2)}`
      ],
      answer: pH.toFixed(2),
      explanation: "When mixing solutions, first calculate the moles of each component, then find the new concentrations after dilution.",
      volumes: { vol1, vol2 }
    };
  };
  
  export default {
    questionTemplates,
    acidBasePairs,
    basePairs,
    strongPairs,
    concentrationRanges,
    difficultyLevels,
    generateQuestion
  };