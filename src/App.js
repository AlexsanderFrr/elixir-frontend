import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Main from "./main";
import CadastroSuco from "./pages/CadastroSuco";
import CadIngrediente from "./pages/CadIngrediente";
import CadDiagnostico from "./pages/CadDiagnostico";
import SucoList from "./pages/SucosList";
import ReadSuco from "./pages/ReadSuco";
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rota isolada para login */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Rota com layout padrão */}
            <Route element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadsuco" element={<CadastroSuco />} />
              <Route path="/cadingrediente" element={<CadIngrediente />} />
              <Route path="/caddiagnostico" element={<CadDiagnostico />} />
              <Route path="/sucos" element={<SucoList />} />
              <Route path="/suco/:id" element={<ReadSuco />} />
            </Route>
          </Routes>
          </AuthProvider>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
