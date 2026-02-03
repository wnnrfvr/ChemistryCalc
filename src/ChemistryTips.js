// ChemistryTips.js - Daily Chemistry Tips & Study Helpers

// Chemistry tips organized by category for learning
export const CHEMISTRY_TIPS = [
    // Stoichiometry Tips
    {
        category: 'Stoichiometry',
        icon: '⚖️',
        tip: 'Always balance your equation BEFORE doing any stoichiometry calculations!',
        formula: 'mol₁ × (coef₂/coef₁) = mol₂',
    },
    {
        category: 'Stoichiometry',
        icon: '🔢',
        tip: 'Molar ratios come from the coefficients in a balanced equation.',
        formula: '2H₂ + O₂ -> 2H₂O means 2:1:2 ratio',
    },
    {
        category: 'Stoichiometry',
        icon: '📏',
        tip: 'When finding limiting reagent, calculate moles of product from EACH reactant. The smaller amount determines the limiting reagent.',
        formula: 'Less product -> Limiting reagent',
    },

    // Gas Laws Tips
    {
        category: 'Gas Laws',
        icon: '💨',
        tip: 'Always convert temperature to Kelvin for gas law calculations! K = °C + 273.15',
        formula: 'T(K) = T(°C) + 273.15',
    },
    {
        category: 'Gas Laws',
        icon: '🎈',
        tip: 'At STP (Standard Temperature and Pressure), 1 mole of any gas occupies 22.4 L.',
        formula: 'STP: 0°C (273K), 1 atm',
    },
    {
        category: 'Gas Laws',
        icon: '📐',
        tip: 'The universal gas constant R = 8.314 J/(mol·K) or 0.0821 L·atm/(mol·K)',
        formula: 'PV = nRT',
    },

    // pH & Acids/Bases Tips
    {
        category: 'Acids & Bases',
        icon: '🧪',
        tip: 'pH + pOH = 14 at 25°C. If you know one, you can always find the other!',
        formula: 'pH + pOH = 14',
    },
    {
        category: 'Acids & Bases',
        icon: '⚗️',
        tip: 'pH = -log[H⁺]. Every pH unit represents a 10x change in H⁺ concentration.',
        formula: 'pH 3 -> pH 4 = 10× less acidic',
    },
    {
        category: 'Acids & Bases',
        icon: '🔬',
        tip: 'Strong acids completely dissociate. For HCl, [H⁺] = [HCl]₀',
        formula: 'HCl -> H⁺ + Cl⁻ (100%)',
    },

    // Solutions Tips
    {
        category: 'Solutions',
        icon: '💧',
        tip: 'Molarity (M) = moles of solute ÷ liters of solution. Remember: it\'s LITERS, not mL!',
        formula: 'M = mol/L',
    },
    {
        category: 'Solutions',
        icon: '🌊',
        tip: 'For dilution problems, use M₁V₁ = M₂V₂. This works because total moles stay constant!',
        formula: 'M₁V₁ = M₂V₂',
    },

    // Thermochemistry Tips
    {
        category: 'Thermochemistry',
        icon: '🔥',
        tip: 'Negative ΔH means heat is released (exothermic). Positive ΔH means heat is absorbed (endothermic).',
        formula: '−ΔH = exothermic, +ΔH = endothermic',
    },
    {
        category: 'Thermochemistry',
        icon: '⚡',
        tip: 'Use q = mcΔT for heating/cooling. Use q = mΔHfus or q = mΔHvap for phase changes.',
        formula: 'q = mcΔT',
    },

    // Nuclear Chemistry Tips
    {
        category: 'Nuclear',
        icon: '☢️',
        tip: 'Half-life is constant! After n half-lives, you have (½)ⁿ of the original amount.',
        formula: 'N = N₀ × (½)^(t/t½)',
    },
    {
        category: 'Nuclear',
        icon: '⚛️',
        tip: 'Alpha (α) = He nucleus (2p, 2n). Beta (β) = electron. Gamma (γ) = energy only.',
        formula: 'α: ⁴₂He  β: ⁰₋₁e  γ: ⁰₀γ',
    },

    // Electrolysis Tips
    {
        category: 'Electrolysis',
        icon: '⚡',
        tip: 'Faraday\'s constant F = 96,500 C/mol. It represents the charge of 1 mole of electrons.',
        formula: 'm = (M × I × t) / (n × F)',
    },

    // Molar Mass Tips
    {
        category: 'Molar Mass',
        icon: '🔢',
        tip: 'Avogadro\'s number: 6.022 × 10²³ particles per mole. This connects atoms to grams!',
        formula: 'Nₐ = 6.022 × 10²³',
    },

    // General Tips
    {
        category: 'General',
        icon: '📝',
        tip: 'Always include units in your calculations. Unit analysis helps catch mistakes!',
        formula: 'g × (mol/g) × (L/mol) = L ✓',
    },
    {
        category: 'General',
        icon: '🎯',
        tip: 'Significant figures: Your answer can only be as precise as your least precise measurement.',
        formula: '3.14 × 2.1 = 6.6 (2 sig figs)',
    },
    {
        category: 'General',
        icon: '💡',
        tip: 'When in doubt, convert everything to moles first. Moles are the "universal currency" of chemistry!',
        formula: 'mass -> moles -> moles -> mass',
    },
];

// Get tip of the day based on current date
export const getTipOfTheDay = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const tipIndex = dayOfYear % CHEMISTRY_TIPS.length;
    return CHEMISTRY_TIPS[tipIndex];
};

// Get a random tip
export const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * CHEMISTRY_TIPS.length);
    return CHEMISTRY_TIPS[randomIndex];
};

// Get tips by category
export const getTipsByCategory = (category) => {
    return CHEMISTRY_TIPS.filter(tip => tip.category === category);
};

// Achievement definitions
export const ACHIEVEMENTS = [
    { id: 'first_solve', title: 'First Steps', description: 'Solve your first chemistry problem', icon: '🌱', xpReward: 50, requirement: { type: 'problems_solved', count: 1 } },
    { id: 'solver_10', title: 'Problem Solver', description: 'Solve 10 problems', icon: '🧮', xpReward: 100, requirement: { type: 'problems_solved', count: 10 } },
    { id: 'solver_50', title: 'Chemistry Whiz', description: 'Solve 50 problems', icon: '🔬', xpReward: 250, requirement: { type: 'problems_solved', count: 50 } },
    { id: 'solver_100', title: 'Lab Master', description: 'Solve 100 problems', icon: '🏆', xpReward: 500, requirement: { type: 'problems_solved', count: 100 } },
    { id: 'streak_3', title: 'Consistent', description: 'Maintain a 3-day streak', icon: '🔥', xpReward: 75, requirement: { type: 'streak', count: 3 } },
    { id: 'streak_7', title: 'Dedicated', description: 'Maintain a 7-day streak', icon: '⚡', xpReward: 200, requirement: { type: 'streak', count: 7 } },
    { id: 'streak_30', title: 'Chemistry Devotee', description: '30-day streak!', icon: '👑', xpReward: 1000, requirement: { type: 'streak', count: 30 } },
    { id: 'quiz_perfect', title: 'Perfect Score', description: 'Get 100% on a quiz', icon: '⭐', xpReward: 150, requirement: { type: 'quiz_perfect', count: 1 } },
    { id: 'level_5', title: 'Rising Chemist', description: 'Reach Level 5', icon: '📈', xpReward: 100, requirement: { type: 'level', count: 5 } },
    { id: 'level_10', title: 'Expert Chemist', description: 'Reach Level 10', icon: '🎓', xpReward: 300, requirement: { type: 'level', count: 10 } },
    { id: 'explorer', title: 'Explorer', description: 'Use all calculator modules', icon: '🗺️', xpReward: 200, requirement: { type: 'modules_used', count: 9 } },
    { id: 'sharer', title: 'Teacher', description: 'Share 5 solutions', icon: '📤', xpReward: 150, requirement: { type: 'shares', count: 5 } },
];

export default {
    CHEMISTRY_TIPS,
    ACHIEVEMENTS,
    getTipOfTheDay,
    getRandomTip,
    getTipsByCategory,
};
