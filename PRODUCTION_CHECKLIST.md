# 🚀 ChemistryCalc Production Build Checklist

## ✅ PRE-PRODUCTION CHECKLIST

### 1. 📱 Enable Real AdMob Ads

**Already configured!** `src/components/AdMobWrapper.js` exports real ads.

### 2. 🔑 Verify Ad Unit IDs (in `src/AdManager.js`)

| Ad Type | Your Production ID |
|---------|-------------------|
| Banner Home | `ca-app-pub-8342678716913452/9214380156` |
| Banner Result | `ca-app-pub-8342678716913452/8854618543` |
| Interstitial | `ca-app-pub-8342678716913452/3774351217` |
| Rewarded | `ca-app-pub-8342678716913452/1945595260` |

### 3. 🏪 App Store URLs

- ✅ Play Store: `com.decadino.ChemistryCalc`
- ⚠️ iOS App Store: Replace `id123456789` when you have your App Store ID

### 4. 📧 Contact Info
- ✅ Email: `decadino100@gmail.com`
- ✅ Privacy Policy: Configured

---

## 📦 PROGUARD & APP SIZE OPTIMIZATION

### ✅ Already Configured:

1. **ProGuard Rules** (`proguard-rules.pro`)
   - Keeps React Native, Expo, AdMob classes
   - Removes debug logs in release
   - Optimizes aggressively

2. **Custom Plugin** (`plugins/withProguard.js`)
   - Enables `minifyEnabled true`
   - Enables `shrinkResources true`
   - Uses R8 full mode

3. **EAS Build Config** (`eas.json`)
   - Production builds use app-bundle format
   - Auto-increment version enabled

### Expected Size Reduction:
- **Before ProGuard:** ~40-60 MB
- **After ProGuard:** ~15-25 MB (50-60% reduction)

---

## 🏗 BUILD COMMANDS

### Development Build (test ads)
```bash
npx eas build --profile development --platform android
```

### Preview Build (APK for testing)
```bash
npx eas build --profile preview --platform android
```

### Production Build (Play Store)
```bash
npx eas build --profile production --platform android
```

### iOS Build (App Store)
```bash
npx eas build --profile production --platform ios
```

### Submit to Stores
```bash
# Play Store
npx eas submit --platform android

# App Store
npx eas submit --platform ios
```

---

## 📊 MONETIZATION SETTINGS

| Setting | Value |
|---------|-------|
| Banner on Home | ✅ Always |
| Banner on Calculators | After result only |
| Banner during Quiz | ❌ Never |
| Interstitial cooldown | 2 minutes |
| Interstitials per session | Max 6 |
| Calculations before interstitial | 4 |
| Rewarded XP bonus | 50 XP |
| Ad-free mode (rewarded) | 30 minutes |

---

## ⚠️ TROUBLESHOOTING

### Build Fails
```bash
# Clear everything and rebuild
rm -rf node_modules android ios
npm install
npx expo prebuild --clean
npx eas build --profile production --platform android
```

### Ads Not Loading
1. Wait 24-48 hours after first enabling AdMob
2. Ensure device has Google Play Services
3. Check AdMob console for policy issues

### ProGuard Crash
1. Check `adb logcat` for obfuscated class errors
2. Add keep rules to `proguard-rules.pro` for failing classes

---

## ✅ FINAL CHECKLIST

- [ ] Update versionCode in app.json (increment for each release)
- [ ] Test on physical device
- [ ] Verify all ads work (banner, interstitial, rewarded)
- [ ] Check app size after build
- [ ] Run production build
- [ ] Submit to Play Store

**You're ready to launch! 🎉**

Current Version: **2.1.0** (versionCode: 5)
