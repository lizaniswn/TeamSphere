import React, { useEffect, useState } from 'react';
import InviteMember from './InviteMember';

const ProjectBoard = ({ theme }) => {
  const [projects, setProjects] = useState([]);

  const reloadProjects = () => {
    fetch('http://localhost:5001/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
        }
      });
  };

  useEffect(() => {
    reloadProjects();
  }, []);

  return (
    <div>
            <h2>Projects</h2>
      <InviteMember />
      <div>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul>
            {projects.map(project => (
              <li key={project._id}>
                <strong>{project.name}</strong> (Owner: {project.owner})<br />
                Members: {project.members && project.members.length > 0
                  ? project.members.map(m => m.name).join(', ')
                  : 'None'}<br />
                Tasks: {project.tasks && project.tasks.length > 0
                  ? project.tasks.map(t => t.title).join(', ')
                  : 'None'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectBoard;
