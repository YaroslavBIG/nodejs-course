const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  // eslint-disable-next-line no-unused-expressions
  user
    ? res.json(User.toResponse(user))
    : res.status(404).send('User not found');
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
  const message = user === 204 ? 'The user has been deleted' : 'User not found';
  // const status = user === 204 ? 200 : 404;
  res.status(200).send(message);
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
  // eslint-disable-next-line no-unused-expressions
  user.status === 204
    ? res.status(200).json(User.toResponse(user.updateUser))
    : res.status(404).send('User not found');
});

module.exports = router;
