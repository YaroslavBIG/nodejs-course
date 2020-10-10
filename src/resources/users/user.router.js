const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const users = await usersService.get(req.params.id);
  res.json(users.map(User.toResponse));
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

module.exports = router;
