import React, { useEffect, useState } from 'react';
import '../DesignMain/ListEvent.css';
import { message } from "antd";
import axios from "axios";

const ListEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://projectihub-cloud-database.onrender.com/api/event/events");

      const formattedEvents = res.data.map((event) => ({
        ...event,
        date: new Date(event.date),
        formattedDate: new Date(event.date).toLocaleString("en-US", {
          month: "long", 
          day: "2-digit", 
          year: "numeric"
        })
      }));

      setEvents(formattedEvents);
    } catch (err) {
      message.error("Failed to fetch the Events");
    } finally {
      setLoading(false);
    }
};


  const sortedEventsList = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div id='events' className='list-events-container'>
      <div className='list-events-content'>
        <h1>LIST OF EVENTS</h1>
      </div>

      <div className='list-events-grid'>
      {loading ? (
    <p className="loading-message">Loading events...</p>
) : (
    sortedEventsList.map((event, index) => (
      <a 
        key={index}
        href={event.link}
        className="list-event-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img 
          src={event.Imgurl} 
          className='list-event-image' 
          alt={event.title} 
        />
        <div className='list-event-details'>
          <span>{event.formattedDate}</span>
          <h3>{event.title}</h3>
        </div>
      </a>
    ))
)}

           
      </div>
    </div>
  );
};

export default ListEvent;
