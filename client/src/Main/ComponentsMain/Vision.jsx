import React, { useEffect, useState } from "react";
import axios from "axios";
import "../DesignMain/Vision.css";

const Vision = () => {
  const [visions, setVisions] = useState([]);

  useEffect(() => {
    const fetchVisions = async () => {
      try {
        const res = await axios.get("https://cloud-database-test3.onrender.com/api/vision/visions");

        // Predefined Order: Mission -> Vision -> Values
        const order = ["mission", "vision", "values"];
        
        // Sort based on predefined order
        const sortedVisions = res.data.sort((a, b) => {
          return order.indexOf(a.title.toLowerCase()) - order.indexOf(b.title.toLowerCase());
        });

        setVisions(sortedVisions);
      } catch (error) {
        console.error("Failed to fetch the content of Vision/Mission", error);
      }
    };

    fetchVisions();
  }, []);

  return (
    <section id="vision" className="mvv-section">
      <div className="vision-title">
        <h1>OUR VISION</h1>
      </div>

      <div className="mvv-container">
        {visions.map((vision) => (
          <div key={vision._id} className="mvv-card">
            <div className={`card-header ${vision.title.toLowerCase()}`}>
              {vision.title}
            </div>

            <div className="card-content">
              <div className="card-icon">
                {vision.title.toLowerCase().includes("mission") && (
                  <i className="fas fa-rocket"></i>
                )}
                {vision.title.toLowerCase().includes("vision") && (
                  <i className="fas fa-eye"></i>
                )}
                {vision.title.toLowerCase().includes("values") && (
                  <i className="fas fa-gem"></i>
                )}
              </div>

              <p>{vision.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Vision;
