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

const addToDb = async (collectionName, data) => {
  if (DB[collectionName]) {
    DB[collectionName] = [...DB[collectionName], ...data];
  } else {
    throw new Error('Error collection (update)');
  }
};

const getDataFromDb = collectionName => {
  if (DB[collectionName]) {
    return DB[collectionName];
  }
  throw new Error('Error collection (get)');
};

const getById = async (_id, collectionName) => {
  const result = await getDataFromDb(collectionName).filter(
    el => el.id === _id
  );
  return result.length ? result[0] : null;
};

const testUsers = [new User(), new User(), new User()];
const testBoards = [new Board(), new Board(), new Board()];

const addTestUsers = () => addToDb(collection.USERS, testUsers);
addTestUsers();

const addTestBoards = () => addToDb(collection.BOARDS, testBoards);
addTestBoards();

const getAllByCollectionName = async collectionName =>
  getDataFromDb(collectionName);

const create = async (data, collectionName) => {
  await addToDb(collectionName, [data]);
  return getById(data.id, collectionName);
};

const remove = async (_id, collectionName) => {
  const status = (await getById(_id, collectionName)) ? 204 : 404;
  DB[collectionName] = await getDataFromDb(collectionName).filter(
    el => el.id !== _id
  );
  if (collectionName === collection.USERS) {
    await (DB[collection.TASKS] = [...DB[collection.TASKS]].map(task => {
      if (task.userId === _id) {
        task.userId = null;
      }
      return task;
    }));
  }
  if (collectionName === collection.BOARDS) {
    // eslint-disable-next-line require-atomic-updates
    await (DB[collection.TASKS] = [...DB[collection.TASKS]].filter(
      task => task.boardId !== _id
    ));
  }
  return status;
};

const updateUser = async data => {
  const { id, name, password, login } = data;
  const oldUser = await getById(id, collection.USERS);
  const status = oldUser ? 204 : 404;
  if (status === 404) return { status };
  const user = await getById(id, collection.USERS);
  user.name = name ? name : user.name;
  user.password = password ? password : user.password;
  user.login = login ? login : user.login;
  const userIndex = await DB[collection.USERS].findIndex(el => el.id === id);
  DB[collection.USERS].splice(userIndex, 1, user);
  return { status, updateUser: getById(id, collection.USERS) };
};

// Boards

const updateBoard = async data => {
  const { boardId } = data;
  let board = getById(boardId, collection.BOARDS);
  board = await new Board({
    id: boardId,
    title: data.title,
    columns: data.columns
  });
  const boardIndex = await DB[collection.BOARDS].findIndex(
    el => el.id === boardId
  );
  const status = boardIndex !== -1 ? 204 : 404;
  DB[collection.BOARDS].splice(boardIndex, 1, board);
  return { status, board: getById(boardId, collection.BOARDS) };
};

// Tasks

const getAllTasksByBoardId = async boardId => {
  return getDataFromDb(collection.TASKS).filter(
    task => task.boardId === boardId
  );
};

const getTasksById = async (boardId, taskId) => {
  const allTasksOnBoard = await getAllTasksByBoardId(boardId);
  return allTasksOnBoard.filter(task => task.id === taskId);
};

const removeTask = async (boardId, taskId) => {
  const allTasksOnBoard = DB[collection.TASKS].filter(
    task => task.boardId === boardId
  );
  const status =
    (await allTasksOnBoard.findIndex(el => el.id === taskId)) !== -1
      ? 204
      : new Error('404');
  // eslint-disable-next-line require-atomic-updates
  DB[collection.TASKS] = allTasksOnBoard.filter(
    task => task.id !== taskId && task.boardId === boardId
  );
  return status;
};

const updateTask = async (taskId, boardId, body) => {
  const task = await getTasksById(boardId, taskId);
  const status =
    DB[collection.TASKS].findIndex(el => el.id === taskId) >= 0 ? 204 : 404;
  if (status === 404) return { status };
  const newTask = {
    ...task,
    ...body
  };
  const taskIndex = await DB[collection.TASKS].findIndex(
    el => el.id === taskId && el.boardId === boardId
  );
  await DB[collection.TASKS].splice(taskIndex, 1, newTask);
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
