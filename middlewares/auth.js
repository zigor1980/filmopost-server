const jwt = require('jsonwebtoken');
const secret = require('../constants/secret');

module.exports = {
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      jwt.verify(authHeader, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        console.log(user);

        req.user = user;
        return next();
      });
    } else {
      res.sendStatus(401);
    }
  },
};
