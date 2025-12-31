
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const atomicMasses = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011,
  N: 14.007, O: 15.999, F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305,
  Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948,
  K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
  Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
};

const parseFormula = (formula) => {
  const elements = {};
  let i = 0;
  while (i < formula.length) {
    if (formula[i].match(/[A-Z]/)) {
      let elem = formula[i];
      i++;
      if (i < formula.length && formula[i].match(/[a-z]/)) {
        elem += formula[i];
        i++;
      }
      let num = '';
      while (i < formula.length && formula[i].match(/\d/)) {
        num += formula[i];
        i++;
      }
      const count = num ? parseInt(num) : 1;
      elements[elem] = (elements[elem] || 0) + count;
    } else {
      i++;
    }
  }
  return elements;
};

const calculateMolarMass = (formula) => {
  const elements = parseFormula(formula);
  let mass = 0;
  for (const [elem, count] of Object.entries(elements)) {
    if (atomicMasses[elem]) {
      mass += atomicMasses[elem] * count;
    } else {
      return `Unknown: ${elem}`;
    }
  }
  return mass.toFixed(3);
};

const calculatePercentComposition = (formula) => {
  const elements = parseFormula(formula);
  const totalMass = parseFloat(calculateMolarMass(formula));
  if (isNaN(totalMass)) return null;
  const comp = [];
  for (const [elem, count] of Object.entries(elements)) {
    if (atomicMasses[elem]) {
      const elemMass = atomicMasses[elem] * count;
      const percent = ((elemMass / totalMass) * 100).toFixed(2);
      comp.push({ elem, percent });
    }
  }
  return comp;
};

const InputField = ({ label, value, onChange, placeholder, unit }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#64748B"
        keyboardType="numeric"
      />
      {unit && <Text style={styles.unitText}>{unit}</Text>}
    </View>
  </View>
);

const ResultDisplay = ({ result, unit, label }) => {
  if (!result) return null;
  return (
    <View style={styles.resultContainer}>
      <View style={styles.resultHeader}>
        <View style={styles.sparkle} />
        <Text style={styles.resultLabel}>{label}</Text>
      </View>
      <Text style={styles.resultValue}>
        {result} <Text style={styles.resultUnit}>{unit}</Text>
      </Text>
    </View>
  );
};

const CalculatorSection = ({ title, icon, color, children, expanded, onToggle }) => {
  return (
    <View style={[styles.section, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle} activeOpacity={0.7}>
        <View style={styles.sectionTitleContainer}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <Text style={styles.iconText}>{icon}</Text>
          </View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
};

export default function ChemistryCalculator() {
  const [expandedSections, setExpandedSections] = useState({
    stoich: true,
    thermo: true,
    gas: true,
    quantum: true,
    ph: true,
    molar: true,
    comp: true,
  });

  // Stoichiometry
  const [molesMass, setMolesMass] = useState('');
  const [molesMolar, setMolesMolar] = useState('');
  const [molesResult, setMolesResult] = useState('');
  
  const [massMoles, setMassMoles] = useState('');
  const [massMolar, setMassMolar] = useState('');
  const [massResult, setMassResult] = useState('');
  
  // Thermodynamics
  const [energyMass, setEnergyMass] = useState('');
  const [energyC, setEnergyC] = useState('');
  const [energyDeltaT, setEnergyDeltaT] = useState('');
  const [energyResult, setEnergyResult] = useState('');
  
  // Gas
  const [gasN, setGasN] = useState('');
  const [gasT, setGasT] = useState('');
  const [gasV, setGasV] = useState('');
  const [gasResult, setGasResult] = useState('');
  
  // Quantum
  const [freqE, setFreqE] = useState('');
  const [freqResult, setFreqResult] = useState('');
  
  // pH
  const [phH, setPhH] = useState('');
  const [phResult, setPhResult] = useState('');
  
  // Molar Mass
  const [molarFormula, setMolarFormula] = useState('');
  const [molarResult, setMolarResult] = useState('');
  
  // Composition
  const [compFormula, setCompFormula] = useState('');
  const [compResult, setCompResult] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const calculateMoles = () => {
    const mass = parseFloat(molesMass);
    const molar = parseFloat(molesMolar);
    if (!isNaN(mass) && !isNaN(molar) && molar !== 0) {
      setMolesResult((mass / molar).toFixed(5));
    } else {
      setMolesResult('Invalid');
    }
  };

  const calculateMass = () => {
    const moles = parseFloat(massMoles);
    const molar = parseFloat(massMolar);
    if (!isNaN(moles) && !isNaN(molar)) {
      setMassResult((moles * molar).toFixed(5));
    } else {
      setMassResult('Invalid');
    }
  };

  const calculateEnergy = () => {
    const m = parseFloat(energyMass);
    const c = parseFloat(energyC);
    const deltaT = parseFloat(energyDeltaT);
    if (!isNaN(m) && !isNaN(c) && !isNaN(deltaT)) {
      setEnergyResult((m * c * deltaT).toFixed(5));
    } else {
      setEnergyResult('Invalid');
    }
  };

  const calculateGas = () => {
    const n = parseFloat(gasN);
    const T = parseFloat(gasT);
    const V = parseFloat(gasV);
    if (!isNaN(n) && !isNaN(T) && !isNaN(V) && V !== 0) {
      setGasResult(((n * 8.314 * T) / V).toFixed(5));
    } else {
      setGasResult('Invalid');
    }
  };

  const calculateFrequency = () => {
    const E = parseFloat(freqE);
    if (!isNaN(E)) {
      setFreqResult((E / 6.626e-34).toFixed(5));
    } else {
      setFreqResult('Invalid');
    }
  };

  const calculatePh = () => {
    const H = parseFloat(phH);
    if (!isNaN(H) && H > 0) {
      setPhResult((-Math.log10(H)).toFixed(5));
    } else {
      setPhResult('Invalid');
    }
  };

  const calculateMolar = () => {
    if (molarFormula) {
      const res = calculateMolarMass(molarFormula);
      setMolarResult(isNaN(parseFloat(res)) ? res : res);
    } else {
      setMolarResult('');
    }
  };

  const calculateComp = () => {
    if (compFormula) {
      setCompResult(calculatePercentComposition(compFormula));
    } else {
      setCompResult(null);
    }
  };

  const clearAll = () => {
    setMolesMass(''); setMolesMolar(''); setMolesResult('');
    setMassMoles(''); setMassMolar(''); setMassResult('');
    setEnergyMass(''); setEnergyC(''); setEnergyDeltaT(''); setEnergyResult('');
    setGasN(''); setGasT(''); setGasV(''); setGasResult('');
    setFreqE(''); setFreqResult('');
    setPhH(''); setPhResult('');
    setMolarFormula(''); setMolarResult('');
    setCompFormula(''); setCompResult(null);
  };

  const constants = [
    { name: 'Avogadro (Nₐ)', value: '6.022 × 10²³', unit: 'mol⁻¹' },
    { name: 'Gas Constant (R)', value: '8.314', unit: 'J/(mol·K)' },
    { name: 'Faraday (F)', value: '96,485', unit: 'C/mol' },
    { name: 'Planck (h)', value: '6.626 × 10⁻³⁴', unit: 'J·s' },
    { name: 'Speed of Light (c)', value: '3.0 × 10⁸', unit: 'm/s' },
    { name: 'Boltzmann (k)', value: '1.381 × 10⁻²³', unit: 'J/K' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoIcon}>⚗️</Text>
            </View>
            <Text style={styles.title}>ChemLab Pro</Text>
            <Text style={styles.subtitle}>Advanced Chemistry Calculations</Text>
            <View style={styles.headerAccent} />
          </View>

          {/* Stoichiometry */}
          <CalculatorSection
            title="Stoichiometry"
            icon="🧮"
            color="#A855F7"
            expanded={expandedSections.stoich}
            onToggle={() => toggleSection('stoich')}
          >
            <View style={styles.calcBox}>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>n = m / M</Text>
              </View>
              <InputField label="Mass" value={molesMass} onChange={setMolesMass} placeholder="0.0" unit="g" />
              <InputField label="Molar Mass" value={molesMolar} onChange={setMolesMolar} placeholder="0.0" unit="g/mol" />
              <TouchableOpacity onPress={calculateMoles} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#A855F7' }]}>
                <Text style={styles.buttonText}>Calculate Moles</Text>
              </TouchableOpacity>
              <ResultDisplay result={molesResult} unit="mol" label="Moles" />
            </View>

            <View style={styles.calcBox}>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>m = n × M</Text>
              </View>
              <InputField label="Moles" value={massMoles} onChange={setMassMoles} placeholder="0.0" unit="mol" />
              <InputField label="Molar Mass" value={massMolar} onChange={setMassMolar} placeholder="0.0" unit="g/mol" />
              <TouchableOpacity onPress={calculateMass} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#A855F7' }]}>
                <Text style={styles.buttonText}>Calculate Mass</Text>
              </TouchableOpacity>
              <ResultDisplay result={massResult} unit="g" label="Mass" />
            </View>
          </CalculatorSection>

          {/* Thermodynamics */}
          <CalculatorSection
            title="Thermodynamics"
            icon="🔥"
            color="#F97316"
            expanded={expandedSections.thermo}
            onToggle={() => toggleSection('thermo')}
          >
            <View style={styles.calcBox}>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>Q = m × c × ΔT</Text>
              </View>
              <InputField label="Mass" value={energyMass} onChange={setEnergyMass} placeholder="0.0" unit="g" />
              <InputField label="Specific Heat" value={energyC} onChange={setEnergyC} placeholder="0.0" unit="J/g·K" />
              <InputField label="Temperature Change" value={energyDeltaT} onChange={setEnergyDeltaT} placeholder="0.0" unit="K" />
              <TouchableOpacity onPress={calculateEnergy} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#F97316' }]}>
                <Text style={styles.buttonText}>Calculate Energy</Text>
              </TouchableOpacity>
              <ResultDisplay result={energyResult} unit="J" label="Heat Energy" />
            </View>
          </CalculatorSection>

          {/* Gas Laws */}
          <CalculatorSection
            title="Ideal Gas Law"
            icon="💨"
            color="#06B6D4"
            expanded={expandedSections.gas}
            onToggle={() => toggleSection('gas')}
          >
            <View style={styles.calcBox}>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>P = nRT / V</Text>
              </View>
              <InputField label="Moles" value={gasN} onChange={setGasN} placeholder="0.0" unit="mol" />
              <InputField label="Temperature" value={gasT} onChange={setGasT} placeholder="0.0" unit="K" />
              <InputField label="Volume" value={gasV} onChange={setGasV} placeholder="0.0" unit="m³" />
              <TouchableOpacity onPress={calculateGas} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#06B6D4' }]}>
                <Text style={styles.buttonText}>Calculate Pressure</Text>
              </TouchableOpacity>
              <ResultDisplay result={gasResult} unit="Pa" label="Pressure" />
            </View>
          </CalculatorSection>

          {/* Quantum */}
          <CalculatorSection
            title="Quantum Chemistry"
            icon="⚛️"
            color="#8B5CF6"
            expanded={expandedSections.quantum}
            onToggle={() => toggleSection('quantum')}
          >
            <View style={styles.calcBox}>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>f = E / h</Text>
              </View>
              <InputField label="Energy" value={freqE} onChange={setFreqE} placeholder="0.0" unit="J" />
              <TouchableOpacity onPress={calculateFrequency} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#8B5CF6' }]}>
                <Text style={styles.buttonText}>Calculate Frequency</Text>
              </TouchableOpacity>
              <ResultDisplay result={freqResult} unit="Hz" label="Frequency" />
            </View>
          </CalculatorSection>

          {/* pH */}
          <CalculatorSection
            title="Acid-Base Chemistry"
            icon="💧"
            color="#10B981"
            expanded={expandedSections.ph}
            onToggle={() => toggleSection('ph')}
          >
            <View style={styles.calcBox}>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>pH = -log₁₀[H⁺]</Text>
              </View>
              <InputField label="[H⁺] Concentration" value={phH} onChange={setPhH} placeholder="0.0" unit="mol/L" />
              <TouchableOpacity onPress={calculatePh} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#10B981' }]}>
                <Text style={styles.buttonText}>Calculate pH</Text>
              </TouchableOpacity>
              <ResultDisplay result={phResult} unit="" label="pH Value" />
            </View>
          </CalculatorSection>

          {/* Molar Mass */}
          <CalculatorSection
            title="Molar Mass Calculator"
            icon="⚖️"
            color="#F59E0B"
            expanded={expandedSections.molar}
            onToggle={() => toggleSection('molar')}
          >
            <View style={styles.calcBox}>
              <InputField label="Chemical Formula" value={molarFormula} onChange={setMolarFormula} placeholder="e.g., H2O" />
              <TouchableOpacity onPress={calculateMolar} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#F59E0B' }]}>
                <Text style={styles.buttonText}>Calculate Molar Mass</Text>
              </TouchableOpacity>
              <ResultDisplay result={molarResult} unit="g/mol" label="Molar Mass" />
            </View>
          </CalculatorSection>

          {/* Composition */}
          <CalculatorSection
            title="Percent Composition"
            icon="📊"
            color="#F43F5E"
            expanded={expandedSections.comp}
            onToggle={() => toggleSection('comp')}
          >
            <View style={styles.calcBox}>
              <InputField label="Chemical Formula" value={compFormula} onChange={setCompFormula} placeholder="e.g., C6H12O6" />
              <TouchableOpacity onPress={calculateComp} activeOpacity={0.8} style={[styles.button, { backgroundColor: '#F43F5E' }]}>
                <Text style={styles.buttonText}>Analyze Composition</Text>
              </TouchableOpacity>
              {compResult && (
                <View style={styles.compositionContainer}>
                  <View style={styles.compositionHeader}>
                    <View style={styles.compositionDot} />
                    <Text style={styles.compositionTitle}>Elemental Breakdown</Text>
                  </View>
                  <View style={styles.compositionGrid}>
                    {compResult.map(({ elem, percent }) => (
                      <View key={elem} style={styles.compositionItem}>
                        <Text style={styles.compositionElem}>{elem}</Text>
                        <Text style={styles.compositionPercent}>{percent}%</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </CalculatorSection>

          {/* Constants */}
          <View style={styles.constantsSection}>
            <View style={styles.constantsHeader}>
              <Text style={styles.constantsIcon}>⭐</Text>
              <Text style={styles.constantsTitle}>Physical Constants</Text>
            </View>
            <View style={styles.constantsGrid}>
              {constants.map((constant, index) => (
                <View key={index} style={styles.constantCard}>
                  <Text style={styles.constantName}>{constant.name}</Text>
                  <Text style={styles.constantValue}>{constant.value}</Text>
                  <Text style={styles.constantUnit}>{constant.unit}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Clear Button */}
          <TouchableOpacity onPress={clearAll} activeOpacity={0.8} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕ Clear All Fields</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  background: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#A855F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  logoIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 44,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(168, 85, 247, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerAccent: {
    width: 60,
    height: 4,
    backgroundColor: '#A855F7',
    borderRadius: 2,
    marginTop: 12,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E293B',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  iconText: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  chevron: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: '700',
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1E293B',
  },
  calcBox: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  formulaContainer: {
    backgroundColor: '#1E293B',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 18,
    borderLeftWidth: 3,
    borderLeftColor: '#A855F7',
  },
  formula: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C4B5FD',
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#334155',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  unitText: {
    paddingRight: 16,
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  resultContainer: {
    marginTop: 18,
    padding: 18,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  sparkle: {
    width: 8,
    height: 8,
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#10B981',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  resultValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  resultUnit: {
    fontSize: 20,
    color: '#94A3B8',
    fontWeight: '600',
  },
  compositionContainer: {
    marginTop: 18,
    padding: 18,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#F43F5E',
  },
  compositionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  compositionDot: {
    width: 8,
    height: 8,
    backgroundColor: '#F43F5E',
    borderRadius: 4,
  },
  compositionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#F43F5E',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  compositionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  compositionItem: {
    backgroundColor: '#1E293B',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    minWidth: (width - 108) / 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  compositionElem: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  compositionPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F43F5E',
  },
  constantsSection: {
    marginTop: 8,
    marginBottom: 20,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  constantsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 12,
  },
  constantsIcon: {
    fontSize: 24,
  },
  constantsTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  constantsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  constantsGrid: {
    gap: 12,
  },
  constantCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  constantName: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 6,
    fontWeight: '500',
  },
  constantValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  constantUnit: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  clearButtonWrapper: {
    marginTop: 8,
    marginBottom: 32,
  },
  clearButton: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});