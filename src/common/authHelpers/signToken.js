const userDB = require('../../resources/users/user.db.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const comparePass = require('./comparePass');

const signToken = async (loginIn, password) => {
  const users = await userDB.findUser(loginIn);
  if (!users) {
    return null;
  }
  const comparisonRes = await comparePass(users, password);

  if (comparisonRes.result) {
    const { id, login } = comparisonRes.user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '3m' });
    return token;
  }

  return null;
};

module.exports = signToken;
