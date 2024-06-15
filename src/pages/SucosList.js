import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SucoCard from "../components/SucoCard";
import logo from "../imgs/copo-logo-branco.png";
import "./SucoList.css";

const SucoList = () => {
  const [allSucos, setSucos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSucos = async () => {
      try {
        let url = "https://elixir-backend-60fb.onrender.com/suco/all";

        // Adiciona o filtro de pesquisa se houver um termo
        if (searchTerm) {
          url = `https://elixir-backend-60fb.onrender.com/${searchTerm}`;
        }

        const res = await axios.get(url);
        setSucos(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("Erro no frontend:", err);
      }
    };

    fetchSucos();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Atualizar o estado para acionar a busca
    // O useEffect irá realizar a busca quando o estado for atualizado
    // Você pode adicionar aqui alguma lógica adicional, se necessário
  };

  return (
    <div className="container-suco-list">
      <nav id="navbar2">
        <Link to="/">
          <div className="logo-container2">
            <img src={logo} alt="Copo Logo" />
            <span>Elixir Natural</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="https://www.figma.com/proto/A1CPyR2lt8WWjbOa0ILfRG/Design-Projeto-Suco?type=design&node-id=55-70&t=kd4GC4rMACgRHFQv-0&scaling=min-zoom&page-id=0%3A1">Sucos</Link>
          <Link to="/caddiagnostico">Cadastro</Link>
        </div>
      </nav>
      <div className="container-meio">
        <form onSubmit={handleSearchSubmit}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Procurar por título..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
           
          </div>
        </form>
        <h2 className="title">Lista de Sucos</h2>

        <div className="sucos-list-container">
          {allSucos.length > 0 &&
            allSucos.map((suco) => <SucoCard key={suco.id} suco={suco} />)}
        </div>
      </div>
    </div>
  );
};

export default SucoList;
