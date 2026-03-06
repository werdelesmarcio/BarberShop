import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClienteForm from './ClienteForm';
import './ClientePage.css';

function ClientePage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleNewClient = (client) => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="cliente-page">
      <div className="cliente-container">
        <div className="cliente-header">
          <h1>Cadastro de Cliente</h1>
          <p>Adicione um novo cliente ao sistema</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Cliente cadastrado com sucesso!</h2>
            <p>Redirecionando para o dashboard...</p>
          </div>
        ) : (
          <ClienteForm onCreated={handleNewClient} />
        )}
      </div>
    </div>
  );
}

export default ClientePage;