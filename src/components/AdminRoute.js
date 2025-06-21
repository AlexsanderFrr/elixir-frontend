import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import React from 'react';

export default function AdminRoute() {
  const { user } = useAuth();
  
  if (!user) {
    // Usuário não está logado, redireciona para login
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    // Usuário não é admin, redireciona para home
    return <Navigate to="/" replace />;
  }

  // Usuário é admin, permite acesso às rotas
  return <Outlet />;
}