// NuclearChemistry.js - Premium Radioactive Green Glow Theme
import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Animated, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BannerAd, BannerAdSize } from './components/AdMobWrapper';
import { generateQuestion, difficultyLevels } from './nuclearQuestionsData';
import { ShareManager } from './ShareManager';
import { AdManager } from './AdManager';
import { GamificationManager } from './GamificationManager';

const { width } = Dimensions.get('window');

// Radioactive Theme
const THEME = {
  background: '#0A0F0A',
  card: '#111A11',
  cardBorder: '#1E2E1E',
  accent: '#22C55E',
  glow: '#4ADE80',
  warning: '#FFC107',
  text: '#FFFFFF',
};

const NuclearChemistryScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [solutionsViewed, setSolutionsViewed] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    generateQuestions();
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    // Radioactive pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // Glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0.5, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const generateQuestions = () => {
    const questionTypes = ['bindingEnergy', 'decayConstant', 'halfLife', 'energyRelease', 'activity'];
    const newQuestions = [];
    for (let i = 0; i < 60; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      newQuestions.push({
        ...generateQuestion(type),
        id: i,
        bookmarked: false,
        attempted: false,
        radiation: ['α', 'β', 'γ'][Math.floor(Math.random() * 3)]
      });
    }
    setQuestions(newQuestions);
  };

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      setSolutionsViewed(prev => {
        const newCount = prev + 1;
        if (AdManager.onCalculationComplete()) {
          AdManager.showInterstitial();
        }
        GamificationManager.addXP(10);
        GamificationManager.recordAction('SOLVE', 'NuclearChemistry');
        return newCount;
      });
      setQuestions(prev => {
        const updated = [...prev];
        updated[index].attempted = true;
        return updated;
      });
    }
  };

  const bookmarkQuestion = (index) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index].bookmarked = !updated[index].bookmarked;
      return updated;
    });
  };

  const filteredQuestions = selectedDifficulty === 'all'
    ? questions
    : questions.filter(q => q.difficulty === selectedDifficulty);

  const displayedQuestions = filteredQuestions.slice(0, questionCount);

  const getDifficultyColor = (diff) => {
    const colors = { beginner: '#22C55E', intermediate: '#F59E0B', advanced: '#EF4444' };
    return colors[diff] || '#888';
  };

  const getRadiationColor = (type) => {
    const colors = { 'α': '#FF5722', 'β': '#3B82F6', 'γ': '#A855F7' };
    return colors[type] || '#888';
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0F0A', '#111A11', '#162016']} style={StyleSheet.absoluteFill} />

      <Animated.ScrollView style={{ opacity: fadeAnim }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#22C55E', '#16A34A', '#15803D']} style={styles.header}>
          <View style={styles.headerContent}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <MaterialCommunityIcons name="radioactive" size={44} color="#FFF" />
            </Animated.View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Nuclear Chemistry</Text>
              <Text style={styles.headerSubtitle}>Half-life & radioactive decay</Text>
            </View>
          </View>

          {/* Radiation Stats */}
          <View style={styles.radiationStats}>
            <View style={[styles.radStat, { borderColor: '#FF5722' }]}>
              <Text style={styles.radSymbol}>α</Text>
              <Text style={styles.radCount}>{questions.filter(q => q.radiation === 'α').length}</Text>
            </View>
            <View style={[styles.radStat, { borderColor: '#3B82F6' }]}>
              <Text style={styles.radSymbol}>β</Text>
              <Text style={styles.radCount}>{questions.filter(q => q.radiation === 'β').length}</Text>
            </View>
            <View style={[styles.radStat, { borderColor: '#A855F7' }]}>
              <Text style={styles.radSymbol}>γ</Text>
              <Text style={styles.radCount}>{questions.filter(q => q.radiation === 'γ').length}</Text>
            </View>
            <View style={[styles.radStat, { borderColor: '#FFC107' }]}>
              <Text style={styles.radSymbol}>⭐</Text>
              <Text style={styles.radCount}>{questions.filter(q => q.bookmarked).length}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Key Formulas */}
        <View style={styles.formulasBar}>
          <View style={styles.formulaItem}>
            <Text style={styles.formulaLabel}>Half-Life</Text>
            <Text style={styles.formulaText}>N = N₀(½)^(t/t½)</Text>
          </View>
          <View style={styles.formulaDivider} />
          <View style={styles.formulaItem}>
            <Text style={styles.formulaLabel}>Decay</Text>
            <Text style={styles.formulaText}>λ = ln(2)/t½</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Decay Progress</Text>
            <Text style={styles.progressValue}>{questions.filter(q => q.attempted).length}/{questions.length}</Text>
          </View>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, { width: `${(questions.filter(q => q.attempted).length / questions.length) * 100}%`, opacity: glowAnim }]} />
          </View>
        </View>

        {/* Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, selectedDifficulty === 'all' && styles.filterChipActive]}
            onPress={() => setSelectedDifficulty('all')}
          >
            <Text style={[styles.filterText, selectedDifficulty === 'all' && styles.filterTextActive]}>All Isotopes</Text>
          </TouchableOpacity>
          {Object.entries(difficultyLevels).map(([key, level]) => (
            <TouchableOpacity
              key={key}
              style={[styles.filterChip, selectedDifficulty === key && styles.filterChipActive]}
              onPress={() => setSelectedDifficulty(key)}
            >
              <Text style={[styles.filterText, selectedDifficulty === key && styles.filterTextActive]}>{level.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Questions */}
        {displayedQuestions.map((item, index) => (
          <View key={item.id} style={styles.questionCard}>
            {/* Radiation Badge */}
            <View style={[styles.radiationBadge, { backgroundColor: getRadiationColor(item.radiation) }]}>
              <Text style={styles.radiationText}>{item.radiation}</Text>
            </View>

            <TouchableOpacity style={styles.questionHeader} onPress={() => toggleExpand(index)} activeOpacity={0.8}>
              <View style={styles.questionLeft}>
                <View style={[styles.questionBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '20' }]}>
                  <Text style={[styles.questionNumber, { color: getDifficultyColor(item.difficulty) }]}>#{item.id + 1}</Text>
                </View>
                <View style={styles.questionInfo}>
                  <Text style={styles.questionType}>{item.type} • {item.isotope}</Text>
                  <Text style={styles.questionText} numberOfLines={expandedIndex === index ? 0 : 2}>{item.question}</Text>
                </View>
              </View>
              <View style={styles.questionRight}>
                <TouchableOpacity onPress={() => bookmarkQuestion(index)}>
                  <MaterialCommunityIcons name={item.bookmarked ? 'star' : 'star-outline'} size={22} color={item.bookmarked ? '#FFC107' : '#666'} />
                </TouchableOpacity>
                <Text style={styles.expandIcon}>{expandedIndex === index ? '☢️' : '⚛️'}</Text>
              </View>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={styles.solutionSection}>
                <LinearGradient colors={['#22C55E', '#16A34A']} style={styles.answerBox}>
                  <Text style={styles.answerLabel}>Result</Text>
                  <Text style={styles.answerValue}>{item.solution.answer}</Text>
                </LinearGradient>

                <View style={styles.stepsContainer}>
                  <Text style={styles.stepsTitle}>🔬 Calculation Steps</Text>
                  {item.solution.steps.map((step, i) => (
                    <View key={i} style={styles.stepRow}>
                      <View style={[styles.stepNumber, { backgroundColor: getRadiationColor(item.radiation) }]}>
                        <Text style={styles.stepNumberText}>{i + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.insightBox}>
                  <MaterialCommunityIcons name="lightning-bolt" size={18} color="#22C55E" />
                  <Text style={styles.insightText}>{item.solution.explanation}</Text>
                </View>

                <TouchableOpacity style={styles.shareBtn} onPress={() => ShareManager.shareCalculation('Nuclear Chemistry', item.question, item.solution.answer)}>
                  <MaterialCommunityIcons name="share-variant" size={18} color="#FFC107" />
                  <Text style={styles.shareBtnText}>Share Solution</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.attempted && (
              <View style={styles.attemptedBadge}>
                <MaterialCommunityIcons name="check" size={12} color="#22C55E" />
              </View>
            )}
          </View>
        ))}

        {questionCount < filteredQuestions.length && (
          <TouchableOpacity style={styles.loadMoreBtn} onPress={() => setQuestionCount(prev => Math.min(prev + 10, filteredQuestions.length))}>
            <Text style={styles.loadMoreText}>⚛️ Activate More Reactions</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.regenerateBtn} onPress={generateQuestions}>
          <MaterialCommunityIcons name="refresh" size={18} color="#888" />
          <Text style={styles.regenerateText}>Generate New Isotopes</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {AdManager.shouldShowBanner('NuclearChemistry') && (
        <View style={styles.adContainer}>
          <BannerAd unitId={AdManager.getBannerUnitId('result')} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.background },

  header: { margin: 16, borderRadius: 20, padding: 20, paddingTop: Platform.OS === 'ios' ? 50 : 20 },
  headerContent: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerText: { marginLeft: 16 },
  headerTitle: { color: '#FFF', fontSize: 26, fontWeight: '800' },
  headerSubtitle: { color: '#FFFFFF80', fontSize: 14, marginTop: 4 },

  radiationStats: { flexDirection: 'row', justifyContent: 'space-around' },
  radStat: { alignItems: 'center', backgroundColor: '#FFFFFF10', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 2 },
  radSymbol: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  radCount: { color: '#FFFFFF80', fontSize: 12, marginTop: 2 },

  formulasBar: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#22C55E20', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#22C55E40' },
  formulaItem: { flex: 1, alignItems: 'center' },
  formulaLabel: { color: '#4ADE80', fontSize: 11, fontWeight: '600', marginBottom: 4 },
  formulaText: { color: '#FFF', fontSize: 14, fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  formulaDivider: { width: 1, height: 36, backgroundColor: '#22C55E40' },

  progressCard: { marginHorizontal: 16, marginBottom: 16, backgroundColor: THEME.card, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: THEME.cardBorder },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressLabel: { color: '#22C55E', fontSize: 14, fontWeight: '600' },
  progressValue: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  progressBar: { height: 6, backgroundColor: '#FFFFFF10', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#22C55E', borderRadius: 3 },

  filterScroll: { paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  filterChip: { backgroundColor: '#FFFFFF08', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  filterChipActive: { backgroundColor: '#22C55E' },
  filterText: { color: '#888', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  questionCard: { backgroundColor: THEME.card, marginHorizontal: 16, marginBottom: 14, borderRadius: 16, borderWidth: 1, borderColor: THEME.cardBorder, overflow: 'hidden', position: 'relative' },
  radiationBadge: { position: 'absolute', top: -8, right: 20, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', zIndex: 10, borderWidth: 2, borderColor: THEME.background },
  radiationText: { color: '#FFF', fontSize: 16, fontWeight: '800' },

  questionHeader: { flexDirection: 'row', padding: 16, paddingTop: 20 },
  questionLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  questionBadge: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  questionNumber: { fontSize: 13, fontWeight: '800' },
  questionInfo: { flex: 1 },
  questionType: { color: '#22C55E', fontSize: 11, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase' },
  questionText: { color: '#FFF', fontSize: 14, lineHeight: 20 },
  questionRight: { alignItems: 'center', gap: 10 },
  expandIcon: { fontSize: 18 },

  solutionSection: { padding: 16, backgroundColor: '#0A0F0A', borderTopWidth: 1, borderTopColor: THEME.cardBorder },
  answerBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 16 },
  answerLabel: { color: '#FFFFFF80', fontSize: 12, fontWeight: '600' },
  answerValue: { color: '#FFF', fontSize: 18, fontWeight: '800' },

  stepsContainer: { backgroundColor: '#FFFFFF08', borderRadius: 12, padding: 16, marginBottom: 16 },
  stepsTitle: { color: '#22C55E', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  stepRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  stepNumber: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  stepNumberText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, color: '#CCC', fontSize: 14, lineHeight: 20 },

  insightBox: { flexDirection: 'row', backgroundColor: '#22C55E15', padding: 14, borderRadius: 10, marginBottom: 16, gap: 10, alignItems: 'flex-start' },
  insightText: { flex: 1, color: '#4ADE80', fontSize: 13, lineHeight: 18 },

  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFC10720', padding: 12, borderRadius: 10, gap: 8 },
  shareBtnText: { color: '#FFC107', fontSize: 14, fontWeight: '600' },

  attemptedBadge: { position: 'absolute', top: 8, left: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: '#22C55E30', justifyContent: 'center', alignItems: 'center' },

  loadMoreBtn: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#22C55E', marginHorizontal: 16, padding: 16, borderRadius: 12 },
  loadMoreText: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  regenerateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginTop: 12, padding: 14, gap: 8 },
  regenerateText: { color: '#888', fontSize: 14, fontWeight: '600' },

  adContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: THEME.background },
});

export default NuclearChemistryScreen;