// const { PORT } = require('./common/config');
// const app = require('./app');
const { logger } = require('./logger/loggerConfig');
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  }
);

// app.listen(PORT, () =>
//   logger.info(`App is running on http://localhost:${PORT}`)
// );
