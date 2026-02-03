// HomeScreen.js - PREMIUM AWARD-WINNING DESIGN
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { NotificationManager } from './NotificationManager';
import { GamificationManager } from './GamificationManager';
import { RecentToolsManager } from './RecentToolsManager';
import { getTipOfTheDay } from './ChemistryTips';
import {
  Animated, TouchableOpacity, Text, StyleSheet,
  Dimensions, View, ScrollView, Alert, Platform, Easing, TextInput
} from 'react-native';
import { BackHandler } from 'react-native';
import BannerComponent from './BannerComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import OnboardingModal, { useOnboarding } from './OnboardingModal';
import RatingModal from './RatingModal';
import { RateShareManager } from './RateShareManager';

const { width, height } = Dimensions.get('window');

// ========================================
// PREMIUM COLOR PALETTE - SCIENTIFIC & MODERN
// ========================================
const COLORS = {
  background: ['#0B0D17', '#151923', '#1A1F2E'],
  card: '#1C2333',
  cardLight: '#232B3F',
  accent1: '#00F5FF', // Cyan brilliance
  accent2: '#B794F6', // Purple luxury
  accent3: '#FF6B9D', // Pink energy
  accent4: '#FFC059', // Gold premium
  accent5: '#00FF88', // Emerald success
  text: '#FFFFFF',
  textDim: '#8B92A8',
  textBright: '#E8ECF4',
  border: 'rgba(255, 255, 255, 0.08)',
  glow: 'rgba(0, 245, 255, 0.3)',
};

// ========================================
// FEATURE DATA WITH PREMIUM COLORS
// ========================================
const quickActions = [
  { name: 'ChemistryCalculator', icon: 'calculator-variant', label: 'Calculator', gradient: ['#00F5FF', '#0099FF'], glow: '#00F5FF' },
  { name: 'QuickReference', icon: 'book-alphabet', label: 'Formulas', gradient: ['#FF6B9D', '#FF3366'], glow: '#FF6B9D' },
  { name: 'Quiz', icon: 'brain', label: 'Quiz', gradient: ['#B794F6', '#8B5CF6'], glow: '#B794F6' },
  { name: 'PeriodicTable', icon: 'table-large', label: 'Elements', gradient: ['#00FF88', '#00CC66'], glow: '#00FF88' },
];

const calculatorModules = [
  { name: 'EquationBalancer', icon: 'scale-balance', label: 'Balance Equations', desc: 'AI-powered equation balancing', gradient: ['#FF6B9D', '#FF3366'], iconBg: '#FF6B9D' },
  { name: 'Stoichiometry', icon: 'flask-outline', label: 'Stoichiometry', desc: 'Mass, mole & particle conversions', gradient: ['#00F5FF', '#0099FF'], iconBg: '#00F5FF' },
  { name: 'MassMoleNumber', icon: 'atom-variant', label: 'Mass-Mole-Number', desc: 'Universal unit converter', gradient: ['#B794F6', '#8B5CF6'], iconBg: '#B794F6' },
  { name: 'Gases', icon: 'weather-windy', label: 'Gas Laws', desc: 'PV=nRT & advanced gas calculations', gradient: ['#00FF88', '#00CC66'], iconBg: '#00FF88' },
  { name: 'SolutionChemistry', icon: 'water', label: 'Solutions', desc: 'Molarity, dilution & concentration', gradient: ['#00D4FF', '#0099CC'], iconBg: '#00D4FF' },
  { name: 'PhCalculations', icon: 'flask', label: 'pH Calculator', desc: 'Acid-base equilibrium solver', gradient: ['#FF4757', '#EE3344'], iconBg: '#FF4757' },
  { name: 'ThermoChemistry', icon: 'fire', label: 'Thermochemistry', desc: 'Enthalpy, entropy & Gibbs energy', gradient: ['#FFA502', '#FF8800'], iconBg: '#FFA502' },
  { name: 'ElectrolysisCalculations', icon: 'lightning-bolt', label: 'Electrolysis', desc: "Faraday's laws & electrochem", gradient: ['#FFC059', '#FFAA00'], iconBg: '#FFC059' },
  { name: 'NuclearChemistry', icon: 'radioactive', label: 'Nuclear', desc: 'Half-life, decay & nuclear reactions', gradient: ['#2ED573', '#1ABC54'], iconBg: '#2ED573' },
];

const learningModules = [
  { name: 'Glossary', icon: 'book-open-variant', label: 'Dictionary', gradient: ['#FFC059', '#FFAA00'] },
  { name: 'ChemistrySimulation', icon: 'flask-round-bottom', label: 'Simulations', gradient: ['#00D4FF', '#0099CC'] },
];

// ========================================
// PREMIUM ANIMATED PARTICLE SYSTEM
// ========================================
const FloatingParticle = ({ delay, x, y, size, color, duration }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      translateY.setValue(0);
      opacity.setValue(0);
      scale.setValue(0);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -height * 0.8,
            duration: duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic)
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.6, duration: 2000, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: duration - 2000, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(scale, { toValue: 1, duration: 1000, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 0.8, duration: duration - 1000, useNativeDriver: true }),
          ]),
        ])
      ]).start(() => animate());
    };
    animate();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: [{ translateY }, { scale }]
      }}
    >
      <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: size,
      }} />
    </Animated.View>
  );
};

// ========================================
// PREMIUM CIRCULAR PROGRESS WITH GLOW
// ========================================
const CircularProgress = ({ progress, level }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1500,
      useNativeDriver: false,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    ).start();
  }, [progress]);

  return (
    <Animated.View style={[styles.progressRing, { transform: [{ scale: pulseAnim }] }]}>
      <LinearGradient
        colors={['#00F5FF', '#B794F6', '#FF6B9D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.progressGradient}
      >
        <View style={styles.progressInner}>
          <Text style={styles.levelNumber}>{level}</Text>
          <Text style={styles.levelLabel}>LEVEL</Text>
          <View style={styles.levelGlow} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

// ========================================
// GLASSMORPHISM CARD COMPONENT
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
    <BlurView intensity={20} tint="dark" style={styles.glassBlur}>
      {children}
    </BlurView>
  </View>
);

// ========================================
// MAIN COMPONENT
// ========================================
const HomeScreen = ({ navigation }) => {
  const [gameState, setGameState] = useState(GamificationManager.getState());
  const { showOnboarding, setShowOnboarding } = useOnboarding();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentTools, setRecentTools] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Premium Animations
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;
  const headerScale = useRef(new Animated.Value(0.9)).current;

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: 'white-balance-sunny', color: '#FFC059' };
    if (hour < 17) return { text: 'Good Afternoon', icon: 'weather-partly-cloudy', color: '#00F5FF' };
    return { text: 'Good Evening', icon: 'moon-waning-crescent', color: '#B794F6' };
  }, []);

  useEffect(() => {
    GamificationManager.loadData();
    return GamificationManager.addListener(setGameState);
  }, []);

  useEffect(() => {
    RecentToolsManager.loadRecents();
    return RecentToolsManager.addListener(setRecentTools);
  }, []);

  // Notifications Disabled
  // useEffect(() => {
  //   NotificationManager.registerForPushNotificationsAsync();
  //   NotificationManager.scheduleDailyNotification();
  // }, []);

  useEffect(() => {
    if (gameState.xp > 0 && RateShareManager.shouldShowRatingForXP(gameState.xp)) {
      setTimeout(() => {
        RateShareManager.recordPromptShown(gameState.xp);
        setShowRatingModal(true);
      }, 2000);
    }
  }, [gameState.xp]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(fadeIn, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }),
      Animated.spring(headerScale, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }),
    ]).start();
  }, []);

  const navigateTo = useCallback((screen) => {
    if (calculatorModules.some(m => m.name === screen)) {
      RecentToolsManager.addToRecents(screen);
    }
    navigation.navigate(screen);
  }, [navigation]);

  const handleExit = () => {
    Alert.alert('Exit Chemistry Lab?', 'Your progress is saved automatically.', [
      { text: 'Stay', style: 'cancel' },
      { text: 'Exit', onPress: () => Platform.OS === 'android' && BackHandler.exitApp(), style: 'destructive' }
    ]);
  };

  const xpProgress = (gameState.xp % 500) / 500;

  const filteredModules = useMemo(() => {
    let modules = calculatorModules;

    if (searchQuery) {
      modules = modules.filter(m =>
        m.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return modules;
  }, [searchQuery, activeFilter]);

  const displayRecents = useMemo(() => {
    if (recentTools.length > 0) {
      return recentTools.slice(0, 4).map(id => calculatorModules.find(m => m.name === id)).filter(Boolean);
    }
    return calculatorModules.slice(0, 4);
  }, [recentTools]);

  return (
    <View style={styles.container}>
      <OnboardingModal visible={showOnboarding} onComplete={() => setShowOnboarding(false)} />
      <RatingModal visible={showRatingModal} onClose={() => setShowRatingModal(false)} onRated={(r) => RateShareManager.recordRatingComplete(r)} />

      {/* Premium Gradient Background */}
      <LinearGradient colors={COLORS.background} style={StyleSheet.absoluteFill} />

      {/* Advanced Particle System */}
      <View style={styles.particleContainer}>
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 800}
            x={Math.random() * width}
            y={height * 0.2 + Math.random() * (height * 0.6)}
            size={Math.random() * 4 + 2}
            color={[COLORS.accent1, COLORS.accent2, COLORS.accent3, COLORS.accent5][Math.floor(Math.random() * 4)]}
            duration={8000 + Math.random() * 4000}
          />
        ))}
      </View>

      <Animated.ScrollView
        style={{ opacity: fadeIn, transform: [{ translateY: slideUp }] }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Premium Header with Glassmorphism */}
        <Animated.View style={[styles.header, { transform: [{ scale: headerScale }] }]}>
          <View style={styles.headerContent}>
            <View>
              <View style={styles.greetingRow}>
                <LinearGradient
                  colors={[greeting.color + '40', greeting.color + '00']}
                  style={styles.greetingGlow}
                >
                  <MaterialCommunityIcons name={greeting.icon} size={20} color={greeting.color} />
                </LinearGradient>
                <Text style={styles.greetingText}>{greeting.text}</Text>
              </View>
              <Text style={styles.headerTitle}>Chemistry Lab</Text>
              <Text style={styles.headerSubtitle}>Pro Edition</Text>
            </View>

            <TouchableOpacity
              style={styles.settingsBtn}
              onPress={() => navigateTo('Settings')}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                style={styles.settingsBtnGradient}
              >
                <MaterialCommunityIcons name="cog-outline" size={24} color={COLORS.textBright} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Premium Search Bar with Glow Effect */}
        <View style={styles.searchContainer}>
          <LinearGradient
            colors={['rgba(0, 245, 255, 0.15)', 'rgba(183, 148, 246, 0.15)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.searchGradientBorder}
          >
            <View style={styles.searchInputWrapper}>
              <MaterialCommunityIcons name="magnify" size={22} color={COLORS.accent1} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search tools, formulas, elements..."
                placeholderTextColor={COLORS.textDim}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} activeOpacity={0.7}>
                  <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.textDim} />
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>
        </View>

        {!searchQuery && (
          <>
            {/* Hero Stats Card - Show-Stopping Design */}
            <GlassCard style={styles.heroCard}>
              <View style={styles.heroContent}>
                <CircularProgress progress={xpProgress} level={gameState.level} />

                <View style={styles.statsGrid}>
                  <View style={styles.statItem}>
                    <LinearGradient
                      colors={['#00F5FF20', '#00F5FF05']}
                      style={styles.statBg}
                    >
                      <Text style={styles.statValue}>{gameState.xp}</Text>
                      <Text style={styles.statLabel}>TOTAL XP</Text>
                    </LinearGradient>
                  </View>

                  <View style={styles.statDivider} />

                  <View style={styles.statItem}>
                    <LinearGradient
                      colors={['#FF6B9D20', '#FF6B9D05']}
                      style={styles.statBg}
                    >
                      <View style={styles.streakContainer}>
                        <Text style={styles.streakEmoji}>🔥</Text>
                        <Text style={styles.statValue}>{gameState.streak}</Text>
                      </View>
                      <Text style={styles.statLabel}>DAY STREAK</Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>

              {/* XP Progress Bar */}
              <View style={styles.xpProgressContainer}>
                <View style={styles.xpProgressTrack}>
                  <LinearGradient
                    colors={['#00F5FF', '#B794F6', '#FF6B9D']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.xpProgressFill, { width: `${xpProgress * 100}%` }]}
                  />
                </View>
                <Text style={styles.xpProgressText}>{gameState.xp % 500}/500 XP to Level {gameState.level + 1}</Text>
              </View>
            </GlassCard>

            {/* Premium Tip Card */}
            {(() => {
              const tip = getTipOfTheDay();
              return (
                <GlassCard style={styles.tipCard}>
                  <View style={styles.tipHeader}>
                    <View style={styles.tipIconContainer}>
                      <LinearGradient
                        colors={['#FFC059', '#FFAA00']}
                        style={styles.tipIconGradient}
                      >
                        <Text style={styles.tipIcon}>💡</Text>
                      </LinearGradient>
                    </View>
                    <View style={styles.tipTitleContainer}>
                      <Text style={styles.tipTitle}>Daily Chemistry Insight</Text>
                      <View style={styles.tipBadge}>
                        <Text style={styles.tipBadgeText}>{tip.category}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.tipContent}>{tip.tip}</Text>
                  {tip.formula && (
                    <View style={styles.tipFormula}>
                      <LinearGradient
                        colors={['rgba(0, 245, 255, 0.1)', 'rgba(183, 148, 246, 0.1)']}
                        style={styles.tipFormulaGradient}
                      >
                        <Text style={styles.tipFormulaText}>{tip.formula}</Text>
                      </LinearGradient>
                    </View>
                  )}
                </GlassCard>
              );
            })()}

            {/* Recent/Trending Tools - Premium Horizontal Scroll */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#00F5FF', '#0099FF']}
                  style={styles.sectionIconGradient}
                >
                  <MaterialCommunityIcons name="clock-fast" size={16} color="#FFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>
                  {recentTools.length > 0 ? 'Recently Used' : 'Trending Tools'}
                </Text>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recentScroll}
              >
                {displayRecents.map((item, index) => (
                  <TouchableOpacity
                    key={`recent-${index}`}
                    style={styles.recentCard}
                    onPress={() => navigateTo(item.name)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={item.gradient}
                      style={styles.recentCardGradient}
                    >
                      <View style={styles.recentCardInner}>
                        <MaterialCommunityIcons name={item.icon} size={32} color="#FFF" />
                        <Text style={styles.recentCardLabel}>{item.label}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Daily Missions - Premium Design */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#00FF88', '#00CC66']}
                  style={styles.sectionIconGradient}
                >
                  <MaterialCommunityIcons name="target" size={16} color="#FFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Daily Missions</Text>
                <View style={styles.missionBadge}>
                  <Text style={styles.missionBadgeText}>
                    {gameState.dailyTasks.filter(t => t.completed).length}/{gameState.dailyTasks.length}
                  </Text>
                </View>
              </View>

              {gameState.dailyTasks.map((task, i) => (
                <GlassCard key={i} style={styles.missionCard}>
                  <View style={styles.missionContent}>
                    <View style={[
                      styles.missionIcon,
                      { backgroundColor: task.completed ? '#00FF8820' : 'rgba(255,255,255,0.05)' }
                    ]}>
                      <MaterialCommunityIcons
                        name={task.completed ? 'check-circle' : 'flask-outline'}
                        size={22}
                        color={task.completed ? COLORS.accent5 : COLORS.textDim}
                      />
                    </View>

                    <View style={styles.missionInfo}>
                      <Text style={[styles.missionText, task.completed && styles.missionTextDone]}>
                        {task.description}
                      </Text>
                      <View style={styles.missionProgressTrack}>
                        <LinearGradient
                          colors={task.completed ? ['#00FF88', '#00CC66'] : ['#00F5FF', '#0099FF']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={[styles.missionProgressFill, {
                            width: `${Math.min((task.progress / task.target) * 100, 100)}%`
                          }]}
                        />
                      </View>
                    </View>

                    <View style={styles.missionXPBadge}>
                      <Text style={styles.missionXP}>+{task.xp}</Text>
                    </View>
                  </View>
                </GlassCard>
              ))}
            </View>

            {/* Quick Actions - Premium Grid */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#FFC059', '#FFAA00']}
                  style={styles.sectionIconGradient}
                >
                  <MaterialCommunityIcons name="lightning-bolt" size={16} color="#FFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Quick Access</Text>
              </View>

              <View style={styles.quickGrid}>
                {quickActions.map((item, index) => (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.quickCard}
                    onPress={() => navigateTo(item.name)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[...item.gradient, item.gradient[0] + '00']}
                      style={styles.quickCardGradient}
                    >
                      <View style={styles.quickCardContent}>
                        <View style={styles.quickIconContainer}>
                          <MaterialCommunityIcons name={item.icon} size={28} color="#FFF" />
                          <View style={[styles.quickGlow, { backgroundColor: item.glow }]} />
                        </View>
                        <Text style={styles.quickLabel}>{item.label}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Calculator Modules - Premium Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LinearGradient
              colors={['#B794F6', '#8B5CF6']}
              style={styles.sectionIconGradient}
            >
              <MaterialCommunityIcons name="calculator-variant" size={16} color="#FFF" />
            </LinearGradient>
            <Text style={styles.sectionTitle}>
              {searchQuery ? `Results (${filteredModules.length})` : 'All Calculators'}
            </Text>
          </View>

          {filteredModules.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              style={styles.moduleCard}
              onPress={() => navigateTo(item.name)}
              activeOpacity={0.8}
            >
              <GlassCard style={styles.moduleCardInner}>
                <View style={styles.moduleContent}>
                  <LinearGradient
                    colors={item.gradient}
                    style={styles.moduleIconGradient}
                  >
                    <MaterialCommunityIcons name={item.icon} size={26} color="#FFF" />
                  </LinearGradient>

                  <View style={styles.moduleInfo}>
                    <Text style={styles.moduleTitle}>{item.label}</Text>
                    <Text style={styles.moduleDesc}>{item.desc}</Text>
                  </View>

                  <View style={styles.moduleArrow}>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textDim} />
                  </View>
                </View>
              </GlassCard>
            </TouchableOpacity>
          ))}

          {searchQuery && filteredModules.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="flask-empty-outline" size={48} color={COLORS.textDim} />
              <Text style={styles.emptyText}>No tools found for "{searchQuery}"</Text>
              <Text style={styles.emptySubtext}>Try a different search term</Text>
            </View>
          )}
        </View>

        {!searchQuery && (
          <>
            {/* Learning Modules */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <LinearGradient
                  colors={['#FF6B9D', '#FF3366']}
                  style={styles.sectionIconGradient}
                >
                  <MaterialCommunityIcons name="school" size={16} color="#FFF" />
                </LinearGradient>
                <Text style={styles.sectionTitle}>Learning Zone</Text>
              </View>

              <View style={styles.learningGrid}>
                {learningModules.map((item) => (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.learningCard}
                    onPress={() => navigateTo(item.name)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={item.gradient}
                      style={styles.learningCardGradient}
                    >
                      <MaterialCommunityIcons name={item.icon} size={36} color="#FFF" />
                      <Text style={styles.learningLabel}>{item.label}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}

        {/* Exit Button */}
        <TouchableOpacity style={styles.exitBtn} onPress={handleExit} activeOpacity={0.8}>
          <GlassCard style={styles.exitBtnInner}>
            <MaterialCommunityIcons name="exit-to-app" size={18} color="#FF6B9D" />
            <Text style={styles.exitText}>Exit Chemistry Lab</Text>
          </GlassCard>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* Banner Ad */}
      <View style={styles.adContainer}>
        <BannerComponent />
      </View>
    </View>
  );
};

// ========================================
// PREMIUM STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D17'
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 50
  },

  // Header
  header: {
    marginBottom: 24
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6
  },
  greetingGlow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  greetingText: {
    color: COLORS.textDim,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 245, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20
  },
  headerSubtitle: {
    color: COLORS.accent1,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 2,
    textTransform: 'uppercase'
  },
  settingsBtn: {
    overflow: 'hidden',
    borderRadius: 16
  },
  settingsBtnGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },

  // Search
  searchContainer: {
    marginBottom: 24
  },
  searchGradientBorder: {
    borderRadius: 20,
    padding: 1.5
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 19,
    paddingHorizontal: 18,
    height: 56,
    gap: 12
  },
  searchInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500'
  },

  // Glass Card
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  glassGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1
  },
  glassBlur: {
    padding: 20
  },

  // Hero Card
  heroCard: {
    marginBottom: 20
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20
  },
  progressRing: {
    width: 100,
    height: 100
  },
  progressGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 4,
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20
  },
  progressInner: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  levelNumber: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '900'
  },
  levelLabel: {
    color: COLORS.textDim,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2
  },
  levelGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00F5FF',
    opacity: 0.1,
    zIndex: -1
  },
  statsGrid: {
    flex: 1,
    flexDirection: 'row',
    gap: 12
  },
  statItem: {
    flex: 1
  },
  statBg: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  statValue: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '900'
  },
  statLabel: {
    color: COLORS.textDim,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 1.5
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  streakEmoji: {
    fontSize: 20
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border
  },

  // XP Progress
  xpProgressContainer: {
    gap: 8
  },
  xpProgressTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    overflow: 'hidden'
  },
  xpProgressFill: {
    height: '100%',
    borderRadius: 4,
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8
  },
  xpProgressText: {
    color: COLORS.textDim,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center'
  },

  // Tip Card
  tipCard: {
    marginBottom: 20
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  tipIconContainer: {
    overflow: 'hidden',
    borderRadius: 12
  },
  tipIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFC059',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12
  },
  tipIcon: {
    fontSize: 24
  },
  tipTitleContainer: {
    flex: 1
  },
  tipTitle: {
    color: COLORS.textBright,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4
  },
  tipBadge: {
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)'
  },
  tipBadgeText: {
    color: COLORS.accent1,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5
  },
  tipContent: {
    color: COLORS.textBright,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500'
  },
  tipFormula: {
    marginTop: 12,
    overflow: 'hidden',
    borderRadius: 12
  },
  tipFormulaGradient: {
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.2)',
    borderRadius: 12
  },
  tipFormulaText: {
    color: COLORS.accent1,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textAlign: 'center'
  },

  // Section
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16
  },
  sectionIconGradient: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionTitle: {
    color: COLORS.textBright,
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
    letterSpacing: 0.3
  },

  // Recent Tools
  recentScroll: {
    paddingRight: 20,
    gap: 12
  },
  recentCard: {
    width: 120,
    height: 140,
    borderRadius: 20,
    overflow: 'hidden'
  },
  recentCardGradient: {
    flex: 1,
    padding: 1
  },
  recentCardInner: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  recentCardLabel: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 8
  },

  // Missions
  missionBadge: {
    backgroundColor: 'rgba(0, 255, 136, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.3)'
  },
  missionBadgeText: {
    color: COLORS.accent5,
    fontSize: 12,
    fontWeight: '800'
  },
  missionCard: {
    marginBottom: 12
  },
  missionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  missionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  missionInfo: {
    flex: 1,
    gap: 8
  },
  missionText: {
    color: COLORS.textBright,
    fontSize: 14,
    fontWeight: '600'
  },
  missionTextDone: {
    textDecorationLine: 'line-through',
    color: COLORS.textDim
  },
  missionProgressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden'
  },
  missionProgressFill: {
    height: '100%',
    borderRadius: 3
  },
  missionXPBadge: {
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.2)'
  },
  missionXP: {
    color: COLORS.accent1,
    fontSize: 13,
    fontWeight: '800'
  },

  // Quick Actions
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  quickCard: {
    width: (width - 52) / 2,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden'
  },
  quickCardGradient: {
    flex: 1,
    padding: 1
  },
  quickCardContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  quickIconContainer: {
    position: 'relative'
  },
  quickGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    top: -6,
    left: -6,
    opacity: 0.3,
    zIndex: -1
  },
  quickLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700'
  },

  // Module Cards
  moduleCard: {
    marginBottom: 12
  },
  moduleCardInner: {
    marginBottom: 0
  },
  moduleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  moduleIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  moduleInfo: {
    flex: 1
  },
  moduleTitle: {
    color: COLORS.textBright,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4
  },
  moduleDesc: {
    color: COLORS.textDim,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18
  },
  moduleArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Learning
  learningGrid: {
    flexDirection: 'row',
    gap: 12
  },
  learningCard: {
    flex: 1,
    height: 140,
    borderRadius: 20,
    overflow: 'hidden'
  },
  learningCardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 20
  },
  learningLabel: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center'
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12
  },
  emptyText: {
    color: COLORS.textDim,
    fontSize: 16,
    fontWeight: '600'
  },
  emptySubtext: {
    color: COLORS.textDim,
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.7
  },

  // Exit
  exitBtn: {
    marginTop: 8,
    marginBottom: 20
  },
  exitBtnInner: {
    marginBottom: 0
  },
  exitText: {
    color: '#FF6B9D',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center'
  },

  // Ad
  adContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border
  },
});

export default HomeScreen;