const { hashPassword } = require('../common/authHelpers/hashHelpers');
const { logger } = require('../logger/loggerConfig');
const User = require('../resources/users/user.model');
const usersService = require('../resources/users/user.service');

const createAdminUserForTests = async () => {
  const { findUser } = require('../resources/users/user.db.repository');
  const user = await findUser('admin');
  if (!user.length) {
    usersService.create(
      new User({
        login: 'admin',
        name: 'admin',
        password: await hashPassword('admin')
      })
    );
    logger.info('Admin created');
  }
};

module.exports = createAdminUserForTests;
