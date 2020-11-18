const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/auth');

routes.get("/", auth.user, (req, res) => {
  res.render("notes", { idPage: 5,  title: "Notas"});
});

routes.get("/:idNote", auth.user, (req, res) => {
  res.render("noteEdit", { idPage: 6,  title: "Nota"});
});

module.exports = routes;
