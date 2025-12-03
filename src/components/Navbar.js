import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="stormz-nav">
      <NavLink to="/interview" className="nav-unfoldI">UNFOLD/I</NavLink>
      <NavLink to="/stormzmobile" className="nav-unfoldII">UNFOLD/II</NavLink>
      <NavLink to="/overflow" className="nav-unfoldIII">UNFOLD/III</NavLink>
      <NavLink to="/" className="nav-unfoldIV">UNFOLD/IV</NavLink>
      <NavLink to="/music" className="nav-music">MUSIQ</NavLink>
      <a
        href="https://www.paypal.me/olistormz"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-donate"
      >
        DON8
      </a>
    </nav>
  );
}

