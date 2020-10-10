const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  // eslint-disable-next-line no-unused-expressions
  board
    ? res.json(Board.toResponse(board))
    : res.status(404).send('board not found');
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
  const message =
    board === 204 ? 'The board has been deleted' : 'board not found';
  res.status(board).send(message);
});

router.route('/:id').put(async (req, res) => {
  const { title, columns } = req.body;
  const id = req.params.id;
  const updateParams = {
    title,
    columns,
    id
  };
  const board = await boardsService.update(updateParams);
  // eslint-disable-next-line no-unused-expressions
  board.status === 204
    ? res.status(200).json(board.updateBoard)
    : res.status(404).send('board not found');
});

module.exports = router;
