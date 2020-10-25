const Task = require('./task.model');
const {
  logger,
  handleError,
  NotFoundError
} = require('../../logger/loggerConfig');

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, taskId) => {
  if (!taskId) {
    logger.warn('fldvndlfnv!!!!!!!!!!!!!!!!!!!');
    logger.warn(boardId);
    logger.warn(taskId);
  }
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    handleError(new NotFoundError('Task', `id: ${taskId}`));
  } else {
    return task;
  }
};

const createTask = async task => Task.create(task);

const deleteTask = async (boardId, taskId) => Task.findByIdAndDelete(taskId);

const update = async (id, boardId, body) => {
  // logger.warn(id);
  // logger.warn(boardId);
  // logger.warn(body);
  Task.findOneAndUpdate({ _id: id }, body);
  return get(null, id);
};

module.exports = { getAll, get, update, createTask, deleteTask };
