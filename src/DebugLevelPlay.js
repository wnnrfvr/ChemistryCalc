import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Platform } from 'react-native';
import {
    LevelPlay,
    LevelPlayInitRequest,
    LevelPlayInterstitialAd,
    LevelPlayRewardedAd,
    LevelPlayBannerAdView,
    LevelPlayAdSize,
    IronSource
} from 'unity-levelplay-mediation';
import { useAds } from './AdsContext';

// --- CONFIGURATION ---
const APP_KEY_ANDROID = '251a25ebd';
const APP_KEY_IOS = '8545d445';

// Ad Unit IDs
const AD_UNIT_IDS = {
    INTERSTITIAL: 'gl2c8mq7o9ixx7x2',
    REWARDED: 'p8jinggss5qkw4yt',
    BANNER: 'llpqic6rry7c6sng'
};

const DebugLevelPlay = () => {
    // Consume global context
    const {
        isInitialized,
        interstitialLoaded,
        rewardedLoaded,
        showInterstitial,
        showRewarded
    } = useAds();

    const [status, setStatus] = useState({
        init: '⏳ Waiting for Global Init...',
        interstitial: '⏳ Waiting...',
        rewarded: '⏳ Waiting...',
        banner: '⏳ Waiting...'
    });

    const bannerRef = useRef(null);

    // Sync local status with global context
    useEffect(() => {
        if (isInitialized) {
            setStatus(prev => ({ ...prev, init: '✅ Global Init Success' }));
        }
    }, [isInitialized]);

    useEffect(() => {
        setStatus(prev => ({
            ...prev,
            interstitial: interstitialLoaded ? '✅ Loaded' : '❌ Not Ready',
            rewarded: rewardedLoaded ? '✅ Loaded' : '❌ Not Ready'
        }));
    }, [interstitialLoaded, rewardedLoaded]);

    // Banner Load Logic
    useEffect(() => {
        if (isInitialized && bannerRef.current) {
            console.log('🔄 [BANNER] Calling loadAd()...');
            setStatus(prev => ({ ...prev, banner: '⏳ Loading...' }));
            bannerRef.current.loadAd();
        }
    }, [isInitialized]);


    // --- UI HANDLERS ---


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>🐞 LevelPlay Debugger</Text>

            {/* STATUS PANEL */}
            <View style={styles.statusPanel}>
                <Text style={styles.statusRow}>Init Status: {status.init}</Text>
                <Text style={styles.statusRow}>Interstitial: {status.interstitial}</Text>
                <Text style={styles.statusRow}>Rewarded: {status.rewarded}</Text>
                <Text style={styles.statusRow}>Banner: {status.banner}</Text>
            </View>

            {/* CONTROLS */}
            <View style={styles.controls}>
                <Button
                    title="Launch Integration Test Suite"
                    color="#FF5722"
                    onPress={() => {
                        console.log('🚀 Launching Test Suite...');
                        try {
                            // Note: In some versions this might be accessed differently, 
                            // but widely it is LevelPlay.launchTestSuite() or IronSource.launchTestSuite()
                            // UnityLevelPlayMediation wrapper exposes it as LevelPlay.launchTestSuite() usually.
                            // If not available, we try IronSource global if imported.
                            if (IronSource && IronSource.launchTestSuite) {
                                IronSource.launchTestSuite();
                            } else {
                                console.warn('Test Suite API not found on IronSource object');
                            }
                        } catch (e) {
                            console.error('Failed to launch test suite:', e);
                        }
                    }}
                />
                <View style={{ height: 10 }} />
                <Button
                    title="Show Interstitial"
                    onPress={showInterstitial}
                    disabled={status.interstitial !== '✅ Loaded'}
                />
                <View style={{ height: 10 }} />
                <Button
                    title="Show Rewarded"
                    onPress={showRewarded}
                    disabled={status.rewarded !== '✅ Loaded'}
                />
            </View>

            {/* BANNER AREA */}
            <View style={styles.bannerContainer}>
                <Text style={styles.sectionTitle}>Banner Area</Text>
                {isInitialized ? (
                    <LevelPlayBannerAdView
                        ref={bannerRef}
                        adUnitId={AD_UNIT_IDS.BANNER}
                        adSize={LevelPlayAdSize.BANNER}
                        placementName="Banner"
                        onAdLoaded={(adInfo) => {
                            console.log('✅ [BANNER] Loaded successfully:', adInfo);
                            setStatus(prev => ({ ...prev, banner: '✅ Loaded' }));
                        }}
                        onAdLoadFailed={(error) => {
                            console.error('❌ [BANNER] Load Failed:', error);
                            setStatus(prev => ({ ...prev, banner: `❌ Failed: ${error.errorCode}` }));
                        }}
                    />
                ) : (
                    <Text style={styles.placeholder}>Waiting for Init...</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        paddingTop: 50
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    statusPanel: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3
    },
    statusRow: {
        fontSize: 16,
        marginBottom: 8,
        color: '#444',
        fontWeight: '500'
    },
    controls: {
        width: '100%',
        marginBottom: 20
    },
    bannerContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20
    },
    sectionTitle: {
        position: 'absolute',
        top: -25,
        left: 0,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666'
    },
    placeholder: {
        color: '#888'
    }
});

export default DebugLevelPlay;
