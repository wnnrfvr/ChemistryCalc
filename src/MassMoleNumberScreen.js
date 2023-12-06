import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';

const MassMoleNumberScreen = () => {

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mass Mole Number</Text>
      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          Calculate the number of moles in 25 grams of water (H2O).
        </Text>
        <Text style={styles.infoText}>
          To find the number of moles, we'll use the formula:
        </Text>
        <Text style={styles.formula}>
          Number of moles = Molar mass / Given mass
        </Text>
        <Text style={styles.infoText}>
          For water (H2O), the molar mass is approximately 18.015g/mol.
        </Text>
        <Text style={styles.result}>
          Number of moles = 25g / 18.015g/mol ≈ 1.39 moles
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          How many moles are there in 50 grams of calcium carbonate (CaCO3)?
        </Text>
        <Text style={styles.infoText}>
          The molar mass of calcium carbonate (CaCO3) is approximately 100.09g/mol.
        </Text>
        <Text style={styles.result}>
          Number of moles = 50g / 100.09g/mol ≈ 0.499 moles
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          Calculate the mass of 3 moles of sulfur dioxide (SO2).
        </Text>
        <Text style={styles.infoText}>
          The molar mass of sulfur dioxide (SO2) is approximately 64.06g/mol.
        </Text>
        <Text style={styles.result}>
          Mass = 3 moles * 64.06g/mol ≈ 192.18 grams
        </Text>
      </View>

      {/* Add 7 more questions and their solutions below */}
      {/* Question 4 */}
      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          How many moles are there in 75 grams of methane (CH4)?
        </Text>
        <Text style={styles.infoText}>
          The molar mass of methane (CH4) is approximately 16.04g/mol.
        </Text>
        <Text style={styles.result}>
          Number of moles = 75g / 16.04g/mol ≈ 4.68 moles
        </Text>
      </View>

      {/* Question 5 */}
      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          Calculate the mass of 2.5 moles of potassium permanganate (KMnO4).
        </Text>
        <Text style={styles.infoText}>
          The molar mass of potassium permanganate (KMnO4) is approximately 158.03g/mol.
        </Text>
        <Text style={styles.result}>
          Mass = 2.5 moles * 158.03g/mol ≈ 395.08 grams
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          Calculate the number of moles in 30 grams of carbon dioxide (CO2).
        </Text>
        <Text style={styles.infoText}>
          The molar mass of carbon dioxide (CO2) is approximately 44.01g/mol.
        </Text>
        <Text style={styles.result}>
          Number of moles = 30g / 44.01g/mol ≈ 0.681 moles
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          How many grams are there in 2.5 moles of sodium chloride (NaCl)?
        </Text>
        <Text style={styles.infoText}>
          The molar mass of sodium chloride (NaCl) is approximately 58.44g/mol.
        </Text>
        <Text style={styles.result}>
          Mass = 2.5 moles * 58.44g/mol ≈ 146.10 grams
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          Calculate the number of moles in 15 grams of ammonia (NH3).
        </Text>
        <Text style={styles.infoText}>
          The molar mass of ammonia (NH3) is approximately 17.03g/mol.
        </Text>
        <Text style={styles.result}>
          Number of moles = 15g / 17.03g/mol ≈ 0.881 moles
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          How many grams are there in 3 moles of sulfuric acid (H2SO4)?
        </Text>
        <Text style={styles.infoText}>
          The molar mass of sulfuric acid (H2SO4) is approximately 98.08g/mol.
        </Text>
        <Text style={styles.result}>
          Mass = 3 moles * 98.08g/mol ≈ 294.24 grams
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemStatement}>
          Calculate the mass of 1.5 moles of ethanol (C2H5OH).
        </Text>
        <Text style={styles.infoText}>
          The molar mass of ethanol (C2H5OH) is approximately 46.07g/mol.
        </Text>
        <Text style={styles.result}>
          Mass = 1.5 moles * 46.07g/mol ≈ 69.11 grams
        </Text>
      </View>

      {/* Add more questions and solutions here */}
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
   </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5', // Light Gray Background
    marginBottom: 50,
  },
  adContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4E7ECE', // Blue Color
  },
  problemContainer: {
    backgroundColor: '#FFFFFF', // White Background
    borderRadius: 10,
    padding: 16,
    elevation: 3, // Add a slight shadow for depth
    marginBottom: 20,
  },
  problemStatement: {
    fontSize: 18,
    marginBottom: 8,
    color: '#FF6347', // Tomato Red
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  formula: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#32CD32', // Lime Green
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E7ECE', // Blue Color
  },
});

export default MassMoleNumberScreen;
