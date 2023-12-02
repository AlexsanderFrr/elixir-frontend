import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

import "./Navbar.css";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    // Construa a URL de pesquisa para a API
    const searchUrl = `/search/${search}`;

    // Navegue para a nova URL
    navigate(searchUrl, { replace: true });
    setSearch("");
  };

  return (
    <nav id="navbar">
      <h2>
        <Link to="/">
          <BiCameraMovie /> Movies
        </Link>
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Busque um filme"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>

      {/* Alterei a rota para 'cadastro' */}
      <Link to="/cadastro">
        <button className="cadfilme">Cadastrar Filme</button>
      </Link>
    </nav>
  );
};

export default Navbar;
