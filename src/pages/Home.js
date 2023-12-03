import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import logo from "../imgs/copo-logo.png";
import cruz from "../imgs/img-logo-cruz.png";
import medico from "../imgs/img-medico.png";
import frutas from "../imgs/frutas-home.png";

const Home = () => {
  return (
    <div className="container">
      <nav id="navbar">
        <div className="logo-container">
          <img src={logo} alt="Copo Logo" />
          <span>Elixir Natural</span>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/">Sucos</Link>
          <Link to="/">Contatos</Link>
        </div>
      </nav>

      <div className="central">
        <br />
        <div className="foto-frutas">
          <img src={frutas} alt="Frutas" />
        </div>
        <div className="container-lateral">
          <h1 className="title1">Faça o seu dia</h1>
          <h1 className="title2">com Elixir Natural</h1><br/>
          <h2 className="linha">__________________________</h2><br/>
          <p className="texto-lateral">
            Desperte o seu bem-estar com o Elixir <br/>
            Natural, a essência da vitalidade em cada <br/>
            gole. Descubra uma revolução em saúde com <br/>
            a nossa linha exclusiva de sucos medicinais<br/>
            e detox, cuidadosamente elaborados para <br/>
            nutrir o seu corpo e revitalizar a sua mente.
          </p>
        </div>
      </div>
      <br/><br/><br/>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="container-baixo">
        <br />
        <div className="frasesuco">
          <h1 className="suco1">Suco Saúdavel,</h1>
          <h1 className="suco2">Você Saúdavel</h1>
        </div>

        <div className="textos-baixos">
          <div className="texto-informativo1">
            <img src={medico} alt="Medico" />
            <h5>
              Se possível, consulte profissionais de saúde ou <br />
              nutricionistas para garantir que suas recomendações
              <br /> estejam alinhadas com práticas seguras e saudáveis
            </h5>
          </div>

          <div className="texto-informativo2">
            <img src={cruz} alt="Cruz" />
            <h5>
              Fortaleça sua saúde e sua imunidade com
              <br /> os melhores sucos medicinais, do mercado e se, <br />
              delicie através de uma mistura de sabores
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
