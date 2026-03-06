# Guia de Configuração - BarberShop

## ⚠️ Pré-requisito: MongoDB

Você precisa de MongoDB (banco de dados). Escolha uma opção:

### Opção A: MongoDB Atlas (Nuvem) ✨ RECOMENDADO
- ✓ Sem instalar nada
- ✓ Grátis
- ✓ Rápido de configurar (5 minutos)
- ✓ Perfeito para desenvolvimento

👉 Veja: [SETUP-ATLAS.md](SETUP-ATLAS.md)

---

### Opção B: MongoDB Local
- Instalar em seu computador
- Mais controle
- Ligeiramente mais rápido

👉 Veja: [TROUBLESHOOTING.md](TROUBLESHOOTING.md#após-instalar-mongodb)

---

## Escolheu MongoDB (Opção A ou B)?

Agora siga o passo a passo abaixo:

---

## 1️⃣ Configurar Backend

```bash
cd backend
npm install
cp .env.example .env
```

**Se usou MongoDB Local:**
Verifique que `backend/.env` contém:
```
MONGO_URI=mongodb://localhost:27017/barbershop
PORT=5000
```

**Se usou MongoDB Atlas:**
Configure a URI conforme [SETUP-ATLAS.md](SETUP-ATLAS.md#7-configure-no-seu-projeto)

---

## 2️⃣ Iniciar Backend

```bash
cd backend
npm run dev
```

Aguarde ver:
```
✓ Conectado ao MongoDB com sucesso!
✓ Servidor iniciado na porta 5000
```

---

## 3️⃣ Iniciar Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

Abre automaticamente em `http://localhost:3000`

---

## 4️⃣ Testar

Você deve ver:
- ✓ **API Conectada** (verde)
- ✓ **MongoDB: Connected** (verde)
- ✓ Formulário para cadastrar barbeiros

---

## Método automático (Windows)

Se preferir tudo automático:

```bash
.\start.bat
```

Isto inicia Backend e Frontend de uma vez.

---

## Estrutura do Projeto

```
BarberShop/
├── backend/              # Servidor Node.js
│   ├── .env             # Sua configuração
│   ├── index.js
│   ├── models/
│   ├── routes/
│   └── package.json
│
├── frontend/            # Aplicação React
│   ├── public/
│   ├── src/
│   └── package.json
│
├── SETUP-ATLAS.md       # Guia MongoDB Atlas
├── TROUBLESHOOTING.md   # Solução de problemas
└── start.bat            # Auto-start
```

---

## Portas usadas

- **3000** - Frontend (React)
- **5000** - Backend API
- **27017** - MongoDB (local apenas)

---

**Está com problemas? Veja [TROUBLESHOOTING.md](TROUBLESHOOTING.md)** 🔍
