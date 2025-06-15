import React from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/copo-logo-branco.png";
import "./css/Navbar.css"; 

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="logo-container">
        <img src={logo} alt="Copo Logo" />
        <span>Elixir Natural</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Sucos">Sucos</Link>
        <Link to="/caddiagnostico">Cadastro</Link>
      </div>
    </nav>
  );
};

export default Navbar;
