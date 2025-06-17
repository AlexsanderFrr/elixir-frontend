import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';
import { apiEndpoint } from "../config/constantes";
import imglateral from "../imgs/imglateral-esquerda.png";

function Signup() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiEndpoint}/usuario/add`,
        { nome, email, senha }
      );

      navigate('/login')
    } catch (err) {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div id='main-container'>
        <div className='lateral a'>
            <div className='img-container'>
                <img src={imglateral}/>
            </div>
        </div>
        <div className="lateral">
            <div className="signup-container">
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Digite seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                {erro && <p className="erro">{erro}</p>}
                <p>Já tem cadastro? <a href='./login'>Logar</a></p>
                <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default Signup;
