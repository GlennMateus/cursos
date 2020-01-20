const { Router } = require("express");
const routes = Router();

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.delete("/devs/:_id", DevController.destroy);
routes.put("/devs/:_id", DevController.update);

routes.get("/search", SearchController.index);

module.exports = routes;
