const express = require('express');
const routes = express.Router();
const auth = require('../middlewares/auth');
const modelHealthPlan = require('../model/healthPlan');

routes.get("/", auth.user, (req, res) => {
  modelHealthPlan.getPlans((result) => {
    res.render("healthPlans", { idPage: 8,  title: "Planos de Saúde", plans: result});
  });
});

routes.get("/novoPlano", auth.user, (req, res) => {
  res.render("healthPlanEdit", { idPage: 9,  title: "Planos de saúde"});
});

routes.post("/novoPlano", auth.user, (req, res) => {

  // Verificar tamanhos de entrada
  var { inputPlanName, inputPlanDescription } = req.body;

  if (!inputPlanName) return res.redirect("/planos");

  if(!inputPlanDescription) inputPlanDescription = " ";

  modelHealthPlan.addPlan(inputPlanName, inputPlanDescription);
  res.redirect("/planos");
});

routes.post("/:idPlano/editarPlano", auth.user, (req, res) => {

  // Verificar tamanhos de entrada
  var { inputPlanName, inputPlanDescription } = req.body;

  if (!inputPlanName) return res.redirect("/planos");

  if(!inputPlanDescription) inputPlanDescription = " ";

  modelHealthPlan.updatePlan(req.params.idPlano, inputPlanName, inputPlanDescription, (result) => {
    res.redirect('/planos/');
  });
});

routes.get("/:idPlano/editarPlano", auth.user, (req, res) => {
  modelHealthPlan.getPlan(req.params.idPlano, (result) => {
    res.render("healthPlanEdit", { idPage: 8,  title: "Editar Paciente", plan: result});
  });
});

routes.get("/:idPlano", auth.user, (req, res) => {
  modelHealthPlan.getPlan(req.params.idPlano, (result) => {
    res.render("healthPlan", { idPage: 8,  title: "Plano de Saúde", plan: result});
  });
});

module.exports = routes;
