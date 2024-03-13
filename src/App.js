import React, { useState, useEffect } from "react";

import { DragDropContext } from "@hello-pangea/dnd";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

const App = () => {
  const initialData = {
    added: {
      id: "added",
      title: "Added",
      items: [],
    },
    started: {
      id: "started",
      title: "Started",
      items: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      items: [],
    },
  };
  const [tasks, setTasks] = useState({});

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    
    const sourceColumn = tasks[sourceColumnId];

    
    const updatedItems = Array.from(sourceColumn.items);
    const [draggedItem] = updatedItems.splice(source.index, 1);

    
    if (sourceColumnId === destinationColumnId) {
      
      updatedItems.splice(destination.index, 0, draggedItem);

      
      setTasks((prevState) => ({
        ...prevState,
        [sourceColumnId]: { ...sourceColumn, items: updatedItems },
      }));
    } else {
      

      
      const destinationColumn = tasks[destinationColumnId];

      
      const newDestinationItems = Array.from(destinationColumn.items);
      newDestinationItems.splice(destination.index, 0, draggedItem);

      
      setTasks((prevState) => ({
        ...prevState,
        [sourceColumnId]: { ...sourceColumn, items: updatedItems },
        [destinationColumnId]: {
          ...destinationColumn,
          items: newDestinationItems,
        },
      }));
    }
  };

  function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  const handleTaskAdd = (taskContent, priority) => {
    const newTask = {
      id: generateUniqueId(), 
      content: taskContent,
      priority: priority,
    };
    localStorage.setItem(
      "tasks",
      JSON.stringify({
        ...tasks,
        added: {
          ...tasks.added,
          items: [...tasks.added.items, newTask],
        },
      })
    );

    setTasks((prevTasks) => ({
      ...prevTasks,
      added: {
        ...prevTasks.added,
        items: [...prevTasks.added.items, newTask],
      },
    }));
  };

  
  
  

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    const _store = JSON.parse(storedTasks);

    _store?.hasOwnProperty("added") ? setTasks(_store) : setTasks(initialData);
  }, []);

  
  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskForm onTaskAdd={handleTaskAdd} />
        <div className="task-lists">
          {Object.values(tasks).map((column, index) => (
            <TaskList column={column} tasks={column.items} key={index} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
