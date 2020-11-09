const mongoose = require('mongoose');
const addSchemaMethod = require('../../utils/addSchemaMethod');
const { Schema } = mongoose;

const Column = new Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    description: String,
    boardId: { type: String, required: true }
  },
  { collection: 'columns' }
);

addSchemaMethod(Column);

module.exports = mongoose.model('columns', Column);
