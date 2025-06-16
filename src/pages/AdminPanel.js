// pages/AdminPanel.jsx
import { useAuth } from '../contexts/AuthContext';

export default function AdminPanel() {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return null; // Ou redirecionar via AdminRoute
  }

  return (
    <div>
      <h1>Painel Administrativo</h1>
      <div className="admin-actions">
        <button>Gerenciar Bebidas</button>
        <button>Gerenciar Usuários</button>
        <button>Visualizar Estatísticas</button>
      </div>
    </div>
  );
}