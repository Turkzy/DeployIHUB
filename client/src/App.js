import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// PAGES ADMIN
import Login from "./Admin/PagesAdmin/Login";
import Register from "./Admin/PagesAdmin/Register";
import Dashboard from "./Admin/PagesAdmin/Dashboard";

// COMPONENTS ADMIN



// MAIN COMPONENTS
import Navbar from './Main/ComponentsMain/Navbar';
import Home from './Main/ComponentsMain/Home';
import Vision from './Main/ComponentsMain/Vision';
import About from './Main/ComponentsMain/About';
import StoryHub from './Main/ComponentsMain/hub';
import Events from './Main/ComponentsMain/Events';
import Partnership from './Main/ComponentsMain/Partnership';
import Team from './Main/ComponentsMain/Team';
import Contact from './Main/ComponentsMain/Contact';
import Footer from './Main/ComponentsMain/Footer';
import LogoutLoader from "./Admin/PagesAdmin/LogoutLoader";

import ListEvent from "./Main/ComponentsMain/ListEvent";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Check if token is expired
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const isExpired = payload.exp * 1000 < Date.now();
          
          if (isExpired) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const DashboardPanel = () => {
    return (
      <>
        <Navbar />
        <Home/>
        <Vision/>
        <About/>
        <StoryHub/>
        <Events/>
        <Partnership/>
        <Team/>
        <Contact/>
        <Footer/>
      </>
    );
  };

  const CMS = () => {
    return (
      <>
        <Dashboard/>
      </>
    )
  }

  const LoginPanel = () => {
    return (
      <>
        <Login />
        
      </>
    );
  };

  const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem("token");
  
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/CMS" /> : <LoginPanel />} />
        <Route path="/" element={<DashboardPanel />} />
        <Route path="/CMS" element={<ProtectedRoute element={<CMS />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Logout" element={<LogoutLoader />}/>
        <Route path="/ListEvent" element={<ListEvent/>}/>
      </Routes>
    </Router>
  );
};

export default App;
