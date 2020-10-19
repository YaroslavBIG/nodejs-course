const { LOG_DIR } = require('../common/config');
const winston = require('winston');
const morgan = require('morgan');
const { combine, timestamp, prettyPrint, colorize, cli } = winston.format;

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
    new winston.transports.Console(),
    new winston.transports.File(options.fileError),
    new winston.transports.File(options.fileInfo)
  ],
  exceptionHandlers: [new winston.transports.File(options.fileUnhandled)],
  exitOnError: true
});

process
  .on('unhandledRejection', (reason, p) => {
    // console.error(reason, 'Unhandled Rejection at Promise', p);
    logger.error(
      `unhandledRejection ${JSON.stringify(reason)} in promise ${p}`
    );
  })
  .on('uncaughtException', err => {
    // console.error(err, 'Uncaught Exception thrown');
    logger.error(`uncaughtException ${JSON.stringify(err)}`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  });

module.exports = { morgan, paramsMorgan, logger };
