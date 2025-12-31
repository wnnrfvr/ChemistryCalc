// PhCalc.js - Premium pH Calculator with Dark Acid-Base Theme
import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Animated, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BannerAd, BannerAdSize } from './components/AdMobWrapper';
import { generateQuestion, difficultyLevels } from './ph/phQuestionsData';
import { ShareManager } from './ShareManager';
import { AdManager } from './AdManager';
import { GamificationManager } from './GamificationManager';

const { width } = Dimensions.get('window');

// pH Theme Colors - Red (Acidic) to Blue (Basic) gradient concept
const THEME = {
  background: '#0D0F14',
  card: '#151821',
  cardBorder: '#252A35',
  accent: '#EF4444',     // Acidic red
  accentBlue: '#3B82F6', // Basic blue
  text: '#FFFFFF',
  textMuted: '#888',
};

const PhCalcScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [solutionsViewed, setSolutionsViewed] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    generateQuestions();
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const generateQuestions = () => {
    const questionTypes = ['directPH', 'hydroxidePH', 'bufferAcid', 'mixingSolutions'];
    const newQuestions = [];

    for (let i = 0; i < 50; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      newQuestions.push({
        ...generateQuestion(type),
        id: i,
        bookmarked: false,
        attempted: false
      });
    }
    setQuestions(newQuestions);
  };

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);

      // Track solution view
      setSolutionsViewed(prev => {
        const newCount = prev + 1;
        // Check if should show interstitial after 4 solutions
        if (AdManager.onCalculationComplete()) {
          AdManager.showInterstitial();
        }
        // Award XP
        GamificationManager.addXP(5);
        GamificationManager.recordAction('SOLVE', 'PhCalculations');
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

  const getDifficultyColor = (difficulty) => {
    const colors = { beginner: '#10B981', intermediate: '#F59E0B', advanced: '#EF4444' };
    return colors[difficulty] || '#888';
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0D0F14', '#151821', '#1A1F2C']} style={StyleSheet.absoluteFill} />

      <Animated.ScrollView style={{ opacity: fadeAnim }} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons name="flask" size={40} color="#FFF" />
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>pH Calculator</Text>
              <Text style={styles.headerSubtitle}>Master acid-base chemistry</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{questions.filter(q => q.attempted).length}</Text>
              <Text style={styles.statLabel}>Solved</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{questions.filter(q => q.bookmarked).length}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{questions.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </LinearGradient>

        {/* pH Scale Visual */}
        <View style={styles.phScaleContainer}>
          <LinearGradient
            colors={['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.phScale}
          >
            <Text style={styles.phScaleText}>0 ← ACIDIC</Text>
            <Text style={styles.phScaleText}>7</Text>
            <Text style={styles.phScaleText}>BASIC → 14</Text>
          </LinearGradient>
        </View>

        {/* Difficulty Filter */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            <TouchableOpacity
              style={[styles.filterChip, selectedDifficulty === 'all' && styles.filterChipActive]}
              onPress={() => setSelectedDifficulty('all')}
            >
              <Text style={[styles.filterText, selectedDifficulty === 'all' && styles.filterTextActive]}>All</Text>
            </TouchableOpacity>
            {Object.entries(difficultyLevels).map(([key, level]) => (
              <TouchableOpacity
                key={key}
                style={[styles.filterChip, selectedDifficulty === key && styles.filterChipActive, { borderColor: getDifficultyColor(key) }]}
                onPress={() => setSelectedDifficulty(key)}
              >
                <Text style={[styles.filterText, selectedDifficulty === key && styles.filterTextActive]}>{level.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Questions */}
        {displayedQuestions.map((item, index) => (
          <View key={item.id} style={styles.questionCard}>
            <TouchableOpacity style={styles.questionHeader} onPress={() => toggleExpand(index)} activeOpacity={0.8}>
              <View style={styles.questionLeft}>
                <View style={[styles.questionBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '20', borderColor: getDifficultyColor(item.difficulty) }]}>
                  <Text style={[styles.questionNumber, { color: getDifficultyColor(item.difficulty) }]}>Q{item.id + 1}</Text>
                </View>
                <View style={styles.questionInfo}>
                  <Text style={styles.questionType}>{item.type}</Text>
                  <Text style={styles.questionText} numberOfLines={expandedIndex === index ? 0 : 2}>{item.question}</Text>
                </View>
              </View>
              <View style={styles.questionRight}>
                <TouchableOpacity onPress={() => bookmarkQuestion(index)} style={styles.bookmarkBtn}>
                  <MaterialCommunityIcons name={item.bookmarked ? 'star' : 'star-outline'} size={22} color={item.bookmarked ? '#FFD700' : '#666'} />
                </TouchableOpacity>
                <MaterialCommunityIcons name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} size={24} color="#666" />
              </View>
            </TouchableOpacity>

            {/* Solution (Expanded) */}
            {expandedIndex === index && (
              <View style={styles.solutionSection}>
                {/* Answer Box */}
                <LinearGradient colors={['#10B981', '#059669']} style={styles.answerBox}>
                  <Text style={styles.answerLabel}>Answer</Text>
                  <Text style={styles.answerValue}>pH = {item.solution.answer}</Text>
                </LinearGradient>

                {/* Steps */}
                <View style={styles.stepsContainer}>
                  <Text style={styles.stepsTitle}>📋 Step-by-Step Solution</Text>
                  {item.solution.steps.map((step, i) => (
                    <View key={i} style={styles.stepRow}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{i + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>

                {/* Explanation */}
                <View style={styles.conceptBox}>
                  <MaterialCommunityIcons name="lightbulb-on" size={20} color="#F59E0B" />
                  <Text style={styles.conceptText}>{item.solution.explanation}</Text>
                </View>

                {/* Share Button */}
                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={() => ShareManager.shareCalculation('pH Calculation', item.question, `pH = ${item.solution.answer}`)}
                >
                  <MaterialCommunityIcons name="share-variant" size={18} color="#3B82F6" />
                  <Text style={styles.shareBtnText}>Share Solution</Text>
                </TouchableOpacity>
              </View>
            )}

            {item.attempted && (
              <View style={styles.attemptedBadge}>
                <MaterialCommunityIcons name="check" size={12} color="#10B981" />
              </View>
            )}
          </View>
        ))}

        {/* Load More */}
        {questionCount < filteredQuestions.length && (
          <TouchableOpacity style={styles.loadMoreBtn} onPress={() => setQuestionCount(prev => Math.min(prev + 10, filteredQuestions.length))}>
            <Text style={styles.loadMoreText}>Load More Questions</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#FFF" />
          </TouchableOpacity>
        )}

        {/* Regenerate */}
        <TouchableOpacity style={styles.regenerateBtn} onPress={generateQuestions}>
          <MaterialCommunityIcons name="refresh" size={18} color="#888" />
          <Text style={styles.regenerateText}>Generate New Questions</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Banner Ad */}
      {AdManager.shouldShowBanner('PhCalculations') && (
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
  headerText: { marginLeft: 15 },
  headerTitle: { color: '#FFF', fontSize: 26, fontWeight: '800' },
  headerSubtitle: { color: '#FFFFFF99', fontSize: 14, marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statPill: { backgroundColor: '#FFFFFF20', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  statLabel: { color: '#FFFFFF99', fontSize: 11, marginTop: 2 },

  phScaleContainer: { marginHorizontal: 16, marginBottom: 20 },
  phScale: { height: 36, borderRadius: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 },
  phScaleText: { color: '#FFF', fontSize: 11, fontWeight: '700' },

  filterSection: { marginBottom: 15 },
  filterScroll: { paddingHorizontal: 16, gap: 10 },
  filterChip: { backgroundColor: '#FFFFFF08', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#FFFFFF20' },
  filterChipActive: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  filterText: { color: '#888', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  questionCard: { backgroundColor: THEME.card, marginHorizontal: 16, marginBottom: 12, borderRadius: 16, borderWidth: 1, borderColor: THEME.cardBorder, overflow: 'hidden' },
  questionHeader: { flexDirection: 'row', padding: 16 },
  questionLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  questionBadge: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginRight: 12 },
  questionNumber: { fontSize: 13, fontWeight: '800' },
  questionInfo: { flex: 1 },
  questionType: { color: '#EF4444', fontSize: 11, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase' },
  questionText: { color: '#FFF', fontSize: 14, lineHeight: 20 },
  questionRight: { alignItems: 'center', gap: 8 },
  bookmarkBtn: { padding: 4 },

  solutionSection: { padding: 16, backgroundColor: '#0D0F14', borderTopWidth: 1, borderTopColor: THEME.cardBorder },
  answerBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 16 },
  answerLabel: { color: '#FFFFFF99', fontSize: 12, fontWeight: '600' },
  answerValue: { color: '#FFF', fontSize: 22, fontWeight: '800' },

  stepsContainer: { backgroundColor: '#FFFFFF08', borderRadius: 12, padding: 16, marginBottom: 16 },
  stepsTitle: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  stepRow: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  stepNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  stepNumberText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, color: '#CCC', fontSize: 14, lineHeight: 20 },

  conceptBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#F59E0B15', padding: 14, borderRadius: 10, marginBottom: 16, gap: 10 },
  conceptText: { flex: 1, color: '#F59E0B', fontSize: 13, lineHeight: 18 },

  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3B82F615', padding: 12, borderRadius: 10, gap: 8 },
  shareBtnText: { color: '#3B82F6', fontSize: 14, fontWeight: '600' },

  attemptedBadge: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: '#10B98130', justifyContent: 'center', alignItems: 'center' },

  loadMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EF4444', marginHorizontal: 16, padding: 16, borderRadius: 12, gap: 8 },
  loadMoreText: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  regenerateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginTop: 12, padding: 14, gap: 8 },
  regenerateText: { color: '#888', fontSize: 14, fontWeight: '600' },

  adContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: THEME.background },
});

export default PhCalcScreen;