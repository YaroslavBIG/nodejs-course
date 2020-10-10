const User = require('../resources/users/user.model');

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

const updateDb = (collect, data) => {
  if (DB[collect]) {
    DB[collect] = [...DB[collect], ...data];
  } else {
    throw new Error('Error collection (update)');
  }
};

const getDataFromDb = collect => {
  if (DB[collect]) {
    return [...DB[collect]];
  }
  throw new Error('Error collection (get)');
};

const getUser = _id =>
  getDataFromDb(collection.USERS).filter(user => user.id === _id);

const testUsers = [new User(), new User(), new User()];

const addTestUsers = () => updateDb(collection.USERS, testUsers);
addTestUsers();

const getAllUsers = () => getDataFromDb(collection.USERS);

const createUser = user => {
  updateDb(collection.USERS, [user]);
  return getUser(user.id);
};

module.exports = { getAllUsers, getUser, createUser };
