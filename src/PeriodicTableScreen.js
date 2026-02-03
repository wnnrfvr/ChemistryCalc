import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BannerAd, BannerAdSize, TestIds } from './components/AdMobWrapper'; // Keep existing ad wrapper for now
import { GamificationManager } from './GamificationManager';
import { PERIODIC_TABLE_DATA } from './periodicTableData';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8342678716913452/9214380156';

const BOX_SIZE = 65;
const GAP = 4;

// Color mapping (Design Upgrade)
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
        case 'Lanthanide': return '#FF4081';
        case 'Actinide': return '#FF6E40';
        default: return '#9E9E9E';
    }
};

const PeriodicTableScreen = () => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [showHelp, setShowHelp] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelect = (el) => {
        setSelectedElement(el);
        // Gamification Hook: Reward reading about elements
        GamificationManager.recordAction('READ', 'PeriodicTable');
    };

    // Filter Logic
    const filteredElements = useMemo(() => {
        if (!searchQuery) return PERIODIC_TABLE_DATA;
        const lowerQ = searchQuery.toLowerCase();
        return PERIODIC_TABLE_DATA.filter(el =>
            el.name.toLowerCase().includes(lowerQ) ||
            el.s.toLowerCase().includes(lowerQ) ||
            el.n.toString() === lowerQ
        );
    }, [searchQuery]);

    // Check if we are filtering. If so, show a list instead of the grid?
    // Or just dim the ones not matching?
    // For now, let's keep the Grid logic if no search, or a list if searching.
    const isSearching = searchQuery.length > 0;

    return (
        <View style={styles.container}>
            {/* Header with Search and Help */}
            <LinearGradient colors={['#0d1424', '#161B22']} style={styles.header}>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>Periodic Table</Text>
                    <TouchableOpacity onPress={() => setShowHelp(true)} style={styles.helpBtn}>
                        <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#FFD740" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialCommunityIcons name="magnify" size={20} color="#666" style={{ marginRight: 8 }} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Element (Name, Symbol, No.)"
                        placeholderTextColor="#666"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <MaterialCommunityIcons name="close-circle" size={18} color="#666" />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>

            {/* Content Area */}
            {isSearching ? (
                <ScrollView style={styles.listContainer}>
                    {filteredElements.map((el) => (
                        <TouchableOpacity key={el.s} style={styles.listItem} onPress={() => handleSelect(el)}>
                            <View style={[styles.listIcon, { backgroundColor: getCategoryColor(el.c) }]}>
                                <Text style={styles.listSymbol}>{el.s}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.listName}>{el.name}</Text>
                                <Text style={styles.listCat}>{el.n} • {el.c}</Text>
                            </View>
                            <MaterialCommunityIcons name="chevron-right" size={24} color="#333" />
                        </TouchableOpacity>
                    ))}
                    {filteredElements.length === 0 && (
                        <Text style={styles.noResults}>No elements found matching "{searchQuery}"</Text>
                    )}
                </ScrollView>
            ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.hScroll}>
                    <ScrollView vertical showsVerticalScrollIndicator={true} contentContainerStyle={styles.vContent}>
                        <View style={styles.tableContainer}>
                            {PERIODIC_TABLE_DATA.map((el) => {
                                // For grid placement, we rely on 'g' (group) and 'p' (period)
                                // If 'g' > 18 (Lanthanides/Actinides), we handle them below via custom logic or just use their stored g/p
                                // In our data:
                                // Lanthanides g: 101-115, p: 8 (virtual row)
                                // Actinides g: 101-115, p: 9 (virtual row)

                                let left = (el.g - 1) * (BOX_SIZE + GAP);
                                let top = (el.p - 1) * (BOX_SIZE + GAP);

                                // Adjust for Lanthanides/Actinides visual placement
                                if (el.g > 100) {
                                    // Shift them to be centered below
                                    left = (el.g - 101 + 2) * (BOX_SIZE + GAP); // Start around group 3
                                    top = (el.p - 1) * (BOX_SIZE + GAP) + (BOX_SIZE / 2); // Separation
                                }

                                return (
                                    <TouchableOpacity
                                        key={el.s}
                                        style={[
                                            styles.elementBox,
                                            {
                                                left: left,
                                                top: top,
                                                borderColor: getCategoryColor(el.c)
                                            }
                                        ]}
                                        onPress={() => handleSelect(el)}
                                    >
                                        <Text style={styles.atomNum}>{el.n}</Text>
                                        <Text style={[styles.symbol, { color: getCategoryColor(el.c) }]}>{el.s}</Text>
                                        <Text style={styles.name} numberOfLines={1}>{el.name}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </ScrollView>
                </ScrollView>
            )}

            {/* Detail Modal */}
            <Modal visible={!!selectedElement} transparent animationType="slide" onRequestClose={() => setSelectedElement(null)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.detailCard}>
                        {selectedElement && (
                            <>
                                <LinearGradient
                                    colors={[getCategoryColor(selectedElement.c), '#111']}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                    style={styles.detailHeader}
                                >
                                    <Text style={styles.detailSymbol}>{selectedElement.s}</Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.detailNameHeader}>{selectedElement.name}</Text>
                                        <Text style={styles.detailCatHeader}>{selectedElement.c}</Text>
                                        <Text style={styles.detailSummary}>{selectedElement.summary}</Text>
                                    </View>
                                </LinearGradient>

                                <ScrollView style={styles.infoScroll}>
                                    <View style={styles.infoGrid}>
                                        <InfoRow label="Atomic Number" value={selectedElement.n} />
                                        <InfoRow label="Atomic Mass" value={selectedElement.m} />
                                        <InfoRow label="Group" value={selectedElement.g > 100 ? 'f-block' : selectedElement.g} />
                                        <InfoRow label="Period" value={selectedElement.p} />
                                        <InfoRow label="Category" value={selectedElement.c} />
                                    </View>
                                </ScrollView>

                                <TouchableOpacity style={styles.closeDetailBtn} onPress={() => setSelectedElement(null)}>
                                    <Text style={styles.closeDetailText}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Help Modal */}
            <Modal visible={showHelp} transparent animationType="fade" onRequestClose={() => setShowHelp(false)}>
                <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.9)' }]}>
                    <View style={styles.helpContent}>
                        <MaterialCommunityIcons name="information-outline" size={50} color="#00eaff" />
                        <Text style={styles.helpTitle}>Periodic Table Guide</Text>
                        <Text style={styles.helpText}>
                            • Use the Search Bar to find elements quickly.{'\n'}
                            • Pan freely to explore the table grid.{'\n'}
                            • Validated Data for 108+ elements.{'\n'}
                            • Tap an element to see its properties.
                        </Text>
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setShowHelp(false)}>
                            <Text style={styles.closeText}>Got it!</Text>
                        </TouchableOpacity>
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
    header: { padding: 20, paddingTop: 40, borderBottomWidth: 1, borderBottomColor: '#222' },
    titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#00eaff' },
    helpBtn: { padding: 4 },

    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#050a15', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: '#333' },
    searchInput: { flex: 1, color: '#fff', fontSize: 16 },

    hScroll: { flex: 1 },
    vContent: {
        width: (BOX_SIZE + GAP) * 20,
        height: (BOX_SIZE + GAP) * 12,
        minHeight: Dimensions.get('window').height * 0.8
    },
    tableContainer: { position: 'relative', flex: 1, backgroundColor: '#050a15' },

    elementBox: {
        position: 'absolute',
        width: BOX_SIZE, height: BOX_SIZE,
        backgroundColor: '#161B22',
        borderWidth: 1.5, borderRadius: 8,
        alignItems: 'center', justifyContent: 'center',
        padding: 2,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2, elevation: 3
    },
    atomNum: { position: 'absolute', top: 2, left: 4, fontSize: 10, color: '#666', fontWeight: 'bold' },
    symbol: { fontSize: 22, fontWeight: '800' },
    name: { fontSize: 9, color: '#aaa', textAlign: 'center' },

    // List Mode Styles
    listContainer: { flex: 1, backgroundColor: '#02060f' },
    listItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#222' },
    listIcon: { width: 44, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
    listSymbol: { color: '#000', fontWeight: 'bold', fontSize: 18 },
    listName: { color: '#fff', fontSize: 18, fontWeight: '600' },
    listCat: { color: '#888', fontSize: 14, marginTop: 2 },
    noResults: { color: '#666', fontSize: 16, textAlign: 'center', marginTop: 40 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },

    // Help Modal
    helpContent: { backgroundColor: '#161B22', padding: 30, borderRadius: 20, alignItems: 'center', width: '85%', borderWidth: 1, borderColor: '#333' },
    helpTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
    helpText: { color: '#ccc', fontSize: 16, lineHeight: 26, textAlign: 'left', marginBottom: 20 },
    closeBtn: { backgroundColor: '#00eaff', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
    closeText: { color: '#000', fontWeight: 'bold' },

    // Detail Modal
    detailCard: { width: '100%', maxHeight: '80%', backgroundColor: '#0d1424', borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#333' },
    detailHeader: { flexDirection: 'row', alignItems: 'center', padding: 20 },
    detailSymbol: { fontSize: 50, fontWeight: '900', color: '#fff', marginRight: 20, textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 5 },
    detailNameHeader: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
    detailCatHeader: { fontSize: 16, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', marginBottom: 4 },
    detailSummary: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },

    infoScroll: { padding: 20 },
    infoGrid: { paddingBottom: 20 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#222' },
    infoLabel: { color: '#888', fontSize: 16 },
    infoValue: { color: '#fff', fontSize: 16, fontWeight: '600' },

    closeDetailBtn: { margin: 20, backgroundColor: '#333', padding: 15, borderRadius: 12, alignItems: 'center' },
    closeDetailText: { color: '#fff', fontWeight: 'bold' },

    adContainer: { position: 'absolute', bottom: 0, width: '100%', alignItems: 'center' }
});

export default PeriodicTableScreen;
