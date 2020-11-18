const jwt = require('jsonwebtoken');
const cookie = require('cookie');


const authUser = (req, res, next) => {
  var cookies = cookie.parse(req.headers.cookie || '');
  const tokenAuth = cookies.auth;

  if (!tokenAuth) return res.status(401).redirect('/logout');

  jwt.verify(tokenAuth, process.env.JWT_PASS, (err, decoded) => {
    if (err) return res.status(401).redirect('/logout');
    res.locals.authData = decoded;
    return next();
  });
}



const authAdm = (req, res, next) => {
  var cookies = cookie.parse(req.headers.cookie || '');
  const tokenAuth = cookies.auth;
  const isAdm = cookies.authAdm;

  if (!tokenAuth || !isAdm) return res.status(401).redirect('/dashboard');

  jwt.verify(tokenAuth, process.env.JWT_PASS, (err, decoded) => {
    if (err || (isAdm == "false")) return res.status(401).redirect('/dashboard');
    res.locals.auth_data = decoded;
    return next();
  });
}

module.exports = {
  adm: authAdm,
  user: authUser
}