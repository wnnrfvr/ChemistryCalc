// QuestionGenerator.js - Modular Question Generation Engine for Thermochemistry

const QuestionGenerator = {
    // Utility Functions
    random: (arr) => arr[Math.floor(Math.random() * arr.length)],
    
    randomNum: (min, max, decimals = 0) => {
      const num = Math.random() * (max - min) + min;
      return decimals > 0 ? parseFloat(num.toFixed(decimals)) : Math.floor(num);
    },
  
    // Constants
    R_GAS_CONSTANT: 8.314, // J/(mol·K)
    ATM_TO_J: 101.325, // J/L·atm
    
    // Data Banks
    reactions: {
      combustion: [
        { reactants: 'CH₄(g) + 2O₂(g)', products: 'CO₂(g) + 2H₂O(g)', name: 'methane combustion' },
        { reactants: 'C₂H₆(g) + 3.5O₂(g)', products: '2CO₂(g) + 3H₂O(g)', name: 'ethane combustion' },
        { reactants: 'C₃H₈(g) + 5O₂(g)', products: '3CO₂(g) + 4H₂O(g)', name: 'propane combustion' },
        { reactants: 'C₂H₅OH(l) + 3O₂(g)', products: '2CO₂(g) + 3H₂O(l)', name: 'ethanol combustion' }
      ],
      synthesis: [
        { reactants: 'H₂(g) + ½O₂(g)', products: 'H₂O(g)', name: 'water formation' },
        { reactants: 'N₂(g) + 3H₂(g)', products: '2NH₃(g)', name: 'ammonia synthesis' },
        { reactants: 'N₂(g) + O₂(g)', products: '2NO(g)', name: 'nitrogen oxide formation' },
        { reactants: '2SO₂(g) + O₂(g)', products: '2SO₃(g)', name: 'sulfur trioxide formation' },
        { reactants: 'CO(g) + 2H₂(g)', products: 'CH₃OH(g)', name: 'methanol synthesis' }
      ],
      equilibrium: [
        { eq: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)', name: 'Haber process' },
        { eq: 'H₂(g) + I₂(g) ⇌ 2HI(g)', name: 'hydrogen iodide equilibrium' },
        { eq: 'CO(g) + 3H₂(g) ⇌ CH₄(g) + H₂O(g)', name: 'methanation reaction' },
        { eq: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', name: 'phosphorus pentachloride decomposition' },
        { eq: '2NO₂(g) ⇌ N₂O₄(g)', name: 'nitrogen dioxide dimerization' }
      ]
    },
    
    materials: {
      metals: [
        { name: 'aluminum', c: 0.897 },
        { name: 'copper', c: 0.385 },
        { name: 'iron', c: 0.449 },
        { name: 'silver', c: 0.235 },
        { name: 'brass', c: 0.380 },
        { name: 'zinc', c: 0.388 },
        { name: 'lead', c: 0.128 },
        { name: 'nickel', c: 0.444 }
      ],
      liquids: [
        { name: 'water', c: 4.18 },
        { name: 'ethanol', c: 2.44 },
        { name: 'oil', c: 2.1 },
        { name: 'glycerin', c: 2.43 },
        { name: 'acetone', c: 2.15 },
        { name: 'benzene', c: 1.74 }
      ]
    },
  
    // Question Type 1: Internal Energy Change (ΔU)
    generateInternalEnergy() {
      const allReactions = [...this.reactions.combustion, ...this.reactions.synthesis];
      const reaction = this.random(allReactions);
      const deltaH = -this.randomNum(150, 500, 1);
      const temp = this.randomNum(273, 400);
      const deltaS = -this.randomNum(10, 40, 1);
      
      const deltaU = (deltaH - (temp * deltaS / 1000)).toFixed(1);
      
      return {
        id: `iu_${Date.now()}_${Math.random()}`,
        type: 'Internal Energy',
        icon: '⚡',
        difficulty: 'Medium',
        color: '#8B5CF6',
        question: `Calculate the change in internal energy for the ${reaction.name}:\n\n${reaction.reactants} → ${reaction.products}\n\nΔH = ${deltaH} kJ/mol at ${temp} K\n(Assume ΔS = ${deltaS} J/mol·K)`,
        solution: [
          'Apply the First Law of Thermodynamics:',
          'ΔU = ΔH - TΔS (for processes involving gases)',
          `ΔU = ${deltaH} kJ/mol - (${temp} K)(${deltaS} J/mol·K × 10⁻³ kJ/J)`,
          `ΔU = ${deltaH} - ${(temp * deltaS / 1000).toFixed(1)} kJ/mol`,
          `ΔU = ${deltaU} kJ/mol`
        ],
        answer: `${deltaU} kJ/mol`,
        concept: 'First Law of Thermodynamics',
        hint: 'Remember to convert entropy units from J to kJ'
      };
    },
  
    // Question Type 2: Work Done by Gas (Isothermal)
    generateWorkDone() {
      const n = this.randomNum(1, 5);
      const Vi = this.randomNum(1, 10);
      const Vf = this.randomNum(Vi + 2, Vi + 15);
      const T = this.randomNum(273, 400);
      
      const work = -(n * this.R_GAS_CONSTANT * T * Math.log(Vf / Vi));
      
      return {
        id: `wd_${Date.now()}_${Math.random()}`,
        type: 'Work & Energy',
        icon: '📊',
        difficulty: 'Medium',
        color: '#10B981',
        question: `Calculate the work done when ${n} mole${n > 1 ? 's' : ''} of an ideal gas expands isothermally and reversibly from ${Vi} L to ${Vf} L at ${T} K.`,
        solution: [
          'For isothermal reversible expansion:',
          'w = -nRT ln(Vf/Vi)',
          `w = -(${n} mol)(${this.R_GAS_CONSTANT} J/mol·K)(${T} K) ln(${Vf}/${Vi})`,
          `w = -(${n})(${this.R_GAS_CONSTANT})(${T})(${Math.log(Vf / Vi).toFixed(4)})`,
          `w = ${work.toFixed(0)} J`,
          'Negative work indicates the system does work on surroundings'
        ],
        answer: `${work.toFixed(0)} J`,
        concept: 'Reversible Isothermal Expansion',
        hint: 'In isothermal processes, ΔU = 0, so q = -w'
      };
    },
  
    // Question Type 3: Work Against Constant Pressure
    generateWorkConstantPressure() {
      const P = this.randomNum(1, 5, 1);
      const Vi = this.randomNum(2, 10);
      const Vf = this.randomNum(Vi + 3, Vi + 15);
      
      const work = -(P * this.ATM_TO_J * (Vf - Vi));
      
      return {
        id: `wcp_${Date.now()}_${Math.random()}`,
        type: 'Work & Energy',
        icon: '🔧',
        difficulty: 'Easy',
        color: '#10B981',
        question: `A gas expands against a constant external pressure of ${P} atm from ${Vi} L to ${Vf} L. Calculate the work done by the gas.`,
        solution: [
          'For expansion against constant pressure:',
          'w = -Pext × ΔV',
          `w = -(${P} atm)(${this.ATM_TO_J} J/L·atm)(${Vf} - ${Vi}) L`,
          `w = -(${P})(${this.ATM_TO_J})(${Vf - Vi})`,
          `w = ${work.toFixed(0)} J`
        ],
        answer: `${work.toFixed(0)} J`,
        concept: 'Isobaric Process',
        hint: 'Work is negative when the system expands'
      };
    },
  
    // Question Type 4: Gibbs Free Energy
    generateGibbsEnergy() {
      const allReactions = [...this.reactions.combustion, ...this.reactions.synthesis];
      const reaction = this.random(allReactions);
      const deltaH = this.randomNum(-300, 250, 1);
      const deltaS = this.randomNum(-200, 200, 1);
      const T = this.randomNum(273, 450);
      
      const deltaG = (deltaH - (T * deltaS / 1000)).toFixed(1);
      const spontaneous = parseFloat(deltaG) < 0 ? 'spontaneous' : 'non-spontaneous';
      
      return {
        id: `ge_${Date.now()}_${Math.random()}`,
        type: 'Gibbs Energy',
        icon: '🔥',
        difficulty: 'Medium',
        color: '#EF4444',
        question: `Calculate ΔG° for the ${reaction.name} at ${T} K:\n\n${reaction.reactants} → ${reaction.products}\n\nGiven: ΔH° = ${deltaH} kJ/mol, ΔS° = ${deltaS} J/mol·K`,
        solution: [
          'Apply the Gibbs-Helmholtz equation:',
          'ΔG° = ΔH° - TΔS°',
          `ΔG° = ${deltaH} kJ/mol - (${T} K)(${deltaS} J/mol·K × 10⁻³ kJ/J)`,
          `ΔG° = ${deltaH} - ${(T * deltaS / 1000).toFixed(1)} kJ/mol`,
          `ΔG° = ${deltaG} kJ/mol`,
          '',
          `Since ΔG° ${parseFloat(deltaG) < 0 ? '<' : '>'} 0, the reaction is ${spontaneous} under standard conditions at ${T} K.`
        ],
        answer: `${deltaG} kJ/mol (${spontaneous})`,
        concept: 'Gibbs Free Energy & Spontaneity',
        hint: 'ΔG < 0 means spontaneous, ΔG > 0 means non-spontaneous'
      };
    },
  
    // Question Type 5: Heat Transfer & Calorimetry
    generateHeatTransfer() {
      const metal = this.random(this.materials.metals);
      const liquid = this.random(this.materials.liquids);
      
      const m1 = this.randomNum(50, 250);
      const T1 = this.randomNum(70, 120);
      const m2 = this.randomNum(100, 400);
      const T2 = this.randomNum(10, 35);
      
      const Tf = ((m1 * metal.c * T1 + m2 * liquid.c * T2) / (m1 * metal.c + m2 * liquid.c)).toFixed(1);
      
      return {
        id: `ht_${Date.now()}_${Math.random()}`,
        type: 'Calorimetry',
        icon: '💧',
        difficulty: 'Easy',
        color: '#3B82F6',
        question: `${m1} g of ${metal.name} at ${T1}°C is placed in ${m2} g of ${liquid.name} at ${T2}°C. Calculate the final equilibrium temperature.\n\n(Specific heats: c_${metal.name} = ${metal.c} J/g°C, c_${liquid.name} = ${liquid.c} J/g°C)`,
        solution: [
          'At thermal equilibrium: Q_lost = Q_gained',
          'Q_metal + Q_liquid = 0',
          'm₁c₁(Tf - T₁) + m₂c₂(Tf - T₂) = 0',
          '',
          'Solving for Tf:',
          `Tf = (m₁c₁T₁ + m₂c₂T₂) / (m₁c₁ + m₂c₂)`,
          `Tf = [(${m1})(${metal.c})(${T1}) + (${m2})(${liquid.c})(${T2})] / [(${m1})(${metal.c}) + (${m2})(${liquid.c})]`,
          `Tf = ${Tf}°C`
        ],
        answer: `${Tf}°C`,
        concept: 'Conservation of Energy & Thermal Equilibrium',
        hint: 'Heat lost by hot object equals heat gained by cold object'
      };
    },
  
    // Question Type 6: Entropy Change
    generateEntropy() {
      const n = this.randomNum(1, 4);
      const Vi = this.randomNum(5, 20);
      const Vf = this.randomNum(Vi + 5, Vi + 30);
      const T = this.randomNum(273, 400);
      
      const deltaS = (n * this.R_GAS_CONSTANT * Math.log(Vf / Vi)).toFixed(2);
      
      return {
        id: `ent_${Date.now()}_${Math.random()}`,
        type: 'Entropy',
        icon: '🌀',
        difficulty: 'Medium',
        color: '#8B5CF6',
        question: `Calculate the entropy change when ${n} mole${n > 1 ? 's' : ''} of an ideal gas expands isothermally and reversibly from ${Vi} L to ${Vf} L at ${T} K.`,
        solution: [
          'For isothermal reversible expansion of ideal gas:',
          'ΔS = nR ln(Vf/Vi)',
          `ΔS = (${n} mol)(${this.R_GAS_CONSTANT} J/mol·K) ln(${Vf}/${Vi})`,
          `ΔS = (${n})(${this.R_GAS_CONSTANT})(${Math.log(Vf / Vi).toFixed(4)})`,
          `ΔS = ${deltaS} J/K`,
          '',
          'The positive entropy change indicates increased molecular disorder.'
        ],
        answer: `${deltaS} J/K`,
        concept: 'Second Law of Thermodynamics',
        hint: 'Entropy increases when gas expands into larger volume'
      };
    },
  
    // Question Type 7: Equilibrium Constant from ΔG
    generateEquilibrium() {
      const reaction = this.random(this.reactions.equilibrium);
      const deltaG = this.randomNum(-60, 60, 1);
      const T = this.randomNum(273, 450);
      
      const K = Math.exp(-deltaG * 1000 / (this.R_GAS_CONSTANT * T));
      const Kformatted = K >= 1000 || K <= 0.001 ? K.toExponential(2) : K.toFixed(3);
      
      return {
        id: `eq_${Date.now()}_${Math.random()}`,
        type: 'Equilibrium',
        icon: '⚖️',
        difficulty: 'Hard',
        color: '#F59E0B',
        question: `Calculate the equilibrium constant K for the ${reaction.name} at ${T} K:\n\n${reaction.eq}\n\nGiven: ΔG° = ${deltaG} kJ/mol`,
        solution: [
          'Relationship between ΔG° and K:',
          'ΔG° = -RT ln(K)',
          'Rearranging: K = e^(-ΔG°/RT)',
          '',
          `K = exp[-(${deltaG} × 1000 J/mol) / (${this.R_GAS_CONSTANT} J/mol·K × ${T} K)]`,
          `K = exp(${(-deltaG * 1000 / (this.R_GAS_CONSTANT * T)).toFixed(2)})`,
          `K = ${Kformatted}`,
          '',
          K > 1 ? 'K > 1: Products are favored at equilibrium' : 'K < 1: Reactants are favored at equilibrium'
        ],
        answer: `K = ${Kformatted}`,
        concept: 'Chemical Equilibrium & Thermodynamics',
        hint: 'Negative ΔG° gives K > 1 (product-favored)'
      };
    },
  
    // Question Type 8: Heat of Vaporization
    generateHeatVaporization() {
      const substances = [
        { name: 'water', bp: 100, ΔHvap: 40.7 },
        { name: 'ethanol', bp: 78, ΔHvap: 38.6 },
        { name: 'methanol', bp: 65, ΔHvap: 35.2 },
        { name: 'acetone', bp: 56, ΔHvap: 29.1 }
      ];
      
      const substance = this.random(substances);
      const mass = this.randomNum(50, 200);
      const molarMass = substance.name === 'water' ? 18 : 
                        substance.name === 'ethanol' ? 46 : 
                        substance.name === 'methanol' ? 32 : 58;
      
      const moles = (mass / molarMass).toFixed(2);
      const heat = (moles * substance.ΔHvap).toFixed(1);
      
      return {
        id: `hv_${Date.now()}_${Math.random()}`,
        type: 'Phase Changes',
        icon: '☁️',
        difficulty: 'Medium',
        color: '#06B6D4',
        question: `Calculate the heat required to vaporize ${mass} g of ${substance.name} at its boiling point (${substance.bp}°C).\n\n(ΔHvap = ${substance.ΔHvap} kJ/mol, Molar mass = ${molarMass} g/mol)`,
        solution: [
          'Heat required for phase change:',
          'q = n × ΔHvap',
          '',
          'First, calculate moles:',
          `n = ${mass} g / ${molarMass} g/mol = ${moles} mol`,
          '',
          'Then calculate heat:',
          `q = (${moles} mol)(${substance.ΔHvap} kJ/mol)`,
          `q = ${heat} kJ`
        ],
        answer: `${heat} kJ`,
        concept: 'Enthalpy of Phase Transitions',
        hint: 'Temperature remains constant during phase change'
      };
    },
  
    // Question Type 9: Heat of Fusion
    generateHeatFusion() {
      const substance = this.random([
        { name: 'ice', mp: 0, ΔHfus: 6.01, molarMass: 18 },
        { name: 'iron', mp: 1538, ΔHfus: 13.8, molarMass: 56 },
        { name: 'aluminum', mp: 660, ΔHfus: 10.7, molarMass: 27 }
      ]);
      
      const mass = this.randomNum(100, 500);
      const moles = (mass / substance.molarMass).toFixed(2);
      const heat = (moles * substance.ΔHfus).toFixed(1);
      
      return {
        id: `hf_${Date.now()}_${Math.random()}`,
        type: 'Phase Changes',
        icon: '🧊',
        difficulty: 'Easy',
        color: '#06B6D4',
        question: `Calculate the heat required to melt ${mass} g of ${substance.name} at ${substance.mp}°C.\n\n(ΔHfus = ${substance.ΔHfus} kJ/mol, Molar mass = ${substance.molarMass} g/mol)`,
        solution: [
          'Heat required for melting:',
          'q = n × ΔHfus',
          '',
          `n = ${mass} g / ${substance.molarMass} g/mol = ${moles} mol`,
          `q = (${moles} mol)(${substance.ΔHfus} kJ/mol)`,
          `q = ${heat} kJ`
        ],
        answer: `${heat} kJ`,
        concept: 'Heat of Fusion',
        hint: 'Fusion = melting (solid → liquid)'
      };
    },
  
    // Question Type 10: Hess's Law
    generateHessLaw() {
      const reactions = [
        {
          target: 'C(s) + O₂(g) → CO₂(g)',
          given: [
            { eq: 'C(s) + ½O₂(g) → CO(g)', ΔH: -110.5 },
            { eq: 'CO(g) + ½O₂(g) → CO₂(g)', ΔH: -283.0 }
          ],
          answer: -393.5
        },
        {
          target: '2C(s) + 2H₂(g) → C₂H₄(g)',
          given: [
            { eq: 'C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(l)', ΔH: -1411 },
            { eq: 'C(s) + O₂(g) → CO₂(g)', ΔH: -393.5 },
            { eq: 'H₂(g) + ½O₂(g) → H₂O(l)', ΔH: -285.8 }
          ],
          answer: 52.3
        }
      ];
      
      const problem = this.random(reactions);
      
      return {
        id: `hl_${Date.now()}_${Math.random()}`,
        type: 'Hess\'s Law',
        icon: '📐',
        difficulty: 'Hard',
        color: '#EC4899',
        question: `Use Hess's Law to calculate ΔH for the reaction:\n\n${problem.target}\n\nGiven:\n${problem.given.map(r => `${r.eq}  ΔH = ${r.ΔH} kJ`).join('\n')}`,
        solution: [
          'Apply Hess\'s Law: ΔH is independent of pathway',
          'Manipulate given equations to match target reaction',
          '',
          ...problem.given.map((r, i) => `(${i + 1}) ${r.eq}  ΔH = ${r.ΔH} kJ`),
          '',
          'After manipulation and addition:',
          `ΔH = ${problem.answer} kJ`
        ],
        answer: `${problem.answer} kJ`,
        concept: 'Hess\'s Law of Heat Summation',
        hint: 'Reverse equations and multiply as needed to match target'
      };
    },
  
    // Question Type 11: Standard Enthalpy of Formation
    generateEnthalpyFormation() {
      const reactions = [
        { compound: 'NH₃(g)', elements: '½N₂(g) + (3/2)H₂(g)', ΔHf: -46.1 },
        { compound: 'CH₄(g)', elements: 'C(s) + 2H₂(g)', ΔHf: -74.8 },
        { compound: 'C₂H₅OH(l)', elements: '2C(s) + 3H₂(g) + ½O₂(g)', ΔHf: -277.7 },
        { compound: 'H₂O(l)', elements: 'H₂(g) + ½O₂(g)', ΔHf: -285.8 }
      ];
      
      const rxn = this.random(reactions);
      
      return {
        id: `ef_${Date.now()}_${Math.random()}`,
        type: 'Enthalpy Formation',
        icon: '⚗️',
        difficulty: 'Easy',
        color: '#8B5CF6',
        question: `The standard enthalpy of formation (ΔH°f) is defined as the enthalpy change when 1 mole of a compound is formed from its elements in their standard states.\n\nWhat is ΔH°f for the formation of ${rxn.compound} from:\n\n${rxn.elements} → ${rxn.compound}`,
        solution: [
          'Standard enthalpy of formation:',
          `${rxn.elements} → ${rxn.compound}`,
          '',
          `ΔH°f = ${rxn.ΔHf} kJ/mol`,
          '',
          'Note: Elements in standard states have ΔH°f = 0'
        ],
        answer: `${rxn.ΔHf} kJ/mol`,
        concept: 'Standard Enthalpy of Formation',
        hint: 'ΔH°f values are tabulated reference data'
      };
    },
  
    // Question Type 12: Temperature Change with Heat Addition
    generateTemperatureChange() {
      const liquid = this.random(this.materials.liquids);
      const mass = this.randomNum(100, 500);
      const Ti = this.randomNum(15, 30);
      const heat = this.randomNum(5000, 20000);
      
      const ΔT = (heat / (mass * liquid.c)).toFixed(1);
      const Tf = (parseFloat(Ti) + parseFloat(ΔT)).toFixed(1);
      
      return {
        id: `tc_${Date.now()}_${Math.random()}`,
        type: 'Calorimetry',
        icon: '🌡️',
        difficulty: 'Easy',
        color: '#3B82F6',
        question: `${mass} g of ${liquid.name} at ${Ti}°C absorbs ${heat} J of heat. Calculate the final temperature.\n\n(c = ${liquid.c} J/g°C)`,
        solution: [
          'Use the heat equation:',
          'q = mcΔT',
          '',
          'Solve for ΔT:',
          `ΔT = q / (mc) = ${heat} J / [(${mass} g)(${liquid.c} J/g°C)]`,
          `ΔT = ${ΔT}°C`,
          '',
          `Final temperature: Tf = Ti + ΔT = ${Ti} + ${ΔT} = ${Tf}°C`
        ],
        answer: `${Tf}°C`,
        concept: 'Specific Heat Capacity',
        hint: 'q = mcΔT relates heat to temperature change'
      };
    },
  
    // Question Type 13: Bomb Calorimetry
    generateBombCalorimetry() {
      const substances = [
        { name: 'glucose', formula: 'C₆H₁₂O₆', qcomb: 2800 },
        { name: 'sucrose', formula: 'C₁₂H₂₂O₁₁', qcomb: 5640 },
        { name: 'benzoic acid', formula: 'C₇H₆O₂', qcomb: 3220 }
      ];
      
      const substance = this.random(substances);
      const mass = this.randomNum(1, 5, 2);
      const Ccal = this.randomNum(8, 15, 1);
      
      const ΔT = ((mass * substance.qcomb) / Ccal).toFixed(2);
      
      return {
        id: `bc_${Date.now()}_${Math.random()}`,
        type: 'Calorimetry',
        icon: '💣',
        difficulty: 'Hard',
        color: '#3B82F6',
        question: `${mass} g of ${substance.name} (${substance.formula}) is combusted in a bomb calorimeter with heat capacity ${Ccal} kJ/°C. Calculate the temperature rise.\n\n(Heat of combustion = ${substance.qcomb} kJ/g)`,
        solution: [
          'In bomb calorimetry:',
          'qcomb = CcalΔT',
          '',
          `qcomb = (${mass} g)(${substance.qcomb} kJ/g) = ${(mass * substance.qcomb).toFixed(1)} kJ`,
          '',
          `ΔT = qcomb / Ccal = ${(mass * substance.qcomb).toFixed(1)} kJ / ${Ccal} kJ/°C`,
          `ΔT = ${ΔT}°C`
        ],
        answer: `${ΔT}°C`,
        concept: 'Bomb Calorimetry',
        hint: 'Heat released = calorimeter heat capacity × ΔT'
      };
    },
  
    // Question Type 14: Reaction Spontaneity at Different Temperatures
    generateSpontaneityTemperature() {
      const reactions = [
        { name: 'decomposition of calcium carbonate', ΔH: 178, ΔS: 160 },
        { name: 'melting of ice', ΔH: 6.01, ΔS: 22 },
        { name: 'Haber process', ΔH: -92.4, ΔS: -198.6 }
      ];
      
      const rxn = this.random(reactions);
      const T = this.randomNum(273, 500);
      const ΔG = (rxn.ΔH - T * rxn.ΔS / 1000).toFixed(1);
      const spontaneous = parseFloat(ΔG) < 0 ? 'spontaneous' : 'non-spontaneous';
      
      return {
        id: `st_${Date.now()}_${Math.random()}`,
        type: 'Spontaneity',
        icon: '🎯',
        difficulty: 'Medium',
        color: '#EF4444',
        question: `Determine if the ${rxn.name} is spontaneous at ${T} K.\n\nΔH° = ${rxn.ΔH} kJ/mol\nΔS° = ${rxn.ΔS} J/mol·K`,
        solution: [
          'Calculate ΔG° to determine spontaneity:',
          'ΔG° = ΔH° - TΔS°',
          '',
          `ΔG° = ${rxn.ΔH} kJ/mol - (${T} K)(${rxn.ΔS} J/mol·K × 10⁻³ kJ/J)`,
          `ΔG° = ${rxn.ΔH} - ${(T * rxn.ΔS / 1000).toFixed(1)} = ${ΔG} kJ/mol`,
          '',
          `Since ΔG° ${parseFloat(ΔG) < 0 ? '<' : '>'} 0, the reaction is ${spontaneous} at ${T} K.`
        ],
        answer: `${spontaneous} (ΔG° = ${ΔG} kJ/mol)`,
        concept: 'Temperature Dependence of Spontaneity',
        hint: 'Spontaneous when ΔG < 0'
      };
    },
  
    // Question Type 15: Rate Constant from Activation Energy
    generateActivationEnergy() {
      const Ea = this.randomNum(40, 120, 1);
      const T = this.randomNum(273, 400);
      const A = this.randomNum(1, 10) * Math.pow(10, this.randomNum(8, 13));
      
      const k = A * Math.exp(-Ea * 1000 / (this.R_GAS_CONSTANT * T));
      const kFormatted = k.toExponential(2);
      
      return {
        id: `ae_${Date.now()}_${Math.random()}`,
        type: 'Kinetics',
        icon: '⏱️',
        difficulty: 'Hard',
        color: '#F59E0B',
        question: `Calculate the rate constant k at ${T} K for a reaction with activation energy Ea = ${Ea} kJ/mol and pre-exponential factor A = ${A.toExponential(2)} s⁻¹.`,
        solution: [
          'Use the Arrhenius equation:',
          'k = A × e^(-Ea/RT)',
          '',
          `k = (${A.toExponential(2)} s⁻¹) × exp[-(${Ea} × 1000 J/mol) / (${this.R_GAS_CONSTANT} J/mol·K × ${T} K)]`,
          `k = (${A.toExponential(2)}) × exp(${(-Ea * 1000 / (this.R_GAS_CONSTANT * T)).toFixed(2)})`,
          `k = ${kFormatted} s⁻¹`
        ],
        answer: `${kFormatted} s⁻¹`,
        concept: 'Arrhenius Equation',
        hint: 'Higher temperature and lower Ea give larger k'
      };
    },
  
    // Master function to generate all questions
    generateQuestionSet(count = 50) {
      const generators = [
        this.generateInternalEnergy,
        this.generateWorkDone,
        this.generateWorkConstantPressure,
        this.generateGibbsEnergy,
        this.generateHeatTransfer,
        this.generateEntropy,
        this.generateEquilibrium,
        this.generateHeatVaporization,
        this.generateHeatFusion,
        this.generateHessLaw,
        this.generateEnthalpyFormation,
        this.generateTemperatureChange,
        this.generateBombCalorimetry,
        this.generateSpontaneityTemperature,
        this.generateActivationEnergy
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
  
  export default QuestionGenerator;