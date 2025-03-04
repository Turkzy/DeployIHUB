import React from 'react'
import "../DesignMain/Footer.css"

const Footer = () => {
  return (
    <div className='Footer-container'>
        <div className='Footer-content'>
            <h1 className='Footer-title'>© 2025 National Development Company. All Rights Reserved</h1>
        </div>
        <div className='Footer-dev'>
          <li><a href='https://turzkyportfolio.netlify.app/'><ion-icon name="code-outline"></ion-icon>Developed by</a></li>
        </div>
    </div>
  )
}

export default Footer