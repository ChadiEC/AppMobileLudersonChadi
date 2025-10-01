import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TaskContext } from '../context/TaskContext';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function HomeScreen({ navigation }) {
  const { tasks, addTask, getTodayTasks, getTomorrowTasks, getWeekTasks } = useContext(TaskContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [type, setType] = useState('Normal');
  const [urgency, setUrgency] = useState('Basse');

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  const getUrgencyColor = (level) => {
    if (level === "Haute") return "#E24A4A";   // rouge
    if (level === "Moyenne") return "#4A90E2"; // bleu
    return "#4CAF50";                          // vert
  };

  const handleAddTask = () => {
    if (title.trim() === "") return;
    addTask({
      title,
      description,
      date,   
      type,
      urgency
    });
    // Reset
    setTitle("");
    setDescription("");
    setDate(new Date());
    setType("Normal");
    setUrgency("Basse");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Lists</Text>
      </View>

      {/* NAVIGATION BOXES */}
      <ScrollView>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('AllTask')}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.boxText}> All task ({tasks.length}) </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Today')}>
          <Ionicons name="today" size={20} color="#fff" />
          <Text style={styles.boxText}>Today ({getTodayTasks().length}) </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Tomorrow')}>
          <Ionicons name="calendar" size={20} color="#fff" />
          <Text style={styles.boxText}>Tomorrow ({getTomorrowTasks().length})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Week')}>
          <Ionicons name="briefcase" size={20} color="#fff" />
          <Text style={styles.boxText}>Week ({getWeekTasks().length})</Text>
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

      {/* ADD BUTTON */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Nouvelle tâche</Text>

            <TextInput
              placeholder="Titre"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />

            {/* DATE PICKER */}
            <Text style={{ marginBottom: 5 }}>Échéance :</Text>
            <TouchableOpacity
              style={styles.selector}
              onPress={() => setDatePickerVisibility(true)}
            >
              <Text style={{ fontWeight: "bold" }}>
                {date ? date.toLocaleDateString() : "Choisir une date"}
              </Text>
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={() => setDatePickerVisibility(false)}
              themeVariant="light"
            />

            {/* URGENCY */}
            <Text style={{ marginBottom: 5, marginTop: 10 }}>Urgence :</Text>
            {["Basse", "Moyenne", "Haute"].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.selector,
                  urgency === level && { backgroundColor: getUrgencyColor(level) },
                ]}
                onPress={() => setUrgency(level)}
              >
                <Text style={{
                  color: urgency === level ? "white" : "black",
                  fontWeight: "bold",
                }}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}

            {/* BUTTONS */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: "gray" }]}
              >
                <Text style={{ color: "white" }}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddTask} style={styles.modalButton}>
                <Text style={{ color: "white" }}>Ajouter</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, paddingHorizontal: 20,backgroundColor: "transparent" },
  header: { marginBottom: 20 },
  headerText: { fontSize: 28, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  box: { flexDirection: "row", backgroundColor: "#4A90E2", paddingVertical: 12, paddingHorizontal: 15, width: '100%', height: 60, borderRadius: 10, alignItems: "center", marginBottom: 15 },
  boxText: { color: "#fff", fontWeight: "bold", marginLeft: 20 },
  addButtonContainer: { alignItems: "center", marginTop: 30, marginBottom: 30 },
  addButton: { width: 60, height: 60, borderRadius: 30, backgroundColor: "green", alignItems: "center", justifyContent: "center" },
  addButtonText: { color: "#fff", fontSize: 28 },
  modalContainer: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' },
  modalContent: {width: '90%', backgroundColor: 'rgba(255,255,255,0.9)', padding: 20, borderRadius: 10 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:5, marginBottom:10, paddingHorizontal:10, height:40 },
  modalButton: { backgroundColor:'green', padding:10, borderRadius:5, flex:1, alignItems:'center', marginHorizontal:5 },
  selector: { borderWidth:1, borderColor:'#ccc', borderRadius:5, padding:10, marginBottom:10 },
  quickBtn:{ borderWidth:1, borderColor:'#ccc', borderRadius:5, paddingVertical:6, paddingHorizontal:10 }
});
