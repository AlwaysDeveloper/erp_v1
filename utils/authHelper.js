const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

class authHelper {
  signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }

  cookieOptions(res, req) {
    return {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: res.secure || req.header['x-forwarded-proto'] === 'https'
    };
  }

  async passwordCheck(toCheck, byCheck) {
    return await bcrypt.compare(toCheck, byCheck);
  }

  async decodeToken(token) {
    return await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  }
}

module.exports = authHelper;
