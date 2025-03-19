import React, { useEffect, useState } from 'react';
import '../DesignMain/Events.css';
import { message } from "antd";
import axios from "axios";

const ListEvent = () => {
  const [visibleEvents, setVisibleEvents] = useState(3);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("https://cloud-database-test3.onrender.com/api/event/events");
      setEvents(res.data);
    } catch (err) {
      message.error("Failed to fetch the Events");
    }
  };

  const sortedEventsList = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  const showMoreEvents = () => {
    setVisibleEvents((prevCount) =>
      prevCount + 3 <= sortedEventsList.length ? prevCount + 3 : sortedEventsList.length
    );
  };

  return (
    <div id='events' className='list-events-container'>
      <div className='list-events-content'>
        <h1>List of Events</h1>
      </div>

      <div className='events-grid'>
        {sortedEventsList.slice(0, visibleEvents).map((event, index) => (
          <a 
            key={index}
            href={event.link}
            className="event-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src={event.Imgurl} 
              className='event-image' 
              alt={event.title} 
            />
            <div className='event-details'>
              <h3>{event.title}</h3>
              <span>{event.date}</span>
            </div>
          </a>
        ))}
      </div>

      {visibleEvents < sortedEventsList.length && (
        <div className="see-more-container">
          <button onClick={showMoreEvents} className="see-more-button">
            See More Events
          </button>
        </div>
      )}
    </div>
  );
};

export default ListEvent;
