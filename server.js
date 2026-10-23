// Importa o Express, Body-Parser e FS
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const FILE = 'data.json';

// Permite receber JSON
app.use(bodyParser.json());

// Libera acesso externo (CORS) e responde requisições preflight OPTIONS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Função para ler arquivo
function readNotes() {
    try {
        const data = fs.readFileSync(FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Função para salvar arquivo
function saveNotes(notes) {
    fs.writeFileSync(FILE, JSON.stringify(notes, null, 2));
}

// GET - Raiz da API
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de notas funcionando',
        rotas: ['/api/notes']
    });
});

// GET - Listar notas
app.get('/api/notes', (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

// GET - Obter uma nota por ID
app.get('/api/notes/:id', (req, res) => {
    const notes = readNotes();
    const note = notes.find(n => n.id === req.params.id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ erro: 'Nota não encontrada' });
    }
});

// ====================
// POST - Criar nota
// ====================
app.post('/api/notes', (req, res) => {
    const notes = readNotes();
    const novaNota = {
        id: Date.now().toString(),
        titulo: req.body.titulo,
        texto: req.body.texto,
        criadoEm: new Date().toISOString()
    };
    notes.push(novaNota);
    saveNotes(notes);
    res.status(201).json(novaNota);
});

// ====================
// PUT - Editar nota
// ====================
app.put('/api/notes/:id', (req, res) => {
    const notes = readNotes();
    const index = notes.findIndex(n => n.id === req.params.id);
    if (index >= 0) {
        notes[index].titulo = req.body.titulo;
        notes[index].texto = req.body.texto;
        saveNotes(notes);
        res.json(notes[index]);
    } else {
        res.status(404).json({ erro: 'Nota não encontrada' });
    }
});

// ====================
// DELETE - Excluir nota
// ====================
app.delete('/api/notes/:id', (req, res) => {
    const notes = readNotes();
    const novasNotas = notes.filter(n => n.id !== req.params.id);
    if (notes.length !== novasNotas.length) {
        saveNotes(novasNotas);
        res.json({ mensagem: 'Nota removida' });
    } else {
        res.status(404).json({ erro: 'Nota não encontrada' });
    }
});

// Inicia servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
