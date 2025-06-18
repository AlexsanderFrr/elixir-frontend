import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import "./main.css";

function Main() {
  return (
    <div className="main-container">
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  );
}


export default Main;
