import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from './components/AdMobWrapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GamificationManager } from './GamificationManager';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';

const BOX_SIZE = 65;
const GAP = 4;

// Expanded Data for a better Table (First 36 + major others)
const elements = [
    { n: 1, s: 'H', name: 'Hydrogen', m: 1.008, g: 1, p: 1, c: 'Nonmetal' },
    { n: 2, s: 'He', name: 'Helium', m: 4.0026, g: 18, p: 1, c: 'Noble Gas' },
    { n: 3, s: 'Li', name: 'Lithium', m: 6.94, g: 1, p: 2, c: 'Alkali Metal' },
    { n: 4, s: 'Be', name: 'Beryllium', m: 9.0122, g: 2, p: 2, c: 'Alkaline Earth' },
    { n: 5, s: 'B', name: 'Boron', m: 10.81, g: 13, p: 2, c: 'Metalloid' },
    { n: 6, s: 'C', name: 'Carbon', m: 12.011, g: 14, p: 2, c: 'Nonmetal' },
    { n: 7, s: 'N', name: 'Nitrogen', m: 14.007, g: 15, p: 2, c: 'Nonmetal' },
    { n: 8, s: 'O', name: 'Oxygen', m: 15.999, g: 16, p: 2, c: 'Nonmetal' },
    { n: 9, s: 'F', name: 'Fluorine', m: 18.998, g: 17, p: 2, c: 'Halogen' },
    { n: 10, s: 'Ne', name: 'Neon', m: 20.180, g: 18, p: 2, c: 'Noble Gas' },
    { n: 11, s: 'Na', name: 'Sodium', m: 22.990, g: 1, p: 3, c: 'Alkali Metal' },
    { n: 12, s: 'Mg', name: 'Magnesium', m: 24.305, g: 2, p: 3, c: 'Alkaline Earth' },
    { n: 13, s: 'Al', name: 'Aluminium', m: 26.982, g: 13, p: 3, c: 'Post-transition' },
    { n: 14, s: 'Si', name: 'Silicon', m: 28.085, g: 14, p: 3, c: 'Metalloid' },
    { n: 15, s: 'P', name: 'Phosphorus', m: 30.974, g: 15, p: 3, c: 'Nonmetal' },
    { n: 16, s: 'S', name: 'Sulfur', m: 32.06, g: 16, p: 3, c: 'Nonmetal' },
    { n: 17, s: 'Cl', name: 'Chlorine', m: 35.45, g: 17, p: 3, c: 'Halogen' },
    { n: 18, s: 'Ar', name: 'Argon', m: 39.948, g: 18, p: 3, c: 'Noble Gas' },
    { n: 19, s: 'K', name: 'Potassium', m: 39.098, g: 1, p: 4, c: 'Alkali Metal' },
    { n: 20, s: 'Ca', name: 'Calcium', m: 40.078, g: 2, p: 4, c: 'Alkaline Earth' },
    { n: 26, s: 'Fe', name: 'Iron', m: 55.845, g: 8, p: 4, c: 'Transition Metal' },
    { n: 29, s: 'Cu', name: 'Copper', m: 63.546, g: 11, p: 4, c: 'Transition Metal' },
    { n: 30, s: 'Zn', name: 'Zinc', m: 65.38, g: 12, p: 4, c: 'Transition Metal' },
    { n: 47, s: 'Ag', name: 'Silver', m: 107.87, g: 11, p: 5, c: 'Transition Metal' },
    { n: 79, s: 'Au', name: 'Gold', m: 196.97, g: 11, p: 6, c: 'Transition Metal' },
    { n: 80, s: 'Hg', name: 'Mercury', m: 200.59, g: 12, p: 6, c: 'Transition Metal' },
    { n: 82, s: 'Pb', name: 'Lead', m: 207.2, g: 14, p: 6, c: 'Post-transition' },
    { n: 92, s: 'U', name: 'Uranium', m: 238.03, g: 3, p: 7, c: 'Actinide' }, // Simplified placement for grid
];

// Color mapping
const getCategoryColor = (cat) => {
    switch (cat) {
        case 'Alkali Metal': return '#FF5252';
        case 'Alkaline Earth': return '#FFAB40';
        case 'Transition Metal': return '#E040FB';
        case 'Post-transition': return '#00E676';
        case 'Metalloid': return '#00BCD4';
        case 'Nonmetal': return '#448AFF';
        case 'Halogen': return '#69F0AE';
        case 'Noble Gas': return '#607D8B';
        case 'Actinide': return '#FF6E40';
        default: return '#9E9E9E';
    }
};

const PeriodicTableScreen = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [showHelp, setShowHelp] = useState(false);

    const handleSelect = (el) => {
        setSelectedElement(el);
        // Gamification Hook: Reward reading about elements
        GamificationManager.recordAction('READ', 'PeriodicTable');
    };

    return (
        <View style={styles.container}>
            {/* Header with Help Button */}
            <View style={styles.header}>
                <Text style={styles.title}>Periodic Table</Text>
                <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.helpBtn}>
                    <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#FFD740" />
                </TouchableOpacity>
            </View>

            {/* Scrollable Table Area */}
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.hScroll}>
                <ScrollView vertical showsVerticalScrollIndicator={true} contentContainerStyle={styles.vContent}>
                    <View style={styles.tableContainer}>
                        {elements.map((el) => (
                            <TouchableOpacity
                                key={el.s}
                                style={[
                                    styles.elementBox,
                                    {
                                        left: (el.g - 1) * (BOX_SIZE + GAP),
                                        top: (el.p - 1) * (BOX_SIZE + GAP),
                                        borderColor: getCategoryColor(el.c)
                                    }
                                ]}
                                onPress={() => handleSelect(el)}
                            >
                                <Text style={styles.atomNum}>{el.n}</Text>
                                <Text style={[styles.symbol, { color: getCategoryColor(el.c) }]}>{el.s}</Text>
                                <Text style={styles.name} numberOfLines={1}>{el.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>

            {/* Help Modal */}
            <Modal visible={showHelp} transparent animationType="fade" onRequestClose={() => setShowHelp(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.helpContent}>
                        <MaterialCommunityIcons name="information-outline" size={50} color="#00eaff" />
                        <Text style={styles.helpTitle}>How to use</Text>
                        <Text style={styles.helpText}>
                            • Pan around to explore the table layout.{'\n'}
                            • Tap any element to view detailed properties.{'\n'}
                            • Colors represent different chemical groups.{'\n'}
                            • Learning elements earns you XP!
                        </Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setShowHelp(false)}>
                            <Text style={styles.closeText}>Got it!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Element Detail Modal */}
            <Modal visible={!!selectedElement} transparent animationType="slide" onRequestClose={() => setSelectedElement(null)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.detailCard}>
                        {selectedElement && (
                            <>
                                <View style={[styles.detailHeader, { backgroundColor: getCategoryColor(selectedElement.c) }]}>
                                    <Text style={styles.detailSymbol}>{selectedElement.s}</Text>
                                    <View>
                                        <Text style={styles.detailNameHeader}>{selectedElement.name}</Text>
                                        <Text style={styles.detailCatHeader}>{selectedElement.c}</Text>
                                    </View>
                                </View>
                                <View style={styles.infoGrid}>
                                    <InfoRow label="Atomic Number" value={selectedElement.n} />
                                    <InfoRow label="Atomic Mass" value={selectedElement.m} />
                                    <InfoRow label="Group" value={selectedElement.g} />
                                    <InfoRow label="Period" value={selectedElement.p} />
                                    <InfoRow label="State (STP)" value="Solid" />
                                    {/* Simplified state logic, can be expanded */}
                                </View>
                                <TouchableOpacity style={styles.closeDetailBtn} onPress={() => setSelectedElement(null)}>
                                    <Text style={styles.closeDetailText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            <View style={styles.adContainer}>
                <BannerAd unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
            </View>
        </View>
    );
};

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#02060f' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40, backgroundColor: '#0d1424', borderBottomWidth: 1, borderBottomColor: '#222' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#00eaff' },
    helpBtn: { padding: 8 },

    hScroll: { flex: 1 },
    vContent: {
        width: (BOX_SIZE + GAP) * 19, // Enough for 18 groups + padding
        height: (BOX_SIZE + GAP) * 11, // Enough for 7 periods + actinides + padding
        minHeight: Dimensions.get('window').height * 0.8
    },
    tableContainer: { position: 'relative', flex: 1, backgroundColor: '#050a15' },

    elementBox: {
        position: 'absolute',
        width: BOX_SIZE, height: BOX_SIZE,
        backgroundColor: '#161B22',
        borderWidth: 1, borderRadius: 6,
        alignItems: 'center', justifyContent: 'center',
        padding: 2,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 3
    },
    atomNum: { position: 'absolute', top: 2, left: 4, fontSize: 8, color: '#666' },
    symbol: { fontSize: 20, fontWeight: '800' },
    name: { fontSize: 8, color: '#aaa', textAlign: 'center' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },

    // Help Modal Styles
    helpContent: { backgroundColor: '#161B22', padding: 30, borderRadius: 20, alignItems: 'center', width: '85%', borderWidth: 1, borderColor: '#333' },
    helpTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
    helpText: { color: '#ccc', fontSize: 16, lineHeight: 24, textAlign: 'left', marginBottom: 20 },
    closeBtn: { backgroundColor: '#00eaff', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
    closeText: { color: '#000', fontWeight: 'bold' },

    // Detail Modal Styles
    detailCard: { width: '100%', backgroundColor: '#0d1424', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
    detailHeader: { flexDirection: 'row', alignItems: 'center', padding: 20 },
    detailSymbol: { fontSize: 48, fontWeight: '900', color: '#fff', marginRight: 20, textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 5 },
    detailNameHeader: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    detailCatHeader: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' },
    infoGrid: { padding: 20 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#222' },
    infoLabel: { color: '#888', fontSize: 16 },
    infoValue: { color: '#fff', fontSize: 16, fontWeight: '600' },
    closeDetailBtn: { margin: 20, backgroundColor: '#333', padding: 15, borderRadius: 12, alignItems: 'center' },
    closeDetailText: { color: '#fff', fontWeight: 'bold' },

    adContainer: { position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }
});

export default PeriodicTableScreen;
