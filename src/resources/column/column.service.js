const columnRepo = require('./column.db.repository');

const get = async (boardId, taskId) => columnRepo.get(boardId, taskId);

module.exports = { get };
