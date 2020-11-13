const mongoose = require('mongoose');
const addSchemaMethod = require('../../utils/addSchemaMethod');
const { Schema } = mongoose;
// TODO: columns id`s
const Board = new Schema(
  {
    title: String,
    columns: [String]
  },
  { collection: 'boards' }
);

addSchemaMethod(Board);

module.exports = mongoose.model('boards', Board);
