// NotificationManager.js - Daily Notifications & Engagement
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Morning notifications - Motivational & Educational
const MORNING_MESSAGES = [
  { title: "🧪 New Chemistry Missions Available!", body: "Complete today's experiments to earn XP and level up!" },
  { title: "⚗️ Rise & React!", body: "Your daily chemistry challenges are waiting. Don't break your streak!" },
  { title: "🔬 Good Morning, Chemist!", body: "3 new experiments are ready. Start your day with science!" },
  { title: "⚡ Daily Lab is Open!", body: "Master chemistry one reaction at a time. New challenges inside!" },
  { title: "🧬 Science Awaits!", body: "Your brain is ready to learn. Let's balance some equations!" },
];

// Evening notifications - Reminder & Streak Protection
const EVENING_MESSAGES = [
  { title: "🔥 Don't Break Your Streak!", body: "You haven't completed today's experiments. Quick, there's still time!" },
  { title: "⏰ Last Call for XP!", body: "Complete just one challenge to keep your streak alive!" },
  { title: "🌙 Evening Chemistry Session?", body: "Wind down with a quick quiz. Your streak is counting on you!" },
  { title: "📚 Quick Study Break?", body: "5 minutes of chemistry practice keeps the knowledge fresh!" },
  { title: "✨ Almost Midnight!", body: "Don't forget your daily chemistry dose. Streak at risk!" },
];

// Fun chemistry facts for variety
const CHEMISTRY_FACTS = [
  "Water expands when it freezes, unlike most substances.",
  "Gold is one of the few metals that doesn't react with Oxygen.",
  "Helium was discovered on the sun before being found on Earth.",
  "Hot water can freeze faster than cold water (Mpemba effect).",
  "The only letter not on the periodic table is J.",
  "Oxygen gas is colorless, but liquid oxygen is pale blue.",
  "Diamonds and graphite are both made of pure carbon.",
  "There are more atoms in a glass of water than glasses of water in all oceans.",
];

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const NotificationManager = {
  registerForPushNotificationsAsync: async () => {
    let token;

    if (Platform.OS === 'android') {
      // Create notification channels for Android
      await Notifications.setNotificationChannelAsync('daily-missions', {
        name: 'Daily Chemistry Missions',
        description: 'Morning reminders for daily challenges',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#00FFCC',
        sound: 'default',
      });

      await Notifications.setNotificationChannelAsync('streak-reminder', {
        name: 'Streak Reminders',
        description: 'Evening reminders to protect your streak',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 100, 100, 100],
        lightColor: '#FF6B6B',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    return token;
  },

  // Schedule BOTH daily notifications
  scheduleDailyNotifications: async () => {
    // Cancel existing to avoid duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    // --- MORNING NOTIFICATION (8:30 AM) ---
    const morningMsg = MORNING_MESSAGES[Math.floor(Math.random() * MORNING_MESSAGES.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: morningMsg.title,
        body: morningMsg.body,
        data: { screen: 'Home', type: 'morning' },
        sound: 'default',
      },
      trigger: {
        hour: 8,
        minute: 30,
        repeats: true,
        channelId: 'daily-missions',
      },
    });

    // --- EVENING NOTIFICATION (7:30 PM) ---
    const eveningMsg = EVENING_MESSAGES[Math.floor(Math.random() * EVENING_MESSAGES.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: eveningMsg.title,
        body: eveningMsg.body,
        data: { screen: 'Home', type: 'evening' },
        sound: 'default',
      },
      trigger: {
        hour: 19,
        minute: 30,
        repeats: true,
        channelId: 'streak-reminder',
      },
    });

    console.log("✅ 2 Daily Notifications Scheduled (8:30 AM & 7:30 PM)");
  },

  // Legacy function for backwards compatibility
  scheduleDailyNotification: async () => {
    await NotificationManager.scheduleDailyNotifications();
  },

  // Send immediate notification (for achievements, level ups, etc.)
  sendImmediateNotification: async (title, body, data = {}) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
        sound: 'default',
      },
      trigger: null, // Immediate
    });
  },

  // Get a random chemistry fact
  getRandomFact: () => {
    return CHEMISTRY_FACTS[Math.floor(Math.random() * CHEMISTRY_FACTS.length)];
  }
};

export default NotificationManager;
