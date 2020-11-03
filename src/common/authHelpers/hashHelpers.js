const bcrypt = require('bcrypt');

const hashPassword = async password => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const checkHashedPassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};
module.exports = {
  hashPassword,
  checkHashedPassword
};
