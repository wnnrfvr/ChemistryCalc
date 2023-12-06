import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';

const ElectrolysisCalculations = () => {
  

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Electrolysis Calculations</Text>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>
          How much copper gets plated at the cathode when using 1.0 A current for 30 minutes in a copper sulfate solution? (Faraday constant: 96500 C/mol)
        </Text>
      
        <Text style={styles.subHeader}>Calculate the Total Charge (Q)</Text>
        <Text style={styles.formula}>Q = I * t</Text>
        <Text>Q = 1.0 A * 30 minutes * 60 seconds/minute</Text>
        <Text>Q = 1800 C</Text>
        
        <Text style={styles.subHeader}>Find the Moles of Electrons (n)</Text>
        <Text style={styles.formula}>n = Q / F</Text>
        <Text>n = 1800 C / 96500 C/mol</Text>
        <Text>n = 0.0186 mol</Text>
        
        <Text style={styles.subHeader}>Determine the Mass of Deposited Copper</Text>
        <Text>The half-reaction for copper deposition is:</Text>
        <Text>Cu²⁺ + 2e⁻ == Cu</Text>
        <Text>This means that 2 moles of electrons are needed to deposit 1 mole of copper.</Text>
        <Text>mass of copper = 0.0186 mol * (63.55 g/mol)</Text>
        <Text>mass of copper = 1.15 g</Text>
        <Text style={styles.answr}>So, about 1.15 grams of copper will be deposited at the cathode.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What volume of hydrogen gas is produced at the cathode during the electrolysis of water using a current of 2.0 A for 1 hour, if the molar volume of a gas at room temperature and pressure is 24 dm³/mol?</Text>
      
        <Text style= {styles.subHeader}>Calculate the quantity of electricity</Text>
        <Text style={styles.formula}>Q = I * t</Text>
        <Text>Q = 2.0 A * 1 hour * 60 seconds/minute</Text>
        <Text>Q = 7200 C</Text>
        <Text style = {styles.subHeader}>Calculate the number of moles of electrons transferred</Text>
        <Text style={styles.formula}>n = Q / F</Text>
        <Text>n = 7200 C / 96500 C/mol</Text>
        <Text>n = 0.0748 mol</Text>
        <Text style = {styles.subHeader}>Calculate the volume of hydrogen gas produced</Text>
        <Text>The half-reaction for the production of hydrogen gas at the cathode is:</Text>
        <Text>2H⁺ + 2e⁻ == H₂</Text>
        <Text>This means that 2 moles of electrons are required to produce 1 mole of hydrogen gas.</Text>
        <Text>volume of hydrogen gas = 0.0748 mol * (24 dm³/mol)</Text>
        <Text>volume of hydrogen gas = 1.80 dm³</Text>
        <Text style={styles.answr}>Therefore, the volume of hydrogen gas produced at the cathode is 1.80 dm³.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What quantity of electricity is required to produce 10.0 g of chlorine gas during the electrolysis of molten sodium chloride?</Text>
      
        <Text style = {styles.subHeader}>Calculate the number of moles of chlorine gas produced</Text>
        <Text style={styles.formula}>n = mass / molar mass</Text>
        <Text>n = 10.0 g / 70.90 g/mol</Text>
        <Text>n = 0.141 mol</Text>
        <Text style = {styles.subHeader}>Calculate the quantity of electricity required</Text>
        <Text>The half-reaction for the production of chlorine gas at the anode is:</Text>
        <Text style={styles.formula}>2Cl⁻ == Cl₂ + 2e⁻</Text>
        <Text>This means that 2 moles of electrons are required to produce 1 mole of chlorine gas.</Text>
        <Text style={styles.formula}>Q = n * F</Text>
        <Text>Q = 0.141 mol * 96500 C/mol</Text>
        <Text>Q = 13500 C</Text>
        <Text style={styles.answr}>Therefore, the quantity of electricity required to produce 10.0 g of chlorine gas is 13500 C.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>How many grams of chlorine gas can be obtained by the electrolysis of 4 L of 0.7 M NaCl solution? (Molar mass of Cl₂ = 70.90 g/mol)</Text>

        <Text style= {styles.subHeader}>Calculate the number of moles of NaCl in the solution:</Text>
        <Text style={styles.formula}>Moles of NaCl = volume of solution (L) * molarity of solution (M)</Text>
        <Text>Moles of NaCl = 4 L * 0.7 M</Text>
        <Text>Moles of NaCl = 2.8 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of chlorine gas that can be produced from the NaCl solution:</Text>
        <Text>Moles of Cl₂ = moles of NaCl / 2</Text>
        <Text>Moles of Cl₂ = 2.8 mol / 2</Text>
        <Text>Moles of Cl₂ = 1.4 mol</Text>
        <Text style={styles.subHeader}>Calculate the mass of chlorine gas that can be produced:</Text>
        <Text>Mass of Cl₂ = moles of Cl₂ * molar mass of Cl₂</Text>
        <Text>Mass of Cl₂ = 1.4 mol * 70.90 g/mol</Text>
        <Text>Mass of Cl₂ = 99.26 g</Text>
        <Text style={styles.answr}>Therefore, 99.26 grams of chlorine gas can be obtained by the electrolysis of 4 L of 0.7 M NaCl solution.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What mass of copper can be obtained by passing 1.5 A of current through a CuSO4 solution for 4 hours? (Molar mass of Cu = 63.55 g/mol)</Text>
      
        <Text>To calculate the mass of copper that can be obtained by passing 1.5 A of current through a CuSO4 solution for 4 hours, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the quantity of electricity that passes through the solution:</Text>
        <Text style={styles.formula}>Quantity of electricity = current (A) * time (s)</Text>
        <Text>Quantity of electricity = 1.5 A * 4 hours * 60 minutes/hour * 60 seconds/minute</Text>
        <Text>Quantity of electricity = 21600 C</Text>
        <Text style= {styles.subHeader}>Calculate the number of moles of electrons that are transferred:</Text>
        <Text style={styles.formula}>Moles of electrons = quantity of electricity / Faraday constant</Text>
        <Text>Moles of electrons = 21600 C / 96500 C/mol</Text>
        <Text>Moles of electrons = 0.224 mol</Text>
        <Text style={styles.subHeader}>Calculate the mass of copper that can be deposited:</Text>
        <Text style={styles.formula}>Mass of copper = moles of electrons * molar mass of copper</Text>
        <Text>Mass of copper = 0.224 mol * 63.55 g/mol</Text>
        <Text>Mass of copper = 14.20 g</Text>
        <Text style={styles.answr}>Therefore, 14.20 grams of copper can be obtained by passing 1.5 A of current through a CuSO4 solution for 4 hours.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What is the minimum current needed to produce 25 g of aluminum from Al2O3 in 10 hours? (Molar mass of Al = 26.98 g/mol)</Text>
      
        <Text>To calculate the minimum current needed to produce 25 g of aluminum from Al2O3 in 10 hours, we can use the following method</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of aluminum that need to be produced:</Text>
        <Text style={styles.formula}>Moles of aluminum = mass of aluminum / molar mass of aluminum</Text>
        <Text>Moles of aluminum = 25 g / 26.98 g/mol</Text>
        <Text>Moles of aluminum = 0.927 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of electrons that need to be transferred to produce the aluminum:</Text>
        <Text>Moles of electrons = moles of aluminum * 3</Text>
        <Text>Moles of electrons = 0.927 mol * 3</Text>
        <Text>Moles of electrons = 2.78 mol</Text>
        <Text style={styles.subHeader}>Calculate the minimum current needed:</Text>
        <Text style={styles.formula}>Current = moles of electrons * Faraday constant / time</Text>
        <Text>Current = 2.78 mol * 96500 C/mol / 10 hours * 60 minutes/hour * 60 seconds/minute</Text>
        <Text>Current = 1.57 A</Text>
        <Text style={styles.answr}>Therefore, the minimum current needed to produce 25 g of aluminum from Al2O3 in 10 hours is 1.57 A.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>If 0.7 grams of silver is deposited by passing a current through AgNO3 solution, how long was the current applied? (Molar mass of Ag = 107.87 g/mol)</Text>
      
        <Text>To calculate the time required to deposit 0.7 grams of silver from AgNO3 solution using a current of 1.5 A, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of silver deposited:</Text>
        <Text style={styles.formula}>Moles of silver = mass of silver / molar mass of silver</Text>
        <Text>Moles of silver = 0.7 g / 107.87 g/mol</Text>
        <Text>Moles of silver = 0.0065 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of electrons transferred:</Text>
        <Text style={styles.formula}>Moles of electrons = moles of silver * 1</Text>
        <Text>Moles of electrons = 0.0065 mol</Text>
        <Text style={styles.subHeader}>Calculate the time required:</Text>
        <Text style={styles.formula}>Time = moles of electrons * Faraday constant / current</Text>
        <Text>Time = 0.0065 mol * 96500 C/mol / 1.5 A</Text>
        <Text>Time = 417.47 seconds</Text>
        <Text style={styles.answr}>Therefore, the current was applied for 417.47 seconds, or 6 minutes and 57 seconds.</Text>
        <Text>Note: The Faraday constant is the amount of electric charge that must pass through an electrolytic cell to produce one mole of a substance. It is equal to 96500 coulombs per mole.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>How many grams of chlorine gas can be obtained by the electrolysis of 3 L of 0.8 M NaCl solution? (Molar mass of Cl₂ = 70.90 g/mol)</Text>
      
        <Text>To calculate the amount of chlorine gas that can be obtained by the electrolysis of 3 L of 0.8 M NaCl solution, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of NaCl in the solution:</Text>
        <Text style={styles.formula}>Moles of NaCl = volume of solution (L) * molarity of solution (M)</Text>
        <Text>Moles of NaCl = 3 L * 0.8 M</Text>
        <Text>Moles of NaCl = 2.4 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of chlorine gas that can be produced from the NaCl solution:</Text>
        <Text>Moles of Cl₂ = moles of NaCl / 2</Text>
        <Text>Moles of Cl₂ = 2.4 mol / 2</Text>
        <Text>Moles of Cl₂ = 1.2 mol</Text>
        <Text style={styles.subHeader}>Calculate the mass of chlorine gas that can be produced:</Text>
        <Text style={styles.formula}>Mass of Cl₂ = moles of Cl₂ * molar mass of Cl₂</Text>
        <Text>Mass of Cl₂ = 1.2 mol * 70.90 g/mol</Text>
        <Text>Mass of Cl₂ = 85.08 g</Text>
        <Text style={styles.answr}>Therefore, 85.08 grams of chlorine gas can be obtained by the electrolysis of 3 L of 0.8 M NaCl solution.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What mass of copper can be obtained by passing 2 A of current through a CuSO4 solution for 5 hours? (Molar mass of Cu = 63.55 g/mol)</Text>
      
        <Text>To calculate the mass of copper that can be obtained by passing 2 A of current through a CuSO4 solution for 5 hours, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the quantity of electricity that passes through the solution:</Text>
        <Text style={styles.formula}>Quantity of electricity = current (A) * time (s)</Text>
        <Text>Quantity of electricity = 2 A * 5 hours * 60 minutes/hour * 60 seconds/minute</Text>
        <Text>Quantity of electricity = 36000 C</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of electrons that are transferred:</Text>
        <Text style={styles.formula}>Moles of electrons = quantity of electricity / Faraday constant</Text>
        <Text>Moles of electrons = 36000 C / 96500 C/mol</Text>
        <Text>Moles of electrons = 0.374 mol</Text>
        <Text style={styles.subHeader}>Calculate the mass of copper that can be deposited:</Text>
        <Text style={styles.formula}>Mass of copper = moles of electrons * molar mass of copper</Text>
        <Text>Mass of copper = 0.374 mol * 63.55 g/mol</Text>
        <Text>Mass of copper = 23.78 g</Text>
        <Text style={styles.answr}>Therefore, 23.78 grams of copper can be obtained by passing 2 A of current through a CuSO4 solution for 5 hours.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What is the minimum current needed to produce 15 g of aluminum from Al2O3 in 8 hours? (Molar mass of Al = 26.98 g/mol)</Text>
      
        <Text>To calculate the minimum current needed to produce 15 g of aluminum from Al2O3 in 8 hours, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of aluminum that need to be produced:</Text>
        <Text style={styles.formula}>Moles of aluminum = mass of aluminum / molar mass of aluminum</Text>
        <Text>Moles of aluminum = 15 g / 26.98 g/mol</Text>
        <Text>Moles of aluminum = 0.556 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of electrons that need to be transferred to produce the aluminum:</Text>
        <Text style={styles.formula}>Moles of electrons = moles of aluminum * 3</Text>
        <Text>Moles of electrons = 0.556 mol * 3</Text>
        <Text>Moles of electrons = 1.668 mol</Text>
        <Text style={styles.subHeader}>Calculate the minimum current needed:</Text>
        <Text style={styles.formula}>Current = moles of electrons * Faraday constant / time</Text>
        <Text>Current = 1.668 mol * 96500 C/mol / 8 hours * 60 minutes/hour * 60 seconds/minute</Text>
        <Text>Current = 1.33 A</Text>
        <Text style={styles.answr}>Therefore, the minimum current needed to produce 15 g of aluminum from Al2O3 in 8 hours is 1.33 A.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>If 0.5 grams of silver is deposited by passing a current through AgNO3 solution, how long was the current applied? (Molar mass of Ag = 107.87 g/mol)</Text>
      
        <Text>To calculate the time required to deposit 0.5 grams of silver from AgNO3 solution using a current of 1.5 A, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of silver deposited:</Text>
        <Text style={styles.formula}>Moles of silver = mass of silver / molar mass of silver</Text>
        <Text>Moles of silver = 0.5 g / 107.87 g/mol</Text>
        <Text>Moles of silver = 0.0046 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of electrons transferred:</Text>
        <Text style={styles.formula}>Moles of electrons = moles of silver * 1</Text>
        <Text>Moles of electrons = 0.0046 mol</Text>
        <Text style={styles.subHeader}>Calculate the time required:</Text>
        <Text style={styles.formula}>Time = moles of electrons * Faraday constant / current</Text>
        <Text>Time = 0.0046 mol * 96500 C/mol / 1.5 A</Text>
        <Text>Time = 298.19 seconds</Text>
        <Text style={styles.answr}>Therefore, the current was applied for 298.19 seconds, or 4 minutes and 58 seconds.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>How many grams of chlorine gas can be obtained by the electrolysis of 1.5 L of 2 M NaCl solution? (Molar mass of Cl₂ = 70.90 g/mol)</Text>
      
        <Text>To calculate the number of grams of chlorine gas that can be obtained by the electrolysis of 1.5 L of 2 M NaCl solution, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of NaCl in the solution:</Text>
        <Text style={styles.formula}>Moles of NaCl = volume of solution (L) * molarity of solution (M)</Text>
        <Text>Moles of NaCl = 1.5 L * 2 M = 3.0 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of chlorine gas that can be produced from the NaCl solution:</Text>
        <Text>Moles of Cl₂ = moles of NaCl / 2</Text>
        <Text>Moles of Cl₂ = 3.0 mol / 2 = 1.5 mol</Text>
        <Text style={styles.subHeader}>Calculate the mass of chlorine gas that can be produced:</Text>
        <Text style={styles.formula}>Mass of Cl₂ = moles of Cl₂ * molar mass of Cl₂</Text>
        <Text>Mass of Cl₂ = 1.5 mol * 70.90 g/mol = 106.35 g</Text>
        <Text style={styles.answr}>Therefore, 106.35 grams of chlorine gas can be obtained by the electrolysis of 1.5 L of 2 M NaCl solution.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What mass of copper can be obtained by passing 3 A of current through a CuSO4 solution for 2 hours? (Molar mass of Cu = 63.55 g/mol)</Text>
      
        <Text>To calculate the mass of copper that can be obtained by passing 3 A of current through a CuSO4 solution for 2 hours, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the quantity of electricity that passes through the solution:</Text>
        <Text style={styles.formula}>Quantity of electricity = current (A) * time (s)</Text>
        <Text>Quantity of electricity = 3 A * 2 hours * 60 minutes/hour * 60 seconds/minute</Text>
        <Text>Quantity of electricity = 21600 C</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of electrons that are transferred:</Text>
        <Text style={styles.formula}>Moles of electrons = quantity of electricity / Faraday constant</Text>
        <Text>Moles of electrons = 21600 C / 96500 C/mol</Text>
        <Text>Moles of electrons = 0.224 mol</Text>
        <Text style={styles.subHeader}>Calculate the mass of copper that can be deposited:</Text>
        <Text style={styles.formula}>Mass of copper = moles of electrons * molar mass of copper</Text>
        <Text>Mass of copper = 0.224 mol * 63.55 g/mol</Text>
        <Text>Mass of copper = 14.22 g</Text>
        <Text style={styles.answr}>Therefore, 14.22 grams of copper can be obtained by passing 3 A of current through a CuSO4 solution for 2 hours.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What is the minimum current needed to produce 20 g of aluminum from Al2O3 in 4 hours? (Molar mass of Al = 26.98 g/mol)</Text>
      
        <Text>To calculate the minimum current needed to produce 20 g of aluminum from Al2O3 in 4 hours, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of aluminum that need to be produced:</Text>
        <Text style={styles.formula}>Moles of aluminum = mass of aluminum / molar mass of aluminum</Text>
        <Text>Moles of aluminum = 20 g / 26.98 g/mol</Text>
        <Text>Moles of aluminum = 0.741 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of electrons that need to be transferred to produce the aluminum:</Text>
        <Text style={styles.formula}>Moles of electrons = moles of aluminum * 3</Text>
        <Text>Moles of electrons = 0.741 mol * 3</Text>
        <Text>Moles of electrons = 2.22 mol</Text>
        <Text style={styles.subHeader}>Calculate the minimum current needed:</Text>
        <Text style={styles.formula}>Current = moles of electrons * Faraday constant / time</Text>
        <Text>Current = 2.22 mol * 96500 C/mol / 4 hours * 60 minutes/hour * 60 seconds/minute</Text>
        <Text>Current = 15.0 A</Text>
        <Text style={styles.answr}>Therefore, the minimum current needed to produce 20 g of aluminum from Al2O3 in 4 hours is 15.0 A.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>If 0.6 grams of silver is deposited by passing a current through AgNO3 solution, how long was the current applied? (Molar mass of Ag = 107.87 g/mol)</Text>

        <Text>To calculate the time required to deposit 0.6 grams of silver from AgNO3 solution using a current of 1.5 A, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of silver deposited:</Text>
        <Text style={styles.formula}>Moles of silver = mass of silver / molar mass of silver</Text>
        <Text>Moles of silver = 0.6 g / 107.87 g/mol</Text>
        <Text>Moles of silver = 0.0056 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of electrons transferred:</Text>
        <Text>Moles of electrons = moles of silver * 1</Text>
        <Text>Moles of electrons = 0.0056 mol</Text>
        <Text style={styles.subHeader}>Calculate the time required:</Text>
        <Text style={styles.formula}>Time = moles of electrons * Faraday constant / current</Text>
        <Text>Time = 0.0056 mol * 96500 C/mol / 1.5 A</Text>
        <Text>Time = 353.83 seconds</Text>
        <Text style={styles.answr}>Therefore, the current was applied for 353.83 seconds, or 5 minutes and 54 seconds.</Text>
      </View>

      <View style={styles.problemContainer}>
        <Text style={styles.question}>How many grams of chlorine gas can be obtained by the electrolysis of 2 L of 0.5 M NaCl solution? (Molar mass of Cl₂ = 70.90 g/mol)</Text>

        <Text>To calculate the number of grams of chlorine gas that can be obtained by the electrolysis of 2 L of 0.5 M NaCl solution, we can use the following steps:</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of NaCl in the solution:</Text>
        <Text style={styles.formula}>Moles of NaCl = volume of solution (L) * molarity of solution (M)</Text>
        <Text>Moles of NaCl = 2 L * 0.5 M = 1.0 mol</Text>
        <Text style={styles.subHeader}>Calculate the number of moles of chlorine gas that can be produced from the NaCl solution:</Text>
        <Text style={styles.formula}>Moles of Cl₂ = moles of NaCl / 2</Text>
        <Text>Moles of Cl₂ = 1.0 mol / 2 = 0.50 mol</Text>
        <Text style={styles.subHeader}>Calculate the mass of chlorine gas that can be produced:</Text>
        <Text style={styles.formula}>Mass of Cl₂ = moles of Cl₂ * molar mass of Cl₂</Text>
        <Text>Mass of Cl₂ = 0.50 mol * 70.90 g/mol = 35.45 g</Text>
        <Text>Therefore, 35.45 grams of chlorine gas can be obtained by the electrolysis of 2 L of 0.5 M NaCl solution.</Text>
      </View>


      <Text style={styles.header}>Try It</Text>
      <View style={styles.problemContainer}>
        <Text style={styles.question}>Calculate the amount of hydrogen gas produced when 1.5 moles of water undergo electrolysis.</Text>
        <Text>1.5 moles of water produce 1.5 moles of hydrogen gas.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>A current of 2.5 A is passed through a solution of copper sulfate for 2 hours. Calculate the mass of copper deposited. (Molar mass of Cu = 63.55 g/mol)</Text>
        <Text>Approximately 11.8 grams of copper are deposited.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What mass of aluminum can be extracted from Al2O3 using 1200 C of charge in molten aluminum oxide? (Molar mass of Al = 26.98 g/mol)</Text>
        <Text>Approximately 0.168 grams of aluminum can be extracted.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>How many grams of chlorine gas will be produced by the electrolysis of 500 mL of 1 M NaCl solution? (Molar mass of Cl₂ = 70.90 g/mol)</Text>
        <Text>Approximately 17.725 grams of chlorine gas will be produced.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>If 0.8 grams of silver is deposited by passing a current through AgNO3 solution, how long was the current applied? (Molar mass of Ag = 107.87 g/mol)</Text>
        <Text>The current was applied for approximately 11.89 minutes.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What is the minimum current needed to produce 10 g of aluminum from Al2O3 in 6 hours? (Molar mass of Al = 26.98 g/mol)</Text>
        <Text>A current of approximately 6.57 x 10^-5 A is needed.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What mass of copper can be obtained by passing 2.5 A of current through a CuSO4 solution for 3 hours? (Molar mass of Cu = 63.55 g/mol)</Text>
        <Text>Approximately 17.8 grams of copper can be obtained.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>How many grams of chlorine gas can be obtained by the electrolysis of 2 L of 0.5 M NaCl solution? (Molar mass of Cl₂ = 70.90 g/mol)</Text>
        <Text>Approximately 35.45 grams of chlorine gas can be obtained.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>If 0.6 grams of silver is deposited by passing a current through AgNO3 solution, how long was the current applied? (Molar mass of Ag = 107.87 g/mol)</Text>
        <Text>The current was applied for approximately 9.02 minutes.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What is the minimum current needed to produce 20 g of aluminum from Al2O3 in 4 hours? (Molar mass of Al = 26.98 g/mol)</Text>
        <Text>A current of approximately 2.73 x 10^-4 A is needed.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What mass of copper can be obtained by passing 3 A of current through a CuSO4 solution for 2 hours? (Molar mass of Cu = 63.55 g/mol)</Text>
        <Text>Approximately 14.2 grams of copper can be obtained.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>How many grams of chlorine gas can be obtained by the electrolysis of 1.5 L of 2 M NaCl solution? (Molar mass of Cl₂ = 70.90 g/mol)</Text>
        <Text>Approximately 106.35 grams of chlorine gas can be obtained.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>If 0.5 grams of silver is deposited by passing a current through AgNO3 solution, how long was the current applied? (Molar mass of Ag = 107.87 g/mol)</Text>
        <Text>The current was applied for approximately 7.39 minutes.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What is the minimum current needed to produce 15 g of aluminum from Al2O3 in 8 hours? (Molar mass of Al = 26.98 g/mol)</Text>
        <Text>A current of approximately 8.14 x 10^-5 A is needed.</Text>
      </View >

      <View style={styles.problemContainer}>
        <Text style={styles.question}>What mass of copper can be obtained by passing 1.5 A of current through a CuSO4 solution for 4 hours? (Molar mass of Cu = 63.55 g/mol)</Text>
        <Text>Approximately 14.2 grams of copper can be obtained.</Text>
      </View >


      

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
    marginBottom: 50,
  },
  adContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4E7ECE', // Attractive Blue Color
  },
  problemContainer: {
    marginBottom: 24,
    backgroundColor: '#F2F2F2', // Light Gray Background
    padding: 10,
    borderRadius: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4E7ECE', // Attractive Blue Color
  },
  formula: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#32CD32', // Lime Green
  },
  problemContainer: {
    backgroundColor: '#FFFFFF', // White Background
    borderRadius: 10,
    padding: 16,
    elevation: 3, // Add a slight shadow for depth
    marginBottom: 20,
  },
  answr: {
    fontSize: 22,
    marginBottom: 8,
    color: '#FF6317', // Tomato Red
    fontStyle: 'italic',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
  

export default ElectrolysisCalculations;
