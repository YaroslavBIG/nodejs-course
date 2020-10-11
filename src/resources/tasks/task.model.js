const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Test task',
    order = 0,
    description = 'Some description',
    userId = uuid(),
    boardId = uuid(),
    columnId = uuid()
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
