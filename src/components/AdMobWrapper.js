// AdMobWrapper.js - Real AdMob Implementation
// This file re-exports the actual react-native-google-mobile-ads components

// ============================================
// PRODUCTION: Use real ads
// ============================================
export {
    BannerAd,
    BannerAdSize,
    TestIds,
    InterstitialAd,
    RewardedAd,
    AdEventType,
    RewardedAdEventType
} from 'react-native-google-mobile-ads';

// ============================================
// DEVELOPMENT MOCK: Uncomment below if you need to test without native rebuild
// ============================================
/*
import React from 'react';
import { View, Text } from 'react-native';

export const BannerAd = () => (
    <View style={{ height: 50, backgroundColor: '#222', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff' }}>Ad Placeholder</Text>
    </View>
);
export const BannerAdSize = { ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER' };
export const TestIds = {
    BANNER: 'test-banner',
    INTERSTITIAL: 'test-interstitial',
    REWARDED: 'test-rewarded'
};
export const InterstitialAd = {
    createForAdRequest: () => ({
        load: () => { },
        show: () => Promise.resolve(),
        addAdEventListener: () => () => { }
    })
};
export const RewardedAd = {
    createForAdRequest: () => ({
        load: () => { },
        show: () => Promise.resolve(),
        addAdEventListener: () => () => { }
    })
};
export const AdEventType = {
    LOADED: 'LOADED',
    ERROR: 'ERROR',
    CLOSED: 'CLOSED',
    EARNED_REWARD: 'EARNED_REWARD'
};
export const RewardedAdEventType = {
    LOADED: 'LOADED',
    EARNED_REWARD: 'EARNED_REWARD'
};
*/
