const getIp = (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
  if (ip.includes('::ffff:')) {
    ip = ip.split(/::ffff:/)[1];
  }
  console.log(ip);
  next();
};

module.exports = getIp;
