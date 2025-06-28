import React from "react";
import "../css/Home.css";
import medico from "../imgs/img-medico.png";
import CarrosselSucos from "../pages/CarrosselSucos";

const Home = () => {
  return (
    <div className="container">
      {/* Texto introdutório com título e linha */}
      <div className="central">
        <div className="container-lateral">
          <h1 className="title1">Faça o seu dia com Elixir Natural</h1>
          <hr className="linha" />
          <p className="texto-lateral">
            Desperte o seu bem-estar com o Elixir Natural, a essência da vitalidade em cada gole. Descubra uma revolução em saúde com a nossa linha exclusiva de bebidas medicinais, cuidadosamente elaborados para nutrir o seu corpo.
          </p>
        </div>
      </div>

      {/* Carrossel abaixo do texto */}
      <CarrosselSucos />

      <div className="container-baixo">
        {/* Frase Suco Saudável */}
        <div className="frasesuco">
          <h1 className="suco1">Bebidas Saudáveis,</h1>
          <h1 className="suco2">Você Saudável.</h1>
        </div>

        <p className="frase-subtitulo">
          Nutra seu corpo de dentro para fora com nossas receitas naturais e saborosas. Afinal, saúde é o ingrediente mais precioso da vida!
        </p>

        {/* Card branco com cantos arredondados */}
        <div className="card-branco">
          <img src={medico} alt="Médico" className="card-icon" />
          <h3 className="card-title">Importância da Consulta Médica</h3>
          <p>
            Para sua segurança e saúde, consulte sempre profissionais especializados, como médicos e nutricionistas. Eles podem orientar a escolha dos bebidas e receitas mais adequadas ao seu perfil, prevenindo riscos e promovendo benefícios reais.
          </p>
          <p>
            <strong>Lembre-se:</strong> mesmo alimentos naturais podem ter contraindicações, por isso a recomendação personalizada é fundamental.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
