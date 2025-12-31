// GasLawsQuestionGenerator.js - Comprehensive Gas Laws Question Engine

const GasLawsQuestionGenerator = {
    // Utility Functions
    random: (arr) => arr[Math.floor(Math.random() * arr.length)],
    
    randomNum: (min, max, decimals = 0) => {
      const num = Math.random() * (max - min) + min;
      return decimals > 0 ? parseFloat(num.toFixed(decimals)) : Math.floor(num);
    },
  
    // Constants
    R: 0.08206, // L·atm/(mol·K)
    R_SI: 8.314, // J/(mol·K)
    
    // Gas Database
    gases: [
      { name: 'helium', formula: 'He', molarMass: 4.00, gamma: 1.67 },
      { name: 'neon', formula: 'Ne', molarMass: 20.18, gamma: 1.67 },
      { name: 'argon', formula: 'Ar', molarMass: 39.95, gamma: 1.67 },
      { name: 'hydrogen', formula: 'H₂', molarMass: 2.02, gamma: 1.41 },
      { name: 'nitrogen', formula: 'N₂', molarMass: 28.02, gamma: 1.40 },
      { name: 'oxygen', formula: 'O₂', molarMass: 32.00, gamma: 1.40 },
      { name: 'carbon dioxide', formula: 'CO₂', molarMass: 44.01, gamma: 1.30 },
      { name: 'methane', formula: 'CH₄', molarMass: 16.04, gamma: 1.31 },
      { name: 'ammonia', formula: 'NH₃', molarMass: 17.03, gamma: 1.31 },
      { name: 'chlorine', formula: 'Cl₂', molarMass: 70.90, gamma: 1.36 }
    ],
  
    // Question Type 1: Boyle's Law
    generateBoylesLaw() {
      const P1 = this.randomNum(1, 5, 1);
      const V1 = this.randomNum(2, 10, 1);
      const P2 = this.randomNum(1, 5, 1);
      const V2 = ((P1 * V1) / P2).toFixed(2);
      
      return {
        id: `boyle_${Date.now()}_${Math.random()}`,
        type: 'Boyle\'s Law',
        icon: '🎈',
        difficulty: 'Easy',
        color: '#3B82F6',
        question: `A gas occupies ${V1} L at ${P1} atm. If the pressure is changed to ${P2} atm at constant temperature, what will be the new volume?`,
        solution: [
          'Boyle\'s Law: P₁V₁ = P₂V₂',
          '(At constant temperature)',
          '',
          'Given:',
          `P₁ = ${P1} atm`,
          `V₁ = ${V1} L`,
          `P₂ = ${P2} atm`,
          'V₂ = ?',
          '',
          'Solve for V₂:',
          `V₂ = (P₁ × V₁) / P₂`,
          `V₂ = (${P1} × ${V1}) / ${P2}`,
          `V₂ = ${V2} L`
        ],
        answer: `${V2} L`,
        concept: 'Pressure × Volume = constant (at constant T)',
        hint: 'Inverse relationship: ↑ pressure → ↓ volume'
      };
    },
  
    // Question Type 2: Charles's Law
    generateCharlesLaw() {
      const V1 = this.randomNum(2, 10, 1);
      const T1 = this.randomNum(250, 350, 0);
      const T2 = this.randomNum(300, 500, 0);
      const V2 = ((V1 * T2) / T1).toFixed(2);
      
      return {
        id: `charles_${Date.now()}_${Math.random()}`,
        type: 'Charles\'s Law',
        icon: '🌡️',
        difficulty: 'Easy',
        color: '#EF4444',
        question: `A gas occupies ${V1} L at ${T1} K. If the temperature is changed to ${T2} K at constant pressure, what will be the new volume?`,
        solution: [
          'Charles\'s Law: V₁/T₁ = V₂/T₂',
          '(At constant pressure)',
          '',
          'Given:',
          `V₁ = ${V1} L`,
          `T₁ = ${T1} K`,
          `T₂ = ${T2} K`,
          'V₂ = ?',
          '',
          'Solve for V₂:',
          `V₂ = (V₁ × T₂) / T₁`,
          `V₂ = (${V1} × ${T2}) / ${T1}`,
          `V₂ = ${V2} L`
        ],
        answer: `${V2} L`,
        concept: 'Volume / Temperature = constant (at constant P)',
        hint: 'Direct relationship: ↑ temperature → ↑ volume'
      };
    },
  
    // Question Type 3: Gay-Lussac's Law
    generateGayLussacLaw() {
      const P1 = this.randomNum(1, 4, 1);
      const T1 = this.randomNum(250, 350, 0);
      const T2 = this.randomNum(300, 500, 0);
      const P2 = ((P1 * T2) / T1).toFixed(2);
      
      return {
        id: `gaylussac_${Date.now()}_${Math.random()}`,
        type: 'Gay-Lussac\'s Law',
        icon: '⚗️',
        difficulty: 'Easy',
        color: '#F59E0B',
        question: `A gas has a pressure of ${P1} atm at ${T1} K. If the temperature is changed to ${T2} K at constant volume, what will be the new pressure?`,
        solution: [
          'Gay-Lussac\'s Law: P₁/T₁ = P₂/T₂',
          '(At constant volume)',
          '',
          'Given:',
          `P₁ = ${P1} atm`,
          `T₁ = ${T1} K`,
          `T₂ = ${T2} K`,
          'P₂ = ?',
          '',
          'Solve for P₂:',
          `P₂ = (P₁ × T₂) / T₁`,
          `P₂ = (${P1} × ${T2}) / ${T1}`,
          `P₂ = ${P2} atm`
        ],
        answer: `${P2} atm`,
        concept: 'Pressure / Temperature = constant (at constant V)',
        hint: 'Direct relationship: ↑ temperature → ↑ pressure'
      };
    },
  
    // Question Type 4: Combined Gas Law
    generateCombinedGasLaw() {
      const P1 = this.randomNum(1, 4, 1);
      const V1 = this.randomNum(2, 8, 1);
      const T1 = this.randomNum(250, 350, 0);
      const P2 = this.randomNum(1, 4, 1);
      const T2 = this.randomNum(300, 450, 0);
      const V2 = ((P1 * V1 * T2) / (P2 * T1)).toFixed(2);
      
      return {
        id: `combined_${Date.now()}_${Math.random()}`,
        type: 'Combined Gas Law',
        icon: '🔄',
        difficulty: 'Medium',
        color: '#8B5CF6',
        question: `A gas occupies ${V1} L at ${P1} atm and ${T1} K. If the conditions change to ${P2} atm and ${T2} K, what will be the new volume?`,
        solution: [
          'Combined Gas Law: (P₁V₁)/T₁ = (P₂V₂)/T₂',
          '',
          'Given:',
          `P₁ = ${P1} atm, V₁ = ${V1} L, T₁ = ${T1} K`,
          `P₂ = ${P2} atm, T₂ = ${T2} K`,
          'V₂ = ?',
          '',
          'Solve for V₂:',
          `V₂ = (P₁ × V₁ × T₂) / (P₂ × T₁)`,
          `V₂ = (${P1} × ${V1} × ${T2}) / (${P2} × ${T1})`,
          `V₂ = ${V2} L`
        ],
        answer: `${V2} L`,
        concept: 'Combines Boyle\'s, Charles\'s, and Gay-Lussac\'s Laws',
        hint: 'All three variables (P, V, T) change simultaneously'
      };
    },
  
    // Question Type 5: Ideal Gas Law
    generateIdealGasLaw() {
      const P = this.randomNum(1, 5, 1);
      const V = this.randomNum(5, 25, 1);
      const T = this.randomNum(273, 373, 0);
      const n = ((P * V) / (this.R * T)).toFixed(3);
      
      return {
        id: `ideal_${Date.now()}_${Math.random()}`,
        type: 'Ideal Gas Law',
        icon: '⚛️',
        difficulty: 'Medium',
        color: '#10B981',
        question: `A gas occupies ${V} L at ${P} atm and ${T} K. How many moles of gas are present?\n(R = 0.08206 L·atm/(mol·K))`,
        solution: [
          'Ideal Gas Law: PV = nRT',
          '',
          'Given:',
          `P = ${P} atm`,
          `V = ${V} L`,
          `T = ${T} K`,
          `R = ${this.R} L·atm/(mol·K)`,
          'n = ?',
          '',
          'Solve for n:',
          `n = PV / (RT)`,
          `n = (${P} × ${V}) / (${this.R} × ${T})`,
          `n = ${n} moles`
        ],
        answer: `${n} moles`,
        concept: 'PV = nRT relates all gas properties',
        hint: 'Remember: n = PV/RT'
      };
    },
  
    // Question Type 6: Dalton's Law of Partial Pressures
    generateDaltonsLaw() {
      const gas1 = this.random(this.gases);
      const gas2 = this.random(this.gases.filter(g => g.name !== gas1.name));
      const P1 = this.randomNum(0.5, 2.0, 2);
      const P2 = this.randomNum(0.5, 2.0, 2);
      const Ptotal = (parseFloat(P1) + parseFloat(P2)).toFixed(2);
      
      return {
        id: `dalton_${Date.now()}_${Math.random()}`,
        type: 'Dalton\'s Law',
        icon: '🎭',
        difficulty: 'Easy',
        color: '#06B6D4',
        question: `A container holds a mixture of ${gas1.name} (${gas1.formula}) at ${P1} atm and ${gas2.name} (${gas2.formula}) at ${P2} atm. What is the total pressure?`,
        solution: [
          'Dalton\'s Law: P(total) = P₁ + P₂ + P₃ + ...',
          '',
          'Given:',
          `P(${gas1.formula}) = ${P1} atm`,
          `P(${gas2.formula}) = ${P2} atm`,
          '',
          'Calculate total pressure:',
          `P(total) = ${P1} + ${P2}`,
          `P(total) = ${Ptotal} atm`
        ],
        answer: `${Ptotal} atm`,
        concept: 'Total pressure = sum of all partial pressures',
        hint: 'Each gas exerts pressure independently'
      };
    },
  
    // Question Type 7: Graham's Law of Effusion
    generateGrahamsLaw() {
      const gas1 = this.random(this.gases);
      const gas2 = this.random(this.gases.filter(g => g.name !== gas1.name));
      const rate1 = this.randomNum(1, 5, 1);
      const ratio = Math.sqrt(gas2.molarMass / gas1.molarMass);
      const rate2 = (rate1 / ratio).toFixed(2);
      
      return {
        id: `graham_${Date.now()}_${Math.random()}`,
        type: 'Graham\'s Law',
        icon: '💨',
        difficulty: 'Hard',
        color: '#EC4899',
        question: `${gas1.name} (${gas1.formula}) effuses at ${rate1} mL/s. At what rate will ${gas2.name} (${gas2.formula}) effuse?\n(M₁ = ${gas1.molarMass} g/mol, M₂ = ${gas2.molarMass} g/mol)`,
        solution: [
          'Graham\'s Law: rate₁/rate₂ = √(M₂/M₁)',
          '',
          'Given:',
          `rate₁ (${gas1.formula}) = ${rate1} mL/s`,
          `M₁ = ${gas1.molarMass} g/mol`,
          `M₂ = ${gas2.molarMass} g/mol`,
          '',
          'Solve for rate₂:',
          `rate₂ = rate₁ × √(M₁/M₂)`,
          `rate₂ = ${rate1} × √(${gas1.molarMass}/${gas2.molarMass})`,
          `rate₂ = ${rate1} × ${(1/ratio).toFixed(3)}`,
          `rate₂ = ${rate2} mL/s`
        ],
        answer: `${rate2} mL/s`,
        concept: 'Lighter gases effuse/diffuse faster',
        hint: 'Rate is inversely proportional to √(molar mass)'
      };
    },
  
    // Question Type 8: Avogadro's Law
    generateAvogadrosLaw() {
      const n1 = this.randomNum(1, 5, 1);
      const V1 = this.randomNum(5, 20, 1);
      const n2 = this.randomNum(2, 8, 1);
      const V2 = ((V1 * n2) / n1).toFixed(2);
      
      return {
        id: `avogadro_${Date.now()}_${Math.random()}`,
        type: 'Avogadro\'s Law',
        icon: '🔢',
        difficulty: 'Easy',
        color: '#F59E0B',
        question: `${n1} moles of gas occupy ${V1} L at constant temperature and pressure. What volume will ${n2} moles occupy?`,
        solution: [
          'Avogadro\'s Law: V₁/n₁ = V₂/n₂',
          '(At constant T and P)',
          '',
          'Given:',
          `n₁ = ${n1} moles`,
          `V₁ = ${V1} L`,
          `n₂ = ${n2} moles`,
          'V₂ = ?',
          '',
          'Solve for V₂:',
          `V₂ = (V₁ × n₂) / n₁`,
          `V₂ = (${V1} × ${n2}) / ${n1}`,
          `V₂ = ${V2} L`
        ],
        answer: `${V2} L`,
        concept: 'Volume / Moles = constant (at constant T & P)',
        hint: 'Equal volumes of gases contain equal numbers of molecules'
      };
    },
  
    // Question Type 9: Molar Mass from Gas Law
    generateMolarMass() {
      const mass = this.randomNum(5, 50, 1);
      const V = this.randomNum(10, 30, 1);
      const P = this.randomNum(1, 3, 1);
      const T = this.randomNum(273, 373, 0);
      const n = (P * V) / (this.R * T);
      const M = (mass / n).toFixed(2);
      
      return {
        id: `molar_${Date.now()}_${Math.random()}`,
        type: 'Molar Mass',
        icon: '⚖️',
        difficulty: 'Hard',
        color: '#8B5CF6',
        question: `A ${mass} g sample of gas occupies ${V} L at ${P} atm and ${T} K. What is the molar mass of the gas?`,
        solution: [
          'Step 1: Find moles using PV = nRT',
          `n = PV / (RT)`,
          `n = (${P} × ${V}) / (${this.R} × ${T})`,
          `n = ${n.toFixed(4)} moles`,
          '',
          'Step 2: Calculate molar mass',
          'M = mass / moles',
          `M = ${mass} g / ${n.toFixed(4)} mol`,
          `M = ${M} g/mol`
        ],
        answer: `${M} g/mol`,
        concept: 'Molar mass = mass / moles',
        hint: 'First find moles, then divide mass by moles'
      };
    },
  
    // Question Type 10: Density of Gas
    generateGasDensity() {
      const gas = this.random(this.gases);
      const P = this.randomNum(1, 3, 1);
      const T = this.randomNum(273, 373, 0);
      const density = ((P * gas.molarMass) / (this.R * T)).toFixed(3);
      
      return {
        id: `density_${Date.now()}_${Math.random()}`,
        type: 'Gas Density',
        icon: '📦',
        difficulty: 'Medium',
        color: '#10B981',
        question: `Calculate the density of ${gas.name} (${gas.formula}) at ${P} atm and ${T} K.\n(Molar mass = ${gas.molarMass} g/mol)`,
        solution: [
          'Gas density formula: d = PM / (RT)',
          '',
          'Given:',
          `P = ${P} atm`,
          `M = ${gas.molarMass} g/mol`,
          `R = ${this.R} L·atm/(mol·K)`,
          `T = ${T} K`,
          '',
          'Calculate density:',
          `d = (${P} × ${gas.molarMass}) / (${this.R} × ${T})`,
          `d = ${density} g/L`
        ],
        answer: `${density} g/L`,
        concept: 'Density = PM/RT for ideal gases',
        hint: 'Higher pressure → higher density'
      };
    },
  
    // Question Type 11: Partial Pressure from Mole Fraction
    generatePartialPressureMoleFraction() {
      const gas1 = this.random(this.gases);
      const gas2 = this.random(this.gases.filter(g => g.name !== gas1.name));
      const n1 = this.randomNum(0.2, 0.8, 1);
      const n2 = this.randomNum(0.2, 0.8, 1);
      const Ptotal = this.randomNum(2, 6, 1);
      const X1 = (n1 / (n1 + n2)).toFixed(3);
      const P1 = (X1 * Ptotal).toFixed(2);
      
      return {
        id: `partial_${Date.now()}_${Math.random()}`,
        type: 'Partial Pressure',
        icon: '🎲',
        difficulty: 'Medium',
        color: '#06B6D4',
        question: `A mixture contains ${n1} mol of ${gas1.name} and ${n2} mol of ${gas2.name}. If the total pressure is ${Ptotal} atm, what is the partial pressure of ${gas1.name}?`,
        solution: [
          'Partial Pressure: P₁ = χ₁ × P(total)',
          '',
          'Step 1: Calculate mole fraction',
          `χ₁ = n₁ / (n₁ + n₂)`,
          `χ₁ = ${n1} / (${n1} + ${n2})`,
          `χ₁ = ${X1}`,
          '',
          'Step 2: Calculate partial pressure',
          `P₁ = ${X1} × ${Ptotal} atm`,
          `P₁ = ${P1} atm`
        ],
        answer: `${P1} atm`,
        concept: 'Partial pressure = mole fraction × total pressure',
        hint: 'Mole fraction = moles of component / total moles'
      };
    },
  
    // Question Type 12: STP Calculations
    generateSTPCalculations() {
      const gas = this.random(this.gases);
      const moles = this.randomNum(0.5, 5, 2);
      const volume = (moles * 22.4).toFixed(2);
      
      return {
        id: `stp_${Date.now()}_${Math.random()}`,
        type: 'STP Conditions',
        icon: '🌐',
        difficulty: 'Easy',
        color: '#3B82F6',
        question: `What volume will ${moles} moles of ${gas.name} (${gas.formula}) occupy at STP?\n(STP: 0°C, 1 atm)`,
        solution: [
          'At STP: 1 mole of any gas = 22.4 L',
          '',
          'Given:',
          `n = ${moles} moles`,
          'Molar volume at STP = 22.4 L/mol',
          '',
          'Calculate volume:',
          `V = n × 22.4 L/mol`,
          `V = ${moles} × 22.4`,
          `V = ${volume} L`
        ],
        answer: `${volume} L`,
        concept: 'STP: 273 K, 1 atm → 22.4 L/mol',
        hint: 'Standard Temperature and Pressure conditions'
      };
    },
  
    // Master function to generate all questions
    generateQuestionSet(count = 50) {
      const generators = [
        this.generateBoylesLaw,
        this.generateCharlesLaw,
        this.generateGayLussacLaw,
        this.generateCombinedGasLaw,
        this.generateIdealGasLaw,
        this.generateDaltonsLaw,
        this.generateGrahamsLaw,
        this.generateAvogadrosLaw,
        this.generateMolarMass,
        this.generateGasDensity,
        this.generatePartialPressureMoleFraction,
        this.generateSTPCalculations
      ];
      
      const questions = [];
      for (let i = 0; i < count; i++) {
        const generator = this.random(generators);
        questions.push(generator.call(this));
      }
      
      // Shuffle questions
      return questions.sort(() => Math.random() - 0.5);
    }
  };
  
  export default GasLawsQuestionGenerator;