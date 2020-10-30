const fs = require('fs');

const fileReader = () => {
  return new Promise((resolve, rejects) => {
    fs.readFile('./data/mime.json', async (error, data) => {
      if (error) {
        rejects(error.message);
      }
      data = JSON.parse(data.toString('utf-8'));
      resolve(data);
    });
  });
};

exports.mimeType = async ext => {
  const mimeTypes = await fileReader();
  return mimeTypes[`.${ext}`];
};
