// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { Animated, TouchableHighlight, Text, StyleSheet, Dimensions, View, ImageBackground, ScrollView, Alert } from 'react-native';
import { BackHandler } from 'react-native';
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';
const interUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8342678716913452/3774351217';

const HomeScreen = ({ navigation }) => {
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const interstitial = InterstitialAd.createForAdRequest(interUnitId, {
    keywords: ['education', 'clothing', 'schools', 'growth', 'banks'],
  });

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });

    interstitial.load();

    return unsubscribe;
  }, [interstitial]);

  const showInterstitial = () => {
    try {
      interstitial.show();
      setInterstitialLoaded(false); // Reset loaded state
    } catch (error) {
      console.error('Error showing interstitial:', error);
    }
  };

  const handleButtonPress = (screen) => {
    if (interstitialLoaded) {
      showInterstitial(); // Load the ad for the next use
    }

    try {
      interstitial.load(); // Load the ad for the next use
      navigation.navigate(screen);
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };

  const handleExitApp = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground
      source={require('./chem.gif')} // replace with the path to your GIF background
      style={styles.background}
    >
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Calculations in Chemistry</Text>
        <Text style={styles.summary}>
          Welcome to the Chemistry Calculations App.
        </Text>
        {/* Your existing TouchableHighlight components */}
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('Stoichiometry')}>
          <Text style={styles.buttonText}>Stoichiometry</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('MassMoleNumber')}>
          <Text style={styles.buttonText}>Mass Mole Number</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('NuclearChemistry')}>
          <Text style={styles.buttonText}>Nuclear Chemistry</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('SolutionChemistry')}>
          <Text style={styles.buttonText}>Solution Chemistry</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('Gases')}>
          <Text style={styles.buttonText}>Gases</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('PhCalculations')}>
          <Text style={styles.buttonText}>Ph Calculations</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('ThermoChemistry')}>
          <Text style={styles.buttonText}>ThermoChemistry</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('ElectrolysisCalculations')}>
          <Text style={styles.buttonText}>Electrolysis</Text>
        </TouchableHighlight>
    {/* ..    <TouchableHighlight underlayColor={"#004080"} style={styles.button} onPress={() => handleButtonPress('ChemistryCalculator')}>
            <Text style={styles.buttonText}>Chemistry Calculator</Text>
          </TouchableHighlight>
          */}
      <TouchableHighlight style={styles.exitButton} underlayColor="#c0392b" onPress={handleExitApp}>
        <Text style={styles.buttonText}>Exit App</Text>
      </TouchableHighlight>

      
        {/* ... */}
        </View>
        </ScrollView>
        <View style={styles.adContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
        />
      </View>
    </ImageBackground>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' depending on your preference
  },
  adContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    marginBottom: 50// Adjust this value based on your banner ad height
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  summary: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#0056b3', // Darker shade of blue
    width: 0.85 * windowWidth,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2, // Add elevation for a subtle shadow effect
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  exitButton: {
    backgroundColor: '#e74c3c', // Red colo underlayColor={"#004080"}r for the exit button
    width: 0.9 * windowWidth,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 2, // Add elevation for a subtle shadow effect
  },
});

export default HomeScreen;

