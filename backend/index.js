const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS com mais permissões para debug
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Estado da conexão com MongoDB
let mongoConnected = false;

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint (sem precisar de MongoDB)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mongodb: mongoConnected ? 'Connected' : 'Disconnected'
  });
});

// Middleware para verificar conexão MongoDB antes de DB operations
app.use((req, res, next) => {
  // Deixa passar health check e erros de rota
  if (req.path === '/health') {
    return next();
  }
  
  if (!mongoConnected) {
    return res.status(503).json({ 
      error: 'MongoDB não está conectado. Aguarde a reconexão...',
      mongodb_state: mongoose.connection.readyState
    });
  }
  next();
});

// connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/barbershop';
const port = process.env.PORT || 5000;

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Iniciando BarberShop Backend');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('MongoDB URI:', mongoUri);
console.log('Porta:', port);
console.log('Tentando conectar ao MongoDB...\n');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout após 5 segundos
  socketTimeoutMS: 45000,
});

const db = mongoose.connection;

db.on('connecting', () => {
  console.log('⏳ Conectando ao MongoDB...');
});

db.on('connected', () => {
  mongoConnected = true;
  console.log('✓ Conectado ao MongoDB com sucesso!');
  console.log('✓ Banco de dados pronto para receber requisições');
});

db.on('error', (err) => {
  mongoConnected = false;
  console.error('✗ Erro de conexão ao MongoDB:');
  console.error('  Mensagem:', err.message);
  console.error('\n⚠️  SOLUÇÃO: Certifique-se de que MongoDB está rodando!');
  console.error('  Execute em outro terminal: mongod\n');
});

db.on('disconnected', () => {
  mongoConnected = false;
  console.warn('✗ Desconectado do MongoDB');
  console.warn('⏳ Tentando reconectar...\n');
});

// routes - carrega após DB estar pronto
let barbersRoute, clientsRoute, appointmentsRoute;

try {
  barbersRoute = require('./routes/barbers');
  clientsRoute = require('./routes/clients');
  appointmentsRoute = require('./routes/appointments');
  
  app.use('/barbers', barbersRoute);
  app.use('/clients', clientsRoute);
  app.use('/appointments', appointmentsRoute);
  console.log('✓ Rotas carregadas\n');
} catch (err) {
  console.error('Erro ao carregar rotas:', err.message);
}

// catch-all para debug
app.use((req, res) => {
  res.status(404).json({ error: `Rota ${req.path} não encontrada` });
});

// Função para iniciar servidor com fallback de porta
function startServer(attemptPort) {
  const portNum = parseInt(attemptPort, 10); // Garante que é um número
  const server = app.listen(portNum, () => {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✓ Servidor iniciado na porta ${portNum}`);
    console.log(`✓ API disponível em http://localhost:${portNum}`);
    console.log(`✓ Health check: http://localhost:${portNum}/health`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = portNum + 1;
      if (nextPort > 65535) {
        console.error('✗ Erro: Não há portas disponíveis (máximo 65535)');
        process.exit(1);
      }
      console.log(`⚠️  Porta ${portNum} em uso. Tentando porta ${nextPort}...`);
      server.close();
      startServer(nextPort);
    } else {
      throw err;
    }
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n⏹️  Encerrando servidor...');
    db.close();
    server.close(() => {
      console.log('✓ Servidor encerrado');
      process.exit(0);
    });
  });
}

startServer(port);
