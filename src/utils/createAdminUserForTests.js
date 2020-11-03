const { hashPassword } = require('../common/authHelpers/hashHelpers');
const { logger } = require('../logger/loggerConfig');
const { findUser } = require('../resources/users/user.db.repository');
const User = require('../resources/users/user.model');
const usersService = require('../resources/users/user.service');

const createAdminUserForTests = async () => {
  const isAdminInBase = await findUser('admin', hashPassword('admin'));
  console.log(isAdminInBase);
  const pass = await hashPassword('admin');
  logger.info(pass);
  if (!isAdminInBase.length) {
    usersService.create(
      new User({
        login: 'admin',
        name: 'admin',
        password: pass
      })
    );
  }
};

module.exports = createAdminUserForTests;
