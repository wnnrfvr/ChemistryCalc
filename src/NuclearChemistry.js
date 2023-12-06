import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';
const NuclearChemistry = () => {


  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.top}>Nuclear Chemistry</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 1:</Text>
        <Text style={styles.questionText}>Calculate the binding energy of a helium-4 nucleus given that the atomic mass is 4.0026 u.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>The binding energy (BE) can be calculated using the Einstein's mass-energy equivalence principle (E=mc²):</Text>
        <Text style={styles.formulaText}>BE = (Δm)c²</Text>
        <Text style={styles.formulaText}>Δm = (Atomic mass - Mass of individual nucleons)</Text>
        <Text style={styles.answerText}>= (4.0026 u - 4 u)</Text>
        <Text style={styles.answerText}>= 0.0026 u</Text>
        <Text style={styles.formulaText}>BE = (0.0026 u)(931.5 MeV/u) ≈ 2.43 MeV</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 2:</Text>
        <Text style={styles.questionText}>Determine the decay constant (λ) for a radioactive isotope with a half-life of 10 days.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.formulaText}>Use the formula: λ = ln(2) / (T₁/₂)</Text>
        <Text style={styles.answerText}>λ = ln(2) / (10 days)</Text>
        <Text style={styles.answers}>≈ 0.0693 days⁻¹</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 3:</Text>
        <Text style={styles.questionText}>Calculate the energy released in the decay of 1 gram of U-238 to Pb-206 Given U-238 has a half-life of 4.468 billion years</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>Use the equation for energy released (E) in a nuclear reaction:</Text>
        <Text style={styles.formulaText}>E = (Δm)c²</Text>
        <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
        <Text style={styles.answerText}>= (238 g/mol - 206 g/mol)</Text>
        <Text style={styles.answerText}>= 32 g/mol</Text>
        <Text style={styles.answers}>E = (32 g)(c²) ≈ 2.88 x 10¹⁶ J</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 4:</Text>
        <Text style={styles.questionText}> Calculate the energy released in a fission reaction of 1 kg of U-235 given that each fission releases about 200 MeV.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>Energy released per fission (E) is given. Number of fissions (n) can be calculated using Avogadro's number.</Text>
        <Text style={styles.formulaText}>n = (1 kg / molar mass of U-235) * Avogadro's number</Text>
        <Text style={styles.answerText}>(1000 g / 235 g/mol) * 6.0221 x 10^23 nuclei/mol  ≈2.57 x 10^24 nuclei</Text>
        <Text style={styles.formulaText}>Total energy released (E_total) = E per fission * n</Text>
        <Text style={styles.answerText}>≈ (200 MeV/fission) * 2.57 x 10^24 fissions</Text>
        <Text style={styles.answers}>5.14 * 10^26 Mev</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 5:</Text>
        <Text style={styles.questionText}>Calculate the decay constant for a sample of ¹⁴C with an activity of 3.15 x 10¹² decays per second.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>Use the relation: Activity (A) = λ * N</Text>
        <Text style={styles.formulaText}>λ = A / N</Text>
        <Text style={styles.answerText}>= 3.15 x 10¹² decays per second / 6.0221 x 10²³ nuclei/mol</Text>
        <Text style={styles.answers}>≈ 5.23 x 10⁻¹³ s⁻¹</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 6:</Text>
        <Text style={styles.questionText}>Determine the energy of an alpha particle (He⁴⁺) emitted during a decay if it has a kinetic energy of 5 MeV.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>The total energy of an alpha particle is the sum of its rest mass energy and its kinetic energy.</Text>
        <Text style={styles.formulaText}>Total energy (E) = Rest mass energy (mc²) + Kinetic energy</Text>
        <Text style={styles.answerText}>= (4 u)(931.5 MeV/u) + 5 MeV</Text>
        <Text style={styles.answers}>≈ 3746 MeV</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 7:</Text>
        <Text style={styles.questionText}>Calculate the half-life of a radioactive isotope with a decay constant of 2 x 10⁻⁵ s⁻¹</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>λ = ln(2) / (T₁/₂)</Text>
        <Text style={styles.formulaText}>(T₁/₂) = ln(2) / λ </Text>
        <Text style={styles.answerText}>≈ ln(2) / 2 x 10⁻⁵ s⁻¹</Text>
        <Text style={styles.answerText}>≈ 3.47 x 10⁴ s</Text>
        <Text style={styles.answers}>about 9.63 hours.</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 8:</Text>
        <Text style={styles.questionText}>Calculate the energy released in a β⁻ decay of P-32 to S-32 if the atomic masses are 31.9739 u and 31.9721 u, respectively.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>Use the equation for energy released in a nuclear reaction (E = Δmc²).</Text>
        <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
        <Text style={styles.answerText}>= (31.9739 u - 31.9721 u)</Text>
        <Text style={styles.answerText}>≈ 0.0018 u</Text>
        <Text style={styles.answerText}>E = (0.0018 u)(931.5 MeV/u)</Text>
        <Text style={styles.answers}>≈ 1.68 MeV</Text>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 9:</Text>
        <Text style={styles.questionText}>Calculate the energy required to remove a proton from a Fe-56 nucleus, given that the atomic mass is 55.9349 u.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>Since removing a proton changes the element, we're looking for the energy equivalent to the difference in mass between Fe-56 and Fe-55</Text>
        <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
        <Text style={styles.answerText}>= (55.9349 u - 55.9349 u)</Text>
        <Text style={styles.answerText}>= 0 u</Text>
        <Text style={styles.answers}>The energy required is zero, as the mass is both equal</Text>
    
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>Question 10:</Text>
        <Text style={styles.questionText}>Determine the energy released in the decay of 1 mole of Co-60 to Ni-60,  given that the atomic masses are 59.9338 u and 59.9318 u, respectively.</Text>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.heading}>Use the equation for energy released in a nuclear reaction (E = Δmc²).</Text>
        <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
        <Text style={styles.answerText}>= (59.9338 u - 59.9318 u)</Text>
        <Text style={styles.answerText}>≈ 0.002 u</Text>
        <Text style={styles.answerText}>E = (0.002 u)(931.5 MeV/u)</Text>
        <Text style={styles.answers}>≈ 1.86 MeV</Text>
      </View>
      <View style={styles.questionContainer}>
  <Text style={styles.question}>Question 11:</Text>
  <Text style={styles.questionText}>Calculate the energy released in the fusion of 1 gram of deuterium (D₂) to form He-4</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>The energy released is the difference in mass-energy between the reactants and products:</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>= (2 g/mol + 2 g/mol - 4 g/mol)</Text>
  <Text style={styles.answerText}>= 0 g/mol</Text>
  <Text style={styles.answerText}>E = (0 g)(c²)</Text>
  <Text style={styles.answers}>= 0 MeV</Text>
</View>
<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 12:</Text>
  <Text style={styles.questionText}>Determine the activity of a I-131 sample with a half-life of 8 days, if it initially contained 2 x 10² atoms</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the decay equation:</Text>
  <Text style={styles.formulaText}>N(t) = N₀e^(-λt)</Text>
  <Text style={styles.formulaText}>Activity (A) at time t is given by A = λN(t)</Text>
  <Text style={styles.answerText}>t = 8 days, N₀ = 2 x 10² atoms, λ = (ln2)/8</Text>
  <Text style={styles.answerText}>N(t) = 2 x 10²e^(-((ln2)/8) * 8)</Text>
  <Text style={styles.answerText}>2 x 10² atoms</Text>
  <Text style={styles.answerText}>A = λN(t) = (ln2)/8 * 2 x 10²</Text>
  <Text style={styles.answers}>1.73 x 10¹¹ atoms/day</Text>
</View>
<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 13:</Text>
  <Text style={styles.questionText}>Calculate the energy released in a neutron capture reaction, where a neutron is captured by U-235 to form U-236, Given atomic masses of 235.0439 u and 236.0456 u.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.answerText}>Use the equation for energy released in a nuclear reaction (E = Δmc²).</Text>
  <Text style={styles.answerText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>= (236.0456 u - 235.0439 u)</Text>
  <Text style={styles.answerText}>≈ 1.0017 u</Text>
  <Text style={styles.answerText}>E = 1.0017 u * 931.5 MeV/u</Text>
  <Text style={styles.answers}>≈ 935.6 MeV</Text>
</View>
<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 14:</Text>
  <Text style={styles.questionText}>Determine the activity of a ⁹⁹ᵐTc sample with an initial activity of 1 x 10⁹ decays per second. Given that ⁹⁹ᵐTc has a half-life of 6 hours.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the decay equation:</Text>
  <Text style={styles.formulaText}>N(t) = N₀e^(-λt)</Text>
  <Text style={styles.formulaText}>Activity (A) at time t is given by A = λN(t)</Text>
  <Text style={styles.answerText}>t = 6 hours, N₀ = 1 x 10⁹ decays/s, λ = (ln2)/6</Text>
  <Text style={styles.answerText}>N(t) = 1 x 10⁹e^(-((ln2)/6) * 6)</Text>
  <Text style={styles.answerText}>1 x 10⁹ decays/s</Text>
  <Text style={styles.answerText}>A = λN(t) = (ln2)/6 * 1 x 10⁹</Text>
  <Text style={styles.answers}>1.15 x 10⁸ decays/s</Text>
</View>


<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 15:</Text>
  <Text style={styles.questionText}>Calculate the binding energy per nucleon for a nucleus with a mass number of 56 and a binding energy of 500 MeV.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>To calculate the binding energy per nucleon (BE/A), divide the total binding energy (BE) by the mass number (A).</Text>
  <Text style={styles.answerText}>BE/A = 500 MeV / 56</Text>
  <Text style={styles.answers}>≈ 8.93 MeV/nucleon</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 16:</Text>
  <Text style={styles.questionText}>A sample of P-32 has an initial activity of 1 x 10⁶ decays per second. If the half-life of P-32 is 14.3 days, what will be its activity after 30 days?</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the decay equation:</Text>
  <Text style={styles.formulaText}>N(t) = N₀e^(-λt)</Text>
  <Text style={styles.answerText}>t = 30 days, N₀ = 1 x 10⁶ decays/s, λ = (ln2) / 14.3 days</Text>
  <Text style={styles.answerText}>N(t) = 1 x 10⁶e^(-((ln2) / 14.3) * 30)</Text>
  <Text style={styles.answers}>≈ 4.92 x 10⁵ decays/s</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 17:</Text>
  <Text style={styles.questionText}>Calculate the energy released in the alpha decay of U-238 to Th-234, given that the atomic masses are 238.0508 u and 234.0436 u, respectively.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the equation for energy released in a nuclear reaction (E = Δmc²).</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>= (238.0508 u - 234.0436 u)</Text>
  <Text style={styles.answerText}>≈ 4.0072 u</Text>
  <Text style={styles.answerText}>E = 4.0072 u * 931.5 MeV/u</Text>
  <Text style={styles.answers}>≈ 3737.9 MeV</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 19:</Text>
  <Text style={styles.questionText}>Determine the energy released in the fusion of two deuterium nuclei (D₂) to form a helium-4 nucleus.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>The energy released in the fusion of two deuterium nuclei to form helium-4 is given by the equation:</Text>
  <Text style={styles.formulaText}>E = (Δm)c²</Text>
  <Text style={styles.answerText}>Where Δm is the change in mass between the reactants and products.</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>≈ (4.0321 u - 2.0141 u)</Text>
  <Text style={styles.answerText}>≈ 2.0180 u</Text>
  <Text style={styles.answerText}>E = 2.0180 u * 931.5 MeV/u</Text>
  <Text style={styles.answers}>≈ 1880.8 MeV</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 20:</Text>
  <Text style={styles.questionText}>If a P-32 sample has an initial activity of 3 x 10⁶ decays per second and after 20 days its activity decreases to 1.5 x 10⁶ decays per second, what is its half-life?</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>You can calculate the half-life (T½) using the formula:</Text>
  <Text style={styles.formulaText}>T½ = (ln(2) * t) / ln(N₀ / N(t))</Text>
  <Text style={styles.answerText}>Where t = 20 days, N₀ = 3 x 10⁶ decays/s, and N(t) = 1.5 x 10⁶ decays/s</Text>
  <Text style={styles.answerText}>T½ = (ln(2) * 20) / ln(3 x 10⁶ / 1.5 x 10⁶)</Text>
  <Text style={styles.answers}>≈ 15.15 days</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 21:</Text>
  <Text style={styles.questionText}>Calculate the energy released in the beta-minus decay of C-14 to N-14, given atomic masses of 14.0032 u and 14.0031 u, respectively.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>The energy released in the beta-minus decay is given by the equation:</Text>
  <Text style={styles.formulaText}>E = Δmc²</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>≈ (14.0032 u - 14.0031 u)</Text>
  <Text style={styles.answerText}>≈ 0.0001 u</Text>
  <Text style={styles.answerText}>E = 0.0001 u * 931.5 MeV/u</Text>
  <Text style={styles.answers}>≈ 0.09315 MeV</Text>
</View>

{/* Questions 22, 23, 24, and 25 are left empty. You can fill them with your content. */}


      


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
    backgroundColor: '#aa6c39',
    marginBottom: 50
  },
  adContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  top: {
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 30,

    color: "#312659",
    margin: 30
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  questionContainer: {
    backgroundColor: '#B6A766',
    padding: 10,
    marginBottom: 7,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000000'
  },
  answerContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    elevation: 4,
    shadowColor: 'grey',
    marginBottom: 15,
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  answers: {
    fontSize: 19,
    marginTop: 5,
    color: '#140C5C',
    fontWeight: 'heavy'
  },
  formulaText: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#D71920',
  },
  answerText: {
    margin: 7,
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: 'semibold'
  }
});

export default NuclearChemistry;
