const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DATABASE } = require("./.env");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
const Pool = require("pg").Pool;

const db = new Pool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE
});

nunjucks.configure("./", {
  express: server,
  noCache: true
});

server.get("/", (req, res) => {
  const query = `SELECT name, blood FROM donors`;
  db.query(query, (err, result) => {
    if (err) return res.send(`Erro ao selecionar dados. \n ${err}`);

    const donors = result.rows;
    return res.render("index.html", { donors });
  });
});

server.post("/", (req, res) => {
  const { name, email, blood } = req.body;

  if (name && email && blood) {
    const query = `
      INSERT INTO donors ("name", "email", "blood") 
      VALUES ($1,$2,$3)`;

    const values = [name, email, blood];

    db.query(query, values, err => {
      if (err) return res.send(`Erro no banco de dados. \n ${err}`);

      return res.redirect("/");
    });
  } else {
    return res.send("Todos os campos são obrigatórios");
  }
});

server.listen(3000, () => {
  console.log("Listening on PORT :: 3000");
});
