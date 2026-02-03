// stoichiometryQuestionsData.js - Modular Stoichiometry Question Data

// Question Templates with varied phrasings
export const questionTemplates = {
  molesToMoles: [
    "How many moles of {product} are produced from {moles} moles of {reactant}?",
    "Calculate the moles of {product} formed when {moles} moles of {reactant} react completely.",
    "If {moles} moles of {reactant} react, how many moles of {product} will form?",
    "Determine the amount of {product} (in moles) from {moles} moles of {reactant}.",
    "When {moles} moles of {reactant} undergo reaction, how many moles of {product} result?"
  ],

  gramsToMoles: [
    "How many moles of {product} are produced from {grams} grams of {reactant}?",
    "Calculate the moles of {product} when {grams} g of {reactant} react completely.",
    "If {grams} grams of {reactant} react, find the moles of {product} formed.",
    "Determine moles of {product} from {grams} g of {reactant}.",
    "What amount of {product} (in moles) forms from {grams} grams of {reactant}?"
  ],

  gramsToGrams: [
    "How many grams of {product} are produced from {grams} grams of {reactant}?",
    "Calculate the mass of {product} formed when {grams} g of {reactant} react.",
    "If {grams} grams of {reactant} react completely, what mass of {product} forms?",
    "Determine the grams of {product} from {grams} g of {reactant}.",
    "What mass of {product} results from reacting {grams} grams of {reactant}?"
  ],

  molesToGrams: [
    "How many grams of {product} are needed to react with {moles} moles of {reactant}?",
    "Calculate the mass of {product} required when {moles} moles of {reactant} react.",
    "If {moles} moles of {reactant} react, how many grams of {product} are involved?",
    "Determine the mass of {product} from {moles} moles of {reactant}.",
    "What mass of {product} corresponds to {moles} moles of {reactant}?"
  ],

  molecules: [
    "How many molecules of {product} are produced from {moles} moles of {reactant}?",
    "Calculate the number of {product} molecules from {moles} moles of {reactant}.",
    "If {moles} moles of {reactant} react, how many molecules of {product} form?",
    "Determine the molecular count of {product} from {moles} moles of {reactant}.",
    "What is the number of {product} molecules from {moles} moles of {reactant}?"
  ],

  limitingReactant: [
    "Which is the limiting reactant when {grams1} g of {reactant1} reacts with {grams2} g of {reactant2}?",
    "Determine the limiting reactant: {grams1} g {reactant1} + {grams2} g {reactant2}.",
    "If {grams1} grams of {reactant1} and {grams2} grams of {reactant2} react, which runs out first?",
    "Calculate which reactant limits the reaction: {grams1} g {reactant1} or {grams2} g {reactant2}.",
    "Identify the limiting reagent between {grams1} g {reactant1} and {grams2} g {reactant2}."
  ]
};

// Chemical Reactions Database - Original Base Set
const chemicalReactionsOriginal = [
  {
    equation: "2 H₂ + O₂ -> 2 H₂O",
    reactants: [
      { formula: "H₂", name: "hydrogen", coefficient: 2, molarMass: 2.016 },
      { formula: "O₂", name: "oxygen", coefficient: 1, molarMass: 32.00 }
    ],
    products: [
      { formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }
    ],
    type: "synthesis",
    category: "simple",
    description: "Formation of water"
  },
  {
    equation: "4 NH₃ + 5 O₂ -> 4 NO + 6 H₂O",
    reactants: [
      { formula: "NH₃", name: "ammonia", coefficient: 4, molarMass: 17.031 },
      { formula: "O₂", name: "oxygen", coefficient: 5, molarMass: 32.00 }
    ],
    products: [
      { formula: "NO", name: "nitrogen monoxide", coefficient: 4, molarMass: 30.006 },
      { formula: "H₂O", name: "water", coefficient: 6, molarMass: 18.015 }
    ],
    type: "combustion",
    category: "intermediate",
    description: "Oxidation of ammonia"
  },
  {
    equation: "C₆H₁₂O₆ -> 2 C₂H₅OH + 2 CO₂",
    reactants: [
      { formula: "C₆H₁₂O₆", name: "glucose", coefficient: 1, molarMass: 180.156 }
    ],
    products: [
      { formula: "C₂H₅OH", name: "ethanol", coefficient: 2, molarMass: 46.068 },
      { formula: "CO₂", name: "carbon dioxide", coefficient: 2, molarMass: 44.009 }
    ],
    type: "fermentation",
    category: "organic",
    description: "Alcoholic fermentation"
  },
  {
    equation: "2 Al + 3 Cl₂ -> 2 AlCl₃",
    reactants: [
      { formula: "Al", name: "aluminum", coefficient: 2, molarMass: 26.982 },
      { formula: "Cl₂", name: "chlorine", coefficient: 3, molarMass: 70.906 }
    ],
    products: [
      { formula: "AlCl₃", name: "aluminum chloride", coefficient: 2, molarMass: 133.341 }
    ],
    type: "synthesis",
    category: "simple",
    description: "Formation of aluminum chloride"
  },
  {
    equation: "2 NaOH + H₂SO₄ -> Na₂SO₄ + 2 H₂O",
    reactants: [
      { formula: "NaOH", name: "sodium hydroxide", coefficient: 2, molarMass: 39.997 },
      { formula: "H₂SO₄", name: "sulfuric acid", coefficient: 1, molarMass: 98.079 }
    ],
    products: [
      { formula: "Na₂SO₄", name: "sodium sulfate", coefficient: 1, molarMass: 142.043 },
      { formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }
    ],
    type: "neutralization",
    category: "acid-base",
    description: "Acid-base neutralization"
  },
  {
    equation: "CaCO₃ -> CaO + CO₂",
    reactants: [
      { formula: "CaCO₃", name: "calcium carbonate", coefficient: 1, molarMass: 100.087 }
    ],
    products: [
      { formula: "CaO", name: "calcium oxide", coefficient: 1, molarMass: 56.077 },
      { formula: "CO₂", name: "carbon dioxide", coefficient: 1, molarMass: 44.009 }
    ],
    type: "decomposition",
    category: "thermal",
    description: "Thermal decomposition of limestone"
  },
  {
    equation: "CH₄ + 2 O₂ -> CO₂ + 2 H₂O",
    reactants: [
      { formula: "CH₄", name: "methane", coefficient: 1, molarMass: 16.043 },
      { formula: "O₂", name: "oxygen", coefficient: 2, molarMass: 32.00 }
    ],
    products: [
      { formula: "CO₂", name: "carbon dioxide", coefficient: 1, molarMass: 44.009 },
      { formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }
    ],
    type: "combustion",
    category: "hydrocarbon",
    description: "Complete combustion of methane"
  },
  {
    equation: "N₂ + 3 H₂ -> 2 NH₃",
    reactants: [
      { formula: "N₂", name: "nitrogen", coefficient: 1, molarMass: 28.014 },
      { formula: "H₂", name: "hydrogen", coefficient: 3, molarMass: 2.016 }
    ],
    products: [
      { formula: "NH₃", name: "ammonia", coefficient: 2, molarMass: 17.031 }
    ],
    type: "synthesis",
    category: "industrial",
    description: "Haber process for ammonia"
  },
  {
    equation: "2 Fe + 3 Cl₂ -> 2 FeCl₃",
    reactants: [
      { formula: "Fe", name: "iron", coefficient: 2, molarMass: 55.845 },
      { formula: "Cl₂", name: "chlorine", coefficient: 3, molarMass: 70.906 }
    ],
    products: [
      { formula: "FeCl₃", name: "iron(III) chloride", coefficient: 2, molarMass: 162.204 }
    ],
    type: "synthesis",
    category: "metal",
    description: "Formation of iron chloride"
  },
  {
    equation: "C₃H₈ + 5 O₂ -> 3 CO₂ + 4 H₂O",
    reactants: [
      { formula: "C₃H₈", name: "propane", coefficient: 1, molarMass: 44.096 },
      { formula: "O₂", name: "oxygen", coefficient: 5, molarMass: 32.00 }
    ],
    products: [
      { formula: "CO₂", name: "carbon dioxide", coefficient: 3, molarMass: 44.009 },
      { formula: "H₂O", name: "water", coefficient: 4, molarMass: 18.015 }
    ],
    type: "combustion",
    category: "hydrocarbon",
    description: "Complete combustion of propane"
  },
  {
    equation: "2 Mg + O₂ -> 2 MgO",
    reactants: [
      { formula: "Mg", name: "magnesium", coefficient: 2, molarMass: 24.305 },
      { formula: "O₂", name: "oxygen", coefficient: 1, molarMass: 32.00 }
    ],
    products: [
      { formula: "MgO", name: "magnesium oxide", coefficient: 2, molarMass: 40.304 }
    ],
    type: "synthesis",
    category: "simple",
    description: "Oxidation of magnesium"
  },
  {
    equation: "C₄H₁₀ + 6.5 O₂ -> 4 CO₂ + 5 H₂O",
    reactants: [
      { formula: "C₄H₁₀", name: "butane", coefficient: 1, molarMass: 58.122 },
      { formula: "O₂", name: "oxygen", coefficient: 6.5, molarMass: 32.00 }
    ],
    products: [
      { formula: "CO₂", name: "carbon dioxide", coefficient: 4, molarMass: 44.009 },
      { formula: "H₂O", name: "water", coefficient: 5, molarMass: 18.015 }
    ],
    type: "combustion",
    category: "hydrocarbon",
    description: "Complete combustion of butane"
  }
];

// Import extended reactions conditionally
let extendedReactionsData = [];
try {
  extendedReactionsData = require('./ExtendedReactions').default || [];
} catch (e) {
  // Extended reactions not available yet
}

// Export merged reactions
export const chemicalReactions = [
  ...chemicalReactionsOriginal,
  ...extendedReactionsData
];

// Physical Constants
export const constants = {
  avogadro: 6.02214076e23, // Avogadro's number
};

// Difficulty levels with balance/scale theme
export const difficultyLevels = {
  balanced: {
    label: "⚖️ Balanced",
    color: "#4CAF50",
    description: "Basic mole-to-mole conversions",
    gradient: ["#66BB6A", "#4CAF50"]
  },
  reacting: {
    label: "🔄 Reacting",
    color: "#2196F3",
    description: "Mass and mole calculations",
    gradient: ["#42A5F5", "#2196F3"]
  },
  complex: {
    label: "⚗️ Complex",
    color: "#FF9800",
    description: "Multi-step stoichiometry",
    gradient: ["#FFA726", "#FF9800"]
  },
  limiting: {
    label: "🎯 Limiting",
    color: "#E91E63",
    description: "Limiting reactant problems",
    gradient: ["#EC407A", "#E91E63"]
  }
};

// Question generation functions
export const generateQuestion = (type) => {
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomValue = (min, max) => Math.random() * (max - min) + min;

  const reaction = random(chemicalReactions);
  const reactant = random(reaction.reactants);
  const product = random(reaction.products);

  switch (type) {
    case 'molesToMoles':
      const moles = parseFloat(randomValue(1, 10).toFixed(2));
      const template1 = random(questionTemplates.molesToMoles);
      return {
        question: template1
          .replace('{moles}', moles)
          .replace('{reactant}', `${reactant.name} (${reactant.formula})`)
          .replace('{product}', `${product.name} (${product.formula})`),
        solution: calculateMolesToMoles(moles, reactant, product, reaction),
        difficulty: 'balanced',
        type: 'Mole-to-Mole',
        reaction: reaction.equation
      };

    case 'gramsToMoles':
      const grams1 = parseFloat(randomValue(10, 100).toFixed(1));
      const template2 = random(questionTemplates.gramsToMoles);
      return {
        question: template2
          .replace('{grams}', grams1)
          .replace('{reactant}', `${reactant.name} (${reactant.formula})`)
          .replace('{product}', `${product.name} (${product.formula})`),
        solution: calculateGramsToMoles(grams1, reactant, product, reaction),
        difficulty: 'reacting',
        type: 'Mass-to-Mole',
        reaction: reaction.equation
      };

    case 'gramsToGrams':
      const grams2 = parseFloat(randomValue(15, 150).toFixed(1));
      const template3 = random(questionTemplates.gramsToGrams);
      return {
        question: template3
          .replace('{grams}', grams2)
          .replace('{reactant}', `${reactant.name} (${reactant.formula})`)
          .replace('{product}', `${product.name} (${product.formula})`),
        solution: calculateGramsToGrams(grams2, reactant, product, reaction),
        difficulty: 'complex',
        type: 'Mass-to-Mass',
        reaction: reaction.equation
      };

    case 'molesToGrams':
      const moles2 = parseFloat(randomValue(2, 15).toFixed(2));
      const template4 = random(questionTemplates.molesToGrams);
      return {
        question: template4
          .replace('{moles}', moles2)
          .replace('{reactant}', `${reactant.name} (${reactant.formula})`)
          .replace('{product}', `${product.name} (${product.formula})`),
        solution: calculateMolesToGrams(moles2, reactant, product, reaction),
        difficulty: 'reacting',
        type: 'Mole-to-Mass',
        reaction: reaction.equation
      };

    case 'molecules':
      const moles3 = parseFloat(randomValue(1, 5).toFixed(2));
      const template5 = random(questionTemplates.molecules);
      return {
        question: template5
          .replace('{moles}', moles3)
          .replace('{reactant}', `${reactant.name} (${reactant.formula})`)
          .replace('{product}', `${product.name} (${product.formula})`),
        solution: calculateMolecules(moles3, reactant, product, reaction),
        difficulty: 'complex',
        type: 'Molecules Count',
        reaction: reaction.equation
      };

    default:
      return generateQuestion('molesToMoles');
  }
};

// Calculation Functions
const calculateMolesToMoles = (moles, reactant, product, reaction) => {
  const ratio = product.coefficient / reactant.coefficient;
  const productMoles = moles * ratio;

  return {
    steps: [
      `Balanced equation: ${reaction.equation}`,
      `Mole ratio: ${reactant.coefficient} mol ${reactant.formula} : ${product.coefficient} mol ${product.formula}`,
      `Calculate: ${moles} mol ${reactant.formula} × (${product.coefficient}/${reactant.coefficient})`,
      `Result: ${productMoles.toFixed(3)} mol ${product.formula}`
    ],
    answer: `${productMoles.toFixed(3)} mol`,
    explanation: `Using stoichiometric ratios from the balanced equation, ${moles} moles of ${reactant.name} produces ${productMoles.toFixed(3)} moles of ${product.name}.`,
    ratio: `${reactant.coefficient}:${product.coefficient}`
  };
};

const calculateGramsToMoles = (grams, reactant, product, reaction) => {
  const molesReactant = grams / reactant.molarMass;
  const ratio = product.coefficient / reactant.coefficient;
  const molesProduct = molesReactant * ratio;

  return {
    steps: [
      `Balanced equation: ${reaction.equation}`,
      `Convert grams to moles: ${grams} g ÷ ${reactant.molarMass.toFixed(3)} g/mol`,
      `Moles of ${reactant.formula}: ${molesReactant.toFixed(4)} mol`,
      `Apply mole ratio: ${molesReactant.toFixed(4)} × (${product.coefficient}/${reactant.coefficient})`,
      `Result: ${molesProduct.toFixed(4)} mol ${product.formula}`
    ],
    answer: `${molesProduct.toFixed(4)} mol`,
    explanation: `Starting with ${grams}g of ${reactant.name}, we first convert to moles, then use the stoichiometric ratio to find moles of ${product.name}.`,
    molarMass: reactant.molarMass
  };
};

const calculateGramsToGrams = (grams, reactant, product, reaction) => {
  const molesReactant = grams / reactant.molarMass;
  const ratio = product.coefficient / reactant.coefficient;
  const molesProduct = molesReactant * ratio;
  const gramsProduct = molesProduct * product.molarMass;

  return {
    steps: [
      `Balanced equation: ${reaction.equation}`,
      `Step 1: Convert ${grams} g ${reactant.formula} to moles`,
      `Moles = ${grams} g ÷ ${reactant.molarMass.toFixed(3)} g/mol = ${molesReactant.toFixed(4)} mol`,
      `Step 2: Apply mole ratio (${reactant.coefficient}:${product.coefficient})`,
      `Moles ${product.formula} = ${molesReactant.toFixed(4)} × (${product.coefficient}/${reactant.coefficient}) = ${molesProduct.toFixed(4)} mol`,
      `Step 3: Convert to grams`,
      `Mass = ${molesProduct.toFixed(4)} mol × ${product.molarMass.toFixed(3)} g/mol`,
      `Result: ${gramsProduct.toFixed(2)} g ${product.formula}`
    ],
    answer: `${gramsProduct.toFixed(2)} g`,
    explanation: `This is a complete mass-to-mass conversion: grams of ${reactant.name} -> moles -> moles of ${product.name} -> grams of ${product.name}.`,
    pathway: "g -> mol -> mol -> g"
  };
};

const calculateMolesToGrams = (moles, reactant, product, reaction) => {
  const ratio = product.coefficient / reactant.coefficient;
  const molesProduct = moles * ratio;
  const gramsProduct = molesProduct * product.molarMass;

  return {
    steps: [
      `Balanced equation: ${reaction.equation}`,
      `Starting moles: ${moles} mol ${reactant.formula}`,
      `Apply mole ratio: ${moles} × (${product.coefficient}/${reactant.coefficient})`,
      `Moles of ${product.formula}: ${molesProduct.toFixed(3)} mol`,
      `Convert to grams: ${molesProduct.toFixed(3)} mol × ${product.molarMass.toFixed(3)} g/mol`,
      `Result: ${gramsProduct.toFixed(2)} g ${product.formula}`
    ],
    answer: `${gramsProduct.toFixed(2)} g`,
    explanation: `From ${moles} moles of ${reactant.name}, we calculate the required mass of ${product.name} using molar mass conversion.`,
    molarMass: product.molarMass
  };
};

const calculateMolecules = (moles, reactant, product, reaction) => {
  const ratio = product.coefficient / reactant.coefficient;
  const molesProduct = moles * ratio;
  const molecules = molesProduct * constants.avogadro;

  return {
    steps: [
      `Balanced equation: ${reaction.equation}`,
      `Apply mole ratio: ${moles} mol × (${product.coefficient}/${reactant.coefficient})`,
      `Moles of ${product.formula}: ${molesProduct.toFixed(3)} mol`,
      `Convert to molecules using Avogadro's number:`,
      `Molecules = ${molesProduct.toFixed(3)} mol × ${constants.avogadro.toExponential(3)} molecules/mol`,
      `Result: ${molecules.toExponential(3)} molecules`
    ],
    answer: `${molecules.toExponential(3)} molecules`,
    explanation: `Using Avogadro's number (${constants.avogadro.toExponential(3)}), we convert moles to individual molecules of ${product.name}.`,
    avogadro: constants.avogadro
  };
};

export default {
  questionTemplates,
  chemicalReactions,
  constants,
  difficultyLevels,
  generateQuestion
};