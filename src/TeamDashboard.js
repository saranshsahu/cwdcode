import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamDashboard.css'; 

const TeamDashboard = () => {
const [teamData, setTeamData] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
    
    axios.get('https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098')
    .then(response => {
        setTeamData(response.data);
    })
    .catch(error => {
        console.error('Error fetching team data:', error);
    });
}, []);

const filterMembers = (member) => {
    const fullName = `${member.first_name} ${member.last_name}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
};

const getRoleSection = (role) => (
    <div className="role-section">
    <h2>{role.charAt(0).toUpperCase() + role.slice(1) + 's'}</h2>
    <div className="role-tiles">
        {teamData
        .filter((member) => member.role === role && filterMembers(member))
        .map((member) => (
            <div key={member.id} className="member-tile">
            <div className="image-container">
                <img src={member.img} alt={`${member.first_name} ${member.last_name}`} />
            </div>
            <div className="member-info">
                <div className="name-container">
                <span className="member-name">{member.first_name}</span>
                <span className="member-lastname">{member.last_name}</span>
                </div>
                <span className="member-email">{member.email}</span>
            </div>
            </div>
        ))}
    </div>
    </div>
);

return (
    <div className="team-dashboard">
    <div className="team-header">
    <span className="team-name">Team</span>
        <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
    <div className="team-body">
        {getRoleSection('admin')}
        {getRoleSection('member')}
    </div>
    </div>
);
};

export default TeamDashboard;