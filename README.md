# 📝 Projeto Notas - Backend API

API RESTful simples e eficiente desenvolvida em **Node.js** e **Express** para o gerenciamento de notas e lembretes. O projeto utiliza persistência em arquivo JSON local (`data.json`) e possui suporte completo a CORS configurado para integração com aplicações front-end (React, Vue, etc.) e deploy em nuvem (Render).

---

## 🚀 Tecnologias Utilizadas

- **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript no servidor.
- **[Express](https://expressjs.com/)**: Framework web para criação de rotas e manipulação de requisições HTTP.
- **[Body-Parser](https://www.npmjs.com/package/body-parser)**: Middleware para parsing do corpo das requisições JSON.
- **FS (File System)**: Módulo nativo do Node.js para leitura e escrita síncrona no arquivo `data.json`.

---

## 📁 Estrutura do Projeto

```text
back-notas/
├── data.json           # Arquivo JSON onde as notas são armazenadas
├── node_modules/       # Dependências do projeto
├── package.json        # Configurações e dependências do Node.js
├── package-lock.json   # Trava de versões das dependências
├── server.js           # Servidor Express com todas as rotas CRUD
├── postman_collection.json # Coleção do Postman pronta para importação
└── README.md           # Documentação completa da API
```

---

## 🔗 Rotas da API

A API aceita e retorna dados no formato **JSON**.

| Método | Rota | Descrição | Corpo da Requisição (Payload) | Resposta |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Rota raiz com status e rotas disponíveis | *Nenhum* | `{ "mensagem": "API de notas funcionando", ... }` |
| **GET** | `/api/notes` | Retorna a lista de todas as notas cadastradas | *Nenhum* | `[ { "id": "...", "titulo": "...", "texto": "...", "criadoEm": "..." } ]` |
| **GET** | `/api/notes/:id` | Retorna uma nota específica pelo ID | *Nenhum* | Objeto da nota correspondente ou erro 404 |
| **POST** | `/api/notes` | Cadastra uma nova nota | `{ "titulo": "Título", "texto": "Conteúdo" }` | Objeto da nota criada com `id` e `criadoEm` gerados |
| **PUT** | `/api/notes/:id` | Atualiza título e texto de uma nota existente | `{ "titulo": "Novo Título", "texto": "Novo Conteúdo" }` | Objeto da nota atualizada ou erro 404 |
| **DELETE** | `/api/notes/:id` | Remove uma nota pelo ID | *Nenhum* | `{ "mensagem": "Nota removida" }` ou erro 404 |

---

## 📦 Estrutura dos Dados (`data.json`)

Exemplo de objeto de nota armazenado:

```json
{
  "id": "1714305600000",
  "titulo": "Lembretes",
  "texto": "Comprar leite e pão",
  "criadoEm": "2026-04-28T10:00:00Z"
}
```

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada).
- Gerenciador de pacotes `npm`.

### Passos:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/matheusboffz/back-notas.git
   cd back-notas
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   npm start
   ```
   *(ou `node server.js` / modo dev com `npm run dev`)*

4. O servidor estará ativo em: **`http://localhost:3000`**

---

## 🧪 Exemplos de Teste com cURL

### 1. Listar todas as notas
```bash
curl -X GET http://localhost:3000/api/notes
```

### 2. Buscar nota por ID
```bash
curl -X GET http://localhost:3000/api/notes/1
```

### 3. Criar uma nova nota
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Frameworks", "texto": "Finalizar atividade prática de CRUD e React"}'
```

### 4. Atualizar nota existente
```bash
curl -X PUT http://localhost:3000/api/notes/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Lembretes Atualizados", "texto": "Comprar leite, pão e café"}'
```

### 5. Excluir uma nota
```bash
curl -X DELETE http://localhost:3000/api/notes/1
```

---

## ☁️ Deploy no Render

1. Envie suas alterações para o GitHub:
   ```bash
   git add .
   git commit -m "feat: implementacao completa da API RESTful de notas"
   git push origin main
   ```
2. Acesse [dashboard.render.com](https://dashboard.render.com/) e crie um **New Web Service**.
3. Conecte este repositório `back-notas`.
4. Defina as configurações:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Conclua a criação para obter a URL pública (ex: `https://back-notas.onrender.com`).

---

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos na disciplina de Frameworks Front-end (SENAI).
