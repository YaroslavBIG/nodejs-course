const User = require('./user.model');
const { hashPassword } = require('../../common/authHelpers/hashHelpers');
const { updateTasks } = require('../tasks/task.service');

const getAll = async () => User.find({});

const get = async _id => await User.findById(_id);

const createUser = async user => User.create(user);

const deleteUser = async _id => {
  const user = await User.deleteOne({ _id });
  await updateTasks(_id, { userId: null });
  return user;
};

const update = async data => {
  const { login, password, name, id } = data;

  const hashedPass = hashPassword(password);

  await User.findByIdAndUpdate(id, { login, password: hashedPass, name });

  return await get(id);
};

const findUser = async login => await User.find({ login });

module.exports = { getAll, get, createUser, deleteUser, update, findUser };
