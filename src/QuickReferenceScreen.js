// QuickReferenceScreen.js - Chemistry Formula & Constants Quick Reference
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
    CHEMISTRY_CONSTANTS,
    COMMON_FORMULAS,
    COMMON_IONS,
    SOLUBILITY_RULES,
    calculateMolarMass
} from './ChemistryReference';

const QuickReferenceScreen = () => {
    const [activeTab, setActiveTab] = useState('formulas');
    const [molarFormula, setMolarFormula] = useState('');
    const [molarResult, setMolarResult] = useState(null);
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleCalculateMolar = () => {
        if (molarFormula.trim()) {
            const result = calculateMolarMass(molarFormula.trim());
            setMolarResult(result);
        }
    };

    const tabs = [
        { id: 'formulas', label: 'Formulas', icon: 'function-variant' },
        { id: 'constants', label: 'Constants', icon: 'atom' },
        { id: 'ions', label: 'Ions', icon: 'plus-minus' },
        { id: 'solubility', label: 'Solubility', icon: 'water' },
        { id: 'molar', label: 'Molar Mass', icon: 'scale-balance' },
    ];

    return (
        <LinearGradient colors={['#0A0E1A', '#1B263B']} style={styles.container}>
            {/* Tab Bar */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[styles.tab, activeTab === tab.id && styles.tabActive]}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <MaterialCommunityIcons
                            name={tab.icon}
                            size={20}
                            color={activeTab === tab.id ? '#00FFCC' : '#666'}
                        />
                        <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* FORMULAS TAB */}
                {activeTab === 'formulas' && (
                    <View>
                        <Text style={styles.sectionTitle}>📐 Essential Chemistry Formulas</Text>
                        {COMMON_FORMULAS.map((category, idx) => (
                            <View key={idx} style={styles.categoryCard}>
                                <TouchableOpacity
                                    style={styles.categoryHeader}
                                    onPress={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
                                >
                                    <Text style={styles.categoryTitle}>{category.category}</Text>
                                    <MaterialCommunityIcons
                                        name={expandedCategory === idx ? 'chevron-up' : 'chevron-down'}
                                        size={24}
                                        color="#00FFCC"
                                    />
                                </TouchableOpacity>

                                {expandedCategory === idx && (
                                    <View style={styles.formulaList}>
                                        {category.formulas.map((f, i) => (
                                            <View key={i} style={styles.formulaItem}>
                                                <Text style={styles.formulaName}>{f.name}</Text>
                                                <Text style={styles.formulaEquation}>{f.formula}</Text>
                                                <Text style={styles.formulaDesc}>{f.description}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* CONSTANTS TAB */}
                {activeTab === 'constants' && (
                    <View>
                        <Text style={styles.sectionTitle}>⚛️ Physical & Chemical Constants</Text>
                        {Object.entries(CHEMISTRY_CONSTANTS).map(([key, data]) => (
                            <View key={key} style={styles.constantCard}>
                                <Text style={styles.constantName}>{data.name}</Text>
                                <View style={styles.constantValueRow}>
                                    <Text style={styles.constantValue}>{data.value}</Text>
                                    <Text style={styles.constantUnit}>{data.unit}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* IONS TAB */}
                {activeTab === 'ions' && (
                    <View>
                        <Text style={styles.sectionTitle}>⚡ Common Ions Reference</Text>
                        {COMMON_IONS.map((category, idx) => (
                            <View key={idx} style={styles.ionCategory}>
                                <Text style={styles.ionCategoryTitle}>{category.category}</Text>
                                <View style={styles.ionGrid}>
                                    {category.ions.map((ion, i) => (
                                        <View key={i} style={styles.ionCard}>
                                            <Text style={styles.ionFormula}>{ion.formula}</Text>
                                            <Text style={styles.ionName}>{ion.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* SOLUBILITY TAB */}
                {activeTab === 'solubility' && (
                    <View>
                        <Text style={styles.sectionTitle}>💧 Solubility Rules</Text>
                        <Text style={styles.solubilityNote}>
                            Remember: "Soluble" means it dissolves in water to form an aqueous solution.
                        </Text>
                        {SOLUBILITY_RULES.map((rule, idx) => (
                            <View key={idx} style={styles.solubilityCard}>
                                <View style={styles.solubilityHeader}>
                                    <MaterialCommunityIcons
                                        name={rule.rule.includes('soluble') && !rule.rule.includes('insoluble') ? 'check-circle' : 'close-circle'}
                                        size={24}
                                        color={rule.rule.includes('soluble') && !rule.rule.includes('insoluble') ? '#00FF88' : '#FF5555'}
                                    />
                                    <Text style={styles.solubilityRule}>{rule.rule}</Text>
                                </View>
                                <Text style={styles.solubilityException}>
                                    Exceptions: {rule.exceptions}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* MOLAR MASS CALCULATOR TAB */}
                {activeTab === 'molar' && (
                    <View>
                        <Text style={styles.sectionTitle}>⚖️ Molar Mass Calculator</Text>
                        <View style={styles.calculatorCard}>
                            <Text style={styles.calculatorLabel}>Enter Chemical Formula:</Text>
                            <TextInput
                                style={styles.calculatorInput}
                                placeholder="e.g., H2O, NaCl, Ca(OH)2"
                                placeholderTextColor="#666"
                                value={molarFormula}
                                onChangeText={setMolarFormula}
                                autoCapitalize="characters"
                            />
                            <TouchableOpacity style={styles.calculateBtn} onPress={handleCalculateMolar}>
                                <Text style={styles.calculateBtnText}>Calculate</Text>
                            </TouchableOpacity>

                            {molarResult && (
                                <View style={styles.resultCard}>
                                    <Text style={styles.resultTitle}>Molar Mass of {molarFormula}</Text>
                                    <Text style={styles.resultValue}>{molarResult.totalMass} g/mol</Text>

                                    {molarResult.breakdown.length > 0 && (
                                        <View style={styles.breakdownSection}>
                                            <Text style={styles.breakdownTitle}>Breakdown:</Text>
                                            {molarResult.breakdown.map((item, i) => (
                                                <Text key={i} style={styles.breakdownItem}>
                                                    {item.symbol} × {item.count} = {item.subtotal.toFixed(2)} g/mol
                                                </Text>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}

                            <View style={styles.exampleBox}>
                                <Text style={styles.exampleTitle}>📝 Examples to try:</Text>
                                <Text style={styles.exampleText}>• H2O (Water) → 18.02 g/mol</Text>
                                <Text style={styles.exampleText}>• NaCl (Salt) → 58.44 g/mol</Text>
                                <Text style={styles.exampleText}>• CO2 (Carbon Dioxide) → 44.01 g/mol</Text>
                                <Text style={styles.exampleText}>• C6H12O6 (Glucose) → 180.16 g/mol</Text>
                            </View>
                        </View>
                    </View>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    tabBar: { flexGrow: 0, paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15 },
    tab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, marginRight: 10, backgroundColor: '#FFFFFF10', borderRadius: 20, gap: 6 },
    tabActive: { backgroundColor: '#00FFCC20', borderWidth: 1, borderColor: '#00FFCC' },
    tabText: { color: '#666', fontSize: 13, fontWeight: '600' },
    tabTextActive: { color: '#00FFCC' },

    content: { flex: 1, paddingHorizontal: 20 },
    sectionTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', marginBottom: 20, marginTop: 10 },

    // Formula styles
    categoryCard: { backgroundColor: '#FFFFFF08', borderRadius: 16, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#FFFFFF10' },
    categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
    categoryTitle: { color: '#00FFCC', fontSize: 16, fontWeight: '700' },
    formulaList: { padding: 16, paddingTop: 0, gap: 12 },
    formulaItem: { backgroundColor: '#FFFFFF05', padding: 12, borderRadius: 10, borderLeftWidth: 3, borderLeftColor: '#A855F7' },
    formulaName: { color: '#FFF', fontSize: 14, fontWeight: '700', marginBottom: 4 },
    formulaEquation: { color: '#00FFCC', fontSize: 18, fontWeight: '800', marginBottom: 4, fontFamily: 'monospace' },
    formulaDesc: { color: '#888', fontSize: 12 },

    // Constants styles
    constantCard: { backgroundColor: '#FFFFFF08', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#FFFFFF10' },
    constantName: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 6 },
    constantValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
    constantValue: { color: '#00FFCC', fontSize: 22, fontWeight: '800', fontFamily: 'monospace' },
    constantUnit: { color: '#888', fontSize: 14 },

    // Ions styles
    ionCategory: { marginBottom: 25 },
    ionCategoryTitle: { color: '#A855F7', fontSize: 16, fontWeight: '700', marginBottom: 12 },
    ionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    ionCard: { backgroundColor: '#FFFFFF08', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, minWidth: 80, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF10' },
    ionFormula: { color: '#00FFCC', fontSize: 18, fontWeight: '800' },
    ionName: { color: '#888', fontSize: 10, marginTop: 2 },

    // Solubility styles
    solubilityNote: { color: '#888', fontSize: 14, marginBottom: 20, fontStyle: 'italic' },
    solubilityCard: { backgroundColor: '#FFFFFF08', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#FFFFFF10' },
    solubilityHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 8 },
    solubilityRule: { color: '#FFF', fontSize: 14, fontWeight: '600', flex: 1 },
    solubilityException: { color: '#FF9500', fontSize: 12, marginLeft: 34 },

    // Calculator styles
    calculatorCard: { backgroundColor: '#FFFFFF08', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#FFFFFF10' },
    calculatorLabel: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 12 },
    calculatorInput: { backgroundColor: '#FFFFFF10', color: '#FFF', fontSize: 20, padding: 16, borderRadius: 12, textAlign: 'center', fontWeight: '700', marginBottom: 15, borderWidth: 1, borderColor: '#FFFFFF20' },
    calculateBtn: { backgroundColor: '#00FFCC', padding: 16, borderRadius: 12, alignItems: 'center' },
    calculateBtnText: { color: '#000', fontSize: 16, fontWeight: '700' },
    resultCard: { backgroundColor: '#00FFCC15', padding: 20, borderRadius: 12, marginTop: 20, borderWidth: 1, borderColor: '#00FFCC30' },
    resultTitle: { color: '#FFF', fontSize: 14, marginBottom: 8 },
    resultValue: { color: '#00FFCC', fontSize: 36, fontWeight: '900', marginBottom: 15 },
    breakdownSection: { borderTopWidth: 1, borderTopColor: '#FFFFFF20', paddingTop: 15 },
    breakdownTitle: { color: '#888', fontSize: 12, marginBottom: 8 },
    breakdownItem: { color: '#FFF', fontSize: 14, marginBottom: 4 },
    exampleBox: { marginTop: 25, padding: 16, backgroundColor: '#FFFFFF05', borderRadius: 12 },
    exampleTitle: { color: '#A855F7', fontSize: 14, fontWeight: '700', marginBottom: 10 },
    exampleText: { color: '#888', fontSize: 13, marginBottom: 4 },
});

export default QuickReferenceScreen;
