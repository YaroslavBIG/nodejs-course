const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');

    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      return res.status(401).send('Unauthorized user!');
    }
    const result = await jwt.verify(token, JWT_SECRET_KEY);
    if (!result) return res.status(401).send('Wrong password or login');
    return next();
  }

  res.status(401).send('Unauthorized user!');
};
