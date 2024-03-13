import React from 'react';
// import { Draggable } from 'react-beautiful-dnd';
import {Draggable} from '@hello-pangea/dnd'

const TaskItem = ({ task, index }) => {
    
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
        className={`task-item ${task.priority}-priority`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content} - {task.priority}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
