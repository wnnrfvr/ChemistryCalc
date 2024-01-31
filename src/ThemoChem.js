import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';


const ThermoChemistry = () => {

  return (
    <>
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the change in internal energy for the following reaction:</Text>
        <Text style={styles.chemicalEquation}> H2(g) + O2(g) == H2O(g)</Text>
        <Text style={styles.questionText}>ΔH for this reaction is -242 kJ/mol.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The change in internal energy for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔU = ΔH - TΔS</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔU is the change in internal energy (kJ/mol)</Text>
        <Text style={styles.solution} >ΔH is the change in enthalpy (kJ/mol)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >ΔS is the change in entropy (J/mol·K)</Text>
        <Text style={styles.solution} >Since we are not given the temperature or the change in entropy, we cannot calculate the change in internal energy exactly. However, we can make some assumptions to get an estimate.</Text>
        <Text style={styles.solution} >Assuming that the reaction takes place at standard temperature and pressure (STP), we can use the following values for the heat capacity of each gas:</Text>
        <Text style={styles.formula} >H2(g): 28.84 J/mol·K, O2(g): 29.37 J/mol·K, H2O(g): 33.58 J/mol·K</Text>
        <Text style={styles.solution} >We can then use the following equation to calculate the approximate change in entropy for the reaction:</Text>
        <Text style={styles.formula} >ΔS = ΣnΔS°products - ΣnΔS°reactants</Text>
        <Text style={styles.solution} >where:    ΔS is the change in entropy (J/mol·K), n is the number of moles of each gas, ΔS° is the standard entropy of each gas (J/mol·K)</Text>
        <Text style={styles.solution} >Substituting in the values for the heat capacities and the standard entropies, we get the following equation:</Text>
        <Text style={styles.formula} >ΔS = (1 mol)(188.7 J/mol·K) - (1 mol)(205.0 J/mol·K) - (1 mol)(130.7 J/mol·K) = -16.0 J/mol·K</Text>
        <Text style={styles.solution} >Now that we have an estimate for the change in entropy, we can plug it into the equation for the change in internal energy:</Text>
        <Text style={styles.formula} >ΔU = ΔH - TΔS = -242 kJ/mol - (298 K)(-16.0 J/mol·K) = -236 kJ/mol</Text>
        <Text style={styles.explanation} >Therefore, the approximate change in internal energy for the reaction is -236 kJ/mol.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the work done by the system when 1 mole of an ideal gas expands isothermally from a volume of 1 L to a volume of 2 L at a temperature of 298 K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The work done by an ideal gas expanding isothermally can be calculated using the following equation:</Text>
        <Text style={styles.formula} >w = -nRTln(Vf/Vi)</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >w is the work done (J)</Text>
        <Text style={styles.solution} >n is the number of moles of gas (mol)</Text>
        <Text style={styles.solution} >R is the ideal gas constant (8.314 J/mol·K)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >Vf is the final volume (L)</Text>
        <Text style={styles.solution} >Vi is the initial volume (L)</Text>
        <Text style={styles.solution} >Substituting in the values for n, R, T, Vf, and Vi, we get the following equation:</Text>
        <Text style={styles.formula} >w = -(1 mol)(8.314 J/mol·K)(298 K)ln(2 L/1 L) = -5145 J</Text>
        <Text style={styles.explanation} >Therefore, the work done by the system is -5145 J.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the entropy change of the universe for the following reaction:</Text>
        <Text style={styles.chemicalEquation}> N2(g) + 3H2(g) == 2NH3(g)</Text>
        <Text style={styles.questionText}>ΔS for this reaction is -40.7 J/mol·K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The entropy change of the universe for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔSuniv = ΔSreaction</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔSuniv is the entropy change of the universe (J/mol·K)</Text>
        <Text style={styles.solution} >ΔSreaction is the change in entropy for the reaction (J/mol·K)</Text>
        <Text style={styles.explanation} >Since the change in entropy for the reaction is negative, the entropy change of the universe is also negative. This means that the universe becomes more ordered as a result of the reaction.</Text>

      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the free energy change for the following reaction at 298 K:</Text>
        <Text style={styles.chemicalEquation}> CH4(g) + 2H2O(g) == CO2(g) + 4H2(g)</Text>
        <Text style={styles.questionText}>ΔH for this reaction is 165 kJ/mol and ΔS is 58.2 J/mol·K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The free energy change for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔG = ΔH - TΔS</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔG is the free energy change (kJ/mol)</Text>
        <Text style={styles.solution} >ΔH is the change in enthalpy (kJ/mol)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >ΔS is the change in entropy (J/mol·K)</Text>
        <Text style={styles.solution} >Substituting in the values for ΔH, T, and ΔS, we get the following equation:</Text>
        <Text style={styles.formula} >ΔG = 165 kJ/mol - (298 K)(58.2 J/mol·K) = 104.6 kJ/mol</Text>
        <Text style={styles.explanation} >Therefore, the free energy change for the reaction at 298 K is 104.6 kJ/mol.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the heat of vaporization of water at 100°C.</Text>

      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The heat of vaporization of a substance is the amount of heat required to vaporize one mole of the substance at its boiling point.</Text>
        <Text style={styles.explanation} >The heat of vaporization of water at 100°C can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔHvap = q/n</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔHvap is the heat of vaporization (kJ/mol)</Text>
        <Text style={styles.solution} >q is the heat absorbed (kJ)</Text>
        <Text style={styles.solution} >n is the number of moles of water (mol)</Text>
        <Text style={styles.solution} >To calculate the heat absorbed, we can use the following equation:</Text>
        <Text style={styles.formula} >q = mCΔT</Text>
        <Text style={styles.solution} >where:  q is the heat absorbed (kJ), m is the mass of water (g), C is the specific heat of water (4.184 J/g·K),  ΔT is the change in temperature (K)</Text>
        <Text style={styles.explanation} >Assuming that we start with 100 g of water at 100°C, we can calculate the heat absorbed as follows:</Text>
        <Text style={styles.formula} >q = (100 g)(4.184 J/g·K)(100°C - 25°C) = 31470 J</Text>
        <Text style={styles.solution} >Now that we know the heat absorbed, we can calculate the heat of vaporization of water as follows:</Text>
        <Text style={styles.formula} >ΔHvap = q/n = 31470 J / (1 mol / 18 g/mol) = 56800 J/mol</Text>
        <Text style={styles.explanation} >Therefore, the heat of vaporization of water at 100°C is 56800 J/mol, or 56.8 kJ/mol.</Text>
      </View>

      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the equilibrium constant for the following reaction at 298 K:</Text>
        <Text style={styles.chemicalEquation}> N2(g) + 3H2(g) == 2NH3(g)</Text>
        <Text style={styles.questionText}>ΔG° for this reaction is -33.3 kJ/mol.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The equilibrium constant for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >Keq = e^(-ΔG° / RT)</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >Keq is the equilibrium constant</Text>
        <Text style={styles.solution} >ΔG° is the standard free energy change (kJ/mol)</Text>
        <Text style={styles.solution} >R is the ideal gas constant (8.314 J/mol·K)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >Substituting in the values for ΔG°, R, and T, we get the following equation:</Text>
        <Text style={styles.formula} >Keq = e^(-(-33.3 kJ/mol) / (8.314 J/mol·K)(298 K)) = 1.1 x 10^5</Text>
        <Text style={styles.explanation} >Therefore, the equilibrium constant for the reaction at 298 K is 1.1 x 10^5.</Text>
      </View>

      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the maximum amount of work that can be done by a system when 1 mole of an ideal gas expands isothermally from a volume of 1 L to a volume of 2 L at a temperature of 298 K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The maximum amount of work that can be done by a system is equal to the change in free energy for the system at constant temperature.</Text>
        <Text style={styles.explanation} >The change in free energy for an ideal gas expanding isothermally can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔG = -nRTln(Vf/Vi)</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔG is the change in free energy (kJ/mol)</Text>
        <Text style={styles.solution} >n is the number of moles of gas (mol)</Text>
        <Text style={styles.solution} >R is the ideal gas constant (8.314 J/mol·K)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >Vf is the final volume (L)</Text>
        <Text style={styles.solution} >Vi is the initial volume (L)</Text>
        <Text style={styles.solution} >Substituting in the values for n, R, T, Vf, and Vi, we get the following equation:</Text>
        <Text style={styles.formula} >ΔG = -(1 mol)(8.314 J/mol·K)(298 K)ln(2 L/1 L) = -5145 J</Text>
        <Text style={styles.explanation} >Therefore, the maximum amount of work that can be done by the system is 5145 J.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the heat of combustion of ethanol (C2H6O) given the following information:</Text>
        <Text style={styles.chemicalEquation}>C2H6O(l) + 3O2(g) == 2CO2(g) + 3H2O(l) </Text>
        <Text style={styles.questionText}>ΔH = -1366.9 kJ/mol</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The heat of combustion of a substance is the amount of heat released when one mole of the substance is completely burned in oxygen.</Text>
        <Text style={styles.explanation} >To calculate the heat of combustion of ethanol, we can use the following equation:</Text>
        <Text style={styles.formula} >ΔHcomb = ΔHreaction - ΣnΔHf°reactants + ΣnΔHf°products</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔHcomb is the enthalpy of combustion (kJ/mol)</Text>
        <Text style={styles.solution} >ΔHreaction is the enthalpy change for the combustion reaction (kJ/mol)</Text>
        <Text style={styles.solution} >ΔHf° is the standard enthalpy of formation of each substance</Text>
        <Text style={styles.solution} >The standard enthalpies of formation of ethanol, oxygen, carbon dioxide, and water can be found in a thermodynamics reference table.</Text>
        <Text style={styles.solution} >Substituting the values for ΔHreaction, ΔHf° of ethanol, ΔHf° of oxygen, ΔHf° of carbon dioxide, and ΔHf° of water into the equation, we get the following:</Text>
        <Text style={styles.formula} >ΔHcomb = -1366.9 kJ/mol - (1 mol)(-285.8 kJ/mol) + 3(1 mol)(-393.5 kJ/mol) + 2(1 mol)(-393.5 kJ/mol) = -1405.2 kJ/mol</Text>
        <Text style={styles.explanation} >Therefore, the heat of combustion of ethanol is -1405.2 kJ/mol.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the entropy change of the universe for the following reaction:</Text>
        <Text style={styles.chemicalEquation}>2NO(g) + O2(g) == 2NO2(g) </Text>
        <Text style={styles.questionText}>ΔS for this reaction is -146.3 J/mol·K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The entropy change of the universe for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔSuniv = ΔSreaction</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔSuniv is the entropy change of the universe (J/mol·K)</Text>
        <Text style={styles.solution} >ΔSreaction is the change in entropy for the reaction (J/mol·K)</Text>
        <Text style={styles.explanation} >Since the change in entropy for the reaction is negative, the entropy change of the universe is also negative. This means that the universe becomes more ordered as a result of the reaction.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the free energy change for the following reaction at 298 K:</Text>
        <Text style={styles.chemicalEquation}> N2(g) + H2(g) == NH3(g)</Text>
        <Text style={styles.questionText}>ΔH for this reaction is -46.1 kJ/mol and ΔS is -198.2 J/mol·K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The free energy change for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔG = ΔH - TΔS</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔG is the free energy change (kJ/mol)</Text>
        <Text style={styles.solution} >ΔH is the change in enthalpy (kJ/mol)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >ΔS is the change in entropy (J/mol·K)</Text>
        <Text style={styles.solution} >Substituting in the values for ΔH, T, and ΔS, we get the following equation:</Text>
        <Text style={styles.formula} >ΔG = -46.1 kJ/mol - (298 K)(-198.2 J/mol·K) = -13.7 kJ/mol</Text>
        <Text style={styles.explanation} >Therefore, the free energy change for the reaction at 298 K is -13.7 kJ/mol</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the free energy change for the following reaction at 298 K:</Text>
        <Text style={styles.chemicalEquation}> N2(g) + H2(g) == NH3(g)</Text>
        <Text style={styles.questionText}>ΔH for this reaction is -46.1 kJ/mol and ΔS is -198.2 J/mol·K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The free energy change for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔG = ΔH - TΔS</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔG is the free energy change (kJ/mol)</Text>
        <Text style={styles.solution} >ΔH is the change in enthalpy (kJ/mol)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >ΔS is the change in entropy (J/mol·K)</Text>
        <Text style={styles.solution} >Substituting in the values for ΔH, T, and ΔS, we get the following equation:</Text>
        <Text style={styles.formula} >ΔG = -46.1 kJ/mol - (298 K)(-198.2 J/mol·K) = -13.7 kJ/mol</Text>
        <Text style={styles.explanation} >Therefore, the free energy change for the reaction at 298 K is -13.7 kJ/mol</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the heat of fusion of ice at 0°C.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The heat of fusion of a substance is the amount of heat required to melt one mole of the substance at its melting point.</Text>
        <Text style={styles.explanation} >The heat of fusion of ice at 0°C can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔHfus = q/n</Text>
        <Text style={styles.explanation} >where:  ΔHfus is the heat of fusion (kJ/mol), q is the heat absorbed (kJ), n is the number of moles of water (mol)</Text>
        <Text style={styles.solution} >To calculate the heat absorbed, we can use the following equation:</Text>
        <Text style={styles.solution} >q = mCΔT</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >q is the heat absorbed (kJ)</Text>
        <Text style={styles.solution} >m is the mass of water (g)</Text>
        <Text style={styles.solution} >C is the specific heat of water (4.184 J/g·K)</Text>
        <Text style={styles.solution} >ΔT is the change in temperature (K)</Text>
        <Text style={styles.solution} >Assuming that we start with 100 g of ice at 0°C, we can calculate the heat absorbed as follows:</Text>
        <Text style={styles.formula} >q = (100 g)(4.184 J/g·K)(0°C - (-10°C)) = 4184 J</Text>
        <Text style={styles.solution} >Now that we know the heat absorbed, we can calculate the heat of fusion of ice as follows:</Text>
        <Text style={styles.formula} >ΔHfus = q/n = 4184 J / (1 mol / 18 g/mol) = 76000 J/mol</Text>
        <Text style={styles.explanation} >Therefore, the heat of fusion of ice at 0°C is 76000 J/mol, or 76.0 kJ/mol.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the equilibrium constant for the following reaction at 100°C:</Text>
        <Text style={styles.chemicalEquation}>H2O(g) == H2(g) + 1/2O2(g)</Text>
        <Text style={styles.questionText}>ΔG° for this reaction at 100°C is 42.6 kJ/mol.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The equilibrium constant for a chemical reaction can be calculated using the following equation:</Text>
        <Text style={styles.formula} >Keq = e^(-ΔG° / RT)</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >Keq is the equilibrium constant</Text>
        <Text style={styles.solution} >ΔG° is the standard free energy change (kJ/mol)</Text>
        <Text style={styles.solution} >R is the ideal gas constant (8.314 J/mol·K)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >Substituting in the values for ΔG°, R, and T, we get the following equation:</Text>
        <Text style={styles.formula} >Keq = e^(-(42.6 kJ/mol) / (8.314 J/mol·K)(373 K)) = 3.5 x 10^-5</Text>
        <Text style={styles.explanation} >Therefore, the equilibrium constant for the reaction at 100°C is 3.5 x 10^-5.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the maximum amount of work that can be done by a system when 1 mole of an ideal gas expands isothermally and reversibly from a volume of 1 L to a volume of 2 L at a temperature of 298 K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The maximum amount of work that can be done by a system is equal to the change in free energy for the system at constant temperature.</Text>
        <Text style={styles.explanation} >The change in free energy for an ideal gas expanding isothermally and reversibly can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔG = -nRTln(Vf/Vi)</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔG is the change in free energy (kJ/mol)</Text>
        <Text style={styles.solution} >n is the number of moles of gas (mol)</Text>
        <Text style={styles.solution} >R is the ideal gas constant (8.314 J/mol·K)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >Vf is the final volume (L)</Text>
        <Text style={styles.solution} >Vi is the initial volume (L)</Text>
        <Text style={styles.solution} >Substituting in the values for n, R, T, Vf, and Vi, we get the following equation:</Text>
        <Text style={styles.formula} >ΔG = -(1 mol)(8.314 J/mol·K)(298 K)ln(2 L/1 L) = -5145 J</Text>
        <Text style={styles.explanation} >Therefore, the maximum amount of work that can be done by the system is 5145 J.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the final temperature when 100 g of aluminum at 50°C is placed in 200 g of water at 25°C.</Text>
        <Text style={styles.questionText}>(Given: specific heat capacity of aluminum = 0.897 J/g°C, specific heat capacity of water = 4.18 J/g°C) </Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >To calculate the final temperature, we can use the following equation:</Text>
        <Text style={styles.formula} >Q_aluminum + Q_water = 0</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >Q_aluminum is the heat lost by the aluminum</Text>
        <Text style={styles.solution} >Q_water is the heat gained by the water</Text>
        <Text style={styles.solution} >Since the aluminum and water are in contact, they will reach the same final temperature. We can therefore set Q_aluminum and Q_water equal to each other:</Text>
        <Text style={styles.solution} >Q_aluminum = Q_water</Text>
        <Text style={styles.solution} >We can now use the following equation to calculate the final temperature:</Text>
        <Text style={styles.solution} >m_aluminum * c_aluminum * ΔT_aluminum = m_water * c_water * ΔT_water</Text>
        <Text style={styles.solution} >where: m is the mass (g), c is the specific heat capacity (J/g°C), ΔT is the change in temperature (°C)</Text>
        <Text style={styles.solution} >Substituting in the known values, we get the following equation:</Text>
        <Text style={styles.formula} >(100 g)(0.897 J/g°C)(T_final - 50°C) = (200 g)(4.18 J/g°C)(T_final - 25°C)</Text>
        <Text style={styles.solution} >Solving for T_final, we get:</Text>
        <Text style={styles.solution} >T_final = 29.2°C</Text>
        <Text style={styles.explanation} >Therefore, the final temperature is 29.2°C.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the entropy change when 1 mole of an ideal gas at 300 K expands isothermally and reversibly from a volume of 10 L to 20 L. </Text>
        <Text style={styles.questionText}> (Given: R = 8.31 J/(mol·K))</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The entropy change for an isothermal and reversible expansion of an ideal gas can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔS = nRln(Vf/Vi)</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔS is the change in entropy (J/mol·K)</Text>
        <Text style={styles.solution} >n is the number of moles of gas (mol)</Text>
        <Text style={styles.solution} >R is the ideal gas constant (8.31 J/(mol·K))</Text>
        <Text style={styles.solution} >Vf is the final volume (L)</Text>
        <Text style={styles.solution} >Vi is the initial volume (L)</Text>
        <Text style={styles.solution} >Substituting in the values for n, R, Vf, and Vi, we get the following equation:</Text>
        <Text style={styles.formula} >ΔS = (1 mol)(8.31 J/(mol·K))ln(20 L/10 L) = 5.76 J/mol·K</Text>
        <Text style={styles.explanation} >Therefore, the entropy change when 1 mole of an ideal gas at 300 K expands isothermally and reversibly from a volume of 10 L to 20 L is 5.76 J/mol·K.</Text>
        <Text style={styles.explanation} >The entropy change is positive, which means that the system becomes more disordered as a result of the expansion. This is because the gas molecules have more space to move around, which increases their freedom of movement.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the final temperature of 200 g of water initially at 25°C when 1000 J of heat is added. </Text>
        <Text style={styles.questionText}> (Given: specific heat capacity of water = 4.18 J/g°C)</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >To calculate the final temperature of the water, we can use the following equation:</Text>
        <Text style={styles.formula} >Q = mcΔT</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >Q is the heat added (J)</Text>
        <Text style={styles.solution} >m is the mass of the water (g)</Text>
        <Text style={styles.solution} >c is the specific heat capacity of water (J/g°C)</Text>
        <Text style={styles.solution} >ΔT is the change in temperature (°C)</Text>
        <Text style={styles.solution} >Substituting in the known values, we get the following equation:</Text>
        <Text style={styles.solution} >1000 J = (200 g)(4.18 J/g°C)(T_final - 25°C)</Text>
        <Text style={styles.formula} >Solving for T_final, we get:</Text>
        <Text style={styles.solution} >T_final = 26.19°C</Text>
        <Text style={styles.explanation} >Therefore, the final temperature of the water is 26.19°C.</Text>
      </View>

      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the change in internal energy (ΔU) for a system that absorbs 150 J of heat and performs 50 J of work on the surroundings.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >The change in internal energy (ΔU) for a system that absorbs 150 J of heat and performs 50 J of work on the surroundings can be calculated using the following equation:</Text>
        <Text style={styles.formula} >ΔU = Q - W</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔU is the change in internal energy (J)</Text>
        <Text style={styles.solution} >Q is the heat absorbed by the system (J)</Text>
        <Text style={styles.solution} >W is the work done by the system on the surroundings (J)</Text>
        <Text style={styles.solution} >Substituting in the known values, we get the following equation:</Text>
        <Text style={styles.formula} >ΔU = 150 J - 50 J = 100 J</Text>
        <Text style={styles.explanation} >Therefore, the change in internal energy for the system is 100 J.</Text>
        <Text style={styles.solution} >Note: The change in internal energy is positive, which means that the system gains energy. </Text>
        <Text style={styles.solution} >This is because the system absorbs more heat than it performs work on the surroundings.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the standard enthalpy change (ΔH∘) for a reaction if the standard Gibbs free energy change (ΔG∘) is -30 kJ/mol and the standard entropy change (ΔS∘) is 100 J/(mol·K).</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >To calculate the standard enthalpy change (ΔH∘) for a reaction if the standard Gibbs free energy change (ΔG∘) is -30 kJ/mol and the standard entropy change (ΔS∘) is 100 J/(mol·K), we can use the following equation:</Text>
        <Text style={styles.formula} >ΔH∘ = ΔG∘ + TΔS∘</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔH∘ is the standard enthalpy change (kJ/mol)</Text>
        <Text style={styles.solution} >ΔG∘ is the standard Gibbs free energy change (kJ/mol)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >ΔS∘ is the standard entropy change (J/(mol·K))</Text>
        <Text style={styles.solution} >Assuming that the reaction takes place at standard temperature (T = 298 K), we can substitute the known values into the equation to get the following:</Text>
        <Text style={styles.formula} >ΔH∘ = -30 kJ/mol + (298 K)(100 J/(mol·K)) = -12 kJ/mol</Text>
        <Text style={styles.solution} >Therefore, the standard enthalpy change for the reaction is -12 kJ/mol.</Text>
        <Text style={styles.explanation} >The standard enthalpy change is negative, which means that the reaction is exothermic. This means that the reaction releases heat to the surroundings.</Text>
      </View>
      </View>
      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>For the reaction:</Text>
        <Text style={styles.chemicalEquation}> N2(g) + 3H2(g) == 2NH3(g)</Text>
        <Text style={styles.questionText}>Given:ΔH∘ = −92.4kJ/mol for the reaction., ΔS∘ = −198.6J/(mol⋅K) for the reaction., Temperature (T) = 298 K., Calculate  ΔG∘ for the reaction at 298 K.</Text>
      </View>

      <View style={styles.answerCont}>
        <Text style={styles.explanation} >To calculate the standard Gibbs free energy change (ΔG∘) for a reaction at a given temperature, we can use the following equation:</Text>
        <Text style={styles.formula} >ΔG∘ = ΔH∘ - TΔS∘</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔG∘ is the standard Gibbs free energy change (kJ/mol)</Text>
        <Text style={styles.solution} >ΔH∘ is the standard enthalpy change (kJ/mol)</Text>
        <Text style={styles.solution} >T is the temperature (K)</Text>
        <Text style={styles.solution} >ΔS∘ is the standard entropy change (J/(mol·K))</Text>
        <Text style={styles.solution} >Substituting the known values into the equation, we get the following:</Text>
        <Text style={styles.formula} >ΔG∘ = −92.4 kJ/mol - (298 K)(−198.6 J/(mol⋅K))</Text>
        <Text style={styles.solution} >ΔG∘ = −33.3 kJ/mol</Text>
        <Text style={styles.explanation} >Therefore, the standard Gibbs free energy change for the reaction at 298 K is -33.3 kJ/mol.</Text>
        <Text style={styles.solution} >Note: The negative value of ΔG∘ indicates that the reaction is spontaneous under standard conditions.</Text>
      </View>
      </View>

      <View style={styles.card}>
      <View style={styles.questionCont}>
        <Text style={styles.questionText}>Calculate the change in enthalpy (ΔH) when 50 g of water at 25°C is converted into steam at 100°C.</Text>
        <Text style={styles.questionText}> (Given: specific heat capacity of water = 4.18 J/g°C, heat of vaporization of water = 40.7 kJ/mol)</Text>
      </View>

      <View style={styles.answerCont}>

        <Text style={styles.explanation} >To calculate the change in enthalpy (ΔH) when 50 g of water at 25°C is converted into steam at 100°C, we can use the following equation:</Text>
        <Text style={styles.solution} >ΔH = Q</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >ΔH is the change in enthalpy (J)</Text>
        <Text style={styles.solution} >Q is the heat absorbed by the system (J)</Text>
        <Text style={styles.solution} >The heat absorbed by the system can be calculated using the following equation:</Text>
        <Text style={styles.formula} >Q = m * c * ΔT + m * ΔHvap</Text>
        <Text style={styles.solution} >where:</Text>
        <Text style={styles.solution} >m is the mass of water (g)</Text>
        <Text style={styles.solution} >c is the specific heat capacity of water (J/g°C)</Text>
        <Text style={styles.solution} >ΔT is the change in temperature (°C)</Text>
        <Text style={styles.solution} >ΔHvap is the heat of vaporization of water (J/mol)</Text>
        <Text style={styles.solution} >First, we need to convert the mass of water from grams to moles:</Text>
        <Text style={styles.formula} >50 g * 1 mol / 18.02 g = 2.77 mol</Text>
        <Text style={styles.solution} >Now, we can substitute the known values into the equation to calculate the change in enthalpy:</Text>
        <Text style={styles.formula} >ΔH = (2.77 mol * 4.18 J/g°C * (100°C - 25°C)) + (2.77 mol * 40.7 kJ/mol)</Text>
        <Text style={styles.solution} >ΔH = 113.926 kJ</Text>
        <Text style={styles.explanation} >Therefore, the change in enthalpy when 50 g of water at 25°C is converted into steam at 100°C is 113.926 kJ.</Text>
        <Text style={styles.solution} >Note: The change in enthalpy is positive, which means that the system absorbs heat. This is because the conversion of water to steam is an endothermic process.</Text>
      </View>

      </View>

      <View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>Calculate the final temperature when 150 g of copper at 80°C is placed in 250 g of oil at 20°C.</Text>
    <Text style={styles.questionText}>(Given: specific heat capacity of copper = 0.385 J/g°C, specific heat capacity of oil = 2.1 J/g°C)</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>To calculate the final temperature, we can use the equation:</Text>
    <Text style={styles.formula}>Q_copper + Q_oil = 0</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>Q_copper is the heat lost by copper</Text>
    <Text style={styles.solution}>Q_oil is the heat gained by oil</Text>
    <Text style={styles.solution}>Setting Q_copper equal to Q_oil, we have:</Text>
    <Text style={styles.formula}>m_copper * c_copper * ΔT_copper = m_oil * c_oil * ΔT_oil</Text>
    <Text style={styles.solution}>Substituting the given values:</Text>
    <Text style={styles.formula}>(150 g)(0.385 J/g°C)(T_final - 80°C) = (250 g)(2.1 J/g°C)(T_final - 20°C)</Text>
    <Text style={styles.solution}>Solving for T_final:</Text>
    <Text style={styles.formula}>T_final ≈ 37.9°C</Text>
    <Text style={styles.explanation}>Therefore, the final temperature is approximately 37.9°C.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>Calculate the change in internal energy (ΔU) for a system that releases 200 J of heat and does 100 J of work on the surroundings.</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>The change in internal energy (ΔU) can be calculated using the equation:</Text>
    <Text style={styles.formula}>ΔU = Q - W</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>ΔU is the change in internal energy (J)</Text>
    <Text style={styles.solution}>Q is the heat released by the system (J)</Text>
    <Text style={styles.solution}>W is the work done on the surroundings (J)</Text>
    <Text style={styles.solution}>Substituting the given values:</Text>
    <Text style={styles.formula}>ΔU = 200 J - 100 J = 100 J</Text>
    <Text style={styles.explanation}>Therefore, the change in internal energy for the system is 100 J.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>Calculate the standard Gibbs free energy change (ΔG∘) for the reaction:</Text>
    <Text style={styles.chemicalEquation}>2A(g) + 3B(s) == 4C(l)</Text>
    <Text style={styles.questionText}>(Given: ΔH∘ = 150 kJ/mol, ΔS∘ = -80 J/(mol·K), T = 298 K)</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>To calculate ΔG∘, use the equation:</Text>
    <Text style={styles.formula}>ΔG∘ = ΔH∘ - TΔS∘</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>ΔG∘ is the standard Gibbs free energy change (kJ/mol)</Text>
    <Text style={styles.solution}>ΔH∘ is the standard enthalpy change (kJ/mol)</Text>
    <Text style={styles.solution}>ΔS∘ is the standard entropy change (J/(mol·K))</Text>
    <Text style={styles.solution}>T is the temperature (K)</Text>
    <Text style={styles.solution}>Substituting the known values:</Text>
    <Text style={styles.formula}>ΔG∘ = 150 kJ/mol - (298 K)(-80 J/(mol·K))</Text>
    <Text style={styles.solution}>ΔG∘ ≈ 17470 J/mol (or 17.47 kJ/mol)</Text>
    <Text style={styles.explanation}>Therefore, the standard Gibbs free energy change for the reaction is approximately 17.47 kJ/mol.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>Calculate the final temperature when 80 g of silver at 100°C is added to 150 g of water at 20°C.</Text>
    <Text style={styles.questionText}>(Given: specific heat capacity of silver = 0.24 J/g°C, specific heat capacity of water = 4.18 J/g°C)</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>To find the final temperature, we use the equation:</Text>
    <Text style={styles.formula}>Q_silver + Q_water = 0</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>Q_silver is the heat lost by silver</Text>
    <Text style={styles.solution}>Q_water is the heat gained by water</Text>
    <Text style={styles.solution}>Setting Q_silver equal to Q_water:</Text>
    <Text style={styles.formula}>m_silver * c_silver * ΔT_silver = m_water * c_water * ΔT_water</Text>
    <Text style={styles.solution}>Substituting the given values:</Text>
    <Text style={styles.formula}>(80 g)(0.24 J/g°C)(T_final - 100°C) = (150 g)(4.18 J/g°C)(T_final - 20°C)</Text>
    <Text style={styles.solution}>Solving for T_final:</Text>
    <Text style={styles.formula}>T_final ≈ 25.1°C</Text>
    <Text style={styles.explanation}>Therefore, the final temperature is approximately 25.1°C.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>Calculate the standard enthalpy change (ΔH∘) for the reaction:</Text>
    <Text style={styles.chemicalEquation}>3X(g) + 2Y(l) == 5Z(s)</Text>
    <Text style={styles.questionText}>(Given: ΔG∘ = -120 kJ/mol, ΔS∘ = 80 J/(mol·K), T = 300 K)</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>The standard enthalpy change (ΔH∘) can be calculated using the equation:</Text>
    <Text style={styles.formula}>ΔH∘ = ΔG∘ + TΔS∘</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>ΔH∘ is the standard enthalpy change (kJ/mol)</Text>
    <Text style={styles.solution}>ΔG∘ is the standard Gibbs free energy change (kJ/mol)</Text>
    <Text style={styles.solution}>T is the temperature (K)</Text>
    <Text style={styles.solution}>ΔS∘ is the standard entropy change (J/(mol·K))</Text>
    <Text style={styles.solution}>Substituting the known values:</Text>
    <Text style={styles.formula}>ΔH∘ = -120 kJ/mol + (300 K)(80 J/(mol·K))</Text>
    <Text style={styles.solution}>ΔH∘ ≈ -96 kJ/mol</Text>
    <Text style={styles.explanation}>Therefore, the standard enthalpy change for the reaction is approximately -96 kJ/mol.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>A piston expands isothermally and reversibly, doing 150 J of work. Calculate the heat absorbed by the system.</Text>
    <Text style={styles.questionText}>(Given: Isothermal and reversible process)</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>For an isothermal and reversible process, the heat absorbed (Q) can be calculated using the equation:</Text>
    <Text style={styles.formula}>Q = W</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>Q is the heat absorbed (J)</Text>
    <Text style={styles.solution}>W is the work done by the system (J)</Text>
    <Text style={styles.solution}>Given that the piston does 150 J of work:</Text>
    <Text style={styles.formula}>Q = 150 J</Text>
    <Text style={styles.explanation}>Therefore, the heat absorbed by the system is 150 J.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>A chemical reaction has a ΔG value of +20 kJ/mol at 25°C. Determine the equilibrium constant (K) for the reaction.</Text>
    <Text style={styles.questionText}>(Given: T = 298 K)</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>The equilibrium constant (K) can be determined using the relationship between ΔG and K:</Text>
    <Text style={styles.formula}>ΔG = -RTln(K)</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>ΔG is the Gibbs free energy change (J/mol)</Text>
    <Text style={styles.solution}>R is the ideal gas constant (8.31 J/(mol·K))</Text>
    <Text style={styles.solution}>T is the temperature (K)</Text>
    <Text style={styles.solution}>K is the equilibrium constant</Text>
    <Text style={styles.solution}>Solving for K:</Text>
    <Text style={styles.formula}>K = e^(-ΔG/RT)</Text>
    <Text style={styles.solution}>Substituting the given values:</Text>
    <Text style={styles.formula}>K ≈ e^(-20,000 J/(mol) / (8.31 J/(mol·K) * 298 K))</Text>
    <Text style={styles.solution}>K ≈ e^(-8.09)</Text>
    <Text style={styles.solution}>K ≈ 0.0003</Text>
    <Text style={styles.explanation}>Therefore, the equilibrium constant (K) for the reaction is approximately 0.0003.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>Calculate the pH of a solution with a hydrogen ion concentration [H⁺] of 1 x 10⁻⁵ M.</Text>
    <Text style={styles.questionText}>(Given: pH = -log[H⁺])</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>The pH of a solution can be calculated using the equation:</Text>
    <Text style={styles.formula}>pH = -log[H⁺]</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>pH is the negative logarithm of the hydrogen ion concentration [H⁺]</Text>
    <Text style={styles.solution}>Given that [H⁺] = 1 x 10⁻⁵ M:</Text>
    <Text style={styles.formula}>pH = -log(1 x 10⁻⁵)</Text>
    <Text style={styles.solution}>Using logarithm properties, pH ≈ 5</Text>
    <Text style={styles.explanation}>Therefore, the pH of the solution is approximately 5.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>Calculate the work done when a gas expands against a constant external pressure of 2 atm from a volume of 5 L to 10 L.</Text>
    <Text style={styles.questionText}>(Given: 1 atm = 101.325 J/L·atm)</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>The work done (W) during expansion against a constant external pressure can be calculated using the equation:</Text>
    <Text style={styles.formula}>W = -PextΔV</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>W is the work done (J)</Text>
    <Text style={styles.solution}>Pext is the external pressure (atm)</Text>
    <Text style={styles.solution}>ΔV is the change in volume (L)</Text>
    <Text style={styles.solution}>Substituting the given values:</Text>
    <Text style={styles.formula}>W = -(2 atm)(101.325 J/L·atm)(10 L - 5 L)</Text>
    <Text style={styles.solution}>W = -1013.25 J</Text>
    <Text style={styles.explanation}>Therefore, the work done during the expansion is -1013.25 J.</Text>
  </View>
</View>

<View style={styles.card}>
  <View style={styles.questionCont}>
    <Text style={styles.questionText}>A reaction has an activation energy of 50 kJ/mol. Calculate the rate constant (k) at 25°C. </Text>
    <Text style={styles.questionText}>(Given: R = 8.31 J/(mol·K))</Text>
  </View>

  <View style={styles.answerCont}>
    <Text style={styles.explanation}>The rate constant (k) for a reaction can be calculated using the Arrhenius equation:</Text>
    <Text style={styles.formula}>k = Ae^(-Ea/RT)</Text>
    <Text style={styles.solution}>where:</Text>
    <Text style={styles.solution}>k is the rate constant</Text>
    <Text style={styles.solution}>A is the pre-exponential factor (frequency factor)</Text>
    <Text style={styles.solution}>Ea is the activation energy (J/mol)</Text>
    <Text style={styles.solution}>R is the ideal gas constant (8.31 J/(mol·K))</Text>
    <Text style={styles.solution}>T is the temperature (K)</Text>
    <Text style={styles.solution}>Substituting the given values:</Text>
    <Text style={styles.formula}>k = A * e^(-50,000 J/(mol) / (8.31 J/(mol·K) * 298 K))</Text>
    <Text style={styles.solution}>Assuming A = 1 (for simplicity), k ≈ 7.12 x 10^(-4) s^(-1)</Text>
    <Text style={styles.explanation}>Therefore, the rate constant (k) at 25°C is approximately 7.12 x 10^(-4) s^(-1).</Text>
  </View>
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
    backgroundColor: '#F7F0F7', // Light Gray Background
  },
  scrollContainer: {
    flexGrow: 1,
    marginBottom: 50, // Adjust this value based on your banner ad height
  },
  adContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
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
  questionCont: {
    margin: 20,
    elevation: 3
  },
  answerCont: {
    margin: 15,
    elevation: 5,
    padding: 15,
    backgroundColor: 'rgb(250, 250, 255)'
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4E7ECE', // Blue Color
  },
  formula: {
    fontSize: 18,
    marginBottom: 16,
    color: '#C30075', // Dark Gray Text
  },
  chemicalEquation: {
    fontSize: 18,
    marginBottom: 8,
    color: '#4EAEAE', // Blue Color
  },
  solution: {
    fontSize: 16,
    marginBottom: 8,
    color: 'rgb(31, 0, 15)', // Dark Gray Text
  },
  explanation: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#32CD32', // Lime Green
  },
  calculation: {
    fontSize: 16,
    color: '#4E7ECA', // Blue Color
    marginBottom: 8,
  },
});

export default ThermoChemistry
