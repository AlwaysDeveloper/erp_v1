const router = require('express').Router();
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
    if (!error && readPage) {
      res.writeHead(200, { 'Content-Type': `${mimeType}` });
      res.write(readPage);
      res.status(200).json();
    } else if (error && !readPage) {
      res.writeHead(200, { 'Content-Type': `text/${mimeType}` });
      res.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>ERP_V1</title>
          <link href="./../../css/common/common.css" rel="stylesheet">
          <link href="./../../css/common/dimensions.css" rel="stylesheet">
          <link href="./../../css/common/gradients.css" rel="stylesheet">
          <link href="./../../css/common/positions.css" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
      </head>
      <body>
          <h1>ERROR 404 PAGE NOT FOUND</h1>
      </body>
      </html>`);
      res.status(200).json();
    }
  });
};

router.get('*', servePages, fileReader);

module.exports = router;
