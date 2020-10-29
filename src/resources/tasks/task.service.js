const taskRepo = require('./task.db.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = async (boardId, taskId) => taskRepo.get(boardId, taskId);

const create = async task => taskRepo.createTask(task);

const deleteTask = async (boardId, taskId) =>
  taskRepo.deleteTask(boardId, taskId);

const deleteTasks = async boardId => taskRepo.deleteTasks(boardId);

const update = async (id, boardId, body) => taskRepo.update(id, boardId, body);

const updateTasks = async (id, filters) => taskRepo.updateTasks(id, filters);

module.exports = {
  getAll,
  get,
  create,
  deleteTask,
  deleteTasks,
  update,
  updateTasks
};
