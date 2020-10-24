const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { collection: 'tasks' }
);

module.exports = mongoose.model('tasks', Task);
