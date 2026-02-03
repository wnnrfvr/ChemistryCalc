import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Animated, Modal, Easing, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { ShareManager } from './ShareManager';
import { GamificationManager } from './GamificationManager';
import { useAds } from './AdsContext';

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
// GLASSMORPHISM CARD
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

// ========================================
// ANIMATED PARTICLES
// ========================================
const FloatingAtom = ({ delay, x, color }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(0);
      opacity.setValue(0);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -300,
            duration: 8000,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic)
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.4, duration: 1500, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 6500, useNativeDriver: true }),
          ]),
        ])
      ]).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View style={[styles.atom, { left: x, opacity, transform: [{ translateY }] }]}>
      <View style={[styles.atomCore, { backgroundColor: color }]} />
    </Animated.View>
  );
};

// ========================================
// MOCK BALANCER (Replace with real algorithm)
// ========================================
const mockBalance = (eq) => {
  // Simplified mock - replace with actual Gaussian elimination
  return {
    equation: "2" + eq.replace(/=|->/, '-> 2'),
    steps: [
      "1. Identify all elements on both sides of equation",
      "2. Set up system of linear equations for each element",
      "3. Apply Gaussian elimination to solve coefficients",
      "4. Reduce to lowest whole number ratios",
      "5. Verify conservation of mass"
    ]
  };
};

// ========================================
// MAIN COMPONENT
// ========================================
const EquationBalancerScreen = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState(null);
  const [showSteps, setShowSteps] = useState(false);
  const [isBalancing, setIsBalancing] = useState(false);

  const { showRewarded } = useAds();

  // Animations
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(fadeIn, { toValue: 1, useNativeDriver: true, tension: 50, friction: 7 }),
      Animated.spring(slideUp, { toValue: 0, useNativeDriver: true, tension: 50, friction: 7 }),
    ]).start();

    // Pulse animation for balance button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.02, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const balanceEquation = () => {
    if (!input.trim()) return;

    setIsBalancing(true);

    setTimeout(() => {
      try {
        const balanced = mockBalance(input);
        setResult(balanced.equation);
        setSteps(balanced.steps);
        setShowSteps(false);
        setIsBalancing(false);
        GamificationManager.recordAction('BALANCE_EQUATION', 'EquationBalancer');
      } catch (e) {
        setResult("Error: Could not balance. Check format.");
        setSteps([]);
        setIsBalancing(false);
      }
    }, 1200); // Simulate processing time
  };

  const unlockSteps = async () => {
    const rewarded = await showRewarded((xp) => {
      if (xp) GamificationManager.addXP(xp);
    });

    if (rewarded) {
      setShowSteps(true);
    } else {
      setShowSteps(true); // Fallback
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={COLORS.background} style={StyleSheet.absoluteFill} />

      {/* Floating Atoms */}
      <View style={styles.particleContainer}>
        {[...Array(8)].map((_, i) => (
          <FloatingAtom
            key={i}
            delay={i * 1000}
            x={Math.random() * width}
            color={[COLORS.accent1, COLORS.accent2, COLORS.accent3, COLORS.accent5][i % 4]}
          />
        ))}
      </View>

      <Animated.ScrollView
        style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <LinearGradient
              colors={['#00F5FF', '#B794F6']}
              style={styles.logoGradient}
            >
              <MaterialCommunityIcons name="scale-balance" size={32} color="#FFF" />
            </LinearGradient>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Equation Balancer</Text>
              <Text style={styles.headerSubtitle}>AI-Powered Chemistry</Text>
            </View>
            <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.helpButton}>
              <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.helpButtonGradient}
              >
                <MaterialCommunityIcons name="help-circle-outline" size={24} color={COLORS.accent1} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Input Section */}
        <GlassCard style={styles.inputSection}>
          <Text style={styles.inputLabel}>Chemical Equation</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="e.g. H2 + O2 -> H2O"
              placeholderTextColor={COLORS.textDim}
              value={input}
              onChangeText={setInput}
              multiline
              numberOfLines={2}
            />
          </View>

          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={styles.balanceButtonWrapper}
              onPress={balanceEquation}
              activeOpacity={0.8}
              disabled={isBalancing}
            >
              <LinearGradient
                colors={['#00F5FF', '#B794F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.balanceButton}
              >
                {isBalancing ? (
                  <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons name="loading" size={24} color="#FFF" />
                    <Text style={styles.buttonText}>Balancing...</Text>
                  </View>
                ) : (
                  <>
                    <MaterialCommunityIcons name="chemistry-flask" size={24} color="#FFF" />
                    <Text style={styles.buttonText}>Balance Equation</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </GlassCard>

        {/* Format Tips */}
        <GlassCard style={styles.tipCard} gradient={['rgba(0, 245, 255, 0.05)', 'rgba(183, 148, 246, 0.05)']}>
          <View style={styles.tipHeader}>
            <LinearGradient
              colors={['#FFC059', '#FFAA00']}
              style={styles.tipIconGradient}
            >
              <MaterialCommunityIcons name="lightbulb-on" size={20} color="#FFF" />
            </LinearGradient>
            <Text style={styles.tipTitle}>Quick Tip</Text>
          </View>
          <Text style={styles.tipText}>
            Use '=' or {'->'} to separate reactants and products. Elements are case-sensitive: Co (Cobalt) ≠ CO (Carbon Monoxide)
          </Text>
        </GlassCard>

        {/* Result Section */}
        {result && (
          <GlassCard style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <LinearGradient
                colors={['#00FF88', '#00CC66']}
                style={styles.resultBadge}
              >
                <MaterialCommunityIcons name="check-circle" size={16} color="#FFF" />
                <Text style={styles.resultBadgeText}>Balanced</Text>
              </LinearGradient>
            </View>

            <View style={styles.resultContent}>
              <Text style={styles.resultLabel}>Balanced Equation</Text>
              <View style={styles.equationBox}>
                <LinearGradient
                  colors={['rgba(0, 245, 255, 0.1)', 'rgba(183, 148, 246, 0.1)']}
                  style={styles.equationBg}
                >
                  <Text style={styles.equationText}>{result}</Text>
                </LinearGradient>
              </View>
            </View>

            {/* Steps Section */}
            {!showSteps ? (
              <TouchableOpacity
                style={styles.unlockButtonWrapper}
                onPress={unlockSteps}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 192, 89, 0.2)', 'rgba(255, 192, 89, 0.05)']}
                  style={styles.unlockButton}
                >
                  <MaterialCommunityIcons name="play-circle-outline" size={22} color={COLORS.accent4} />
                  <Text style={styles.unlockText}>Watch Ad to Show Steps</Text>
                  <View style={styles.unlockBadge}>
                    <Text style={styles.unlockBadgeText}>+10 XP</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <View style={styles.stepsContainer}>
                <View style={styles.stepsHeader}>
                  <LinearGradient
                    colors={['#B794F6', '#8B5CF6']}
                    style={styles.stepsBadge}
                  >
                    <MaterialCommunityIcons name="stairs" size={16} color="#FFF" />
                    <Text style={styles.stepsBadgeText}>Step-by-Step</Text>
                  </LinearGradient>
                </View>
                {steps && steps.map((step, i) => (
                  <View key={i} style={styles.stepItem}>
                    <View style={styles.stepNumber}>
                      <LinearGradient
                        colors={['#B794F6', '#8B5CF6']}
                        style={styles.stepNumberGradient}
                      >
                        <Text style={styles.stepNumberText}>{i + 1}</Text>
                      </LinearGradient>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Share Button */}
            <TouchableOpacity
              style={styles.shareButtonWrapper}
              onPress={() => ShareManager.shareBalancedEquation(input, result)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['rgba(0, 245, 255, 0.15)', 'rgba(183, 148, 246, 0.15)']}
                style={styles.shareButton}
              >
                <MaterialCommunityIcons name="share-variant" size={20} color={COLORS.accent1} />
                <Text style={styles.shareText}>Share Result</Text>
              </LinearGradient>
            </TouchableOpacity>
          </GlassCard>
        )}

        {/* Examples Section */}
        <GlassCard style={styles.examplesCard}>
          <View style={styles.examplesHeader}>
            <LinearGradient
              colors={['#FF6B9D', '#FF3366']}
              style={styles.examplesIconGradient}
            >
              <MaterialCommunityIcons name="school" size={20} color="#FFF" />
            </LinearGradient>
            <Text style={styles.examplesTitle}>Example Equations</Text>
          </View>

          {[
            'H2 + O2 -> H2O',
            'CH4 + O2 -> CO2 + H2O',
            'Fe + O2 -> Fe2O3',
            'C6H12O6 + O2 -> CO2 + H2O'
          ].map((example, i) => (
            <TouchableOpacity
              key={i}
              style={styles.exampleItem}
              onPress={() => setInput(example)}
              activeOpacity={0.7}
            >
              <Text style={styles.exampleText}>{example}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.textDim} />
            </TouchableOpacity>
          ))}
        </GlassCard>

        <View style={{ height: 40 }} />
      </Animated.ScrollView>

      {/* Help Modal */}
      <Modal
        visible={showHelp}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHelp(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <GlassCard style={styles.helpCard}>
              <View style={styles.helpHeader}>
                <LinearGradient
                  colors={['#00F5FF', '#B794F6']}
                  style={styles.helpIconGradient}
                >
                  <MaterialCommunityIcons name="information" size={24} color="#FFF" />
                </LinearGradient>
                <Text style={styles.helpTitle}>Formatting Guide</Text>
              </View>

              <View style={styles.helpContent}>
                <View style={styles.helpItem}>
                  <View style={styles.helpBullet}>
                    <LinearGradient colors={['#00FF88', '#00CC66']} style={styles.bulletGradient} />
                  </View>
                  <Text style={styles.helpText}>
                    <Text style={styles.helpTextBold}>Case Sensitive:</Text> "Co" is Cobalt, "CO" is Carbon Monoxide
                  </Text>
                </View>

                <View style={styles.helpItem}>
                  <View style={styles.helpBullet}>
                    <LinearGradient colors={['#00F5FF', '#0099FF']} style={styles.bulletGradient} />
                  </View>
                  <Text style={styles.helpText}>
                    <Text style={styles.helpTextBold}>Operators:</Text> Use '+' to add compounds, '=' or {'->'} to separate sides
                  </Text>
                </View>

                <View style={styles.helpItem}>
                  <View style={styles.helpBullet}>
                    <LinearGradient colors={['#FFC059', '#FFAA00']} style={styles.bulletGradient} />
                  </View>
                  <Text style={styles.helpText}>
                    <Text style={styles.helpTextBold}>Subscripts:</Text> Use numbers directly after elements (H2O, not H₂O)
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setShowHelp(false)}
                activeOpacity={0.8}
                style={styles.closeButtonWrapper}
              >
                <LinearGradient
                  colors={['#00F5FF', '#B794F6']}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Got It!</Text>
                </LinearGradient>
              </TouchableOpacity>
            </GlassCard>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ========================================
// PREMIUM STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D17',
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  atom: {
    position: 'absolute',
    top: '100%',
  },
  atomCore: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
  },

  // Header
  header: {
    marginBottom: 28,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoGradient: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDim,
    letterSpacing: 0.5,
  },
  helpButton: {
    overflow: 'hidden',
    borderRadius: 14,
  },
  helpButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
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
    opacity: 0.1,
  },
  glassBlur: {
    padding: 20,
  },

  // Input Section
  inputSection: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDim,
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 18,
  },
  input: {
    padding: 18,
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '600',
    minHeight: 80,
  },
  balanceButtonWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  balanceButton: {
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
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  // Tip Card
  tipCard: {
    marginBottom: 16,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  tipIconGradient: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textBright,
    letterSpacing: 0.3,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.textDim,
    lineHeight: 22,
    fontWeight: '500',
  },

  // Result Card
  resultCard: {
    marginBottom: 16,
  },
  resultHeader: {
    marginBottom: 16,
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  resultBadgeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  resultContent: {
    marginBottom: 16,
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.textDim,
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  equationBox: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  equationBg: {
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.2)',
  },
  equationText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // Unlock Steps
  unlockButtonWrapper: {
    marginBottom: 16,
    borderRadius: 14,
    overflow: 'hidden',
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 192, 89, 0.3)',
  },
  unlockText: {
    color: COLORS.accent4,
    fontSize: 14,
    fontWeight: '700',
  },
  unlockBadge: {
    backgroundColor: 'rgba(255, 192, 89, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unlockBadgeText: {
    color: COLORS.accent4,
    fontSize: 11,
    fontWeight: '800',
  },

  // Steps
  stepsContainer: {
    marginBottom: 16,
  },
  stepsHeader: {
    marginBottom: 14,
  },
  stepsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  stepsBadgeText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  stepItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNumber: {
    marginTop: 2,
  },
  stepNumberGradient: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '800',
  },
  stepText: {
    flex: 1,
    color: COLORS.textBright,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    paddingTop: 4,
  },

  // Share Button
  shareButtonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  shareText: {
    color: COLORS.accent1,
    fontSize: 14,
    fontWeight: '700',
  },

  // Examples
  examplesCard: {
    marginBottom: 16,
  },
  examplesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  examplesIconGradient: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  examplesTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textBright,
    letterSpacing: 0.3,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  exampleText: {
    color: COLORS.textBright,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
  },
  helpCard: {
    marginBottom: 0,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  helpIconGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  helpContent: {
    marginBottom: 20,
  },
  helpItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  helpBullet: {
    marginTop: 4,
  },
  bulletGradient: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  helpText: {
    flex: 1,
    color: COLORS.textDim,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  helpTextBold: {
    color: COLORS.textBright,
    fontWeight: '700',
  },
  closeButtonWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  closeButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

export default EquationBalancerScreen;