import React, { useEffect, useRef, useState } from 'react';
import '../DesignMain/Home.css';
import axios from 'axios';

const Home = () => {
  const videoRef = useRef(null);
  const [homeContent, setHomeContent] = useState({
    title: '',
    content: '',
    Imgurl: ''
  });

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/home/homes');
        if (response.data && response.data.length > 0) {
          setHomeContent(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching home content:', error);
      }
    };
    fetchHomeContent();
  }, []);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (error) {
          console.log("Autoplay prevented, user interaction required", error);
        }
      }
    };
    playVideo();
  }, []);

  return (
    <div>
      <div id="home" className='home-container'>
        {homeContent.Imgurl && homeContent.Imgurl.endsWith('.mp4') ? (
          <video
            ref={videoRef}
            src={homeContent.Imgurl}
            loop
            muted
            playsInline
            autoPlay
            preload="auto"
            className="background-video"
          />
        ) : (
          <img 
            src={homeContent.Imgurl} 
            alt="background" 
            className="background-video"
          />
        )}
        <div className="background-overlay1"></div>
        <div className="content-wrapper">
          <div className="hero-section">
            <div className="hero-content">
              <h1>{homeContent.title}</h1>
              <p>{homeContent.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
