const mongoose = require('mongoose');
const addSchemaMethod = require('../../utils/addSchemaMethod');
const { Schema } = mongoose;

const Board = new Schema(
  {
    title: String,
    columns: [
      {
        title: String,
        order: Number
      }
    ]
  },
  { collection: 'boards' }
);

addSchemaMethod(Board);

module.exports = module.exports = mongoose.model('boards', Board);
