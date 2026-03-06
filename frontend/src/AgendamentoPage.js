import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AgendamentoForm from './AgendamentoForm';
import './AgendamentoPage.css';

function AgendamentoPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleNewAppointment = (appointment) => {
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="agendamento-page">
      <div className="agendamento-container">
        <div className="agendamento-header">
          <h1>Agendamento</h1>
          <p>Agende um horário com um barbeiro</p>
        </div>

        {success ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Agendamento realizado com sucesso!</h2>
            <p>Redirecionando para o dashboard...</p>
          </div>
        ) : (
          <AgendamentoForm onCreated={handleNewAppointment} />
        )}
      </div>
    </div>
  );
}

export default AgendamentoPage;