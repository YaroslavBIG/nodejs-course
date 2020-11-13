const router = require('express').Router({ mergeParams: true });
const { logger } = require('../../logger/loggerConfig');
const columnService = require('./column.service');

router.get('/:id', async (req, res) => {
  logger.warn(req.params.boardId);
  logger.warn(req.params.id);
  const columns = await columnService.get(req.params.boardId, req.params.id);
  if (!columns.length) {
    res.status(404).send(`unexpected param id: ${req.params.id}`);
  } else {
    res.json(columns.map(column => column.toResponse()));
  }
});
