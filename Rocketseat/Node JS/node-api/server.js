const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const http = require('http')

// Iniciando o app
const app = express();
const server = http.createServer(app)
app.use(express.json());
app.use(cors());

// // Iniciando o DB
mongoose.connect('mongodb+srv://glennmateus:Glenn454@easyprice-ixd7i.gcp.mongodb.net/nodeapi?retryWrites=true&w=majority', {
  useNewUrlParser: true
});
requireDir('./src/models');

// // Rotas
app.use('/api', require('./src/routes'));

server.listen(3000);

// mongodb+srv://glennmateus:Glenn454@easyprice-ixd7i.gcp.mongodb.net/nodeapi?retryWrites=true&w=majority