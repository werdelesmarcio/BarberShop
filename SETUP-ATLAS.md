# MongoDB Atlas - Alternativa sem instalação

Se você não quer instalar MongoDB localmente, use **MongoDB Atlas** (nuvem, grátis, sem instalar nada).

## ✓ Solução Rápida (5 minutos)

### 1. Crie conta no MongoDB Atlas

Acesse: https://www.mongodb.com/cloud/atlas

Clique em **"Try Free"** e cadastre-se (use sua conta Google para facilitar).

### 2. Crie um novo projeto

Após entrar, você verá a opção para criar um projeto. Clique em **"Create"**.

### 3. Crie um cluster (grátis)

- Selione **"Shared"** (grátis)
- Firebase provider: **AWS**
- Region: **São Paulo** (sa-east-1) ou similar
- Clique **"Create Cluster"** e aguarde alguns minutos

### 4. Configure acesso

1. Vá para **"Database Access"** (esquerda)
2. Clique **"Add New Database User"**
3. Username: `barbershop`
4. Password: crie uma senha (copie, vai precisar)
5. Selecione **"Read and write to any database"**
6. Clique **"Add User"**

### 5. Configure IP whitelist

1. Vá para **"Network Access"** (esquerda)
2. Clique **"Add IP Address"**
3. Selecione **"Allow Access from Anywhere"** (só para desenvolvimento!)
4. Clique **"Confirm"**

### 6. Obtenha a connection string

1. Clique no botão **"Connect"** do seu cluster
2. Selecione **"Drivers"**
3. Copie a connection string (algo como):
   ```
   mongodb+srv://barbershop:SENHA@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### 7. Configure no seu projeto

Abra `backend/.env` e substitute a linha:

```env
# Anterior:
MONGO_URI=mongodb://localhost:27017/barbershop

# Novo:
MONGO_URI=mongodb+srv://barbershop:SUA_SENHA@cluster0.xxxxx.mongodb.net/barbershop?retryWrites=true&w=majority
```

**Substitua `SUA_SENHA`** pela senha que criou no passo 4.

### 8. Pronto! Agora pode rodar a aplicação

```bash
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm start
```

**Não precisa mais de `mongod`!** MongoDB está rodando na nuvem.

---

## Vantagens e Desvantagens

| Aspecto | Local (mongod) | Atlas (Nuvem) |
|--------|---|---|
| Instalação | Precisa instalar | Sem instalação |
| Velocidade | Mais rápido | Ligeiramente mais lento |
| Configuração | Simples | Muito simples |
| Custo | Grátis | Grátis (até 512 MB) |
| Dados persistem? | Local | Na nuvem |
| Melhor para | Desenvolvimento local | Desenvolvimento, prototipagem |

**Recomendação:** Use Atlas para não se preocupar com instalação!

---

## Verificar conexão

Após configurar, abra o terminal e teste:

```bash
curl http://localhost:5000/health
```

Deve retornar:
```json
{
  "status": "OK",
  "mongodb": "Connected"
}
```

---

## Problemas comuns com Atlas

### Erro: "Invalid username and/or password"
- Verifique a senha no `.env`
- Confirme que criou o usuário com sucesso em "Database Access"

### Erro: "IP address is not allowed"
- Vá para "Network Access"
- Adicione seu IP ou "Allow from Anywhere"

### Erro: "Cluster not initialized"
- Aguarde 1-2 minutos após crear o cluster
- Recarregue a página do MongoDB Atlas

---

## Próximos passos

Agora que MongoDB está funcionando, você pode:
1. Cadastrar barbeiros
2. Implementar agendamentos
3. Adicionar autenticação
4. Deploy da aplicação

Divirta-se desenvolvendo! 🚀
