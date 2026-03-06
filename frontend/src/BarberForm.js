import React, { useState, useEffect } from 'react';
import './BarberForm.css';

const API_URL = 'http://localhost:5000';

function BarberForm({ onCreated, initialData = null, onSubmit = null, submitButtonText = '+ Cadastrar Barbeiro' }) {
  const [name, setName] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSpecialties(initialData.specialties?.join(', ') || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Nome do barbeiro é obrigatório');
      return;
    }

    const payload = {
      name: name.trim(),
      specialties: specialties.split(',').map(s => s.trim()).filter(s => s),
    };

    setLoading(true);
    try {
      console.log('Enviando:', payload);

      // Se onSubmit foi passado, usar esse callback (para edição e usos customizados)
      if (onSubmit) {
        await onSubmit(payload);
        return;
      }

      // Caso contrário, fazer POST para criação
      const res = await fetch(`${API_URL}/barbers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('Resposta:', data);

      if (!res.ok) {
        throw new Error(data.error || `Erro ${res.status}: ${res.statusText}`);
      }

      onCreated(data);
      setName('');
      setSpecialties('');
      setError('');
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError(err.message || 'Falha ao processar. Verifique o console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="barber-form">
      {error && <div className="error-message">{error}</div>}
      <div>
        <label htmlFor="name">Nome do Barbeiro:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ex: João da Tesoura"
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor="specialties">
          Especialidades <span className="optional">(separadas por vírgula)</span>:
        </label>
        <input
          id="specialties"
          type="text"
          value={specialties}
          onChange={e => setSpecialties(e.target.value)}
          placeholder="Ex: Corte moderno, Barba, Tingimento"
          disabled={loading}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Processando...' : submitButtonText}
      </button>
    </form>
  );
}

export default BarberForm;
