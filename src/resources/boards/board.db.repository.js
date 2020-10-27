const Board = require('./board.model');
const { deleteTasks } = require('../tasks/task.service');

const getAll = async () => Board.find({});

const get = async _id => Board.findById(_id);

const createBoard = async board => Board.create(board);

const deleteBoard = async _id => {
  const board = await Board.deleteOne({ _id });
  await deleteTasks(_id);
  return board;
};

const update = async data => {
  const { boardId } = data;

  await Board.findByIdAndUpdate(boardId, data);
  return await get(boardId);
};

module.exports = { getAll, get, createBoard, deleteBoard, update };
