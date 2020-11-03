const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { NotFoundError } = require('../../logger/loggerConfig');
const { collection } = require('../../common/inMemoryDB');
const { handleError } = require('../../logger/loggerConfig');
const { hashPassword } = require('../../common/authHelpers/hashHelpers');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(user => user.toResponse()));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) {
    res.json(user.toResponse());
  } else {
    handleError(
      new NotFoundError(collection.USERS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

router.route('/').post(async (req, res) => {
  const { login, password, name } = req.body;
  const user = await usersService.create(
    new User({
      login,
      password: await hashPassword(password),
      name
    })
  );
  res.json(user.toResponse());
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  if (user.deletedCount === 1) {
    res.status(204).send('The user has been deleted');
  } else {
    handleError(
      new NotFoundError(collection.USERS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

router.route('/:id').put(async (req, res) => {
  const { login, password, name } = req.body;
  const id = req.params.id;
  const updateParams = {
    login,
    password,
    name,
    id
  };
  const user = await usersService.update(updateParams);
  if (user) {
    res.status(200).json(user.toResponse());
  } else {
    handleError(
      new NotFoundError(collection.USERS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

module.exports = router;
