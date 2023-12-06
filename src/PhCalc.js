import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';



const PhCalcScreen = () => {


  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>pH of a Solution</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          What is the pH of a equation with a hydrogen ion concentration of 1.0 × 10⁻²⁰ M?
        </Text>

        <Text style={styles.explanation}>
          The pH of a equation is defined as the negative logarithm of the hydrogen ion concentration:
        </Text>

        <Text style={styles.equation}>pH = -log[H+]</Text>

        <Text style={styles.result}>
          Therefore, the pH of a equation with a hydrogen ion concentration of 1.0 × 10⁻²⁰ M is:
        </Text>

        <Text style={styles.calculation}>pH = -log(1.0 × 10⁻²⁰) = 20.0</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>
          What is the pH of a equation with a hydroxide ion concentration of 1.0 × 10⁻⁶ M?
        </Text>

        <Text style={styles.explanation}>
          The pH of a equation can also be calculated from the hydroxide ion concentration using the following equation:
        </Text>

        <Text style={styles.equation}>pH = 14.0 - pOH</Text>

        <Text style={styles.explanation}>
          Where pOH is the negative logarithm of the hydroxide ion concentration.
        </Text>

        <Text style={styles.result}>
          Therefore, the pH of a equation with a hydroxide ion concentration of 1.0 × 10⁻⁶ M is:
        </Text>

        <Text style={styles.calculation}>pH = 14.0 - (-log(1.0 × 10⁻⁶)) = 8.0</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Calculate the pH of a buffer equation containing 0.10 M acetic acid and 0.10 M sodium acetate</Text>

        <Text style={styles.explanation}>The pH of a buffer equation can be calculated using the Henderson-Hasselbalch equation:</Text>
        <Text style={styles.equation}>pH = pKa + log([A-]/[HA])</Text>
        <Text style={styles.explanation}>Where pKa is the acid dissociation constant of the weak acid, [A-] is the concentration of the conjugate base, and [HA] is the concentration of the weak acid.</Text>
        <Text style={styles.explanation}>The acid dissociation constant of acetic acid is 4.76. Therefore, the pH of the buffer equation is:</Text>
        <Text style={styles.result}>pH = 4.76 + log(0.10/0.10) = 4.76</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Calculate the pH of a equation containing 0.20 M hydrochloric acid and 0.10 M sodium hydroxide.</Text>

        <Text style={styles.explanation}>When a strong acid and a strong base are mixed, the reaction goes to completion to produce water and a salt. </Text>
        <Text style={styles.explanation}>The pH of the resulting equation is 7.0.</Text>
        <Text style={styles.result}>Therefore, the pH of a equation containing 0.20 M hydrochloric acid and 0.10 M sodium hydroxide is 7.0.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Calculate the pH of a equation containing 0.10 M ammonia and 0.10 M ammonium chloride.</Text>

        <Text style={styles.explanation}>Ammonia is a weak base with a pKb of 4.76. Ammonium chloride is a salt of a weak base and a strong acid.</Text>
        <Text style={styles.explanation}>The pH of a equation containing a weak base and its conjugate acid is determined by the Henderson-Hasselbalch equation.</Text>
        <Text style={styles.equation}>pH = 14.0 - pKb - log([B]/[BH+])</Text>
        <Text style={styles.explanation}>Where pKb is the base dissociation constant of the weak base, [B] is the concentration of the weak base, and [BH+] is the concentration of the conjugate acid.</Text>
        <Text style={styles.explanation}>Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 14.0 - 4.76 - log(0.10/0.10) = 9.24</Text>
        <Text style={styles.result}>Therefore, the pH of a equation containing 0.10 M ammonia and 0.10 M ammonium chloride is 9.24.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Calculate the pH of a equation containing 0.10 M formic acid (HCOOH) and 0.10 M sodium formate (HCOONa).</Text>

        <Text style={styles.explanation}>Formic acid is a weak acid with a pKa of 3.75. Sodium formate is a salt of a weak acid and a strong base.</Text>
        <Text style={styles.explanation}>The pH of a equation containing a weak acid and its conjugate base is determined by the Henderson-Hasselbalch equation.</Text>
        <Text style={styles.equation}>pH = pKa + log([A-]/[HA])</Text>
        <Text style={styles.explanation}>Where pKa is the acid dissociation constant of the weak acid, [A-] is the concentration of the conjugate base, and [HA] is the concentration of the weak acid.</Text>
        <Text style={styles.explanation}>Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 3.75 + log(0.10/0.10) = 3.75</Text>
        <Text style={styles.result}>Therefore, the pH of a equation containing 0.10 M formic acid and 0.10 M sodium formate is 3.75.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}> Calculate the pH of a equation containing 0.050 M sulfuric acid (H2SO4) and 0.050 M sodium sulfate (Na2SO4).</Text>

        <Text style={styles.explanation}>Sulfuric acid is a strong acid, so it completely dissociates in water to produce hydrogen ions and sulfate ions.</Text>
        <Text style={styles.explanation}>Sodium sulfate is a salt of a strong acid and a strong base, so it does not affect the pH of the equation.</Text>
        <Text style={styles.result}>Therefore, the pH of a equation containing 0.050 M sulfuric acid and 0.050 M sodium sulfate is 1.0.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Calculate the pH of a equation containing 0.10 M phosphoric acid (H3PO4) and 0.10 M sodium dihydrogen phosphate (NaH2PO4).</Text>

        <Text style={styles.explanation}>Phosphoric acid is a weak acid with three pKa values: 2.15, 7.20, and 12.35. Sodium dihydrogen phosphate is a salt of a weak acid and a strong base.</Text>
        <Text style={styles.explanation}>The pH of a equation containing a weak acid and its conjugate base is determined by the Henderson-Hasselbalch equation.</Text>
        <Text style={styles.equation}>pH = pKa + log([A-]/[HA])</Text>
        <Text style={styles.explanation}>Where pKa is the acid dissociation constant of the weak acid, [A-] is the concentration of the conjugate base, and [HA] is the concentration of the weak acid.</Text>
        <Text style={styles.explanation}>Since the pH of the equation is less than 7.20, we can assume that only the first dissociation of phosphoric acid has occurred. Therefore, the relevant pKa value is 2.15.</Text>
        <Text style={styles.explanation}>Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 2.15 + log(0.10/0.10) = 2.15</Text>
        <Text style={styles.result}>Therefore, the pH of a equation containing 0.10 M phosphoric acid and 0.10 M sodium dihydrogen phosphate is 2.15.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>Calculate the pH of a equation containing 0.10 M ethanolamine (C2H5NO) and 0.10 M ethanolammonium chloride (C2H5NOH+Cl-).</Text>

        <Text style={styles.explanation}>Ethanolamine is a weak base with a pKb of 4.74. Ethanolammonium chloride is a salt of a weak base and a strong acid.</Text>
        <Text style={styles.explanation}>The pH of a equation containing a weak base and its conjugate acid is determined by the Henderson-Hasselbalch equation.</Text>
        <Text style={styles.equation}>pH = 14.0 - pKb - log([B]/[BH+])</Text>
        <Text style={styles.explanation}>Where pKb is the base dissociation constant of the weak base, [B] is the concentration of the weak base, and [BH+] is the concentration of the conjugate acid.</Text>
        <Text style={styles.explanation}>Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 14.0 - 4.74 - log(0.10/0.10) = 9.26</Text>
        <Text style={styles.result}>Therefore, the pH of a equation containing 0.10 M ethanolamine and 0.10 M ethanolammonium chloride is 9.26.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>A equation contains 0.10 M acetic acid (CH3COOH) and 0.10 M sodium acetate (CH3COONa). What is the pH of the equation?</Text>

        <Text style={styles.explanation}>Acetic acid is a weak acid with a pKa of 4.76. Sodium acetate is a salt of a weak acid and a strong base, and it acts as a buffer to resist changes in pH.</Text>
        <Text style={styles.explanation}>The pH of the equation can be calculated using the Henderson-Hasselbalch equation:</Text>
        <Text style={styles.equation}>pH = pKa + log([A-]/[HA])</Text>
        <Text style={styles.explanation}>Where pKa is the acid dissociation constant of the weak acid, [A-] is the concentration of the conjugate base, and [HA] is the concentration of the weak acid.</Text>
        <Text style={styles.explanation}>In this case, the conjugate base is acetate ion (CH3COO-) and the weak acid is acetic acid (CH3COOH). Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 4.76 + log(0.10/0.10) = 4.76</Text>
        <Text style={styles.result}>Therefore, the pH of the equation is 4.76.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>A equation contains 0.050 M hydrochloric acid (HCl) and 0.050 M sodium hydroxide (NaOH). What is the pH of the equation?</Text>

        <Text style={styles.explanation}>Hydrochloric acid is a strong acid, so it completely dissociates in water to produce hydrogen ions and chloride ions. Sodium hydroxide is a strong base, so it completely dissociates in water to produce sodium ions and hydroxide ions.</Text>
        <Text style={styles.explanation}>When a strong acid and a strong base are mixed in equal amounts, the reaction goes to completion to produce water and a salt. The pH of the resulting equation is 7.0.</Text>
        <Text style={styles.result}>Therefore, the pH of the equation containing 0.050 M hydrochloric acid and 0.050 M sodium hydroxide is 7.0.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>A equation contains 0.10 M ammonia (NH3) and 0.10 M ammonium chloride (NH4Cl). What is the pH of the equation?</Text>

        <Text style={styles.explanation}>Ammonia is a weak base with a pKb of 4.76. Ammonium chloride is a salt of a weak base and a strong acid, and it acts as a buffer to resist changes in pH.</Text>
        <Text style={styles.explanation}>The pH of the equation can be calculated using the Henderson-Hasselbalch equation:</Text>
        <Text style={styles.equation}>pH = 14.0 - pKb - log([B]/[BH+])</Text>
        <Text style={styles.explanation}>Where pKb is the base dissociation constant of the weak base, [B] is the concentration of the weak base, and [BH+] is the concentration of the conjugate acid.</Text>
        <Text style={styles.explanation}>In this case, the weak base is ammonia (NH3) and the conjugate acid is ammonium ion (NH4+). Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 14.0 - 4.76 - log(0.10/0.10) = 9.24</Text>
        <Text style={styles.result}>Therefore, the pH of the equation is 9.24.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>A equation contains 0.10 M acetic acid (CH3COOH) and 0.050 M sodium acetate (CH3COONa). What is the pH of the equation?</Text>

        <Text style={styles.explanation}>To calculate the pH of this equation, we can use the Henderson-Hasselbalch equation:</Text>
        <Text style={styles.explanation}></Text>
        <Text style={styles.equation}>pH = pKa + log([A-]/[HA])</Text>
        <Text style={styles.equation}></Text>
        <Text style={styles.explanation}>Where pKa is the acid dissociation constant of acetic acid (4.76), [A-] is the concentration of the conjugate base (acetate ion), and [HA] is the concentration of the weak acid (acetic acid).</Text>
        <Text style={styles.explanation}>Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 4.76 + log(0.050/0.10) = 4.41</Text>
        <Text style={styles.result}>Therefore, the pH of the equation is 4.41.</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>An equation contains 0.050 M hydrochloric acid (HCl) and 0.025 M sodium hydroxide (NaOH). What is the pH of the equation?</Text>

        <Text style={styles.explanation}>When a strong acid and a strong base are mixed in unequal amounts, the reaction goes to completion to produce water and a salt. The pH of the resulting equation depends on the relative amounts of acid and base that were mixed.</Text>
        <Text style={styles.explanation}>In this case, there is more hydrochloric acid than sodium hydroxide in the equation. Therefore, the equation will be acidic. To calculate the pH of the equation, we can use the following equation:</Text>
        <Text style={styles.equation}>pH = -log([H+])</Text>
        <Text style={styles.explanation}>Where [H+] is the concentration of hydrogen ions in the equation.</Text>
        <Text style={styles.explanation}>To calculate the concentration of hydrogen ions, we need to take into account the fact that some of the hydrochloric acid has reacted with the sodium hydroxide to produce water.</Text>
        <Text style={styles.explanation}>The following equation shows the equilibrium reaction between hydrochloric acid and sodium hydroxide:</Text>
        <Text style={styles.equation}>HCl + NaOH == NaCl + H2O</Text>
        <Text style={styles.explanation}>At equilibrium, the following equation holds:</Text>
        <Text style={styles.equation}>[H+][Cl-] = [OH-]</Text>
        <Text style={styles.explanation}>Where [Cl-] is the concentration of chloride ions and [OH-] is the concentration of hydroxide ions.</Text>
        <Text style={styles.explanation}>Since hydrochloric acid is a strong acid, it completely dissociates in water to produce hydrogen ions and chloride ions. Therefore, the concentration of chloride ions in the equation is equal to the concentration of hydrochloric acid (0.050 M).</Text>
        <Text style={styles.explanation}>The concentration of hydroxide ions in the equation is equal to the concentration of sodium hydroxide that has not reacted with the hydrochloric acid. To calculate this, we can use the following equation:</Text>
        <Text style={styles.equation}>[OH-] = [NaOH] - [H+]</Text>
        <Text style={styles.explanation}>Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>[OH-] = 0.025 M - [H+]</Text>
        <Text style={styles.explanation}>Substituting this into the equilibrium equation above, we get:</Text>
        <Text style={styles.calculation}>[H+][0.050 M] = [OH-] = 0.025 M - [H+]</Text>
        <Text style={styles.explanation}>Solving for [H+], we get:</Text>
        <Text style={styles.equation}>[H+] = 0.0125 M</Text>
        <Text style={styles.explanation}>Therefore, the pH of the equation is:</Text>
        <Text style={styles.result}>pH = -log(0.0125 M) = 1.90</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>A equation contains 0.10 M ammonia (NH3) and 0.050 M ammonium chloride (NH4Cl). What is the pH of the equation?</Text>
        <Text style={styles.explanation}>Ammonia is a weak base with a pKb of 4.76. Ammonium chloride is a salt of a weak base and a strong acid, and it acts as a buffer to resist changes in pH.</Text>
        <Text style={styles.explanation}>The pH of the equation can be calculated using the Henderson-Hasselbalch equation:</Text>
        <Text style={styles.equation}>pH = 14.0 - pKb - log([B]/[BH+])</Text>
        <Text style={styles.explanation}>Where pKb is the base dissociation constant of the weak base, [B] is the concentration of the weak base, and [BH+] is the concentration of the conjugate acid.</Text>
        <Text style={styles.explanation}>Substituting the known values into the equation, we get:</Text>
        <Text style={styles.calculation}>pH = 14.0 - 4.76 - log(0.10/0.050) = 9.24</Text>
        <Text style={styles.result}>Therefore, the pH of the equation is 9.24.</Text>
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
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 50
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
    marginBottom: 16,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF', // White Background
    borderRadius: 10,
    padding: 16,
    elevation: 5, // Add a slight shadow for depth
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 16,
    marginBottom: 8,
  },
  equation: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'green', // Example of styling a specific element
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  calculation: {
    fontSize: 18,
    color: 'blue', // Example of styling a specific element
  },
});

export default PhCalcScreen;
