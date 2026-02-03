// NotificationManager.js - Shimmed (Notifications Disabled)
// Users complained about notifications, so they are disabled.

export const NotificationManager = {
  registerForPushNotificationsAsync: async () => {
    // Disabled
    return null;
  },

  scheduleDailyNotifications: async () => {
    // Disabled
  },

  scheduleDailyNotification: async () => {
    // Legacy support - Disabled
  },

  sendImmediateNotification: async (title, body, data = {}) => {
    // Disabled
  },

  getRandomFact: () => {
    return "Science is the poetry of reality.";
  }
};

export default NotificationManager;
