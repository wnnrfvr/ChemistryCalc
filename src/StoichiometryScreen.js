import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';
const StoichiometryScreen = () => {

  return (
    <>
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.problemText}>
          Problem 1:
          Given the balanced chemical equation:
        </Text>
        <Text style={styles.equation}>
          2 H₂ + O₂ == 2 H₂O
        </Text>

        <View style={styles.card}>
          <Text style={styles.question}>
            a) How many moles of water (H₂O) can be produced from 4 moles of hydrogen (H₂) and excess oxygen (O₂)?
          </Text>
          <Text style={styles.solution}>
            Solution:
            From the balanced equation, we can see that 2 moles of hydrogen produce 2 moles of water.
            Therefore, 4 moles of hydrogen will produce 4 moles of water.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.question}>
            b) How many grams of oxygen (O₂) are needed to completely react with 5 moles of hydrogen (H₂)?
          </Text>
          <Text style={styles.solution}>
            From the balanced equation, we see that 2 moles of hydrogen react with 1 mole of oxygen. 
            Therefore, 5 moles of hydrogen will require (5/2) moles of oxygen. To find the grams, 
            we use the molar mass of oxygen which is approximately 32 g/mol:
          </Text>
          <Text style={styles.calculation}>(5/2) moles * 32 g/mol = 80 grams of oxygen.</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.problemText}>
          Problem 2: Given the balanced chemical equation:
        </Text>
        <Text style={styles.equation}>
          4 NH₃ + 5 O₂ == 4 NO + 6 H₂O
        </Text>

  
          <Text style={styles.question}>
            a) How many moles of nitrogen monoxide (NO) are produced from 3 moles of ammonia (NH₃) and excess oxygen (O₂)?
          </Text>
          <Text style={styles.solution}>
            From the balanced equation, we see that 4 moles of ammonia produce 4 moles of nitrogen monoxide. Therefore, 3 moles of ammonia will produce 3 moles of nitrogen monoxide.
          </Text>

          <Text style={styles.question}>
            b) How many grams of water (H₂O) will be formed if 20 grams of ammonia (NH₃) react with excess oxygen (O₂)?
          </Text>
          <Text style={styles.solution}>
            First, convert 20 grams of ammonia to moles using its molar mass (approximately 17 g/mol):
          </Text>
          <Text style={styles.calculation}>20 grams / 17 g/mol ≈ 1.18 moles of NH₃</Text>
          <Text>From the balanced equation, 4 moles of NH₃ produce 6 moles of water. Therefore, 1.18 moles of NH₃ will produce (1.18 × 6/4) moles of water.</Text>
          <Text style={styles.calculation}> (1.18 * 6/4) moles * 18 g/mol ≈ 26.55 grams of H₂O.</Text>
    
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 3: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 C₆H₁₂O₆ == 2 C₂H₅OH + 2 CO₂</Text>
        <Text style={styles.problemText}>How many moles of ethanol (C₂H₅OH) are produced from 60 grams of glucose (C₆H₁₂O₆)?</Text>
        <Text style={styles.solution}>First, convert 60 grams of glucose to moles using its molar mass (approximately 180 g/mol):</Text>
        <Text style={styles.calculation}>60 grams / 180 g/mol = 0.33 moles of C₆H₁₂O₆</Text>
        <Text style={styles.solution}>From the balanced equation, 2 moles of glucose produce 2 moles of ethanol.</Text>
        <Text style={styles.solution}>Therefore, 0.33 moles of glucose will produce 0.33 moles of ethanol.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 4: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 Al + 3 Cl₂ == 2 AlCl₃</Text>
        <Text style={styles.problemText}>How many grams of aluminum chloride (AlCl₃) are produced from 45 grams of aluminum (Al) and excess chlorine (Cl₂)?</Text>
        <Text style={styles.solution}>First, convert 45 grams of aluminum to moles using its molar mass (approximately 27 g/mol):</Text>
        <Text style={styles.calculation}>45 grams / 27 g/mol ≈ 1.67 moles of Al</Text>
        <Text style={styles.solution}>From the balanced equation, 2 moles of aluminum produce 2 moles of aluminum chloride. Therefore, 1.67 moles of aluminum will produce 1.67 moles of aluminum chloride.</Text>
        <Text style={styles.solution}>Finally, convert moles of aluminum chloride to grams using its molar mass (approximately 133.5 g/mol):</Text>
        <Text style={styles.solution}>1.67 moles * 133.5 g/mol ≈ 223.5 grams of AlCl₃.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 5: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 H₂ + O₂ == 2 H₂O</Text>
        <Text style={styles.problemText}>How many molecules of water (H₂O) are produced from 2.5 moles of oxygen (O₂) and excess hydrogen (H₂)?</Text>
        <Text style={styles.solution}>From the balanced equation, 1 mole of oxygen produces 2 moles of water. Therefore, 2.5 moles of oxygen will produce (2.5 * 2) moles of water.</Text>
        <Text style={styles.solution}>Now, convert moles to molecules using Avogadro's number (approximately 6.022 * 10²³ molecules/mol):</Text>
        <Text style={styles.solution}>(2.5 x 2) moles * 6.022 x 10²³ molecules/mol ≈ 3.01 x 10²⁴ molecules of H₂O.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 6: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 NaOH + H₂SO₄ == Na₂SO₄ + 2 H₂O</Text>
        <Text style={styles.problemText}>How many moles of sodium sulfate (Na₂SO₄) are produced from 3 moles of sodium hydroxide (NaOH) and excess sulfuric acid (H₂SO₄)?</Text>
        <Text style={styles.solution}>From the balanced equation, 2 moles of NaOH produce 1 mole of Na₂SO₄.</Text>
        <Text style={styles.solution}>Therefore, 3 moles of NaOH will produce (3/2) moles of Na₂SO₄.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 7: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>CaCO₃ == CaO + CO₂</Text>
        <Text style={styles.problemText}>How many grams of calcium oxide (CaO) are produced from 75 grams of calcium carbonate (CaCO₃)?</Text>
        <Text style={styles.solution}>First, convert 75 grams of CaCO₃ to moles using its molar mass (approximately 100.1 g/mol):</Text>
        <Text style={styles.calculation}>75 grams / 100.1 g/mol ≈ 0.749 moles of CaCO₃</Text>
        <Text style={styles.solution}>From the balanced equation, 1 mole of CaCO₃ produces 1 mole of CaO. Therefore, 0.749 moles of CaCO₃ will produce 0.749 moles of CaO.</Text>
        <Text style={styles.solution}>Finally, convert moles of CaO to grams using its molar mass (approximately 56.1 g/mol):</Text>
        <Text style={styles.solution}>0.749 moles * 56.1 g/mol ≈ 42.04 grams of CaO.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 8: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>C₆H₁₂O₆ == 2 C₂H₅OH + 2 CO₂</Text>
        <Text style={styles.problemText}>How many grams of ethanol (C₂H₅OH) are produced from 150 grams of glucose (C₆H₁₂O₆)?</Text>
        <Text style={styles.solution}>First, convert 150 grams of glucose to moles using its molar mass (approximately 180 g/mol):</Text>
        <Text style={styles.calculation}>150 grams / 180 g/mol = 0.83 moles of C₆H₁₂O₆</Text>
        <Text style={styles.solution}>From the balanced equation, 1 mole of glucose produces 2 moles of ethanol. Therefore, 0.83 moles of glucose will produce (0.83 x 2) moles of ethanol.</Text>
        <Text style={styles.solution}>Finally, convert moles of ethanol to grams using its molar mass (approximately 46.1 g/mol):</Text>
        <Text style={styles.solution}>(0.83 x 2) moles * 46.1 g/mol ≈ 76.26 grams of C₂H₅OH.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 9: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 Fe + 3 Cl₂ == 2 FeCl₃</Text>
        <Text style={styles.problemText}>How many grams of iron chloride (FeCl₃) are produced from 50 grams of iron (Fe) and excess chlorine (Cl₂)?</Text>
        <Text style={styles.solution}>First, convert 50 grams of iron to moles using its molar mass (approximately 55.8 g/mol):</Text>
        <Text style={styles.calculation}>50 grams / 55.8 g/mol ≈ 0.894 moles of Fe</Text>
        <Text style={styles.solution}>From the balanced equation, 2 moles of Fe produce 2 moles of FeCl₃. Therefore, 0.894 moles of Fe will produce 0.894 moles of FeCl₃.</Text>
        <Text style={styles.solution}>Finally, convert moles of FeCl₃ to grams using its molar mass (approximately 162.2 g/mol):</Text>
        <Text style={styles.solution}>0.894 moles * 162.2 g/mol ≈ 144.9 grams of FeCl₃.</Text>

      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 10: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 KClO₃ == 2 KCl + 3 O₂</Text>
        <Text style={styles.problemText}>How many molecules of oxygen (O₂) are produced from 5 moles of potassium chlorate (KClO₃)?</Text>
        <Text style={styles.solution}>From the balanced equation, 2 moles of KClO₃ produce 3 moles of O₂. Therefore, 5 moles of KClO₃ will produce (5 × 3/2) moles of O₂.</Text>
        <Text style={styles.solution}>Now, convert moles to molecules using Avogadro's number (approximately 6.022 x 10²³ molecules/mol):</Text>
        <Text style={styles.solution}>(5 x 3/2) moles * 6.022 x 10²³ molecules/mol ≈ 4.51 x 10²⁴ molecules of O₂.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 11: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>N₂ + 3 H₂ == 2 NH₃</Text>
        <Text style={styles.problemText}>How many moles of ammonia (NH₃) are produced from 4 moles of nitrogen (N₂) and excess hydrogen (H₂)?</Text>
        <Text style={styles.solution}>From the balanced equation, 1 mole of N₂ produces 2 moles of NH₃. Therefore, 4 moles of N₂ will produce 8 moles of NH₃.</Text>
        <Text style={styles.problemText}>How many grams of hydrogen (H₂) are needed to completely react with 10 moles of nitrogen (N₂)?</Text>
        <Text style={styles.solution}>From the balanced equation, 1 mole of N₂ reacts with 3 moles of H₂. Therefore, 10 moles of N₂ will require (10 x 3) moles of H₂.</Text>
        <Text style={styles.solution}>Finally, convert moles of H₂ to grams using its molar mass (approximately 2 g/mol):</Text>
        <Text style={styles.solution}>(10 x 3) moles * 2 g/mol = 60 grams of H₂.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 12: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 H₂O == 2 H₂ + O₂</Text>
        <Text style={styles.problemText}>How many grams of oxygen (O₂) are produced from 50 grams of water (H₂O)?</Text>
        <Text style={styles.solution}>First, convert 50 grams of H₂O to moles using its molar mass (approximately 18 g/mol):</Text>
        <Text style={styles.calculation}>50 grams / 18 g/mol ≈ 2.78 moles of H₂O</Text>
        <Text style={styles.solution}>From the balanced equation, 2 moles of H₂O produce 1 mole of O₂. Therefore, 2.78 moles of H₂O will produce (2.78/2) moles of O₂.</Text>
        <Text style={styles.solution}>Finally, convert moles of O₂ to grams using its molar mass (approximately 32 g/mol):</Text>
        <Text style={styles.solution}>(2.78/2) moles * 32 g/mol ≈ 44.48 grams of O₂.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 13: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 Al + 6 HCl == 2 AlCl₃ + 3 H₂</Text>
        <Text style={styles.problemText}>How many moles of hydrogen gas (H₂) are produced from 5 moles of hydrochloric acid (HCl) and excess aluminum (Al)?</Text>
        <Text style={styles.solution}>From the balanced equation, 6 moles of HCl produce 3 moles of H₂.</Text>
        <Text style={styles.solution}>Therefore, 5 moles of HCl will produce (5 x 3/6) moles of H₂.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 14: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>CH₄ + 2 O₂ == CO₂ + 2 H₂O</Text>
        <Text style={styles.problemText}>How many grams of oxygen (O₂) are needed to completely react with 10 moles of methane (CH₄)?</Text>
        <Text style={styles.solution}>From the balanced equation, 1 mole of CH₄ reacts with 2 moles of O₂. Therefore, 10 moles of CH₄ will require (10 x 2) moles of O₂.</Text>
        <Text style={styles.solution}>Finally, convert moles of O₂ to grams using its molar mass (approximately 32 g/mol):</Text>
        <Text style={styles.solution}>(10 x 2) moles * 32 g/mol = 640 grams of O₂.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 15: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>2 Mg + O₂ == 2 MgO</Text>
        <Text style={styles.problemText}> How many grams of oxygen (O₂) are needed to completely react with 25 grams of magnesium (Mg)?</Text>
        <Text style={styles.solution}>Convert 25 grams of Mg to moles using its molar mass (approximately 24.3 g/mol):</Text>
        <Text style={styles.calculation}>25 grams / 24.3 g/mol ≈ 1.03 moles of Mg</Text>
        <Text style={styles.solution}>From the balanced equation, 2 moles of Mg react with 1 mole of O₂. Therefore, 1.03 moles of Mg will require (1.03/2) moles of O₂.</Text>
        <Text style={styles.solution}>Finally, convert moles of O₂ to grams using its molar mass (approximately 32 g/mol):</Text>
        <Text style={styles.result}>(1.03/2) moles * 32 g/mol ≈ 16.5 grams of O₂.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 16: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>C₄H₁₀ + 6.5 O₂ == 4 CO₂ + 5 H₂O</Text>
        <Text style={styles.problemText}>How many grams of water (H₂O) are produced from 50 grams of butane (C₄H₁₀) and excess oxygen (O₂)?</Text>
        <Text style={styles.solution}>First, convert 50 grams of C₄H₁₀ to moles using its molar mass (approximately 58.1 g/mol):</Text>
        <Text style={styles.calculation}>50 grams / 58.1 g/mol ≈ 0.861 moles of C₄H₁₀</Text>
        <Text style={styles.solution}>From the balanced equation, 1 mole of C₄H₁₀ produces 5 moles of H₂O. Therefore, 0.861 moles of C₄H₁₀ will produce (0.861 × 5) moles of H₂O.</Text>
        <Text style={styles.solution}>Finally, convert moles of H₂O to grams using its molar mass (approximately 18 g/mol):</Text>
        <Text style={styles.solution}>(0.861 x 5) moles * 18 g/mol ≈ 77.5 grams of H₂O.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.problemText}>Problem 17: Given the balanced chemical equation:</Text>
        <Text style={styles.equation}>3 CaCO₃ == 3 CaO + 3 CO₂</Text>
        <Text style={styles.problemText}>How many grams of calcium oxide (CaO) are produced from 100 grams of calcium carbonate (CaCO₃)?</Text>
        <Text style={styles.solution}>First, convert 100 grams of CaCO₃ to moles using its molar mass (approximately 100.1 g/mol):</Text>
        <Text style={styles.calculation}>100 grams / 100.1 g/mol ≈ 0.999 moles of CaCO₃</Text>
        <Text style={styles.solution}>From the balanced equation, 3 moles of CaCO₃ produce 3 moles of CaO. Therefore, 0.999 moles of CaCO₃ will produce 0.999 moles of CaO.</Text>
        <Text style={styles.solution}>Finally, convert moles of CaO to grams using its molar mass (approximately 56.1 g/mol):</Text>
        <Text style={styles.solution}>0.999 moles * 56.1 g/mol ≈ 56 grams of CaO.</Text>
      </View>

      <View style={styles.try}>
        <Text style={styles.tryText}>Try It Yourself </Text>
      </View>
      <View style={styles.work}>
        <Text style={styles.equation}>2 H₂ + Cl₂ == 2 HCl</Text>
        <Text style={styles.problemText}>How many grams of chlorine (Cl₂) are needed to completely react with 30 moles of hydrogen (H₂)?</Text>
        <Text style={styles.problemText}>How many moles of hydrochloric acid (HCl) are produced from 5 moles of hydrogen (H₂) and excess chlorine (Cl₂)?</Text>
      </View>

      <View style={styles.work}>
        <Text style={styles.equation}>2 C₃H₈ + 7 O₂ == 6 CO₂ + 8 H₂O</Text>
        <Text style={styles.problemText}>How many moles of carbon dioxide (CO₂) are produced from 3 moles of propane (C₃H₈) and excess oxygen (O₂)?</Text>
      </View>

      <View style={styles.work}>
        <Text style={styles.equation}>2 Na + Cl₂ == 2 NaCl</Text>
        <Text style={styles.problemText}>How many grams of sodium chloride (NaCl) are produced from 20 grams of sodium (Na) and excess chlorine (Cl₂)?</Text>
      </View>

      <View style={styles.work}>
        <Text style={styles.equation}>CH₄ + 2 O₂ == CO₂ + 2 H₂O</Text>
        <Text style={styles.problemText}>How many grams of oxygen are needed to completely burn 10.0 grams of methane (CH4)?</Text>
      </View>

      <View style={styles.work}>
        <Text style={styles.equation}>KOH + HCl == KCl + H₂O</Text>
        <Text style={styles.problemText}>How many grams of potassium chloride (KCl) can be produced by reacting 100.0 grams of potassium hydroxide (KOH) with 100.0 grams of hydrochloric acid (HCl)?</Text>
      </View>
      
      
      {/* Add other problems and solutions similarly */}
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
    padding: 16,
    backgroundColor: '#F7F0F7', // Light Gray Background
    marginBottom: 50,
  },
  adContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF', // White Background
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Add a slight shadow for depth
  },
  problemText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4E7ECE', // Blue Color
  },
  equation: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333333', // Dark Gray Text
  },
  question: {
    fontSize: 18,
    marginBottom: 8,
    color: '#4E7ECE', // Blue Color
  },
  solution: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333', // Dark Gray Text
  },
  calculation: {
    fontSize: 16,
    color: '#4E7ECA', // Blue Color
    marginBottom: 8,
  },
  work: {
    marginBottom: 24,
    elevation: 4,
    backgroundColor: 'silver',
    borderRadius: 10,
    shadowColor: "grey",
    padding: 10,
    shadowOffset: { width: 2, height: 2 },
  }, 
  try: {
    padding: 20,
    margin: 20,
    alignItems: 'center',
    borderColor: 'red'

  },
  tryText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default StoichiometryScreen;
