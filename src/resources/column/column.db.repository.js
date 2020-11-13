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
    const column = await Column.findOne({ boardId, columnId });
    return column;
  } catch (e) {
    logger.warn(JSON.stringify(e));
  }
};

const createColumn = async column => Column.create(column);

module.exports = { getAll, get, createColumn };
