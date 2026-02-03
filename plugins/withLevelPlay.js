const { withProjectBuildGradle, withAppBuildGradle, withAndroidManifest, withInfoPlist, withAPI } = require('@expo/config-plugins');

const withLevelPlay = (config) => {
    // 1. Add Maven Repository (Android)
    config = withProjectBuildGradle(config, (config) => {
        const buildGradle = config.modResults.contents;
        // Unity LevelPlay often requires Google & Maven Central, which are usually default.
        // Ironsource specific repos might be needed if not distributed via Maven Central.
        // Current documentation points to standard repos.
        if (!buildGradle.includes('mavenCentral()')) {
            // Just a safety check, Expo usually includes this.
        }
        return config;
    });

    // 2. Add Dependencies (Android)
    config = withAppBuildGradle(config, (config) => {
        const buildGradle = config.modResults.contents;
        if (!buildGradle.includes('com.google.android.gms:play-services-appset')) {
            const dependenciesBlock = /dependencies\s*\{/;
            config.modResults.contents = buildGradle.replace(
                dependenciesBlock,
                `dependencies {
    implementation 'com.google.android.gms:play-services-appset:16.0.2'
    implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
    implementation 'com.google.android.gms:play-services-basement:18.3.0'
`
            );
        }
        return config;
    });

    // 3. Add Manifest Meta-data/Permissions (Android)
    config = withAndroidManifest(config, (config) => {
        const manifest = config.modResults;
        const mainApplication = manifest.manifest.application[0];

        // Ensure AD_ID permission is present
        if (!manifest.manifest['uses-permission']) {
            manifest.manifest['uses-permission'] = [];
        }
        const hasAdIdPermission = manifest.manifest['uses-permission'].some(
            (perm) => perm.$['android:name'] === 'com.google.android.gms.permission.AD_ID'
        );
        if (!hasAdIdPermission) {
            manifest.manifest['uses-permission'].push({
                $: { 'android:name': 'com.google.android.gms.permission.AD_ID' }
            });
        }

        return config;
    });

    // 4. Update Info.plist (iOS)
    config = withInfoPlist(config, (config) => {
        // Enable App Transport Security (Arbitrary Loads)
        if (!config.modResults.NSAppTransportSecurity) {
            config.modResults.NSAppTransportSecurity = {};
        }
        config.modResults.NSAppTransportSecurity.NSAllowsArbitraryLoads = true;

        // SKAdNetworkItems would typically be a long list. 
        // We will initialize it if missing, but User should ideally provide the list via options or we rely on the SDK's defaults if handled elsewhere.
        // The README suggests adding them. For a basic setup, we ensure the array exists.
        if (!config.modResults.SKAdNetworkItems) {
            config.modResults.SKAdNetworkItems = [];
        }
        // Checking for a sample IronSource ID - strictly example from README
        const ironSourceId = "su67r6k2v3.skadnetwork";
        const hasId = config.modResults.SKAdNetworkItems.some(item => item.SKAdNetworkIdentifier === ironSourceId);

        if (!hasId) {
            config.modResults.SKAdNetworkItems.push({ SKAdNetworkIdentifier: ironSourceId });
        }

        return config;
    });

    return config;
};

module.exports = withLevelPlay;
