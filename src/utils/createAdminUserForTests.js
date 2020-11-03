const { hashPassword } = require('../common/authHelpers/hashHelpers');
const User = require('../resources/users/user.model');
const usersService = require('../resources/users/user.service');

const createAdminUserForTests = async () => {
  usersService.create(
    new User({
      login: 'admin',
      name: 'admin',
      password: await hashPassword('admin')
    })
  );
};

module.exports = createAdminUserForTests;
