import React, { useEffect, useState } from "react";
import "../DesignAdmin/Header.css";

const Header = () => {
  const [userName, setUserName] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState({
    date: new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    time: new Date().toLocaleTimeString(),
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name);
    }

    // Update the time every second
    const interval = setInterval(() => {
      setCurrentDateTime({
        date: new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        time: new Date().toLocaleTimeString(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div className="header-name">
        Welcome Back, {userName ? userName : "Guest"}!
      </div>
      <div className="header-datetime">
        <div className="date">{currentDateTime.date}</div>
        <div className="time">{currentDateTime.time}</div>
      </div>
    </div>
  );
};

export default Header;
