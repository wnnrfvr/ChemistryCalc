import React from 'react';
import { Text } from 'react-native';

const MathView = ({ math, ...props }) => {
    return <Text style={props.style}>{math}</Text>;
};

export default MathView;
