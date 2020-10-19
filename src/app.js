const express = require('express');
const swaggerUI = require('swagger-ui-express');
const createError = require('http-errors');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const {
  paramsMorgan,
  morgan,
  handleError,
  uncatchErrorInit
} = require('./logger/loggerConfig');
const { StatusCodes } = require('http-status-codes');

const app = express();
uncatchErrorInit();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(morgan(paramsMorgan));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use((req, res, next) => next(createError(StatusCodes.NOT_FOUND)));

app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

// Promise.reject(Error('Oops!'));
// throw Error('Oops!');

module.exports = app;
