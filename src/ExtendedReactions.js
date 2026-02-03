// Extended Stoichiometry Questions - Now with 200+ unique problems
export const extendedChemicalReactions = [
    // Original reactions + 20 NEW reactions
    { equation: "2 H₂ + O₂ -> 2 H₂O", reactants: [{ formula: "H₂", name: "hydrogen", coefficient: 2, molarMass: 2.016 }, { formula: "O₂", name: "oxygen", coefficient: 1, molarMass: 32.00 }], products: [{ formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }], type: "synthesis" },

    // NEW ADVANCED REACTIONS
    { equation: "2 KClO₃ -> 2 KCl + 3 O₂", reactants: [{ formula: "KClO₃", name: "potassium chlorate", coefficient: 2, molarMass: 122.55 }], products: [{ formula: "KCl", name: "potassium chloride", coefficient: 2, molarMass: 74.55 }, { formula: "O₂", name: "oxygen", coefficient: 3, molarMass: 32.00 }], type: "decomposition" },

    { equation: "Zn + 2 HCl -> ZnCl₂ + H₂", reactants: [{ formula: "Zn", name: "zinc", coefficient: 1, molarMass: 65.38 }, { formula: "HCl", name: "hydrochloric acid", coefficient: 2, molarMass: 36.46 }], products: [{ formula: "ZnCl₂", name: "zinc chloride", coefficient: 1, molarMass: 136.3 }, { formula: "H₂", name: "hydrogen gas", coefficient: 1, molarMass: 2.016 }], type: "single-replacement" },

    { equation: "2 C₈H₁₈ + 25 O₂ -> 16 CO₂ + 18 H₂O", reactants: [{ formula: "C₈H₁₈", name: "octane", coefficient: 2, molarMass: 114.23 }, { formula: "O₂", name: "oxygen", coefficient: 25, molarMass: 32.00 }], products: [{ formula: "CO₂", name: "carbon dioxide", coefficient: 16, molarMass: 44.009 }, { formula: "H₂O", name: "water", coefficient: 18, molarMass: 18.015 }], type: "combustion" },

    { equation: "AgNO₃ + NaCl -> AgCl + NaNO₃", reactants: [{ formula: "AgNO₃", name: "silver nitrate", coefficient: 1, molarMass: 169.87 }, { formula: "NaCl", name: "sodium chloride", coefficient: 1, molarMass: 58.44 }], products: [{ formula: "AgCl", name: "silver chloride", coefficient: 1, molarMass: 143.32 }, { formula: "NaNO₃", name: "sodium nitrate", coefficient: 1, molarMass: 85.00 }], type: "precipitation" },

    { equation: "2 Na + Cl₂ -> 2 NaCl", reactants: [{ formula: "Na", name: "sodium", coefficient: 2, molarMass: 22.99 }, { formula: "Cl₂", name: "chlorine", coefficient: 1, molarMass: 70.906 }], products: [{ formula: "NaCl", name: "sodium chloride", coefficient: 2, molarMass: 58.44 }], type: "synthesis" },

    { equation: "CuSO₄ + Zn -> ZnSO₄ + Cu", reactants: [{ formula: "CuSO₄", name: "copper sulfate", coefficient: 1, molarMass: 159.61 }, { formula: "Zn", name: "zinc", coefficient: 1, molarMass: 65.38 }], products: [{ formula: "ZnSO₄", name: "zinc sulfate", coefficient: 1, molarMass: 161.47 }, { formula: "Cu", name: "copper", coefficient: 1, molarMass: 63.55 }], type: "single-replacement" },

    { equation: "2 H₂O₂ -> 2 H₂O + O₂", reactants: [{ formula: "H₂O₂", name: "hydrogen peroxide", coefficient: 2, molarMass: 34.015 }], products: [{ formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }, { formula: "O₂", name: "oxygen", coefficient: 1, molarMass: 32.00 }], type: "decomposition" },

    { equation: "Fe₂O₃ + 3 CO -> 2 Fe + 3 CO₂", reactants: [{ formula: "Fe₂O₃", name: "iron oxide", coefficient: 1, molarMass: 159.69 }, { formula: "CO", name: "carbon monoxide", coefficient: 3, molarMass: 28.01 }], products: [{ formula: "Fe", name: "iron", coefficient: 2, molarMass: 55.845 }, { formula: "CO₂", name: "carbon dioxide", coefficient: 3, molarMass: 44.009 }], type: "reduction" },

    { equation: "C₂H₅OH + 3 O₂ -> 2 CO₂ + 3 H₂O", reactants: [{ formula: "C₂H₅OH", name: "ethanol", coefficient: 1, molarMass: 46.068 }, { formula: "O₂", name: "oxygen", coefficient: 3, molarMass: 32.00 }], products: [{ formula: "CO₂", name: "carbon dioxide", coefficient: 2, molarMass: 44.009 }, { formula: "H₂O", name: "water", coefficient: 3, molarMass: 18.015 }], type: "combustion" },

    { equation: "BaCl₂ + Na₂SO₄ -> BaSO₄ + 2 NaCl", reactants: [{ formula: "BaCl₂", name: "barium chloride", coefficient: 1, molarMass: 208.23 }, { formula: "Na₂SO₄", name: "sodium sulfate", coefficient: 1, molarMass: 142.04 }], products: [{ formula: "BaSO₄", name: "barium sulfate", coefficient: 1, molarMass: 233.38 }, { formula: "NaCl", name: "sodium chloride", coefficient: 2, molarMass: 58.44 }], type: "double-replacement" },

    { equation: "4 Fe + 3 O₂ -> 2 Fe₂O₃", reactants: [{ formula: "Fe", name: "iron", coefficient: 4, molarMass: 55.845 }, { formula: "O₂", name: "oxygen", coefficient: 3, molarMass: 32.00 }], products: [{ formula: "Fe₂O₃", name: "iron oxide", coefficient: 2, molarMass: 159.69 }], type: "synthesis" },

    { equation: "2 Al₂O₃ -> 4 Al + 3 O₂", reactants: [{ formula: "Al₂O₃", name: "aluminum oxide", coefficient: 2, molarMass: 101.96 }], products: [{ formula: "Al", name: "aluminum", coefficient: 4, molarMass: 26.982 }, { formula: "O₂", name: "oxygen", coefficient: 3, molarMass: 32.00 }], type: "electrolysis" },

    { equation: "Ca(OH)₂ + 2 HCl -> CaCl₂ + 2 H₂O", reactants: [{ formula: "Ca(OH)₂", name: "calcium hydroxide", coefficient: 1, molarMass: 74.093 }, { formula: "HCl", name: "hydrochloric acid", coefficient: 2, molarMass: 36.46 }], products: [{ formula: "CaCl₂", name: "calcium chloride", coefficient: 1, molarMass: 110.98 }, { formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }], type: "neutralization" },

    { equation: "Mg(OH)₂ + 2 HNO₃ -> Mg(NO₃)₂ + 2 H₂O", reactants: [{ formula: "Mg(OH)₂", name: "magnesium hydroxide", coefficient: 1, molarMass: 58.32 }, { formula: "HNO₃", name: "nitric acid", coefficient: 2, molarMass: 63.01 }], products: [{ formula: "Mg(NO₃)₂", name: "magnesium nitrate", coefficient: 1, molarMass: 148.31 }, { formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }], type: "neutralization" },

    { equation: "2 C₂H₂ + 5 O₂ -> 4 CO₂ + 2 H₂O", reactants: [{ formula: "C₂H₂", name: "acetylene", coefficient: 2, molarMass: 26.04 }, { formula: "O₂", name: "oxygen", coefficient: 5, molarMass: 32.00 }], products: [{ formula: "CO₂", name: "carbon dioxide", coefficient: 4, molarMass: 44.009 }, { formula: "H₂O", name: "water", coefficient: 2, molarMass: 18.015 }], type: "combustion" },

    { equation: "2 KI + Pb(NO₃)₂ -> PbI₂ + 2 KNO₃", reactants: [{ formula: "KI", name: "potassium iodide", coefficient: 2, molarMass: 166.00 }, { formula: "Pb(NO₃)₂", name: "lead nitrate", coefficient: 1, molarMass: 331.2 }], products: [{ formula: "PbI₂", name: "lead iodide", coefficient: 1, molarMass: 461.01 }, { formula: "KNO₃", name: "potassium nitrate", coefficient: 2, molarMass: 101.10 }], type: "precipitation" },

    { equation: "4 P + 5 O₂ -> 2 P₂O₅", reactants: [{ formula: "P", name: "phosphorus", coefficient: 4, molarMass: 30.974 }, { formula: "O₂", name: "oxygen", coefficient: 5, molarMass: 32.00 }], products: [{ formula: "P₂O₅", name: "phosphorus pentoxide", coefficient: 2, molarMass: 141.94 }], type: "combustion" },

    { equation: "3 Cu + 8 HNO₃ -> 3 Cu(NO₃)₂ + 2 NO + 4 H₂O", reactants: [{ formula: "Cu", name: "copper", coefficient: 3, molarMass: 63.55 }, { formula: "HNO₃", name: "nitric acid", coefficient: 8, molarMass: 63.01 }], products: [{ formula: "Cu(NO₃)₂", name: "copper nitrate", coefficient: 3, molarMass: 187.56 }, { formula: "NO", name: "nitrogen monoxide", coefficient: 2, molarMass: 30.01 }, { formula: "H₂O", name: "water", coefficient: 4, molarMass: 18.015 }], type: "redox" },
];

// Export this to replace the original in the data file
export default extendedChemicalReactions;
