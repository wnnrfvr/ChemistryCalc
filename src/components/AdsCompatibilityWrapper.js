// AdsCompatibilityWrapper.js - Unified Ad Wrapper
// Now wrapping Unity LevelPlay components to maintain compatibility
import React, { useMemo } from 'react';
import { LevelPlayAdSize } from 'unity-levelplay-mediation';
import LevelPlayBanner from '../LevelPlayBanner';

// Re-export LevelPlay components with names matching old usage where possible, 
// OR just export them directly and we update the consumers.
// Consumers used: <BannerAd ... />
// We will create a compatibility component.

export const BannerAd = ({ unitId, onAdLoaded, onAdFailedToLoad }) => {

    return (
        <LevelPlayBanner
            adUnitId={unitId}
            onAdLoaded={onAdLoaded}
            onAdLoadFailed={onAdFailedToLoad}
            placementName="Banner"
        />
    );
};

export const BannerAdSize = {
    ANCHORED_ADAPTIVE_BANNER: LevelPlayAdSize.BANNER, // Closest approx
    BANNER: LevelPlayAdSize.BANNER,
    LARGE_BANNER: LevelPlayAdSize.LARGE,
    MEDIUM_RECTANGLE: LevelPlayAdSize.MEDIUM_RECTANGLE,
};

// TestIds no longer relevant for LevelPlay in the same way (uses Test Mode in dashboard)
export const TestIds = {
    BANNER: 'DefaultBanner',
    INTERSTITIAL: 'DefaultInterstitial',
    REWARDED: 'DefaultRewardedVideo',
};

// Exports for compatibility (though AdManager handles Inte/Rew now)
export const InterstitialAd = null;
export const RewardedAd = null;
export const AdEventType = {};
export const RewardedAdEventType = {};

// Native Ad Export
export { default as NativeAdComponent } from './NativeAdComponent';
export { LevelPlayTemplateType } from 'unity-levelplay-mediation';

