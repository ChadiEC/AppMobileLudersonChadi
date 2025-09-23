import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = ({ title, description = '', date = '', type = 'Normal', urgency = 'Basse' }) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      date,
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

  const getSortedTasks = () => {
    return [...tasks].sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0);
      const dateB = b.date ? new Date(b.date) : new Date(0);
      if (dateA - dateB !== 0) return dateA - dateB;

      const urgencyOrder = { 'Haute': 3, 'Moyenne': 2, 'Basse': 1 };
      return (urgencyOrder[b.urgency] || 0) - (urgencyOrder[a.urgency] || 0);
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskDone, deleteTask, getSortedTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
