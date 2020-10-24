const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });

// const get = async (boardId, taskId) => getTasksById(boardId, taskId);
//
// const createTask = async task => create(task, collection.TASKS);
//
// const deleteTask = async (boardId, taskId) => removeTask(boardId, taskId);
//
// const update = async (id, boardId, body) => updateTask(id, boardId, body);

module.exports = { getAll /* , get, createTask, deleteTask, update*/ };
