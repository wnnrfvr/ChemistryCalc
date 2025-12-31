// RatingModal.js - Beautiful 5-Star Rating Modal
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Animated, Linking, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// UPDATE THESE WITH YOUR REAL LINKS
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.decadino.ChemistryCalc';
const APP_STORE_URL = 'https://apps.apple.com/app/id123456789'; // Replace with your App Store ID

const RatingModal = ({ visible, onClose, onRated }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleStarPress = (rating) => {
        setSelectedRating(rating);
    };

    const handleSubmit = () => {
        if (selectedRating >= 4) {
            // Good rating - redirect to app store
            const storeUrl = Platform.OS === 'ios' ? APP_STORE_URL : PLAY_STORE_URL;
            Linking.openURL(storeUrl).catch(err => console.error('Error opening store:', err));
        }
        setSubmitted(true);
        if (onRated) onRated(selectedRating);

        // Auto-close after 2 seconds
        setTimeout(() => {
            setSubmitted(false);
            setSelectedRating(0);
            onClose();
        }, 2000);
    };

    const handleNotNow = () => {
        setSelectedRating(0);
        setSubmitted(false);
        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <LinearGradient colors={['#1B263B', '#0A0E1A']} style={styles.card}>
                    {!submitted ? (
                        <>
                            {/* Header */}
                            <View style={styles.header}>
                                <Text style={styles.emoji}>⭐</Text>
                                <Text style={styles.title}>Enjoying Chemistry Calc?</Text>
                                <Text style={styles.subtitle}>Your feedback helps us improve!</Text>
                            </View>

                            {/* Star Rating */}
                            <View style={styles.starsContainer}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <TouchableOpacity
                                        key={star}
                                        onPress={() => handleStarPress(star)}
                                        activeOpacity={0.7}
                                    >
                                        <MaterialCommunityIcons
                                            name={star <= selectedRating ? 'star' : 'star-outline'}
                                            size={48}
                                            color={star <= selectedRating ? '#FFD700' : '#555'}
                                            style={styles.star}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Rating Label */}
                            <Text style={styles.ratingLabel}>
                                {selectedRating === 0 && 'Tap a star to rate'}
                                {selectedRating === 1 && '😔 Poor'}
                                {selectedRating === 2 && '😕 Fair'}
                                {selectedRating === 3 && '🙂 Good'}
                                {selectedRating === 4 && '😊 Great!'}
                                {selectedRating === 5 && '🤩 Amazing!'}
                            </Text>

                            {/* Buttons */}
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.laterBtn} onPress={handleNotNow}>
                                    <Text style={styles.laterText}>Maybe Later</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.submitBtn, selectedRating === 0 && styles.submitBtnDisabled]}
                                    onPress={handleSubmit}
                                    disabled={selectedRating === 0}
                                >
                                    <Text style={styles.submitText}>Submit</Text>
                                    <MaterialCommunityIcons name="arrow-right" size={18} color="#000" />
                                </TouchableOpacity>
                            </View>

                            {/* Hint for 4-5 stars */}
                            {selectedRating >= 4 && (
                                <Text style={styles.hint}>
                                    You'll be redirected to the {Platform.OS === 'ios' ? 'App Store' : 'Play Store'} to leave your review
                                </Text>
                            )}
                        </>
                    ) : (
                        // Thank You State
                        <View style={styles.thankYou}>
                            <Text style={styles.thankYouEmoji}>💚</Text>
                            <Text style={styles.thankYouTitle}>Thank You!</Text>
                            <Text style={styles.thankYouSubtitle}>
                                {selectedRating >= 4
                                    ? 'Your support means the world to us!'
                                    : 'We appreciate your feedback and will work to improve.'}
                            </Text>
                        </View>
                    )}
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    card: {
        width: '100%',
        maxWidth: 360,
        borderRadius: 24,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF15'
    },

    header: { alignItems: 'center', marginBottom: 25 },
    emoji: { fontSize: 50, marginBottom: 15 },
    title: { color: '#FFF', fontSize: 22, fontWeight: '800', textAlign: 'center' },
    subtitle: { color: '#888', fontSize: 14, marginTop: 8, textAlign: 'center' },

    starsContainer: { flexDirection: 'row', marginBottom: 15 },
    star: { marginHorizontal: 5 },

    ratingLabel: { color: '#AAA', fontSize: 16, marginBottom: 25, height: 24 },

    buttonRow: { flexDirection: 'row', gap: 15, width: '100%' },
    laterBtn: { flex: 1, padding: 14, alignItems: 'center' },
    laterText: { color: '#666', fontSize: 15 },
    submitBtn: {
        flex: 2,
        flexDirection: 'row',
        backgroundColor: '#00FFCC',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    submitBtnDisabled: { backgroundColor: '#333', opacity: 0.5 },
    submitText: { color: '#000', fontSize: 16, fontWeight: '700' },

    hint: { color: '#666', fontSize: 12, textAlign: 'center', marginTop: 20, fontStyle: 'italic' },

    thankYou: { alignItems: 'center', padding: 20 },
    thankYouEmoji: { fontSize: 60, marginBottom: 15 },
    thankYouTitle: { color: '#00FFCC', fontSize: 28, fontWeight: '800' },
    thankYouSubtitle: { color: '#AAA', fontSize: 14, textAlign: 'center', marginTop: 10 },
});

export default RatingModal;
