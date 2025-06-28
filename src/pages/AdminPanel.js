import React from "react";
import "../css/AdminPanel.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user?.isAdmin) {
    return <p style={{ color: "#fff", padding: "20px" }}>Acesso negado.</p>;
  }

  const cards = [
    {
      title: "Cadastrar Bebidas",
      description: "Cadastre novas bebidas e mantenha seu catálogo sempre atualizado.",
      icon: "🍹",
      route: "/admin/cadsuco", 
    },
    {
      title: "Gerenciar Bebidas",
      description: "Atualize ou remova bebidas já cadastradas no catálogo.",
      icon: "⚙️",
      route: "/admin/gerenciar",
    },
    {
      title: "Cadastrar Ingredientes",
      description: "Acompanhe dados de uso e desempenho do sistema.",
      icon: "📊",
      route: "/admin/cadingrediente", 
    },
    {
      title: "Cadastrar Condições",
      description: "Acompanhe dados de uso e desempenho do sistema.",
      icon: "📊",
      route: "/admin/caddiagnostico", 
    },
  ];

  const handleNavigate = (route) => {
    console.log("Navegando para:", route);
    navigate(route);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Painel Administrativo</h1>
      <div className="cards-container">
        {cards.map(({ title, description, icon, route }) => (
          <div
            key={title}
            className="admin-card"
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate(route)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleNavigate(route);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="card-icon">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p className="card-desc">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}