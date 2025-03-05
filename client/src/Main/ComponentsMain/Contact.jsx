import React, { useState, useEffect } from "react";
import axios from "axios";
import "../DesignMain/Contact.css";

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/contact/all-contacts"
      );
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "66524354-c3fd-4e34-9dcf-c32172a30295");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      setShowSuccess(true);
      event.target.reset();
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <div id="contact" className="Contact">
      {showSuccess && (
        <div className="success-message">
          <div className="success-content">
            <div className="success-icon">
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </div>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully.</p>
          </div>
        </div>
      )}
      <div className="contact-title">
        <h1>Get In Touch</h1>
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>
            Contact <span className="title-Me">Us!</span>
          </h1>
          <div className="contact-details">
            {contacts.length > 0 && (
              <>
                <span>
                  <ion-icon name="call-outline"></ion-icon> {contacts[0].phone}
                </span>
                <span>
                  <ion-icon name="mail-outline"></ion-icon> {contacts[0].email}
                </span>
                <span>
                  <ion-icon name="location-outline"></ion-icon>{" "}
                  {contacts[0].address}
                </span>
              </>
            )}
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=14.64074,121.11714&output=embed"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right">
          <label htmlFor="">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            required
          ></input>
          <label htmlFor="">Your Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            required
          ></input>
          <label htmlFor="">Write your Message here</label>
          <textarea
            name="message"
            placeholder="Enter your message"
            required
          ></textarea>
          <button type="submit" className="contact-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
