// contexts/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { apiEndpoint } from '../config/constantes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const token = user?.token;
  const isAdmin = user?.isAdmin;
  const isLoggedIn = !!user;

  const login = async (email, senha) => {
    try {
      const response = await apiEndpoint.post("/usuario/login", { email, senha });
      const data = response.data;

      if (data.token && data.id && data.nome && data.email && data.tipo) {
        const userData = {
          id: data.id,
          nome: data.nome,
          email: data.email,
          tipo: data.tipo,
          imagem: data.imagem || null,
          isAdmin: data.tipo === "admin",
          token: data.token,
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);

        return { success: true, user: userData };
      } else {
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
    localStorage.removeItem("token");
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAdmin, isLoggedIn, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
