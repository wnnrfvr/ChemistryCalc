// phQuestionBank.js
export const acids = [
    { name: "Hydrochloric acid", formula: "HCl", strength: "strong" },
    { name: "Acetic acid", formula: "CH3COOH", strength: "weak", pKa: 4.76 },
    { name: "Formic acid", formula: "HCOOH", strength: "weak", pKa: 3.75 },
    { name: "Phosphoric acid", formula: "H3PO4", strength: "weak", pKa: 2.15 },
  ];
  
  export const bases = [
    { name: "Sodium hydroxide", formula: "NaOH", strength: "strong" },
    { name: "Ammonia", formula: "NH3", strength: "weak", pKb: 4.76 },
    { name: "Ethanolamine", formula: "C2H5NO", strength: "weak", pKb: 4.74 },
  ];
  
  const questionStyles = [
    "What is the pH of a solution containing",
    "Determine the pH when mixing",
    "Find the acidity (pH) level for a solution made of",
    "How basic or acidic is a mixture of",
    "Calculate the pH value for a chemical setup with",
  ];
  
  export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  export const randomConcentration = () => (Math.random() * 0.2 + 0.05).toFixed(2);
  
  export function generateQuestion() {
    const acid = getRandom(acids);
    const base = getRandom(bases);
    const questionStyle = getRandom(questionStyles);
  
    const conc1 = randomConcentration();
    const conc2 = randomConcentration();
  
    const scenarioType = Math.random() > 0.5 ? "acid" : "base";
    const equation =
      scenarioType === "acid"
        ? `${conc1} M ${acid.name} (${acid.formula}) and ${conc2} M ${base.name} (${base.formula})`
        : `${conc1} M ${base.name} (${base.formula}) and ${conc2} M ${acid.name} (${acid.formula})`;
  
    const explanation =
      scenarioType === "acid"
        ? `Since ${acid.name} is a ${acid.strength} acid, we use ${
            acid.strength === "strong"
              ? "pH = -log[H⁺]"
              : `the Henderson-Hasselbalch equation: pH = pKa + log([A⁻]/[HA])`
          }.`
        : `Since ${base.name} is a ${base.strength} base, we use ${
            base.strength === "strong"
              ? "pOH = -log[OH⁻] and pH = 14 - pOH"
              : `the modified Henderson-Hasselbalch equation: pH = 14 - pKb - log([B]/[BH⁺])`
          }.`;
  
    return {
      id: Date.now(),
      question: `${questionStyle} ${equation}?`,
      explanation,
      acid,
      base,
      conc1,
      conc2,
      resultHint:
        "Try estimating the pH mentally before checking the formula! 💡",
    };
  }
  