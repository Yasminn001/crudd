const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Dados de exemplo para simular o banco de dados
let pessoas = [
    { id: 1, nome: 'João', idade: 30, cpf: '12345678900' },
    { id: 2, nome: 'Maria', idade: 25, cpf: '98765432100' },
];

// Habilitando CORS
app.use(cors());

// Para aceitar JSON no corpo da requisição
app.use(express.json());

// Rota GET para buscar pessoa por CPF
app.get('/pessoas', (req, res) => {
    const cpf = req.query.cpf;
    const pessoa = pessoas.filter(p => p.cpf === cpf);
    res.json(pessoa);
});

// Rota PUT para atualizar pessoa pelo ID
app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade, cpf } = req.body;

    const pessoaIndex = pessoas.findIndex(p => p.id == id);
    if (pessoaIndex !== -1) {
        pessoas[pessoaIndex] = { id, nome, idade, cpf };
        res.json({ message: 'Pessoa atualizada com sucesso!' });
    } else {
        res.status(404).json({ message: 'Pessoa não encontrada!' });
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
