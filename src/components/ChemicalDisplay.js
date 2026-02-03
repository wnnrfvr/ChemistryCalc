import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * ChemicalDisplay: Renders chemical formulas with proper subscripts and reactions.
 * 
 * Parsing Rules:
 * - Regular letters (A-Z, a-z) -> Rendered normally
 * - Numbers (0-9) -> Rendered as subscripts unless part of coefficient (logic simplified here)
 * - Symbols (+, -, =) -> Rendered normally or spaced
 * - "->" or "->" -> Replaced with arrow icon
 * - "{" or "}" -> Used to group atoms/charges if needed (advanced usage)
 */
const ChemicalDisplay = ({ formula, style, fontSize = 20, color = '#FFF' }) => {
    if (!formula) return null;

    // Split into segments based on spaces (molecules usually separated by + or ->)
    // But actually, we need to parse char by char for subscripts.
    // Strategy:
    // 1. Split by "->" to handle reaction arrows first.
    // 2. Split by "+" to handle terms.
    // 3. Parse each molecule for subscripts.

    const renderMolecule = (text, keyPrefix) => {
        const parts = [];
        let buffer = "";

        // Regex logic is fragile for complex chemistry, let's do a simple character loop
        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (/[0-9]/.test(char)) {
                // It's a number
                // Check if it's a coefficient (at start or after space) vs subscript (after letter)
                const prevChar = i > 0 ? text[i - 1] : ' ';
                const isSubscript = /[a-zA-Z\)]/.test(prevChar);

                if (buffer) {
                    parts.push(<Text key={`${keyPrefix}-txt-${i}`} style={{ fontSize, color }}>{buffer}</Text>);
                    buffer = "";
                }

                if (isSubscript) {
                    parts.push(
                        <Text key={`${keyPrefix}-sub-${i}`} style={{ fontSize: fontSize * 0.6, lineHeight: fontSize, color, top: fontSize * 0.2 }}>
                            {char}
                        </Text>
                    );
                } else {
                    // Coefficient or normal number
                    parts.push(<Text key={`${keyPrefix}-num-${i}`} style={{ fontSize, color }}>{char}</Text>);
                }
            } else {
                buffer += char;
            }
        }

        if (buffer) {
            parts.push(<Text key={`${keyPrefix}-last`} style={{ fontSize, color }}>{buffer}</Text>);
        }

        return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{parts}</View>;
    };

    // Replace arrows
    const segments = formula.split(/(\->|->)/g);

    return (
        <View style={[styles.container, style]}>
            {segments.map((segment, index) => {
                if (segment === '->' || segment === '->') {
                    return (
                        <MaterialCommunityIcons
                            key={`arrow-${index}`}
                            name="arrow-right-thin"
                            size={fontSize * 1.2}
                            color={color}
                            style={{ marginHorizontal: 8 }}
                        />
                    );
                }
                return (
                    <View key={`seg-${index}`} style={{ flexDirection: 'row' }}>
                        {renderMolecule(segment, `mol-${index}`)}
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
});

export default ChemicalDisplay;
