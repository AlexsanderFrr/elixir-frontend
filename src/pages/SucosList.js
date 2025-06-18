import React, { useEffect, useState } from "react";
import axios from "axios";
import SucoCard from "../components/SucoCard";
import "../css/SucoList.css";
import { apiEndpoint } from "../config/constantes";


const SucoList = () => {
  const [allSucos, setSucos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSucos = async () => {
    try {
      let url = `/suco/all`;

      if (searchTerm.trim()) {
        url = `/suco/title/${searchTerm.trim()}`;
      }

      const res = await apiEndpoint.get(`${url}`);
      setSucos(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("Erro no frontend:", err);
    }
  };

  // Carrega todos os sucos na primeira renderização
  useEffect(() => {
    fetchSucos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSucos(); // faz a busca com o termo atual
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
            allSucos.map((suco) => <SucoCard key={suco.id} suco={suco} />)}
        </div>
      </div>
    </div>
  );
};

export default SucoList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// //import { Link } from "react-router-dom";
// import SucoCard from "../components/SucoCard";
// //import logo from "../imgs/copo-logo-branco.png";
// import "../css/SucoList.css";
// import { apiEndpoint } from "../config/constantes";
// import Navbar from "../components/Navbar.js";

// const SucoList = () => {
//   const [allSucos, setSucos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchSucos = async () => {
//       try {
//         let url = `${apiEndpoint}/suco/all`;

//         // Adiciona o filtro de pesquisa se houver um termo
//         if (searchTerm) {
//           url = `${apiEndpoint}/${searchTerm}`;
//         }

//         const res = await axios.get(url);
//         setSucos(res.data);
//         console.log(res.data);
//       } catch (err) {
//         console.log("Erro no frontend:", err);
//       }
//     };

//     fetchSucos();
//   }, [searchTerm]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     // Atualizar o estado para acionar a busca
//     // O useEffect irá realizar a busca quando o estado for atualizado
//     // Você pode adicionar aqui alguma lógica adicional, se necessário
//   };

//   return (
//     <div className="container-suco-list">
//       <Navbar/>
//       <div className="container-meio">
//         <form onSubmit={handleSearchSubmit}>
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Procurar por título..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
            
//           </div>
//         </form>
//         <h2 className="title">Lista de Sucos</h2>

//         <div className="sucos-list-container">
//           {allSucos.length > 0 &&
//             allSucos.map((suco) => <SucoCard key={suco.id} suco={suco} />)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SucoList;