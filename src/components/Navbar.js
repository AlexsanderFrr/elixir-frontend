// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../imgs/copo-logo-branco.png";
import { FaCommentAlt } from "react-icons/fa";
import { useChatPopup } from "../contexts/ChatPopupContext"; // Importa o contexto do popup
import "./css/Navbar.css";

const Navbar = () => {
  const { user, loading } = useAuth();
  const { openPopup } = useChatPopup(); // Usa a função para abrir o popup

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <nav id="navbar">
      <div className="logo-container">
        <img src={logo} alt="Copo Logo" />
        <span>Elixir Natural</span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/sucos"> | Bebidas</Link>

        {user?.isAdmin && (
          <Link to="/admin" className="admin-link">
            <i className="fas fa-crown"></i> | Painel do Administrador
          </Link>
        )}

        {user && (
          <button
            onClick={openPopup}
            className="chat-link"
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <FaCommentAlt /> ChatBot
          </button>
        )}

        {user ? (
          <Link to="/perfil" className="profile-link">
            <i className="fas fa-user"></i> | Perfil
          </Link>
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
