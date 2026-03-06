import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import CadastroPage from './CadastroPage';
import BarbeirosPage from './BarbeirosPage';
import EditarPage from './EditarPage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/barbeiros" element={<BarbeirosPage />} />
            <Route path="/barbeiros/:id/editar" element={<EditarPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
