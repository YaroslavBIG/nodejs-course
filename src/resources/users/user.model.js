/* eslint-disable func-names */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema(
  {
    name: String,
    login: String
  },
  { collection: 'users' }
);

// eslint-disable-next-line prettier/prettier
User.method('toResponse', function () {
  const { _id, ...rest } = this.toJSON();
  delete rest.password;
  delete rest.__v;
  return { id: _id, ...rest };
});

module.exports = module.exports = mongoose.model('users', User);
