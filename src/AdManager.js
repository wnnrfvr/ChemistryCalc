// AdManager.js - Complete Ad Management System
// Unified, smart ad management with frequency capping & native ad support

import AsyncStorage from '@react-native-async-storage/async-storage';
import { InterstitialAd, RewardedAd, AdEventType, RewardedAdEventType, TestIds } from './components/AdMobWrapper';

const AD_STATE_KEY = '@ad_state_v2';

// ========================================
// AD UNIT IDS - Your Production IDs
// ========================================
export const AD_UNITS = {
    BANNER_HOME: 'ca-app-pub-8342678716913452/9214380156',
    BANNER_RESULT: 'ca-app-pub-8342678716913452/8854618543',
    INTERSTITIAL: 'ca-app-pub-8342678716913452/3774351217',
    REWARDED: 'ca-app-pub-8342678716913452/1945595260',
};

// ========================================
// AD PLACEMENT STRATEGY
// ========================================
export const AD_STRATEGY = {
    // Interstitial Rules
    INTERSTITIAL_COOLDOWN_MS: 2 * 60 * 1000,  // 2 minutes between ads
    CALCULATIONS_BEFORE_AD: 4,                 // Show after every 4th calculation
    MAX_INTERSTITIALS_PER_SESSION: 6,         // Max per session

    // Banner Placement
    BANNER_SCREENS: ['Home', 'Glossary', 'PeriodicTable', 'QuickReference', 'Settings'],
    NO_BANNER_SCREENS: ['Quiz'],              // Never show during quiz

    // Rewarded Ad Opportunities
    REWARDED_XP_AMOUNT: 50,                   // XP reward for watching
    REWARDED_AD_FREE_MINUTES: 30,             // Ad-free time reward
};

// ========================================
// AD MANAGER SERVICE
// ========================================
class AdManagerService {
    constructor() {
        this.state = {
            lastInterstitialTime: 0,
            interstitialsShownThisSession: 0,
            calculationsSinceLastAd: 0,
            sessionStartTime: Date.now(),
            adFreeUntil: 0,
            totalAdsWatched: 0,
        };

        this.interstitial = null;
        this.rewarded = null;
        this.isInitialized = false;
        this.interstitialLoaded = false;
        this.rewardedLoaded = false;
    }

    // Initialize ads on app start
    async initialize() {
        if (this.isInitialized) return;

        await this.loadState();
        this.createInterstitial();
        this.createRewarded();
        this.isInitialized = true;

        console.log('✅ AdManager initialized');
    }

    async loadState() {
        try {
            const saved = await AsyncStorage.getItem(AD_STATE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            }
        } catch (e) {
            console.error('Error loading ad state:', e);
        }
    }

    async saveState() {
        try {
            await AsyncStorage.setItem(AD_STATE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Error saving ad state:', e);
        }
    }

    // ========================================
    // INTERSTITIAL ADS
    // ========================================
    createInterstitial() {
        const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : AD_UNITS.INTERSTITIAL;

        this.interstitial = InterstitialAd.createForAdRequest(adUnitId, {
            keywords: ['education', 'chemistry', 'science', 'learning'],
        });

        this.interstitial.addAdEventListener(AdEventType.LOADED, () => {
            console.log('📺 Interstitial loaded');
            this.interstitialLoaded = true;
        });

        this.interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            console.log('📺 Interstitial closed, reloading...');
            this.interstitialLoaded = false;
            this.interstitial.load();
        });

        this.interstitial.load();
    }

    // Check if we can show interstitial
    canShowInterstitial() {
        const now = Date.now();

        // Check ad-free mode
        if (now < this.state.adFreeUntil) {
            console.log('🔕 Ad-free mode active');
            return false;
        }

        // Check cooldown
        if (now - this.state.lastInterstitialTime < AD_STRATEGY.INTERSTITIAL_COOLDOWN_MS) {
            console.log('⏱️ Interstitial cooldown active');
            return false;
        }

        // Check session limit
        if (this.state.interstitialsShownThisSession >= AD_STRATEGY.MAX_INTERSTITIALS_PER_SESSION) {
            console.log('🚫 Max interstitials reached for session');
            return false;
        }

        return true;
    }

    // Call after calculation - tracks and shows ad when appropriate
    onCalculationComplete() {
        this.state.calculationsSinceLastAd++;

        if (this.state.calculationsSinceLastAd >= AD_STRATEGY.CALCULATIONS_BEFORE_AD) {
            if (this.canShowInterstitial()) {
                this.state.calculationsSinceLastAd = 0;
                return true; // Caller should show ad
            }
        }
        return false;
    }

    // Call after quiz completion
    onQuizComplete() {
        return this.canShowInterstitial();
    }

    // Actually show the interstitial
    async showInterstitial(onComplete) {
        if (!this.canShowInterstitial()) {
            if (onComplete) onComplete();
            return false;
        }

        try {
            await this.interstitial.show();

            this.state.lastInterstitialTime = Date.now();
            this.state.interstitialsShownThisSession++;
            this.state.totalAdsWatched++;
            this.saveState();

            if (onComplete) onComplete();
            return true;
        } catch (error) {
            console.log('Error showing interstitial:', error);
            if (onComplete) onComplete();
            return false;
        }
    }

    // ========================================
    // REWARDED ADS
    // ========================================

    // Simple method for showing rewarded ad with XP + ad-free combo
    async showRewarded(onComplete) {
        return new Promise((resolve) => {
            this.showRewardedAd('bonus_xp',
                () => {
                    // Grant ad-free
                    this.state.adFreeUntil = Date.now() + (AD_STRATEGY.REWARDED_AD_FREE_MINUTES * 60 * 1000);
                    this.saveState();

                    // Return XP amount to caller
                    if (onComplete) onComplete(AD_STRATEGY.REWARDED_XP_AMOUNT);
                    resolve(true);
                },
                () => {
                    if (onComplete) onComplete(0);
                    resolve(false);
                }
            );
        });
    }

    createRewarded() {
        const adUnitId = __DEV__ ? TestIds.REWARDED : AD_UNITS.REWARDED;

        this.rewarded = RewardedAd.createForAdRequest(adUnitId, {
            keywords: ['education', 'chemistry', 'science', 'learning'],
        });

        // Use RewardedAdEventType for loaded event
        this.rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            console.log('🎁 Rewarded ad loaded successfully!');
            this.rewardedLoaded = true;
        });

        this.rewarded.addAdEventListener(AdEventType.ERROR, (error) => {
            console.log('🎁 Rewarded ad error:', error);
            this.rewardedLoaded = false;
            // Retry loading after delay
            setTimeout(() => {
                console.log('🎁 Retrying rewarded ad load...');
                this.rewarded.load();
            }, 5000);
        });

        console.log('🎁 Starting rewarded ad load...');
        this.rewarded.load();
    }

    // Force preload rewarded ad (call when user opens Settings)
    preloadRewarded() {
        if (!this.rewardedLoaded && this.rewarded) {
            console.log('🎁 Preloading rewarded ad...');
            this.rewarded.load();
        }
    }


    async showRewardedAd(rewardType, onRewarded, onFailed) {
        // Check if ad is loaded
        if (!this.rewardedLoaded) {
            console.log('🎁 Rewarded ad not loaded yet, loading now...');
            this.rewarded.load();
            if (onFailed) onFailed();
            return;
        }

        try {
            let rewardEarned = false;

            const rewardListener = this.rewarded.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                () => {
                    rewardEarned = true;
                    console.log('🎁 Reward earned:', rewardType);
                }
            );

            const closedListener = this.rewarded.addAdEventListener(
                AdEventType.CLOSED,
                () => {
                    this.rewardedLoaded = false;
                    this.rewarded.load(); // Reload for next time

                    if (rewardEarned) {
                        // Grant the reward based on type
                        if (rewardType === 'bonus_xp') {
                            // XP will be granted by caller
                        } else if (rewardType === 'ad_free') {
                            this.state.adFreeUntil = Date.now() + (AD_STRATEGY.REWARDED_AD_FREE_MINUTES * 60 * 1000);
                            this.saveState();
                        }

                        if (onRewarded) onRewarded();
                    } else {
                        if (onFailed) onFailed();
                    }

                    rewardListener();
                    closedListener();
                }
            );

            await this.rewarded.show();
        } catch (error) {
            console.log('Error showing rewarded ad:', error);
            if (onFailed) onFailed();
        }
    }

    // ========================================
    // BANNER PLACEMENT LOGIC
    // ========================================
    shouldShowBanner(screenName) {
        const now = Date.now();

        // Ad-free mode
        if (now < this.state.adFreeUntil) return false;

        // Check screen rules
        if (AD_STRATEGY.NO_BANNER_SCREENS.includes(screenName)) return false;

        return true;
    }

    getBannerUnitId(placement = 'home') {
        if (__DEV__) return TestIds.BANNER;
        return placement === 'result' ? AD_UNITS.BANNER_RESULT : AD_UNITS.BANNER_HOME;
    }

    // Check if rewarded ad is ready
    isRewardedReady() {
        return this.rewardedLoaded;
    }

    // Check if interstitial is ready
    isInterstitialReady() {
        return this.interstitialLoaded;
    }

    // ========================================
    // AD-FREE MODE
    // ========================================
    isAdFree() {
        return Date.now() < this.state.adFreeUntil;
    }

    getAdFreeTimeRemaining() {
        const remaining = this.state.adFreeUntil - Date.now();
        return remaining > 0 ? Math.ceil(remaining / 60000) : 0; // Minutes
    }

    // ========================================
    // STATS
    // ========================================
    getStats() {
        return {
            totalAdsWatched: this.state.totalAdsWatched,
            interstitialsThisSession: this.state.interstitialsShownThisSession,
            isAdFree: this.isAdFree(),
            adFreeMinutesRemaining: this.getAdFreeTimeRemaining(),
        };
    }
}

export const AdManager = new AdManagerService();
export default AdManager;
