const router = require('express').Router();
const loginService = require('./login.service');

router.post('/', async (req, res) => {
  const { login, password } = req.body;

  const token = await loginService.getToken(login, password);

  if (!token) {
    res.status(403).send('Forbidden');
  } else {
    res.status(200).json({ token });
  }
});

module.exports = router;
