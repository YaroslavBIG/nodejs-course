const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { collection } = require('../../common/inMemoryDB');
const { NotFoundError } = require('../../logger/loggerConfig');
const { handleError } = require('../../logger/loggerConfig');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
  if (boards.length === 0) {
    throw new NotFoundError(collection.BOARDS);
  }
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  if (!board) {
    handleError(
      new NotFoundError(collection.BOARDS, `id: ${req.params.id}`),
      req,
      res
    );
  } else {
    res.json(Board.toResponse(board));
  }
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.create(
    new Board({
      title,
      columns
    })
  );
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardsService.deleteBoard(req.params.id);
  if (board !== 204) {
    handleError(
      new NotFoundError(collection.BOARDS, `id: ${req.params.id}`),
      req,
      res
    );
  } else {
    res.status(board).send('The board has been deleted');
  }
});

router.route('/:id').put(async (req, res) => {
  const updateParams = {
    ...req.body,
    boardId: req.params.id
  };
  const board = await boardsService.update(updateParams);
  // eslint-disable-next-line no-unused-expressions
  if (board.status === 204) res.status(200).json(board.updateBoard);
  else {
    handleError(
      new NotFoundError(collection.BOARDS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

module.exports = router;
