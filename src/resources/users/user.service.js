const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const get = async _id => usersRepo.get(_id);

const create = async user => usersRepo.createUser(user);

const deleteUser = async _id => usersRepo.deleteUser(_id);

const update = async data => usersRepo.update(data);

module.exports = { getAll, get, create, deleteUser, update };
