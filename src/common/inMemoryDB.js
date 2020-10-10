const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');

const collection = {
  USERS: 'users',
  BOARDS: 'boards',
  TASKS: 'tasks'
};

const DB = {
  users: [],
  boards: [],
  tasks: []
};

// Tasks

const addToDb = (collectionName, data) => {
  if (DB[collectionName]) {
    DB[collectionName] = [...DB[collectionName], ...data];
  } else {
    throw new Error('Error collection (update)');
  }
};

const getDataFromDb = collectionName => {
  if (DB[collectionName]) {
    return [...DB[collectionName]];
  }
  throw new Error('Error collection (get)');
};

const getById = (_id, collectionName) => {
  const result = getDataFromDb(collectionName).filter(el => el.id === _id);
  return result[0] ? result[0] : null;
};

const testUsers = [new User(), new User(), new User()];
const testBoards = [new Board(), new Board(), new Board()];

const addTestUsers = () => addToDb(collection.USERS, testUsers);
addTestUsers();

const addTestBoards = () => addToDb(collection.BOARDS, testBoards);
addTestBoards();

const getAllByCollectionName = collectionName => getDataFromDb(collectionName);

const create = (data, collectionName) => {
  addToDb(collectionName, [data]);
  return getById(data.id, collectionName);
};

const remove = (_id, collectionName) => {
  const status = getById(_id, collectionName) ? 204 : 404;
  DB[collectionName] = getDataFromDb(collectionName).filter(
    el => el.id !== _id
  );
  return status;
};

const updateUser = data => {
  const { id, name, password, login } = data;
  const status = getById(id, collection.USERS) ? 204 : 404;
  if (status === 404) return { status };
  const user = getById(id, collection.USERS);
  user.name = name ? name : user.name;
  user.password = password ? password : user.password;
  user.login = login ? login : user.login;
  const userIndex = DB.users.findIndex(el => el.id === id);
  DB.users.splice(userIndex, 1, user);
  return { status, updateUser: getById(id, collection.USERS) };
};

// Boards

const updateBoard = data => {
  const { title, columns, id } = data;
  const status = getById(id, collection.BOARDS) ? 204 : 404;
  if (status === 404) return { status };
  const board = getById(id, collection.BOARDS);
  board.title = title ? title : board.title;
  board.columns = columns ? columns : board.columns;
  const userIndex = DB.users.findIndex(el => el.id === id);
  DB.users.splice(userIndex, 1, board);
  return { status, updateBoard: getById(id, collection.BOARDS) };
};

module.exports = {
  getAllByCollectionName,
  getById,
  create,
  remove,
  updateUser,
  updateBoard,
  collection
};
