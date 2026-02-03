// AdManager.js - LevelPlay Implementation
import { Platform } from 'react-native';
import {
    LevelPlay,
    LevelPlayInitRequest,
    LevelPlayInterstitialAd,
    LevelPlayRewardedAd,
    LevelPlayAdSize
} from 'unity-levelplay-mediation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_KEY_ANDROID = '251a25ebd';
const APP_KEY_IOS = '8545d445';

export const AD_UNITS = {
    // LevelPlay Ad Unit IDs & Placement Names
    INTERSTITIAL_ID: 'gl2c8mq7o9ixx7x2',
    REWARDED_ID: 'p8jinggss5qkw4yt',
    BANNER_ID: 'llpqic6rry7c6sng',

    // Placements
    PLACEMENT_INTERSTITIAL: 'Interstitial',
    PLACEMENT_REWARDED: 'Rewarded',
    PLACEMENT_BANNER: 'Banner'
};

const AD_STATE_KEY = '@ad_state_levelplay_v1';

export const AD_STRATEGY = {
    INTERSTITIAL_COOLDOWN_MS: 2 * 60 * 1000,
    CALCULATIONS_BEFORE_AD: 4,
    MAX_INTERSTITIALS_PER_SESSION: 6,
    NO_BANNER_SCREENS: ['Quiz'],
    REWARDED_XP_AMOUNT: 50,
    REWARDED_AD_FREE_MINUTES: 30,
};

class AdManagerService {
    constructor() {
        this.state = {
            lastInterstitialTime: 0,
            interstitialsShownThisSession: 0,
            calculationsSinceLastAd: 0,
            adFreeUntil: 0,
            totalAdsWatched: 0,
        };

        this.isInitialized = false;
        this.interstitial = null;
        this.listeners = [];
    }

    addListener(callback) {
        this.listeners.push(callback);
        // Immediate callback if already initialized
        if (this.isInitialized) {
            callback(true);
        }
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    async initialize() {
        if (this.isInitialized) return;

        await this.loadState();

        const appKey = Platform.select({
            ios: APP_KEY_IOS,
            android: APP_KEY_ANDROID,
        });

        // Initialize LevelPlay
        const initRequest = LevelPlayInitRequest.builder(appKey).build();
        const listener = {
            onInitSuccess: (config) => {
                console.log('✅ LevelPlay Initialized (AdManager)');
                this.isInitialized = true;
                this.listeners.forEach(cb => cb(true));
                this.loadAds();
            },
            onInitFailed: (error) => {
                console.error('❌ LevelPlay Init Failed:', error);
                setTimeout(() => this.initialize(), 5000);
            }
        };
        LevelPlay.init(initRequest, listener);
    }

    loadAds() {
        // Interstitial
        this.interstitial = new LevelPlayInterstitialAd(AD_UNITS.INTERSTITIAL_ID);
        this.interstitial.setListener({
            onAdLoaded: () => console.log('📺 Interstitial Loaded'),
            onAdLoadFailed: (e) => console.log('📺 Interstitial Load Failed', e),
            onAdClosed: () => this.interstitial.loadAd(), // Auto reload
            onAdDisplayFailed: () => this.interstitial.loadAd()
        });
        this.interstitial.loadAd();

        // Rewarded
        this.rewarded = new LevelPlayRewardedAd(AD_UNITS.REWARDED_ID);
        this.rewarded.setListener({
            onAdLoaded: () => console.log('🎁 Rewarded Loaded'),
            onAdLoadFailed: (e) => console.log('🎁 Rewarded Load Failed', e),
            onAdClosed: () => this.rewarded.loadAd(),
            onAdDisplayFailed: () => this.rewarded.loadAd(),
            onAdRewarded: (reward) => {
                console.log('🎁 Reward Earned:', reward);
                // Listeners handled in showRewarded
            }
        });
        this.rewarded.loadAd();
    }

    async loadState() {
        try {
            const saved = await AsyncStorage.getItem(AD_STATE_KEY);
            if (saved) this.state = { ...this.state, ...JSON.parse(saved) };
        } catch (e) {
            console.error('Error loading ad state', e);
        }
    }

    async saveState() {
        try {
            await AsyncStorage.setItem(AD_STATE_KEY, JSON.stringify(this.state));
        } catch (e) {
            console.error('Error saving ad state', e);
        }
    }

    // Logic
    canShowInterstitial() {
        if (!this.isInitialized) return false;
        if (Date.now() < this.state.adFreeUntil) return false;
        if (Date.now() - this.state.lastInterstitialTime < AD_STRATEGY.INTERSTITIAL_COOLDOWN_MS) return false;
        return true;
    }

    async showInterstitial(onComplete) {
        if (!this.canShowInterstitial()) {
            if (onComplete) onComplete();
            return false;
        }

        const isReady = await this.interstitial.isAdReady();
        if (isReady) {
            this.interstitial.showAd(AD_UNITS.PLACEMENT_INTERSTITIAL);
            this.state.lastInterstitialTime = Date.now();
            this.saveState();
            if (onComplete) onComplete(); // In reality, better to wait for close
            return true;
        } else {
            this.interstitial.loadAd();
            if (onComplete) onComplete();
            return false;
        }
    }

    async showRewarded(onReward) {
        if (!this.isInitialized) return false;

        const isReady = await this.rewarded.isAdReady();
        if (isReady) {
            // Override listener for this specific show instance
            this.rewarded.setListener({
                onAdLoaded: () => { }, // Already loaded
                onAdLoadFailed: () => { },
                onAdClosed: () => this.rewarded.loadAd(),
                onAdDisplayFailed: () => this.rewarded.loadAd(),
                onAdRewarded: (reward) => {
                    console.log('🎁 User Earned Reward:', reward);
                    if (onReward) onReward();
                }
            });

            this.rewarded.showAd(AD_UNITS.PLACEMENT_REWARDED);
            return true;
        }

        // Try loading if not ready for next time
        this.rewarded.loadAd();
        return false;
    }

    onCalculationComplete() {
        if (this.isAdFree()) return false;
        this.state.calculationsSinceLastAd++;
        if (this.state.calculationsSinceLastAd >= AD_STRATEGY.CALCULATIONS_BEFORE_AD) {
            this.state.calculationsSinceLastAd = 0;
            return true;
        }
        return false;
    }

    isAdFree() {
        return Date.now() < this.state.adFreeUntil;
    }

    getAdFreeTimeRemaining() {
        if (!this.isAdFree()) return 0;
        const remainingMs = this.state.adFreeUntil - Date.now();
        return Math.ceil(remainingMs / (60 * 1000));
    }

    shouldShowBanner(screenName) {
        if (this.isAdFree()) return false;
        if (AD_STRATEGY.NO_BANNER_SCREENS.includes(screenName)) return false;
        return true;
    }

    getBannerUnitId(placement) {
        return AD_UNITS.BANNER_ID;
    }
    preloadRewarded() {
        if (this.rewarded) {
            this.rewarded.loadAd();
        }
    }

    async isRewardedReady() {
        if (!this.rewarded) return false;
        return await this.rewarded.isAdReady();
    }
}

export const AdManager = new AdManagerService();
// Auto-init
AdManager.initialize();
export default AdManager;
