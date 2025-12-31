import React from 'react';
import { Text } from 'react-native';

// MOCKING Native MathView to allow running without a native rebuild.
// Restore this import when you are ready to rebuild the native app.
// import MathView from 'react-native-math-view';
// export default MathView;

const MathView = ({ math, ...props }) => {
    return <Text style={props.style}>{math}</Text>;
};

export default MathView;
