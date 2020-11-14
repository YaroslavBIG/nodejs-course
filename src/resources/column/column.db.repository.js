const { logger } = require('../../logger/loggerConfig');
const Column = require('./column.model');

const getAll = async boardId => {
  try {
    const columns = await Column.find({ boardId });
    logger.debug(JSON.stringify(columns));
    return columns;
  } catch (e) {
    logger.warn(JSON.stringify(e));
  }
};

const get = async (boardId, columnId) => {
  try {
    const column = await Column.findOne({ boardId, _id: columnId });
    return column;
  } catch (e) {
    logger.warn(JSON.stringify(e));
  }
};

const createColumn = async column => Column.create(column);

const deleteColumn = async (boardId, ColumnId) =>
  Column.findOneAndDelete({ _id: ColumnId, boardId });

const deleteColumns = async boardId => Column.deleteMany({ boardId });

const update = async (id, boardId, body) =>
  Column.findOneAndUpdate({ _id: id, boardId }, { $set: body }, { new: true });

const updateColumns = async (userId, filters) =>
  Column.updateMany({ userId }, filters);

module.exports = {
  getAll,
  get,
  createColumn,
  deleteColumn,
  deleteColumns,
  update,
  updateColumns
};
