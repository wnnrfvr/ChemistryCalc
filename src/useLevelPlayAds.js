
import { useState, useEffect, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import {
    LevelPlay,
    LevelPlayInitRequest,
    LevelPlayInterstitialAd,
    LevelPlayRewardedAd,
    IronSource // Added import
} from 'unity-levelplay-mediation';

// --- CONFIGURATION ---
const APP_KEY_ANDROID = '251a25ebd'; // Production Key (Verified)
const APP_KEY_IOS = '8545d445';      // iOS Key

// !!! TEMPORARILY DISABLED FOR DEVELOPMENT !!!
// Set this to TRUE when ready for deployment or testing ads.
const ADS_ENABLED = true;

// Ad Unit IDs
const AD_UNIT_IDS = {
    INTERSTITIAL: 'gl2c8mq7o9ixx7x2', // Production ID
    REWARDED: 'p8jinggss5qkw4yt', // Production ID
};

const PLACEMENT_NAMES = {
    INTERSTITIAL: 'Interstitial',
    REWARDED: 'Rewarded',
};



// --- HOOK ---
export const useLevelPlayAds = () => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [interstitialLoaded, setInterstitialLoaded] = useState(false);
    const [rewardedLoaded, setRewardedLoaded] = useState(false);

    // Refs to hold ad instances to prevent re-creation on render
    const interstitialAd = useRef(null);
    const rewardedAd = useRef(null);

    // --- INITIALIZATION ---
    useEffect(() => {
        if (!ADS_ENABLED) {
            console.log('🚫 Ads are TEMPORARILY DISABLED via ADS_ENABLED flag.');
            return;
        }

        const initLevelPlay = async () => {
            try {
                const appKey = Platform.select({
                    ios: APP_KEY_IOS,
                    android: APP_KEY_ANDROID,
                });

                console.log('🔄 STARTING LevelPlay Init...');
                console.log('App Key:', appKey);

                // DIAGNOSTICS
                console.log('Def: LevelPlay:', !!LevelPlay);
                console.log('Def: LevelPlayInitRequest:', !!LevelPlayInitRequest);
                if (LevelPlayInitRequest) {
                    console.log('Def: LevelPlayInitRequest.builder:', !!LevelPlayInitRequest.builder);
                    console.log('Def: LevelPlayInitRequest.Builder:', !!LevelPlayInitRequest.Builder);
                }

                // Initialize Call
                // Enable Debug Mode for Adapters (Like in Example)
                await LevelPlay.setAdaptersDebug(true);

                const initRequest = LevelPlayInitRequest.builder(appKey)
                    .build();

                const listener = {
                    onInitSuccess: (config) => {
                        console.log('✅ LevelPlay Initialized:', config);
                        setIsInitialized(true);
                    },
                    onInitFailed: (error) => {
                        console.error('❌ LevelPlay Init Failed:', error);
                        // Simple retry logic
                        setTimeout(() => {
                            console.log('🔄 Retrying LevelPlay Init...');
                            LevelPlay.init(initRequest, listener);
                        }, 5000);
                    },
                };

                console.log('⏳ LevelPlay.init() executing...');
                LevelPlay.init(initRequest, listener);

            } catch (err) {
                console.error('☠️ CRITICAL: Error during LevelPlay init execution:', err);
            }
        };

        initLevelPlay();
    }, []);

    // --- CREATE ADS (Once Initialized) ---
    useEffect(() => {
        if (!isInitialized) return;

        // 1. Create Interstitial
        if (!interstitialAd.current) {
            console.log('📺 Creating Interstitial Ad:', AD_UNIT_IDS.INTERSTITIAL);
            const ad = new LevelPlayInterstitialAd(AD_UNIT_IDS.INTERSTITIAL);

            ad.setListener({
                onAdLoaded: (adInfo) => {
                    console.log('📺 Interstitial Loaded');
                    setInterstitialLoaded(true);
                },
                onAdLoadFailed: (error) => {
                    console.log('📺 Interstitial Load Failed:', error);
                    setInterstitialLoaded(false);
                    // Simple retry mechanism
                    setTimeout(() => ad.loadAd(), 30000);
                },
                onAdClosed: (adInfo) => {
                    console.log('📺 Interstitial Closed');
                    setInterstitialLoaded(false);
                    ad.loadAd(); // Reload
                },
                onAdDisplayFailed: (error, adInfo) => {
                    console.error('📺 Interstitial Show Failed:', error);
                    setInterstitialLoaded(false);
                    ad.loadAd();
                },
                onAdClicked: (adInfo) => { console.log('📺 Interstitial Clicked'); }
            });

            interstitialAd.current = ad;
            ad.loadAd();
        }

        // 2. Create Rewarded
        if (!rewardedAd.current) {
            console.log('🎁 Creating Rewarded Ad:', AD_UNIT_IDS.REWARDED);
            const ad = new LevelPlayRewardedAd(AD_UNIT_IDS.REWARDED);

            ad.setListener({
                onAdLoaded: (adInfo) => {
                    console.log('🎁 Rewarded Ad Loaded');
                    setRewardedLoaded(true);
                },
                onAdLoadFailed: (error) => {
                    console.log('🎁 Rewarded Load Failed:', error);
                    setRewardedLoaded(false);
                    setTimeout(() => ad.loadAd(), 30000);
                },
                onAdClosed: (adInfo) => {
                    console.log('🎁 Rewarded Ad Closed');
                    setRewardedLoaded(false);
                    ad.loadAd();
                },
                onAdRewarded: (reward, adInfo) => {
                    console.log('🎁 User Rewarded:', reward);
                    // We emit a custom event or callback here if needed, 
                    // but usually the show function handles the promise resolution
                },
                onAdDisplayFailed: (error, adInfo) => {
                    console.error('🎁 Rewarded Show Failed:', error);
                    setRewardedLoaded(false);
                    ad.loadAd();
                }
            });

            rewardedAd.current = ad;
            ad.loadAd();
        }

    }, [isInitialized]);

    // --- PUBLIC METHODS ---

    const showInterstitial = useCallback(async () => {
        if (!interstitialAd.current || !interstitialLoaded) {
            console.log('⚠️ Interstitial not ready. Attempting to load...');
            interstitialAd.current?.loadAd();
            return false;
        }

        // Check Placement Capping
        const isCapped = await LevelPlayInterstitialAd.isPlacementCapped(PLACEMENT_NAMES.INTERSTITIAL);
        if (isCapped) {
            console.warn(`⚠️ Placement ${PLACEMENT_NAMES.INTERSTITIAL} is capped.`);
            return false;
        }

        // Double check with isAdReady
        const isReady = await interstitialAd.current.isAdReady();
        if (isReady) {
            interstitialAd.current.showAd(PLACEMENT_NAMES.INTERSTITIAL);
            return true;
        } else {
            console.log('⚠️ Interstitial reported not ready by SDK. Reloading...');
            interstitialAd.current.loadAd();
        }
        return false;
    }, [interstitialLoaded]);

    const showRewarded = useCallback(async (onReward) => {
        if (!rewardedAd.current || !rewardedLoaded) {
            console.log('⚠️ Rewarded not ready. Attempting to load...');
            rewardedAd.current?.loadAd();
            return false;
        }


        // Note: The newer LevelPlay SDK often handles rewards via the listener.
        // For this simple hook, we'll assume the caller waits for the ad to close/reward.
        // Since listeners are bound in useEffect, passing `onReward` dynamically is tricky 
        // without a ref or context. For now, we just show it.

        const isReady = await rewardedAd.current.isAdReady();
        if (isReady) {
            rewardedAd.current.showAd(PLACEMENT_NAMES.REWARDED);
            return true;
        }
        return false;
    }, [rewardedLoaded]);

    return {
        isInitialized,
        interstitialLoaded,
        rewardedLoaded,
        showInterstitial,
        showRewarded
    };
};
