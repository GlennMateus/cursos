const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { setupWebsocket } = require("./websocket");
const routes = require("./routes");
const { MONGO_USER, MONGO_PASS, MONGO_DB } = require("../.env");

mongoose.connect(
  `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@easyprice-ixd7i.gcp.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const app = express();
const server = http.Server(app);
setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);
// Métodos HTTP :: GET, POST, PUT, DELETE
// Tipos de parâmetros:
/* 
    1. Query params: 
        Utilizados quase sempre no GET; Vai na URI: https://localhost:3000/users?nome=Diego
        req.query (Filtrs, ordenação, paginação...)
    2. Route params:
        Utilizados 'exclusivamente' nos métodos PUT && DELETE
        Não tem nome na URI, é apenas o valor diretamente
        req.params (Identificar recurso na alteração/ remoção)
    3. Body:
        Utilizado principalmente no POST e no PUT
        req.body 
*/

server.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
