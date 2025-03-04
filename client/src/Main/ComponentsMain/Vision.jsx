import React from 'react';
import "../DesignMain/Vision.css";

const Vision = () => {
  return (
    <section id="vision" className="mvv-section">
      <div className="section-title">
        <h1>Company Mission, Vision, and Philosophy</h1>
      </div>
      <div className="mvv-container">
        <div className="mvv-card">
          <div className="card-icon">
            <i className="fas fa-rocket"></i>
          </div>
          <h3>Mission</h3>
          <div className="content">
            <p>Enabling industry development, spurring local economies through strategic investments and partnerships.</p>
          </div>
          <div className="card-wave"></div>
        </div>

        <div className="mvv-card">
          <div className="card-icon">
            <i className="fas fa-eye"></i>
          </div>
          <h3>Vision</h3>
          <div className="content">
            <p>Create a physical and virtual space that will consist of a community of innovators that will collate and create breakthrough ideas and solutions, to improve a process, a business, or a model to provide resources and research support</p>
          </div>
          <div className="card-wave"></div>
        </div>

        <div className="mvv-card">
          <div className="card-icon">
            <i className="fas fa-heart"></i>
          </div>
          <h3>Philosophy</h3>
          <div className="content">
            <p>We are committed to fulfill NDC's vital role in the overall economic development of the country. We advocate excellence, teamwork, and accountability to advance the interests of our stakeholders.</p>
          </div>
          <div className="card-wave"></div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
