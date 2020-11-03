const bcrypt = require('bcrypt');

const hashPassword = async password => await bcrypt.hash(password, 10);

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkHashedPassword
};
