const express = require('express');
require('express-async-errors');
const swaggerUI = require('swagger-ui-express');
const createError = require('http-errors');
const path = require('path');
const YAML = require('yamljs');
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const columnRouter = require('./resources/column/column.router');
const {
  paramsMorgan,
  morgan,
  handleError,
  uncatchErrorInit
} = require('./logger/loggerConfig');
const { StatusCodes } = require('http-status-codes');

const app = express();
app.disable('x-powered-by');
uncatchErrorInit();
app.use(helmet());
app.use(cors());

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

boardRouter.use('/:boardId/columns', columnRouter);

boardRouter.use('/:boardId/tasks', taskRouter);

app.use((req, res, next) => next(createError(StatusCodes.NOT_FOUND)));

app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

module.exports = app;
