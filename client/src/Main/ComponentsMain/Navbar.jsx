import React, { useState, useEffect } from 'react'
import Logo from "../../img/ihublogo.gif"
import "../DesignMain/Navbar.css"
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useNavigate } from "react-router-dom";
import Logo1 from "../../img/ihublogo.png"

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className={`Navbar-title ${isScrolled ? 'scrolled' : ''}`}>
      <div className='content-logo'>
        <a href="http://54.251.84.27/testingIHUB/" className="logo-link">
          <img className="PIH-logo" src={Logo} alt="PIH Logo"/>
        </a>
        <a className='PIH-title-link' href="http://54.251.84.27/testingIHUB/">
         <img className="PIH-logos" src={Logo1} alt="PIH Logo"/>
        </a>
      </div>

      <button className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="menu-icon"></span>
      </button>

      <nav className={`navbar-content ${isMenuOpen ? 'active' : ''}`}>
        {[
          ['HOME', '#home'],
          ['VISION', '#vision'],
          ['ABOUT', '#about'],
          ['EVENTS', '#events'],
          ['TEAM', '#team'],
          ['CONTACT', '#contact']
        ].map(([title, url]) => (
          <li key={title}>
            <AnchorLink 
              className={`navbar-link ${menu === title.toLowerCase() ? 'active' : ''}`}
              href={url}
              onClick={() => {
                setMenu(title.toLowerCase());
                setIsMenuOpen(false);
              }}
            >
              {title}
              <span className="link-underline"></span>
            </AnchorLink>
          </li>
        ))}
      
      </nav>
    </div>
  )
}

export default Navbar