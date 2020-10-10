const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const get = _id => usersRepo.get(_id);

const create = user => usersRepo.create(user);

module.exports = { getAll, get, create };
