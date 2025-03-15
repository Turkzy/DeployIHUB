import React, { useState, useEffect } from 'react'
import logoStoryHub from '../../img/iHubStory.png'
import '../DesignMain/hub.css'
import axios from 'axios';

const Hub = () => {
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [hubContent, setHubContent] = useState('');

  useEffect(() => {
    const fetchHubContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hub/hub');
        if (response.data && response.data.length > 0) {
          setHubContent(response.data[0].content);
        }
      } catch (error) {
        console.error('Error fetching hub content:', error);
      }
    };
    fetchHubContent();
  }, []);

  const toggleStory = () => {
    setIsStoryVisible(!isStoryVisible);
  };

  return (
    <div id="home" className='hub-container'>
      <div className="background-overlay"></div>
      <div className="hub-content-wrapper">
        <div className="hub-hero-section">
          <div className="hub-hero-content">
            <h1>iHub <span>Story</span></h1>
            <p>iHub: A Story</p>
            <p>Shaping the future to creativity and innovation</p>
            <button className='hub-button' onClick={toggleStory}>
              {isStoryVisible ? 'Show Less' : 'Read More'}
            </button>
          </div>
        </div>
        
        <div className={`story-content ${isStoryVisible ? 'visible' : ''}`}>
          <div className="story-inner">
            <div className="story-left">
            <img src={logoStoryHub} alt="iHub Story" />
            </div>
            <div className="story-right">
              <div dangerouslySetInnerHTML={{ 
                __html: hubContent.replace(/\n/g, '<br />') 
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hub