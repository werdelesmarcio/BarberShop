# Solução de Problemas - BarberShop

## ⚠️ ERRO: "mongod: command not found"

MongoDB não está instalado.

### ✓ Solução Rápida - Tome A (Recomendado)

**Use MongoDB Atlas (nuvem) - Sem instalar nada!**

Veja: [SETUP-ATLAS.md](SETUP-ATLAS.md)

Takes 5 minutos, sem necessidade de instalar MongoDB localmente.

---

### ✓ Solução B - Instalar MongoDB Local

#### Windows - Instalar automaticamente

1. Abra **PowerShell como Administrador** (clique direito no ícone)
2. Execute:
   ```powershell
   .\install-mongodb.ps1
   ```
   
Isto instala MongoDB automaticamente via Chocolatey.

#### Windows - Instalar manualmente

Baixe e instale: https://www.mongodb.com/try/download/community

Escolha a versão Windows e siga o instalador.

#### macOS
```bash
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu)
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

---

## Após instalar MongoDB

### Teste se funcionou

```bash
mongod --version
```

Se retornar uma versão, está certo!

### Inicie MongoDB

```bash
mongod
```

Deixe este terminal aberto. Você deve ver:
```
[initandlisten] waiting for connections on port 27017
```

### Em outro terminal, inicie o Backend

```bash
cd backend
npm run dev
```

Aguarde:
```
✓ Conectado ao MongoDB com sucesso!
✓ Servidor iniciado na porta 5000
```

---

## Erro: "Operation buffering timed out after 10000ms"

### ✓ Solução Rápida

#### Windows

1. **Opção A: Usar o script PowerShell (Recomendado)**
   ```powershell
   .\start-mongodb.ps1
   ```
   Se receber erro de permissão, execute o PowerShell como Admin.

2. **Opção B: Iniciar manualmente**
   ```bash
   mongod
   ```
   Deixe este terminal aberto. Você deve ver:
   ```
   [initandlisten] waiting for connections on port 27017
   ```

#### macOS
```bash
brew services start mongodb-community
```

#### Linux
```bash
sudo systemctl start mongod
```

---

## Se MongoDB não está instalado

### Opção 1: Instalar MongoDB Local (Recomendado para desenvolvimento)

[Baixar MongoDB Community Edition](https://www.mongodb.com/try/download/community)

- Windows: Instale o arquivo `.msi`
- macOS: Use `brew install mongodb-community`
- Linux: Veja a documentação oficial

### Opção 2: Usar MongoDB Atlas (Nuvem - Grátis)

Perfeito se não quer instalar localmente.

1. Crie uma conta em https://www.mongodb.com/cloud/atlas
2. Crie um cluster (grátis)
3. Copie a connection string (algo como `mongodb+srv://...`)
4. Cole em `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://seu_usuario:sua_senha@cluster0.xxxxx.mongodb.net/barbershop?retryWrites=true&w=majority
   ```

---

## Passo a Passo para Funcionar

### 1. Inicie MongoDB
```bash
# Windows
mongod

# ou PowerShell
.\start-mongodb.ps1
```

### 2. Em outro terminal, inicie o Backend
```bash
cd backend
npm run dev
```

Você deve ver:
```
✓ Conectado ao MongoDB com sucesso!
✓ Servidor iniciado na porta 5000
```

### 3. Em um terceiro terminal, inicie o Frontend
```bash
cd frontend
npm start
```

---

## Verificar se MongoDB está rodando

### Windows
```powershell
netstat -ano | findstr ":27017"
```

Se retornar algo, MongoDB está rodando.

### macOS/Linux
```bash
lsof -i :27017
```

---

## Erro: "EADDRINUSE: address already in use :::5000"

A porta 5000 já está em uso por outro processo.

### Solução 1: Matar o processo que está usando a porta
```powershell
# Windows
netstat -ano | findstr ":5000"
taskkill /PID <PID> /F
```

### Solução 2: Usar outra porta
Edite `backend/.env`:
```
PORT=5001
```

E atualize a URL no frontend em `frontend/src/App.js`:
```javascript
const API_URL = 'http://localhost:5001';
```

---

## Erro: "Failed to fetch" no Frontend

Significa que a API não está respondendo.

### Checklist:
- [ ] MongoDB está rodando? (`mongod` em um terminal)
- [ ] Backend está rodando? (você vê logs na porta 5000)
- [ ] Teste `/health`: `curl http://localhost:5000/health`
- [ ] Frontend está na porta 3000? Abra console (F12) e veja erros

---

## Erro: Mongoose connection buffering timeout

O backend está esperando o MongoDB conectar.

**Solução:** Inicie o MongoDB ANTES de iniciar o backend!

Ordem correta:
1. `mongod` (Terminal 1)
2. `cd backend && npm run dev` (Terminal 2) - aguarde "✓ Conectado ao MongoDB"
3. `cd frontend && npm start` (Terminal 3)

---

## Todos os endpoints da API

```
GET /health
  Retorna: { status: "OK", mongodb: "Connected" }

GET /barbers
  Lista todos os barbeiros

POST /barbers
  Cria um novo barbeiro
  Body: { name: "string", specialties: ["string"] }

GET /barbers/:id
  Busca um barbeiro por ID
```

---

## Limpar tudo e recomeçar

```bash
# Remover node_modules e package-lock
cd backend
rm -r node_modules package-lock.json
npm install

cd ../frontend
rm -r node_modules package-lock.json
npm install
```

---

## Ainda não funciona?

Abra o console do navegador (F12) e cola aqui o erro exato que aparecer! 🔍
