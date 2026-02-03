import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LevelPlayBannerAdView, LevelPlayAdSize } from 'unity-levelplay-mediation';
import { useAds } from './AdsContext';

const LevelPlayBanner = ({ adUnitId, placementName, style, onAdLoaded, onAdLoadFailed }) => {
    const { isInitialized } = useAds();
    const bannerRef = useRef(null);

    useEffect(() => {
        if (!isInitialized) return;

        console.log(`🖼️ LevelPlayBanner mounted for unit: ${adUnitId} (SDK Ready: ${isInitialized})`);

        // Manually load the ad when the component mounts or dependencies change
        if (bannerRef.current) {
            console.log(`🔄 calling LoadAd for: ${adUnitId} [${placementName}]`);
            bannerRef.current.loadAd();
        } else {
            // This might happen on first render if ref isn't set yet, but usually ref is set by return.
            // We can ignore or log.
            // console.log('Banner Ref null on init');
        }
    }, [adUnitId, placementName, isInitialized]);

    if (!isInitialized) {
        return <View style={[styles.container, style, { backgroundColor: 'transparent' }]} />;
    }

    const listener = {
        onAdLoaded: (adInfo) => {
            console.log('✅ Banner Loaded:', adInfo);
            if (onAdLoaded) onAdLoaded(adInfo);
        },
        onAdLoadFailed: (error) => {
            console.log('❌ Banner Load Failed:', error);
            if (onAdLoadFailed) onAdLoadFailed(error);
        },
        onAdClicked: (adInfo) => console.log('🖱️ Banner Clicked'),
        onAdExpanded: (adInfo) => console.log('Expand Banner'),
        onAdCollapsed: (adInfo) => console.log('Collapse Banner'),
        onAdLeftApplication: (adInfo) => console.log('Left Application'),
    };

    return (
        <View style={[styles.container, style]}>
            <LevelPlayBannerAdView
                ref={bannerRef}
                adUnitId={adUnitId}
                adSize={LevelPlayAdSize.BANNER}
                placementName={placementName}
                listener={listener}
                style={{ width: 320, height: 50 }} // Explicit dimensions required for visibility
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 50,
    },
});

export default LevelPlayBanner;
