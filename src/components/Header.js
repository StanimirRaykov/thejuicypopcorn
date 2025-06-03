import React from "react";
import "../styles.css";

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src="fullLogo.png" alt="The Juicy Popcorn!" />
      <h2 className="app-subtitle">Grab your popcorn!!!</h2>
    </div>
  );
}
