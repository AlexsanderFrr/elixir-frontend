import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
//import { apiEndpoint } from '../config/constantes';
import '../css/Login.css';
import logo from '../../src/imgs/copo-logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redireciona para a página que tentou acessar ou para a home
  const from = location.state?.from?.pathname || '/home';

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      // Validação básica dos campos
      if (!email || !senha) {
        throw new Error('Por favor, preencha todos os campos');
      }

      // Usa a função login do AuthContext
      const result = await login(email, senha);

      if (result.success) {
        // Redireciona com base no tipo de usuário
        const destino = result.user.tipo === 'admin' ? '/admin' : from;
        navigate(destino, { replace: true });
      } else {
        throw new Error(result.message || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('Erro no login:', {
        error: err,
        message: err.message,
        response: err.response?.data
      });

      // Mensagens de erro mais amigáveis
      let mensagemErro = 'Erro ao fazer login';
      if (err.response) {
        mensagemErro = err.response.data?.message || 
                      err.response.statusText || 
                      `Erro ${err.response.status}`;
      } else if (err.message) {
        mensagemErro = err.message;
      }

      setErro(mensagemErro);
    } finally {
      setCarregando(false);
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
              disabled={carregando}
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
              disabled={carregando}
            />
          </div>

          <div className="login-options">
            <a href="/esqueci-senha" className="forgot-password">
              Esqueceu sua senha?
            </a>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-separator">
          <span>Ou</span>
        </div>

        <div className="social-login">
          <button 
            type="button" 
            className="social-button google"
            disabled={carregando}
          >
            <i className="fab fa-google"></i> Entrar com Google
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