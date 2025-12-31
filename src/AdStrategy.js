// AdStrategy.js - Ad Strategy Configuration
// This file provides configuration and utilities for the AdManager
// The main logic is in AdManager.js

// Re-export from AdManager for convenience
export { AD_UNITS, AD_STRATEGY, AdManager } from './AdManager';

// ========================================
// AD PLACEMENT GUIDE
// ========================================
/*
This outlines where and how ads should appear in ChemistryCalc.

┌─────────────────────────────────────────────────────────────┐
│                    BANNER ADS                                │
├─────────────────────────────────────────────────────────────┤
│ Screen          │ Position    │ When                        │
│─────────────────│─────────────│─────────────────────────────│
│ HomeScreen      │ Bottom      │ Always (anchored)           │
│ Glossary        │ Bottom      │ While browsing              │
│ PeriodicTable   │ Bottom      │ While browsing              │
│ QuickReference  │ Bottom      │ While browsing              │
│ Settings        │ Bottom      │ Always                      │
│ Calculator      │ Bottom      │ ONLY after result shown     │
│ Quiz            │ NEVER       │ Too distracting             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  INTERSTITIAL ADS                            │
├─────────────────────────────────────────────────────────────┤
│ Trigger              │ Frequency                            │
│──────────────────────│──────────────────────────────────────│
│ After 4 calculations │ Count resets after showing           │
│ After quiz complete  │ Natural break point                  │
│ After level up       │ Celebration moment                   │
│                                                             │
│ RULES:                                                      │
│ • Minimum 2 minutes between interstitials                   │
│ • Maximum 6 per session                                     │
│ • Never interrupt during calculation                        │
│ • Never on app open                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   REWARDED ADS                               │
├─────────────────────────────────────────────────────────────┤
│ Reward                        │ Description                 │
│───────────────────────────────│─────────────────────────────│
│ +50 Bonus XP                  │ User chooses to earn more   │
│ Step-by-step solution unlock  │ Detailed explanations       │
│ 30-minute ad-free mode        │ Premium experience          │
│                                                             │
│ KEY: Always user-initiated, never forced                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   NATIVE ADS                                 │
├─────────────────────────────────────────────────────────────┤
│ Location                      │ Frequency                   │
│───────────────────────────────│─────────────────────────────│
│ Glossary list                 │ Every 15 terms              │
│ Quiz results screen           │ Bottom, as "tip" card       │
│ Calculator result area        │ Below solution, styled      │
│                                                             │
│ STYLE: Match app theme, clearly labeled "Sponsored"         │
└─────────────────────────────────────────────────────────────┘
*/

// Utility function to check screen ad eligibility
export const canShowAdsOnScreen = (screenName) => {
    const noAdScreens = ['Quiz', 'Onboarding'];
    return !noAdScreens.includes(screenName);
};

// Get recommended ad type for a screen
export const getRecommendedAdType = (screenName, context = {}) => {
    // Home, Glossary, Reference screens -> Banner
    if (['Home', 'Glossary', 'PeriodicTable', 'QuickReference', 'Settings'].includes(screenName)) {
        return 'banner';
    }

    // Calculator screens -> Banner only after result
    if (context.hasResult) {
        return 'banner';
    }

    // Quiz completion -> Interstitial
    if (screenName === 'Quiz' && context.isComplete) {
        return 'interstitial';
    }

    return null;
};

export default {
    canShowAdsOnScreen,
    getRecommendedAdType,
};
