// ChemistryReference.js - Essential Chemistry Quick Reference
// A comprehensive reference card for students

export const CHEMISTRY_CONSTANTS = {
    avogadro: { value: '6.022 × 10²³', unit: 'mol⁻¹', name: "Avogadro's Number" },
    faraday: { value: '96,485', unit: 'C/mol', name: 'Faraday Constant' },
    gasConstant: { value: '8.314', unit: 'J/(mol·K)', name: 'Gas Constant (R)' },
    gasConstantAtm: { value: '0.0821', unit: 'L·atm/(mol·K)', name: 'R (atm)' },
    planck: { value: '6.626 × 10⁻³⁴', unit: 'J·s', name: 'Planck Constant' },
    speedOfLight: { value: '3.00 × 10⁸', unit: 'm/s', name: 'Speed of Light' },
    molarVolumeRTP: { value: '24.0', unit: 'L/mol', name: 'Molar Volume (RTP)' },
    molarVolumeSTP: { value: '22.4', unit: 'L/mol', name: 'Molar Volume (STP)' },
    waterKw: { value: '1.0 × 10⁻¹⁴', unit: '', name: 'Kw (25°C)' },
    absoluteZero: { value: '-273.15', unit: '°C', name: 'Absolute Zero' },
};

export const COMMON_FORMULAS = [
    {
        category: 'Stoichiometry', formulas: [
            { name: 'Moles', formula: 'n = m / M', description: 'moles = mass / molar mass' },
            { name: 'Mass', formula: 'm = n × M', description: 'mass = moles × molar mass' },
            { name: 'Particles', formula: 'N = n × Nₐ', description: 'particles = moles × Avogadro' },
        ]
    },
    {
        category: 'Gas Laws', formulas: [
            { name: 'Ideal Gas', formula: 'PV = nRT', description: 'Pressure × Volume = moles × R × Temp' },
            { name: "Boyle's", formula: 'P₁V₁ = P₂V₂', description: 'At constant temperature' },
            { name: "Charles's", formula: 'V₁/T₁ = V₂/T₂', description: 'At constant pressure' },
            { name: 'Combined', formula: 'P₁V₁/T₁ = P₂V₂/T₂', description: 'General gas law' },
        ]
    },
    {
        category: 'Solutions', formulas: [
            { name: 'Molarity', formula: 'M = n / V', description: 'Concentration in mol/L' },
            { name: 'Dilution', formula: 'M₁V₁ = M₂V₂', description: 'Conservation of moles' },
            { name: 'Mass %', formula: '% = (m_solute/m_total) × 100', description: 'Mass percentage' },
        ]
    },
    {
        category: 'Acids & Bases', formulas: [
            { name: 'pH', formula: 'pH = -log[H⁺]', description: 'Hydrogen ion concentration' },
            { name: 'pOH', formula: 'pOH = -log[OH⁻]', description: 'Hydroxide ion concentration' },
            { name: 'pH + pOH', formula: 'pH + pOH = 14', description: 'At 25°C' },
            { name: 'Ka × Kb', formula: 'Ka × Kb = Kw', description: 'Conjugate acid-base' },
        ]
    },
    {
        category: 'Thermochemistry', formulas: [
            { name: 'Heat', formula: 'q = mcΔT', description: 'Heat = mass × specific heat × temp change' },
            { name: 'Enthalpy', formula: 'ΔH = ΣH(products) - ΣH(reactants)', description: "Hess's Law" },
            { name: 'Gibbs Free Energy', formula: 'ΔG = ΔH - TΔS', description: 'Spontaneity' },
        ]
    },
    {
        category: 'Electrochemistry', formulas: [
            { name: 'Charge', formula: 'Q = I × t', description: 'Charge = Current × time' },
            { name: "Faraday's 1st", formula: 'm = (Q × M) / (n × F)', description: 'Mass deposited' },
            { name: 'Cell Potential', formula: 'E°cell = E°cathode - E°anode', description: 'Standard potential' },
        ]
    },
    {
        category: 'Nuclear Chemistry', formulas: [
            { name: 'Half-life', formula: 'N = N₀ × (½)^(t/t½)', description: 'Radioactive decay' },
            { name: 'Decay Constant', formula: 'λ = 0.693 / t½', description: 'First-order decay' },
            { name: 'Activity', formula: 'A = λN', description: 'Decay rate' },
        ]
    },
];

export const COMMON_IONS = [
    {
        category: 'Monatomic Cations', ions: [
            { formula: 'H⁺', name: 'Hydrogen' },
            { formula: 'Li⁺', name: 'Lithium' },
            { formula: 'Na⁺', name: 'Sodium' },
            { formula: 'K⁺', name: 'Potassium' },
            { formula: 'Mg²⁺', name: 'Magnesium' },
            { formula: 'Ca²⁺', name: 'Calcium' },
            { formula: 'Al³⁺', name: 'Aluminum' },
            { formula: 'Fe²⁺', name: 'Iron(II)' },
            { formula: 'Fe³⁺', name: 'Iron(III)' },
            { formula: 'Cu²⁺', name: 'Copper(II)' },
            { formula: 'Zn²⁺', name: 'Zinc' },
            { formula: 'Ag⁺', name: 'Silver' },
        ]
    },
    {
        category: 'Monatomic Anions', ions: [
            { formula: 'F⁻', name: 'Fluoride' },
            { formula: 'Cl⁻', name: 'Chloride' },
            { formula: 'Br⁻', name: 'Bromide' },
            { formula: 'I⁻', name: 'Iodide' },
            { formula: 'O²⁻', name: 'Oxide' },
            { formula: 'S²⁻', name: 'Sulfide' },
            { formula: 'N³⁻', name: 'Nitride' },
        ]
    },
    {
        category: 'Polyatomic Ions', ions: [
            { formula: 'OH⁻', name: 'Hydroxide' },
            { formula: 'NO₃⁻', name: 'Nitrate' },
            { formula: 'NO₂⁻', name: 'Nitrite' },
            { formula: 'SO₄²⁻', name: 'Sulfate' },
            { formula: 'SO₃²⁻', name: 'Sulfite' },
            { formula: 'CO₃²⁻', name: 'Carbonate' },
            { formula: 'HCO₃⁻', name: 'Bicarbonate' },
            { formula: 'PO₄³⁻', name: 'Phosphate' },
            { formula: 'NH₄⁺', name: 'Ammonium' },
            { formula: 'ClO₃⁻', name: 'Chlorate' },
            { formula: 'ClO₄⁻', name: 'Perchlorate' },
            { formula: 'MnO₄⁻', name: 'Permanganate' },
            { formula: 'CrO₄²⁻', name: 'Chromate' },
            { formula: 'Cr₂O₇²⁻', name: 'Dichromate' },
            { formula: 'C₂O₄²⁻', name: 'Oxalate' },
            { formula: 'CH₃COO⁻', name: 'Acetate' },
            { formula: 'CN⁻', name: 'Cyanide' },
        ]
    },
];

export const SOLUBILITY_RULES = [
    { rule: 'All nitrates (NO₃⁻) are soluble', exceptions: 'None' },
    { rule: 'All acetates (CH₃COO⁻) are soluble', exceptions: 'None' },
    { rule: 'All alkali metal compounds are soluble', exceptions: 'None' },
    { rule: 'All ammonium (NH₄⁺) compounds are soluble', exceptions: 'None' },
    { rule: 'Most chlorides, bromides, iodides are soluble', exceptions: 'Ag⁺, Pb²⁺, Hg₂²⁺' },
    { rule: 'Most sulfates (SO₄²⁻) are soluble', exceptions: 'Ba²⁺, Pb²⁺, Ca²⁺, Sr²⁺' },
    { rule: 'Most hydroxides (OH⁻) are insoluble', exceptions: 'Alkali metals, Ba²⁺, Ca²⁺, Sr²⁺' },
    { rule: 'Most carbonates (CO₃²⁻) are insoluble', exceptions: 'Alkali metals, NH₄⁺' },
    { rule: 'Most phosphates (PO₄³⁻) are insoluble', exceptions: 'Alkali metals, NH₄⁺' },
    { rule: 'Most sulfides (S²⁻) are insoluble', exceptions: 'Alkali metals, NH₄⁺, Ca²⁺, Ba²⁺' },
];

export const ELEMENT_DATA = [
    { symbol: 'H', name: 'Hydrogen', mass: 1.008 },
    { symbol: 'He', name: 'Helium', mass: 4.003 },
    { symbol: 'Li', name: 'Lithium', mass: 6.94 },
    { symbol: 'Be', name: 'Beryllium', mass: 9.012 },
    { symbol: 'B', name: 'Boron', mass: 10.81 },
    { symbol: 'C', name: 'Carbon', mass: 12.01 },
    { symbol: 'N', name: 'Nitrogen', mass: 14.01 },
    { symbol: 'O', name: 'Oxygen', mass: 16.00 },
    { symbol: 'F', name: 'Fluorine', mass: 19.00 },
    { symbol: 'Ne', name: 'Neon', mass: 20.18 },
    { symbol: 'Na', name: 'Sodium', mass: 22.99 },
    { symbol: 'Mg', name: 'Magnesium', mass: 24.31 },
    { symbol: 'Al', name: 'Aluminum', mass: 26.98 },
    { symbol: 'Si', name: 'Silicon', mass: 28.09 },
    { symbol: 'P', name: 'Phosphorus', mass: 30.97 },
    { symbol: 'S', name: 'Sulfur', mass: 32.07 },
    { symbol: 'Cl', name: 'Chlorine', mass: 35.45 },
    { symbol: 'Ar', name: 'Argon', mass: 39.95 },
    { symbol: 'K', name: 'Potassium', mass: 39.10 },
    { symbol: 'Ca', name: 'Calcium', mass: 40.08 },
    { symbol: 'Fe', name: 'Iron', mass: 55.85 },
    { symbol: 'Cu', name: 'Copper', mass: 63.55 },
    { symbol: 'Zn', name: 'Zinc', mass: 65.38 },
    { symbol: 'Br', name: 'Bromine', mass: 79.90 },
    { symbol: 'Ag', name: 'Silver', mass: 107.87 },
    { symbol: 'I', name: 'Iodine', mass: 126.90 },
    { symbol: 'Ba', name: 'Barium', mass: 137.33 },
    { symbol: 'Au', name: 'Gold', mass: 196.97 },
    { symbol: 'Hg', name: 'Mercury', mass: 200.59 },
    { symbol: 'Pb', name: 'Lead', mass: 207.2 },
];

// Molar Mass Calculator Function
export const calculateMolarMass = (formula) => {
    const elementMasses = {};
    ELEMENT_DATA.forEach(el => { elementMasses[el.symbol] = el.mass; });

    let totalMass = 0;
    let breakdown = [];

    // Parse formula like "H2O", "NaCl", "Ca(OH)2"
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;

    while ((match = regex.exec(formula)) !== null) {
        const symbol = match[1];
        const count = parseInt(match[2]) || 1;
        const mass = elementMasses[symbol];

        if (mass) {
            totalMass += mass * count;
            breakdown.push({ symbol, count, mass, subtotal: mass * count });
        }
    }

    return { totalMass: Math.round(totalMass * 100) / 100, breakdown };
};

export default {
    CHEMISTRY_CONSTANTS,
    COMMON_FORMULAS,
    COMMON_IONS,
    SOLUBILITY_RULES,
    ELEMENT_DATA,
    calculateMolarMass
};
