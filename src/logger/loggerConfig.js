// const { LOG_DIR } = require('../common/config');
// const winston = require('winston');
const morgan = require('morgan');

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

// const options = {
//   file: {
//     level: 'info',
//     filename: `${LOG_DIR}/app.log`,
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: false
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true
//   }
// };

module.exports = { morgan, paramsMorgan };
