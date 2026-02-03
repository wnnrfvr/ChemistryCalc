import React from 'react';
import { View, StyleSheet } from 'react-native';
import LevelPlayBanner from './LevelPlayBanner';

const BANNER_AD_UNIT_ID = 'llpqic6rry7c6sng'; // Production ID
const PLACEMENT_NAME = 'Banner';

const BannerComponent = ({ style }) => {
    // Note: LevelPlayBanner already checks for isInitialized (which is false if ADS_ENABLED is false).
    // So this component will simply render nothing or the empty container as defined in LevelPlayBanner.js.

    return (
        <LevelPlayBanner
            adUnitId={BANNER_AD_UNIT_ID}
            placementName={PLACEMENT_NAME}
            style={style}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 50,
        backgroundColor: 'transparent', // Ensure it doesn't block background if empty
    },
});

export default BannerComponent;
