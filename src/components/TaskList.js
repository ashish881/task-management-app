import React from "react";
import TaskItem from "./TaskItem";
// import { Droppable } from "react-beautiful-dnd";
import { Droppable } from "@hello-pangea/dnd";
const TaskList = ({ column, tasks }) => {
    

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className="task-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2>{column.title}</h2>
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
