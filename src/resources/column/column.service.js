const columnRepo = require('./column.db.repository');
const boardsService = require('../boards/board.service');
const tasksService = require('../tasks/task.service');
const { logger } = require('../../logger/loggerConfig');

const getAll = async boardId => columnRepo.getAll(boardId);

const get = async (boardId, taskId) => columnRepo.get(boardId, taskId);

const create = async column => {
  const newColumn = await columnRepo.createColumn(column);
  if (newColumn) {
    const board = await boardsService.get(column.boardId);

    boardsService.update({
      columns: [...board.columns, column._id],
      boardId: column.boardId
    });
  }
  return newColumn;
};

const deleteColumn = async (boardId, columnId) => {
  const result = await columnRepo.deleteColumn(boardId, columnId);

  if (result) {
    const board = await boardsService.get(boardId);
    const columns = board.columns.filter(id => id !== columnId);
    boardsService.update({
      ...board,
      columns
    });
    try {
      tasksService.deleteTasksByColumnId(columnId);
    } catch (e) {
      logger.info(JSON.stringify(e));
    }
  }
  return result;
};
const deleteColumns = async boardId => columnRepo.deleteColumns(boardId);

const update = async (id, columnId, body) =>
  columnRepo.update(id, columnId, body);

const updateColumns = async (id, filters) =>
  columnRepo.updateColumns(id, filters);

module.exports = {
  getAll,
  get,
  create,
  deleteColumn,
  deleteColumns,
  update,
  updateColumns
};
