import React, { useEffect, useRef } from 'react'
import '../DesignMain/About.css'
import image2 from '../../img/bg3.jpg'
import ihub from '../../img/ihub.jpg'

const About = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div id='about' className='about-container'>
      <div className='section-title'>
        <h1>About Us</h1>
      </div>
      <div className='about-content'>
        <div className='about-content-left'>
          <img src={ihub} alt="About" className="about-image" />
        </div>
        <div className='about-content-right'>
          <p>
            The Philippine Innovation Hub represents a pivotal advancement in the National Development Company (NDC) mission to encourage greater engagement and cooperation with the startup community. This initiative plays a crucial role in facilitating the convergence of government entities and the broader entrepreneurial ecosystem.
            <br></br><br></br>
            Functioning as a centralized platform, the iHub serves as a venue where startups, entrepreneurs, government officials, and key stakeholders come together to exchange ideas, collaborate on shared goals, and nurture an environment conducive to innovation and entrepreneurship.
            <br></br><br></br>
            Through dedicated programs, services, and networking opportunities, the government extends support and guidance to entrepreneurs, assisting them in overcoming obstacles, expanding their enterprises, and establishing connections with potential investors, consumers, and partners.
          </p>
        </div> 
      </div>
      <div className='about-history'>
        <div className='section-title'>
          <h1>History</h1>
        </div>
        <div className='about-history-content'>
          <div className='about-history-content-left'>
            <p>
              The establishment of the Philippine Innovation Hub is firmly grounded in the vision of the National Economic and Development Authority (NEDA) to propel innovation, aligning with the objectives delineated in Republic Act No. 11293, specifically in sections 13 and 25 that underscore the significance of Innovation Alliances.
              These statutory provisions accentuate the government's dedication to collaborative endeavors with academia and the private sector, with the explicit goal of fostering and nurturing innovation initiatives.
              <br></br><br></br>Recognizing the vital role that startups play in driving innovation, the NDC embarked on a journey to promote and empower startups, cultivating innovative ideas and facilitating global connectivity.
            </p>
          </div>
          <div className='about-history-content-right'>
            <img src={image2} alt="History" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About