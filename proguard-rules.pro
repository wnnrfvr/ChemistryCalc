# ProGuard Rules for ChemistryCalc
# ================================================

# Keep annotations
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keepattributes Signature
-keepattributes Exceptions

# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# React Native Reanimated
-keep class com.swmansion.reanimated.** { *; }

# React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }

# React Native Screens
-keep class com.swmansion.rnscreens.** { *; }

# React Native SVG
-keep class com.horcrux.svg.** { *; }

# Expo
-keep class expo.modules.** { *; }
-keep class host.exp.exponent.** { *; }

# Google Mobile Ads (GMS)
# Only keep public classes/methods for GMS Ads to allow shrinking of internals
-keep public class com.google.android.gms.ads.** {
   public *;
}
-dontwarn com.google.android.gms.**

# IronSource / Unity LevelPlay
-keepclassmembers class com.ironsource.sdk.controller.IronSourceWebView$JSInterface {
    public *;
}
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}
-keep class com.ironsource.adapters.** { *; }
-dontwarn com.ironsource.mediationsdk.**
-dontwarn com.ironsource.adapters.**

# React Native Share
-keep class cl.json.** { *; }

# AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Expo Notifications
-keep class expo.modules.notifications.** { *; }

# Expo Linear Gradient
-keep class expo.modules.lineargradient.** { *; }

# Expo Blur
-keep class expo.modules.blur.** { *; }

# Expo Font
-keep class expo.modules.font.** { *; }

# Keep native methods
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod *;
}

# Keep JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# OkHttp & Okio
# Do NOT keep everything, let R8 shrink unused parts. Just suppress warnings.
-dontwarn okhttp3.**
-dontwarn okio.**

# Keep model classes (if any)
-keep class **.models.** { *; }
-keep class **.dto.** { *; }

# Optimize aggressively
-optimizationpasses 5
-allowaccessmodification
-repackageclasses ''

# Remove logging in release
-assumenosideeffects class android.util.Log {
    public static int v(...);
    public static int d(...);
    public static int i(...);
}

# Keep crash reporting intact
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Prevent obfuscation of types which use ButterKnife annotations (if used)
-keep class butterknife.** { *; }
-dontwarn butterknife.internal.**

# Don't warn about missing classes from libraries
-dontwarn javax.annotation.**
-dontwarn org.codehaus.mojo.animal_sniffer.**
-dontwarn java.lang.invoke.**
