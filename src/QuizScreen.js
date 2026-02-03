import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions,
  StatusBar, ScrollView, Platform, SafeAreaView
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShareManager } from './ShareManager';
import { GamificationManager } from './GamificationManager';
import { RateShareManager } from './RateShareManager';
import { AdManager } from './AdManager';
import QuestionGenerator from './QuestionGenerator';

const { width, height } = Dimensions.get('window');

// ============================================================================
// CLEAN, VIBRANT THEME - World-Class EdTech
// ============================================================================
const COLORS = {
  // Backgrounds
  background: '#FAFBFC',
  surface: '#FFFFFF',

  // Primary Colors - Vibrant but Professional
  primary: '#5B47FB',      // Brilliant purple
  primaryLight: '#EBE8FF',
  primaryDark: '#4435C9',

  // Accent Colors
  success: '#00C853',      // Fresh green
  successLight: '#E8F5E9',
  error: '#FF3D57',        // Warm red
  errorLight: '#FFEBEE',
  warning: '#FFB020',      // Energetic orange
  warningLight: '#FFF3E0',

  // Text
  text: {
    primary: '#1A1D29',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
  },

  // UI Elements
  border: '#E5E7EB',
  divider: '#F3F4F6',
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// ============================================================================
// EXAM STATISTICS - Real Data to Motivate Students
// ============================================================================
const EXAM_INSIGHTS = [
  {
    exam: 'AP Chemistry',
    stat: '42% pass rate',
    message: 'Master it and stand out from 58% of test-takers',
    icon: 'school',
    color: COLORS.primary,
  },
  {
    exam: 'SAT Chemistry',
    stat: 'Top 10% score 770+',
    message: 'Join the elite. Perfect practice makes perfect scores',
    icon: 'trophy',
    color: COLORS.warning,
  },
  {
    exam: 'IB Chemistry HL',
    stat: 'Only 15% get a 7',
    message: 'Consistent practice is your competitive advantage',
    icon: 'star',
    color: COLORS.success,
  },
  {
    exam: 'MCAT Chemistry',
    stat: '127+ puts you in top 25%',
    message: 'Medical school admissions start here',
    icon: 'heart-pulse',
    color: '#FF3D57',
  },
];

// ============================================================================
// EXAM TYPES - For Question Generation
// ============================================================================
const EXAM_TYPES = [
  {
    id: 'AP',
    name: 'AP Chemistry',
    description: 'College Board Advanced Placement',
    icon: 'school-outline',
    color: COLORS.primary,
  },
  {
    id: 'SAT',
    name: 'SAT Subject Test',
    description: 'Chemistry Subject Test',
    icon: 'notebook-outline',
    color: '#00C853',
  },
  {
    id: 'IB',
    name: 'IB Chemistry',
    description: 'International Baccalaureate',
    icon: 'earth',
    color: '#FFB020',
  },
  {
    id: 'MCAT',
    name: 'MCAT',
    description: 'Medical College Admission Test',
    icon: 'heart-pulse',
    color: '#FF3D57',
  },
  {
    id: 'NEET',
    name: 'NEET',
    description: 'National Eligibility Entrance Test',
    icon: 'hospital-box-outline',
    color: '#5B47FB',
  },
  {
    id: 'JEE',
    name: 'JEE Advanced',
    description: 'Joint Entrance Examination',
    icon: 'atom',
    color: '#00BCD4',
  },
  {
    id: 'GENERAL',
    name: 'General Practice',
    description: 'Mixed topics and difficulty',
    icon: 'flask-outline',
    color: COLORS.text.secondary,
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// 1. Simple Progress Bar (No animation)
const ProgressBar = ({ current, total }) => {
  const percentage = ((current / total) * 100).toFixed(0);

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {current} of {total}
      </Text>
    </View>
  );
};

// 2. Clean Option Card
const OptionCard = ({ option, isSelected, isAnswered, correctOptionId, onSelect }) => {
  const isCorrect = option.id === correctOptionId;
  const isWrong = isSelected && !isCorrect && isAnswered;

  let cardStyle = styles.optionCard;
  let letterStyle = styles.optionLetter;
  let textColor = COLORS.text.primary;

  if (isAnswered) {
    if (isCorrect) {
      cardStyle = [styles.optionCard, styles.optionCorrect];
      letterStyle = [styles.optionLetter, styles.letterCorrect];
      textColor = '#00A843';
    } else if (isWrong) {
      cardStyle = [styles.optionCard, styles.optionWrong];
      letterStyle = [styles.optionLetter, styles.letterWrong];
      textColor = '#E63946';
    } else {
      cardStyle = [styles.optionCard, styles.optionFaded];
      textColor = COLORS.text.tertiary;
    }
  } else if (isSelected) {
    cardStyle = [styles.optionCard, styles.optionSelected];
    letterStyle = [styles.optionLetter, styles.letterSelected];
  }

  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => !isAnswered && onSelect(option.id)}
      disabled={isAnswered}
      activeOpacity={0.7}
    >
      <View style={letterStyle}>
        <Text style={styles.optionLetterText}>{option.id}</Text>
      </View>

      <Text style={[styles.optionText, { color: textColor }]}>
        {option.text}
      </Text>

      {isAnswered && isCorrect && (
        <View style={styles.statusBadge}>
          <MaterialCommunityIcons name="check" size={16} color="#FFF" />
        </View>
      )}

      {isAnswered && isWrong && (
        <View style={[styles.statusBadge, { backgroundColor: COLORS.error }]}>
          <MaterialCommunityIcons name="close" size={16} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

// 3. Feedback Panel (Simple, No Bottom Sheet)
const FeedbackPanel = ({ isCorrect, solution, onNext }) => {
  return (
    <View style={styles.feedbackPanel}>
      <View style={[styles.feedbackStrip, { backgroundColor: isCorrect ? COLORS.success : COLORS.error }]} />

      <View style={styles.feedbackContent}>
        <View style={styles.feedbackHeader}>
          <View style={[styles.feedbackIcon, { backgroundColor: isCorrect ? COLORS.successLight : COLORS.errorLight }]}>
            <MaterialCommunityIcons
              name={isCorrect ? "check-circle" : "close-circle"}
              size={24}
              color={isCorrect ? COLORS.success : COLORS.error}
            />
          </View>
          <Text style={[styles.feedbackTitle, { color: isCorrect ? COLORS.success : COLORS.error }]}>
            {isCorrect ? 'Correct!' : 'Not quite'}
          </Text>
        </View>

        <ScrollView
          style={styles.solutionScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <Text style={styles.solutionLabel}>Explanation</Text>
          <Text style={styles.solutionText}>{solution}</Text>
        </ScrollView>

        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: isCorrect ? COLORS.success : COLORS.primary }]}
          onPress={onNext}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ============================================================================
// MAIN SCREEN
// ============================================================================

const QuizScreen = ({ navigation }) => {
  // State
  const [viewState, setViewState] = useState('SELECTION');

  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDoubleXPClaimed, setIsDoubleXPClaimed] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);

  // Random exam insight for motivation
  const [examInsight] = useState(
    EXAM_INSIGHTS[Math.floor(Math.random() * EXAM_INSIGHTS.length)]
  );

  // Quiz Logic
  const startQuiz = (count) => {
    setViewState('LOADING');
    setIsDoubleXPClaimed(false);

    setTimeout(() => {
      // Generate mixed questions
      const rawQuestions = QuestionGenerator.generateQuestionSet(count);
      const normalized = rawQuestions.map(q => ({
        ...q,
        // Ensure exam type is set if missing, but it comes from generator usually
        examType: q.examType || 'General',
        solution: Array.isArray(q.solution)
          ? q.solution.join('\n\n')
          : (q.solution || "No explanation provided.")
      }));

      setQuizData(normalized);
      setCurrentIndex(0);
      setScore(0);
      setCorrectAnswers(0);
      setViewState('QUIZ');
    }, 600);
  };

  const handleOptionSelect = (id) => {
    if (isAnswered) return;
    setSelectedOption(id);
  };

  const confirmAnswer = () => {
    if (!selectedOption || isAnswered) return;

    setIsAnswered(true);
    const currentQ = quizData[currentIndex];

    if (selectedOption === currentQ.correctOptionId) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      GamificationManager.addXP(20);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setViewState('COMPLETE');
      AdManager.showInterstitial();
      RateShareManager.incrementQuiz();
      GamificationManager.addXP(100);
    }
  };

  const handleDoubleXP = async () => {
    if (isDoubleXPClaimed || isAdLoading) return;
    setIsAdLoading(true);

    const success = await AdManager.showRewarded(() => {
      const bonusXP = score;
      setScore(prev => prev * 2);
      GamificationManager.addXP(bonusXP);
      setIsDoubleXPClaimed(true);
      setIsAdLoading(false);
    });

    if (!success) {
      setIsAdLoading(false);
      alert("Ad not ready. Please try again in a moment.");
    }
  };

  // ============================================================================
  // RENDER: SELECTION SCREEN
  // ============================================================================
  if (viewState === 'SELECTION') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

        <ScrollView
          contentContainerStyle={styles.selectionScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.selectionHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Practice Quiz</Text>
              <Text style={styles.headerSubtitle}>Test your chemistry knowledge</Text>
            </View>
          </View>

          {/* Exam Insight Card */}
          <View style={styles.insightCard}>
            <View style={[styles.insightIconContainer, { backgroundColor: examInsight.color + '15' }]}>
              <MaterialCommunityIcons
                name={examInsight.icon}
                size={28}
                color={examInsight.color}
              />
            </View>

            <View style={styles.insightContent}>
              <Text style={styles.insightExam}>{examInsight.exam}</Text>
              <Text style={styles.insightStat}>{examInsight.stat}</Text>
              <Text style={styles.insightMessage}>{examInsight.message}</Text>
            </View>
          </View>



          {/* Quiz Length Selection */}
          <View style={styles.selectionSection}>
            <Text style={styles.sectionTitle}>Choose your challenge</Text>


            <TouchableOpacity
              style={styles.quizOption}
              onPress={() => startQuiz(10)}
              activeOpacity={0.7}
            >
              <View style={styles.quizOptionContent}>
                <View style={[styles.quizBadge, { backgroundColor: '#00C853' }]}>
                  <Text style={styles.quizBadgeText}>10</Text>
                </View>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>Quick Review</Text>
                  <Text style={styles.quizSubtitle}>Perfect for a study break • ~5 min</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.border} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quizOption}
              onPress={() => startQuiz(15)}
              activeOpacity={0.7}
            >
              <View style={styles.quizOptionContent}>
                <View style={[styles.quizBadge, { backgroundColor: '#5B47FB' }]}>
                  <Text style={styles.quizBadgeText}>15</Text>
                </View>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>Standard Practice</Text>
                  <Text style={styles.quizSubtitle}>Solid review session • ~8 min</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.border} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quizOption,
                styles.quizOptionRecommended
              ]}
              onPress={() => startQuiz(20)}
              activeOpacity={0.7}
            >
              <View style={styles.recommendedBadge}>
                <MaterialCommunityIcons name="star" size={12} color="#FFB020" />
                <Text style={styles.recommendedText}>MOST POPULAR</Text>
              </View>

              <View style={styles.quizOptionContent}>
                <View style={[styles.quizBadge, { backgroundColor: '#FFB020' }]}>
                  <Text style={styles.quizBadgeText}>20</Text>
                </View>
                <View style={styles.quizInfo}>
                  <Text style={styles.quizTitle}>Deep Dive</Text>
                  <Text style={styles.quizSubtitle}>Comprehensive test prep • ~12 min</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.border} />
            </TouchableOpacity>
          </View>

          {/* Study Tip */}
          <View style={styles.tipCard}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={COLORS.warning} />
            <Text style={styles.tipText}>
              <Text style={styles.tipBold}>Pro tip:</Text> Review wrong answers immediately for better retention
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // RENDER: LOADING
  // ============================================================================
  if (viewState === 'LOADING') {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <View style={styles.loadingCircle}>
          <MaterialCommunityIcons name="flask-outline" size={40} color={COLORS.primary} />
        </View>
        <Text style={styles.loadingText}>Preparing your quiz...</Text>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // RENDER: COMPLETE
  // ============================================================================
  if (viewState === 'COMPLETE') {
    const accuracy = Math.round((correctAnswers / quizData.length) * 100);
    const isPerfect = accuracy === 100;
    const isGreat = accuracy >= 80;
    const isGood = accuracy >= 60;

    let performance = {
      emoji: '🎯',
      title: isPerfect ? 'Perfect Score!' : isGreat ? 'Great Work!' : isGood ? 'Good Job!' : 'Keep Practicing!',
      message: isPerfect
        ? 'You crushed it! Every answer correct.'
        : isGreat
          ? 'You\'re mastering chemistry!'
          : isGood
            ? 'You\'re on the right track.'
            : 'Review the concepts and try again.',
      color: isPerfect ? COLORS.success : isGreat ? COLORS.primary : isGood ? COLORS.warning : COLORS.error,
    };

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

        <ScrollView
          contentContainerStyle={styles.completeScroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.completeHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons name="close" size={24} color={COLORS.text.primary} />
            </TouchableOpacity>
          </View>

          {/* Performance Badge */}
          <View style={styles.performanceSection}>
            <View style={[styles.performanceBadge, { backgroundColor: performance.color + '15' }]}>
              <Text style={styles.performanceEmoji}>{performance.emoji}</Text>
            </View>
            <Text style={styles.performanceTitle}>{performance.title}</Text>
            <Text style={styles.performanceMessage}>{performance.message}</Text>
          </View>

          {/* Score Circle */}
          <View style={styles.scoreCircle}>
            <View style={[styles.scoreCircleInner, { borderColor: performance.color }]}>
              <Text style={[styles.scorePercentage, { color: performance.color }]}>{accuracy}%</Text>
              <Text style={styles.scoreLabel}>Accuracy</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{correctAnswers}/{quizData.length}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: COLORS.primary }]}>{score}</Text>
              <Text style={styles.statLabel}>XP Earned</Text>
            </View>
          </View>

          {/* Double XP Button */}
          {!isDoubleXPClaimed && (
            <TouchableOpacity
              style={styles.doubleXPButton}
              onPress={handleDoubleXP}
              disabled={isAdLoading}
              activeOpacity={0.8}
            >
              <View style={styles.doubleXPContent}>
                <MaterialCommunityIcons
                  name="video-outline"
                  size={24}
                  color={COLORS.warning}
                />
                <View style={styles.doubleXPText}>
                  <Text style={styles.doubleXPTitle}>
                    {isAdLoading ? 'Loading ad...' : 'Watch ad to double XP'}
                  </Text>
                  <Text style={styles.doubleXPSubtitle}>Earn +{score} bonus XP</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.text.tertiary} />
            </TouchableOpacity>
          )}

          {isDoubleXPClaimed && (
            <View style={styles.xpClaimedBanner}>
              <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
              <Text style={styles.xpClaimedText}>XP doubled! You earned {score} total XP</Text>
            </View>
          )}

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setViewState('SELECTION')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Practice Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ============================================================================
  // RENDER: QUIZ ACTIVE
  // ============================================================================
  const q = quizData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="close" size={24} color={COLORS.text.primary} />
        </TouchableOpacity>

        <ProgressBar current={currentIndex + 1} total={quizData.length} />
      </View>

      <ScrollView
        contentContainerStyle={styles.quizScroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Question Card */}
        <View style={styles.questionCard}>
          {/* Tags */}
          <View style={styles.tagRow}>
            {/* Exam Type Badge */}
            {q.examType && (
              <View style={styles.examTypeBadge}>
                <MaterialCommunityIcons
                  name={EXAM_TYPES.find(e => e.id === q.examType)?.icon || 'flask-outline'}
                  size={12}
                  color="#FFF"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.examTypeBadgeText}>
                  {EXAM_TYPES.find(e => e.id === q.examType)?.name || q.examType}
                </Text>
              </View>
            )}

            <View style={styles.topicTag}>
              <Text style={styles.topicText}>{q.topic || 'Chemistry'}</Text>
            </View>

            {q.difficulty && (
              <View style={[
                styles.difficultyTag,
                q.difficulty === 'Hard' && styles.difficultyHard,
                q.difficulty === 'Medium' && styles.difficultyMedium,
                q.difficulty === 'Easy' && styles.difficultyEasy,
              ]}>
                <Text style={styles.difficultyText}>{q.difficulty}</Text>
              </View>
            )}
          </View>

          {/* Question Text */}
          <Text style={styles.questionText}>{q.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {q.options.map((opt) => (
            <OptionCard
              key={opt.id}
              option={opt}
              isSelected={selectedOption === opt.id}
              isAnswered={isAnswered}
              correctOptionId={q.correctOptionId}
              onSelect={handleOptionSelect}
            />
          ))}
        </View>

        {/* Spacer for feedback panel */}
        {isAnswered && <View style={{ height: 280 }} />}
      </ScrollView>

      {/* Bottom Action */}
      {!isAnswered ? (
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[styles.checkButton, !selectedOption && styles.checkButtonDisabled]}
            onPress={confirmAnswer}
            disabled={!selectedOption}
            activeOpacity={0.8}
          >
            <Text style={styles.checkButtonText}>Check Answer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FeedbackPanel
          isCorrect={selectedOption === q.correctOptionId}
          solution={q.solution}
          onNext={nextQuestion}
        />
      )}
    </SafeAreaView>
  );
};

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ===== SELECTION SCREEN =====
  selectionScroll: {
    paddingBottom: 40,
  },
  selectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontWeight: '500',
  },

  // Insight Card
  insightCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  insightContent: {
    flex: 1,
  },
  insightExam: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  insightStat: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 6,
  },
  insightMessage: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },

  // Quiz Options
  selectionSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 16,
  },

  // Exam Type Grid
  examGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  examTypeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    width: (width - 52) / 2,
    borderWidth: 2,
    borderColor: COLORS.border,
    position: 'relative',
  },
  examTypeCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  examTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  examTypeName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  examTypeNameSelected: {
    color: COLORS.primary,
  },
  examTypeDesc: {
    fontSize: 12,
    color: COLORS.text.secondary,
    lineHeight: 16,
  },
  selectedCheckmark: {
    position: 'absolute',
    top: 12,
    right: 12,
  },

  // Warning Banner
  warningBanner: {
    backgroundColor: COLORS.warningLight,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.warning + '40',
  },
  warningText: {
    fontSize: 14,
    color: COLORS.warning,
    fontWeight: '600',
    flex: 1,
  },

  quizOption: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quizOptionDisabled: {
    opacity: 0.5,
    backgroundColor: COLORS.divider,
  },
  quizOptionRecommended: {
    borderWidth: 2,
    borderColor: COLORS.warning,
    position: 'relative',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.warning,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.warning,
    letterSpacing: 0.5,
  },
  quizOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  quizBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quizBadgeText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  quizSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },
  textDisabled: {
    color: COLORS.text.tertiary,
  },

  // Tip Card
  tipCard: {
    backgroundColor: '#FFF9E6',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: '700',
    color: COLORS.text.primary,
  },

  // ===== LOADING =====
  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
  },

  // ===== QUIZ SCREEN =====
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  exitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.divider,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text.secondary,
    minWidth: 50,
    textAlign: 'right',
  },

  quizScroll: {
    padding: 20,
    paddingBottom: 100,
  },

  // Question Card
  questionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  topicTag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  topicText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  difficultyTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  difficultyEasy: {
    backgroundColor: COLORS.successLight,
  },
  difficultyMedium: {
    backgroundColor: COLORS.warningLight,
  },
  difficultyHard: {
    backgroundColor: COLORS.errorLight,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    lineHeight: 30,
  },

  // Options
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  optionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  optionCorrect: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.successLight,
  },
  optionWrong: {
    borderColor: COLORS.error,
    backgroundColor: COLORS.errorLight,
  },
  optionFaded: {
    opacity: 0.5,
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.divider,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  letterSelected: {
    backgroundColor: COLORS.primary,
  },
  letterCorrect: {
    backgroundColor: COLORS.success,
  },
  letterWrong: {
    backgroundColor: COLORS.error,
  },
  optionLetterText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text.primary,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  statusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  checkButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  checkButtonDisabled: {
    backgroundColor: COLORS.divider,
  },
  checkButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Feedback Panel
  feedbackPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    maxHeight: height * 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  feedbackStrip: {
    height: 4,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  feedbackContent: {
    padding: 20,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  feedbackIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  feedbackTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  solutionScroll: {
    maxHeight: 120,
    marginBottom: 20,
  },
  solutionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text.secondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  solutionText: {
    fontSize: 16,
    color: COLORS.text.primary,
    lineHeight: 24,
  },
  continueButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  continueButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ===== COMPLETE SCREEN =====
  completeScroll: {
    paddingBottom: 40,
  },
  completeHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  performanceSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  performanceBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  performanceEmoji: {
    fontSize: 40,
  },
  performanceTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  performanceMessage: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },

  // Score Circle
  scoreCircle: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreCircleInner: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Double XP Button
  doubleXPButton: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: COLORS.warning,
  },
  doubleXPContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  doubleXPText: {
    flex: 1,
  },
  doubleXPTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 2,
  },
  doubleXPSubtitle: {
    fontSize: 14,
    color: COLORS.text.secondary,
  },

  // XP Claimed Banner
  xpClaimedBanner: {
    backgroundColor: COLORS.successLight,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  xpClaimedText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.success,
    flex: 1,
  },

  // Action Buttons
  primaryButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default QuizScreen;