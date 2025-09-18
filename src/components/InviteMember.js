import React, { useEffect, useState } from 'react';

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
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
};

const InviteMember = () => {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      fetch('http://localhost:5001/api/projects')
        .then(res => res.json())
        .then(data => {
          if (data.success) setProjects(data.data);
        });
      fetch('http://localhost:5001/api/members')
        .then(res => res.json())
        .then(data => {
          if (data.success) setMembers(data.data);
        });
    }
  }, [showModal]);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!selectedProject || !selectedMember) {
      setMessage('Please select both project and member.');
      return;
    }
    const res = await fetch(`http://localhost:5001/api/projects/${selectedProject}/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId: selectedMember })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('Member invited successfully!');
      setSelectedProject('');
      setSelectedMember('');
    } else {
      setMessage(data.error || 'Failed to invite member.');
    }
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{ marginBottom: '20px' }}>Invite Member</button>
      {showModal && (
        <div style={modalStyle} onClick={() => setShowModal(false)}>
          <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
            <h3>Invite Member to Project</h3>
            <form onSubmit={handleInvite}>
              <label>
                Project:<br />
                <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.name}</option>
                  ))}
                </select>
              </label>
              <br />
              <label>
                Member:<br />
                <select value={selectedMember} onChange={e => setSelectedMember(e.target.value)}>
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member._id} value={member._id}>{member.name}</option>
                  ))}
                </select>
              </label>
              <br />
              <button type="submit" style={{ marginTop: '10px' }}>Invite</button>
              <button type="button" style={{ marginLeft: '10px' }} onClick={() => { setShowModal(false); setMessage(''); }}>Cancel</button>
            </form>
            {message && <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: '10px' }}>{message}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default InviteMember;
