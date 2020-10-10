const {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  updateUser
} = require('../../common/inMemoryDB');

const getAll = async () => {
  return getAllUsers();
};

const get = async _id => getUser(_id);

const create = async user => createUser(user);

const deleteUser = async _id => removeUser(_id);

const update = async data => updateUser(data);

module.exports = { getAll, get, create, deleteUser, update };
