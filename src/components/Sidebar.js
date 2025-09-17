import React from 'react';
import ThemeToggle from './ThemeToggle';
import './sidebar.css'; // Optional: for styling

const Sidebar = ({ theme }) => {
  return (
    <div style={{
      width: '220px',
      backgroundColor: theme === 'dark' ? '#23272f' : '#1f2a40',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      justifyContent: 'space-between'
    }}>
      <div>
        <h2 style={{ marginBottom: '30px' }}>TEAMFLOW</h2>
        <nav>
          <div style={{ marginBottom: '15px', cursor: 'pointer' }}>Dashboard</div>
          <div style={{ marginBottom: '15px', cursor: 'pointer' }}>Create Project</div>
        </nav>
        <ThemeToggle />
      </div>
      <button style={{
        marginTop: 'auto',
        padding: '10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
      }}>
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;
