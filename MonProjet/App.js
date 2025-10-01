import 'react-native-gesture-handler';
import { ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <ImageBackground
        source={require("./assets/backgroundMobile.jpg")}
        style={styles.background}
        >
        <AppNavigator />
      </ImageBackground>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    resizeMode:"cover",
  },
});
