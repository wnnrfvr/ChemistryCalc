// OnboardingModal.js - First-time user welcome experience
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const ONBOARDING_KEY = '@chemistry_calc_onboarding_complete';

const OnboardingModal = ({ visible, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const fadeAnim = useState(new Animated.Value(1))[0];

    const steps = [
        {
            icon: 'flask-round-bottom',
            title: 'Welcome to the Chemistry Lab! 🧪',
            description: 'Your personal chemistry assistant with calculators, quizzes, and reference tools.',
            color: '#00FFCC'
        },
        {
            icon: 'target',
            title: 'Daily Experiments',
            description: 'Complete daily chemistry challenges to earn XP and level up your skills!',
            color: '#A855F7'
        },
        {
            icon: 'calculator-variant',
            title: 'Powerful Calculators',
            description: 'Solve stoichiometry, gas laws, pH, electrolysis, and more with step-by-step solutions.',
            color: '#00D9FF'
        },
        {
            icon: 'book-alphabet',
            title: 'Quick Reference',
            description: 'Access formulas, constants, ion charts, and a molar mass calculator anytime.',
            color: '#FF6B6B'
        },
        {
            icon: 'gamepad-variant',
            title: 'Test Your Knowledge',
            description: 'Challenge yourself with 75+ chemistry questions across Easy, Medium, and Hard difficulties.',
            color: '#FFD700'
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start(() => {
                setCurrentStep(prev => prev + 1);
                Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
            });
        } else {
            handleComplete();
        }
    };

    const handleComplete = async () => {
        try {
            await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        } catch (e) {
            console.error(e);
        }
        onComplete();
    };

    const step = steps[currentStep];

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <LinearGradient colors={['#0A0E1A', '#1B263B']} style={styles.card}>
                    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                        <View style={[styles.iconCircle, { backgroundColor: step.color + '25', borderColor: step.color }]}>
                            <MaterialCommunityIcons name={step.icon} size={50} color={step.color} />
                        </View>

                        <Text style={styles.title}>{step.title}</Text>
                        <Text style={styles.description}>{step.description}</Text>
                    </Animated.View>

                    {/* Progress Dots */}
                    <View style={styles.dots}>
                        {steps.map((_, idx) => (
                            <View key={idx} style={[styles.dot, idx === currentStep && styles.dotActive]} />
                        ))}
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonRow}>
                        {currentStep < steps.length - 1 ? (
                            <>
                                <TouchableOpacity style={styles.skipBtn} onPress={handleComplete}>
                                    <Text style={styles.skipText}>Skip</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                                    <Text style={styles.nextText}>Next</Text>
                                    <MaterialCommunityIcons name="arrow-right" size={20} color="#000" />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity style={styles.startBtn} onPress={handleComplete}>
                                <Text style={styles.startText}>Start Learning!</Text>
                                <MaterialCommunityIcons name="flask" size={20} color="#000" />
                            </TouchableOpacity>
                        )}
                    </View>
                </LinearGradient>
            </View>
        </Modal>
    );
};

// Helper hook for HomeScreen
export const useOnboarding = () => {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const completed = await AsyncStorage.getItem(ONBOARDING_KEY);
                if (!completed) {
                    setShowOnboarding(true);
                }
            } catch (e) {
                console.error(e);
            }
            setChecked(true);
        };
        checkOnboarding();
    }, []);

    return { showOnboarding, setShowOnboarding, checked };
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    card: { width: '100%', maxWidth: 400, borderRadius: 24, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF15' },
    content: { alignItems: 'center', marginBottom: 30 },

    iconCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 2, marginBottom: 25 },
    title: { color: '#FFF', fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 15 },
    description: { color: '#AAA', fontSize: 16, textAlign: 'center', lineHeight: 24 },

    dots: { flexDirection: 'row', gap: 8, marginBottom: 30 },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF20' },
    dotActive: { backgroundColor: '#00FFCC', width: 24 },

    buttonRow: { flexDirection: 'row', gap: 15, width: '100%' },
    skipBtn: { flex: 1, padding: 16, alignItems: 'center' },
    skipText: { color: '#666', fontSize: 16 },
    nextBtn: { flex: 2, flexDirection: 'row', backgroundColor: '#00FFCC', padding: 16, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 8 },
    nextText: { color: '#000', fontSize: 16, fontWeight: '700' },
    startBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#00FFCC', padding: 18, borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 10 },
    startText: { color: '#000', fontSize: 18, fontWeight: '700' },
});

export default OnboardingModal;
