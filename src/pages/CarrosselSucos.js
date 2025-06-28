import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { apiEndpoint } from "../config/constantes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/CarrosselSucos.css";

const sucosMock = [
  { id: 1, nome: "Suco Laranja", img1: "https://via.placeholder.com/300x180", beneficios: "Vitaminas e antioxidantes" },
  { id: 2, nome: "Suco Verde", img1: "https://via.placeholder.com/300x180", beneficios: "Desintoxicante natural" },
  { id: 3, nome: "Suco Detox", img1: "https://via.placeholder.com/300x180", beneficios: "Ajuda na digestão" },
  { id: 4, nome: "Suco Morango", img1: "https://via.placeholder.com/300x180", beneficios: "Rico em vitamina C" },
  { id: 5, nome: "Suco Manga", img1: "https://via.placeholder.com/300x180", beneficios: "Fortalece o sistema imunológico" },
];

const CarrosselSucos = () => {
  const [sucos, setSucos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSucos = async () => {
      try {
        const response = await apiEndpoint.get("/suco/all");
        setSucos(response.data.length > 0 ? response.data : sucosMock);
      } catch (error) {
        console.error("Erro ao carregar sucos:", error);
        setSucos(sucosMock);
      }
    };
    fetchSucos();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,          // duração da transição: 1.5 segundos
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,       // ativar autoplay
    autoplaySpeed: 3000,  // espera 3 segundos entre deslizamentos
    cssEase: "linear",    // transição suave e contínua
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="carrossel-container">
      <h2 className="carrossel-titulo">Destaques do Elixir</h2>
      <Slider {...settings}>
        {sucos.slice(0, 5).map((suco) => (
          <div key={suco.id} className="suco-card">
            <img src={suco.img1} alt={suco.nome} />
            <h3>{suco.nome}</h3>
            <p>{suco.beneficios?.substring(0, 80) || "Sem descrição"}...</p>
          </div>
        ))}
      </Slider>
<<<<<<< HEAD
<div
  className="carrossel-botao-wrapper"
  style={{ textAlign: "center", marginTop: "30px" }}
>
  <button
    className="carrossel-botao-slim"
    onClick={() => navigate("/sucos")}
  >
    Venha conferir
  </button>
</div>
=======
      <div className="carrossel-botao-wrapper">
        <button className="carrossel-botao" onClick={() => navigate("/sucos")}>
          Ver mais bebidas
        </button>
      </div>
>>>>>>> a9dadee9e1a65050bed6d4a8d86b79ef407fdc58
    </div>
  );
};

export default CarrosselSucos;
