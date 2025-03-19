import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';  // Assuming you use Ant Design for notifications
import '../DesignMain/Events.css'; 

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/event/events");
      setEvents(res.data);
    } catch (err) {
      message.error("Failed to fetch the Events");
    }
  };

  return (
    <div className="event-container">
      <h1>Latest Events</h1>

      {events.map((event, index) => (
        <div className="event-card" key={index}>
          <div className="event-date">
           <span>{event.date}</span>
          </div>

          <img 
            src={event.Imgurl} 
            className='event-image' 
            alt={event.title} 
          />

          <div className="event-info">
            <h2>{event.title}</h2>
            <p>1015 California Ave, Los Angeles CA</p>
            <p>2:00 pm — 8:00 pm</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non
              dignissim eu turpis non hendrerit. Nunc nec lacus tellus.
            </p>
            <a 
              href={event.link}
              className="event-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Event Details →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
