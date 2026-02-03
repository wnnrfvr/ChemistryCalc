import React from 'react';
import { View, Text } from 'react-native';
import LevelPlayBanner from '../LevelPlayBanner';
import { LevelPlayAdSize } from 'unity-levelplay-mediation';
import { AD_UNITS } from '../AdManager';

// Temporary ID if not provided, usually these are distinct per format
const BANNER_AD_UNIT_ID = 'p8jinggss5qkw4yt'; // Using Rewarded ID as placeholder, User MUST replace this.

export const BannerAd = ({ unitId, size, ...props }) => {
    // unitId passed from legacy code is likely the Placement Name (e.g. 'Banner_Home')
    // or the old AdMob Unit ID.
    // We'll treat it as placement name if it's a simple string, or ignore it if it looks like an AdMob ID (starts with ca-app-pub)

    let placementName = 'Banner';
    if (unitId && !unitId.startsWith('ca-app-pub')) {
        placementName = unitId;
    }

    return (
        <LevelPlayBanner
            adUnitId={BANNER_AD_UNIT_ID}
            placementName={placementName}
            style={props.style}
        />
    );
};

export const BannerAdSize = {
    ANCHORED_ADAPTIVE_BANNER: LevelPlayAdSize.BANNER,
    BANNER: LevelPlayAdSize.BANNER,
    FULL_BANNER: LevelPlayAdSize.BANNER,
    LARGE_BANNER: LevelPlayAdSize.LARGE,
    MEDIUM_RECTANGLE: LevelPlayAdSize.MEDIUM_RECTANGLE,
    SMART_BANNER: LevelPlayAdSize.BANNER,
};

export const TestIds = {
    BANNER: BANNER_AD_UNIT_ID,
    INTERSTITIAL: AD_UNITS.INTERSTITIAL_ID,
    REWARDED: AD_UNITS.REWARDED_ID,
};

// Shims for removed classes - They should not be used anymore as AdManager handles them,
// but we keep them to prevent crashes if some file still imports them.
export const InterstitialAd = {
    createForAdRequest: () => ({ load: () => { }, show: () => { }, addAdEventListener: () => { } })
};
export const RewardedAd = {
    createForAdRequest: () => ({ load: () => { }, show: () => { }, addAdEventListener: () => { } })
};
export const AdEventType = { LOADED: 'LOADED', CLOSED: 'CLOSED', ERROR: 'ERROR' };
export const RewardedAdEventType = { LOADED: 'LOADED', EARNED_REWARD: 'EARNED_REWARD' };
