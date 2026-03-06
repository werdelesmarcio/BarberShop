import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarberForm from './BarberForm';
import './CadastroPage.css';

function CadastroPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleNewBarber = (barber) => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-header">
          <h1>Cadastro de Barbeiro</h1>
          <p>Adicione um novo barbeiro ao sistema</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Barbeiro cadastrado com sucesso!</h2>
            <p>Redirecionando para o dashboard...</p>
          </div>
        ) : (
          <BarberForm onCreated={handleNewBarber} />
        )}
      </div>
    </div>
  );
}

export default CadastroPage;
