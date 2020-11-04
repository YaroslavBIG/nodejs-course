const { checkHashedPassword } = require('./hashHelpers');

const comparePass = async (users, pass) => {
  let res = null;
  let targetUser;
  if (Array.isArray(users)) {
    for (const user of users) {
      if (await checkHashedPassword(pass, user.password)) {
        res = true;
        targetUser = user;
      }
    }
  } else {
    res = await checkHashedPassword(pass, users.password);
    targetUser = users;
  }
  return { result: res, user: targetUser };
};

module.exports = comparePass;
