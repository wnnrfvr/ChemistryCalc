// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './src/HomeScreen';
import StoichiometryScreen from './src/StoichiometryScreen';
import MassMoleNumberScreen from './src/MassMoleNumberScreen';
import NuclearChemistry from './src/NuclearChemistry';
import SolutionChemistryScreen from './src/SolutionChemistryScreen';
import Gases from './src/GasesScreen';
import PhCalc from './src/PhCalc';
import ThermoChemistry from './src/ThemoChem';
import ElectrolysisCalculations from './src/Electrolysis';

// Import other screens here

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Chemistry">
        <Stack.Screen name="Chemistry" component={HomeScreen} />
        <Stack.Screen name="Stoichiometry" component={StoichiometryScreen} />
        <Stack.Screen name="MassMoleNumber" component={MassMoleNumberScreen} />
        <Stack.Screen name="NuclearChemistry" component={NuclearChemistry} />
        <Stack.Screen name="SolutionChemistry" component={SolutionChemistryScreen} />
        <Stack.Screen name="Gases" component={Gases} />
        <Stack.Screen name="PhCalculations" component={PhCalc} />
        <Stack.Screen name="ThermoChemistry" component={ThermoChemistry} />
        <Stack.Screen name='ElectrolysisCalculations' component={ElectrolysisCalculations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
