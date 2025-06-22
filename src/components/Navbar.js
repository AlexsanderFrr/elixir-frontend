import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../imgs/copo-logo-branco.png";
import "./css/Navbar.css";

const Navbar = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Ou um spinner
  }

  return (
    <nav id="navbar">
      <div className="logo-container" onClick={() => (window.location.href = '/')}>
        <img src={logo} alt="Copo Logo" />
        <span>Elixir Natural</span>
      </div>
      
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Sucos"> | Bebidas</Link>
        
        {user?.isAdmin && (
          <Link to="/admin" className="admin-link">
            <i className="fas fa-crown"></i> | Painel do Administrador
          </Link>
        )}
        
        {user ? (
          <>
            <Link to="/perfil" className="profile-link">
              <i className="fas fa-user"></i> | Perfil
            </Link>
            {/* Botão Sair removido daqui */}
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