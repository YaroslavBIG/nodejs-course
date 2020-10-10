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

const addToDb = (collect, data) => {
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

const addTestUsers = () => addToDb(collection.USERS, testUsers);
addTestUsers();

const getAllUsers = () => getDataFromDb(collection.USERS);

const createUser = user => {
  addToDb(collection.USERS, [user]);
  return getUser(user.id);
};

const removeUser = _id => {
  const status = getUser(_id) ? 204 : 404;
  DB.users = getDataFromDb(collection.USERS).filter(user => user.id !== _id);
  return status;
};

const updateUser = data => {
  const { id, name, password, login } = data;
  const status = getUser(id) ? 204 : 404;
  if (status === 404) return status;
  const user = getUser(id);
  user.name = name ? name : user.name;
  user.password = password ? password : user.password;
  user.login = login ? login : user.login;
  const userIndex = DB.users.findIndex(el => el.id === id);
  DB.users.splice(userIndex, 1, user);
  return { status, updateUser: getUser(id) };
};

module.exports = { getAllUsers, getUser, createUser, removeUser, updateUser };
