
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./main";
import CadastroSuco from "./pages/CadastroSuco";
import CadIngrediente from "./pages/CadIngrediente";
import CadDiagnostico from "./pages/CadDiagnostico";
import SucoList from "./pages/SucosList";
import ReadSuco from "./pages/ReadSuco";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route element={<Main />} />
              <Route path="/" element={<Home />} />
               <Route path="/home" element={<Home />} />
               <Route path="/cadsuco" element={<CadastroSuco />} />
               <Route path="/cadingrediente" element={<CadIngrediente />} />
               <Route path="/caddiagnostico" element={<CadDiagnostico />} />
               <Route path="/sucos" element={<SucoList />} />
               <Route path="/suco/:id" element={<ReadSuco />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
