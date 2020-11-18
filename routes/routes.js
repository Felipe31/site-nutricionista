const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const modelUser = require('../model/user');
const enviarPdfRoute = require('./enviarPdf');
const appointmentRoute = require('./appointment');
const patientRoute = require('./patient');
const healthPlanRoute = require('./healthPlan');
const noteRoute = require('./note');

const createUserToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_PASS, process.env.JWT_OPTIONS );
}


routes.use('/enviarPdf.html', enviarPdfRoute);

routes.get("/", (req, res) => {
  res.redirect("dashboard");
});

routes.get("/login", (req, res) => {
  res.render("login", {title: "Home aqui"});
});

routes.get("/calculadora", (req, res) => {
  res.render("calculator", {title: "Calculadora"});
});

routes.get("/novoUsuario", auth.adm, (req, res) => {
  res.render("newUser");
});

routes.post("/criandoUsuario", auth.adm, (req, res) => {
  const { inputName, inputEmail, inputPassword, checkboxAdm} = req.body
  console.log(inputName);
  console.log(inputEmail);
  console.log(inputPassword);
  console.log(checkboxAdm);
  if (!inputName ||  !inputEmail ||  !inputPassword ||  !checkboxAdm)
    return res.redirect("/login");

  modelUser.addUser(inputName, inputEmail, inputPassword, (checkboxAdm == 'on'))
  res.redirect("/login");
});

routes.get("/logout", (req, res) => {
  res.cookie('auth', undefined, { httpOnly: true });
  res.cookie('authAdm', undefined, { httpOnly: true });
  res.redirect("/login");
});

routes.get("/dashboard", auth.user, (req, res) => {
  res.render("dashboard", { idPage: 0, title: "Dashboard" });
});

routes.post("/autenticacao", (req, res) => {
  console.log(JSON.stringify(req.body));
  //return user.addUser('Admin', req.body.inputEmail, req.body.inputPassword, 1);
  const {inputEmail, inputPassword} = req.body;

  if (!inputEmail || !inputPassword) return res.redirect("logout");
  console.log(inputPassword);

  var userPassword;
  modelUser.getPassword(inputEmail, (password) => {
    if (!password) return res.redirect("logout");
    console.log(password);

    userPassword = password;

    bcrypt.compare(inputPassword, userPassword, (err, same) =>{
      console.log(same);
      console.log("allooooou");
      if (err || !same) return res.redirect("logout");

      res.cookie('auth', createUserToken(inputEmail), { httpOnly: true });
      res.cookie('authAdm', true, { httpOnly: true });
      res.redirect("dashboard");
    });
  });
});


routes.use("/consultas", appointmentRoute);

routes.use("/pacientes", patientRoute);

routes.use("/notas", noteRoute);

routes.use("/planos", healthPlanRoute);

routes.get("/pesquisar", auth.user, (req, res) => {
  res.render("searchResult", { title: "Pesquisar"});
});

routes.use( (req, res) => {
  res.render("404");
});

module.exports = routes;