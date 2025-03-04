import React from 'react'
import '../DesignMain/Team.css'
import image1 from '../../img/Image1.png'
import image2 from '../../img/Image2.jpg'
import image3 from '../../img/Image3.png'
import image4 from '../../img/Image4.png'


const Team = () => {
  const teamMembers = [
    {
      name: "Saturnino H. Mejia",
      position: "General Manager",
      image: image1,
      pdfFile: "pdfs/sample.pdf",
    },
    {
      name: "Joyce Ann S. Azurin",
      position: "Department Manager",
      image: image2,
      pdfFile: "pdfs/sample2.pdf",
    },
    {
      name: "Jerahmeel Chen",
      position: "Chief Innovation Officer",
      image: image3,
      pdfFile: "pdfs/sample3.pdf",
    },
    {
      name: "Maria Cecilia Mendiola",
      position: "Administrative Officer",
      image: image4,
    },

  ];

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
                src={member.image} 
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