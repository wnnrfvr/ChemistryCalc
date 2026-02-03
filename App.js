// App.js
import React from 'react';
import AppNavigator from './AppNavigator';
import { AdsProvider } from './src/AdsContext';

export default function App() {
  return (
    <AdsProvider>
      <AppNavigator />
    </AdsProvider>
  );
}
