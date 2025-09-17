import React from 'react';

const InviteMember = () => {
  const handleInvite = () => {
    // Trigger backend API here
    alert('Invite sent!');
  };

  return (
    <button onClick={handleInvite}>Invite Member</button>
  );
};

export default InviteMember;
