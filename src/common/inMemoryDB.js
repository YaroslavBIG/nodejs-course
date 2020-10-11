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
  return result.length ? result[0] : null;
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
  const status = 204; // getById(_id, collectionName) ? 204 : 404;
  DB[collectionName] = getDataFromDb(collectionName).filter(
    el => el.id !== _id
  );
  if (collectionName === collection.USERS) {
    DB[collection.TASKS] = getDataFromDb(collection.TASKS).map(task => {
      if (task.userId === _id) {
        task.userId = null;
      }
      return task;
    });
  }
  if (collectionName === collection.BOARDS) {
    DB[collection.TASKS] = getDataFromDb(collection.TASKS).map(
      task => task.boardId !== _id
    );
  }
  return status;
};

const updateUser = data => {
  const { id, name, password, login } = data;
  const status = 204; // getById(id, collection.USERS) ? 204 : 404;
  if (status === 404) return { status };
  const user = getById(id, collection.USERS);
  user.name = name ? name : user.name;
  user.password = password ? password : user.password;
  user.login = login ? login : user.login;
  const userIndex = DB[collection.USERS].findIndex(el => el.id === id);
  DB[collection.USERS].splice(userIndex, 1, user);
  return { status, updateUser: getById(id, collection.USERS) };
};

// Boards

const updateBoard = data => {
  const { title, columns, id } = data;
  const board = getById(id, collection.BOARDS);
  const status = 204; // board.length ? 204 : 404;
  if (status === 404) return { status };
  board.title = title ? title : board.title;
  board.columns = columns ? columns : board.columns;
  board.id = id;
  const userIndex = DB[collection.USERS].findIndex(el => el.id === id);
  DB[collection.USERS].splice(userIndex, 1, board);
  return { status, updateBoard: getById(id, collection.BOARDS) };
};

// Tasks

const getAllTasksByBoardId = boardId => {
  return getDataFromDb(collection.TASKS).filter(
    task => task.boardId === boardId
  );
};

const getTasksById = (boardId, taskId) => {
  const allTasksOnBoard = getAllTasksByBoardId(boardId);
  return allTasksOnBoard.filter(task => task.id === taskId);
};

const removeTask = (boardId, taskId) => {
  // const allTasksOnBoard = getAllTasksByBoardId(boardId);
  const status = 204; // DB[collection.TASKS].findIndex(el => el.id === taskId) ? 204 : 404;
  DB[collection.TASKS] = DB[collection.TASKS].filter(
    task => task.id !== taskId
  );
  return status;
};

const updateTask = (taskId, boardId, body) => {
  let task = getTasksById(boardId, taskId);
  const status = DB[collection.TASKS].findIndex(el => el.id === taskId)
    ? 204
    : 404;
  if (status === 404) return { status };
  task = {
    ...task,
    ...body
  };
  const taskIndex = DB[collection.TASKS].findIndex(
    el => el.id === taskId && el.boardId === boardId
  );
  DB[collection.TASKS].splice(taskIndex, 1, task);
  return { status, updateTask: getTasksById(boardId, taskId) };
};

module.exports = {
  getAllByCollectionName,
  getAllTasksByBoardId,
  getById,
  getTasksById,
  create,
  remove,
  removeTask,
  updateUser,
  updateBoard,
  updateTask,
  collection
};
