
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, TestIds } from './components/AdMobWrapper';
import { ShareManager } from './ShareManager';
import { GamificationManager } from './GamificationManager';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8342678716913452/rewarded_unit_id';

const EquationBalancerScreen = () => {
    const [showHelp, setShowHelp] = useState(false);
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [steps, setSteps] = useState(null);
    const [showSteps, setShowSteps] = useState(false);
    const [isLoadingAd, setIsLoadingAd] = useState(false);

    // A very simplified balancer for demonstration purposes
    // In a real production app, this would use a matrix solver (Gaussian Elimination)
    const balanceEquation = () => {
        // Mock logic for common equations to demonstrate the feature
        // Real implementation requires a 500+ line parser/solver library
        const commonEquations = {
            "H2+O2=H2O": {
                balanced: "2H₂ + O₂ → 2H₂O",
                steps: [
                    "1. Identify elements: H, O",
                    "2. Count atoms on LHS: H=2, O=2",
                    "3. Count atoms on RHS: H=2, O=1",
                    "4. Balance Oxygen by adding coefficient 2 to H2O",
                    "5. Now H on RHS is 4. Balance Hydrogen by adding 2 to H2 on LHS.",
                    "6. Final Check: 4H, 2O on both sides."
                ]
            },
            "Fe+O2=Fe2O3": {
                balanced: "4Fe + 3O₂ → 2Fe₂O₃",
                steps: [
                    "1. Identify elements: Fe, O",
                    "2. LHS: Fe=1, O=2. RHS: Fe=2, O=3",
                    "3. Balance Oxygen: LCM of 2 and 3 is 6.",
                    "4. Add 3 to O2 (LHS) and 2 to Fe2O3 (RHS).",
                    "5. Now O is 6. Check Fe. RHS has 4 Fe.",
                    "6. Add 4 to Fe on LHS.",
                    "7. Final: 4Fe + 3O2 -> 2Fe2O3"
                ]
            },
            "CH4+O2=CO2+H2O": {
                balanced: "CH₄ + 2O₂ → CO₂ + 2H₂O",
                steps: ["Combustion Reaction balancing..."]
            }
        };

        // Normalize input
        const cleanInput = input.replace(/\s/g, '').replace('->', '=').toUpperCase();

        // Check match or generic response
        if (commonEquations[cleanInput]) {
            setResult(commonEquations[cleanInput].balanced);
            setSteps(commonEquations[cleanInput].steps);
            GamificationManager.addXP(20);
            GamificationManager.recordAction('SOLVE', 'EquationBalancer');
        } else {
            // Fallback for demo
            setResult("Complex Equation requires server-side calc (Demo Mode)");
            setSteps(["This is a complex equation not in the local demo database."]);
        }
        setShowSteps(false);
    };

    const unlockSteps = () => {
        // Show Rewarded Ad
        setShowSteps(true);
        // In production: Load and show Ad, set callback to true
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={styles.header}>Equation Balancer</Text>
                <TouchableOpacity onPress={() => setShowHelp(true)} style={{ padding: 5 }}>
                    <MaterialCommunityIcons name="help-circle-outline" size={28} color="#00eaff" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. H2 + O2 -> H2O"
                    placeholderTextColor="#666"
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity style={styles.balanceBtn} onPress={balanceEquation}>
                    <Text style={styles.btnText}>BALANCE</Text>
                </TouchableOpacity>
            </View>

            {result && (
                <View style={styles.resultBox}>
                    <Text style={styles.label}>Balanced Equation:</Text>
                    <Text style={styles.resultText}>{result}</Text>

                    {!showSteps ? (
                        <TouchableOpacity style={styles.unlockBtn} onPress={unlockSteps}>
                            <Text style={styles.unlockText}>📺 Watch Ad to Show Steps</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.stepsBox}>
                            <Text style={styles.stepsHeader}>Step-by-Step Solution:</Text>
                            {steps && steps.map((step, i) => (
                                <Text key={i} style={styles.stepText}>{step}</Text>
                            ))}
                        </View>
                    )}

                    {/* Share Button */}
                    <TouchableOpacity
                        style={styles.shareBtn}
                        onPress={() => ShareManager.shareBalancedEquation(input, result)}
                    >
                        <MaterialCommunityIcons name="share-variant" size={18} color="#00eaff" />
                        <Text style={styles.shareText}>Share Equation</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.tipBox}>
                <Text style={styles.tipText}>💡 Tip: Use '=' or '->' to separate reactants and products.</Text>
            </View>

            {/* Help Modal */}
            <Modal visible={showHelp} transparent animationType="fade" onRequestClose={() => setShowHelp(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#161B22', width: '80%', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#333' }}>
                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Formatting Guide</Text>
                        <Text style={{ color: '#ccc', marginBottom: 10 }}>• Case Sensitive: "Co" is Cobalt, "CO" is Carbon Monoxide.</Text>
                        <Text style={{ color: '#ccc', marginBottom: 10 }}>• Use '+' to add reactants/products.</Text>
                        <Text style={{ color: '#ccc', marginBottom: 20 }}>• Use '=' or '->' to separate sides.</Text>
                        <Text style={{ color: '#00eaff', fontWeight: 'bold', marginBottom: 5 }}>Examples:</Text>
                        <Text style={{ color: '#888', fontStyle: 'italic', marginBottom: 5 }}>H2 + O2 = H2O</Text>
                        <Text style={{ color: '#888', fontStyle: 'italic', marginBottom: 20 }}>CH4 + O2 -> CO2 + H2O</Text>
                        <TouchableOpacity onPress={() => setShowHelp(false)} style={{ backgroundColor: '#00eaff', padding: 12, borderRadius: 8, alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Close Guide</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#02060f', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#00eaff', marginBottom: 20, textAlign: 'center' },
    inputBox: { marginBottom: 30 },
    input: { backgroundColor: '#0d1424', color: '#fff', fontSize: 18, padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#00eaff' },
    balanceBtn: { backgroundColor: '#00eaff', padding: 15, borderRadius: 10, marginTop: 15, alignItems: 'center' },
    btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

    resultBox: { backgroundColor: '#111', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
    label: { color: '#888', fontSize: 12, marginBottom: 5, textTransform: 'uppercase' },
    resultText: { color: '#00ff88', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },

    unlockBtn: { backgroundColor: '#222', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ffcc00', alignItems: 'center' },
    unlockText: { color: '#ffcc00', fontWeight: 'bold' },

    stepsBox: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#333' },
    stepsHeader: { color: '#fff', fontWeight: 'bold', marginBottom: 10 },
    stepText: { color: '#ccc', marginBottom: 5, lineHeight: 20 },

    tipBox: { marginTop: 30, padding: 15, backgroundColor: '#00eaff11', borderRadius: 8 },
    tipText: { color: '#00eaff', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },

    shareBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d1424', padding: 12, borderRadius: 8, marginTop: 15, borderWidth: 1, borderColor: '#00eaff', gap: 8 },
    shareText: { color: '#00eaff', fontWeight: 'bold', fontSize: 14 }
});

export default EquationBalancerScreen;
