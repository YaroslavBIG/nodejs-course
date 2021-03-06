// const { PORT } = require('./common/config');
// const app = require('./app');
const { logger } = require('./logger/loggerConfig');
const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const createAdminUserForTests = require('./utils/createAdminUserForTests');

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
    logger.info('DB Cleared');
    db.dropDatabase();
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
    createAdminUserForTests();
  }
);
