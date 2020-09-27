const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const AppError = require('./utils/appError');

//jobs imports
const ipCaptures = require('./jobs/ipCapture');
//routes imports
const userRouter = require('./routes/studentRoute');
const attendenceRouter = require('./routes/attendenceRoute');
const specialRouter = require('./routes/specialRoute');

const app = express();

app.enable('trust proxy');

app.use(cors());
app.options('*', cors());

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'You got you request quota full this IP, try again after an hour'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());

// Defining routes as of url pattern
app.use('/erp_v1/api/v1/user', ipCaptures, userRouter);
app.use('/erp_v1/api/v1/attendence', ipCaptures, attendenceRouter);
app.use('/erp_v1/api/v1/special', ipCaptures, specialRouter);
// When no url pattern matches
app.all('*', (req, res, next) => {
  next(new AppError(`Can't able to find ${req.originalUrl} on the server!`), 404);
});

module.exports = app;
