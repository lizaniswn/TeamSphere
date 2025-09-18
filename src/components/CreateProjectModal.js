import React, { useState, useEffect } from 'react';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  background: '#fff',
  padding: '30px',
  borderRadius: '8px',
  minWidth: '320px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  color: '#222',
  position: 'relative'
};

const CreateProjectModal = ({ show, onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (show) {
      fetch('http://localhost:5001/api/tasks')
        .then(res => res.json())
        .then(data => {
          if (data.success) setTasks(data.data);
        });
      fetch('http://localhost:5001/api/members')
        .then(res => res.json())
        .then(data => {
          if (data.success) setMembers(data.data);
        });
    }
  }, [show]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectName || !selectedTask || !selectedMember) {
      setMessage('Please fill all fields.');
      return;
    }
    const res = await fetch('http://localhost:5001/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: projectName,
        tasks: [selectedTask],
        members: [selectedMember]
      })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Project created successfully!');
      setProjectName('');
      setSelectedTask('');
      setSelectedMember('');
      setTimeout(() => {
        if (onProjectCreated) onProjectCreated();
        onClose();
        setMessage('');
      }, 800);
    } else {
      setMessage(data.error || 'Failed to create project.');
    }
  };

  if (!show) return null;

  return (
    <div style={modalStyle} onClick={() => { onClose(); setMessage(''); }}>
      <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0, marginBottom: '18px', color: '#23272f', textAlign: 'center' }}>Create Project</h3>
        <form onSubmit={handleCreateProject}>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="projectName" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Project Name:</label>
            <input id="projectName" type="text" value={projectName} onChange={e => setProjectName(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="taskSelect" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Task:</label>
            <select id="taskSelect" value={selectedTask} onChange={e => setSelectedTask(e.target.value)} style={{ width: '100%' }}>
              <option value="">Select Task</option>
              {tasks.map(task => (
                <option key={task._id} value={task._id}>{task.title}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label htmlFor="memberSelect" style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Member:</label>
            <select id="memberSelect" value={selectedMember} onChange={e => setSelectedMember(e.target.value)} style={{ width: '100%' }}>
              <option value="">Select Member</option>
              {members.map(member => (
                <option key={member._id} value={member._id}>{member.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ marginTop: '10px' }}>Create</button>
          <button type="button" style={{ marginLeft: '10px' }} onClick={() => { onClose(); setMessage(''); }}>Cancel</button>
        </form>
        {message && <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '10px' }}>{message}</div>}
      </div>
    </div>
  );
};

export default CreateProjectModal;
