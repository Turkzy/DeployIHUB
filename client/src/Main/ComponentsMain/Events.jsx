import React, { useState } from 'react';
import '../DesignMain/Events.css';
import event1 from '../../img/events/event1.jpg';
import event2 from '../../img/events/event2.jpg';
import event3 from '../../img/events/event3.jpg';
import event4 from '../../img/events/event4.jpg';
import event5 from '../../img/events/event5.jpg';
import event6 from '../../img/events/event6.jpg';
import event7 from '../../img/events/event7.jpg';
import event8 from '../../img/events/event8.jpg';
import event9 from '../../img/events/event9.jpg';
import event10 from '../../img/events/event10.jpg';


const Events = () => {
  const [visibleEvents, setVisibleEvents] = useState(3); 

  const eventsList = [
    {
      title: "NDC Brainstorming Session with Block Dojo PH and Startup Founders",
      date: "Jan 25, 2024",
      image: event1,
      link: "https://www.ndc.gov.ph/latest-updates/ndc-brainstorming-session-block-dojo-ph-and-startup-founders",
    },
    {
      title: "NDC Signs MOU for Knowledge Partnership with AHG Lab",
      date: "Jan 23, 2024",
      image: event2,
      link: "https://www.ndc.gov.ph/latest-updates/ndc-signs-mou-knowledge-partnership-ahg-lab",
    },
    {
      title: "Fundamentals of Fundraising Workshop at the Philippine Innovation Hub",
      date: "Jan 31, 2024",
      image: event3,
      link: "https://www.ndc.gov.ph/latest-updates/fundamentals-fundraising-workshop-philippine-innovation-hub",
    },
    {
      title: "NDC’s exploratory meeting on projects with Singapore and the PH Innovation Hub’s first overseas expansion",
      date: "Feb 13, 2024",
      image: event4,
      link: "https://www.ndc.gov.ph/latest-updates/ndcs-exploratory-meeting-projects-singapore-and-ph-innovation-hubs-first-overseas",
    },
    {
      title: "NDC's first mixer event for 2024 with its Knowledge Partners and Co-Investment Partners",
      date: "Feb 19, 2024",
      image: event5,
      link: "https://www.ndc.gov.ph/latest-updates/ndcs-first-mixer-event-2024-its-knowledge-partners-and-co-investment-partners",
    },
    {
      title: "NDC signs memorandum of understanding agreements with AIESEC Philippines, Bughaw Creative Collective, and StartUp Village",
      date: "Feb 28, 2024",
      image: event5,
      link: "https://www.ndc.gov.ph/latest-updates/ndc-signs-memorandum-understanding-agreements-aiesec-philippines-bughaw-creative",
    },
    {
      title: "Talks on raising funds in the Middle East and Malaysia through Maybank",
      date: "May 17, 2024",
      image: event6,
      link: "https://www.ndc.gov.ph/latest-updates/talks-raising-funds-middle-east-and-malaysia-through-maybank",
    },
    {
      title: "Inaugural NDC Provident Fund, Inc. general assembly",
      date: "May 21, 2024",
      image: event7,
      link: "https://www.ndc.gov.ph/latest-updates/inaugural-ndc-provident-fund-inc-general-assembly",
    },
    {
      title: "NDC pursues global Innovation Management certification",
      date: "Sep 12, 2024",
      image: event8,
      link: "https://www.ndc.gov.ph/latest-updates/ndc-pursues-global-innovation-management-certification",
    },
    {
      title: "Five MOU signing with knowledge partners at the Philippine Innovation Hub",
      date: "Aug 12, 2024",
      image: event9,
      link: "https://www.ndc.gov.ph/latest-updates/five-mou-signing-knowledge-partners-philippine-innovation-hub",
    },
    {
      title: "TRB’s acquisition of NDC Pandacan property makes way for Skyway Stage 3 project",
      date: "Jun 18, 2024",
      image: event10,
      link: "https://www.ndc.gov.ph/latest-updates/trbs-acquisition-ndc-pandacan-property-makes-way-skyway-stage-3-project",
    }
  ];

  // Sort events in descending order by date
  const sortedEventsList = eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));

  const showMoreEvents = () => {
    setVisibleEvents(prevCount => 
      prevCount + 3 <= sortedEventsList.length ? prevCount + 3 : sortedEventsList.length
    );
  };

  return (
    <div id='events' className='events-container'>
      <div className='events-content'>
        <h1>Latest Events</h1>
      </div>
      <div className='events-timeline'>
        {sortedEventsList.slice(0, visibleEvents).map((event, index) => (
          <a 
            key={index}
            href={event.link}
            className="event-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src={event.image} 
              className='event-image' 
              alt={event.title} 
            />
            <div className='event-content'>
              <div className='event-title'>
                <h3>{event.title}</h3>
                <span>{event.date}</span>
              </div>
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

export default Events;
