const jwt = require('jsonwebtoken');

class authHelper{

    signToken(id){
        return jwt.sign(
            { id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );
    }

    cookieOptions(res , req){
        return {
            expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000  ),
            httpOnly: true,
            secure: res.secure || req.header['x-forwarded-proto'] === 'https'
        }
    }
}

module.exports = authHelper;