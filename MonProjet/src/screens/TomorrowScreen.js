import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TaskContext } from '../context/TaskContext';

export default function TomorrowScreen() {
  const { getTomorrowTasks, toggleTaskDone, deleteTask } = useContext(TaskContext);
  const tomorrowTasks = getTomorrowTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tâches de demain</Text>

      <FlatList
        data={tomorrowTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.task, item.isDone && { backgroundColor: '#d3ffd3' }]}
            onPress={() => toggleTaskDone(item.id)}
            onLongPress={() => deleteTask(item.id)}
          >
            <Text style={[styles.title, item.isDone && { textDecorationLine: 'line-through' }]}>
              {item.title}
            </Text>
            <Text style={styles.meta}>⚡ {item.urgency} | 🏷️ {item.type}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune tâche demain</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  task: { backgroundColor: '#e0e0e0', padding: 15, borderRadius: 8, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  meta: { fontSize: 12, color: '#333', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, color: '#777' }
});
