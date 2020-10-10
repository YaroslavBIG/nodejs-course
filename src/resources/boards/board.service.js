const boardsRepo = require('./board.memory.reposetory');

const getAll = () => boardsRepo.getAll();

const get = _id => boardsRepo.get(_id);

const create = board => boardsRepo.createBoard(board);

const deleteBoard = _id => boardsRepo.deleteBoard(_id);

const update = data => boardsRepo.update(data);

module.exports = { getAll, get, create, deleteBoard, update };
