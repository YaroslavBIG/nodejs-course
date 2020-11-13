const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { collection } = require('../../common/inMemoryDB');
const { NotFoundError } = require('../../logger/loggerConfig');
const { handleError } = require('../../logger/loggerConfig');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  if (!boards.length) {
    throw new NotFoundError(collection.BOARDS, null, "Couldn't find boards");
  }
  res.json(boards.map(board => board.toResponse()));
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
    res.json(board.toResponse());
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
  res.json(board.toResponse());
});

router.route('/:id').delete(async (req, res) => {
  const board = await boardsService.deleteBoard(req.params.id);
  if (board.deletedCount === 1) {
    res.status(204).send('The board has been deleted');
  } else {
    handleError(
      new NotFoundError(collection.BOARDS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

router.route('/:id').put(async (req, res) => {
  const updateParams = {
    ...req.body,
    boardId: req.params.id
  };
  const board = await boardsService.update(updateParams);
  if (board) res.status(200).json(board);
  else {
    handleError(
      new NotFoundError(collection.BOARDS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

module.exports = router;
