const express = require("express");

const instructors = require("./controllers/InstructorsController");
const members = require("./controllers/MembersController");

const routes = express.Router();

routes.get("/", function (req, res) {
  return res.redirect("/instructors");
});

routes.get("/instructors", instructors.index);
routes.get("/instructors/create", instructors.create);
routes.get("/instructors/:id", instructors.show);
routes.post("/instructors", instructors.post);
routes.get("/instructors/:id/edit", instructors.update);
routes.put("/instructors", instructors.put);
routes.delete("/instructors", instructors.delete);

routes.get("/members", members.index);
routes.get("/members/create", members.create);
routes.get("/members/:id", members.show);
routes.post("/members", members.post);
routes.get("/members/:id/edit", members.update);
routes.put("/members", members.put);
routes.delete("/members", members.delete);

module.exports = routes;
