const connection = require('./connection');

const addPlan = (name, description) => {
  console.log(!description);
  if (!name, !description) return -1;

  connection.query('INSERT INTO plano (nome, descricao) '+
    'values (?, ?)', [name, description], (error, results, fields) => {
      if (error) return console.log("Error on query: " + error);
      console.log('Inserted!');
  });

};

const getPlans = (callback) => {
  connection.query('select * from plano where 1 = 1', (error, results, fields) => {
    if (error) return console.log("Error on query: " + error);
    if (!results.length) return callback(undefined);
    callback(results);
  });
};

const getPlan = (planId, callback) => {
  connection.query('select * from plano where id_plano = ?', [planId], (error, results, fields) => {
    if (error) return console.log("Error on query: " + error);
    if (!results.length) return callback(undefined);
    callback(results[0]);
  });
};

const updatePlan = (planId, name, description, callback) => {
  connection.query('update plano set nome = ?, descricao = ? where id_plano = ?',
                  [name, description, planId], (error, results, fields) => {
    if (error) return console.log("Error on query: " + error);
    console.log(results);
    callback(results);
  });
};

module.exports = {
  addPlan,
  getPlans,
  getPlan,
  updatePlan
}