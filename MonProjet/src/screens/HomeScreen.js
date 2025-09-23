import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lists</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('AllTask')}>

          <Ionicons name="checkmark-circle" size={20} color="#fff"></Ionicons>
          <Text style={styles.boxText}>All task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Today')}>
          <Ionicons name="today" size={20} color="#fff"></Ionicons>
          <Text style={styles.boxText}>Today</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Tomorrow')}>
          <Ionicons name="calendar" size={20} color="#fff"></Ionicons>
          <Text style={styles.boxText}>Tomorrow</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Week')}>
          <Ionicons name="briefcase" size={20} color="#fff"></Ionicons>
          <Text style={styles.boxText}>Week</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Completed')}>
          <Ionicons name="checkmark-done" size={20} color="#fff"></Ionicons>
          <Text style={styles.boxText}>Completed</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('Work')}>
          <Ionicons name="person" size={20} color="#fff"></Ionicons>
          <Text style={styles.boxText}>Work</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addButtonContainer}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </View>
      </View>
    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  box: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: 350,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  boxText: {
    color: "#fff",
    fontWeight: "bold",
    alignContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 20,
  },
  addButtonContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 28,
  },

});
