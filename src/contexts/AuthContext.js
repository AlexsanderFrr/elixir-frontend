// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { apiEndpoint } from '../config/constantes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, senha) => {
    console.log("Iniciando login para:", email);

    try {
      const response = await apiEndpoint.post("/usuario/login", {
        email,
        senha,
      });

      const data = response.data;
      console.log("Resposta da API:", data);

      if (data.token && data.id && data.nome && data.email && data.tipo) {
        const userData = {
          id: data.id,
          nome: data.nome,
          email: data.email,
          tipo: data.tipo,
          token: data.token,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        return { success: true, user: userData };
      } else {
        console.error("Resposta inválida da API:", data);
        throw new Error("Dados incompletos recebidos do servidor");
      }
    } catch (error) {
      console.error("Falha no login:", error);
      return { success: false, user: null };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
