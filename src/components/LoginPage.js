import React from "react";
import "../styles.css";

export default function LoginPage() {
  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <form className="auth-form">
        <input type="email" placeholder="Email" className="auth-input" />
        <input type="password" placeholder="Password" className="auth-input" />
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      <p className="auth-footer">
        Don't have an account? <a href="/registerpage">Register here</a>
      </p>
    </div>
  );
}
