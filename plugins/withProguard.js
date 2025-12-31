// plugins/withProguard.js
// Custom Expo Config Plugin to enable ProGuard for Android

const { withAppBuildGradle, withGradleProperties } = require('@expo/config-plugins');

function withProguard(config) {
    // Add gradle.properties settings
    config = withGradleProperties(config, (config) => {
        config.modResults.push(
            { type: 'property', key: 'android.enableR8.fullMode', value: 'true' },
            { type: 'property', key: 'android.enableProguardInReleaseBuilds', value: 'true' },
            { type: 'property', key: 'org.gradle.jvmargs', value: '-Xmx4096m -XX:MaxPermSize=4096m -XX:+HeapDumpOnOutOfMemoryError' }
        );
        return config;
    });

    // Modify app/build.gradle for release build type
    config = withAppBuildGradle(config, (config) => {
        const buildGradle = config.modResults.contents;

        // Check if already configured
        if (buildGradle.includes('proguardFiles getDefaultProguardFile')) {
            return config;
        }

        // Find the release buildType and add ProGuard configuration
        const releaseBlockRegex = /buildTypes\s*\{[\s\S]*?release\s*\{/;

        if (releaseBlockRegex.test(buildGradle)) {
            config.modResults.contents = buildGradle.replace(
                releaseBlockRegex,
                (match) => {
                    return match + `
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), '../../proguard-rules.pro'`;
                }
            );
        }

        return config;
    });

    return config;
}

module.exports = withProguard;
