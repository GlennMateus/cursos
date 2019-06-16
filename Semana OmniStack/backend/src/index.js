const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// acesso ao protocolo http
const server = require("http").Server(app);

// acesso a contexões websocket: Permite enviar e receber requisições de/para todos os users conectados
const io = require("socket.io")(server);

mongoose.connect("mongodb://localhost:27017/omnistack", {
  useNewUrlParser: true
});

// disponibiliza os websockets para toda a aplicação
app.use((req, res, next) => {
  req.io = io;

  // garante que todas as rotas e midlewares que venham depois continuem a execução
  next();
});

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(require("./routes"));

server.listen(30001);
