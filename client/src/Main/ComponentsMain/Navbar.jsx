import React, { useState, useEffect } from 'react'
import Logo from "../../img/ihublogo.gif"
import "../DesignMain/Navbar.css"
import AnchorLink from 'react-anchor-link-smooth-scroll';

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
          <img className="PIH-logo" src={Logo} alt="PIH Logo"/>
          <h1 className='logo-title'>Philippine <br />
          <span className="logo-title">Innovation Hub</span>
          </h1>
      </div>

      

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
      <button className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="menu-icon"></span>
      </button>
    </div>
  )
}

export default Navbar