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
  // eslint-disable-next-line no-unused-expressions
  user === 204
    ? res.status(204).send('The user has been deleted')
    : res.status(404).send('User not found');
});

module.exports = router;
