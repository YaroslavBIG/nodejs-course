const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Test Board',
    columns = [
      {
        id: uuid(),
        title: 'test data',
        order: 1
      },
      {
        id: uuid(),
        title: 'another test data',
        order: 2
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = [...columns];
  }
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
