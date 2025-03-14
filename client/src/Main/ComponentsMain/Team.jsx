import React, { useEffect, useState } from 'react'
import '../DesignMain/Team.css'
import axios from "axios";
import { message, Modal, Button, Spin } from "antd";
import { Document, Page, pdfjs } from 'react-pdf';
import { 
    ZoomInOutlined, 
    ZoomOutOutlined, 
    DownloadOutlined 
} from '@ant-design/icons';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(0);

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
    
  const handleDownload = async (member) => {
    try {
      const response = await axios({
        url: `http://localhost:5000/api/team/download-pdf/${member._id}`,
        method: 'GET',
        responseType: 'blob', // Important for file download
      });

      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${member.name}-document.pdf`);
      
      // Append to html link element page
      document.body.appendChild(link);
      
      // Start download
      link.click();
      
      // Clean up and remove the link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      message.success('Download started successfully');
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

      {/* PDF Viewer Modal */}
      <Modal
        title={selectedMember ? `${selectedMember.name}'s PDF` : 'PDF Viewer'}
        open={isPdfModalOpen}
        onCancel={() => setIsPdfModalOpen(false)}
        width={1000}
        footer={null}
        bodyStyle={{ height: '80vh' }}
      >
        <div className="pdf-viewer-container">
          {loading && <div className="pdf-loading"><Spin size="large" /></div>}
          
          <div className="pdf-controls">
            <Button.Group>
              <Button 
                onClick={() => setPageNumber(pageNumber - 1)} 
                disabled={pageNumber <= 1}
              >
                Previous
              </Button>
              <Button 
                onClick={() => setPageNumber(pageNumber + 1)} 
                disabled={pageNumber >= numPages}
              >
                Next
              </Button>
            </Button.Group>
            
            <span className="page-info">
              Page {pageNumber} of {numPages}
            </span>
            
            <div className="pdf-actions">
              <Button.Group>
                <Button onClick={() => setLoading(true)} icon={<ZoomOutOutlined />} />
                <Button onClick={() => setLoading(true)} icon={<ZoomInOutlined />} />
              </Button.Group>
              
              {selectedMember && (
                <Button 
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => handleDownload(selectedMember)}
                  style={{ marginLeft: '10px' }}
                >
                  Download
                </Button>
              )}
            </div>
          </div>

          {/* ... existing PDF document viewer ... */}
        </div>
      </Modal>
    </div>
  )
}

export default Team