# BarberShop

## Descrição

O BarberShop é uma aplicação web desenvolvida para facilitar o agendamento de atendimentos entre barbeiros e clientes. Os barbeiros podem cadastrar seus serviços e horários disponíveis, enquanto os clientes podem solicitar atendimentos de barbeiros registrados no sistema. O objetivo é simplificar o processo de agendamento, tornando-o mais eficiente e acessível para ambos os lados.

## Funcionalidades

- **Cadastro de Barbeiros**: Barbeiros podem se registrar no sistema, informando seus dados pessoais, especialidades e horários de trabalho.
- **Cadastro de Clientes**: Clientes podem criar contas para solicitar atendimentos.
- **Agendamento de Atendimentos**: Barbeiros podem definir horários disponíveis e clientes podem escolher e agendar serviços.
- **Solicitação de Serviços**: Clientes podem visualizar barbeiros disponíveis e solicitar atendimentos específicos.
- **Gerenciamento de Agendas**: Interface para barbeiros visualizarem e gerenciarem seus agendamentos.
- **Notificações**: Sistema de notificações para lembretes de agendamentos (futuro).

## Tecnologias Utilizadas

- **Frontend**: React (create-react-app)
- **Backend**: Node.js com Express
- **Banco de Dados**: MongoDB (via Mongoose)
- **Outros**: dotenv para variáveis de ambiente, CORS para comunicação entre cliente e servidor

*Nota: a estrutura do projeto está dividida em duas pastas dentro de `Aplicação`: `backend` e `frontend`. O backend expõe uma API REST e o frontend consome essa API.*

## Instalação

### ⚠️ Pré-requisito: MongoDB

Você precisa de um banco de dados MongoDB. Escolha uma opção:

**Opção A - Recomendada (Sem instalar nada):** 
👉 [MongoDB Atlas - Nuvem Grátis](SETUP-ATLAS.md)

**Opção B - Instalar Localmente:**
- Windows: Baixe em https://www.mongodb.com/try/download/community
- macOS: `brew install mongodb-community`
- Linux: Veja https://docs.mongodb.com/manual/installation/

### Backend

1. Acesse a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Configure `MONGO_URI` e `PORT` conforme necessário.

4. Inicie o servidor:
   ```bash
   npm start
   # ou com auto-reload:
   npm run dev
   ```

A API ficará disponível em `http://localhost:5000` por padrão.

### Frontend

1. Acesse a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

O cliente roda em `http://localhost:3000` e faz requisições à API do backend.

---

### 🚀 Início Rápido

Veja [QUICK-START.md](QUICK-START.md) para um guia passo a passo.

---

Você pode abrir dois terminais, um em cada pasta, para rodar backend e frontend simultaneamente.

## Uso

1. **Para Barbeiros**:
   - Registre-se como barbeiro.
   - Configure seus horários e serviços disponíveis.
   - Gerencie agendamentos recebidos.

2. **Para Clientes**:
   - Crie uma conta de cliente.
   - Navegue pelos barbeiros disponíveis.
   - Solicite e agende atendimentos.

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato com [seu-email@example.com] ou abra uma issue no GitHub.

---

*Desenvolvido por Werdeles Marcio de C. Soares.*