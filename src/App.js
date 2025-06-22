// src/App.js
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatPopupProvider } from "./contexts/ChatPopupContext"; // ✅ Importa o provider
import AdminRoute from './components/AdminRoute';
import GlobalChatPopup from './components/GlobalChatPopup'; // ✅ Importa o popup

import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Main from "./main";
import CadastroSuco from "./pages/CadastroSuco";
import CadIngrediente from "./pages/CadIngrediente";
import CadDiagnostico from "./pages/CadDiagnostico";
import SucoList from "./pages/SucosList";
import ReadSuco from "./pages/ReadSuco";
import Login from './pages/Login';
import Signup from './pages/Signup';
import PerfilUsers from "./pages/PerfilUsers";
import Favoritos from "./pages/Favoritos";
import EditSuco from "./pages/EditSuco";
import ChatBot from "./pages/ChatBot"; // pode manter isso caso queira acessar o chat direto por rota

function AppWrapper() {
  const location = useLocation();
  const hidePopup = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hidePopup && <GlobalChatPopup />} {/* ✅ Exibe o chat em qualquer rota, exceto login/signup */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<PerfilUsers />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/chatbot" element={<ChatBot />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/cadsuco" element={<CadastroSuco />} />
            <Route path="/admin/sucos" element={<SucoList />} />
            <Route path="/admin/cadingrediente" element={<CadIngrediente />} />
            <Route path="/admin/caddiagnostico" element={<CadDiagnostico />} />
            <Route path="/admin/sucos/editar/:id" element={<EditSuco />} />
          </Route>

          <Route path="/sucos" element={<SucoList />} />
          <Route path="/suco/:id" element={<ReadSuco />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ChatPopupProvider> {/* ✅ Envolve tudo com o contexto do chat */}
            <AppWrapper />
          </ChatPopupProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
