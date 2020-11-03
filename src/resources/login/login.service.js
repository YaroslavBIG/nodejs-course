const userDB = require('../users/user.db.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { checkHashedPassword } = require('../../common/authHelpers/hashHelpers');

const signToken = async (loginIn, password) => {
  const user = userDB.findUser(loginIn);

  if (!user) {
    return null;
  }
  const { password: hashedPassword } = user;

  const comparisonRes = await checkHashedPassword(password, hashedPassword);

  if (comparisonRes) {
    const { id, login } = user;
    const token = jwt.sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '3m' });
    return token;
  }

  return null;
};

module.exports = {
  signToken
};
