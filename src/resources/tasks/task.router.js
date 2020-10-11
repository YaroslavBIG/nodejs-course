const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const tasks = await taskService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.get(req.params.boardId, req.params.id);
  // eslint-disable-next-line no-unused-expressions
  task.length ? res.json(task[0]) : res.status(404).send('task not found');
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  const task = await taskService.deleteTask(req.params.boardId, req.params.id);
  const message = task === 204 ? 'The task has been deleted' : 'task not found';
  const status = task === 204 ? 200 : 404;
  res.status(status).send(message);
});

router.route('/:id').put(async (req, res) => {
  const { id, boardId } = req.params;

  const task = await taskService.update(id, boardId, req.body);
  // eslint-disable-next-line no-unused-expressions
  task.status === 204
    ? res.status(200).json(task.updateTask)
    : res.status(404).send('task not found');
});

module.exports = router;
