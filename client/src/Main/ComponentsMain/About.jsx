import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../DesignMain/About.css';

const About = () => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/about/abouts");
        setAboutData(res.data);
      } catch (error) {
        console.error("Failed to fetch About content:", error);
      }
    };

    fetchAbouts();
  }, []);

  return (
    <div id='about' className='about-container'>
      {aboutData.map((about, index) => (
  <div
    key={index}
    className={`about-section ${index % 2 === 0 ? 'reverse-layout' : ''}`}
  >
    <div className='section-title'>
      <h1>{about.title}</h1>
    </div>

    <div className='about-content'>
      <div className='about-content-left'>
        {about.url && about.url.endsWith('.mp4') ? (
          <video controls className="about-image" width="100%">
            <source src={about.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={about.url} alt="About Media" className="about-image" />
        )}
      </div>

      <div className='about-content-right'>
        <div
          className='about-content-text'
          dangerouslySetInnerHTML={{ __html: about.content.replace(/\n/g, '<br />') }}
        />
      </div>
    </div>
  </div>
))}

    </div>
  );
};

export default About;
