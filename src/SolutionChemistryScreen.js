import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';

const SolutionChemistryScreen = () => {

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Solution Chemistry</Text>

      <View style={styles.problemContainer}>
        <Text style={styles.problemText}>
          Problem 1:
        </Text>
        <Text>
          A solution is prepared by dissolving 5.0 g of NaCl in 100.0 mL of water. Calculate the molarity of the solution.
        </Text>
        <Text style={styles.step}>
          {"\n"}First, calculate the number of moles of NaCl in the solution:
        </Text>
        <Text style={styles.step}>n = m / M</Text>
        <Text>n is the number of moles, m is the mass in grams,  M is the molar mass</Text>
        <Text>n = 5.0 g / 58.44 g/mol</Text>
        <Text>n = 0.0855 mol</Text>
        <Text style={styles.step}>M = n / V</Text>
        <Text>M is the molarity, n is the number of moles, V is the volume in liters</Text>
        <Text>M = 0.0855 mol / 0.1000 L</Text>
        <Text>M = 0.855 M</Text>
        <Text style={styles.result}>
          {"\n"}Therefore, the molarity of the solution is 0.855 M.
        </Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.problemText}>
          Problem 2:
        </Text>
        <Text>
          A 12.5 M solution of HCl is diluted to a volume of 500.0 mL with water. Calculate the molarity of the diluted solution.
        </Text>
        <Text style={styles.solution}>
          {"\n"}We can use the following equation to calculate the molarity of the diluted solution:
        </Text>
        <Text style={styles.step}>M1V1 = M2V2</Text>
        <Text>where</Text>
        <Text>M1 is the molarity of the original solution, V1 is the volume of the original solution, M2 is the molarity of the diluted solution, V2 is the volume of the diluted solution</Text>
        <Text>12.5 M * V1 = M2 * 500.0 mL</Text>
        <Text>V1 = (M2 * 500.0 mL) / 12.5 M</Text>
        <Text>We want to calculate the molarity of the diluted solution, so we can rearrange the equation to solve for M2:</Text>
        <Text>M2 = (V1 * 12.5 M) / 500.0 mL</Text>
        <Text>M2 = (1.000 L * 12.5 M) / 500.0 mL</Text>
        <Text>M2 = 2.50 M</Text>
        <Text style={styles.result}>
          {"\n"}Therefore, the molarity of the diluted solution is 2.50 M.
        </Text>
      </View>

    <View style= {styles.problemContainer}>
        <Text style={styles.problemText}>
          Problem 3:
        </Text>
        <Text>A solution contains 10.0% by mass of NaOH. Calculate the molarity of the solution.</Text>

        <Text>ρ = 1.00 g/mL (since the solution contains 10.0% NaOH by mass, we can assume that the density of the solution is approximately equal to the density of water)</Text>
        <Text>Next, calculate the number of moles of NaOH in 100.0 mL of solution:</Text>
        <Text style={styles.step} >n = (m / ρ) * (1 mol / 40.00 g)</Text>
        <Text>n = (10.0 g / 1.00 g/mL) * (1 mol / 40.00 g)</Text>
        <Text >n = 0.250 mol</Text>
        <Text >Finally, calculate the molarity of the solution:</Text>
        <Text style={styles.step} >M = n / V</Text>
        <Text>M = 0.250 mol / 0.1000 L</Text>
        <Text>M = 2.50 M</Text>
        <Text style={styles.result}>Therefore, the molarity of the solution is 2.50 M.</Text>

    </View>

    <View style={styles.problemContainer}>

        <Text style={styles.problemText}>
          Problem 4:
        </Text>
        <Text style={styles.solution}>Calculate the mass of NaCl needed to prepare 500.0 mL of a 1.00 M solution.</Text>

        <Text >First, calculate the number of moles of NaCl needed:</Text>
        <Text style={styles.step}>n = M * V</Text>
        <Text>where:  n is the number of moles, M is the molarity, V is the volume in liters</Text>
        <Text>n = 1.00 M * 0.5000 L</Text>
        <Text>n = 0.5000 mol</Text>
        <Text>Next, calculate the mass of NaCl needed: </Text>
        <Text style={styles.step}>m = n * M</Text>
        <Text>where:  m is the mass in grams, n is the number of moles, M is the molar mass</Text>
        <Text>m = 0.5000 mol * 58.44 g/mol</Text>
        <Text>m = 29.22 g</Text>
        <Text style={styles.result}>Therefore, 29.22 g of NaCl is needed to prepare 500.0 mL of a 1.00 M solution.</Text>

    </View>

    <View style={styles.problemContainer}>
    <Text style={styles.problemText}>
          Problem 5:
        </Text>
        <Text style={styles.questionText}>A solution contains 40.0% by mass of ethanol (C2H6O). Calculate the mole fraction of ethanol in the solution.</Text>

        <Text style={styles.solution}>First, calculate the mass of ethanol in 100.0 g of solution:</Text>
        <Text >m(ethanol) = 40.0 g solution * (40.0% / 100.0%)</Text>
        <Text >m(ethanol) = 16.0 g ethanol</Text>
        <Text >Next, calculate the mass of water in 100.0 g of solution:</Text>
        <Text >m(water) = 100.0 g solution - 16.0 g ethanol</Text>
        <Text >m(water) = 84.0 g water</Text>
        <Text >Now, calculate the mole fraction of ethanol:</Text>
        <Text style={styles.step}>X(ethanol) = n(ethanol) / (n(ethanol) + n(water))</Text>
        <Text >X(ethanol) = (16.0 g ethanol) / (16.0 g ethanol + 84.0 g water)</Text>
        <Text >X(ethanol) = 0.160</Text>
        <Text style={styles.result}>Therefore, the mole fraction of ethanol in the solution is 0.160.</Text>
    </View>

    <View style={styles.problemContainer} >
    <Text style={styles.problemText}>
          Problem 6:
        </Text>
        <Text style={styles.questionText}>Calculate the boiling point elevation of a 0.500 m solution of NaCl in water.</Text>

        <Text style={styles.solution}>The boiling point elevation of a solution is given by the following equation:</Text>
        <Text style={styles.step}>ΔTb = Kb * m</Text>
        <Text >where: ΔTb is the boiling point elevation in °C, Kb is the molal boiling point elevation constant of the solvent (water has a Kb of 0.512 °C/m), m is the molality of the solution</Text>
        <Text >The molality of the solution is calculated as follows:</Text>
        <Text style={styles.step}>m = n(solute) / kg(solvent)</Text>
        <Text >where:  m is the molality in mol/kg, n(solute) is the number of moles of solute, kg(solvent) is the mass of solvent in kilograms</Text>
        <Text>m = 0.500 mol NaCl / 1.00 kg water</Text>
        <Text>m = 0.500 m</Text>
        <Text>Now, we can calculate the boiling point elevation:</Text>
        <Text style={styles.step}>ΔTb = Kb * m</Text>
        <Text>ΔTb = 0.512 °C/m * 0.500 m</Text>
        <Text>ΔTb = 0.256 °C</Text>
        <Text style={styles.result}>Therefore, the boiling point elevation of the solution is 0.256 °C.</Text>
    </View>

    <View style={styles.problemContainer} >
    <Text style={styles.problemText}>
          Problem 7:
        </Text>
        <Text style={styles.questionText}>A 25.0 mL sample of a solution of NaOH is titrated with a 0.200 M solution of HCl. The endpoint is reached when 30.0 mL of HCl solution is added. Calculate the concentration of the NaOH solution.</Text>

        <Text>Solution:</Text>
        <Text style={styles.solution}>The following balanced chemical equation represents the reaction between NaOH and HCl:</Text>
        <Text style={styles.step} >NaOH + HCl == NaCl + H2O</Text>
        <Text>According to the equation, 1 mol of NaOH reacts with 1 mol of HCl. Therefore, the number of moles of NaOH in the 25.0 mL sample is equal to the number of moles of HCl added:</Text>
        <Text style={styles.solution}>n(NaOH) = n(HCl)</Text>
        <Text>n(NaOH) = (0.200 M HCl) * (0.0300 L HCl)</Text>
        <Text>n(NaOH) = 0.00600 mol NaOH</Text>
        <Text>Now, we can calculate the concentration of the NaOH solution:</Text>
        <Text>M(NaOH) = n(NaOH) / V(NaOH)</Text>
        <Text>M(NaOH) = 0.00600 mol NaOH / 0.0250 L NaOH</Text>
        <Text>M(NaOH) = 0.240 M</Text>
        <Text style={styles.result}>Therefore, the concentration of the NaOH solution is 0.240 M.</Text>
    </View>

    <View style={styles.problemContainer} >
    <Text style={styles.problemText}>
          Problem 8:
        </Text>
        <Text style={styles.questionText}>A solution contains 20.0% by mass of NaCl. Calculate the vapor pressure of the solution at 25 °C.</Text>

        <Text style={styles.solution}>The vapor pressure of a solution is lower than the vapor pressure of the pure solvent due to the presence of the solute. The amount of decrease in vapor pressure is given by Raoult's law:</Text>
        <Text style={styles.step} >ΔP = X(solute) * P°(solvent)</Text>
        <Text>where:  ΔP is the decrease in vapor pressure, X(solute) is the mole fraction of the solute, P°(solvent) is the vapor pressure of the pure solvent</Text>
        <Text>The mole fraction of the solute can be calculated as follows:</Text>
        <Text style={styles.step}>X(solute) = n(solute) / (n(solute) + n(solvent))</Text>
        <Text>The molality of the solution is 20.0% by mass, which means that there are 20.0 g of NaCl in 100.0 g of solution. The mass of water in the solution is therefore 80.0 g.</Text>
        <Text>n(NaCl) = (20.0 g NaCl) / (58.44 g/mol NaCl)</Text>
        <Text>n(NaCl) = 0.342 mol NaCl</Text>
        <Text>n(water) = (80.0 g water) / (18.02 g/mol water)</Text>
        <Text>n(water) = 4.44 mol water</Text>
        <Text> X(NaCl) = 0.342 mol NaCl / (0.342 mol NaCl + 4.44 mol water) </Text>
        <Text>X(NaCl) = 0.0723</Text>
        <Text>The vapor pressure of pure water at 25 °C is 23.76 mmHg. Therefore, the vapor pressure of the solution is:</Text>
        <Text style={styles.step}>ΔP = X(solute) * P°(solvent)</Text>
        <Text>ΔP = (0.0723) * (23.76 mmHg)</Text>
        <Text> ΔP = 1.72 mmHg</Text>
        <Text style={styles.step}>P(solution) = P°(solvent) - ΔP</Text>
        <Text>P(solution) = 23.76 mmHg - 1.72 mmHg</Text>
        <Text>P(solution) = 22.04 mmHg</Text>
        <Text style={styles.result}>Therefore, the vapor pressure of the solution is 22.04 mmHg.</Text>

    </View>

    <View style={styles.problemContainer}>
    <Text style={styles.problemText}>
          Problem 9:
        </Text>
        <Text style={styles.questionText}>How many grams of NaOH are required to make 500 mL of a 0.1 M solution?</Text>

        <Text style={styles.solution}>To make 500 mL of a 0.1 M solution of NaOH, you will need 2.0 grams of NaOH.</Text>
        <Text>To calculate this, you can use the following formula:</Text>
        <Text style={styles.step}> M = n / V</Text>
        <Text>where:  M is the molarity of the solution (in mol/L), n is the number of moles of solute (in mol), V is the volume of the solution (in L)</Text>
        <Text>We know that we want to make a 0.1 M solution of NaOH, so M = 0.1. We also know that the volume of the solution we want to make is 500 mL, so V = 0.5.</Text>
        <Text>We can now rearrange the formula to solve for n:</Text>
        <Text style={styles.step}>n = M * V</Text>
        <Text>n = 0.1 * 0.5</Text>
        <Text>n = 0.05</Text>
        <Text>This means that we need 0.05 moles of NaOH to make our solution. We can then use the molar mass of NaOH (40.00 g/mol) to calculate the mass of NaOH needed:</Text>
        <Text style={styles.step}>mass = moles * molar mass</Text>
        <Text>mass = 0.05 * 40.00</Text>
        <Text>mass = 2.0 grams</Text>
        <Text style={styles.result}>Therefore, you will need 2.0 grams of NaOH to make 500 mL of a 0.1 M solution of NaOH.</Text>
    </View>

    <View style={styles.problemContainer} >
    <Text style={styles.problemText}>
          Problem 10:
        </Text>
        <Text style={styles.questionText}>Calculate the freezing point depression of a 1.00 M solution of C2H6O in water.</Text>

        <Text style={styles.solution}>To calculate the freezing point depression of a 1.00 M solution of C2H6O in water, we can use the following equation:</Text>
        <Text style={styles.step} >ΔTf = Kf * m</Text>
        <Text>where:  ΔTf is the freezing point depression in °C, Kf is the molal freezing point depression constant of the solvent (water has a Kf of 1.86 °C/m), m is the molality of the solution</Text>
        <Text>The molality of the solution is calculated as follows:</Text>
        <Text style={styles.step}>m = n(solute) / kg(solvent)</Text>
        <Text>where: m is the molality in mol/kg, n(solute) is the number of moles of solute, kg(solvent) is the mass of solvent in kilograms</Text>
        <Text>We know that the molarity of the solution is 1.00 M, which means that there are 1.00 moles of C2H6O in 1 liter of solution. The mass of 1 liter of water is 1 kilogram. Therefore, the molality of the solution is:</Text>
        <Text>m = 1.00 mol C2H6O / 1 kg water</Text>
        <Text>m = 1.00 m</Text>
        <Text>Now, we can calculate the freezing point depression:</Text>
        <Text style={styles.step}>ΔTf = Kf * m</Text>
        <Text>ΔTf = 1.86 °C/m * 1.00 m</Text>
        <Text>ΔTf = 1.86 °C</Text>
        <Text style={styles.result}>Therefore, the freezing point depression of a 1.00 M solution of C2H6O in water is 1.86 °C.</Text>
    </View>

    <View style={styles.problemContainer}>
        <Text style={styles.problemText}>
          Problem 11:
        </Text>
        <Text style={styles.questionText}>A 2 M solution of acetic acid (CH₃COOH) has a density of 1.04 g/mL. What is the molar mass of acetic acid?</Text>

        <Text style={styles.solution}>To calculate the molar mass of acetic acid (CH3COOH) from the given information, we can use the following steps:</Text>
        <Text >Calculate the mass of acetic acid in 1 liter of solution.</Text>
        <Text>mass of acetic acid = 2 M * 60.05 g/mol * 1 L = 120.1 g</Text>
        <Text>Calculate the volume of 1 liter of solution in milliliters.</Text>
        <Text>volume of solution = 1 L * 1000 mL/L = 1000 mL</Text>
        <Text>Calculate the density of acetic acid in grams per milliliter.</Text>
        <Text>density of acetic acid = 120.1 g / 1000 mL = 0.1201 g/mL</Text>
        <Text>Calculate the molar mass of acetic acid.</Text>
        <Text>molar mass of acetic acid = density of acetic acid / (1 g/mol / 1 mL/mol)</Text>
        <Text>molar mass of acetic acid = 0.1201 g/mL * 1 mol / 1 g * 1 mL = 60.05 g/mol</Text>
        <Text style={styles.result}>Therefore, the molar mass of acetic acid is 60.05 g/mol.</Text>
    </View>

    <View style={styles.problemContainer} >
    <Text style={styles.problemText}>
          Problem 12:
        </Text>
        <Text style={styles.questionText}>Calculate the mass of glucose (C₆H₁₂O₆) needed to prepare 250 mL of a 0.5 M solution.</Text>
      

        <Text style={styles.solution}>To calculate the mass of glucose (C₆H₁₂O₆) needed to prepare 250 mL of a 0.5 M solution, we can use the following steps:</Text>
        <Text>Calculate the number of moles of glucose needed.</Text>
        <Text style={styles.step} >moles of glucose = molarity of solution * volume of solution</Text>
        <Text>moles of glucose = 0.5 M * 0.250 L</Text>
        <Text>moles of glucose = 0.125 mol</Text>
        <Text>Calculate the mass of glucose needed.</Text>
        <Text style={styles.step}>mass of glucose = moles of glucose * molar mass of glucose</Text>
        <Text>mass of glucose = 0.125 mol * 180.16 g/mol</Text>
        <Text>mass of glucose = 22.52 g</Text>
        <Text style={styles.result}>Therefore, you will need 22.52 grams of glucose to prepare 250 mL of a 0.5 M solution.</Text>
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
    backgroundColor: '#FFFBF2', // Cream Background
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
    color: '#FF8C00', // Bright Orange
  },
  problemContainer: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF', // White Background
    borderRadius: 10,
    padding: 16,
    elevation: 4, // Add a slight shadow for depth
    shadowOffset: { width: 2, height: 2 },
  },
  problemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FF8C00', // Bright Orange
  },
  step: {
    fontSize: 16,
    fontWeight: "medium",
    margin: 7,
    color: '#FF6347', // Tomato Red
  },
  solution: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#32CD32', // Lime Green
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E7ECE', // Blue Color
  },
});

export default SolutionChemistryScreen;
