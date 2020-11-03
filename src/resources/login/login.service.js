const signToken = require('../../common/authHelpers/signToken');

const getToken = async (loginIn, password) =>
  await signToken(loginIn, password);

module.exports = {
  getToken
};
