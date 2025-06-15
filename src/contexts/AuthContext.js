import { createContext, useContext, useState, useEffect } from 'react';
import { apiEndpoint } from '../config/constantes';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          apiEndpoint.defaults.headers.Authorization = `Bearer ${token}`;
          const { data } = await apiEndpoint.get('/usuario/me');
          setUser({
            ...data,
            isAdmin: data.tipo === 'admin'
          });
        } catch (error) {
          console.error('Falha ao carregar usuário', error);
          logout();
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  async function login(email, password) {
    try {
      const { data } = await apiEndpoint.post('/usuario/login', { email, senha: password });
      localStorage.setItem('token', data.token);
      apiEndpoint.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser({
        ...data.usuario,
        isAdmin: data.usuario.tipo === 'admin'
      });
      return { success: true, user: data.usuario };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erro ao fazer login' 
      };
    }
  }

  function logout() {
    localStorage.removeItem('token');
    delete apiEndpoint.defaults.headers.Authorization;
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}