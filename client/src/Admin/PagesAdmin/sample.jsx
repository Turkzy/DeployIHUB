import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard!</h1>
      
      {isLoggedIn && (
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Dashboard;
