// AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
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
import ChemistryCalculatorScreen from './src/ChemistryCalculatorScreen';
import ChemistrySimulationScreen from './src/ChemistrySimulationScreen';
import PeriodicTableScreen from './src/PeriodicTableScreen';
import EquationBalancerScreen from './src/EquationBalancerScreen';
import QuizScreen from './src/QuizScreen';
import GlossaryScreen from './src/GlossaryScreen';
import QuickReferenceScreen from './src/QuickReferenceScreen';
import SettingsScreen from './src/SettingsScreen';

const Stack = createNativeStackNavigator();

// Custom App Theme (dark, immersive, sci-lab style)
const LabTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#02060f',
    card: '#0d1424',
    text: '#e6faff',
    primary: '#00eaff',
  },
};

// Header styles per screen category
const headerStyles = {
  default: {
    headerStyle: { backgroundColor: '#0a0f1c' },
    headerTintColor: '#00eaff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#00eaff',
      textShadowColor: '#00eaff33',
      textShadowRadius: 5,
    },
  },
  stoichiometry: {
    headerStyle: { backgroundColor: '#0a1a0f' },
    headerTintColor: '#00ff88',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#00ff88',
      textShadowColor: '#00ff8844',
      textShadowRadius: 6,
    },
  },
  nuclear: {
    headerStyle: { backgroundColor: '#150a0a' },
    headerTintColor: '#ff4d4d',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#ff4d4d',
      textShadowColor: '#ff4d4d44',
      textShadowRadius: 6,
    },
  },
  solution: {
    headerStyle: { backgroundColor: '#0a102a' },
    headerTintColor: '#00aaff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#00aaff',
      textShadowColor: '#00aaff44',
      textShadowRadius: 6,
    },
  },
  gases: {
    headerStyle: { backgroundColor: '#001a1a' },
    headerTintColor: '#00ffd0',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#00ffd0',
      textShadowColor: '#00ffd055',
      textShadowRadius: 6,
    },
  },
  thermochem: {
    headerStyle: { backgroundColor: '#1a0a00' },
    headerTintColor: '#ff9900',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#ff9900',
      textShadowColor: '#ff990055',
      textShadowRadius: 6,
    },
  },
  simulation: {
    headerStyle: { backgroundColor: '#02131d' },
    headerTintColor: '#00eaff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#00eaff',
      textShadowColor: '#00eaff55',
      textShadowRadius: 6,
    },
  },
};

function AppNavigator() {
  return (
    <NavigationContainer theme={LabTheme}>
      <Stack.Navigator
        initialRouteName="Chemistry"
        screenOptions={{
          animation: 'fade',
          gestureEnabled: true,
          headerBackTitleVisible: false,
        }}
      >
        {/* 🧪 Home — no header */}
        <Stack.Screen
          name="Chemistry"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* 🧫 Each screen has unique color + glow aesthetic */}
        <Stack.Screen
          name="Stoichiometry"
          component={StoichiometryScreen}
          options={{
            title: 'Stoichiometry Lab',
            ...headerStyles.stoichiometry,
          }}
        />
        <Stack.Screen
          name="MassMoleNumber"
          component={MassMoleNumberScreen}
          options={{
            title: 'Mass ↔ Mole ↔ Number',
            ...headerStyles.default,
          }}
        />
        <Stack.Screen
          name="NuclearChemistry"
          component={NuclearChemistry}
          options={{
            title: 'Nuclear Chemistry',
            ...headerStyles.nuclear,
          }}
        />
        <Stack.Screen
          name="SolutionChemistry"
          component={SolutionChemistryScreen}
          options={{
            title: 'Solution Chemistry',
            ...headerStyles.solution,
          }}
        />
        <Stack.Screen
          name="Gases"
          component={Gases}
          options={{
            title: 'Gas Laws Lab',
            ...headerStyles.gases,
          }}
        />
        <Stack.Screen
          name="PhCalculations"
          component={PhCalc}
          options={{
            title: 'pH Calculations',
            ...headerStyles.solution,
          }}
        />
        <Stack.Screen
          name="ThermoChemistry"
          component={ThermoChemistry}
          options={{
            title: 'ThermoChemistry',
            ...headerStyles.thermochem,
          }}
        />
        <Stack.Screen
          name="ElectrolysisCalculations"
          component={ElectrolysisCalculations}
          options={{
            title: 'Electrolysis',
            ...headerStyles.stoichiometry,
          }}
        />
        <Stack.Screen
          name="ChemistryCalculator"
          component={ChemistryCalculatorScreen}
          options={{
            title: 'Quantum Calculator',
            ...headerStyles.default,
          }}
        />
        <Stack.Screen
          name="ChemistrySimulation"
          component={ChemistrySimulationScreen}
          options={{
            title: 'Simulation Chamber',
            ...headerStyles.simulation,
          }}
        />
        <Stack.Screen
          name="PeriodicTable"
          component={PeriodicTableScreen}
          options={{ title: 'Periodic Table', ...headerStyles.default }}
        />
        <Stack.Screen
          name="EquationBalancer"
          component={EquationBalancerScreen}
          options={{ title: 'Equation Balancer', ...headerStyles.stoichiometry }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'Chemistry Quiz', ...headerStyles.nuclear }}
        />
        <Stack.Screen
          name="Glossary"
          component={GlossaryScreen}
          options={{ title: 'Dictionary', ...headerStyles.solution }}
        />
        <Stack.Screen
          name="QuickReference"
          component={QuickReferenceScreen}
          options={{ title: 'Quick Reference', ...headerStyles.default }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings', ...headerStyles.default }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
