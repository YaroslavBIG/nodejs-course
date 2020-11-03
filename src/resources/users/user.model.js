const mongoose = require('mongoose');
const addSchemaMethod = require('../../utils/addSchemaMethod');
const { Schema } = mongoose;

const User = new Schema(
  {
    name: String,
    login: String,
    password: {
      type: String,
      required: true
    }
  },
  { collection: 'users' }
);

addSchemaMethod(User);

module.exports = module.exports = mongoose.model('users', User);
