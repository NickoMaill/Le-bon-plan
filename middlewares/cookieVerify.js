const jwt = require("jsonwebtoken");

async function cookieVerify(req, res, next) {
  let tokenDecode;

  if (!req.cookies.userCookie) {
      req.logged = false;
      
} else {
      tokenDecode = jwt.decode(req.cookies.userCookie);
      req.logged = true
      try {
        if (tokenDecode.exp - tokenDecode.iat === 1296000) {
          req.logged = false;
        } else {
          req.logged = true;
        }
      } catch (err) {
        console.log(err);
        return;
      }
  }

  next();
}

module.exports = cookieVerify;
