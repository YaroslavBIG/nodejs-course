const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

module.exports = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).send('Unauthorized user!');
  }

  const tokenString = authHeader;
  const [type, token] = tokenString.split(' ');

  if (type !== 'Bearer') {
    return res.status(401).send('Unauthorized');
  }
  const result = await jwt.verify(token, JWT_SECRET_KEY);

  return result ? next() : res.status(401).send('Unauthorized');
};
