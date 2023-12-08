import React, { useEffect, useState } from "react";
import axios from "axios";
import SucoCard from "../components/SucoCard";

const SucoList = () => {
  const [allSucos, setSucos] = useState([]);

  useEffect(() => {
    const fetchAllSucos = async () => {
      try {
        const res = await axios.get("http://localhost:8081/suco/all");
        setSucos(res.data);
        console.log(res.data);
      } catch (err) {
        console.log("Erro no frontend:", err);
      }
    };

    fetchAllSucos();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Lista de Sucos</h2>

      <div className="sucos-container">
        {allSucos.length > 0 &&
          allSucos.map((suco) => <SucoCard key={suco.id} suco={suco} />)}
      </div>
    </div>
  );
};

export default SucoList;
