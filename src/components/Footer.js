import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="wave-container">
        <svg
          className="footer-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#d27837"
            d="M0,224L48,208C96,192,192,160,288,144C384,128,480,128,576,149.3C672,171,768,213,864,218.7C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Elixir Natural - Todos os direitos reservados</p>
      </div>
    </footer>
  );
}
