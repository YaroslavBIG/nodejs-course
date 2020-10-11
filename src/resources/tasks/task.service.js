const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = (boardId, taskId) => taskRepo.get(boardId, taskId);

const create = task => taskRepo.createTask(task);

const deleteTask = (boardId, taskId) => taskRepo.deleteTask(boardId, taskId);

const update = (id, boardId, body) => taskRepo.update(id, boardId, body);

module.exports = { getAll, get, create, deleteTask, update };
