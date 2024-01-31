import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';
const NuclearChemistry = () => {


  return (
    <>
    <ScrollView style={styles.container}>
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

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 22:</Text>
  <Text style={styles.questionText}>If a radioactive sample has an initial activity of 2 x 10⁷ decays per second and its activity decreases to 5 x 10⁶ decays per second after 24 hours, what is the decay constant (λ)?</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the decay equation:</Text>
  <Text style={styles.formulaText}>N(t) = N₀e^(-λt)</Text>
  <Text style={styles.answerText}>Where N₀ = 2 x 10⁷ decays/s, N(t) = 5 x 10⁶ decays/s, and t = 24 hours.</Text>
  <Text style={styles.answerText}>Solve for λ in the equation 5 x 10⁶ = 2 x 10⁷e^(-λ * 24)</Text>
  <Text style={styles.answers}>≈ 0.0287 per hour</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 23:</Text>
  <Text style={styles.questionText}>Calculate the frequency of a photon emitted during the transition of an electron from n = 3 to n = 2 energy level in a hydrogen atom. Given that the Rydberg constant is approximately 1.097 x 10⁷ per meter.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the Rydberg formula for the frequency (ν) of a photon:</Text>
  <Text style={styles.formulaText}>ν = R_H * (1/n₁² - 1/n₂²)</Text>
  <Text style={styles.answerText}>Where n₁ = 3, n₂ = 2, and R_H = 1.097 x 10⁷ per meter.</Text>
  <Text style={styles.answers}>≈ 2.466 x 10¹⁵ Hz</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 24:</Text>
  <Text style={styles.questionText}>Determine the final speed of an electron that undergoes an acceleration from rest through a potential difference of 100 volts.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the equation for the kinetic energy of a charged particle:</Text>
  <Text style={styles.formulaText}>KE = eV</Text>
  <Text style={styles.answerText}>Where e is the elementary charge (approximately 1.602 x 10⁻¹⁹ coulombs) and V is the potential difference (100 volts).</Text>
  <Text style={styles.answers}>≈ 1.602 x 10⁻¹⁷ J</Text>
  <Text style={styles.answerText}>Use the kinetic energy to find the final speed using the equation KE = (1/2)mv².</Text>
  <Text style={styles.answers}>≈ 5.02 x 10⁶ m/s</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 25:</Text>
  <Text style={styles.questionText}>Calculate the wavelength of a photon with energy 3.0 x 10⁻¹⁸ joules.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the energy-wavelength relationship for photons:</Text>
  <Text style={styles.formulaText}>E = hν = hc/λ</Text>
  <Text style={styles.answerText}>Where h is the Planck constant (approximately 6.626 x 10⁻³⁴ J·s), c is the speed of light (approximately 3.00 x 10⁸ m/s), and λ is the wavelength.</Text>
  <Text style={styles.answers}>≈ 6.63 x 10⁻⁷ meters</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 26:</Text>
  <Text style={styles.questionText}>A proton is accelerated through a potential difference of 500 volts. Calculate its final kinetic energy.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the equation for the kinetic energy of a charged particle:</Text>
  <Text style={styles.formulaText}>KE = eV</Text>
  <Text style={styles.answerText}>Where e is the elementary charge (approximately 1.602 x 10⁻¹⁹ coulombs) and V is the potential difference (500 volts).</Text>
  <Text style={styles.answers}>≈ 8.01 x 10⁻¹⁶ J</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 27:</Text>
  <Text style={styles.questionText}>For the nuclear reaction C-14 → N-14 + e⁻ + νₑ, calculate the Q-value of the reaction given the atomic masses of C-14, N-14, and the electron as 14.0032 u, 14.0031 u, and 0.00054857 u, respectively.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the Q-value equation for beta decay:</Text>
  <Text style={styles.formulaText}>Q = (M_initial - M_final - me) * c²</Text>
  <Text style={styles.answerText}>Where M_initial and M_final are the atomic masses of the initial and final nuclei, and me is the mass of the emitted electron.</Text>
  <Text style={styles.answerText}>(14.0032 u - 14.0031 u - 0.00054857 u) * (931.5 MeV/u)</Text>
  <Text style={styles.answers}>≈ 0.784 MeV</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 28:</Text>
  <Text style={styles.questionText}>In the context of nuclear reactions, explain the concept of the resonance phenomenon and its significance.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Provide a detailed explanation of resonance in nuclear reactions, discussing how it affects reaction cross-sections and the conditions for resonance to occur.</Text>
  <Text style={styles.answerText}>Discuss the importance of resonance in astrophysical processes and nuclear energy applications.</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 29:</Text>
  <Text style={styles.questionText}>Calculate the decay constant (λ) for the radioactive isotope Ra-226, which has a half-life of 1600 years.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the relation between half-life and decay constant:</Text>
  <Text style={styles.formulaText}>λ = ln(2) / T½</Text>
  <Text style={styles.answerText}>Where T½ is the half-life of the isotope.</Text>
  <Text style={styles.answerText}>λ = ln(2) / 1600 years</Text>
  <Text style={styles.answers}>≈ 4.34 x 10⁻⁴ years⁻¹</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 30:</Text>
  <Text style={styles.questionText}>A nuclear reactor operates with a power output of 1000 MW. If the reactor's fuel has an energy release of 200 MeV per fission event, calculate the rate of fission events per second.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the relation between power, energy, and the rate of events:</Text>
  <Text style={styles.formulaText}>Power = Rate of events * Energy per event</Text>
  <Text style={styles.answerText}>Convert power to energy per second and solve for the rate of fission events.</Text>
  <Text style={styles.answers}>Rate of events ≈ 3.16 x 10¹⁷ fissions/s</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 31:</Text>
  <Text style={styles.questionText}>Explain the concept of nuclear isomerism, citing an example of a nuclide that exhibits isomeric transitions.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Provide a detailed explanation of nuclear isomerism, discussing the characteristics of isomeric transitions, and give an example of a nuclide with isomeric states.</Text>
  <Text style={styles.answerText}>Discuss the applications of nuclear isomers in various fields, such as medicine and industry.</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 32:</Text>
  <Text style={styles.questionText}>Calculate the energy released in the fusion reaction between two deuterium nuclei (D) to form helium-3 (He-3) and a neutron (n). Given atomic masses of 2.0141 u, 2.0141 u, 3.0160 u, and 1.0087 u for D, D, He-3, and n, respectively.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the equation for energy released in a nuclear reaction (E = Δmc²).</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>Calculate the change in mass and then use E = Δmc² to find the energy released.</Text>
  <Text style={styles.answers}>≈ 4.03 MeV</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 33:</Text>
  <Text style={styles.questionText}>Determine the total energy released in the beta-plus decay of K-40 to Ca-40, given atomic masses of 39.9631 u and 39.9626 u, respectively.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the equation for energy released in a nuclear reaction (E = Δmc²).</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>= (39.9631 u - 39.9626 u)</Text>
  <Text style={styles.answerText}>≈ 0.0005 u</Text>
  <Text style={styles.answerText}>E = 0.0005 u * 931.5 MeV/u</Text>
  <Text style={styles.answers}>≈ 0.47 MeV</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 34:</Text>
  <Text style={styles.questionText}>Calculate the energy released in the alpha decay of Pu-239 to U-235, given atomic masses of 239.0522 u and 235.0439 u, respectively.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the equation for energy released in a nuclear reaction (E = Δmc²).</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>= (239.0522 u - 235.0439 u)</Text>
  <Text style={styles.answerText}>≈ 4.0083 u</Text>
  <Text style={styles.answerText}>E = 4.0083 u * 931.5 MeV/u</Text>
  <Text style={styles.answers}>≈ 3738.9 MeV</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 35:</Text>
  <Text style={styles.questionText}>A sample of Sr-90 has an initial activity of 2 x 10⁸ decays per second. If the half-life of Sr-90 is 28 years, calculate its activity after 50 years.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the decay equation:</Text>
  <Text style={styles.formulaText}>N(t) = N₀e^(-λt)</Text>
  <Text style={styles.answerText}>t = 50 years, N₀ = 2 x 10⁸ decays/s, λ = (ln2) / 28 years</Text>
  <Text style={styles.answerText}>N(t) = 2 x 10⁸e^(-((ln2) / 28) * 50)</Text>
  <Text style={styles.answers}>≈ 3.59 x 10⁷ decays/s</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 36:</Text>
  <Text style={styles.questionText}>Calculate the energy released in the spontaneous fission of Cf-252 into various fission products, given an atomic mass of 252.0816 u.</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the equation for energy released in fission (E = Δmc²).</Text>
  <Text style={styles.formulaText}>Δm = (Initial mass - Final mass)</Text>
  <Text style={styles.answerText}>= (252.0816 u - ∑(masses of fission products))</Text>
  <Text style={styles.answerText}>Calculate the change in mass and use E = Δmc² to find the energy released.</Text>
  <Text style={styles.answers}>[Resulting energy in MeV]</Text>
</View>

<View style={styles.questionContainer}>
  <Text style={styles.question}>Question 37:</Text>
  <Text style={styles.questionText}>If a radioactive sample has an initial activity of 5 x 10¹⁰ decays per second and after 10 hours its activity decreases to 1 x 10⁸ decays per second, calculate the decay constant (λ).</Text>
</View>
<View style={styles.answerContainer}>
  <Text style={styles.heading}>Use the decay equation:</Text>
  <Text style={styles.formulaText}>N(t) = N₀e^(-λt)</Text>
  <Text style={styles.answerText}>t = 10 hours, N₀ = 5 x 10¹⁰ decays/s, and N(t) = 1 x 10⁸ decays/s</Text>
  <Text style={styles.answerText}>Solve for λ in the equation 1 x 10⁸ = 5 x 10¹⁰e^(-λ * 10)</Text>
  <Text style={styles.answers}>[Resulting λ value]</Text>
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
