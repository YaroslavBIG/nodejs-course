const router = require('express').Router({ mergeParams: true });
const columnService = require('./column.service');
const Column = require('./column.model');
const { handleError, NotFoundError } = require('../../logger/loggerConfig');

router.get('/', async (req, res) => {
  const columns = await columnService.getAll(req.params.boardId);
  if (!columns.length) {
    res.json(columns);
  } else {
    res.json(columns.map(column => column.toResponse()));
  }
});

router.route('/').post(async (req, res) => {
  const column = await columnService.create(
    new Column({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.json(column.toResponse());
});

router.route('/:id').get(async (req, res) => {
  const column = await columnService.get(req.params.boardId, req.params.id);
  if (!column) {
    res.status(404).send(`unexpected param id: ${req.params.id}`);
  } else {
    res.json(column.toResponse());
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const column = await columnService.deleteColumn(
      req.params.boardId,
      req.params.id
    );
    res.status(204).json(column);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id, boardId } = req.params;
  try {
    const column = await columnService.update(id, boardId, req.body);
    res.status(200).json(column);
  } catch (e) {
    handleError(new NotFoundError('Columns', `id: ${req.params.id}`), req, res);
  }
});
module.exports = router;
