import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import axios from 'axios';

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchFavoritos() {
      if (!token) {
        setFavoritos([]);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('http://localhost:8080/favoritos/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoritos(res.data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        setFavoritos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFavoritos();
  }, [token]);

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          color: '#bb5104',
          cursor: 'pointer',
          fontSize: 18,
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <FaArrowLeft /> Voltar
      </button>

      <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <FaHeart style={{ color: '#bb5104' }} /> Meus Favoritos
      </h2>

      {loading ? (
        <p>Carregando favoritos...</p>
      ) : favoritos.length === 0 ? (
        <p>Você ainda não adicionou favoritos.</p>
      ) : (
        <ul style={{ paddingLeft: 20 }}>
          {favoritos.map((item) => (
            <li key={item.suco.id || item.suco.suco_id} style={{ marginBottom: 10 }}>
              {item.suco.nome || item.suco.suco_nome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;
