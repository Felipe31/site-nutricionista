const connection = require('./connection');
const bcrypt = require('bcrypt');

const addUser = (name, email, password, isAdm) => {
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(isAdm);

  bcrypt.hash(password, process.env.BCRYPT_SALT, (err, encrypted) => {
    if (err) return console.log("Error on bcrypt: " + err);
    password = encrypted;
    connection.query('INSERT INTO usuario (nome, email, password, adm) '+
      'values (?, ?, ?, ?)', [name, email, password, isAdm],
      function (error, results, fields) {
        if (error) return console.log("Error on query: " + error);
        console.log('Inserted!');
      });
    });
};

const getPassword = (email, callback) => {
  connection.query('select password from usuario where email = ?', email, function (error, results, fields) {
    if (error) return console.log("Error on query: " + error);
    if (!results.length) return callback(undefined);
    callback(results[0].password);
  });
};

module.exports = {
  addUser: addUser,
  getPassword: getPassword
}