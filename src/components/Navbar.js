import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../imgs/copo-logo-branco.png";
import "./css/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav id="navbar">
      <div className="logo-container">
        <img src={logo} alt="Copo Logo" />
        <span>Elixir Natural</span>
      </div>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Sucos">Sucos</Link>
        
        {/* Mostrar link de admin apenas para usuários administradores */}
        {user?.isAdmin && (
          <Link to="/admin" className="admin-link">
            <i className="fas fa-crown"></i> Admin
          </Link>
        )}
        
        {/* Mostrar Perfil ou Login/Cadastro baseado no estado de autenticação */}
        {user ? (
          <>
            <Link to="/perfil" className="profile-link">
              <i className="fas fa-user"></i> Perfil
            </Link>
            <button onClick={logout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i> Sair
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">
            <i className="fas fa-sign-in-alt"></i> Login/Cadastro
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;