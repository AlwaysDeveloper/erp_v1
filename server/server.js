/* eslint-disable no-console */
require('dotenv').config({ path: './bin/config.env' });
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = require('../app');
const IO = require('./io');
const helperFactory = require('../utils/helperFactory');

process.on('uncaughtException', error => {
  helperFactory.serverCrashHandler(error);
});

mongoose
  .connect(helperFactory.mongoURLMaker(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MonogoDB is now connected and ready for use 🧐..'));

// const server = app.listen(helperFactory.getPort(), () => {
//   console.log(`Application is running at port:${helperFactory.getPort()}`);
// });

// process.on('unhandledRejection', error => helperFactory.rejectionHandler(error, server));

const server = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
  },
  app
);

// eslint-disable-next-line no-new
new IO(server);

server.listen(helperFactory.getPort(), () => {
  console.log('app.erp_v1.local is listening at https://app.erp_v1.local:3000');
});
