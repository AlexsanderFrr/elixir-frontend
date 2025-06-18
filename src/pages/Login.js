import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

  const from = location.state?.from?.pathname || '/home';

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      console.log('Tentando login com:', { email }); // Não logue a senha por segurança

      // Validação dos campos
      if (!email.trim() || !senha.trim()) {
        throw new Error('Por favor, preencha todos os campos corretamente');
      }

      const result = await login(email, senha);
      console.log('Resultado do login:', {
        success: result.success,
        user: result.user ? { id: result.user.id, tipo: result.user.tipo } : null
      });

      if (!result.success) {
        throw new Error(result.message || 'Falha na autenticação');
      }

      if (!result.user) {
        throw new Error('Dados do usuário não recebidos');
      }

      const redirectPath = result.user.tipo === 'admin' ? '/admin' : from;
      console.log(`Redirecionando ${result.user.tipo} para:`, redirectPath);
      navigate(redirectPath, { replace: true });

    } catch (err) {
      console.error('Falha no login:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        responseData: err.response?.data
      });

      setErro(
        err.response?.data?.message || 
        err.message || 
        'Erro ao conectar com o servidor. Tente novamente.'
      );
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

        {erro && (
          <div className="login-error">
            <i className="fas fa-exclamation-circle"></i> {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form" noValidate>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={carregando}
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              disabled={carregando}
              autoComplete="current-password"
              minLength="6"
            />
          </div>

          <div className="login-options">
            <a href="/esqueci-senha" className="forgot-password">
              Esqueceu sua senha?
            </a>
          </div>

          <button 
            type="submit" 
            className={`login-button ${carregando ? 'loading' : ''}`}
            disabled={carregando}
            aria-busy={carregando}
          >
            {carregando ? (
              <>
                <span className="spinner"></span>
                Entrando...
              </>
            ) : 'Entrar'}
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
          Não possui uma conta? <a href="/signup">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}

export default Login;