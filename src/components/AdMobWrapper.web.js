import React from 'react';
import { View, Text } from 'react-native';

export const BannerAd = () => <View style={{ height: 50, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' }}><Text>Ad Placeholder</Text></View>;
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
