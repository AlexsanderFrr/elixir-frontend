import React, { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../imgs/copo-logo-branco.png";
import { FaCommentAlt, FaBars, FaTimes, FaUser, FaCrown, FaSignInAlt } from "react-icons/fa";
import { useChatPopup } from "../contexts/ChatPopupContext";
import "./css/Navbar.css";

const Navbar = () => {
  const { user, loading } = useAuth();
  const { openPopup } = useChatPopup();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Nova função para tratar clique no logo
  const handleLogoClick = () => {
    closeMenu();
    navigate(-1);  // volta uma página no histórico
  };

  return (
    <nav id="navbar">
      {/* Logo + texto com clique para voltar */}
      <div
        className="logo-container"
        onClick={handleLogoClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          userSelect: 'none',
          color: 'inherit',
        }}
      >
        <img src={logo} alt="Copo Logo" />
        <span>Elixir Natural</span>
      </div>

      {isMobile && (
        <>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          
          {menuOpen && (
            <div 
              className="menu-overlay" 
              onClick={closeMenu}
            />
          )}
        </>
      )}

      <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        
        <Link to="/sucos" onClick={closeMenu}>
          Bebidas
        </Link>

        {user?.isAdmin && (
          <Link to="/admin" className="admin-link" onClick={closeMenu}>
            <FaCrown /> Painel Admin
          </Link>
        )}

        {user && (
          <button
            onClick={() => {
              openPopup();
              closeMenu();
            }}
            className="chat-link"
          >
            <FaCommentAlt /> ChatBot
          </button>
        )}

        {user ? (
          <Link to="/perfil" className="profile-link" onClick={closeMenu}>
            <FaUser /> Perfil
          </Link>
        ) : (
          <Link to="/login" className="login-link" onClick={closeMenu}>
            <FaSignInAlt /> Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
