import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, theme }) => (
  <div style={{ minWidth: '200px', padding: '10px', borderRadius: '8px' }}>
    <h3>{status.toUpperCase()}</h3>
    {tasks.map((task, index) => (
      <TaskCard key={task.id} task={task} index={index} theme={theme} />
    ))}
  </div>
);

export default TaskColumn;
