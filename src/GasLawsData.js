// GasLawsData.js - Problem Generator and Configuration for React Native

export const gasLawsConfig = {
    boylesLaw: {
      name: "Boyle's Law",
      principle: "At constant temperature, pressure and volume are inversely proportional",
      equation: "P₁V₁ = P₂V₂",
      color: "#4A90E2",
      emoji: "🔵"
    },
    charlesLaw: {
      name: "Charles's Law",
      principle: "At constant pressure, volume and temperature are directly proportional",
      equation: "V₁/T₁ = V₂/T₂",
      color: "#E84855",
      emoji: "🔥"
    },
    gayLussacLaw: {
      name: "Gay-Lussac's Law",
      principle: "At constant volume, pressure and temperature are directly proportional",
      equation: "P₁/T₁ = P₂/T₂",
      color: "#F39C12",
      emoji: "⚡"
    },
    avogadroLaw: {
      name: "Avogadro's Law",
      principle: "At constant T and P, volume and moles are directly proportional",
      equation: "V₁/n₁ = V₂/n₂",
      color: "#9B59B6",
      emoji: "⚛️"
    },
    combinedGasLaw: {
      name: "Combined Gas Law",
      principle: "Combines Boyle's, Charles's, and Gay-Lussac's Laws",
      equation: "(P₁V₁)/T₁ = (P₂V₂)/T₂",
      color: "#1ABC9C",
      emoji: "🌀"
    },
    idealGasLaw: {
      name: "Ideal Gas Law",
      principle: "Relates pressure, volume, temperature, and moles",
      equation: "PV = nRT",
      color: "#E67E22",
      emoji: "✨"
    },
    daltonsLaw: {
      name: "Dalton's Law",
      principle: "Total pressure equals sum of partial pressures",
      equation: "P_total = P₁ + P₂ + ...",
      color: "#3498DB",
      emoji: "➕"
    },
    grahamsLaw: {
      name: "Graham's Law",
      principle: "Effusion rate inversely proportional to √(molar mass)",
      equation: "r₁/r₂ = √(M₂/M₁)",
      color: "#E74C3C",
      emoji: "💨"
    }
  };
  
  // Gas types with real-world context
  export const gasTypes = [
    { name: "nitrogen", symbol: "N₂", emoji: "💙", context: "air component" },
    { name: "oxygen", symbol: "O₂", emoji: "🫁", context: "breathing gas" },
    { name: "helium", symbol: "He", emoji: "🎈", context: "balloon gas" },
    { name: "carbon dioxide", symbol: "CO₂", emoji: "🥤", context: "soda fizz" },
    { name: "hydrogen", symbol: "H₂", emoji: "💧", context: "fuel source" },
    { name: "argon", symbol: "Ar", emoji: "💡", context: "light bulb" },
    { name: "neon", symbol: "Ne", emoji: "🔆", context: "neon signs" },
    { name: "methane", symbol: "CH₄", emoji: "🔥", context: "natural gas" },
    { name: "ammonia", symbol: "NH₃", emoji: "🧪", context: "fertilizer" },
    { name: "chlorine", symbol: "Cl₂", emoji: "🏊", context: "pool cleaner" }
  ];
  
  // Realistic value ranges
  const valueRanges = {
    volume: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 8.0, 10.0, 15.0, 20.0, 25.0, 50.0, 75.0, 100.0],
    pressure: [0.5, 0.8, 1.0, 1.2, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 8.0, 10.0],
    temperatureC: [-40, -20, 0, 20, 25, 30, 40, 50, 75, 100, 150, 200, 300],
    temperatureK: [200, 250, 273, 298, 300, 323, 350, 400, 450, 500, 600],
    moles: [0.1, 0.2, 0.25, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0]
  };
  
  // Random value selector
  const getRandom = (array) => array[Math.floor(Math.random() * array.length)];
  
  // Question templates with multiple variations
  const questionTemplates = {
    boylesLaw: [
      (gas, v1, p1, p2) => ({
        question: `A ${gas.name} sample (${gas.emoji}) occupies ${v1} L at ${p1} atm. What volume will it occupy at ${p2} atm? (Temperature constant)`,
        context: `Think about squeezing a ${gas.context}!`
      }),
      (gas, v1, p1, p2) => ({
        question: `A syringe containing ${v1} mL of ${gas.name} ${gas.emoji} is at ${p1} atm. If compressed to ${p2} atm, what's the new volume?`,
        context: `Like pushing a syringe plunger!`
      }),
      (gas, v1, p1, p2) => ({
        question: `A balloon with ${gas.name} ${gas.emoji} has volume ${v1} L at ${p1} atm. At ${p2} atm, what will be its volume?`,
        context: `Balloon changing altitude!`
      }),
      (gas, v1, p1, p2) => ({
        question: `Deep-sea diver tank: ${v1} L of ${gas.name} at ${p1} bar. Volume at ${p2} bar?`,
        context: `Pressure increases underwater!`
      }),
      (gas, v1, p1, p2) => ({
        question: `Lab experiment: ${gas.name} gas ${gas.emoji} in ${v1} L container at ${p1} atm. If pressure drops to ${p2} atm, new volume?`,
        context: `Real chemistry lab scenario!`
      })
    ],
    
    charlesLaw: [
      (gas, v1, t1, t2) => ({
        question: `${gas.name} ${gas.emoji} occupies ${v1} L at ${t1} K. What volume at ${t2} K? (Pressure constant)`,
        context: `Temperature changes everything!`
      }),
      (gas, v1, t1, t2) => ({
        question: `Hot air balloon contains ${v1} m³ of air at ${t1}°C. To expand to what volume must it be heated to ${t2}°C?`,
        context: `How hot air balloons rise!`
      }),
      (gas, v1, t1, t2) => ({
        question: `Car tire: ${v1} L of air at ${t1} K in winter. What volume in summer at ${t2} K?`,
        context: `Why check tire pressure seasonally!`
      }),
      (gas, v1, t1, t2) => ({
        question: `Weather balloon: ${v1} L of ${gas.name} at ground level (${t1} K). Volume at altitude (${t2} K)?`,
        context: `Atmospheric science in action!`
      }),
      (gas, v1, t1, t2) => ({
        question: `Heating ${gas.name} ${gas.emoji} from ${t1}°C to ${t2}°C. Initial volume ${v1} mL. Final volume?`,
        context: `Temperature expansion effect!`
      })
    ],
    
    gayLussacLaw: [
      (gas, p1, t1, t2) => ({
        question: `Sealed container of ${gas.name} ${gas.emoji}: ${p1} atm at ${t1}°C. Pressure at ${t2}°C? (Volume constant)`,
        context: `Pressure cooker principle!`
      }),
      (gas, p1, t1, t2) => ({
        question: `Aerosol can warning ⚠️: ${p1} kPa at ${t1}°C. What pressure at ${t2}°C if heated?`,
        context: `Why cans say "don't heat"!`
      }),
      (gas, p1, t1, t2) => ({
        question: `Car tire pressure: ${p1} psi at ${t1}°F. Expected pressure at ${t2}°F?`,
        context: `Seasonal tire pressure changes!`
      }),
      (gas, p1, t1, t2) => ({
        question: `Propane tank: ${p1} atm at ${t1} K. If temperature rises to ${t2} K, what's the pressure?`,
        context: `Gas grill safety!`
      })
    ],
    
    combinedGasLaw: [
      (gas, v1, p1, t1, p2, t2) => ({
        question: `${gas.name} ${gas.emoji}: ${v1} L at ${p1} atm and ${t1} K. Volume at ${p2} atm and ${t2} K?`,
        context: `Multiple variables changing!`
      }),
      (gas, v1, p1, t1, p2, t2) => ({
        question: `Weather balloon data 🎈: Start: ${v1} m³, ${p1} atm, ${t1}°C. At altitude: ${p2} atm, ${t2}°C. New volume?`,
        context: `Real meteorological measurements!`
      }),
      (gas, v1, p1, t1, p2, t2) => ({
        question: `Scuba tank: ${v1} L at ${p1} bar and ${t1} K. At depth: ${p2} bar, ${t2} K. What's the volume?`,
        context: `Diving physics!`
      })
    ],
    
    idealGasLaw: [
      (gas, v, p, t) => ({
        question: `How many moles of ${gas.name} ${gas.emoji} in ${v} L container at ${p} atm and ${t}°C?`,
        context: `Finding amount of gas!`
      }),
      (gas, n, v, t) => ({
        question: `${n} moles of ${gas.name} in ${v} L at ${t} K. What's the pressure?`,
        context: `Calculating container pressure!`
      }),
      (gas, n, p, t) => ({
        question: `${n} mol of ${gas.name} ${gas.emoji} at ${p} atm and ${t}°C. What volume?`,
        context: `Space needed for gas!`
      }),
      (gas, n, v, p) => ({
        question: `${n} moles of ${gas.name} in ${v} L container at ${p} bar. What's temperature in Kelvin?`,
        context: `Finding gas temperature!`
      })
    ],
    
    daltonsLaw: [
      (gas1, gas2, n1, n2, pTotal) => ({
        question: `Gas mixture: ${n1} mol ${gas1.name} ${gas1.emoji} + ${n2} mol ${gas2.name} ${gas2.emoji}. Total pressure ${pTotal} atm. Partial pressure of ${gas1.name}?`,
        context: `How air pressure works!`
      }),
      (gas1, gas2, p1, p2) => ({
        question: `Scuba tank: ${gas1.name} ${gas1.emoji} at ${p1} atm, ${gas2.name} ${gas2.emoji} at ${p2} atm. Total pressure?`,
        context: `Breathing gas mixtures!`
      }),
      (gas1, gas2, n1, n2, pTotal) => ({
        question: `Lab mixture: ${n1} mol ${gas1.name} and ${n2} mol ${gas2.name} at ${pTotal} atm total. What's ${gas2.name}'s partial pressure?`,
        context: `Real lab calculations!`
      })
    ],
    
    grahamsLaw: [
      (gas1, gas2, m1, m2) => ({
        question: `${gas1.name} ${gas1.emoji} (M=${m1}) vs ${gas2.name} ${gas2.emoji} (M=${m2}). How much faster does lighter gas effuse?`,
        context: `Why helium balloons deflate faster!`
      }),
      (gas1, t1, ratio) => ({
        question: `${gas1.name} takes ${t1} seconds to effuse. Gas B has ${ratio}× the molar mass. Time for Gas B?`,
        context: `Comparing effusion rates!`
      })
    ]
  };
  
  // Solution calculators
  const calculateSolution = (lawType, values) => {
    const R = 0.08206; // L·atm/(mol·K)
    
    switch(lawType) {
      case 'boylesLaw':
        const answer = (values.p1 * values.v1) / values.p2;
        return {
          answer: answer.toFixed(2),
          unit: 'L',
          steps: [
            `📝 Apply Boyle's Law: P₁V₁ = P₂V₂`,
            `🔢 Known: P₁=${values.p1} atm, V₁=${values.v1} L, P₂=${values.p2} atm`,
            `🎯 Solve for V₂: V₂ = (P₁ × V₁) / P₂`,
            `🧮 Calculate: V₂ = (${values.p1} × ${values.v1}) / ${values.p2}`,
            `✅ Answer: V₂ = ${answer.toFixed(2)} L`,
            `💡 Insight: ${values.p2 > values.p1 ? 'Pressure increased, so volume decreased!' : 'Pressure decreased, so volume increased!'}`
          ],
          explanation: `When pressure ${values.p2 > values.p1 ? 'increases' : 'decreases'}, volume ${values.p2 > values.p1 ? 'decreases' : 'increases'} proportionally. This is why squeezing a balloon makes it smaller!`
        };
        
      case 'charlesLaw':
        const t1K = values.t1 + (values.t1 < 100 ? 273.15 : 0);
        const t2K = values.t2 + (values.t2 < 100 ? 273.15 : 0);
        const answerCharles = (values.v1 * t2K) / t1K;
        return {
          answer: answerCharles.toFixed(2),
          unit: 'L',
          steps: [
            `📝 Apply Charles's Law: V₁/T₁ = V₂/T₂`,
            `🌡️ Convert to Kelvin: T₁=${t1K.toFixed(0)} K, T₂=${t2K.toFixed(0)} K`,
            `🔢 Known: V₁=${values.v1} L`,
            `🎯 Solve for V₂: V₂ = (V₁ × T₂) / T₁`,
            `🧮 Calculate: V₂ = (${values.v1} × ${t2K.toFixed(0)}) / ${t1K.toFixed(0)}`,
            `✅ Answer: V₂ = ${answerCharles.toFixed(2)} L`,
            `💡 Insight: Temperature ${t2K > t1K ? 'increased' : 'decreased'}, so volume ${t2K > t1K ? 'increased' : 'decreased'} too!`
          ],
          explanation: `Direct relationship: hotter gas expands, cooler gas contracts. This is why hot air balloons rise!`
        };
        
      case 'idealGasLaw':
        const tempK = values.t + (values.t < 100 ? 273.15 : 0);
        const moles = (values.p * values.v) / (R * tempK);
        return {
          answer: moles.toFixed(3),
          unit: 'mol',
          steps: [
            `📝 Apply Ideal Gas Law: PV = nRT`,
            `🔢 Known: P=${values.p} atm, V=${values.v} L, T=${tempK.toFixed(0)} K`,
            `🧪 Gas constant: R = 0.08206 L·atm/(mol·K)`,
            `🎯 Solve for n: n = PV / RT`,
            `🧮 Calculate: n = (${values.p} × ${values.v}) / (0.08206 × ${tempK.toFixed(0)})`,
            `✅ Answer: n = ${moles.toFixed(3)} mol`,
            `💡 That's about ${(moles * 6.022e23).toExponential(2)} molecules!`
          ],
          explanation: `The ideal gas law combines all gas behavior into one equation!`
        };
        
      default:
        return null;
    }
  };
  
  // Main problem generator
  export const generateProblem = (lawType) => {
    const gas = getRandom(gasTypes);
    const templates = questionTemplates[lawType];
    
    if (!templates) return null;
    
    const template = getRandom(templates);
    let values, questionData;
    
    switch(lawType) {
      case 'boylesLaw':
        values = {
          v1: getRandom(valueRanges.volume),
          p1: getRandom(valueRanges.pressure),
          p2: getRandom(valueRanges.pressure)
        };
        questionData = template(gas, values.v1, values.p1, values.p2);
        break;
        
      case 'charlesLaw':
        values = {
          v1: getRandom(valueRanges.volume),
          t1: getRandom(valueRanges.temperatureK),
          t2: getRandom(valueRanges.temperatureK)
        };
        questionData = template(gas, values.v1, values.t1, values.t2);
        break;
        
      case 'idealGasLaw':
        values = {
          v: getRandom(valueRanges.volume),
          p: getRandom(valueRanges.pressure),
          t: getRandom(valueRanges.temperatureC)
        };
        questionData = template(gas, values.v, values.p, values.t);
        break;
        
      default:
        return null;
    }
    
    const solution = calculateSolution(lawType, values);
    
    return {
      ...questionData,
      lawType,
      lawConfig: gasLawsConfig[lawType],
      gas,
      values,
      solution
    };
  };
  
  // Get statistics for progress tracking
  export const getStatistics = (userHistory) => {
    const stats = {
      totalAttempts: userHistory.length,
      correctAnswers: userHistory.filter(h => h.correct).length,
      byLaw: {}
    };
    
    Object.keys(gasLawsConfig).forEach(law => {
      const lawAttempts = userHistory.filter(h => h.lawType === law);
      stats.byLaw[law] = {
        attempts: lawAttempts.length,
        correct: lawAttempts.filter(h => h.correct).length,
        accuracy: lawAttempts.length > 0 ? 
          (lawAttempts.filter(h => h.correct).length / lawAttempts.length * 100).toFixed(1) : 0
      };
    });
    
    stats.overallAccuracy = stats.totalAttempts > 0 ? 
      (stats.correctAnswers / stats.totalAttempts * 100).toFixed(1) : 0;
      
    return stats;
  };
  
  export default {
    gasLawsConfig,
    gasTypes,
    generateProblem,
    getStatistics
  };