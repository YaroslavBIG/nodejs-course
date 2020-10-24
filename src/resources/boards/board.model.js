/* eslint-disable func-names */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Board = new Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'boards' }
);

// eslint-disable-next-line prettier/prettier
Board.method('toResponse', function () {
  const { _id, ...rest } = this.toJSON();
  delete rest.__v;
  return { id: _id, ...rest };
});

module.exports = module.exports = mongoose.model('boards', Board);
