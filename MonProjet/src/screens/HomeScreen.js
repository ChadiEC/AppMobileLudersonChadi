import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TaskContext } from '../context/TaskContext';

export default function HomeScreen({ navigation }) {
  const { addTask, tasks } = useContext(TaskContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Normal');
  const [urgency, setUrgency] = useState('Basse');

  const handleAddTask = () => {
    if (title.trim() === '') return;
    addTask({ title, description, date, type, urgency });
    setTitle('');
    setDescription('');
    setDate('');
    setType('Normal');
    setUrgency('Basse');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lists</Text>
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AllTask')}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.boxText}> All task ({tasks.length}) </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Today')}>
          <Ionicons name="today" size={20} color="#fff" />
          <Text style={styles.boxText}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Tomorrow')}>
          <Ionicons name="calendar" size={20} color="#fff" />
          <Text style={styles.boxText}>Tomorrow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Week')}>
          <Ionicons name="briefcase" size={20} color="#fff" />
          <Text style={styles.boxText}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Completed')}>
          <Ionicons name="checkmark-done" size={20} color="#fff" />
          <Text style={styles.boxText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Work')}>
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={styles.boxText}>Work</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Nouvelle tâche</Text>
            <TextInput placeholder="Titre" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
            <TextInput placeholder="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />
            <TextInput placeholder="Type" value={type} onChangeText={setType} style={styles.input} />
            <TextInput placeholder="Urgence (Basse/Moyenne/Haute)" value={urgency} onChangeText={setUrgency} style={styles.input} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity onPress={handleAddTask} style={styles.modalButton}><Text style={{color:'white'}}>Ajouter</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={[styles.modalButton, {backgroundColor:'gray'}]}><Text style={{color:'white'}}>Annuler</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, paddingHorizontal: 20 },
  header: { marginBottom: 20 },
  headerText: { fontSize: 28, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  box: { flexDirection: "row", backgroundColor: "#4A90E2", paddingVertical: 12, paddingHorizontal: 15, width: '100%', height: 60, borderRadius: 10, alignItems: "center", marginBottom: 15 },
  boxText: { color: "#fff", fontWeight: "bold", marginLeft: 20 },
  addButtonContainer: { alignItems: "center", marginTop: 30, marginBottom: 30 },
  addButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: "green", alignItems: "center", justifyContent: "center" },
  addButtonText: { color: "#fff", fontSize: 28 },
  modalContainer: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' },
  modalContent: { width:'90%', backgroundColor:'white', padding:20, borderRadius:10 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:5, marginBottom:10, paddingHorizontal:10, height:40 },
  modalButton: { backgroundColor:'green', padding:10, borderRadius:5, flex:1, alignItems:'center', marginHorizontal:5 }
});
