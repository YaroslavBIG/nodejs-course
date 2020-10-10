const { getAllUsers, getUser, createUser } = require('../../common/inMemoryDB');

const getAll = async () => {
  return getAllUsers();
};

const get = async _id => getUser(_id);

const create = async user => createUser(user);

module.exports = { getAll, get, create };
