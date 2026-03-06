import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💈 BarberShop
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/barbeiros" className="nav-link">
              Barbeiros
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cadastro" className="nav-link">
              + Novo Barbeiro
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
