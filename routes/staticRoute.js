const router = require('express').Router();
const { throws } = require('assert');
const fs = require('fs');
const path = require('path');

const mime = require('./../utils/mimeType');

const viewRoutes = {
  //Admin routes
  admin: {
    head: '/admin',
    body: {
      home: '/home.html'
    }
  },
  //Students routes
  students: {
    home: ''
  }
};

const servePages = async (req, res, next) => {
  let fileDir;
  req.mimeType = await mime.mimeType('html');
  if (
    req.originalUrl.includes('/css') ||
    req.originalUrl.includes('/javascript') ||
    req.originalUrl.includes('/images') ||
    req.originalUrl.split('.')[1] === 'ico'
  ) {
    fileDir = path.join(path.join(__dirname, '/../web', req.originalUrl));
    req.mimeType = await mime.mimeType(req.originalUrl.split('.')[1]);
  } else {
    const URL = req.originalUrl.split('/');
    const subURL = URL[1];
    const page = URL[2];
    fileDir =
      subURL === ''
        ? path.join(__dirname, `/../web/index.html`)
        : path.join(__dirname, `/../web/views${viewRoutes[subURL].head}${viewRoutes[subURL].body[page]}`);
  }
  req.fileDir = fileDir;
  next();
};

const fileReader = (req, res, next) => {
  const { fileDir, mimeType } = req;
  fs.readFile(fileDir, (error, readPage) => {
    if (readPage) {
      res.writeHead(200, { 'Content-Type': `${mimeType}` });
      res.write(readPage);
      res.status(200).json();
    } else if (error) {
      fs.readFile(path.join(__dirname, './../web/404.html'), (err, page) => {
        if (page) {
          res.writeHead(200, { 'Content-Type': `text/html` });
          res.write(page);
          res.status(200).json();
        }
      });
    }
  });
};

router.get('*', servePages, fileReader);

module.exports = router;
