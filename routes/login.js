const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  console.log('passei no login!');
  res.sendFile('./html/login.html');
});


module.exports = routes;