import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
    LevelPlayNativeAd,
    LevelPlayNativeAdView,
    LevelPlayTemplateType,
    LevelPlayNativeAdListener,
    LevelPlayNativeAdTemplateStyle,
    LevelPlayNativeAdElementStyle,
    LevelPlayNativeTemplateFontStyle
} from 'unity-levelplay-mediation';

/**
 * A wrapper component for IronSource LevelPlay Native Ads.
 * Documentation: https://developers.is.com/ironsource-mobile/react-native/native-ads-integration-for-react-native/
 */
const NativeAdComponent = ({
    placementName = 'DefaultNativeAd',
    templateType = LevelPlayTemplateType.Medium,
    style,
    onAdLoaded,
    onAdFailedToLoad
}) => {
    const [nativeAd, setNativeAd] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Defined listener
    const listener = useRef({
        onAdLoaded: (ad, adInfo) => {
            console.log('✅ Native Ad Loaded:', adInfo);
            setIsLoaded(true);
            if (onAdLoaded) onAdLoaded(adInfo);
        },
        onAdLoadFailed: (ad, error) => {
            console.error('❌ Native Ad Load Failed:', error);
            if (onAdFailedToLoad) onAdFailedToLoad(error);
        },
        onAdClicked: (ad, adInfo) => {
            console.log('👆 Native Ad Clicked:', adInfo);
        },
        onAdImpression: (ad, adInfo) => {
            console.log('👀 Native Ad Impression:', adInfo);
        }
    }).current;

    useEffect(() => {
        // Create the Native Ad instance using the Builder pattern
        const ad = LevelPlayNativeAd.builder()
            .withPlacement(placementName)
            .withListener(listener)
            .build();

        setNativeAd(ad);

        // Cleanup on unmount
        return () => {
            if (ad) {
                ad.destroyAd();
            }
        };
    }, [placementName]);

    const loadAd = useCallback(() => {
        if (nativeAd) {
            console.log(`📥 Loading Native Ad for placement: ${placementName}`);
            nativeAd.loadAd();
        }
    }, [nativeAd, placementName]);

    if (!nativeAd) {
        return null;
    }

    // Default Style if none provided
    const containerStyle = style || {
        width: '100%',
        height: templateType === LevelPlayTemplateType.Medium ? 300 : 100,
        alignSelf: 'center',
        marginVertical: 10,
    };

    return (
        <View style={containerStyle}>
            <LevelPlayNativeAdView
                nativeAd={nativeAd}
                templateType={templateType}
                style={{ width: '100%', height: '100%' }}
                onLayout={() => loadAd()}
                viewType="LevelPlayNativeAdView" // Explicitly requesting the built-in view
            />
        </View>
    );
};

export default NativeAdComponent;
