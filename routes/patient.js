const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/auth');

routes.get("/", auth.user, (req, res) => {
  res.render("patients", { idPage: 3,  title: "Pacientes"});
});

routes.get("/paciente", auth.user, (req, res) => {
  res.render("patient", { idPage: 3,  title: "Profile", userProfile: { nickname: "Auth0" } });
});

routes.get("/novoPaciente", auth.user, (req, res) => {
  res.render("patientEdit", { idPage: 4,  title: "Novo Paciente"});
});

routes.get("/editarPaciente", auth.user, (req, res) => {
  res.render("patientEdit", { idPage: 4,  title: "Editar Paciente"});

});

module.exports = routes;
