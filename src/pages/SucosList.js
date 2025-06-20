import React, { useEffect, useState } from "react";
import SucoCard from "../components/SucoCard";
import "../css/SucoList.css";
import { apiEndpoint } from "../config/constantes";
import { useAuth } from "../contexts/AuthContext"; // Importa contexto de autenticação

const SucoList = () => {
  const [allSucos, setSucos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, token } = useAuth(); // Obtém usuário e token do contexto

  const fetchSucos = async () => {
    try {
      let url = `/suco/all`;

      if (searchTerm.trim()) {
        url = `/suco/title/${searchTerm.trim()}`;
      }

      const res = await apiEndpoint.get(`${url}`);
      setSucos(res.data);
    } catch (err) {
      console.log("Erro no frontend:", err);
    }
  };

  useEffect(() => {
    fetchSucos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSucos();
  };

  return (
    <div className="container-suco-list">
      <div className="container-meio">
        <form onSubmit={handleSearchSubmit}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Procurar por título..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">Buscar</button>
          </div>
        </form>

        <h2 className="title">Lista de Sucos</h2>

        <div className="sucos-list-container">
          {allSucos.length > 0 &&
            allSucos.map((suco) => (
              <SucoCard
                key={suco.id}
                suco={suco}
                isLoggedIn={!!user}
                token={token}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SucoList;
