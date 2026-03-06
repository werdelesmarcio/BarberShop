import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarPage.css';
import BarberForm from './BarberForm';

const API_URL = 'http://localhost:5000';

function EditarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [barber, setBarber] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBarber();
  }, [id]);

  const fetchBarber = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/barbers/${id}`);
      if (!res.ok) throw new Error('Barbeiro não encontrado');
      const data = await res.json();
      setBarber(data);
      setError('');
    } catch (err) {
      console.error('Erro ao carregar barbeiro:', err);
      setError('Erro ao carregar dados do barbeiro');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/barbers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao atualizar barbeiro');
      }

      const updated = await response.json();
      console.log('Barbeiro atualizado com sucesso:', updated);
      
      setSuccessMessage('✓ Barbeiro atualizado com sucesso!');
      setTimeout(() => {
        navigate('/barbeiros');
      }, 2000);
    } catch (err) {
      console.error('Erro:', err);
      setError(err.message || 'Erro ao atualizar barbeiro');
    }
  };

  if (loading) {
    return (
      <div className="editar-page">
        <div className="loading">Carregando dados...</div>
      </div>
    );
  }

  if (error && !barber) {
    return (
      <div className="editar-page">
        <div className="error-message">{error}</div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/barbeiros')}
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="editar-page">
      <div className="editar-container">
        <div className="editar-header">
          <h1>Editar Barbeiro</h1>
          <p>Atualize as informações do barbeiro</p>
        </div>

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {barber && (
          <BarberForm 
            initialData={barber}
            onSubmit={handleSubmit}
            submitButtonText="Atualizar Barbeiro"
          />
        )}

        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/barbeiros')}
          style={{ marginTop: '20px' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EditarPage;
