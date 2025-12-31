// HomeScreen.js - Premium Chemistry Lab Dashboard
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { NotificationManager } from './NotificationManager';
import { GamificationManager } from './GamificationManager';
import { AdManager } from './AdManager';
import {
  Animated, TouchableOpacity, Text, StyleSheet,
  Dimensions, View, ScrollView, Alert, Platform, Easing, Image
} from 'react-native';
import { BackHandler } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from './components/AdMobWrapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import OnboardingModal, { useOnboarding } from './OnboardingModal';
import RatingModal from './RatingModal';
import { RateShareManager } from './RateShareManager';

const { width, height } = Dimensions.get('window');

// ========================================
// FEATURE DATA
// ========================================
const quickActions = [
  { name: 'ChemistryCalculator', icon: 'calculator-variant', label: 'Calculator', color: '#00D9FF' },
  { name: 'QuickReference', icon: 'book-alphabet', label: 'Formulas', color: '#FF6B6B' },
  { name: 'Quiz', icon: 'brain', label: 'Quiz', color: '#A855F7' },
  { name: 'PeriodicTable', icon: 'table', label: 'Elements', color: '#00FF88' },
];

const calculatorModules = [
  { name: 'EquationBalancer', icon: 'scale-balance', label: 'Balance Equations', desc: 'Balance chemical equations', color: '#FF3366' },
  { name: 'Stoichiometry', icon: 'flask-outline', label: 'Stoichiometry', desc: 'Mass, mole, particle conversions', color: '#3B82F6' },
  { name: 'MassMoleNumber', icon: 'atom-variant', label: 'Mass-Mole-Number', desc: 'Unit conversions', color: '#8B5CF6' },
  { name: 'Gases', icon: 'weather-windy', label: 'Gas Laws', desc: 'PV=nRT calculations', color: '#10B981' },
  { name: 'SolutionChemistry', icon: 'water', label: 'Solutions', desc: 'Concentration & dilution', color: '#06B6D4' },
  { name: 'PhCalculations', icon: 'flask', label: 'pH Calculator', desc: 'Acid-base calculations', color: '#EF4444' },
  { name: 'ThermoChemistry', icon: 'fire', label: 'Thermochemistry', desc: 'Enthalpy & energy', color: '#F97316' },
  { name: 'ElectrolysisCalculations', icon: 'lightning-bolt', label: 'Electrolysis', desc: "Faraday's laws", color: '#FACC15' },
  { name: 'NuclearChemistry', icon: 'radioactive', label: 'Nuclear', desc: 'Half-life & decay', color: '#22C55E' },
];

const learningModules = [
  { name: 'Glossary', icon: 'book-open-variant', label: 'Dictionary', color: '#F59E0B' },
  { name: 'ChemistrySimulation', icon: 'flask-round-bottom', label: 'Simulations', color: '#0EA5E9' },
];

// ========================================
// ANIMATED MOLECULES COMPONENT
// ========================================
const FloatingMolecule = ({ delay, x }) => {
  const translateY = useRef(new Animated.Value(height)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(height + 50);
      rotate.setValue(0);
      opacity.setValue(0);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, { toValue: -100, duration: 15000, useNativeDriver: true }),
          Animated.timing(rotate, { toValue: 1, duration: 15000, useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.4, duration: 2000, useNativeDriver: true }),
            Animated.delay(10000),
            Animated.timing(opacity, { toValue: 0, duration: 3000, useNativeDriver: true }),
          ])
        ])
      ]).start(() => animate());
    };
    animate();
  }, []);

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={{ position: 'absolute', left: x, opacity, transform: [{ translateY }, { rotate: spin }] }}>
      <MaterialCommunityIcons name="molecule" size={24} color="#00FFCC" />
    </Animated.View>
  );
};

// ========================================
// CIRCULAR PROGRESS COMPONENT
// ========================================
const CircularProgress = ({ progress, level }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.out(Easing.cubic),
    }).start();
  }, [progress]);

  return (
    <View style={styles.progressRing}>
      <View style={styles.progressRingOuter}>
        <LinearGradient
          colors={['#00FFCC', '#00D9FF', '#A855F7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.progressRingFill, { opacity: 0.3 }]}
        />
      </View>
      <View style={styles.progressRingInner}>
        <Text style={styles.levelNumber}>{level}</Text>
        <Text style={styles.levelLabel}>LEVEL</Text>
      </View>
    </View>
  );
};

// ========================================
// MAIN COMPONENT
// ========================================
const HomeScreen = ({ navigation }) => {
  const [gameState, setGameState] = useState(GamificationManager.getState());
  const { showOnboarding, setShowOnboarding } = useOnboarding();
  const [showRatingModal, setShowRatingModal] = useState(false);

  // Animations
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;

  // Time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: 'weather-sunny' };
    if (hour < 17) return { text: 'Good Afternoon', icon: 'weather-partly-cloudy' };
    return { text: 'Good Evening', icon: 'weather-night' };
  }, []);

  // Effects
  useEffect(() => {
    // Initialize ad manager
    AdManager.initialize();

    // Load gamification data
    GamificationManager.loadData();
    return GamificationManager.addListener(setGameState);
  }, []);

  useEffect(() => {
    NotificationManager.registerForPushNotificationsAsync();
    NotificationManager.scheduleDailyNotification();
  }, []);

  useEffect(() => {
    // Check for rating milestone
    if (gameState.xp > 0 && RateShareManager.shouldShowRatingForXP(gameState.xp)) {
      setTimeout(() => {
        RateShareManager.recordPromptShown(gameState.xp);
        setShowRatingModal(true);
      }, 2000);
    }
  }, [gameState.xp]);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeIn, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideUp, { toValue: 0, duration: 600, useNativeDriver: true, easing: Easing.out(Easing.cubic) }),
    ]).start();
  }, []);

  const navigateTo = useCallback((screen) => {
    navigation.navigate(screen);
  }, [navigation]);

  const handleExit = () => {
    Alert.alert('Exit Chemistry Lab?', 'Your progress is saved automatically.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Exit', onPress: () => Platform.OS === 'android' && BackHandler.exitApp(), style: 'destructive' }
    ]);
  };

  const xpProgress = (gameState.xp % 500) / 500;

  return (
    <View style={styles.container}>
      {/* Modals */}
      <OnboardingModal visible={showOnboarding} onComplete={() => setShowOnboarding(false)} />
      <RatingModal visible={showRatingModal} onClose={() => setShowRatingModal(false)} onRated={(r) => RateShareManager.recordRatingComplete(r)} />

      {/* Background */}
      <LinearGradient colors={['#0A0F1C', '#0D1525', '#111B2E']} style={StyleSheet.absoluteFill} />

      {/* Floating molecules */}
      <View style={styles.moleculesContainer}>
        {[...Array(6)].map((_, i) => (
          <FloatingMolecule key={i} delay={i * 2500} x={Math.random() * width} />
        ))}
      </View>

      <Animated.ScrollView
        style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.greetingRow}>
              <MaterialCommunityIcons name={greeting.icon} size={20} color="#FFD700" />
              <Text style={styles.greetingText}>{greeting.text}</Text>
            </View>
            <Text style={styles.headerTitle}>Chemistry Lab</Text>
          </View>
          <TouchableOpacity style={styles.settingsBtn} onPress={() => navigateTo('Settings')}>
            <MaterialCommunityIcons name="cog-outline" size={26} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <LinearGradient colors={['#1A2235', '#151C2C']} style={styles.statsGradient}>
            <CircularProgress progress={xpProgress} level={gameState.level} />

            <View style={styles.statsInfo}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{gameState.xp}</Text>
                <Text style={styles.statLabel}>Total XP</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.streakValue}>🔥 {gameState.streak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Daily Missions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="target" size={18} color="#00FFCC" />
            <Text style={styles.sectionTitle}>Daily Missions</Text>
            <View style={styles.missionBadge}>
              <Text style={styles.missionBadgeText}>
                {gameState.dailyTasks.filter(t => t.completed).length}/{gameState.dailyTasks.length}
              </Text>
            </View>
          </View>

          {gameState.dailyTasks.map((task, i) => (
            <View key={i} style={[styles.missionCard, task.completed && styles.missionComplete]}>
              <View style={[styles.missionIcon, { backgroundColor: task.completed ? '#00FF8820' : '#FFFFFF08' }]}>
                <MaterialCommunityIcons
                  name={task.completed ? 'check-circle' : 'flask-outline'}
                  size={20}
                  color={task.completed ? '#00FF88' : '#666'}
                />
              </View>
              <View style={styles.missionContent}>
                <Text style={[styles.missionText, task.completed && styles.missionTextDone]}>{task.description}</Text>
                <View style={styles.missionProgress}>
                  <View style={[styles.missionProgressFill, { width: `${Math.min((task.progress / task.target) * 100, 100)}%` }]} />
                </View>
              </View>
              <Text style={styles.missionXP}>+{task.xp}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="lightning-bolt" size={18} color="#FFD700" />
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.quickGrid}>
            {quickActions.map((item) => (
              <TouchableOpacity key={item.name} style={styles.quickCard} onPress={() => navigateTo(item.name)} activeOpacity={0.8}>
                <View style={[styles.quickIcon, { backgroundColor: item.color + '20' }]}>
                  <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
                </View>
                <Text style={styles.quickLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Calculator Modules */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="calculator-variant" size={18} color="#A855F7" />
            <Text style={styles.sectionTitle}>Calculations</Text>
          </View>

          {calculatorModules.map((item) => (
            <TouchableOpacity key={item.name} style={styles.moduleCard} onPress={() => navigateTo(item.name)} activeOpacity={0.8}>
              <View style={[styles.moduleIcon, { backgroundColor: item.color + '15' }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleTitle}>{item.label}</Text>
                <Text style={styles.moduleDesc}>{item.desc}</Text>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={22} color="#444" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Learning */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="school" size={18} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Learning</Text>
          </View>

          <View style={styles.learningGrid}>
            {learningModules.map((item) => (
              <TouchableOpacity key={item.name} style={styles.learningCard} onPress={() => navigateTo(item.name)} activeOpacity={0.8}>
                <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
                <Text style={styles.learningLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Exit */}
        <TouchableOpacity style={styles.exitBtn} onPress={handleExit}>
          <MaterialCommunityIcons name="exit-to-app" size={18} color="#FF6B6B" />
          <Text style={styles.exitText}>Exit Lab</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Banner Ad */}
      {AdManager.shouldShowBanner('Home') && (
        <View style={styles.adContainer}>
          <BannerAd unitId={AdManager.getBannerUnitId('home')} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </View>
      )}
    </View>
  );
};

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1C' },
  moleculesContainer: { ...StyleSheet.absoluteFillObject, zIndex: 0, overflow: 'hidden' },
  scrollContent: { paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 60 : 40 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  greetingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  greetingText: { color: '#888', fontSize: 14 },
  headerTitle: { color: '#FFF', fontSize: 28, fontWeight: '800' },
  settingsBtn: { padding: 8 },

  // Stats Card
  statsCard: { marginBottom: 25, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#FFFFFF10' },
  statsGradient: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  progressRing: { width: 80, height: 80, position: 'relative' },
  progressRingOuter: { ...StyleSheet.absoluteFillObject, borderRadius: 40, overflow: 'hidden' },
  progressRingFill: { flex: 1 },
  progressRingInner: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1525', margin: 8, borderRadius: 36 },
  levelNumber: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  levelLabel: { color: '#666', fontSize: 8, letterSpacing: 2 },
  statsInfo: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginLeft: 20 },
  statBox: { alignItems: 'center' },
  statValue: { color: '#00FFCC', fontSize: 24, fontWeight: '800' },
  streakValue: { color: '#FF9500', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#666', fontSize: 11, marginTop: 4 },
  statDivider: { width: 1, height: 40, backgroundColor: '#FFFFFF15' },

  // Section
  section: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 15 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', flex: 1 },

  // Missions
  missionBadge: { backgroundColor: '#00FFCC20', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  missionBadgeText: { color: '#00FFCC', fontSize: 12, fontWeight: '700' },
  missionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF06', padding: 14, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#FFFFFF08' },
  missionComplete: { opacity: 0.6 },
  missionIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  missionContent: { flex: 1, marginLeft: 12 },
  missionText: { color: '#FFF', fontSize: 14, fontWeight: '500', marginBottom: 6 },
  missionTextDone: { textDecorationLine: 'line-through', color: '#888' },
  missionProgress: { height: 4, backgroundColor: '#FFFFFF10', borderRadius: 2, overflow: 'hidden' },
  missionProgressFill: { height: '100%', backgroundColor: '#00FFCC', borderRadius: 2 },
  missionXP: { color: '#00FF88', fontSize: 13, fontWeight: '700' },

  // Quick Actions
  quickGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  quickCard: { width: (width - 60) / 4, alignItems: 'center' },
  quickIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  quickLabel: { color: '#AAA', fontSize: 11, fontWeight: '600', textAlign: 'center' },

  // Modules
  moduleCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF06', padding: 14, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#FFFFFF08' },
  moduleIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  moduleInfo: { flex: 1, marginLeft: 14 },
  moduleTitle: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  moduleDesc: { color: '#666', fontSize: 12, marginTop: 2 },

  // Learning
  learningGrid: { flexDirection: 'row', gap: 12 },
  learningCard: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF06', paddingVertical: 20, borderRadius: 16, borderWidth: 1, borderColor: '#FFFFFF08' },
  learningLabel: { color: '#AAA', fontSize: 13, fontWeight: '600', marginTop: 8 },

  // Exit
  exitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, gap: 8 },
  exitText: { color: '#FF6B6B', fontSize: 14, fontWeight: '600' },

  // Ad
  adContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0A0F1C' },
});

export default HomeScreen;