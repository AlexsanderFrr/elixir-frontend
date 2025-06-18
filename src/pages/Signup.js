import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/Signup.css';
import { apiEndpoint } from "../config/constantes";
import logo from '../../src/imgs/copo-logo.png'; 

function Signup() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await apiEndpoint.post(`/usuario/add`, { nome, email, senha });

      navigate('/login')
    } catch (err) {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Elixir Natural" className="login-logo" />
        <h1>Bem vindo a <br/>Elixir Natural</h1>
        <p className="login-subtitle">Cadastre sua conta!</p>

        {erro && <div className="login-error">{erro}</div>}

        <form onSubmit={handleSignup} className="login-form">
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Cadastrar
          </button>
        </form>

        <div className="login-separator">
          <span>Ou</span>
        </div>

        <div className="social-login">
          <button className="social-button google">
            <i className="fab fa-google"></i> Entrar com Google
          </button>
          <button className="social-button facebook">
            <i className="fab fa-facebook-f"></i> Entrar com Facebook
          </button>
        </div>

        <div className="register-link">
          Já possui uma conta? <a href="/login">Logar</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
