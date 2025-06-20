import React from "react";
import "../css/AdminPanel.css"; // CSS separado pro painel
import { useAuth } from "../contexts/AuthContext";

export default function AdminPanel() {
  const { user } = useAuth();

  if (!user?.isAdmin) {
    return <p style={{ color: "#fff", padding: "20px" }}>Acesso negado.</p>;
  }

  const cards = [
    {
      title: "Cadastrar Bebidas",
      description: "Cadastre suas bebidas no catálago.",
      icon: "🍹",
    },
    {
      title: "Gerenciar Bebidas",
      description: "Atualize ou remova bebidas já cadastradas no catálogo.",
      icon: "⚙️🍹",
    },
    {
      title: "Visualizar Estatísticas",
      description: "Acompanhe dados de uso e desempenho do sistema.",
      icon: "📊",
    },
  ];

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Administrativo</h1>
      <div className="cards-container">
        {cards.map(({ title, description, icon }) => (
          <div key={title} className="admin-card">
            <div className="card-icon">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="card-desc">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
