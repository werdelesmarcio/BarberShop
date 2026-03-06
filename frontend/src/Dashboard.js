import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Dashboard.css';

const API_URL = 'http://localhost:5000';

function Dashboard() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
  });

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
      setStats({
        total: data.length,
        active: data.length,
      });
    } catch (err) {
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: 'Barbeiros Cadastrados',
      value: stats.total,
    },
    {
      name: 'Total de Especialidades',
      value: barbers.reduce((acc, b) => acc + (b.specialties?.length || 0), 0),
    },
  ];

  const pieData = [
    {
      name: 'Barbeiros Ativos',
      value: stats.active,
      color: '#667eea',
    },
    {
      name: 'Sem Serviços',
      value: barbers.filter(b => !b.specialties || b.specialties.length === 0).length,
      color: '#f0f0f0',
    },
  ];

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Visão geral da barbearia</p>
      </div>

      {loading ? (
        <div className="loading">Carregando dados...</div>
      ) : (
        <>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon">💈</div>
              <div className="stat-content">
                <h3>Total de Barbeiros</h3>
                <p className="stat-value">{stats.total}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>Especialidades</h3>
                <p className="stat-value">
                  {barbers.reduce((acc, b) => acc + (b.specialties?.length || 0), 0)}
                </p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✂️</div>
              <div className="stat-content">
                <h3>Serviços Oferecidos</h3>
                <p className="stat-value">
                  {new Set(
                    barbers.flatMap(b => b.specialties || [])
                  ).size}
                </p>
              </div>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart-card">
              <h2>Estatísticas Gerais</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#667eea" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h2>Status dos Barbeiros</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="barbeiros-section">
            <h2>Barbeiros Cadastrados</h2>
            {barbers.length === 0 ? (
              <div className="no-data">
                <p>Nenhum barbeiro cadastrado ainda.</p>
                <p>Clique em <strong>+ Novo Barbeiro</strong> para começar!</p>
              </div>
            ) : (
              <div className="barbeiros-grid">
                {barbers.map(barber => (
                  <div key={barber._id} className="barber-card">
                    <div className="barber-header">
                      <h3>{barber.name}</h3>
                      <span className="barber-specialties-count">
                        {barber.specialties?.length || 0} serviço(s)
                      </span>
                    </div>
                    {barber.specialties && barber.specialties.length > 0 ? (
                      <div className="barber-specialties">
                        {barber.specialties.map((specialty, idx) => (
                          <span key={idx} className="specialty-badge">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="no-specialties">Sem especialidades cadastradas</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
