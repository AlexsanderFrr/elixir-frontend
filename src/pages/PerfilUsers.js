// components/PerfilUsers.js
import React, { useState, useEffect } from 'react';
import '../css/PerfilUsers.css';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaSignOutAlt, FaCamera, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { apiEndpoint } from '../config/constantes';

function PerfilUsers() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [fotoPerfil, setFotoPerfil] = useState(user?.imagem || null);

  // Estados para edição
  const [editNome, setEditNome] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  // Campos editáveis
  const [novoNome, setNovoNome] = useState(user?.nome || '');
  const [novoEmail, setNovoEmail] = useState(user?.email || '');

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
    if (window.confirm("Você realmente deseja sair do site?")) {
      logout();
      navigate('/');
    }
  };

  const salvarNome = async () => {
    try {
      const response = await apiEndpoint.put(
        "/usuario/me",
        { nome: novoNome },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.status === 200) {
        updateUser({ ...user, nome: novoNome });
        setEditNome(false);
        alert("Nome atualizado com sucesso!");
      } else {
        alert("Falha ao atualizar nome.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar nome.");
    }
  };

  const salvarEmail = async () => {
    try {
      const response = await apiEndpoint.put(
        "/usuario/me",
        { email: novoEmail },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.status === 200) {
        updateUser({ ...user, email: novoEmail });
        setEditEmail(false);
        alert("Email atualizado com sucesso!");
      } else {
        alert("Falha ao atualizar email.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar email.");
    }
  };

  const isAdmin = user?.tipo === 'admin';

  return (
    <div className="perfil-page">
      <div className="perfil-container">
        {/* Foto de perfil */}
        <div className="perfil-foto-wrapper">
          <img
            src={fotoPerfil || 'https://via.placeholder.com/150'}
            alt="Foto de Perfil"
            className="foto-perfil"
          />
          <label className="icon-camera" title="Alterar foto de perfil">
            <FaCamera />
            <input type="file" accept="image/*" onChange={handleFotoChange} hidden />
          </label>
        </div>

        {/* Nome e E-mail com edição */}
        <div className="perfil-info">
          {/* Nome */}
          {!editNome ? (
            <h2>
              {user?.nome || 'Usuário'}
              <button
                className="icon-button"
                onClick={() => setEditNome(true)}
                title="Editar nome"
              >
                <FaEdit />
              </button>
            </h2>
          ) : (
            <div className="input-group">
              <input
                className="input-editar"
                type="text"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Digite seu novo nome"
              />
              <button className="icon-button" onClick={salvarNome} title="Salvar nome">
                <FaSave />
              </button>
              <button
                className="icon-button"
                onClick={() => {
                  setNovoNome(user?.nome || '');
                  setEditNome(false);
                }}
                title="Cancelar"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Email */}
          {!editEmail ? (
            <p>
              {user?.email || 'email@exemplo.com'}
              <button
                className="icon-button"
                onClick={() => setEditEmail(true)}
                title="Editar email"
              >
                <FaEdit />
              </button>
            </p>
          ) : (
            <div className="input-group">
              <input
                className="input-editar"
                type="email"
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
                placeholder="Digite seu novo e-mail"
              />
              <button className="icon-button" onClick={salvarEmail} title="Salvar email">
                <FaSave />
              </button>
              <button
                className="icon-button"
                onClick={() => {
                  setNovoEmail(user?.email || '');
                  setEditEmail(false);
                }}
                title="Cancelar"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="perfil-opcoes">
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
  );
}

export default PerfilUsers;
