
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./main";
import CadastroSuco from "./pages/CadastroSuco";

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
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
