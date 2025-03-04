import React, { useEffect, useState } from "react";
import "../DesignAdmin/Header.css"

const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserName(parsedUser.name);
    }
  }, []);

  return (
    <div className="header-name">Welcome Back, {userName ? userName : "Guest"}!</div>
  );
};

export default Header;
