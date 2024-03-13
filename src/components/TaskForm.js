import React, { useState } from 'react';

const TaskForm = ({ onTaskAdd }) => {
//   const [newTask, setNewTask] = useState('');

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onTaskAdd(newTask.trim(), priority);
    setNewTask('');
    setPriority('medium');
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newTask.trim()) return;
//     onTaskAdd(newTask.trim());
//     setNewTask('');
//   };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="task-input"
      />
       <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="task-priority"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
};

export default TaskForm;
