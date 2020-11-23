const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
require('dotenv').config();

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8');
var certificate = fs.readFileSync(process.env.SSL_CRT_PATH, 'utf8');

var credentials = {key: privateKey, cert: certificate};
// const connection = require('./model/paciente');


// {fallthrough: true}
app.use(express.json());
// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));


app.use(routes);
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.HTTP_PORT, () => {
  console.log(`Listening on port ${process.env.HTTP_PORT} using HTTP`);
});
httpsServer.listen(process.env.HTTPS_PORT, () => {
  console.log(`Listening on port ${process.env.HTTP_PORT} using HTTPS`);
});

module.exports = app;


/*

200 - OK
201 - Created
202 - Accepted

400 - Bad request
401 - Unauthorized (Autenticação de caráter temporário)
403 - Forbidden (Autorização de caráter permanente)
404 - Not found

500 - Internal server error
501 - Not implemented (A API não suporta a funcionalidade)
503 - Service Unavailable (A API não pode executar no momento)

openssl req -nodes -new -x509 -keyout server.key -out server.cert

https://medium.com/@nishankjaintdk/setting-up-a-node-js-app-on-a-linux-ami-on-an-aws-ec2-instance-with-nginx-59cbc1bcc68c

https://html-to-pug.com

https://auth0.com/blog/create-a-simple-and-secure-node-express-app/
*/