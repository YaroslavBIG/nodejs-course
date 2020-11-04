const mongoose = require('mongoose');
const addSchemaMethod = require('../../utils/addSchemaMethod');
const { Schema } = mongoose;

const Columns = new Schema({
  title: String,
  order: Number
});

const Board = new Schema(
  {
    title: String,
    columns: [Columns]
  },
  { collection: 'boards' }
);

addSchemaMethod(Board);

module.exports = module.exports = mongoose.model('boards', Board);
