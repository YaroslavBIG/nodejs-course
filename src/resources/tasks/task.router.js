const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const { handleError } = require('../../logger/loggerConfig');
const { collection } = require('../../common/inMemoryDB');
const { NotFoundError } = require('../../logger/loggerConfig');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  await res.json(tasks.map(task => task.toResponse()));
});

router.get('/:id', async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.id);
  if (!task) {
    res.status(404).send(`unexpected param id: ${req.params.id}`);
  } else {
    res.json(task.toResponse());
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.json(task.toResponse());
});

router.route('/:id').delete(async (req, res) => {
  const task = await taskService.deleteTask(req.params.boardId, req.params.id);
  if (task.deletedCount !== 1) {
    res.status(404).json(task);
  }
  res.status(204);
});

router.route('/:id').put(async (req, res) => {
  const { id, boardId } = req.params;
  try {
    const task = await taskService.update(id, boardId, req.body);
    res.status(200).json(task);
  } catch (e) {
    handleError(
      new NotFoundError(collection.TASKS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

module.exports = router;
