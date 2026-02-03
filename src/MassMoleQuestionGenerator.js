// MassMoleQuestionGenerator.js - Mass-Mole-Number Stoichiometry Engine

const MassMoleQuestionGenerator = {
    // Utility Functions
    random: (arr) => arr[Math.floor(Math.random() * arr.length)],
    
    randomNum: (min, max, decimals = 0) => {
      const num = Math.random() * (max - min) + min;
      return decimals > 0 ? parseFloat(num.toFixed(decimals)) : Math.floor(num);
    },
  
    // Constants
    AVOGADRO: 6.022e23,
    
    // Comprehensive Compound Database
    compounds: {
      simple: [
        { name: 'water', formula: 'H₂O', molarMass: 18.015, atoms: { H: 2, O: 1 } },
        { name: 'methane', formula: 'CH₄', molarMass: 16.04, atoms: { C: 1, H: 4 } },
        { name: 'ammonia', formula: 'NH₃', molarMass: 17.03, atoms: { N: 1, H: 3 } },
        { name: 'oxygen gas', formula: 'O₂', molarMass: 32.00, atoms: { O: 2 } },
        { name: 'nitrogen gas', formula: 'N₂', molarMass: 28.02, atoms: { N: 2 } },
        { name: 'hydrogen gas', formula: 'H₂', molarMass: 2.016, atoms: { H: 2 } }
      ],
      salts: [
        { name: 'sodium chloride', formula: 'NaCl', molarMass: 58.44, atoms: { Na: 1, Cl: 1 } },
        { name: 'potassium chloride', formula: 'KCl', molarMass: 74.55, atoms: { K: 1, Cl: 1 } },
        { name: 'calcium carbonate', formula: 'CaCO₃', molarMass: 100.09, atoms: { Ca: 1, C: 1, O: 3 } },
        { name: 'magnesium oxide', formula: 'MgO', molarMass: 40.30, atoms: { Mg: 1, O: 1 } },
        { name: 'aluminum oxide', formula: 'Al₂O₃', molarMass: 101.96, atoms: { Al: 2, O: 3 } },
        { name: 'sodium carbonate', formula: 'Na₂CO₃', molarMass: 105.99, atoms: { Na: 2, C: 1, O: 3 } },
        { name: 'potassium permanganate', formula: 'KMnO₄', molarMass: 158.03, atoms: { K: 1, Mn: 1, O: 4 } },
        { name: 'silver nitrate', formula: 'AgNO₃', molarMass: 169.87, atoms: { Ag: 1, N: 1, O: 3 } },
        { name: 'barium sulfate', formula: 'BaSO₄', molarMass: 233.39, atoms: { Ba: 1, S: 1, O: 4 } }
      ],
      acids: [
        { name: 'hydrochloric acid', formula: 'HCl', molarMass: 36.46, atoms: { H: 1, Cl: 1 } },
        { name: 'sulfuric acid', formula: 'H₂SO₄', molarMass: 98.08, atoms: { H: 2, S: 1, O: 4 } },
        { name: 'nitric acid', formula: 'HNO₃', molarMass: 63.01, atoms: { H: 1, N: 1, O: 3 } },
        { name: 'acetic acid', formula: 'CH₃COOH', molarMass: 60.05, atoms: { C: 2, H: 4, O: 2 } },
        { name: 'phosphoric acid', formula: 'H₃PO₄', molarMass: 97.99, atoms: { H: 3, P: 1, O: 4 } }
      ],
      bases: [
        { name: 'sodium hydroxide', formula: 'NaOH', molarMass: 40.00, atoms: { Na: 1, O: 1, H: 1 } },
        { name: 'potassium hydroxide', formula: 'KOH', molarMass: 56.11, atoms: { K: 1, O: 1, H: 1 } },
        { name: 'calcium hydroxide', formula: 'Ca(OH)₂', molarMass: 74.09, atoms: { Ca: 1, O: 2, H: 2 } },
        { name: 'magnesium hydroxide', formula: 'Mg(OH)₂', molarMass: 58.32, atoms: { Mg: 1, O: 2, H: 2 } }
      ],
      organics: [
        { name: 'glucose', formula: 'C₆H₁₂O₆', molarMass: 180.16, atoms: { C: 6, H: 12, O: 6 } },
        { name: 'ethanol', formula: 'C₂H₅OH', molarMass: 46.07, atoms: { C: 2, H: 6, O: 1 } },
        { name: 'benzene', formula: 'C₆H₆', molarMass: 78.11, atoms: { C: 6, H: 6 } },
        { name: 'sucrose', formula: 'C₁₂H₂₂O₁₁', molarMass: 342.30, atoms: { C: 12, H: 22, O: 11 } }
      ],
      oxides: [
        { name: 'carbon dioxide', formula: 'CO₂', molarMass: 44.01, atoms: { C: 1, O: 2 } },
        { name: 'sulfur dioxide', formula: 'SO₂', molarMass: 64.06, atoms: { S: 1, O: 2 } },
        { name: 'nitrogen dioxide', formula: 'NO₂', molarMass: 46.01, atoms: { N: 1, O: 2 } },
        { name: 'dinitrogen pentoxide', formula: 'N₂O₅', molarMass: 108.01, atoms: { N: 2, O: 5 } },
        { name: 'phosphorus pentoxide', formula: 'P₄O₁₀', molarMass: 283.89, atoms: { P: 4, O: 10 } }
      ],
      complex: [
        { name: 'copper(II) sulfate', formula: 'CuSO₄', molarMass: 159.61, atoms: { Cu: 1, S: 1, O: 4 } },
        { name: 'aluminum chloride', formula: 'AlCl₃', molarMass: 133.34, atoms: { Al: 1, Cl: 3 } },
        { name: 'magnesium nitrate', formula: 'Mg(NO₃)₂', molarMass: 148.32, atoms: { Mg: 1, N: 2, O: 6 } },
        { name: 'hydrogen peroxide', formula: 'H₂O₂', molarMass: 34.02, atoms: { H: 2, O: 2 } },
        { name: 'phosphorus pentachloride', formula: 'PCl₅', molarMass: 208.24, atoms: { P: 1, Cl: 5 } },
        { name: 'sulfur hexafluoride', formula: 'SF₆', molarMass: 146.06, atoms: { S: 1, F: 6 } }
      ]
    },
  
    // Get all compounds
    getAllCompounds() {
      return [
        ...this.compounds.simple,
        ...this.compounds.salts,
        ...this.compounds.acids,
        ...this.compounds.bases,
        ...this.compounds.organics,
        ...this.compounds.oxides,
        ...this.compounds.complex
      ];
    },
  
    // Question Type 1: Mass to Moles
    generateMassToMoles() {
      const compound = this.random(this.getAllCompounds());
      const mass = this.randomNum(10, 500, 1);
      const moles = (mass / compound.molarMass).toFixed(3);
      
      return {
        id: `mtm_${Date.now()}_${Math.random()}`,
        type: 'Mass -> Moles',
        icon: '⚖️',
        difficulty: 'Easy',
        color: '#1F2937',
        question: `Calculate the number of moles in ${mass} grams of ${compound.name} (${compound.formula}).`,
        solution: [
          'Use the mole formula:',
          'n = mass / molar mass',
          '',
          `Given: mass = ${mass} g`,
          `Molar mass of ${compound.formula} = ${compound.molarMass} g/mol`,
          '',
          `n = ${mass} g / ${compound.molarMass} g/mol`,
          `n = ${moles} moles`
        ],
        answer: `${moles} moles`,
        concept: 'Moles = Mass ÷ Molar Mass',
        hint: 'Remember: n = m/M'
      };
    },
  
    // Question Type 2: Moles to Mass
    generateMolesToMass() {
      const compound = this.random(this.getAllCompounds());
      const moles = this.randomNum(0.5, 10, 2);
      const mass = (moles * compound.molarMass).toFixed(2);
      
      return {
        id: `mtm_${Date.now()}_${Math.random()}`,
        type: 'Moles -> Mass',
        icon: '🔬',
        difficulty: 'Easy',
        color: '#374151',
        question: `Calculate the mass of ${moles} moles of ${compound.name} (${compound.formula}).`,
        solution: [
          'Use the mass formula:',
          'mass = moles × molar mass',
          '',
          `Given: n = ${moles} moles`,
          `Molar mass of ${compound.formula} = ${compound.molarMass} g/mol`,
          '',
          `mass = ${moles} mol × ${compound.molarMass} g/mol`,
          `mass = ${mass} grams`
        ],
        answer: `${mass} g`,
        concept: 'Mass = Moles × Molar Mass',
        hint: 'Remember: m = n × M'
      };
    },
  
    // Question Type 3: Molecules to Moles
    generateMoleculesToMoles() {
      const compound = this.random(this.getAllCompounds());
      const molecules = this.randomNum(1, 50) * 1e23;
      const moleculesFormatted = (molecules).toExponential(2);
      const moles = (molecules / this.AVOGADRO).toFixed(3);
      
      return {
        id: `mlm_${Date.now()}_${Math.random()}`,
        type: 'Molecules -> Moles',
        icon: '🧬',
        difficulty: 'Medium',
        color: '#4B5563',
        question: `How many moles are in ${moleculesFormatted} molecules of ${compound.name} (${compound.formula})?`,
        solution: [
          'Use Avogadro\'s number:',
          'n = N / Nₐ',
          '',
          `Given: N = ${moleculesFormatted} molecules`,
          `Avogadro's number: Nₐ = 6.022 × 10²³ molecules/mol`,
          '',
          `n = ${moleculesFormatted} / 6.022 × 10²³`,
          `n = ${moles} moles`
        ],
        answer: `${moles} moles`,
        concept: 'Moles = Molecules ÷ Avogadro\'s Number',
        hint: 'Nₐ = 6.022 × 10²³'
      };
    },
  
    // Question Type 4: Moles to Molecules
    generateMolesToMolecules() {
      const compound = this.random(this.getAllCompounds());
      const moles = this.randomNum(0.1, 5, 2);
      const molecules = (moles * this.AVOGADRO).toExponential(2);
      
      return {
        id: `mtml_${Date.now()}_${Math.random()}`,
        type: 'Moles -> Molecules',
        icon: '⚛️',
        difficulty: 'Medium',
        color: '#6B7280',
        question: `Calculate the number of molecules in ${moles} moles of ${compound.name} (${compound.formula}).`,
        solution: [
          'Use Avogadro\'s number:',
          'N = n × Nₐ',
          '',
          `Given: n = ${moles} moles`,
          `Avogadro's number: Nₐ = 6.022 × 10²³ molecules/mol`,
          '',
          `N = ${moles} mol × 6.022 × 10²³ molecules/mol`,
          `N = ${molecules} molecules`
        ],
        answer: `${molecules} molecules`,
        concept: 'Molecules = Moles × Avogadro\'s Number',
        hint: 'Multiply by 6.022 × 10²³'
      };
    },
  
    // Question Type 5: Mass to Molecules
    generateMassToMolecules() {
      const compound = this.random(this.getAllCompounds());
      const mass = this.randomNum(10, 200, 1);
      const moles = mass / compound.molarMass;
      const molecules = (moles * this.AVOGADRO).toExponential(2);
      
      return {
        id: `masm_${Date.now()}_${Math.random()}`,
        type: 'Mass -> Molecules',
        icon: '💫',
        difficulty: 'Hard',
        color: '#111827',
        question: `How many molecules are present in ${mass} grams of ${compound.name} (${compound.formula})?`,
        solution: [
          'Step 1: Calculate moles',
          'n = mass / molar mass',
          `n = ${mass} g / ${compound.molarMass} g/mol`,
          `n = ${moles.toFixed(3)} moles`,
          '',
          'Step 2: Calculate molecules',
          'N = n × Nₐ',
          `N = ${moles.toFixed(3)} mol × 6.022 × 10²³ molecules/mol`,
          `N = ${molecules} molecules`
        ],
        answer: `${molecules} molecules`,
        concept: 'Two-step conversion: mass -> moles -> molecules',
        hint: 'First find moles, then multiply by Avogadro\'s number'
      };
    },
  
    // Question Type 6: Molecules to Mass
    generateMoleculesToMass() {
      const compound = this.random(this.getAllCompounds());
      const molecules = this.randomNum(5, 30) * 1e23;
      const moleculesFormatted = molecules.toExponential(2);
      const moles = molecules / this.AVOGADRO;
      const mass = (moles * compound.molarMass).toFixed(2);
      
      return {
        id: `mlms_${Date.now()}_${Math.random()}`,
        type: 'Molecules -> Mass',
        icon: '🎯',
        difficulty: 'Hard',
        color: '#1F2937',
        question: `Calculate the mass of ${moleculesFormatted} molecules of ${compound.name} (${compound.formula}).`,
        solution: [
          'Step 1: Calculate moles',
          'n = N / Nₐ',
          `n = ${moleculesFormatted} / 6.022 × 10²³`,
          `n = ${moles.toFixed(3)} moles`,
          '',
          'Step 2: Calculate mass',
          'mass = n × molar mass',
          `mass = ${moles.toFixed(3)} mol × ${compound.molarMass} g/mol`,
          `mass = ${mass} grams`
        ],
        answer: `${mass} g`,
        concept: 'Two-step conversion: molecules -> moles -> mass',
        hint: 'First find moles using Avogadro\'s number'
      };
    },
  
    // Question Type 7: Atoms in Compound
    generateAtomsInCompound() {
      const compound = this.random(this.getAllCompounds());
      const moles = this.randomNum(1, 5, 2);
      const element = this.random(Object.keys(compound.atoms));
      const atomsPerMolecule = compound.atoms[element];
      const totalAtoms = (moles * this.AVOGADRO * atomsPerMolecule).toExponential(2);
      
      return {
        id: `atm_${Date.now()}_${Math.random()}`,
        type: 'Atoms in Compound',
        icon: '🔮',
        difficulty: 'Hard',
        color: '#374151',
        question: `How many ${element} atoms are present in ${moles} moles of ${compound.name} (${compound.formula})?`,
        solution: [
          `Analysis of ${compound.formula}:`,
          `Each molecule contains ${atomsPerMolecule} ${element} atom${atomsPerMolecule > 1 ? 's' : ''}`,
          '',
          'Step 1: Calculate total molecules',
          `N = ${moles} mol × 6.022 × 10²³ molecules/mol`,
          `N = ${(moles * this.AVOGADRO).toExponential(2)} molecules`,
          '',
          'Step 2: Calculate atoms of ${element}',
          `Atoms = ${(moles * this.AVOGADRO).toExponential(2)} × ${atomsPerMolecule}`,
          `Atoms = ${totalAtoms} atoms`
        ],
        answer: `${totalAtoms} atoms`,
        concept: 'Multiply molecules by atoms per molecule',
        hint: `Each ${compound.formula} has ${atomsPerMolecule} ${element} atom${atomsPerMolecule > 1 ? 's' : ''}`
      };
    },
  
    // Question Type 8: Percent Composition
    generatePercentComposition() {
      const compound = this.random(this.getAllCompounds().filter(c => Object.keys(c.atoms).length > 1));
      const element = this.random(Object.keys(compound.atoms));
      
      const atomicMasses = {
        H: 1.008, C: 12.01, N: 14.01, O: 16.00, S: 32.07, 
        Cl: 35.45, Na: 22.99, K: 39.10, Ca: 40.08, Mg: 24.31,
        Al: 26.98, P: 30.97, Ag: 107.87, Ba: 137.33, Cu: 63.55,
        Mn: 54.94, F: 19.00
      };
      
      const elementMass = compound.atoms[element] * atomicMasses[element];
      const percentComposition = ((elementMass / compound.molarMass) * 100).toFixed(2);
      
      return {
        id: `pct_${Date.now()}_${Math.random()}`,
        type: 'Percent Composition',
        icon: '📊',
        difficulty: 'Medium',
        color: '#4B5563',
        question: `Calculate the percent composition by mass of ${element} in ${compound.name} (${compound.formula}).\n(Molar mass = ${compound.molarMass} g/mol)`,
        solution: [
          'Formula for percent composition:',
          '% = (mass of element / total molar mass) × 100',
          '',
          `${element} atoms in ${compound.formula}: ${compound.atoms[element]}`,
          `Atomic mass of ${element}: ${atomicMasses[element]} g/mol`,
          '',
          `Mass of ${element} = ${compound.atoms[element]} × ${atomicMasses[element]} = ${elementMass.toFixed(2)} g/mol`,
          '',
          `% ${element} = (${elementMass.toFixed(2)} / ${compound.molarMass}) × 100`,
          `% ${element} = ${percentComposition}%`
        ],
        answer: `${percentComposition}%`,
        concept: 'Percent composition = (element mass / total mass) × 100',
        hint: 'Find mass contribution of the element first'
      };
    },
  
    // Question Type 9: Empirical Formula Mass
    generateEmpiricalFormula() {
      const compound = this.random(this.getAllCompounds());
      const mass = this.randomNum(50, 500, 1);
      const moles = (mass / compound.molarMass).toFixed(3);
      
      return {
        id: `emp_${Date.now()}_${Math.random()}`,
        type: 'Molar Mass Problems',
        icon: '🧮',
        difficulty: 'Medium',
        color: '#6B7280',
        question: `A sample of ${compound.name} has a mass of ${mass} grams. If its molar mass is ${compound.molarMass} g/mol, how many moles are present?`,
        solution: [
          'Direct application of mole formula:',
          'n = mass / molar mass',
          '',
          `n = ${mass} g / ${compound.molarMass} g/mol`,
          `n = ${moles} moles`
        ],
        answer: `${moles} moles`,
        concept: 'Basic stoichiometry: n = m/M',
        hint: 'This is a straightforward mole calculation'
      };
    },
  
    // Question Type 10: Molar Volume (for gases)
    generateMolarVolume() {
      const gasCompounds = [
        ...this.compounds.simple.filter(c => c.name.includes('gas')),
        { name: 'carbon dioxide', formula: 'CO₂', molarMass: 44.01 },
        { name: 'sulfur dioxide', formula: 'SO₂', molarMass: 64.06 }
      ];
      
      const compound = this.random(gasCompounds);
      const moles = this.randomNum(1, 10, 2);
      const volume = (moles * 22.4).toFixed(2);
      
      return {
        id: `vol_${Date.now()}_${Math.random()}`,
        type: 'Molar Volume',
        icon: '🌫️',
        difficulty: 'Medium',
        color: '#111827',
        question: `Calculate the volume occupied by ${moles} moles of ${compound.name} at STP.\n(Molar volume at STP = 22.4 L/mol)`,
        solution: [
          'At STP, 1 mole of any gas = 22.4 L',
          '',
          'Volume = moles × molar volume',
          `V = ${moles} mol × 22.4 L/mol`,
          `V = ${volume} liters`
        ],
        answer: `${volume} L`,
        concept: 'Molar Volume: 1 mole gas = 22.4 L at STP',
        hint: 'STP means Standard Temperature and Pressure'
      };
    },
  
    // Master function to generate all questions
    generateQuestionSet(count = 50) {
      const generators = [
        this.generateMassToMoles,
        this.generateMolesToMass,
        this.generateMoleculesToMoles,
        this.generateMolesToMolecules,
        this.generateMassToMolecules,
        this.generateMoleculesToMass,
        this.generateAtomsInCompound,
        this.generatePercentComposition,
        this.generateEmpiricalFormula,
        this.generateMolarVolume
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
  
  export default MassMoleQuestionGenerator;