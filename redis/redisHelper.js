const session = require('express-session');
const redis = require('redis');
const { promisify } = require('util');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

exports.session = session({
  secret: process.env.REDIS_SECRET,
  name: '__erp_v1_session',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
  store: new RedisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 })
});

exports.setSession = (token, user) => {
  redisClient.setex(token, 5400, JSON.stringify(user));
};

exports.getSession = token => {
  return new Promise((resolve, reject) => {
    redisClient.get(token, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(ex);
      }
    });
  });
};

exports.delSession = token => {
  return new Promise((resolve, reject) => {
    redisClient.del(token, (err, reply) => {
      if (err) {
        reject(reply);
        return;
      }
      if (reply == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(reply));
      } catch (ex) {
        resolve(ex);
      }
    });
  });
};
