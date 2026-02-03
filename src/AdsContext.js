
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AdManager, AD_STRATEGY } from './AdManager';

const AdsContext = createContext(null);

export const AdsProvider = ({ children }) => {
    // We expose AdManager functionality via Context for easier testing/mocking if needed
    // But mostly we just delegate to the singleton AdManager instance.

    const [isInitialized, setIsInitialized] = useState(AdManager.isInitialized);

    useEffect(() => {
        const unsubscribe = AdManager.addListener((ready) => {
            setIsInitialized(ready);
        });
        return unsubscribe;
    }, []);

    const handleCalculationComplete = () => {
        if (AdManager.onCalculationComplete()) {
            AdManager.showInterstitial();
            return true;
        }
        return false;
    };

    const handleQuizComplete = () => {
        if (AdManager.onCalculationComplete()) { // Reuse logic or custom
            AdManager.showInterstitial();
        }
    };

    const triggerRewardedAd = async (onComplete) => {
        return AdManager.showRewarded(onComplete);
    };

    // Simple reactivity for UI? 
    // Since AdManager state is local, if we need UI updates (like 'Ad Free for 30m')
    // We might need an event emitter or simple polling/checking.
    // For now, let's keep it simple.

    return (
        <AdsContext.Provider value={{
            isInitialized: isInitialized,
            onCalculationComplete: handleCalculationComplete,
            onQuizComplete: handleQuizComplete,
            showRewarded: triggerRewardedAd,
            showInterstitial: () => AdManager.showInterstitial(),
            isAdFree: AdManager.isAdFree(), // Note: this is not reactive without state sync
            getAdFreeMinutes: () => {
                const remaining = AdManager.state.adFreeUntil - Date.now();
                return remaining > 0 ? Math.ceil(remaining / 60000) : 0;
            }
        }}>
            {children}
        </AdsContext.Provider>
    );
};

export const useAds = () => useContext(AdsContext);
