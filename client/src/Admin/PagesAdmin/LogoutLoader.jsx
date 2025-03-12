import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutLogo from "../../img/ihublogo.gif"
import "../DesignAdmin/LogoutLoader.css"


const LogoutLoader = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('token'); 
            setLoading(false);
            navigate("/login"); 
        }, 2000); 
    }, [navigate]);

    return (
        <div className="logout-container">
            
            <img src={LogoutLogo}/>
            <p>Logging out...</p>
        </div>
    );
};

export default LogoutLoader;
