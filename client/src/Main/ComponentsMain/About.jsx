import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../DesignMain/About.css';

const About = () => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        const res = await axios.get("https://projectihub-cloud-database.onrender.com/api/about/abouts");
        setAboutData(res.data);
      } catch (error) {
        console.error("Failed to fetch About content:", error);
      }
    };

    fetchAbouts();
  }, []);

  const getRandomColor = (colorIndex) => {
    const colors = ['#1a1a1a', 'linear-gradient(135deg, #f5f7fa 0%, #c3e0ff 100%)'];
    return colors[colorIndex % colors.length];
  };

  return (
    <div id='about' className='about-container'>
      {aboutData.map((about, index) => {
        const bgColor = getRandomColor(index);
        const textColor = bgColor.includes('linear-gradient') ? '#2d3436' : '#ffffff';

        return (
          <div
            key={index}
            className={`about-section ${index % 2 === 0 ? 'reverse-layout' : ''}`}
            style={{
              background: bgColor,
              color: textColor, // Ensures text is black on gradient
            }}
          >
            <div className='section-title'>
              <h1>{about.title}</h1>
            </div>

            <div className='about-content'>
              <div className='about-content-left'>
                {about.Imgurl && about.Imgurl.endsWith('.mp4') ? (
                  <video controls className="about-image" width="100%">
                    <source src={about.Imgurl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={about.Imgurl} alt="About Media" className="about-image" />
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
        );
      })}
    </div>
  );
};

export default About;
