const {
  getAllUsers,
  getUser,
  createUser,
  removeUser
} = require('../../common/inMemoryDB');

const getAll = async () => {
  return getAllUsers();
};

const get = async _id => getUser(_id);

const create = async user => createUser(user);

const deleteUser = async _id => removeUser(_id);

module.exports = { getAll, get, create, deleteUser };
