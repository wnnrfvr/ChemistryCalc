// electrolysisQuestionsData.js - Modular Electrolysis Question Data

// Question Templates with varied phrasings
export const questionTemplates = {
    massDeposited: [
      "Calculate the mass of {metal} deposited when passing {current} A for {time} through {solution}.",
      "How many grams of {metal} will be plated using {current} A current for {time} in {solution}?",
      "Determine the mass of {metal} produced by electrolyzing {solution} at {current} A for {time}.",
      "What mass of {metal} forms at the cathode with {current} A for {time} in {solution}?",
      "If {current} A flows through {solution} for {time}, how much {metal} deposits?"
    ],
    
    timeRequired: [
      "How long must {current} A flow through {solution} to deposit {mass} g of {metal}?",
      "Calculate the time needed to plate {mass} g of {metal} using {current} A in {solution}.",
      "Determine the duration required to deposit {mass} g of {metal} at {current} A from {solution}.",
      "What time is needed to electrodeposit {mass} g of {metal} with {current} A in {solution}?",
      "Find the electrolysis time for {mass} g {metal} deposition at {current} A in {solution}."
    ],
    
    currentRequired: [
      "What current is needed to produce {mass} g of {metal} from {solution} in {time}?",
      "Calculate the minimum current to deposit {mass} g of {metal} in {time} from {solution}.",
      "Determine the required current for {mass} g {metal} production in {time} using {solution}.",
      "Find the current needed to electrolyze {mass} g {metal} in {time} from {solution}.",
      "What amperage produces {mass} g of {metal} from {solution} in {time}?"
    ],
    
    gasVolume: [
      "Calculate the volume of {gas} produced at the {electrode} during electrolysis using {current} A for {time}.",
      "What volume of {gas} gas forms at the {electrode} with {current} A for {time}?",
      "Determine {gas} volume produced at {electrode} using {current} A current for {time}.",
      "How much {gas} (in liters) is generated at the {electrode} with {current} A for {time}?",
      "Find the {gas} volume at {electrode} when {current} A flows for {time}."
    ],
    
    solutionConcentration: [
      "How many grams of {product} can be obtained from {volume} L of {concentration} M {compound}?",
      "Calculate the mass of {product} from electrolyzing {volume} L of {concentration} M {compound}.",
      "Determine {product} yield from {volume} L of {concentration} M {compound} solution.",
      "What mass of {product} results from electrolysis of {volume} L of {concentration} M {compound}?",
      "Find the {product} mass from {volume} L of {concentration} M {compound} electrolysis."
    ],
    
    chargeCalculation: [
      "What quantity of electricity is required to produce {mass} g of {substance}?",
      "Calculate the total charge needed to generate {mass} g of {substance}.",
      "Determine the coulombs required for {mass} g {substance} production.",
      "How much charge produces {mass} g of {substance} during electrolysis?",
      "Find the electrical charge for {mass} g {substance} formation."
    ]
  };
  
  // Electrolysis Reactions Database
  export const electrolysisReactions = [
    {
      metal: "copper",
      symbol: "Cu",
      solution: "copper sulfate (CuSO₄)",
      halfReaction: "Cu²⁺ + 2e⁻ -> Cu",
      electronsNeeded: 2,
      molarMass: 63.55,
      color: "#B87333",
      category: "metal",
      commonUse: "Electroplating, purification"
    },
    {
      metal: "silver",
      symbol: "Ag",
      solution: "silver nitrate (AgNO₃)",
      halfReaction: "Ag⁺ + e⁻ -> Ag",
      electronsNeeded: 1,
      molarMass: 107.87,
      color: "#C0C0C0",
      category: "metal",
      commonUse: "Jewelry plating, electronics"
    },
    {
      metal: "aluminum",
      symbol: "Al",
      solution: "aluminum oxide (Al₂O₃)",
      halfReaction: "Al³⁺ + 3e⁻ -> Al",
      electronsNeeded: 3,
      molarMass: 26.98,
      color: "#848789",
      category: "metal",
      commonUse: "Industrial production, aircraft"
    },
    {
      metal: "zinc",
      symbol: "Zn",
      solution: "zinc sulfate (ZnSO₄)",
      halfReaction: "Zn²⁺ + 2e⁻ -> Zn",
      electronsNeeded: 2,
      molarMass: 65.38,
      color: "#7A7A7A",
      category: "metal",
      commonUse: "Galvanization, batteries"
    },
    {
      metal: "gold",
      symbol: "Au",
      solution: "gold chloride (AuCl₃)",
      halfReaction: "Au³⁺ + 3e⁻ -> Au",
      electronsNeeded: 3,
      molarMass: 196.97,
      color: "#FFD700",
      category: "metal",
      commonUse: "Jewelry, electronics"
    },
    {
      metal: "nickel",
      symbol: "Ni",
      solution: "nickel sulfate (NiSO₄)",
      halfReaction: "Ni²⁺ + 2e⁻ -> Ni",
      electronsNeeded: 2,
      molarMass: 58.69,
      color: "#8C92AC",
      category: "metal",
      commonUse: "Plating, alloys"
    }
  ];
  
  // Gas Production Reactions
  export const gasReactions = [
    {
      gas: "hydrogen",
      symbol: "H₂",
      halfReaction: "2H⁺ + 2e⁻ -> H₂",
      electrode: "cathode",
      electronsNeeded: 2,
      molarMass: 2.016,
      molarVolume: 24, // dm³/mol at RTP
      color: "#E0F7FA",
      use: "Fuel cells, ammonia production"
    },
    {
      gas: "oxygen",
      symbol: "O₂",
      halfReaction: "4OH⁻ -> O₂ + 2H₂O + 4e⁻",
      electrode: "anode",
      electronsNeeded: 4,
      molarMass: 32.00,
      molarVolume: 24,
      color: "#B3E5FC",
      use: "Life support, combustion"
    },
    {
      gas: "chlorine",
      symbol: "Cl₂",
      halfReaction: "2Cl⁻ -> Cl₂ + 2e⁻",
      electrode: "anode",
      electronsNeeded: 2,
      molarMass: 70.90,
      molarVolume: 24,
      color: "#FFEB3B",
      use: "Water treatment, PVC production"
    }
  ];
  
  // Solution Electrolysis Data
  export const solutionReactions = [
    {
      compound: "NaCl",
      name: "sodium chloride",
      product: "chlorine gas",
      productFormula: "Cl₂",
      molarMass: 70.90,
      stoichiometry: 0.5, // moles product per mole compound
      category: "salt"
    },
    {
      compound: "H₂O₂",
      name: "hydrogen peroxide",
      product: "oxygen gas",
      productFormula: "O₂",
      molarMass: 32.00,
      stoichiometry: 1,
      category: "peroxide"
    },
    {
      compound: "H₂O",
      name: "water",
      product: "hydrogen gas",
      productFormula: "H₂",
      molarMass: 2.016,
      stoichiometry: 1,
      category: "water"
    }
  ];
  
  // Physical Constants
  export const constants = {
    faraday: 96500, // C/mol (Faraday constant)
    avogadro: 6.02214076e23,
    molarVolumeRTP: 24, // dm³/mol at room temperature and pressure
    molarVolumeSTP: 22.4 // dm³/mol at standard temperature and pressure
  };
  
  // Difficulty levels with electrical theme
  export const difficultyLevels = {
    charging: {
      label: "⚡ Charging",
      color: "#4CAF50",
      description: "Basic electrolysis calculations",
      gradient: ["#66BB6A", "#4CAF50"],
      voltage: "Low Voltage"
    },
    conducting: {
      label: "🔋 Conducting",
      color: "#2196F3",
      description: "Intermediate electrode reactions",
      gradient: ["#42A5F5", "#2196F3"],
      voltage: "Medium Voltage"
    },
    energized: {
      label: "⚡ Energized",
      color: "#FF9800",
      description: "Complex multi-step problems",
      gradient: ["#FFA726", "#FF9800"],
      voltage: "High Voltage"
    },
    overloaded: {
      label: "🔌 Overloaded",
      color: "#F44336",
      description: "Advanced industrial calculations",
      gradient: ["#EF5350", "#F44336"],
      voltage: "Maximum Power"
    }
  };
  
  // Question generation functions
  export const generateQuestion = (type) => {
    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomValue = (min, max, decimals = 1) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
    
    switch (type) {
      case 'massDeposited':
        const metal1 = random(electrolysisReactions);
        const current1 = randomValue(1, 5, 1);
        const hours1 = randomValue(1, 6);
        const template1 = random(questionTemplates.massDeposited);
        return {
          question: template1
            .replace('{metal}', metal1.metal)
            .replace('{current}', current1)
            .replace('{time}', `${hours1} hours`)
            .replace('{solution}', metal1.solution),
          solution: calculateMassDeposited(current1, hours1, metal1),
          difficulty: 'charging',
          type: 'Mass Deposited',
          metalColor: metal1.color
        };
        
      case 'timeRequired':
        const metal2 = random(electrolysisReactions);
        const mass = randomValue(0.5, 3, 1);
        const current2 = randomValue(1, 3, 1);
        const template2 = random(questionTemplates.timeRequired);
        return {
          question: template2
            .replace('{mass}', mass)
            .replace('{metal}', metal2.metal)
            .replace('{current}', current2)
            .replace('{solution}', metal2.solution),
          solution: calculateTimeRequired(mass, current2, metal2),
          difficulty: 'conducting',
          type: 'Time Required',
          metalColor: metal2.color
        };
        
      case 'currentRequired':
        const metal3 = random(electrolysisReactions);
        const mass2 = randomValue(10, 50);
        const hours2 = randomValue(2, 8);
        const template3 = random(questionTemplates.currentRequired);
        return {
          question: template3
            .replace('{mass}', mass2)
            .replace('{metal}', metal3.metal)
            .replace('{solution}', metal3.solution)
            .replace('{time}', `${hours2} hours`),
          solution: calculateCurrentRequired(mass2, hours2, metal3),
          difficulty: 'energized',
          type: 'Current Required',
          metalColor: metal3.color
        };
        
      case 'gasVolume':
        const gas = random(gasReactions);
        const current3 = randomValue(1.5, 4, 1);
        const hours3 = randomValue(1, 4);
        const template4 = random(questionTemplates.gasVolume);
        return {
          question: template4
            .replace('{gas}', gas.gas)
            .replace('{electrode}', gas.electrode)
            .replace('{current}', current3)
            .replace('{time}', `${hours3} hours`),
          solution: calculateGasVolume(current3, hours3, gas),
          difficulty: 'conducting',
          type: 'Gas Volume',
          gasColor: gas.color
        };
        
      case 'solutionConcentration':
        const soln = random(solutionReactions);
        const volume = randomValue(1, 4, 1);
        const concentration = randomValue(0.5, 3, 1);
        const template5 = random(questionTemplates.solutionConcentration);
        return {
          question: template5
            .replace('{product}', soln.product)
            .replace('{volume}', volume)
            .replace('{concentration}', concentration)
            .replace('{compound}', soln.compound),
          solution: calculateFromSolution(volume, concentration, soln),
          difficulty: 'energized',
          type: 'Solution Electrolysis',
          category: soln.category
        };
        
      case 'chargeCalculation':
        const metal4 = random(electrolysisReactions);
        const mass3 = randomValue(5, 25);
        const template6 = random(questionTemplates.chargeCalculation);
        return {
          question: template6
            .replace('{mass}', mass3)
            .replace('{substance}', metal4.metal),
          solution: calculateChargeRequired(mass3, metal4),
          difficulty: 'overloaded',
          type: 'Charge Calculation',
          metalColor: metal4.color
        };
        
      default:
        return generateQuestion('massDeposited');
    }
  };
  
  // Calculation Functions
  const calculateMassDeposited = (current, hours, metal) => {
    const timeSeconds = hours * 3600;
    const charge = current * timeSeconds;
    const molesElectrons = charge / constants.faraday;
    const molesMetal = molesElectrons / metal.electronsNeeded;
    const mass = molesMetal * metal.molarMass;
    
    return {
      steps: [
        `Half-reaction: ${metal.halfReaction}`,
        `Step 1: Calculate total charge (Q = I × t)`,
        `Q = ${current} A × ${hours} h × 3600 s/h = ${charge.toFixed(0)} C`,
        `Step 2: Calculate moles of electrons`,
        `n(e⁻) = Q ÷ F = ${charge.toFixed(0)} ÷ ${constants.faraday} = ${molesElectrons.toFixed(4)} mol`,
        `Step 3: Apply stoichiometry (${metal.electronsNeeded} e⁻ -> 1 ${metal.symbol})`,
        `n(${metal.symbol}) = ${molesElectrons.toFixed(4)} ÷ ${metal.electronsNeeded} = ${molesMetal.toFixed(4)} mol`,
        `Step 4: Convert to mass`,
        `mass = ${molesMetal.toFixed(4)} mol × ${metal.molarMass} g/mol = ${mass.toFixed(2)} g`
      ],
      answer: `${mass.toFixed(2)} g`,
      explanation: `Using Faraday's laws of electrolysis, ${current} A for ${hours} hours deposits ${mass.toFixed(2)} g of ${metal.metal}.`,
      electricalData: { current, time: hours, charge: charge.toFixed(0) }
    };
  };
  
  const calculateTimeRequired = (mass, current, metal) => {
    const molesMetal = mass / metal.molarMass;
    const molesElectrons = molesMetal * metal.electronsNeeded;
    const charge = molesElectrons * constants.faraday;
    const timeSeconds = charge / current;
    const timeMinutes = timeSeconds / 60;
    
    return {
      steps: [
        `Half-reaction: ${metal.halfReaction}`,
        `Step 1: Calculate moles of ${metal.symbol}`,
        `n(${metal.symbol}) = ${mass} g ÷ ${metal.molarMass} g/mol = ${molesMetal.toFixed(4)} mol`,
        `Step 2: Calculate moles of electrons needed`,
        `n(e⁻) = ${molesMetal.toFixed(4)} × ${metal.electronsNeeded} = ${molesElectrons.toFixed(4)} mol`,
        `Step 3: Calculate total charge required`,
        `Q = n(e⁻) × F = ${molesElectrons.toFixed(4)} × ${constants.faraday} = ${charge.toFixed(1)} C`,
        `Step 4: Calculate time (t = Q ÷ I)`,
        `t = ${charge.toFixed(1)} C ÷ ${current} A = ${timeSeconds.toFixed(1)} s`,
        `t = ${timeMinutes.toFixed(1)} minutes (${(timeMinutes/60).toFixed(2)} hours)`
      ],
      answer: `${timeMinutes.toFixed(1)} minutes`,
      explanation: `To deposit ${mass} g of ${metal.metal} at ${current} A requires ${timeMinutes.toFixed(1)} minutes of electrolysis.`,
      timeData: { seconds: timeSeconds.toFixed(1), minutes: timeMinutes.toFixed(1) }
    };
  };
  
  const calculateCurrentRequired = (mass, hours, metal) => {
    const molesMetal = mass / metal.molarMass;
    const molesElectrons = molesMetal * metal.electronsNeeded;
    const charge = molesElectrons * constants.faraday;
    const timeSeconds = hours * 3600;
    const current = charge / timeSeconds;
    
    return {
      steps: [
        `Half-reaction: ${metal.halfReaction}`,
        `Step 1: Calculate moles of ${metal.symbol} needed`,
        `n(${metal.symbol}) = ${mass} g ÷ ${metal.molarMass} g/mol = ${molesMetal.toFixed(3)} mol`,
        `Step 2: Calculate moles of electrons`,
        `n(e⁻) = ${molesMetal.toFixed(3)} × ${metal.electronsNeeded} = ${molesElectrons.toFixed(3)} mol`,
        `Step 3: Calculate charge required`,
        `Q = ${molesElectrons.toFixed(3)} × ${constants.faraday} = ${charge.toFixed(1)} C`,
        `Step 4: Calculate current (I = Q ÷ t)`,
        `I = ${charge.toFixed(1)} C ÷ ${timeSeconds} s = ${current.toFixed(2)} A`
      ],
      answer: `${current.toFixed(2)} A`,
      explanation: `A minimum current of ${current.toFixed(2)} amperes is needed to produce ${mass} g of ${metal.metal} in ${hours} hours.`,
      powerData: { current: current.toFixed(2), charge: charge.toFixed(1) }
    };
  };
  
  const calculateGasVolume = (current, hours, gas) => {
    const timeSeconds = hours * 3600;
    const charge = current * timeSeconds;
    const molesElectrons = charge / constants.faraday;
    const molesGas = molesElectrons / gas.electronsNeeded;
    const volume = molesGas * gas.molarVolume;
    
    return {
      steps: [
        `Half-reaction: ${gas.halfReaction}`,
        `Step 1: Calculate charge`,
        `Q = ${current} A × ${hours} h × 3600 s/h = ${charge.toFixed(0)} C`,
        `Step 2: Calculate moles of electrons`,
        `n(e⁻) = ${charge.toFixed(0)} ÷ ${constants.faraday} = ${molesElectrons.toFixed(4)} mol`,
        `Step 3: Apply stoichiometry`,
        `n(${gas.symbol}) = ${molesElectrons.toFixed(4)} ÷ ${gas.electronsNeeded} = ${molesGas.toFixed(4)} mol`,
        `Step 4: Calculate volume (1 mol = ${gas.molarVolume} dm³)`,
        `V = ${molesGas.toFixed(4)} × ${gas.molarVolume} = ${volume.toFixed(2)} dm³`
      ],
      answer: `${volume.toFixed(2)} dm³`,
      explanation: `Electrolysis at the ${gas.electrode} produces ${volume.toFixed(2)} liters of ${gas.gas} gas.`,
      gasData: { moles: molesGas.toFixed(4), volume: volume.toFixed(2) }
    };
  };
  
  const calculateFromSolution = (volume, concentration, soln) => {
    const molesCompound = volume * concentration;
    const molesProduct = molesCompound * soln.stoichiometry;
    const mass = molesProduct * soln.molarMass;
    
    return {
      steps: [
        `Step 1: Calculate moles of ${soln.compound}`,
        `n = V × M = ${volume} L × ${concentration} M = ${molesCompound.toFixed(2)} mol`,
        `Step 2: Apply stoichiometry`,
        `n(${soln.productFormula}) = ${molesCompound.toFixed(2)} × ${soln.stoichiometry} = ${molesProduct.toFixed(2)} mol`,
        `Step 3: Calculate mass`,
        `mass = ${molesProduct.toFixed(2)} mol × ${soln.molarMass} g/mol = ${mass.toFixed(2)} g`
      ],
      answer: `${mass.toFixed(2)} g`,
      explanation: `Electrolysis of ${volume} L of ${concentration} M ${soln.compound} produces ${mass.toFixed(2)} g of ${soln.product}.`,
      solutionData: { concentration, volume, moles: molesCompound.toFixed(2) }
    };
  };
  
  const calculateChargeRequired = (mass, metal) => {
    const molesMetal = mass / metal.molarMass;
    const molesElectrons = molesMetal * metal.electronsNeeded;
    const charge = molesElectrons * constants.faraday;
    
    return {
      steps: [
        `Half-reaction: ${metal.halfReaction}`,
        `Step 1: Calculate moles of ${metal.symbol}`,
        `n(${metal.symbol}) = ${mass} g ÷ ${metal.molarMass} g/mol = ${molesMetal.toFixed(4)} mol`,
        `Step 2: Calculate moles of electrons`,
        `n(e⁻) = ${molesMetal.toFixed(4)} × ${metal.electronsNeeded} = ${molesElectrons.toFixed(4)} mol`,
        `Step 3: Calculate charge (Q = n × F)`,
        `Q = ${molesElectrons.toFixed(4)} mol × ${constants.faraday} C/mol`,
        `Q = ${charge.toFixed(1)} C`
      ],
      answer: `${charge.toFixed(1)} C`,
      explanation: `Producing ${mass} g of ${metal.metal} requires ${charge.toFixed(1)} coulombs of electrical charge.`,
      chargeData: { coulombs: charge.toFixed(1), electrons: molesElectrons.toFixed(4) }
    };
  };
  
  export default {
    questionTemplates,
    electrolysisReactions,
    gasReactions,
    solutionReactions,
    constants,
    difficultyLevels,
    generateQuestion
  };