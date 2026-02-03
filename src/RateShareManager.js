// RateShareManager.js - App Rating & Sharing
import { Share, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RATE_PROMPT_KEY = '@rate_prompt_data';

// UPDATE THESE WITH YOUR REAL APP STORE LINKS
export const STORE_URLS = {
    PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.decadino.ChemistryCalc',
    APP_STORE: 'https://apps.apple.com/app/id123456789', // Replace with your App Store ID
};

// Get the appropriate store URL for current platform
export const getStoreUrl = () => {
    return Platform.OS === 'ios' ? STORE_URLS.APP_STORE : STORE_URLS.PLAY_STORE;
};

// --- Smart Rate Prompt Logic ---
const RATE_CONDITIONS = {
    xpMilestone: 500,              // Show at 500 XP milestone
    daysBetweenPrompts: 14,         // Don't ask again for 14 days
    maxPromptsEver: 3,              // Maximum 3 times ever
};

class RateShareManagerService {
    constructor() {
        this.data = {
            lastPromptDate: null,
            promptCount: 0,
            hasRated: false,
            neverAskAgain: false,
            lastXpMilestone: 0,         // Track last XP milestone shown
        };
        this.listeners = [];
        this.loadData();
    }

    async loadData() {
        try {
            const stored = await AsyncStorage.getItem(RATE_PROMPT_KEY);
            if (stored) {
                this.data = { ...this.data, ...JSON.parse(stored) };
            }
        } catch (e) {
            console.error('Error loading rate data:', e);
        }
    }

    async saveData() {
        try {
            await AsyncStorage.setItem(RATE_PROMPT_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.error('Error saving rate data:', e);
        }
    }

    // Check if should show rating based on XP
    shouldShowRatingForXP(currentXP) {
        // Don't show if already rated or said never
        if (this.data.hasRated || this.data.neverAskAgain) {
            return false;
        }

        // Max prompts reached
        if (this.data.promptCount >= RATE_CONDITIONS.maxPromptsEver) {
            return false;
        }

        // Check time since last prompt
        if (this.data.lastPromptDate) {
            const daysSincePrompt = (Date.now() - this.data.lastPromptDate) / (1000 * 60 * 60 * 24);
            if (daysSincePrompt < RATE_CONDITIONS.daysBetweenPrompts) {
                return false;
            }
        }

        // Check if reached new 500 XP milestone
        const currentMilestone = Math.floor(currentXP / RATE_CONDITIONS.xpMilestone) * RATE_CONDITIONS.xpMilestone;

        if (currentMilestone >= RATE_CONDITIONS.xpMilestone && currentMilestone > this.data.lastXpMilestone) {
            return true;
        }

        return false;
    }

    // Record that we showed a prompt
    recordPromptShown(currentXP) {
        const currentMilestone = Math.floor(currentXP / RATE_CONDITIONS.xpMilestone) * RATE_CONDITIONS.xpMilestone;

        this.data.lastPromptDate = Date.now();
        this.data.promptCount++;
        this.data.lastXpMilestone = currentMilestone;
        this.saveData();
    }

    // Increment completed quiz count
    incrementQuiz() {
        this.data.quizCount = (this.data.quizCount || 0) + 1;
        this.saveData();
    }

    // User completed rating
    recordRatingComplete(rating) {
        if (rating >= 4) {
            this.data.hasRated = true;
        }
        this.saveData();
    }

    // User said never ask again
    setNeverAsk() {
        this.data.neverAskAgain = true;
        this.saveData();
    }

    // Open app store directly
    openStore() {
        const url = getStoreUrl();
        Linking.openURL(url).catch(err => console.error('Error opening store:', err));
    }

    // --- Share App with Store Link ---
    async shareApp() {
        const storeUrl = getStoreUrl();
        try {
            const result = await Share.share({
                message: `📱 Check out Chemistry Calc - the best app for learning chemistry! 🧪\n\n` +
                    `✅ Solve stoichiometry, gas laws, pH & more\n` +
                    `✅ Interactive periodic table\n` +
                    `✅ 75+ quiz questions\n` +
                    `✅ Daily challenges & XP system\n\n` +
                    `Download FREE: ${storeUrl}`,
                title: 'Share Chemistry Calc',
            });

            return result.action === Share.sharedAction;
        } catch (error) {
            console.error('Error sharing app:', error);
            return false;
        }
    }

    // Invite friends with personalized message
    async inviteFriends() {
        const storeUrl = getStoreUrl();
        try {
            await Share.share({
                message: `🧪 Hey! I've been learning chemistry with this awesome app and thought you'd like it!\n\n` +
                    `Chemistry Calc helps with:\n` +
                    `📐 All types of chemistry calculations\n` +
                    `🎮 Fun quizzes to test your knowledge\n` +
                    `⚗️ Interactive periodic table\n` +
                    `🏆 XP & leveling system\n\n` +
                    `Join me! Download free: ${storeUrl}`,
                title: 'Invite Friends to Chemistry Calc',
            });
        } catch (error) {
            console.error('Error sharing invite:', error);
        }
    }

    // Share a quiz score
    async shareQuizScore(score, totalQuestions) {
        const storeUrl = getStoreUrl();
        try {
            await Share.share({
                message: `🧪 I just scored ${score} XP in Chemistry Calc! 🎉\n\n` +
                    `Think you can beat me? Download the app and try!\n\n` +
                    `${storeUrl}`,
                title: 'Share Quiz Score',
            });
        } catch (error) {
            console.error('Error sharing score:', error);
        }
    }

    // Share a calculation result
    async shareCalculation(type, problem, result) {
        const storeUrl = getStoreUrl();
        try {
            await Share.share({
                message: `🧪 Chemistry Calc Solution:\n\n` +
                    `${type}\n` +
                    `Problem: ${problem}\n` +
                    `Answer: ${result}\n\n` +
                    `Get the app: ${storeUrl}`,
                title: 'Share Chemistry Solution',
            });
        } catch (error) {
            console.error('Error sharing calculation:', error);
        }
    }
}

export const RateShareManager = new RateShareManagerService();
export default RateShareManager;
