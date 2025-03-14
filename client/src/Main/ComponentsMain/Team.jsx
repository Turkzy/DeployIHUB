import React, { useEffect, useState } from 'react'
import '../DesignMain/Team.css'
import axios from "axios";
import { message } from "antd";


const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
 
  useEffect(() => {
    fetchTeams();
  }, []);
    const fetchTeams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/team/teams");
        setTeamMembers(res.data);
      } catch (err) {
        message.error("Failed to Fetch Team Members");
      }
    };
    
  const handleDownload = async (member) => {
    try {
      const response = await axios({
        url: `http://localhost:5000/api/team/download-pdf/${member._id}`,
        method: 'GET',
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${member.name}-document.pdf`);
      
      document.body.appendChild(link);
      
      link.click();
      
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      message.success('Download Successfully');
    } catch (error) {
      console.error('Download error:', error);
      message.error('Failed to download PDF');
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
                src={member.Imgurl} 
                alt={member.name} 
                onClick={() => handleDownload(member)}

                style={{ 
                  cursor: 'pointer',
                  position: 'relative' 
                }}
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