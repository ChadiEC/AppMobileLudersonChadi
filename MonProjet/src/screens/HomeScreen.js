import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text>Lists</Text>
      </View>
      <Text style={styles.title}>All Tasks</Text>
      <Button title="Aller aux Détails" onPress={() => navigation.navigate('Details')} />
      <Button title="Changez la couleur du BackGround" onPress={() => navigation.navigate('Color')} />

      <View style={{ height: 12 }} />
      <Button title="Voir le Compteur" onPress={() => navigation.navigate('Counter')} />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '600',  },
  
});
