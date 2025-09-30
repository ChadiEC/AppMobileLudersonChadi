import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = ({ title, description = '', date = '', type = 'Normal', urgency = 'Basse' }) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      date,        // stockée au format "2025-09-30"
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

  const isSameDay = (d1, d2) => d1.toDateString() === d2.toDateString();

  const getTodayTasks = () => {
    const today = new Date();
    return tasks.filter(t => {
      const taskDate = new Date(t.date);
      return isSameDay(today, taskDate);
    });
  };

  const getTomorrowTasks = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tasks.filter(t => {
      const taskDate = new Date(t.date);
      return isSameDay(tomorrow, taskDate);
    });
  };

  const getWeekTasks = () => {
    const today = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(today.getDate() + 7);
    return tasks.filter(t => {
      const taskDate = new Date(t.date);
      return taskDate >= today && taskDate <= endOfWeek;
    });
  };

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
