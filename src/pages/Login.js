import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiEndpoint } from '../config/constantes';
import '../css/Login.css';
import logo from '../../src/imgs/copo-logo.png'; 

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando para o backend:', { email, senha }); // DEBUG
      
      const response = await apiEndpoint.post('/usuario/login', { 
        email, 
        senha 
      });

      console.log('Resposta do backend:', response.data); // DEBUG

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        apiEndpoint.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      }

      const tipo = response.data.usuario?.tipo || 'comum';
      navigate(tipo === 'master' ? '/admin' : '/home');
      
    } catch (err) {
      console.error('Erro completo:', err); // DEBUG
      console.error('Resposta de erro:', err.response); // DEBUG
      setErro(err.response?.data?.message || 'Email ou senha inválidos');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="Elixir Natural" className="login-logo" />
        <h1>Bem vindo a <br/>Elixir Natural</h1>
        <p className="login-subtitle">Faça login na sua conta</p>

        {erro && <div className="login-error">{erro}</div>}

        <form onSubmit={handleLogin} className="login-form">
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

          <div className="login-options">
            
            <a href="/esqueci-senha" className="forgot-password">
              Esqueceu sua senha?
            </a>
          </div>

          <button type="submit" className="login-button">
            Entrar
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
          Não possui uma conta? <a href="/cadastro">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}

export default Login;