const Board = require('./board.model');

const getAll = async () => Board.find({});

const get = async _id => Board.findById(_id);

const createBoard = async board => Board.create(board);

const deleteBoard = async _id => Board.deleteOne({ _id });

const update = async data => {
  const { boardId } = data;

  await Board.findByIdAndUpdate(boardId, data);
  return await get(boardId);
};

module.exports = { getAll, get, createBoard, deleteBoard, update };
