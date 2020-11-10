const mongoose = require('mongoose');
const addSchemaMethod = require('../../utils/addSchemaMethod');
const { Schema } = mongoose;

const Column = new Schema({
  title: { type: String, required: true },
  order: { type: Number, required: true },
  description: String
});

const Board = new Schema(
  {
    title: String,
    columns: [Column]
  },
  { collection: 'boards' }
);

addSchemaMethod(Board);

module.exports = module.exports = mongoose.model('boards', Board);
