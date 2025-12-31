
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { GamificationManager } from './GamificationManager';

const TERMS = [
    // Fundamentals
    { id: '1', term: 'Acid', def: 'A substance that donates protons (H⁺) in solution. Examples: HCl, H₂SO₄' },
    { id: '2', term: 'Base', def: 'A substance that accepts protons or releases hydroxide ions (OH⁻). Examples: NaOH, NH₃' },
    { id: '3', term: 'Mole', def: 'Unit of amount of substance equal to 6.022×10²³ particles (Avogadro\'s number).' },
    { id: '4', term: 'Atom', def: 'The smallest unit of an element that retains its chemical properties.' },
    { id: '5', term: 'Molecule', def: 'Two or more atoms chemically bonded together.' },
    { id: '6', term: 'Ion', def: 'An atom or molecule with a net electric charge due to loss or gain of electrons.' },
    { id: '7', term: 'Isotope', def: 'Atoms of the same element with different numbers of neutrons (same Z, different A).' },
    { id: '8', term: 'Element', def: 'A pure substance made of only one type of atom.' },
    { id: '9', term: 'Compound', def: 'A substance made of two or more different elements chemically bonded.' },
    { id: '10', term: 'Mixture', def: 'A combination of substances not chemically bonded.' },

    // Bonding
    { id: '11', term: 'Covalent Bond', def: 'A bond formed by sharing electron pairs between atoms.' },
    { id: '12', term: 'Ionic Bond', def: 'A bond formed by electrostatic attraction between oppositely charged ions.' },
    { id: '13', term: 'Metallic Bond', def: 'A bond formed by a "sea" of delocalized electrons between metal atoms.' },
    { id: '14', term: 'Hydrogen Bond', def: 'A weak intermolecular force between H and electronegative atoms (N, O, F).' },
    { id: '15', term: 'Electronegativity', def: 'The ability of an atom to attract bonding electrons toward itself.' },
    { id: '16', term: 'Valence Electron', def: 'Electrons in the outermost shell that participate in bonding.' },

    // Reactions
    { id: '17', term: 'Catalyst', def: 'A substance that speeds up a reaction without being consumed.' },
    { id: '18', term: 'Stoichiometry', def: 'The calculation of reactants and products in chemical reactions.' },
    { id: '19', term: 'Limiting Reagent', def: 'The reactant that is completely consumed first, limiting the product formed.' },
    { id: '20', term: 'Oxidation', def: 'Loss of electrons (increase in oxidation state). "OIL RIG"' },
    { id: '21', term: 'Reduction', def: 'Gain of electrons (decrease in oxidation state). "OIL RIG"' },
    { id: '22', term: 'Redox Reaction', def: 'A reaction involving both oxidation and reduction.' },
    { id: '23', term: 'Precipitation', def: 'Formation of an insoluble solid from a solution.' },

    // Solutions
    { id: '24', term: 'Molarity (M)', def: 'Concentration unit: moles of solute per liter of solution.' },
    { id: '25', term: 'Solute', def: 'The substance that is dissolved in a solution.' },
    { id: '26', term: 'Solvent', def: 'The substance that dissolves the solute (usually the larger component).' },
    { id: '27', term: 'Saturation', def: 'The point at which no more solute can dissolve in a solution.' },
    { id: '28', term: 'Dilution', def: 'Adding more solvent to decrease concentration.' },

    // Acids & Bases
    { id: '29', term: 'pH', def: 'Measure of acidity: pH = -log[H⁺]. pH 7 is neutral.' },
    { id: '30', term: 'pOH', def: 'Measure of basicity: pOH = -log[OH⁻]. pH + pOH = 14 at 25°C.' },
    { id: '31', term: 'Buffer', def: 'A solution that resists pH change when small amounts of acid/base are added.' },
    { id: '32', term: 'Neutralization', def: 'A reaction between an acid and base producing salt and water.' },
    { id: '33', term: 'Salt', def: 'An ionic compound formed from a neutralization reaction.' },

    // Thermodynamics
    { id: '34', term: 'Enthalpy (ΔH)', def: 'Heat change at constant pressure. Negative = exothermic.' },
    { id: '35', term: 'Entropy (ΔS)', def: 'Measure of disorder. Higher entropy = more disorder.' },
    { id: '36', term: 'Gibbs Free Energy (ΔG)', def: 'ΔG = ΔH - TΔS. Negative ΔG = spontaneous reaction.' },
    { id: '37', term: 'Exothermic', def: 'A reaction that releases heat to surroundings (ΔH < 0).' },
    { id: '38', term: 'Endothermic', def: 'A reaction that absorbs heat from surroundings (ΔH > 0).' },
    { id: '39', term: 'Specific Heat', def: 'Energy required to raise 1g of a substance by 1°C.' },

    // Gases
    { id: '40', term: 'Ideal Gas', def: 'A theoretical gas that perfectly follows PV = nRT.' },
    { id: '41', term: 'STP', def: 'Standard Temperature and Pressure: 0°C (273K) and 1 atm.' },
    { id: '42', term: 'RTP', def: 'Room Temperature and Pressure: 25°C (298K) and 1 atm.' },
    { id: '43', term: 'Partial Pressure', def: 'The pressure exerted by one gas in a mixture of gases.' },

    // Electrochemistry
    { id: '44', term: 'Electrolysis', def: 'Using electricity to drive a non-spontaneous chemical reaction.' },
    { id: '45', term: 'Anode', def: 'The electrode where oxidation occurs.' },
    { id: '46', term: 'Cathode', def: 'The electrode where reduction occurs.' },
    { id: '47', term: 'Faraday Constant', def: 'The charge of 1 mole of electrons: 96,485 C/mol.' },

    // Nuclear
    { id: '48', term: 'Half-life', def: 'Time for half of a radioactive sample to decay.' },
    { id: '49', term: 'Alpha Particle', def: 'A helium nucleus (²⁴He) emitted in radioactive decay.' },
    { id: '50', term: 'Beta Particle', def: 'An electron (β⁻) or positron (β⁺) emitted in decay.' },
];

const GlossaryScreen = () => {
    const [search, setSearch] = useState('');

    const filteredTerms = TERMS.filter(item =>
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.def.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Search Term..."
                    placeholderTextColor="#666"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={filteredTerms}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => GamificationManager.recordAction('READ', 'Glossary')}
                    >
                        <Text style={styles.term}>{item.term}</Text>
                        <Text style={styles.def}>{item.def}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={styles.empty}>No terms found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#02060f', padding: 20 },
    searchBox: { flexDirection: 'row', backgroundColor: '#0d1424', borderRadius: 10, padding: 10, alignItems: 'center', marginBottom: 20 },
    searchIcon: { fontSize: 18, marginRight: 10 },
    input: { color: '#fff', fontSize: 16, flex: 1 },
    list: { paddingBottom: 20 },
    card: { backgroundColor: '#111', padding: 15, marginBottom: 10, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#00eaff' },
    term: { color: '#00eaff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    def: { color: '#ccc', fontSize: 14, lineHeight: 20 },
    empty: { color: '#666', textAlign: 'center', marginTop: 50 }
});

export default GlossaryScreen;
