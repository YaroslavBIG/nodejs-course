const { NotFoundError } = require('../../logger/loggerConfig');
const {
  getAllByCollectionName,
  getById,
  create,
  remove,
  updateBoard,
  collection
} = require('../../common/inMemoryDB');

const getAll = async () => {
  return getAllByCollectionName(collection.BOARDS);
};

const get = async _id => {
  const board = getById(_id, collection.BOARDS);
  if (!board) {
    throw new NotFoundError(collection.BOARDS, `id: ${_id}`);
  }
  return board;
};

const createBoard = async board => create(board, collection.BOARDS);

const deleteBoard = async _id => remove(_id, collection.BOARDS);

const update = async data => updateBoard(data);

module.exports = { getAll, get, createBoard, deleteBoard, update };
