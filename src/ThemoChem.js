// ThemoChem.js - Premium Thermochemistry with Fire/Energy Theme
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Modal, Dimensions, Animated, Platform
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BannerAd, BannerAdSize } from './components/AdMobWrapper';
import QuestionGenerator from './QuestionGenerator';
import { ShareManager } from './ShareManager';
import { AdManager } from './AdManager';
import { GamificationManager } from './GamificationManager';

const { width } = Dimensions.get('window');

// Fire/Energy Theme
const THEME = {
  background: '#0D0A0F',
  card: '#1A1520',
  cardBorder: '#2D2535',
  accent: '#F97316',     // Orange fire
  accentLight: '#FDBA74',
  text: '#FFFFFF',
  textMuted: '#888',
};

const ThermoChemistry = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [solutionsViewed, setSolutionsViewed] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const generatedQuestions = QuestionGenerator.generateQuestionSet(50);
    const normalizedQuestions = generatedQuestions.map(q => {
      // 1. Ensure solution is an array
      const solutionArray = Array.isArray(q.solution)
        ? q.solution
        : (q.solution ? q.solution.split('\n').filter(s => s.trim() !== '') : []);

      // 2. Derive answer if missing
      let finalAnswer = q.answer;
      if (!finalAnswer && q.options && q.correctOptionId) {
        const correctOpt = q.options.find(o => o.id === q.correctOptionId);
        if (correctOpt) finalAnswer = correctOpt.text;
      }

      // 3. Derive concept if missing
      const finalConcept = q.concept || q.topic || 'General Chemistry';

      return {
        ...q,
        solution: solutionArray,
        answer: finalAnswer,
        concept: finalConcept
      };
    });
    setQuestions(normalizedQuestions);
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
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
      case 'Easy': return { bg: '#10B98120', color: '#10B981', icon: '🌱' };
      case 'Medium': return { bg: '#F59E0B20', color: '#F59E0B', icon: '🔥' };
      case 'Hard': return { bg: '#EF444420', color: '#EF4444', icon: '💥' };
      default: return { bg: '#88888820', color: '#888', icon: '📝' };
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
        GamificationManager.recordAction('SOLVE', 'ThermoChemistry');
        return newCount;
      });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0D0A0F', '#1A1520', '#251E2A']} style={StyleSheet.absoluteFill} />

      <Animated.ScrollView style={{ opacity: fadeAnim }} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <LinearGradient colors={['#F97316', '#EA580C', '#DC2626']} style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerIcon}>
              <MaterialCommunityIcons name="fire" size={36} color="#FFF" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Thermochemistry</Text>
              <Text style={styles.headerSubtitle}>Energy in chemical reactions</Text>
            </View>
          </View>

          {/* Energy Stats */}
          <View style={styles.energyStats}>
            <View style={styles.energyStat}>
              <MaterialCommunityIcons name="lightning-bolt" size={20} color="#FBBF24" />
              <Text style={styles.energyValue}>{questions.length}</Text>
              <Text style={styles.energyLabel}>Problems</Text>
            </View>
            <View style={styles.energyDivider} />
            <View style={styles.energyStat}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#4ADE80" />
              <Text style={styles.energyValue}>{solutionsViewed}</Text>
              <Text style={styles.energyLabel}>Solved</Text>
            </View>
            <View style={styles.energyDivider} />
            <View style={styles.energyStat}>
              <MaterialCommunityIcons name="star" size={20} color="#FACC15" />
              <Text style={styles.energyValue}>+{solutionsViewed * 10}</Text>
              <Text style={styles.energyLabel}>XP Earned</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Formula Bar */}
        <View style={styles.formulaBar}>
          <Text style={styles.formulaText}>ΔH = ΣH(products) - ΣH(reactants)</Text>
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

        {/* Questions List */}
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
                <View style={styles.cardHeader}>
                  <View style={[styles.iconBox, { backgroundColor: question.color + '20' }]}>
                    <Text style={styles.cardIcon}>{question.icon}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardType}>{question.type}</Text>
                    <View style={[styles.diffBadge, { backgroundColor: diffStyle.bg }]}>
                      <Text style={[styles.diffText, { color: diffStyle.color }]}>
                        {diffStyle.icon} {question.difficulty}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardNumber}>
                    <Text style={styles.cardNumberText}>#{index + 1}</Text>
                  </View>
                </View>

                <Text style={styles.questionPreview} numberOfLines={3}>{question.question}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.conceptHint}>
                    <MaterialCommunityIcons name="lightbulb-outline" size={14} color="#F59E0B" />
                    <Text style={styles.conceptText} numberOfLines={1}>{question.concept}</Text>
                  </View>
                  <View style={styles.solveBtn}>
                    <Text style={styles.solveBtnText}>Solve</Text>
                    <MaterialCommunityIcons name="arrow-right" size={16} color="#F97316" />
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
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: modalAnim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] }) }] }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedQuestion && (
                <>
                  {/* Modal Header */}
                  <View style={styles.modalHeader}>
                    <View style={[styles.modalIcon, { backgroundColor: selectedQuestion.color + '20' }]}>
                      <Text style={styles.modalIconText}>{selectedQuestion.icon}</Text>
                    </View>
                    <View style={styles.modalHeaderText}>
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

                  {/* Question */}
                  <View style={styles.problemSection}>
                    <Text style={styles.sectionLabel}>Problem</Text>
                    <Text style={styles.problemText}>{selectedQuestion.question}</Text>
                  </View>

                  {/* Hint */}
                  {selectedQuestion.hint && (
                    <View style={styles.hintBox}>
                      <MaterialCommunityIcons name="lightbulb" size={18} color="#FBBF24" />
                      <Text style={styles.hintText}>{selectedQuestion.hint}</Text>
                    </View>
                  )}

                  {/* Show Solution Button */}
                  <TouchableOpacity style={styles.solutionBtn} onPress={handleShowSolution}>
                    <MaterialCommunityIcons name={showSolution ? 'eye-off' : 'eye'} size={20} color="#FFF" />
                    <Text style={styles.solutionBtnText}>
                      {showSolution ? 'Hide Solution' : 'Show Solution (+10 XP)'}
                    </Text>
                  </TouchableOpacity>

                  {/* Solution */}
                  {showSolution && (
                    <>
                      <View style={styles.stepsSection}>
                        <Text style={styles.sectionLabel}>Solution Steps</Text>
                        {selectedQuestion.solution.map((step, idx) => (
                          step.trim() !== '' && (
                            <View key={idx} style={styles.stepRow}>
                              <LinearGradient colors={['#F97316', '#EA580C']} style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>{idx + 1}</Text>
                              </LinearGradient>
                              <Text style={styles.stepText}>{step}</Text>
                            </View>
                          )
                        ))}
                      </View>

                      <LinearGradient colors={['#10B981', '#059669']} style={styles.answerSection}>
                        <Text style={styles.answerLabel}>Final Answer</Text>
                        <Text style={styles.answerValue}>{selectedQuestion.answer}</Text>
                      </LinearGradient>

                      <View style={styles.conceptSection}>
                        <MaterialCommunityIcons name="school" size={20} color="#A855F7" />
                        <View style={styles.conceptContent}>
                          <Text style={styles.conceptLabel}>Key Concept</Text>
                          <Text style={styles.conceptDetail}>{selectedQuestion.concept}</Text>
                        </View>
                      </View>

                      {/* Share */}
                      <TouchableOpacity
                        style={styles.shareBtn}
                        onPress={() => ShareManager.shareCalculation('Thermochemistry', selectedQuestion.question, selectedQuestion.answer)}
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
      {AdManager.shouldShowBanner('ThermoChemistry') && (
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
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerIcon: { width: 60, height: 60, borderRadius: 16, backgroundColor: '#FFFFFF20', justifyContent: 'center', alignItems: 'center' },
  headerText: { marginLeft: 16, flex: 1 },
  headerTitle: { color: '#FFF', fontSize: 26, fontWeight: '800' },
  headerSubtitle: { color: '#FFFFFF80', fontSize: 14, marginTop: 4 },

  energyStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  energyStat: { alignItems: 'center' },
  energyValue: { color: '#FFF', fontSize: 20, fontWeight: '800', marginTop: 4 },
  energyLabel: { color: '#FFFFFF80', fontSize: 11, marginTop: 2 },
  energyDivider: { width: 1, height: 40, backgroundColor: '#FFFFFF30' },

  formulaBar: { marginHorizontal: 16, marginBottom: 16, backgroundColor: '#F9731620', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#F9731640' },
  formulaText: { color: '#FDBA74', fontSize: 14, fontWeight: '600', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  filterScroll: { paddingHorizontal: 16, paddingBottom: 16, gap: 10 },
  filterChip: { backgroundColor: '#FFFFFF08', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  filterChipActive: { backgroundColor: '#F97316' },
  filterText: { color: '#888', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  questionsContainer: { paddingHorizontal: 16 },
  questionCard: { backgroundColor: THEME.card, borderRadius: 16, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: THEME.cardBorder },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  iconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  cardIcon: { fontSize: 24 },
  cardInfo: { flex: 1, marginLeft: 12 },
  cardType: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  diffBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  diffText: { fontSize: 11, fontWeight: '700' },
  cardNumber: { backgroundColor: '#FFFFFF10', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  cardNumberText: { color: '#F97316', fontSize: 12, fontWeight: '700' },

  questionPreview: { color: '#CCC', fontSize: 14, lineHeight: 20, marginBottom: 14 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#FFFFFF10' },
  conceptHint: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 6 },
  conceptText: { color: '#888', fontSize: 12, flex: 1 },
  solveBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  solveBtnText: { color: '#F97316', fontSize: 13, fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: THEME.card, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '92%', padding: 20 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  modalIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  modalIconText: { fontSize: 28 },
  modalHeaderText: { flex: 1, marginLeft: 14 },
  modalType: { color: '#FFF', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  closeBtn: { padding: 8 },

  problemSection: { backgroundColor: '#FFFFFF08', borderRadius: 14, padding: 16, marginBottom: 16 },
  sectionLabel: { color: '#888', fontSize: 12, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  problemText: { color: '#FFF', fontSize: 16, lineHeight: 24 },

  hintBox: { flexDirection: 'row', backgroundColor: '#FBBF2420', borderRadius: 12, padding: 14, marginBottom: 16, gap: 12, alignItems: 'flex-start' },
  hintText: { flex: 1, color: '#FBBF24', fontSize: 14, lineHeight: 20 },

  solutionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F97316', padding: 16, borderRadius: 14, gap: 10, marginBottom: 16 },
  solutionBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  stepsSection: { backgroundColor: '#FFFFFF08', borderRadius: 14, padding: 16, marginBottom: 16 },
  stepRow: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' },
  stepNumber: { width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  stepNumberText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  stepText: { flex: 1, color: '#CCC', fontSize: 14, lineHeight: 22 },

  answerSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderRadius: 14, marginBottom: 16 },
  answerLabel: { color: '#FFFFFF80', fontSize: 12, fontWeight: '600' },
  answerValue: { color: '#FFF', fontSize: 20, fontWeight: '800' },

  conceptSection: { flexDirection: 'row', backgroundColor: '#A855F720', borderRadius: 14, padding: 16, marginBottom: 16, gap: 12 },
  conceptContent: { flex: 1 },
  conceptLabel: { color: '#A855F7', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  conceptDetail: { color: '#DDD', fontSize: 14, lineHeight: 20, fontStyle: 'italic' },

  shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#3B82F620', padding: 14, borderRadius: 12, gap: 10 },
  shareBtnText: { color: '#3B82F6', fontSize: 14, fontWeight: '600' },

  adContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: THEME.background },
});

export default ThermoChemistry;