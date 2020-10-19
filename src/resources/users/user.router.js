const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { NotFoundError } = require('../../logger/loggerConfig');
const { collection } = require('../../common/inMemoryDB');
const { handleError } = require('../../logger/loggerConfig');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (user) {
    res.json(User.toResponse(user));
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
      password,
      name
    })
  );
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const user = await usersService.deleteUser(req.params.id);
  if (user === 204) {
    res.status(user).send('The user has been deleted');
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
  if (user.status === 204) {
    res.status(200).json(User.toResponse(user.updateUser));
  } else {
    handleError(
      new NotFoundError(collection.USERS, `id: ${req.params.id}`),
      req,
      res
    );
  }
});

module.exports = router;
