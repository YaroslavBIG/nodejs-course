/* eslint-disable func-names */
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

// eslint-disable-next-line prettier/prettier
Task.method('toResponse', function () {
  const { _id, ...rest } = this.toJSON();
  delete rest.__v;
  return { id: _id, ...rest };
});

module.exports = mongoose.model('tasks', Task);
