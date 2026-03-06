import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BarbeirosPage.css';

const API_URL = 'http://localhost:5000';

function BarbeirosPage() {
  const navigate = useNavigate();
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/barbers`);
      if (!res.ok) throw new Error('Erro ao carregar barbeiros');
      const data = await res.json();
      setBarbers(data);
      setError('');
    } catch (err) {
      console.error('Erro:', err);
      setError('Erro ao carregar barbeiros');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/barbeiros/${id}/editar`);
  };

  const handleDeleteClick = (id, name) => {
    setDeleteConfirm({ id, name });
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/barbers/${deleteConfirm.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Erro ao deletar barbeiro');
      }

      setBarbers(barbers.filter(b => b._id !== deleteConfirm.id));
      setDeleteConfirm(null);
      setError('');
    } catch (err) {
      console.error('Erro ao deletar:', err);
      setError('Erro ao deletar barbeiro');
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const filteredBarbers = barbers.filter(
    barber =>
      barber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (barber.specialties &&
        barber.specialties.some(specialty =>
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <div className="barbeiros-page">
      <div className="barbeiros-header">
        <h1>Barbeiros</h1>
        <p>Conheça todos os barbeiros cadastrados</p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nome ou especialidade..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading">Carregando barbeiros...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : filteredBarbers.length === 0 ? (
        <div className="no-barbers">
          {barbers.length === 0 ? (
            <>
              <p>Nenhum barbeiro cadastrado ainda.</p>
              <p>Clique em <strong>+ Novo Barbeiro</strong> para começar!</p>
            </>
          ) : (
            <>
              <p>Nenhum barbeiro encontrado para "{searchTerm}"</p>
              <p>Tente refinar sua busca</p>
            </>
          )}
        </div>
      ) : (
        <div className="barbers-list">
          {filteredBarbers.map(barber => (
            <div key={barber._id} className="barber-card-detailed">
              <div className="barber-avatar">💈</div>
              <div className="barber-info">
                <h3>{barber.name}</h3>
                <div className="barber-metadata">
                  <span className="meta-item">
                    <strong>{barber.specialties?.length || 0}</strong> especialidade(s)
                  </span>
                  <span className="meta-item">
                    ID: {barber._id.substring(0, 8)}...
                  </span>
                </div>
                {barber.specialties && barber.specialties.length > 0 ? (
                  <div className="specialties-list">
                    <strong>Especialidades:</strong>
                    <div className="specialties">
                      {barber.specialties.map((specialty, idx) => (
                        <span key={idx} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="no-specialties">Sem especialidades cadastradas</p>
                )}
              </div>
              <div className="barber-actions">
                <button 
                  className="btn btn-edit"
                  onClick={() => handleEdit(barber._id)}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-delete"
                  onClick={() => handleDeleteClick(barber._id, barber.name)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja deletar o barbeiro <strong>{deleteConfirm.name}</strong>?</p>
            <p className="warning-text">Esta ação é irreversível.</p>
            <div className="modal-actions">
              <button 
                className="btn btn-cancel"
                onClick={handleCancelDelete}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BarbeirosPage;
