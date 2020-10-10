/*
[
  {
    "id": "c9f0e1bd-d10a-4435-bf97-7c2ac3143ad1",
    "title": "Autotest board",
    "columns": [
      {
        "title": "Backlog",
        "order": 1
      },
      {
        "title": "Sprint",
        "order": 2
      }
    ]
  }
]*/
const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'USER',
    columns = [
      {
        id: uuid(),
        title: 'testData',
        order: 1
      },
      {
        id: uuid(),
        title: 'testData2',
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
