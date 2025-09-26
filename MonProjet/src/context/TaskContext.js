import React, { createContext, useState } from 'react';

// ✅ Crée et exporte le contexte
export const TaskContext = createContext();

// ✅ Fournisseur du contexte
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = ({ title, description = '', date = '', type = 'Normal', urgency = 'Basse' }) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      date,        // "Aujourd'hui" | "Demain" | "Cette semaine"
      type,
      urgency,
      isDone: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTaskDone = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // ✅ Filtres par échéance
  const getTodayTasks = () => tasks.filter(t => t.date === "Aujourd'hui");
  const getTomorrowTasks = () => tasks.filter(t => t.date === "Demain");
  const getWeekTasks = () => tasks.filter(t => t.date === "Cette semaine");

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskDone,
        deleteTask,
        getTodayTasks,
        getTomorrowTasks,
        getWeekTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
