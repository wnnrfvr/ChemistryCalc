import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ShareManager } from './ShareManager';
import { GamificationManager } from './GamificationManager';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RateShareManager } from './RateShareManager';
import { AdManager } from './AdManager';

const { width } = Dimensions.get('window');
const STORAGE_KEY = '@quiz_answered_questions';

// ============================================================
// MASSIVE QUESTION BANK - 80+ QUESTIONS
// ============================================================
const QUESTION_BANK = {
    easy: [
        { id: 'e1', q: "What is the atomic number of Carbon?", options: ["6", "12", "14", "8"], a: "6" },
        { id: 'e2', q: "Which element has the symbol 'Fe'?", options: ["Lead", "Iron", "Gold", "Fluorine"], a: "Iron" },
        { id: 'e3', q: "What is the pH of pure water?", options: ["0", "14", "7", "1"], a: "7" },
        { id: 'e4', q: "What is the lightest element?", options: ["Helium", "Hydrogen", "Lithium", "Oxygen"], a: "Hydrogen" },
        { id: 'e5', q: "Electrons have what charge?", options: ["Positive", "Negative", "Neutral", "Variable"], a: "Negative" },
        { id: 'e6', q: "What is the main gas in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "CO2", "Argon"], a: "Nitrogen" },
        { id: 'e7', q: "Au is the symbol for which element?", options: ["Silver", "Gold", "Copper", "Aluminum"], a: "Gold" },
        { id: 'e8', q: "How many protons does Hydrogen have?", options: ["0", "1", "2", "3"], a: "1" },
        { id: 'e9', q: "What is H2O commonly known as?", options: ["Salt", "Water", "Acid", "Base"], a: "Water" },
        { id: 'e10', q: "Which state of matter has a fixed shape?", options: ["Solid", "Liquid", "Gas", "Plasma"], a: "Solid" },
        { id: 'e11', q: "What color is Copper Sulfate solution?", options: ["Red", "Blue", "Green", "Yellow"], a: "Blue" },
        { id: 'e12', q: "Which element is essential for breathing?", options: ["Nitrogen", "Oxygen", "Hydrogen", "Carbon"], a: "Oxygen" },
        { id: 'e13', q: "What is the chemical symbol for Sodium?", options: ["So", "Na", "Sd", "S"], a: "Na" },
        { id: 'e14', q: "How many elements are in the periodic table?", options: ["108", "112", "118", "92"], a: "118" },
        { id: 'e15', q: "What is the center of an atom called?", options: ["Electron", "Proton", "Nucleus", "Neutron"], a: "Nucleus" },
        { id: 'e16', q: "What gas do plants absorb from air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], a: "Carbon Dioxide" },
        { id: 'e17', q: "Which element has symbol 'K'?", options: ["Krypton", "Potassium", "Calcium", "Carbon"], a: "Potassium" },
        { id: 'e18', q: "Water boils at what temperature (°C)?", options: ["50", "100", "150", "200"], a: "100" },
        { id: 'e19', q: "Which particle has no charge?", options: ["Proton", "Electron", "Neutron", "Ion"], a: "Neutron" },
        { id: 'e20', q: "What is table salt's chemical name?", options: ["Sodium Chloride", "Potassium Iodide", "Calcium Carbonate", "Magnesium Sulfate"], a: "Sodium Chloride" },
        { id: 'e21', q: "Which gas makes up about 21% of air?", options: ["Nitrogen", "Oxygen", "Argon", "CO2"], a: "Oxygen" },
        { id: 'e22', q: "Diamond is made of which element?", options: ["Silicon", "Carbon", "Iron", "Calcium"], a: "Carbon" },
        { id: 'e23', q: "What is the symbol for Helium?", options: ["H", "He", "Hl", "Hi"], a: "He" },
        { id: 'e24', q: "Protons have what charge?", options: ["Positive", "Negative", "Neutral", "Variable"], a: "Positive" },
        { id: 'e25', q: "Which metal is liquid at room temperature?", options: ["Iron", "Mercury", "Lead", "Zinc"], a: "Mercury" },
    ],
    medium: [
        { id: 'm1', q: "Who proposed the Law of Conservation of Mass?", options: ["Dalton", "Lavoisier", "Bohr", "Einstein"], a: "Lavoisier" },
        { id: 'm2', q: "Which gas is known as 'Laughing Gas'?", options: ["NO2", "N2O", "CO2", "H2S"], a: "N2O" },
        { id: 'm3', q: "Which bond involves sharing electrons?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], a: "Covalent" },
        { id: 'm4', q: "What is the molar mass of Water (H2O)?", options: ["16 g/mol", "18 g/mol", "20 g/mol", "22 g/mol"], a: "18 g/mol" },
        { id: 'm5', q: "What type of reaction releases heat?", options: ["Endothermic", "Exothermic", "Isothermic", "Adiabatic"], a: "Exothermic" },
        { id: 'm6', q: "What is Avogadro's number?", options: ["6.02×10²³", "3.14×10²³", "6.02×10²²", "1.67×10²⁷"], a: "6.02×10²³" },
        { id: 'm7', q: "Which element has the highest electronegativity?", options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"], a: "Fluorine" },
        { id: 'm8', q: "What is the oxidation state of Oxygen in most compounds?", options: ["-1", "-2", "+2", "0"], a: "-2" },
        { id: 'm9', q: "Which acid is found in the stomach?", options: ["Sulfuric", "Nitric", "Hydrochloric", "Acetic"], a: "Hydrochloric" },
        { id: 'm10', q: "What is the atomic mass unit based on?", options: ["Hydrogen", "Carbon-12", "Oxygen", "Nitrogen"], a: "Carbon-12" },
        { id: 'm11', q: "What does STP stand for?", options: ["Standard Test Procedure", "Standard Temperature and Pressure", "Stable Testing Point", "System Test Protocol"], a: "Standard Temperature and Pressure" },
        { id: 'm12', q: "Which gas law relates P and V at constant T?", options: ["Charles's", "Boyle's", "Avogadro's", "Gay-Lussac's"], a: "Boyle's" },
        { id: 'm13', q: "What is the formula for Sulfuric Acid?", options: ["HCl", "HNO3", "H2SO4", "H3PO4"], a: "H2SO4" },
        { id: 'm14', q: "How many valence electrons does Carbon have?", options: ["2", "4", "6", "8"], a: "4" },
        { id: 'm15', q: "What is the pH of a strong acid?", options: ["0-3", "7", "10-14", "5-6"], a: "0-3" },
        { id: 'm16', q: "Which subatomic particle determines element identity?", options: ["Neutron", "Electron", "Proton", "Quark"], a: "Proton" },
        { id: 'm17', q: "What is the formula for Glucose?", options: ["C6H12O6", "C12H22O11", "CH4", "C2H6O"], a: "C6H12O6" },
        { id: 'm18', q: "Which type of bond forms between metals?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], a: "Metallic" },
        { id: 'm19', q: "What is the molar volume of gas at STP?", options: ["11.2 L", "22.4 L", "44.8 L", "1 L"], a: "22.4 L" },
        { id: 'm20', q: "Which scientist proposed the atomic model with electron orbits?", options: ["Thomson", "Rutherford", "Bohr", "Dalton"], a: "Bohr" },
        { id: 'm21', q: "What type of reaction is burning wood?", options: ["Synthesis", "Decomposition", "Combustion", "Single Replacement"], a: "Combustion" },
        { id: 'm22', q: "Which element is a noble gas?", options: ["Nitrogen", "Oxygen", "Argon", "Chlorine"], a: "Argon" },
        { id: 'm23', q: "What is the charge of an alpha particle?", options: ["+1", "+2", "-1", "0"], a: "+2" },
        { id: 'm24', q: "Which compound is a hydrocarbon?", options: ["H2O", "NaCl", "CH4", "CO2"], a: "CH4" },
        { id: 'm25', q: "What is the common name for NaHCO3?", options: ["Table Salt", "Baking Soda", "Lime", "Bleach"], a: "Baking Soda" },
    ],
    hard: [
        { id: 'h1', q: "What is the hybridization of Carbon in methane?", options: ["sp", "sp²", "sp³", "sp³d"], a: "sp³" },
        { id: 'h2', q: "What is the pH of a 0.01M HCl solution?", options: ["1", "2", "3", "4"], a: "2" },
        { id: 'h3', q: "Which quantum number determines orbital shape?", options: ["n", "l", "ml", "ms"], a: "l" },
        { id: 'h4', q: "What is the enthalpy of formation of an element in standard state?", options: ["-1 kJ", "0 kJ", "1 kJ", "Varies"], a: "0 kJ" },
        { id: 'h5', q: "What is the ionic product of water (Kw) at 25°C?", options: ["10⁻⁷", "10⁻¹⁴", "10⁻¹⁰", "10⁻¹²"], a: "10⁻¹⁴" },
        { id: 'h6', q: "Which element has electron config [Ar]3d¹⁰4s¹?", options: ["Zinc", "Copper", "Nickel", "Chromium"], a: "Copper" },
        { id: 'h7', q: "What is the VSEPR geometry of SF6?", options: ["Tetrahedral", "Trigonal Bipyramidal", "Octahedral", "Square Planar"], a: "Octahedral" },
        { id: 'h8', q: "What is the rate law for a second-order reaction?", options: ["Rate = k[A]", "Rate = k[A]²", "Rate = k", "Rate = k[A][B]²"], a: "Rate = k[A]²" },
        { id: 'h9', q: "What is the half-life formula for first-order reactions?", options: ["t½ = 0.693/k", "t½ = 1/k", "t½ = 2/k", "t½ = k/0.693"], a: "t½ = 0.693/k" },
        { id: 'h10', q: "Which transition metal has the highest melting point?", options: ["Platinum", "Tungsten", "Iron", "Titanium"], a: "Tungsten" },
        { id: 'h11', q: "What is the coordination number in FCC structure?", options: ["6", "8", "12", "4"], a: "12" },
        { id: 'h12', q: "What catalyst is used in the Haber process?", options: ["Platinum", "Iron", "Nickel", "Vanadium"], a: "Iron" },
        { id: 'h13', q: "What is the bond angle in a tetrahedral molecule?", options: ["90°", "104.5°", "109.5°", "120°"], a: "109.5°" },
        { id: 'h14', q: "Which law states ΔG = ΔH - TΔS?", options: ["Hess's Law", "Gibbs Free Energy", "Le Chatelier's", "Raoult's Law"], a: "Gibbs Free Energy" },
        { id: 'h15', q: "What is the standard reduction potential of H+/H2?", options: ["-1.0 V", "0 V", "+0.5 V", "+1.0 V"], a: "0 V" },
        { id: 'h16', q: "What is the hybridization of Carbon in ethene (C2H4)?", options: ["sp", "sp²", "sp³", "sp³d"], a: "sp²" },
        { id: 'h17', q: "What is the Faraday constant approximately?", options: ["96500 C/mol", "8314 J/mol", "6.02×10²³", "1.6×10⁻¹⁹ C"], a: "96500 C/mol" },
        { id: 'h18', q: "Which compound shows optical isomerism?", options: ["CH4", "Lactic Acid", "CO2", "H2O"], a: "Lactic Acid" },
        { id: 'h19', q: "What is the order of a reaction with t½ independent of concentration?", options: ["Zero", "First", "Second", "Third"], a: "First" },
        { id: 'h20', q: "What is the geometry of XeF4?", options: ["Tetrahedral", "Square Planar", "Octahedral", "See-saw"], a: "Square Planar" },
        { id: 'h21', q: "Which process converts N2 to NH3 industrially?", options: ["Ostwald", "Haber-Bosch", "Contact", "Solvay"], a: "Haber-Bosch" },
        { id: 'h22', q: "What is the pKa of water?", options: ["7", "14", "15.7", "1"], a: "15.7" },
        { id: 'h23', q: "Buffer capacity is maximum when pH equals?", options: ["7", "pKa", "14-pKa", "0"], a: "pKa" },
        { id: 'h24', q: "Which orbital has dumbbell shape?", options: ["s", "p", "d", "f"], a: "p" },
        { id: 'h25', q: "What is the formula for entropy change?", options: ["ΔS = q/T", "ΔS = ΔH/T", "ΔS = nRlnV", "ΔS = CpΔT"], a: "ΔS = q/T" },
    ]
};

const DIFFICULTY_CONFIG = {
    easy: { color: '#00FF88', label: 'EASY', xp: 10 },
    medium: { color: '#FFBB00', label: 'MEDIUM', xp: 20 },
    hard: { color: '#FF3366', label: 'HARD', xp: 35 }
};

// ============================================================
// QUIZ SCREEN COMPONENT
// ============================================================
const QuizScreen = ({ navigation }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);
    const [answeredIds, setAnsweredIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const progressWidth = useRef(new Animated.Value(0)).current;

    // Load answered questions on mount
    useEffect(() => {
        loadAnsweredQuestions();
    }, []);

    const loadAnsweredQuestions = async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            const ids = stored ? JSON.parse(stored) : [];
            setAnsweredIds(ids);
            generateQuiz(ids);
        } catch (e) {
            console.error('Error loading answered questions:', e);
            generateQuiz([]);
        }
    };

    const generateQuiz = (excludeIds) => {
        // Combine all questions
        const allQuestions = [
            ...QUESTION_BANK.easy,
            ...QUESTION_BANK.medium,
            ...QUESTION_BANK.hard
        ];

        // Filter out already answered
        let available = allQuestions.filter(q => !excludeIds.includes(q.id));

        // If less than 10 available, reset and use all
        if (available.length < 10) {
            available = allQuestions;
            // Reset storage
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            setAnsweredIds([]);
        }

        // Shuffle and pick 10
        const shuffled = available.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 10);

        setQuestions(selected);
        setCurrentIndex(0);
        setTotalScore(0);
        setCurrentStreak(0);
        setBestStreak(0);
        setQuizComplete(false);
        setIsLoading(false);
        progressWidth.setValue(0);
    };

    const saveCorrectAnswer = async (questionId) => {
        const newIds = [...answeredIds, questionId];
        setAnsweredIds(newIds);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
        } catch (e) {
            console.error('Error saving:', e);
        }
    };

    const handleSelectAnswer = (answer) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        setIsAnswered(true);

        const currentQuestion = questions[currentIndex];
        const isCorrect = answer === currentQuestion.a;

        if (isCorrect) {
            // Calculate XP based on difficulty
            const xp = currentQuestion.id.startsWith('h') ? 35 :
                currentQuestion.id.startsWith('m') ? 20 : 10;

            // Update score and streak
            setTotalScore(prev => prev + xp);
            setCurrentStreak(prev => {
                const newStreak = prev + 1;
                if (newStreak > bestStreak) setBestStreak(newStreak);
                return newStreak;
            });

            // Award XP
            GamificationManager.addXP(xp);

            // Save as answered
            saveCorrectAnswer(currentQuestion.id);
        } else {
            // Reset streak on wrong answer
            setCurrentStreak(0);
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex >= questions.length - 1) {
            // Quiz complete
            setQuizComplete(true);
            GamificationManager.addXP(50); // Completion bonus
            GamificationManager.recordAction('QUIZ', 'Quiz');

            // Track for rate prompt
            RateShareManager.incrementQuiz();

            // Show interstitial ad at natural break point
            if (AdManager.onQuizComplete()) {
                AdManager.showInterstitial();
            }

            // Check if should show rate prompt (after good experience)
            setTimeout(() => {
                if (RateShareManager.shouldShowRatingForXP) {
                    // Rating handled by HomeScreen
                }
            }, 2000);
            return;
        }

        // Animate transition
        Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
            setIsAnswered(false);

            // Animate progress bar
            Animated.timing(progressWidth, {
                toValue: ((currentIndex + 2) / questions.length) * 100,
                duration: 300,
                useNativeDriver: false
            }).start();

            Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
        });
    };

    const restartQuiz = () => {
        setIsLoading(true);
        loadAnsweredQuestions();
    };

    // Loading state
    if (isLoading || questions.length === 0) {
        return (
            <LinearGradient colors={['#0A0E1A', '#1B263B']} style={styles.container}>
                <View style={styles.loadingContainer}>
                    <MaterialCommunityIcons name="flask-outline" size={60} color="#00FFCC" />
                    <Text style={styles.loadingText}>Preparing Questions...</Text>
                </View>
            </LinearGradient>
        );
    }

    // Quiz Complete state
    if (quizComplete) {
        return (
            <LinearGradient colors={['#0A0E1A', '#1B263B']} style={styles.container}>
                <View style={styles.completeContainer}>
                    <MaterialCommunityIcons name="trophy" size={100} color="#FFD700" />
                    <Text style={styles.completeTitle}>Quiz Complete!</Text>

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{totalScore}</Text>
                            <Text style={styles.statLabel}>XP EARNED</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{bestStreak}</Text>
                            <Text style={styles.statLabel}>BEST STREAK</Text>
                        </View>
                    </View>

                    <Text style={styles.masteredText}>
                        Questions Mastered: {answeredIds.length} / {QUESTION_BANK.easy.length + QUESTION_BANK.medium.length + QUESTION_BANK.hard.length}
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.shareButton} onPress={() => ShareManager.shareQuizScore(totalScore, questions.length)}>
                            <MaterialCommunityIcons name="share-variant" size={20} color="#FFF" />
                            <Text style={styles.shareButtonText}>Share</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.retryButton} onPress={restartQuiz}>
                            <MaterialCommunityIcons name="restart" size={20} color="#00FFCC" />
                            <Text style={styles.retryButtonText}>New Quiz</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Return to Lab</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    // Active Quiz state
    const currentQuestion = questions[currentIndex];
    const qDifficulty = currentQuestion.id.startsWith('h') ? 'hard' :
        currentQuestion.id.startsWith('m') ? 'medium' : 'easy';

    return (
        <LinearGradient colors={['#0A0E1A', '#1B263B']} style={styles.container}>
            {/* Header Stats */}
            <View style={styles.header}>
                <View style={styles.headerStat}>
                    <Text style={styles.headerLabel}>SCORE</Text>
                    <Text style={styles.scoreText}>{totalScore}</Text>
                </View>

                <View style={[styles.difficultyBadge, { backgroundColor: DIFFICULTY_CONFIG[qDifficulty].color + '25' }]}>
                    <Text style={[styles.difficultyText, { color: DIFFICULTY_CONFIG[qDifficulty].color }]}>
                        {DIFFICULTY_CONFIG[qDifficulty].label}
                    </Text>
                </View>

                <View style={styles.headerStat}>
                    <Text style={styles.headerLabel}>STREAK</Text>
                    <Text style={styles.streakText}>🔥 {currentStreak}</Text>
                </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <Animated.View
                        style={[
                            styles.progressFill,
                            { width: progressWidth.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }
                        ]}
                    />
                </View>
                <Text style={styles.progressLabel}>{currentIndex + 1} / {questions.length}</Text>
            </View>

            {/* Question Card */}
            <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
                <Text style={styles.questionNumber}>Question {currentIndex + 1}</Text>
                <Text style={styles.questionText}>{currentQuestion.q}</Text>
            </Animated.View>

            {/* Answer Options */}
            <ScrollView style={styles.optionsScroll} contentContainerStyle={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQuestion.a;

                    let cardStyle = [styles.optionCard];
                    let textColor = '#FFFFFF';
                    let iconName = null;

                    if (isAnswered) {
                        if (isCorrect) {
                            cardStyle.push(styles.optionCorrect);
                            textColor = '#00FF88';
                            iconName = 'check-circle';
                        } else if (isSelected) {
                            cardStyle.push(styles.optionWrong);
                            textColor = '#FF5555';
                            iconName = 'close-circle';
                        }
                    }

                    return (
                        <TouchableOpacity
                            key={index}
                            style={cardStyle}
                            onPress={() => handleSelectAnswer(option)}
                            disabled={isAnswered}
                            activeOpacity={0.8}
                        >
                            <View style={styles.optionLetter}>
                                <Text style={styles.optionLetterText}>{String.fromCharCode(65 + index)}</Text>
                            </View>
                            <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
                            {iconName && (
                                <MaterialCommunityIcons name={iconName} size={24} color={textColor} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Next Button (only shows after answering) */}
            {isAnswered && (
                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                    <Text style={styles.nextButtonText}>
                        {currentIndex >= questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="#000" />
                </TouchableOpacity>
            )}
        </LinearGradient>
    );
};

// ============================================================
// STYLES
// ============================================================
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50 },

    // Loading
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: '#888', fontSize: 18, marginTop: 20 },

    // Header
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerStat: { alignItems: 'center' },
    headerLabel: { color: '#666', fontSize: 10, letterSpacing: 1, marginBottom: 4 },
    scoreText: { color: '#00FFCC', fontSize: 28, fontWeight: '900' },
    streakText: { color: '#FF9500', fontSize: 22, fontWeight: '800' },
    difficultyBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    difficultyText: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },

    // Progress
    progressContainer: { marginBottom: 25 },
    progressTrack: { height: 8, backgroundColor: '#FFFFFF15', borderRadius: 4, overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: '#00FFCC', borderRadius: 4 },
    progressLabel: { color: '#666', fontSize: 12, textAlign: 'right', marginTop: 6 },

    // Question
    questionCard: { backgroundColor: '#FFFFFF08', padding: 25, borderRadius: 20, marginBottom: 25, borderWidth: 1, borderColor: '#FFFFFF15' },
    questionNumber: { color: '#00FFCC', fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 12 },
    questionText: { color: '#FFFFFF', fontSize: 20, fontWeight: '600', lineHeight: 28 },

    // Options
    optionsScroll: { flex: 1 },
    optionsContainer: { gap: 12, paddingBottom: 20 },
    optionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF08', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#FFFFFF15' },
    optionCorrect: { backgroundColor: '#00FF8825', borderColor: '#00FF88' },
    optionWrong: { backgroundColor: '#FF555525', borderColor: '#FF5555' },
    optionLetter: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFFFFF15', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    optionLetterText: { color: '#888', fontSize: 16, fontWeight: '700' },
    optionText: { flex: 1, fontSize: 16, fontWeight: '500' },

    // Next Button
    nextButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00FFCC', padding: 16, borderRadius: 14, gap: 10, marginTop: 10 },
    nextButtonText: { color: '#000', fontSize: 16, fontWeight: '700' },

    // Complete Screen
    completeContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    completeTitle: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginTop: 20, marginBottom: 30 },
    statsRow: { flexDirection: 'row', gap: 30, marginBottom: 20 },
    statBox: { alignItems: 'center', backgroundColor: '#FFFFFF08', padding: 20, borderRadius: 16, minWidth: 100 },
    statNumber: { color: '#00FFCC', fontSize: 36, fontWeight: '900' },
    statLabel: { color: '#888', fontSize: 10, letterSpacing: 1, marginTop: 5 },
    masteredText: { color: '#666', fontSize: 14, marginBottom: 40 },
    buttonRow: { flexDirection: 'row', gap: 15 },
    shareButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#A855F7', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14 },
    shareButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    retryButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFFFFF10', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 14, borderWidth: 1, borderColor: '#00FFCC' },
    retryButtonText: { color: '#00FFCC', fontSize: 16, fontWeight: '700' },
    backButton: { marginTop: 30 },
    backButtonText: { color: '#666', fontSize: 14 }
});

export default QuizScreen;
