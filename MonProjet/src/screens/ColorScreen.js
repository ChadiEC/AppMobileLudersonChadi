import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ColorScreen() {
  const [bgColor, setBgColor] = useState('#ffffff');

  const changeColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setBgColor(randomColor);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Button title="Changer la couleur" onPress={changeColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 20, fontSize: 18, fontWeight: '500' },
});
