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

const getUser = _id => {
  const result = getDataFromDb(collection.USERS).filter(
    user => user.id === _id
  );
  return result[0] ? result[0] : null;
};

const testUsers = [new User(), new User(), new User()];

const addTestUsers = () => updateDb(collection.USERS, testUsers);
addTestUsers();

const getAllUsers = () => getDataFromDb(collection.USERS);

const createUser = user => {
  updateDb(collection.USERS, [user]);
  return getUser(user.id);
};

const removeUser = _id => {
  const status = getUser(_id) ? 204 : 404;
  DB.users = getDataFromDb(collection.USERS).filter(user => user.id !== _id);
  return status;
};

module.exports = { getAllUsers, getUser, createUser, removeUser };
