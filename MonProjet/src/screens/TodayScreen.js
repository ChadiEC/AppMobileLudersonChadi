import React, { useContext, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function TodayScreen() {
  const { getTodayTasks, toggleTaskDone, deleteTask, addTask } = useContext(TaskContext);
  const todayTasks = getTodayTasks();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (task) => {
    setEditTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!editTask) return;
    deleteTask(editTask.id);
    addTask({
      title: editTitle,
      description: editDescription,
      date: editTask.date,
      type: editTask.type,
      urgency: editTask.urgency
    });
    setEditModalVisible(false);
  };

  const renderRightActions = (task) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: 'red' }]}
      onPress={() => deleteTask(task.id)}
    >
      <Text style={styles.actionText}>Supprimer</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = (task) => (
    <TouchableOpacity
      style={[styles.actionButton, { backgroundColor: 'orange' }]}
      onPress={() => handleEdit(task)}
    >
      <Text style={styles.actionText}>Modifier</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tâches d'aujourd'hui</Text>

      <FlatList
        data={todayTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() => renderRightActions(item)}
            renderLeftActions={() => renderLeftActions(item)}
          >
            <TouchableOpacity
              style={[styles.task, item.isDone && { backgroundColor: '#d3ffd3' }]}
              onPress={() => toggleTaskDone(item.id)}
            >
              <Text style={[styles.title, item.isDone && { textDecorationLine: 'line-through' }]}>
                {item.title}
              </Text>
              <Text style={styles.meta}>⚡ {item.urgency} | 🏷️ {item.type}</Text>
            </TouchableOpacity>
          </Swipeable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune tâche aujourd'hui</Text>}
      />

      {/* Modal édition */}
      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Modifier la tâche</Text>
            <TextInput
              placeholder="Titre"
              value={editTitle}
              onChangeText={setEditTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={editDescription}
              onChangeText={setEditDescription}
              style={styles.input}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={saveEdit} style={styles.modalButton}>
                <Text style={{ color: 'white' }}>Enregistrer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: 'gray' }]}
              >
                <Text style={{ color: 'white' }}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  task: { backgroundColor: '#e0e0e0', padding: 15, borderRadius: 8, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  meta: { fontSize: 12, color: '#333', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    marginVertical: 5,
    borderRadius: 8
  },
  actionText: { color: 'white', fontWeight: 'bold' },
  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: { backgroundColor: 'white', width: '90%', padding: 20, borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10, padding: 10 },
  modalButton: {
    backgroundColor: 'green', padding: 10, borderRadius: 5,
    flex: 1, alignItems: 'center', marginHorizontal: 5
  }
});
