import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Dimensions, Platform, Animated, Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// ========================================
// PREMIUM COLOR SYSTEM
// ========================================
const COLORS = {
  background: ['#0B0D17', '#151923', '#1A1F2E'],
  accent1: '#00F5FF',
  accent2: '#B794F6',
  accent3: '#FF6B9D',
  accent4: '#FFC059',
  accent5: '#00FF88',
  text: '#FFFFFF',
  textDim: '#8B92A8',
  textBright: '#E8ECF4',
  border: 'rgba(255, 255, 255, 0.08)',
  card: '#1C2333',
};

// ========================================
// ATOMIC DATA
// ========================================
const atomicMasses = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011,
  N: 14.007, O: 15.999, F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305,
  Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948,
  K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
  Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
  Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
};

// ========================================
// HELPER FUNCTIONS
// ========================================
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

// ========================================
// PREMIUM COMPONENTS
// ========================================
const GlassCard = ({ children, style, gradient = null }) => (
  <View style={[styles.glassCard, style]}>
    {gradient && (
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.glassGradient}
      />
    )}
    <BlurView intensity={15} tint="dark" style={styles.glassBlur}>
      {children}
    </BlurView>
  </View>
);

const PremiumInput = ({ label, value, onChange, placeholder, unit, gradient }) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(focusAnim, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
  }, [isFocused]);

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.08)', gradient[0]],
  });

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <Animated.View style={[styles.inputWrapper, { borderColor }]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textDim}
          keyboardType="numeric"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {unit && (
          <View style={styles.unitBadge}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const ResultDisplay = ({ result, unit, label, gradient }) => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (result) {
      fadeIn.setValue(0);
      slideUp.setValue(30);
      Animated.parallel([
        Animated.spring(fadeIn, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
        Animated.spring(slideUp, { toValue: 0, useNativeDriver: true, tension: 50, friction: 7 }),
      ]).start();
    }
  }, [result]);

  if (!result) return null;

  return (
    <Animated.View style={[styles.resultContainer, { opacity: fadeIn, transform: [{ translateY: slideUp }] }]}>
      <LinearGradient
        colors={[...gradient, gradient[0] + '00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.resultGradient}
      >
        <View style={styles.resultInner}>
          <View style={styles.resultHeader}>
            <View style={[styles.resultDot, { backgroundColor: gradient[0] }]} />
            <Text style={[styles.resultLabel, { color: gradient[0] }]}>{label}</Text>
          </View>
          <Text style={styles.resultValue}>
            {result} <Text style={styles.resultUnit}>{unit}</Text>
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const CalculatorSection = ({ title, icon, gradient, children, expanded, onToggle }) => {
  const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(rotateAnim, {
      toValue: expanded ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [expanded]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <GlassCard style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={onToggle} activeOpacity={0.8}>
        <View style={styles.sectionTitleContainer}>
          <LinearGradient colors={gradient} style={styles.sectionIconGradient}>
            <Text style={styles.sectionIcon}>{icon}</Text>
          </LinearGradient>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <MaterialCommunityIcons name="chevron-down" size={24} color={COLORS.textDim} />
        </Animated.View>
      </TouchableOpacity>
      {expanded && <View style={styles.sectionContent}>{children}</View>}
    </GlassCard>
  );
};

// ========================================
// MAIN COMPONENT
// ========================================
export default function ChemistryCalculator() {
  const [expandedSections, setExpandedSections] = useState({
    stoich: true,
    thermo: false,
    gas: false,
    quantum: false,
    ph: false,
    molar: false,
    comp: false,
  });

  // State variables for all calculations
  const [molesMass, setMolesMass] = useState('');
  const [molesMolar, setMolesMolar] = useState('');
  const [molesResult, setMolesResult] = useState('');
  
  const [massMoles, setMassMoles] = useState('');
  const [massMolar, setMassMolar] = useState('');
  const [massResult, setMassResult] = useState('');
  
  const [energyMass, setEnergyMass] = useState('');
  const [energyC, setEnergyC] = useState('');
  const [energyDeltaT, setEnergyDeltaT] = useState('');
  const [energyResult, setEnergyResult] = useState('');
  
  const [gasN, setGasN] = useState('');
  const [gasT, setGasT] = useState('');
  const [gasV, setGasV] = useState('');
  const [gasResult, setGasResult] = useState('');
  
  const [freqE, setFreqE] = useState('');
  const [freqResult, setFreqResult] = useState('');
  
  const [phH, setPhH] = useState('');
  const [phResult, setPhResult] = useState('');
  
  const [molarFormula, setMolarFormula] = useState('');
  const [molarResult, setMolarResult] = useState('');
  
  const [compFormula, setCompFormula] = useState('');
  const [compResult, setCompResult] = useState(null);

  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(fadeIn, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
      Animated.spring(slideUp, { toValue: 0, useNativeDriver: true, tension: 50, friction: 7 }),
    ]).start();
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculation functions
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
    { name: 'Avogadro (Nₐ)', value: '6.022 × 10²³', unit: 'mol⁻¹', gradient: ['#00F5FF', '#0099FF'] },
    { name: 'Gas Constant (R)', value: '8.314', unit: 'J/(mol·K)', gradient: ['#00FF88', '#00CC66'] },
    { name: 'Faraday (F)', value: '96,485', unit: 'C/mol', gradient: ['#FFC059', '#FFAA00'] },
    { name: 'Planck (h)', value: '6.626 × 10⁻³⁴', unit: 'J·s', gradient: ['#B794F6', '#8B5CF6'] },
    { name: 'Speed of Light (c)', value: '3.0 × 10⁸', unit: 'm/s', gradient: ['#FF6B9D', '#FF3366'] },
    { name: 'Boltzmann (k)', value: '1.381 × 10⁻²³', unit: 'J/K', gradient: ['#00D4FF', '#0099CC'] },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.background} style={StyleSheet.absoluteFill} />

      <Animated.ScrollView
        style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['#00F5FF20', '#B794F620']}
            style={styles.headerGlow}
          />
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#00F5FF', '#B794F6']}
              style={styles.logoGradient}
            >
              <Text style={styles.logoIcon}>⚗️</Text>
            </LinearGradient>
          </View>
          <Text style={styles.title}>ChemLab Pro</Text>
          <Text style={styles.subtitle}>Advanced Chemistry Calculations</Text>
          <View style={styles.headerDivider}>
            <LinearGradient
              colors={['transparent', '#00F5FF', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.dividerGradient}
            />
          </View>
        </View>

        {/* Stoichiometry */}
        <CalculatorSection
          title="Stoichiometry"
          icon="🧮"
          gradient={['#B794F6', '#8B5CF6']}
          expanded={expandedSections.stoich}
          onToggle={() => toggleSection('stoich')}
        >
          <View style={styles.calcBox}>
            <View style={styles.formulaContainer}>
              <LinearGradient
                colors={['#B794F620', '#B794F605']}
                style={styles.formulaBg}
              >
                <Text style={styles.formula}>n = m / M</Text>
              </LinearGradient>
            </View>
            <PremiumInput
              label="Mass"
              value={molesMass}
              onChange={setMolesMass}
              placeholder="0.0"
              unit="g"
              gradient={['#B794F6', '#8B5CF6']}
            />
            <PremiumInput
              label="Molar Mass"
              value={molesMolar}
              onChange={setMolesMolar}
              placeholder="0.0"
              unit="g/mol"
              gradient={['#B794F6', '#8B5CF6']}
            />
            <TouchableOpacity onPress={calculateMoles} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#B794F6', '#8B5CF6']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="calculator" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Calculate Moles</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ResultDisplay
              result={molesResult}
              unit="mol"
              label="Moles"
              gradient={['#00FF88', '#00CC66']}
            />
          </View>

          <View style={styles.calcBox}>
            <View style={styles.formulaContainer}>
              <LinearGradient
                colors={['#B794F620', '#B794F605']}
                style={styles.formulaBg}
              >
                <Text style={styles.formula}>m = n × M</Text>
              </LinearGradient>
            </View>
            <PremiumInput
              label="Moles"
              value={massMoles}
              onChange={setMassMoles}
              placeholder="0.0"
              unit="mol"
              gradient={['#B794F6', '#8B5CF6']}
            />
            <PremiumInput
              label="Molar Mass"
              value={massMolar}
              onChange={setMassMolar}
              placeholder="0.0"
              unit="g/mol"
              gradient={['#B794F6', '#8B5CF6']}
            />
            <TouchableOpacity onPress={calculateMass} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#B794F6', '#8B5CF6']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="calculator" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Calculate Mass</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ResultDisplay
              result={massResult}
              unit="g"
              label="Mass"
              gradient={['#00FF88', '#00CC66']}
            />
          </View>
        </CalculatorSection>

        {/* Thermodynamics */}
        <CalculatorSection
          title="Thermodynamics"
          icon="🔥"
          gradient={['#FF6B9D', '#FF3366']}
          expanded={expandedSections.thermo}
          onToggle={() => toggleSection('thermo')}
        >
          <View style={styles.calcBox}>
            <View style={styles.formulaContainer}>
              <LinearGradient
                colors={['#FF6B9D20', '#FF6B9D05']}
                style={styles.formulaBg}
              >
                <Text style={styles.formula}>Q = m × c × ΔT</Text>
              </LinearGradient>
            </View>
            <PremiumInput
              label="Mass"
              value={energyMass}
              onChange={setEnergyMass}
              placeholder="0.0"
              unit="g"
              gradient={['#FF6B9D', '#FF3366']}
            />
            <PremiumInput
              label="Specific Heat"
              value={energyC}
              onChange={setEnergyC}
              placeholder="0.0"
              unit="J/g·K"
              gradient={['#FF6B9D', '#FF3366']}
            />
            <PremiumInput
              label="Temperature Change"
              value={energyDeltaT}
              onChange={setEnergyDeltaT}
              placeholder="0.0"
              unit="K"
              gradient={['#FF6B9D', '#FF3366']}
            />
            <TouchableOpacity onPress={calculateEnergy} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#FF6B9D', '#FF3366']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="fire" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Calculate Energy</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ResultDisplay
              result={energyResult}
              unit="J"
              label="Heat Energy"
              gradient={['#FFC059', '#FFAA00']}
            />
          </View>
        </CalculatorSection>

        {/* Gas Laws */}
        <CalculatorSection
          title="Ideal Gas Law"
          icon="💨"
          gradient={['#00F5FF', '#0099FF']}
          expanded={expandedSections.gas}
          onToggle={() => toggleSection('gas')}
        >
          <View style={styles.calcBox}>
            <View style={styles.formulaContainer}>
              <LinearGradient
                colors={['#00F5FF20', '#00F5FF05']}
                style={styles.formulaBg}
              >
                <Text style={styles.formula}>P = nRT / V</Text>
              </LinearGradient>
            </View>
            <PremiumInput
              label="Moles"
              value={gasN}
              onChange={setGasN}
              placeholder="0.0"
              unit="mol"
              gradient={['#00F5FF', '#0099FF']}
            />
            <PremiumInput
              label="Temperature"
              value={gasT}
              onChange={setGasT}
              placeholder="0.0"
              unit="K"
              gradient={['#00F5FF', '#0099FF']}
            />
            <PremiumInput
              label="Volume"
              value={gasV}
              onChange={setGasV}
              placeholder="0.0"
              unit="m³"
              gradient={['#00F5FF', '#0099FF']}
            />
            <TouchableOpacity onPress={calculateGas} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#00F5FF', '#0099FF']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="weather-windy" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Calculate Pressure</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ResultDisplay
              result={gasResult}
              unit="Pa"
              label="Pressure"
              gradient={['#00FF88', '#00CC66']}
            />
          </View>
        </CalculatorSection>

        {/* Quantum Chemistry */}
        <CalculatorSection
          title="Quantum Chemistry"
          icon="⚛️"
          gradient={['#00FF88', '#00CC66']}
          expanded={expandedSections.quantum}
          onToggle={() => toggleSection('quantum')}
        >
          <View style={styles.calcBox}>
            <View style={styles.formulaContainer}>
              <LinearGradient
                colors={['#00FF8820', '#00FF8805']}
                style={styles.formulaBg}
              >
                <Text style={styles.formula}>f = E / h</Text>
              </LinearGradient>
            </View>
            <PremiumInput
              label="Energy"
              value={freqE}
              onChange={setFreqE}
              placeholder="0.0"
              unit="J"
              gradient={['#00FF88', '#00CC66']}
            />
            <TouchableOpacity onPress={calculateFrequency} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#00FF88', '#00CC66']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="atom-variant" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Calculate Frequency</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ResultDisplay
              result={freqResult}
              unit="Hz"
              label="Frequency"
              gradient={['#B794F6', '#8B5CF6']}
            />
          </View>
        </CalculatorSection>

        {/* pH Calculator */}
        <CalculatorSection
          title="Acid-Base Chemistry"
          icon="💧"
          gradient={['#FFC059', '#FFAA00']}
          expanded={expandedSections.ph}
          onToggle={() => toggleSection('ph')}
        >
          <View style={styles.calcBox}>
            <View style={styles.formulaContainer}>
              <LinearGradient
                colors={['#FFC05920', '#FFC05905']}
                style={styles.formulaBg}
              >
                <Text style={styles.formula}>pH = -log₁₀[H⁺]</Text>
              </LinearGradient>
            </View>
            <PremiumInput
              label="[H⁺] Concentration"
              value={phH}
              onChange={setPhH}
              placeholder="0.0"
              unit="mol/L"
              gradient={['#FFC059', '#FFAA00']}
            />
            <TouchableOpacity onPress={calculatePh} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#FFC059', '#FFAA00']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="flask" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Calculate pH</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ResultDisplay
              result={phResult}
              unit=""
              label="pH Value"
              gradient={['#00F5FF', '#0099FF']}
            />
          </View>
        </CalculatorSection>

        {/* Molar Mass Calculator */}
        <CalculatorSection
          title="Molar Mass Calculator"
          icon="⚖️"
          gradient={['#00D4FF', '#0099CC']}
          expanded={expandedSections.molar}
          onToggle={() => toggleSection('molar')}
        >
          <View style={styles.calcBox}>
            <PremiumInput
              label="Chemical Formula"
              value={molarFormula}
              onChange={setMolarFormula}
              placeholder="e.g., H2O"
              gradient={['#00D4FF', '#0099CC']}
            />
            <TouchableOpacity onPress={calculateMolar} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#00D4FF', '#0099CC']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="scale-balance" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Calculate Molar Mass</Text>
              </LinearGradient>
            </TouchableOpacity>
            <ResultDisplay
              result={molarResult}
              unit="g/mol"
              label="Molar Mass"
              gradient={['#00FF88', '#00CC66']}
            />
          </View>
        </CalculatorSection>

        {/* Percent Composition */}
        <CalculatorSection
          title="Percent Composition"
          icon="📊"
          gradient={['#FF6B9D', '#FF3366']}
          expanded={expandedSections.comp}
          onToggle={() => toggleSection('comp')}
        >
          <View style={styles.calcBox}>
            <PremiumInput
              label="Chemical Formula"
              value={compFormula}
              onChange={setCompFormula}
              placeholder="e.g., C6H12O6"
              gradient={['#FF6B9D', '#FF3366']}
            />
            <TouchableOpacity onPress={calculateComp} activeOpacity={0.8} style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#FF6B9D', '#FF3366']}
                style={styles.button}
              >
                <MaterialCommunityIcons name="chart-pie" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Analyze Composition</Text>
              </LinearGradient>
            </TouchableOpacity>
            {compResult && (
              <View style={styles.compositionContainer}>
                <View style={styles.compositionHeader}>
                  <LinearGradient
                    colors={['#FF6B9D', '#FF3366']}
                    style={styles.compositionDot}
                  />
                  <Text style={styles.compositionTitle}>Elemental Breakdown</Text>
                </View>
                <View style={styles.compositionGrid}>
                  {compResult.map(({ elem, percent }, index) => (
                    <View key={elem} style={styles.compositionItem}>
                      <LinearGradient
                        colors={['rgba(255, 107, 157, 0.2)', 'rgba(255, 107, 157, 0.05)']}
                        style={styles.compositionItemBg}
                      >
                        <Text style={styles.compositionElem}>{elem}</Text>
                        <Text style={styles.compositionPercent}>{percent}%</Text>
                      </LinearGradient>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </CalculatorSection>

        {/* Physical Constants */}
        <GlassCard style={styles.constantsSection}>
          <View style={styles.constantsHeader}>
            <LinearGradient
              colors={['#FFC059', '#FFAA00']}
              style={styles.constantsIconGradient}
            >
              <Text style={styles.constantsIcon}>⭐</Text>
            </LinearGradient>
            <Text style={styles.constantsTitle}>Physical Constants</Text>
          </View>
          <View style={styles.constantsGrid}>
            {constants.map((constant, index) => (
              <View key={index} style={styles.constantCard}>
                <LinearGradient
                  colors={[...constant.gradient.map(c => c + '15'), constant.gradient[0] + '05']}
                  style={styles.constantCardBg}
                >
                  <Text style={styles.constantName}>{constant.name}</Text>
                  <Text style={styles.constantValue}>{constant.value}</Text>
                  <Text style={styles.constantUnit}>{constant.unit}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Clear All Button */}
        <TouchableOpacity onPress={clearAll} activeOpacity={0.8} style={styles.clearButtonWrapper}>
          <LinearGradient
            colors={['rgba(255, 107, 157, 0.2)', 'rgba(255, 107, 157, 0.05)']}
            style={styles.clearButton}
          >
            <MaterialCommunityIcons name="trash-can-outline" size={20} color="#FF6B9D" />
            <Text style={styles.clearButtonText}>Clear All Fields</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </Animated.ScrollView>
    </View>
  );
}

// ========================================
// PREMIUM STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D17',
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  headerGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 30,
    opacity: 0.3,
  },
  logoContainer: {
    marginBottom: 16,
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  logoGradient: {
    width: 88,
    height: 88,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 44,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 245, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textDim,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  headerDivider: {
    width: 100,
    height: 3,
    marginTop: 16,
  },
  dividerGradient: {
    flex: 1,
    borderRadius: 2,
  },

  // Glass Card
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  glassGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
  },
  glassBlur: {
    padding: 20,
  },

  // Section
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  sectionIconGradient: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  sectionIcon: {
    fontSize: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textBright,
    letterSpacing: 0.3,
  },
  sectionContent: {
    paddingTop: 8,
  },

  // Calc Box
  calcBox: {
    marginBottom: 20,
  },
  formulaContainer: {
    marginBottom: 20,
  },
  formulaBg: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  formula: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textBright,
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // Input
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDim,
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    padding: 18,
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '600',
  },
  unitBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 10,
  },
  unitText: {
    color: COLORS.textDim,
    fontSize: 13,
    fontWeight: '700',
  },

  // Button
  buttonWrapper: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // Result
  resultContainer: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  resultGradient: {
    padding: 1,
  },
  resultInner: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 20,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  resultDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  resultValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  resultUnit: {
    fontSize: 22,
    color: COLORS.textDim,
    fontWeight: '600',
  },

  // Composition
  compositionContainer: {
    marginTop: 20,
  },
  compositionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  compositionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  compositionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF6B9D',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  compositionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  compositionItem: {
    width: (width - 84) / 3,
    borderRadius: 14,
    overflow: 'hidden',
  },
  compositionItemBg: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 157, 0.2)',
  },
  compositionElem: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 6,
  },
  compositionPercent: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF6B9D',
  },

  // Constants
  constantsSection: {
    marginTop: 8,
    marginBottom: 20,
  },
  constantsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  constantsIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  constantsIcon: {
    fontSize: 24,
  },
  constantsTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textBright,
    letterSpacing: 0.3,
  },
  constantsGrid: {
    gap: 12,
  },
  constantCard: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  constantCardBg: {
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  constantName: {
    fontSize: 13,
    color: COLORS.textDim,
    marginBottom: 8,
    fontWeight: '600',
  },
  constantValue: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 4,
  },
  constantUnit: {
    fontSize: 12,
    color: COLORS.textDim,
    fontWeight: '600',
  },

  // Clear Button
  clearButtonWrapper: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 157, 0.3)',
  },
  clearButtonText: {
    color: '#FF6B9D',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});