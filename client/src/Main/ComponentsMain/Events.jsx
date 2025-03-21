import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { message } from 'antd'; 
import { Link } from 'react-router-dom';
import '../DesignMain/Events.css'; 

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://projectihub-cloud-database.onrender.com/api/event/events");
  
      const formattedEvents = res.data
        .map((event) => ({
          ...event,
          date: new Date(event.date),
          formattedDate: new Date(event.date).toLocaleString("en-US", {
            month: "long", 
            day: "2-digit", 
            year: "numeric"
          })
        }))
        .sort((a, b) => b.date - a.date)
        .slice(0, 3); 
  
      setEvents(formattedEvents); 
    } catch (err) {
      message.error("Failed to fetch the Events");
    }
  };
  


  return (
    <div id="events" className="event-container">
      <h1>LATEST UPDATES</h1>
      
      

      {events.map((event, index) => (
        <div className="event-card" key={index}>
          

          <img 
            src={event.Imgurl} 
            className='event-image' 
            alt={event.title} 
          />

          <div className="event-info">
          <div className="event-date">
           <span>{event.formattedDate}</span>
          </div>
            <h2>{event.title}</h2>
            <div
                  className='event-content-text'
                  dangerouslySetInnerHTML={{ __html: event.content.replace(/\n/g, '<br />') }}
                />
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
      <div className="link-event-container">
         <Link className="link-event" to="/listevent">View All Events</Link>
      </div>
    </div>
  );
};

export default Events;
