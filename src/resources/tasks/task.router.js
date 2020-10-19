const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const { handleError } = require('../../logger/loggerConfig');
const { collection } = require('../../common/inMemoryDB');
const { NotFoundError } = require('../../logger/loggerConfig');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  await res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.id);
  if (task.length) {
    res.json(task[0]);
  } else {
    handleError(
      new NotFoundError(collection.TASKS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  await res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  try {
    const task = await taskService.deleteTask(
      req.params.boardId,
      req.params.id
    );
    res.status(task).send('The task has been deleted');
  } catch {
    handleError(
      new NotFoundError(collection.TASKS, `id: ${req.params.id}`),
      req,
      res
    );
  }
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
