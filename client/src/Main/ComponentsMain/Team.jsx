import React, { useEffect, useState } from 'react'
import '../DesignMain/Team.css'
import axios from "axios";
import { message } from "antd";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Fetch Team Members from API
  useEffect(() => {
    fetchTeams();
  }, []);
    const fetchTeams = async () => {
      try {
        const res = await axios.get("https://cloud-database-test3.onrender.com/api/team/teams");
        setTeamMembers(res.data);
      } catch (err) {
        message.error("Failed to Fetch Team Members");
      }
    };
    
  return (
    <div id="team" className='team-section'>
      <div className='team-title'>
        <h1>Our Team</h1>
        <p>Meet the innovative minds behind Philippine Innovation Hub</p>
      </div>
      
      <div className='team-grid'>
        {teamMembers.map((member, index) => (
          <div className='team-member' key={index}>
            <div className='member-image'>
              <img 
                src={member.url} 
                alt={member.name} 
                onClick={() => {
                  if (member.pdfFile) {
                    window.open(member.pdfFile, '_blank');
                  }
                }}
                style={{ cursor: member.pdfFile ? 'pointer' : 'default' }}
              />
            </div>
            <div className='member-info'>
              <h3>{member.name}</h3>
              <p className='position'>{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Team