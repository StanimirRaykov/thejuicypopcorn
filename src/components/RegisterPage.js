import React from "react";
import "../styles.css";

export default function RegisterPage() {
  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <form className="auth-form">
        <input type="text" placeholder="Username" className="auth-input" />
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button type="submit" className="auth-button">
          Register
        </button>
      </form>
      <p className="auth-footer">
        Already have an account? <a href="/loginpage">Login here</a>
      </p>
    </div>
  );
}
