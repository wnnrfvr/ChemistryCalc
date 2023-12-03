import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-8342678716913452/3774351217';

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const Gases = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribe();
      // Note: The destroy method is not available in some versions, so it's omitted
    };
  }, []);

  useEffect(() => {
    // Show the interstitial ad once it's done loading
    if (loaded) {
      interstitial.show().catch((error) => {
        console.error('Error showing interstitial ad', error);
      });
    }
  }, [loaded]);

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Gases</Text>

      <View style={styles.problemContainer}>
        <View style={styles.problemTextContainer}>
          <Text style={styles.problemText}>
            If a gas occupies 4 liters at 2 atm, what will be its volume at 4 atm?
          </Text>
        </View>
        
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>
            Boyle's Law states that when the temperature is constant, the product of pressure and volume is a constant.
          </Text>
          <Text style={styles.equation}>P₁V₁ = P₂V₂</Text>
          <Text>
            P₁ = 2 atm, V₁ = 4 L, P₂ = 4 atm, V₂ = ?
          </Text>
          <Text style={styles.calculation}>
            Solving for V₂: V₂ = (P₁ * V₁) / P₂
          </Text>
          <Text>
            V₂ = (2 atm * 4 L) / 4 atm = 2 L
          </Text>
          <Text style={styles.result}>
            So, if the pressure is doubled, the volume will be halved.
          </Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>If a gas occupies 3 liters at 300 K, what will be its volume at 600 K?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>
            Charles's Law states that when pressure is constant, the volume of a gas is directly proportional to its absolute temperature. This can be expressed as,  V₁/T₁ = V₂/T₂
          </Text>
          <Text style={styles.answerText}>
            Given that  V₁ = 3 L,  T₁ = 300 K, V₂ = ?, T₂ = 600 K
          </Text>
          <Text style={styles.equation}>V₂ = (V₁ * T₂) / T₁</Text>
          <Text style={styles.answerText}>V₂ = (3L * 600 K) / 300 K</Text>
          <Text style={styles.answerText}>V₂ = 6 L</Text>
          <Text style={styles.result}>
            So, if the temperature is doubled, the volume will also double, assuming the pressure stays constant.
          </Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>
            If 2 moles of a gas occupy 10 liters at a certain temperature and pressure, how many moles will 15 liters of the same gas occupy at the same temperature and pressure?
          </Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>
            Avogadro's Law states that when pressure and temperature are constant, the volume of a gas is directly proportional to the number of moles. This can be written as
          </Text>
          <Text style={styles.answerText}>n₁/V₁ = n₂/V₂</Text>
          <Text style={styles.answerText}>
            Given that n₁ = 2 moles, V₁ = 10 L, n₂ = ?, V₂ = 15 L
          </Text>
          <Text style={styles.answerText}>Solving for n₂</Text>
          <Text style={styles.equation}>n₂ = n₁ * (V₂ / V₁)</Text>
          <Text style={styles.answerText}>n₂ = 2 moles * (15 L / 10 L) = 3 moles</Text>
          <Text style={styles.result}>
            If the volume increases by 1.5 times, the number of moles will also increase by 1.5 times.
          </Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>A sample of gas has a volume of 50.0 mL at a pressure of 1.0 atm. What is the new volume of the gas if the pressure is increased to 2.0 atm?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.equation}>P₁V₁ = P₂V₂</Text>
          <Text style={styles.answerText}>We can rearrange this equation to solve for V₂:</Text>
          <Text style={styles.equation}>V₂ = (P₁V₁) / P₂</Text>
          <Text style={styles.answerText}>Plugging in the known values, we get:</Text>
          <Text style={styles.answerText}>V₂ = (1.0 atm * 50.0 mL) / 2.0 atm = 25.0 mL</Text>
          <Text style={styles.result}>Therefore, the new volume of the gas is 25.0 mL.</Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>A sample of gas has a pressure of 1.0 atm at a temperature of 0°C. What is the new pressure of the gas if the temperature is increased to 100°C?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>
            Gay-Lussac's Law states that the pressure and temperature of a gas are directly proportional, keeping volume and amount of gas constant. Mathematically, this can be expressed as:
          </Text>
          <Text style={styles.equation}>P₁ / T₁ = P₂ / T₂</Text>
          <Text style={styles.answerText}>We can rearrange this equation to solve for P₂:</Text>
          <Text style={styles.equation}>P₂ = (P₁ * T₂) / T₁</Text>
          <Text style={styles.answerText}>Plugging in the known values, we get:</Text>
          <Text style={styles.answerText}>P₂ = (1.0 atm * 373 K) / 273 K = 1.36 atm</Text>
          <Text style={styles.result}>Therefore, the new pressure of the gas is 1.36 atm.</Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}> A sample of gas has a volume of 100.0 mL, a pressure of 1.0 atm, and a temperature of 25°C. What is the new volume of the gas if the pressure is increased to 2.0 atm and the temperature is decreased to 0°C?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>The combined gas law combines Boyle's Law, Charles's Law, and Gay-Lussac's Law into a single equation:</Text>
          <Text style={styles.equation}>PV / T = constant</Text>
          <Text style={styles.answerText}>We can use this equation to solve for the new volume of the gas:</Text>
          <Text style={styles.equation}>V₂ = (V₁ * P₂ * T₁) / (P₁ * T₂)</Text>
          <Text style={styles.answerText}>Plugging in the known values, we get:</Text>
          <Text style={styles.answerText}>V₂ = (100.0 mL * 2.0 atm * 273 K) / (1.0 atm * 373 K) = 54.6 mL</Text>
          <Text style={styles.result}>Therefore, the new volume of the gas is 54.6 mL.</Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>A 100.0 mL container is filled with a mixture of nitrogen gas and oxygen gas. The mixture contains 0.5 mole of nitrogen gas and 0.5 mole of oxygen gas. What is the partial pressure of each gas in the mixture?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>The partial pressure of a gas is the pressure that the gas would exert if it were the only gas in the container. The partial pressure of a gas in a mixture can be calculated using the following equation:</Text>
          <Text style={styles.answerText}>Partial pressure of gas = (mole fraction of gas) * (total pressure)</Text>
          <Text style={styles.answerText}>The mole fraction of nitrogen gas in the mixture is 0.5 moles / 1.0 mole = 0.5. The mole fraction of oxygen gas in the mixture is also 0.5 moles / 1.0 mole = 0.5. The total pressure of the gas mixture is 1.0 atm.</Text>
          <Text style={styles.answerText}>Therefore, the partial pressure of nitrogen gas in the mixture is:</Text>
          <Text style={styles.answerText}>Partial pressure of nitrogen gas = (0.5) * (1.0 atm) = 0.5 atm</Text>
          <Text style={styles.answerText}>The partial pressure of oxygen gas in the mixture is:</Text>
          <Text style={styles.result}>Partial pressure of oxygen gas = (0.5) * (1.0 atm) = 0.5 atm</Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>A sample of gas has a volume of 100.0 mL, a pressure of 1.0 atm, and a temperature of 25°C. What is the number of moles of gas in the sample?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>The ideal gas law can be used to calculate the number of moles of gas in a sample:</Text>
          <Text style={styles.equation}>PV = nRT</Text>
          <Text style={styles.answerText}>The ideal gas constant, R, is equal to 0.08206 L atm / mol K.</Text>
          <Text style={styles.answerText}>We can rearrange the ideal gas law to solve for n:</Text>
          <Text style={styles.equation}>n = PV / RT</Text>
          <Text style={styles.answerText}>Plugging in the known values, we get:</Text>
          <Text style={styles.answerText}>n = (1.0 atm * 100.0 mL) / (0.08206 L atm / mol K * 298 K) = 0.404 moles</Text>
          <Text style={styles.result}>Therefore, there are 0.404 moles of gas in the sample.</Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}> A 100.0 mL container is filled with a mixture of nitrogen gas and oxygen gas. The mixture contains 0.5 mole of nitrogen gas and 0.5 mole of oxygen gas. What is the total pressure of the gas mixture?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>Dalton's Law of Partial Pressures states that the total pressure of a gas mixture is equal to the sum of the partial pressures of the individual gases in the mixture. Mathematically, this can be expressed as:</Text>
          <Text style={styles.answerText}>Ptotal = P1 + P2 + P3 + ...</Text>
          <Text style={styles.answerText}>where: Ptotal is the total pressure of the gas mixture, P1, P2, P3, ... are the partial pressures of the individual gases in the mixture</Text>
          <Text style={styles.answerText}>We can calculate the partial pressure of each gas in the mixture using the following equation:</Text>
          <Text style={styles.equation}>Partial pressure of gas = (mole fraction of gas) * (total pressure)</Text>
          <Text style={styles.answerText}>The mole fraction of nitrogen gas in the mixture is 0.5 moles / 1.0 mole = 0.5. The mole fraction of oxygen gas in the mixture is also 0.5 moles / 1.0 mole = 0.5.</Text>
          <Text style={styles.answerText}>Therefore, the partial pressure of nitrogen gas in the mixture is:</Text>
          <Text style={styles.answerText}>Partial pressure of nitrogen gas = (0.5) * (Ptotal)</Text>
          <Text style={styles.answerText}>The partial pressure of oxygen gas in the mixture is:</Text>
          <Text style={styles.answerText}>Partial pressure of oxygen gas = (0.5) * (Ptotal)</Text>
          <Text style={styles.answerText}>We can now add the partial pressures of the two gases to calculate the total pressure of the gas mixture:</Text>
          <Text style={styles.equation}>Ptotal = (0.5) * (Ptotal) + (0.5) * (Ptotal)</Text>
          <Text style={styles.answerText}>Simplifying this equation, we get:</Text>
          <Text style={styles.answerText}>Ptotal = 1.0 * (Ptotal)</Text>
          <Text style={styles.result}>This means that the total pressure of the gas mixture is equal to the sum of the partial pressures of the individual gases in the mixture.</Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>A gas has a mass of 4 grams in a 10 L container at 25°C and 1 atm. What is the molar mass of the gas?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>To calculate the molar mass of the gas, we can use the ideal gas law:</Text>
          <Text style={styles.equation}>PV = nRT</Text>
          <Text style={styles.answerText}>We can rearrange the ideal gas law to solve for n:</Text>
          <Text style={styles.equation}>n = PV / RT</Text>
          <Text style={styles.answerText}>Plugging in the known values, we get:</Text>
          <Text style={styles.answerText}>n = (1 atm ⋅ 10 L) / (0.08206 L⋅atm/mol⋅K ⋅ 298 K) ≈ 0.404 moles</Text>
          <Text style={styles.answerText}>The molar mass of the gas is then calculated by dividing the mass of the gas by the number of moles:</Text>
          <Text style={styles.equation}>Molar mass = mass / moles ≈ 4 grams / 0.404 moles ≈ 9.90 grams/mole</Text>
          <Text style={styles.result}>Therefore, the molar mass of the gas is approximately 9.90 grams/mole.</Text>
        </View>
      </View>

      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>If gas A takes 2 minutes to effuse through a porous barrier, how long will it take for gas B, with a molar mass twice that of gas A, to effuse through the same barrier?</Text>
        </View>
        <View style={styles.solutionContainer}>
          <Text style={styles.lawText}>The time it takes for a gas to effuse through a porous barrier is inversely proportional to the square root of its molar mass. This can be expressed by the following equation:</Text>
          <Text style={styles.equation}>t₁ / t₂ = √(M₂ / M₁)</Text>
          <Text style={styles.answerText}>where: t₁ is the time it takes for gas A to effuse through the barrier, t₂ is the time it takes for gas B to effuse through the barrier, M₁ is the molar mass of gas A, M₂ is the molar mass of gas B</Text>
          <Text style={styles.answerText}>We know that the molar mass of gas B is twice that of gas A, so we can substitute M₂ = 2M₁ into the equation above. This gives us:</Text>
          <Text style={styles.equation}>t₁ / t₂ = √(2M₁ / M₁) = √2</Text>
          <Text style={styles.answerText}>We also know that t₁ = 2 minutes. Therefore, t₂ can be calculated as follows:</Text>
          <Text style={styles.equation}>t₂ = t₁ / √2 ≈ 2 minutes / √2 ≈ 1.41 minutes</Text>
          <Text style={styles.answerText}>Therefore, it will take approximately 1.41 minutes for gas B to effuse through the porous barrier.</Text>
          <Text style={styles.result}>Answer: Approximately 1.41 minutes</Text>
        </View>
      </View>


      <View style={styles.problemContainer}>
        <View style={styles.questBack}>
          <Text style={styles.problemText}>A gas occupies 5 liters at 3 atm. If the pressure is decreased to 2 atm, what will be the new volume? (Assume constant temperature)</Text>
          <Text style={styles.answerText}>7.5 liters</Text>
          <Text style={styles.problemText}>A gas occupies 2 liters at 400 K. What will be its volume at 800 K, assuming constant pressure?</Text>
          <Text style={styles.answerText}>4 liters</Text>
          <Text style={styles.problemText}>If 3 moles of a gas occupy 15 liters at a certain temperature and pressure, how many moles will 9 liters of the same gas occupy at the same temperature and pressure?</Text>
          <Text style={styles.answerText}>2 moles</Text>
          <Text style={styles.problemText}>A gas initially occupies 2 liters at 1 atm and 300 K with 1 mole. What will be its final volume at 3 atm and 500 K with 2 moles?</Text>
          <Text style={styles.answerText}>4 liters</Text>
          <Text style={styles.problemText}>How many moles of a gas are in a 10 L container at 3 atm and 400 K? (Assume R is known)</Text>
          <Text style={styles.answerText}> 1.5 moles</Text>
          <Text style={styles.problemText}>If gas A diffuses 3 times faster than gas B, what is the ratio of their molar masses?</Text>
          <Text style={styles.answerText}>1:9</Text>
          <Text style={styles.problemText}>A mixture contains 2 moles of oxygen and 3 moles of nitrogen at a total pressure of 4 atm. What is the partial pressure of nitrogen?</Text>
          <Text style={styles.answerText}>1.8 atm</Text>
          <Text style={styles.problemText}>If a gas has a density of 3 kg/m³ at 2 atm and 400 K, what is its mass in a 12 L container?</Text>
          <Text style={styles.answerText}>7.7 liters</Text>
          <Text style={styles.problemText}>If a gas has a density of 3 kg/m³ at 2 atm and 400 K, what is its mass in a 12 L container?</Text>
          <Text style={styles.answerText}>3.6 kg</Text>
          <Text style={styles.problemText}>If gas A takes 4 minutes to effuse through a porous barrier, how long will it take for gas B, with a molar mass half that of gas A, to effuse through the same barrier?</Text>
          <Text style={styles.answerText}>2 minutes</Text>
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
    backgroundColor: '#E1D9D1', // Cream Background
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#268BD2', // Bright Blue
  },
  problemContainer: {
    marginBottom: 24,
    backgroundColor: '#FAF9F6', // White Background
    borderRadius: 10,
    padding: 16,
    elevation: 5, // Add a slight shadow for depth
  },
  problemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  problemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D9534F', // Red
    marginRight: 8,
    paddingBottom: 10,
    marginTop: 10,
  },
  solutionContainer: {
    marginTop: 12,
    alignItems: 'center',
    },
  lawText: {
    fontSize: 20,
    marginBottom: 8,
    color: '#2E8B57', // Sea Green
  },
  equation: {
    fontSize: 18,
    color: '#FF6347', // Tomato Red
    marginBottom: 4,
  },
  calculation: {
    fontSize: 17,
    marginBottom: 4,
    color: '#CE805A', // Sea Green
  },
  result: {
    fontSize: 21,
    color: '#268BD2', // Bright Blue
    marginTop: 8,
  },
  answerText: {
    padding: 5
  }
});

export default Gases;