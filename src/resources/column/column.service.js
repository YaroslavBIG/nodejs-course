const columnRepo = require('./column.db.repository');
const boardsService = require('../boards/board.service');

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

module.exports = { getAll, get, create };
