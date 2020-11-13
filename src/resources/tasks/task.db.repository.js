const Task = require('./task.model');
const { logger } = require('../../logger/loggerConfig');

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => {
  try {
    const task = await Task.findOne({ boardId, _id: taskId });
    return task;
  } catch (e) {
    logger.warn(JSON.stringify(e));
  }
};

const getByColumnId = async (boardId, columnId) => {
  try {
    const task = await Task.findOne({ boardId, columnId });
    return task;
  } catch (e) {
    logger.warn(JSON.stringify(e));
  }
};

const createTask = async task => Task.create(task);

const deleteTask = async (boardId, taskId) =>
  Task.findOneAndDelete({ _id: taskId, boardId });

const update = async (id, boardId, body) =>
  Task.findOneAndUpdate({ _id: id, boardId }, { $set: body }, { new: true });

const updateTasks = async (userId, filters) =>
  Task.updateMany({ userId }, filters);

const deleteTasks = async boardId => Task.deleteMany({ boardId });

module.exports = {
  getAll,
  get,
  getByColumnId,
  update,
  createTask,
  deleteTask,
  updateTasks,
  deleteTasks
};
