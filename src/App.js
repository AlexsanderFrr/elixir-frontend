import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRoute from './components/AdminRoute';
import Home from "./pages/Home";
import AdminPanel from './pages/AdminPanel';
import Main from "./main";
import CadastroSuco from "./pages/CadastroSuco";
import CadIngrediente from "./pages/CadIngrediente";
import CadDiagnostico from "./pages/CadDiagnostico";
import SucoList from "./pages/SucosList";
import ReadSuco from "./pages/ReadSuco";
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Rota pública isolada */}
            <Route path="/login" element={<Login />} />

            {/* Rotas com layout principal */}
            <Route element={<Main />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              
              {/* Rotas administrativas protegidas */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              }/>
              
              <Route path="/cadsuco" element={
                <AdminRoute>
                  <CadastroSuco />
                </AdminRoute>
              }/>
              
              <Route path="/cadingrediente" element={
                <AdminRoute>
                  <CadIngrediente />
                </AdminRoute>
              }/>
              
              <Route path="/caddiagnostico" element={
                <AdminRoute>
                  <CadDiagnostico />
                </AdminRoute>
              }/>

              {/* Rotas públicas */}
              <Route path="/sucos" element={<SucoList />} />
              <Route path="/suco/:id" element={<ReadSuco />} />
              
              {/* Rota para páginas não encontradas */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;