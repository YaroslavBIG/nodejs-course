const router = require('express').Router({ mergeParams: true });
const columnService = require('./column.service');
const Column = require('./column.model');

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

router.get('/:id', async (req, res) => {
  const columns = await columnService.get(req.params.boardId, req.params.id);
  if (!columns.length) {
    res.status(404).send(`unexpected param id: ${req.params.id}`);
  } else {
    res.json(columns.toResponse());
  }
});

module.exports = router;
