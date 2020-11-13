const { logger } = require('../../logger/loggerConfig');
const Column = require('./column.model');

const get = async (boardId, columnId) => {
  try {
    const column = await Column.find({ boardId, columnId });
    return column;
  } catch (e) {
    logger.warn(JSON.stringify(e));
  }
};

module.exports = { get };
