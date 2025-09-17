import React from 'react';
// Drag and drop imports removed

const TaskCard = ({ task, index, theme }) => {
  return (
    <div
      style={{
        padding: '8px',
        margin: '4px 0',
        background: theme === 'dark' ? '#353942' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      {task.text}
    </div>
  );
};

export default TaskCard;
