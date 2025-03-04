import React, { useState } from 'react'
import logoStoryHub from '../../img/iHubStory.png'
import '../DesignMain/hub.css'

const Hub = () => {
  const [isStoryVisible, setIsStoryVisible] = useState(false);

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
            <p>In the heart of Makati, where skyscrapers pierce the sky and ambition vibrates through the streets, there stood a haven of dreams – The Philippine Innovation Hub. It is a sanctuary for startups, entrepreneurs, government officials, and key stakeholders who collaborate to share ideas and knowledge. It wasn't just a simple co-working place; it was a place of hope, constructed not steel and concrete but of dreams and collaboration. It's a place where a variety of skills converge to produce something extraordinary, something that has the potential to transform the entire world.
            <br></br><br></br>
            Fueled by a shared passion for curiosity, collaboration, and progress, the National Development Company (NDC) established the Philippine Innovation Hub (PH iHub) in July 2023. Led by Mr. GM Antonilo DC Mauricio, the NDC saw the Philippine Innovation Hub as a project with the potential to promote innovation across the country. To manage this project, Mr. Jerahmeel Chen was appointed as Chief Innovation Officer. The iHub is actively seeking and signing up with knowledge partners. Establishing the Philippine Innovative Registry, which is intended to serve as a hub and an intermediary for information on innovative projects that will benefit the country and its people. The Philippine Innovation Hub serves as the headquarters for the Startup Venture Fund (SVF), the Philippine E-commerce Platform (PEP), and the Ph AI Research Center (PAIR).
            <br></br><br></br>
            The hub's mission was simple yet powerful – to create a community where innovation thrived and knowledge was freely shared. As soon as you enter the doors of the Philippine Innovation Hub, you are transported into a world of boundless possibilities. The polished floors, sleek furnishings, and minimal accent walls create an atmosphere that is both energizing and welcoming. The space is designed to inspire and ignite a fire in the hearts of those who enter.
            <br></br><br></br>
            What truly sets the Philippine Innovation Hub apart is the sense of community it promotes. This is a place where creativity is encouraged, and teamwork is essential. People contribute their knowledge, experiences, and expertise to help others grow, achieve their full potential, and prosper.</p> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hub