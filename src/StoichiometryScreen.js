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

      <View style={styles.card}>
  <Text style={styles.problemText}>Problem 18: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>4 NH₃ + 5 O₂ == 4 NO + 6 H₂O</Text>
  <Text style={styles.problemText}>How many moles of nitric oxide (NO) are produced from 8 moles of ammonia (NH₃) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>From the balanced equation, 4 moles of NH₃ produce 4 moles of NO.</Text>
  <Text style={styles.solution}>Therefore, 8 moles of NH₃ will produce 8 moles of NO.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 19: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>C₃H₈ + 5 O₂ == 3 CO₂ + 4 H₂O</Text>
  <Text style={styles.problemText}>How many grams of water (H₂O) are produced from 20 grams of propane (C₃H₈) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 20 grams of C₃H₈ to moles using its molar mass (approximately 44 g/mol):</Text>
  <Text style={styles.calculation}>20 grams / 44 g/mol ≈ 0.455 moles of C₃H₈</Text>
  <Text style={styles.solution}>From the balanced equation, 1 mole of C₃H₈ produces 4 moles of H₂O. Therefore, 0.455 moles of C₃H₈ will produce (0.455 × 4) moles of H₂O.</Text>
  <Text style={styles.solution}>Finally, convert moles of H₂O to grams using its molar mass (approximately 18 g/mol):</Text>
  <Text style={styles.solution}>(0.455 x 4) moles * 18 g/mol ≈ 32.72 grams of H₂O.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 20: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 C₄H₁₀ + 13 O₂ == 8 CO₂ + 10 H₂O</Text>
  <Text style={styles.problemText}>How many moles of carbon dioxide (CO₂) are produced from 30 moles of butane (C₄H₁₀) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of C₄H₁₀ produce 8 moles of CO₂.</Text>
  <Text style={styles.solution}>Therefore, 30 moles of C₄H₁₀ will produce (30 × 8/2) moles of CO₂.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 21: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>3 Mg + 2 H₃PO₄ == Mg₃(PO₄)₂ + 3 H₂</Text>
  <Text style={styles.problemText}>How many grams of magnesium phosphate (Mg₃(PO₄)₂) are produced from 50 grams of magnesium (Mg) and excess phosphoric acid (H₃PO₄)?</Text>
  <Text style={styles.solution}>First, convert 50 grams of Mg to moles using its molar mass (approximately 24.3 g/mol):</Text>
  <Text style={styles.calculation}>50 grams / 24.3 g/mol ≈ 2.06 moles of Mg</Text>
  <Text style={styles.solution}>From the balanced equation, 3 moles of Mg produce 1 mole of Mg₃(PO₄)₂. Therefore, 2.06 moles of Mg will produce (2.06 × 1/3) moles of Mg₃(PO₄)₂.</Text>
  <Text style={styles.solution}>Finally, convert moles of Mg₃(PO₄)₂ to grams using its molar mass (approximately 262.86 g/mol):</Text>
  <Text style={styles.solution}>(2.06 × 1/3) moles * 262.86 g/mol ≈ 54.15 grams of Mg₃(PO₄)₂.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 22: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 K + 2 H₂O == 2 KOH + H₂</Text>
  <Text style={styles.problemText}>How many moles of potassium hydroxide (KOH) are produced from 4 moles of potassium (K) and excess water (H₂O)?</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of K produce 2 moles of KOH.</Text>
  <Text style={styles.solution}>Therefore, 4 moles of K will produce 4 moles of KOH.</Text>
</View>


<View style={styles.card}>
  <Text style={styles.problemText}>Problem 23: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>4 PCl₃ + 5 O₂ == 4 P₄O₁₀ + 6 Cl₂</Text>
  <Text style={styles.problemText}>How many grams of tetraphosphorus decaoxide (P₄O₁₀) are produced from 15 grams of phosphorous trichloride (PCl₃) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 15 grams of PCl₃ to moles using its molar mass (approximately 137.33 g/mol):</Text>
  <Text style={styles.calculation}>15 grams / 137.33 g/mol ≈ 0.109 moles of PCl₃</Text>
  <Text style={styles.solution}>From the balanced equation, 4 moles of PCl₃ produce 4 moles of P₄O₁₀. Therefore, 0.109 moles of PCl₃ will produce (0.109 × 4/4) moles of P₄O₁₀.</Text>
  <Text style={styles.solution}>Finally, convert moles of P₄O₁₀ to grams using its molar mass (approximately 283.89 g/mol):</Text>
  <Text style={styles.solution}>(0.109 × 4/4) moles * 283.89 g/mol ≈ 28.39 grams of P₄O₁₀.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 24: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 C₄H₁₀ + 17 O₂ == 8 CO₂ + 10 H₂O</Text>
  <Text style={styles.problemText}>How many moles of water (H₂O) are produced from 40 moles of butane (C₄H₁₀) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of C₄H₁₀ produce 10 moles of H₂O.</Text>
  <Text style={styles.solution}>Therefore, 40 moles of C₄H₁₀ will produce (40 × 10/2) moles of H₂O.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 25: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>3 Fe + 4 H₂O == Fe₃O₄ + 4 H₂</Text>
  <Text style={styles.problemText}>How many grams of iron(II,III) oxide (Fe₃O₄) are produced from 100 grams of iron (Fe) and excess water (H₂O)?</Text>
  <Text style={styles.solution}>First, convert 100 grams of Fe to moles using its molar mass (approximately 55.85 g/mol):</Text>
  <Text style={styles.calculation}>100 grams / 55.85 g/mol ≈ 1.79 moles of Fe</Text>
  <Text style={styles.solution}>From the balanced equation, 3 moles of Fe produce 1 mole of Fe₃O₄. Therefore, 1.79 moles of Fe will produce (1.79 × 1/3) moles of Fe₃O₄.</Text>
  <Text style={styles.solution}>Finally, convert moles of Fe₃O₄ to grams using its molar mass (approximately 231.53 g/mol):</Text>
  <Text style={styles.solution}>(1.79 × 1/3) moles * 231.53 g/mol ≈ 134.77 grams of Fe₃O₄.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 26: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 KNO₃ == 2 KNO₂ + O₂</Text>
  <Text style={styles.problemText}>How many molecules of nitric oxide (NO) are produced from 2 moles of potassium nitrate (KNO₃)?</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of KNO₃ produce 2 moles of NO.</Text>
  <Text style={styles.solution}>Now, convert moles to molecules using Avogadro's number (approximately 6.022 x 10²³ molecules/mol):</Text>
  <Text style={styles.solution}>(2 × 2) moles * 6.022 x 10²³ molecules/mol ≈ 2.41 x 10²⁴ molecules of NO.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 27: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>C₆H₁₂O₆ + 6 O₂ == 6 CO₂ + 6 H₂O</Text>
  <Text style={styles.problemText}>How many grams of carbon dioxide (CO₂) are produced from 90 grams of glucose (C₆H₁₂O₆) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 90 grams of C₆H₁₂O₆ to moles using its molar mass (approximately 180.16 g/mol):</Text>
  <Text style={styles.calculation}>90 grams / 180.16 g/mol ≈ 0.499 moles of C₆H₁₂O₆</Text>
  <Text style={styles.solution}>From the balanced equation, 1 mole of C₆H₁₂O₆ produces 6 moles of CO₂. Therefore, 0.499 moles of C₆H₁₂O₆ will produce (0.499 × 6) moles of CO₂.</Text>
  <Text style={styles.solution}>Finally, convert moles of CO₂ to grams using its molar mass (approximately 44.01 g/mol):</Text>
  <Text style={styles.solution}>(0.499 × 6) moles * 44.01 g/mol ≈ 132.27 grams of CO₂.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 28: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 C₃H₈ + 7 O₂ == 6 CO₂ + 8 H₂O</Text>
  <Text style={styles.problemText}>How many moles of carbon dioxide (CO₂) are produced from the complete combustion of 25 grams of propane (C₃H₈) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 25 grams of C₃H₈ to moles using its molar mass (approximately 44.09 g/mol):</Text>
  <Text style={styles.calculation}>25 grams / 44.09 g/mol ≈ 0.567 moles of C₃H₈</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of C₃H₈ produce 6 moles of CO₂. Therefore, 0.567 moles of C₃H₈ will produce (0.567 × 6/2) moles of CO₂.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 29: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>3 Na₂CO₃ + 2 Fe(NO₃)₃ == 6 NaNO₃ + Fe₂(CO₃)₃</Text>
  <Text style={styles.problemText}>How many grams of iron(III) carbonate (Fe₂(CO₃)₃) are produced from the reaction of 150 grams of sodium carbonate (Na₂CO₃) and 200 grams of iron(III) nitrate (Fe(NO₃)₃)?</Text>
  <Text style={styles.solution}>First, convert 150 grams of Na₂CO₃ to moles using its molar mass (approximately 105.99 g/mol):</Text>
  <Text style={styles.calculation}>150 grams / 105.99 g/mol ≈ 1.415 moles of Na₂CO₃</Text>
  <Text style={styles.solution}>Next, convert 200 grams of Fe(NO₃)₃ to moles using its molar mass (approximately 241.91 g/mol):</Text>
  <Text style={styles.calculation}>200 grams / 241.91 g/mol ≈ 0.827 moles of Fe(NO₃)₃</Text>
  <Text style={styles.solution}>From the balanced equation, 3 moles of Na₂CO₃ react with 2 moles of Fe(NO₃)₃ to produce 1 mole of Fe₂(CO₃)₃. Therefore, the limiting reactant is Na₂CO₃, and the reaction will produce 1.415 moles of Fe₂(CO₃)₃.</Text>
  <Text style={styles.solution}>Finally, convert moles of Fe₂(CO₃)₃ to grams using its molar mass (approximately 291.72 g/mol):</Text>
  <Text style={styles.solution}>1.415 moles * 291.72 g/mol ≈ 412.79 grams of Fe₂(CO₃)₃.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 30: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>C₄H₁₀ + 6 O₂ == 4 CO₂ + 5 H₂O</Text>
  <Text style={styles.problemText}>How many molecules of water (H₂O) are produced from the complete combustion of 30 grams of butane (C₄H₁₀) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 30 grams of C₄H₁₀ to moles using its molar mass (approximately 58.12 g/mol):</Text>
  <Text style={styles.calculation}>30 grams / 58.12 g/mol ≈ 0.516 moles of C₄H₁₀</Text>
  <Text style={styles.solution}>From the balanced equation, 1 mole of C₄H₁₀ produces 5 moles of H₂O. Therefore, 0.516 moles of C₄H₁₀ will produce (0.516 × 5) moles of H₂O.</Text>
  <Text style={styles.solution}>Now, convert moles to molecules using Avogadro's number (approximately 6.022 x 10²³ molecules/mol):</Text>
  <Text style={styles.solution}>(0.516 × 5) moles * 6.022 x 10²³ molecules/mol ≈ 1.54 x 10²⁴ molecules of H₂O.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 31: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 KBr + Cl₂ == 2 KCl + Br₂</Text>
  <Text style={styles.problemText}>How many moles of potassium chloride (KCl) are produced from the reaction of 25 grams of potassium bromide (KBr) and excess chlorine (Cl₂)?</Text>
  <Text style={styles.solution}>First, convert 25 grams of KBr to moles using its molar mass (approximately 119 g/mol):</Text>
  <Text style={styles.calculation}>25 grams / 119 g/mol ≈ 0.210 moles of KBr</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of KBr react with 1 mole of Cl₂ to produce 2 moles of KCl. Therefore, 0.210 moles of KBr will produce (0.210 × 2/2) moles of KCl.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 32: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>N₂ + 3 F₂ == 2 NF₃</Text>
  <Text style={styles.problemText}>How many grams of nitrogen trifluoride (NF₃) are produced from the reaction of 50 grams of nitrogen (N₂) and excess fluorine (F₂)?</Text>
  <Text style={styles.solution}>First, convert 50 grams of N₂ to moles using its molar mass (approximately 28.02 g/mol):</Text>
  <Text style={styles.calculation}>50 grams / 28.02 g/mol ≈ 1.784 moles of N₂</Text>
  <Text style={styles.solution}>From the balanced equation, 1 mole of N₂ reacts with 3 moles of F₂ to produce 2 moles of NF₃. Therefore, 1.784 moles of N₂ will produce (1.784 × 2/1) moles of NF₃.</Text>
  <Text style={styles.solution}>Finally, convert moles of NF₃ to grams using its molar mass (approximately 71.0 g/mol):</Text>
  <Text style={styles.solution}>(1.784 × 2/1) moles * 71.0 g/mol ≈ 252.4 grams of NF₃.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 33: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 H₂S + 3 O₂ == 2 H₂SO₄</Text>
  <Text style={styles.problemText}>How many grams of sulfuric acid (H₂SO₄) are produced from the reaction of 40 grams of hydrogen sulfide (H₂S) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 40 grams of H₂S to moles using its molar mass (approximately 34.08 g/mol):</Text>
  <Text style={styles.calculation}>40 grams / 34.08 g/mol ≈ 1.174 moles of H₂S</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of H₂S react with 3 moles of O₂ to produce 2 moles of H₂SO₄. Therefore, 1.174 moles of H₂S will produce (1.174 × 2/2) moles of H₂SO₄.</Text>
  <Text style={styles.solution}>Finally, convert moles of H₂SO₄ to grams using its molar mass (approximately 98.08 g/mol):</Text>
  <Text style={styles.solution}>(1.174 × 2/2) moles * 98.08 g/mol ≈ 114.9 grams of H₂SO₄.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 34: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>4 NH₃ + 5 O₂ == 4 NO + 6 H₂O</Text>
  <Text style={styles.problemText}>How many grams of nitric oxide (NO) are produced from the reaction of 30 grams of ammonia (NH₃) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 30 grams of NH₃ to moles using its molar mass (approximately 17.03 g/mol):</Text>
  <Text style={styles.calculation}>30 grams / 17.03 g/mol ≈ 1.763 moles of NH₃</Text>
  <Text style={styles.solution}>From the balanced equation, 4 moles of NH₃ react with 5 moles of O₂ to produce 4 moles of NO. Therefore, 1.763 moles of NH₃ will produce (1.763 × 4/4) moles of NO.</Text>
  <Text style={styles.solution}>Finally, convert moles of NO to grams using its molar mass (approximately 30.01 g/mol):</Text>
  <Text style={styles.solution}>(1.763 × 4/4) moles * 30.01 g/mol ≈ 52.53 grams of NO.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 35: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>C₄H₁₀ + 13/2 O₂ == 4 CO₂ + 5 H₂O</Text>
  <Text style={styles.problemText}>How many grams of water (H₂O) are produced from the complete combustion of 60 grams of butane (C₄H₁₀) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 60 grams of C₄H₁₀ to moles using its molar mass (approximately 58.12 g/mol):</Text>
  <Text style={styles.calculation}>60 grams / 58.12 g/mol ≈ 1.033 moles of C₄H₁₀</Text>
  <Text style={styles.solution}>From the balanced equation, 1 mole of C₄H₁₀ produces 5 moles of H₂O. Therefore, 1.033 moles of C₄H₁₀ will produce (1.033 × 5) moles of H₂O.</Text>
  <Text style={styles.solution}>Finally, convert moles of H₂O to grams using its molar mass (approximately 18.02 g/mol):</Text>
  <Text style={styles.solution}>(1.033 × 5) moles * 18.02 g/mol ≈ 92.3 grams of H₂O.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 36: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>2 C₂H₆ + 7 O₂ == 4 CO₂ + 6 H₂O</Text>
  <Text style={styles.problemText}>How many molecules of carbon dioxide (CO₂) are produced from the complete combustion of 40 grams of ethane (C₂H₆) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 40 grams of C₂H₆ to moles using its molar mass (approximately 30.07 g/mol):</Text>
  <Text style={styles.calculation}>40 grams / 30.07 g/mol ≈ 1.33 moles of C₂H₆</Text>
  <Text style={styles.solution}>From the balanced equation, 2 moles of C₂H₆ produce 4 moles of CO₂. Therefore, 1.33 moles of C₂H₆ will produce (1.33 × 4/2) moles of CO₂.</Text>
  <Text style={styles.solution}>Now, convert moles to molecules using Avogadro's number (approximately 6.022 x 10²³ molecules/mol):</Text>
  <Text style={styles.solution}>(1.33 × 4/2) moles * 6.022 x 10²³ molecules/mol ≈ 3.18 x 10²⁴ molecules of CO₂.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 37: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>3 Mg + N₂ == Mg₃N₂</Text>
  <Text style={styles.problemText}>How many moles of magnesium nitride (Mg₃N₂) are produced from the reaction of 25 grams of magnesium (Mg) and excess nitrogen (N₂)?</Text>
  <Text style={styles.solution}>First, convert 25 grams of Mg to moles using its molar mass (approximately 24.31 g/mol):</Text>
  <Text style={styles.calculation}>25 grams / 24.31 g/mol ≈ 1.028 moles of Mg</Text>
  <Text style={styles.solution}>From the balanced equation, 3 moles of Mg react with 1 mole of N₂ to produce 1 mole of Mg₃N₂. Therefore, 1.028 moles of Mg will produce (1.028 × 1/3) moles of Mg₃N₂.</Text>
</View>

<View style={styles.card}>
  <Text style={styles.problemText}>Problem 38: Given the balanced chemical equation:</Text>
  <Text style={styles.equation}>4 Fe + 3 O₂ == 2 Fe₂O₃</Text>
  <Text style={styles.problemText}>How many grams of iron(III) oxide (Fe₂O₃) are produced from the reaction of 60 grams of iron (Fe) and excess oxygen (O₂)?</Text>
  <Text style={styles.solution}>First, convert 60 grams of Fe to moles using its molar mass (approximately 55.85 g/mol):</Text>
  <Text style={styles.calculation}>60 grams / 55.85 g/mol ≈ 1.075 moles of Fe</Text>
  <Text style={styles.solution}>From the balanced equation, 4 moles of Fe react with 3 moles of O₂ to produce 2 moles of Fe₂O₃. Therefore, 1.075 moles of Fe will produce (1.075 × 2/4) moles of Fe₂O₃.</Text>
  <Text style={styles.solution}>Finally, convert moles of Fe₂O₃ to grams using its molar mass (approximately 159.69 g/mol):</Text>
  <Text style={styles.solution}>(1.075 × 2/4) moles * 159.69 g/mol ≈ 85.29 grams of Fe₂O₃.</Text>
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
