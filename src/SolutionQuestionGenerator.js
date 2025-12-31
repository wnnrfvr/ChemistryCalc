// SolutionQuestionGenerator.js - Solution Chemistry Question Generation Engine

const SolutionQuestionGenerator = {
    // Utility Functions
    random: (arr) => arr[Math.floor(Math.random() * arr.length)],
    
    randomNum: (min, max, decimals = 0) => {
      const num = Math.random() * (max - min) + min;
      return decimals > 0 ? parseFloat(num.toFixed(decimals)) : Math.floor(num);
    },
  
    // Constants
    R_GAS_CONSTANT: 0.0821, // L·atm/(mol·K)
    
    // Data Banks
    compounds: {
      salts: [
        { name: 'NaCl', formula: 'NaCl', molarMass: 58.44, dissociation: 2 },
        { name: 'KCl', formula: 'KCl', molarMass: 74.55, dissociation: 2 },
        { name: 'CaCl₂', formula: 'CaCl₂', molarMass: 110.98, dissociation: 3 },
        { name: 'KNO₃', formula: 'KNO₃', molarMass: 101.10, dissociation: 2 },
        { name: 'Na₂SO₄', formula: 'Na₂SO₄', molarMass: 142.04, dissociation: 3 },
        { name: 'MgSO₄', formula: 'MgSO₄', molarMass: 120.37, dissociation: 2 },
        { name: 'NH₄Cl', formula: 'NH₄Cl', molarMass: 53.49, dissociation: 2 }
      ],
      acids: [
        { name: 'HCl', formula: 'HCl', molarMass: 36.46, pKa: -7 },
        { name: 'H₂SO₄', formula: 'H₂SO₄', molarMass: 98.08, pKa: -3 },
        { name: 'HNO₃', formula: 'HNO₃', molarMass: 63.01, pKa: -1.4 },
        { name: 'CH₃COOH', formula: 'CH₃COOH', molarMass: 60.05, pKa: 4.76 },
        { name: 'HCOOH', formula: 'HCOOH', molarMass: 46.03, pKa: 3.75 },
        { name: 'HBr', formula: 'HBr', molarMass: 80.91, pKa: -9 }
      ],
      bases: [
        { name: 'NaOH', formula: 'NaOH', molarMass: 40.00 },
        { name: 'KOH', formula: 'KOH', molarMass: 56.11 },
        { name: 'Ca(OH)₂', formula: 'Ca(OH)₂', molarMass: 74.09 },
        { name: 'NH₃', formula: 'NH₃', molarMass: 17.03, pKb: 4.75 }
      ],
      organics: [
        { name: 'glucose', formula: 'C₆H₁₂O₆', molarMass: 180.16 },
        { name: 'sucrose', formula: 'C₁₂H₂₂O₁₁', molarMass: 342.30 },
        { name: 'ethanol', formula: 'C₂H₆O', molarMass: 46.07 },
        { name: 'urea', formula: 'CH₄N₂O', molarMass: 60.06 }
      ]
    },
  
    // Question Type 1: Molarity Calculation from Mass
    generateMolarityFromMass() {
      const compound = this.random([...this.compounds.salts, ...this.compounds.organics]);
      const mass = this.randomNum(5, 50, 1);
      const volumeML = this.randomNum(100, 1000, 0);
      const volumeL = (volumeML / 1000).toFixed(3);
      
      const moles = (mass / compound.molarMass).toFixed(4);
      const molarity = (moles / volumeL).toFixed(3);
      
      return {
        id: `mol_${Date.now()}_${Math.random()}`,
        type: 'Molarity',
        icon: '🧪',
        difficulty: 'Easy',
        color: '#06B6D4',
        question: `A solution is prepared by dissolving ${mass} g of ${compound.name} (${compound.formula}) in enough water to make ${volumeML} mL of solution. Calculate the molarity of the solution.`,
        solution: [
          'Step 1: Calculate moles of solute',
          'n = mass / molar mass',
          `n = ${mass} g / ${compound.molarMass} g/mol`,
          `n = ${moles} mol`,
          '',
          'Step 2: Convert volume to liters',
          `V = ${volumeML} mL × (1 L / 1000 mL) = ${volumeL} L`,
          '',
          'Step 3: Calculate molarity',
          'M = n / V',
          `M = ${moles} mol / ${volumeL} L`,
          `M = ${molarity} M`
        ],
        answer: `${molarity} M`,
        concept: 'Molarity = moles of solute / liters of solution',
        hint: 'Convert mL to L by dividing by 1000'
      };
    },
  
    // Question Type 2: Dilution Problems
    generateDilution() {
      const compound = this.random(this.compounds.acids);
      const M1 = this.randomNum(2, 18, 1);
      const V1 = this.randomNum(10, 100, 1);
      const V2 = this.randomNum(V1 + 50, 1000, 0);
      
      const M2 = ((M1 * V1) / V2).toFixed(3);
      
      return {
        id: `dil_${Date.now()}_${Math.random()}`,
        type: 'Dilution',
        icon: '💧',
        difficulty: 'Easy',
        color: '#3B82F6',
        question: `${V1} mL of a ${M1} M solution of ${compound.name} is diluted to a final volume of ${V2} mL. Calculate the molarity of the diluted solution.`,
        solution: [
          'Use the dilution equation: M₁V₁ = M₂V₂',
          'where:',
          '  M₁ = initial molarity',
          '  V₁ = initial volume',
          '  M₂ = final molarity',
          '  V₂ = final volume',
          '',
          'Rearrange to solve for M₂:',
          'M₂ = (M₁ × V₁) / V₂',
          `M₂ = (${M1} M × ${V1} mL) / ${V2} mL`,
          `M₂ = ${M2} M`
        ],
        answer: `${M2} M`,
        concept: 'Dilution: M₁V₁ = M₂V₂',
        hint: 'Volumes must be in the same units (both mL or both L)'
      };
    },
  
    // Question Type 3: Mass from Molarity
    generateMassFromMolarity() {
      const compound = this.random([...this.compounds.salts, ...this.compounds.bases]);
      const molarity = this.randomNum(0.1, 2.0, 2);
      const volumeML = this.randomNum(100, 1000, 0);
      const volumeL = (volumeML / 1000).toFixed(3);
      
      const moles = (molarity * volumeL).toFixed(4);
      const mass = (moles * compound.molarMass).toFixed(2);
      
      return {
        id: `mass_${Date.now()}_${Math.random()}`,
        type: 'Mass Calculation',
        icon: '⚖️',
        difficulty: 'Easy',
        color: '#8B5CF6',
        question: `Calculate the mass of ${compound.name} (${compound.formula}) needed to prepare ${volumeML} mL of a ${molarity} M solution.\n(Molar mass = ${compound.molarMass} g/mol)`,
        solution: [
          'Step 1: Convert volume to liters',
          `V = ${volumeML} mL / 1000 = ${volumeL} L`,
          '',
          'Step 2: Calculate moles needed',
          'n = M × V',
          `n = ${molarity} M × ${volumeL} L`,
          `n = ${moles} mol`,
          '',
          'Step 3: Calculate mass',
          'mass = n × molar mass',
          `mass = ${moles} mol × ${compound.molarMass} g/mol`,
          `mass = ${mass} g`
        ],
        answer: `${mass} g`,
        concept: 'Molarity relates moles, volume, and mass',
        hint: 'M = n/V, so n = M × V, then mass = n × molar mass'
      };
    },
  
    // Question Type 4: Titration
    generateTitration() {
      const acid = this.random(this.compounds.acids);
      const base = this.random(this.compounds.bases);
      const Vacid = this.randomNum(10, 50, 1);
      const Mbase = this.randomNum(0.1, 1.0, 3);
      const Vbase = this.randomNum(15, 60, 1);
      
      const molesBase = (Mbase * Vbase / 1000).toFixed(5);
      const Macid = ((molesBase * 1000) / Vacid).toFixed(3);
      
      return {
        id: `tit_${Date.now()}_${Math.random()}`,
        type: 'Titration',
        icon: '🔬',
        difficulty: 'Medium',
        color: '#EC4899',
        question: `A ${Vacid} mL sample of ${acid.name} is titrated with a ${Mbase} M solution of ${base.name}. The endpoint is reached when ${Vbase} mL of ${base.name} solution is added. Calculate the concentration of the ${acid.name} solution.`,
        solution: [
          'Balanced equation: Acid + Base → Salt + Water',
          `${acid.formula} + ${base.formula} → Salt + H₂O`,
          '',
          'At equivalence point: n(acid) = n(base)',
          '',
          'Step 1: Calculate moles of base',
          'n(base) = M × V (in L)',
          `n(base) = ${Mbase} M × ${Vbase / 1000} L`,
          `n(base) = ${molesBase} mol`,
          '',
          'Step 2: Calculate molarity of acid',
          'M(acid) = n(acid) / V(acid in L)',
          `M(acid) = ${molesBase} mol / ${Vacid / 1000} L`,
          `M(acid) = ${Macid} M`
        ],
        answer: `${Macid} M`,
        concept: 'Acid-Base Titration: n(acid) = n(base)',
        hint: 'At equivalence point, moles of acid = moles of base'
      };
    },
  
    // Question Type 5: Percent by Mass
    generatePercentByMass() {
      const compound = this.random(this.compounds.salts);
      const percentMass = this.randomNum(5, 30, 1);
      const totalMass = 100;
      const massSolute = percentMass;
      const massSolvent = totalMass - massSolute;
      
      const molesSolute = (massSolute / compound.molarMass).toFixed(4);
      const molesSolvent = (massSolvent / 18.02).toFixed(2); // water
      const moleFraction = (molesSolute / (parseFloat(molesSolute) + parseFloat(molesSolvent))).toFixed(4);
      
      return {
        id: `pct_${Date.now()}_${Math.random()}`,
        type: 'Concentration',
        icon: '📊',
        difficulty: 'Medium',
        color: '#F59E0B',
        question: `A solution contains ${percentMass}% by mass of ${compound.name} (${compound.formula}). Calculate the mole fraction of ${compound.name} in the solution.\n(Molar mass of ${compound.name} = ${compound.molarMass} g/mol)`,
        solution: [
          `In 100 g of solution:`,
          `Mass of ${compound.name} = ${massSolute} g`,
          `Mass of water = ${massSolvent} g`,
          '',
          'Step 1: Calculate moles of solute',
          `n(${compound.name}) = ${massSolute} g / ${compound.molarMass} g/mol`,
          `n(${compound.name}) = ${molesSolute} mol`,
          '',
          'Step 2: Calculate moles of water',
          `n(H₂O) = ${massSolvent} g / 18.02 g/mol`,
          `n(H₂O) = ${molesSolvent} mol`,
          '',
          'Step 3: Calculate mole fraction',
          'χ = n(solute) / [n(solute) + n(solvent)]',
          `χ = ${molesSolute} / (${molesSolute} + ${molesSolvent})`,
          `χ = ${moleFraction}`
        ],
        answer: `${moleFraction}`,
        concept: 'Mole Fraction: χ = n(component) / n(total)',
        hint: 'Mole fraction is dimensionless (no units)'
      };
    },
  
    // Question Type 6: Boiling Point Elevation
    generateBoilingPointElevation() {
      const compound = this.random([...this.compounds.salts, ...this.compounds.organics]);
      const molality = this.randomNum(0.1, 2.0, 2);
      const Kb = 0.512; // for water
      const i = compound.dissociation || 1; // van't Hoff factor
      
      const deltaT = (Kb * molality * i).toFixed(3);
      const newBP = (100 + parseFloat(deltaT)).toFixed(3);
      
      return {
        id: `bpe_${Date.now()}_${Math.random()}`,
        type: 'Colligative Properties',
        icon: '🌡️',
        difficulty: 'Medium',
        color: '#EF4444',
        question: `Calculate the boiling point elevation of a ${molality} m (molal) solution of ${compound.name} in water.\n(Kb for water = 0.512 °C/m${compound.dissociation ? ', i = ' + compound.dissociation : ''})`,
        solution: [
          'Boiling point elevation formula:',
          'ΔTb = i × Kb × m',
          'where:',
          '  i = van\'t Hoff factor',
          '  Kb = molal boiling point elevation constant',
          '  m = molality',
          '',
          'Calculate ΔTb:',
          `ΔTb = ${i} × ${Kb} °C/m × ${molality} m`,
          `ΔTb = ${deltaT} °C`,
          '',
          'New boiling point:',
          `BP = 100.000 °C + ${deltaT} °C`,
          `BP = ${newBP} °C`
        ],
        answer: `ΔTb = ${deltaT} °C, BP = ${newBP} °C`,
        concept: 'Boiling Point Elevation: ΔTb = i × Kb × m',
        hint: 'Ionic compounds dissociate, so i > 1'
      };
    },
  
    // Question Type 7: Freezing Point Depression
    generateFreezingPointDepression() {
      const compound = this.random([...this.compounds.salts, ...this.compounds.organics]);
      const molality = this.randomNum(0.5, 3.0, 2);
      const Kf = 1.86; // for water
      const i = compound.dissociation || 1;
      
      const deltaT = (Kf * molality * i).toFixed(3);
      const newFP = (0 - parseFloat(deltaT)).toFixed(3);
      
      return {
        id: `fpd_${Date.now()}_${Math.random()}`,
        type: 'Colligative Properties',
        icon: '❄️',
        difficulty: 'Medium',
        color: '#06B6D4',
        question: `Calculate the freezing point depression of a ${molality} m solution of ${compound.name} in water.\n(Kf for water = 1.86 °C/m${compound.dissociation ? ', i = ' + compound.dissociation : ''})`,
        solution: [
          'Freezing point depression formula:',
          'ΔTf = i × Kf × m',
          'where:',
          '  i = van\'t Hoff factor',
          '  Kf = molal freezing point depression constant',
          '  m = molality',
          '',
          'Calculate ΔTf:',
          `ΔTf = ${i} × ${Kf} °C/m × ${molality} m`,
          `ΔTf = ${deltaT} °C`,
          '',
          'New freezing point:',
          `FP = 0.000 °C - ${deltaT} °C`,
          `FP = ${newFP} °C`
        ],
        answer: `ΔTf = ${deltaT} °C, FP = ${newFP} °C`,
        concept: 'Freezing Point Depression: ΔTf = i × Kf × m',
        hint: 'The freezing point decreases (becomes more negative)'
      };
    },
  
    // Question Type 8: Osmotic Pressure
    generateOsmoticPressure() {
      const compound = this.random(this.compounds.organics);
      const moles = this.randomNum(0.1, 2.0, 2);
      const volumeL = this.randomNum(0.5, 3.0, 1);
      const tempC = this.randomNum(20, 30, 0);
      const tempK = tempC + 273.15;
      
      const molarity = (moles / volumeL).toFixed(3);
      const osmotic = (molarity * this.R_GAS_CONSTANT * tempK).toFixed(2);
      
      return {
        id: `osp_${Date.now()}_${Math.random()}`,
        type: 'Osmotic Pressure',
        icon: '🔄',
        difficulty: 'Hard',
        color: '#8B5CF6',
        question: `Calculate the osmotic pressure of a solution at ${tempC}°C, created by dissolving ${moles} moles of ${compound.name} (${compound.formula}) in ${volumeL} liters of water.\n(R = 0.0821 L·atm/(mol·K))`,
        solution: [
          'Osmotic pressure formula:',
          'Π = MRT',
          'where:',
          '  Π = osmotic pressure (atm)',
          '  M = molarity (mol/L)',
          '  R = gas constant',
          '  T = temperature (K)',
          '',
          'Step 1: Calculate molarity',
          `M = ${moles} mol / ${volumeL} L = ${molarity} M`,
          '',
          'Step 2: Convert temperature to Kelvin',
          `T = ${tempC} + 273.15 = ${tempK} K`,
          '',
          'Step 3: Calculate osmotic pressure',
          `Π = ${molarity} M × ${this.R_GAS_CONSTANT} L·atm/(mol·K) × ${tempK} K`,
          `Π = ${osmotic} atm`
        ],
        answer: `${osmotic} atm`,
        concept: 'Osmotic Pressure: Π = MRT',
        hint: 'Remember to convert temperature to Kelvin!'
      };
    },
  
    // Question Type 9: Molality Calculation
    generateMolality() {
      const compound = this.random(this.compounds.salts);
      const massSolute = this.randomNum(10, 100, 1);
      const massSolvent = this.randomNum(200, 1000, 0);
      
      const moles = (massSolute / compound.molarMass).toFixed(4);
      const kgSolvent = (massSolvent / 1000).toFixed(3);
      const molality = (moles / kgSolvent).toFixed(3);
      
      return {
        id: `mlt_${Date.now()}_${Math.random()}`,
        type: 'Molality',
        icon: '⚗️',
        difficulty: 'Easy',
        color: '#10B981',
        question: `Calculate the molality of a solution prepared by dissolving ${massSolute} g of ${compound.name} (${compound.formula}) in ${massSolvent} g of water.\n(Molar mass = ${compound.molarMass} g/mol)`,
        solution: [
          'Molality formula: m = n(solute) / kg(solvent)',
          '',
          'Step 1: Calculate moles of solute',
          `n = ${massSolute} g / ${compound.molarMass} g/mol`,
          `n = ${moles} mol`,
          '',
          'Step 2: Convert mass of solvent to kg',
          `mass = ${massSolvent} g / 1000 = ${kgSolvent} kg`,
          '',
          'Step 3: Calculate molality',
          `m = ${moles} mol / ${kgSolvent} kg`,
          `m = ${molality} m`
        ],
        answer: `${molality} m`,
        concept: 'Molality: m = moles solute / kg solvent',
        hint: 'Molality uses kg of solvent, not total solution'
      };
    },
  
    // Question Type 10: Buffer pH (Henderson-Hasselbalch)
    generateBufferpH() {
      const weakAcids = this.compounds.acids.filter(a => a.pKa > 0);
      const acid = this.random(weakAcids);
      const Vacid = this.randomNum(50, 150, 0);
      const Macid = this.randomNum(0.1, 0.5, 2);
      const Vbase = this.randomNum(30, 100, 0);
      const Mbase = this.randomNum(0.1, 0.5, 2);
      
      const molesAcid = ((Macid * Vacid) / 1000).toFixed(5);
      const molesBase = ((Mbase * Vbase) / 1000).toFixed(5);
      const totalVolume = ((Vacid + Vbase) / 1000).toFixed(4);
      const concAcid = (molesAcid / totalVolume).toFixed(4);
      const concBase = (molesBase / totalVolume).toFixed(4);
      const pH = (acid.pKa + Math.log10(concBase / concAcid)).toFixed(2);
      
      return {
        id: `buf_${Date.now()}_${Math.random()}`,
        type: 'Buffer Solutions',
        icon: '🧬',
        difficulty: 'Hard',
        color: '#EC4899',
        question: `A buffer solution is created by mixing ${Vacid} mL of ${Macid} M ${acid.name} with ${Vbase} mL of ${Mbase} M sodium salt solution. Calculate the pH of the buffer.\n(pKa for ${acid.name} = ${acid.pKa})`,
        solution: [
          'Use Henderson-Hasselbalch equation:',
          'pH = pKa + log([A⁻]/[HA])',
          '',
          'Step 1: Calculate moles',
          `n(acid) = ${Macid} M × ${Vacid / 1000} L = ${molesAcid} mol`,
          `n(base) = ${Mbase} M × ${Vbase / 1000} L = ${molesBase} mol`,
          '',
          'Step 2: Calculate concentrations',
          `Total volume = ${totalVolume} L`,
          `[HA] = ${molesAcid} mol / ${totalVolume} L = ${concAcid} M`,
          `[A⁻] = ${molesBase} mol / ${totalVolume} L = ${concBase} M`,
          '',
          'Step 3: Calculate pH',
          `pH = ${acid.pKa} + log(${concBase}/${concAcid})`,
          `pH = ${pH}`
        ],
        answer: `pH = ${pH}`,
        concept: 'Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA])',
        hint: 'Buffer resists pH change when acid or base is added'
      };
    },
  
    // Question Type 11: Vapor Pressure Lowering (Raoult's Law)
    generateVaporPressure() {
      const compound = this.random(this.compounds.organics);
      const percentMass = this.randomNum(10, 40, 1);
      const P0 = 23.76; // vapor pressure of water at 25°C in mmHg
      
      const massSolute = percentMass;
      const massSolvent = 100 - percentMass;
      
      const molesSolute = (massSolute / compound.molarMass).toFixed(4);
      const molesSolvent = (massSolvent / 18.02).toFixed(3);
      const moleFraction = (molesSolute / (parseFloat(molesSolute) + parseFloat(molesSolvent))).toFixed(5);
      const deltaP = (moleFraction * P0).toFixed(2);
      const Psolution = (P0 - deltaP).toFixed(2);
      
      return {
        id: `vap_${Date.now()}_${Math.random()}`,
        type: 'Vapor Pressure',
        icon: '☁️',
        difficulty: 'Hard',
        color: '#06B6D4',
        question: `A solution contains ${percentMass}% by mass of ${compound.name}. Calculate the vapor pressure of the solution at 25°C.\n(Vapor pressure of pure water at 25°C = 23.76 mmHg)\n(Molar mass of ${compound.name} = ${compound.molarMass} g/mol)`,
        solution: [
          'Raoult\'s Law: ΔP = χ(solute) × P°(solvent)',
          '',
          'Step 1: Calculate moles (in 100 g solution)',
          `n(${compound.name}) = ${massSolute} g / ${compound.molarMass} g/mol = ${molesSolute} mol`,
          `n(H₂O) = ${massSolvent} g / 18.02 g/mol = ${molesSolvent} mol`,
          '',
          'Step 2: Calculate mole fraction of solute',
          `χ = ${molesSolute} / (${molesSolute} + ${molesSolvent})`,
          `χ = ${moleFraction}`,
          '',
          'Step 3: Calculate vapor pressure lowering',
          `ΔP = ${moleFraction} × ${P0} mmHg = ${deltaP} mmHg`,
          '',
          'Step 4: Calculate solution vapor pressure',
          `P(solution) = ${P0} - ${deltaP} = ${Psolution} mmHg`
        ],
        answer: `${Psolution} mmHg`,
        concept: 'Raoult\'s Law: P = χ(solvent) × P°(solvent)',
        hint: 'Non-volatile solutes lower vapor pressure'
      };
    },
  
    // Question Type 12: Precipitate Mass Calculation
    generatePrecipitate() {
      const precipitates = [
        { reactant1: 'AgNO₃', reactant2: 'NaCl', product: 'AgCl', productMass: 143.32 },
        { reactant1: 'BaCl₂', reactant2: 'Na₂SO₄', product: 'BaSO₄', productMass: 233.39 },
        { reactant1: 'Pb(NO₃)₂', reactant2: 'KI', product: 'PbI₂', productMass: 461.01 }
      ];
      
      const rxn = this.random(precipitates);
      const V1 = this.randomNum(50, 200, 0);
      const M1 = this.randomNum(0.1, 0.5, 2);
      const V2 = this.randomNum(50, 200, 0);
      const M2 = this.randomNum(0.1, 0.5, 2);
      
      const moles1 = ((M1 * V1) / 1000).toFixed(5);
      const moles2 = ((M2 * V2) / 1000).toFixed(5);
      const limitingMoles = Math.min(parseFloat(moles1), parseFloat(moles2));
      const mass = (limitingMoles * rxn.productMass).toFixed(3);
      
      return {
        id: `ppt_${Date.now()}_${Math.random()}`,
        type: 'Precipitation',
        icon: '💎',
        difficulty: 'Hard',
        color: '#F59E0B',
        question: `${V1} mL of ${M1} M ${rxn.reactant1} is mixed with ${V2} mL of ${M2} M ${rxn.reactant2}. Calculate the mass of ${rxn.product} precipitate formed.\n(Molar mass of ${rxn.product} = ${rxn.productMass} g/mol)`,
        solution: [
          'Step 1: Calculate moles of each reactant',
          `n(${rxn.reactant1}) = ${M1} M × ${V1 / 1000} L = ${moles1} mol`,
          `n(${rxn.reactant2}) = ${M2} M × ${V2 / 1000} L = ${moles2} mol`,
          '',
          'Step 2: Determine limiting reactant',
          `Limiting moles = ${limitingMoles.toFixed(5)} mol`,
          '',
          'Step 3: Calculate mass of precipitate',
          `mass = n × molar mass`,
          `mass = ${limitingMoles.toFixed(5)} mol × ${rxn.productMass} g/mol`,
          `mass = ${mass} g`
        ],
        answer: `${mass} g`,
        concept: 'Precipitation: Limited by reactant with fewer moles',
        hint: 'Use the limiting reactant to calculate product'
      };
    },
  
    // Question Type 13: Molarity to Molality Conversion
    generateMolarityToMolality() {
      const compound = this.random(this.compounds.salts);
      const molarity = this.randomNum(0.5, 3.0, 2);
      const density = this.randomNum(1.01, 1.15, 2);
      
      const massSolution = 1000 * density; // 1 L solution in grams
      const massSolute = (molarity * compound.molarMass).toFixed(2);
      const massSolvent = (massSolution - massSolute).toFixed(2);
      const kgSolvent = (massSolvent / 1000).toFixed(4);
      const molality = (molarity / kgSolvent).toFixed(3);
      
      return {
        id: `m2m_${Date.now()}_${Math.random()}`,
        type: 'Concentration Conversion',
        icon: '🔄',
        difficulty: 'Hard',
        color: '#8B5CF6',
        question: `A ${molarity} M solution of ${compound.name} has a density of ${density} g/mL. Calculate the molality of the solution.\n(Molar mass = ${compound.molarMass} g/mol)`,
        solution: [
          'Convert molarity to molality:',
          '',
          'Step 1: Calculate mass of 1 L solution',
          `mass(solution) = volume × density`,
          `mass(solution) = 1000 mL × ${density} g/mL = ${massSolution} g`,
          '',
          'Step 2: Calculate mass of solute',
          `mass(solute) = molarity × molar mass`,
          `mass(solute) = ${molarity} mol × ${compound.molarMass} g/mol = ${massSolute} g`,
          '',
          'Step 3: Calculate mass of solvent',
          `mass(solvent) = ${massSolution} - ${massSolute} = ${massSolvent} g`,
          `kg(solvent) = ${kgSolvent} kg`,
          '',
          'Step 4: Calculate molality',
          `m = ${molarity} mol / ${kgSolvent} kg = ${molality} m`
        ],
        answer: `${molality} m`,
        concept: 'Molality uses mass of solvent, molarity uses volume',
        hint: 'Need density to convert between M and m'
      };
    },
  
    // Question Type 14: Normality Calculation
    generateNormality() {
      const acid = this.random(this.compounds.acids);
      const molarity = this.randomNum(0.5, 3.0, 2);
      const equivalents = acid.formula.includes('H₂') ? 2 : 1;
      const normality = (molarity * equivalents).toFixed(2);
      
      return {
        id: `nrm_${Date.now()}_${Math.random()}`,
        type: 'Normality',
        icon: '⚡',
        difficulty: 'Medium',
        color: '#EF4444',
        question: `Calculate the normality of a ${molarity} M solution of ${acid.name} (${acid.formula}).\n(Number of equivalents = ${equivalents})`,
        solution: [
          'Normality formula:',
          'N = M × n (equivalents)',
          '',
          `For ${acid.name}:`,
          `Number of equivalents = ${equivalents}`,
          '',
          'Calculate normality:',
          `N = ${molarity} M × ${equivalents}`,
          `N = ${normality} N`
        ],
        answer: `${normality} N`,
        concept: 'Normality: N = Molarity × equivalents',
        hint: 'Equivalents = number of H⁺ or OH⁻ per molecule'
      };
    },
  
    // Question Type 15: Concentration from pH
    generateConcentrationFromPH() {
      const pH = this.randomNum(1, 4, 2);
      const H_concentration = Math.pow(10, -pH);
      const molarity = H_concentration.toExponential(2);
      
      return {
        id: `ph_${Date.now()}_${Math.random()}`,
        type: 'pH & Concentration',
        icon: '🎯',
        difficulty: 'Medium',
        color: '#10B981',
        question: `A solution of HCl has a pH of ${pH}. Calculate the molarity of the HCl solution.`,
        solution: [
          'Relationship between pH and [H⁺]:',
          'pH = -log[H⁺]',
          '',
          'Rearrange to solve for [H⁺]:',
          '[H⁺] = 10^(-pH)',
          `[H⁺] = 10^(-${pH})`,
          `[H⁺] = ${molarity} M`,
          '',
          'For strong acid HCl: [HCl] = [H⁺]',
          `[HCl] = ${molarity} M`
        ],
        answer: `${molarity} M`,
        concept: 'pH = -log[H⁺], so [H⁺] = 10^(-pH)',
        hint: 'Strong acids completely dissociate'
      };
    },
  
    // Master function to generate all questions
    generateQuestionSet(count = 50) {
      const generators = [
        this.generateMolarityFromMass,
        this.generateDilution,
        this.generateMassFromMolarity,
        this.generateTitration,
        this.generatePercentByMass,
        this.generateBoilingPointElevation,
        this.generateFreezingPointDepression,
        this.generateOsmoticPressure,
        this.generateMolality,
        this.generateBufferpH,
        this.generateVaporPressure,
        this.generatePrecipitate,
        this.generateMolarityToMolality,
        this.generateNormality,
        this.generateConcentrationFromPH
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
  
  export default SolutionQuestionGenerator;