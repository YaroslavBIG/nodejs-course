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

const createTask = async task => Task.create(task);

const deleteTask = async (boardId, taskId) => Task.findByIdAndDelete(taskId);

const update = async (id, boardId, body) =>
  Task.findOneAndUpdate({ _id: id, boardId }, { $set: body }, { new: true });

module.exports = { getAll, get, update, createTask, deleteTask };
