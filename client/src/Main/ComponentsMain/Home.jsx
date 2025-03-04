import React, { useEffect, useRef } from 'react';
import video from '../../img/vid2.mp4';
import '../DesignMain/Home.css';

const Home = () => {
  const videoRef = useRef(null);

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
        <video
          ref={videoRef}
          src={video}
          loop
          muted
          playsInline
          className="background-video"
        />
        <div className="background-overlay1"></div>
        <div className="content-wrapper">
          <div className="hero-section">
            <div className="hero-content">
              <h1>Welcome to the Philippine Innovation Hub</h1>
              <p>
                Where creativity shapes the future. Our hub is a vibrant center for innovation,
                collaboration, and progress in this dynamic archipelago. We unlock Filipino talent, where
                ideas take flight, dreams become reality, and innovation knows no bounds!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
