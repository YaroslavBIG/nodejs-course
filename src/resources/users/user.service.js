const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = _id => usersRepo.get(_id);

const create = user => usersRepo.create(user);

const deleteUser = _id => usersRepo.deleteUser(_id);

module.exports = { getAll, get, create, deleteUser };
