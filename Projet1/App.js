import 'react-native-gesture-handler';
import React from 'react';

import AppNavigator from './src/navigation/appNavigator';
import { ThemeProvider } from './src/context/themeContext';

export default function App() {
  return (
  <ThemeProvider>
    <AppNavigator></AppNavigator>
  </ThemeProvider>
  );
}
