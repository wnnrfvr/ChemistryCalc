// ChemistryCalculatorScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChemistryCalculatorScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleButtonPress = (value) => {
    setInputValue((prevInput) => prevInput + value);
  };

  const handleOperator = (operator) => {
    setInputValue((prevInput) => {
      const lastChar = prevInput.slice(-1);
      return /[+\-*/%^]/.test(lastChar) ? prevInput : prevInput + operator;
    });
  };

  const handleCalculate = () => {
    try {
      // Replace ^ with ** for exponentiation
      const correctedExpression = inputValue.replace(/\^/g, '**');

      // Use eval to evaluate the expression
      const calculatedResult = eval(correctedExpression);
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInputValue('');
    setResult('');
  };

  // Define button configurations
  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '%', '+'],
    ['^', '=', 'C'],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Chemistry Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <View style={styles.buttonContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={styles.button}
                onPress={() => {
                  button === '=' ? handleCalculate() : button === 'C' ? handleClear() : handleButtonPress(button);
                }}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      {result !== '' && <Text style={styles.result}>Result: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  buttonContainer: {
    width: '80%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default ChemistryCalculatorScreen;
