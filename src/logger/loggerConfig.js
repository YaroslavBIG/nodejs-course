const { LOG_DIR } = require('../common/config');
const winston = require('winston');
const morgan = require('morgan');
const { combine, timestamp, prettyPrint, colorize, cli } = winston.format;
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

morgan.token('query', req => JSON.stringify(req.query));
morgan.token('body', req => {
  const { body } = req;
  if (body.password) {
    delete body.password;
  }
  return JSON.stringify(body);
});
morgan.token('params', req => JSON.stringify(req.params));

const paramsMorgan =
  ':date[web] URL - :url query - :query body - :body params - :params :method :status :response-time ms';

const options = {
  fileUnhandled: {
    format: combine(timestamp(), prettyPrint()),
    level: 'error',
    filename: `${LOG_DIR}/exceptions.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileError: {
    format: combine(timestamp(), prettyPrint()),
    level: 'error',
    filename: `${LOG_DIR}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  fileInfo: {
    format: combine(timestamp(), prettyPrint()),
    level: 'info',
    filename: `${LOG_DIR}/info.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    format: combine(colorize(), cli()),
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    json: false
  }
};
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      ...options.console
    }),
    new winston.transports.File(options.fileError),
    new winston.transports.File(options.fileInfo)
  ],
  exceptionHandlers: [new winston.transports.File(options.fileUnhandled)],
  exitOnError: true
});

const uncatchErrorInit = () => {
  process
    .on('unhandledRejection', reason => {
      logger.error(`unhandledRejection ${reason} in promise`);
    })
    .on('uncaughtException', err => {
      logger.error(`uncaughtException ${err}`);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    });
};

const handleError = (err, req, res, next) => {
  if (err.status) {
    logger.log('warn', `${err.message} status: ${err.status}`);
    res.status(err.status).send(err.message);
  } else {
    logger.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
    });
  }
  if (next) return next();
};

class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = StatusCodes.NOT_FOUND;
  }
}

module.exports = {
  morgan,
  paramsMorgan,
  logger,
  uncatchErrorInit,
  handleError,
  NotFoundError
};
