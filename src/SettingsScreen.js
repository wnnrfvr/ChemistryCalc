// SettingsScreen.js - Settings, About, Share & Rate with Ad Controls
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RateShareManager } from './RateShareManager';
import { GamificationManager } from './GamificationManager';
import { AdManager } from './AdManager';
import RatingModal from './RatingModal';

const APP_VERSION = '2.1.0';

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [stats, setStats] = useState({ xp: 0, level: 1, streak: 0 });
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [adFreeMinutes, setAdFreeMinutes] = useState(0);

    useEffect(() => {
        loadSettings();
        setStats(GamificationManager.getState());
        updateAdFreeTime();

        // Preload rewarded ad when Settings screen opens
        AdManager.preloadRewarded();
    }, []);

    const loadSettings = async () => {
        try {
            const notifSetting = await AsyncStorage.getItem('@notifications_enabled');
            if (notifSetting !== null) {
                setNotificationsEnabled(notifSetting === 'true');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const updateAdFreeTime = () => {
        const remaining = AdManager.getAdFreeTimeRemaining();
        setAdFreeMinutes(remaining);
    };

    const toggleNotifications = async (value) => {
        setNotificationsEnabled(value);
        await AsyncStorage.setItem('@notifications_enabled', value.toString());
    };

    const handleRateApp = () => {
        setShowRatingModal(true);
    };

    const handleShareApp = async () => {
        await RateShareManager.shareApp();
    };

    const handleInviteFriends = async () => {
        await RateShareManager.inviteFriends();
    };

    const handleWatchRewardedAd = async () => {
        // Check if ad is ready first
        if (!AdManager.isRewardedReady()) {
            // Trigger a load attempt
            AdManager.preloadRewarded();

            Alert.alert(
                'Ad Loading',
                'The video ad is loading. Please wait a moment and try again.',
                [{ text: 'OK' }]
            );
            return;
        }

        Alert.alert(
            '🎁 Watch Ad for Rewards',
            'Watch a short video to earn:\n\n• +50 XP Bonus\n• 30 minutes ad-free experience',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Watch Ad',
                    onPress: async () => {
                        const success = await AdManager.showRewarded(async (xpReward) => {
                            if (xpReward) {
                                await GamificationManager.addXP(xpReward);
                                setStats(GamificationManager.getState());
                                updateAdFreeTime();
                                Alert.alert('🎉 Reward Received!', `You earned ${xpReward} XP and 30 minutes ad-free!`);
                            }
                        });
                        if (!success) {
                            Alert.alert('Ad Not Ready', 'Please try again in a moment.');
                        }
                    }
                }
            ]
        );
    };



    const handleResetProgress = () => {
        Alert.alert(
            'Reset Progress?',
            'This will reset all your XP, levels, and quiz progress. This cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.multiRemove([
                            '@chemistry_calc_gamification',
                            '@quiz_answered_questions',
                        ]);
                        Alert.alert('Done', 'Your progress has been reset. Restart the app.');
                    }
                }
            ]
        );
    };

    const handleContactSupport = () => {
        Linking.openURL('mailto:decadino100@gmail.com');
    };

    const handlePrivacyPolicy = () => {
        Linking.openURL('https://www.termsfeed.com/live/24369186-6d14-448d-acdf-304ad4511f0f');
    };

    const SettingItem = ({ icon, title, subtitle, onPress, rightComponent, color = '#FFF' }) => (
        <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={!onPress}>
            <View style={[styles.settingIcon, { backgroundColor: color + '20' }]}>
                <MaterialCommunityIcons name={icon} size={22} color={color} />
            </View>
            <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            {rightComponent || (onPress && <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />)}
        </TouchableOpacity>
    );

    return (
        <LinearGradient colors={['#0A0E1A', '#1B263B']} style={styles.container}>
            {/* 5-Star Rating Modal */}
            <RatingModal
                visible={showRatingModal}
                onClose={() => setShowRatingModal(false)}
                onRated={(rating) => RateShareManager.recordRatingComplete(rating)}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Stats Summary */}
                <View style={styles.statsCard}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.level}</Text>
                        <Text style={styles.statLabel}>Level</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats.xp}</Text>
                        <Text style={styles.statLabel}>Total XP</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>🔥 {stats.streak}</Text>
                        <Text style={styles.statLabel}>Streak</Text>
                    </View>
                </View>

                {/* ⭐ Rewards Section - NEW */}
                <Text style={styles.sectionTitle}>🎁 Rewards</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.rewardCard} onPress={handleWatchRewardedAd}>
                        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.rewardGradient}>
                            <MaterialCommunityIcons name="gift" size={32} color="#FFF" />
                            <View style={styles.rewardText}>
                                <Text style={styles.rewardTitle}>Watch Ad for Bonus</Text>
                                <Text style={styles.rewardSubtitle}>+50 XP & 30 min ad-free</Text>
                            </View>
                            <MaterialCommunityIcons name="play-circle" size={36} color="#FFF" />
                        </LinearGradient>
                    </TouchableOpacity>

                    {adFreeMinutes > 0 && (
                        <View style={styles.adFreeStatus}>
                            <MaterialCommunityIcons name="timer" size={16} color="#10B981" />
                            <Text style={styles.adFreeText}>Ad-free for {adFreeMinutes} more minutes</Text>
                        </View>
                    )}
                </View>

                {/* Share & Social */}
                <Text style={styles.sectionTitle}>Share & Connect</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon="star"
                        title="Rate Us"
                        subtitle="Love the app? Leave a review!"
                        onPress={handleRateApp}
                        color="#FFD700"
                    />
                    <SettingItem
                        icon="share-variant"
                        title="Share App"
                        subtitle="Tell your friends about Chemistry Calc"
                        onPress={handleShareApp}
                        color="#00FFCC"
                    />
                    <SettingItem
                        icon="account-group"
                        title="Invite Friends"
                        subtitle="Learn chemistry together"
                        onPress={handleInviteFriends}
                        color="#A855F7"
                    />
                </View>

                {/* Preferences */}
                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon="bell"
                        title="Daily Notifications"
                        subtitle="Morning & evening reminders"
                        color="#FF6B6B"
                        rightComponent={
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={toggleNotifications}
                                trackColor={{ false: '#333', true: '#00FFCC50' }}
                                thumbColor={notificationsEnabled ? '#00FFCC' : '#666'}
                            />
                        }
                    />
                </View>

                {/* Support */}
                <Text style={styles.sectionTitle}>Support</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon="email-outline"
                        title="Contact Support"
                        subtitle="Get help or report issues"
                        onPress={handleContactSupport}
                        color="#3B82F6"
                    />
                    <SettingItem
                        icon="shield-check"
                        title="Privacy Policy"
                        onPress={handlePrivacyPolicy}
                        color="#10B981"
                    />
                </View>



                {/* Danger Zone */}
                <Text style={styles.sectionTitle}>Data</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon="delete-outline"
                        title="Reset Progress"
                        subtitle="Clear all XP and quiz data"
                        onPress={handleResetProgress}
                        color="#EF4444"
                    />
                </View>

                {/* About */}
                <View style={styles.aboutSection}>
                    <Text style={styles.appName}>Chemistry Calc</Text>
                    <Text style={styles.version}>Version {APP_VERSION}</Text>
                    <Text style={styles.copyright}>© 2024 Decadino</Text>
                    <Text style={styles.tagline}>Learn Chemistry, One Reaction at a Time 🧪</Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20, paddingTop: 50 },

    statsCard: { flexDirection: 'row', backgroundColor: '#FFFFFF08', borderRadius: 16, padding: 20, marginBottom: 30, borderWidth: 1, borderColor: '#FFFFFF10' },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { color: '#00FFCC', fontSize: 24, fontWeight: '800' },
    statLabel: { color: '#888', fontSize: 12, marginTop: 4 },
    statDivider: { width: 1, backgroundColor: '#FFFFFF15' },

    sectionTitle: { color: '#888', fontSize: 12, fontWeight: '600', letterSpacing: 1, marginBottom: 10, marginTop: 10, textTransform: 'uppercase' },
    section: { backgroundColor: '#FFFFFF08', borderRadius: 16, overflow: 'hidden', marginBottom: 20, borderWidth: 1, borderColor: '#FFFFFF10' },

    // Reward card styles
    rewardCard: { overflow: 'hidden', borderRadius: 12, margin: 12 },
    rewardGradient: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
    rewardText: { flex: 1 },
    rewardTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
    rewardSubtitle: { color: '#FFFFFF90', fontSize: 13, marginTop: 2 },

    adFreeStatus: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 12, gap: 6 },
    adFreeText: { color: '#10B981', fontSize: 13, fontWeight: '600' },

    settingItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#FFFFFF08' },
    settingIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    settingText: { flex: 1 },
    settingTitle: { color: '#FFF', fontSize: 16, fontWeight: '600' },
    settingSubtitle: { color: '#888', fontSize: 13, marginTop: 2 },

    aboutSection: { alignItems: 'center', marginTop: 30, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#FFFFFF10' },
    appName: { color: '#FFF', fontSize: 20, fontWeight: '800' },
    version: { color: '#666', fontSize: 14, marginTop: 4 },
    copyright: { color: '#444', fontSize: 12, marginTop: 10 },
    tagline: { color: '#00FFCC', fontSize: 14, marginTop: 10, fontStyle: 'italic' },
});

export default SettingsScreen;
