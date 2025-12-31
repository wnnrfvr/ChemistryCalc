// StoichiometryScreen.js - Premium Balance/Scale Blue Theme
import React, { useEffect, useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Animated, Dimensions, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BannerAd, BannerAdSize } from './components/AdMobWrapper';
import { generateQuestion, difficultyLevels } from './stoichiometryQuestionsData';
import { ShareManager } from './ShareManager';
import { AdManager } from './AdManager';
import { GamificationManager } from './GamificationManager';

const { width } = Dimensions.get('window');

// Balance Blue Theme
const THEME = {
  background: '#070B14',
  card: '#0E1525',
  cardBorder: '#1A2540',
  accent: '#3B82F6',
  accentLight: '#60A5FA',
  text: '#FFFFFF',
};

const StoichiometryScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [solutionsViewed, setSolutionsViewed] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const balanceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    generateQuestions();
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    // Balance scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(balanceAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(balanceAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const generateQuestions = () => {
    const questionTypes = ['molesToMoles', 'gramsToMoles', 'gramsToGrams', 'molesToGrams', 'molecules'];
    const newQuestions = [];
    for (let i = 0; i < 50; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      newQuestions.push({
        ...generateQuestion(type),
        id: i,
        bookmarked: false,
        attempted: false,
        reactionType: ['synthesis', 'decomposition', 'combustion'][Math.floor(Math.random() * 3)]
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
        GamificationManager.recordAction('SOLVE', 'Stoichiometry');
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
    const colors = { beginner: '#10B981', intermediate: '#3B82F6', advanced: '#EF4444' };
    return colors[diff] || '#888';
  };

  const getReactionIcon = (type) => {
    const icons = { synthesis: 'plus-circle', decomposition: 'arrow-split-horizontal', combustion: 'fire' };
    return icons[type] || 'flask';
  };

  const getReactionColor = (type) => {
    const colors = { synthesis: '#10B981', decomposition: '#F59E0B', combustion: '#EF4444' };
    return colors[type] || '#3B82F6';
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#070B14', '#0E1525', '#162035']} style={StyleSheet.absoluteFill} />

      <Animated.ScrollView style={{ opacity: fadeAnim }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#3B82F6', '#2563EB', '#1D4ED8']} style={styles.header}>
          <View style={styles.headerContent}>
            <Animated.View style={{ transform: [{ rotate: balanceAnim.interpolate({ inputRange: [0, 1], outputRange: ['-5deg', '5deg'] }) }] }}>
              <MaterialCommunityIcons name="scale-balance" size={44} color="#FFF" />
            </Animated.View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Stoichiometry</Text>
              <Text style={styles.headerSubtitle}>Balance & calculate reactions</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{questions.filter(q => q.attempted).length}</Text>
              <Text style={styles.statLabel}>Solved</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>+{solutionsViewed * 10}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{questions.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Reaction Types */}
        <View style={styles.reactionTypes}>
          <View style={[styles.reactionChip, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
            <MaterialCommunityIcons name="plus-circle" size={16} color="#10B981" />
            <Text style={[styles.reactionText, { color: '#10B981' }]}>Synthesis</Text>
          </View>
          <View style={[styles.reactionChip, { backgroundColor: '#F59E0B20', borderColor: '#F59E0B' }]}>
            <MaterialCommunityIcons name="arrow-split-horizontal" size={16} color="#F59E0B" />
            <Text style={[styles.reactionText, { color: '#F59E0B' }]}>Decomp</Text>
          </View>
          <View style={[styles.reactionChip, { backgroundColor: '#EF444420', borderColor: '#EF4444' }]}>
            <MaterialCommunityIcons name="fire" size={16} color="#EF4444" />
            <Text style={[styles.reactionText, { color: '#EF4444' }]}>Combustion</Text>
          </View>
        </View>

        {/* Key Concept */}
        <View style={styles.conceptBar}>
          <Text style={styles.conceptLabel}>Mole Ratio Method</Text>
          <Text style={styles.conceptFormula}>mol A × (mol B / mol A) = mol B</Text>
        </View>

        {/* Filter */}
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
            <TouchableOpacity style={styles.questionHeader} onPress={() => toggleExpand(index)} activeOpacity={0.8}>
              <View style={styles.questionLeft}>
                <View style={[styles.reactionIcon, { backgroundColor: getReactionColor(item.reactionType) + '20' }]}>
                  <MaterialCommunityIcons name={getReactionIcon(item.reactionType)} size={20} color={getReactionColor(item.reactionType)} />
                </View>
                <View style={styles.questionInfo}>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>{item.type}</Text>
                    <View style={[styles.diffDot, { backgroundColor: getDifficultyColor(item.difficulty) }]} />
                  </View>
                  <Text style={styles.questionText} numberOfLines={expandedIndex === index ? 0 : 2}>{item.question}</Text>
                </View>
              </View>
              <View style={styles.questionRight}>
                <TouchableOpacity onPress={() => bookmarkQuestion(index)}>
                  <MaterialCommunityIcons name={item.bookmarked ? 'star' : 'star-outline'} size={22} color={item.bookmarked ? '#FACC15' : '#666'} />
                </TouchableOpacity>
                <MaterialCommunityIcons name={expandedIndex === index ? 'chevron-up' : 'chevron-down'} size={24} color="#666" />
              </View>
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={styles.solutionSection}>
                <LinearGradient colors={['#10B981', '#059669']} style={styles.answerBox}>
                  <Text style={styles.answerLabel}>Answer</Text>
                  <Text style={styles.answerValue}>{item.solution.answer}</Text>
                </LinearGradient>

                <View style={styles.stepsContainer}>
                  <Text style={styles.stepsTitle}>⚖️ Solution Steps</Text>
                  {item.solution.steps.map((step, i) => (
                    <View key={i} style={styles.stepRow}>
                      <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{i + 1}</Text>
                      </LinearGradient>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.insightBox}>
                  <MaterialCommunityIcons name="lightbulb-on" size={18} color="#3B82F6" />
                  <Text style={styles.insightText}>{item.solution.explanation}</Text>
                </View>

                <TouchableOpacity style={styles.shareBtn} onPress={() => ShareManager.shareCalculation('Stoichiometry', item.question, item.solution.answer)}>
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

        {questionCount < filteredQuestions.length && (
          <TouchableOpacity style={styles.loadMoreBtn} onPress={() => setQuestionCount(prev => Math.min(prev + 10, filteredQuestions.length))}>
            <Text style={styles.loadMoreText}>Load More</Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#FFF" />
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.regenerateBtn} onPress={generateQuestions}>
          <MaterialCommunityIcons name="refresh" size={18} color="#888" />
          <Text style={styles.regenerateText}>Generate New Questions</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {AdManager.shouldShowBanner('Stoichiometry') && (
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
  headerTitle: { color: '#FFF', fontSize: 28, fontWeight: '800' },
  headerSubtitle: { color: '#FFFFFF80', fontSize: 14, marginTop: 4 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statPill: { backgroundColor: '#FFFFFF20', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 14, alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  statLabel: { color: '#FFFFFF80', fontSize: 10, marginTop: 2 },

  reactionTypes: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginHorizontal: 16, marginBottom: 16 },
  reactionChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, gap: 6 },
  reactionText: { fontSize: 12, fontWeight: '600' },

  conceptBar: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#3B82F620', borderRadius: 14, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#3B82F640' },
  conceptLabel: { color: '#60A5FA', fontSize: 11, fontWeight: '600', marginBottom: 4 },
  conceptFormula: { color: '#FFF', fontSize: 14, fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  filterScroll: { paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  filterChip: { backgroundColor: '#FFFFFF08', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  filterChipActive: { backgroundColor: '#3B82F6' },
  filterText: { color: '#888', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  questionCard: { backgroundColor: THEME.card, marginHorizontal: 16, marginBottom: 14, borderRadius: 16, borderWidth: 1, borderColor: THEME.cardBorder, overflow: 'hidden' },
  questionHeader: { flexDirection: 'row', padding: 16 },
  questionLeft: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  reactionIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  questionInfo: { flex: 1 },
  typeBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  typeText: { color: '#3B82F6', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  diffDot: { width: 8, height: 8, borderRadius: 4 },
  questionText: { color: '#FFF', fontSize: 14, lineHeight: 20 },
  questionRight: { alignItems: 'center', gap: 10 },

  solutionSection: { padding: 16, backgroundColor: '#070B14', borderTopWidth: 1, borderTopColor: THEME.cardBorder },
  answerBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 16 },
  answerLabel: { color: '#FFFFFF80', fontSize: 12, fontWeight: '600' },
  answerValue: { color: '#FFF', fontSize: 20, fontWeight: '800' },

  stepsContainer: { backgroundColor: '#FFFFFF08', borderRadius: 12, padding: 16, marginBottom: 16 },
  stepsTitle: { color: '#3B82F6', fontSize: 14, fontWeight: '700', marginBottom: 12 },
  stepRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  stepNumber: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  stepNumberText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, color: '#CCC', fontSize: 14, lineHeight: 20 },

  insightBox: { flexDirection: 'row', backgroundColor: '#3B82F615', padding: 14, borderRadius: 10, marginBottom: 16, gap: 10, alignItems: 'flex-start' },
  insightText: { flex: 1, color: '#60A5FA', fontSize: 13, lineHeight: 18 },

  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3B82F620', padding: 12, borderRadius: 10, gap: 8 },
  shareBtnText: { color: '#3B82F6', fontSize: 14, fontWeight: '600' },

  attemptedBadge: { position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: '#10B98130', justifyContent: 'center', alignItems: 'center' },

  loadMoreBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3B82F6', marginHorizontal: 16, padding: 16, borderRadius: 12, gap: 8 },
  loadMoreText: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  regenerateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginTop: 12, padding: 14, gap: 8 },
  regenerateText: { color: '#888', fontSize: 14, fontWeight: '600' },

  adContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: THEME.background },
});

export default StoichiometryScreen;