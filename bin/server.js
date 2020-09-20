/* eslint-disable no-console */

require('dotenv').config({ path: './bin/config.env' });
const mongoose = require('mongoose');

const app = require('./../app');
const helperFactory = require('./../utils/helperFactory');

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

<<<<<<< HEAD
const server = app.listen(
    helperFactory.getPort(),
    () => {
        console.log(`Application is running at port:${helperFactory.getPort()}`)
    }
);
=======
const server = app.listen(helperFactory.getPort, () => {
  console.log(`Application is running at port: ${helperFactory.getPort()}`);
});
>>>>>>> c824acc364d16e15cebec039a9a6798ad1c45740

process.on('unhandledRejection', error => helperFactory(error, server));
