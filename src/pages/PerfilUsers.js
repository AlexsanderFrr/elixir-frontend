import React, { useState, useEffect } from 'react';
import '../css/PerfilUsers.css';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function PerfilUsers() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState(null);

  useEffect(() => {
    if (user?.fotoPerfil) {
      setFotoPerfil(user.fotoPerfil);
    }
  }, [user]);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFotoPerfil(imageUrl);
      // Aqui você pode chamar uma função para salvar essa foto no backend
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-foto-wrapper">
        <img
          src={fotoPerfil || 'https://via.placeholder.com/150'}
          alt="Foto de Perfil"
          className="foto-perfil"
        />
        <label className="icon-camera">
          <FaCamera />
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            hidden
          />
        </label>
      </div>

      <div className="perfil-info">
        <h2>{user?.nome || 'Usuário'}</h2>
        <p>{user?.email || 'email@exemplo.com'}</p>
      </div>

      <div className="perfil-opcoes">
        <button className="opcao-btn" 
        onClick={() => navigate('/favoritos')}>
        <FaHeart className="icon" />
         Favoritos
        </button>


        <button className="opcao-btn sair" onClick={logout}>
          <FaSignOutAlt className="icon" />
          Sair
        </button>
      </div>
    </div>
  );
}

export default PerfilUsers;
