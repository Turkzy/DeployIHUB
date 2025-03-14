import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../DesignAdmin/Login.css";
import logo from "../../img/ihublogo.gif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://cloud-database-test3.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      navigate("/CMS");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img src={logo} alt="Company Logo" className="login-logo" />
        <h1>
          Philippine <br />
          <span className="login-title">Innovation Hub</span>
        </h1>

        <div className="login-form-container">
          <h2 className="login-title">Welcome back!</h2>
          {error && <p className="login-error">{error}</p>}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>

            <button type="submit" className="login-button">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
