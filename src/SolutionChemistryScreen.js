// SolutionChemistry.js - Premium Solutions Calculator with Ocean/Water Theme
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Modal, Dimensions, Animated, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BannerAd, BannerAdSize } from './components/AdMobWrapper';
import SolutionQuestionGenerator from './SolutionQuestionGenerator';
import { ShareManager } from './ShareManager';
import { AdManager } from './AdManager';
import { GamificationManager } from './GamificationManager';

const { width } = Dimensions.get('window');

// Ocean/Water Theme
const THEME = {
  background: '#071318',
  card: '#0E1E25',
  cardBorder: '#1A3040',
  accent: '#06B6D4',      // Cyan/Teal
  accentLight: '#67E8F9',
  water: '#0891B2',
  text: '#FFFFFF',
  textMuted: '#7AA',
};

const SolutionChemistry = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [solutionsViewed, setSolutionsViewed] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const generatedQuestions = SolutionQuestionGenerator.generateQuestionSet(50);
    setQuestions(generatedQuestions);
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();

    // Wave animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        Animated.timing(waveAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const questionTypes = useMemo(() => {
    const types = ['All', ...new Set(questions.map(q => q.type))];
    return types;
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    if (filterType === 'All') return questions;
    return questions.filter(q => q.type === filterType);
  }, [questions, filterType]);

  useEffect(() => {
    if (selectedQuestion) {
      Animated.spring(modalAnim, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }).start();
    } else {
      modalAnim.setValue(0);
    }
  }, [selectedQuestion]);

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return { bg: '#10B98120', color: '#10B981', icon: '💧' };
      case 'Medium': return { bg: '#06B6D420', color: '#06B6D4', icon: '🌊' };
      case 'Hard': return { bg: '#8B5CF620', color: '#8B5CF6', icon: '🌀' };
      default: return { bg: '#88888820', color: '#888', icon: '💦' };
    }
  };

  const openQuestion = (question) => {
    setSelectedQuestion(question);
    setShowSolution(false);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setShowSolution(false);
  };

  const handleShowSolution = () => {
    setShowSolution(!showSolution);

    if (!showSolution) {
      setSolutionsViewed(prev => {
        const newCount = prev + 1;
        if (AdManager.onCalculationComplete()) {
          AdManager.showInterstitial();
        }
        GamificationManager.addXP(10);
        GamificationManager.recordAction('SOLVE', 'SolutionChemistry');
        return newCount;
      });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#071318', '#0E1E25', '#132A35']} style={StyleSheet.absoluteFill} />

      <Animated.ScrollView style={{ opacity: fadeAnim }} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <LinearGradient colors={['#0891B2', '#0E7490', '#155E75']} style={styles.header}>
          <View style={styles.headerContent}>
            <Animated.View style={[styles.headerIconBox, { transform: [{ translateY: waveAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }]}>
              <MaterialCommunityIcons name="water" size={36} color="#FFF" />
            </Animated.View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Solution Chemistry</Text>
              <Text style={styles.headerSubtitle}>Concentrations, dilutions & mixtures</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="beaker-outline" size={18} color="#67E8F9" />
              <Text style={styles.statValue}>{questions.length}</Text>
              <Text style={styles.statLabel}>Problems</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="check-decagram" size={18} color="#4ADE80" />
              <Text style={styles.statValue}>{solutionsViewed}</Text>
              <Text style={styles.statLabel}>Solved</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="star-circle" size={18} color="#FACC15" />
              <Text style={styles.statValue}>+{solutionsViewed * 10}</Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Key Formulas */}
        <View style={styles.formulasSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.formulasScroll}>
            <View style={styles.formulaCard}>
              <Text style={styles.formulaTitle}>Molarity</Text>
              <Text style={styles.formulaText}>M = mol/L</Text>
            </View>
            <View style={styles.formulaCard}>
              <Text style={styles.formulaTitle}>Dilution</Text>
              <Text style={styles.formulaText}>M₁V₁ = M₂V₂</Text>
            </View>
            <View style={styles.formulaCard}>
              <Text style={styles.formulaTitle}>ppm</Text>
              <Text style={styles.formulaText}>mg/L = ppm</Text>
            </View>
          </ScrollView>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {questionTypes.map((type) => {
            const count = type === 'All' ? questions.length : questions.filter(q => q.type === type).length;
            const isActive = filterType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setFilterType(type)}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {type} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Questions */}
        <View style={styles.questionsContainer}>
          {filteredQuestions.map((question, index) => {
            const diffStyle = getDifficultyStyle(question.difficulty);
            return (
              <TouchableOpacity
                key={question.id}
                style={styles.questionCard}
                onPress={() => openQuestion(question)}
                activeOpacity={0.85}
              >
                <View style={styles.cardTop}>
                  <View style={[styles.cardIcon, { backgroundColor: '#06B6D420' }]}>
                    <Text style={styles.cardIconText}>{question.icon || '💧'}</Text>
                  </View>
                  <View style={styles.cardMeta}>
                    <Text style={styles.cardType}>{question.type}</Text>
                    <View style={[styles.diffBadge, { backgroundColor: diffStyle.bg }]}>
                      <Text style={[styles.diffText, { color: diffStyle.color }]}>
                        {diffStyle.icon} {question.difficulty}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardNumberBox}>
                    <Text style={styles.cardNumber}>#{index + 1}</Text>
                  </View>
                </View>

                <Text style={styles.questionText} numberOfLines={3}>{question.question}</Text>

                <View style={styles.cardBottom}>
                  <View style={styles.hintRow}>
                    <MaterialCommunityIcons name="lightbulb-outline" size={14} color="#06B6D4" />
                    <Text style={styles.hintText} numberOfLines={1}>{question.concept}</Text>
                  </View>
                  <View style={styles.solveIndicator}>
                    <Text style={styles.solveText}>Solve</Text>
                    <MaterialCommunityIcons name="arrow-right" size={14} color="#06B6D4" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* Solution Modal */}
      <Modal visible={selectedQuestion !== null} animationType="slide" transparent onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalAnim.interpolate({ inputRange: [0, 1], outputRange: [400, 0] }) }] }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedQuestion && (
                <>
                  {/* Modal Header */}
                  <View style={styles.modalHeader}>
                    <View style={styles.modalIconBox}>
                      <Text style={styles.modalIconText}>{selectedQuestion.icon || '💧'}</Text>
                    </View>
                    <View style={styles.modalMeta}>
                      <Text style={styles.modalType}>{selectedQuestion.type}</Text>
                      <View style={[styles.diffBadge, { backgroundColor: getDifficultyStyle(selectedQuestion.difficulty).bg }]}>
                        <Text style={[styles.diffText, { color: getDifficultyStyle(selectedQuestion.difficulty).color }]}>
                          {selectedQuestion.difficulty}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
                      <MaterialCommunityIcons name="close" size={24} color="#888" />
                    </TouchableOpacity>
                  </View>

                  {/* Problem */}
                  <View style={styles.problemBox}>
                    <Text style={styles.sectionLabel}>Problem</Text>
                    <Text style={styles.problemText}>{selectedQuestion.question}</Text>
                  </View>

                  {/* Hint */}
                  {selectedQuestion.hint && (
                    <View style={styles.hintBox}>
                      <MaterialCommunityIcons name="lightbulb" size={18} color="#FBBF24" />
                      <Text style={styles.hintBoxText}>{selectedQuestion.hint}</Text>
                    </View>
                  )}

                  {/* Show Solution Button */}
                  <TouchableOpacity style={styles.solutionBtn} onPress={handleShowSolution}>
                    <MaterialCommunityIcons name={showSolution ? 'eye-off' : 'eye'} size={20} color="#FFF" />
                    <Text style={styles.solutionBtnText}>
                      {showSolution ? 'Hide Solution' : 'Show Solution (+10 XP)'}
                    </Text>
                  </TouchableOpacity>

                  {/* Solution Content */}
                  {showSolution && (
                    <>
                      <View style={styles.stepsBox}>
                        <Text style={styles.sectionLabel}>Solution Steps</Text>
                        {selectedQuestion.solution.map((step, idx) => (
                          step.trim() !== '' && (
                            <View key={idx} style={styles.stepRow}>
                              <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.stepNum}>
                                <Text style={styles.stepNumText}>{idx + 1}</Text>
                              </LinearGradient>
                              <Text style={styles.stepText}>{step}</Text>
                            </View>
                          )
                        ))}
                      </View>

                      <LinearGradient colors={['#10B981', '#059669']} style={styles.answerBox}>
                        <Text style={styles.answerLabel}>Final Answer</Text>
                        <Text style={styles.answerValue}>{selectedQuestion.answer}</Text>
                      </LinearGradient>

                      <View style={styles.conceptBox}>
                        <MaterialCommunityIcons name="school" size={20} color="#8B5CF6" />
                        <View style={styles.conceptContent}>
                          <Text style={styles.conceptLabel}>Key Concept</Text>
                          <Text style={styles.conceptDetail}>{selectedQuestion.concept}</Text>
                        </View>
                      </View>

                      {/* Share */}
                      <TouchableOpacity
                        style={styles.shareBtn}
                        onPress={() => ShareManager.shareCalculation('Solution Chemistry', selectedQuestion.question, selectedQuestion.answer)}
                      >
                        <MaterialCommunityIcons name="share-variant" size={18} color="#3B82F6" />
                        <Text style={styles.shareBtnText}>Share Solution</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </>
              )}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      {/* Banner Ad */}
      {AdManager.shouldShowBanner('SolutionChemistry') && (
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
  headerIconBox: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#FFFFFF20', justifyContent: 'center', alignItems: 'center' },
  headerText: { marginLeft: 16, flex: 1 },
  headerTitle: { color: '#FFF', fontSize: 26, fontWeight: '800' },
  headerSubtitle: { color: '#FFFFFF80', fontSize: 14, marginTop: 4 },

  statsBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statValue: { color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 4 },
  statLabel: { color: '#FFFFFF60', fontSize: 10, marginTop: 2 },
  statDivider: { width: 1, height: 36, backgroundColor: '#FFFFFF30' },

  formulasSection: { marginBottom: 16 },
  formulasScroll: { paddingHorizontal: 16, gap: 12 },
  formulaCard: { backgroundColor: '#06B6D420', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: '#06B6D440', marginRight: 12 },
  formulaTitle: { color: '#67E8F9', fontSize: 11, fontWeight: '600', marginBottom: 4 },
  formulaText: { color: '#FFF', fontSize: 15, fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  filterScroll: { paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  filterChip: { backgroundColor: '#FFFFFF08', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  filterChipActive: { backgroundColor: '#06B6D4' },
  filterText: { color: '#888', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  questionsContainer: { paddingHorizontal: 16 },
  questionCard: { backgroundColor: THEME.card, borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: THEME.cardBorder },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  cardIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  cardIconText: { fontSize: 24 },
  cardMeta: { flex: 1, marginLeft: 12 },
  cardType: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  diffBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  diffText: { fontSize: 11, fontWeight: '700' },
  cardNumberBox: { backgroundColor: '#FFFFFF10', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  cardNumber: { color: '#06B6D4', fontSize: 12, fontWeight: '700' },

  questionText: { color: '#CCC', fontSize: 14, lineHeight: 20, marginBottom: 14 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#FFFFFF10' },
  hintRow: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 6 },
  hintText: { color: '#888', fontSize: 12, flex: 1 },
  solveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  solveText: { color: '#06B6D4', fontSize: 13, fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: THEME.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '92%', padding: 20 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  modalIconBox: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#06B6D420', justifyContent: 'center', alignItems: 'center' },
  modalIconText: { fontSize: 28 },
  modalMeta: { flex: 1, marginLeft: 14 },
  modalType: { color: '#FFF', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  closeBtn: { padding: 8 },

  problemBox: { backgroundColor: '#FFFFFF08', borderRadius: 14, padding: 16, marginBottom: 16 },
  sectionLabel: { color: '#888', fontSize: 12, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  problemText: { color: '#FFF', fontSize: 16, lineHeight: 24 },

  hintBox: { flexDirection: 'row', backgroundColor: '#FBBF2420', borderRadius: 12, padding: 14, marginBottom: 16, gap: 12, alignItems: 'flex-start' },
  hintBoxText: { flex: 1, color: '#FBBF24', fontSize: 14, lineHeight: 20 },

  solutionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#06B6D4', padding: 16, borderRadius: 14, gap: 10, marginBottom: 16 },
  solutionBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  stepsBox: { backgroundColor: '#FFFFFF08', borderRadius: 14, padding: 16, marginBottom: 16 },
  stepRow: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' },
  stepNum: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  stepNumText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, color: '#CCC', fontSize: 14, lineHeight: 22 },

  answerBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderRadius: 14, marginBottom: 16 },
  answerLabel: { color: '#FFFFFF80', fontSize: 12, fontWeight: '600' },
  answerValue: { color: '#FFF', fontSize: 20, fontWeight: '800' },

  conceptBox: { flexDirection: 'row', backgroundColor: '#8B5CF620', borderRadius: 14, padding: 16, marginBottom: 16, gap: 12 },
  conceptContent: { flex: 1 },
  conceptLabel: { color: '#8B5CF6', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  conceptDetail: { color: '#DDD', fontSize: 14, lineHeight: 20, fontStyle: 'italic' },

  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3B82F620', padding: 14, borderRadius: 12, gap: 10 },
  shareBtnText: { color: '#3B82F6', fontSize: 14, fontWeight: '600' },

  adContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: THEME.background },
});

export default SolutionChemistry;