# ChemistryCalc - Monetization & Engagement Strategy

## 📊 Overview

This document outlines the **non-disruptive monetization strategy** implemented in ChemistryCalc. The goal is to generate revenue while maintaining a positive user experience.

---

## 🎯 Ad Placement Strategy

### ✅ Banner Ads (Least Disruptive)

**Where to show:**
- HomeScreen (bottom, always visible)
- Glossary (while browsing terms)
- Periodic Table (reference content)
- Quick Reference (static content)

**Where NOT to show:**
- During active quiz questions
- While user is inputting calculations
- On solution/result screens (use native instead)

### ✅ Interstitial Ads (Controlled)

**Rules implemented in `AdStrategy.js`:**
- Minimum 3 minutes between interstitials
- Maximum 4 per session
- Only at natural break points:
  - After completing a quiz
  - After every 5th calculation
  - When returning to home from a deep screen

**Never interrupt:**
- Mid-calculation
- Mid-quiz
- On app open
- Before showing results

### ✅ Rewarded Ads (User Choice)

**Opportunities:**
1. **Unlock Step-by-Step Solutions** - Watch ad to see detailed breakdown
2. **Earn 50 Bonus XP** - User chooses to watch for extra rewards
3. **30 Minutes Ad-Free** - Premium experience temporarily

**Benefits:**
- Highest eCPM
- User feels in control
- No negative sentiment

### ✅ Native Ads (Blended)

**Placement:**
- In Glossary list (every 15 items)
- As "Tip" cards on result screens
- Styled to match app theme
- Always labeled "Sponsored"

---

## 🔔 Notification Strategy (2 Daily)

### Morning Notification (8:30 AM)
**Purpose:** Motivate users to start their day with chemistry
**Messages rotate:**
- "🧪 New Chemistry Missions Available!"
- "⚗️ Rise & React! Your daily challenges are waiting."
- "🔬 Good Morning, Chemist! 3 new experiments are ready."

### Evening Notification (7:30 PM)
**Purpose:** Protect streaks and remind inactive users
**Messages rotate:**
- "🔥 Don't Break Your Streak! There's still time."
- "⏰ Last Call for XP! Complete one challenge."
- "🌙 Evening Chemistry Session? Your streak is counting on you!"

**Best Practices:**
- Personalized messages based on user state
- Configurable in Settings
- Android notification channels for categorization

---

## ⭐ Rate & Share Strategy

### Smart Rate Prompts (`RateShareManager.js`)

**Only ask after positive experiences:**
- After completing a quiz
- After reaching a new level
- After a 7-day streak

**Frequency limits:**
- Minimum 3 sessions before first prompt
- At least 10 calculations completed
- At least 2 quizzes finished
- 30 days between prompts
- Maximum 3 prompts ever

**User-friendly dialog:**
- "Not Now" - dismisses temporarily
- "Never Ask" - permanently disables
- "Rate Now ⭐" - opens store

### Share Functionality

**Available in:**
- Settings screen (Share App, Invite Friends)
- Quiz completion (Share Score)
- Calculator results (Share Solution)

**Share messages are dynamic:**
- Include app store link
- Highlight key features
- Personalized for platform (iOS/Android)

---

## 📈 Revenue Optimization Tips

### Banner Ads
- Use ANCHORED_ADAPTIVE_BANNER for best fit
- Place at screen bottom to avoid accidental clicks
- Test different positions for best CTR

### Interstitials
- Higher value than banners
- Natural break points = better user retention
- Frequency cap prevents fatigue

### Rewarded Ads
- Highest eCPM of all formats
- Integrate with gamification (XP rewards)
- Make rewards meaningful but not essential

### Engagement = More Ad Views
- Daily tasks bring users back
- Streak system creates habit
- 2 notifications optimal (more = uninstalls)

---

## 🛠️ Implementation Files

| File | Purpose |
|------|---------|
| `AdStrategy.js` | Centralized ad frequency & placement logic |
| `NotificationManager.js` | 2 daily notifications with message rotation |
| `RateShareManager.js` | Smart rating prompts & sharing |
| `SettingsScreen.js` | User controls for notifications, share, rate |
| `AdMobWrapper.js` | Platform-safe ad component wrappers |

---

## 🎮 Gamification = Engagement = Revenue

The gamification system directly supports monetization:

1. **Daily Tasks** → Users come back every day → More ad impressions
2. **Streaks** → Retention goes up → Higher LTV
3. **XP/Levels** → Rewarded ads for bonus XP → User-initiated revenue
4. **Quiz** → Natural interstitial points → Non-disruptive ads

---

## ✅ Pre-Launch Checklist

- [ ] Replace all test ad unit IDs with production IDs
- [ ] Update Play Store/App Store URLs in `RateShareManager.js`
- [ ] Update privacy policy URL in `SettingsScreen.js`
- [ ] Update support email in `SettingsScreen.js`
- [ ] Test notifications on physical device
- [ ] Verify ad frequency caps work correctly
- [ ] Test share functionality on both platforms

---

## 📱 Production Ad Unit IDs

Replace in `AdStrategy.js`:
```javascript
export const AD_UNITS = {
  BANNER_HOME: 'ca-app-pub-XXXX/home_banner',
  BANNER_RESULT: 'ca-app-pub-XXXX/result_banner',
  INTERSTITIAL: 'ca-app-pub-XXXX/interstitial',
  REWARDED: 'ca-app-pub-XXXX/rewarded',
};
```

---

**Happy Monetizing! 💰**
