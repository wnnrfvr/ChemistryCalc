// nuclearQuestionsData.js - Modular Nuclear Chemistry Question Data

// Question Templates with varied phrasings
export const questionTemplates = {
    bindingEnergy: [
      "Calculate the binding energy of a {isotope} nucleus with atomic mass {mass} u.",
      "Determine the binding energy for {isotope} given its atomic mass is {mass} u.",
      "What is the binding energy of {isotope} if the atomic mass equals {mass} u?",
      "Find the binding energy for a nucleus of {isotope} (mass: {mass} u).",
      "A {isotope} nucleus has an atomic mass of {mass} u. Calculate its binding energy."
    ],
    
    decayConstant: [
      "Determine the decay constant (λ) for {isotope} with a half-life of {halflife}.",
      "Calculate λ for a radioactive isotope {isotope} that has a half-life of {halflife}.",
      "What is the decay constant for {isotope} given T₁/₂ = {halflife}?",
      "Find λ for {isotope} with half-life {halflife}.",
      "A sample of {isotope} has a half-life of {halflife}. Determine its decay constant."
    ],
    
    halfLife: [
      "Calculate the half-life of {isotope} with a decay constant of {lambda}.",
      "Determine T₁/₂ for a radioactive isotope {isotope} where λ = {lambda}.",
      "What is the half-life of {isotope} given a decay constant of {lambda}?",
      "Find the half-life for {isotope} if λ = {lambda}.",
      "A radioactive sample of {isotope} has λ = {lambda}. Calculate its half-life."
    ],
    
    energyRelease: [
      "Calculate the energy released in the {reaction_type} of {parent} to {daughter}.",
      "Determine the Q-value for the decay: {parent} -> {daughter}.",
      "What is the energy released when {parent} undergoes {reaction_type} to form {daughter}?",
      "Find the energy output in the transformation of {parent} to {daughter}.",
      "Calculate the energy released in the nuclear reaction: {parent} -> {daughter}."
    ],
    
    activity: [
      "A sample of {isotope} has an initial activity of {activity} decays/s. Calculate its activity after {time}.",
      "Determine the activity of {isotope} after {time} if it starts at {activity} decays/s.",
      "What will be the activity of a {isotope} sample after {time}, given initial activity {activity} decays/s?",
      "Calculate the remaining activity of {isotope} after {time} (initial: {activity} decays/s).",
      "After {time}, what is the activity of {isotope} that initially had {activity} decays/s?"
    ],
    
    fissionEnergy: [
      "Calculate the energy released in fission of {mass} of {isotope}, where each fission releases {energy_per} MeV.",
      "Determine the total energy output from {mass} of {isotope} if each fission yields {energy_per} MeV.",
      "What is the energy released when {mass} of {isotope} undergoes fission ({energy_per} MeV per event)?",
      "Find the total energy from fissioning {mass} of {isotope} (energy per fission: {energy_per} MeV).",
      "Calculate total fission energy for {mass} of {isotope} given {energy_per} MeV per fission."
    ],
    
    fusionEnergy: [
      "Calculate the energy released in the fusion of {reactant1} and {reactant2} to form {product}.",
      "Determine the energy output when {reactant1} fuses with {reactant2} to create {product}.",
      "What is the Q-value for the fusion reaction: {reactant1} + {reactant2} -> {product}?",
      "Find the energy released in fusion: {reactant1} + {reactant2} -> {product}.",
      "Calculate the fusion energy for the reaction {reactant1} + {reactant2} -> {product}."
    ]
  };
  
  // Radioactive Isotopes Database
  export const radioactiveIsotopes = [
    {
      name: "Carbon-14",
      symbol: "¹⁴C",
      mass: 14.0032,
      halfLife: { value: 5730, unit: "years" },
      decayType: "beta-minus",
      daughter: { name: "Nitrogen-14", symbol: "¹⁴N", mass: 14.0031 },
      energyRelease: 0.156,
      category: "dating"
    },
    {
      name: "Uranium-238",
      symbol: "²³⁸U",
      mass: 238.0508,
      halfLife: { value: 4.468e9, unit: "years" },
      decayType: "alpha",
      daughter: { name: "Thorium-234", symbol: "²³⁴Th", mass: 234.0436 },
      energyRelease: 4.27,
      category: "heavyElement"
    },
    {
      name: "Uranium-235",
      symbol: "²³⁵U",
      mass: 235.0439,
      halfLife: { value: 7.04e8, unit: "years" },
      decayType: "alpha",
      daughter: { name: "Thorium-231", symbol: "²³¹Th", mass: 231.0363 },
      energyRelease: 4.68,
      category: "fissile",
      fissionEnergy: 200
    },
    {
      name: "Plutonium-239",
      symbol: "²³⁹Pu",
      mass: 239.0522,
      halfLife: { value: 24100, unit: "years" },
      decayType: "alpha",
      daughter: { name: "Uranium-235", symbol: "²³⁵U", mass: 235.0439 },
      energyRelease: 5.24,
      category: "fissile"
    },
    {
      name: "Cobalt-60",
      symbol: "⁶⁰Co",
      mass: 59.9338,
      halfLife: { value: 5.27, unit: "years" },
      decayType: "beta-minus",
      daughter: { name: "Nickel-60", symbol: "⁶⁰Ni", mass: 59.9318 },
      energyRelease: 2.82,
      category: "medical"
    },
    {
      name: "Iodine-131",
      symbol: "¹³¹I",
      mass: 130.9061,
      halfLife: { value: 8.02, unit: "days" },
      decayType: "beta-minus",
      daughter: { name: "Xenon-131", symbol: "¹³¹Xe", mass: 130.9051 },
      energyRelease: 0.97,
      category: "medical"
    },
    {
      name: "Strontium-90",
      symbol: "⁹⁰Sr",
      mass: 89.9077,
      halfLife: { value: 28.8, unit: "years" },
      decayType: "beta-minus",
      daughter: { name: "Yttrium-90", symbol: "⁹⁰Y", mass: 89.9072 },
      energyRelease: 0.546,
      category: "fissionProduct"
    },
    {
      name: "Phosphorus-32",
      symbol: "³²P",
      mass: 31.9739,
      halfLife: { value: 14.3, unit: "days" },
      decayType: "beta-minus",
      daughter: { name: "Sulfur-32", symbol: "³²S", mass: 31.9721 },
      energyRelease: 1.71,
      category: "tracer"
    },
    {
      name: "Technetium-99m",
      symbol: "⁹⁹ᵐTc",
      mass: 98.9063,
      halfLife: { value: 6.01, unit: "hours" },
      decayType: "gamma",
      daughter: { name: "Technetium-99", symbol: "⁹⁹Tc", mass: 98.9062 },
      energyRelease: 0.140,
      category: "medical"
    },
    {
      name: "Radium-226",
      symbol: "²²⁶Ra",
      mass: 226.0254,
      halfLife: { value: 1600, unit: "years" },
      decayType: "alpha",
      daughter: { name: "Radon-222", symbol: "²²²Rn", mass: 222.0176 },
      energyRelease: 4.87,
      category: "natural"
    },
    {
      name: "Californium-252",
      symbol: "²⁵²Cf",
      mass: 252.0816,
      halfLife: { value: 2.645, unit: "years" },
      decayType: "alpha",
      daughter: { name: "Curium-248", symbol: "²⁴⁸Cm", mass: 248.0723 },
      energyRelease: 6.12,
      category: "transuranium"
    },
    {
      name: "Tritium",
      symbol: "³H",
      mass: 3.0160,
      halfLife: { value: 12.32, unit: "years" },
      decayType: "beta-minus",
      daughter: { name: "Helium-3", symbol: "³He", mass: 3.0160 },
      energyRelease: 0.0186,
      category: "fusion"
    },
    {
      name: "Potassium-40",
      symbol: "⁴⁰K",
      mass: 39.9640,
      halfLife: { value: 1.25e9, unit: "years" },
      decayType: "beta-minus",
      daughter: { name: "Calcium-40", symbol: "⁴⁰Ca", mass: 39.9626 },
      energyRelease: 1.31,
      category: "natural"
    }
  ];
  
  // Fusion Reactions Database
  export const fusionReactions = [
    {
      reactants: [
        { name: "Deuterium", symbol: "²H", mass: 2.0141 },
        { name: "Deuterium", symbol: "²H", mass: 2.0141 }
      ],
      products: [
        { name: "Helium-3", symbol: "³He", mass: 3.0160 },
        { name: "neutron", symbol: "n", mass: 1.0087 }
      ],
      energy: 3.27,
      category: "D-D"
    },
    {
      reactants: [
        { name: "Deuterium", symbol: "²H", mass: 2.0141 },
        { name: "Tritium", symbol: "³H", mass: 3.0160 }
      ],
      products: [
        { name: "Helium-4", symbol: "⁴He", mass: 4.0026 },
        { name: "neutron", symbol: "n", mass: 1.0087 }
      ],
      energy: 17.6,
      category: "D-T"
    },
    {
      reactants: [
        { name: "Deuterium", symbol: "²H", mass: 2.0141 },
        { name: "Helium-3", symbol: "³He", mass: 3.0160 }
      ],
      products: [
        { name: "Helium-4", symbol: "⁴He", mass: 4.0026 },
        { name: "proton", symbol: "p", mass: 1.0073 }
      ],
      energy: 18.3,
      category: "D-He3"
    }
  ];
  
  // Physical Constants
  export const constants = {
    c: 2.998e8, // Speed of light (m/s)
    u_to_MeV: 931.5, // Atomic mass unit to MeV conversion
    avogadro: 6.0221e23, // Avogadro's number
    ln2: 0.693147, // Natural log of 2
    electronMass: 0.00054858, // Electron mass in u
    neutronMass: 1.00866, // Neutron mass in u
    protonMass: 1.00728 // Proton mass in u
  };
  
  // Difficulty levels with nuclear theme
  export const difficultyLevels = {
    stable: {
      label: "⚛️ Stable",
      color: "#4CAF50",
      description: "Basic decay and energy calculations",
      glow: "rgba(76, 175, 80, 0.3)"
    },
    reactive: {
      label: "☢️ Reactive",
      color: "#FF9800",
      description: "Intermediate nuclear reactions",
      glow: "rgba(255, 152, 0, 0.3)"
    },
    critical: {
      label: "⚠️ Critical",
      color: "#F44336",
      description: "Advanced fission & fusion problems",
      glow: "rgba(244, 67, 54, 0.3)"
    },
    supercritical: {
      label: "💥 Supercritical",
      color: "#9C27B0",
      description: "Complex multi-step calculations",
      glow: "rgba(156, 39, 176, 0.3)"
    }
  };
  
  // Question generation functions
  export const generateQuestion = (type, difficulty) => {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    switch (type) {
      case 'bindingEnergy':
        const isotope1 = random(radioactiveIsotopes);
        const template1 = random(questionTemplates.bindingEnergy);
        return {
          question: template1
            .replace('{isotope}', isotope1.symbol)
            .replace('{mass}', isotope1.mass),
          solution: calculateBindingEnergy(isotope1),
          difficulty: 'stable',
          type: 'Binding Energy',
          isotope: isotope1.name
        };
        
      case 'decayConstant':
        const isotope2 = random(radioactiveIsotopes);
        const template2 = random(questionTemplates.decayConstant);
        return {
          question: template2
            .replace('{isotope}', isotope2.symbol)
            .replace('{halflife}', `${isotope2.halfLife.value} ${isotope2.halfLife.unit}`),
          solution: calculateDecayConstant(isotope2.halfLife.value, isotope2.halfLife.unit),
          difficulty: 'stable',
          type: 'Decay Constant',
          isotope: isotope2.name
        };
        
      case 'halfLife':
        const isotope3 = random(radioactiveIsotopes);
        const lambda = (constants.ln2 / isotope3.halfLife.value).toExponential(2);
        const template3 = random(questionTemplates.halfLife);
        return {
          question: template3
            .replace('{isotope}', isotope3.symbol)
            .replace('{lambda}', `${lambda} ${isotope3.halfLife.unit}⁻¹`),
          solution: calculateHalfLife(lambda, isotope3.halfLife.unit),
          difficulty: 'stable',
          type: 'Half-Life Calculation',
          isotope: isotope3.name
        };
        
      case 'energyRelease':
        const isotope4 = random(radioactiveIsotopes.filter(i => i.daughter));
        const template4 = random(questionTemplates.energyRelease);
        return {
          question: template4
            .replace('{reaction_type}', isotope4.decayType)
            .replace('{parent}', isotope4.symbol)
            .replace('{daughter}', isotope4.daughter.symbol),
          solution: calculateEnergyRelease(isotope4),
          difficulty: 'reactive',
          type: 'Energy Release',
          isotope: isotope4.name
        };
        
      case 'activity':
        const isotope5 = random(radioactiveIsotopes);
        const initialActivity = (Math.random() * 9 + 1) * Math.pow(10, Math.floor(Math.random() * 4 + 6));
        const timeMultiplier = Math.random() * 3 + 1;
        const time = timeMultiplier * isotope5.halfLife.value;
        const template5 = random(questionTemplates.activity);
        return {
          question: template5
            .replace('{isotope}', isotope5.symbol)
            .replace('{activity}', initialActivity.toExponential(2))
            .replace('{time}', `${time.toFixed(1)} ${isotope5.halfLife.unit}`),
          solution: calculateActivity(initialActivity, time, isotope5.halfLife.value, isotope5.halfLife.unit),
          difficulty: 'reactive',
          type: 'Radioactive Activity',
          isotope: isotope5.name
        };
        
      case 'fissionEnergy':
        const fissile = random(radioactiveIsotopes.filter(i => i.category === 'fissile'));
        const masses = ['1 gram', '100 grams', '1 kg', '10 kg'];
        const mass = random(masses);
        const template6 = random(questionTemplates.fissionEnergy);
        return {
          question: template6
            .replace('{mass}', mass)
            .replace('{isotope}', fissile.symbol)
            .replace('{energy_per}', fissile.fissionEnergy),
          solution: calculateFissionEnergy(mass, fissile),
          difficulty: 'critical',
          type: 'Fission Energy',
          isotope: fissile.name
        };
        
      case 'fusionEnergy':
        const fusion = random(fusionReactions);
        const template7 = random(questionTemplates.fusionEnergy);
        return {
          question: template7
            .replace('{reactant1}', fusion.reactants[0].symbol)
            .replace('{reactant2}', fusion.reactants[1].symbol)
            .replace('{product}', fusion.products.map(p => p.symbol).join(' + ')),
          solution: calculateFusionEnergy(fusion),
          difficulty: 'critical',
          type: 'Fusion Reaction',
          isotope: fusion.category
        };
        
      default:
        return generateQuestion('bindingEnergy', 'stable');
    }
  };
  
  // Calculation Functions
  const calculateBindingEnergy = (isotope) => {
    const massDefect = isotope.mass - Math.floor(isotope.mass);
    const bindingEnergy = massDefect * constants.u_to_MeV;
    
    return {
      steps: [
        "Calculate binding energy using Einstein's mass-energy equivalence:",
        "BE = (Δm) × c² = (Δm) × 931.5 MeV/u",
        `Mass defect: Δm = ${massDefect.toFixed(4)} u`,
        `BE = ${massDefect.toFixed(4)} × 931.5 MeV/u`,
        `BE = ${bindingEnergy.toFixed(2)} MeV`
      ],
      answer: bindingEnergy.toFixed(2) + " MeV",
      explanation: `The binding energy represents the energy required to disassemble the ${isotope.symbol} nucleus into separate nucleons.`,
      category: isotope.category
    };
  };
  
  const calculateDecayConstant = (halfLife, unit) => {
    const lambda = constants.ln2 / halfLife;
    
    return {
      steps: [
        "Use the relationship between decay constant and half-life:",
        "λ = ln(2) / T₁/₂",
        `λ = 0.693 / ${halfLife} ${unit}`,
        `λ = ${lambda.toExponential(3)} ${unit}⁻¹`
      ],
      answer: `${lambda.toExponential(3)} ${unit}⁻¹`,
      explanation: "The decay constant represents the probability of decay per unit time for a single nucleus."
    };
  };
  
  const calculateHalfLife = (lambda, unit) => {
    const lambdaNum = parseFloat(lambda);
    const halfLife = constants.ln2 / lambdaNum;
    
    return {
      steps: [
        "Use the relationship: T₁/₂ = ln(2) / λ",
        `T₁/₂ = 0.693 / ${lambda} ${unit}⁻¹`,
        `T₁/₂ = ${halfLife.toExponential(2)} ${unit}`
      ],
      answer: `${halfLife.toExponential(2)} ${unit}`,
      explanation: "The half-life is the time required for half of the radioactive nuclei to decay."
    };
  };
  
  const calculateEnergyRelease = (isotope) => {
    const massDefect = isotope.mass - isotope.daughter.mass;
    const energy = massDefect * constants.u_to_MeV;
    
    return {
      steps: [
        `${isotope.decayType} decay: ${isotope.symbol} -> ${isotope.daughter.symbol}`,
        "Calculate energy using E = Δm × c²:",
        `Δm = ${isotope.mass} u - ${isotope.daughter.mass} u`,
        `Δm = ${massDefect.toFixed(4)} u`,
        `E = ${massDefect.toFixed(4)} × 931.5 MeV/u`,
        `E = ${energy.toFixed(2)} MeV`
      ],
      answer: `${energy.toFixed(2)} MeV`,
      explanation: `This ${isotope.decayType} decay releases ${energy.toFixed(2)} MeV of energy as the nucleus transforms.`,
      decayType: isotope.decayType
    };
  };
  
  const calculateActivity = (initialActivity, time, halfLife, unit) => {
    const lambda = constants.ln2 / halfLife;
    const activity = initialActivity * Math.exp(-lambda * time);
    
    return {
      steps: [
        "Use the decay equation: A(t) = A₀e^(-λt)",
        `λ = ln(2) / T₁/₂ = ${lambda.toFixed(6)} ${unit}⁻¹`,
        `A(t) = ${initialActivity.toExponential(2)} × e^(-${lambda.toFixed(6)} × ${time.toFixed(1)})`,
        `A(t) = ${initialActivity.toExponential(2)} × e^(-${(lambda * time).toFixed(3)})`,
        `A(t) = ${activity.toExponential(2)} decays/s`
      ],
      answer: `${activity.toExponential(2)} decays/s`,
      explanation: `After ${time.toFixed(1)} ${unit}, the activity has decreased to ${(activity/initialActivity * 100).toFixed(1)}% of its initial value.`
    };
  };
  
  const calculateFissionEnergy = (massStr, isotope) => {
    const massValue = parseFloat(massStr.split(' ')[0]);
    const massUnit = massStr.split(' ')[1];
    let massInGrams = massValue;
    
    if (massUnit === 'kg') massInGrams = massValue * 1000;
    
    const moles = massInGrams / isotope.mass;
    const nuclei = moles * constants.avogadro;
    const totalEnergy = nuclei * isotope.fissionEnergy;
    
    return {
      steps: [
        `Calculate number of ${isotope.symbol} nuclei in ${massStr}:`,
        `Moles = ${massInGrams} g / ${isotope.mass} g/mol = ${moles.toExponential(2)} mol`,
        `Nuclei = ${moles.toExponential(2)} × ${constants.avogadro.toExponential(2)}`,
        `Nuclei = ${nuclei.toExponential(2)}`,
        `Each fission releases ${isotope.fissionEnergy} MeV`,
        `Total energy = ${nuclei.toExponential(2)} × ${isotope.fissionEnergy} MeV`,
        `Total energy = ${totalEnergy.toExponential(2)} MeV`
      ],
      answer: `${totalEnergy.toExponential(2)} MeV`,
      explanation: `The fission of ${massStr} of ${isotope.symbol} releases enormous energy - approximately ${(totalEnergy * 1.602e-13 / 1e9).toExponential(2)} gigajoules!`
    };
  };
  
  const calculateFusionEnergy = (fusion) => {
    const initialMass = fusion.reactants.reduce((sum, r) => sum + r.mass, 0);
    const finalMass = fusion.products.reduce((sum, p) => sum + p.mass, 0);
    const massDefect = initialMass - finalMass;
    const energy = massDefect * constants.u_to_MeV;
    
    return {
      steps: [
        `Fusion reaction: ${fusion.reactants.map(r => r.symbol).join(' + ')} -> ${fusion.products.map(p => p.symbol).join(' + ')}`,
        "Calculate mass defect:",
        `Initial mass = ${initialMass.toFixed(4)} u`,
        `Final mass = ${finalMass.toFixed(4)} u`,
        `Δm = ${massDefect.toFixed(4)} u`,
        `E = Δm × 931.5 MeV/u`,
        `E = ${energy.toFixed(2)} MeV`
      ],
      answer: `${energy.toFixed(2)} MeV`,
      explanation: `This ${fusion.category} fusion reaction is one of the primary reactions powering stars, releasing ${energy.toFixed(2)} MeV per reaction.`,
      reactionType: fusion.category
    };
  };
  
  export default {
    questionTemplates,
    radioactiveIsotopes,
    fusionReactions,
    constants,
    difficultyLevels,
    generateQuestion
  };