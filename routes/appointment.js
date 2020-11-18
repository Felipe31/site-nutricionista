const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/auth');
const modelHealthPlan = require('../model/healthPlan');

routes.get("/", auth.user, (req, res) => {
  res.render("appointments", { idPage: 1, title: "Consultas" });
});

routes.get("/editarConsulta", auth.user, (req, res) => {
  res.render("appointmentEdit", { idPage: 1, title: "Editar Consulta" });
});

routes.get("/novaConsulta", auth.user, (req, res) => {
  modelHealthPlan.getPlans((result) => {
    res.render("appointmentEdit", { idPage: 2, title: "Nova Consulta", plans: result});
  });
});

module.exports = routes;
