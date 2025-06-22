// components/PerfilUsers.js
import React, { useState, useEffect } from 'react';
import '../css/PerfilUsers.css';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaSignOutAlt, FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { apiEndpoint } from '../config/constantes';

function PerfilUsers() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState(user?.imagem || null);

  const isAdmin = user?.tipo === 'admin'; // 👈 verifica se é admin

  useEffect(() => {
    if (user?.imagem) {
      setFotoPerfil(user.imagem);
    }
  }, [user]);

  const handleFotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("imagem", file);

    try {
      const response = await apiEndpoint.put("/usuario/me", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        const usuarioAtualizado = await apiEndpoint.get("/usuario/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setFotoPerfil(usuarioAtualizado.data.imagem);
        updateUser({ ...user, imagem: usuarioAtualizado.data.imagem });

        alert("Foto de perfil atualizada com sucesso!");
      } else {
        alert("Falha ao atualizar foto de perfil.");
      }
    } catch (error) {
      console.error("Erro ao atualizar foto de perfil:", error);
      alert("Falha ao atualizar foto de perfil.");
    }
  };

  const handleLogout = () => {
    const confirmado = window.confirm("Você realmente deseja sair do site?");
    if (confirmado) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="perfil-container">
          <div className="perfil-foto-wrapper">
            <img
              src={fotoPerfil || 'https://via.placeholder.com/150'}
              alt="Foto de Perfil"
              className="foto-perfil"
            />
            <label className="icon-camera" title="Alterar foto de perfil">
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
            {/* Só exibe favoritos se NÃO for admin */}
            {!isAdmin && (
              <button className="opcao-btn" onClick={() => navigate('/favoritos')}>
                <FaHeart className="icon" />
                Favoritos
              </button>
            )}

            <button className="opcao-btn sair" onClick={handleLogout}>
              <FaSignOutAlt className="icon" />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilUsers;
