import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function LoginPage({ onLogin }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("loggedIn", "true");
      setError(null);
      // You can navigate to a dashboard here if needed
      onLogin(); // notify App.js
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <form className="auth-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="auth-footer">
        Don't have an account? <a href="/registerpage">Register here</a>
      </p>
    </div>
  );
}
