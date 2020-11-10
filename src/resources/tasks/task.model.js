const mongoose = require('mongoose');
const addSchemaMethod = require('../../utils/addSchemaMethod');
const { Schema } = mongoose;

const CheckList = new Schema({
  title: String,
  order: Number,
  checks: [
    {
      description: {
        type: String,
        required: true
      },
      checked: Boolean,
      order: Number
    }
  ]
});
// TODO: Add priority
const Task = new Schema(
  {
    title: { type: String, required: true },
    order: { type: Number, required: true },
    description: String,
    userId: String,
    checkList: [CheckList],
    boardId: { type: String, required: true },
    columnId: { type: String, required: false }
  },
  { collection: 'tasks' }
);

addSchemaMethod(Task);

module.exports = mongoose.model('tasks', Task);
