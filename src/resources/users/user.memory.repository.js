const {
  getAllByCollectionName,
  getById,
  create,
  remove,
  updateUser,
  collection
} = require('../../common/inMemoryDB');

const getAll = async () => {
  return getAllByCollectionName(collection.USERS);
};

const get = async _id => getById(_id, collection.USERS);

const createUser = async user => create(user, collection.USERS);

const deleteUser = async _id => remove(_id, collection.USERS);

const update = async data => updateUser(data);

module.exports = { getAll, get, createUser, deleteUser, update };
