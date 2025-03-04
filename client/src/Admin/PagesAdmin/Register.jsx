import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("https://ihub-cloud-database.onrender.com/api/auth/create-account", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", response.data.accessToken);
      navigate("/login"); 
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="Register-container">
      <div className="image-left">
        {/* Left Side - Image */}
        <div  style={{ backgroundImage: "url('/your-image.jpg')" }}>
          <div >
            <h2 className="title-left">Join Us</h2>
            <p>Create an account to start your journey!</p>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
              CREATE ACCOUNT
            </button>
          </form>

          <div className="text-center mt-4">
            <p>Already have an account?</p>
            <button
              className="text-blue-500 underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
