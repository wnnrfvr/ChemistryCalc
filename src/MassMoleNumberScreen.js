import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';

const MassMoleNumberScreen = () => {

  return (
    <>
    <ScrollView style={styles.container}>
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

      <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Determine the number of moles in 125 grams of acetic acid (CH3COOH).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of acetic acid (CH3COOH) is approximately 60.05g/mol.
    </Text>
    <Text style={styles.result}>
      Number of moles = 125g / 60.05g/mol ≈ 2.082 moles
    </Text>
  </View>

  {/* Question 12 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Find the mass of 4 moles of magnesium nitrate [Mg(NO3)2].
    </Text>
    <Text style={styles.infoText}>
      The molar mass of magnesium nitrate [Mg(NO3)2] is approximately 148.32g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 4 moles * 148.32g/mol ≈ 593.28 grams
    </Text>
  </View>

  {/* Question 13 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Calculate the mass of 2.75 moles of copper(II) sulfate (CuSO4).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of copper(II) sulfate (CuSO4) is approximately 159.61g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 2.75 moles * 159.61g/mol ≈ 439.27 grams
    </Text>
  </View>

  {/* Question 14 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      How many moles are present in 85 grams of aluminum chloride (AlCl3)?
    </Text>
    <Text style={styles.infoText}>
      The molar mass of aluminum chloride (AlCl3) is approximately 133.34g/mol.
    </Text>
    <Text style={styles.result}>
      Number of moles = 85g / 133.34g/mol ≈ 0.637 moles
    </Text>
  </View>

  {/* Question 15 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Determine the mass of 3.5 moles of dinitrogen pentoxide (N2O5).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of dinitrogen pentoxide (N2O5) is approximately 108.01g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 3.5 moles * 108.01g/mol ≈ 378.03 grams
    </Text>
  </View>

  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Calculate the number of moles in 500 grams of silver nitrate (AgNO3).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of silver nitrate (AgNO3) is approximately 169.87g/mol.
    </Text>
    <Text style={styles.result}>
      Number of moles = 500g / 169.87g/mol ≈ 2.946 moles
    </Text>
  </View>

  {/* Question 17 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Determine the mass of 6 moles of hydrogen peroxide (H2O2).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of hydrogen peroxide (H2O2) is approximately 34.02g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 6 moles * 34.02g/mol ≈ 204.12 grams
    </Text>
  </View>

  {/* Question 18 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      How many grams are there in 2 moles of phosphorus pentachloride (PCl5)?
    </Text>
    <Text style={styles.infoText}>
      The molar mass of phosphorus pentachloride (PCl5) is approximately 208.24g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 2 moles * 208.24g/mol ≈ 416.48 grams
    </Text>
  </View>

  {/* Question 19 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Calculate the mass of 4.5 moles of sodium carbonate (Na2CO3).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of sodium carbonate (Na2CO3) is approximately 105.99g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 4.5 moles * 105.99g/mol ≈ 477.46 grams
    </Text>
  </View>

  {/* Question 20 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Determine the number of moles in 150 grams of barium sulfate (BaSO4).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of barium sulfate (BaSO4) is approximately 233.39g/mol.
    </Text>
    <Text style={styles.result}>
      Number of moles = 150g / 233.39g/mol ≈ 0.643 moles
    </Text>
  </View>

  {/* Question 21 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      How many moles are present in 75 grams of potassium hydroxide (KOH)?
    </Text>
    <Text style={styles.infoText}>
      The molar mass of potassium hydroxide (KOH) is approximately 56.11g/mol.
    </Text>
    <Text style={styles.result}>
      Number of moles = 75g / 56.11g/mol ≈ 1.336 moles
    </Text>
  </View>

  {/* Question 22 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Calculate the mass of 3.25 moles of nitric acid (HNO3).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of nitric acid (HNO3) is approximately 63.01g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 3.25 moles * 63.01g/mol ≈ 204.26 grams
    </Text>
  </View>

  {/* Question 23 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Determine the number of moles in 100 grams of calcium hydroxide (Ca(OH)2).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of calcium hydroxide (Ca(OH)2) is approximately 74.09g/mol.
    </Text>
    <Text style={styles.result}>
      Number of moles = 100g / 74.09g/mol ≈ 1.349 moles
    </Text>
  </View>

  {/* Question 24 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      Calculate the mass of 5.5 moles of diphosphorus pentoxide (P4O10).
    </Text>
    <Text style={styles.infoText}>
      The molar mass of diphosphorus pentoxide (P4O10) is approximately 283.89g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 5.5 moles * 283.89g/mol ≈ 1561.395 grams
    </Text>
  </View>

  {/* Question 25 */}
  <View style={styles.problemContainer}>
    <Text style={styles.problemStatement}>
      How many grams are there in 2.75 moles of sulfur hexafluoride (SF6)?
    </Text>
    <Text style={styles.infoText}>
      The molar mass of sulfur hexafluoride (SF6) is approximately 146.06g/mol.
    </Text>
    <Text style={styles.result}>
      Mass = 2.75 moles * 146.06g/mol ≈ 401.915 grams
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
