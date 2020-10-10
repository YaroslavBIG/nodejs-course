const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = _id => usersRepo.get(_id);

const create = user => usersRepo.createUser(user);

const deleteUser = _id => usersRepo.deleteUser(_id);

const update = data => usersRepo.update(data);

module.exports = { getAll, get, create, deleteUser, update };
