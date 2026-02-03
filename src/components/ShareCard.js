import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChemicalDisplay from './ChemicalDisplay';

const { width } = Dimensions.get('window');

const ShareCard = ({ question, answer, type }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#151821', '#0D0F14']}
                style={styles.gradient}
            >
                {/* Branding Header */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="flask" size={24} color="#EF4444" />
                    </View>
                    <Text style={styles.appName}>Chemistry Calc</Text>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.label}>QUESTION</Text>
                    <ChemicalDisplay formula={question} style={styles.question} fontSize={18} color="#FFF" />

                    <View style={styles.divider} />

                    <Text style={styles.label}>ANSWER</Text>
                    <View style={styles.answerBox}>
                        <Text style={styles.answerValue}>pH = {answer}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Get it on Google Play</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.9, // Fixed width for consistent capture
        backgroundColor: '#0D0F14',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#252A35',
    },
    gradient: {
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconContainer: {
        width: 40, height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        alignItems: 'center', justifyContent: 'center',
        marginRight: 12
    },
    appName: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    content: {
        marginBottom: 24,
    },
    label: {
        color: '#EF4444',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 8,
    },
    question: {
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#252A35',
        marginBottom: 20,
    },
    answerBox: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.3)',
        alignItems: 'center',
    },
    answerValue: {
        color: '#10B981',
        fontSize: 28,
        fontWeight: '800',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        color: '#666',
        fontSize: 12,
    },
});

export default ShareCard;
