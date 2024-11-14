import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../imgs/copo-logo.png";
import "./css/Navbar.css"; 

const Navbar = () => {
  // Simulação de verificação de login do usuário
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Substitua isso com a lógica real de verificação de login
    const checkLoginStatus = () => {
      // Exemplo: verificar se o token de autenticação existe no localStorage
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
      }
    };

    checkLoginStatus();
  }, []);

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
        {isLoggedIn ? (
          <Link to="/profile">Perfil</Link>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Cadastrar-se</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
