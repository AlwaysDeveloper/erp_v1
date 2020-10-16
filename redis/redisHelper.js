const session = require('express-session');
const redis = require('redis');
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
  redisClient.setex(token, 5400, `${user._id}`);
};

exports.getSession = token => {
  redisClient.get(token, (err, res) => {
    if (res) return res;
  });
};
