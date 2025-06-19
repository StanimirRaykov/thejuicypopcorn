import React, { useState } from "react";
import "../styles.css";

export default function RegisterPage() {
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Registration successful!");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <form className="auth-form" onSubmit={handleRegister}>
        <input type="text" placeholder="Username" className="auth-input" />
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="auth-footer">
        Already have an account? <a href="/loginpage">Login here</a>
      </p>
    </div>
  );
}
