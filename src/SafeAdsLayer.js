import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Platform, ScrollView } from 'react-native';
import {
    LevelPlay,
    LevelPlayInitRequest,
    LevelPlayBannerAdView,
    LevelPlayAdSize,
    LevelPlayInterstitialAd,
    LevelPlayRewardedAd
} from 'unity-levelplay-mediation';

// --- CONFIGURATION ---
// --- CONFIGURATION ---
const APP_KEY_ANDROID = '251a25ebd';
const APP_KEY_IOS = '8545d445';

// !!! DISABLED !!!
const ADS_ENABLED = true;

const AD_UNIT_IDS = {
    BANNER: 'llpqic6rry7c6sng', // Production ID
    INTERSTITIAL: 'gl2c8mq7o9ixx7x2', // Production ID
    REWARDED: 'p8jinggss5qkw4yt', // Production ID
};

const SafeAdsLayer = () => {
    const [isSdkReady, setSdkReady] = useState(false);
    const [interstitialAd, setInterstitialAd] = useState(null);
    const [rewardedAd, setRewardedAd] = useState(null);
    const bannerRef = useRef(null);

    // 1. Strict Initialization Logic
    useEffect(() => {
        if (!ADS_ENABLED) return; // Exit early

        const initSDK = async () => {
            const appKey = Platform.select({
                ios: APP_KEY_IOS,
                android: APP_KEY_ANDROID,
            });

            console.log(`🚀 [SafeAdsLayer] Initializing SDK with key: ${appKey}`);

            const initRequest = new LevelPlayInitRequest.Builder(appKey).build();

            const listener = {
                onInitSuccess: (config) => {
                    console.log('✅ SDK READY - Showing Ads Now');
                    setSdkReady(true);
                },
                onInitFailed: (error) => {
                    console.error('❌ SDK Init Failed:', error);
                },
            };

            LevelPlay.init(initRequest, listener);
        };

        initSDK();
    }, []);

    // 2. Load Interstitial/Rewarded ONLY after SDK is ready
    useEffect(() => {
        if (!isSdkReady) return;

        console.log('🏗️ [SafeAdsLayer] SDK Ready, creating ad objects...');

        // Create Interstitial
        const interstitial = new LevelPlayInterstitialAd(AD_UNIT_IDS.INTERSTITIAL);
        interstitial.setListener({
            onAdLoaded: () => console.log('✅ Interstitial Loaded'),
            onAdLoadFailed: (e) => console.log('❌ Interstitial Load Failed', e),
            onAdClosed: () => interstitial.loadAd(),
        });
        setInterstitialAd(interstitial);

        // Create Rewarded
        const rewarded = new LevelPlayRewardedAd(AD_UNIT_IDS.REWARDED);
        rewarded.setListener({
            onAdLoaded: () => console.log('✅ Rewarded Loaded'),
            onAdLoadFailed: (e) => console.log('❌ Rewarded Load Failed', e),
            onAdClosed: () => rewarded.loadAd(),
        });
        setRewardedAd(rewarded);

        // Load them immediately
        interstitial.loadAd();
        rewarded.loadAd();

    }, [isSdkReady]);

    // 3. Banner Manual Load
    useEffect(() => {
        if (isSdkReady && bannerRef.current) {
            console.log('🔄 [SafeAdsLayer] Loading Banner now that SDK is ready...');
            bannerRef.current.loadAd();
        }
    }, [isSdkReady]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>🛡️ Safe Ads Layer</Text>

            <Text style={styles.status}>
                SDK Status: {isSdkReady ? '✅ READY' : '⏳ INITIALIZING...'}
            </Text>

            <View style={styles.controls}>
                <Button
                    title="Show Interstitial"
                    disabled={!isSdkReady}
                    onPress={() => interstitialAd?.showAd('SafeInterstitial')}
                />
                <View style={{ height: 10 }} />
                <Button
                    title="Show Rewarded"
                    disabled={!isSdkReady}
                    onPress={() => rewardedAd?.showAd('SafeRewarded')}
                />
            </View>

            <Text style={styles.sectionTitle}>Banner Ad (Conditional Render)</Text>

            <View style={styles.bannerContainer}>
                {isSdkReady ? (
                    <LevelPlayBannerAdView
                        ref={bannerRef}
                        adUnitId={AD_UNIT_IDS.BANNER}
                        adSize={LevelPlayAdSize.BANNER}
                        placementName="Banner"
                        onAdLoaded={() => console.log('✅ Banner Loaded & Displayed')}
                        onAdLoadFailed={(e) => console.error('❌ Banner Failed:', e)}
                    />
                ) : (
                    <View style={[styles.placeholder, { backgroundColor: 'transparent' }]} />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    status: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#555',
    },
    controls: {
        width: '100%',
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#666',
    },
    bannerContainer: {
        width: 320,
        height: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#999',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#e0e0e0',
    },
    placeholderText: {
        color: '#888',
        fontStyle: 'italic',
    }
});

export default SafeAdsLayer;
