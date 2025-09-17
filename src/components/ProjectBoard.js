import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskColumn from './TaskColumn';
import InviteMember from './InviteMember';

const ProjectBoard = ({ theme }) => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;

    dispatch(moveTask({
      from: source.droppableId,
      to: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index
    }));
  };

  return (
    <div>
      <h2>Project </h2>
      <InviteMember />
     <div style={{ display: 'flex', gap: '20px' }}>
  {Object.entries(tasks).map(([status, taskList]) => (
    <TaskColumn key={status} status={status} tasks={taskList} theme={theme} />
  ))}
</div>
    </div>
  );
};

export default ProjectBoard;
