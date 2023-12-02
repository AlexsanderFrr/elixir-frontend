import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import "./main.css";

function Main() {
  return (
    <div className="main-container">
      <Navbar />
      <Outlet />
    </div>
  );
}


export default Main;
