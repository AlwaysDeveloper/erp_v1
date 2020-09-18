require('dotenv').config({path: './bin/config.env'})
const mongoose = require('mongoose');

const app = require('./../app');
const helperFactory = require('./../utils/helperFactory');

process.on('uncaughtException', error => {
    helperFactory.serverCrashHandler(error);
});

mongoose.connect(
    helperFactory.mongoURLMaker(),{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    }
).then(() => console.log('MonogoDB is now connected and ready for use 🧐..'));

const server = app.listen(
    helperFactory.getPort,
    () => {
        console.log(`Application is running at port: ${helperFactory.getPort()}`)
    }
);

process.on('unhandledRejection', (error) => helperFactory(error, server));