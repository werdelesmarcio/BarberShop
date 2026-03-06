import React, { useState, useEffect } from 'react';
import './AgendamentoForm.css';

function AgendamentoForm({ onCreated }) {
  const [formData, setFormData] = useState({
    barber: '',
    client: '',
    date: '',
    service: ''
  });
  const [barbers, setBarbers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBarbers();
    fetchClients();
  }, []);

  const fetchBarbers = async () => {
    try {
      const response = await fetch('http://localhost:5000/barbers');
      const data = await response.json();
      setBarbers(data);
    } catch (err) {
      setError('Erro ao carregar barbeiros');
    }
  };

  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:5000/clients');
      const data = await response.json();
      setClients(data);
    } catch (err) {
      setError('Erro ao carregar clientes');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar agendamento');
      }

      const data = await response.json();
      onCreated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="agendamento-form">
      <div className="form-group">
        <label htmlFor="client">Cliente:</label>
        <select
          id="client"
          name="client"
          value={formData.client}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um cliente</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>{client.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="barber">Barbeiro:</label>
        <select
          id="barber"
          name="barber"
          value={formData.barber}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um barbeiro</option>
          {barbers.map(barber => (
            <option key={barber._id} value={barber._id}>{barber.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Data e Hora:</label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="service">Serviço:</label>
        <input
          type="text"
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          placeholder="Ex: Corte de cabelo"
          required
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Agendando...' : 'Agendar'}
      </button>
    </form>
  );
}

export default AgendamentoForm;