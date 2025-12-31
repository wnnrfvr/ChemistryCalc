// ShareManager.js - Centralized social sharing utility
import { Share, Platform } from 'react-native';

export const ShareManager = {
    // Share a calculation result
    shareCalculation: async (type, problem, answer) => {
        try {
            const message = `🧪 Chemistry Calculator\n\n${type}\n\nProblem: ${problem}\n\nAnswer: ${answer}\n\n📱 Get the app and master chemistry!`;

            await Share.share({
                message,
                title: 'Check out this chemistry calculation!',
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    },

    // Share a quiz score
    shareQuizScore: async (score, questionsAnswered) => {
        try {
            const message = `🎯 I scored ${score} points in Chemistry Quiz!\n\nAnswered ${questionsAnswered} questions correctly.\n\n🧪 Can you beat my score? Get the app!`;

            await Share.share({
                message,
                title: 'My Chemistry Quiz Score!',
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    },

    // Share the app
    shareApp: async () => {
        try {
            const message = `🧪 Chemistry Calculator - Your Chemistry Companion!\n\n✓ Equation Balancer\n✓ Interactive Periodic Table\n✓ Stoichiometry Solver\n✓ Quiz Mode\n✓ 1000+ Practice Problems\n\n📱 Download now and ace your chemistry!`;

            await Share.share({
                message,
                title: 'Chemistry Calculator App',
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    },

    // Share a cool chemistry fact
    shareFact: async (fact) => {
        try {
            const message = `💡 Chemistry Fact:\n\n${fact}\n\n🧪 Learn more with Chemistry Calculator!`;

            await Share.share({
                message,
                title: 'Interesting Chemistry Fact',
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    },

    // Share a balanced equation
    shareBalancedEquation: async (input, balanced) => {
        try {
            const message = `⚗️ Equation Balancer\n\nUnbalanced: ${input}\nBalanced: ${balanced}\n\n🧪Easy chemistry with Chemistry Calculator!`;

            await Share.share({
                message,
                title: 'Balanced Chemical Equation',
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    }
};
